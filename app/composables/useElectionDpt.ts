import {
  collection,
  doc,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
  type Firestore,
  type DocumentData
} from 'firebase/firestore'
import { useStudentsMaster, type StudentMaster } from './useStudentsMaster'

// ─── Interfaces ──────────────────────────────────────────────────────────────

/**
 * Model dokumen DPT ternormalisasi.
 * Hanya menyimpan relasi pemilihan, NIM mahasiswa, dan atribut partisipasi hak suara.
 */
export interface ElectionDptEntry {
  id: string            // Deterministik: `${electionId}_${nim}`
  electionId: string    // Referensi ke agenda pemilihan di koleksi 'elections'
  nim: string           // Foreign Key utama ke koleksi 'master_students'
  hasVoted: boolean     // Status apakah pemilih sudah mencoblos di bilik suara
  votedAt?: string      // Timestamp ISO saat surat suara berhasil direkam
  tokenSent: boolean    // Status kesiapan / pengiriman token bilik suara
  assignedAt: string    // Tanggal / waktu penetapan mahasiswa ke dalam DPT
  assignedBy?: string   // Email admin yang menetapkan pemilih
  createdAt?: string    // Timestamp ISO saat dokumen DPT dibuat
  updatedAt?: string    // Timestamp ISO saat dokumen DPT diperbarui
  studentId?: string    // Kompatibilitas mundur dengan komponen lama (e.g. MHS-xxx)
}

/**
 * Tipe payload dokumen yang disimpan langsung ke Cloud Firestore collection `election_dpt`.
 */
export interface ElectionDptDocument {
  id: string
  electionId: string
  nim: string
  hasVoted: boolean
  votedAt?: string
  tokenSent: boolean
  assignedAt: string
  assignedBy?: string
  createdAt: string
  updatedAt: string
  studentId?: string
}

/**
 * Tampilan gabungan (hydrated view) DPT dengan Master Mahasiswa untuk konsumsi UI.
 */
export interface ElectionVoterDetail {
  dptId: string
  electionId: string
  studentId: string
  nim: string
  name: string
  initials: string
  avatarColor: string
  email: string
  faculty: string
  facultyCode: string
  major: string
  academicYear: string
  semester: number
  academicStatus: string
  accountStatus: string
  hasVoted: boolean
  votedAt?: string
  tokenSent: boolean
  assignedAt: string
  assignedBy?: string
  isOrphaned?: boolean        // Flag jika profil mahasiswa tidak ditemukan di master
  relationalError?: string    // Catatan kegagalan relasi master
}

export interface AssignDptErrorItem {
  identifier: string
  nim?: string
  code: string
  message: string
}

export interface AssignDptResult {
  success: boolean
  added: number
  skipped: number
  total: number
  errors: AssignDptErrorItem[]
}

/**
 * Tipe return yang mendukung pemanggilan sinkron (kompatibilitas template lama)
 * sekaligus pemanggilan berbasis Promise/await untuk kebutuhan Firestore masa depan.
 */
export type AssignDptReturn = Promise<AssignDptResult> & {
  added: number
  skipped: number
  total: number
  success: boolean
  errors: AssignDptErrorItem[]
}

export interface RemoveDptResult {
  success: boolean
  message: string
}

export type RemoveDptReturn = Promise<RemoveDptResult> & {
  success: boolean
  message: string
}

// ─── Interfaces: Migrasi Data DPT ────────────────────────────────────────────

export interface DptMigrationOptions {
  resetVotingStatus?: boolean // default: true (menginisialisasi hasVoted: false dan votedAt: undefined)
  sourceElectionId?: string   // opsional: membatasi sumber ke pemilihan tertentu (misal 'PEM-2025-01' atau 'all')
}

export interface DptMigrationItemError {
  nim: string
  identifier?: string
  code: string
  message: string
}

export interface DptMigrationResult {
  success: boolean
  targetElectionId: string
  totalCandidates: number
  added: number
  skipped: number
  failed: number
  invalidRelations: number
  errors: DptMigrationItemError[]
}

export interface StudentDptEligibility {
  isEligible: boolean
  code?: 'INACTIVE_ACADEMIC_STATUS' | 'UNVERIFIED_ACCOUNT_STATUS' | 'STUDENT_SUSPENDED' | 'PROFILE_INCOMPLETE' | 'ELIGIBLE'
  reason?: string
}

/**
 * Memeriksa kelayakan mahasiswa untuk didaftarkan ke dalam DPT Pemilihan.
 * Kriteria wajib:
 * 1. Status akademik harus aktif ('Aktif (Reguler)' atau 'Aktif (Transfer)', bukan 'Cuti Akademik').
 * 2. Status akun harus 'Aktif & Terverifikasi' (bukan 'Perlu Verifikasi' atau 'Nonaktif / Cuti').
 * 3. Status autentikasi tidak boleh 'Ditangguhkan'.
 */
