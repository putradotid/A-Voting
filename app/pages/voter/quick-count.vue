<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'voter'
})

// State Waktu Pembaruan & Animasi Refresh
const lastUpdated = ref('24 Okt 2025, 14:45:00 WIB')
const isRefreshing = ref(false)
const refreshSuccess = ref(false)

const triggerRefresh = () => {
  if (isRefreshing.value) return
  isRefreshing.value = true
  refreshSuccess.value = false

  setTimeout(() => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    lastUpdated.value = `24 Okt 2025, ${hours}:${minutes}:${seconds} WIB`
    isRefreshing.value = false
    refreshSuccess.value = true
    setTimeout(() => {
      refreshSuccess.value = false
    }, 2500)
  }, 700)
}

// Data Metrik Partisipasi
const totalDpt = 4850
const totalVotesIn = 3420
const turnoutPercentage = ((totalVotesIn / totalDpt) * 100).toFixed(1)
const reportedFaculties = 5
const totalFaculties = 5

// Data Pasangan Calon & Hasil Suara Sementara
interface CandidateResult {
  id: string
  number: string
  shortName: string
  fullName: string
  facultyBadge: string
  tagline: string
  photo: string
  votes: number
  percentage: number
  colorClass: string
  barBgClass: string
  isLeading: boolean
}

const candidates = ref<CandidateResult[]>([
  {
    id: '01',
    number: '01',
    shortName: 'Farhan & Nabila',
    fullName: 'Muhammad Farhan & Nabila Putri',
    facultyBadge: 'BEM FT-FEB',
    tagline: '“Sinergi Nyata, Berdampak Bersama”',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUExGpIuQjTmx2t9uax_Q5HJRcEObG8QLy91Pwz4WVcQeaT4vw3FAEZF5ZdtptXSgG0XRhi0AaGcT-45Ie2Ii51DfEgU_F3Z7jnkcUWMwnP6UtkEp5guzaiD20rUJKDdYk71aKL3j38287bX9FoWzJ5qJZC_YO4H_w1EMjuPm_g6K44vPEPtviGAAbULzHDJ8u65BGgHR4AfMHoUARCeR9j9CBJ4DFxhKiagiMctRqTV5pwdaEjiHCPA',
    votes: 1485,
    percentage: 43.4,
    colorClass: 'text-[#582be8]',
    barBgClass: 'bg-[#582be8]',
    isLeading: true
  },
  {
    id: '02',
    number: '02',
    shortName: 'Dimas & Siti',
    fullName: 'Dimas Arya Prasetya & Siti Rahmawati',
    facultyBadge: 'BEM FT-FISIP',
    tagline: '“Kampus Inklusif, Prestasi Berkelanjutan”',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUZUXWyq8lHl78RSQTBsTkQzxcLwqf0PZM2ckU4ns1ZNstpAleqx4vYBT4v5V-4qB_aUIC63ui3Ai7fKkcwaWmLiCyXsyC7VGjAyCIUNojE372e86v8JTiDPOWTDSkJ8OsdjVD-grmktM7MkG0snpvLBEE4GlxSV93jPUkVWZWIdFBf2WeSM9eTuEEfkQLr5toKR0-V-wVlX2dhWvNSivJfh08fz_GkDe9gLgf-JI-Tdeb0jDCwavRPA',
    votes: 1245,
    percentage: 36.4,
    colorClass: 'text-indigo-600',
    barBgClass: 'bg-indigo-600',
    isLeading: false
  },
  {
    id: '03',
    number: '03',
    shortName: 'Bagas & Amanda',
    fullName: 'Bagas Wicaksono & Amanda Clarissa',
    facultyBadge: 'BEM FH-FPSI',
    tagline: '“Integritas Tegas, Suara Mahasiswa Berdaulat”',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTp1X5iJ70u7sYg3L9b6Xo1bYvRk_41wU2Kq2m0oV02Fk8c-A99g-f19y-L1k9pXvN1i9x2m4-0o8v-b4X9k-0-1b2c3d4e5f6',
    votes: 690,
    percentage: 20.2,
    colorClass: 'text-violet-500',
    barBgClass: 'bg-violet-500',
    isLeading: false
  }
])

// Distribusi Suara per Fakultas
interface FacultyRow {
  name: string
  code: string
  totalVotes: number
  p01Votes: number
  p01Pct: number
  p02Votes: number
  p02Pct: number
  p03Votes: number
  p03Pct: number
}

