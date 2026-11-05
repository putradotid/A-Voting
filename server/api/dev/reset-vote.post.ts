import { getAdminFirestore } from '../../utils/firebaseAdmin'
import { resolveActiveElectionId } from '../../utils/activeElection'

export default defineEventHandler(async (event) => {
  const body = await readBody(event).catch(() => ({}))
  const rawNim = String(body?.nim || '2108101001').trim()
  const cleanNim = rawNim.replace(/[^a-zA-Z0-9.-]/g, '')

  // 1. Validasi Keberadaan Input NIM
  if (!cleanNim) {
    throw createError({
      statusCode: 400,
      statusMessage: 'NIM wajib diisi.'
    })
  }

  // 2. Verifikasi Ketersediaan Firebase Admin Firestore
  const db = getAdminFirestore()
  if (!db) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Layanan Firebase Admin di server belum siap atau belum terkonfigurasi.'
    })
  }

  // 3. Cari Agenda Pemilihan Aktif
  let activeElectionId = await resolveActiveElectionId(db)

  // Fallback: cari di koleksi 'elections' dengan status 'Berlangsung'
  if (!activeElectionId) {
    const activeElectionQuery = await db
      .collection('elections')
      .where('status', '==', 'Berlangsung')
      .limit(1)
      .get()

    if (!activeElectionQuery.empty) {
      activeElectionId = activeElectionQuery.docs[0].id
    }
  }

  if (!activeElectionId) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Tidak ditemukan agenda pemilihan yang sedang berstatus "Berlangsung".'
    })
  }

  // 4. Cari Dokumen DPT Pemilih
  // Format ID primer: `${activeElectionId}_${cleanNim}`
  const dptDocRef = db.collection('election_dpt').doc(`${activeElectionId}_${cleanNim}`)
  let dptSnap = await dptDocRef.get()
  let targetRef = dptDocRef

  // Fallback query jika ID dokumen bukan pola gabungan
  if (!dptSnap.exists) {
    const dptQuery = await db
      .collection('election_dpt')
      .where('electionId', '==', activeElectionId)
      .where('nim', '==', cleanNim)
      .limit(1)
      .get()

    if (!dptQuery.empty) {
      dptSnap = dptQuery.docs[0]
      targetRef = dptSnap.ref
    }
  }

  // Jika data DPT pemilih tidak ditemukan
  if (!dptSnap.exists) {
    throw createError({
      statusCode: 404,
      statusMessage: `Data DPT untuk NIM "${cleanNim}" pada agenda pemilihan "${activeElectionId}" tidak ditemukan.`
    })
  }

  // 5. Update Field hasVoted Menjadi false
  await targetRef.update({
    hasVoted: false,
    votedAt: null,
    receiptToken: null,
    updatedAt: new Date().toISOString()
  })

  return {
    success: true,
    message: `Status hak suara pemilih NIM ${cleanNim} berhasil di-reset menjadi BELUM memilih (hasVoted = false).`,
    data: {
      nim: cleanNim,
      electionId: activeElectionId,
      dptId: targetRef.id,
      hasVoted: false
    }
  }
})

