import { getAdminFirestore } from '../../utils/firebaseAdmin'
import {
  getVoterSessionFromCookie,
  setVoterSessionCookie,
  validateCsrfToken,
  type VoterSessionPayload
} from '../../utils/voterSession'
import { resolveActiveElectionId } from '../../utils/activeElection'
import {
  checkRateLimit,
  recordFailedAttempt,
  hashRateLimitKey
} from '../../utils/rateLimit'
import { createHmac, randomBytes, createHash } from 'node:crypto'
import { FieldValue } from 'firebase-admin/firestore'

export default defineEventHandler(async (event) => {
  // 1. Validasi Sesi Pemilih & Token Kedaluwarsa
  const session = getVoterSessionFromCookie(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesi pemilih tidak valid atau telah kedaluwarsa. Silakan masuk kembali.'
    })
  }

  // 2. Validasi Proteksi CSRF
  const isCsrfValid = validateCsrfToken(event, session)
  if (!isCsrfValid) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Token keamanan CSRF tidak valid atau tidak cocok.'
    })
  }

  // 3. Baca Body Permintaan
  const body = await readBody(event).catch(() => ({}))
  const candidateId = String(body?.candidateId || '').trim()

  if (!candidateId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Pilihan kandidat wajib ditentukan.'
    })
  }

  // 3b. Rate Limiting Request Pemungutan Suara (Mencegah spam & transaction contention)
  // Menggunakan key berbasis session CSRF token tanpa memuat NIM/PII
  const voteRateKey = hashRateLimitKey('vote_rate', session.csrfToken)
  const voteLimit = await checkRateLimit(voteRateKey, 5, 60, 60)
  if (!voteLimit.allowed) {
    throw createError({
      statusCode: 429,
      statusMessage: voteLimit.message || 'Terlalu banyak permintaan pemungutan suara. Silakan tunggu beberapa saat.'
    })
  }
  await recordFailedAttempt(voteRateKey, 5, 60, 60)

  // 4. Verifikasi Ketersediaan Firebase Admin SDK
  const db = getAdminFirestore()
  if (!db) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Layanan pemungutan suara sedang dalam persiapan. Database server belum siap.'
    })
  }

  // 5. Validasi Agenda Aktif & Sesi
  const activeElectionId = await resolveActiveElectionId(db)
  if (!activeElectionId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tidak ada agenda pemilihan yang sedang aktif diselenggarakan saat ini.'
    })
  }

  if (activeElectionId !== session.electionId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Agenda pemilihan aktif telah berganti. Sesi Anda tidak sesuai dengan pemilihan ini.'
    })
  }

  // 6. Transaksi Atomik Firestore
  const dptDocId = session.dptId || `${session.electionId}_${session.nim}`
  const dptRef = db.collection('election_dpt').doc(dptDocId)
  const candidateRef = db.collection('candidate_participations').doc(candidateId)
  const electionRef = db.collection('elections').doc(session.electionId)

  const sessionSecret = process.env.VOTER_SESSION_SECRET || 'a-voting-dev-secret-key-minimum-32-chars-for-local-testing-only'

  try {
    const transactionResult = await db.runTransaction(async (transaction) => {
      // ── SEMUA PEMBACAAN DILAKUKAN SEBELUM OPERASI PENULISAN ────────────────
      const [dptSnap, candidateSnap, electionSnap] = await Promise.all([
        transaction.get(dptRef),
        transaction.get(candidateRef),
        transaction.get(electionRef)
      ])

      // a. Validasi Keberadaan Dokumen DPT
      if (!dptSnap.exists) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Data pemilih tidak ditemukan dalam Daftar Pemilih Tetap (DPT) agenda ini.'
        })
      }

      const dptData = dptSnap.data()!

      // b. Validasi Agenda Pemilihan
      if (!electionSnap.exists) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Data agenda pemilihan aktif tidak ditemukan di sistem.'
        })
      }

      const electionData = electionSnap.data()!
      if (electionData.status !== 'Berlangsung') {
        throw createError({
          statusCode: 400,
          statusMessage: `Agenda pemilihan "${electionData.name || session.electionId}" saat ini tidak sedang berlangsung.`
        })
      }

      if (electionData.startDate && electionData.endDate) {
        const nowMs = Date.now()
        const start = new Date(electionData.startDate).getTime()
        const end = new Date(electionData.endDate).getTime()

        if (!isNaN(start) && nowMs < start) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Waktu pemungutan suara pemilihan belum dibuka.'
          })
        }

        if (!isNaN(end) && nowMs > end) {
          throw createError({
            statusCode: 400,
            statusMessage: 'Waktu pemungutan suara pemilihan telah berakhir.'
          })
        }
      }

      // c. Penanganan Idempoten: Cek Apakah Pemilih Sudah Memilih
      if (dptData.hasVoted === true) {
        // Pemulihan Permintaan Idempoten:
        // Jika suara sudah tercatat, kembalikan tanda terima yang ada TANPA mencatat suara kedua
        // dan TANPA menambah counter apa pun!
        const existingToken = typeof dptData.voterReceiptToken === 'string' ? dptData.voterReceiptToken.trim() : ''
        if (!existingToken) {
          console.error('[AUDIT_INTEGRITY] Anomali data terdeteksi: Dokumen DPT bertanda hasVoted=true namun voterReceiptToken kosong.')
          throw createError({
            statusCode: 409,
            statusMessage: 'Status hak suara Anda telah tercatat sebelumnya, namun bukti tanda terima mengalami inkonsistensi data. Silakan hubungi Panitia Pemilihan (KPU-M).'
          })
        }

        console.info('[API /api/voter/vote] Permintaan idempoten terdeteksi. Mengembalikan tanda terima yang sudah ada.')
        return {
          alreadyVoted: true,
          receiptToken: existingToken,
          votedAt: dptData.votedAt || new Date().toISOString(),
          electionId: session.electionId,
          electionName: session.electionName
        }
      }

      // d. Validasi Keabsahan Kandidat pada Database Firestore
      if (!candidateSnap.exists) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Kandidat yang dipilih tidak terdaftar di sistem.'
        })
      }

      const candData = candidateSnap.data()!
      if (candData.electionId !== session.electionId) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Kandidat yang dipilih tidak terdaftar pada agenda pemilihan ini.'
        })
      }

      if (candData.status !== 'Terverifikasi KPU' || candData.isInBallot !== true) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Kandidat yang dipilih tidak memenuhi syarat keikutsertaan surat suara.'
        })
      }

      // ── SEMUA OPERASI PENULISAN ATOMIK ────────────────────────────────────
      const now = new Date()
      const nowIso = now.toISOString()

      // 1. Tanda Terima Partisipasi Pemilih (Hanya membuktikan partisipasi, BUKAN pilihan kandidat)
      const voterReceiptToken = createHmac('sha256', sessionSecret)
        .update(`${session.electionId}:${session.nim}:${dptData.generation || 'gen'}:${nowIso}`)
        .digest('hex')

      // 2. Kunci Status DPT Pemilih
      transaction.update(dptRef, {
        hasVoted: true,
        votedAt: nowIso,
        voterReceiptToken: voterReceiptToken,
        updatedAt: nowIso
      })

      // 3. Surat Suara Anonim (Decoupled Anonymous Ballot)
      // Dilarang keras menyimpan NIM, Nama, IP, atau DPT ID pada dokumen ini!
      // Dilarang keras menyimpan voterReceiptToken pada dokumen ini!
      const randomVoteId = randomBytes(16).toString('hex')
      const ballotSerialHash = createHash('sha256')
        .update(randomBytes(32))
        .digest('hex')

      // Resolusi fuzzy timestamp (pembulatan ke jam) untuk mitigasi korelasi temporal
      const fuzzyHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()).toISOString()

      const voteRef = db.collection('election_votes').doc(randomVoteId)
      transaction.set(voteRef, {
        id: randomVoteId,
        electionId: session.electionId,
        candidateId: candidateId,
        ballotSerialHash: ballotSerialHash,
        ballotTimestamp: fuzzyHour,
        isSimulated: Boolean(electionData.isSimulated || dptData.isSimulated)
      })

      // 4. Perbarui Counter Agregat
      transaction.update(candidateRef, {
        votesCount: FieldValue.increment(1),
        updatedAt: nowIso
      })

      transaction.update(electionRef, {
        dptVoted: FieldValue.increment(1),
        updatedAt: nowIso
      })

      return {
        alreadyVoted: false,
        receiptToken: voterReceiptToken,
        votedAt: nowIso,
        electionId: session.electionId,
        electionName: session.electionName
      }
    })

    // 7. Perbarui Cookie Sesi Pemilih (hasVoted: true) di luar callback transaksi
    const updatedPayload: VoterSessionPayload = {
      ...session,
      hasVoted: true
    }
    setVoterSessionCookie(event, updatedPayload)

    // 8. Kembalikan Respons Tanda Terima Partisipasi ke Klien
    return {
      success: true,
      alreadyVoted: transactionResult.alreadyVoted,
      message: transactionResult.alreadyVoted
        ? 'Hak suara Anda telah berhasil dicatat sebelumnya.'
        : 'Suara Anda telah berhasil dicatat dan hak suara Anda telah tersegel secara sah.',
      receiptToken: transactionResult.receiptToken,
      receipt: {
        receiptToken: transactionResult.receiptToken,
        votedAt: transactionResult.votedAt,
        electionId: transactionResult.electionId,
        electionName: transactionResult.electionName,
        voter: {
          nim: session.nim,
          name: session.name,
          faculty: session.faculty,
          major: session.major
        }
      }
    }
  } catch (err: any) {
    if (err.statusCode) {
      throw err
    }
    console.error('[API /api/voter/vote] Terjadi kendala saat memproses transaksi suara:', err.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Terjadi kendala pada server saat memproses surat suara Anda.'
    })
  }
})