const facultyData = ref<FacultyRow[]>([
  {
    name: 'Fakultas Teknik',
    code: 'FT',
    totalVotes: 1020,
    p01Votes: 620,
    p01Pct: 60.8,
    p02Votes: 260,
    p02Pct: 25.5,
    p03Votes: 140,
    p03Pct: 13.7
  },
  {
    name: 'Fakultas Ilmu Komputer',
    code: 'Fasilkom',
    totalVotes: 780,
    p01Votes: 410,
    p01Pct: 52.6,
    p02Votes: 250,
    p02Pct: 32.1,
    p03Votes: 120,
    p03Pct: 15.4
  },
  {
    name: 'Fakultas Ilmu Sosial & Ilmu Politik',
    code: 'FISIP',
    totalVotes: 680,
    p01Votes: 160,
    p01Pct: 23.5,
    p02Votes: 490,
    p02Pct: 72.1,
    p03Votes: 30,
    p03Pct: 4.4
  },
  {
    name: 'Fakultas Ekonomi & Bisnis',
    code: 'FEB',
    totalVotes: 540,
    p01Votes: 230,
    p01Pct: 42.6,
    p02Votes: 170,
    p02Pct: 31.5,
    p03Votes: 140,
    p03Pct: 25.9
  },
  {
    name: 'Fakultas Hukum',
    code: 'FH',
    totalVotes: 400,
    p01Votes: 65,
    p01Pct: 16.3,
    p02Votes: 75,
    p02Pct: 18.8,
    p03Votes: 260,
    p03Pct: 65.0
  }
])

// Jadwal Tahapan Pemilihan
const scheduleSteps = [
  {
    time: '08:00 - 14:00 WIB',
    title: 'Pemungutan Suara Digital',
    desc: 'Pemilih memberikan suara terenkripsi di bilik suara.',
    status: 'completed'
  },
  {
    time: '14:00 - 17:30 WIB',
    title: 'Penghitungan Cepat & Agregasi Node',
    desc: 'Agregasi sementara hasil suara terdesentralisasi.',
    status: 'active'
  },
  {
    time: '18:00 WIB',
    title: 'Sidang Pleno Resmi KPU Mahasiswa',
    desc: 'Penetapan resmi dan berita acara pasangan calon terpilih.',
    status: 'upcoming'
  }
]
</script>

