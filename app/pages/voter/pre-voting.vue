<script setup lang="ts">
import { ref } from 'vue'

const agreed = ref(false)
</script>

<template>
  <div class="min-h-screen bg-[#f8f9ff] text-slate-900">

    <!-- =====================================================
         HEADER
    ====================================================== -->
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-purple-100/60 shadow-sm"
    >
      <div
        class="h-20 max-w-[1216px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4"
      >

        <!-- Brand -->
        <div class="flex items-center gap-6">

          <NuxtLink
            to="/voter"
            class="flex items-center gap-2"
          >
            <div
              class="w-10 h-10 rounded-xl bg-[#582be8] flex items-center justify-center text-white shadow-md shadow-purple-600/20"
            >
              <span class="text-xl">🗳️</span>
            </div>

            <div class="flex flex-col">
              <span
                class="text-lg font-bold tracking-tight text-[#582be8] leading-none"
              >
                A-VOTE
              </span>

              <span
                class="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-1"
              >
                Sovereign Trust
              </span>
            </div>
          </NuxtLink>

          <!-- Election Status -->
          <div
            class="hidden lg:flex items-center gap-2 pl-5 border-l border-slate-200"
          >
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-mono"
            >
              <span
                class="w-2 h-2 rounded-full bg-[#582be8] animate-pulse"
              ></span>

              Pemilihan Raya BEM 2025
            </div>

            <div
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#582be8] text-[10px] font-mono"
            >
              <span>🔒</span>

              Enkripsi End-to-End Aktif
            </div>
          </div>

        </div>


        <!-- Navigation -->
        <nav class="hidden md:flex items-center gap-1">

          <NuxtLink
            to="/voter"
            class="px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            Bilik Suara
          </NuxtLink>

          <NuxtLink
            to="/voter/candidates"
            class="px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            Kandidat
          </NuxtLink>

          <NuxtLink
            to="/voter/audit"
            class="px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            Audit Kriptografis
          </NuxtLink>

          <NuxtLink
            to="/voter/guide"
            class="px-4 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            Panduan
          </NuxtLink>

        </nav>


        <!-- User -->
        <div class="flex items-center gap-3">

          <div class="hidden sm:flex flex-col text-right leading-tight">
            <span class="text-sm font-semibold text-slate-800">
              Ahmad Fauzi
            </span>

            <span class="text-[10px] font-mono text-slate-400">
              Mhs. Aktif / NIK: 3271****48
            </span>
          </div>

          <div
            class="w-8 h-8 rounded-full bg-[#582be8] flex items-center justify-center text-white ring-2 ring-purple-100"
          >
            👤
          </div>

          <NuxtLink
            to="/voter/login"
            class="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            title="Keluar"
          >
            ↪
          </NuxtLink>

        </div>

      </div>
    </header>


    <!-- =====================================================
         MAIN
    ====================================================== -->
    <main class="pt-20 min-h-screen">

      <div class="relative overflow-hidden">

        <!-- Ambient Background -->
        <div
          class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl pointer-events-none"
        ></div>

        <div
          class="absolute top-96 -left-32 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"
        ></div>


        <div
          class="relative max-w-[1216px] mx-auto px-4 lg:px-8 py-8 lg:py-12"
        >

          <!-- =================================================
               SESSION IDENTITY
          ================================================== -->
          <section
            class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-white shadow-sm border border-purple-100/50"
          >

            <div
              class="flex flex-wrap items-center gap-2 text-xs text-slate-500"
            >

              <div
                class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#582be8] font-mono font-semibold"
              >
                <span
                  class="w-1.5 h-1.5 rounded-full bg-[#582be8] animate-ping"
                ></span>

                SIAKAD AUTHENTICATED
              </div>

              <span class="text-slate-300">•</span>

              <div class="flex items-center gap-2 text-slate-800">
                <span class="text-[#582be8]">🪪</span>

                <span class="font-semibold">
                  Ahmad Fauzi
                </span>

                <span class="font-mono text-slate-400">
                  (22.11.1234)
                </span>
              </div>

              <span class="text-slate-300">•</span>

              <span>
                Fakultas Teknik Informatika
              </span>

            </div>


            <div
              class="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-100 text-[#582be8] font-mono text-[10px] font-medium self-start lg:self-center"
            >
              ⚖️

              PRA-BILIK SUARA:
              WAJIB DISETUJUI
            </div>

          </section>


          <!-- =================================================
               PROGRESS STEPPER
          ================================================== -->
          <section class="mb-12">

            <div
              class="p-6 rounded-xl bg-white shadow-sm border border-purple-100/50"
            >

              <div
                class="flex items-center justify-between mb-3"
              >
                <span
                  class="text-[10px] font-mono text-[#582be8] font-semibold uppercase tracking-wider"
                >
                  Progres Alur Pemilihan
                </span>

                <span
                  class="text-xs font-mono font-semibold text-slate-800"
                >
                  Tahap 2 dari 4 (50%)
                </span>
              </div>


              <div
                class="grid grid-cols-1 md:grid-cols-4 gap-3"
              >

                <!-- Step 1 -->
                <div
                  class="flex items-center gap-3 p-3 rounded-lg bg-slate-50"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-[#582be8] text-white flex items-center justify-center shrink-0"
                  >
                    ✓
                  </div>

                  <div class="min-w-0">
                    <span
                      class="block text-[10px] font-mono text-slate-400"
                    >
                      Tahap 01
                    </span>

                    <span
                      class="block text-sm font-semibold truncate"
                    >
                      Autentikasi SIAKAD
                    </span>
                  </div>
                </div>


                <!-- Step 2 -->
                <div
                  class="flex items-center gap-3 p-3 rounded-lg bg-purple-100 text-purple-900"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-[#582be8] text-white flex items-center justify-center font-mono font-bold shrink-0 shadow-sm"
                  >
                    2
                  </div>

                  <div class="min-w-0">
                    <span
                      class="block text-[10px] font-mono text-purple-700 font-medium"
                    >
                      Tahap Saat Ini
                    </span>

                    <span
                      class="block text-sm font-bold truncate"
                    >
                      Ketentuan &amp; Regulasi
                    </span>
                  </div>
                </div>


                <!-- Step 3 -->
                <div
                  class="flex items-center gap-3 p-3 rounded-lg bg-slate-50 opacity-60"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-mono shrink-0"
                  >
                    3
                  </div>

                  <div class="min-w-0">
                    <span
                      class="block text-[10px] font-mono text-slate-400"
                    >
                      Tahap 03
                    </span>

                    <span
                      class="block text-sm font-semibold text-slate-500 truncate"
                    >
                      Bilik Suara Digital
                    </span>
                  </div>
                </div>


                <!-- Step 4 -->
                <div
                  class="flex items-center gap-3 p-3 rounded-lg bg-slate-50 opacity-60"
                >
                  <div
                    class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-mono shrink-0"
                  >
                    4
                  </div>

                  <div class="min-w-0">
                    <span
                      class="block text-[10px] font-mono text-slate-400"
                    >
                      Tahap 04
                    </span>

                    <span
                      class="block text-sm font-semibold text-slate-500 truncate"
                    >
                      Bukti Kriptografis
                    </span>
                  </div>
                </div>

              </div>

            </div>

          </section>


          <!-- =================================================
               HERO / REGULATION HEADER
          ================================================== -->
          <section class="mb-12">

            <div
              class="relative overflow-hidden rounded-xl bg-white p-6 lg:p-12 shadow-sm border border-purple-100/50"
            >

              <div class="relative z-10 max-w-4xl">

                <div
                  class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-mono font-semibold mb-5"
                >
                  ✓

                  Keputusan KPU Mahasiswa
                  No. 04/KPU-M/PEMIRA/2025
                </div>

                <h1
                  class="text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mb-3"
                >
                  Ketentuan Pemilihan &amp;
                  Tata Tertib Bilik Suara Digital
                </h1>

                <p
                  class="text-base lg:text-lg text-slate-500 leading-relaxed mb-6"
                >
                  Sesuai Keputusan Komisi Pemilihan Umum Mahasiswa
                  (KPU-M) Tahun 2025. Mohon baca, cermati, dan setujui
                  pedoman integritas pemilu sebelum membuka surat suara
                  elektronik resmi Anda.
                </p>


                <!-- Timer -->
                <div
                  class="inline-flex flex-wrap items-center gap-4 p-4 rounded-xl bg-purple-50 text-[#582be8]"
                >

                  <div
                    class="flex items-center gap-2 text-xs font-mono font-semibold"
                  >
                    <span class="text-lg">⏱</span>

                    Batas Waktu Penggunaan Sesi Bilik:
                  </div>

                  <div
                    class="inline-flex items-center px-3 py-1 rounded-md bg-white shadow-sm text-[#582be8] font-mono text-xs font-bold"
                  >
                    15:00 Menit
                  </div>

                  <span
                    class="text-xs text-slate-500"
                  >
                    Dihitung otomatis saat tombol masuk bilik suara diklik.
                  </span>

                </div>

              </div>


              <!-- Watermark -->
              <div
                class="absolute -right-8 -bottom-10 opacity-[0.04] pointer-events-none select-none text-[#582be8] text-[220px]"
              >
                ⚖
              </div>

            </div>

          </section>


          <!-- =================================================
               TWO COLUMN CONTENT
          ================================================== -->
          <div
            class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >

            <!-- =================================================
                 LEFT COLUMN
            ================================================== -->
            <div
              class="lg:col-span-7 flex flex-col gap-8"
            >

              <!-- 5 Rules -->
              <section
                class="p-6 lg:p-8 rounded-xl bg-white shadow-sm border border-purple-100/50"
              >

                <div
                  class="flex items-center justify-between mb-6 pb-3 border-b border-slate-100"
                >

                  <div class="flex items-center gap-3">

                    <div
                      class="w-10 h-10 rounded-xl bg-purple-100 text-[#582be8] flex items-center justify-center"
                    >
                      ⚖
                    </div>

                    <div>
                      <h2
                        class="text-xl font-semibold text-slate-900"
                      >
                        5 Aturan Wajib Pemilih
                      </h2>

                      <span
                        class="text-[10px] font-mono text-slate-500"
                      >
                        Prinsip Konstitusional LUBER JURDIL
                      </span>
                    </div>

                  </div>

                  <span
                    class="hidden sm:inline-flex px-3 py-1 rounded-full bg-slate-100 text-[10px] font-mono text-[#582be8]"
                  >
                    Pasal 12 PKPU-M
                  </span>

                </div>


                <div class="flex flex-col gap-4">

                  <!-- Rule 1 -->
                  <div
                    class="p-4 rounded-xl bg-slate-50 flex gap-4"
                  >
                    <div
                      class="w-8 h-8 rounded-lg bg-[#582be8] text-white flex items-center justify-center font-mono font-bold shrink-0"
                    >
                      1
                    </div>

                    <div>
                      <div
                        class="flex flex-wrap items-center gap-2"
                      >
                        <span
                          class="text-base font-bold text-slate-900"
                        >
                          Hak Pilih Tunggal (Single-Vote)
                        </span>

                        <span
                          class="px-1.5 py-0.5 rounded bg-white text-[#582be8] text-[10px] font-mono font-semibold"
                        >
                          1 NIM = 1 Suara
                        </span>
                      </div>

                      <p
                        class="text-sm text-slate-500 leading-relaxed mt-1"
                      >
                        Setiap mahasiswa aktif yang terdaftar dalam DPT
                        hanya berhak memberikan 1 (satu) suara sah.
                        Setelah suara dikirim, hak pilih Anda langsung
                        berstatus final dan terkunci permanen di sistem.
                      </p>
                    </div>
                  </div>


                  <!-- Rule 2 -->
                  <div
                    class="p-4 rounded-xl bg-slate-50 flex gap-4"
                  >
                    <div
                      class="w-8 h-8 rounded-lg bg-[#582be8] text-white flex items-center justify-center font-mono font-bold shrink-0"
                    >
                      2
                    </div>

                    <div>
                      <div
                        class="flex flex-wrap items-center gap-2"
                      >
                        <span
                          class="text-base font-bold text-slate-900"
                        >
                          Kerahasiaan Mutlak (Zero-Knowledge)
                        </span>

                        <span
                          class="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-mono font-semibold"
                        >
                          ZKP Enkripsi
                        </span>
                      </div>

                      <p
                        class="text-sm text-slate-500 leading-relaxed mt-1"
                      >
                        Pilihan Anda dienkripsi secara asimetris di
                        peramban (client-side). Panitia KPU, saksi paslon,
                        dan administrator basis data tidak dapat
                        mengaitkan identitas diri Anda dengan paslon
                        yang Anda pilih.
                      </p>
                    </div>
                  </div>


                  <!-- Rule 3 -->
                  <div
                    class="p-4 rounded-xl bg-slate-50 flex gap-4"
                  >
                    <div
                      class="w-8 h-8 rounded-lg bg-[#582be8] text-white flex items-center justify-center font-mono font-bold shrink-0"
                    >
                      3
                    </div>

                    <div>
                      <div
                        class="flex flex-wrap items-center gap-2"
                      >
                        <span
                          class="text-base font-bold text-slate-900"
                        >
                          Larangan Dokumentasi di Bilik
                        </span>

                        <span
                          class="px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px] font-mono font-semibold"
                        >
                          Dilarang Screenshot
                        </span>
                      </div>

                      <p
                        class="text-sm text-slate-500 leading-relaxed mt-1"
                      >
                        Dilarang keras mengambil tangkapan layar
                        (screenshot), merekam video, atau memotret
                        tampilan surat suara saat mencoblos untuk
                        keperluan jual-beli suara atau pembuktian
                        paksaan oleh pihak mana pun.
                      </p>
                    </div>
                  </div>


                  <!-- Rule 4 -->
                  <div
                    class="p-4 rounded-xl bg-slate-50 flex gap-4"
                  >
                    <div
                      class="w-8 h-8 rounded-lg bg-[#582be8] text-white flex items-center justify-center font-mono font-bold shrink-0"
                    >
                      4
                    </div>

                    <div>
                      <div
                        class="flex flex-wrap items-center gap-2"
                      >
                        <span
                          class="text-base font-bold text-slate-900"
                        >
                          Larangan Joki &amp; Pengalihan Hak
                        </span>

                        <span
                          class="px-1.5 py-0.5 rounded bg-white text-[#582be8] text-[10px] font-mono font-semibold"
                        >
                          Otentik Mandiri
                        </span>
                      </div>

                      <p
                        class="text-sm text-slate-500 leading-relaxed mt-1"
                      >
                        Akses login menggunakan kredensial SIAKAD
                        bersifat privat. Menyerahkan akun kepada tim
                        sukses, pasangan calon, atau pihak ketiga
                        merupakan pelanggaran pidana kampus.
                      </p>
                    </div>
                  </div>


                  <!-- Rule 5 -->
                  <div
                    class="p-4 rounded-xl bg-slate-50 flex gap-4"
                  >
                    <div
                      class="w-8 h-8 rounded-lg bg-[#582be8] text-white flex items-center justify-center font-mono font-bold shrink-0"
                    >
                      5
                    </div>

                    <div>
                      <div
                        class="flex flex-wrap items-center gap-2"
                      >
                        <span
                          class="text-base font-bold text-slate-900"
                        >
                          Token Sesi Sekali Pakai
                        </span>

                        <span
                          class="px-1.5 py-0.5 rounded bg-white text-[#582be8] text-[10px] font-mono font-semibold"
                        >
                          One-Time Token
                        </span>
                      </div>

                      <p
                        class="text-sm text-slate-500 leading-relaxed mt-1"
                      >
                        Begitu Anda menekan tombol
                        <strong class="text-slate-900">
                          "Kirim &amp; Kunci Suara"
                        </strong>,
                        token otentikasi voting Anda segera dimusnahkan
                        oleh ledger node. Tidak ada pembatalan suara
                        setelah transaksi dikonfirmasi.
                      </p>
                    </div>
                  </div>

                </div>

              </section>


              <!-- Sanctions -->
              <section
                class="p-6 lg:p-8 rounded-xl bg-white shadow-sm border border-purple-100/50"
              >

                <div class="flex items-start gap-4">

                  <div
                    class="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0"
                  >
                    ⚠
                  </div>

                  <div>

                    <h2
                      class="text-xl font-semibold text-slate-900"
                    >
                      Konsekuensi Hukum &amp; Sanksi Akademik
                    </h2>

                    <span
                      class="text-[10px] font-mono text-red-600 font-medium"
                    >
                      Berdasarkan UU Ormawa &amp; Pemira Mahasiswa Pasal 38
                    </span>

                    <p
                      class="text-sm text-slate-500 leading-relaxed mt-2"
                    >
                      Segala bentuk kecurangan, pemalsuan identitas,
                      intimidasi pemilih, atau manipulasi aliran data
                      voting akan ditindak lanjuti oleh Dewan Kehormatan
                      Pemilihan dan Panitia Pengawas Pemilu (Panwaslu).
                    </p>

                    <div
                      class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3"
                    >

                      <div
                        class="p-3 rounded-lg bg-slate-50 flex items-center gap-2"
                      >
                        <span class="text-red-500">✕</span>

                        <span
                          class="text-xs font-semibold text-slate-800"
                        >
                          Pembatalan Hak Pilih Terdaftar
                        </span>
                      </div>

                      <div
                        class="p-3 rounded-lg bg-slate-50 flex items-center gap-2"
                      >
                        <span class="text-red-500">⚖</span>

                        <span
                          class="text-xs font-semibold text-slate-800"
                        >
                          Sanksi Skorsing Akademik 1 Semester
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

              </section>

            </div>


            <!-- =================================================
                 RIGHT COLUMN
            ================================================== -->
            <div
              class="lg:col-span-5 flex flex-col gap-8"
            >

              <!-- Timeline -->
              <section
                class="p-6 lg:p-8 rounded-xl bg-white shadow-sm border border-purple-100/50"
              >

                <div
                  class="flex items-center justify-between mb-6 pb-3 border-b border-slate-100"
                >

                  <div class="flex items-center gap-3">

                    <div
                      class="w-10 h-10 rounded-xl bg-purple-100 text-[#582be8] flex items-center justify-center"
                    >
                      📅
                    </div>

                    <div>
                      <h2
                        class="text-xl font-semibold text-slate-900"
                      >
                        Jadwal Pasca-Pemilihan
                      </h2>

                      <span
                        class="text-[10px] text-slate-500"
                      >
                        Tahapan Resmi Pengumuman Hasil
                      </span>
                    </div>

                  </div>

                  <span
                    class="text-[10px] font-mono text-[#582be8] font-bold"
                  >
                    WIB (GMT+7)
                  </span>

                </div>


                <!-- Timeline -->
                <div class="relative pl-6 space-y-7">

                  <div
                    class="absolute left-2.5 top-3 bottom-3 w-0.5 bg-slate-200"
                  ></div>


                  <!-- Timeline 1 -->
                  <div class="relative">

                    <div
                      class="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#582be8] flex items-center justify-center ring-4 ring-white"
                    >
                      <span
                        class="w-2 h-2 rounded-full bg-white"
                      ></span>
                    </div>

                    <div
                      class="flex items-center justify-between gap-2"
                    >
                      <span
                        class="text-[10px] font-mono text-[#582be8] font-bold uppercase"
                      >
                        Hari Ini • 16:00 WIB
                      </span>

                      <span
                        class="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-mono"
                      >
                        Gate Closed
                      </span>
                    </div>

                    <span
                      class="block text-base font-bold text-slate-900 mt-1"
                    >
                      Penutupan Bilik Suara Elektronik
                    </span>

                    <p
                      class="text-xs text-slate-500 leading-relaxed mt-1"
                    >
                      Penerimaan suara baru otomatis dihentikan oleh
                      smart contract. Sesi voting yang belum difinalisasi
                      dinyatakan kedaluwarsa.
                    </p>

                  </div>


                  <!-- Timeline 2 -->
                  <div class="relative">

                    <div
                      class="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center ring-4 ring-white"
                    >
                      <span
                        class="w-2 h-2 rounded-full bg-white"
                      ></span>
                    </div>

                    <div
                      class="flex items-center justify-between gap-2"
                    >
                      <span
                        class="text-[10px] font-mono text-purple-600 font-bold uppercase"
                      >
                        16:30 – 17:30 WIB
                      </span>

                      <span
                        class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-mono font-semibold"
                      >
                        Audit Kripto
                      </span>
                    </div>

                    <span
                      class="block text-base font-bold text-slate-900 mt-1"
                    >
                      Verifikasi Kriptografi &amp; Kuorum Saksi
                    </span>

                    <p
                      class="text-xs text-slate-500 leading-relaxed mt-1"
                    >
                      Penyegelan ledger voting multi-party computation
                      (MPC) dan penandatanganan sertifikat kunci publik
                      bersama seluruh saksi paslon.
                    </p>

                  </div>


                  <!-- Timeline 3 -->
                  <div class="relative">

                    <div
                      class="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#582be8] flex items-center justify-center ring-4 ring-white"
                    >
                      <span
                        class="w-2 h-2 rounded-full bg-white"
                      ></span>
                    </div>

                    <div
                      class="flex items-center justify-between gap-2"
                    >
                      <span
                        class="text-[10px] font-mono text-[#582be8] font-bold uppercase"
                      >
                        18:00 WIB
                      </span>

                      <span
                        class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-mono font-semibold"
                      >
                        <span
                          class="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"
                        ></span>

                        Live Streaming
                      </span>
                    </div>

                    <span
                      class="block text-base font-bold text-slate-900 mt-1"
                    >
                      Sidang Pleno &amp; Live Count Terbuka
                    </span>

                    <p
                      class="text-xs text-slate-500 leading-relaxed mt-1"
                    >
                      Perhitungan suara diproyeksikan langsung di Gedung
                      Student Center lantai 3 serta ditayangkan secara
                      langsung melalui kanal resmi YouTube KPU-M.
                    </p>

                  </div>


                  <!-- Timeline 4 -->
                  <div class="relative">

                    <div
                      class="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center ring-4 ring-white"
                    >
                      <span
                        class="w-2 h-2 rounded-full bg-slate-500"
                      ></span>
                    </div>

                    <div
                      class="flex items-center justify-between gap-2"
                    >
                      <span
                        class="text-[10px] font-mono text-slate-400 font-bold uppercase"
                      >
                        20:00 WIB
                      </span>

                      <span
                        class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-mono"
                      >
                        Final SK
                      </span>
                    </div>

                    <span
                      class="block text-base font-bold text-slate-900 mt-1"
                    >
                      Penetapan Pemenang &amp; SK Terbuka
                    </span>

                    <p
                      class="text-xs text-slate-500 leading-relaxed mt-1"
                    >
                      Penerbitan Berita Acara Rekapitulasi Suara dan SK
                      Penetapan Presma &amp; Wapresma Terpilih di portal
                      publik A-Vote.
                    </p>

                  </div>

                </div>

              </section>


              <!-- Ballot Receipt -->
              <section
                class="p-6 rounded-xl bg-purple-50 border border-purple-100"
              >

                <div
                  class="flex items-center gap-2 text-[#582be8]"
                >
                  <span>🧾</span>

                  <span
                    class="text-[10px] font-mono font-bold uppercase tracking-wider"
                  >
                    Transparansi Pemilih
                  </span>
                </div>

                <h2
                  class="text-xl font-semibold text-slate-900 mt-2"
                >
                  Stempel Kriptografis &amp; Bukti Suara
                </h2>

                <p
                  class="text-xs text-slate-500 leading-relaxed mt-2"
                >
                  Setelah selesai mencoblos di bilik suara, sistem akan
                  membuat <strong class="text-slate-800">Ballot Receipt Hash</strong>
                  unik dan kode QR. Anda dapat mengunduh atau menyimpannya
                  untuk memvalidasi bahwa suara Anda telah dihitung pada
                  saat Pleno tanpa membuka rahasia paslon yang Anda pilih.
                </p>

                <div
                  class="flex items-center gap-2 mt-3 text-[#582be8] text-[10px] font-mono font-semibold"
                >
                  ✓

                  Protokol Verifikasi Mandiri Terbuka (Public Audit)
                </div>

              </section>


              <!-- Helpdesk -->
              <section
                class="p-6 rounded-xl bg-white shadow-sm border border-purple-100/50"
              >

                <div
                  class="flex items-center gap-2"
                >
                  <span class="text-[#582be8] text-lg">
                    ☎
                  </span>

                  <h2
                    class="text-base font-bold text-slate-900"
                  >
                    Pusat Bantuan &amp; Pengaduan Panwaslu
                  </h2>
                </div>

                <p
                  class="text-xs text-slate-500 mt-2"
                >
                  Mengalami kendala teknis perangkat atau mencurigai
                  adanya intervensi pihak luar?
                </p>

                <div class="flex flex-col gap-2 mt-3">

                  <a
                    href="tel:+6281299887766"
                    class="flex items-center justify-between gap-3 p-2 rounded-lg bg-slate-50 text-[#582be8] hover:bg-purple-50 transition text-[10px] font-mono"
                  >
                    <span>
                      ☎ Hotline WhatsApp KPU:
                    </span>

                    <span class="font-bold">
                      +62 812-9988-7766
                    </span>
                  </a>

                  <a
                    href="mailto:panwaslu.pemira@kampus.ac.id"
                    class="flex items-center justify-between gap-3 p-2 rounded-lg bg-slate-50 text-[#582be8] hover:bg-purple-50 transition text-[10px] font-mono"
                  >
                    <span>
                      ✉ Email Panwaslu:
                    </span>

                    <span class="font-bold">
                      panwaslu.pemira@kampus.ac.id
                    </span>
                  </a>

                </div>

              </section>

            </div>

          </div>


          <!-- =================================================
               CONSENT
          ================================================== -->
          <section class="mt-12">

            <div
              class="p-6 lg:p-8 rounded-xl bg-white shadow-md border border-purple-100/50 flex flex-col gap-6"
            >

              <!-- Agreement -->
              <label
                class="group flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-purple-50/50 transition-colors cursor-pointer"
              >

                <input
                  v-model="agreed"
                  type="checkbox"
                  class="mt-1 w-5 h-5 rounded border-purple-200 text-[#582be8] focus:ring-purple-200 shrink-0 cursor-pointer"
                />

                <div class="flex flex-col gap-1">

                  <span
                    class="text-base font-bold text-slate-900 group-hover:text-[#582be8] transition-colors"
                  >
                    Pernyataan Kepatuhan &amp; Integritas Pemilih
                  </span>

                  <span
                    class="text-sm text-slate-500 leading-relaxed"
                  >
                    Saya menyatakan dengan sadar bahwa saya telah membaca,
                    memahami, dan menyetujui seluruh ketentuan tata tertib
                    Pemilihan Raya Mahasiswa 2025. Saya menggunakan hak
                    suara ini secara langsung, bebas, rahasia, jujur, adil,
                    tanpa paksaan, dan bersedia menerima sanksi apabila
                    melanggar peraturan perundang-undangan yang berlaku.
                  </span>

                </div>

              </label>


              <!-- Actions -->
              <div
                class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1"
              >

                <!-- Back -->
                <NuxtLink
                  to="/voter/login"
                  class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition font-semibold text-sm"
                >
                  ←

                  Kembali ke Autentikasi
                </NuxtLink>


                <!-- Right -->
                <div
                  class="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4"
                >

                  <div
                    class="hidden md:flex items-center gap-2 text-[10px] font-mono text-slate-400"
                  >
                    🔒

                    256-Bit TLS &amp; MPC Ledger Validated
                  </div>


                  <!-- Proceed -->
                  <NuxtLink
                    to="/voter/booth"
                    :class="[
                      'w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3 rounded-xl font-semibold text-sm transition-all',
                      agreed
                        ? 'bg-[#582be8] text-white shadow-md shadow-purple-600/20 hover:bg-[#471ec7] hover:shadow-lg active:scale-95'
                        : 'bg-[#582be8] text-white opacity-50 cursor-not-allowed pointer-events-none'
                    ]"
                  >
                    <span>
                      Setujui &amp; Masuk ke Bilik Suara
                    </span>

                    <span class="text-lg">
                      →
                    </span>
                  </NuxtLink>

                </div>

              </div>

            </div>

          </section>

        </div>

      </div>

    </main>


    <!-- =====================================================
         FOOTER
    ====================================================== -->
    <footer
      class="w-full bg-white border-t border-purple-100/50 py-8 mt-12"
    >
      <div
        class="max-w-[1216px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6"
      >

        <div class="flex items-center gap-3">

          <div
            class="w-8 h-8 rounded-lg bg-[#582be8] flex items-center justify-center text-white"
          >
            ✓
          </div>

          <div class="flex flex-col">

            <span
              class="text-sm font-semibold text-slate-900"
            >
              A-Vote Platform Demokrasi Digital
            </span>

            <span
              class="text-[10px] font-mono text-slate-400"
            >
              Sistem Pemilihan Terbuka Terverifikasi Zero-Knowledge Proof
            </span>

          </div>

        </div>


        <div
          class="flex items-center gap-6"
        >

          <span
            class="hidden lg:block text-[10px] font-mono text-slate-400"
          >
            Hash Protokol: 0x8f2d...94ca
          </span>

          <div class="flex items-center gap-4">

            <NuxtLink
              to="/voter/audit"
              class="text-xs text-slate-500 hover:text-[#582be8] transition"
            >
              Protokol Audit
            </NuxtLink>

            <NuxtLink
              to="/voter/audit"
              class="text-xs text-slate-500 hover:text-[#582be8] transition"
            >
              Integritas Data
            </NuxtLink>

          </div>

        </div>

      </div>
    </footer>

  </div>
</template>