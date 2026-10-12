**File: `pages/admin/settings.vue`**

```vue
<template>
  <div class="min-h-screen bg-[#f8f9fc] text-slate-800">
    <!-- Top Navigation -->
    <header
      class="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6"
    >
      <div class="flex items-center gap-3 lg:gap-6">
        <div class="flex items-center gap-2.5">
          <div
            class="flex h-9 w-9 items-center justify-center rounded-xl bg-[#582be8] text-white shadow-md shadow-purple-600/20"
          >
            <span class="material-symbols-outlined">verified_user</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-heading text-xl font-bold tracking-tight text-[#582be8]">
              A-Vote
            </span>
            <span
              class="rounded-md border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-semibold text-purple-700"
            >
              Admin
            </span>
          </div>
        </div>

        <div
          class="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 xl:flex"
        >
          <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
          Sistem Enkripsi: Aktif & Terlindungi (SHA-256)
        </div>
      </div>

      <div class="mx-6 hidden max-w-md flex-1 md:block">
        <div class="relative">
          <span
            class="material-symbols-outlined absolute left-3 top-2 text-lg text-slate-400"
          >
            search
          </span>
          <input
            type="text"
            placeholder="Cari NIK, pemilih, atau ID pemilihan..."
            class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-xs outline-none transition focus:border-[#582be8] focus:ring-2 focus:ring-purple-100"
          />
        </div>
      </div>

      <div class="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Notifikasi"
          class="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
        >
          <span class="material-symbols-outlined">notifications</span>
          <span class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500"></span>
        </button>

        <div class="h-6 w-px bg-slate-200"></div>

        <div class="flex items-center gap-3">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full border border-purple-200 bg-purple-100 text-xs font-semibold text-purple-700"
          >
            AD
          </div>
          <div class="hidden leading-tight sm:block">
            <p class="text-xs font-semibold">admin@gmail.com</p>
            <p class="mt-1 text-[11px] font-medium text-[#582be8]">
              Super Administrator
            </p>
          </div>
          <a
            href="#"
            class="hidden rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-50 sm:block"
          >
            Logout
          </a>
        </div>
      </div>
    </header>

    <div class="flex min-h-[calc(100vh-65px)]">
      <!-- Sidebar -->
      <aside
        class="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white md:flex"
      >
        <nav class="space-y-1.5 p-4" aria-label="Menu Admin">
          <p class="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <NuxtLink to="/admin/dashboard" class="nav-item">
            <span class="material-symbols-outlined">dashboard</span>
            Dashboard
          </NuxtLink>

          <NuxtLink to="/admin/elections" class="nav-item justify-between">
            <span class="flex items-center gap-3">
              <span class="material-symbols-outlined">how_to_vote</span>
              Elections
            </span>
            <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
              3 Aktif
            </span>
          </NuxtLink>

          <NuxtLink to="/admin/voters" class="nav-item justify-between">
            <span class="flex items-center gap-3">
              <span class="material-symbols-outlined">groups</span>
              Daftar Pemilih
            </span>
            <span class="text-[11px] text-slate-400">DPT</span>
          </NuxtLink>

          <NuxtLink to="/admin/candidates" class="nav-item">
            <span class="material-symbols-outlined">person</span>
            Kandidat & Paslon
          </NuxtLink>

          <NuxtLink to="/admin/audit" class="nav-item">
            <span class="material-symbols-outlined">analytics</span>
            Audit & Rekapitulasi
          </NuxtLink>

          <p class="mb-2 mt-6 px-3 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Konfigurasi
          </p>

          <NuxtLink to="/admin/settings" class="nav-item nav-item-active">
            <span class="material-symbols-outlined">settings</span>
            Pengaturan Sistem
          </NuxtLink>
        </nav>

        <div class="border-t border-slate-100 bg-slate-50/60 p-4">
          <div class="rounded-xl border border-slate-200 bg-white p-3">
            <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              256-Bit SSL Enkripsi
            </div>
            <p class="mt-1 text-[11px] text-slate-500">
              Konsensus node terverifikasi.
            </p>
            <div
              class="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-400"
            >
              <span>v2.4.0-Production</span>
              <span class="font-mono font-semibold text-[#582be8]">ONLINE</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div class="mx-auto w-full max-w-[1600px] space-y-8">
          <!-- Page Header -->
          <section
            class="flex flex-col justify-between gap-5 pb-2 lg:flex-row lg:items-end"
          >
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full bg-purple-100 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#582be8]">
                  SYSTEM CONFIG v2.4
                </span>
                <span class="flex items-center gap-1.5 text-xs text-slate-500">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  SHA-256 Ledger Synchronized
                </span>
              </div>

              <h1 class="font-heading text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Pengaturan Sistem
              </h1>
              <p class="max-w-2xl text-sm leading-6 text-slate-500">
                Konfigurasi parameter pemilihan, keamanan kriptografi,
                integrasi SIAKAD kampus, dan manajemen hak akses panitia.
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                type="button"
                class="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <span class="material-symbols-outlined text-lg">history</span>
                Reset ke Default
              </button>
              <button
                type="button"
                class="flex items-center gap-2 rounded-xl bg-[#582be8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-600/20 transition hover:bg-[#471ec7]"
              >
                <span class="material-symbols-outlined text-lg">verified_user</span>
                Simpan Perubahan
              </button>
            </div>
          </section>

          <!-- Settings Tabs -->
          <section class="overflow-x-auto rounded-2xl border border-slate-100 bg-white p-1.5 shadow-sm">
            <div class="flex min-w-max items-center gap-1">
              <button type="button" class="tab-item tab-item-active">
                <span class="material-symbols-outlined text-lg">account_balance</span>
                Umum & Kampus
              </button>
              <button type="button" class="tab-item">
                <span class="material-symbols-outlined text-lg">how_to_vote</span>
                Bilik Suara & Jadwal
              </button>
              <button type="button" class="tab-item">
                <span class="material-symbols-outlined text-lg">lock_reset</span>
                Keamanan & Kriptografi
              </button>
              <button type="button" class="tab-item">
                <span class="material-symbols-outlined text-lg">hub</span>
                Integrasi SIAKAD / API
              </button>
              <button type="button" class="tab-item">
                <span class="material-symbols-outlined text-lg">badge</span>
                Hak Akses Panitia & Saksi
              </button>
              <button type="button" class="tab-item">
                <span class="material-symbols-outlined text-lg">cloud_sync</span>
                Backup & Maintenance
              </button>
            </div>
          </section>

          <!-- Settings Grid -->
          <div class="grid grid-cols-1 items-start gap-8 xl:grid-cols-12">
            <!-- Left Column -->
            <div class="space-y-8 xl:col-span-7">
              <!-- Institutional Identity -->
              <section class="settings-card">
                <div class="section-heading">
                  <div class="section-icon">
                    <span class="material-symbols-outlined">account_balance</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h2 class="section-title">Identitas Institusi & Gelaran</h2>
                    <p class="section-description">
                      Profil penyelenggara pemungutan suara resmi
                    </p>
                  </div>
                  <span class="hidden rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-[#582be8] sm:inline-flex">
                    STATUS: RESMI TERDAFTAR
                  </span>
                </div>

                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div class="md:col-span-2">
                    <label class="form-label">Nama Institusi / Universitas</label>
                    <div class="input-icon-wrap">
                      <span class="material-symbols-outlined">school</span>
                      <input
                        type="text"
                        value="Universitas Indonesia Mandiri"
                        class="form-input"
                      />
                    </div>
                  </div>

                  <div class="md:col-span-2">
                    <label class="form-label">Nama Gelaran Pemilihan (Event Title)</label>
                    <div class="input-icon-wrap">
                      <span class="material-symbols-outlined">campaign</span>
                      <input
                        type="text"
                        value="Pemilihan Raya Mahasiswa (PEMIRA) 2025"
                        class="form-input"
                      />
                    </div>
                  </div>

                  <div class="flex flex-col justify-between gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center md:col-span-2">
                    <div class="flex min-w-0 items-center gap-4">
                      <div class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
                        <span class="material-symbols-outlined text-4xl text-[#582be8]">
                          account_balance
                        </span>
                      </div>
                      <div class="min-w-0">
                        <p class="text-sm font-semibold text-slate-800">
                          Logo Resmi Institusi
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                          Format PNG/SVG transparan, maks. 2MB
                        </p>
                        <p class="mt-1 break-all text-[11px] font-medium text-[#582be8]">
                          crest_uim_2025_vector.svg (240 KB)
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="shrink-0 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-[#582be8] transition hover:bg-purple-50"
                    >
                      Ganti Logo
                    </button>
                  </div>

                  <div>
                    <label class="form-label">Zona Waktu Resmi (Election Clock)</label>
                    <select class="form-select">
                      <option selected>Asia/Jakarta (WIB - UTC+07:00)</option>
                      <option>Asia/Makassar (WITA - UTC+08:00)</option>
                      <option>Asia/Jayapura (WIT - UTC+09:00)</option>
                    </select>
                  </div>

                  <div>
                    <label class="form-label">Bahasa Antarmuka Default</label>
                    <select class="form-select">
                      <option selected>Bahasa Indonesia (ID)</option>
                      <option>English (US)</option>
                    </select>
                  </div>
                </div>
              </section>

              <!-- Cryptography -->
              <section class="settings-card">
                <div class="section-heading">
                  <div class="section-icon">
                    <span class="material-symbols-outlined">shield_lock</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h2 class="section-title">Kriptografi & Konsensus</h2>
                    <p class="section-description">
                      Spesifikasi enkripsi matematis dan perlindungan privasi pemilih
                    </p>
                  </div>
                  <span class="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700 sm:flex">
                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                    MILITARY-GRADE AUDIT
                  </span>
                </div>

                <div class="space-y-4">
                  <div class="space-y-3 rounded-2xl bg-slate-50 p-4">
                    <div class="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div class="flex items-center gap-2 text-sm font-semibold text-slate-800">
                        <span class="material-symbols-outlined text-xl text-[#582be8]">
                          enhanced_encryption
                        </span>
                        Algoritma Enkripsi Surat Suara
                      </div>
                      <span class="w-fit rounded-lg bg-purple-100 px-2.5 py-1 text-xs font-bold text-[#582be8]">
                        SHA-256 + Curve25519
                      </span>
                    </div>
                    <p class="text-sm leading-6 text-slate-500">
                      Setiap suara dienkripsi secara asimetris di peramban klien
                      sebelum transmisi dan ditandatangani secara digital dengan
                      pasangan kunci kurva eliptis.
                    </p>
                  </div>

                  <div class="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                    <div class="space-y-1">
                      <div class="flex flex-wrap items-center gap-2">
                        <p class="text-sm font-semibold text-slate-800">
                          Protokol Zero-Knowledge Proof (ZKP)
                        </p>
                        <span class="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          TERVERIFIKASI
                        </span>
                      </div>
                      <p class="text-sm leading-6 text-slate-500">
                        Menghapus total jejak korelasi antara NIM/KTP mahasiswa
                        dengan data paslon pilihan pada ledger publik.
                      </p>
                    </div>
                    <label class="toggle">
                      <input type="checkbox" checked />
                      <span class="toggle-track"></span>
                    </label>
                  </div>

                  <div class="space-y-4 rounded-2xl bg-slate-50 p-4">
                    <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div>
                        <p class="text-sm font-semibold text-slate-800">
                          Kuorum Saksi Digital (Threshold Multi-Signature)
                        </p>
                        <p class="mt-1 text-sm leading-6 text-slate-500">
                          Batas minimum kunci saksi paslon untuk unseal pembukaan
                          kotak suara rekapitulasi.
                        </p>
                      </div>
                      <span class="w-fit shrink-0 rounded-xl bg-[#582be8] px-3 py-1.5 text-xs font-bold text-white">
                        3 dari 5 Saksi
                      </span>
                    </div>
                    <div class="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div class="h-full w-3/5 rounded-full bg-[#582be8]"></div>
                    </div>
                    <div class="flex flex-wrap justify-between gap-2 text-[11px] text-slate-500">
                      <span>Minimal Saksi: 3 Pasangan Kunci</span>
                      <span>Total Delegasi Terdaftar: 5 Node Saksi</span>
                    </div>
                  </div>

                  <div class="flex flex-col justify-between gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center">
                    <div>
                      <p class="text-sm font-semibold text-slate-800">
                        Frekuensi Sinkronisasi Ledger Konsensus
                      </p>
                      <p class="mt-1 text-sm text-slate-500">
                        Broadcast blok audit berkala ke node panwaslu & rektorat
                      </p>
                    </div>
                    <select class="form-select sm:w-auto">
                      <option selected>Tiap 1 Menit (Real-time)</option>
                      <option>Tiap 5 Menit</option>
                      <option>Tiap 15 Menit</option>
                    </select>
                  </div>
                </div>
              </section>

              <!-- SIAKAD Integration -->
              <section class="settings-card">
                <div class="section-heading">
                  <div class="section-icon">
                    <span class="material-symbols-outlined">api</span>
                  </div>
                  <div class="min-w-0 flex-1">
                    <h2 class="section-title">Integrasi SIAKAD & DPT</h2>
                    <p class="section-description">
                      Otorisasi pertukaran data pemilih aktif dari pangkalan akademik
                    </p>
                  </div>
                  <span class="hidden items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-800 sm:flex">
                    <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                    Tersambung (28ms)
                  </span>
                </div>

                <div class="space-y-5">
                  <div>
                    <label class="form-label">
                      Endpoint API Autentikasi Mahasiswa (SIAKAD v2)
                    </label>
                    <div class="flex flex-col gap-2 sm:flex-row">
                      <div class="input-icon-wrap min-w-0 flex-1">
                        <span class="material-symbols-outlined">link</span>
                        <input
                          type="text"
                          readonly
                          value="https://api.siakad.kampus.ac.id/v2/pemira-auth"
                          class="form-input font-mono text-xs"
                        />
                      </div>
                      <button type="button" class="secondary-button shrink-0">
                        <span class="material-symbols-outlined text-lg">sync_alt</span>
                        Uji Koneksi
                      </button>
                    </div>
                  </div>

                  <div>
                    <label class="form-label">Private API Secret Token</label>
                    <div class="flex flex-col gap-2 sm:flex-row">
                      <div class="input-icon-wrap min-w-0 flex-1">
                        <span class="material-symbols-outlined">key</span>
                        <input
                          type="password"
                          value="contoh-token-api"
                          class="form-input font-mono text-xs"
                        />
                      </div>
                      <button type="button" class="secondary-button shrink-0">
                        <span class="material-symbols-outlined text-lg">restart_alt</span>
                        Regenerate Key
                      </button>
                    </div>
                    <p class="mt-2 text-xs text-slate-400">
                      Token pada tampilan ini merupakan data contoh. Jangan gunakan
                      kredensial asli secara langsung di frontend.
                    </p>
                  </div>

                  <div class="flex flex-col justify-between gap-3 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center">
                    <div class="flex items-center gap-3">
                      <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#582be8]">
                        <span class="material-symbols-outlined">update</span>
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-slate-800">
                          Sinkronisasi DPT Otomatis
                        </p>
                        <p class="mt-1 text-xs text-slate-500">
                          Pembersihan mahasiswa cuti / non-aktif terjadwal
                        </p>
                      </div>
                    </div>
                    <span class="w-fit rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-slate-700">
                      Harian (02:00 WIB)
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <!-- Right Column -->
            <div class="space-y-8 xl:col-span-5">
              <!-- Voting Booth Parameters -->
              <section class="settings-card">
                <div class="section-heading">
                  <div class="section-icon">
                    <span class="material-symbols-outlined">tune</span>
                  </div>
                  <div>
                    <h2 class="section-title">Parameter Bilik Suara</h2>
                    <p class="section-description">
                      Aturan pembatasan interaksi pemilih
                    </p>
                  </div>
                </div>

                <div class="space-y-6">
                  <div class="space-y-3 rounded-2xl bg-slate-50 p-4">
                    <div class="flex items-center justify-between gap-3">
                      <label class="text-sm font-semibold text-slate-800">
                        Batas Waktu Sesi Bilik Suara
                      </label>
                      <span class="shrink-0 rounded-lg bg-[#582be8] px-2.5 py-1 text-xs font-bold text-white">
                        15 Menit
                      </span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="30"
                      value="15"
                      class="w-full cursor-pointer accent-[#582be8]"
                    />
                    <div class="flex justify-between gap-2 text-[10px] text-slate-500">
                      <span>5 Min (Kilat)</span>
                      <span>15 Min (Standar)</span>
                      <span>30 Min (Maksimum)</span>
                    </div>
                  </div>

                  <div class="space-y-3">
                    <div class="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                      <div>
                        <p class="text-sm font-semibold text-slate-800">
                          Hitung Cepat (Live Quick Count)
                        </p>
                        <p class="mt-1 text-xs leading-5 text-slate-500">
                          Tampilkan grafik persentase suara secara publik
                        </p>
                      </div>
                      <label class="toggle">
                        <input type="checkbox" checked />
                        <span class="toggle-track"></span>
                      </label>
                    </div>

                    <div class="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                      <div>
                        <p class="text-sm font-semibold text-slate-800">
                          Unduh Tanda Terima (Ballot Hash PDF)
                        </p>
                        <p class="mt-1 text-xs leading-5 text-slate-500">
                          Sertifikat bukti pencoblosan terenkripsi untuk pemilih
                        </p>
                      </div>
                      <label class="toggle">
                        <input type="checkbox" checked />
                        <span class="toggle-track"></span>
                      </label>
                    </div>

                    <div class="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                      <div>
                        <p class="text-sm font-semibold text-slate-800">
                          Mode Kiosk Lab Komputer Terkunci
                        </p>
                        <p class="mt-1 text-xs leading-5 text-slate-500">
                          Pembersihan cache otomatis & cegah riwayat browser
                        </p>
                      </div>
                      <label class="toggle">
                        <input type="checkbox" checked />
                        <span class="toggle-track"></span>
                      </label>
                    </div>
                  </div>

                  <div class="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">
                    <div>
                      <p class="text-sm font-semibold text-slate-800">
                        Toleransi Waktu Tutup (Grace Period)
                      </p>
                      <p class="mt-1 text-xs leading-5 text-slate-500">
                        Bagi pemilih yang sudah antre di bilik suara
                      </p>
                    </div>
                    <div class="flex shrink-0 items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        value="5"
                        class="w-16 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-center text-sm font-bold text-[#582be8] outline-none focus:border-[#582be8]"
                      />
                      <span class="text-xs text-slate-500">Menit</span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Contact and Audit -->
              <section class="settings-card">
                <div class="section-heading">
                  <div class="section-icon">
                    <span class="material-symbols-outlined">contact_support</span>
                  </div>
                  <div>
                    <h2 class="section-title">Kontak & Audit Trail</h2>
                    <p class="section-description">
                      Eskalasi darurat dan logging forensik
                    </p>
                  </div>
                </div>

                <div class="space-y-5">
                  <div>
                    <label class="form-label">
                      Email Notifikasi Audit & Panwaslu
                    </label>
                    <div class="input-icon-wrap">
                      <span class="material-symbols-outlined">mail</span>
                      <input
                        type="email"
                        value="panwaslu.pemira@kampus.ac.id"
                        class="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="form-label">
                      Hotline Darurat WhatsApp KPU Mahasiswa
                    </label>
                    <div class="input-icon-wrap">
                      <span class="material-symbols-outlined">phone_in_talk</span>
                      <input
                        type="text"
                        value="+62 812-9988-7766"
                        class="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label class="form-label">Tingkat Log Audit Forensik</label>
                    <div class="flex flex-col justify-between gap-3 rounded-2xl bg-slate-50 p-3.5 sm:flex-row sm:items-center">
                      <div class="flex items-center gap-2.5">
                        <span class="material-symbols-outlined text-xl text-[#582be8]">
                          terminal
                        </span>
                        <span class="text-sm font-semibold text-slate-800">
                          Detailed Trace
                        </span>
                      </div>
                      <span class="w-fit rounded-md bg-white px-2.5 py-1 text-[10px] font-bold text-[#582be8]">
                        INFO | WARN | SECURITY_ALERT
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <!-- Node Status -->
              <section class="relative overflow-hidden rounded-3xl bg-[#582be8] p-6 text-white shadow-lg shadow-purple-600/20">
                <div
                  class="pointer-events-none absolute -bottom-8 -right-8 h-36 w-36 rounded-full bg-white/5"
                ></div>

                <div class="relative space-y-5">
                  <div class="flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-xl">
                        dns
                      </span>
                      <span class="text-[11px] font-semibold uppercase tracking-wider text-purple-100">
                        Node Status Cluster
                      </span>
                    </div>
                    <span class="rounded-full bg-emerald-400/20 px-2.5 py-1 text-[10px] font-bold text-emerald-200">
                      HEALTHY
                    </span>
                  </div>

                  <div>
                    <h2 class="font-heading text-2xl font-bold tracking-tight">
                      Consensus 5/5 Valid
                    </h2>
                    <p class="mt-2 text-sm leading-6 text-purple-100">
                      Semua parameter konfigurasi ini dilindungi enkripsi hash
                      blokir tamper-proof.
                    </p>
                  </div>

                  <div
                    class="flex flex-wrap justify-between gap-2 border-t border-white/15 pt-4 text-[11px] text-purple-100"
                  >
                    <span>Block Hash: #88c9...3f12</span>
                    <span>Latency: 14ms</span>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <footer
            class="border-t border-slate-200 py-5 text-center text-xs text-slate-400"
          >
            A-Vote Admin Dashboard · System Configuration v2.4.0
          </footer>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

body {
  font-family: 'Inter', sans-serif;
}

.font-heading {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.material-symbols-outlined {
  font-weight: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  font-feature-settings: 'liga';
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  padding: 0.625rem 0.875rem;
  color: #475569;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 150ms, color 150ms;
}

.nav-item > .material-symbols-outlined {
  font-size: 1.25rem;
  color: #94a3b8;
}

.nav-item:hover {
  background: #f8fafc;
  color: #0f172a;
}

.nav-item-active {
  border-color: #ebe4ff;
  background: #f4f0ff;
  color: #582be8;
  font-weight: 600;
}

.nav-item-active > .material-symbols-outlined {
  color: #582be8;
}

.settings-card {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid #f1f5f9;
  border-radius: 1.5rem;
  background: #ffffff;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgb(15 23 42 / 0.035);
}

@media (min-width: 640px) {
  .settings-card {
    padding: 2rem;
  }
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
}

.section-icon {
  display: flex;
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background: #f4f0ff;
  color: #582be8;
}

.section-icon .material-symbols-outlined {
  font-size: 1.375rem;
}

.section-title {
  font-family: 'Plus Jakarta Sans', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  color: #0f172a;
}

.section-description {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #64748b;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #334155;
  font-size: 0.8125rem;
  font-weight: 600;
}

.input-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon-wrap > .material-symbols-outlined {
  position: absolute;
  left: 0.875rem;
  z-index: 1;
  color: #94a3b8;
  font-size: 1.25rem;
  pointer-events: none;
}

.form-input,
.form-select {
  width: 100%;
  min-width: 0;
  border: 1px solid transparent;
  border-radius: 0.75rem;
  background: #f8fafc;
  padding: 0.7rem 0.875rem;
  color: #1e293b;
  font-size: 0.8125rem;
  outline: none;
  transition: border-color 150ms, background-color 150ms, box-shadow 150ms;
}

.form-input {
  padding-left: 2.75rem;
}

.form-input:focus,
.form-select:focus {
  border-color: #8b70f3;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgb(88 43 232 / 0.1);
}

.form-input[readonly] {
  cursor: default;
}

.form-select {
  cursor: pointer;
}

.secondary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  background: #f8fafc;
  padding: 0.625rem 1rem;
  color: #582be8;
  font-size: 0.8125rem;
  font-weight: 600;
  transition: background-color 150ms;
}

.secondary-button:hover {
  background: #f4f0ff;
}

.tab-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.75rem;
  padding: 0.625rem 1rem;
  color: #64748b;
  font-size: 0.8125rem;
  font-weight: 500;
  transition: background-color 150ms, color 150ms;
}

.tab-item:hover {
  background: #f8fafc;
  color: #0f172a;
}

.tab-item-active {
  background: #f4f0ff;
  color: #582be8;
  font-weight: 600;
}

.toggle {
  position: relative;
  display: inline-flex;
  width: 3rem;
  height: 1.5rem;
  flex-shrink: 0;
  cursor: pointer;
}

.toggle input {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
}

.toggle-track {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: #cbd5e1;
  transition: background-color 180ms;
}

.toggle-track::before {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background: #ffffff;
  content: '';
  box-shadow: 0 1px 2px rgb(15 23 42 / 0.15);
  transition: transform 180ms;
}

.toggle input:checked + .toggle-track {
  background: #582be8;
}

.toggle input:checked + .toggle-track::before {
  transform: translateX(24px);
}

.toggle input:focus-visible + .toggle-track {
  outline: 2px solid #8b70f3;
  outline-offset: 3px;
}

input[type='range'] {
  accent-color: #582be8;
}
</style>
```