<template>
  <div class="space-y-8">
    <!-- =====================================================
         BREADCRUMB & STATUS BAR ATAS
    ====================================================== -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="flex items-center gap-2 text-xs text-slate-500">
        <NuxtLink
          to="/voter/logout"
          class="inline-flex items-center gap-1 font-medium text-slate-600 hover:text-[#582be8] transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
          Kembali ke Sesi Selesai
        </NuxtLink>
        <span class="text-slate-300">/</span>
        <span class="font-semibold text-[#582be8]">Hitung Cepat (Quick Count)</span>
      </div>

      <div class="flex items-center gap-3 self-start sm:self-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Stream Suara Masuk
        </div>

        <button
          type="button"
          :disabled="isRefreshing"
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition active:scale-95 disabled:opacity-50"
          @click="triggerRefresh"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5 text-slate-500"
            :class="{ 'animate-spin text-[#582be8]': isRefreshing }"
            viewBox="0 -960 960 960"
            fill="currentColor"
          >
            <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z" />
          </svg>
          <span>{{ isRefreshing ? 'Memperbarui...' : 'Segarkan Data' }}</span>
        </button>
      </div>
    </div>

    <!-- =====================================================
         HERO SECTION / BANNER UTAMA
    ====================================================== -->
    <section class="relative overflow-hidden rounded-2xl bg-white border border-purple-100/70 p-6 lg:p-8 shadow-sm">
      <div class="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div class="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#582be8] text-[11px] font-mono font-semibold uppercase tracking-wider mb-3">
            <span>🗳️</span>
            Pemilihan Raya BEM &amp; DPM 2025
          </div>
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900">
            Pantau Hitung Cepat (Live Quick Count)
          </h1>
          <p class="mt-2 text-sm text-slate-500 max-w-2xl leading-relaxed">
            Agregasi perolehan suara sementara berdasarkan data kriptografis yang telah divalidasi oleh konsensus node independen TPS Kampus.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 bg-[#f8f9ff] border border-purple-100/60 p-4 rounded-xl">
          <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Waktu Pembaruan Terakhir</span>
          <span class="font-mono text-xs sm:text-sm font-bold text-[#582be8]">{{ lastUpdated }}</span>
          <span
            v-if="refreshSuccess"
            class="text-[11px] text-emerald-600 font-medium animate-pulse"
          >
            ✓ Data berhasil disinkronkan
          </span>
        </div>
      </div>
    </section>

    <!-- =====================================================
         NOTICE: PERBEDAAN HASIL SEMENTARA VS HASIL RESMI
    ====================================================== -->
    <section class="rounded-2xl border border-amber-200/90 bg-amber-50/70 p-5 lg:p-6 shadow-sm">
      <div class="flex items-start gap-4">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 -960 960 960" fill="currentColor">
            <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-80q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-380q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-140h80v-160h-80v160Z" />
          </svg>
        </div>

        <div class="space-y-2 text-xs sm:text-sm text-amber-900 leading-relaxed flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h3 class="font-bold text-amber-950 text-sm sm:text-base">
              Penetapan &amp; Status Hasil Hitung Cepat
            </h3>
            <span class="rounded bg-amber-200 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-amber-900">
              Hasil Sementara
            </span>
            <span class="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#582be8]">
              Mode Simulasi (Mock Prototype)
            </span>
          </div>

          <p>
            <strong>Penting:</strong> Data yang tercantum pada halaman ini adalah <em>Quick Count</em> (hitung cepat sementara) untuk tujuan transparansi publik. Hasil akhir resmi dan penetapan pasangan calon terpilih akan disahkan secara legal melalui <strong>Rapat Pleno Terbuka KPU Mahasiswa pada 24 Oktober 2025 pukul 18:00 WIB</strong>.
          </p>
          <p class="text-[11px] text-amber-800">
            ℹ️ <em>Catatan Teknis:</em> Tampilan ini menggunakan mock dataset terdistribusi untuk pengujian antarmuka dan belum terikat dengan transaksi permanen server pusat.
          </p>
        </div>
      </div>
    </section>

    <!-- =====================================================
         KEY METRICS GRID
    ====================================================== -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <!-- Total Suara Masuk -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-purple-200 transition">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Suara Masuk</span>
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-[#582be8] text-sm">
            📥
          </span>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-3xl font-extrabold text-[#582be8]">{{ totalVotesIn.toLocaleString() }}</span>
          <span class="text-xs font-semibold text-slate-500">/ {{ totalDpt.toLocaleString() }} DPT</span>
        </div>
        <div class="mt-3">
          <div class="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span>Partisipasi</span>
            <span class="font-bold text-[#582be8]">{{ turnoutPercentage }}%</span>
          </div>
          <div class="h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div class="h-full bg-[#582be8] rounded-full transition-all duration-500" :style="{ width: `${turnoutPercentage}%` }"></div>
          </div>
        </div>
      </div>

      <!-- Total DPT Terdaftar -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 transition">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">DPT Terverifikasi</span>
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 text-sm">
            👥
          </span>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-3xl font-extrabold text-blue-600">{{ totalDpt.toLocaleString() }}</span>
          <span class="text-xs font-medium text-slate-500">Mahasiswa</span>
        </div>
        <p class="mt-3 text-xs text-slate-400">
          Identitas NIK &amp; NIM divalidasi sistem satu pemilih satu suara.
        </p>
      </div>

      <!-- Wilayah / Fakultas Masuk -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200 transition">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fakultas / TPS</span>
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 text-sm">
            🏛️
          </span>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-3xl font-extrabold text-emerald-600">{{ reportedFaculties }} / {{ totalFaculties }}</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">100% Masuk</span>
        </div>
        <p class="mt-3 text-xs text-slate-400">
          FT, Fasilkom, FISIP, FEB, dan FH telah mengirimkan rekapitulasi.
        </p>
      </div>

      <!-- Kriptografi & Konsensus -->
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-violet-200 transition">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Konsensus Node</span>
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600 text-sm">
            🛡️
          </span>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-3xl font-extrabold text-violet-600">9</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-100 text-violet-800">Node Sinkron</span>
        </div>
        <p class="mt-3 text-xs text-slate-400 font-mono">
          SHA-256 Ledger Valid • Zero Fraud Detected
        </p>
      </div>
    </section>

    <!-- =====================================================
         GRAFIK PEROLEHAN SUARA KANDIDAT
    ====================================================== -->
    <section class="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm">
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 class="text-lg font-bold text-slate-900">
            Perolehan Suara Pasangan Calon Ketua &amp; Wakil Ketua BEM
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Agregasi suara masuk: 3,420 suara (100% dari total suara masuk sementara)
          </p>
        </div>

        <div class="flex items-center gap-2 self-start sm:self-auto">
          <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Status:</span>
          <span class="inline-flex items-center gap-1.5 rounded-full bg-purple-50 px-2.5 py-1 text-xs font-bold text-[#582be8]">
            <span class="h-2 w-2 rounded-full bg-[#582be8] animate-pulse"></span>
            Sedang Dihitung
          </span>
        </div>
      </div>

      <!-- Stacked Visual Bar -->
      <div class="mb-8">
        <div class="h-5 w-full overflow-hidden rounded-full bg-slate-100 flex p-0.5 shadow-inner">
          <div
            v-for="cand in candidates"
            :key="cand.id"
            :class="cand.barBgClass"
            :style="{ width: `${cand.percentage}%` }"
            class="h-full transition-all duration-700 first:rounded-l-full last:rounded-r-full relative group cursor-pointer"
            :title="`Paslon ${cand.number}: ${cand.percentage}% (${cand.votes} Suara)`"
          ></div>
        </div>
        <div class="mt-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div
            v-for="cand in candidates"
            :key="`legend-${cand.id}`"
            class="flex items-center gap-2"
          >
            <span class="h-3 w-3 rounded-full" :class="cand.barBgClass"></span>
            <span class="font-bold text-slate-800">Paslon {{ cand.number }}: {{ cand.shortName }}</span>
            <span class="font-mono text-slate-500">({{ cand.percentage }}%)</span>
          </div>
        </div>
      </div>

      <!-- Candidate Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="cand in candidates"
          :key="cand.id"
          class="relative flex flex-col justify-between rounded-2xl border transition p-5"
          :class="cand.isLeading ? 'border-[#582be8] bg-purple-50/20 shadow-md ring-2 ring-[#582be8]/20' : 'border-slate-200 bg-white hover:border-slate-300'"
        >
          <!-- Leading Ribbon -->
          <div
            v-if="cand.isLeading"
            class="absolute -top-3 right-4 inline-flex items-center gap-1 rounded-full bg-[#582be8] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
          >
            <span>👑</span>
            Unggul Sementara
          </div>

          <div>
            <!-- Top Card Header: Nomor & Foto -->
            <div class="flex items-center gap-4 mb-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-mono text-xl font-extrabold shadow-sm"
                :class="cand.isLeading ? 'bg-[#582be8] text-white' : 'bg-slate-100 text-slate-700'"
              >
                {{ cand.number }}
              </div>

              <div class="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                <img
                  :src="cand.photo"
                  :alt="cand.fullName"
                  class="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <div class="min-w-0 flex-1">
                <span class="inline-block rounded bg-purple-100/80 px-2 py-0.5 text-[10px] font-bold text-[#582be8]">
                  {{ cand.facultyBadge }}
                </span>
                <h3 class="text-sm font-bold text-slate-900 truncate mt-1">
                  {{ cand.shortName }}
                </h3>
              </div>
            </div>

            <!-- Full Name & Slogan -->
            <p class="text-xs text-slate-600 line-clamp-1 mb-1 font-medium">
              {{ cand.fullName }}
            </p>
            <p class="text-[11px] text-slate-400 italic line-clamp-1 mb-4">
              {{ cand.tagline }}
            </p>

            <!-- Vote Number & Percentage -->
            <div class="rounded-xl bg-white border border-slate-100 p-3 shadow-inner">
              <div class="flex items-baseline justify-between">
                <span class="text-2xl font-extrabold" :class="cand.colorClass">
                  {{ cand.percentage }}%
                </span>
                <span class="font-mono text-xs font-bold text-slate-700">
                  {{ cand.votes.toLocaleString() }} Suara
                </span>
              </div>

              <!-- Bar per candidate -->
              <div class="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  class="h-full rounded-full transition-all duration-700"
                  :class="cand.barBgClass"
                  :style="{ width: `${cand.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Bottom Footer Note -->
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Kontribusi Suara</span>
            <span class="font-semibold text-slate-600">{{ ((cand.votes / totalVotesIn) * 100).toFixed(1) }}% dari sah</span>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         DISTRIBUSI SUARA PER FAKULTAS (BREAKDOWN)
    ====================================================== -->
    <section class="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm">
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 class="text-lg font-bold text-slate-900">
            Distribusi &amp; Rekapitulasi Suara per Fakultas
          </h2>
          <p class="text-xs text-slate-500 mt-0.5">
            Perbandingan perolehan suara masing-masing paslon di setiap wilayah fakultas
          </p>
        </div>

        <div class="flex items-center gap-3 text-xs font-medium text-slate-600">
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-[#582be8]"></span>01: Farhan</span>
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-indigo-600"></span>02: Dimas</span>
          <span class="flex items-center gap-1.5"><span class="h-2.5 w-2.5 rounded-full bg-violet-500"></span>03: Bagas</span>
        </div>
      </div>

      <div class="space-y-6">
        <div
          v-for="fac in facultyData"
          :key="fac.code"
          class="rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50"
        >
          <div class="mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-2">
              <span class="rounded bg-white border border-slate-200 px-2 py-0.5 font-mono text-[11px] font-bold text-slate-700">
                {{ fac.code }}
              </span>
              <span class="font-bold text-slate-800 text-sm">{{ fac.name }}</span>
            </div>
            <span class="font-mono text-xs font-semibold text-[#582be8] bg-purple-50 px-2.5 py-0.5 rounded-md self-start sm:self-auto">
              Total: {{ fac.totalVotes.toLocaleString() }} Suara Masuk
            </span>
          </div>

          <!-- Multi-progress bar -->
          <div class="flex h-3.5 overflow-hidden rounded-full bg-slate-200/80 shadow-inner">
            <div
              class="h-full bg-[#582be8] transition-all"
              :style="{ width: `${fac.p01Pct}%` }"
              :title="`Paslon 01: ${fac.p01Votes} (${fac.p01Pct}%)`"
            ></div>
            <div
              class="h-full bg-indigo-600 transition-all"
              :style="{ width: `${fac.p02Pct}%` }"
              :title="`Paslon 02: ${fac.p02Votes} (${fac.p02Pct}%)`"
            ></div>
            <div
              class="h-full bg-violet-500 transition-all"
              :style="{ width: `${fac.p03Pct}%` }"
              :title="`Paslon 03: ${fac.p03Votes} (${fac.p03Pct}%)`"
            ></div>
          </div>

          <!-- Sub breakdown text -->
          <div class="mt-2.5 grid grid-cols-3 gap-2 text-[11px] font-mono">
            <div class="text-slate-600">
              <span class="font-bold text-[#582be8]">01:</span> {{ fac.p01Votes }} <span class="text-slate-400">({{ fac.p01Pct }}%)</span>
            </div>
            <div class="text-slate-600">
              <span class="font-bold text-indigo-600">02:</span> {{ fac.p02Votes }} <span class="text-slate-400">({{ fac.p02Pct }}%)</span>
            </div>
            <div class="text-slate-600">
              <span class="font-bold text-violet-500">03:</span> {{ fac.p03Votes }} <span class="text-slate-400">({{ fac.p03Pct }}%)</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         TIMELINE TAHAPAN PEMILIHAN MENUJU HASIL RESMI
    ====================================================== -->
    <section class="rounded-2xl border border-slate-200 bg-white p-6 lg:p-8 shadow-sm">
      <div class="mb-6 border-b border-slate-100 pb-4">
        <h2 class="text-lg font-bold text-slate-900">
          Jadwal Tahapan Menuju Penetapan Resmi
        </h2>
        <p class="text-xs text-slate-500 mt-0.5">
          Protokol tahapan pemilu mahasiswa dari pemungutan hingga sidang pleno penetapan pemenang
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="(step, idx) in scheduleSteps"
          :key="idx"
          class="flex flex-col justify-between rounded-xl border p-4"
          :class="{
            'border-emerald-200 bg-emerald-50/40': step.status === 'completed',
            'border-[#582be8] bg-purple-50/30 ring-1 ring-[#582be8]': step.status === 'active',
            'border-slate-200 bg-slate-50/50': step.status === 'upcoming'
          }"
        >
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="font-mono text-xs font-bold text-slate-700">{{ step.time }}</span>
              <span
                v-if="step.status === 'completed'"
                class="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800"
              >
                ✓ Selesai
              </span>
              <span
                v-else-if="step.status === 'active'"
                class="rounded-full bg-[#582be8] px-2 py-0.5 text-[10px] font-bold text-white flex items-center gap-1"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-white animate-ping"></span>
                Berlangsung
              </span>
              <span
                v-else
                class="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600"
              >
                ⏳ Menunggu
              </span>
            </div>
            <h3 class="text-sm font-bold text-slate-900 mb-1">{{ step.title }}</h3>
            <p class="text-xs text-slate-500 leading-relaxed">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         ACTION BAR BAWAH / NAVIGASI
    ====================================================== -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
      <div>
        <h4 class="text-sm font-bold text-slate-900">Butuh Informasi Lebih Lanjut?</h4>
        <p class="text-xs text-slate-500 mt-0.5">
          Kembali ke sesi penutupan pemilih atau periksa bukti transaksi suara Anda.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <NuxtLink
          to="/voter/logout"
          class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-slate-300 px-5 py-2.5 text-xs font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
          </svg>
          Sesi Logout
        </NuxtLink>

        <NuxtLink
          to="/"
          class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-[#582be8] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-purple-600/20 hover:bg-[#471ec7] transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
          </svg>
          Beranda A-Voting
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
</style>
