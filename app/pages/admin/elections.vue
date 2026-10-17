<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// ─── Types ──────────────────────────────────────────────────────────
interface Election {
  id: string
  name: string
  description: string
  level: string
  icon: string
  status: 'Draft' | 'Terjadwal' | 'Berlangsung' | 'Selesai'
  startDate: string
  endDate: string
  candidates: number
  candidateLabel: string
  dptTarget: number
  dptVoted: number
  turnout: number
  info: string
  createdAt: string
}

// ─── Status Helpers ─────────────────────────────────────────────────
const statusConfig: Record<string, { bg: string; text: string; dot: string; borderHover: string; iconBg: string; iconText: string; ping?: boolean }> = {
  Berlangsung: { bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500', borderHover: 'hover:border-emerald-200', iconBg: 'bg-purple-50', iconText: 'text-[#582be8]', ping: true },
  Terjadwal: { bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500', borderHover: 'hover:border-amber-200', iconBg: 'bg-amber-50', iconText: 'text-amber-600' },
  Draft: { bg: 'bg-slate-100', text: 'text-slate-600', dot: 'bg-slate-400', borderHover: 'hover:border-slate-300', iconBg: 'bg-slate-100', iconText: 'text-slate-600' },
  Selesai: { bg: 'bg-indigo-100', text: 'text-indigo-800', dot: 'bg-indigo-500', borderHover: 'hover:border-indigo-200', iconBg: 'bg-indigo-50', iconText: 'text-indigo-600' }
}

const allowedTransitions: Record<string, string[]> = {
  Draft: ['Terjadwal'],
  Terjadwal: ['Berlangsung', 'Draft'],
  Berlangsung: ['Selesai'],
  Selesai: []
}

// ─── Mock Data ──────────────────────────────────────────────────────
const elections = ref<Election[]>([
  {
    id: 'PEM-2025-01',
    name: 'Pemilihan Raya Ketua & Wakil Ketua BEM 2025',
    description: 'Pemilihan umum raya untuk menentukan Ketua dan Wakil Ketua Badan Eksekutif Mahasiswa periode 2025/2026.',
    level: 'Universitas (BEM KM)',
    icon: 'account_balance',
    status: 'Berlangsung',
    startDate: '2025-02-26T08:00',
    endDate: '2025-02-28T17:00',
    candidates: 3,
    candidateLabel: 'Pasangan Calon Terdaftar',
    dptTarget: 2740,
    dptVoted: 2150,
    turnout: 78.4,
    info: '',
    createdAt: '2025-01-15T10:00'
  },
  {
    id: 'PEM-2025-02',
    name: 'Dewan Perwakilan Mahasiswa (DPM) Fakultas Teknik 2025',
    description: 'Pemilihan anggota Dewan Perwakilan Mahasiswa Fakultas Teknik untuk periode 2025/2026.',
    level: 'Fakultas Teknik',
    icon: 'engineering',
    status: 'Berlangsung',
    startDate: '2025-02-27T09:00',
    endDate: '2025-03-01T20:00',
    candidates: 5,
    candidateLabel: 'Kandidat Independen',
    dptTarget: 2028,
    dptVoted: 1270,
    turnout: 62.6,
    info: '',
    createdAt: '2025-01-20T14:00'
  },
  {
    id: 'PEM-2025-03',
    name: 'Pemilihan Ketua Himpunan Mahasiswa Informatika (HMIF)',
    description: 'Pemilihan Ketua dan Wakil Ketua Himpunan Mahasiswa Informatika untuk periode kepengurusan baru.',
    level: 'Jurusan Informatika',
    icon: 'terminal',
    status: 'Terjadwal',
    startDate: '2025-03-05T08:00',
    endDate: '2025-03-07T17:00',
    candidates: 2,
    candidateLabel: 'Calon Ketua',
    dptTarget: 820,
    dptVoted: 0,
    turnout: 0,
    info: '',
    createdAt: '2025-02-01T09:00'
  },
  {
    id: 'PEM-2025-04',
    name: 'Pemilihan Ketua Himpunan Mahasiswa Manajemen (HMM)',
    description: 'Pemilihan Ketua Himpunan Mahasiswa Manajemen. Menunggu kelengkapan berkas visi-misi calon paslon.',
    level: 'Jurusan Manajemen',
    icon: 'drive_file_rename_outline',
    status: 'Draft',
    startDate: '',
    endDate: '',
    candidates: 1,
    candidateLabel: 'Paslon Masuk Verifikasi',
    dptTarget: 0,
    dptVoted: 0,
    turnout: 0,
    info: 'Menunggu kelengkapan berkas visi-misi calon paslon',
    createdAt: '2025-02-10T11:00'
  },
  {
    id: 'PEM-2024-09',
    name: 'Musyawarah Mahasiswa BEM Fakultas Hukum 2024/2025',
    description: 'Pemilihan BEM Fakultas Hukum yang telah selesai diselenggarakan.',
    level: 'Fakultas Hukum',
    icon: 'gavel',
    status: 'Selesai',
    startDate: '2025-01-13T08:00',
    endDate: '2025-01-15T17:00',
    candidates: 2,
    candidateLabel: 'Paslon',
    dptTarget: 1210,
    dptVoted: 1140,
    turnout: 94.2,
    info: 'Hasil rekapitulasi resmi telah ditandatangani KPU Kampus',
    createdAt: '2024-12-20T08:00'
  },
  {
    id: 'PEM-2025-05',
    name: 'Pemilihan Ketua BEM Fakultas Ekonomika & Bisnis',
    description: 'Pemilihan Ketua BEM FEB untuk periode 2025/2026.',
    level: 'Fakultas Ekonomika & Bisnis',
    icon: 'account_balance_wallet',
    status: 'Berlangsung',
    startDate: '2025-02-25T08:00',
    endDate: '2025-02-27T17:00',
    candidates: 4,
    candidateLabel: 'Pasangan Calon',
    dptTarget: 1850,
    dptVoted: 1420,
    turnout: 76.8,
    info: '',
    createdAt: '2025-01-18T10:00'
  },
  {
    id: 'PEM-2025-06',
    name: 'Pemilihan Ketua Himpunan Mahasiswa Akuntansi (HMA)',
    description: 'Draft pemilihan ketua HMA, berkas masih dalam tahap verifikasi.',
    level: 'Jurusan Akuntansi',
    icon: 'calculate',
    status: 'Draft',
    startDate: '',
    endDate: '',
    candidates: 0,
    candidateLabel: 'Calon',
    dptTarget: 0,
    dptVoted: 0,
    turnout: 0,
    info: 'Berkas pendaftaran calon belum lengkap',
    createdAt: '2025-02-15T13:00'
  },
  {
    id: 'PEM-2025-07',
    name: 'Pemilihan Ketua Himpunan Mahasiswa Sipil (HMS)',
    description: 'Pemilihan Ketua HMS yang telah dijadwalkan dan menunggu waktu pelaksanaan.',
    level: 'Jurusan Teknik Sipil',
    icon: 'construction',
    status: 'Terjadwal',
    startDate: '2025-03-10T08:00',
    endDate: '2025-03-12T17:00',
    candidates: 3,
    candidateLabel: 'Calon Ketua',
    dptTarget: 650,
    dptVoted: 0,
    turnout: 0,
    info: '',
    createdAt: '2025-02-05T09:00'
  },
  {
    id: 'PEM-2024-10',
    name: 'Pemilihan Ketua Senat Mahasiswa 2024',
    description: 'Pemilihan Ketua Senat Mahasiswa yang telah selesai.',
    level: 'Universitas (BEM KM)',
    icon: 'groups',
    status: 'Selesai',
    startDate: '2024-12-01T08:00',
    endDate: '2024-12-03T17:00',
    candidates: 2,
    candidateLabel: 'Paslon',
    dptTarget: 3200,
    dptVoted: 2880,
    turnout: 90.0,
    info: 'Hasil rekapitulasi resmi telah diarsipkan',
    createdAt: '2024-11-10T08:00'
  },
  {
    id: 'PEM-2024-11',
    name: 'Musyawarah Mahasiswa Fakultas Teknik 2024',
    description: 'Pemilihan pengurus BEM FT yang telah selesai diselenggarakan.',
    level: 'Fakultas Teknik',
    icon: 'precision_manufacturing',
    status: 'Selesai',
    startDate: '2024-11-20T08:00',
    endDate: '2024-11-22T17:00',
    candidates: 3,
    candidateLabel: 'Paslon',
    dptTarget: 1980,
    dptVoted: 1750,
    turnout: 88.4,
    info: 'Hasil rekapitulasi resmi telah diarsipkan',
    createdAt: '2024-11-01T08:00'
  },
  {
    id: 'PEM-2025-08',
    name: 'Pemilihan Ketua Himpunan Mahasiswa Elektro (HME)',
    description: 'Draft persiapan pemilihan ketua HME.',
    level: 'Jurusan Teknik Elektro',
    icon: 'bolt',
    status: 'Draft',
    startDate: '',
    endDate: '',
    candidates: 0,
    candidateLabel: 'Calon',
    dptTarget: 0,
    dptVoted: 0,
    turnout: 0,
    info: 'Tahap penentuan kuota DPT',
    createdAt: '2025-02-18T14:00'
  },
  {
    id: 'PEM-2025-09',
    name: 'Pemilihan Ketua Himpunan Mahasiswa Arsitektur (HMA)',
    description: 'Draft persiapan pemilihan ketua HMA.',
    level: 'Jurusan Arsitektur',
    icon: 'architecture',
    status: 'Draft',
    startDate: '',
    endDate: '',
    candidates: 0,
    candidateLabel: 'Calon',
    dptTarget: 0,
    dptVoted: 0,
    turnout: 0,
    info: 'Menunggu SK Panitia',
    createdAt: '2025-02-20T10:00'
  }
])

// ─── Next ID Counter ────────────────────────────────────────────────
let nextIdCounter = 10

function generateId(): string {
  nextIdCounter++
  return `PEM-2025-${String(nextIdCounter).padStart(2, '0')}`
}

// ─── Search & Filter State ──────────────────────────────────────────
const searchQuery = ref('')
const activeStatusFilter = ref<string>('Semua')
const statusFilters = ['Semua', 'Berlangsung', 'Terjadwal', 'Draft', 'Selesai']

// ─── Computed Stats ─────────────────────────────────────────────────
const stats = computed(() => {
  const total = elections.value.length
  const berlangsung = elections.value.filter(e => e.status === 'Berlangsung').length
  const terjadwal = elections.value.filter(e => e.status === 'Terjadwal').length
  const draft = elections.value.filter(e => e.status === 'Draft').length
  const selesai = elections.value.filter(e => e.status === 'Selesai').length
  return { total, berlangsung, terjadwal, draft, selesai }
})

// ─── Filtered Elections ─────────────────────────────────────────────
const filteredElections = computed(() => {
  let result = elections.value

  // Status filter
  if (activeStatusFilter.value !== 'Semua') {
    result = result.filter(e => e.status === activeStatusFilter.value)
  }

  // Search filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      e.level.toLowerCase().includes(q)
    )
  }

  return result
})

// Status filter count
function statusCount(status: string): number {
  if (status === 'Semua') return elections.value.length
  return elections.value.filter(e => e.status === status).length
}

// ─── Date Formatting ────────────────────────────────────────────────
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
  if (!start && !end) return 'Belum ditentukan'
  if (!end) return `Mulai ${formatDate(start)} WIB`
  return `${formatDate(start)} - ${formatDate(end)} WIB`
}

