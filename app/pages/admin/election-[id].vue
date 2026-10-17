<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  path: '/admin/elections/:id',
  alias: ['/admin/election/:id', '/admin/elections/manage/:id']
})

const route = useRoute()
const router = useRouter()

// ─── Interfaces ──────────────────────────────────────────────────────
import type {
  ElectionCandidate,
  CandidateType,
  CandidateVerificationStatus
} from '~/composables/useElectionCandidates'

interface ElectionDetail {
  id: string
  name: string
  description: string
  organization: string
  position: string
  period: string
  level: string
  icon: string
  status: 'Berlangsung' | 'Terjadwal' | 'Draft' | 'Selesai'
  startDate: string
  endDate: string
  dptTarget: number
  dptVoted: number
  turnout: number
  info: string
  quorumPercentage: number
  candidatesCount: number
  candidates?: ElectionCandidate[]
}

// ─── Master Mock Dataset ─────────────────────────────────────────────
const electionsDatabase: Record<string, ElectionDetail> = {
  'PEM-2025-01': {
    id: 'PEM-2025-01',
    name: 'Pemilihan Raya Ketua & Wakil Ketua BEM 2025',
    description: 'Pemilihan umum raya mahasiswa untuk menentukan Presiden Mahasiswa dan Wakil Presiden Mahasiswa Badan Eksekutif Mahasiswa (BEM KM) periode 2025/2026. Bilik suara digital terenkripsi dengan audit node konsensus real-time.',
    organization: 'Badan Eksekutif Mahasiswa (BEM KM)',
    position: 'Ketua & Wakil Ketua BEM',
    period: '2025/2026',
    level: 'Universitas (BEM KM)',
    icon: 'account_balance',
    status: 'Berlangsung',
    startDate: '2025-02-26T08:00',
    endDate: '2025-02-28T17:00',
    dptTarget: 2740,
    dptVoted: 2150,
    turnout: 78.4,
    quorumPercentage: 50,
    candidatesCount: 3,
    info: 'Bilik suara dibuka serentak di 8 fakultas. Verifikasi token NIM berjalan normal.',
    candidates: [
      {
        id: 'c-01',
        number: '01',
        name: 'Farhan & Nabila',
        leadCandidate: {
          name: 'Muhammad Farhan',
          nim: '2108101012',
          faculty: 'Fakultas Teknik',
          major: 'S1 Teknik Informatika'
        },
        viceCandidate: {
          name: 'Nabila Putri',
          nim: '2102102045',
          faculty: 'Fakultas Ekonomika & Bisnis',
          major: 'S1 Akuntansi'
        },
        tagline: '“Sinergi Nyata, Berdampak Bersama”',
        status: 'Terverifikasi KPU',
        coalition: 'BEM FT - FEB Bersatu',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        color: '#582be8',
        pillars: [
          'Digitalisasi Satu Pintu Ormawa Kampus',
          'Layanan Advokasi UKT Tanggap 24/7',
          'Pemerataan Akses Dana Hibah Riset Mahasiswa'
        ]
      },
      {
        id: 'c-02',
        number: '02',
        name: 'Ahmad & Dimas',
        leadCandidate: {
          name: 'Ahmad Rizky Pratama',
          nim: '2101103022',
          faculty: 'Fakultas Hukum',
          major: 'S1 Ilmu Hukum'
        },
        viceCandidate: {
          name: 'Dimas Prasetyo',
          nim: '2104104088',
          faculty: 'Fakultas Ilmu Sosial & Politik',
          major: 'S1 Hubungan Internasional'
        },
        tagline: '“Integritas Kampus, Mahasiswa Berdaulat”',
        status: 'Terverifikasi KPU',
        coalition: 'Koalisi Reformasi FH-FISIP',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        color: '#2563eb',
        pillars: [
          'Transparansi Anggaran BEM Terbuka ke Publik',
          'Pusat Bantuan Hukum & Satgas Anti Kekerasan',
          'Kanal Kolaborasi Startup & Inkubasi Bisnis'
        ]
      },
      {
        id: 'c-03',
        number: '03',
        name: 'Siti & Kevin',
        leadCandidate: {
          name: 'Siti Aisyah Rahma',
          nim: '2103105011',
          faculty: 'Fakultas Kedokteran',
          major: 'S1 Pendidikan Dokter'
        },
        viceCandidate: {
          name: 'Kevin Pratama',
          nim: '2105106090',
          faculty: 'Fakultas Psikologi',
          major: 'S1 Psikologi'
        },
        tagline: '“Kesehatan Mental & Prestasi Unggul Mahasiswa”',
        status: 'Terverifikasi KPU',
        coalition: 'Poros Harmoni FK-Psikologi',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        color: '#059669',
        pillars: [
          'Klinik Konseling Mental Health Gratis',
          'Pekan Olahraga & Seni Kampus Terintegrasi',
          'Akselerasi Pertukaran Mahasiswa Luar Negeri'
        ]
      }
    ]
  },
  'PEM-2025-02': {
    id: 'PEM-2025-02',
    name: 'Dewan Perwakilan Mahasiswa (DPM) Fakultas Teknik 2025',
    description: 'Pemilihan anggota legislatif Dewan Perwakilan Mahasiswa Fakultas Teknik untuk mengawal fungsi anggaran, legislasi, dan pengawasan BEM FT periode 2025/2026.',
    organization: 'DPM Fakultas Teknik',
    position: 'Anggota Dewan Perwakilan Mahasiswa FT',
    period: '2025/2026',
    level: 'Fakultas Teknik',
    icon: 'engineering',
    status: 'Berlangsung',
    startDate: '2025-02-27T09:00',
    endDate: '2025-03-01T20:00',
    dptTarget: 2028,
    dptVoted: 1270,
    turnout: 62.6,
    quorumPercentage: 50,
    candidatesCount: 5,
    info: 'Partisipasi tertinggi dicatat oleh Departemen Teknik Informatika dan Sipil.',
    candidates: [
      {
        id: 'c-dpm-1',
        number: '01',
        name: 'Bagus Wicaksono',
        leadCandidate: { name: 'Bagus Wicaksono', nim: '2208101050', faculty: 'Fakultas Teknik', major: 'Teknik Elektro' },
        tagline: '“Aspiratif, Kritis, dan Berdedikasi”',
        status: 'Terverifikasi KPU',
        coalition: 'Independen Elektro',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        color: '#7c3aed',
        pillars: ['Audit Fasilitas Laboratorium FT', 'Penguatan Perda Ormawa FT']
      },
      {
        id: 'c-dpm-2',
        number: '02',
        name: 'Rian Syahputra',
        leadCandidate: { name: 'Rian Syahputra', nim: '2208102031', faculty: 'Fakultas Teknik', major: 'Teknik Mesin' },
        tagline: '“Suara Mesin untuk Keadilan Mahasiswa”',
        status: 'Terverifikasi KPU',
        coalition: 'Independen Mesin',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
        color: '#ea580c',
        pillars: ['Kawal Alokasi Dana Riset Bengkel', 'Forum Aspirasi Bulanan Terbuka']
      }
    ]
  },
  'PEM-2025-03': {
    id: 'PEM-2025-03',
    name: 'Pemilihan Ketua Himpunan Mahasiswa Informatika (HMIF)',
    description: 'Pemilihan Ketua dan Wakil Ketua Himpunan Mahasiswa Informatika periode 2025/2026. Persiapan teknis bilik suara dan penetapan nomor urut calon telah selesai.',
    organization: 'Himpunan Mahasiswa Informatika (HMIF)',
    position: 'Ketua & Wakil Ketua HMIF',
    period: '2025/2026',
    level: 'Jurusan Informatika',
    icon: 'terminal',
    status: 'Terjadwal',
    startDate: '2025-03-05T08:00',
    endDate: '2025-03-07T17:00',
    dptTarget: 820,
    dptVoted: 0,
    turnout: 0,
    quorumPercentage: 55,
    candidatesCount: 2,
    info: 'Bilik suara terkunci secara otomatis hingga waktu mulai 5 Maret 2025.',
    candidates: [
      {
        id: 'c-hmif-1',
        number: '01',
        name: 'Aditya & Ryan',
        leadCandidate: { name: 'Aditya Nugraha', nim: '2208101015', faculty: 'Fakultas Teknik', major: 'Informatika' },
        viceCandidate: { name: 'Ryan Saputra', nim: '2208101044', faculty: 'Fakultas Teknik', major: 'Sistem Informasi' },
        tagline: '“Code The Future, Lead The Innovators”',
        status: 'Terverifikasi KPU',
        coalition: 'Dev Alliance',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
        color: '#0284c7',
        pillars: ['Inkubasi Hackathon Nasional', 'Mentoring Karir Big Tech']
      }
    ]
  },
  'PEM-2025-04': {
    id: 'PEM-2025-04',
    name: 'Pemilihan Ketua Himpunan Mahasiswa Manajemen (HMM)',
    description: 'Pemilihan Ketua Himpunan Mahasiswa Manajemen periode 2025/2026. Status saat ini masih dalam draft pendaftaran paslon dan validasi berkas.',
    organization: 'Himpunan Mahasiswa Manajemen (HMM)',
    position: 'Ketua & Wakil Ketua HMM',
    period: '2025/2026',
    level: 'Jurusan Manajemen',
    icon: 'drive_file_rename_outline',
    status: 'Draft',
    startDate: '',
    endDate: '',
    dptTarget: 0,
    dptVoted: 0,
    turnout: 0,
    quorumPercentage: 50,
    candidatesCount: 1,
    info: 'Menunggu kelengkapan berkas visi-misi calon paslon.',
    candidates: []
  },
  'PEM-2024-09': {
    id: 'PEM-2024-09',
    name: 'Musyawarah Mahasiswa BEM Fakultas Hukum 2024/2025',
    description: 'Pemilihan pengurus BEM Fakultas Hukum yang telah selesai diselenggarakan dan hasil perolehan suaranya telah disahkan.',
    organization: 'BEM Fakultas Hukum',
    position: 'Gubernur & Wakil Gubernur BEM FH',
    period: '2024/2025',
    level: 'Fakultas Hukum',
    icon: 'gavel',
    status: 'Selesai',
    startDate: '2025-01-13T08:00',
    endDate: '2025-01-15T17:00',
    dptTarget: 1210,
    dptVoted: 1140,
    turnout: 94.2,
    quorumPercentage: 50,
    candidatesCount: 2,
    info: 'Hasil rekapitulasi resmi telah ditandatangani KPU Kampus dan terarsip aman.',
    candidates: []
  },
  'PEM-2025-05': {
    id: 'PEM-2025-05',
    name: 'Pemilihan Ketua BEM Fakultas Ekonomika & Bisnis',
    description: 'Pemilihan Ketua dan Wakil Ketua BEM FEB untuk masa bakti 2025/2026.',
    organization: 'BEM Fakultas Ekonomika & Bisnis',
    position: 'Ketua & Wakil Ketua BEM FEB',
    period: '2025/2026',
    level: 'Fakultas Ekonomika & Bisnis',
    icon: 'account_balance_wallet',
    status: 'Berlangsung',
    startDate: '2025-02-25T08:00',
    endDate: '2025-02-27T17:00',
    dptTarget: 1850,
    dptVoted: 1420,
    turnout: 76.8,
    quorumPercentage: 50,
    candidatesCount: 4,
    info: 'Pemungutan suara berlangsung kondusif di seluruh bilik lab komputer FEB.',
    candidates: []
  }
}

// ─── Current Election State ──────────────────────────────────────────
const rawId = computed(() => String(route.params.id || 'PEM-2025-01'))

function buildFallbackElection(id: string): ElectionDetail {
  return {
    id,
    name: `Pemilihan Mahasiswa (${id})`,
    description: `Agenda pemilihan resmi ${id} di lingkungan universitas. Data operasional, paslon, dan pemilih dikelola melalui panel kontrol ini.`,
    organization: 'Komisi Pemilihan Umum Mahasiswa',
    position: 'Ketua & Formatur Organisasi',
    period: '2025/2026',
    level: 'Tingkat Kampus',
    icon: 'ballot',
    status: 'Berlangsung',
    startDate: '2025-02-26T08:00',
    endDate: '2025-02-28T17:00',
    dptTarget: 2500,
    dptVoted: 1800,
    turnout: 72.0,
    quorumPercentage: 50,
    candidatesCount: 2,
    info: 'Pemilihan aktif dalam sistem A-Voting.',
    candidates: []
  }
}

const currentElection = ref<ElectionDetail>(
  electionsDatabase[rawId.value] ? JSON.parse(JSON.stringify(electionsDatabase[rawId.value])) : buildFallbackElection(rawId.value)
)

// Watch route param if user navigates between elections
watch(
  () => route.params.id,
  (newId) => {
    if (newId && typeof newId === 'string') {
      currentElection.value = electionsDatabase[newId]
        ? JSON.parse(JSON.stringify(electionsDatabase[newId]))
        : buildFallbackElection(newId)
    }
  }
)

// ─── Navigation Tabs ─────────────────────────────────────────────────
type TabKey = 'ringkasan' | 'kandidat' | 'pemilih' | 'monitoring' | 'pengaturan'

