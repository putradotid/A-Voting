import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  type Firestore,
  type DocumentData
} from 'firebase/firestore'

export type ElectionStatus = 'Draft' | 'Terjadwal' | 'Berlangsung' | 'Selesai'

export interface Election {
  id: string
  name: string
  title?: string
  description: string
  organization: string
  position: string
  period: string
  level: string
  icon: string
  status: ElectionStatus
  startDate: string
  endDate: string
  candidates: number
  candidatesCount: number
  candidateLabel: string
  dptTarget: number // Target administratif yang ditetapkan panitia (SK KPU)
  dptCount?: number // Jumlah aktual pemilih yang terdaftar pada DPT pemilihan ini
  dptVoted: number
  turnout: number
  info: string
  quorumPercentage: number
  createdAt: string
  updatedAt?: string
}

export type ElectionDetail = Election

// ─── Transition Rules ────────────────────────────────────────────────
export const allowedTransitions: Record<ElectionStatus, ElectionStatus[]> = {
  Draft: ['Terjadwal'],
  Terjadwal: ['Berlangsung', 'Draft'],
  Berlangsung: ['Selesai'],
  Selesai: []
}

export function canTransitionStatus(currentStatus: ElectionStatus, targetStatus: ElectionStatus): boolean {
  if (currentStatus === targetStatus) return true
  const allowed = allowedTransitions[currentStatus] || []
  return allowed.includes(targetStatus)
}

export function getAvailableTransitions(currentStatus: ElectionStatus): ElectionStatus[] {
  const allowed = allowedTransitions[currentStatus] || []
  return [currentStatus, ...allowed]
}

// ─── Schedule & Date Helpers ─────────────────────────────────────────
export interface ElectionScheduleValidation {
  valid: boolean
  errors: {
    startDate?: string
    endDate?: string
  }
}

