import { getAdminFirestore } from '../../utils/firebaseAdmin'
import { getVoterSessionFromCookie } from '../../utils/voterSession'
import { resolveActiveElectionId } from '../../utils/activeElection'

export default defineEventHandler(async (event) => {
  const session = getVoterSessionFromCookie(event)
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesi pemilih tidak valid atau telah kedaluwarsa.'
    })
  }

  const db = getAdminFirestore()
  if (!db) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Database server belum siap.'
    })
  }

  const activeElectionId = await resolveActiveElectionId(db)
  if (!activeElectionId || activeElectionId !== session.electionId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Agenda pemilihan aktif tidak sesuai dengan sesi pemilih.'
    })
  }

  try {
    const snap = await db.collection('candidate_participations')
      .where('electionId', '==', activeElectionId)
      .where('isInBallot', '==', true)
      .where('status', '==', 'Terverifikasi KPU')
      .get()

    const candidates = snap.docs.map(doc => {
      const d = doc.data()
      return {
        id: doc.id,
        number: String(d.ballotNumber || '').padStart(2, '0'),
        title: String(d.name || `Kandidat #${d.ballotNumber || doc.id}`).trim(),
        fullName: String(d.fullName || d.name || '').trim(),
        facultyBadge: String(d.facultyBadge || 'Paslon Resmi').trim(),
        photo: String(d.photo || '').trim(),
        tagline: String(d.tagline || '').trim(),
        visi: String(d.visi || '').trim(),
        misi: Array.isArray(d.misi) ? d.misi : [],
        programKerja: Array.isArray(d.programKerja) ? d.programKerja : [],
        ketua: d.leadCandidate || d.ketua || { name: '-', nim: '-', prodi: '-' },
        wakil: d.viceCandidate || d.wakil || { name: '-', nim: '-', prodi: '-' }
      }
    }).sort((a, b) => a.number.localeCompare(b.number, undefined, { numeric: true }))

    return {
      success: true,
      electionId: activeElectionId,
      candidates
    }
  } catch (err: any) {
    console.error('[API /api/voter/candidates] Gagal membaca kandidat dari Firestore:', err.message || err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Gagal memuat data kandidat pemilihan dari server.'
    })
  }
})