function formatDatetimeLocal(dateStr: string): string {
  if (!dateStr) return ''
  // Ensure it returns format suitable for datetime-local input
  const d = new Date(dateStr)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

// ─── Modal State: Add ───────────────────────────────────────────────
const showAddModal = ref(false)
const addForm = ref({
  name: '',
  description: '',
  level: '',
  startDate: '',
  endDate: ''
})
const addErrors = ref<Record<string, string>>({})

function openAddModal() {
  addForm.value = { name: '', description: '', level: '', startDate: '', endDate: '' }
  addErrors.value = {}
  showAddModal.value = true
}

function validateAddForm(): boolean {
  const errors: Record<string, string> = {}
  if (!addForm.value.name.trim()) errors.name = 'Nama pemilihan wajib diisi.'
  if (!addForm.value.level.trim()) errors.level = 'Tingkat pemilihan wajib diisi.'
  if (addForm.value.startDate && addForm.value.endDate) {
    if (new Date(addForm.value.endDate) <= new Date(addForm.value.startDate)) {
      errors.endDate = 'Tanggal selesai harus setelah tanggal mulai.'
    }
  }
  addErrors.value = errors
  return Object.keys(errors).length === 0
}

function submitAddForm() {
  if (!validateAddForm()) return

  const hasSchedule = addForm.value.startDate && addForm.value.endDate
  const newElection: Election = {
    id: generateId(),
    name: addForm.value.name.trim(),
    description: addForm.value.description.trim(),
    level: addForm.value.level.trim(),
    icon: 'ballot',
    status: hasSchedule ? 'Terjadwal' : 'Draft',
    startDate: addForm.value.startDate || '',
    endDate: addForm.value.endDate || '',
    candidates: 0,
    candidateLabel: 'Calon',
    dptTarget: 0,
    dptVoted: 0,
    turnout: 0,
    info: hasSchedule ? '' : 'Persiapan awal, berkas belum dilengkapi',
    createdAt: new Date().toISOString()
  }

  elections.value.unshift(newElection)
  showAddModal.value = false
}

// ─── Modal State: Detail ────────────────────────────────────────────
const showDetailModal = ref(false)
const detailElection = ref<Election | null>(null)

function openDetailModal(election: Election) {
  detailElection.value = { ...election }
  showDetailModal.value = true
}

// ─── Modal State: Edit ──────────────────────────────────────────────
const showEditModal = ref(false)
const editForm = ref({
  id: '',
  name: '',
  description: '',
  level: '',
  status: '' as Election['status'],
  startDate: '',
  endDate: ''
})
const editErrors = ref<Record<string, string>>({})

function openEditModal(election: Election) {
  editForm.value = {
    id: election.id,
    name: election.name,
    description: election.description,
    level: election.level,
    status: election.status,
    startDate: formatDatetimeLocal(election.startDate),
    endDate: formatDatetimeLocal(election.endDate)
  }
  editErrors.value = {}
  showEditModal.value = true
}

function getEditableStatuses(currentStatus: Election['status']): string[] {
  // Always include current status + allowed transitions
  const transitions = allowedTransitions[currentStatus] || []
  return [currentStatus, ...transitions]
}

function validateEditForm(): boolean {
  const errors: Record<string, string> = {}
  if (!editForm.value.name.trim()) errors.name = 'Nama pemilihan wajib diisi.'
  if (!editForm.value.level.trim()) errors.level = 'Tingkat pemilihan wajib diisi.'

  // If status requires schedule
  if (editForm.value.status === 'Terjadwal' || editForm.value.status === 'Berlangsung') {
    if (!editForm.value.startDate) errors.startDate = 'Tanggal mulai wajib diisi untuk status ini.'
    if (!editForm.value.endDate) errors.endDate = 'Tanggal selesai wajib diisi untuk status ini.'
  }

  if (editForm.value.startDate && editForm.value.endDate) {
    if (new Date(editForm.value.endDate) <= new Date(editForm.value.startDate)) {
      errors.endDate = 'Tanggal selesai harus setelah tanggal mulai.'
    }
  }

  editErrors.value = errors
  return Object.keys(errors).length === 0
}

function submitEditForm() {
  if (!validateEditForm()) return

  const idx = elections.value.findIndex(e => e.id === editForm.value.id)
  if (idx === -1) return

  elections.value[idx] = {
    ...elections.value[idx],
    name: editForm.value.name.trim(),
    description: editForm.value.description.trim(),
    level: editForm.value.level.trim(),
    status: editForm.value.status,
    startDate: editForm.value.startDate || '',
    endDate: editForm.value.endDate || ''
  }

  showEditModal.value = false
}

// ─── Confirmation Dialog ────────────────────────────────────────────
const showConfirmDialog = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmAction = ref<(() => void) | null>(null)

function openConfirmDialog(title: string, message: string, action: () => void) {
  confirmTitle.value = title
  confirmMessage.value = message
  confirmAction.value = action
  showConfirmDialog.value = true
}

function executeConfirm() {
  if (confirmAction.value) confirmAction.value()
  showConfirmDialog.value = false
  confirmAction.value = null
}

function cancelConfirm() {
  showConfirmDialog.value = false
  confirmAction.value = null
}

// ─── Delete Draft ───────────────────────────────────────────────────
function confirmDeleteDraft(election: Election) {
  openConfirmDialog(
    'Hapus Draft Pemilihan',
    `Apakah Anda yakin ingin menghapus draft "${election.name}"? Tindakan ini tidak dapat dibatalkan.`,
    () => {
      const idx = elections.value.findIndex(e => e.id === election.id)
      if (idx !== -1) elections.value.splice(idx, 1)
    }
  )
}
</script>

<template>
  <div class="w-full">
    <!-- Page Header Area -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <div class="flex items-center gap-2.5">
          <h1 class="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manajemen Pemilihan
          </h1>
          <span class="px-2.5 py-0.5 rounded-full bg-purple-50 text-[#582be8] font-mono text-[10px] font-semibold">
            Semester Genap 2024/2025
          </span>
        </div>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Kelola, buat, dan pantau seluruh agenda pemilihan di lingkungan kampus — dari draft persiapan hingga pengumuman hasil rekapitulasi.
        </p>
      </div>

      <!-- Top Action Buttons -->
      <div class="flex items-center gap-3 shrink-0">
        <button
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          Export Data Pemilihan
        </button>
        <button
          @click="openAddModal"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition"
        >
          <span class="material-symbols-outlined text-[18px]">add_circle</span>
          + Buat Pemilihan Baru
        </button>
      </div>
    </div>

    <!-- Quick Stat Metric Bar -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      <!-- Stat 1: Total -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-200 hover:shadow transition flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[24px]">ballot</span>
        </div>
        <div class="min-w-0">
          <p class="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total Agenda</p>
          <p class="text-xl text-slate-900 font-extrabold">
            {{ stats.total }} <span class="text-xs font-normal text-slate-500">Pemilihan</span>
          </p>
        </div>
      </div>

      <!-- Stat 2: Berlangsung -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 hover:shadow transition flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[24px]" style="font-variation-settings: 'FILL' 1;">how_to_vote</span>
        </div>
        <div class="min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p class="font-mono text-[10px] text-emerald-700 uppercase tracking-wider font-semibold">Berlangsung</p>
          </div>
          <p class="text-xl text-slate-900 font-extrabold">
            {{ stats.berlangsung }} <span class="text-xs font-normal text-slate-500">Bilik Aktif</span>
          </p>
        </div>
      </div>

      <!-- Stat 3: Terjadwal -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-200 hover:shadow transition flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[24px]">schedule</span>
        </div>
        <div class="min-w-0">
          <p class="font-mono text-[10px] text-amber-700 uppercase tracking-wider font-semibold">Terjadwal</p>
          <p class="text-xl text-slate-900 font-extrabold">
            {{ stats.terjadwal }} <span class="text-xs font-normal text-slate-500">Akan Datang</span>
          </p>
        </div>
      </div>

      <!-- Stat 4: Draft -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow transition flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[24px]">edit_note</span>
        </div>
        <div class="min-w-0">
          <p class="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Draft</p>
          <p class="text-xl text-slate-900 font-extrabold">
            {{ stats.draft }} <span class="text-xs font-normal text-slate-500">Persiapan</span>
          </p>
        </div>
      </div>

      <!-- Stat 5: Selesai -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow transition flex items-center gap-4 col-span-2 md:col-span-1">
        <div class="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[24px]">task_alt</span>
        </div>
        <div class="min-w-0">
          <p class="font-mono text-[10px] text-indigo-700 uppercase tracking-wider font-semibold">Selesai</p>
          <p class="text-xl text-slate-900 font-extrabold">
            {{ stats.selesai }} <span class="text-xs font-normal text-slate-500">Diarsipkan</span>
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content Area: Master List + Sidebar Guide -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      <!-- Left Column: Election Management Table & Filters (9 Cols) -->
      <div class="xl:col-span-9 flex flex-col space-y-6">
        <!-- Filter & Search Panel -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
          <!-- Search bar + Dropdowns -->
          <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div class="relative flex-1">
              <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <span class="material-symbols-outlined text-[20px]">search</span>
              </span>
              <input
                v-model="searchQuery"
                class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                placeholder="Cari nama pemilihan, fakultas, atau kode ID pemilihan..."
                type="text"
              >
            </div>
          </div>

          <!-- Filter Pills Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-1">
            <button
              v-for="status in statusFilters"
              :key="status"
              @click="activeStatusFilter = status"
              :class="[
                'px-3.5 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition',
                activeStatusFilter === status
                  ? 'bg-[#582be8] text-white shadow-sm shadow-purple-600/25'
                  : 'bg-white border border-slate-200 text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50'
              ]"
            >
              {{ status }} ({{ statusCount(status) }})
            </button>
          </div>
        </div>

        <!-- Election Cards Collection -->
        <div class="space-y-4">
          <!-- Empty State -->
          <div
            v-if="filteredElections.length === 0"
            class="bg-white p-12 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center"
          >
            <div class="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
              <span class="material-symbols-outlined text-[36px]">search_off</span>
            </div>
            <h3 class="text-base font-bold text-slate-700 mb-1">Tidak Ada Hasil</h3>
            <p class="text-xs text-slate-500 max-w-sm">
              Tidak ditemukan pemilihan yang cocok dengan pencarian
              <template v-if="searchQuery.trim()">
                "<strong class="text-slate-700">{{ searchQuery }}</strong>"
              </template>
              <template v-if="activeStatusFilter !== 'Semua'">
                dengan filter status "<strong class="text-slate-700">{{ activeStatusFilter }}</strong>"
              </template>.
              Coba ubah kata kunci atau hapus filter.
            </p>
            <button
              @click="searchQuery = ''; activeStatusFilter = 'Semua'"
              class="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#582be8] bg-purple-50 rounded-xl hover:bg-purple-100 transition"
            >
              <span class="material-symbols-outlined text-[16px]">refresh</span>
              Reset Filter
            </button>
          </div>

          <!-- Dynamic Election Cards -->
          <div
            v-for="election in filteredElections"
            :key="election.id"
            :class="[
              'bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition flex flex-col gap-5',
              statusConfig[election.status]?.borderHover || 'hover:border-purple-200',
              'hover:shadow'
            ]"
          >
            <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div class="flex items-start gap-4">
                <div :class="[
                  'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5',
                  statusConfig[election.status]?.iconBg || 'bg-purple-50',
                  statusConfig[election.status]?.iconText || 'text-[#582be8]'
                ]">
                  <span class="material-symbols-outlined text-[26px]">{{ election.icon }}</span>
                </div>
                <div class="space-y-1">
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="font-mono text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-semibold">#{{ election.id }}</span>
                    <span class="text-xs text-slate-500 font-medium">• Tingkat: {{ election.level }}</span>
                  </div>
                  <h3 class="text-base sm:text-lg text-slate-900 font-bold">
                    {{ election.name }}
                  </h3>
                  <div class="flex flex-wrap items-center gap-4 text-slate-500 text-xs pt-1">
                    <!-- Date Info -->
                    <template v-if="election.status === 'Berlangsung'">
                      <span class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[16px]">event</span>
                        {{ formatDateRange(election.startDate, election.endDate) }}
                      </span>
                    </template>
                    <template v-else-if="election.status === 'Terjadwal'">
                      <span class="flex items-center gap-1.5 text-amber-700 font-medium">
                        <span class="material-symbols-outlined text-[16px]">schedule</span>
                        Mulai {{ formatDate(election.startDate) }} WIB
                      </span>
                    </template>
                    <template v-else-if="election.status === 'Selesai'">
                      <span class="flex items-center gap-1.5">
                        <span class="material-symbols-outlined text-[16px]">history</span>
                        Berakhir {{ formatDate(election.endDate) }} • {{ election.candidates }} {{ election.candidateLabel }}
                      </span>
                    </template>
                    <template v-else>
                      <span class="flex items-center gap-1.5 text-slate-500">
                        <span class="material-symbols-outlined text-[16px]">info</span>
                        {{ election.info || 'Menunggu kelengkapan berkas' }}
                      </span>
                    </template>

                    <!-- Candidate info (non-Draft, non-Selesai) -->
                    <span v-if="election.status !== 'Draft' && election.status !== 'Selesai'" class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-[16px]">person</span>
                      {{ election.candidates }} {{ election.candidateLabel }}
                    </span>

                    <!-- Selesai: Final turnout -->
                    <span v-if="election.status === 'Selesai'" class="flex items-center gap-1.5 font-medium text-indigo-700">
                      <span class="material-symbols-outlined text-[16px]">verified</span>
                      {{ election.dptVoted.toLocaleString() }} Suara Sah ({{ election.turnout }}% Final Turnout)
                    </span>

                    <!-- Draft: candidate info -->
                    <span v-if="election.status === 'Draft' && election.candidates > 0" class="flex items-center gap-1.5">
                      <span class="material-symbols-outlined text-[16px]">person</span>
                      {{ election.candidates }} {{ election.candidateLabel }}
                    </span>
                  </div>
                </div>
              </div>
              <!-- Status Badge -->
              <div class="flex items-center gap-2 self-start">
                <span :class="[
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold',
                  statusConfig[election.status]?.bg,
                  statusConfig[election.status]?.text
                ]">
                  <template v-if="election.status === 'Selesai'">
                    <span class="material-symbols-outlined text-[14px]">done_all</span>
                  </template>
                  <template v-else>
                    <span :class="[
                      'w-2 h-2 rounded-full',
                      statusConfig[election.status]?.dot,
                      statusConfig[election.status]?.ping ? 'animate-ping' : ''
                    ]"></span>
                  </template>
                  {{ election.status }}
                </span>
              </div>
            </div>

            <!-- Bottom Section — differs by status -->
            <!-- Berlangsung: Participation Meter -->
            <div v-if="election.status === 'Berlangsung'" class="bg-slate-50/80 border border-slate-100 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex-1 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-medium text-slate-800">Progres Partisipasi Mahasiswa (DPT Masuk)</span>
                  <span class="font-mono text-xs font-bold text-[#582be8]">{{ election.turnout }}% Turnout</span>
                </div>
                <!-- Progress Bar -->
                <div class="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                  <div class="h-full bg-[#582be8] rounded-full transition-all duration-500" :style="{ width: election.turnout + '%' }"></div>
                </div>
                <div class="flex justify-between items-center text-xs text-slate-500">
                  <span>Total Surat Suara: <strong class="text-slate-900 font-semibold">{{ election.dptVoted.toLocaleString() }}</strong> terverifikasi</span>
                  <span>Target DPT: <strong class="text-slate-900 font-semibold">{{ election.dptTarget.toLocaleString() }} Pemilih</strong></span>
                </div>
              </div>
              <!-- Action Buttons -->
              <div class="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                <NuxtLink
                  :to="`/admin/elections/${election.id}`"
                  class="inline-flex items-center gap-1.5 px-4 py-2 bg-[#582be8] text-white text-xs font-semibold rounded-xl hover:bg-[#471ec7] shadow-sm shadow-purple-600/20 transition"
                >
                  <span class="material-symbols-outlined text-[18px]">query_stats</span>
                  Kelola & Monitoring
                </NuxtLink>
                <button
                  @click="openEditModal(election)"
                  class="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm transition"
                  title="Edit Pemilihan"
                >
                  <span class="material-symbols-outlined text-[20px]">edit</span>
                </button>
              </div>
            </div>

            <!-- Terjadwal: Meta + Actions -->
            <div v-else-if="election.status === 'Terjadwal'" class="bg-slate-50/80 border border-slate-100 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-6 text-xs">
                <span class="text-slate-500">DPT Terdaftar: <strong class="text-slate-900 font-semibold">{{ election.dptTarget > 0 ? election.dptTarget.toLocaleString() + ' Mahasiswa Aktif' : 'Belum ditentukan' }}</strong></span>
                <span class="text-slate-500">Status Bilik: <span class="text-emerald-700 font-semibold">Terkunci (Auto-Start)</span></span>
              </div>
              <div class="flex items-center gap-2.5 shrink-0">
                <button
                  @click="openDetailModal(election)"
                  class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition"
                >
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                  Lihat Detail
                </button>
                <button
                  @click="openEditModal(election)"
                  class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#582be8] text-white text-xs font-semibold rounded-xl hover:bg-[#471ec7] shadow-sm shadow-purple-600/20 transition"
                >
                  <span class="material-symbols-outlined text-[16px]">edit</span>
                  Edit Paslon & Aturan
                </button>
              </div>
            </div>

            <!-- Draft: Meta + Actions -->
            <div v-else-if="election.status === 'Draft'" class="bg-slate-50/80 border border-slate-100 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4 text-xs text-slate-500">
                <span>Status DPT: <span class="text-amber-700 font-medium">Belum di-generate</span></span>
              </div>
              <div class="flex items-center gap-2.5 shrink-0">
                <button
                  @click="confirmDeleteDraft(election)"
                  class="inline-flex items-center gap-1.5 px-3.5 py-2 text-red-600 hover:bg-red-50 text-xs font-semibold border border-red-200 rounded-xl transition"
                >
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                  Hapus Draft
                </button>
                <button
                  @click="openEditModal(election)"
                  class="inline-flex items-center gap-1.5 px-4 py-2 bg-[#582be8] text-white text-xs font-semibold rounded-xl hover:bg-[#471ec7] shadow-sm shadow-purple-600/20 transition"
                >
                  <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                  Lanjutkan Setup Draft
                </button>
              </div>
            </div>

            <!-- Selesai: Meta + Actions -->
            <div v-else-if="election.status === 'Selesai'" class="bg-slate-50/80 border border-slate-100 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-3 text-xs text-slate-500">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>{{ election.info || 'Hasil rekapitulasi resmi telah diarsipkan' }}</span>
              </div>
              <div class="flex items-center gap-2.5 shrink-0">
                <button
                  @click="openDetailModal(election)"
                  class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition"
                >
                  <span class="material-symbols-outlined text-[16px]">description</span>
                  Lihat Berita Acara Rekapitulasi
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Footer -->
        <div class="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <p class="text-xs text-slate-500">
            Menampilkan <strong class="text-slate-900 font-semibold">{{ filteredElections.length }}</strong> dari <strong class="text-slate-900 font-semibold">{{ elections.length }}</strong> agenda pemilihan
          </p>
        </div>
      </div>

      <!-- Right Column: Institutional Flow Guide & Quick Stats Card (3 Cols) -->
      <div class="xl:col-span-3 flex flex-col space-y-6">
        <!-- Siklus Alur Pemilihan Kampus -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div class="flex items-center justify-between pb-3 border-b-0">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[#582be8] text-[20px]">account_tree</span>
              <h4 class="text-base font-bold text-slate-900">
                Alur Siklus Pemilu
              </h4>
            </div>
            <span class="font-mono text-[10px] text-[#582be8] bg-purple-50 px-2 py-0.5 rounded-md font-semibold">SOP A-Vote</span>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">
            Setiap bilik pemilihan suara digital kampus melalui tahapan berurutan sesuai pedoman kepemiluan mahasiswa:
          </p>
          <!-- Vertical Flow Steps -->
          <div class="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            <!-- Step 1: Draft -->
            <div class="flex items-start gap-3.5 relative">
              <div class="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                1
              </div>
              <div class="min-w-0 pt-0.5">
                <h5 class="text-xs font-bold text-slate-900">1. Draft Persiapan</h5>
                <p class="text-[11px] text-slate-500 leading-4">Input profil paslon, unggah SK KPUM, dan penentuan kuota DPT.</p>
              </div>
            </div>
            <!-- Step 2: Terjadwal -->
            <div class="flex items-start gap-3.5 relative">
              <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                2
              </div>
              <div class="min-w-0 pt-0.5">
                <h5 class="text-xs font-bold text-slate-900">2. Terjadwal &amp; Uji Coba</h5>
                <p class="text-[11px] text-slate-500 leading-4">Simulasi bilik, aktivasi token NIM pemilih, countdown otomatis.</p>
              </div>
            </div>
            <!-- Step 3: Berlangsung -->
            <div class="flex items-start gap-3.5 relative">
              <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                3
              </div>
              <div class="min-w-0 pt-0.5">
                <h5 class="text-xs font-bold text-slate-900">3. Pemungutan Suara</h5>
                <p class="text-[11px] text-slate-500 leading-4">Bilik aktif, mahasiswa memilih, pemantauan realtime turnout.</p>
              </div>
            </div>
            <!-- Step 4: Selesai -->
            <div class="flex items-start gap-3.5 relative">
              <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                4
              </div>
              <div class="min-w-0 pt-0.5">
                <h5 class="text-xs font-bold text-slate-900">4. Selesai &amp; Penguncian</h5>
                <p class="text-[11px] text-slate-500 leading-4">Bilik suara otomatis terkunci tepat waktu sesuai batas jadwal.</p>
              </div>
            </div>
            <!-- Step 5: Rekapitulasi -->
            <div class="flex items-start gap-3.5 relative">
              <div class="w-8 h-8 rounded-full bg-purple-50 text-[#582be8] flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                5
              </div>
              <div class="min-w-0 pt-0.5">
                <h5 class="text-xs font-bold text-slate-900">5. Rekapitulasi &amp; BA</h5>
                <p class="text-[11px] text-slate-500 leading-4">Penerbitan Berita Acara resmi, persetujuan saksi, dan publikasi.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Campus Election Security & Integrity Banner -->
        <div class="bg-gradient-to-br from-[#582be8] to-[#4000c6] p-6 rounded-2xl shadow-md shadow-purple-600/20 text-white space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <span class="material-symbols-outlined text-white text-[22px]">verified_user</span>
            </div>
            <div>
              <h5 class="text-[15px] font-bold leading-tight">Integritas Bilik Suara</h5>
              <span class="font-mono text-[10px] text-purple-200">Single-Vote per NIM</span>
            </div>
          </div>
          <p class="text-xs text-purple-100 leading-relaxed">
            Setiap suara terlindungi oleh token sesi tunggal berbasis NIM mahasiswa aktif terdaftar di Siakad. Bilik dijamin bebas intervensi.
          </p>
          <div class="pt-2 flex items-center justify-between text-xs">
            <span class="font-mono text-[10px] text-purple-200">SLA Server: 99.98%</span>
            <a class="inline-flex items-center gap-1 font-semibold text-white hover:underline" href="#">
              Audit Log
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </a>
          </div>
        </div>

        <!-- Quick Tips Card -->
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center gap-2 text-slate-900">
            <span class="material-symbols-outlined text-amber-600 text-[20px]">lightbulb</span>
            <h5 class="text-sm font-bold">Tips Penjadwalan</h5>
          </div>
          <p class="text-xs text-slate-500 leading-relaxed">
            Disarankan membuka bilik suara digital minimal selama 2 hari kerja kampus agar mahasiswa yang sedang praktikum atau kuliah lapangan tetap memiliki waktu menggunakan hak suaranya.
          </p>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════
         MODAL: Tambah Pemilihan Baru
    ════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showAddModal = false"></div>
          <!-- Modal Content -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200">
            <!-- Header -->
            <div class="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">add_circle</span>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">Buat Pemilihan Baru</h3>
                  <p class="text-[11px] text-slate-500">Isi form di bawah untuk membuat agenda pemilihan baru</p>
                </div>
              </div>
              <button @click="showAddModal = false" class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Form Body -->
            <div class="px-6 py-5 space-y-5">
              <!-- Nama Pemilihan -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Nama Pemilihan <span class="text-red-500">*</span></label>
                <input
                  v-model="addForm.name"
                  type="text"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                  :class="addErrors.name ? 'border-red-300' : 'border-slate-200'"
                  placeholder="Contoh: Pemilihan Raya Ketua BEM 2025"
                >
                <p v-if="addErrors.name" class="text-[11px] text-red-500 mt-1">{{ addErrors.name }}</p>
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Deskripsi</label>
                <textarea
                  v-model="addForm.description"
                  rows="3"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white transition resize-none"
                  placeholder="Deskripsi singkat tentang pemilihan..."
                ></textarea>
              </div>

              <!-- Tingkat -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Tingkat Pemilihan <span class="text-red-500">*</span></label>
                <input
                  v-model="addForm.level"
                  type="text"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                  :class="addErrors.level ? 'border-red-300' : 'border-slate-200'"
                  placeholder="Contoh: Universitas (BEM KM), Fakultas Teknik, dll."
                >
                <p v-if="addErrors.level" class="text-[11px] text-red-500 mt-1">{{ addErrors.level }}</p>
              </div>

              <!-- Schedule Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">Tanggal & Waktu Mulai</label>
                  <input
                    v-model="addForm.startDate"
                    type="datetime-local"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                    :class="addErrors.startDate ? 'border-red-300' : 'border-slate-200'"
                  >
                  <p v-if="addErrors.startDate" class="text-[11px] text-red-500 mt-1">{{ addErrors.startDate }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">Tanggal & Waktu Selesai</label>
                  <input
                    v-model="addForm.endDate"
                    type="datetime-local"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                    :class="addErrors.endDate ? 'border-red-300' : 'border-slate-200'"
                  >
                  <p v-if="addErrors.endDate" class="text-[11px] text-red-500 mt-1">{{ addErrors.endDate }}</p>
                </div>
              </div>

              <!-- Status Hint -->
              <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p class="text-[11px] text-slate-500 leading-relaxed">
                  <span class="material-symbols-outlined text-[14px] align-text-bottom mr-0.5">info</span>
                  <strong class="text-slate-700">Status otomatis:</strong> Jika tanggal mulai dan selesai diisi, status akan menjadi <strong class="text-amber-700">Terjadwal</strong>. Jika tidak, status akan menjadi <strong class="text-slate-600">Draft</strong>.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3 z-10">
              <button
                @click="showAddModal = false"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                @click="submitAddForm"
                class="px-5 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition"
              >
                Simpan Pemilihan
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══════════════════════════════════════════════════════════════
         MODAL: Detail Pemilihan
    ════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showDetailModal && detailElection" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showDetailModal = false"></div>
          <!-- Modal Content -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200">
            <!-- Header -->
            <div class="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div class="flex items-center gap-3">
                <div :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  statusConfig[detailElection.status]?.iconBg,
                  statusConfig[detailElection.status]?.iconText
                ]">
                  <span class="material-symbols-outlined text-[22px]">{{ detailElection.icon }}</span>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">Detail Pemilihan</h3>
                  <p class="text-[11px] text-slate-500 font-mono">#{{ detailElection.id }}</p>
                </div>
              </div>
              <button @click="showDetailModal = false" class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Detail Body -->
            <div class="px-6 py-5 space-y-5">
              <!-- Election Name -->
              <div>
                <h4 class="text-lg font-bold text-slate-900">{{ detailElection.name }}</h4>
                <span :class="[
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mt-2',
                  statusConfig[detailElection.status]?.bg,
                  statusConfig[detailElection.status]?.text
                ]">
                  <span :class="['w-2 h-2 rounded-full', statusConfig[detailElection.status]?.dot]"></span>
                  {{ detailElection.status }}
                </span>
              </div>

              <!-- Description -->
              <div v-if="detailElection.description" class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <p class="text-xs text-slate-600 leading-relaxed">{{ detailElection.description }}</p>
              </div>

              <!-- Info Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p class="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Tingkat</p>
                  <p class="text-sm font-semibold text-slate-800">{{ detailElection.level }}</p>
                </div>
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p class="font-mono text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-1">Kandidat</p>
                  <p class="text-sm font-semibold text-slate-800">{{ detailElection.candidates }} {{ detailElection.candidateLabel }}</p>
                </div>
              </div>

              <!-- Schedule -->
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                <h5 class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px]">event</span>
                  Jadwal Pemilihan
                </h5>
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <p class="text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Mulai</p>
                    <p class="text-xs font-semibold text-slate-800">{{ detailElection.startDate ? formatDate(detailElection.startDate) + ' WIB' : 'Belum ditentukan' }}</p>
                  </div>
                  <div>
                    <p class="text-[10px] text-slate-400 uppercase font-semibold mb-0.5">Selesai</p>
                    <p class="text-xs font-semibold text-slate-800">{{ detailElection.endDate ? formatDate(detailElection.endDate) + ' WIB' : 'Belum ditentukan' }}</p>
                  </div>
                </div>
              </div>

              <!-- Participation (if applicable) -->
              <div v-if="detailElection.dptTarget > 0" class="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-3">
                <h5 class="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px]">groups</span>
                  Partisipasi
                </h5>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-600">Turnout</span>
                  <span class="font-mono font-bold text-[#582be8]">{{ detailElection.turnout }}%</span>
                </div>
                <div class="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                  <div class="h-full bg-[#582be8] rounded-full transition-all" :style="{ width: detailElection.turnout + '%' }"></div>
                </div>
                <div class="flex justify-between text-[11px] text-slate-500">
                  <span>Suara masuk: <strong class="text-slate-800">{{ detailElection.dptVoted.toLocaleString() }}</strong></span>
                  <span>Target DPT: <strong class="text-slate-800">{{ detailElection.dptTarget.toLocaleString() }}</strong></span>
                </div>
              </div>

              <!-- Additional info -->
              <div v-if="detailElection.info" class="p-3 bg-amber-50 rounded-xl border border-amber-100">
                <p class="text-xs text-amber-800 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px]">info</span>
                  {{ detailElection.info }}
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3 z-10">
              <button
                @click="showDetailModal = false"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                Tutup
              </button>
              <button
                @click="showDetailModal = false; openEditModal(detailElection!)"
                class="px-5 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition"
              >
                Edit Pemilihan
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══════════════════════════════════════════════════════════════
         MODAL: Edit Pemilihan
    ════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showEditModal = false"></div>
          <!-- Modal Content -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200">
            <!-- Header -->
            <div class="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <span class="material-symbols-outlined text-[22px]">edit</span>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">Edit Pemilihan</h3>
                  <p class="text-[11px] text-slate-500 font-mono">#{{ editForm.id }}</p>
                </div>
              </div>
              <button @click="showEditModal = false" class="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <!-- Form Body -->
            <div class="px-6 py-5 space-y-5">
              <!-- Nama Pemilihan -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Nama Pemilihan <span class="text-red-500">*</span></label>
                <input
                  v-model="editForm.name"
                  type="text"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                  :class="editErrors.name ? 'border-red-300' : 'border-slate-200'"
                  placeholder="Nama pemilihan"
                >
                <p v-if="editErrors.name" class="text-[11px] text-red-500 mt-1">{{ editErrors.name }}</p>
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Deskripsi</label>
                <textarea
                  v-model="editForm.description"
                  rows="3"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white transition resize-none"
                  placeholder="Deskripsi singkat tentang pemilihan..."
                ></textarea>
              </div>

              <!-- Tingkat -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Tingkat Pemilihan <span class="text-red-500">*</span></label>
                <input
                  v-model="editForm.level"
                  type="text"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                  :class="editErrors.level ? 'border-red-300' : 'border-slate-200'"
                  placeholder="Tingkat pemilihan"
                >
                <p v-if="editErrors.level" class="text-[11px] text-red-500 mt-1">{{ editErrors.level }}</p>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
                <select
                  v-model="editForm.status"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition cursor-pointer"
                >
                  <option
                    v-for="s in getEditableStatuses(editForm.status)"
                    :key="s"
                    :value="s"
                  >
                    {{ s }}
                  </option>
                </select>
                <p class="text-[11px] text-slate-400 mt-1">
                  Transisi status yang tersedia bergantung pada status saat ini.
                </p>
              </div>

              <!-- Schedule Row -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">Tanggal & Waktu Mulai</label>
                  <input
                    v-model="editForm.startDate"
                    type="datetime-local"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                    :class="editErrors.startDate ? 'border-red-300' : 'border-slate-200'"
                  >
                  <p v-if="editErrors.startDate" class="text-[11px] text-red-500 mt-1">{{ editErrors.startDate }}</p>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-700 mb-1.5">Tanggal & Waktu Selesai</label>
                  <input
                    v-model="editForm.endDate"
                    type="datetime-local"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#582be8] focus:bg-white transition"
                    :class="editErrors.endDate ? 'border-red-300' : 'border-slate-200'"
                  >
                  <p v-if="editErrors.endDate" class="text-[11px] text-red-500 mt-1">{{ editErrors.endDate }}</p>
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
                @click="submitEditForm"
                class="px-5 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══════════════════════════════════════════════════════════════
         DIALOG: Konfirmasi
    ════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showConfirmDialog" class="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="cancelConfirm"></div>
          <!-- Dialog Content -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm border border-slate-200">
            <div class="p-6 text-center">
              <div class="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
                <span class="material-symbols-outlined text-[30px]">warning</span>
              </div>
              <h3 class="text-base font-bold text-slate-900 mb-2">{{ confirmTitle }}</h3>
              <p class="text-xs text-slate-500 leading-relaxed">{{ confirmMessage }}</p>
            </div>
            <div class="px-6 pb-6 flex items-center gap-3">
              <button
                @click="cancelConfirm"
                class="flex-1 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
              >
                Batal
              </button>
              <button
                @click="executeConfirm"
                class="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/25 transition"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

/* Modal Transition */
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

.modal-fade-enter-from .relative {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

.modal-fade-leave-to .relative {
  transform: scale(0.95) translateY(10px);
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #eff4ff;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c9c3d9;
  border-radius: 9999px;
}
</style>
