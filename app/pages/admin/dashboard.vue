<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen bg-[#f8f9fc] text-slate-800 antialiased">

    <!-- =====================================================
         TOP NAVIGATION
    ====================================================== -->
    <header
      class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm"
    >
      <div
        class="px-4 sm:px-6 py-3 flex items-center justify-between"
      >

        <!-- Brand -->
        <div class="flex items-center gap-4 lg:gap-6">

          <div class="flex items-center gap-2.5">
            <div
              class="w-9 h-9 rounded-xl bg-[#582be8] flex items-center justify-center text-white shadow-md shadow-purple-600/20"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.2"
                />
              </svg>
            </div>

            <div class="flex items-center gap-2">
              <span
                class="text-xl font-bold tracking-tight text-[#582be8]"
              >
                A-Vote
              </span>

              <span
                class="text-xs px-2 py-0.5 rounded-md font-semibold bg-purple-50 text-purple-700 border border-purple-200"
              >
                Admin
              </span>
            </div>
          </div>

          <!-- Security Status -->
          <div
            class="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium"
          >
            <span
              class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
            ></span>

            <span>
              Sistem Enkripsi: Aktif &amp; Terlindungi (SHA-256)
            </span>
          </div>
        </div>

        <!-- Search -->
        <div class="hidden md:block w-72 lg:w-96">
          <div class="relative">

            <span
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Cari NIK, pemilih, atau ID pemilihan..."
              class="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#582be8] transition"
            />
          </div>
        </div>

        <!-- User -->
        <div class="flex items-center gap-3 sm:gap-4">

          <!-- Notification -->
          <button
            class="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>

            <span
              class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"
            ></span>
          </button>

          <div class="h-6 w-px bg-slate-200"></div>

          <!-- Profile -->
          <div class="flex items-center gap-3">

            <div
              class="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold flex items-center justify-center text-xs border border-purple-200"
            >
              AD
            </div>

            <div class="hidden sm:block text-left leading-tight">
              <p class="text-xs font-semibold text-slate-800">
                admin@gmail.com
              </p>

              <p class="text-[11px] text-[#582be8] font-medium">
                Super Administrator
              </p>
            </div>

            <NuxtLink
              to="/admin/login"
              class="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition"
            >
              Logout
            </NuxtLink>

          </div>
        </div>

      </div>
    </header>


    <!-- =====================================================
         SIDEBAR + MAIN
    ====================================================== -->
    <div class="flex min-h-[calc(100vh-65px)]">

      <!-- ===================================================
           SIDEBAR
      ==================================================== -->
      <aside
        class="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex"
      >

        <nav
          aria-label="Menu Admin"
          class="p-4 space-y-1.5"
        >

          <div
            class="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2"
          >
            Main Menu
          </div>

          <!-- Dashboard -->
          <NuxtLink
            to="/admin/dashboard"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold bg-purple-50 text-[#582be8] border border-purple-100 shadow-sm"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>

            <span>Dashboard</span>
          </NuxtLink>


          <!-- Elections -->
          <NuxtLink
            to="/admin/elections"
            class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            <div class="flex items-center gap-3">
              <svg
                class="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>

              <span>Pemilihan</span>
            </div>

            <span
              class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800"
            >
              3 Aktif
            </span>
          </NuxtLink>


          <!-- Voters -->
          <NuxtLink
            to="/admin/voters"
            class="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            <div class="flex items-center gap-3">

              <svg
                class="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>

              <span>Daftar Pemilih</span>
            </div>

            <span class="text-[11px] font-medium text-slate-400">
              DPT
            </span>
          </NuxtLink>


          <!-- Candidates -->
          <NuxtLink
            to="/admin/candidates"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            <svg
              class="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>

            <span>Kandidat &amp; Paslon</span>
          </NuxtLink>


          <!-- Audit -->
          <NuxtLink
            to="/admin/audit"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            <svg
              class="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>

            <span>Audit &amp; Rekapitulasi</span>
          </NuxtLink>


          <!-- Configuration -->
          <div
            class="pt-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2"
          >
            Konfigurasi
          </div>

          <NuxtLink
            to="/admin/settings"
            class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            <svg
              class="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 001.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />

              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>

            <span>Pengaturan Sistem</span>
          </NuxtLink>

        </nav>


        <!-- Sidebar Footer -->
        <div
          class="p-4 border-t border-slate-100 bg-slate-50/60"
        >
          <div
            class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm"
          >
            <div
              class="flex items-center gap-2 text-xs font-semibold text-slate-700"
            >
              <span
                class="w-2 h-2 rounded-full bg-emerald-500"
              ></span>

              <span>
                256-Bit SSL Enkripsi
              </span>
            </div>

            <p class="text-[11px] text-slate-500 mt-1">
              Konsensus node terverifikasi.
            </p>

            <div
              class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400"
            >
              <span>v2.4.0-Production</span>

              <span class="font-mono text-[#582be8]">
                ONLINE
              </span>
            </div>
          </div>
        </div>

      </aside>


      <!-- ===================================================
           MAIN CONTENT
      ==================================================== -->
      <main
        class="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8"
      >

        <!-- Page Header -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1
              class="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight"
            >
              Admin Dashboard
            </h1>

            <p class="text-xs sm:text-sm text-slate-500 mt-1">
              Pantau dan kelola seluruh pemilihan, verifikasi pemilih
              terdaftar, dan audit suara secara real-time.
            </p>
          </div>

          <div class="flex items-center gap-3">

            <button
              class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
            >
              <svg
                class="w-4 h-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a2 2 0 01.293.707V19a2 2 0 01-2 2z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>

              Export Laporan
            </button>

            <button
              class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v16m8-8H4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>

              Buat Pemilihan Baru
            </button>

          </div>
        </div>


        <!-- =================================================
             METRICS
        ================================================== -->
        <section
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8"
        >

          <!-- Total Elections -->
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-200 hover:shadow transition"
          >
            <div class="flex items-center justify-between">

              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Total Pemilihan
              </span>

              <span
                class="p-2 rounded-xl bg-purple-50 text-[#582be8]"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </span>
            </div>

            <div class="mt-3 flex items-baseline gap-2">
              <span class="text-3xl font-extrabold text-[#582be8]">
                12
              </span>

              <span
                class="text-xs font-medium text-emerald-600"
              >
                ↑ +2 periode ini
              </span>
            </div>

            <p class="text-xs text-slate-400 mt-2">
              Semua bilik suara yang dibuat
            </p>
          </div>


          <!-- Active Elections -->
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-200 hover:shadow transition"
          >
            <div class="flex items-center justify-between">

              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Pemilihan Aktif
              </span>

              <span
                class="p-2 rounded-xl bg-emerald-50 text-emerald-600"
              >
                ⚡
              </span>
            </div>

            <div class="mt-3 flex items-baseline gap-2">
              <span
                class="text-3xl font-extrabold text-emerald-600"
              >
                3
              </span>

              <span
                class="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800"
              >
                Live Voting
              </span>
            </div>

            <p class="text-xs text-slate-400 mt-2">
              Sedang menerima suara terenkripsi
            </p>
          </div>


          <!-- Total Voters -->
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-200 hover:shadow transition"
          >
            <div class="flex items-center justify-between">

              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Total Pemilih
              </span>

              <span
                class="p-2 rounded-xl bg-blue-50 text-blue-600"
              >
                👥
              </span>
            </div>

            <div class="mt-3 flex items-baseline gap-2">
              <span
                class="text-3xl font-extrabold text-blue-600"
              >
                4,850
              </span>

              <span class="text-xs font-medium text-slate-500">
                Terverifikasi DPT
              </span>
            </div>

            <p class="text-xs text-slate-400 mt-2">
              Identitas NIK tervalidasi
            </p>
          </div>


          <!-- Votes -->
          <div
            class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 hover:shadow transition"
          >
            <div class="flex items-center justify-between">

              <span
                class="text-xs font-semibold text-slate-500 uppercase tracking-wider"
              >
                Suara Masuk
              </span>

              <span
                class="p-2 rounded-xl bg-indigo-50 text-indigo-600"
              >
                ✓
              </span>
            </div>

            <div class="mt-3 flex items-baseline gap-2">
              <span
                class="text-3xl font-extrabold text-indigo-600"
              >
                3,420
              </span>

              <span
                class="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700"
              >
                70.5% Turnout
              </span>
            </div>

            <p class="text-xs text-slate-400 mt-2">
              Partisipasi real-time gabungan
            </p>
          </div>

        </section>


        <!-- =================================================
             CONTENT GRID
        ================================================== -->
        <div
          class="grid grid-cols-1 xl:grid-cols-3 gap-8"
        >

          <!-- ===============================================
               ELECTION TABLE
          ================================================ -->
          <section
            class="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >

            <div
              class="flex items-center justify-between pb-4 border-b border-slate-100"
            >
              <div>
                <h2
                  class="text-base font-bold text-slate-900"
                >
                  Pemilihan Aktif &amp; Terjadwal
                </h2>

                <p class="text-xs text-slate-500">
                  Daftar pemilihan yang sedang berlangsung atau akan datang.
                </p>
              </div>

              <NuxtLink
                to="/admin/elections"
                class="text-xs font-semibold text-[#582be8] hover:text-purple-700"
              >
                Lihat Semua →
              </NuxtLink>
            </div>


            <!-- Table -->
            <div class="overflow-x-auto mt-4">

              <table
                class="w-full text-left text-xs text-slate-600"
              >
                <thead
                  class="text-[11px] uppercase bg-slate-50 text-slate-400 font-semibold"
                >
                  <tr>
                    <th class="py-3 px-4 rounded-l-lg">
                      Nama Pemilihan
                    </th>

                    <th class="py-3 px-3">
                      Status
                    </th>

                    <th class="py-3 px-3">
                      Partisipasi
                    </th>

                    <th class="py-3 px-3">
                      Batas Waktu
                    </th>

                    <th class="py-3 px-4 text-right rounded-r-lg">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody
                  class="divide-y divide-slate-100"
                >

                  <!-- Row 1 -->
                  <tr class="hover:bg-slate-50/60 transition">

                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-2.5">

                        <div
                          class="w-2 h-2 rounded-full bg-emerald-500"
                        ></div>

                        <div>
                          <div
                            class="text-slate-900 font-bold"
                          >
                            Pemilihan Raya Ketua BEM 2025
                          </div>

                          <div
                            class="text-[11px] text-slate-400"
                          >
                            ID: #VOTE-2025-01
                          </div>
                        </div>

                      </div>
                    </td>

                    <td class="py-3.5 px-3">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800"
                      >
                        Berlangsung
                      </span>
                    </td>

                    <td class="py-3.5 px-3">
                      <div class="w-36">

                        <div
                          class="flex justify-between text-[10px] text-slate-500 font-medium mb-1"
                        >
                          <span>78.4%</span>
                          <span>2,150 / 2,740</span>
                        </div>

                        <div
                          class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"
                        >
                          <div
                            class="h-full bg-[#582be8] rounded-full"
                            style="width: 78.4%"
                          ></div>
                        </div>

                      </div>
                    </td>

                    <td
                      class="py-3.5 px-3 whitespace-nowrap"
                    >
                      28 Feb 2025, 17:00 WIB
                    </td>

                    <td
                      class="py-3.5 px-4 text-right"
                    >
                      <button
                        class="px-2.5 py-1 text-xs font-semibold rounded-lg text-[#582be8] hover:bg-purple-50 border border-purple-200 transition"
                      >
                        Monitor
                      </button>
                    </td>

                  </tr>


                  <!-- Row 2 -->
                  <tr class="hover:bg-slate-50/60 transition">

                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-2.5">

                        <div
                          class="w-2 h-2 rounded-full bg-emerald-500"
                        ></div>

                        <div>
                          <div
                            class="text-slate-900 font-bold"
                          >
                            Dewan Perwakilan Mahasiswa (DPM)
                          </div>

                          <div
                            class="text-[11px] text-slate-400"
                          >
                            ID: #VOTE-2025-02
                          </div>
                        </div>

                      </div>
                    </td>

                    <td class="py-3.5 px-3">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800"
                      >
                        Berlangsung
                      </span>
                    </td>

                    <td class="py-3.5 px-3">
                      <div class="w-36">

                        <div
                          class="flex justify-between text-[10px] text-slate-500 font-medium mb-1"
                        >
                          <span>62.6%</span>
                          <span>1,270 / 2,028</span>
                        </div>

                        <div
                          class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"
                        >
                          <div
                            class="h-full bg-[#582be8] rounded-full"
                            style="width: 62.6%"
                          ></div>
                        </div>

                      </div>
                    </td>

                    <td
                      class="py-3.5 px-3 whitespace-nowrap"
                    >
                      01 Mar 2025, 20:00 WIB
                    </td>

                    <td
                      class="py-3.5 px-4 text-right"
                    >
                      <button
                        class="px-2.5 py-1 text-xs font-semibold rounded-lg text-[#582be8] hover:bg-purple-50 border border-purple-200 transition"
                      >
                        Monitor
                      </button>
                    </td>

                  </tr>


                  <!-- Row 3 -->
                  <tr class="hover:bg-slate-50/60 transition">

                    <td class="py-3.5 px-4">
                      <div class="flex items-center gap-2.5">

                        <div
                          class="w-2 h-2 rounded-full bg-amber-400"
                        ></div>

                        <div>
                          <div
                            class="text-slate-900 font-bold"
                          >
                            Pemilihan Ketua Himpunan Informatika
                          </div>

                          <div
                            class="text-[11px] text-slate-400"
                          >
                            ID: #VOTE-2025-03
                          </div>
                        </div>

                      </div>
                    </td>

                    <td class="py-3.5 px-3">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800"
                      >
                        Terjadwal
                      </span>
                    </td>

                    <td class="py-3.5 px-3">
                      <div class="w-36">

                        <div
                          class="flex justify-between text-[10px] text-slate-400 font-medium mb-1"
                        >
                          <span>0%</span>
                          <span>0 / 820</span>
                        </div>

                        <div
                          class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"
                        >
                          <div
                            class="h-full bg-slate-300 rounded-full"
                            style="width: 0%"
                          ></div>
                        </div>

                      </div>
                    </td>

                    <td
                      class="py-3.5 px-3 text-slate-500 whitespace-nowrap"
                    >
                      Mulai: 05 Mar 2025
                    </td>

                    <td
                      class="py-3.5 px-4 text-right"
                    >
                      <button
                        class="px-2.5 py-1 text-xs font-semibold rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
                      >
                        Edit Data
                      </button>
                    </td>

                  </tr>

                </tbody>
              </table>

            </div>


            <!-- Quick Actions -->
            <div
              class="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs"
            >
              <span class="text-slate-500">
                Menampilkan 3 pemilihan aktif &amp; terjadwal teratas
              </span>

              <div class="flex items-center gap-2">

                <button
                  class="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition font-medium"
                >
                  Validasi DPT Massal
                </button>

                <button
                  class="px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition font-medium"
                >
                  Kunci Bilik Suara
                </button>

              </div>
            </div>

          </section>


          <!-- ===============================================
               AUDIT LOG
          ================================================ -->
          <section
            class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between"
          >

            <div>

              <div
                class="flex items-center justify-between pb-3 border-b border-slate-100"
              >
                <div class="flex items-center gap-2">

                  <span
                    class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"
                  ></span>

                  <h3
                    class="text-sm font-bold text-slate-900"
                  >
                    Audit Suara &amp; Log Real-Time
                  </h3>

                </div>

                <span
                  class="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                >
                  Live Ledger
                </span>
              </div>


              <div class="mt-4 space-y-3.5">

                <!-- Audit 1 -->
                <div
                  class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div
                    class="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0"
                  >
                    ✓
                  </div>

                  <div class="text-xs">
                    <p class="font-semibold text-slate-800">
                      Suara berhasil dienkripsi
                    </p>

                    <p
                      class="text-[11px] font-mono text-slate-500 truncate"
                    >
                      Hash: 8f2a9c3...b17e4d
                    </p>

                    <span class="text-[10px] text-slate-400">
                      12 detik yang lalu • Node #04
                    </span>
                  </div>
                </div>


                <!-- Audit 2 -->
                <div
                  class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div
                    class="p-1.5 rounded-lg bg-blue-100 text-blue-700 shrink-0"
                  >
                    ◉
                  </div>

                  <div class="text-xs">
                    <p class="font-semibold text-slate-800">
                      Pemilih Terverifikasi
                    </p>

                    <p
                      class="text-[11px] text-slate-500 font-mono"
                    >
                      NIK: 3273**********44
                    </p>

                    <span class="text-[10px] text-slate-400">
                      48 detik yang lalu • Token generated
                    </span>
                  </div>
                </div>


                <!-- Audit 3 -->
                <div
                  class="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div
                    class="p-1.5 rounded-lg bg-purple-100 text-purple-700 shrink-0"
                  >
                    ↻
                  </div>

                  <div class="text-xs">
                    <p class="font-semibold text-slate-800">
                      Konsensus Blok Tersinkron
                    </p>

                    <p class="text-[11px] text-slate-500">
                      Blok #104,912 tervalidasi oleh 5 validator
                    </p>

                    <span class="text-[10px] text-slate-400">
                      2 menit yang lalu
                    </span>
                  </div>
                </div>

              </div>

            </div>


            <!-- Cryptographic Status -->
            <div
              class="mt-6 pt-4 border-t border-slate-100"
            >
              <div
                class="p-3 bg-purple-50/60 rounded-xl border border-purple-100 flex items-center justify-between"
              >
                <div>
                  <p
                    class="text-xs font-bold text-purple-800"
                  >
                    Integritas Kriptografi
                  </p>

                  <p
                    class="text-[10px] text-purple-600"
                  >
                    Zero tampering detected
                  </p>
                </div>

                <button
                  class="text-xs font-semibold text-purple-700 hover:text-purple-800 underline"
                >
                  Unduh Audit
                </button>
              </div>
            </div>

          </section>

        </div>

      </main>

    </div>
  </div>
</template>