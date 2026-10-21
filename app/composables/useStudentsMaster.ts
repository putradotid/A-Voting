import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  type Firestore,
  type DocumentData
} from 'firebase/firestore'

// ─── Interfaces ──────────────────────────────────────────────────────────────
export interface StudentMaster {
  id: string
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
  accountStatus: 'Aktif & Terverifikasi' | 'Perlu Verifikasi' | 'Nonaktif / Cuti'
  statusNote?: string
  academicStatus: 'Aktif (Reguler)' | 'Aktif (Transfer)' | 'Cuti Akademik'
  authStatus: 'Kredensial Siap' | 'OTP / SSO Aktif' | 'Belum Digenerate' | 'Ditangguhkan'
  authNote?: string
  phone?: string
  registeredAt: string
  legacyId?: string // Pemetaan ID lama (e.g. 'MHS-001') untuk kompatibilitas DPT
  createdAt?: string
  updatedAt?: string
}

export interface MigrationErrorItem {
  nim: string
  code?: string
  message: string
}

export interface StudentMigrationResult {
  success: boolean
  total: number
  added: number
  skipped: number
  failed: number
  errors: MigrationErrorItem[]
}

// ─── 12 Data Dummy Master Mahasiswa (Referensi & Migrasi Idempotent) ───────────
export const DUMMY_STUDENTS_MASTER: StudentMaster[] = [
  {
    id: '2208101012',
    nim: '2208101012',
    legacyId: 'MHS-001',
    name: 'Muhammad Rizky Pratama',
    initials: 'RP',
    avatarColor: 'bg-purple-50 text-[#582be8]',
    email: 'm.rizky@student.ac.id',
    faculty: 'Fakultas Teknik',
    facultyCode: 'FT',
    major: 'S1 Teknik Informatika',
    academicYear: '2022',
    semester: 6,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'OTP / SSO Aktif',
    authNote: 'Kredensial Siakad Terverifikasi',
    phone: '0812-3456-7890',
    registeredAt: '12 Agu 2022'
  },
  {
    id: '2305202045',
    nim: '2305202045',
    legacyId: 'MHS-002',
    name: 'Siti Nurhaliza',
    initials: 'SN',
    avatarColor: 'bg-slate-100 text-slate-600',
    email: 'sitinur@student.ac.id',
    faculty: 'Fakultas Ekonomika & Bisnis',
    facultyCode: 'FEB',
    major: 'S1 Akuntansi',
    academicYear: '2023',
    semester: 4,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'Kredensial Siap',
    authNote: 'Undangan Aktivasi Terkirim',
    phone: '0857-1122-3344',
    registeredAt: '15 Agu 2023'
  },
  {
    id: '2101303088',
    nim: '2101303088',
    legacyId: 'MHS-003',
    name: 'Daniel Christian Hutapea',
    initials: 'DC',
    avatarColor: 'bg-purple-50 text-[#582be8]',
    email: 'daniel.c@student.ac.id',
    faculty: 'Fakultas Teknik',
    facultyCode: 'FT',
    major: 'S1 Teknik Elektro',
    academicYear: '2021',
    semester: 8,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'OTP / SSO Aktif',
    authNote: 'Kredensial Siakad Terverifikasi',
    phone: '0813-9988-7766',
    registeredAt: '10 Agu 2021'
  },
  {
    id: '2409404011',
    nim: '2409404011',
    legacyId: 'MHS-004',
    name: 'Anisa Rahmawati',
    initials: 'AR',
    avatarColor: 'bg-rose-50 text-rose-700',
    email: 'anisa.r@student.ac.id',
    faculty: 'Fakultas Psikologi',
    facultyCode: 'FPSI',
    major: 'S1 Psikologi',
    academicYear: '2024',
    semester: 2,
    accountStatus: 'Perlu Verifikasi',
    statusNote: 'Data Tanggal Lahir Belum Lengkap',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'Belum Digenerate',
    authNote: 'Perlu Validasi Siakad',
    phone: '0821-4455-6677',
    registeredAt: '18 Agu 2024'
  },
  {
    id: '2208101099',
    nim: '2208101099',
    legacyId: 'MHS-005',
    name: 'Farhan Al-Fikri',
    initials: 'FA',
    avatarColor: 'bg-purple-50 text-[#582be8]',
    email: 'farhan.af@student.ac.id',
    faculty: 'Fakultas Ilmu Komputer',
    facultyCode: 'FASILKOM',
    major: 'S1 Sistem Informasi',
    academicYear: '2022',
    semester: 6,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'OTP / SSO Aktif',
    authNote: 'Kredensial Siakad Terverifikasi',
    phone: '0812-7788-9900',
    registeredAt: '12 Agu 2022'
  },
  {
    id: '2301103022',
    nim: '2301103022',
    legacyId: 'MHS-006',
    name: 'Bunga Citra Lestari',
    initials: 'BC',
    avatarColor: 'bg-emerald-50 text-emerald-700',
    email: 'bunga.cl@student.ac.id',
    faculty: 'Fakultas Hukum',
    facultyCode: 'FH',
    major: 'S1 Ilmu Hukum',
    academicYear: '2023',
    semester: 4,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'Kredensial Siap',
    authNote: 'Undangan Aktivasi Terkirim',
    phone: '0858-1234-5678',
    registeredAt: '14 Agu 2023'
  },
  {
    id: '2403105018',
    nim: '2403105018',
    legacyId: 'MHS-007',
    name: 'Dimas Aditya Nugroho',
    initials: 'DA',
    avatarColor: 'bg-blue-50 text-blue-700',
    email: 'dimas.an@student.ac.id',
    faculty: 'Fakultas Kedokteran',
    facultyCode: 'FK',
    major: 'S1 Pendidikan Dokter',
    academicYear: '2024',
    semester: 2,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'OTP / SSO Aktif',
    authNote: 'Kredensial Siakad Terverifikasi',
    phone: '0812-8899-0011',
    registeredAt: '19 Agu 2024'
  },
  {
    id: '2108102040',
    nim: '2108102040',
    legacyId: 'MHS-008',
    name: 'Rian Syahputra',
    initials: 'RS',
    avatarColor: 'bg-amber-50 text-amber-700',
    email: 'rian.syah@student.ac.id',
    faculty: 'Fakultas Teknik',
    facultyCode: 'FT',
    major: 'S1 Teknik Mesin',
    academicYear: '2021',
    semester: 8,
    accountStatus: 'Nonaktif / Cuti',
    statusNote: 'Cuti Semester Genap 2024/2025',
    academicStatus: 'Cuti Akademik',
    authStatus: 'Ditangguhkan',
    authNote: 'Akses Bilik Ditangguhkan',
    phone: '0813-1122-4455',
    registeredAt: '11 Agu 2021'
  },
  {
    id: '2108101001',
    nim: '2108101001',
    legacyId: 'MHS-009',
    name: 'Alif Kurniawan',
    initials: 'AK',
    avatarColor: 'bg-purple-50 text-[#582be8]',
    email: 'alif.k@student.ac.id',
    faculty: 'Fakultas Teknik',
    facultyCode: 'FT',
    major: 'S1 Teknik Informatika',
    academicYear: '2021',
    semester: 8,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'OTP / SSO Aktif',
    authNote: 'Kredensial Siakad Terverifikasi',
    phone: '0812-9900-1122',
    registeredAt: '10 Agu 2021'
  },
  {
    id: '2102102008',
    nim: '2102102008',
    legacyId: 'MHS-010',
    name: 'Chandra Wicaksana',
    initials: 'CW',
    avatarColor: 'bg-slate-100 text-slate-600',
    email: 'chandra.w@student.ac.id',
    faculty: 'Fakultas Ekonomika & Bisnis',
    facultyCode: 'FEB',
    major: 'S1 Manajemen',
    academicYear: '2021',
    semester: 8,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'Kredensial Siap',
    authNote: 'Kredensial Siakad Terverifikasi',
    phone: '0857-4433-2211',
    registeredAt: '11 Agu 2021'
  },
  {
    id: '2101103014',
    nim: '2101103014',
    legacyId: 'MHS-011',
    name: 'Dewi Sartika',
    initials: 'DS',
    avatarColor: 'bg-emerald-50 text-emerald-700',
    email: 'dewi.s@student.ac.id',
    faculty: 'Fakultas Hukum',
    facultyCode: 'FH',
    major: 'S1 Ilmu Hukum',
    academicYear: '2021',
    semester: 8,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'OTP / SSO Aktif',
    authNote: 'Kredensial Siakad Terverifikasi',
    phone: '0812-3344-5566',
    registeredAt: '12 Agu 2021'
  },
  {
    id: '2205106019',
    nim: '2205106019',
    legacyId: 'MHS-012',
    name: 'Gita Maharani',
    initials: 'GM',
    avatarColor: 'bg-rose-50 text-rose-700',
    email: 'gita.m@student.ac.id',
    faculty: 'Fakultas Psikologi',
    facultyCode: 'FPSI',
    major: 'S1 Psikologi',
    academicYear: '2022',
    semester: 6,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: 'Aktif (Reguler)',
    authStatus: 'OTP / SSO Aktif',
    authNote: 'Kredensial Siakad Terverifikasi',
    phone: '0813-5566-7788',
    registeredAt: '15 Agu 2022'
  }
]