export function validateElectionSchedule(
  status: ElectionStatus,
  startDate?: string,
  endDate?: string
): ElectionScheduleValidation {
  const errors: { startDate?: string; endDate?: string } = {}

  if (status === 'Terjadwal' || status === 'Berlangsung') {
    if (!startDate || !startDate.trim()) {
      errors.startDate = 'Tanggal dan waktu mulai wajib diisi untuk status Terjadwal atau Berlangsung.'
    }
    if (!endDate || !endDate.trim()) {
      errors.endDate = 'Tanggal dan waktu selesai wajib diisi untuk status Terjadwal atau Berlangsung.'
    }
  }

  if (startDate && endDate) {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    if (isNaN(start)) {
      errors.startDate = 'Format tanggal mulai tidak valid.'
    }
    if (isNaN(end)) {
      errors.endDate = 'Format tanggal selesai tidak valid.'
    }
    if (!isNaN(start) && !isNaN(end) && end <= start) {
      errors.endDate = 'Tanggal selesai harus setelah tanggal mulai.'
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export function formatDatetimeLocal(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

// ─── Firestore Helpers ───────────────────────────────────────────────
export function normalizeFirestoreElection(id: string, data: DocumentData): Election {
  const parseDate = (val: any): string => {
    if (!val) return ''
    if (typeof val.toDate === 'function') {
      return val.toDate().toISOString()
    }
    if (typeof val === 'string') {
      return val
    }
    if (typeof val === 'number') {
      return new Date(val).toISOString()
    }
    return ''
  }

  const name = String(data.name || data.title || '').trim()
  const candidatesCount = typeof data.candidatesCount === 'number'
    ? data.candidatesCount
    : (typeof data.candidates === 'number' ? data.candidates : 0)

  return {
    id,
    name,
    title: String(data.title || name).trim(),
    description: String(data.description || '').trim(),
    organization: String(data.organization || 'Komisi Pemilihan Umum Mahasiswa').trim(),
    position: String(data.position || 'Ketua & Wakil Ketua').trim(),
    period: String(data.period || '2025/2026').trim(),
    level: String(data.level || 'Universitas').trim(),
    icon: String(data.icon || 'ballot').trim(),
    status: (data.status as ElectionStatus) || 'Draft',
    startDate: parseDate(data.startDate),
    endDate: parseDate(data.endDate),
    candidates: candidatesCount,
    candidatesCount,
    candidateLabel: String(data.candidateLabel || 'Calon').trim(),
    dptTarget: typeof data.dptTarget === 'number' ? data.dptTarget : Number(data.dptTarget) || 0,
    dptCount: typeof data.dptCount === 'number' ? data.dptCount : (data.dptCount !== undefined ? Number(data.dptCount) || 0 : undefined),
    dptVoted: typeof data.dptVoted === 'number' ? data.dptVoted : Number(data.dptVoted) || 0,
    turnout: typeof data.turnout === 'number' ? data.turnout : Number(data.turnout) || 0,
    info: String(data.info || '').trim(),
    quorumPercentage: typeof data.quorumPercentage === 'number' ? data.quorumPercentage : Number(data.quorumPercentage) || 50,
    createdAt: parseDate(data.createdAt) || new Date().toISOString(),
    updatedAt: data.updatedAt ? parseDate(data.updatedAt) : undefined
  }
}

export function cleanFirestorePayload(val: any): any {
  if (val === undefined) {
    return undefined
  }
  if (val === null || typeof val !== 'object') {
    return val
  }
  if (val instanceof Date) {
    return val
  }
  if (Array.isArray(val)) {
    return val
      .map(item => cleanFirestorePayload(item))
      .filter(item => item !== undefined)
  }
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(val)) {
    if (value === undefined) {
      continue
    }
    const cleaned = cleanFirestorePayload(value)
    if (cleaned !== undefined) {
      result[key] = cleaned
    }
  }
  return result
}

export const useElections = () => {
  const nuxtApp = useNuxtApp()

  const getDb = (): Firestore | null => {
    if (!import.meta.client) return null
    try {
      return (nuxtApp.$firestore || nuxtApp.$db) as Firestore | null
    } catch {
      return null
    }
  }

  // ── Database State: Dimulai dari kosong (Firestore adalah single source of truth) ──
  const elections = useState<Election[]>('electionsDatabase', () => [])
  const activeElectionId = useState<string | null>('activeElectionId', () => null)
  const electionsLoading = useState<boolean>('electionsLoading', () => false)
  const electionsError = useState<string | null>('electionsError', () => null)
  const electionsLoaded = useState<boolean>('electionsLoaded', () => false)

  // ── Read: Fetch All Elections ───────────────────────────────────────
  async function fetchElections(force = false): Promise<Election[]> {
    if (!import.meta.client) {
      return elections.value
    }
    if (electionsLoaded.value && !force && elections.value.length > 0) {
      // Pastikan data di memori tetap unik dari kemungkinan sisa duplikasi lama
      const seen = new Set<string>()
      const sanitized: Election[] = []
      let hadDuplicates = false
      for (const item of elections.value) {
        if (!seen.has(item.id)) {
          seen.add(item.id)
          sanitized.push(item)
        } else {
          hadDuplicates = true
        }
      }
      if (hadDuplicates) {
        elections.value = sanitized
      }
      return elections.value
    }

    const db = getDb()
    if (!db) {
      electionsError.value = 'Layanan Cloud Firestore belum siap atau tidak tersedia di klien.'
      electionsLoading.value = false
      return elections.value
    }

    electionsLoading.value = true
    electionsError.value = null

    try {
      const colRef = collection(db, 'elections')
      const snapshot = await getDocs(colRef)
      const loaded: Election[] = snapshot.docs.map(docSnap => {
        return normalizeFirestoreElection(docSnap.id, docSnap.data())
      })

      // Urutkan agenda: status Berlangsung > Terjadwal > Draft > Selesai, lalu createdAt desc
      const statusWeight: Record<ElectionStatus, number> = {
        Berlangsung: 4,
        Terjadwal: 3,
        Draft: 2,
        Selesai: 1
      }
      loaded.sort((a, b) => {
        const diffStatus = (statusWeight[b.status] || 0) - (statusWeight[a.status] || 0)
        if (diffStatus !== 0) return diffStatus
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })

      // Deduplikasi data unik berdasarkan ID sebelum menetapkan elections.value
      const seenIds = new Set<string>()
      const uniqueLoaded: Election[] = []
      for (const item of loaded) {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id)
          uniqueLoaded.push(item)
        }
      }

      elections.value = uniqueLoaded
      electionsLoaded.value = true
      return uniqueLoaded
    } catch (err: any) {
      console.error('[useElections] Gagal membaca koleksi elections dari Firestore:', err)
      let msg = err.message || 'Gagal memuat agenda pemilihan dari Cloud Firestore.'
      if (err.code === 'permission-denied') {
        msg = 'Akses Firestore ditolak (Permission Denied). Pastikan akun Anda memiliki akses admin.'
      } else if (err.code === 'unavailable') {
        msg = 'Tidak dapat terhubung ke Cloud Firestore. Periksa koneksi internet Anda.'
      }
      electionsError.value = msg
      return elections.value
    } finally {
      electionsLoading.value = false
    }
  }

  // ── Read: Fetch Single Election by ID ──────────────────────────────
  async function fetchElectionById(id: string): Promise<Election | null> {
    if (!id) return null

    // Cek di memori terlebih dahulu jika sudah pernah dimuat
    const existing = elections.value.find(e => e.id === id)
    if (existing && electionsLoaded.value) {
      return existing
    }

    const db = getDb()
    if (!db) return existing || null

    electionsLoading.value = true
    try {
      const docRef = doc(db, 'elections', id)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        return null
      }
      const loaded = normalizeFirestoreElection(docSnap.id, docSnap.data())
      const idx = elections.value.findIndex(e => e.id === id)
      if (idx !== -1) {
        elections.value[idx] = loaded
      } else {
        elections.value.push(loaded)
      }
      return loaded
    } catch (err: any) {
      console.error(`[useElections] Gagal membaca pemilihan #${id} dari Firestore:`, err)
      return existing || null
    } finally {
      electionsLoading.value = false
    }
  }

  // ── Read: Fetch Active Election Reference ───────────────────────────
  async function fetchActiveElection(force = false): Promise<string | null> {
    if (!import.meta.client) {
      return activeElectionId.value
    }

    const db = getDb()
    if (!db) return activeElectionId.value

    try {
      const docRef = doc(db, 'system_settings', 'active_election')
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        activeElectionId.value = null
        return null
      }

      const data = docSnap.data()
      const targetId = data?.activeElectionId as string | null | undefined
      if (!targetId) {
        activeElectionId.value = null
        return null
      }

      // Validasi konsistensi status pemilihan: jika berstatus Selesai, batalkan aktif
      const election = elections.value.find(e => e.id === targetId)
      if (election && election.status === 'Selesai') {
        activeElectionId.value = null
        // Perbarui Firestore secara konsisten
        await setDoc(docRef, {
          activeElectionId: null,
          updatedAt: new Date().toISOString()
        }, { merge: true })
        return null
      }

      activeElectionId.value = targetId
      return targetId
    } catch (err: any) {
      console.error('[useElections] Gagal membaca system_settings/active_election:', err)
      return activeElectionId.value
    }
  }

  // ─── Active Election Management ────────────────────────────────────
  function getActiveElectionId(): string | null {
    return activeElectionId.value
  }

  function getActiveElection(): Election | null {
    if (!activeElectionId.value) return null
    const found = getElectionById(activeElectionId.value)
    if (!found) {
      return null
    }
    if (found.status === 'Selesai') {
      return null
    }
    return found
  }

  function isActiveElection(id: string): boolean {
    if (!activeElectionId.value || !id) return false
    return activeElectionId.value === id
  }

  async function setActiveElection(id: string | null): Promise<{ success: boolean; message: string }> {
    const db = getDb()

    if (!id) {
      activeElectionId.value = null
      if (db) {
        try {
          const docRef = doc(db, 'system_settings', 'active_election')
          await setDoc(docRef, {
            activeElectionId: null,
            updatedAt: new Date().toISOString()
          }, { merge: true })
        } catch (err: any) {
          console.error('[useElections] Gagal menonaktifkan pemilihan aktif di Firestore:', err)
          return { success: false, message: `Gagal memperbarui Firestore: ${err.message}` }
        }
      }
      return { success: true, message: 'Penetapan pemilihan aktif berhasil dinonaktifkan.' }
    }

    const target = getElectionById(id)
    if (!target) {
      return { success: false, message: 'Pemilihan tidak ditemukan.' }
    }

    // Aturan 1: Pemilihan yang ditetapkan aktif harus berstatus Berlangsung
    if (target.status !== 'Berlangsung') {
      return {
        success: false,
        message: `Pemilihan berstatus "${target.status}" tidak dapat ditetapkan sebagai pemilihan aktif. Hanya pemilihan berstatus "Berlangsung" yang dapat dijadikan pemilihan aktif.`
      }
    }

    // Aturan 2: Pemilihan yang ditetapkan aktif harus memenuhi validasi rentang jadwal jika ada
    if (target.startDate && target.endDate) {
      const now = Date.now()
      const start = new Date(target.startDate).getTime()
      const end = new Date(target.endDate).getTime()
      if (!isNaN(start) && now < start) {
        return {
          success: false,
          message: 'Pemilihan belum mencapai waktu mulai pelaksanaan yang dijadwalkan.'
        }
      }
      if (!isNaN(end) && now > end) {
        return {
          success: false,
          message: 'Pemilihan telah melewati batas waktu selesai pelaksanaan.'
        }
      }
    }

    activeElectionId.value = id

    if (db) {
      try {
        const docRef = doc(db, 'system_settings', 'active_election')
        await setDoc(docRef, {
          activeElectionId: id,
          electionName: target.name,
          updatedAt: new Date().toISOString()
        }, { merge: true })
      } catch (err: any) {
        console.error('[useElections] Gagal menyimpan pemilihan aktif ke Firestore:', err)
        return { success: false, message: `Gagal memperbarui Firestore: ${err.message}` }
      }
    }

    return { success: true, message: `Pemilihan "${target.name}" berhasil ditetapkan sebagai pemilihan aktif.` }
  }

  // ─── Synchronous Getters ───────────────────────────────────────────
  function getElectionById(id: string): Election | undefined {
    const found = elections.value.find(e => e.id === id)
    if (!found) return undefined
    if (!found.title) {
      found.title = found.name
    }
    return found
  }

  function generateElectionId(): string {
    const currentYear = new Date().getFullYear()
    const regex = new RegExp(`PEM-${currentYear}-(\\d+)`)
    let maxNum = 0
    for (const e of elections.value) {
      const match = e.id.match(regex)
      if (match) {
        const num = parseInt(match[1], 10)
        if (num > maxNum) maxNum = num
      }
    }
    const nextNum = maxNum + 1
    return `PEM-${currentYear}-${String(nextNum).padStart(2, '0')}`
  }

  // ─── CRUD Operations ───────────────────────────────────────────────
  async function addElection(data: Partial<Election> & { name?: string; title?: string; level?: string }): Promise<Election> {
    const id = data.id || generateElectionId()

    // 1. Validasi deduplikasi pada state lokal
    if (elections.value.some(e => e.id === id)) {
      throw new Error(`Pemilihan dengan ID "${id}" sudah terdaftar dalam sistem.`)
    }

    const now = new Date().toISOString()
    const candidatesCount = data.candidatesCount ?? data.candidates ?? 0
    const resolvedName = (data.name || (data as any).title || 'Pemilihan Baru').trim()
    const resolvedLevel = (data.level || 'Universitas').trim()
    const newElection: Election = {
      id,
      name: resolvedName,
      title: resolvedName,
      description: data.description?.trim() || '',
      organization: data.organization?.trim() || 'Komisi Pemilihan Umum Mahasiswa',
      position: data.position?.trim() || 'Ketua & Wakil Ketua',
      period: data.period?.trim() || '2025/2026',
      level: resolvedLevel,
      icon: data.icon || 'ballot',
      status: data.status || (data.startDate && data.endDate ? 'Terjadwal' : 'Draft'),
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      candidates: candidatesCount,
      candidatesCount: candidatesCount,
      candidateLabel: data.candidateLabel || 'Calon',
      dptTarget: data.dptTarget ?? 0,
      dptCount: data.dptCount ?? 0,
      dptVoted: data.dptVoted ?? 0,
      turnout: data.turnout ?? 0,
      quorumPercentage: data.quorumPercentage ?? 50,
      info: data.info || (data.startDate && data.endDate ? '' : 'Persiapan awal, berkas belum dilengkapi'),
      createdAt: now,
      updatedAt: now
    }

    const db = getDb()
    if (db) {
      const docRef = doc(db, 'elections', id)
      // 2. Cegah penimpaan data Firestore yang sudah ada jika terjadi konflik ID
      const existingDoc = await getDoc(docRef)
      if (existingDoc.exists()) {
        throw new Error(`Pemilihan dengan ID "${id}" sudah ada di database Cloud Firestore.`)
      }
      const payload = cleanFirestorePayload(newElection)
      await setDoc(docRef, payload)
    }

    // 3. Masukkan ke state lokal dengan proteksi deduplikasi
    if (!elections.value.some(e => e.id === id)) {
      elections.value.unshift(newElection)
    }
    return newElection
  }

  async function updateElection(id: string, updates: Partial<Election>): Promise<{ success: boolean; message: string; data?: Election }> {
    const idx = elections.value.findIndex(e => e.id === id)
    if (idx === -1) {
      return { success: false, message: 'Pemilihan tidak ditemukan.' }
    }

    const existing = elections.value[idx]

    // 1. Validate status transition
    if (updates.status && updates.status !== existing.status) {
      if (!canTransitionStatus(existing.status, updates.status)) {
        const allowed = allowedTransitions[existing.status].join(', ') || 'tidak ada (status akhir)'
        return {
          success: false,
          message: `Transisi status tidak valid: dari "${existing.status}" ke "${updates.status}". Transisi yang diizinkan: ${allowed}.`
        }
      }
    }

    // 2. Validate schedule
    const targetStatus = updates.status || existing.status
    const targetStart = updates.startDate !== undefined ? updates.startDate : existing.startDate
    const targetEnd = updates.endDate !== undefined ? updates.endDate : existing.endDate

    const scheduleVal = validateElectionSchedule(targetStatus, targetStart, targetEnd)
    if (!scheduleVal.valid) {
      const firstErr = Object.values(scheduleVal.errors)[0]
      return { success: false, message: firstErr || 'Jadwal pemilihan tidak valid.' }
    }

    // 3. Clear active election if updated to Selesai
    const db = getDb()
    if (updates.status === 'Selesai' && activeElectionId.value === id) {
      activeElectionId.value = null
      if (db) {
        try {
          const docRef = doc(db, 'system_settings', 'active_election')
          await setDoc(docRef, {
            activeElectionId: null,
            updatedAt: new Date().toISOString()
          }, { merge: true })
        } catch (err: any) {
          console.error('[useElections] Gagal memperbarui status aktif di system_settings:', err)
        }
      }
    }

    const candidatesCount = updates.candidatesCount ?? updates.candidates ?? existing.candidatesCount ?? existing.candidates

    const updated: Election = {
      ...existing,
      ...updates,
      candidates: candidatesCount,
      candidatesCount: candidatesCount,
      updatedAt: new Date().toISOString()
    }

    if (db) {
      try {
        const docRef = doc(db, 'elections', id)
        const payload = cleanFirestorePayload(updated)
        await setDoc(docRef, payload, { merge: true })
      } catch (err: any) {
        console.error('[useElections] Gagal memperbarui pemilihan di Firestore:', err)
        const msg = err.code === 'permission-denied'
          ? 'Gagal memperbarui di Firestore: Akses ditolak (Permission Denied).'
          : (err.message || 'Terjadi kesalahan saat memperbarui data pemilihan.')
        return { success: false, message: msg }
      }
    }

    elections.value[idx] = updated
    return { success: true, message: 'Pemilihan berhasil diperbarui.', data: updated }
  }

  async function deleteElection(id: string): Promise<{ success: boolean; message: string }> {
    const election = getElectionById(id)
    if (!election) {
      return { success: false, message: 'Pemilihan tidak ditemukan.' }
    }

    if (election.status !== 'Draft') {
      return {
        success: false,
        message: `Pemilihan berstatus "${election.status}" tidak dapat dihapus. Hanya pemilihan berstatus Draft yang dapat dihapus.`
      }
    }

    const db = getDb()
    if (db) {
      try {
        const docRef = doc(db, 'elections', id)
        await deleteDoc(docRef)
      } catch (err: any) {
        console.error('[useElections] Gagal menghapus draft pemilihan dari Firestore:', err)
        const msg = err.code === 'permission-denied'
          ? 'Gagal menghapus dari Firestore: Akses ditolak (Permission Denied).'
          : (err.message || 'Terjadi kesalahan saat menghapus draft pemilihan.')
        return { success: false, message: msg }
      }
    }

    const idx = elections.value.findIndex(e => e.id === id)
    if (idx !== -1) {
      elections.value.splice(idx, 1)
    }

    // Clear active status if this was the active election
    if (activeElectionId.value === id) {
      activeElectionId.value = null
      if (db) {
        try {
          const docRef = doc(db, 'system_settings', 'active_election')
          await setDoc(docRef, {
            activeElectionId: null,
            updatedAt: new Date().toISOString()
          }, { merge: true })
        } catch {}
      }
    }

    return { success: true, message: `Draft pemilihan "${election.name}" berhasil dihapus.` }
  }

  return {
    elections,
    activeElectionId,
    electionsLoading,
    electionsError,
    electionsLoaded,
    fetchElections,
    fetchActiveElection,
    fetchElectionById,
    getElectionById,
    getActiveElectionId,
    getActiveElection,
    isActiveElection,
    setActiveElection,
    generateElectionId,
    addElection,
    updateElection,
    deleteElection
  }
}
