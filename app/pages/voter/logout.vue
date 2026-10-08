<template>
  <div class="min-h-screen bg-[#f8f9ff] text-[#0b1c30]">

    <!-- HEADER -->
    <header
      class="w-full bg-white/80 shadow-[0_1px_8px_rgba(88,43,232,0.04)] backdrop-blur-xl"
    >
      <div
        class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8"
      >

        <!-- LOGO -->
        <div class="flex items-center gap-3">

          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#582be8]"
          >
            <span class="material-symbols-outlined text-[20px] text-white">
              how_to_vote
            </span>
          </div>

          <span class="text-xl font-bold tracking-tight">
            A-Vote
          </span>

        </div>


        <!-- NODE STATUS -->
        <div
          class="flex items-center gap-2 rounded-full bg-[#eff4ff] px-3 py-1"
        >
          <span class="material-symbols-outlined text-[16px] text-[#4000c6]">
            verified
          </span>

          <span
            class="font-mono text-[11px] font-medium uppercase tracking-wider"
          >
            Institutional Node ID #0942
          </span>
        </div>

      </div>
    </header>


    <!-- MAIN -->
    <main
      class="flex w-full flex-1 flex-col items-center justify-center px-4 py-8 lg:px-8"
    >

      <div
        class="flex w-full max-w-7xl flex-col items-center py-8"
      >


        <!-- HERO CARD -->
        <section
          class="relative mb-8 w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl"
        >

          <!-- GLOW -->
          <div
            class="pointer-events-none absolute -left-1/2 -top-24 h-96 w-96 rounded-full bg-[#4000c6]/10 blur-3xl"
          ></div>


          <!-- STATUS BAR -->
          <div
            class="h-1.5 w-full bg-gradient-to-r from-[#4000c6] via-[#8455ef] to-[#cabeff]"
          ></div>


          <div
            class="relative flex flex-col items-center p-8 text-center md:p-12"
          >

            <!-- SECURITY ICON -->
            <div class="relative mb-6">

              <div
                class="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#eff4ff] shadow-md"
              >

                <div
                  class="flex h-14 w-14 items-center justify-center rounded-xl bg-[#582be8] text-white"
                >
                  <span
                    class="material-symbols-outlined text-[36px]"
                    style="font-variation-settings: 'FILL' 1;"
                  >
                    verified_user
                  </span>
                </div>

              </div>


              <!-- ONLINE INDICATOR -->
              <span
                class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
              >
                <span
                  class="absolute h-3 w-3 animate-ping rounded-full bg-emerald-500"
                ></span>

                <span
                  class="relative h-3 w-3 rounded-full bg-emerald-600"
                ></span>
              </span>

            </div>


            <!-- ELECTION LABEL -->
            <div
              class="mb-3 inline-flex items-center gap-1 rounded-full bg-[#eff4ff] px-3 py-1 text-[#4000c6]"
            >

              <span class="material-symbols-outlined text-[15px]">
                lock_reset
              </span>

              <span
                class="font-mono text-[11px] font-semibold uppercase tracking-wider"
              >
                Pemira BEM & DPM 2025
              </span>

            </div>


            <!-- TITLE -->
            <h1
              class="mb-2 text-3xl font-bold tracking-tight md:text-4xl"
            >
              Sesi Pemilih Berhasil Ditutup
            </h1>


            <!-- DESCRIPTION -->
            <p
              class="mb-6 max-w-xl text-base leading-relaxed text-[#484456]"
            >
              Terima kasih telah menyalurkan hak suara Anda secara
              demokratis, langsung, umum, bebas, rahasia, jujur,
              dan adil.
            </p>


            <!-- CRYPTO STATUS -->
            <div
              class="inline-flex flex-wrap items-center justify-center gap-3 rounded-lg bg-[#e5eeff] px-4 py-2 font-mono text-[11px]"
            >

              <div class="flex items-center gap-1.5">

                <span
                  class="h-2 w-2 rounded-full bg-emerald-500"
                ></span>

                <span class="font-medium">
                  Sesi Dihapus dari Perangkat
                </span>

              </div>

              <span class="text-[#797488]">
                •
              </span>

              <span class="text-[#484456]">
                Enkripsi Berakhir
              </span>

              <span class="text-[#797488]">
                •
              </span>

              <span class="font-semibold text-[#4000c6]">
                24 Okt 2025, 14:35:12 WIB
              </span>

            </div>

          </div>

        </section>


        <!-- SECURITY CARDS -->
        <section
          class="mb-8 grid w-full max-w-3xl grid-cols-1 gap-4 md:grid-cols-3"
        >


          <!-- TOKEN -->
          <div
            class="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >

            <div>

              <div
                class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#eff4ff] text-[#4000c6]"
              >
                <span class="material-symbols-outlined text-[22px]">
                  vpn_key_off
                </span>
              </div>

              <h2 class="mb-1 text-base font-semibold">
                Token Sesi Hangus
              </h2>

              <p
                class="text-sm leading-relaxed text-[#484456]"
              >
                Token autentikasi lokal telah dimusnahkan secara
                otomatis. Kredensial tidak lagi aktif di peramban ini.
              </p>

            </div>


            <div
              class="mt-4 flex items-center gap-1 pt-1 text-[#4000c6]"
            >

              <span class="material-symbols-outlined text-[16px]">
                check_circle
              </span>

              <span
                class="font-mono text-[11px] font-medium uppercase tracking-wide"
              >
                0 Kredensial Tersisa
              </span>

            </div>

          </div>


          <!-- VOTE LOCKED -->
          <div
            class="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >

            <div>

              <div
                class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#eff4ff] text-[#4000c6]"
              >
                <span class="material-symbols-outlined text-[22px]">
                  how_to_reg
                </span>
              </div>

              <h2 class="mb-1 text-base font-semibold">
                Hak Suara Terkunci
              </h2>

              <p
                class="text-sm leading-relaxed text-[#484456]"
              >
                Pilihan Anda telah tercatat permanen di ledger
                terdesentralisasi dan tidak dapat diubah oleh siapa pun.
              </p>

            </div>


            <div
              class="mt-4 flex items-center gap-1 pt-1 text-[#4000c6]"
            >

              <span class="material-symbols-outlined text-[16px]">
                verified
              </span>

              <span
                class="font-mono text-[11px] font-medium uppercase tracking-wide"
              >
                Immutable Ledger
              </span>

            </div>

          </div>


          <!-- PUBLIC DEVICE -->
          <div
            class="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >

            <div>

              <div
                class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#eff4ff] text-[#4000c6]"
              >
                <span class="material-symbols-outlined text-[22px]">
                  devices
                </span>
              </div>

              <h2 class="mb-1 text-base font-semibold">
                Perangkat Publik Aman
              </h2>

              <p
                class="text-sm leading-relaxed text-[#484456]"
              >
                Aman untuk meninggalkan perangkat ini bagi mahasiswa
                atau pemilih berikutnya di Lab / Perpustakaan Kampus.
              </p>

            </div>


            <div
              class="mt-4 flex items-center gap-1 pt-1 text-[#4000c6]"
            >

              <span class="material-symbols-outlined text-[16px]">
                shield
              </span>

              <span
                class="font-mono text-[11px] font-medium uppercase tracking-wide"
              >
                Siap Pemilih Baru
              </span>

            </div>

          </div>

        </section>


        <!-- BALLOT RECEIPT EMAIL -->
        <section
          class="mb-8 w-full max-w-3xl rounded-xl bg-[#eff4ff] p-6 shadow-sm"
        >

          <div class="flex flex-col items-start gap-4 sm:flex-row">

            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#d3e4fe] text-[#4000c6]"
            >
              <span class="material-symbols-outlined text-[24px]">
                mark_email_read
              </span>
            </div>


            <div class="flex-1">

              <div
                class="mb-1 flex flex-wrap items-center justify-between gap-1"
              >

                <h3 class="text-base font-semibold">
                  Lupa Mengunduh Tanda Terima?
                </h3>

                <span
                  class="rounded bg-[#e6deff] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#1b0062]"
                >
                  Terkirim Otomatis
                </span>

              </div>


              <p
                class="mb-3 text-sm leading-relaxed text-[#484456]"
              >
                Bukti stempel suara digital
                <span class="font-mono font-medium text-[#0b1c30]">
                  (Ballot Receipt Cryptographic Hash)
                </span>
                telah dikirimkan ke alamat email resmi kampus Anda:

                <span class="font-mono font-semibold text-[#4000c6]">
                  a***@mhs.kampus.ac.id
                </span>

                sebagai arsip digital mandiri.
              </p>


              <div
                class="flex items-center gap-2 text-sm font-medium text-red-600"
              >

                <span class="material-symbols-outlined text-[16px]">
                  warning
                </span>

                <span>
                  Penting: Jangan pernah membagikan token hash audit
                  atau tanda terima rahasia ini kepada pihak manapun.
                </span>

              </div>

            </div>

          </div>

        </section>


        <!-- NAVIGATION -->
        <div
          class="mb-12 flex w-full max-w-3xl flex-col items-center justify-center gap-3 sm:flex-row"
        >

          <a
            href="/"
            class="flex w-full items-center justify-center gap-1 rounded-lg bg-[#582be8] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[#4000c6] sm:w-auto"
          >
            <span class="material-symbols-outlined text-[20px]">
              home
            </span>

            <span>
              Kembali ke Beranda A-Vote
            </span>
          </a>


          <a
            href="#"
            class="group flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-center text-sm font-semibold shadow-sm transition hover:bg-[#eff4ff] sm:w-auto"
          >

            <span class="relative flex h-2 w-2">

              <span
                class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"
              ></span>

              <span
                class="relative inline-flex h-2 w-2 rounded-full bg-red-500"
              ></span>

            </span>

            <span>
              Pantau Hitung Cepat (Live Count)
            </span>

            <span
              class="material-symbols-outlined text-[18px] text-[#484456]"
            >
              arrow_forward
            </span>

          </a>

        </div>


        <!-- STUDENT PORTAL -->
        <div class="mb-12 text-center">

          <a
            href="#"
            class="group inline-flex items-center gap-1 text-sm font-medium text-[#4000c6] transition-colors hover:text-[#4600d7]"
          >

            <span>
              Masuk Kembali ke Portal Mahasiswa
            </span>

            <span
              class="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5"
            >
              open_in_new
            </span>

          </a>

        </div>


        <!-- HELP / PANWASLU -->
        <section
          class="w-full max-w-3xl rounded-xl bg-white p-6 shadow-sm"
        >

          <div
            class="flex flex-col justify-between gap-4 md:flex-row md:items-center"
          >

            <div>

              <span
                class="mb-1 block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#484456]"
              >
                Bantuan & Posko Pengawasan
              </span>

              <h4 class="text-base font-semibold">
                Layanan Aduan & Panwaslu Kampus
              </h4>

              <p class="mt-0.5 text-xs text-[#484456]">
                Gedung Student Center Lt. 2,
                Ruang Sekretariat KPU Mahasiswa
              </p>

            </div>


            <div class="flex flex-wrap items-center gap-2">

              <a
                href="https://wa.me/6281299887766"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 rounded-lg bg-[#eff4ff] px-4 py-2 font-mono text-[11px] font-semibold transition hover:bg-[#e5eeff]"
              >

                <span
                  class="material-symbols-outlined text-[18px] text-emerald-600"
                >
                  chat
                </span>

                WA: +62 812-9988-7766

              </a>


              <button
                type="button"
                class="inline-flex items-center gap-1 rounded-lg bg-[#eff4ff] px-4 py-2 font-mono text-[11px] font-semibold transition hover:bg-[#e5eeff]"
              >

                <span
                  class="material-symbols-outlined text-[18px] text-[#4000c6]"
                >
                  mail
                </span>

                panwaslu@kampus.ac.id

              </button>

            </div>

          </div>

        </section>

      </div>

    </main>


    <!-- FOOTER -->
    <footer
      class="w-full bg-[#eff4ff]/60 py-6 shadow-[0_-1px_8px_rgba(88,43,232,0.02)]"
    >

      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row lg:px-8"
      >

        <div
          class="flex flex-wrap items-center justify-center gap-4 md:justify-start"
        >

          <div class="flex items-center gap-1 text-[#484456]">

            <span class="material-symbols-outlined text-[16px] text-[#4000c6]">
              lock
            </span>

            <span class="font-mono text-[11px]">
              Zero-Knowledge State Purged
            </span>

          </div>


          <div class="flex items-center gap-1 text-[#484456]">

            <span class="material-symbols-outlined text-[16px] text-[#4000c6]">
              verified_user
            </span>

            <span class="font-mono text-[11px]">
              TLS 1.3 End-to-End Cryptographic Clearance
            </span>

          </div>

        </div>


        <div class="text-center md:text-right">

          <p class="text-xs text-[#484456]">
            Session tokens destroyed.
            Close browser window for maximum privacy assurance.
          </p>

        </div>

      </div>

    </footer>

  </div>
</template>