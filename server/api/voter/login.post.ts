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
import { normalizeDateInput, normalizeFirestoreBirthDate } from '../../utils/dateNormalizer'
import { resolveActiveElectionId } from '../../utils/activeElection'

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const rawNim = String(body?.nim || '').trim()
  const rawDob = String(body?.dob || body?.birthDate || '').trim()

  // 1. Validasi keberadaan input form
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

  // 2. Normalisasi format tanggal lahir dari input formulir ke format "YYYY-MM-DD"
  const normalizedInputDob = normalizeDateInput(rawDob)
  if (!normalizedInputDob) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Format tanggal lahir tidak valid. Gunakan format YYYY-MM-DD.'
    })
  }

  // 3. Verifikasi ketersediaan Firebase Admin Firestore di server
  const db = getAdminFirestore()
  if (!db) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Layanan verifikasi pemilih sedang dalam persiapan. Kredensial Firebase Admin server belum dikonfigurasi.'
    })
  }

  // 4. Rate Limiting per IP dan per NIM (Proteksi Brute-Force)
  const clientIp = getRequestIP(event, { xForwardedFor: true }) || '127.0.0.1'
  const ipKey = hashRateLimitKey('ip_login', clientIp)
  const nimKey = hashRateLimitKey('nim_login', cleanNim)

  const ipLimit = await checkRateLimit(ipKey, 15, 300, 900)
  if (!ipLimit.allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: ipLimit.message || 'Terlalu banyak percobaan masuk dari alamat IP ini. Silakan coba kembali nanti.'
    })
  }

  const nimLimit = await checkRateLimit(nimKey, 8, 300, 900)
  if (!nimLimit.allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: nimLimit.message || 'Terlalu banyak percobaan masuk gagal untuk akun ini. Akun ditangguhkan sementara.'
    })
  }

  try {
    // 5. Validasi Dokumen NIM di koleksi 'master_students'
    const studentDocRef = db.collection('master_students').doc(cleanNim)
    const studentDocSnap = await studentDocRef.get()

    // [VALIDASI 1]: Jika dokumen NIM tidak ada
    if (!studentDocSnap.exists) {
      await recordFailedAttempt(ipKey, 15, 300, 900)
      await recordFailedAttempt(nimKey, 8, 300, 900)
      throw createError({
        statusCode: 404,
        statusMessage: 'NIM tidak terdaftar.'
      })
    }

    const studentData = studentDocSnap.data() || {}

    // 6. Validasi Field Tanggal Lahir di Database
    const rawDbBirthDate =
      studentData.birthDate ??
      studentData.birth_date ??
      studentData.tanggalLahir ??
      studentData.tanggal_lahir

    const normalizedDbDob = normalizeFirestoreBirthDate(rawDbBirthDate)

    // [VALIDASI 2]: Jika field tanggal lahir di database kosong / null / tidak valid
    if (!normalizedDbDob) {
      await recordFailedAttempt(ipKey, 15, 300, 900)
      throw createError({
        statusCode: 422,
        statusMessage: 'Data tanggal lahir belum tercatat.'
      })
    }

    // [VALIDASI 3]: Jika tanggal lahir dari form tidak cocok dengan hasil normalisasi dari database
    if (normalizedInputDob !== normalizedDbDob) {
      await recordFailedAttempt(ipKey, 15, 300, 900)
      await recordFailedAttempt(nimKey, 8, 300, 900)
      throw createError({
        statusCode: 401,
        statusMessage: 'Tanggal lahir yang dimasukkan salah.'
      })
    }

    // 7. Validasi Status Akun Mahasiswa
    const accountStatus = studentData.status_akun || studentData.accountStatus

    // [VALIDASI 4]: Jika status_akun atau accountStatus bukan "Aktif & Terverifikasi" atau "Aktif"
    if (accountStatus !== 'Aktif & Terverifikasi' && accountStatus !== 'Aktif') {
      await recordFailedAttempt(ipKey, 15, 300, 900)
      await recordFailedAttempt(nimKey, 8, 300, 900)
      throw createError({
        statusCode: 403,
        statusMessage: 'Akun Anda belum terverifikasi.'
      })
    }

    // 8. Ambil referensi agenda pemilihan aktif
    const activeElectionId = await resolveActiveElectionId(db)
    if (!activeElectionId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Tidak ada agenda pemilihan yang sedang aktif diselenggarakan saat ini.'
      })
    }

    const electionDocRef = db.collection('elections').doc(activeElectionId)
    const electionDocSnap = await electionDocRef.get()

    if (!electionDocSnap.exists) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Data agenda pemilihan aktif tidak ditemukan di sistem.'
      })
    }

    const electionData = electionDocSnap.data()

    // Validasi status pemilihan
    if (electionData?.status !== 'Berlangsung') {
      throw createError({
        statusCode: 400,
        statusMessage: `Agenda pemilihan "${electionData?.name || activeElectionId}" belum dimulai atau telah berakhir.`
      })
    }

    // 9. Validasi Kepesertaan dalam Daftar Pemilih Tetap (DPT) Terisolasi per Agenda Aktif
    const targetDptDocId = `${activeElectionId}_${cleanNim}`
    let dptSnap = await db.collection('election_dpt').doc(targetDptDocId).get()

    let dptData: Record<string, any> | null = null

    if (dptSnap.exists) {
      const data = dptSnap.data()
      // Pastikan electionId pada dokumen sama persis dengan activeElectionId
      if (data && String(data.electionId || '').trim() === activeElectionId) {
        dptData = data
      }
    }

    // Fallback: Jika ID komposit tidak ditemukan, cari dengan query terindeks ketat
    if (!dptData) {
      const dptQuerySnap = await db
        .collection('election_dpt')
        .where('electionId', '==', activeElectionId)
        .where('nim', '==', cleanNim)
        .limit(1)
        .get()

      if (!dptQuerySnap.empty) {
        dptSnap = dptQuerySnap.docs[0]
        dptData = dptSnap.data()
      }
    }

    // ── TAHAP 1: VALIDASI EKSISTENSI DPT (WAJIB SEBELUM CEK hasVoted) ──
    // Jika pemilih TIDAK ADA di DPT agenda aktif, LANGSUNG lempar error 403 dan hentikan proses!
    if (!dptData) {
      await recordFailedAttempt(ipKey, 15, 300, 900)
      await recordFailedAttempt(nimKey, 8, 300, 900)
      throw createError({
        statusCode: 403,
        statusMessage: 'Anda tidak terdaftar di DPT pemilihan ini.'
      })
    }

    // ── TAHAP 2: VALIDASI STATUS HAK SUARA (HANYA DIEVALUASI JIKA DPT SUDAH TERBUKTI ADA) ──
    if (dptData.hasVoted === true) {
      await recordFailedAttempt(ipKey, 15, 300, 900)
      await recordFailedAttempt(nimKey, 8, 300, 900)
      throw createError({
        statusCode: 403,
        statusMessage: 'Anda sudah menggunakan hak suara.'
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

    // Kembalikan profil pemilih ke browser
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
    // Teruskan H3Error (createError) apa adanya ke frontend
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
