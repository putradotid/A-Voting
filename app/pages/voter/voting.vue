<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVoterSession } from '~/composables/useVoterSession'

definePageMeta({
  layout: false,
  middleware: 'voter-auth'
})

const { voter, receipt, getClientCsrfToken } = useVoterSession()

interface ProgramKerjaItem {
  title: string
  desc: string
}

interface CandidatePerson {
  name: string
  nim: string
  prodi: string
}

interface Candidate {
  id: string
  number: string
  title: string
  fullName: string
  facultyBadge: string
  photo: string
  ketua: CandidatePerson
  wakil: CandidatePerson
  tagline: string
  visi: string
  misi: string[]
  programKerja: ProgramKerjaItem[]
}

// State Pasangan Calon Resmi dari Server (Tanpa Mockup Fallback)
const serverCandidates = ref<Candidate[]>([])
const loadingCandidates = ref(true)
const candidateLoadError = ref<string | null>(null)

async function fetchCandidates() {
  loadingCandidates.value = true
  candidateLoadError.value = null
  selectedCandidateId.value = null
  try {
    const res = await $fetch<{ success: boolean; candidates: Candidate[] }>('/api/voter/candidates')
    if (res.success && Array.isArray(res.candidates)) {
      serverCandidates.value = res.candidates
    } else {
      serverCandidates.value = []
    }
  } catch (err: any) {
    console.warn('[voting.vue] Kendala saat mengambil data kandidat aktif:', err)
    candidateLoadError.value = err.data?.statusMessage || err.message || 'Gagal memuat daftar pasangan calon dari server. Silakan coba kembali.'
    serverCandidates.value = []
  } finally {
    loadingCandidates.value = false
  }
}

onMounted(() => {
  fetchCandidates()
})

// Hanya menggunakan kandidat yang terverifikasi dari server
const activeCandidates = computed(() => serverCandidates.value)

// State Pemilihan (Kondisi awal tidak menetapkan paslon otomatis)
const selectedCandidateId = ref<string | null>(null)
const selectedCandidate = computed(() => activeCandidates.value.find(c => c.id === selectedCandidateId.value) || null)

function selectCandidate(id: string) {
  selectedCandidateId.value = id
}

function deselectCandidate() {
  selectedCandidateId.value = null
}

// State Modal Visi & Misi
const isVisiMisiModalOpen = ref(false)
const activeVisiMisiCandidate = ref<Candidate | null>(null)

function openVisiMisiModal(candidate: Candidate) {
  activeVisiMisiCandidate.value = candidate
  isVisiMisiModalOpen.value = true
}

function closeVisiMisiModal() {
  isVisiMisiModalOpen.value = false
  activeVisiMisiCandidate.value = null
}

// State Modal Konfirmasi Pemilihan
const isConfirmModalOpen = ref(false)
const isSubmitting = ref(false)
const submitError = ref<string | null>(null)

function openConfirmModal() {
  if (!selectedCandidate.value) return
  submitError.value = null
  isConfirmModalOpen.value = true
}

function closeConfirmModal() {
  if (isSubmitting.value) return
  isConfirmModalOpen.value = false
  submitError.value = null
}