const tabs: { key: TabKey; label: string; icon: string; count?: string | number }[] = [
  { key: 'ringkasan', label: 'Ringkasan', icon: 'dashboard' },
  { key: 'kandidat', label: 'Kandidat', icon: 'groups', count: computed(() => currentElectionCandidates.value.length) },
  { key: 'pemilih', label: 'Pemilih (DPT)', icon: 'how_to_reg', count: computed(() => currentElection.value.dptTarget ? currentElection.value.dptTarget.toLocaleString() : undefined) },
  { key: 'monitoring', label: 'Monitoring Suara', icon: 'monitoring' },
  { key: 'pengaturan', label: 'Pengaturan & Aturan', icon: 'settings' }
]

const activeTab = ref<TabKey>('ringkasan')

// Sync with query param if present
onMounted(() => {
  const queryTab = route.query.tab as TabKey
  if (queryTab && ['ringkasan', 'kandidat', 'pemilih', 'monitoring', 'pengaturan'].includes(queryTab)) {
    activeTab.value = queryTab
  }
})

function switchTab(key: TabKey) {
  activeTab.value = key
  router.replace({ query: { ...route.query, tab: key } })
}

// ─── Status Config ───────────────────────────────────────────────────
const statusTheme = computed(() => {
  switch (currentElection.value.status) {
    case 'Berlangsung':
      return {
        badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
        dot: 'bg-emerald-500',
        ping: true,
        label: 'Sedang Berlangsung (Live Voting)',
        cardBorder: 'border-emerald-200'
      }
    case 'Terjadwal':
      return {
        badgeBg: 'bg-amber-50 border-amber-200 text-amber-800',
        dot: 'bg-amber-500',
        ping: false,
        label: 'Terjadwal (Menunggu Bilik Buka)',
        cardBorder: 'border-amber-200'
      }
    case 'Draft':
      return {
        badgeBg: 'bg-slate-100 border-slate-200 text-slate-700',
        dot: 'bg-slate-400',
        ping: false,
        label: 'Draft (Tahap Persiapan)',
        cardBorder: 'border-slate-200'
      }
    case 'Selesai':
      return {
        badgeBg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
        dot: 'bg-indigo-500',
        ping: false,
        label: 'Selesai & Terarsip',
        cardBorder: 'border-indigo-200'
      }
    default:
      return {
        badgeBg: 'bg-slate-100 border-slate-200 text-slate-700',
        dot: 'bg-slate-400',
        ping: false,
        label: currentElection.value.status,
        cardBorder: 'border-slate-200'
      }
  }
})

