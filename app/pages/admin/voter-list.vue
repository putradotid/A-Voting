<template>
  <div class="min-h-screen bg-[#f8f9ff] text-slate-800 antialiased">
    <!-- Top Navigation -->
    <header class="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
      <div class="flex items-center justify-between gap-4 px-6 py-3">
        <div class="flex items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white shadow-md">
            <span class="material-symbols-outlined">verified_user</span>
          </div>

          <div>
            <div class="flex items-center gap-2">
              <span class="font-heading text-xl font-bold text-violet-600">A-Vote</span>
              <span class="rounded-md border border-violet-200 bg-violet-50 px-2 py-0.5 text-xs font-semibold text-violet-600">
                Admin Panel
              </span>
            </div>
          </div>

          <div class="ml-4 hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700 lg:flex">
            <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
            Status Sistem: Aktif &amp; Normal
          </div>
        </div>

        <div class="hidden w-72 md:block lg:w-96">
          <input
            type="text"
            placeholder="Cari nama pemilih, NIM, atau pemilihan..."
            class="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        <div class="flex items-center gap-4">
          <button class="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute right-1 top-1 rounded-full bg-rose-500 px-1.5 text-[10px] font-bold text-white">3</span>
          </button>

          <div class="hidden items-center gap-3 sm:flex">
            <div class="flex h-8 w-8 items-center justify-center rounded-full border border-violet-200 bg-violet-100 text-xs font-bold text-violet-700">
              AD
            </div>
            <div class="leading-tight">
              <p class="text-xs font-semibold">admin@gmail.com</p>
              <span class="text-[10px] font-semibold text-violet-600">Super Administrator</span>
            </div>
          </div>

          <a href="#" class="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50">
            Logout
          </a>
        </div>
      </div>
    </header>

    <div class="flex min-h-[calc(100vh-60px)]">
      <!-- Sidebar -->
      <aside class="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white md:flex">
        <nav class="space-y-1.5 p-4">
          <p class="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <a href="#" class="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <span class="material-symbols-outlined text-slate-400">dashboard</span>
            Dashboard
          </a>

          <a href="#" class="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <span class="flex items-center gap-3">
              <span class="material-symbols-outlined text-slate-400">how_to_vote</span>
              Pemilihan
            </span>
            <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">3 Aktif</span>
          </a>

          <a href="#" class="flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50 px-3.5 py-2.5 text-sm font-semibold text-violet-700">
            <span class="flex items-center gap-3">
              <span class="material-symbols-outlined">groups</span>
              Daftar Pemilih
            </span>
            <span class="rounded-md bg-violet-100 px-2 py-0.5 text-[11px] font-bold">DPT</span>
          </a>

          <a href="#" class="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <span class="material-symbols-outlined text-slate-400">badge</span>
            Kandidat &amp; Paslon
          </a>

          <a href="#" class="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <span class="material-symbols-outlined text-slate-400">bar_chart</span>
            Rekapitulasi
          </a>

          <p class="mb-3 mt-6 px-3 pt-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Konfigurasi
          </p>

          <a href="#" class="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <span class="material-symbols-outlined text-slate-400">settings</span>
            Pengaturan Sistem
          </a>
        </nav>

        <div class="border-t border-slate-100 bg-slate-50/60 p-4">
          <div class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div class="flex items-center gap-2 text-xs font-semibold">
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              A-Vote v2.4.0
            </div>
            <p class="mt-1 text-[11px] text-slate-500">Server Siap &amp; Terhubung</p>
            <div class="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px]">
              <span class="text-slate-400">Produksi Kampus</span>
              <span class="font-mono font-semibold text-emerald-600">ONLINE</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="min-w-0 flex-1 p-5 lg:p-8">
        <div class="flex flex-col gap-8">
          <!-- Page Header -->
          <section class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-violet-100 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wide text-violet-700">
                  REGULASI KEMAHASISWAAN 2025
                </span>

                <span class="flex items-center gap-1.5 text-xs text-slate-500">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Sinkronisasi Terakhir: 10 Menit Lalu
                </span>
              </div>

              <h1 class="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Daftar Pemilih Tetap (DPT)
              </h1>

              <p class="max-w-3xl text-sm leading-6 text-slate-600">
                Kelola basis data pemilih mahasiswa, verifikasi status hak suara per pemilihan aktif, distribusi token autentikasi NIM, dan konsolidasi data akademik aktif kampus.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <button type="button" class="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-100">
                <span class="material-symbols-outlined text-lg">sync</span>
                Sinkronisasi Siakad
              </button>

              <button type="button" class="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-100">
                <span class="material-symbols-outlined text-lg">download</span>
                Export CSV/XLSX
              </button>

              <button type="button" class="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700">
                <span class="material-symbols-outlined text-xl">person_add</span>
                Tambah / Import DPT
              </button>
            </div>
          </section>

          <!-- Statistics -->
          <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div class="rounded-2xl bg-white p-5 shadow-sm">
              <div class="flex items-start justify-between">
                <div>
                  <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total DPT Terdaftar</p>
                  <div class="mt-2 flex items-baseline gap-2">
                    <span class="font-heading text-2xl font-bold">4,850</span>
                    <span class="text-xs text-slate-500">Mahasiswa</span>
                  </div>
                </div>
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <span class="material-symbols-outlined">how_to_reg</span>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <span class="flex items-center gap-1 font-semibold text-violet-700">
                  <span class="material-symbols-outlined text-sm">check_circle</span>
                  100% Kuota Valid
                </span>
                <span class="font-mono text-[10px] text-slate-500">8 Fakultas</span>
              </div>
            </div>

            <div class="rounded-2xl bg-white p-5 shadow-sm">
              <div class="flex items-start justify-between">
                <div>
                  <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Suara Telah Masuk</p>
                  <div class="mt-2 flex items-baseline gap-2">
                    <span class="font-heading text-2xl font-bold text-emerald-800">3,420</span>
                    <span class="text-xs text-emerald-700">Pemilih</span>
                  </div>
                </div>
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <span class="material-symbols-outlined">ballot</span>
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

            <div class="rounded-2xl bg-white p-5 shadow-sm">
              <div class="flex items-start justify-between">
                <div>
                  <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Belum Menggunakan Hak</p>
                  <div class="mt-2 flex items-baseline gap-2">
                    <span class="font-heading text-2xl font-bold text-amber-900">1,430</span>
                    <span class="text-xs text-amber-700">Sisa DPT</span>
                  </div>
                </div>
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <span class="material-symbols-outlined">pending_actions</span>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                <span class="font-mono text-[10px] font-semibold text-amber-700">29.5% Belum Memilih</span>
                <button type="button" class="font-mono text-[10px] font-semibold text-violet-700 hover:underline">Kirim Blast</button>
              </div>
            </div>

            <div class="rounded-2xl bg-white p-5 shadow-sm">
              <div class="flex items-start justify-between">
                <div>
                  <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Token Siap / Teraktivasi</p>
                  <div class="mt-2 flex items-baseline gap-2">
                    <span class="font-heading text-2xl font-bold">4,795</span>
                    <span class="text-xs text-slate-500">Akun</span>
                  </div>
                </div>
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                  <span class="material-symbols-outlined">key</span>
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
              <div class="flex flex-wrap gap-1.5 rounded-xl bg-slate-100 p-1">
                <button type="button" class="rounded-lg bg-violet-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm">
                  Semua (4,850)
                </button>
                <button type="button" class="rounded-lg bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:text-slate-900">
                  Sudah Memilih (3,420)
                </button>
                <button type="button" class="rounded-lg bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:text-slate-900">
                  Belum Memilih (1,430)
                </button>
                <button type="button" class="rounded-lg bg-white px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:text-slate-900">
                  Perlu Verifikasi (55)
                </button>
              </div>

              <div class="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[10px] text-slate-600 shadow-sm">
                <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
                Polling Bilik Suara Digital Terhubung
              </div>
            </div>

            <div class="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm xl:flex-row xl:items-center">
              <input
                type="text"
                placeholder="Cari berdasarkan NIM, nama mahasiswa, atau email kampus..."
                class="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />

              <div class="flex flex-wrap gap-2.5">
                <select class="min-w-[160px] rounded-xl border-0 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-violet-500/20">
                  <option value="">Semua Fakultas</option>
                  <option value="FT">Teknik (FT)</option>
                  <option value="FASILKOM">Ilmu Komputer (Fasilkom)</option>
                  <option value="FEB">Ekonomi &amp; Bisnis (FEB)</option>
                  <option value="FH">Hukum (FH)</option>
                  <option value="FPSI">Psikologi (FPsi)</option>
                  <option value="FK">Kedokteran (FK)</option>
                </select>

                <select class="min-w-[140px] rounded-xl border-0 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-violet-500/20">
                  <option value="">Semua Angkatan</option>
                  <option value="2024">Angkatan 2024</option>
                  <option value="2023">Angkatan 2023</option>
                  <option value="2022">Angkatan 2022</option>
                  <option value="2021">Angkatan 2021</option>
                </select>

                <select class="min-w-[190px] rounded-xl border-0 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:ring-2 focus:ring-violet-500/20">
                  <option value="">Semua Agenda Pemilihan</option>
                  <option value="BEM_KM">Pemilihan Raya BEM 2025</option>
                  <option value="DPM_FT">Dewan Perwakilan Mahasiswa FT</option>
                  <option value="HMIF">Himpunan Mahasiswa Informatika</option>
                </select>

                <button type="button" title="Reset Parameter Filter" class="flex items-center justify-center rounded-xl bg-slate-50 p-2.5 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900">
                  <span class="material-symbols-outlined">filter_alt_off</span>
                </button>
              </div>
            </div>
          </section>

          <!-- Voter Table -->
          <section class="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div class="overflow-x-auto">
              <table class="w-full border-collapse text-left">
                <thead>
                  <tr class="bg-slate-50 font-mono text-[10px] uppercase tracking-wider text-slate-600">
                    <th class="w-12 px-4 py-3.5 text-center">
                      <input type="checkbox" class="h-4 w-4 rounded text-violet-600 focus:ring-violet-500/30" />
                    </th>
                    <th class="whitespace-nowrap px-4 py-3.5 font-semibold">Identitas Mahasiswa</th>
                    <th class="whitespace-nowrap px-4 py-3.5 font-semibold">Fakultas &amp; Program Studi</th>
                    <th class="whitespace-nowrap px-4 py-3.5 font-semibold">Angkatan / Sem</th>
                    <th class="whitespace-nowrap px-4 py-3.5 font-semibold">Status Hak Suara</th>
                    <th class="whitespace-nowrap px-4 py-3.5 font-semibold">Partisipasi Bilik</th>
                    <th class="whitespace-nowrap px-4 py-3.5 font-semibold">Autentikasi Token</th>
                    <th class="px-4 py-3.5 text-center font-semibold">Aksi</th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-100 text-sm">
                  <tr class="transition-colors hover:bg-slate-50">
                    <td class="px-4 py-4 text-center">
                      <input type="checkbox" class="h-4 w-4 rounded text-violet-600 focus:ring-violet-500/30" />
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-700">RP</div>
                        <div>
                          <p class="font-semibold">Muhammad Rizky Pratama</p>
                          <p class="mt-0.5 font-mono text-[10px] text-violet-700">NIM 2208101012</p>
                          <p class="text-xs text-slate-500">m.rizky@student.ac.id</p>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <p class="font-medium">Ilmu Komputer (Fasilkom)</p>
                      <p class="text-xs text-slate-500">S1 Informatika</p>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px]">2022 / Sem 6</span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-800">
                        <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                        Sudah Memilih
                      </span>
                      <p class="mt-1 font-mono text-[10px] text-slate-500">Pukul 09:42 WIB</p>
                    </td>
                    <td class="px-4 py-4">
                      <div class="flex max-w-[190px] flex-wrap gap-1">
                        <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-violet-700">BEM KM ✓</span>
                        <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-violet-700">DPM FT ✓</span>
                        <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-violet-700">HMIF ✓</span>
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
                        <button type="button" title="Detail Pemilih" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-violet-700">
                          <span class="material-symbols-outlined text-lg">badge</span>
                        </button>
                        <button type="button" title="Reset Autentikasi" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                          <span class="material-symbols-outlined text-lg">lock_reset</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr class="transition-colors hover:bg-slate-50">
                    <td class="px-4 py-4 text-center">
                      <input type="checkbox" class="h-4 w-4 rounded text-violet-600 focus:ring-violet-500/30" />
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 font-heading text-lg font-bold text-slate-600">SN</div>
                        <div>
                          <p class="font-semibold">Siti Nurhaliza</p>
                          <p class="mt-0.5 font-mono text-[10px] text-violet-700">NIM 2305202045</p>
                          <p class="text-xs text-slate-500">sitinur@student.ac.id</p>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <p class="font-medium">Ekonomi &amp; Bisnis (FEB)</p>
                      <p class="text-xs text-slate-500">S1 Akuntansi</p>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px]">2023 / Sem 4</span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-amber-800">
                        <span class="material-symbols-outlined text-sm text-amber-600">schedule</span>
                        Belum Memilih
                      </span>
                      <p class="mt-1 font-mono text-[10px] text-slate-500">Undangan Terkirim</p>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-xs italic text-slate-500">Belum Akses Bilik</td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <p class="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-emerald-800">
                        <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                        Aktif &amp; Terverifikasi
                      </p>
                      <p class="mt-1 font-mono text-[10px] text-slate-500">Kesiapan Token: Siap</p>
                    </td>
                    <td class="px-4 py-4 text-center">
                      <div class="inline-flex items-center gap-1">
                        <button type="button" title="Kirim Blast Pengingat" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-violet-700">
                          <span class="material-symbols-outlined text-lg">forward_to_inbox</span>
                        </button>
                        <button type="button" title="Reset Autentikasi" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                          <span class="material-symbols-outlined text-lg">lock_reset</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr class="transition-colors hover:bg-slate-50">
                    <td class="px-4 py-4 text-center">
                      <input type="checkbox" class="h-4 w-4 rounded text-violet-600 focus:ring-violet-500/30" />
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-700">DC</div>
                        <div>
                          <p class="font-semibold">Daniel Christian Hutapea</p>
                          <p class="mt-0.5 font-mono text-[10px] text-violet-700">NIM 2101303088</p>
                          <p class="text-xs text-slate-500">daniel.c@student.ac.id</p>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <p class="font-medium">Fakultas Teknik (FT)</p>
                      <p class="text-xs text-slate-500">S1 Teknik Elektro</p>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px]">2021 / Sem 8</span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-800">
                        <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                        Sudah Memilih
                      </span>
                      <p class="mt-1 font-mono text-[10px] text-slate-500">Pukul 08:15 WIB</p>
                    </td>
                    <td class="px-4 py-4">
                      <div class="flex flex-wrap gap-1">
                        <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-violet-700">BEM KM ✓</span>
                        <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-violet-700">DPM FT ✓</span>
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
                        <button type="button" title="Detail Pemilih" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-violet-700">
                          <span class="material-symbols-outlined text-lg">badge</span>
                        </button>
                        <button type="button" title="Reset Autentikasi" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
                          <span class="material-symbols-outlined text-lg">lock_reset</span>
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr class="transition-colors hover:bg-slate-50">
                    <td class="px-4 py-4 text-center">
                      <input type="checkbox" class="h-4 w-4 rounded text-violet-600 focus:ring-violet-500/30" />
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-100 font-heading text-lg font-bold text-rose-800">AR</div>
                        <div>
                          <p class="font-semibold">Anisa Rahmawati</p>
                          <p class="mt-0.5 font-mono text-[10px] text-violet-700">NIM 2409404011</p>
                          <p class="text-xs text-slate-500">anisa.r@student.ac.id</p>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <p class="font-medium">Psikologi (FPsi)</p>
                      <p class="text-xs text-slate-500">S1 Psikologi</p>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px]">2024 / Sem 2</span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-rose-800">
                        <span class="material-symbols-outlined text-sm text-rose-600">error</span>
                        Belum Teraktivasi
                      </span>
                      <p class="mt-1 font-mono text-[10px] text-rose-600">Data Tanggal Lahir Kosong</p>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 text-xs italic text-slate-500">Belum Ada Akses</td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <p class="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-rose-700">
                        <span class="h-2 w-2 rounded-full bg-rose-500"></span>
                        Token Belum Digenerate
                      </p>
                      <p class="mt-1 font-mono text-[10px] text-slate-500">Perlu Validasi Siakad</p>
                    </td>
                    <td class="px-4 py-4 text-center">
                      <button type="button" class="rounded-lg bg-violet-100 px-2 py-1 font-mono text-[10px] font-semibold text-violet-700 transition hover:bg-violet-700 hover:text-white">
                        Generate
                      </button>
                    </td>
                  </tr>

                  <tr class="transition-colors hover:bg-slate-50">
                    <td class="px-4 py-4 text-center">
                      <input type="checkbox" class="h-4 w-4 rounded text-violet-600 focus:ring-violet-500/30" />
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <div class="flex items-center gap-3">
                        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 font-heading text-lg font-bold text-violet-700">FA</div>
                        <div>
                          <p class="font-semibold">Farhan Al-Fikri</p>
                          <p class="mt-0.5 font-mono text-[10px] text-violet-700">NIM 2208101099</p>
                          <p class="text-xs text-slate-500">farhan.af@student.ac.id</p>
                        </div>
                      </div>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <p class="font-medium">Ilmu Komputer (Fasilkom)</p>
                      <p class="text-xs text-slate-500">S1 Sistem Informasi</p>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-[10px]">2022 / Sem 6</span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4">
                      <span class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-emerald-800">
                        <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
                        Sudah Memilih
                      </span>
                      <p class="mt-1 font-mono text-[10px] text-slate-500">Pukul 11:02 WIB</p>
                    </td>
                    <td class="px-4 py-4">
                      <div class="flex flex-wrap gap-1">
                        <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-violet-700">BEM KM ✓</span>
                        <span class="rounded bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold text-violet-700">HMIF ✓</span>
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
                        <button type="button" title="Detail Pemilih" class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-violet-700">
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
            <div class="flex flex-col items-center justify-between gap-4 bg-slate-50 p-4 sm:flex-row">
              <div class="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span>Menampilkan <strong class="text-slate-800">1 - 5</strong> dari <strong class="text-slate-800">4,850</strong> pemilih terdaftar</span>
                <span class="text-slate-400">|</span>
                <span class="font-mono text-[10px]">DPT Sah KPU Mahasiswa</span>
              </div>

              <nav aria-label="Navigasi Halaman DPT" class="flex items-center gap-1">
                <button type="button" disabled class="flex cursor-not-allowed items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs text-slate-500 opacity-50">
                  <span class="material-symbols-outlined text-base">chevron_left</span>
                  Sebelumnya
                </button>
                <button type="button" class="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 font-mono text-[10px] font-bold text-white">1</button>
                <button type="button" class="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-mono text-[10px] text-slate-600 transition hover:bg-violet-50">2</button>
                <button type="button" class="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-mono text-[10px] text-slate-600 transition hover:bg-violet-50">3</button>
                <span class="px-1 text-xs text-slate-500">...</span>
                <button type="button" class="flex h-8 w-8 items-center justify-center rounded-lg bg-white font-mono text-[10px] text-slate-600 transition hover:bg-violet-50">485</button>
                <button type="button" class="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs text-slate-600 transition hover:bg-violet-50 hover:text-violet-700">
                  Selanjutnya
                  <span class="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </nav>
            </div>
          </section>

          <!-- Information Cards -->
          <section class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
              <div>
                <div class="mb-2 flex items-center gap-2 text-violet-700">
                  <span class="material-symbols-outlined text-2xl">verified_user</span>
                  <h2 class="font-heading text-lg font-bold text-slate-800">
                    Asas Integritas Pemilu Kampus: 1 NIM = 1 Hak Suara
                  </h2>
                </div>

                <p class="mb-4 text-sm leading-6 text-slate-600">
                  Sistem A-Vote menerapkan prinsip kedaulatan mahasiswa tertutup. Setiap mahasiswa yang tercantum dalam Daftar Pemilih Tetap (DPT) hanya dapat melakukan pemungutan suara satu kali per agenda pemilihan yang sah.
                </p>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                    <span class="material-symbols-outlined mt-0.5 shrink-0 text-xl text-violet-700">pin</span>
                    <div>
                      <h3 class="text-sm font-semibold">Autentikasi Dual Kredensial</h3>
                      <p class="mt-0.5 text-xs leading-5 text-slate-600">
                        Kombinasi NIM aktif terdaftar dan kode sandi tanggal lahir (DDMMYYYY) dengan hashing SHA-256 internal kampus.
                      </p>
                    </div>
                  </div>

                  <div class="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                    <span class="material-symbols-outlined mt-0.5 shrink-0 text-xl text-emerald-600">check_box</span>
                    <div>
                      <h3 class="text-sm font-semibold">Pencegahan Suara Ganda</h3>
                      <p class="mt-0.5 text-xs leading-5 text-slate-600">
                        Status hak suara langsung terkunci seketika mahasiswa menekan tombol finalisasi di bilik suara digital.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 font-mono text-[10px] text-slate-500">
                <span>Standar Komisi Pemilihan Umum Mahasiswa (KPUM)</span>
                <span class="font-semibold text-violet-700">SK Rektor No. 441/KM/2025</span>
              </div>
            </div>

            <div class="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-sm">
              <div>
                <div class="mb-2 flex items-center gap-2">
                  <span class="material-symbols-outlined text-2xl text-violet-700">cloud_upload</span>
                  <h2 class="font-heading text-lg font-bold">Panduan Format DPT</h2>
                </div>

                <p class="mb-4 text-xs leading-5 text-slate-600">
                  Unggah berkas spreadsheet dari Siakad Fakultas dengan format kolom yang telah terstandarisasi untuk mencegah kegagalan pembuatan token.
                </p>

                <div class="space-y-3 rounded-xl bg-slate-50 p-3 font-mono text-[10px] text-slate-600">
                  <div class="flex justify-between gap-2">
                    <span>Kolom 1</span>
                    <span class="text-right font-semibold text-slate-800">NIM (10–12 Digit)</span>
                  </div>
                  <div class="flex justify-between gap-2">
                    <span>Kolom 2</span>
                    <span class="text-right font-semibold text-slate-800">Nama Lengkap</span>
                  </div>
                  <div class="flex justify-between gap-2">
                    <span>Kolom 3</span>
                    <span class="text-right font-semibold text-slate-800">Email Kampus</span>
                  </div>
                  <div class="flex justify-between gap-2">
                    <span>Kolom 4</span>
                    <span class="text-right font-semibold text-slate-800">Kode Fakultas &amp; Prodi</span>
                  </div>
                  <div class="flex justify-between gap-2">
                    <span>Kolom 5</span>
                    <span class="text-right font-semibold text-slate-800">Tanggal Lahir</span>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
                <a href="#" class="flex items-center gap-1 text-xs font-semibold text-violet-700 hover:underline">
                  <span class="material-symbols-outlined text-base">file_download</span>
                  Unduh Template .XLSX
                </a>
                <span class="font-mono text-[10px] text-slate-500">Ukuran Maks: 15MB</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

body {
  background-color: #f8f9ff;
  font-family: 'Inter', sans-serif;
}
</style>