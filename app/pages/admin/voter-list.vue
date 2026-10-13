<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  alias: '/admin/voters'
})
</script>

<template>
  <div class="flex flex-col gap-8 w-full">
    <!-- Page Header -->
    <section class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div class="space-y-1">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="rounded-full bg-purple-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-[#582be8]">
            REGULASI KEMAHASISWAAN 2025
          </span>

          <span class="flex items-center gap-1.5 text-xs text-slate-500">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            Sinkronisasi Terakhir: 10 Menit Lalu
          </span>
        </div>

        <h1 class="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          Daftar Pemilih Tetap (DPT)
        </h1>

        <p class="max-w-3xl text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
          Kelola basis data pemilih mahasiswa, verifikasi status hak suara per pemilihan aktif, distribusi token autentikasi NIM, dan konsolidasi data akademik aktif kampus.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
        >
          <span class="material-symbols-outlined text-[18px]">sync</span>
          Sinkronisasi Siakad
        </button>

        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          Export CSV/XLSX
        </button>

        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition"
        >
          <span class="material-symbols-outlined text-[18px]">person_add</span>
          Tambah / Import DPT
        </button>
      </div>
    </section>

    <!-- Statistics -->
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-purple-200 hover:shadow transition">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total DPT Terdaftar</p>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-[#582be8]">4,850</span>
              <span class="text-xs text-slate-500">Mahasiswa</span>
            </div>
          </div>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#582be8]">
            <span class="material-symbols-outlined text-[24px]">how_to_reg</span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span class="flex items-center gap-1 font-semibold text-[#582be8]">
            <span class="material-symbols-outlined text-sm">check_circle</span>
            100% Kuota Valid
          </span>
          <span class="font-mono text-[10px] text-slate-500">8 Fakultas</span>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200 hover:shadow transition">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Suara Telah Masuk</p>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-emerald-600">3,420</span>
              <span class="text-xs text-emerald-700">Pemilih</span>
            </div>
          </div>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <span class="material-symbols-outlined text-[24px]">ballot</span>
          </div>
        </div>
        <div class="mt-4 border-t border-slate-100 pt-3">
          <div class="mb-2 flex justify-between font-mono text-[10px]">
            <span class="font-semibold text-emerald-700">70.5% Partisipasi</span>
            <span class="text-slate-500">Target 85%</span>
          </div>
          <div class="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div class="h-full rounded-full bg-emerald-500" style="width: 70.5%"></div>
          </div>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-amber-200 hover:shadow transition">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Belum Menggunakan Hak</p>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-amber-600">1,430</span>
              <span class="text-xs text-amber-700">Sisa DPT</span>
            </div>
          </div>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <span class="material-symbols-outlined text-[24px]">pending_actions</span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span class="font-mono text-[10px] font-semibold text-amber-700">29.5% Belum Memilih</span>
          <button type="button" class="font-mono text-[10px] font-semibold text-[#582be8] hover:underline">Kirim Blast</button>
        </div>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:shadow transition">
        <div class="flex items-start justify-between">
          <div>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Token Siap / Teraktivasi</p>
            <div class="mt-2 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-blue-600">4,795</span>
              <span class="text-xs text-slate-500">Akun</span>
            </div>
          </div>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <span class="material-symbols-outlined text-[24px]">key</span>
          </div>
        </div>
        <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
          <span class="font-mono text-[10px] font-semibold text-emerald-700">98.8% Siap Autentikasi</span>
          <span class="font-mono text-[10px] text-rose-600">55 Belum Verifikasi</span>
        </div>
      </div>
    </section>

    <!-- Filters -->
    <section class="space-y-4">
      <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-wrap items-center gap-2">
          <button type="button" class="rounded-xl bg-[#582be8] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-purple-600/25">
            Semua (4,850)
          </button>
          <button type="button" class="rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            Sudah Memilih (3,420)
          </button>
          <button type="button" class="rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            Belum Memilih (1,430)
          </button>
          <button type="button" class="rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            Perlu Verifikasi (55)
          </button>
        </div>

        <div class="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs text-slate-600 shadow-sm self-start xl:self-auto">
          <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
          Polling Bilik Suara Digital Terhubung
        </div>
      </div>

      <div class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:flex-row xl:items-center">
        <div class="relative min-w-0 flex-1">
          <span class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <span class="material-symbols-outlined text-[20px]">search</span>
          </span>
          <input
            type="text"
            placeholder="Cari berdasarkan NIM, nama mahasiswa, atau email kampus..."
            class="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#582be8] focus:bg-white"
          />
        </div>

        <div class="flex flex-wrap gap-2.5">
          <select class="min-w-[160px] rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:border-[#582be8] cursor-pointer shadow-sm">
            <option value="">Semua Fakultas</option>
            <option value="FT">Teknik (FT)</option>
            <option value="FASILKOM">Ilmu Komputer (Fasilkom)</option>
            <option value="FEB">Ekonomi &amp; Bisnis (FEB)</option>
            <option value="FH">Hukum (FH)</option>
            <option value="FPSI">Psikologi (FPsi)</option>
            <option value="FK">Kedokteran (FK)</option>
          </select>

          <select class="min-w-[140px] rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:border-[#582be8] cursor-pointer shadow-sm">
            <option value="">Semua Angkatan</option>
            <option value="2024">Angkatan 2024</option>
            <option value="2023">Angkatan 2023</option>
            <option value="2022">Angkatan 2022</option>
            <option value="2021">Angkatan 2021</option>
          </select>

          <select class="min-w-[190px] rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-700 outline-none focus:border-[#582be8] cursor-pointer shadow-sm">
            <option value="">Semua Agenda Pemilihan</option>
            <option value="BEM_KM">Pemilihan Raya BEM 2025</option>
            <option value="DPM_FT">Dewan Perwakilan Mahasiswa FT</option>
            <option value="HMIF">Himpunan Mahasiswa Informatika</option>
          </select>

          <button
            type="button"
            title="Reset Parameter Filter"
            class="flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-800 shadow-sm"
          >
            <span class="material-symbols-outlined text-[20px]">filter_alt_off</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Voter Table -->
    <section class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="bg-slate-50 font-semibold text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <th class="w-12 px-4 py-3.5 text-center">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer" />
              </th>
              <th class="whitespace-nowrap px-4 py-3.5">Identitas Mahasiswa</th>
              <th class="whitespace-nowrap px-4 py-3.5">Fakultas &amp; Program Studi</th>
              <th class="whitespace-nowrap px-4 py-3.5">Angkatan / Sem</th>
              <th class="whitespace-nowrap px-4 py-3.5">Status Hak Suara</th>
              <th class="whitespace-nowrap px-4 py-3.5">Partisipasi Bilik</th>
              <th class="whitespace-nowrap px-4 py-3.5">Autentikasi Token</th>
              <th class="px-4 py-3.5 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
            <tr class="transition-colors hover:bg-slate-50/70">
              <td class="px-4 py-4 text-center">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer" />
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50 text-sm font-bold text-[#582be8]">RP</div>
                  <div>
                    <p class="font-semibold text-slate-900">Muhammad Rizky Pratama</p>
                    <p class="mt-0.5 font-mono text-[10px] text-[#582be8] font-semibold">NIM 2208101012</p>
                    <p class="text-xs text-slate-500">m.rizky@student.ac.id</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="font-medium text-slate-900">Ilmu Komputer (Fasilkom)</p>
                <p class="text-xs text-slate-500">S1 Informatika</p>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-600">2022 / Sem 6</span>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-800">
                  <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  Sudah Memilih
                </span>
                <p class="mt-1 font-mono text-[10px] text-slate-500">Pukul 09:42 WIB</p>
              </td>
              <td class="px-4 py-4">
                <div class="flex max-w-[190px] flex-wrap gap-1">
                  <span class="rounded bg-purple-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#582be8]">BEM KM ✓</span>
                  <span class="rounded bg-purple-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#582be8]">DPM FT ✓</span>
                  <span class="rounded bg-purple-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#582be8]">HMIF ✓</span>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-800">
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Aktif &amp; Terverifikasi
                </p>
                <p class="mt-1 font-mono text-[10px] text-slate-500">OTP SHA-256 Valid</p>
              </td>
              <td class="px-4 py-4 text-center">
                <div class="inline-flex items-center gap-1">
                  <button type="button" title="Detail Pemilih" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-purple-50 hover:text-[#582be8]">
                    <span class="material-symbols-outlined text-lg">badge</span>
                  </button>
                  <button type="button" title="Reset Autentikasi" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                    <span class="material-symbols-outlined text-lg">lock_reset</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr class="transition-colors hover:bg-slate-50/70">
              <td class="px-4 py-4 text-center">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer" />
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">SN</div>
                  <div>
                    <p class="font-semibold text-slate-900">Siti Nurhaliza</p>
                    <p class="mt-0.5 font-mono text-[10px] text-[#582be8] font-semibold">NIM 2305202045</p>
                    <p class="text-xs text-slate-500">sitinur@student.ac.id</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="font-medium text-slate-900">Ekonomi &amp; Bisnis (FEB)</p>
                <p class="text-xs text-slate-500">S1 Akuntansi</p>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-600">2023 / Sem 4</span>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-800">
                  <span class="material-symbols-outlined text-sm text-amber-600">schedule</span>
                  Belum Memilih
                </span>
                <p class="mt-1 font-mono text-[10px] text-slate-500">Undangan Terkirim</p>
              </td>
              <td class="whitespace-nowrap px-4 py-4 text-xs italic text-slate-400">Belum Akses Bilik</td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-800">
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Aktif &amp; Terverifikasi
                </p>
                <p class="mt-1 font-mono text-[10px] text-slate-500">Kesiapan Token: Siap</p>
              </td>
              <td class="px-4 py-4 text-center">
                <div class="inline-flex items-center gap-1">
                  <button type="button" title="Kirim Blast Pengingat" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-purple-50 hover:text-[#582be8]">
                    <span class="material-symbols-outlined text-lg">forward_to_inbox</span>
                  </button>
                  <button type="button" title="Reset Autentikasi" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                    <span class="material-symbols-outlined text-lg">lock_reset</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr class="transition-colors hover:bg-slate-50/70">
              <td class="px-4 py-4 text-center">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer" />
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50 text-sm font-bold text-[#582be8]">DC</div>
                  <div>
                    <p class="font-semibold text-slate-900">Daniel Christian Hutapea</p>
                    <p class="mt-0.5 font-mono text-[10px] text-[#582be8] font-semibold">NIM 2101303088</p>
                    <p class="text-xs text-slate-500">daniel.c@student.ac.id</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="font-medium text-slate-900">Fakultas Teknik (FT)</p>
                <p class="text-xs text-slate-500">S1 Teknik Elektro</p>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-600">2021 / Sem 8</span>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-800">
                  <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  Sudah Memilih
                </span>
                <p class="mt-1 font-mono text-[10px] text-slate-500">Pukul 08:15 WIB</p>
              </td>
              <td class="px-4 py-4">
                <div class="flex flex-wrap gap-1">
                  <span class="rounded bg-purple-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#582be8]">BEM KM ✓</span>
                  <span class="rounded bg-purple-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#582be8]">DPM FT ✓</span>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-800">
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Aktif &amp; Terverifikasi
                </p>
                <p class="mt-1 font-mono text-[10px] text-slate-500">OTP SHA-256 Valid</p>
              </td>
              <td class="px-4 py-4 text-center">
                <div class="inline-flex items-center gap-1">
                  <button type="button" title="Detail Pemilih" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-purple-50 hover:text-[#582be8]">
                    <span class="material-symbols-outlined text-lg">badge</span>
                  </button>
                  <button type="button" title="Reset Autentikasi" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                    <span class="material-symbols-outlined text-lg">lock_reset</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr class="transition-colors hover:bg-slate-50/70">
              <td class="px-4 py-4 text-center">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer" />
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-50 text-sm font-bold text-rose-700">AR</div>
                  <div>
                    <p class="font-semibold text-slate-900">Anisa Rahmawati</p>
                    <p class="mt-0.5 font-mono text-[10px] text-[#582be8] font-semibold">NIM 2409404011</p>
                    <p class="text-xs text-slate-500">anisa.r@student.ac.id</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="font-medium text-slate-900">Psikologi (FPsi)</p>
                <p class="text-xs text-slate-500">S1 Psikologi</p>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-600">2024 / Sem 2</span>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-rose-800">
                  <span class="material-symbols-outlined text-sm text-rose-600">error</span>
                  Belum Teraktivasi
                </span>
                <p class="mt-1 font-mono text-[10px] text-rose-600">Data Tanggal Lahir Kosong</p>
              </td>
              <td class="whitespace-nowrap px-4 py-4 text-xs italic text-slate-400">Belum Ada Akses</td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-rose-700">
                  <span class="h-2 w-2 rounded-full bg-rose-500"></span>
                  Token Belum Digenerate
                </p>
                <p class="mt-1 font-mono text-[10px] text-slate-500">Perlu Validasi Siakad</p>
              </td>
              <td class="px-4 py-4 text-center">
                <button type="button" class="rounded-lg bg-purple-50 px-2.5 py-1 font-mono text-[10px] font-bold text-[#582be8] border border-purple-200 transition hover:bg-[#582be8] hover:text-white">
                  Generate
                </button>
              </td>
            </tr>

            <tr class="transition-colors hover:bg-slate-50/70">
              <td class="px-4 py-4 text-center">
                <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-[#582be8] focus:ring-[#582be8]/20 cursor-pointer" />
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50 text-sm font-bold text-[#582be8]">FA</div>
                  <div>
                    <p class="font-semibold text-slate-900">Farhan Al-Fikri</p>
                    <p class="mt-0.5 font-mono text-[10px] text-[#582be8] font-semibold">NIM 2208101099</p>
                    <p class="text-xs text-slate-500">farhan.af@student.ac.id</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="font-medium text-slate-900">Ilmu Komputer (Fasilkom)</p>
                <p class="text-xs text-slate-500">S1 Sistem Informasi</p>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-600">2022 / Sem 6</span>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-800">
                  <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                  Sudah Memilih
                </span>
                <p class="mt-1 font-mono text-[10px] text-slate-500">Pukul 11:02 WIB</p>
              </td>
              <td class="px-4 py-4">
                <div class="flex flex-wrap gap-1">
                  <span class="rounded bg-purple-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#582be8]">BEM KM ✓</span>
                  <span class="rounded bg-purple-50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#582be8]">HMIF ✓</span>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4">
                <p class="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-800">
                  <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                  Aktif &amp; Terverifikasi
                </p>
                <p class="mt-1 font-mono text-[10px] text-slate-500">OTP SHA-256 Valid</p>
              </td>
              <td class="px-4 py-4 text-center">
                <div class="inline-flex items-center gap-1">
                  <button type="button" title="Detail Pemilih" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-purple-50 hover:text-[#582be8]">
                    <span class="material-symbols-outlined text-lg">badge</span>
                  </button>
                  <button type="button" title="Reset Autentikasi" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                    <span class="material-symbols-outlined text-lg">lock_reset</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table Footer -->
      <div class="flex flex-col items-center justify-between gap-4 border-t border-slate-100 bg-white p-4.5 sm:flex-row">
        <div class="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Menampilkan <strong class="text-slate-900 font-semibold">1 - 5</strong> dari <strong class="text-slate-900 font-semibold">4,850</strong> pemilih terdaftar</span>
          <span class="text-slate-300">|</span>
          <span class="font-mono text-[10px] text-slate-400">DPT Sah KPU Mahasiswa</span>
        </div>

        <nav aria-label="Navigasi Halaman DPT" class="flex items-center gap-1.5">
          <button
            type="button"
            disabled
            class="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 opacity-40 cursor-not-allowed"
          >
            <span class="material-symbols-outlined text-base">chevron_left</span>
            Sebelumnya
          </button>
          <button type="button" class="flex h-8 w-8 items-center justify-center rounded-xl bg-[#582be8] font-mono text-xs font-bold text-white shadow-sm shadow-purple-600/25">1</button>
          <button type="button" class="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white font-mono text-xs font-semibold text-slate-700 transition hover:bg-slate-50">2</button>
          <button type="button" class="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white font-mono text-xs font-semibold text-slate-700 transition hover:bg-slate-50">3</button>
          <span class="px-1 text-xs text-slate-400">...</span>
          <button type="button" class="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white font-mono text-xs font-semibold text-slate-700 transition hover:bg-slate-50">485</button>
          <button
            type="button"
            class="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Selanjutnya
            <span class="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </nav>
      </div>
    </section>

    <!-- Information Cards -->
    <section class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-purple-200 transition lg:col-span-2">
        <div>
          <div class="mb-3 flex items-center gap-2.5 text-[#582be8]">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <span class="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <h2 class="text-base sm:text-lg font-bold text-slate-900">
              Asas Integritas Pemilu Kampus: 1 NIM = 1 Hak Suara
            </h2>
          </div>

          <p class="mb-5 text-xs sm:text-sm leading-relaxed text-slate-500">
            Sistem A-Vote menerapkan prinsip kedaulatan mahasiswa tertutup. Setiap mahasiswa yang tercantum dalam Daftar Pemilih Tetap (DPT) hanya dapat melakukan pemungutan suara satu kali per agenda pemilihan yang sah.
          </p>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
              <span class="material-symbols-outlined mt-0.5 shrink-0 text-xl text-[#582be8]">pin</span>
              <div>
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">Autentikasi Dual Kredensial</h3>
                <p class="mt-1 text-xs leading-5 text-slate-500">
                  Kombinasi NIM aktif terdaftar dan kode sandi tanggal lahir (DDMMYYYY) dengan hashing SHA-256 internal kampus.
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
              <span class="material-symbols-outlined mt-0.5 shrink-0 text-xl text-emerald-600">check_box</span>
              <div>
                <h3 class="text-xs sm:text-sm font-bold text-slate-900">Pencegahan Suara Ganda</h3>
                <p class="mt-1 text-xs leading-5 text-slate-500">
                  Status hak suara langsung terkunci seketika mahasiswa menekan tombol finalisasi di bilik suara digital.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 font-mono text-[10px] text-slate-500">
          <span>Standar Komisi Pemilihan Umum Mahasiswa (KPUM)</span>
          <span class="font-semibold text-[#582be8] bg-purple-50 px-2.5 py-0.5 rounded-md">SK Rektor No. 441/KM/2025</span>
        </div>
      </div>

      <div class="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-purple-200 transition">
        <div>
          <div class="mb-3 flex items-center gap-2.5 text-[#582be8]">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50">
              <span class="material-symbols-outlined text-[24px]">cloud_upload</span>
            </div>
            <h2 class="text-base sm:text-lg font-bold text-slate-900">
              Panduan Format DPT
            </h2>
          </div>

          <p class="mb-4 text-xs leading-5 text-slate-500">
            Unggah berkas spreadsheet dari Siakad Fakultas dengan format kolom yang telah terstandarisasi untuk mencegah kegagalan pembuatan token.
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
              <span class="text-right font-semibold text-slate-900">Kode Fakultas &amp; Prodi</span>
            </div>
            <div class="flex justify-between gap-2">
              <span class="text-slate-500">Kolom 5</span>
              <span class="text-right font-semibold text-slate-900">Tanggal Lahir</span>
            </div>
          </div>
        </div>

        <div class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
          <a href="#" class="inline-flex items-center gap-1.5 text-xs font-semibold text-[#582be8] hover:text-[#471ec7] hover:underline transition">
            <span class="material-symbols-outlined text-base">file_download</span>
            Unduh Template .XLSX
          </a>
          <span class="font-mono text-[10px] text-slate-400">Ukuran Maks: 15MB</span>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
</style>