export function checkStudentDptEligibility(
  student: StudentMaster | DocumentData | null | undefined
): StudentDptEligibility {
  if (!student) {
    return {
      isEligible: false,
      code: 'PROFILE_INCOMPLETE',
      reason: 'Data profil mahasiswa tidak ditemukan.'
    }
  }

  // 1. Validasi Status Akademik
  const academicStatus = String(student.academicStatus || '').trim()
  const isAcademicActive = academicStatus === 'Aktif (Reguler)' || academicStatus === 'Aktif (Transfer)'
  if (!isAcademicActive) {
    return {
      isEligible: false,
      code: 'INACTIVE_ACADEMIC_STATUS',
      reason: `Status akademik ${academicStatus ? `"${academicStatus}"` : 'tidak aktif'}. Mahasiswa cuti tidak berhak memiliki hak suara aktif.`
    }
  }

  // 2. Validasi Status Akun
  const accountStatus = String(student.accountStatus || '').trim()
  if (accountStatus !== 'Aktif & Terverifikasi') {
    return {
      isEligible: false,
      code: 'UNVERIFIED_ACCOUNT_STATUS',
      reason: `Status akun "${accountStatus || 'Belum Terverifikasi'}". Hanya akun yang berstatus "Aktif & Terverifikasi" yang sah menjadi DPT.`
    }
  }

  // 3. Validasi Status Autentikasi Tambahan
  const authStatus = String(student.authStatus || '').trim()
  if (authStatus === 'Ditangguhkan') {
    return {
      isEligible: false,
      code: 'STUDENT_SUSPENDED',
      reason: 'Akses hak suara mahasiswa ditangguhkan oleh sistem.'
    }
  }

  return {
    isEligible: true,
    code: 'ELIGIBLE'
  }
}

// ─── Helper: Document ID Deterministik ───────────────────────────────────────

/**
 * Menghasilkan Document ID deterministik berformat `${electionId}_${nim}`.
 * Menjamin keunikan satu entri DPT per mahasiswa pada satu pemilihan (idempotent).
 */
export function getDeterministicDptId(electionId: string, nim: string): string {
  const cleanElectionId = String(electionId || '').trim()
  const cleanNim = String(nim || '').trim()
  return `${cleanElectionId}_${cleanNim}`
}

// ─── Helper: Normalisasi Dokumen Firestore ───────────────────────────────────

export function normalizeFirestoreDpt(id: string, data: DocumentData): ElectionDptEntry {
  const electionId = String(data.electionId || '').trim()
  const nim = String(data.nim || '').trim()
  const resolvedId = id || getDeterministicDptId(electionId, nim)

  const parseDate = (val: any): string | undefined => {
    if (!val) return undefined
    if (typeof val.toDate === 'function') {
      return val.toDate().toISOString()
    }
    if (typeof val === 'string') {
      return val
    }
    if (typeof val === 'number') {
      return new Date(val).toISOString()
    }
    return undefined
  }

  return {
    id: resolvedId,
    electionId,
    nim,
    studentId: data.studentId ? String(data.studentId).trim() : nim,
    hasVoted: Boolean(data.hasVoted),
    votedAt: parseDate(data.votedAt) || (typeof data.votedAt === 'string' ? data.votedAt : undefined),
    tokenSent: Boolean(data.tokenSent),
    assignedAt: String(data.assignedAt || 'Hari ini'),
    assignedBy: data.assignedBy ? String(data.assignedBy).trim() : undefined,
    createdAt: parseDate(data.createdAt) || new Date().toISOString(),
    updatedAt: parseDate(data.updatedAt) || undefined
  }
}

// ─── Helper: Menghapus nilai undefined dari payload Firestore ─────────────────

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

// ─── 15 Data Dummy DPT (Referensi & Kompatibilitas Transisi) ──────────────────

