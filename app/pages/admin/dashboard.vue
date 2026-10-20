<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})
</script>

<template>
  <div>


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

  </div>
</template>