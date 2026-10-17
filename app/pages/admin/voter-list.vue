<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  alias: '/admin/voters'
})

// ─── Interfaces ──────────────────────────────────────────────────────
interface StudentMaster {
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
}

// ─── Master Students Mock Data ───────────────────────────────────────
const students = useStudentsMaster()

// ─── Search & Filters State ──────────────────────────────────────────
const searchQuery = ref('')
const selectedFaculty = ref('')
const selectedYear = ref('')
const selectedAcademicStatus = ref('')
const activeStatusFilter = ref<string>('Semua')

const statusFilters = [
  { key: 'Semua', label: 'Semua', count: '4,850' },
  { key: 'Aktif & Terverifikasi', label: 'Aktif & Terverifikasi', count: '4,620' },
  { key: 'Perlu Verifikasi', label: 'Perlu Verifikasi', count: '175' },
  { key: 'Nonaktif / Cuti', label: 'Nonaktif / Cuti', count: '55' }
]

function resetFilters() {
  searchQuery.value = ''
  selectedFaculty.value = ''
  selectedYear.value = ''
  selectedAcademicStatus.value = ''
  activeStatusFilter.value = 'Semua'
}

// ─── Filtered Students ───────────────────────────────────────────────
const filteredStudents = computed(() => {
  return students.value.filter(s => {
    // Search filter
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      const matchSearch = s.name.toLowerCase().includes(q) ||
        s.nim.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      if (!matchSearch) return false
    }

    // Faculty filter
    if (selectedFaculty.value && s.facultyCode !== selectedFaculty.value) {
      return false
    }

    // Year filter
    if (selectedYear.value && s.academicYear !== selectedYear.value) {
      return false
    }

    // Academic Status filter
    if (selectedAcademicStatus.value && s.academicStatus !== selectedAcademicStatus.value) {
      return false
    }

    // Status pill filter
    if (activeStatusFilter.value !== 'Semua' && s.accountStatus !== activeStatusFilter.value) {
      return false
    }

    return true
  })
})

// ─── Selection State ─────────────────────────────────────────────────
const selectedIds = ref<string[]>([])
const isAllSelected = computed(() => {
  return filteredStudents.value.length > 0 && selectedIds.value.length === filteredStudents.value.length
})

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedIds.value = []
  } else {
    selectedIds.value = filteredStudents.value.map(s => s.id)
  }
}

// ─── Toast Feedback ──────────────────────────────────────────────────
const toastMessage = ref('')
const showToast = ref(false)

function triggerToast(msg: string) {
  toastMessage.value = msg
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 2500)
}

// ─── Detail Modal State ──────────────────────────────────────────────
const showDetailModal = ref(false)
const selectedStudent = ref<StudentMaster | null>(null)

function openDetailModal(student: StudentMaster) {
  selectedStudent.value = student
  showDetailModal.value = true
}

// ─── Add Student Modal State ─────────────────────────────────────────
const showAddModal = ref(false)
const addForm = ref({
  nim: '',
  name: '',
  email: '',
  facultyCode: 'FT',
  major: '',
  academicYear: '2024',
  semester: 2,
  academicStatus: 'Aktif (Reguler)' as StudentMaster['academicStatus']
})
const addError = ref('')

function openAddModal() {
  addForm.value = {
    nim: '',
    name: '',
    email: '',
    facultyCode: 'FT',
    major: '',
    academicYear: '2024',
    semester: 2,
    academicStatus: 'Aktif (Reguler)'
  }
  addError.value = ''
  showAddModal.value = true
}

const facultyNames: Record<string, string> = {
  FT: 'Fakultas Teknik',
  FASILKOM: 'Fakultas Ilmu Komputer',
  FEB: 'Fakultas Ekonomika & Bisnis',
  FH: 'Fakultas Hukum',
  FPSI: 'Fakultas Psikologi',
  FK: 'Fakultas Kedokteran'
}

