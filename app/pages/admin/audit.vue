<template>
  <div class="min-h-screen bg-[#f8f9fc] font-sans text-slate-800 antialiased">
    <!-- Top Navigation -->
    <header class="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
      <div class="flex min-h-[72px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/20">
            <span class="material-symbols-outlined">verified_user</span>
          </div>

          <div class="flex items-center gap-2">
            <span class="font-heading text-xl font-extrabold tracking-tight text-brand-600">A-Vote</span>
            <span class="rounded-md border border-brand-200 bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">Admin</span>
          </div>

          <div class="ml-4 hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 xl:flex">
            <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
            Sistem Enkripsi Aktif
          </div>
        </div>

        <div class="hidden w-full max-w-sm md:block">
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">search</span>
            <input
              type="text"
              placeholder="Cari NIK, pemilih, atau ID pemilihan..."
              class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10"
            />
          </div>
        </div>

        <div class="flex shrink-0 items-center gap-3">
          <button type="button" class="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500"></span>
          </button>

          <div class="hidden h-8 w-px bg-slate-200 sm:block"></div>

          <div class="hidden items-center gap-2 sm:flex">
            <div class="flex h-9 w-9 items-center justify-center rounded-full border border-brand-200 bg-brand-100 text-xs font-bold text-brand-700">AD</div>
            <div>
              <p class="text-xs font-semibold text-slate-800">admin@gmail.com</p>
              <p class="mt-0.5 text-[11px] font-medium text-brand-600">Super Administrator</p>
            </div>
          </div>

          <a href="#" class="rounded-lg px-2.5 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50">Logout</a>
        </div>
      </div>
    </header>

    <div class="flex min-h-[calc(100vh-72px)]">
      <!-- Sidebar -->
      <aside class="hidden w-64 shrink-0 flex-col justify-between border-r border-slate-200 bg-white md:flex">
        <nav aria-label="Menu Admin" class="space-y-1.5 p-4">
          <p class="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Main Menu</p>

          <a href="#" class="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <span class="material-symbols-outlined text-xl text-slate-400">grid_view</span>
            Dashboard
          </a>

          <a href="#" class="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <span class="flex items-center gap-3">
              <span class="material-symbols-outlined text-xl text-slate-400">ballot</span>
              Elections
            </span>
            <span class="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">3 Aktif</span>
          </a>

          <a href="#" class="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <span class="flex items-center gap-3">
              <span class="material-symbols-outlined text-xl text-slate-400">groups</span>
              Daftar Pemilih
            </span>
            <span class="text-[11px] text-slate-400">DPT</span>
          </a>

          <a href="#" class="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
            <span class="material-symbols-outlined text-xl text-slate-400">person</span>
            Kandidat &amp; Paslon
          </a>

          <a href="#" class="flex items-center gap-3 rounded-xl border border-brand-100 bg-brand-50 px-3.5 py-2.5 text-sm font-semibold text-brand-600 shadow-sm">
            <span class="material-symbols-outlined text-xl">analytics</span>
            Audit &amp; Rekapitulasi
          </a>

          <div class="pb-1 pt-5">
            <p class="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Konfigurasi</p>
            <a href="#" class="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
              <span class="material-symbols-outlined text-xl text-slate-400">settings</span>
              Pengaturan Sistem
            </a>
          </div>
        </nav>

        <div class="border-t border-slate-100 bg-slate-50/60 p-4">
          <div class="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <div class="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
              256-Bit SSL Enkripsi
            </div>
            <p class="mt-1 text-[11px] text-slate-500">Konsensus node terverifikasi.</p>
            <div class="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[10px] text-slate-400">
              <span>v2.4.0-Production</span>
              <span class="font-mono font-semibold text-brand-600">ONLINE</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div class="mx-auto flex max-w-[1600px] flex-col gap-6">
          <!-- Page Heading -->
          <section class="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <div class="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
                <span>A-Vote</span>
                <span>/</span>
                <span>Pemilu Mahasiswa 2025</span>
                <span>/</span>
                <span class="font-bold text-brand-600">Audit &amp; Rekapitulasi</span>
              </div>

              <h1 class="font-heading text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Audit Suara &amp; Rekapitulasi
              </h1>

              <p class="mt-2 max-w-3xl text-xs leading-6 text-slate-500 sm:text-sm">
                Pantau integritas pemungutan suara, validasi rantai kriptografi SHA-256,
                serta perolehan suara sah paslon secara transparan.
              </p>
            </div>

            <div class="flex flex-wrap gap-2.5">
              <button type="button" class="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <span class="material-symbols-outlined text-lg text-slate-500">download</span>
                Unduh BA (PDF)
              </button>

              <button type="button" class="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <span class="material-symbols-outlined text-lg text-slate-500">upload</span>
                Export Trail (CSV)
              </button>

              <button type="button" class="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-brand-600/20 transition hover:bg-brand-700">
                <span class="material-symbols-outlined text-lg">verified_user</span>
                Verifikasi Kriptografi
              </button>
            </div>
          </section>

          <!-- KPI Cards -->
          <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article class="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-slate-500">Total Suara Masuk</span>
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <span class="material-symbols-outlined">how_to_vote</span>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex flex-wrap items-baseline gap-2">
                  <span class="font-heading text-2xl font-extrabold text-slate-900">3,420</span>
                  <span class="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-600">70.5% DPT</span>
                </div>
                <p class="mt-1 text-[11px] text-slate-400">Dari total 4,850 Daftar Pemilih Tetap</p>
              </div>
              <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div class="h-full rounded-full bg-brand-600" style="width: 70.5%"></div>
              </div>
            </article>

            <article class="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-slate-500">Integritas Hash SHA-256</span>
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <span class="material-symbols-outlined">verified</span>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex flex-wrap items-baseline gap-2">
                  <span class="font-heading text-2xl font-extrabold text-slate-900">100% Valid</span>
                  <span class="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-600">Verified</span>
                </div>
                <p class="mt-1 text-[11px] text-slate-400">3,420 / 3,420 hash tercatat valid</p>
              </div>
              <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div class="h-full rounded-full bg-emerald-500" style="width: 100%"></div>
              </div>
            </article>

            <article class="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-slate-500">Node Konsensus</span>
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <span class="material-symbols-outlined">dns</span>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex flex-wrap items-baseline gap-2">
                  <span class="font-heading text-2xl font-extrabold text-slate-900">5/5 Node</span>
                  <span class="rounded-md bg-purple-50 px-1.5 py-0.5 text-xs font-semibold text-purple-700">Sinkron</span>
                </div>
                <p class="mt-1 text-[11px] text-slate-400">Kampus, KPU, BEM, DPM, Saksi</p>
              </div>
              <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div class="h-full rounded-full bg-purple-600" style="width: 100%"></div>
              </div>
            </article>

            <article class="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <div class="flex items-center justify-between">
                <span class="text-xs font-medium text-slate-500">Anomali &amp; Selisih</span>
                <div class="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <span class="material-symbols-outlined">security</span>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex flex-wrap items-baseline gap-2">
                  <span class="font-heading text-2xl font-extrabold text-slate-900">0 Terdeteksi</span>
                  <span class="rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">Zero Tamper</span>
                </div>
                <p class="mt-1 text-[11px] text-slate-400">Berdasarkan data audit yang ditampilkan</p>
              </div>
              <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div class="h-full rounded-full bg-emerald-500" style="width: 100%"></div>
              </div>
            </article>
          </section>

          <!-- Election Recapitulation -->
          <section class="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
            <div class="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 md:flex-row md:items-center">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
                <select class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 sm:w-80">
                  <option>Pemilihan Raya Ketua &amp; Wakil Ketua BEM 2025</option>
                  <option>Pemilihan Dewan Perwakilan Mahasiswa (DPM) 2025</option>
                  <option>Pemilihan Himpunan Mahasiswa Teknik Elektro 2025</option>
                </select>

                <span class="inline-flex items-center gap-2 self-start rounded-full bg-amber-50 px-3 py-2 text-[11px] font-semibold text-amber-700 sm:self-auto">
                  <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                  Bilik Ditutup · Rekapitulasi Berlangsung
                </span>
              </div>

              <div class="text-xs text-slate-400">
                Pembaruan Ledger Terakhir:
                <span class="ml-1 font-mono font-semibold text-slate-700">17:34:12 WIB</span>
              </div>
            </div>

            <!-- Candidate Results -->
            <div class="grid grid-cols-1 gap-4 py-6 md:grid-cols-3">
              <article class="relative overflow-hidden rounded-2xl border border-brand-100 bg-brand-50/40 p-5">
                <span class="absolute right-4 top-4 rounded-full bg-brand-600 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
                  Unggul Sementara
                </span>

                <div class="mb-5 flex items-center gap-3.5 pr-20">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 font-heading text-lg font-extrabold text-white shadow-md shadow-brand-600/20">01</div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">Farhan &amp; Nabila</h3>
                    <p class="mt-1 text-xs font-medium text-brand-600">FT · FEB</p>
                  </div>
                </div>

                <div class="mb-3 flex items-baseline justify-between gap-3">
                  <span class="font-heading text-3xl font-extrabold text-slate-900">1,485</span>
                  <span class="text-base font-bold text-brand-600">43.4%</span>
                </div>
                <p class="text-[11px] text-slate-400">Total akumulasi suara sah terenkripsi</p>

                <div class="my-4 h-2.5 overflow-hidden rounded-full bg-slate-200/70">
                  <div class="h-full rounded-full bg-brand-600" style="width: 43.4%"></div>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-2 border-t border-brand-100 pt-3 text-[11px] text-slate-500">
                  <span>Suara terbanyak: <strong>FT (620)</strong></span>
                  <span class="font-mono font-semibold text-brand-700">Hash Verified</span>
                </div>
              </article>

              <article class="rounded-2xl border border-slate-200 bg-white p-5">
                <div class="mb-5 flex items-center gap-3.5">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-heading text-lg font-extrabold text-slate-700">02</div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">Dimas &amp; Siti</h3>
                    <p class="mt-1 text-xs font-medium text-slate-500">FT · FISIP</p>
                  </div>
                </div>

                <div class="mb-3 flex items-baseline justify-between gap-3">
                  <span class="font-heading text-3xl font-extrabold text-slate-900">1,120</span>
                  <span class="text-base font-bold text-slate-600">32.7%</span>
                </div>
                <p class="text-[11px] text-slate-400">Total akumulasi suara sah terenkripsi</p>

                <div class="my-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div class="h-full rounded-full bg-indigo-500" style="width: 32.7%"></div>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                  <span>Suara terbanyak: <strong>FISIP (490)</strong></span>
                  <span class="font-mono font-semibold text-slate-600">Hash Verified</span>
                </div>
              </article>

              <article class="rounded-2xl border border-slate-200 bg-white p-5">
                <div class="mb-5 flex items-center gap-3.5">
                  <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 font-heading text-lg font-extrabold text-slate-700">03</div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">Bagas &amp; Amanda</h3>
                    <p class="mt-1 text-xs font-medium text-slate-500">FH · FPSI</p>
                  </div>
                </div>

                <div class="mb-3 flex items-baseline justify-between gap-3">
                  <span class="font-heading text-3xl font-extrabold text-slate-900">795</span>
                  <span class="text-base font-bold text-slate-600">23.2%</span>
                </div>
                <p class="text-[11px] text-slate-400">Total akumulasi suara sah terenkripsi</p>

                <div class="my-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
                  <div class="h-full rounded-full bg-slate-500" style="width: 23.2%"></div>
                </div>

                <div class="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
                  <span>Suara terbanyak: <strong>FH (410)</strong></span>
                  <span class="font-mono font-semibold text-slate-600">Hash Verified</span>
                </div>
              </article>
            </div>

            <div class="mb-7 flex flex-col justify-between gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 sm:flex-row sm:items-center">
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-lg text-slate-400">info</span>
                <span>Suara Abstain / Blanko Resmi: <strong class="text-slate-900">20 Suara (0.7%)</strong></span>
              </div>
              <span class="text-[11px] text-slate-400">Sah secara regulasi pemira</span>
            </div>

            <!-- Faculty Distribution -->
            <div>
              <div class="mb-5 flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                <div>
                  <h3 class="text-sm font-bold uppercase tracking-wide text-slate-700">Distribusi Suara per Fakultas</h3>
                  <p class="mt-1 text-xs text-slate-400">Perbandingan perolehan suara tiap paslon berdasarkan fakultas</p>
                </div>

                <div class="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-slate-600">
                  <span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-brand-600"></span>01: Farhan</span>
                  <span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-indigo-500"></span>02: Dimas</span>
                  <span class="flex items-center gap-2"><span class="h-2.5 w-2.5 rounded-full bg-slate-400"></span>03: Bagas</span>
                </div>
              </div>

              <div class="space-y-5">
                <div>
                  <div class="mb-2 flex justify-between gap-3 text-xs font-medium text-slate-700">
                    <span>Fakultas Teknik (FT)</span>
                    <span class="font-mono text-slate-500">1,020 Suara</span>
                  </div>
                  <div class="flex h-3 overflow-hidden rounded-full bg-slate-100">
                    <div class="h-full bg-brand-600" style="width: 60.7%" title="Paslon 01: 620"></div>
                    <div class="h-full bg-indigo-500" style="width: 25.5%" title="Paslon 02: 260"></div>
                    <div class="h-full bg-slate-400" style="width: 13.8%" title="Paslon 03: 140"></div>
                  </div>
                </div>

                <div>
                  <div class="mb-2 flex justify-between gap-3 text-xs font-medium text-slate-700">
                    <span>Fakultas Ilmu Komputer (Fasilkom)</span>
                    <span class="font-mono text-slate-500">780 Suara</span>
                  </div>
                  <div class="flex h-3 overflow-hidden rounded-full bg-slate-100">
                    <div class="h-full bg-brand-600" style="width: 52.5%" title="Paslon 01: 410"></div>
                    <div class="h-full bg-indigo-500" style="width: 32%" title="Paslon 02: 250"></div>
                    <div class="h-full bg-slate-400" style="width: 15.5%" title="Paslon 03: 120"></div>
                  </div>
                </div>

                <div>
                  <div class="mb-2 flex justify-between gap-3 text-xs font-medium text-slate-700">
                    <span>Fakultas Ilmu Sosial &amp; Ilmu Politik (FISIP)</span>
                    <span class="font-mono text-slate-500">680 Suara</span>
                  </div>
                  <div class="flex h-3 overflow-hidden rounded-full bg-slate-100">
                    <div class="h-full bg-brand-600" style="width: 23.5%" title="Paslon 01: 160"></div>
                    <div class="h-full bg-indigo-500" style="width: 72%" title="Paslon 02: 490"></div>
                    <div class="h-full bg-slate-400" style="width: 4.5%" title="Paslon 03: 30"></div>
                  </div>
                </div>

                <div>
                  <div class="mb-2 flex justify-between gap-3 text-xs font-medium text-slate-700">
                    <span>Fakultas Ekonomi &amp; Bisnis (FEB)</span>
                    <span class="font-mono text-slate-500">540 Suara</span>
                  </div>
                  <div class="flex h-3 overflow-hidden rounded-full bg-slate-100">
                    <div class="h-full bg-brand-600" style="width: 42.6%" title="Paslon 01: 230"></div>
                    <div class="h-full bg-indigo-500" style="width: 31.5%" title="Paslon 02: 170"></div>
                    <div class="h-full bg-slate-400" style="width: 25.9%" title="Paslon 03: 140"></div>
                  </div>
                </div>

                <div>
                  <div class="mb-2 flex justify-between gap-3 text-xs font-medium text-slate-700">
                    <span>Fakultas Hukum (FH)</span>
                    <span class="font-mono text-slate-500">400 Suara</span>
                  </div>
                  <div class="flex h-3 overflow-hidden rounded-full bg-slate-100">
                    <div class="h-full bg-brand-600" style="width: 16.2%" title="Paslon 01: 65"></div>
                    <div class="h-full bg-indigo-500" style="width: 18.8%" title="Paslon 02: 75"></div>
                    <div class="h-full bg-slate-400" style="width: 65%" title="Paslon 03: 260"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Audit Log -->
          <section class="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            <div class="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
              <div class="flex items-center gap-3">
                <span class="relative flex h-3 w-3 shrink-0">
                  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
                <div>
                  <h3 class="text-sm font-bold text-slate-900">Audit Log Transaksi Suara &amp; Cryptographic Ledger</h3>
                  <p class="mt-1 text-xs leading-5 text-slate-400">Riwayat verifikasi transaksi surat suara dan sinkronisasi ledger</p>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-medium text-slate-400">Filter:</span>
                <div class="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1 text-xs font-medium">
                  <button type="button" class="rounded-lg bg-white px-3 py-1.5 font-semibold text-slate-900 shadow-sm">Semua</button>
                  <button type="button" class="rounded-lg px-3 py-1.5 text-slate-500 transition hover:text-slate-800">Suara Masuk</button>
                  <button type="button" class="rounded-lg px-3 py-1.5 text-slate-500 transition hover:text-slate-800">Konsensus Node</button>
                </div>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full min-w-[850px] text-left text-xs">
                <thead class="border-b border-slate-100 bg-slate-50 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th class="px-4 py-4">Waktu (WIB)</th>
                    <th class="px-4 py-4">Ballot Hash / Transaction ID</th>
                    <th class="px-4 py-4">Verifikasi SHA-256</th>
                    <th class="px-4 py-4">Node Validator</th>
                    <th class="px-4 py-4">Status Ledger</th>
                    <th class="px-4 py-4 text-right">Aksi</th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-100 font-medium text-slate-700">
                  <tr class="transition hover:bg-slate-50/70">
                    <td class="whitespace-nowrap px-4 py-4 font-mono text-slate-500">17:34:02</td>
                    <td class="px-4 py-4">
                      <div class="flex items-center gap-2">
                        <span class="font-mono font-semibold text-slate-900">8f2a9c3d4e1...b17e4d</span>
                        <button type="button" title="Salin Hash" class="text-slate-400 transition hover:text-brand-600">
                          <span class="material-symbols-outlined text-base">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        <span class="material-symbols-outlined text-sm">check_circle</span> SHA-256 Valid
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 font-mono text-slate-600">Node #01 Kampus</td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center gap-1.5 font-semibold text-brand-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-brand-600"></span>
                        Tersinkronisasi &amp; Tersegel
                      </span>
                    </td>
                    <td class="px-4 py-4 text-right">
                      <button type="button" class="whitespace-nowrap font-semibold text-brand-600 hover:text-brand-800 hover:underline">Bukti Kripto →</button>
                    </td>
                  </tr>

                  <tr class="transition hover:bg-slate-50/70">
                    <td class="whitespace-nowrap px-4 py-4 font-mono text-slate-500">17:33:55</td>
                    <td class="px-4 py-4">
                      <div class="flex items-center gap-2">
                        <span class="font-mono font-semibold text-slate-900">7c19ba820f4...c992a1</span>
                        <button type="button" title="Salin Hash" class="text-slate-400 transition hover:text-brand-600">
                          <span class="material-symbols-outlined text-base">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        <span class="material-symbols-outlined text-sm">check_circle</span> SHA-256 Valid
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 font-mono text-slate-600">Node #03 Saksi BEM</td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center gap-1.5 font-semibold text-brand-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-brand-600"></span>
                        Tersinkronisasi &amp; Tersegel
                      </span>
                    </td>
                    <td class="px-4 py-4 text-right">
                      <button type="button" class="whitespace-nowrap font-semibold text-brand-600 hover:text-brand-800 hover:underline">Bukti Kripto →</button>
                    </td>
                  </tr>

                  <tr class="transition hover:bg-slate-50/70">
                    <td class="whitespace-nowrap px-4 py-4 font-mono text-slate-500">17:33:41</td>
                    <td class="px-4 py-4">
                      <div class="flex items-center gap-2">
                        <span class="font-mono font-semibold text-slate-900">3e990ad74c2...ff102b</span>
                        <button type="button" title="Salin Hash" class="text-slate-400 transition hover:text-brand-600">
                          <span class="material-symbols-outlined text-base">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        <span class="material-symbols-outlined text-sm">check_circle</span> SHA-256 Valid
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 font-mono text-slate-600">Node #02 KPU Kampus</td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center gap-1.5 font-semibold text-brand-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-brand-600"></span>
                        Tersinkronisasi &amp; Tersegel
                      </span>
                    </td>
                    <td class="px-4 py-4 text-right">
                      <button type="button" class="whitespace-nowrap font-semibold text-brand-600 hover:text-brand-800 hover:underline">Bukti Kripto →</button>
                    </td>
                  </tr>

                  <tr class="transition hover:bg-slate-50/70">
                    <td class="whitespace-nowrap px-4 py-4 font-mono text-slate-500">17:33:18</td>
                    <td class="px-4 py-4">
                      <div class="flex items-center gap-2">
                        <span class="font-mono font-semibold text-slate-900">1a44e59002b...da882e</span>
                        <button type="button" title="Salin Hash" class="text-slate-400 transition hover:text-brand-600">
                          <span class="material-symbols-outlined text-base">content_copy</span>
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-semibold text-emerald-700">
                        <span class="material-symbols-outlined text-sm">check_circle</span> SHA-256 Valid
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-4 py-4 font-mono text-slate-600">Node #04 DPM Mahasiswa</td>
                    <td class="px-4 py-4">
                      <span class="inline-flex items-center gap-1.5 font-semibold text-brand-700">
                        <span class="h-1.5 w-1.5 rounded-full bg-brand-600"></span>
                        Tersinkronisasi &amp; Tersegel
                      </span>
                    </td>
                    <td class="px-4 py-4 text-right">
                      <button type="button" class="whitespace-nowrap font-semibold text-brand-600 hover:text-brand-800 hover:underline">Bukti Kripto →</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex flex-col justify-between gap-3 border-t border-slate-100 bg-slate-50/50 p-4 text-xs text-slate-500 sm:flex-row sm:items-center">
              <span>Menampilkan 4 dari 3,420 transaksi surat suara terverifikasi</span>
              <div class="flex items-center gap-2">
                <button type="button" class="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-100">← Sebelumnya</button>
                <button type="button" class="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-600 transition hover:bg-slate-100">Berikutnya →</button>
              </div>
            </div>
          </section>

          <!-- Witness Verification -->
          <section class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div class="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <span class="material-symbols-outlined text-xl">contract</span>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-slate-900">Tanda Tangan Digital &amp; Validasi Saksi Sidang Pleno</h3>
                  <p class="mt-1 text-xs leading-5 text-slate-400">Validasi saksi resmi paslon dan perwakilan lembaga independen.</p>
                </div>
              </div>

              <span class="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-700 sm:self-auto">
                <span class="h-2 w-2 rounded-full bg-emerald-500"></span>
                Kuorum Lengkap (100% Ditandatangani)
              </span>
            </div>

            <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <article class="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-bold text-slate-900">Saksi Paslon 01</span>
                  <span class="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-800">TERVERIFIKASI</span>
                </div>
                <p class="mt-3 text-xs font-medium text-slate-600">Ahmad Ridwan (FT)</p>
                <div class="mt-3 space-y-1 border-t border-slate-200/70 pt-3 font-mono text-[10px] text-slate-400">
                  <p>Waktu: 17:15 WIB</p>
                  <p class="truncate text-slate-500">Key: 0x9f1a...4801</p>
                </div>
              </article>

              <article class="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-bold text-slate-900">Saksi Paslon 02</span>
                  <span class="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-800">TERVERIFIKASI</span>
                </div>
                <p class="mt-3 text-xs font-medium text-slate-600">Reza Pratama (FISIP)</p>
                <div class="mt-3 space-y-1 border-t border-slate-200/70 pt-3 font-mono text-[10px] text-slate-400">
                  <p>Waktu: 17:18 WIB</p>
                  <p class="truncate text-slate-500">Key: 0x3d4b...912a</p>
                </div>
              </article>

              <article class="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-bold text-slate-900">Saksi Paslon 03</span>
                  <span class="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-800">TERVERIFIKASI</span>
                </div>
                <p class="mt-3 text-xs font-medium text-slate-600">Intan Permata (FH)</p>
                <div class="mt-3 space-y-1 border-t border-slate-200/70 pt-3 font-mono text-[10px] text-slate-400">
                  <p>Waktu: 17:22 WIB</p>
                  <p class="truncate text-slate-500">Key: 0x7c...</p>
                </div>
              </article>

              <article class="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                <div class="flex items-center justify-between gap-2">
                  <span class="text-xs font-bold text-slate-900">Saksi Independen</span>
                  <span class="rounded-full bg-emerald-100 px-2 py-1 text-[9px] font-bold text-emerald-800">TERVERIFIKASI</span>
                </div>
                <p class="mt-3 text-xs font-medium text-slate-600">Perwakilan KPU Kampus</p>
                <div class="mt-3 space-y-1 border-t border-slate-200/70 pt-3 font-mono text-[10px] text-slate-400">
                  <p>Status: Ditandatangani</p>
                  <p class="truncate text-slate-500">Validasi: Digital Signature</p>
                </div>
              </article>
            </div>

            <div class="mt-5 flex flex-col gap-3 rounded-xl border border-brand-100 bg-brand-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-xl text-brand-600">shield_lock</span>
                <div>
                  <p class="text-xs font-bold text-slate-800">Integritas Berita Acara</p>
                  <p class="mt-1 text-[11px] leading-5 text-slate-500">Data tanda tangan ditampilkan sebagai ringkasan status validasi sidang pleno.</p>
                </div>
              </div>

              <button type="button" class="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-brand-700">
                <span class="material-symbols-outlined text-base">description</span>
                Lihat Berita Acara
              </button>
            </div>
          </section>

          <!-- Footer -->
          <footer class="flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-[10px] text-slate-400 sm:flex-row">
            <p>A-Vote Campus System · Admin Panel</p>
            <p>Pemilu Mahasiswa 2025 · Audit &amp; Rekapitulasi</p>
          </footer>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

:root {
  --brand-50: #f4f0ff;
  --brand-100: #ebe4ff;
  --brand-200: #d9cdff;
  --brand-500: #7546f6;
  --brand-600: #582be8;
  --brand-700: #471ec7;
  --brand-800: #3a1a9e;
  --brand-900: #31177e;
}

body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}

.font-heading {
  font-family: 'Plus Jakarta Sans', sans-serif;
}
</style>