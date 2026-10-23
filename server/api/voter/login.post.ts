import { getAdminFirestore } from '../../utils/firebaseAdmin'
import {
  setVoterSessionCookie,
  generateCsrfToken,
  type VoterSessionPayload
} from '../../utils/voterSession'
import {
  checkRateLimit,
  recordFailedAttempt,
  resetRateLimit,
  hashRateLimitKey
} from '../../utils/rateLimit'
import { normalizeDateInput } from '../../utils/dateNormalizer'
import { resolveActiveElectionId } from '../../utils/activeElection'

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const rawNim = String(body?.nim || '').trim()
  const rawDob = String(body?.dob || body?.birthDate || '').trim()

  // 1. Validasi keberadaan input
  if (!rawNim || !rawDob) {
    throw createError({
      statusCode: 400,
      statusMessage: 'NIM dan tanggal lahir wajib diisi.'
    })
  }

  // Sanitasi format NIM (hanya karakter alfanumerik, titik, atau strip)
  const cleanNim = rawNim.replace(/[^a-zA-Z0-9.-]/g, '')
  if (cleanNim.length < 4 || cleanNim.length > 30) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Format NIM tidak valid.'
    })
  }

  // 2. Normalisasi format tanggal lahir ke YYYY-MM-DD
  const normalizedDob = normalizeDateInput(rawDob)
  if (!normalizedDob) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Format tanggal lahir tidak valid. Gunakan format ddmmyyyy atau YYYY-MM-DD.'
    })
  }

  // 3. Verifikasi ketersediaan Firebase Admin SDK
  const db = getAdminFirestore()
  if (!db) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Layanan verifikasi pemilih sedang dalam persiapan. Kredensial Firebase Admin server belum dikonfigurasi.'
    })
  }

  // 4. Rate limiting per IP dan per NIM (Mencegah brute-force pada tanggal lahir)
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || '127.0.0.1'
  const ipKey = hashRateLimitKey('ip_login', clientIp)
  const nimKey = hashRateLimitKey('nim_login', cleanNim)

  const ipLimit = await checkRateLimit(ipKey, 10, 300, 900)
  if (!ipLimit.allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: ipLimit.message || 'Terlalu banyak percobaan masuk dari alamat IP ini. Silakan coba kembali nanti.'
    })
  }

  const nimLimit = await checkRateLimit(nimKey, 5, 300, 900)
  if (!nimLimit.allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: nimLimit.message || 'Terlalu banyak percobaan masuk gagal untuk akun ini. Akun ditangguhkan sementara.'
    })
  }

  // Pesan kegagalan generik anti-enumerasi: penyerang tidak dapat membedakan apakah NIM terdaftar,
  // tanggal lahir cocok, mahasiswa cuti, belum terdaftar di DPT, atau telah menggunakan hak suara.
  const GENERIC_AUTH_ERROR = 'NIM atau tanggal lahir tidak cocok, atau Anda tidak memenuhi syarat sebagai pemilih pada agenda pemilihan ini.'

  try {
    // 5. Ambil HANYA dokumen spesifik master_students/{nim} (Akses privat server)
    const studentDocRef = db.collection('master_students').doc(cleanNim)
    const studentDocSnap = await studentDocRef.get()

    if (!studentDocSnap.exists) {
      await recordFailedAttempt(ipKey, 10, 300, 900)
      await recordFailedAttempt(nimKey, 5, 300, 900)
      console.warn('[Voter Login] Autentikasi ditolak: Dokumen mahasiswa tidak ditemukan.')
      throw createError({
        statusCode: 401,
        statusMessage: GENERIC_AUTH_ERROR
      })
    }

    const studentData = studentDocSnap.data()

    // 6. Validasi kecocokan tanggal lahir
    if (!studentData?.birthDate || String(studentData.birthDate).trim() !== normalizedDob) {
      await recordFailedAttempt(ipKey, 10, 300, 900)
      await recordFailedAttempt(nimKey, 5, 300, 900)
      console.warn('[Voter Login] Autentikasi ditolak: Tanggal lahir tidak cocok.')
      throw createError({
        statusCode: 401,
        statusMessage: GENERIC_AUTH_ERROR
      })
    }

    // 7. Validasi status akun dan status akademik mahasiswa
    if (studentData.accountStatus !== 'Aktif & Terverifikasi') {
      await recordFailedAttempt(ipKey, 10, 300, 900)
      await recordFailedAttempt(nimKey, 5, 300, 900)
      console.warn('[Voter Login] Autentikasi ditolak: Status akun mahasiswa bukan Aktif & Terverifikasi.')
      throw createError({
        statusCode: 401,
        statusMessage: GENERIC_AUTH_ERROR
      })
    }

    if (studentData.academicStatus === 'Cuti Akademik') {
      await recordFailedAttempt(ipKey, 10, 300, 900)
      await recordFailedAttempt(nimKey, 5, 300, 900)
      console.warn('[Voter Login] Autentikasi ditolak: Mahasiswa berstatus Cuti Akademik.')
      throw createError({
        statusCode: 401,
        statusMessage: GENERIC_AUTH_ERROR
      })
    }

    // 8. Ambil referensi agenda pemilihan aktif (mendukung sandbox dev terisolasi)
    const activeElectionId = await resolveActiveElectionId(db)
    if (!activeElectionId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tidak ada agenda pemilihan yang sedang aktif diselenggarakan saat ini.'
      })
    }

    // Ambil dokumen agenda pemilihan terkait
    const electionDocRef = db.collection('elections').doc(activeElectionId)
    const electionDocSnap = await electionDocRef.get()

    if (!electionDocSnap.exists) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Data agenda pemilihan aktif tidak ditemukan di sistem.'
      })
    }

    const electionData = electionDocSnap.data()

    // Validasi status pemilihan: harus 'Berlangsung'
    if (electionData?.status !== 'Berlangsung') {
      throw createError({
        statusCode: 400,
        statusMessage: `Agenda pemilihan "${electionData?.name || activeElectionId}" belum dimulai atau telah berakhir.`
      })
    }

    // Validasi jadwal pemilihan jika tersedia rentang waktu
    if (electionData?.startDate && electionData?.endDate) {
      const now = Date.now()
      const start = new Date(electionData.startDate).getTime()
      const end = new Date(electionData.endDate).getTime()

      if (!isNaN(start) && now < start) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Waktu pemungutan suara pemilihan belum dibuka.'
        })
      }

      if (!isNaN(end) && now > end) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Waktu pemungutan suara pemilihan telah berakhir.'
        })
      }
    }

    // 9. Validasi kepesertaan dalam Daftar Pemilih Tetap (DPT)
    // Cek ID deterministik `${electionId}_${nim}`
    const dptDocRef = db.collection('election_dpt').doc(`${activeElectionId}_${cleanNim}`)
    let dptSnap = await dptDocRef.get()

    // Fallback pencarian berbasis query jika dokumen ID menggunakan format lain
    if (!dptSnap.exists) {
      const dptQuerySnap = await db.collection('election_dpt')
        .where('electionId', '==', activeElectionId)
        .where('nim', '==', cleanNim)
        .limit(1)
        .get()

      if (!dptQuerySnap.empty) {
        dptSnap = dptQuerySnap.docs[0]
      }
    }

    if (!dptSnap.exists) {
      await recordFailedAttempt(ipKey, 10, 300, 900)
      await recordFailedAttempt(nimKey, 5, 300, 900)
      console.warn('[Voter Login] Autentikasi ditolak: Mahasiswa tidak terdaftar pada DPT pemilihan aktif.')
      throw createError({
        statusCode: 401,
        statusMessage: GENERIC_AUTH_ERROR
      })
    }

    const dptData = dptSnap.data()

    // Validasi apakah hak suara sudah pernah digunakan
    if (dptData?.hasVoted === true) {
      await recordFailedAttempt(ipKey, 10, 300, 900)
      await recordFailedAttempt(nimKey, 5, 300, 900)
      console.warn('[Voter Login] Autentikasi ditolak: Hak suara pemilih sudah pernah digunakan.')
      throw createError({
        statusCode: 401,
        statusMessage: GENERIC_AUTH_ERROR
      })
    }

    // 10. Login Berhasil: Reset catatan gagal rate limit
    await resetRateLimit(ipKey)
    await resetRateLimit(nimKey)

    // 11. Terbitkan sesi pemilih bertanda tangan kriptografis dalam HttpOnly Cookie
    const now = Date.now()
    const csrfToken = generateCsrfToken()
    const sessionPayload: VoterSessionPayload = {
      nim: cleanNim,
      name: String(studentData.name || 'Mahasiswa').trim(),
      faculty: String(studentData.faculty || 'Fakultas').trim(),
      major: String(studentData.major || 'Program Studi').trim(),
      electionId: activeElectionId,
      electionName: String(electionData?.name || electionData?.title || 'Pemilihan Raya Mahasiswa').trim(),
      dptId: dptSnap.id,
      hasVoted: false,
      csrfToken,
      issuedAt: now,
      expiresAt: now + 30 * 60 * 1000 // 30 menit
    }

    setVoterSessionCookie(event, sessionPayload)

    // Kembalikan HANYA informasi profil publik non-sensitif ke browser
    return {
      success: true,
      message: 'Autentikasi pemilih berhasil. Selamat datang di Bilik Suara Digital.',
      csrfToken,
      voter: {
        nim: sessionPayload.nim,
        name: sessionPayload.name,
        faculty: sessionPayload.faculty,
        major: sessionPayload.major,
        electionId: sessionPayload.electionId,
        electionName: sessionPayload.electionName,
        hasVoted: false
      }
    }
  } catch (err: any) {
    // Teruskan H3Error apa adanya
    if (err.statusCode) {
      throw err
    }

    console.error('[API /api/voter/login] Terjadi kendala internal server:', err.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Terjadi kendala pada server saat memverifikasi data pemilih.'
    })
  }
})