// ─── Format Helpers ──────────────────────────────────────────────────
function formatDate(dateStr: string): string {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
  const day = String(d.getDate()).padStart(2, '0')
  const mon = months[d.getMonth()]
  const year = d.getFullYear()
  const hour = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${day} ${mon} ${year}, ${hour}:${min}`
}

function formatDateRange(start: string, end: string): string {
  if (!start && !end) return 'Jadwal belum ditentukan'
  if (!end) return `Mulai: ${formatDate(start)} WIB`
  return `${formatDate(start)} WIB — ${formatDate(end)} WIB`
}

// ─── Clipboard Toast ─────────────────────────────────────────────────
const copiedToast = ref(false)
function copyElectionId() {
  navigator.clipboard.writeText(currentElection.value.id)
  copiedToast.value = true
  setTimeout(() => {
    copiedToast.value = false
  }, 2500)
}

// ─── Local Edit Modal State ──────────────────────────────────────────
const showEditModal = ref(false)
const editForm = ref({
  name: '',
  description: '',
  organization: '',
  position: '',
  period: '',
  level: '',
  status: 'Berlangsung' as ElectionDetail['status'],
  startDate: '',
  endDate: ''
})

function openEditModal() {
  editForm.value = {
    name: currentElection.value.name,
    description: currentElection.value.description,
    organization: currentElection.value.organization,
    position: currentElection.value.position,
    period: currentElection.value.period,
    level: currentElection.value.level,
    status: currentElection.value.status,
    startDate: currentElection.value.startDate,
    endDate: currentElection.value.endDate
  }
  showEditModal.value = true
}

function saveEditForm() {
  currentElection.value.name = editForm.value.name.trim() || currentElection.value.name
  currentElection.value.description = editForm.value.description.trim()
  currentElection.value.organization = editForm.value.organization.trim() || currentElection.value.organization
  currentElection.value.position = editForm.value.position.trim() || currentElection.value.position
  currentElection.value.period = editForm.value.period.trim() || currentElection.value.period
  currentElection.value.level = editForm.value.level.trim() || currentElection.value.level
  currentElection.value.status = editForm.value.status
  currentElection.value.startDate = editForm.value.startDate
  currentElection.value.endDate = editForm.value.endDate
  showEditModal.value = false
}

// ─── DPT Management per Election (Composables) ────────────────────────
const masterStudents = useStudentsMaster()
const {
  getVotersByElection,
  isStudentInElectionDpt,
  assignStudentsToElection,
  removeStudentFromElection
} = useElectionDpt()

// Dynamic Voters in this Election (Derived from Election DPT Database)
const currentElectionVoters = computed(() => getVotersByElection(currentElection.value.id))

// DPT Statistics for this Election
const dptStats = computed(() => {
  const voters = currentElectionVoters.value
  const total = voters.length
  const voted = voters.filter(v => v.hasVoted).length
  const unvoted = total - voted
  const turnout = total > 0 ? Number(((voted / total) * 100).toFixed(1)) : 0
  return { total, voted, unvoted, turnout }
})

// Sync election stats with DPT database and Candidates database
watchEffect(() => {
  if (dptStats.value.total > 0) {
    currentElection.value.dptTarget = dptStats.value.total
    currentElection.value.dptVoted = dptStats.value.voted
    currentElection.value.turnout = dptStats.value.turnout
  }
  // Sync candidate count with candidate database
  currentElection.value.candidatesCount = candidateStats.value.total
})

// ─── DPT Table Filters ────────────────────────────────────────────────
const dptSearchQuery = ref('')
const dptFacultyFilter = ref('Semua')
const dptStatusFilter = ref('Semua')

const filteredElectionVoters = computed(() => {
  return currentElectionVoters.value.filter(v => {
    const matchSearch = !dptSearchQuery.value.trim() ||
      v.name.toLowerCase().includes(dptSearchQuery.value.toLowerCase().trim()) ||
      v.nim.includes(dptSearchQuery.value.trim()) ||
      v.email.toLowerCase().includes(dptSearchQuery.value.toLowerCase().trim())
    const matchFaculty = dptFacultyFilter.value === 'Semua' ||
      v.faculty === dptFacultyFilter.value ||
      v.facultyCode === dptFacultyFilter.value
    const matchStatus = dptStatusFilter.value === 'Semua' ||
      (dptStatusFilter.value === 'Sudah Memilih' ? v.hasVoted : !v.hasVoted)
    return matchSearch && matchFaculty && matchStatus
  })
})

// Checkbox selection in DPT table
const selectedDptIds = ref<string[]>([])
const isAllDptSelected = computed(() => {
  return filteredElectionVoters.value.length > 0 &&
    filteredElectionVoters.value.every(v => selectedDptIds.value.includes(v.dptId))
})
function toggleSelectAllDpt() {
  if (isAllDptSelected.value) {
    selectedDptIds.value = []
  } else {
    selectedDptIds.value = filteredElectionVoters.value.map(v => v.dptId)
  }
}

// ─── Modal State: Tambah Pemilih ke DPT ────────────────────────────────
const showAddVotersModal = ref(false)
const addVoterSearch = ref('')
const addVoterFaculty = ref('Semua')
const selectedStudentIdsToAdd = ref<string[]>([])

const availableMasterStudents = computed(() => {
  return masterStudents.value.filter(s => {
    const matchSearch = !addVoterSearch.value.trim() ||
      s.name.toLowerCase().includes(addVoterSearch.value.toLowerCase().trim()) ||
      s.nim.includes(addVoterSearch.value.trim()) ||
      s.email.toLowerCase().includes(addVoterSearch.value.toLowerCase().trim())
    const matchFaculty = addVoterFaculty.value === 'Semua' ||
      s.faculty === addVoterFaculty.value ||
      s.facultyCode === addVoterFaculty.value
    return matchSearch && matchFaculty
  }).map(s => ({
    ...s,
    isRegistered: isStudentInElectionDpt(currentElection.value.id, s.id)
  }))
})

const unassignedMasterStudents = computed(() => {
  return availableMasterStudents.value.filter(s => !s.isRegistered)
})

const isAllUnassignedSelected = computed(() => {
  return unassignedMasterStudents.value.length > 0 &&
    unassignedMasterStudents.value.every(s => selectedStudentIdsToAdd.value.includes(s.id))
})

function toggleSelectAllUnassigned() {
  if (isAllUnassignedSelected.value) {
    const unassignedIds = new Set(unassignedMasterStudents.value.map(s => s.id))
    selectedStudentIdsToAdd.value = selectedStudentIdsToAdd.value.filter(id => !unassignedIds.has(id))
  } else {
    const unassignedIds = unassignedMasterStudents.value.map(s => s.id)
    selectedStudentIdsToAdd.value = Array.from(new Set([...selectedStudentIdsToAdd.value, ...unassignedIds]))
  }
}

function openAddVotersModal() {
  addVoterSearch.value = ''
  addVoterFaculty.value = 'Semua'
  selectedStudentIdsToAdd.value = []
  showAddVotersModal.value = true
}

function submitAssignVoters() {
  if (selectedStudentIdsToAdd.value.length === 0) return
  const result = assignStudentsToElection(currentElection.value.id, selectedStudentIdsToAdd.value)
  if (result.added > 0) {
    triggerToast(`Berhasil menetapkan ${result.added} mahasiswa ke DPT pemilihan ${currentElection.value.id}.`)
  } else {
    triggerToast('Tidak ada mahasiswa baru yang ditambahkan (seluruh mahasiswa terpilih sudah terdaftar).')
  }
  selectedStudentIdsToAdd.value = []
  showAddVotersModal.value = false
}

// ─── Modal State: Konfirmasi Cabut Hak Suara ───────────────────────────
const showRemoveVoterModal = ref(false)
const voterToRemove = ref<ElectionVoterDetail | null>(null)

function promptRemoveVoter(voter: ElectionVoterDetail) {
  if (voter.hasVoted) {
    triggerToast('Peringatan: Mahasiswa ini telah menggunakan hak suaranya di bilik suara. Data tidak dapat dicabut.')
    return
  }
  voterToRemove.value = voter
  showRemoveVoterModal.value = true
}

function confirmRemoveVoter() {
  if (!voterToRemove.value) return
  const result = removeStudentFromElection(currentElection.value.id, voterToRemove.value.studentId)
  if (result.success) {
    triggerToast(`Hak suara mahasiswa ${voterToRemove.value.name} (NIM: ${voterToRemove.value.nim}) berhasil dicabut dari DPT.`)
  } else {
    triggerToast(result.message)
  }
  showRemoveVoterModal.value = false
  voterToRemove.value = null
}

// ─── Toast System ────────────────────────────────────────────────────
const toastMessage = ref('')
const showToast = ref(false)
let toastTimer: any = null
function triggerToast(msg: string) {
  toastMessage.value = msg
  showToast.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 3500)
}

// ─── Candidate Management per Election (Composable) ───────────────────
const {
  getCandidatesByElection,
  getCandidateStats,
  addCandidate,
  updateCandidate,
  deleteCandidate,
  canDeleteCandidate
} = useElectionCandidates()

const currentElectionCandidates = computed(() => getCandidatesByElection(currentElection.value.id))
const candidateStats = computed(() => getCandidateStats(currentElection.value.id))

// ─── Candidate Form & Modal State ─────────────────────────────────────
const showCandidateModal = ref(false)
const candidateModalMode = ref<'create' | 'edit'>('create')
const editingCandidateId = ref<string | null>(null)
const candidateFormError = ref('')

interface CandidateFormState {
  type: CandidateType
  ballotNumber: string
  name: string
  tagline: string
  coalition: string
  color: string
  photo: string
  status: CandidateVerificationStatus
  leadName: string
  leadNim: string
  leadFaculty: string
  leadMajor: string
  leadSemester: number
  leadGpa: number
  viceName: string
  viceNim: string
  viceFaculty: string
  viceMajor: string
  viceSemester: number
  viceGpa: number
  visi: string
  misiText: string
  pillarsText: string
}

const defaultCandidateForm = (): CandidateFormState => ({
  type: 'pair',
  ballotNumber: '',
  name: '',
  tagline: '',
  coalition: '',
  color: '#582be8',
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  status: 'Menunggu Berkas',
  leadName: '',
  leadNim: '',
  leadFaculty: '',
  leadMajor: '',
  leadSemester: 6,
  leadGpa: 3.5,
  viceName: '',
  viceNim: '',
  viceFaculty: '',
  viceMajor: '',
  viceSemester: 6,
  viceGpa: 3.5,
  visi: '',
  misiText: '',
  pillarsText: ''
})

const candidateForm = ref<CandidateFormState>(defaultCandidateForm())

function openCreateCandidateModal() {
  candidateModalMode.value = 'create'
  editingCandidateId.value = null
  candidateFormError.value = ''

  // Suggest next ballot number automatically
  const existingNums = currentElectionCandidates.value.map(c => parseInt(c.ballotNumber, 10)).filter(n => !isNaN(n))
  const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1
  const suggestedBallot = String(nextNum).padStart(2, '0')

  candidateForm.value = {
    ...defaultCandidateForm(),
    type: currentElection.value.level.includes('DPM') || currentElection.value.name.includes('DPM') ? 'single' : 'pair',
    ballotNumber: suggestedBallot
  }
  showCandidateModal.value = true
}

function openEditCandidateModal(c: ElectionCandidate) {
  candidateModalMode.value = 'edit'
  editingCandidateId.value = c.id
  candidateFormError.value = ''
  candidateForm.value = {
    type: c.type,
    ballotNumber: c.ballotNumber,
    name: c.name,
    tagline: c.tagline || '',
    coalition: c.coalition || '',
    color: c.color || '#582be8',
    photo: c.photo || '',
    status: c.status,
    leadName: c.leadCandidate.name,
    leadNim: c.leadCandidate.nim,
    leadFaculty: c.leadCandidate.faculty,
    leadMajor: c.leadCandidate.major,
    leadSemester: c.leadCandidate.semester || 6,
    leadGpa: c.leadCandidate.gpa || 3.5,
    viceName: c.viceCandidate?.name || '',
    viceNim: c.viceCandidate?.nim || '',
    viceFaculty: c.viceCandidate?.faculty || '',
    viceMajor: c.viceCandidate?.major || '',
    viceSemester: c.viceCandidate?.semester || 6,
    viceGpa: c.viceCandidate?.gpa || 3.5,
    visi: c.visi || '',
    misiText: (c.misi || []).join('\n'),
    pillarsText: (c.pillars || []).join('\n')
  }
  showCandidateModal.value = true
}

function saveCandidateForm() {
  candidateFormError.value = ''
  const f = candidateForm.value

  if (!f.ballotNumber.trim()) {
    candidateFormError.value = 'Nomor urut resmi wajib diisi.'
    return
  }
  if (!f.name.trim()) {
    candidateFormError.value = 'Nama paslon atau kandidat wajib diisi.'
    return
  }
  if (!f.leadName.trim() || !f.leadNim.trim()) {
    candidateFormError.value = 'Nama dan NIM calon utama/ketua wajib diisi.'
    return
  }
  if (f.type === 'pair') {
    if (!f.viceName.trim() || !f.viceNim.trim()) {
      candidateFormError.value = 'Untuk pasangan calon, nama dan NIM wakil ketua wajib diisi.'
      return
    }
  }

  const misi = f.misiText.split('\n').map(s => s.trim()).filter(Boolean)
  const pillars = f.pillarsText.split('\n').map(s => s.trim()).filter(Boolean)

  if (candidateModalMode.value === 'create') {
    const res = addCandidate({
      electionId: currentElection.value.id,
      type: f.type,
      ballotNumber: f.ballotNumber,
      name: f.name.trim(),
      tagline: f.tagline.trim(),
      coalition: f.coalition.trim() || (f.type === 'pair' ? 'Koalisi Paslon' : 'Independen'),
      color: f.color || '#582be8',
      photo: f.photo.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      status: f.status,
      leadCandidate: {
        name: f.leadName.trim(),
        nim: f.leadNim.trim(),
        faculty: f.leadFaculty.trim() || 'Fakultas Teknik',
        major: f.leadMajor.trim() || 'Teknik Informatika',
        semester: Number(f.leadSemester) || 6,
        gpa: Number(f.leadGpa) || 3.5
      },
      viceCandidate: f.type === 'pair' ? {
        name: f.viceName.trim(),
        nim: f.viceNim.trim(),
        faculty: f.viceFaculty.trim() || 'Fakultas Teknik',
        major: f.viceMajor.trim() || 'Teknik Informatika',
        semester: Number(f.viceSemester) || 6,
        gpa: Number(f.viceGpa) || 3.5
      } : undefined,
      visi: f.visi.trim() || 'Mewujudkan kepemimpinan mahasiswa yang berintegritas dan berdampak.',
      misi: misi.length > 0 ? misi : ['Digitalisasi layanan administrasi kemahasiswaan.'],
      pillars: pillars.length > 0 ? pillars : ['Tata Kelola Organisasi Transparan', 'Advokasi Mahasiswa'],
      documents: [
        { name: 'KRS & Transkrip IPK (≥ 3.25)', status: f.leadGpa >= 3.25 ? 'valid' : 'pending' },
        { name: 'Surat Bebas Sanksi Akademik & SKCK', status: f.status === 'Terverifikasi KPU' ? 'valid' : 'pending' },
        { name: 'Bukti Dukungan Mahasiswa Sah', status: f.status === 'Terverifikasi KPU' ? 'valid' : 'pending' }
      ],
      votesCount: 0
    })

    if (!res.success) {
      candidateFormError.value = res.message
      return
    }

    triggerToast(res.message)
    showCandidateModal.value = false
  } else if (candidateModalMode.value === 'edit' && editingCandidateId.value) {
    const res = updateCandidate(editingCandidateId.value, {
      type: f.type,
      ballotNumber: f.ballotNumber,
      name: f.name.trim(),
      tagline: f.tagline.trim(),
      coalition: f.coalition.trim(),
      color: f.color || '#582be8',
      photo: f.photo.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      status: f.status,
      leadCandidate: {
        name: f.leadName.trim(),
        nim: f.leadNim.trim(),
        faculty: f.leadFaculty.trim(),
        major: f.leadMajor.trim(),
        semester: Number(f.leadSemester) || 6,
        gpa: Number(f.leadGpa) || 3.5
      },
      viceCandidate: f.type === 'pair' ? {
        name: f.viceName.trim(),
        nim: f.viceNim.trim(),
        faculty: f.viceFaculty.trim(),
        major: f.viceMajor.trim(),
        semester: Number(f.viceSemester) || 6,
        gpa: Number(f.viceGpa) || 3.5
      } : undefined,
      visi: f.visi.trim(),
      misi: misi.length > 0 ? misi : undefined,
      pillars: pillars.length > 0 ? pillars : undefined
    })

    if (!res.success) {
      candidateFormError.value = res.message
      return
    }

    triggerToast(res.message)
    showCandidateModal.value = false
  }
}

// ─── Modal Detail State ───────────────────────────────────────────────
const showDetailCandidateModal = ref(false)
const selectedDetailCandidate = ref<ElectionCandidate | null>(null)

function openDetailCandidateModal(c: ElectionCandidate) {
  selectedDetailCandidate.value = c
  showDetailCandidateModal.value = true
}

// ─── Modal Konfirmasi Hapus State & Business Rule Check ───────────────
const showDeleteCandidateModal = ref(false)
const candidateToDelete = ref<ElectionCandidate | null>(null)
const deleteValidation = ref<{ allowed: boolean; reason?: string }>({ allowed: true })

function promptDeleteCandidate(c: ElectionCandidate) {
  candidateToDelete.value = c
  deleteValidation.value = canDeleteCandidate(c.id, currentElection.value.status)
  showDeleteCandidateModal.value = true
}

function confirmDeleteCandidate() {
  if (!candidateToDelete.value) return
  const res = deleteCandidate(candidateToDelete.value.id, currentElection.value.status)
  if (res.success) {
    triggerToast(res.message)
  } else {
    triggerToast(`Gagal: ${res.message}`)
  }
  showDeleteCandidateModal.value = false
  candidateToDelete.value = null
}

// ─── Operational Logs ────────────────────────────────────────────────
const auditLogs = ref([
  { id: 1, time: '14:28:10 WIB', title: 'Audit Konsensus SHA-256 Valid', desc: 'Node verifikasi #04 sinkron dengan ledger suara (2,150 suara terenkripsi).', type: 'success' },
  { id: 2, time: '13:50:00 WIB', title: 'Lonjakan Suara Masuk TPS 03', desc: 'Sebanyak 128 mahasiswa FT menggunakan hak suaranya dalam 30 menit.', type: 'info' },
  { id: 3, time: '10:15:22 WIB', title: 'Sinkronisasi Token Auth NIM Sukses', desc: '14 token cadangan diterbitkan untuk voter dengan kendala surel.', type: 'info' },
  { id: 4, time: '08:00:00 WIB', title: 'Bilik Suara Digital Resmi Dibuka', desc: 'Bilik suara dibuka serentak oleh Panitia Pemilihan Raya KPU.', type: 'start' }
])
</script>

<template>
  <div class="w-full flex flex-col gap-6 antialiased">
    <!-- ══════════════════════════════════════════════════════════════════
         TOP BREADCRUMB & BACK ACTION BAR
    ═══════════════════════════════════════════════════════════════════ -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200/80">
      <div class="flex items-center gap-2 text-xs text-slate-500">
        <NuxtLink
          to="/admin/elections"
          class="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:text-[#582be8] transition"
        >
          <span class="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Daftar Pemilihan</span>
        </NuxtLink>
        <span>/</span>
        <span class="font-mono text-slate-400">#{{ currentElection.id }}</span>
        <span>/</span>
        <span class="font-semibold text-[#582be8]">Kelola &amp; Monitoring</span>
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="copyElectionId"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
          title="Salin ID Pemilihan"
        >
          <span class="material-symbols-outlined text-[16px] text-slate-500">
            {{ copiedToast ? 'check' : 'content_copy' }}
          </span>
          <span>{{ copiedToast ? 'ID Tersalin!' : 'Salin ID' }}</span>
        </button>

        <button
          @click="openEditModal"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
        >
          <span class="material-symbols-outlined text-[16px] text-slate-500">edit</span>
          <span>Edit Agenda</span>
        </button>

        <NuxtLink
          to="/admin/audit"
          class="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-sm shadow-purple-600/20 transition"
        >
          <span class="material-symbols-outlined text-[16px]">receipt_long</span>
          <span>Berita Acara</span>
        </NuxtLink>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════
         HERO CARD: ELECTION IDENTITY & OPERATIONAL META
    ═══════════════════════════════════════════════════════════════════ -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-7 relative">
      <!-- Glow Accent -->
      <div class="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-purple-100/50 blur-3xl pointer-events-none"></div>

      <div class="relative flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <!-- Main Identity Left -->
        <div class="flex items-start gap-4 flex-1">
          <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#582be8] to-[#4319c9] text-white flex items-center justify-center shadow-md shadow-purple-600/25 shrink-0">
            <span class="material-symbols-outlined text-[32px] sm:text-[36px]">{{ currentElection.icon || 'ballot' }}</span>
          </div>

          <div class="space-y-2 flex-1 min-w-0">
            <!-- Badges Row -->
            <div class="flex flex-wrap items-center gap-2">
              <!-- ID Pill -->
              <span class="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                #{{ currentElection.id }}
              </span>

              <!-- Status Badge -->
              <span :class="['inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold border', statusTheme.badgeBg]">
                <span class="relative flex h-2 w-2">
                  <span v-if="statusTheme.ping" class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-emerald-400"></span>
                  <span :class="['relative inline-flex rounded-full h-2 w-2', statusTheme.dot]"></span>
                </span>
                {{ statusTheme.label }}
              </span>

              <!-- Period Pill -->
              <span class="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 text-[#582be8] border border-purple-100">
                Periode {{ currentElection.period }}
              </span>
            </div>

            <!-- Title -->
            <h1 class="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {{ currentElection.name }}
            </h1>

            <!-- Meta details row: Organisasi, Jabatan, Ruang Lingkup -->
            <div class="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-500 pt-1">
              <span class="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                <span class="material-symbols-outlined text-[16px] text-[#582be8]">corporate_fare</span>
                <strong>Organisasi:</strong> {{ currentElection.organization }}
              </span>

              <span class="text-slate-300">•</span>

              <span class="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                <span class="material-symbols-outlined text-[16px] text-[#582be8]">badge</span>
                <strong>Jabatan:</strong> {{ currentElection.position }}
              </span>

              <span class="text-slate-300">•</span>

              <span class="inline-flex items-center gap-1.5 text-slate-700 font-medium">
                <span class="material-symbols-outlined text-[16px] text-[#582be8]">layers</span>
                <strong>Tingkat:</strong> {{ currentElection.level }}
              </span>
            </div>
          </div>
        </div>

        <!-- Schedule & Operational Timer Box -->
        <div class="lg:w-80 shrink-0 bg-slate-50/90 rounded-xl border border-slate-200/90 p-4 space-y-2.5">
          <div class="flex items-center justify-between">
            <span class="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
              <span class="material-symbols-outlined text-[15px] text-[#582be8]">schedule</span>
              Jadwal Pemilihan
            </span>
            <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800" v-if="currentElection.status === 'Berlangsung'">
              WIB Online
            </span>
          </div>

          <div class="space-y-1 text-xs">
            <div class="flex justify-between items-center text-slate-600">
              <span class="text-slate-400">Mulai:</span>
              <span class="font-semibold text-slate-800">{{ currentElection.startDate ? formatDate(currentElection.startDate) + ' WIB' : 'Belum diatur' }}</span>
            </div>
            <div class="flex justify-between items-center text-slate-600">
              <span class="text-slate-400">Selesai:</span>
              <span class="font-semibold text-slate-800">{{ currentElection.endDate ? formatDate(currentElection.endDate) + ' WIB' : 'Belum diatur' }}</span>
            </div>
          </div>

          <div v-if="currentElection.status === 'Berlangsung'" class="pt-2 border-t border-slate-200/70 flex items-center justify-between text-xs">
            <span class="text-slate-500 font-medium">Mode Bilik Suara:</span>
            <span class="font-bold text-emerald-700 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
              Aktif &amp; Terbuka
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════
         KEY METRICS STRIP (4 METRIC CARDS)
    ═══════════════════════════════════════════════════════════════════ -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <!-- 1. DPT Terdaftar -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-200 transition">
        <div class="flex items-center justify-between">
          <span class="font-mono text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Pemilih Terdaftar (DPT)</span>
          <div class="w-10 h-10 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">how_to_reg</span>
          </div>
        </div>
        <div class="mt-3">
          <p class="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {{ currentElection.dptTarget > 0 ? currentElection.dptTarget.toLocaleString() : 'Belum ditentukan' }}
          </p>
          <p class="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
            Basis data mahasiswa aktif terverifikasi
          </p>
        </div>
      </div>

      <!-- 2. Suara Masuk & Turnout -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 transition">
        <div class="flex items-center justify-between">
          <span class="font-mono text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Suara Masuk (Partisipasi)</span>
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">how_to_vote</span>
          </div>
        </div>
        <div class="mt-3">
          <div class="flex items-baseline justify-between">
            <p class="text-2xl sm:text-3xl font-extrabold text-emerald-600">
              {{ currentElection.dptVoted.toLocaleString() }}
            </p>
            <span class="font-mono text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
              {{ currentElection.turnout }}%
            </span>
          </div>
          <!-- Progress bar -->
          <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-2.5">
            <div
              class="h-full bg-emerald-500 rounded-full transition-all duration-700"
              :style="{ width: Math.min(currentElection.turnout, 100) + '%' }"
            ></div>
          </div>
          <p class="text-[11px] text-slate-400 mt-1.5">
            {{ (currentElection.dptTarget - currentElection.dptVoted).toLocaleString() }} pemilih belum memberikan suara
          </p>
        </div>
      </div>

      <!-- 3. Paslon / Kandidat -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-200 transition">
        <div class="flex items-center justify-between">
          <span class="font-mono text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Kandidat / Paslon</span>
          <div class="w-10 h-10 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">groups</span>
          </div>
        </div>
        <div class="mt-3">
          <p class="text-2xl sm:text-3xl font-extrabold text-[#582be8]">
            {{ candidateStats.total }} <span class="text-xs font-normal text-slate-500">Kandidat Terdaftar</span>
          </p>
          <p class="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px] text-[#582be8]">verified</span>
            {{ candidateStats.verified }} Lolos Verifikasi KPU
          </p>
        </div>
      </div>

      <!-- 4. Kuorum & Integritas -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-200 transition">
        <div class="flex items-center justify-between">
          <span class="font-mono text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Batas Kuorum &amp; Keamanan</span>
          <div class="w-10 h-10 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center">
            <span class="material-symbols-outlined text-[22px]">verified_user</span>
          </div>
        </div>
        <div class="mt-3">
          <div class="flex items-baseline justify-between">
            <p class="text-base font-extrabold text-slate-800">
              {{ currentElection.turnout >= currentElection.quorumPercentage ? 'Kuorum Tercapai' : 'Menuju Kuorum' }}
            </p>
            <span class="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-purple-50 text-[#582be8]">
              Min. {{ currentElection.quorumPercentage }}%
            </span>
          </div>
          <p class="text-xs text-slate-400 mt-1 flex items-center gap-1">
            <span class="material-symbols-outlined text-[15px] text-emerald-600">lock</span>
            256-Bit SHA Enkripsi Aktif
          </p>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════
         SECTION NAVIGATION TABS
    ═══════════════════════════════════════════════════════════════════ -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
      <nav class="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" aria-label="Navigasi Pengelolaan Pemilihan">
        <button
          v-for="t in tabs"
          :key="t.key"
          @click="switchTab(t.key)"
          :class="[
            'inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 cursor-pointer',
            activeTab === t.key
              ? 'bg-[#582be8] text-white shadow-sm shadow-purple-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          ]"
        >
          <span class="material-symbols-outlined text-[18px]">{{ t.icon }}</span>
          <span>{{ t.label }}</span>
          <span
            v-if="t.count !== undefined"
            :class="[
              'px-2 py-0.5 rounded-full text-[10px] font-bold font-mono',
              activeTab === t.key ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
            ]"
          >
            {{ t.count }}
          </span>
        </button>
      </nav>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════
         TAB 1: RINGKASAN (SUMMARY / OVERVIEW)
    ═══════════════════════════════════════════════════════════════════ -->
    <div v-if="activeTab === 'ringkasan'" class="grid grid-cols-1 xl:grid-cols-12 gap-6">
      <!-- Left Column (8 cols): Mandat, Quick Candidates, Timeline, Actions -->
      <div class="xl:col-span-8 flex flex-col gap-6">
        <!-- Mandat & Deskripsi Card -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#582be8] text-[20px]">description</span>
              <h3 class="text-base font-bold text-slate-900">Deskripsi &amp; Mandat Pemilihan</h3>
            </div>
            <span class="text-xs text-slate-400">SK KPU No. 04/SK-PMR/2025</span>
          </div>

          <p class="text-sm text-slate-600 leading-relaxed">
            {{ currentElection.description }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-[10px] font-mono uppercase text-slate-400 font-semibold">Struktur Organisasi</span>
              <p class="text-xs font-bold text-slate-800 mt-0.5">{{ currentElection.organization }}</p>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-[10px] font-mono uppercase text-slate-400 font-semibold">Tingkat Penyelenggaraan</span>
              <p class="text-xs font-bold text-slate-800 mt-0.5">{{ currentElection.level }}</p>
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span class="text-[10px] font-mono uppercase text-slate-400 font-semibold">Periode Kepengurusan</span>
              <p class="text-xs font-bold text-slate-800 mt-0.5">Tahun Ajaran {{ currentElection.period }}</p>
            </div>
          </div>
        </div>

        <!-- Quick Candidates Overview -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#582be8] text-[20px]">how_to_vote</span>
              <h3 class="text-base font-bold text-slate-900">Kandidat Terdaftar di Bilik Suara</h3>
            </div>
            <button
              @click="switchTab('kandidat')"
              class="text-xs font-semibold text-[#582be8] hover:underline inline-flex items-center gap-1"
            >
              Kelola &amp; Detail Paslon
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <div v-if="currentElectionCandidates.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="c in currentElectionCandidates"
              :key="c.id"
              class="rounded-xl border border-slate-200 p-4 bg-slate-50/60 hover:bg-white hover:border-purple-200 hover:shadow-sm transition flex flex-col justify-between gap-3"
            >
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span
                    class="w-8 h-8 rounded-lg text-white font-extrabold text-sm flex items-center justify-center shadow-sm"
                    :style="{ backgroundColor: c.color || '#582be8' }"
                  >
                    {{ c.ballotNumber }}
                  </span>
                  <span
                    :class="[
                      'text-[10px] font-semibold px-2 py-0.5 rounded-full',
                      c.status === 'Terverifikasi KPU' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    ]"
                  >
                    {{ c.status }}
                  </span>
                </div>
                <h4 class="text-sm font-bold text-slate-900">{{ c.name }}</h4>
                <p class="text-xs text-slate-500 mt-1 line-clamp-1">{{ c.leadCandidate.name }}</p>
                <p v-if="c.viceCandidate" class="text-xs text-slate-500 line-clamp-1">&amp; {{ c.viceCandidate.name }}</p>
              </div>

              <div class="pt-2 border-t border-slate-200/70 text-[11px] italic text-[#582be8]">
                {{ c.tagline }}
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <span class="material-symbols-outlined text-slate-300 text-[36px]">group_off</span>
            <p class="text-xs font-semibold text-slate-600 mt-1">Belum ada paslon terdaftar dalam bilik</p>
            <p class="text-[11px] text-slate-400 max-w-sm mx-auto mt-0.5">
              Kelola paslon untuk menambahkan berkas calon pada pemilihan ini.
            </p>
          </div>
        </div>

        <!-- Tahapan Siklus Pemilihan Timeline -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#582be8] text-[20px]">timeline</span>
              <h3 class="text-base font-bold text-slate-900">Tahapan &amp; Jadwal Pelaksanaan</h3>
            </div>
            <span class="font-mono text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded">SOP KPU Kampus</span>
          </div>

          <div class="space-y-4 pt-2">
            <!-- Step 1 -->
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-[14px]">check</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between text-xs">
                  <strong class="text-slate-800">1. Pendaftaran &amp; Verifikasi Berkas Paslon</strong>
                  <span class="text-emerald-700 font-semibold">Selesai (100%)</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Pemeriksaan IPK, SKCK, dan kelengkapan visi misi.</p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-[14px]">check</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between text-xs">
                  <strong class="text-slate-800">2. Pengundian Nomor Urut &amp; Masa Kampanye</strong>
                  <span class="text-emerald-700 font-semibold">Selesai</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Debat kandidat terbuka di Auditorium Utama Kampus.</p>
              </div>
            </div>

            <!-- Step 3 (Active) -->
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-[#582be8] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm shadow-purple-600/30">
                <span class="material-symbols-outlined text-[14px]">radio_button_checked</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between text-xs">
                  <strong class="text-[#582be8]">3. Pemungutan Suara Digital (E-Voting)</strong>
                  <span class="text-[#582be8] font-bold">Sedang Berlangsung</span>
                </div>
                <p class="text-[11px] text-slate-500 mt-0.5">26 - 28 Februari 2025. Bilik digital aktif 24 jam dengan sistem autentikasi NIM.</p>
              </div>
            </div>

            <!-- Step 4 -->
            <div class="flex items-start gap-3">
              <div class="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-[14px]">lock</span>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between text-xs">
                  <strong class="text-slate-500">4. Pleno Rekapitulasi &amp; Berita Acara Resmi</strong>
                  <span class="text-slate-400 font-normal">Mendatang (1 Maret 2025)</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Penghitungan suara kriptografis &amp; penandatanganan saksi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (4 cols): Live Participation Meter, Activity Logs, Actions -->
      <div class="xl:col-span-4 flex flex-col gap-6">
        <!-- Live Turnout & Breakdown Card -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#582be8] text-[20px]">pie_chart</span>
              <h4 class="text-base font-bold text-slate-900">Statistik Partisipasi</h4>
            </div>
            <span class="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">LIVE</span>
          </div>

          <!-- Circular / Linear Meter Showcase -->
          <div class="space-y-3">
            <div class="flex justify-between items-baseline">
              <span class="text-xs text-slate-500">Persentase Masuk:</span>
              <span class="text-2xl font-black text-[#582be8] font-mono">{{ currentElection.turnout }}%</span>
            </div>

            <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-gradient-to-r from-[#582be8] to-[#4319c9] rounded-full transition-all duration-700"
                :style="{ width: currentElection.turnout + '%' }"
              ></div>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-slate-500">Total DPT Kuota:</span>
                <span class="font-bold text-slate-900">{{ currentElection.dptTarget.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Suara Terverifikasi:</span>
                <span class="font-bold text-emerald-600">{{ currentElection.dptVoted.toLocaleString() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Belum Menggunakan Hak:</span>
                <span class="font-bold text-amber-600">{{ (currentElection.dptTarget - currentElection.dptVoted).toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Navigation Actions -->
          <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              @click="switchTab('monitoring')"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-sm transition"
            >
              <span class="material-symbols-outlined text-[16px]">monitoring</span>
              Pantau Grafik &amp; Quorum Suara
            </button>
            <button
              @click="switchTab('pemilih')"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition"
            >
              <span class="material-symbols-outlined text-[16px]">how_to_reg</span>
              Lihat Daftar Pemilih Terdaftar
            </button>
          </div>
        </div>

        <!-- Log Aktivitas Operasional -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#582be8] text-[20px]">history</span>
              <h4 class="text-base font-bold text-slate-900">Aktivitas Sistem Terbaru</h4>
            </div>
            <span class="text-[10px] text-slate-400">Node Realtime</span>
          </div>

          <div class="space-y-3.5">
            <div v-for="log in auditLogs" :key="log.id" class="text-xs space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-800">{{ log.title }}</span>
                <span class="font-mono text-[10px] text-slate-400">{{ log.time }}</span>
              </div>
              <p class="text-slate-500 text-[11px] leading-relaxed">{{ log.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════
         TAB 2: KANDIDAT (CANDIDATES & PASLON)
    ═══════════════════════════════════════════════════════════════════ -->
    <div v-else-if="activeTab === 'kandidat'" class="space-y-6">
      <!-- Notice & Action Header -->
      <div class="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="rounded-full bg-purple-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#582be8]">
              AGENDA: #{{ currentElection.id }}
            </span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs text-slate-500 font-medium">{{ currentElection.position }}</span>
          </div>
          <h3 class="text-lg font-bold text-slate-900 mt-1">Kandidat &amp; Pasangan Calon Resmi</h3>
          <p class="text-xs text-slate-500 mt-0.5">
            Kelola data calon, penetapan nomor urut unik, verifikasi berkas, dan penetapan status kelayakan masuk ke bilik suara digital.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 shrink-0">
          <NuxtLink
            to="/admin/candidates"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
          >
            <span class="material-symbols-outlined text-[16px] text-slate-500">open_in_new</span>
            Rekap Berkas KPU
          </NuxtLink>

          <button
            type="button"
            @click="openCreateCandidateModal"
            class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition cursor-pointer"
          >
            <span class="material-symbols-outlined text-[18px]">person_add</span>
            + Tambah Paslon / Kandidat
          </button>
        </div>
      </div>

      <!-- Quick Metrics Strip Tab Kandidat -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">Total Terdaftar</span>
            <span class="material-symbols-outlined text-[20px] text-[#582be8]">groups</span>
          </div>
          <p class="text-2xl font-extrabold text-slate-900 mt-2">{{ candidateStats.total }}</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Calon / Paslon di pemilihan ini</p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-600">Siap di Bilik Suara</span>
            <span class="material-symbols-outlined text-[20px] text-emerald-600">how_to_vote</span>
          </div>
          <p class="text-2xl font-extrabold text-emerald-600 mt-2">{{ candidateStats.inBallot }}</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Lolos verifikasi KPU (100% Sah)</p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-600">Menunggu / Revisi</span>
            <span class="material-symbols-outlined text-[20px] text-amber-600">pending_actions</span>
          </div>
          <p class="text-2xl font-extrabold text-amber-600 mt-2">{{ candidateStats.pending }}</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Perlu tindak lanjut berkas</p>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex items-center justify-between text-slate-400">
            <span class="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-500">Ditolak</span>
            <span class="material-symbols-outlined text-[20px] text-slate-400">block</span>
          </div>
          <p class="text-2xl font-extrabold text-slate-500 mt-2">{{ candidateStats.rejected }}</p>
          <p class="text-[11px] text-slate-400 mt-0.5">Tidak memenuhi syarat KPU</p>
        </div>
      </div>

      <!-- Candidate Cards Grid -->
      <div v-if="currentElectionCandidates.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="c in currentElectionCandidates"
          :key="c.id"
          class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:border-purple-200 hover:shadow-md transition"
        >
          <div class="p-5 sm:p-6 space-y-4">
            <!-- Header: Number, Type & Badges -->
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-3">
                <span
                  class="w-12 h-12 rounded-2xl text-white text-xl font-extrabold flex items-center justify-center shadow-md shrink-0"
                  :style="{ backgroundColor: c.color || '#582be8' }"
                >
                  {{ c.ballotNumber }}
                </span>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <span class="font-mono text-[10px] uppercase font-bold text-slate-400">Nomor Urut</span>
                    <span class="text-[10px] font-semibold px-2 py-0.2 rounded bg-slate-100 text-slate-600">
                      {{ c.type === 'pair' ? 'Pasangan Calon' : 'Kandidat Tunggal' }}
                    </span>
                  </div>
                  <h4 class="text-base font-bold text-slate-900 truncate mt-0.5">{{ c.name }}</h4>
                </div>
              </div>

              <!-- Status Badge -->
              <div class="flex flex-col items-end gap-1 shrink-0">
                <span
                  :class="[
                    'text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap',
                    c.status === 'Terverifikasi KPU' ? 'bg-emerald-100 text-emerald-800' :
                    c.status === 'Ditolak' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  ]"
                >
                  {{ c.status }}
                </span>
                <span
                  :class="[
                    'text-[9px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1',
                    c.isInBallot ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                  ]"
                >
                  <span class="material-symbols-outlined text-[12px]">{{ c.isInBallot ? 'check' : 'close' }}</span>
                  {{ c.isInBallot ? 'Masuk Bilik Suara' : 'Belum di Bilik' }}
                </span>
              </div>
            </div>

            <!-- Tagline -->
            <div class="p-3 rounded-xl bg-purple-50 text-xs text-[#582be8] font-semibold italic text-center border border-purple-100">
              {{ c.tagline || '“Maju Bersama, Berintegritas Nyata”' }}
            </div>

            <!-- Members Information -->
            <div class="space-y-2 text-xs">
              <!-- Calon Ketua / Calon Utama -->
              <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-[10px] text-[#582be8] font-bold uppercase">
                    {{ c.type === 'pair' ? 'Calon Ketua' : 'Kandidat Utama' }}
                  </span>
                  <span v-if="c.leadCandidate.gpa" class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    IPK {{ c.leadCandidate.gpa.toFixed(2) }}
                  </span>
                </div>
                <p class="font-bold text-slate-900 mt-1">{{ c.leadCandidate.name }}</p>
                <p class="text-slate-500 text-[11px] mt-0.5">
                  NIM {{ c.leadCandidate.nim }} • {{ c.leadCandidate.major }} ({{ c.leadCandidate.faculty }})
                </p>
              </div>

              <!-- Calon Wakil (hanya jika pair) -->
              <div v-if="c.type === 'pair' && c.viceCandidate" class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-[10px] text-[#582be8] font-bold uppercase">Calon Wakil Ketua</span>
                  <span v-if="c.viceCandidate.gpa" class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    IPK {{ c.viceCandidate.gpa.toFixed(2) }}
                  </span>
                </div>
                <p class="font-bold text-slate-900 mt-1">{{ c.viceCandidate.name }}</p>
                <p class="text-slate-500 text-[11px] mt-0.5">
                  NIM {{ c.viceCandidate.nim }} • {{ c.viceCandidate.major }} ({{ c.viceCandidate.faculty }})
                </p>
              </div>
            </div>

            <!-- Pillars Snippet -->
            <div v-if="c.pillars && c.pillars.length > 0" class="space-y-1.5 pt-1">
              <span class="font-mono text-[10px] uppercase text-slate-400 font-bold">Pilar Program Kerja:</span>
              <ul class="space-y-1 text-xs text-slate-600">
                <li v-for="(p, idx) in c.pillars.slice(0, 3)" :key="idx" class="flex items-start gap-1.5">
                  <span class="material-symbols-outlined text-emerald-600 text-[15px] shrink-0 mt-0.5">check_circle</span>
                  <span class="line-clamp-1">{{ p }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Card Actions Footer -->
          <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
            <span class="text-slate-500 font-mono text-[11px] truncate max-w-[140px]" :title="c.coalition">
              {{ c.coalition || 'Independen' }}
            </span>

            <div class="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                @click="openDetailCandidateModal(c)"
                class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                title="Lihat Detail Profil & Berkas"
              >
                <span class="material-symbols-outlined text-[16px]">visibility</span>
                <span>Detail</span>
              </button>

              <button
                type="button"
                @click="openEditCandidateModal(c)"
                class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition cursor-pointer"
                title="Edit Data Calon"
              >
                <span class="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit</span>
              </button>

              <button
                type="button"
                @click="promptDeleteCandidate(c)"
                class="inline-flex items-center justify-center p-1.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-200 transition cursor-pointer"
                title="Hapus Kandidat"
              >
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="p-10 rounded-2xl border border-dashed border-slate-300 bg-white text-center space-y-3">
        <div class="w-16 h-16 rounded-2xl bg-purple-50 text-[#582be8] flex items-center justify-center mx-auto">
          <span class="material-symbols-outlined text-[36px]">group_off</span>
        </div>
        <h4 class="text-base font-bold text-slate-800">Belum Ada Calon Terdaftar</h4>
        <p class="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Belum ada pasangan calon atau kandidat independen yang ditetapkan pada agenda pemilihan <strong>#{{ currentElection.id }}</strong>. Daftarkan calon baru untuk memulai pengisian bilik suara.
        </p>
        <button
          type="button"
          @click="openCreateCandidateModal"
          class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition cursor-pointer mt-2"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          + Tambah Paslon / Kandidat Pertama
        </button>
      </div>

      <!-- SOP & Regulasi KPU Card -->
      <div class="p-6 rounded-2xl border border-purple-100 bg-purple-50/50 flex flex-col sm:flex-row items-start gap-4">
        <div class="w-10 h-10 rounded-xl bg-purple-100 text-[#582be8] flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[24px]">gavel</span>
        </div>
        <div class="space-y-1 text-xs flex-1">
          <h4 class="font-bold text-slate-900">Aturan Bisnis &amp; Regulasi Pengelolaan Paslon</h4>
          <p class="text-slate-600 leading-relaxed">
            Nomor urut bersifat unik khusus pada agenda pemilihan ini. Kandidat hanya berhak tampil di bilik suara digital pemilih jika telah berstatus <strong>Terverifikasi KPU</strong>. Penghapusan calon dilarang keras apabila pemilihan sedang/telah berjalan atau telah mengantongi suara tercatat demi menjaga integritas data audit.
          </p>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════
         TAB 3: PEMILIH (VOTERS & DPT)
    ═══════════════════════════════════════════════════════════════════ -->
    <div v-else-if="activeTab === 'pemilih'" class="space-y-6">
      <!-- Subheader & Quick Action Bar -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="rounded-full bg-purple-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-[#582be8]">
              PENETAPAN DPT ELEKSI: #{{ currentElection.id }}
            </span>
            <span class="text-xs text-slate-400">•</span>
            <span class="text-xs text-slate-500 font-medium">Bilik Suara Independen</span>
          </div>
          <h3 class="text-lg font-bold text-slate-900">
            Daftar Pemilih Tetap (DPT) Pemilihan
          </h3>
          <p class="text-xs text-slate-500 leading-relaxed max-w-2xl">
            Kelola daftar mahasiswa yang secara sah memiliki hak suara pada <strong>{{ currentElection.name }}</strong>. Satu mahasiswa dapat memiliki hak suara di beberapa pemilihan secara independen.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5 shrink-0">
          <NuxtLink
            to="/admin/voter-list"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
          >
            <span class="material-symbols-outlined text-[16px] text-slate-500">dataset</span>
            Master Data Mahasiswa
          </NuxtLink>

          <button
            type="button"
            @click="openAddVotersModal"
            class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition cursor-pointer"
          >
            <span class="material-symbols-outlined text-[18px]">person_add</span>
            + Tambah Pemilih ke DPT
          </button>
        </div>
      </div>

      <!-- 4 Mini DPT Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div class="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">Total DPT Terdaftar</span>
            <div class="w-8 h-8 rounded-lg bg-purple-50 text-[#582be8] flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">how_to_reg</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-extrabold text-slate-900">{{ dptStats.total }}</span>
            <span class="text-xs text-slate-500">Mahasiswa</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-1">Ditetapkan sah masuk DPT</p>
        </div>

        <div class="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">Sudah Memilih</span>
            <div class="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">check_circle</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-extrabold text-emerald-600">{{ dptStats.voted }}</span>
            <span class="text-xs text-emerald-700">Suara Masuk</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-1">Telah menggunakan hak suara</p>
        </div>

        <div class="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">Belum Memilih</span>
            <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">hourglass_top</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-extrabold text-amber-600">{{ dptStats.unvoted }}</span>
            <span class="text-xs text-amber-700">Belum Memberikan Suara</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-1">Menunggu akses bilik suara</p>
        </div>

        <div class="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between">
            <span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">Tingkat Turnout</span>
            <div class="w-8 h-8 rounded-lg bg-purple-50 text-[#582be8] flex items-center justify-center">
              <span class="material-symbols-outlined text-[18px]">pie_chart</span>
            </div>
          </div>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-2xl font-extrabold text-[#582be8] font-mono">{{ dptStats.turnout }}%</span>
            <span class="text-xs text-slate-500">Partisipasi</span>
          </div>
          <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
            <div class="h-full bg-[#582be8] rounded-full" :style="{ width: dptStats.turnout + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Search & Filters Strip -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
          <div class="relative flex-1">
            <span class="absolute left-3.5 top-2.5 text-slate-400 material-symbols-outlined text-[18px]">search</span>
            <input
              v-model="dptSearchQuery"
              type="text"
              placeholder="Cari pemilih di DPT via NIM, nama, atau email..."
              class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
            />
          </div>

          <select
            v-model="dptStatusFilter"
            class="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#582be8] cursor-pointer"
          >
            <option value="Semua">Semua Status Voting</option>
            <option value="Sudah Memilih">Sudah Memilih</option>
            <option value="Belum Memilih">Belum Memilih</option>
          </select>

          <select
            v-model="dptFacultyFilter"
            class="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#582be8] cursor-pointer"
          >
            <option value="Semua">Semua Fakultas</option>
            <option value="FT">Teknik (FT)</option>
            <option value="FASILKOM">Ilmu Komputer (Fasilkom)</option>
            <option value="FEB">Ekonomi &amp; Bisnis (FEB)</option>
            <option value="FH">Hukum (FH)</option>
            <option value="FPSI">Psikologi (FPsi)</option>
            <option value="FK">Kedokteran (FK)</option>
          </select>
        </div>

        <button
          type="button"
          @click="dptSearchQuery = ''; dptFacultyFilter = 'Semua'; dptStatusFilter = 'Semua'"
          title="Reset Filter DPT"
          class="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <span class="material-symbols-outlined text-[18px]">filter_alt_off</span>
        </button>
      </div>

      <!-- Voters Table for this Election -->
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 class="text-sm font-bold text-slate-900">Mahasiswa Terdaftar di Bilik Pemilihan</h4>
            <p class="text-xs text-slate-400 mt-0.5">
              Menampilkan {{ filteredElectionVoters.length }} dari total {{ currentElectionVoters.length }} pemilih terdaftar
            </p>
          </div>
          <span class="font-mono text-xs font-bold text-[#582be8] bg-purple-50 px-2.5 py-1 rounded-lg self-start sm:self-auto">
            {{ dptStats.voted }} / {{ dptStats.total }} Suara Masuk
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50/80 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-200">
              <tr>
                <th class="w-10 px-4 py-3.5 text-center">
                  <input
                    type="checkbox"
                    :checked="isAllDptSelected"
                    @change="toggleSelectAllDpt"
                    class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer"
                  />
                </th>
                <th class="px-5 py-3.5">Identitas Mahasiswa</th>
                <th class="px-5 py-3.5">Fakultas &amp; Program Studi</th>
                <th class="px-5 py-3.5">Angkatan / Sem</th>
                <th class="px-5 py-3.5">Status Hak Suara (Agenda Ini)</th>
                <th class="px-5 py-3.5">Kesiapan Token</th>
                <th class="px-5 py-3.5 text-right">Waktu Memilih</th>
                <th class="px-5 py-3.5 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr
                v-for="v in filteredElectionVoters"
                :key="v.dptId"
                class="hover:bg-slate-50/80 transition"
              >
                <!-- Checkbox -->
                <td class="px-4 py-3.5 text-center">
                  <input
                    type="checkbox"
                    :value="v.dptId"
                    v-model="selectedDptIds"
                    class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer"
                  />
                </td>

                <!-- Identitas -->
                <td class="px-5 py-3.5">
                  <div class="flex items-center gap-3">
                    <div :class="['w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs', v.avatarColor]">
                      {{ v.initials }}
                    </div>
                    <div>
                      <p class="font-bold text-slate-900">{{ v.name }}</p>
                      <p class="font-mono text-[11px] text-[#582be8] font-semibold">NIM {{ v.nim }}</p>
                      <p class="text-[11px] text-slate-400">{{ v.email }}</p>
                    </div>
                  </div>
                </td>

                <!-- Fakultas & Prodi -->
                <td class="px-5 py-3.5">
                  <p class="text-slate-800 font-medium">{{ v.faculty }}</p>
                  <p class="text-slate-400 text-[11px]">{{ v.major }}</p>
                </td>

                <!-- Angkatan / Sem -->
                <td class="px-5 py-3.5">
                  <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600 font-medium">
                    {{ v.academicYear }} / Sem {{ v.semester }}
                  </span>
                </td>

                <!-- Status Hak Suara (Election Specific) -->
                <td class="px-5 py-3.5">
                  <span
                    :class="[
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold',
                      v.hasVoted ? 'bg-purple-100 text-[#582be8]' : 'bg-amber-100 text-amber-800'
                    ]"
                  >
                    <span class="material-symbols-outlined text-[14px]">
                      {{ v.hasVoted ? 'how_to_vote' : 'hourglass_top' }}
                    </span>
                    {{ v.hasVoted ? 'Sudah Memilih' : 'Belum Memilih' }}
                  </span>
                </td>

                <!-- Status Token Auth -->
                <td class="px-5 py-3.5">
                  <span
                    :class="[
                      'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold',
                      v.tokenSent ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    ]"
                  >
                    <span :class="['w-1.5 h-1.5 rounded-full', v.tokenSent ? 'bg-emerald-500' : 'bg-slate-400']"></span>
                    {{ v.tokenSent ? 'Token Terkirim' : 'Belum Generate' }}
                  </span>
                </td>

                <!-- Waktu Memilih -->
                <td class="px-5 py-3.5 text-right font-mono text-[11px] text-slate-500">
                  {{ v.votedAt || '-' }}
                </td>

                <!-- Aksi: Cabut Hak Suara -->
                <td class="px-5 py-3.5 text-center">
                  <button
                    v-if="!v.hasVoted"
                    type="button"
                    @click="promptRemoveVoter(v)"
                    title="Cabut Hak Suara dari Pemilihan Ini"
                    class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-[18px]">person_remove</span>
                  </button>
                  <span
                    v-else
                    title="Hak suara telah digunakan di bilik (tidak dapat dicabut sesuai audit suara)"
                    class="p-1.5 text-slate-300 cursor-not-allowed inline-block"
                  >
                    <span class="material-symbols-outlined text-[18px]">lock</span>
                  </span>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="filteredElectionVoters.length === 0">
                <td colspan="8" class="text-center py-12 text-slate-500">
                  <span class="material-symbols-outlined text-[36px] text-slate-300">group_off</span>
                  <p class="text-xs font-semibold text-slate-700 mt-2">Tidak ada pemilih yang sesuai dengan kriteria filter.</p>
                  <p class="text-[11px] text-slate-400 mt-0.5">
                    Gunakan tombol <strong>+ Tambah Pemilih ke DPT</strong> di atas untuk menetapkan hak suara mahasiswa.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Information & Policy Card -->
      <div class="p-5 rounded-2xl border border-dashed border-slate-300 bg-white space-y-2">
        <div class="flex items-center gap-2 text-xs font-bold text-slate-800">
          <span class="material-symbols-outlined text-[#582be8] text-[18px]">info</span>
          Prinsip Penetapan DPT per Pemilihan
        </div>
        <p class="text-[11px] text-slate-500 leading-relaxed">
          Mahasiswa yang tercantum dalam tabel di atas hanya memiliki hak suara pada agenda <strong>#{{ currentElection.id }}</strong>. Penetapan atau pencabutan hak suara di pemilihan ini tidak mempengaruhi partisipasi mahasiswa pada pemilihan lain. Mahasiswa yang sudah menggunakan hak suaranya tidak dapat dihapus demi menjamin integritas audit bilik digital.
        </p>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════
         TAB 4: MONITORING (LIVE VOTING & AUDIT)
    ═══════════════════════════════════════════════════════════════════ -->
    <div v-else-if="activeTab === 'monitoring'" class="space-y-6">
      <!-- Live Monitoring Banner -->
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl text-white p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span class="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">Live Bilik Suara Aktif</span>
          </div>
          <h3 class="text-xl font-bold">Monitoring Partisipasi &amp; Integritas Kriptografis</h3>
          <p class="text-xs text-slate-300 max-w-xl">
            Setiap suara yang masuk dienkripsi secara langsung di sisi pemilih dan diarsipkan ke dalam ledger konsensus tanpa menyimpan data identitas pemilih ke dalam surat suara.
          </p>
        </div>

        <div class="flex items-center gap-3 shrink-0">
          <NuxtLink
            to="/admin/audit"
            class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#582be8] hover:bg-[#471ec7] text-white text-xs font-semibold rounded-xl shadow-md shadow-purple-600/30 transition"
          >
            <span class="material-symbols-outlined text-[18px]">verified</span>
            Buka Audit &amp; Rekapitulasi
          </NuxtLink>
        </div>
      </div>

      <!-- Turnout Charts & Quorum Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Partisipasi Fakultas Breakdown -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 class="text-sm font-bold text-slate-900">Distribusi Partisipasi per Fakultas</h4>
            <span class="text-[11px] font-mono text-slate-400">8 Fakultas Terdaftar</span>
          </div>

          <div class="space-y-3.5">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-medium text-slate-700">Fakultas Teknik</span>
                <span class="font-mono font-bold text-[#582be8]">82.4% (824 / 1,000)</span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#582be8] rounded-full" style="width: 82.4%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-medium text-slate-700">Fakultas Ekonomika &amp; Bisnis</span>
                <span class="font-mono font-bold text-[#582be8]">76.1% (685 / 900)</span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#582be8] rounded-full" style="width: 76.1%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-medium text-slate-700">Fakultas Hukum</span>
                <span class="font-mono font-bold text-[#582be8]">89.5% (447 / 500)</span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#582be8] rounded-full" style="width: 89.5%"></div>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-xs mb-1">
                <span class="font-medium text-slate-700">Fakultas Kedokteran</span>
                <span class="font-mono font-bold text-[#582be8]">57.9% (197 / 340)</span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-[#582be8] rounded-full" style="width: 57.9%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Node & Kriptografi Status -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 class="text-sm font-bold text-slate-900">Status Node &amp; Integritas Bilik</h4>
            <span class="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">100% ONLINE</span>
          </div>

          <div class="grid grid-cols-2 gap-3 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 font-mono text-[10px]">ENKRIPSI BILIK</span>
              <p class="font-bold text-slate-900 mt-1">AES-GCM-256</p>
              <p class="text-[10px] text-emerald-600 mt-0.5">Private Key Panitia Aman</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 font-mono text-[10px]">HASH KONSENSUS</span>
              <p class="font-bold text-slate-900 mt-1">SHA-256 Chain</p>
              <p class="text-[10px] text-emerald-600 mt-0.5">Block #10492 Terverifikasi</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 font-mono text-[10px]">RATE LIMIT BILIK</span>
              <p class="font-bold text-slate-900 mt-1">20 Req / Detik</p>
              <p class="text-[10px] text-slate-500 mt-0.5">Anti-Bruteforce Aktif</p>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span class="text-slate-400 font-mono text-[10px]">AUDIT LOG TRAIL</span>
              <p class="font-bold text-slate-900 mt-1">Immutable Log</p>
              <p class="text-[10px] text-emerald-600 mt-0.5">Tersimpan di 4 Node</p>
            </div>
          </div>

          <div class="p-3.5 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 flex items-start gap-2.5">
            <span class="material-symbols-outlined text-[18px] text-[#582be8] shrink-0 mt-0.5">security</span>
            <p class="leading-relaxed">
              Hasil suara bilik bersifat rahasia dan rekapitulasi perolehan nomor urut baru dapat dihitung dan didekripsi setelah pemilihan resmi dinyatakan <strong>Selesai</strong> oleh Ketua KPU.
            </p>
          </div>
        </div>
      </div>

      <!-- Honest Placeholder Notice -->
      <div class="p-5 rounded-2xl border border-dashed border-slate-300 bg-white text-center space-y-1">
        <p class="text-xs font-semibold text-slate-700">Integrasi Webhook Real-time Stream</p>
        <p class="text-[11px] text-slate-400 max-w-lg mx-auto">
          Pada versi saat ini visualisasi monitoring menggunakan simulasi periodik. Streaming socket live audit node backend akan dihubungkan saat integrasi server utama diaktifkan.
        </p>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════
         TAB 5: PENGATURAN (ELECTION RULES & CONFIG)
    ═══════════════════════════════════════════════════════════════════ -->
    <div v-else-if="activeTab === 'pengaturan'" class="space-y-6">
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 class="text-base font-bold text-slate-900">Aturan &amp; Kebijakan Bilik Pemilihan</h3>
            <p class="text-xs text-slate-400 mt-0.5">Konfigurasi operasional pemungutan suara untuk agenda ini</p>
          </div>
          <button
            @click="openEditModal"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-sm transition"
          >
            <span class="material-symbols-outlined text-[16px]">tune</span>
            Ubah Pengaturan
          </button>
        </div>

        <div class="space-y-4 text-xs">
          <!-- Config item 1 -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p class="font-bold text-slate-900">Metode Verifikasi Pemilih</p>
              <p class="text-slate-500 mt-0.5">Autentikasi kombinasi Nomor Induk Mahasiswa (NIM) + Kode Token Rahasia KPU.</p>
            </div>
            <span class="font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full text-[11px]">NIM + Token OTP</span>
          </div>

          <!-- Config item 2 -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p class="font-bold text-slate-900">Transparansi Hasil ke Pemilih</p>
              <p class="text-slate-500 mt-0.5">Grafik perolehan calon disembunyikan sampai pemungutan suara ditutup untuk mencegah bandwagon effect.</p>
            </div>
            <span class="font-semibold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full text-[11px]">Terkunci Hingga Pleno</span>
          </div>

          <!-- Config item 3 -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p class="font-bold text-slate-900">Batas Waktu Sesi Bilik Suara</p>
              <p class="text-slate-500 mt-0.5">Maksimal durasi voter berada di dalam bilik suara digital sebelum sesi otomatis kedaluwarsa.</p>
            </div>
            <span class="font-mono font-bold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-[11px]">3 Menit</span>
          </div>

          <!-- Config item 4 -->
          <div class="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div>
              <p class="font-bold text-slate-900">Target Kuorum Minimal</p>
              <p class="text-slate-500 mt-0.5">Persentase DPT minimum yang harus hadir agar hasil pemilihan dinyatakan sah sesuai AD/ART.</p>
            </div>
            <span class="font-mono font-bold text-[#582be8] bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg text-[11px]">{{ currentElection.quorumPercentage }}% DPT</span>
          </div>
        </div>
      </div>

      <!-- Danger Zone -->
      <div class="bg-white rounded-2xl border border-red-200 shadow-sm p-6 space-y-4">
        <div class="flex items-center gap-2 text-red-600">
          <span class="material-symbols-outlined text-[20px]">warning</span>
          <h4 class="text-base font-bold">Zona Pengendalian Kritis</h4>
        </div>
        <p class="text-xs text-slate-500 leading-relaxed">
          Tindakan di bawah ini berdampak langsung pada bilik suara mahasiswa dan catatan rekapitulasi audit.
        </p>

        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            class="px-4 py-2 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition inline-flex items-center gap-1.5"
            @click="alert('Tindakan ini memerlukan otoritas ganda Ketua KPU')"
          >
            <span class="material-symbols-outlined text-[16px]">pause_circle</span>
            Jeda Pemilihan Sementara
          </button>

          <NuxtLink
            to="/admin/elections"
            class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition inline-flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-[16px]">arrow_back</span>
            Kembali ke Daftar Pemilihan
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: EDIT PEMILIHAN (LOCAL STATE)
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showEditModal = false"></div>

          <!-- Modal Body -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-slate-200">
            <div class="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px]">edit_calendar</span>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">Edit Pengaturan Pemilihan</h3>
                  <p class="font-mono text-[10px] text-slate-400">#{{ currentElection.id }}</p>
                </div>
              </div>
              <button @click="showEditModal = false" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div class="p-6 space-y-4">
              <!-- Nama -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Nama Pemilihan</label>
                <input
                  v-model="editForm.name"
                  type="text"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                >
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1">Deskripsi &amp; Mandat</label>
                <textarea
                  v-model="editForm.description"
                  rows="3"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition resize-none"
                ></textarea>
              </div>

              <!-- Organisasi & Jabatan -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Organisasi</label>
                  <input
                    v-model="editForm.organization"
                    type="text"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                  >
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Jabatan yang Diperebutkan</label>
                  <input
                    v-model="editForm.position"
                    type="text"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                  >
                </div>
              </div>

              <!-- Tingkat, Periode & Status -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Tingkat</label>
                  <input
                    v-model="editForm.level"
                    type="text"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                  >
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Periode</label>
                  <input
                    v-model="editForm.period"
                    type="text"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                  >
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Status Operasional</label>
                  <select
                    v-model="editForm.status"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#582be8] cursor-pointer"
                  >
                    <option value="Berlangsung">Berlangsung</option>
                    <option value="Terjadwal">Terjadwal</option>
                    <option value="Draft">Draft</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <!-- Dates -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Waktu Mulai</label>
                  <input
                    v-model="editForm.startDate"
                    type="datetime-local"
                    class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#582be8]"
                  >
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1">Waktu Selesai</label>
                  <input
                    v-model="editForm.endDate"
                    type="datetime-local"
                    class="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#582be8]"
                  >
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3 z-10">
              <button
                @click="showEditModal = false"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                @click="saveEditForm"
                class="px-5 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: TAMBAH PEMILIH KE DPT
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showAddVotersModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showAddVotersModal = false"></div>

          <!-- Modal Body -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col border border-slate-200 overflow-hidden">
            <!-- Modal Header -->
            <div class="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10 shrink-0">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">person_add</span>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">Tetapkan Mahasiswa ke DPT Pemilihan</h3>
                  <p class="font-mono text-[11px] text-slate-400">
                    Agenda #{{ currentElection.id }} — {{ currentElection.name }}
                  </p>
                </div>
              </div>
              <button
                @click="showAddVotersModal = false"
                class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Search & Filter Controls -->
            <div class="p-4 bg-slate-50/80 border-b border-slate-100 flex flex-col sm:flex-row gap-3 shrink-0">
              <div class="relative flex-1">
                <span class="absolute left-3 top-2.5 text-slate-400 material-symbols-outlined text-[18px]">search</span>
                <input
                  v-model="addVoterSearch"
                  type="text"
                  placeholder="Cari mahasiswa master via NIM, nama, atau email..."
                  class="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8]"
                />
              </div>

              <select
                v-model="addVoterFaculty"
                class="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#582be8] cursor-pointer"
              >
                <option value="Semua">Semua Fakultas</option>
                <option value="FT">Teknik (FT)</option>
                <option value="FASILKOM">Ilmu Komputer (Fasilkom)</option>
                <option value="FEB">Ekonomi &amp; Bisnis (FEB)</option>
                <option value="FH">Hukum (FH)</option>
                <option value="FPSI">Psikologi (FPsi)</option>
                <option value="FK">Kedokteran (FK)</option>
              </select>
            </div>

            <!-- Batch Selection Header Bar -->
            <div class="px-6 py-2.5 bg-purple-50/60 border-b border-purple-100/80 flex items-center justify-between text-xs shrink-0">
              <label class="flex items-center gap-2 cursor-pointer font-medium text-slate-700 select-none">
                <input
                  type="checkbox"
                  :checked="isAllUnassignedSelected"
                  @change="toggleSelectAllUnassigned"
                  class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer"
                />
                <span>Pilih Semua Mahasiswa yang Belum Terdaftar</span>
              </label>

              <span class="font-mono text-xs font-bold text-[#582be8]">
                {{ selectedStudentIdsToAdd.length }} mahasiswa dipilih
              </span>
            </div>

            <!-- Scrollable Student List Table -->
            <div class="overflow-y-auto flex-1 p-0">
              <table class="w-full text-left text-xs border-collapse">
                <thead class="bg-slate-50 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-100 sticky top-0 z-10">
                  <tr>
                    <th class="w-12 px-4 py-3 text-center">Pilih</th>
                    <th class="px-4 py-3">Mahasiswa (Master Data)</th>
                    <th class="px-4 py-3">Fakultas / Prodi</th>
                    <th class="px-4 py-3">Angkatan</th>
                    <th class="px-4 py-3 text-center">Status di Pemilihan Ini</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr
                    v-for="s in availableMasterStudents"
                    :key="s.id"
                    :class="[
                      'transition-colors',
                      s.isRegistered
                        ? 'bg-slate-50/50 opacity-60'
                        : selectedStudentIdsToAdd.includes(s.id)
                        ? 'bg-purple-50/40'
                        : 'hover:bg-slate-50/80'
                    ]"
                  >
                    <!-- Checkbox -->
                    <td class="px-4 py-3.5 text-center">
                      <input
                        v-if="!s.isRegistered"
                        type="checkbox"
                        :value="s.id"
                        v-model="selectedStudentIdsToAdd"
                        class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer"
                      />
                      <span
                        v-else
                        class="material-symbols-outlined text-[18px] text-emerald-600 inline-block"
                        title="Sudah terdaftar di DPT pemilihan ini"
                      >
                        check_circle
                      </span>
                    </td>

                    <!-- Mahasiswa -->
                    <td class="px-4 py-3.5">
                      <div class="flex items-center gap-2.5">
                        <div :class="['w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0', s.avatarColor]">
                          {{ s.initials }}
                        </div>
                        <div>
                          <p class="font-bold text-slate-900">{{ s.name }}</p>
                          <p class="font-mono text-[10px] text-slate-400">NIM {{ s.nim }} • {{ s.email }}</p>
                        </div>
                      </div>
                    </td>

                    <!-- Fakultas & Prodi -->
                    <td class="px-4 py-3.5">
                      <p class="font-medium text-slate-800">{{ s.faculty }}</p>
                      <p class="text-slate-400 text-[10px]">{{ s.major }}</p>
                    </td>

                    <!-- Angkatan / Semester -->
                    <td class="px-4 py-3.5">
                      <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                        {{ s.academicYear }} (Sem {{ s.semester }})
                      </span>
                    </td>

                    <!-- Status di Pemilihan Ini -->
                    <td class="px-4 py-3.5 text-center">
                      <span
                        v-if="s.isRegistered"
                        class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800"
                      >
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Sudah di DPT
                      </span>
                      <span
                        v-else
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600"
                      >
                        Belum Terdaftar
                      </span>
                    </td>
                  </tr>

                  <tr v-if="availableMasterStudents.length === 0">
                    <td colspan="5" class="text-center py-8 text-slate-400 text-xs">
                      Tidak ada mahasiswa yang sesuai dengan pencarian.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Modal Footer -->
            <div class="bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-between shrink-0">
              <span class="text-xs text-slate-500">
                Mahasiswa terpilih akan langsung didaftarkan ke DPT <strong>#{{ currentElection.id }}</strong>.
              </span>

              <div class="flex items-center gap-2.5">
                <button
                  type="button"
                  @click="showAddVotersModal = false"
                  class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  @click="submitAssignVoters"
                  :disabled="selectedStudentIdsToAdd.length === 0"
                  :class="[
                    'px-5 py-2 text-xs font-semibold rounded-xl shadow-md transition cursor-pointer',
                    selectedStudentIdsToAdd.length > 0
                      ? 'bg-[#582be8] hover:bg-[#471ec7] text-white shadow-purple-600/25'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                  ]"
                >
                  Tetapkan Hak Suara ({{ selectedStudentIdsToAdd.length }})
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: KONFIRMASI CABUT HAK SUARA DPT
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showRemoveVoterModal && voterToRemove" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showRemoveVoterModal = false"></div>

          <!-- Dialog Body -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
            <div class="p-6 text-center">
              <div class="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                <span class="material-symbols-outlined text-[30px]">person_remove</span>
              </div>

              <h3 class="text-base font-bold text-slate-900">Cabut Hak Suara Pemilih?</h3>
              <p class="text-xs text-slate-500 mt-2 leading-relaxed">
                Apakah Anda yakin ingin mencabut hak suara mahasiswa <strong class="text-slate-900">{{ voterToRemove.name }}</strong> (NIM: <strong class="text-slate-900 font-mono">{{ voterToRemove.nim }}</strong>) dari agenda pemilihan <strong>#{{ currentElection.id }}</strong>?
              </p>

              <div class="p-3 bg-amber-50 rounded-xl border border-amber-100 mt-3.5 text-[11px] text-amber-800 text-left flex items-start gap-2">
                <span class="material-symbols-outlined text-[16px] text-amber-600 shrink-0 mt-0.5">info</span>
                <span>Mahasiswa ini belum memberikan suara di bilik. Hak suara dapat ditetapkan kembali kapan saja sebelum pemilihan ditutup.</span>
              </div>
            </div>

            <div class="px-6 pb-6 flex items-center gap-3">
              <button
                type="button"
                @click="showRemoveVoterModal = false"
                class="flex-1 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                @click="confirmRemoveVoter"
                class="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/25 transition cursor-pointer"
              >
                Ya, Cabut Hak Suara
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: FORM TAMBAH / EDIT KANDIDAT
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showCandidateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showCandidateModal = false"></div>

          <!-- Dialog Body -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <!-- Header -->
            <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px]">{{ candidateModalMode === 'create' ? 'person_add' : 'edit' }}</span>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-slate-900">
                    {{ candidateModalMode === 'create' ? 'Tambah Paslon / Kandidat Baru' : 'Edit Data Paslon / Kandidat' }}
                  </h3>
                  <p class="text-[11px] text-slate-500">Agenda: #{{ currentElection.id }} · {{ currentElection.name }}</p>
                </div>
              </div>
              <button
                type="button"
                @click="showCandidateModal = false"
                class="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Form Body (Scrollable) -->
            <form @submit.prevent="saveCandidateForm" class="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              <!-- Error Banner -->
              <div v-if="candidateFormError" class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2">
                <span class="material-symbols-outlined text-[18px] shrink-0 text-red-600 mt-0.5">error</span>
                <span class="font-medium leading-relaxed">{{ candidateFormError }}</span>
              </div>

              <!-- Tipe Pencalonan: Pasangan vs Tunggal -->
              <div>
                <label class="block font-semibold text-slate-700 mb-1.5">Tipe Pencalonan Pemilihan</label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    @click="candidateForm.type = 'pair'"
                    :class="[
                      'p-3 rounded-xl border flex items-center gap-3 transition text-left cursor-pointer',
                      candidateForm.type === 'pair' ? 'border-[#582be8] bg-purple-50 text-[#582be8]' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    ]"
                  >
                    <span class="material-symbols-outlined text-[22px]">groups</span>
                    <div>
                      <p class="font-bold">Pasangan Calon</p>
                      <p class="text-[10px] text-slate-500">Ketua &amp; Wakil Ketua (Eksekutif)</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    @click="candidateForm.type = 'single'"
                    :class="[
                      'p-3 rounded-xl border flex items-center gap-3 transition text-left cursor-pointer',
                      candidateForm.type === 'single' ? 'border-[#582be8] bg-purple-50 text-[#582be8]' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    ]"
                  >
                    <span class="material-symbols-outlined text-[22px]">person</span>
                    <div>
                      <p class="font-bold">Kandidat Tunggal</p>
                      <p class="text-[10px] text-slate-500">Anggota Legislatif / Independen</p>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Nomor Urut & Nama Paslon -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">
                    Nomor Urut Resmi <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="candidateForm.ballotNumber"
                    type="text"
                    placeholder="Contoh: 01"
                    maxlength="3"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] focus:ring-1 focus:ring-[#582be8] font-mono font-bold text-center outline-none"
                    required
                  />
                  <p class="text-[10px] text-slate-400 mt-1">Unik di pemilihan ini</p>
                </div>

                <div class="sm:col-span-2">
                  <label class="block font-semibold text-slate-700 mb-1">
                    Nama Tampilan Paslon / Calon <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="candidateForm.name"
                    type="text"
                    placeholder="Contoh: Farhan & Nabila atau Bagus Wicaksono"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] focus:ring-1 focus:ring-[#582be8] outline-none"
                    required
                  />
                </div>
              </div>

              <!-- Tagline & Koalisi -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Slogan / Tagline Calon</label>
                  <input
                    v-model="candidateForm.tagline"
                    type="text"
                    placeholder="“Sinergi Nyata, Berdampak Bersama”"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] focus:ring-1 focus:ring-[#582be8] outline-none"
                  />
                </div>

                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Partai / Koalisi / Dukungan</label>
                  <input
                    v-model="candidateForm.coalition"
                    type="text"
                    placeholder="Contoh: Koalisi Mahasiswa Bersatu / Independen"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] focus:ring-1 focus:ring-[#582be8] outline-none"
                  />
                </div>
              </div>

              <!-- Status Verifikasi KPU & Warna Identitas -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Status Verifikasi KPU</label>
                  <select
                    v-model="candidateForm.status"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none bg-white font-medium"
                  >
                    <option value="Terverifikasi KPU">Terverifikasi KPU (Sah di Bilik Suara)</option>
                    <option value="Menunggu Berkas">Menunggu Berkas (Pemeriksaan SKCK/LPJ)</option>
                    <option value="Revisi Dukungan">Revisi Dukungan (Kekurangan KTM/Tanda Tangan)</option>
                    <option value="Ditolak">Ditolak (Tidak Memenuhi Syarat)</option>
                  </select>
                  <p class="text-[10px] text-slate-400 mt-1">
                    {{ candidateForm.status === 'Terverifikasi KPU' ? '✓ Otomatis berstatus Siap di Bilik Suara' : '⚠️ Tidak akan tampil di bilik suara sampai terverifikasi' }}
                  </p>
                </div>

                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Warna Representasi Calon</label>
                  <div class="flex items-center gap-2">
                    <input
                      v-model="candidateForm.color"
                      type="color"
                      class="h-9 w-12 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                    />
                    <input
                      v-model="candidateForm.color"
                      type="text"
                      class="flex-1 px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Section: Calon Utama / Ketua -->
              <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 class="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-[#582be8]">
                  <span class="material-symbols-outlined text-[16px]">badge</span>
                  {{ candidateForm.type === 'pair' ? 'Data Calon Ketua' : 'Data Calon Utama' }}
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Nama Lengkap <span class="text-red-500">*</span></label>
                    <input
                      v-model="candidateForm.leadName"
                      type="text"
                      placeholder="Nama lengkap mahasiswa"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:border-[#582be8] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">NIM Mahasiswa <span class="text-red-500">*</span></label>
                    <input
                      v-model="candidateForm.leadNim"
                      type="text"
                      placeholder="Contoh: 2108101012"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono focus:border-[#582be8] outline-none"
                      required
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Fakultas</label>
                    <input
                      v-model="candidateForm.leadFaculty"
                      type="text"
                      placeholder="Fakultas Teknik"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Program Studi</label>
                    <input
                      v-model="candidateForm.leadMajor"
                      type="text"
                      placeholder="S1 Teknik Informatika"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">IPK Kumulatif</label>
                    <input
                      v-model="candidateForm.leadGpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.00"
                      placeholder="3.75"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Section: Calon Wakil Ketua (hanya jika pair) -->
              <div v-if="candidateForm.type === 'pair'" class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 class="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-[#582be8]">
                  <span class="material-symbols-outlined text-[16px]">how_to_reg</span>
                  Data Calon Wakil Ketua
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Nama Lengkap Wakil <span class="text-red-500">*</span></label>
                    <input
                      v-model="candidateForm.viceName"
                      type="text"
                      placeholder="Nama lengkap wakil ketua"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:border-[#582be8] outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">NIM Mahasiswa <span class="text-red-500">*</span></label>
                    <input
                      v-model="candidateForm.viceNim"
                      type="text"
                      placeholder="Contoh: 2102102045"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono focus:border-[#582be8] outline-none"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Fakultas</label>
                    <input
                      v-model="candidateForm.viceFaculty"
                      type="text"
                      placeholder="Fakultas Ekonomika & Bisnis"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Program Studi</label>
                    <input
                      v-model="candidateForm.viceMajor"
                      type="text"
                      placeholder="S1 Akuntansi"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">IPK Kumulatif</label>
                    <input
                      v-model="candidateForm.viceGpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.00"
                      placeholder="3.80"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Visi, Misi, Pilar -->
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Visi Calon</label>
                <textarea
                  v-model="candidateForm.visi"
                  rows="2"
                  placeholder="Visi utama yang diperjuangkan paslon..."
                  class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Misi Calon (1 baris per butir)</label>
                  <textarea
                    v-model="candidateForm.misiText"
                    rows="3"
                    placeholder="Misi butir 1&#10;Misi butir 2&#10;Misi butir 3"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none"
                  ></textarea>
                </div>

                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Pilar Program Kerja (1 baris per pilar)</label>
                  <textarea
                    v-model="candidateForm.pillarsText"
                    rows="3"
                    placeholder="Digitalisasi Ormawa Kampus&#10;Layanan Advokasi 24/7&#10;Pemerataan Dana Riset"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none"
                  ></textarea>
                </div>
              </div>
            </form>

            <!-- Footer Action Buttons -->
            <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
              <button
                type="button"
                @click="showCandidateModal = false"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                @click="saveCandidateForm"
                class="px-5 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition cursor-pointer"
              >
                {{ candidateModalMode === 'create' ? 'Simpan Data Kandidat' : 'Perbarui Kandidat' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: DETAIL PROFIL & BERKAS KANDIDAT
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showDetailCandidateModal && selectedDetailCandidate" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showDetailCandidateModal = false"></div>

          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <!-- Header with Color Bar -->
            <div
              class="p-6 text-white relative overflow-hidden"
              :style="{ backgroundColor: selectedDetailCandidate.color || '#582be8' }"
            >
              <div class="flex items-start justify-between relative z-10">
                <div class="flex items-center gap-3">
                  <span class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white text-2xl font-black flex items-center justify-center border border-white/30">
                    {{ selectedDetailCandidate.ballotNumber }}
                  </span>
                  <div>
                    <span class="text-[10px] font-mono uppercase tracking-wider text-white/80 font-bold">
                      {{ selectedDetailCandidate.type === 'pair' ? 'Pasangan Calon Resmi' : 'Kandidat Independen Resmi' }}
                    </span>
                    <h3 class="text-xl font-extrabold text-white">{{ selectedDetailCandidate.name }}</h3>
                    <p class="text-xs text-white/90 italic mt-0.5">{{ selectedDetailCandidate.tagline }}</p>
                  </div>
                </div>

                <button
                  type="button"
                  @click="showDetailCandidateModal = false"
                  class="w-8 h-8 rounded-lg bg-black/20 text-white hover:bg-black/40 flex items-center justify-center transition"
                >
                  <span class="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <!-- Status Pills Header -->
              <div class="mt-4 flex flex-wrap items-center gap-2 relative z-10">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-900 shadow-sm">
                  {{ selectedDetailCandidate.status }}
                </span>
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1',
                    selectedDetailCandidate.isInBallot ? 'bg-emerald-400 text-emerald-950' : 'bg-amber-300 text-amber-950'
                  ]"
                >
                  <span class="material-symbols-outlined text-[13px]">{{ selectedDetailCandidate.isInBallot ? 'how_to_vote' : 'hourglass_empty' }}</span>
                  {{ selectedDetailCandidate.isInBallot ? 'Sah di Bilik Suara' : 'Menunggu Penetapan' }}
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/20 text-white">
                  {{ selectedDetailCandidate.coalition }}
                </span>
              </div>
            </div>

            <!-- Detail Content (Scrollable) -->
            <div class="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              <!-- Profil Calon Ketua & Wakil -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-mono text-[10px] text-[#582be8] font-bold uppercase">
                      {{ selectedDetailCandidate.type === 'pair' ? 'Calon Ketua' : 'Kandidat Utama' }}
                    </span>
                    <span v-if="selectedDetailCandidate.leadCandidate.gpa" class="font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[10px]">
                      IPK {{ selectedDetailCandidate.leadCandidate.gpa.toFixed(2) }}
                    </span>
                  </div>
                  <p class="text-sm font-bold text-slate-900">{{ selectedDetailCandidate.leadCandidate.name }}</p>
                  <p class="text-slate-600 font-mono">NIM: {{ selectedDetailCandidate.leadCandidate.nim }}</p>
                  <p class="text-slate-500">{{ selectedDetailCandidate.leadCandidate.major }} · {{ selectedDetailCandidate.leadCandidate.faculty }}</p>
                </div>

                <div v-if="selectedDetailCandidate.type === 'pair' && selectedDetailCandidate.viceCandidate" class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-mono text-[10px] text-[#582be8] font-bold uppercase">Calon Wakil Ketua</span>
                    <span v-if="selectedDetailCandidate.viceCandidate.gpa" class="font-bold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[10px]">
                      IPK {{ selectedDetailCandidate.viceCandidate.gpa.toFixed(2) }}
                    </span>
                  </div>
                  <p class="text-sm font-bold text-slate-900">{{ selectedDetailCandidate.viceCandidate.name }}</p>
                  <p class="text-slate-600 font-mono">NIM: {{ selectedDetailCandidate.viceCandidate.nim }}</p>
                  <p class="text-slate-500">{{ selectedDetailCandidate.viceCandidate.major }} · {{ selectedDetailCandidate.viceCandidate.faculty }}</p>
                </div>
              </div>

              <!-- Visi & Misi -->
              <div class="space-y-3">
                <div>
                  <h4 class="font-bold text-slate-900 mb-1 text-xs">Visi Calon:</h4>
                  <p class="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {{ selectedDetailCandidate.visi || 'Belum ada visi tercatat.' }}
                  </p>
                </div>

                <div v-if="selectedDetailCandidate.misi && selectedDetailCandidate.misi.length > 0">
                  <h4 class="font-bold text-slate-900 mb-1 text-xs">Misi Calon:</h4>
                  <ul class="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <li v-for="(m, idx) in selectedDetailCandidate.misi" :key="idx" class="flex items-start gap-2 text-slate-600">
                      <span class="font-mono font-bold text-[#582be8] text-[11px]">{{ idx + 1 }}.</span>
                      <span>{{ m }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Pilar Program Kerja -->
              <div v-if="selectedDetailCandidate.pillars && selectedDetailCandidate.pillars.length > 0">
                <h4 class="font-bold text-slate-900 mb-1.5 text-xs">Pilar Program Kerja Strategis:</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    v-for="(p, idx) in selectedDetailCandidate.pillars"
                    :key="idx"
                    class="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2"
                  >
                    <span class="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                    <span class="font-medium text-slate-800">{{ p }}</span>
                  </div>
                </div>
              </div>

              <!-- Dokumen Persyaratan -->
              <div v-if="selectedDetailCandidate.documents && selectedDetailCandidate.documents.length > 0">
                <h4 class="font-bold text-slate-900 mb-1.5 text-xs">Status Kelengkapan Berkas KPU:</h4>
                <div class="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <div
                    v-for="(doc, idx) in selectedDetailCandidate.documents"
                    :key="idx"
                    class="p-3 flex items-center justify-between"
                  >
                    <span class="font-medium text-slate-800">{{ doc.name }}</span>
                    <span
                      :class="[
                        'px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1',
                        doc.status === 'valid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      ]"
                    >
                      <span class="material-symbols-outlined text-[13px]">{{ doc.status === 'valid' ? 'check' : 'schedule' }}</span>
                      {{ doc.note || (doc.status === 'valid' ? 'Memenuhi' : 'Menunggu Verifikasi') }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Audit Meta -->
              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Perolehan Suara: <strong class="text-slate-700 font-mono">{{ selectedDetailCandidate.votesCount.toLocaleString() }} Suara</strong></span>
                <span>ID: {{ selectedDetailCandidate.id }}</span>
              </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                @click="showDetailCandidateModal = false"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                Tutup
              </button>

              <button
                type="button"
                @click="showDetailCandidateModal = false; openEditCandidateModal(selectedDetailCandidate)"
                class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md transition cursor-pointer"
              >
                <span class="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit Data Calon Ini</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: KONFIRMASI HAPUS KANDIDAT (DENGAN PROTEKSI ATURAN BISNIS)
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showDeleteCandidateModal && candidateToDelete" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showDeleteCandidateModal = false"></div>

          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
            <div class="p-6 text-center">
              <!-- Icon -->
              <div
                :class="[
                  'w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4',
                  deleteValidation.allowed ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                ]"
              >
                <span class="material-symbols-outlined text-[30px]">{{ deleteValidation.allowed ? 'delete_forever' : 'block' }}</span>
              </div>

              <!-- Title -->
              <h3 class="text-base font-bold text-slate-900">
                {{ deleteValidation.allowed ? 'Hapus Data Kandidat?' : 'Penghapusan Ditolak Sistem' }}
              </h3>

              <!-- Condition: Not Allowed (Business Rule Block) -->
              <div v-if="!deleteValidation.allowed" class="mt-3 space-y-3 text-left">
                <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs leading-relaxed flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-red-600 text-[20px] shrink-0 mt-0.5">gavel</span>
                  <div>
                    <strong class="block mb-1 font-bold">Aturan Bisnis KPU Berlaku:</strong>
                    {{ deleteValidation.reason }}
                  </div>
                </div>
                <p class="text-[11px] text-slate-400 text-center">
                  Data calon terlindungi oleh aturan integritas pemilihan digital A-Voting.
                </p>
              </div>

              <!-- Condition: Allowed -->
              <div v-else class="mt-2 text-xs text-slate-500 leading-relaxed">
                <p>
                  Apakah Anda yakin ingin menghapus calon <strong class="text-slate-900">{{ candidateToDelete.name }}</strong> (Nomor Urut <strong class="text-slate-900 font-mono">#{{ candidateToDelete.ballotNumber }}</strong>) dari agenda pemilihan <strong>#{{ currentElection.id }}</strong>?
                </p>
                <p class="mt-2 text-[11px] text-red-600 font-medium">
                  Tindakan ini permanen dan nomor urut #{{ candidateToDelete.ballotNumber }} akan tersedia kembali untuk calon lain.
                </p>
              </div>
            </div>

            <!-- Footer Buttons -->
            <div class="px-6 pb-6 flex items-center gap-3">
              <button
                type="button"
                @click="showDeleteCandidateModal = false"
                class="flex-1 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                {{ deleteValidation.allowed ? 'Batal' : 'Tutup' }}
              </button>

              <button
                v-if="deleteValidation.allowed"
                type="button"
                @click="confirmDeleteCandidate"
                class="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/25 transition cursor-pointer"
              >
                Ya, Hapus Kandidat
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         TOAST NOTIFICATION POPUP
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showToast"
          class="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 text-xs"
        >
          <span class="material-symbols-outlined text-emerald-400 text-[20px] shrink-0">check_circle</span>
          <span class="flex-1 leading-snug">{{ toastMessage }}</span>
          <button @click="showToast = false" class="text-slate-400 hover:text-white shrink-0">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .relative,
.modal-fade-leave-to .relative {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}
</style>