// ─── Helper: Normalisasi Dokumen Firestore ─────────────────────────────────────
export function normalizeFirestoreStudent(id: string, data: DocumentData): StudentMaster {
  const nim = String(data.nim || id).trim()
  const name = String(data.name || '').trim()
  const initials = String(data.initials || '').trim() ||
    name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'MH'

  return {
    id: data.legacyId ? String(data.legacyId).trim() : String(data.id || nim).trim(),
    nim,
    name,
    initials,
    avatarColor: String(data.avatarColor || 'bg-purple-50 text-[#582be8]'),
    email: String(data.email || `${nim}@student.ac.id`).trim(),
    faculty: String(data.faculty || 'Fakultas Teknik').trim(),
    facultyCode: String(data.facultyCode || 'FT').trim(),
    major: String(data.major || 'Teknik Informatika').trim(),
    academicYear: String(data.academicYear || '2024').trim(),
    semester: Number(data.semester) || 1,
    accountStatus: data.accountStatus || 'Aktif & Terverifikasi',
    statusNote: data.statusNote ? String(data.statusNote).trim() : undefined,
    academicStatus: data.academicStatus || 'Aktif (Reguler)',
    authStatus: data.authStatus || 'Kredensial Siap',
    authNote: data.authNote ? String(data.authNote).trim() : undefined,
    phone: data.phone ? String(data.phone).trim() : undefined,
    registeredAt: String(data.registeredAt || 'Hari ini'),
    legacyId: data.legacyId ? String(data.legacyId).trim() : undefined,
    createdAt: data.createdAt ? String(data.createdAt) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined
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

// ─── Composable: useStudentsMaster ───────────────────────────────────────────
export const useStudentsMaster = () => {
  const nuxtApp = useNuxtApp()

  const getDb = (): Firestore | null => {
    if (!import.meta.client) return null
    try {
      return (nuxtApp.$firestore || nuxtApp.$db) as Firestore | null
    } catch {
      return null
    }
  }

  // State reaktif utama master mahasiswa
  const students = useState<StudentMaster[]>('masterStudentsDatabase', () => [])
  const studentsLoading = useState<boolean>('masterStudentsLoading', () => false)
  const studentsError = useState<string | null>('masterStudentsError', () => null)
  const studentsLoaded = useState<boolean>('masterStudentsLoaded', () => false)

  // ─── Read: Fetch All Master Students ────────────────────────────────────────
  async function fetchMasterStudents(force = false): Promise<StudentMaster[]> {
    if (!import.meta.client) {
      return students.value
    }
    if (studentsLoaded.value && !force && students.value.length > 0) {
      return students.value
    }

    const db = getDb()
    if (!db) {
      studentsError.value = 'Layanan Cloud Firestore belum siap atau tidak tersedia di klien.'
      studentsLoading.value = false
      return students.value
    }

    studentsLoading.value = true
    studentsError.value = null

    try {
      const colRef = collection(db, 'master_students')
      const snapshot = await getDocs(colRef)
      const loaded = snapshot.docs.map(docSnap => normalizeFirestoreStudent(docSnap.id, docSnap.data()))

      // Deduplikasi berdasarkan NIM untuk menjamin keunikan
      const seenNims = new Set<string>()
      const uniqueLoaded: StudentMaster[] = []
      for (const s of loaded) {
        if (!seenNims.has(s.nim)) {
          seenNims.add(s.nim)
          uniqueLoaded.push(s)
        }
      }

      // Urutkan berdasarkan nama mahasiswa ascending
      uniqueLoaded.sort((a, b) => a.name.localeCompare(b.name))

      students.value = uniqueLoaded
      studentsLoaded.value = true
      return uniqueLoaded
    } catch (err: any) {
      console.error('[useStudentsMaster] Gagal membaca koleksi master_students dari Firestore:', err)
      let msg = err.message || 'Gagal memuat master data mahasiswa dari Cloud Firestore.'
      if (err.code === 'permission-denied') {
        msg = 'Akses Firestore ditolak (Permission Denied). Pastikan akun Anda memiliki akses admin terdaftar.'
      } else if (err.code === 'unavailable') {
        msg = 'Tidak dapat terhubung ke Cloud Firestore. Periksa koneksi internet Anda.'
      }
      studentsError.value = msg
      return students.value
    } finally {
      studentsLoading.value = false
    }
  }

  // ─── Create: Tambah Mahasiswa Baru ──────────────────────────────────────────
  async function addStudent(data: Partial<StudentMaster>): Promise<StudentMaster> {
    const rawNim = String(data.nim || '').trim()
    if (!rawNim) {
      throw new Error('NIM wajib diisi.')
    }
    const rawName = String(data.name || '').trim()
    if (!rawName) {
      throw new Error('Nama lengkap mahasiswa wajib diisi.')
    }

    // 1. Validasi duplikasi pada state lokal
    if (students.value.some(s => s.nim === rawNim)) {
      throw new Error(`Mahasiswa dengan NIM "${rawNim}" sudah terdaftar dalam sistem.`)
    }

    const initials = String(data.initials || '').trim() ||
      rawName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'MH'

    const now = new Date().toISOString()
    const todayFormatted = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    const newStudent: StudentMaster = {
      id: rawNim,
      nim: rawNim,
      name: rawName,
      initials,
      avatarColor: data.avatarColor || 'bg-purple-50 text-[#582be8]',
      email: data.email?.trim() || `${rawNim}@student.ac.id`,
      faculty: data.faculty?.trim() || 'Fakultas Teknik',
      facultyCode: data.facultyCode?.trim() || 'FT',
      major: data.major?.trim() || 'Teknik Informatika',
      academicYear: data.academicYear || String(new Date().getFullYear()),
      semester: Number(data.semester) || 1,
      accountStatus: data.accountStatus || 'Aktif & Terverifikasi',
      statusNote: data.statusNote ? data.statusNote.trim() : undefined,
      academicStatus: data.academicStatus || 'Aktif (Reguler)',
      authStatus: data.authStatus || 'Kredensial Siap',
      authNote: data.authNote ? data.authNote.trim() : 'Kredensial Baru Dibuat',
      phone: data.phone ? data.phone.trim() : undefined,
      registeredAt: data.registeredAt || todayFormatted,
      createdAt: now,
      updatedAt: now
    }

    // 2. Simpan ke Firestore dengan proteksi konflik & anti-penimpaan
    const db = getDb()
    if (db) {
      const docRef = doc(db, 'master_students', rawNim)
      const existingDoc = await getDoc(docRef)
      if (existingDoc.exists()) {
        throw new Error(`Mahasiswa dengan NIM "${rawNim}" sudah ada di database Cloud Firestore.`)
      }
      const payload = cleanFirestorePayload(newStudent)
      await setDoc(docRef, payload)
    }

    // 3. Masukkan ke state lokal secara idempotent
    if (!students.value.some(s => s.nim === rawNim)) {
      students.value.unshift(newStudent)
    }

    return newStudent
  }

  // ─── Update: Ubah Data Mahasiswa ───────────────────────────────────────────
  async function updateStudent(nim: string, updates: Partial<StudentMaster>): Promise<StudentMaster> {
    const rawNim = String(nim || '').trim()
    if (!rawNim) {
      throw new Error('NIM mahasiswa wajib disertakan untuk melakukan pembaruan data.')
    }

    const index = students.value.findIndex(s => s.nim === rawNim)
    if (index === -1) {
      throw new Error(`Data mahasiswa dengan NIM "${rawNim}" tidak ditemukan di database.`)
    }

    const currentStudent = students.value[index]
    const rawName = updates.name !== undefined ? String(updates.name).trim() : currentStudent.name
    if (!rawName) {
      throw new Error('Nama lengkap mahasiswa tidak boleh kosong.')
    }

    const initials = updates.initials?.trim() ||
      rawName.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() || 'MH'

    const now = new Date().toISOString()

    // Proteksi: jangan izinkan perubahan NIM atau ID dokumen melalui edit biasa
    const updatedStudent: StudentMaster = {
      ...currentStudent,
      ...updates,
      id: rawNim, // Tetap gunakan NIM sebagai identifier utama
      nim: rawNim,
      name: rawName,
      initials,
      updatedAt: now
    }

    // Pastikan createdAt tetap terjaga
    if (!updatedStudent.createdAt) {
      updatedStudent.createdAt = currentStudent.createdAt || now
    }

    // Keamanan: jangan pernah menyimpan kredensial sensitif di dokumen mahasiswa
    delete (updatedStudent as any).password
    delete (updatedStudent as any).pin
    delete (updatedStudent as any).token

    const db = getDb()
    if (db) {
      const docRef = doc(db, 'master_students', rawNim)
      const payload = cleanFirestorePayload(updatedStudent)
      await setDoc(docRef, payload, { merge: true })
    }

    // Perbarui state lokal secara reaktif
    students.value[index] = updatedStudent
    students.value = [...students.value]

    return updatedStudent
  }

  // ─── Helper: Periksa Apakah Mahasiswa Masih Terdaftar di DPT Pemilihan ───────
  async function checkStudentInDpt(nim: string, studentId?: string): Promise<{ inDpt: boolean; count: number; electionIds: string[] }> {
    const foundElectionIds = new Set<string>()

    // 1. Periksa state lokal election DPT jika tersedia
    try {
      const dptDb = useState<any[]>('electionDptDatabase').value
      if (Array.isArray(dptDb)) {
        for (const entry of dptDb) {
          if (entry.nim === nim || entry.studentId === nim || (studentId && entry.studentId === studentId)) {
            if (entry.electionId) {
              foundElectionIds.add(entry.electionId)
            }
          }
        }
      }
    } catch {
      // Abaikan jika state belum diinisialisasi
    }

    // 2. Periksa koleksi Firestore election_dpt
    const db = getDb()
    if (db) {
      try {
        const colRef = collection(db, 'election_dpt')
        const qNim = query(colRef, where('nim', '==', nim))
        const snapNim = await getDocs(qNim)
        for (const d of snapNim.docs) {
          const eId = d.data().electionId
          if (eId) foundElectionIds.add(eId)
        }

        if (studentId && studentId !== nim) {
          const qId = query(colRef, where('studentId', '==', studentId))
          const snapId = await getDocs(qId)
          for (const d of snapId.docs) {
            const eId = d.data().electionId
            if (eId) foundElectionIds.add(eId)
          }
        }
      } catch (err: any) {
        console.warn('[useStudentsMaster] Kendala saat memeriksa koleksi election_dpt di Firestore:', err)
      }
    }

    const electionIds = Array.from(foundElectionIds)
    return {
      inDpt: electionIds.length > 0,
      count: electionIds.length,
      electionIds
    }
  }

  // ─── Delete: Hapus Mahasiswa (Dengan Validasi Integritas DPT) ────────────────
  async function deleteStudent(nim: string): Promise<boolean> {
    const rawNim = String(nim || '').trim()
    if (!rawNim) {
      throw new Error('NIM mahasiswa wajib disertakan untuk penghapusan.')
    }

    const currentStudent = students.value.find(s => s.nim === rawNim)
    const legacyId = currentStudent?.legacyId || currentStudent?.id

    // 1. Validasi relasi DPT (Integritas Relasional)
    const dptCheck = await checkStudentInDpt(rawNim, legacyId)
    if (dptCheck.inDpt) {
      const electionList = dptCheck.electionIds.join(', ')
      throw new Error(
        `Mahasiswa dengan NIM "${rawNim}" tidak dapat dihapus karena masih terdaftar sebagai Pemilih Tetap (DPT) pada agenda pemilihan (${electionList}). ` +
        `Cabut hak suara mahasiswa terlebih dahulu melalui panel Pemilih (DPT) sebelum menghapus dari Master Data.`
      )
    }

    // 2. Hapus dokumen dari Cloud Firestore
    const db = getDb()
    if (db) {
      const docRef = doc(db, 'master_students', rawNim)
      await deleteDoc(docRef)
    }

    // 3. Hapus dari state lokal
    const index = students.value.findIndex(s => s.nim === rawNim)
    if (index !== -1) {
      students.value.splice(index, 1)
      students.value = [...students.value]
    }

    return true
  }

  // ─── Migrasi Data: Migrasi 12 Data Dummy ke Firestore (Idempotent) ───────────
  async function migrateDummyStudents(): Promise<StudentMigrationResult> {
    const db = getDb()
    if (!db) {
      throw new Error('Layanan Cloud Firestore tidak tersedia di klien untuk menjalankan migrasi.')
    }

    console.log(`[useStudentsMaster] migrateDummyStudents() dipanggil, memproses ${DUMMY_STUDENTS_MASTER.length} data mahasiswa dummy...`)

    let added = 0
    let skipped = 0
    const errors: MigrationErrorItem[] = []

    for (const dummy of DUMMY_STUDENTS_MASTER) {
      try {
        const docRef = doc(db, 'master_students', dummy.nim)
        const existingSnap = await getDoc(docRef)
        if (existingSnap.exists()) {
          skipped++
          continue
        }

        const now = new Date().toISOString()
        const payload: StudentMaster = {
          ...dummy,
          id: dummy.nim,
          createdAt: now,
          updatedAt: now
        }

        await setDoc(docRef, cleanFirestorePayload(payload))
        added++
      } catch (err: any) {
        const errCode = String(err.code || 'unknown').trim()
        const errMsg = String(err.message || 'Terjadi kesalahan sistem saat menyimpan dokumen').trim()
        console.error(`[useStudentsMaster] Gagal memigrasikan NIM ${dummy.nim} [${errCode}]:`, errMsg)
        errors.push({
          nim: dummy.nim,
          code: errCode,
          message: errMsg
        })
      }
    }

    if (errors.length > 0) {
      console.error(`[useStudentsMaster] Migrasi data awal selesai dengan ${errors.length} kegagalan. Error pertama [${errors[0].code}]: ${errors[0].message}`)
    }

    if (added > 0) {
      await fetchMasterStudents(true)
    }

    return {
      success: errors.length === 0,
      total: DUMMY_STUDENTS_MASTER.length,
      added,
      skipped,
      failed: errors.length,
      errors
    }
  }

  // Objek kembalian composable yang mendukung pemanggilan langsung maupun destrukturisasi
  const api = {
    get value() {
      return students.value
    },
    set value(v: StudentMaster[]) {
      students.value = v
    },
    students,
    masterStudents: students,
    studentsLoading,
    studentsError,
    studentsLoaded,
    fetchMasterStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    checkStudentInDpt,
    migrateDummyStudents,
    DUMMY_STUDENTS_MASTER
  }

  return api
}