async function handleConfirmVote() {
  if (!selectedCandidate.value || isSubmitting.value) return
  isSubmitting.value = true
  submitError.value = null

  try {
    const token = getClientCsrfToken()
    const res = await $fetch<{
      success: boolean
      alreadyVoted?: boolean
      message: string
      receipt: any
    }>('/api/voter/vote', {
      method: 'POST',
      body: { candidateId: selectedCandidate.value.id },
      headers: token ? { 'x-csrf-token': token } : {}
    })

    if (res.success && res.receipt) {
      receipt.value = res.receipt
      if (voter.value) {
        voter.value.hasVoted = true
      }
      isConfirmModalOpen.value = false
      await navigateTo('/voter/receipt')
    } else {
      throw new Error(res.message || 'Gagal mencatat surat suara ke sistem.')
    }
  } catch (err: any) {
    console.error('[voting.vue] Gagal mengirim suara:', err)
    submitError.value = err.data?.statusMessage || err.message || 'Terjadi kendala saat mengirim surat suara. Silakan coba kembali.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-900">
    <VoterHeader />


    <!-- =================================================
    HEADER INFORMASI PEMILIH
================================================== -->
    <section
      class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-white shadow-sm border border-purple-100/50">
      <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#582be8] font-mono font-semibold">
          <span class="w-1.5 h-1.5 rounded-full bg-[#582be8] animate-ping"></span>
          SIAKAD AUTHENTICATED
        </div>

        <span class="text-slate-300">•</span>

        <div class="flex items-center gap-2 text-slate-800">
          <span class="text-[#582be8]">🪪</span>
          <span class="font-semibold">
            {{ voter?.name || 'Mahasiswa Pemilih' }}
          </span>
          <span class="font-mono text-slate-400">
            ({{ voter?.nim || 'NIM' }})
          </span>
        </div>

        <span class="text-slate-300">•</span>

        <span>
          {{ voter?.faculty || 'Fakultas' }}
        </span>
      </div>

      <div
        class="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-100 text-[#582be8] font-mono text-[10px] font-medium self-start lg:self-center">
        <!-- Emoji disesuaikan untuk konteks Bilik Suara -->
        🗳️
        BILIK SUARA: RAHASIA & AMAN
      </div>
    </section>

    <!-- =================================================
    PROGRESS STEPPER (TAHAP 3)
================================================== -->
    <section class="mx-auto max-w-7xl px-6 py-8">

      <div class="p-6 rounded-xl bg-white shadow-sm border border-purple-100/50">

        <div class="flex items-center justify-between mb-3">
          <span class="text-[10px] font-mono text-[#582be8] font-semibold uppercase tracking-wider">
            Progres Alur Pemilihan
          </span>

          <span class="text-xs font-mono font-semibold text-slate-800">
            Tahap 3 dari 4 (75%)
          </span>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">

          <!-- Step 1 (Selesai) -->
          <div class="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
            <div class="w-8 h-8 rounded-full bg-[#582be8] text-white flex items-center justify-center shrink-0">
              ✓
            </div>

            <div class="min-w-0">
              <span class="block text-[10px] font-mono text-slate-400">
                Tahap 01
              </span>

              <span class="block text-sm font-semibold truncate">
                Autentikasi SIAKAD
              </span>
            </div>
          </div>


          <!-- Step 2 (Selesai) -->
          <div class="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
            <div class="w-8 h-8 rounded-full bg-[#582be8] text-white flex items-center justify-center shrink-0">
              ✓
            </div>

            <div class="min-w-0">
              <span class="block text-[10px] font-mono text-slate-400">
                Tahap 02
              </span>

              <span class="block text-sm font-semibold truncate">
                Ketentuan &amp; Regulasi
              </span>
            </div>
          </div>


          <!-- Step 3 (Aktif Saat Ini) -->
          <div class="flex items-center gap-3 p-3 rounded-lg bg-purple-100 text-purple-900">
            <div
              class="w-8 h-8 rounded-full bg-[#582be8] text-white flex items-center justify-center font-mono font-bold shrink-0 shadow-sm">
              3
            </div>

            <div class="min-w-0">
              <span class="block text-[10px] font-mono text-purple-700 font-medium">
                Tahap Saat Ini
              </span>

              <span class="block text-sm font-bold truncate">
                Bilik Suara Digital
              </span>
            </div>
          </div>


          <!-- Step 4 (Menunggu) -->
          <div class="flex items-center gap-3 p-3 rounded-lg bg-slate-50 opacity-60">
            <div
              class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-mono shrink-0">
              4
            </div>

            <div class="min-w-0">
              <span class="block text-[10px] font-mono text-slate-400">
                Tahap 04
              </span>

              <span class="block text-sm font-semibold text-slate-500 truncate">
                Bukti Kriptografis
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>

    <!-- SESSION -->
    <main class="mx-auto max-w-7xl px-6 py-8">

      <div class="mb-8 rounded-xl border border-purple-200 bg-purple-50 p-6">

        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-center">

          <div>
            <div class="mb-2 flex items-center gap-2">
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                SESI AKTIF
              </span>

              <span class="text-sm text-slate-500">
                #PEMIRA-2025-A8
              </span>
            </div>

            <h2 class="text-2xl font-bold">
              Surat Suara Elektronik
            </h2>

            <p class="mt-1 text-slate-600">
              Pemilihan Raya Ketua & Wakil Ketua BEM 2025
            </p>
          </div>

          <div class="text-left md:text-right">
            <p class="text-xs uppercase tracking-wide text-slate-500">
              Waktu Tersisa
            </p>

            <p class="text-2xl font-bold text-purple-700">
              04 Jam 24 Menit 50 Detik
            </p>

            <p class="text-xs text-slate-500">
              1 Suara Aktif (Belum Digunakan)
            </p>
          </div>

        </div>

      </div>


      <!-- INSTRUCTION -->
      <div class="mb-8 flex gap-4 rounded-xl border border-blue-200 bg-blue-50 p-5">

        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 -960 960 960" fill="currentColor">
            <path
              d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </div>

        <div>
          <h3 class="font-semibold text-blue-900">
            Pilih satu pasangan calon
          </h3>

          <p class="mt-1 text-sm text-blue-800">
            Pastikan pilihan Anda sudah benar sebelum menekan
            tombol "Kirim & Kunci Suara Saya".
          </p>
        </div>

      </div>


      <!-- CANDIDATES -->
      <section>

        <div class="mb-6">
          <h2 class="text-xl font-bold">
            Pasangan Calon Ketua &amp; Wakil Ketua BEM
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Pilih salah satu pasangan calon berikut.
          </p>
        </div>


        <!-- State 1: Memuat Kandidat -->
        <div v-if="loadingCandidates" class="rounded-2xl border border-purple-100 bg-white p-12 text-center shadow-sm">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-[#582be8] mb-4">
            <svg class="animate-spin h-7 w-7 text-[#582be8]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          </div>
          <h3 class="text-base font-bold text-slate-800">Memuat Surat Suara Digital...</h3>
          <p class="text-xs text-slate-500 mt-1">Mengambil daftar pasangan calon terverifikasi KPU dari server.</p>
        </div>

        <!-- State 2: Gagal Memuat Kandidat -->
        <div v-else-if="candidateLoadError" class="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-3 text-xl font-bold">
            ✕
          </div>
          <h3 class="text-base font-bold text-red-900">Gagal Memuat Daftar Pasangan Calon</h3>
          <p class="text-xs text-red-700 mt-1 max-w-md mx-auto">{{ candidateLoadError }}</p>
          <button
            type="button"
            @click="fetchCandidates"
            class="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#582be8] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#471ec7] transition cursor-pointer"
          >
            <span>Coba Lagi / Muat Ulang</span>
            <span>↻</span>
          </button>
        </div>

        <!-- State 3: Daftar Kandidat Kosong -->
        <div v-else-if="activeCandidates.length === 0" class="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-3 text-xl">
            ⚠️
          </div>
          <h3 class="text-base font-bold text-amber-900">Belum Ada Kandidat Terverifikasi</h3>
          <p class="text-xs text-amber-700 mt-1 max-w-md mx-auto">
            Saat ini belum ada pasangan calon yang memenuhi syarat untuk dimasukkan ke dalam surat suara pemilihan ini. Pemungutan suara belum dapat dilanjutkan.
          </p>
        </div>

        <!-- State 4: Tampilkan Grid Pasangan Calon dari Server -->
        <div v-else class="grid grid-cols-1 gap-6 xl:grid-cols-3">

          <article
            v-for="candidate in activeCandidates"
            :key="candidate.id"
            :class="[
              'relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 transition-all duration-200',
              selectedCandidateId === candidate.id
                ? 'border-2 border-[#582be8] bg-white shadow-xl ring-4 ring-purple-100'
                : 'border border-slate-200/80 bg-white shadow-sm hover:shadow-lg hover:border-purple-200'
            ]"
          >
            <div class="space-y-4">

              <!-- Header Card -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    :class="[
                      'flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-md transition-colors',
                      selectedCandidateId === candidate.id
                        ? 'bg-[#582be8] shadow-purple-600/30'
                        : (candidate.number === '03' ? 'bg-slate-700' : 'bg-[#582be8] shadow-purple-600/20')
                    ]"
                  >
                    {{ candidate.number }}
                  </div>
                  <div>
                    <p class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Nomor Urut Resmi
                    </p>
                    <span
                      class="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                      <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                      Terverifikasi KPU
                    </span>
                  </div>
                </div>

                <!-- Badge jika dipilih -->
                <span
                  v-if="selectedCandidateId === candidate.id"
                  class="inline-flex items-center gap-1.5 rounded-full bg-[#582be8] px-3 py-1 text-[10px] font-bold text-white shadow-sm shadow-purple-600/30 animate-in fade-in zoom-in duration-150">
                  <span class="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                  PILIHAN ANDA SAAT INI
                </span>
              </div>

              <!-- Foto Paslon -->
              <div
                :class="[
                  'relative h-48 overflow-hidden rounded-xl',
                  candidate.number === '03' ? 'bg-slate-100' : 'bg-purple-100'
                ]"
              >
                <img
                  :src="candidate.photo"
                  :alt="candidate.fullName"
                  class="h-full w-full object-cover"
                />
                <div
                  class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/85 via-slate-950/35 to-transparent p-4 text-white">
                  <span
                    :class="[
                      'w-fit rounded px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                      candidate.number === '03' ? 'bg-slate-700/80' : 'bg-[#582be8]/90'
                    ]"
                  >
                    {{ candidate.facultyBadge }}
                  </span>
                  <h3 class="mt-1.5 text-lg font-bold">
                    {{ candidate.title }}
                  </h3>
                </div>
              </div>

              <!-- Detail Calon Ketua & Wakil Ketua -->
              <div class="space-y-2">
                <div class="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <p class="text-[10px] font-bold uppercase text-[#582be8]">
                    Calon Ketua BEM
                  </p>
                  <p class="mt-1 text-sm font-bold text-slate-800">
                    {{ candidate.ketua.name }}
                  </p>
                  <p class="mt-0.5 text-xs text-slate-500">
                    NIM {{ candidate.ketua.nim }} • {{ candidate.ketua.prodi }}
                  </p>
                </div>
                <div class="rounded-xl bg-slate-50 p-3 border border-slate-100">
                  <p class="text-[10px] font-bold uppercase text-purple-700">
                    Calon Wakil Ketua BEM
                  </p>
                  <p class="mt-1 text-sm font-bold text-slate-800">
                    {{ candidate.wakil.name }}
                  </p>
                  <p class="mt-0.5 text-xs text-slate-500">
                    NIM {{ candidate.wakil.nim }} • {{ candidate.wakil.prodi }}
                  </p>
                </div>
              </div>

              <!-- Tagline -->
              <div
                :class="[
                  'rounded-xl p-3 text-center text-xs font-semibold italic border',
                  candidate.number === '03'
                    ? 'bg-slate-100 text-slate-800 border-slate-200/60'
                    : 'bg-purple-50/70 text-[#582be8] border-purple-100/50'
                ]"
              >
                {{ candidate.tagline }}
              </div>

              <!-- Program Kerja -->
              <div>
                <p class="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Pilar Program Kerja
                </p>
                <ul class="space-y-2 text-xs leading-5 text-slate-600">
                  <li
                    v-for="(pilar, idx) in candidate.programKerja"
                    :key="idx"
                    class="flex items-start gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-[#582be8] shrink-0 mt-0.5"
                      viewBox="0 -960 960 960" fill="currentColor">
                      <path
                        d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                    <span><strong>{{ pilar.title }}:</strong> {{ pilar.desc }}</span>
                  </li>
                </ul>
              </div>

            </div>

            <!-- Tombol Aksi Paslon -->
            <div
              :class="[
                'mt-6 flex gap-2.5 pt-4 border-t',
                selectedCandidateId === candidate.id ? 'border-purple-100' : 'border-slate-100'
              ]"
            >
              <button
                type="button"
                @click="openVisiMisiModal(candidate)"
                :class="[
                  'flex-1 rounded-xl px-4 py-3 text-xs font-semibold transition flex items-center justify-center gap-1.5',
                  selectedCandidateId === candidate.id
                    ? 'border border-purple-200 bg-purple-50/50 text-[#582be8] hover:bg-purple-100/60'
                    : 'border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-500" viewBox="0 -960 960 960"
                  fill="currentColor">
                  <path
                    d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-47-101-141.5-160.5T480-720q-113 0-207.5 59.5T128-500q47 101 141.5 160.5T480-280Z" />
                </svg>
                Visi &amp; Misi
              </button>

              <!-- Tombol Pilih / Terpilih -->
              <button
                v-if="selectedCandidateId === candidate.id"
                type="button"
                @click="deselectCandidate"
                class="flex-1 rounded-xl bg-[#582be8] px-4 py-3 text-xs font-bold text-white shadow-md shadow-purple-600/30 ring-2 ring-purple-300/60 flex items-center justify-center gap-1.5 transition active:scale-95"
                title="Klik untuk membatalkan pilihan ini"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 -960 960 960"
                  fill="currentColor">
                  <path
                    d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
                Terpilih (Siap Dikirim)
              </button>

              <button
                v-else
                type="button"
                @click="selectCandidate(candidate.id)"
                class="flex-1 rounded-xl bg-purple-600 hover:bg-purple-700 px-4 py-3 text-xs font-semibold text-white shadow-sm shadow-purple-600/20 transition flex items-center justify-center gap-1.5 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white" viewBox="0 -960 960 960"
                  fill="currentColor">
                  <path
                    d="M200-120v-680h360l16 80h224v400H520l-16-80H280v280h-80Zm300-440h220v-240H560l-16-80H280v240h204l16 80Z" />
                </svg>
                Pilih Paslon {{ candidate.number }}
              </button>
            </div>

          </article>

        </div>

      </section>


      <!-- CRYPTOGRAPHIC GUARANTEE -->
      <section class="mt-12 rounded-2xl border border-slate-200 bg-white p-8">

        <div class="mb-6">
          <h2 class="text-xl font-bold">
            Jaminan Keamanan &amp; Kriptografis
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Suara Anda dilindungi dengan mekanisme kriptografis.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">

          <div class="rounded-xl bg-slate-50 p-5 border border-slate-100">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-[#582be8] mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 -960 960 960" fill="currentColor">
                <path
                  d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
              </svg>
            </div>

            <h3 class="font-semibold text-slate-900">
              Zero-Knowledge Proof
            </h3>

            <p class="mt-2 text-sm text-slate-500">
              Pilihan suara dapat diverifikasi tanpa mengungkap
              identitas pemilih.
            </p>
          </div>

          <div class="rounded-xl bg-slate-50 p-5 border border-slate-100">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-[#582be8] mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 -960 960 960" fill="currentColor">
                <path
                  d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-640l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v640q0 33-23.5 56.5T760-120H200Zm0-80h560v-600H200v600Zm0 0v-600 600Z" />
              </svg>
            </div>

            <h3 class="font-semibold text-slate-900">
              Ballot Receipt
            </h3>

            <p class="mt-2 text-sm text-slate-500">
              Setiap suara memiliki bukti kriptografis unik.
            </p>
          </div>

          <div class="rounded-xl bg-slate-50 p-5 border border-slate-100">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-[#582be8] mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 -960 960 960" fill="currentColor">
                <path
                  d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-114 102-44 104 44 56-96 110-26-10-112 74-86-74-86 10-112-110-26-58-96-102 44-102-44-56 96-110 26 10 112-74 86 74 86-10 112 110 26 56 96Zm102-306 154-156-56-56-98 98-42-42-56 58 98 98Z" />
              </svg>
            </div>

            <h3 class="font-semibold text-slate-900">
              Consensus BEM
            </h3>

            <p class="mt-2 text-sm text-slate-500">
              Hasil suara dapat diaudit melalui sistem
              yang transparan.
            </p>
          </div>

        </div>

      </section>

    </main>


    <!-- BOTTOM ACTION -->
    <div class="sticky bottom-0 z-40 border-t border-slate-200 bg-white/95 shadow-lg backdrop-blur">

      <div class="mx-auto flex max-w-7xl flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 px-6 py-4">

        <div>
          <p class="text-xs text-slate-500 font-medium">
            Pilihan Anda
          </p>

          <p v-if="selectedCandidate" class="font-bold text-slate-900 flex items-center gap-2 mt-0.5">
            <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#582be8] text-white text-[10px] font-mono font-bold">
              {{ selectedCandidate.number }}
            </span>
            <span>Paslon {{ selectedCandidate.number }} — {{ selectedCandidate.fullName }}</span>
          </p>
          <p v-else class="text-xs sm:text-sm font-medium text-amber-700 mt-0.5 flex items-center gap-2">
            <span class="inline-block w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            Belum ada paslon yang dipilih (Silakan tentukan pilihan Anda)
          </p>
        </div>

        <div class="flex items-center gap-3">

          <button
            type="button"
            :disabled="!selectedCandidate"
            @click="deselectCandidate"
            :class="[
              'rounded-xl border px-5 py-3 text-xs sm:text-sm font-semibold transition',
              selectedCandidate
                ? 'border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer active:scale-95'
                : 'border-slate-200 text-slate-400 opacity-50 cursor-not-allowed pointer-events-none'
            ]"
          >
            Batalkan Pilihan
          </button>

          <button
            type="button"
            :disabled="!selectedCandidate || loadingCandidates || activeCandidates.length === 0"
            @click="openConfirmModal"
            :class="[
              'rounded-xl px-6 py-3 text-xs sm:text-sm font-semibold text-white transition flex items-center justify-center gap-2',
              (selectedCandidate && !loadingCandidates && activeCandidates.length > 0)
                ? 'bg-[#582be8] hover:bg-[#471ec7] shadow-md shadow-purple-600/30 cursor-pointer active:scale-95'
                : 'bg-[#582be8] opacity-50 cursor-not-allowed pointer-events-none'
            ]"
          >
            <span>Kirim &amp; Kunci Suara Saya</span>
            <span class="text-xs">🔒</span>
          </button>

        </div>

      </div>

    </div>

    <!-- =================================================
    MODAL VISI & MISI
================================================== -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isVisiMisiModalOpen && activeVisiMisiCandidate"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm overflow-y-auto"
          @click.self="closeVisiMisiModal"
        >
          <div
            class="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-purple-100 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          >
            <!-- Header Modal -->
            <div class="flex items-center justify-between border-b border-slate-100 p-5 bg-gradient-to-r from-purple-50/50 to-white">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#582be8] text-lg font-extrabold text-white shadow-sm">
                  {{ activeVisiMisiCandidate.number }}
                </div>
                <div>
                  <h3 class="text-base font-bold text-slate-900 leading-tight">
                    Visi &amp; Misi Paslon {{ activeVisiMisiCandidate.number }}
                  </h3>
                  <p class="text-xs text-slate-500">
                    {{ activeVisiMisiCandidate.facultyBadge }} • Pemilihan Raya BEM 2025
                  </p>
                </div>
              </div>

              <button
                type="button"
                class="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                @click="closeVisiMisiModal"
                aria-label="Tutup"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
              </button>
            </div>

            <!-- Body Modal (Scrollable) -->
            <div class="overflow-y-auto p-6 space-y-6">
              <!-- Banner Paslon -->
              <div class="relative h-44 overflow-hidden rounded-xl bg-purple-100">
                <img
                  :src="activeVisiMisiCandidate.photo"
                  :alt="activeVisiMisiCandidate.fullName"
                  class="h-full w-full object-cover"
                />
                <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-4 text-white">
                  <span class="w-fit rounded bg-[#582be8]/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                    {{ activeVisiMisiCandidate.facultyBadge }}
                  </span>
                  <h4 class="mt-1 text-xl font-bold">
                    {{ activeVisiMisiCandidate.fullName }}
                  </h4>
                </div>
              </div>

              <!-- Profil Calon Ketua & Wakil Ketua -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-[#582be8]">Calon Ketua BEM</span>
                  <p class="mt-1 text-sm font-bold text-slate-800">{{ activeVisiMisiCandidate.ketua.name }}</p>
                  <p class="text-xs text-slate-500 mt-0.5">NIM {{ activeVisiMisiCandidate.ketua.nim }} • {{ activeVisiMisiCandidate.ketua.prodi }}</p>
                </div>
                <div class="rounded-xl bg-slate-50 p-3.5 border border-slate-100">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-purple-700">Calon Wakil Ketua BEM</span>
                  <p class="mt-1 text-sm font-bold text-slate-800">{{ activeVisiMisiCandidate.wakil.name }}</p>
                  <p class="text-xs text-slate-500 mt-0.5">NIM {{ activeVisiMisiCandidate.wakil.nim }} • {{ activeVisiMisiCandidate.wakil.prodi }}</p>
                </div>
              </div>

              <!-- Slogan Resmi -->
              <div class="rounded-xl bg-purple-50/70 p-3 text-center text-sm font-semibold italic text-[#582be8] border border-purple-100/50">
                {{ activeVisiMisiCandidate.tagline }}
              </div>

              <!-- Visi -->
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100 text-[#582be8] text-xs font-bold">V</span>
                  <h4 class="text-sm font-bold uppercase tracking-wider text-slate-800">Visi</h4>
                </div>
                <p class="text-sm leading-relaxed text-slate-600 bg-slate-50/80 p-4 rounded-xl border border-slate-100">
                  {{ activeVisiMisiCandidate.visi }}
                </p>
              </div>

              <!-- Misi -->
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100 text-[#582be8] text-xs font-bold">M</span>
                  <h4 class="text-sm font-bold uppercase tracking-wider text-slate-800">Misi Utama</h4>
                </div>
                <ul class="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <li
                    v-for="(misiItem, idx) in activeVisiMisiCandidate.misi"
                    :key="idx"
                    class="flex items-start gap-3 p-2.5 rounded-lg bg-slate-50/60 border border-slate-100/80"
                  >
                    <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#582be8] text-[10px] font-bold text-white mt-0.5">
                      {{ idx + 1 }}
                    </span>
                    <span>{{ misiItem }}</span>
                  </li>
                </ul>
              </div>

              <!-- Program Kerja Unggulan -->
              <div>
                <div class="flex items-center gap-2 mb-2">
                  <span class="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-100 text-[#582be8] text-xs font-bold">P</span>
                  <h4 class="text-sm font-bold uppercase tracking-wider text-slate-800">Pilar Program Kerja</h4>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div
                    v-for="(pilar, idx) in activeVisiMisiCandidate.programKerja"
                    :key="idx"
                    class="rounded-xl bg-purple-50/50 p-3 border border-purple-100/60"
                  >
                    <p class="text-xs font-bold text-slate-800">{{ pilar.title }}</p>
                    <p class="text-[11px] text-slate-500 mt-1 leading-snug">{{ pilar.desc }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Modal -->
            <div class="flex items-center justify-between border-t border-slate-100 p-4 bg-slate-50">
              <button
                type="button"
                class="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
                @click="closeVisiMisiModal"
              >
                Tutup
              </button>

              <button
                type="button"
                class="rounded-xl bg-[#582be8] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#471ec7] transition flex items-center gap-1.5"
                @click="selectCandidate(activeVisiMisiCandidate.id); closeVisiMisiModal()"
              >
                <span v-if="selectedCandidateId === activeVisiMisiCandidate.id">✓ Terpilih Saat Ini</span>
                <span v-else>Pilih Paslon {{ activeVisiMisiCandidate.number }} Ini</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- =================================================
    MODAL KONFIRMASI PEMILIHAN SUARA
================================================== -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isConfirmModalOpen && selectedCandidate"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm"
          @click.self="closeConfirmModal"
        >
          <div
            class="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-purple-100 animate-in fade-in zoom-in-95 duration-200"
          >
            <!-- Header Icon -->
            <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-[#582be8] shadow-inner mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 -960 960 960" fill="currentColor">
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
              </svg>
            </div>

            <div class="text-center mb-6">
              <h3 class="text-xl font-bold text-slate-900">
                Konfirmasi Kunci Suara
              </h3>
              <p class="text-xs text-slate-500 mt-1">
                Pastikan pilihan Anda sudah benar sebelum dikunci secara kriptografis.
              </p>
            </div>

            <!-- Card Paslon Terpilih Ringkasan -->
            <div class="rounded-xl border-2 border-[#582be8] bg-purple-50/40 p-4 mb-5">
              <div class="flex items-center gap-3.5">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#582be8] text-xl font-extrabold text-white">
                  {{ selectedCandidate.number }}
                </div>
                <div class="min-w-0 flex-1">
                  <span class="inline-block rounded bg-[#582be8]/10 px-2 py-0.5 text-[10px] font-semibold text-[#582be8]">
                    {{ selectedCandidate.facultyBadge }}
                  </span>
                  <h4 class="text-base font-bold text-slate-900 truncate mt-0.5">
                    {{ selectedCandidate.fullName }}
                  </h4>
                  <p class="text-xs text-slate-500 italic mt-0.5 truncate">
                    {{ selectedCandidate.tagline }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Warning Box -->
            <div class="rounded-xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-800 leading-relaxed mb-6">
              <div class="flex items-start gap-2">
                <span class="text-amber-600 font-bold">⚠️</span>
                <span>
                  <strong>Perhatian:</strong> Setelah suara dikirim dan dikunci, hak suara Anda dinyatakan selesai dan pilihan tidak dapat diubah kembali dengan alasan apa pun.
                </span>
              </div>
            </div>

            <!-- Error Box -->
            <div v-if="submitError" class="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-800 leading-relaxed mb-6">
              <div class="flex items-start gap-2">
                <span class="text-red-600 font-bold">✕</span>
                <div>
                  <strong>Gagal Mengirim Suara:</strong> {{ submitError }}
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col-reverse sm:flex-row gap-3">
              <button
                type="button"
                :disabled="isSubmitting"
                class="flex-1 rounded-xl border border-slate-300 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
                @click="closeConfirmModal"
              >
                Batal / Ubah Pilihan
              </button>

              <button
                type="button"
                :disabled="isSubmitting"
                class="flex-1 rounded-xl bg-[#582be8] py-3 text-xs font-bold text-white shadow-md shadow-purple-600/30 hover:bg-[#471ec7] transition flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                @click="handleConfirmVote"
              >
                <template v-if="isSubmitting">
                  <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span>Mengunci Suara...</span>
                </template>
                <template v-else>
                  <span>Ya, Kirim &amp; Kunci Suara</span>
                  <span>✓</span>
                </template>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
</style>