export const DUMMY_ELECTION_DPT: ElectionDptEntry[] = [
  // ── PEM-2025-01 (Pemilihan Raya BEM KM) ──
  {
    id: 'DPT-PEM-2025-01-MHS-001',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-001',
    nim: '2208101012',
    hasVoted: true,
    votedAt: '26 Feb 2025, 09:42 WIB',
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-01-MHS-002',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-002',
    nim: '2305202045',
    hasVoted: false,
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-01-MHS-003',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-003',
    nim: '2101303088',
    hasVoted: true,
    votedAt: '26 Feb 2025, 08:15 WIB',
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-01-MHS-005',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-005',
    nim: '2208101099',
    hasVoted: true,
    votedAt: '26 Feb 2025, 11:02 WIB',
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-01-MHS-006',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-006',
    nim: '2301103022',
    hasVoted: false,
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-01-MHS-007',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-007',
    nim: '2403105018',
    hasVoted: true,
    votedAt: '26 Feb 2025, 10:30 WIB',
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-01-MHS-009',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-009',
    nim: '2108101001',
    hasVoted: true,
    votedAt: '26 Feb 2025, 08:42 WIB',
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-01-MHS-010',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-010',
    nim: '2102102008',
    hasVoted: false,
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-01-MHS-011',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-011',
    nim: '2101103014',
    hasVoted: true,
    votedAt: '26 Feb 2025, 10:20 WIB',
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-01-MHS-012',
    electionId: 'PEM-2025-01',
    studentId: 'MHS-012',
    nim: '2205106019',
    hasVoted: true,
    votedAt: '26 Feb 2025, 11:34 WIB',
    tokenSent: true,
    assignedAt: '20 Feb 2025'
  },

  // ── PEM-2025-02 (DPM Fakultas Teknik) ──
  {
    id: 'DPT-PEM-2025-02-MHS-001',
    electionId: 'PEM-2025-02',
    studentId: 'MHS-001',
    nim: '2208101012',
    hasVoted: false,
    tokenSent: true,
    assignedAt: '22 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-02-MHS-003',
    electionId: 'PEM-2025-02',
    studentId: 'MHS-003',
    nim: '2101303088',
    hasVoted: true,
    votedAt: '27 Feb 2025, 09:10 WIB',
    tokenSent: true,
    assignedAt: '22 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-02-MHS-009',
    electionId: 'PEM-2025-02',
    studentId: 'MHS-009',
    nim: '2108101001',
    hasVoted: false,
    tokenSent: true,
    assignedAt: '22 Feb 2025'
  },

  // ── PEM-2025-03 (HMIF Informatika) ──
  {
    id: 'DPT-PEM-2025-03-MHS-001',
    electionId: 'PEM-2025-03',
    studentId: 'MHS-001',
    nim: '2208101012',
    hasVoted: false,
    tokenSent: false,
    assignedAt: '25 Feb 2025'
  },
  {
    id: 'DPT-PEM-2025-03-MHS-009',
    electionId: 'PEM-2025-03',
    studentId: 'MHS-009',
    nim: '2108101001',
    hasVoted: false,
    tokenSent: false,
    assignedAt: '25 Feb 2025'
  }
]

// ─── Composable: useElectionDpt ──────────────────────────────────────────────