function submitAddForm() {
  if (!addForm.value.nim.trim() || !addForm.value.name.trim()) {
    addError.value = 'NIM dan Nama Lengkap wajib diisi.'
    return
  }

  const initials = addForm.value.name.trim().split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
  const newStudent: StudentMaster = {
    id: `MHS-${String(students.value.length + 1).padStart(3, '0')}`,
    nim: addForm.value.nim.trim(),
    name: addForm.value.name.trim(),
    initials: initials || 'MH',
    avatarColor: 'bg-purple-50 text-[#582be8]',
    email: addForm.value.email.trim() || `${addForm.value.nim.trim()}@student.ac.id`,
    faculty: facultyNames[addForm.value.facultyCode] || 'Fakultas Teknik',
    facultyCode: addForm.value.facultyCode,
    major: addForm.value.major.trim() || 'Teknik Informatika',
    academicYear: addForm.value.academicYear,
    semester: Number(addForm.value.semester) || 1,
    accountStatus: 'Aktif & Terverifikasi',
    academicStatus: addForm.value.academicStatus,
    authStatus: 'Kredensial Siap',
    authNote: 'Kredensial Baru Dibuat',
    registeredAt: 'Hari ini'
  }

  students.value.unshift(newStudent)
  showAddModal.value = false
  triggerToast(`Mahasiswa ${newStudent.name} berhasil ditambahkan ke Master Data.`)
}

function handleResetAuth(student: StudentMaster) {
  triggerToast(`Token kredensial untuk NIM ${student.nim} berhasil di-reset.`)
}
</script>

