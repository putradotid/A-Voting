<template>
  <div class="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">

    <!-- HEADER -->
    <header
      class="fixed left-0 right-0 top-0 z-50 bg-white/90 shadow-[0_1px_8px_rgba(88,43,232,0.06)] backdrop-blur-xl"
    >
      <div
        class="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8"
      >

        <!-- LOGO -->
        <div class="flex items-center gap-6">

          <a
            href="/voter/booth"
            class="group flex items-center gap-2"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#582be8] text-white shadow-[0_2px_8px_-2px_rgba(88,43,232,0.3)]"
            >
              <span class="material-symbols-outlined">
                how_to_vote
              </span>
            </div>

            <div class="flex flex-col">
              <span class="text-xl font-bold leading-none tracking-tight text-[#4000c6]">
                A-VOTE
              </span>

              <span class="mt-1 text-[10px] font-medium uppercase tracking-wider text-[#797488]">
                Sovereign Trust
              </span>
            </div>
          </a>

          <div class="hidden items-center gap-2 border-l border-[#c9c3d9]/30 pl-4 lg:flex">

            <div
              class="inline-flex items-center gap-2 rounded-full bg-[#e9ddff] px-3 py-1 text-[11px] font-medium text-[#23005c]"
            >
              <span class="h-2 w-2 animate-pulse rounded-full bg-[#4000c6]"></span>
              Pemilihan Raya BEM 2025
            </div>

            <div
              class="inline-flex items-center gap-2 rounded-full bg-[#eff4ff] px-3 py-1 text-[11px] font-medium text-[#4000c6]"
            >
              <span class="material-symbols-outlined text-[14px]">
                lock
              </span>
              Enkripsi End-to-End Aktif
            </div>

          </div>
        </div>


        <!-- NAV -->
        <nav class="hidden items-center gap-1 md:flex">

          <a
            href="/voter/booth"
            class="rounded-lg px-4 py-2 text-sm text-[#484456] hover:bg-[#eff4ff]"
          >
            Bilik Suara
          </a>

          <a
            href="#"
            class="rounded-lg px-4 py-2 text-sm text-[#484456] hover:bg-[#eff4ff]"
          >
            Kandidat
          </a>

          <a
            href="#"
            class="rounded-lg px-4 py-2 text-sm text-[#484456] hover:bg-[#eff4ff]"
          >
            Audit Kriptografis
          </a>

          <a
            href="#"
            class="rounded-lg px-4 py-2 text-sm text-[#484456] hover:bg-[#eff4ff]"
          >
            Panduan
          </a>

        </nav>


        <!-- USER -->
        <div class="flex items-center gap-4">

          <div class="hidden text-right sm:flex sm:flex-col">
            <span class="text-sm font-semibold leading-tight">
              Ahmad Fauzi
            </span>

            <span class="text-[11px] leading-tight text-[#484456]">
              Mhs. Aktif / NIK: 3271****48
            </span>
          </div>

          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[#4000c6] text-white ring-2 ring-[#e6deff]"
          >
            <span class="material-symbols-outlined text-[18px]">
              person
            </span>
          </div>

          <NuxtLink
            to="/voter/logout"
            title="Keluar / Selesai"
            class="rounded-lg p-2 text-red-600 hover:bg-red-50"
          >
            <span class="material-symbols-outlined text-[20px]">
              logout
            </span>
          </NuxtLink>

        </div>

      </div>
    </header>


    <!-- MAIN -->
    <main class="min-h-screen bg-[#f8f9ff] pt-20">

      <div class="mx-auto w-full max-w-7xl px-4 py-8 lg:px-8">


        <!-- SUCCESS STATUS -->
        <div
          class="mb-8 flex flex-col justify-between gap-4 rounded-xl bg-[#eff4ff] p-4 shadow-sm md:flex-row md:items-center lg:p-6"
        >

          <div class="flex min-w-0 items-start gap-3 sm:items-center">

            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4000c6] text-white shadow-md"
            >
              <span class="material-symbols-outlined text-[20px]">
                verified
              </span>
            </div>

            <div class="flex min-w-0 flex-col">

              <div class="flex flex-wrap items-center gap-2">

                <span class="text-base font-semibold leading-tight">
                  Suara Anda Telah Berhasil Dicatat & Tersegel Kriptografis
                </span>

                <span
                  class="inline-flex items-center gap-1 rounded-full bg-[#e9ddff] px-2.5 py-0.5 text-[11px] font-medium uppercase text-[#23005c]"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-[#4000c6]"></span>
                  SHA-256 Valid
                </span>

              </div>

              <span class="mt-0.5 text-xs text-[#484456]">
                Protokol Demokrasi Kriptografis Mahasiswa •
                Sesi Resmi KPU-M 2025
              </span>

            </div>

          </div>


          <div class="flex shrink-0 items-center gap-4 self-end md:self-auto">

            <div class="flex flex-col text-right">

              <span class="text-[10px] uppercase tracking-wider text-[#797488]">
                Waktu Stempel Blok
              </span>

              <span class="font-mono text-xs font-semibold">
                24 Okt 2025 • 14:32:18 WIB
              </span>

            </div>

            <div class="hidden h-8 w-px bg-[#d3e4fe] sm:block"></div>

            <div
              class="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-[#4000c6] shadow-sm"
            >
              <span class="material-symbols-outlined text-[16px]">
                lock
              </span>
              Terkunci & Sah
            </div>

          </div>

        </div>


        <!-- PROGRESS -->
        <section
          class="mb-8 rounded-xl border border-[#dce9ff]/60 bg-white p-4 shadow-sm lg:p-6"
        >

          <div
            class="mb-4 flex items-center justify-between gap-2 border-b border-[#dce9ff]/40 pb-2"
          >

            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-[16px] text-[#4000c6]">
                linear_scale
              </span>

              <span class="text-[11px] font-semibold uppercase tracking-wider text-[#797488]">
                Progres Alur Pemilihan
              </span>
            </div>

            <div class="flex items-center gap-2">

              <span class="text-[11px] font-medium text-[#484456]">
                Tahap 4 dari 4
              </span>

              <span
                class="inline-flex items-center gap-1 rounded-full bg-[#e9ddff] px-2.5 py-0.5 text-[11px] font-semibold text-[#23005c]"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-[#4000c6]"></span>
                100% Selesai
              </span>

            </div>

          </div>


          <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">


            <!-- STEP 01 -->
            <div class="flex items-center gap-3 rounded-lg bg-[#eff4ff] p-3">

              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9ddff] text-[#4000c6]"
              >
                <span class="material-symbols-outlined text-[18px]">
                  check_circle
                </span>
              </div>

              <div class="flex min-w-0 flex-col">
                <span class="text-[10px] uppercase text-[#797488]">
                  Tahap 01
                </span>

                <span class="truncate text-sm font-semibold">
                  Autentikasi SIAKAD
                </span>

                <span class="text-[11px] font-medium text-[#4000c6]">
                  Terverifikasi
                </span>
              </div>

            </div>


            <!-- STEP 02 -->
            <div class="flex items-center gap-3 rounded-lg bg-[#eff4ff] p-3">

              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9ddff] text-[#4000c6]"
              >
                <span class="material-symbols-outlined text-[18px]">
                  check_circle
                </span>
              </div>

              <div class="flex min-w-0 flex-col">
                <span class="text-[10px] uppercase text-[#797488]">
                  Tahap 02
                </span>

                <span class="truncate text-sm font-semibold">
                  Ketentuan & Regulasi
                </span>

                <span class="text-[11px] font-medium text-[#4000c6]">
                  Disetujui
                </span>
              </div>

            </div>


            <!-- STEP 03 -->
            <div class="flex items-center gap-3 rounded-lg bg-[#eff4ff] p-3">

              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e9ddff] text-[#4000c6]"
              >
                <span class="material-symbols-outlined text-[18px]">
                  check_circle
                </span>
              </div>

              <div class="flex min-w-0 flex-col">
                <span class="text-[10px] uppercase text-[#797488]">
                  Tahap 03
                </span>

                <span class="truncate text-sm font-semibold">
                  Bilik Suara Digital
                </span>

                <span class="text-[11px] font-medium text-[#4000c6]">
                  Suara Digunakan
                </span>
              </div>

            </div>


            <!-- STEP 04 -->
            <div
              class="flex items-center gap-3 rounded-lg bg-[#582be8] p-3 text-white shadow-[0_2px_8px_-2px_rgba(88,43,232,0.3)]"
            >

              <div
                class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4000c6]"
              >
                <span
                  class="material-symbols-outlined text-[18px]"
                  style="font-variation-settings: 'FILL' 1;"
                >
                  verified
                </span>
              </div>

              <div class="flex min-w-0 flex-col">

                <span class="text-[10px] uppercase text-[#d1c7ff]">
                  Tahap 04
                </span>

                <span class="truncate text-sm font-semibold">
                  Bukti Kriptografis
                </span>

                <span class="flex items-center gap-1 text-[11px] font-semibold text-[#e9ddff]">
                  <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
                  Tersegel Sah
                </span>

              </div>

            </div>

          </div>

        </section>


        <!-- CONTENT -->
        <div class="flex flex-col items-stretch gap-8 lg:flex-row">


          <!-- LEFT -->
          <div class="flex min-w-0 flex-1 flex-col gap-8">


            <!-- RECEIPT CARD -->
            <section class="relative overflow-hidden rounded-xl bg-white shadow-xl">

              <div
                class="h-2 w-full bg-gradient-to-r from-[#4000c6] via-[#8455ef] to-[#e6deff]"
              ></div>

              <div class="p-6 lg:p-8">


                <!-- TITLE -->
                <div
                  class="mb-8 flex flex-col justify-between gap-4 border-b border-[#dce9ff] pb-6 sm:flex-row sm:items-center"
                >

                  <div class="flex items-center gap-4">

                    <div
                      class="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#e6deff] text-[#4000c6] shadow-inner"
                    >
                      <span
                        class="material-symbols-outlined text-[32px]"
                        style="font-variation-settings: 'FILL' 1;"
                      >
                        check_circle
                      </span>

                      <span class="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8455ef] opacity-75"></span>
                        <span class="relative inline-flex h-3.5 w-3.5 rounded-full bg-[#4000c6]"></span>
                      </span>
                    </div>

                    <div>

                      <span class="text-[11px] font-bold uppercase tracking-widest text-[#4000c6]">
                        Tanda Terima Suara Elektronik
                      </span>

                      <h1 class="mt-0.5 text-2xl font-semibold tracking-tight">
                        Terima Kasih Atas Partisipasi Anda!
                      </h1>

                    </div>

                  </div>


                  <div
                    class="flex items-center gap-2 self-start rounded-xl bg-[#eff4ff] px-4 py-2 sm:self-auto"
                  >
                    <span class="material-symbols-outlined text-[18px] text-[#6b38d4]">
                      verified_user
                    </span>

                    <span class="font-mono text-xs font-semibold">
                      KPU-M 2025/CERT-892
                    </span>
                  </div>

                </div>


                <!-- DESCRIPTION -->
                <p class="mb-8 text-base leading-relaxed text-[#484456]">

                  Hak suara Anda untuk
                  <span class="font-semibold text-[#0b1c30]">
                    Pemilihan Raya Ketua & Wakil Ketua BEM 2025
                  </span>

                  telah berhasil dienkripsi melalui skema
                  <span class="font-mono font-medium text-[#4000c6]">
                    Zero-Knowledge Proofs
                  </span>

                  dan diverifikasi ke dalam buku besar konsensus A-Vote.
                  Pilihan kandidat Anda dirahasiakan mutlak secara matematis.

                </p>


                <!-- VOTER INFORMATION -->
                <div class="mb-8 rounded-xl bg-[#f8f9ff] p-6">

                  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">


                    <div class="flex flex-col gap-1">

                      <span class="text-[10px] uppercase tracking-wider text-[#797488]">
                        Identitas Pemilih (Terverifikasi)
                      </span>

                      <span class="text-lg font-semibold">
                        Ahmad Fauzi
                      </span>

                      <span class="text-xs text-[#484456]">
                        Fakultas Teknik • Teknik Informatika
                      </span>

                    </div>


                    <div class="flex flex-col gap-1">

                      <span class="text-[10px] uppercase tracking-wider text-[#797488]">
                        Nomor Induk Mahasiswa (NIM)
                      </span>

                      <div class="flex items-center gap-2">

                        <span class="font-mono text-sm font-bold">
                          22.11.1234
                        </span>

                        <span
                          class="inline-flex items-center gap-1 rounded-full bg-[#e9ddff] px-2 py-0.5 text-[11px] font-medium text-[#23005c]"
                        >
                          <span class="material-symbols-outlined text-[13px]">
                            domain_verification
                          </span>
                          SSO Siakad
                        </span>

                      </div>

                      <span class="text-xs text-[#484456]">
                        Status Hak Pilih: Selesai Digunakan
                      </span>

                    </div>

                  </div>


                  <!-- HASH -->
                  <div
                    class="mt-6 flex flex-col gap-2 border-t border-[#dce9ff] pt-4"
                  >

                    <div class="flex items-center justify-between">

                      <span class="text-[10px] uppercase tracking-wider text-[#797488]">
                        Token Transaksi Suara (Ballot Receipt Hash)
                      </span>

                      <span
                        class="flex items-center gap-1 text-[11px] font-medium text-[#4000c6]"
                      >
                        <span class="material-symbols-outlined text-[14px]">
                          shield
                        </span>
                        Enkripsi End-to-End
                      </span>

                    </div>


                    <div
                      class="flex items-center justify-between gap-2 rounded-lg bg-white p-3 shadow-sm"
                    >

                      <span
                        class="select-all truncate font-mono text-xs font-semibold tracking-tight"
                      >
                        0x8f2a9c3d4e177b94ce5180f92ab8d035e407ac9412e75e6a39d892cb17e4d
                      </span>

                      <button
                        type="button"
                        class="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#e6deff] px-3 py-1.5 text-xs font-semibold text-[#1b0062]"
                      >
                        <span class="material-symbols-outlined text-[16px]">
                          content_copy
                        </span>

                        Salin
                      </button>

                    </div>

                  </div>


                  <!-- VALIDATORS -->
                  <div class="mt-4 grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">

                    <div
                      class="flex items-center gap-2 rounded-lg bg-white p-3"
                    >
                      <span class="material-symbols-outlined text-[20px] text-[#6b38d4]">
                        dns
                      </span>

                      <div class="flex min-w-0 flex-col">

                        <span class="text-[10px] text-[#797488]">
                          Node Validator #01
                        </span>

                        <span class="truncate text-xs font-medium">
                          Server Pusat PPTIK Kampus
                        </span>

                      </div>
                    </div>


                    <div
                      class="flex items-center gap-2 rounded-lg bg-white p-3"
                    >
                      <span class="material-symbols-outlined text-[20px] text-[#6b38d4]">
                        hub
                      </span>

                      <div class="flex min-w-0 flex-col">

                        <span class="text-[10px] text-[#797488]">
                          Node Validator #03
                        </span>

                        <span class="truncate text-xs font-medium">
                          Saksi Independen DPM & BEM KM
                        </span>

                      </div>
                    </div>

                  </div>

                </div>


                <!-- QR -->
                <div
                  class="flex flex-col items-center justify-between gap-6 rounded-xl bg-[#eff4ff] p-6 md:flex-row"
                >

                  <div class="flex items-center gap-4">

                    <div class="rounded-xl bg-white p-2.5 shadow-md">

                      <svg
                        class="h-20 w-20"
                        fill="currentColor"
                        viewBox="0 0 100 100"
                      >

                        <rect fill="#4000c6" height="30" rx="3" width="30" x="0" y="0"></rect>
                        <rect fill="#ffffff" height="18" width="18" x="6" y="6"></rect>
                        <rect fill="#4000c6" height="10" width="10" x="10" y="10"></rect>

                        <rect fill="#4000c6" height="30" rx="3" width="30" x="70" y="0"></rect>
                        <rect fill="#ffffff" height="18" width="18" x="76" y="6"></rect>
                        <rect fill="#4000c6" height="10" width="10" x="80" y="10"></rect>

                        <rect fill="#4000c6" height="30" rx="3" width="30" x="0" y="70"></rect>
                        <rect fill="#ffffff" height="18" width="18" x="6" y="76"></rect>
                        <rect fill="#4000c6" height="10" width="10" x="10" y="80"></rect>

                        <rect fill="#384055" height="14" width="6" x="36" y="8"></rect>
                        <rect fill="#384055" height="6" width="14" x="48" y="4"></rect>
                        <rect fill="#4000c6" height="6" width="18" x="42" y="18"></rect>
                        <rect fill="#384055" height="6" width="14" x="8" y="38"></rect>
                        <rect fill="#4000c6" height="14" width="6" x="20" y="48"></rect>
                        <rect fill="#4000c6" height="8" rx="1" width="8" x="36" y="36"></rect>
                        <rect fill="#384055" height="6" width="12" x="52" y="36"></rect>
                        <rect fill="#4000c6" height="16" width="16" x="48" y="48"></rect>
                        <rect fill="#384055" height="6" width="14" x="70" y="40"></rect>
                        <rect fill="#4000c6" height="16" width="8" x="86" y="44"></rect>
                        <rect fill="#384055" height="6" width="10" x="72" y="66"></rect>
                        <rect fill="#4000c6" height="24" width="8" x="88" y="70"></rect>
                        <rect fill="#4000c6" height="8" width="18" x="40" y="70"></rect>
                        <rect fill="#384055" height="6" width="22" x="36" y="84"></rect>
                        <rect fill="#4000c6" height="12" width="14" x="64" y="82"></rect>

                      </svg>

                    </div>


                    <div class="flex flex-col">

                      <span class="text-base font-semibold">
                        Stempel QR Validitas Digital
                      </span>

                      <span class="mt-1 text-xs leading-normal text-[#484456]">
                        Pindai melalui kamera HP atau aplikasi Panwaslu
                        untuk memeriksa status rekaman suara Anda pada
                        audit trail publik tanpa memaparkan pilihan paslon.
                      </span>

                      <span class="mt-2 text-[11px] font-medium text-[#4000c6]">
                        Validasi: KPU-UNIV-VOTE-2025-OK
                      </span>

                    </div>

                  </div>

                </div>


                <!-- ACTIONS -->
                <div
                  class="mt-8 flex flex-col items-stretch justify-between gap-4 border-t border-[#dce9ff] pt-6 sm:flex-row sm:items-center"
                >

                  <button
                    type="button"
                    onclick="window.print()"
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#582be8] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#4000c6]"
                  >
                    <span class="material-symbols-outlined text-[20px]">
                      download
                    </span>

                    Unduh Bukti Suara (PDF Receipt)
                  </button>


                  <a
                    href="#"
                    class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#d3e4fe] px-6 py-3 text-sm font-semibold text-[#0b1c30] transition hover:bg-[#c9dcfa]"
                  >
                    <span class="material-symbols-outlined text-[20px] text-[#4000c6]">
                      monitoring
                    </span>

                    Pantau Hitung Cepat (Live Count)
                  </a>

                </div>

              </div>

            </section>


            <!-- SECURITY -->
            <section
              class="rounded-xl bg-white p-6 shadow-sm lg:p-8"
            >

              <div class="mb-6 flex items-center gap-3">

                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9ddff] text-[#4000c6]"
                >
                  <span class="material-symbols-outlined text-[20px]">
                    security
                  </span>
                </div>

                <div>

                  <h2 class="text-lg font-semibold">
                    Jaminan Keamanan & Kerahasiaan Pilihan
                  </h2>

                  <p class="text-xs text-[#484456]">
                    Prinsip Asas LUBER JURDIL dengan Dukungan
                    One-Way Cryptographic Hashing
                  </p>

                </div>

              </div>


              <div
                class="mb-6 rounded-xl bg-[#f8f9ff] p-4 text-sm leading-relaxed text-[#484456]"
              >
                Pilihan kandidat yang Anda berikan telah diacak
                menggunakan rumus satu arah
                <span class="font-mono font-semibold text-[#0b1c30]">
                  One-Way Encryption
                </span>.

                Sistem memutus korelasi langsung antara identitas NIM
                Anda dan nomor urut paslon terpilih.

                Bahkan administrator server, KPU-M, maupun rektorat
                tidak memiliki kunci untuk membongkar siapa paslon
                yang Anda pilih.
              </div>


              <div class="grid grid-cols-1 gap-4 md:grid-cols-3">


                <div class="flex flex-col gap-2 rounded-xl bg-[#eff4ff] p-4">

                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#4000c6] shadow-sm"
                  >
                    <span class="material-symbols-outlined text-[18px]">
                      block
                    </span>
                  </div>

                  <span class="text-sm font-semibold">
                    Anti-Double Voting
                  </span>

                  <p class="text-xs leading-normal text-[#484456]">
                    Token otentikasi hak suara Anda langsung hangus
                    otomatis di server auth SSO untuk mencegah suara ganda.
                  </p>

                </div>


                <div class="flex flex-col gap-2 rounded-xl bg-[#eff4ff] p-4">

                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#4000c6] shadow-sm"
                  >
                    <span class="material-symbols-outlined text-[18px]">
                      lock_clock
                    </span>
                  </div>

                  <span class="text-sm font-semibold">
                    Imutabilitas Konsensus
                  </span>

                  <p class="text-xs leading-normal text-[#484456]">
                    Tercatat permanen di blok #2025-PEMIRA-01.
                    Data tidak dapat disunting, diubah, maupun dihapus
                    sepihak.
                  </p>

                </div>


                <div class="flex flex-col gap-2 rounded-xl bg-[#eff4ff] p-4">

                  <div
                    class="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#4000c6] shadow-sm"
                  >
                    <span class="material-symbols-outlined text-[18px]">
                      policy
                    </span>
                  </div>

                  <span class="text-sm font-semibold">
                    Akses Audit Terbuka
                  </span>

                  <p class="text-xs leading-normal text-[#484456]">
                    Transparansi total. Saksi pasangan calon dan Panwaslu
                    kampus dapat memvalidasi keutuhan pohon hash Merkle.
                  </p>

                </div>

              </div>

            </section>

          </div>


          <!-- RIGHT SIDEBAR -->
          <aside class="flex w-full min-w-0 flex-col gap-8 lg:w-[360px] lg:shrink-0">


            <!-- SECURITY WARNING -->
            <section
              class="rounded-xl bg-white p-6 shadow-sm"
            >

              <div class="mb-3 flex items-center gap-2 text-red-600">

                <span class="material-symbols-outlined text-[20px]">
                  warning
                </span>

                <h2 class="text-base font-bold text-[#0b1c30]">
                  Peringatan Keamanan Perangkat
                </h2>

              </div>

              <p class="mb-4 text-xs leading-relaxed text-[#484456]">
                Apakah Anda menggunakan gawai pinjaman, komputer
                di Perpustakaan, atau PC Lab Kampus?

                Pastikan untuk keluar dari sesi akun demi mencegah
                penyalahgunaan identitas.
              </p>

              <NuxtLink
                to="/voter/logout"
                class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
              >
                <span class="material-symbols-outlined text-[18px]">
                  logout
                </span>

                Keluar dari Sesi (Logout Aman)
              </NuxtLink>

              <span
                class="mt-2 block text-center font-mono text-[10px] text-[#797488]"
              >
                Sesi lokal akan ditutup otomatis dalam
                <span class="font-bold text-[#0b1c30]">
                  02:57
                </span>
              </span>

            </section>


            <!-- SCHEDULE -->
            <section
              class="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-sm"
            >

              <div class="flex items-center gap-2">

                <span class="material-symbols-outlined text-[20px] text-[#4000c6]">
                  event_upcoming
                </span>

                <h3 class="text-base font-bold">
                  Jadwal Sidang Pleno KPU-M
                </h3>

              </div>


              <div class="space-y-3">

                <div class="flex flex-col gap-1 rounded-lg bg-[#f8f9ff] p-3">

                  <div class="flex items-center justify-between">

                    <span class="text-[10px] uppercase text-[#797488]">
                      Penutupan Bilik Suara
                    </span>

                    <span class="font-mono text-[10px] font-bold text-[#4000c6]">
                      16:00 WIB
                    </span>

                  </div>

                  <span class="text-xs font-medium">
                    Batas akhir partisipasi e-voting online
                  </span>

                </div>


                <div class="flex flex-col gap-1 rounded-lg bg-[#eff4ff] p-3">

                  <div class="flex items-center justify-between">

                    <span class="text-[10px] font-bold uppercase text-[#4000c6]">
                      Pengumuman Resmi Pleno
                    </span>

                    <span
                      class="rounded-full bg-[#4000c6] px-2 py-0.5 text-[10px] font-bold text-white"
                    >
                      18:00 WIB
                    </span>

                  </div>

                  <span class="text-xs font-semibold">
                    Gedung Student Center • Lantai 2
                  </span>

                  <span class="text-xs text-[#484456]">
                    Serta siaran langsung di YouTube BEM KM Official
                  </span>

                </div>

              </div>

            </section>


            <!-- HELP -->
            <section
              class="rounded-xl bg-white p-6 shadow-sm"
            >

              <h3 class="mb-3 flex items-center gap-2 text-base font-bold">

                <span class="material-symbols-outlined text-[20px] text-[#6b38d4]">
                  support_agent
                </span>

                Pusat Bantuan & Pengaduan

              </h3>

              <p class="mb-4 text-xs leading-relaxed text-[#484456]">
                Menemukan kendala atau ingin melaporkan dugaan
                pelanggaran pada pemilihan?

                Hubungi panitia pengawas:
              </p>


              <div class="flex flex-col gap-2 text-xs">

                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-[#4000c6]">
                    call
                  </span>

                  <span class="font-mono">
                    Helpdesk KPU: +62 812-9988-7766
                  </span>
                </div>


                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-[#4000c6]">
                    mail
                  </span>

                  <span>
                    panwaslu.pemira@kampus.ac.id
                  </span>
                </div>


                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[18px] text-[#4000c6]">
                    location_on
                  </span>

                  <span>
                    Sekretariat BEM Gedung Graha Mahasiswa Lt. 1
                  </span>
                </div>

              </div>

            </section>

          </aside>

        </div>

      </div>

    </main>


    <!-- FOOTER -->
    <footer
      class="mt-12 w-full border-t border-[#c9c3d9]/30 bg-white py-8"
    >

      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row lg:px-8"
      >

        <div class="flex items-center gap-4">

          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#582be8] text-white"
          >
            <span class="material-symbols-outlined text-[18px]">
              verified_user
            </span>
          </div>

          <div class="flex flex-col">

            <span class="text-sm font-semibold">
              A-Vote Platform Demokrasi Digital
            </span>

            <span class="text-[10px] text-[#484456]">
              Sistem Pemilihan Terbuka Terverifikasi Zero-Knowledge Proof
            </span>

          </div>

        </div>


        <div class="flex items-center gap-6">

          <span class="font-mono text-[10px] text-[#484456]">
            Hash Protokol: 0x8f2d...94ca
          </span>

          <div class="hidden items-center gap-4 sm:flex">

            <a
              href="#"
              class="text-xs text-[#484456] hover:text-[#4000c6]"
            >
              Protokol Audit
            </a>

            <a
              href="#"
              class="text-xs text-[#484456] hover:text-[#4000c6]"
            >
              Integritas Data
            </a>

          </div>

        </div>

      </div>

    </footer>

  </div>
</template>