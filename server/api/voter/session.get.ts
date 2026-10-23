import {
  getVoterSessionFromCookie,
  clearVoterSessionCookie
} from '../../utils/voterSession'
import { getAdminFirestore } from '../../utils/firebaseAdmin'
import { resolveActiveElectionId } from '../../utils/activeElection'

export default defineEventHandler(async (event) => {
  const session = getVoterSessionFromCookie(event)

  if (!session) {
    return {
      authenticated: false,
      voter: null,
      reason: 'unauthenticated'
    }
  }

  const db = getAdminFirestore()

  // Jika Firestore Admin tersedia, validasi ketat status pemilihan dan hak suara real-time
  if (db) {
    try {
      // 1. Validasi apakah agenda pemilihan pada sesi masih merupakan agenda aktif di sistem
      const activeElectionId = await resolveActiveElectionId(db)
      if (!activeElectionId) {
        clearVoterSessionCookie(event)
        return {
          authenticated: false,
          voter: null,
          reason: 'no_active_election'
        }
      }

      if (activeElectionId !== session.electionId) {
        // Agenda pemilihan aktif telah berganti ke agenda lain, sesi lama dibatalkan
        clearVoterSessionCookie(event)
        return {
          authenticated: false,
          voter: null,
          reason: 'election_changed'
        }
      }

      // 2. Validasi apakah pemilihan terkait masih berstatus 'Berlangsung'
      const electionDocSnap = await db.collection('elections').doc(session.electionId).get()
      if (!electionDocSnap.exists) {
        clearVoterSessionCookie(event)
        return {
          authenticated: false,
          voter: null,
          reason: 'election_not_found'
        }
      }

      const electionData = electionDocSnap.data()
      if (electionData?.status !== 'Berlangsung') {
        // Pemilihan telah ditutup atau selesai, batalkan sesi bilik suara
        clearVoterSessionCookie(event)
        return {
          authenticated: false,
          voter: null,
          reason: 'election_not_ongoing'
        }
      }

      // Validasi batas waktu pemungutan suara jika tersedia
      if (electionData?.startDate && electionData?.endDate) {
        const now = Date.now()
        const start = new Date(electionData.startDate).getTime()
        const end = new Date(electionData.endDate).getTime()

        if ((!isNaN(start) && now < start) || (!isNaN(end) && now > end)) {
          clearVoterSessionCookie(event)
          return {
            authenticated: false,
            voter: null,
            reason: 'election_time_expired'
          }
        }
      }

      // 3. Validasi keberadaan DPT dan status hasVoted terikat pada pemilihan aktif
      const dptDocId = session.dptId || `${session.electionId}_${session.nim}`
      const dptDocRef = db.collection('election_dpt').doc(dptDocId)
      const dptSnap = await dptDocRef.get()

      if (!dptSnap.exists) {
        clearVoterSessionCookie(event)
        return {
          authenticated: false,
          voter: null,
          reason: 'dpt_not_found'
        }
      }

      const dptData = dptSnap.data()
      if (dptData?.electionId && dptData.electionId !== session.electionId) {
        clearVoterSessionCookie(event)
        return {
          authenticated: false,
          voter: null,
          reason: 'dpt_election_mismatch'
        }
      }

      const currentHasVoted = dptData?.hasVoted === true
      let receipt = null

      if (currentHasVoted) {
        const token = typeof dptData?.voterReceiptToken === 'string' ? dptData.voterReceiptToken.trim() : ''
        if (token) {
          receipt = {
            receiptToken: token,
            votedAt: dptData?.votedAt || null,
            electionId: session.electionId,
            electionName: session.electionName,
            voter: {
              nim: session.nim,
              name: session.name,
              faculty: session.faculty,
              major: session.major
            }
          }
        } else {
          console.error('[AUDIT_INTEGRITY] Sinkronisasi sesi: Status DPT hasVoted=true namun voterReceiptToken tidak valid atau kosong.')
        }
      }

      return {
        authenticated: true,
        voter: {
          nim: session.nim,
          name: session.name,
          faculty: session.faculty,
          major: session.major,
          electionId: session.electionId,
          electionName: session.electionName,
          hasVoted: currentHasVoted
        },
        receipt
      }
    } catch (err: any) {
      console.warn('[API /api/voter/session] Kendala saat sinkronisasi status sesi dengan Firestore:', err.message || err)
    }
  }

  // Fallback jika Firestore Admin belum terkonfigurasi (verifikasi berbasis token terenkripsi)
  return {
    authenticated: true,
    voter: {
      nim: session.nim,
      name: session.name,
      faculty: session.faculty,
      major: session.major,
      electionId: session.electionId,
      electionName: session.electionName,
      hasVoted: session.hasVoted
    }
  }
})