export const useElectionDpt = () => {
  const nuxtApp = useNuxtApp()
  const masterStudents = useStudentsMaster()

  const getDb = (): Firestore | null => {
    if (!import.meta.client) return null
    try {
      return (nuxtApp.$firestore || nuxtApp.$db) as Firestore | null
    } catch {
      return null
    }
  }

  const getAdminEmail = (): string | null => {
    try {
      const auth = (nuxtApp as any).$auth
      if (auth?.currentUser?.email) {
        return String(auth.currentUser.email)
      }
      const adminUser = useState<any>('admin_auth_user').value
      if (adminUser?.email) {
        return String(adminUser.email)
      }
      return null
    } catch {
      return null
    }
  }

  // ── State Reaktif ──────────────────────────────────────────────────────────
  // State dptDatabase tetap mempertahankan key 'electionDptDatabase' demi kompatibilitas
  // dengan checkStudentInDpt() pada useStudentsMaster.ts
  const dptDatabase = useState<ElectionDptEntry[]>('electionDptDatabase', () => [...DUMMY_ELECTION_DPT])
  const dptLoading = useState<boolean>('electionDptLoading', () => false)
  const dptError = useState<string | null>('electionDptError', () => null)
  const dptLoadedElections = useState<Record<string, boolean>>('electionDptLoadedElections', () => ({}))
  const dptRelationalErrors = useState<{ dptId: string; electionId: string; nim: string; message: string }[]>(
    'electionDptRelationalErrors',
    () => []
  )

  // ── Read: Raw Entries per Election ─────────────────────────────────────────
  const getDptEntries = (electionId: string): ElectionDptEntry[] => {
    const cleanId = String(electionId || '').trim()
    return dptDatabase.value.filter(entry => entry.electionId === cleanId)
  }

  // ── Read: Cek Status Loaded Pemilihan Tertentu ──────────────────────────────
  const isElectionDptLoaded = (electionId: string): boolean => {
    const cleanId = String(electionId || '').trim()
    return Boolean(dptLoadedElections.value[cleanId])
  }

  // ── Read: Fetch DPT by Election dari Cloud Firestore ───────────────────────
  async function fetchDptByElection(electionId: string, force = false): Promise<ElectionDptEntry[]> {
    const cleanElectionId = String(electionId || '').trim()
    if (!cleanElectionId) {
      return []
    }

    if (!import.meta.client) {
      return getDptEntries(cleanElectionId)
    }

    if (dptLoadedElections.value[cleanElectionId] && !force) {
      return getDptEntries(cleanElectionId)
    }

    const db = getDb()
    if (!db) {
      dptError.value = 'Layanan Cloud Firestore belum siap atau tidak tersedia di klien.'
      dptLoading.value = false
      return getDptEntries(cleanElectionId)
    }

    dptLoading.value = true
    dptError.value = null

    try {
      const colRef = collection(db, 'election_dpt')
      const q = query(colRef, where('electionId', '==', cleanElectionId))
      const snapshot = await getDocs(q)
      const loaded: ElectionDptEntry[] = snapshot.docs.map(docSnap =>
        normalizeFirestoreDpt(docSnap.id, docSnap.data())
      )

      // Deduplikasi berbasis NIM untuk menjamin keunikan data per agenda pemilihan
      const seenNims = new Set<string>()
      const uniqueLoaded: ElectionDptEntry[] = []
      for (const entry of loaded) {
        if (!seenNims.has(entry.nim)) {
          seenNims.add(entry.nim)
          uniqueLoaded.push(entry)
        }
      }

      // Perbarui state reaktif: hapus data lama pemilihan ini dan ganti dengan hasil Firestore
      const otherEntries = dptDatabase.value.filter(entry => entry.electionId !== cleanElectionId)
      dptDatabase.value = [...otherEntries, ...uniqueLoaded]

      dptLoadedElections.value = {
        ...dptLoadedElections.value,
        [cleanElectionId]: true
      }

      return uniqueLoaded
    } catch (err: any) {
      console.error(`[useElectionDpt] Gagal membaca DPT untuk pemilihan #${cleanElectionId}:`, err)
      let msg = err.message || `Gagal memuat DPT pemilihan #${cleanElectionId} dari Cloud Firestore.`
      if (err.code === 'permission-denied') {
        msg = 'Akses Firestore ditolak (Permission Denied). Pastikan akun Anda memiliki akses admin terdaftar.'
      } else if (err.code === 'unavailable') {
        msg = 'Tidak dapat terhubung ke Cloud Firestore. Periksa koneksi internet Anda.'
      }
      dptError.value = msg
      return getDptEntries(cleanElectionId)
    } finally {
      dptLoading.value = false
    }
  }

  // ── Read: Full Voter Detail Hydrated dari Master Students ───────────────────
  const getVotersByElection = (electionId: string): ElectionVoterDetail[] => {
    const cleanId = String(electionId || '').trim()
    const entries = getDptEntries(cleanId)
    const result: ElectionVoterDetail[] = []
    const missingRelationalItems: { dptId: string; electionId: string; nim: string; message: string }[] = []

    for (const entry of entries) {
      const cleanNim = String(entry.nim || '').trim()
      const cleanStudentId = String(entry.studentId || '').trim()

      // Cari profil mahasiswa dari master_students berbasis NIM (dengan fallback studentId)
      const student = masterStudents.value.find(s =>
        s.nim === cleanNim ||
        (cleanStudentId && s.id === cleanStudentId) ||
        (cleanStudentId && s.legacyId === cleanStudentId) ||
        s.id === cleanNim
      )

      if (student) {
        result.push({
          dptId: entry.id,
          electionId: entry.electionId,
          studentId: student.id || cleanNim,
          nim: student.nim || cleanNim,
          name: student.name,
          initials: student.initials,
          avatarColor: student.avatarColor,
          email: student.email,
          faculty: student.faculty,
          facultyCode: student.facultyCode,
          major: student.major,
          academicYear: student.academicYear,
          semester: student.semester,
          academicStatus: student.academicStatus,
          accountStatus: student.accountStatus,
          hasVoted: entry.hasVoted,
          votedAt: entry.votedAt,
          tokenSent: entry.tokenSent,
          assignedAt: entry.assignedAt,
          assignedBy: entry.assignedBy,
          isOrphaned: false
        })
      } else {
        // ANTI-SILENT-DROP:
        // Jika profil di master mahasiswa tidak ditemukan, tampilkan entri dengan penanda visual
        // agar jumlah DPT tetap sinkron dan admin dapat mengetahui masalah relasi data.
        const errItem = {
          dptId: entry.id,
          electionId: entry.electionId,
          nim: cleanNim,
          message: `Mahasiswa dengan NIM "${cleanNim}" tidak ditemukan dalam koleksi master_students.`
        }
        missingRelationalItems.push(errItem)

        result.push({
          dptId: entry.id,
          electionId: entry.electionId,
          studentId: cleanStudentId || cleanNim,
          nim: cleanNim,
          name: `[NIM: ${cleanNim}] Profil Belum Ada di Master`,
          initials: '??',
          avatarColor: 'bg-rose-50 text-rose-700',
          email: `${cleanNim}@student.unresolved`,
          faculty: 'Data Master Belum Lengkap',
          facultyCode: 'UNKNOWN',
          major: 'Program Studi Belum Terdata',
          academicYear: '-',
          semester: 0,
          academicStatus: 'Cuti Akademik',
          accountStatus: 'Perlu Verifikasi',
          hasVoted: entry.hasVoted,
          votedAt: entry.votedAt,
          tokenSent: entry.tokenSent,
          assignedAt: entry.assignedAt,
          assignedBy: entry.assignedBy,
          isOrphaned: true,
          relationalError: errItem.message
        })
      }
    }

    dptRelationalErrors.value = missingRelationalItems
    return result
  }

  // ── Verification: Cek Status Keikutsertaan Mahasiswa di DPT ─────────────────
  const isStudentInElectionDpt = (electionId: string, studentIdentifier: string): boolean => {
    const cleanId = String(studentIdentifier || '').trim()
    const cleanElectionId = String(electionId || '').trim()
    if (!cleanId || !cleanElectionId) return false

    return dptDatabase.value.some(entry => {
      if (entry.electionId !== cleanElectionId) return false
      if (entry.nim === cleanId) return true
      if (entry.studentId === cleanId) return true
      if (entry.id === cleanId || entry.id === getDeterministicDptId(cleanElectionId, cleanId)) return true

      // Pencocokan relasi jika identifier yang dikirim adalah legacyId (MHS-xxx)
      const student = masterStudents.value.find(s => s.id === cleanId || s.legacyId === cleanId)
      if (student && student.nim === entry.nim) return true

      return false
    })
  }

  // ── Create: Tetapkan Mahasiswa ke DPT (Anti-Duplikasi & Anti-Penimpaan) ──────
  function assignStudentsToElection(
    electionId: string,
    studentIdentifiers: string[]
  ): AssignDptReturn {
    const cleanElectionId = String(electionId || '').trim()
    const rawList = Array.isArray(studentIdentifiers) ? studentIdentifiers : []
    const errors: AssignDptErrorItem[] = []
    const seenNimsInRequest = new Set<string>()

    let syncAdded = 0
    let syncSkipped = 0

    const todayStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    const nowIso = new Date().toISOString()
    const adminEmail = getAdminEmail()

    interface PreparedItem {
      docId: string
      nim: string
      entry: ElectionDptEntry
    }
    const validPreparedItems: PreparedItem[] = []

    // 1. Validasi sinkron awal terhadap Master Data Mahasiswa dan state lokal
    for (const rawId of rawList) {
      const cleanId = String(rawId || '').trim()
      if (!cleanId) {
        syncSkipped++
        errors.push({
          identifier: cleanId,
          code: 'INVALID_IDENTIFIER',
          message: 'Identitas mahasiswa tidak boleh kosong.'
        })
        continue
      }

      // Validasi ketersediaan mahasiswa di master_students
      const student = masterStudents.value.find(s =>
        s.nim === cleanId ||
        s.id === cleanId ||
        (s.legacyId && s.legacyId === cleanId)
      )

      if (!student) {
        syncSkipped++
        errors.push({
          identifier: cleanId,
          code: 'STUDENT_NOT_FOUND',
          message: `Mahasiswa dengan identitas "${cleanId}" tidak ditemukan pada master data mahasiswa.`
        })
        continue
      }

      // Validasi kelayakan hak suara mahasiswa (Status Akademik & Status Akun)
      const eligibility = checkStudentDptEligibility(student)
      if (!eligibility.isEligible) {
        syncSkipped++
        errors.push({
          identifier: cleanId,
          nim: student.nim,
          code: eligibility.code || 'STUDENT_INELIGIBLE',
          message: `Mahasiswa ${student.name} (NIM: ${student.nim}) tidak memenuhi syarat DPT: ${eligibility.reason}`
        })
        continue
      }

      const targetNim = student.nim

      // Cegah duplikasi NIM dalam satu permintaan penambahan yang sama
      if (seenNimsInRequest.has(targetNim)) {
        syncSkipped++
        errors.push({
          identifier: cleanId,
          nim: targetNim,
          code: 'DUPLICATE_IN_REQUEST',
          message: `Mahasiswa ${student.name} (NIM: ${targetNim}) duplikat dalam permintaan penambahan ini.`
        })
        continue
      }
      seenNimsInRequest.add(targetNim)

      // Cek apakah mahasiswa sudah terdaftar di DPT pemilihan ini (state lokal)
      if (isStudentInElectionDpt(cleanElectionId, targetNim)) {
        syncSkipped++
        errors.push({
          identifier: cleanId,
          nim: targetNim,
          code: 'ALREADY_IN_DPT',
          message: `Mahasiswa ${student.name} (NIM: ${targetNim}) sudah terdaftar pada DPT pemilihan ini.`
        })
        continue
      }

      // Document ID deterministik: `${electionId}_${nim}`
      const docId = getDeterministicDptId(cleanElectionId, targetNim)

      const newEntry: ElectionDptEntry = {
        id: docId,
        electionId: cleanElectionId,
        nim: targetNim,
        studentId: student.id || targetNim,
        hasVoted: false,
        tokenSent: true,
        assignedAt: todayStr,
        assignedBy: adminEmail || undefined,
        createdAt: nowIso,
        updatedAt: nowIso
      }

      validPreparedItems.push({
        docId,
        nim: targetNim,
        entry: newEntry
      })

      // Pembaruan optimistik ke state lokal
      dptDatabase.value.push(newEntry)
      syncAdded++
    }

    // 2. Eksekusi Asynchronous ke Cloud Firestore
    const executePromise = (async (): Promise<AssignDptResult> => {
      const db = getDb()
      if (!db || validPreparedItems.length === 0) {
        return {
          success: errors.length === 0,
          added: syncAdded,
          skipped: syncSkipped,
          total: rawList.length,
          errors
        }
      }

      let finalAdded = 0
      let finalSkipped = syncSkipped
      const asyncErrors: AssignDptErrorItem[] = [...errors]

      try {
        const itemsToWrite: PreparedItem[] = []

        // Periksa keberadaan setiap dokumen di Cloud Firestore sebelum menulis (create-only guard)
        for (const item of validPreparedItems) {
          const docRef = doc(db, 'election_dpt', item.docId)
          const snap = await getDoc(docRef)

          if (snap.exists()) {
            // DOKUMEN SUDAH ADA DI FIRESTORE:
            // Jangan menimpa dokumen yang sudah ada, jangan mengubah hasVoted!
            finalSkipped++
            asyncErrors.push({
              identifier: item.nim,
              nim: item.nim,
              code: 'DOCUMENT_EXISTS',
              message: `Dokumen DPT (${item.docId}) sudah ada di Cloud Firestore. Tidak ditimpa demi menjaga integritas data.`
            })

            // Sinkronkan dokumen riil Firestore ke state lokal jika ada disparitas
            const existingData = normalizeFirestoreDpt(snap.id, snap.data())
            const localIdx = dptDatabase.value.findIndex(e => e.id === item.docId)
            if (localIdx !== -1) {
              dptDatabase.value[localIdx] = existingData
            }
            continue
          }

          itemsToWrite.push(item)
        }

        // Simpan dokumen baru secara atomik menggunakan writeBatch
        if (itemsToWrite.length > 0) {
          const batch = writeBatch(db)
          for (const item of itemsToWrite) {
            const docRef = doc(db, 'election_dpt', item.docId)
            batch.set(docRef, cleanFirestorePayload(item.entry))
          }
          await batch.commit()
          finalAdded = itemsToWrite.length
        }

        p.added = finalAdded
        p.skipped = finalSkipped
        p.errors = asyncErrors
        p.success = asyncErrors.length === 0

        return {
          success: asyncErrors.length === 0,
          added: finalAdded,
          skipped: finalSkipped,
          total: rawList.length,
          errors: asyncErrors
        }
      } catch (err: any) {
        console.error('[useElectionDpt] Gagal menyimpan entri DPT ke Cloud Firestore:', err)
        const writeErr: AssignDptErrorItem = {
          identifier: 'batch',
          code: err.code || 'FIRESTORE_WRITE_ERROR',
          message: err.message || 'Terjadi kesalahan sistem saat menyimpan DPT ke Cloud Firestore.'
        }
        asyncErrors.push(writeErr)
        p.errors = asyncErrors
        p.success = false
        return {
          success: false,
          added: finalAdded,
          skipped: finalSkipped,
          total: rawList.length,
          errors: asyncErrors
        }
      }
    })()

    // 3. Pasangkan properti sinkron pada objek Promise (kompatibilitas ganda)
    const p = executePromise as AssignDptReturn
    p.added = syncAdded
    p.skipped = syncSkipped
    p.total = rawList.length
    p.success = errors.length === 0
    p.errors = errors

    return p
  }

  // ── Delete: Cabut Hak Suara dari DPT (Proteksi hasVoted) ─────────────────────
  function removeStudentFromElection(
    electionId: string,
    studentIdOrNim: string
  ): RemoveDptReturn {
    const cleanElectionId = String(electionId || '').trim()
    const cleanIdentifier = String(studentIdOrNim || '').trim()

    if (!cleanElectionId || !cleanIdentifier) {
      const res: RemoveDptResult = {
        success: false,
        message: 'ID pemilihan dan identitas mahasiswa wajib disertakan.'
      }
      const p = Promise.resolve(res) as RemoveDptReturn
      p.success = false
      p.message = res.message
      return p
    }

    // 1. Cari entri di state lokal
    const index = dptDatabase.value.findIndex(entry =>
      entry.electionId === cleanElectionId &&
      (entry.nim === cleanIdentifier ||
       entry.studentId === cleanIdentifier ||
       entry.id === cleanIdentifier ||
       entry.id === getDeterministicDptId(cleanElectionId, cleanIdentifier))
    )

    let targetNim = cleanIdentifier
    let cachedEntry: ElectionDptEntry | null = null

    if (index !== -1) {
      cachedEntry = dptDatabase.value[index]
      targetNim = cachedEntry.nim
    } else {
      const student = masterStudents.value.find(s =>
        s.id === cleanIdentifier ||
        s.legacyId === cleanIdentifier ||
        s.nim === cleanIdentifier
      )
      if (student) {
        targetNim = student.nim
      }
    }

    const docId = getDeterministicDptId(cleanElectionId, targetNim)

    // 2. Proteksi hasVoted pada state lokal
    if (cachedEntry && cachedEntry.hasVoted) {
      const res: RemoveDptResult = {
        success: false,
        message: 'Hak suara telah digunakan di bilik digital. Surat suara telah tercatat dan tidak dapat dicabut.'
      }
      const p = Promise.resolve(res) as RemoveDptReturn
      p.success = false
      p.message = res.message
      return p
    }

    // Hapus optimistik dari state lokal
    let removedEntry: ElectionDptEntry | null = null
    if (index !== -1) {
      removedEntry = dptDatabase.value.splice(index, 1)[0]
    }

    const syncSuccess = true
    const syncMessage = 'Hak suara mahasiswa berhasil dicabut dari pemilihan ini.'

    // 3. Asynchronous Firestore Deletion
    const executePromise = (async (): Promise<RemoveDptResult> => {
      const db = getDb()
      if (!db) {
        return {
          success: syncSuccess,
          message: syncMessage
        }
      }

      try {
        const docRef = doc(db, 'election_dpt', docId)
        const snap = await getDoc(docRef)

        if (!snap.exists()) {
          return {
            success: true,
            message: 'Hak suara mahasiswa berhasil dicabut dari data pemilihan.'
          }
        }

        const data = snap.data()
        // Proteksi krusial: periksa status hasVoted riil di Firestore
        if (data.hasVoted) {
          // Rollback local state
          if (removedEntry && !dptDatabase.value.some(e => e.id === removedEntry!.id)) {
            dptDatabase.value.push(removedEntry)
          }
          p.success = false
          p.message = 'Hak suara telah digunakan di bilik digital. Surat suara telah tercatat di database dan tidak dapat dicabut.'
          return {
            success: false,
            message: p.message
          }
        }

        // Hapus HANYA dokumen election_dpt (TIDAK menghapus dari master_students)
        await deleteDoc(docRef)

        return {
          success: true,
          message: 'Hak suara mahasiswa berhasil dicabut dari pemilihan ini.'
        }
      } catch (err: any) {
        console.error(`[useElectionDpt] Gagal mencabut DPT #${docId} dari Firestore:`, err)
        // Rollback local state jika terjadi kegagalan jaringan/izin
        if (removedEntry && !dptDatabase.value.some(e => e.id === removedEntry!.id)) {
          dptDatabase.value.push(removedEntry)
        }
        const msg = err.code === 'permission-denied'
          ? 'Akses Firestore ditolak (Permission Denied). Anda tidak memiliki izin untuk mencabut hak suara.'
          : (err.message || 'Terjadi kesalahan sistem saat mencabut hak suara dari Cloud Firestore.')

        p.success = false
        p.message = msg
        return {
          success: false,
          message: msg
        }
      }
    })()

    const p = executePromise as RemoveDptReturn
    p.success = syncSuccess
    p.message = syncMessage
    return p
  }

  // ── Migration: Migrasi Data Dummy DPT ke Agenda Terkontrol (Manual Invocation) ───
  // PENTING: Fungsi ini TIDAK dijalankan secara otomatis saat startup/onMounted.
  // Hanya dijalankan ketika dipanggil secara eksplisit oleh admin/pengembang.
  async function migrateDummyDptToElection(
    targetElectionId: string,
    options?: DptMigrationOptions
  ): Promise<DptMigrationResult> {
    const cleanTargetId = String(targetElectionId || '').trim()
    const resetVotingStatus = options?.resetVotingStatus !== false // default: true
    const sourceElectionId = options?.sourceElectionId?.trim()

    const errors: DptMigrationItemError[] = []
    let added = 0
    let skipped = 0
    let failed = 0
    let invalidRelations = 0

    // 1. Validasi Batasan Target Pemilihan: Hanya mengizinkan 'PEM-2026-01' untuk tahap pengujian ini
    if (cleanTargetId !== 'PEM-2026-01') {
      throw new Error(
        `Target pemilihan "${cleanTargetId}" tidak diizinkan. Untuk pengujian tahap ini, hanya agenda pemilihan "PEM-2026-01" yang sah sebagai target migrasi.`
      )
    }

    const db = getDb()
    if (!db) {
      throw new Error('Layanan Cloud Firestore belum siap atau tidak tersedia di klien.')
    }

    // 2. Verifikasi Keberadaan Dokumen Agenda Pemilihan di Firestore
    try {
      const electionDocRef = doc(db, 'elections', cleanTargetId)
      const electionSnap = await getDoc(electionDocRef)
      if (!electionSnap.exists()) {
        throw new Error(
          `Dokumen agenda pemilihan #${cleanTargetId} tidak ditemukan di database Cloud Firestore.`
        )
      }
    } catch (err: any) {
      console.error(`[useElectionDpt] Gagal memverifikasi dokumen pemilihan #${cleanTargetId}:`, err)
      throw new Error(`Verifikasi agenda pemilihan di Firestore gagal: ${err.message}`)
    }

    // 3. Pastikan Master Data Mahasiswa Sudah Dimuat
    if (masterStudents.value.length === 0) {
      await masterStudents.fetchMasterStudents()
    }

    // 4. Filter Sumber Data Dummy DPT
    let sourceItems = [...DUMMY_ELECTION_DPT]
    if (sourceElectionId && sourceElectionId !== 'all') {
      sourceItems = sourceItems.filter(item => item.electionId === sourceElectionId)
    }

    const nowIso = new Date().toISOString()
    const todayFormatted = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    const adminEmail = getAdminEmail()

    // 5. Deduplikasi Mahasiswa Berbasis NIM & Validasi Relasi ke master_students
    const seenNims = new Set<string>()
    const itemsToProcess: {
      dummySource: ElectionDptEntry
      student: StudentMaster
      targetNim: string
      docId: string
    }[] = []

    for (const dummy of sourceItems) {
      const cleanNim = String(dummy.nim || '').trim()
      const cleanLegacyId = String(dummy.studentId || '').trim()

      // Validasi keberadaan mahasiswa di master_students
      const student = masterStudents.value.find(s =>
        s.nim === cleanNim ||
        (cleanLegacyId && (s.id === cleanLegacyId || s.legacyId === cleanLegacyId))
      )

      if (!student) {
        invalidRelations++
        errors.push({
          nim: cleanNim,
          identifier: cleanLegacyId || cleanNim,
          code: 'STUDENT_NOT_FOUND_IN_MASTER',
          message: `Mahasiswa dengan identitas "${cleanLegacyId || cleanNim}" tidak ditemukan dalam koleksi master_students.`
        })
        continue
      }

      const targetNim = student.nim

      // Cegah duplikasi NIM dalam target agenda yang sama
      if (seenNims.has(targetNim)) {
        skipped++
        continue
      }
      seenNims.add(targetNim)

      // ID Dokumen Deterministik: `${targetElectionId}_${nim}`
      const docId = getDeterministicDptId(cleanTargetId, targetNim)
      itemsToProcess.push({
        dummySource: dummy,
        student,
        targetNim,
        docId
      })
    }

    // 6. Periksa Dokumen Target yang Sudah Ada di Firestore (Anti-Penimpaan)
    const itemsToWrite: ElectionDptEntry[] = []

    for (const item of itemsToProcess) {
      try {
        const dptDocRef = doc(db, 'election_dpt', item.docId)
        const existingSnap = await getDoc(dptDocRef)

        if (existingSnap.exists()) {
          // Dokumen target sudah ada di Firestore:
          // PENTING: Jangan menimpa dokumen yang sudah ada dan jangan mereset status voting dokumen eksisting!
          skipped++
          errors.push({
            nim: item.targetNim,
            identifier: item.dummySource.studentId,
            code: 'ALREADY_EXISTS_IN_FIRESTORE',
            message: `Dokumen DPT (${item.docId}) sudah ada di Cloud Firestore. Tidak ditimpa demi menjaga integritas data.`
          })
          continue
        }

        // Bangun entri baru
        // Mode pengujian default (resetVotingStatus === true): hasVoted = false, votedAt = undefined
        const newEntry: ElectionDptEntry = {
          id: item.docId,
          electionId: cleanTargetId,
          nim: item.targetNim,
          studentId: item.student.id || item.targetNim,
          hasVoted: resetVotingStatus ? false : item.dummySource.hasVoted,
          votedAt: resetVotingStatus ? undefined : (item.dummySource.votedAt || undefined),
          tokenSent: item.dummySource.tokenSent,
          assignedAt: todayFormatted,
          assignedBy: adminEmail || 'system_migration',
          createdAt: nowIso,
          updatedAt: nowIso
        }

        itemsToWrite.push(newEntry)
      } catch (err: any) {
        failed++
        errors.push({
          nim: item.targetNim,
          identifier: item.dummySource.studentId,
          code: err.code || 'FIRESTORE_CHECK_ERROR',
          message: err.message || 'Gagal memeriksa dokumen target di Cloud Firestore.'
        })
      }
    }

    // 7. Simpan ke Cloud Firestore Menggunakan writeBatch
    if (itemsToWrite.length > 0) {
      try {
        const batch = writeBatch(db)
        for (const entry of itemsToWrite) {
          const docRef = doc(db, 'election_dpt', entry.id)
          batch.set(docRef, cleanFirestorePayload(entry))
        }
        await batch.commit()
        added = itemsToWrite.length

        // Sinkronkan ke state lokal dptDatabase secara idempotent
        for (const entry of itemsToWrite) {
          if (!dptDatabase.value.some(e => e.id === entry.id)) {
            dptDatabase.value.push(entry)
          }
        }

        // Tandai target election sebagai loaded
        dptLoadedElections.value = {
          ...dptLoadedElections.value,
          [cleanTargetId]: true
        }
      } catch (err: any) {
        console.error('[useElectionDpt] Gagal mengeksekusi batch write migrasi DPT:', err)
        failed += itemsToWrite.length
        errors.push({
          nim: 'batch_commit',
          code: err.code || 'BATCH_COMMIT_FAILED',
          message: err.message || 'Terjadi kesalahan sistem saat menyimpan batch DPT ke Firestore.'
        })
      }
    }

    return {
      success: failed === 0 && invalidRelations === 0,
      targetElectionId: cleanTargetId,
      totalCandidates: sourceItems.length,
      added,
      skipped,
      failed,
      invalidRelations,
      errors
    }
  }

  // Objek kembalian composable yang mendukung destrukturisasi maupun akses .value
  const api = {
    get value() {
      return dptDatabase.value
    },
    set value(v: ElectionDptEntry[]) {
      dptDatabase.value = v
    },
    // API lama yang tetap dipertahankan
    dptDatabase,
    getDptEntries,
    getVotersByElection,
    isStudentInElectionDpt,
    assignStudentsToElection,
    removeStudentFromElection,

    // API baru Firestore & Reaktivitas
    dptLoading,
    dptError,
    dptLoadedElections,
    dptRelationalErrors,
    fetchDptByElection,
    isElectionDptLoaded,
    getDeterministicDptId,
    checkStudentDptEligibility,
    migrateDummyDptToElection,
    DUMMY_ELECTION_DPT
  }

  return api
}