<template>
  <div class="flex flex-col gap-8 w-full antialiased">
    <!-- ══════════════════════════════════════════════════════════════════
         PAGE HEADER: MASTER DATA MAHASISWA
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="rounded-full bg-purple-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-[#582be8]">
            DIREKTORI MASTER DATA KAMPUS
          </span>

          <span class="flex items-center gap-1.5 text-xs text-slate-500">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Sinkronisasi Siakad Terakhir: 10 Menit Lalu
          </span>
        </div>

        <h1 class="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          Master Data Mahasiswa
        </h1>

        <p class="max-w-3xl text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
          Pusat data induk mahasiswa terdaftar, verifikasi identitas sivitas akademika, kesiapan kredensial autentikasi NIM, dan konsolidasi status akademik aktif untuk penetapan DPT pada masing-masing pemilihan.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <button
          type="button"
          @click="triggerToast('Sinkronisasi Siakad berhasil: seluruh basis data mahasiswa telah mutakhir.')"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
        >
          <span class="material-symbols-outlined text-[18px]">sync</span>
          Sinkronisasi Siakad
        </button>

        <button
          type="button"
          @click="triggerToast('Berkas master data mahasiswa sedang diunduh (CSV/XLSX).')"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          Export CSV/XLSX
        </button>

        <button
          type="button"
          @click="openAddModal"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition"
        >
          <span class="material-symbols-outlined text-[18px]">person_add</span>
          Tambah Mahasiswa
        </button>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════
         STATISTICS CARDS: MASTER DATA METRICS (NO ELECTION VOTING METRICS)
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <!-- 1. Total Mahasiswa Terdaftar -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-purple-200 hover:shadow transition">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Mahasiswa Terdaftar</p>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-[#582be8]">4,850</span>
              <span class="text-xs text-slate-500">Mahasiswa</span>
            </div>
          </div>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#582be8]">
            <span class="material-symbols-outlined text-[24px]">school</span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span class="flex items-center gap-1 font-semibold text-[#582be8]">
            <span class="material-symbols-outlined text-sm">check_circle</span>
            Basis Data Tunggal
          </span>
          <span class="font-mono text-[10px] text-slate-500">8 Fakultas Kampus</span>
        </div>
      </div>

      <!-- 2. Akun Terverifikasi & Aktif -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200 hover:shadow transition">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Akun Terverifikasi &amp; Aktif</p>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-emerald-600">4,620</span>
              <span class="text-xs text-emerald-700">Akun Valid</span>
            </div>
          </div>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <span class="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
        </div>
        <div class="mt-4 border-t border-slate-100 pt-3">
          <div class="mb-2 flex justify-between font-mono text-[10px]">
            <span class="font-semibold text-emerald-700">95.3% Identitas Valid</span>
            <span class="text-slate-500">Target 100%</span>
          </div>
          <div class="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div class="h-full rounded-full bg-emerald-500" style="width: 95.3%"></div>
          </div>
        </div>
      </div>

      <!-- 3. Perlu Verifikasi Data / Pending -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-amber-200 hover:shadow transition">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Perlu Verifikasi Data</p>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-amber-600">175</span>
              <span class="text-xs text-amber-700">Mahasiswa</span>
            </div>
          </div>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <span class="material-symbols-outlined text-[24px]">pending_actions</span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span class="font-mono text-[10px] font-semibold text-amber-700">3.6% Belum Aktivasi Lengkap</span>
          <button
            type="button"
            @click="triggerToast('Surel konfirmasi verifikasi data telah dikirim ulang ke 175 mahasiswa.')"
            class="font-mono text-[10px] font-semibold text-[#582be8] hover:underline"
          >
            Kirim Ulang
          </button>
        </div>
      </div>

      <!-- 4. Kesiapan Kredensial Autentikasi -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:shadow transition">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Kesiapan Kredensial Login</p>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-blue-600">4,795</span>
              <span class="text-xs text-slate-500">Kredensial</span>
            </div>
          </div>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <span class="material-symbols-outlined text-[24px]">key</span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span class="font-mono text-[10px] font-semibold text-emerald-700">98.8% Siap Digunakan</span>
          <span class="font-mono text-[10px] text-slate-400">Siakad Single Sign-On</span>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════
         FILTERS & SEARCH SECTION
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="space-y-4">
      <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <!-- Status Pills Filter -->
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="sf in statusFilters"
            :key="sf.key"
            type="button"
            @click="activeStatusFilter = sf.key"
            :class="[
              'rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer',
              activeStatusFilter === sf.key
                ? 'bg-[#582be8] text-white shadow-sm shadow-purple-600/25'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            ]"
          >
            {{ sf.label }} ({{ sf.count }})
          </button>
        </div>

        <!-- Sync Indicator -->
        <div class="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs text-slate-600 shadow-sm self-start xl:self-auto">
          <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
          Sinkronisasi Basis Data Siakad Aktif
        </div>
      </div>

      <!-- Search & Dropdown Row -->
      <div class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:flex-row xl:items-center">
        <div class="relative min-w-0 flex-1">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <span class="material-symbols-outlined text-[20px]">search</span>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari berdasarkan NIM, nama mahasiswa, atau email kampus..."
            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#582be8] focus:bg-white"
          />
        </div>

        <div class="flex flex-wrap gap-2.5">
          <!-- Dropdown Fakultas -->
          <select
            v-model="selectedFaculty"
            class="min-w-[160px] rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:border-[#582be8] cursor-pointer shadow-sm"
          >
            <option value="">Semua Fakultas</option>
            <option value="FT">Teknik (FT)</option>
            <option value="FASILKOM">Ilmu Komputer (Fasilkom)</option>
            <option value="FEB">Ekonomi &amp; Bisnis (FEB)</option>
            <option value="FH">Hukum (FH)</option>
            <option value="FPSI">Psikologi (FPsi)</option>
            <option value="FK">Kedokteran (FK)</option>
          </select>

          <!-- Dropdown Angkatan -->
          <select
            v-model="selectedYear"
            class="min-w-[140px] rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:border-[#582be8] cursor-pointer shadow-sm"
          >
            <option value="">Semua Angkatan</option>
            <option value="2024">Angkatan 2024</option>
            <option value="2023">Angkatan 2023</option>
            <option value="2022">Angkatan 2022</option>
            <option value="2021">Angkatan 2021</option>
          </select>

          <!-- Dropdown Status Akademik (Replaces deceptive global election dropdown) -->
          <select
            v-model="selectedAcademicStatus"
            class="min-w-[170px] rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:border-[#582be8] cursor-pointer shadow-sm"
          >
            <option value="">Semua Status Akademik</option>
            <option value="Aktif (Reguler)">Aktif (Reguler)</option>
            <option value="Aktif (Transfer)">Aktif (Transfer)</option>
            <option value="Cuti Akademik">Cuti Akademik</option>
          </select>

          <!-- Reset Filter -->
          <button
            type="button"
            @click="resetFilters"
            title="Reset Parameter Filter"
            class="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 shadow-sm cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">filter_alt_off</span>
          </button>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════
         MASTER DATA TABLE: PURE STUDENT DATA (NO GLOBAL VOTING STATUS)
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-slate-50 font-semibold text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <th class="w-12 px-4 py-3.5 text-center">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer"
                />
              </th>
              <th class="whitespace-nowrap px-4 py-3.5">Identitas Mahasiswa</th>
              <th class="whitespace-nowrap px-4 py-3.5">Fakultas &amp; Program Studi</th>
              <th class="whitespace-nowrap px-4 py-3.5">Angkatan / Sem</th>
              <th class="whitespace-nowrap px-4 py-3.5">Status Akun &amp; Identitas</th>
              <th class="whitespace-nowrap px-4 py-3.5">Status Akademik</th>
              <th class="whitespace-nowrap px-4 py-3.5">Autentikasi Kredensial</th>
              <th class="px-4 py-3.5 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
            <tr
              v-for="student in filteredStudents"
              :key="student.id"
              class="transition-colors hover:bg-slate-50/70"
            >
              <!-- Checkbox -->
              <td class="px-4 py-4 text-center">
                <input
                  type="checkbox"
                  :value="student.id"
                  v-model="selectedIds"
                  class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer"
                />
              </td>

              <!-- Identitas Mahasiswa (Nama, NIM, Email) -->
              <td class="whitespace-nowrap px-4 py-4">
                <div class="flex items-center gap-3">
                  <div :class="['flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold', student.avatarColor]">
                    {{ student.initials }}
                  </div>
                  <div>
                    <p class="font-semibold text-slate-900">{{ student.name }}</p>
                    <p class="mt-0.5 font-mono text-[10px] text-[#582be8] font-semibold">NIM {{ student.nim }}</p>
                    <p class="text-xs text-slate-500">{{ student.email }}</p>
                  </div>
                </div>
              </td>

              <!-- Fakultas & Program Studi -->
              <td class="whitespace-nowrap px-4 py-4">
                <p class="font-medium text-slate-900">{{ student.faculty }} ({{ student.facultyCode }})</p>
                <p class="text-xs text-slate-500">{{ student.major }}</p>
              </td>

              <!-- Angkatan / Semester -->
              <td class="whitespace-nowrap px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-600">
                  {{ student.academicYear }} / Sem {{ student.semester }}
                </span>
              </td>

              <!-- Status Akun & Identitas (Independent from individual election voting) -->
              <td class="whitespace-nowrap px-4 py-4">
                <span
                  v-if="student.accountStatus === 'Aktif & Terverifikasi'"
                  class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-800"
                >
                  <span class="material-symbols-outlined text-sm text-emerald-600">verified</span>
                  Aktif &amp; Terverifikasi
                </span>
                <span
                  v-else-if="student.accountStatus === 'Perlu Verifikasi'"
                  class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-800"
                >
                  <span class="material-symbols-outlined text-sm text-amber-600">pending</span>
                  Perlu Verifikasi
                </span>
                <span
                  v-else
                  class="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-rose-800"
                >
                  <span class="material-symbols-outlined text-sm text-rose-600">block</span>
                  Nonaktif / Cuti
                </span>
                <p v-if="student.statusNote" class="mt-1 font-mono text-[10px] text-slate-500">
                  {{ student.statusNote }}
                </p>
              </td>

              <!-- Status Akademik (Replaces deceptive global voting participation tags) -->
              <td class="whitespace-nowrap px-4 py-4">
                <span
                  :class="[
                    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-semibold',
                    student.academicStatus === 'Cuti Akademik'
                      ? 'bg-amber-50 text-amber-800 border border-amber-200'
                      : 'bg-purple-50 text-[#582be8] border border-purple-100'
                  ]"
                >
                  <span :class="['w-1.5 h-1.5 rounded-full', student.academicStatus === 'Cuti Akademik' ? 'bg-amber-500' : 'bg-[#582be8]']"></span>
                  {{ student.academicStatus }}
                </span>
              </td>

              <!-- Autentikasi Kredensial -->
              <td class="whitespace-nowrap px-4 py-4">
                <p
                  :class="[
                    'flex items-center gap-1.5 font-mono text-[10px] font-semibold',
                    student.authStatus === 'Belum Digenerate'
                      ? 'text-rose-700'
                      : student.authStatus === 'Ditangguhkan'
                      ? 'text-amber-700'
                      : 'text-emerald-800'
                  ]"
                >
                  <span
                    :class="[
                      'h-2 w-2 rounded-full',
                      student.authStatus === 'Belum Digenerate'
                        ? 'bg-rose-500'
                        : student.authStatus === 'Ditangguhkan'
                        ? 'bg-amber-500'
                        : 'bg-emerald-500'
                    ]"
                  ></span>
                  {{ student.authStatus }}
                </p>
                <p class="mt-1 font-mono text-[10px] text-slate-500">{{ student.authNote || 'Kredensial Siap' }}</p>
              </td>

              <!-- Aksi -->
              <td class="px-4 py-4 text-center">
                <div class="inline-flex items-center gap-1">
                  <button
                    type="button"
                    @click="openDetailModal(student)"
                    title="Detail Mahasiswa"
                    class="rounded-lg p-1.5 text-slate-500 transition hover:bg-purple-50 hover:text-[#582be8] cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-lg">badge</span>
                  </button>
                  <button
                    type="button"
                    @click="handleResetAuth(student)"
                    title="Reset Kredensial Autentikasi"
                    class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-lg">lock_reset</span>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="filteredStudents.length === 0">
              <td colspan="8" class="text-center py-10 text-slate-500">
                <span class="material-symbols-outlined text-[36px] text-slate-300">person_search</span>
                <p class="text-sm font-semibold text-slate-700 mt-2">Tidak ada data mahasiswa yang sesuai dengan filter.</p>
                <button
                  type="button"
                  @click="resetFilters"
                  class="mt-3 text-xs font-semibold text-[#582be8] hover:underline cursor-pointer"
                >
                  Reset Semua Filter
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table Footer / Pagination -->
      <div class="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-white p-4.5 sm:flex-row">
        <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Menampilkan <strong class="text-slate-900 font-semibold">1 - {{ filteredStudents.length }}</strong> dari <strong class="text-slate-900 font-semibold">4,850</strong> mahasiswa terdaftar</span>
          <span class="text-slate-300">|</span>
          <span class="font-mono text-[10px] text-slate-400">Master Data Kampus</span>
        </div>

        <nav aria-label="Navigasi Halaman Master Data" class="flex items-center gap-1.5">
          <button
            type="button"
            disabled
            class="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 opacity-40 cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-base">chevron_left</span>
            Sebelumnya
          </button>
          <button type="button" class="flex h-8 w-8 items-center justify-center rounded-xl bg-[#582be8] font-mono text-xs font-bold text-white shadow-sm shadow-purple-600/25">1</button>
          <button type="button" class="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white font-mono text-xs font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer">2</button>
          <button type="button" class="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white font-mono text-xs font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer">3</button>
          <span class="px-1 text-xs text-slate-400">...</span>
          <button type="button" class="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white font-mono text-xs font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer">485</button>
          <button
            type="button"
            class="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 cursor-pointer"
          >
            Selanjutnya
            <span class="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </nav>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════
         INFORMATION CARDS: MASTER DATA & INDEPENDENT DPT ARCHITECTURE
    ═══════════════════════════════════════════════════════════════════ -->
    <section class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Card 1: Konsep Pemisahan Master Data & DPT Per Pemilihan -->
      <div class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-purple-200 transition lg:col-span-2">
        <div>
          <div class="mb-3 flex items-center gap-2.5 text-[#582be8]">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <span class="material-symbols-outlined text-[24px]">dataset</span>
            </div>
            <h2 class="text-base sm:text-lg font-bold text-slate-900">
              Arsitektur Data: Master Mahasiswa &amp; DPT Independen
            </h2>
          </div>

          <p class="mb-5 text-xs sm:text-sm leading-relaxed text-slate-500">
            Sistem A-Voting memisahkan basis data induk mahasiswa dari penetapan hak suara per agenda. Mahasiswa didaftarkan satu kali sebagai Master Data, dan dapat memiliki hak suara pada beberapa pemilihan berbeda secara independen.
          </p>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
              <span class="material-symbols-outlined mt-0.5 shrink-0 text-xl text-[#582be8]">badge</span>
              <div>
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">1 Master Data = Multi Pemilihan</h3>
                <p class="mt-1 text-xs leading-5 text-slate-500">
                  Satu mahasiswa dapat terdaftar sekaligus pada Pemilihan BEM Universitas, DPM Fakultas, dan Himpunan Jurusan sesuai ruang lingkupnya.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
              <span class="material-symbols-outlined mt-0.5 shrink-0 text-xl text-emerald-600">how_to_vote</span>
              <div>
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">Isolasi Status Penggunaan Hak Suara</h3>
                <p class="mt-1 text-xs leading-5 text-slate-500">
                  Status sudah/belum memilih dicatat khusus per masing-masing agenda pemilihan pada tab Pemilih (DPT), bukan sebagai status global mahasiswa.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 font-mono text-[10px] text-slate-500">
          <span>Standar Tata Kelola Data A-Voting</span>
          <span class="font-semibold text-[#582be8] bg-purple-50 px-2.5 py-0.5 rounded-md">Master Data Management (MDM)</span>
        </div>
      </div>

      <!-- Card 2: Panduan Format Impor Data -->
      <div class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-purple-200 transition">
        <div>
          <div class="mb-3 flex items-center gap-2.5 text-[#582be8]">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <span class="material-symbols-outlined text-[24px]">cloud_upload</span>
            </div>
            <h2 class="text-base sm:text-lg font-bold text-slate-900">
              Panduan Format Master Data
            </h2>
          </div>

          <p class="mb-4 text-xs leading-5 text-slate-500">
            Unggah berkas spreadsheet dari Siakad Kampus dengan format kolom terstandarisasi untuk sinkronisasi master data mahasiswa secara terpadu.
          </p>

          <div class="space-y-2.5 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5 font-mono text-[10px] text-slate-600">
            <div class="flex justify-between gap-2">
              <span class="text-slate-500">Kolom 1</span>
              <span class="text-right font-semibold text-slate-900">NIM (10–12 Digit)</span>
            </div>
            <div class="flex justify-between gap-2">
              <span class="text-slate-500">Kolom 2</span>
              <span class="text-right font-semibold text-slate-900">Nama Lengkap</span>
            </div>
            <div class="flex justify-between gap-2">
              <span class="text-slate-500">Kolom 3</span>
              <span class="text-right font-semibold text-slate-900">Email Kampus</span>
            </div>
            <div class="flex justify-between gap-2">
              <span class="text-slate-500">Kolom 4</span>
              <span class="text-right font-semibold text-slate-900">Fakultas &amp; Program Studi</span>
            </div>
            <div class="flex justify-between gap-2">
              <span class="text-slate-500">Kolom 5</span>
              <span class="text-right font-semibold text-slate-900">Angkatan &amp; Semester</span>
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            @click="triggerToast('Mengunduh template master data mahasiswa .XLSX...')"
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#582be8] hover:text-[#471ec7] hover:underline transition cursor-pointer"
          >
            <span class="material-symbols-outlined text-base">file_download</span>
            Unduh Template .XLSX
          </button>
          <span class="font-mono text-[10px] text-slate-400">Ukuran Maks: 15MB</span>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: DETAIL MAHASISWA
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showDetailModal && selectedStudent" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showDetailModal = false"></div>

          <!-- Modal Body -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200">
            <div class="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center font-bold">
                  {{ selectedStudent.initials }}
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">Profil Master Mahasiswa</h3>
                  <p class="font-mono text-[11px] text-slate-400">NIM {{ selectedStudent.nim }}</p>
                </div>
              </div>
              <button @click="showDetailModal = false" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div class="p-6 space-y-4">
              <!-- Nama & Status -->
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-base font-bold text-slate-900">{{ selectedStudent.name }}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">{{ selectedStudent.email }}</p>
                </div>
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  {{ selectedStudent.accountStatus }}
                </span>
              </div>

              <!-- Grid Detail Data -->
              <div class="grid grid-cols-2 gap-3 pt-2">
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span class="text-[10px] font-mono uppercase text-slate-400 font-semibold">Fakultas</span>
                  <p class="text-xs font-bold text-slate-800 mt-0.5">{{ selectedStudent.faculty }}</p>
                </div>
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span class="text-[10px] font-mono uppercase text-slate-400 font-semibold">Program Studi</span>
                  <p class="text-xs font-bold text-slate-800 mt-0.5">{{ selectedStudent.major }}</p>
                </div>
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span class="text-[10px] font-mono uppercase text-slate-400 font-semibold">Angkatan / Semester</span>
                  <p class="text-xs font-bold text-slate-800 mt-0.5">{{ selectedStudent.academicYear }} (Semester {{ selectedStudent.semester }})</p>
                </div>
                <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span class="text-[10px] font-mono uppercase text-slate-400 font-semibold">Status Akademik</span>
                  <p class="text-xs font-bold text-[#582be8] mt-0.5">{{ selectedStudent.academicStatus }}</p>
                </div>
              </div>

              <!-- Info Kredensial -->
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 font-medium">Status Autentikasi:</span>
                  <span class="font-bold text-emerald-700">{{ selectedStudent.authStatus }}</span>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 font-medium">No. Telepon / Kontak:</span>
                  <span class="font-mono text-slate-800">{{ selectedStudent.phone || '-' }}</span>
                </div>
                <div class="flex items-center justify-between text-xs">
                  <span class="text-slate-500 font-medium">Terdaftar di Master Data:</span>
                  <span class="text-slate-800">{{ selectedStudent.registeredAt }}</span>
                </div>
              </div>

              <!-- Hak Suara Info Note -->
              <div class="p-3.5 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-900 flex items-start gap-2.5">
                <span class="material-symbols-outlined text-[18px] text-[#582be8] shrink-0 mt-0.5">info</span>
                <p class="leading-relaxed">
                  Penetapan hak suara mahasiswa ini dan catatan voting dilakukan secara terpisah di masing-masing agenda pemilihan pada panel <strong>Kelola &amp; Monitoring &gt; Pemilih (DPT)</strong>.
                </p>
              </div>
            </div>

            <div class="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3 z-10">
              <button
                @click="showDetailModal = false"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                Tutup
              </button>
              <button
                @click="handleResetAuth(selectedStudent!); showDetailModal = false"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                Reset Kredensial
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: TAMBAH MAHASISWA
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showAddModal = false"></div>

          <!-- Modal Body -->
          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200">
            <div class="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px]">person_add</span>
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900">Tambah Mahasiswa Baru</h3>
                  <p class="font-mono text-[10px] text-slate-400">Pendaftaran Master Data Sivitas</p>
                </div>
              </div>
              <button @click="showAddModal = false" class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div class="p-6 space-y-4 text-xs">
              <div v-if="addError" class="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs">
                {{ addError }}
              </div>

              <!-- NIM & Nama -->
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Nomor Induk Mahasiswa (NIM) <span class="text-red-500">*</span></label>
                <input
                  v-model="addForm.nim"
                  type="text"
                  placeholder="Contoh: 2408101050"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white"
                />
              </div>

              <div>
                <label class="block font-semibold text-slate-700 mb-1">Nama Lengkap Mahasiswa <span class="text-red-500">*</span></label>
                <input
                  v-model="addForm.name"
                  type="text"
                  placeholder="Contoh: Sarah Azhari"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white"
                />
              </div>

              <!-- Email Kampus -->
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Email Kampus (Siakad)</label>
                <input
                  v-model="addForm.email"
                  type="email"
                  placeholder="Contoh: sarah.a@student.ac.id"
                  class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white"
                />
              </div>

              <!-- Fakultas & Prodi -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Fakultas</label>
                  <select
                    v-model="addForm.facultyCode"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#582be8] cursor-pointer"
                  >
                    <option value="FT">Teknik (FT)</option>
                    <option value="FASILKOM">Ilmu Komputer (Fasilkom)</option>
                    <option value="FEB">Ekonomi &amp; Bisnis (FEB)</option>
                    <option value="FH">Hukum (FH)</option>
                    <option value="FPSI">Psikologi (FPsi)</option>
                    <option value="FK">Kedokteran (FK)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Program Studi</label>
                  <input
                    v-model="addForm.major"
                    type="text"
                    placeholder="Contoh: S1 Informatika"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#582be8] focus:bg-white"
                  />
                </div>
              </div>

              <!-- Angkatan & Semester -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Angkatan</label>
                  <input
                    v-model="addForm.academicYear"
                    type="text"
                    placeholder="2024"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#582be8]"
                  />
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Semester</label>
                  <input
                    v-model.number="addForm.semester"
                    type="number"
                    min="1"
                    max="14"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#582be8]"
                  />
                </div>
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Status Akademik</label>
                  <select
                    v-model="addForm.academicStatus"
                    class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-[#582be8] cursor-pointer"
                  >
                    <option value="Aktif (Reguler)">Aktif (Reguler)</option>
                    <option value="Aktif (Transfer)">Aktif (Transfer)</option>
                    <option value="Cuti Akademik">Cuti Akademik</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 rounded-b-2xl flex items-center justify-end gap-3 z-10">
              <button
                @click="showAddModal = false"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                Batal
              </button>
              <button
                @click="submitAddForm"
                class="px-5 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition cursor-pointer"
              >
                Simpan Mahasiswa
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         TOAST FEEDBACK
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="toast-fade">
        <div
          v-if="showToast"
          class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl text-xs"
        >
          <span class="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
          <span>{{ toastMessage }}</span>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

/* Modal Transitions */
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

/* Toast Transitions */
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.2s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>