<script setup lang="ts">
definePageMeta({
  layout: false
})
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
        class="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-purple-100 text-[#582be8] font-mono text-[10px] font-medium self-start lg:self-center">
        <!-- Emoji disesuaikan untuk konteks Bilik Suara -->
        🗳️
        BILIK SUARA: RAHASIA & AMAN
      </div>
    </section>

    <!-- =================================================
    PROGRESS STEPPER (TAHAP 3)
================================================== -->
    <section class="mb-12">
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
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 -960 960 960" fill="currentColor">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </div>
            <div class="min-w-0">
              <span class="block text-[10px] font-mono text-slate-400">Tahap 01</span>
              <span class="block text-sm font-semibold truncate text-slate-800">Autentikasi SIAKAD</span>
            </div>
          </div>

          <!-- Step 2 (Selesai) -->
          <div class="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
            <div class="w-8 h-8 rounded-full bg-[#582be8] text-white flex items-center justify-center shrink-0">
              <!-- Menggunakan SVG centang agar lebih rapi dari karakter teks ✓ -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 -960 960 960" fill="currentColor">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
              </svg>
            </div>
            <div class="min-w-0">
              <span class="block text-[10px] font-mono text-slate-400">Tahap 02</span>
              <span class="block text-sm font-semibold truncate text-slate-800">Ketentuan & Regulasi</span>
            </div>
          </div>

          <!-- Step 3 (Aktif Saat Ini) -->
          <div class="flex items-center gap-3 p-3 rounded-lg bg-purple-100 text-purple-900 border border-purple-200">
            <div
              class="w-8 h-8 rounded-full bg-[#582be8] text-white flex items-center justify-center font-mono font-bold shrink-0 shadow-sm">
              3
            </div>
            <div class="min-w-0">
              <span class="block text-[10px] font-mono text-purple-700 font-medium">Tahap Saat Ini</span>
              <span class="block text-sm font-bold truncate">Bilik Suara Digital</span>
            </div>
          </div>

          <!-- Step 4 (Menunggu) -->
          <div class="flex items-center gap-3 p-3 rounded-lg bg-slate-50 opacity-60">
            <div
              class="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-mono shrink-0">
              4
            </div>
            <div class="min-w-0">
              <span class="block text-[10px] font-mono text-slate-400">Tahap 04</span>
              <span class="block text-sm font-semibold text-slate-500 truncate">Bukti Kriptografis</span>
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

        <span class="material-symbols-outlined text-blue-600">
          info
        </span>

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
            Pasangan Calon Ketua & Wakil Ketua BEM
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Pilih salah satu pasangan calon berikut.
          </p>
        </div>


        <div class="grid gap-6 lg:grid-cols-3">


          <!-- PASLON 01 -->
          <article class="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">

            <div class="relative">

              <img src="https://lh3.googleusercontent.com/aida-public/..." alt="Muhammad Farhan & Nabila Putri"
                class="h-56 w-full object-cover" />

              <div class="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-lg font-bold shadow">
                01
              </div>

            </div>

            <div class="p-6">

              <span class="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                Reformasi Berkelanjutan
              </span>

              <h3 class="mt-4 text-xl font-bold">
                Muhammad Farhan
                <span class="text-slate-400">&</span>
                Nabila Putri
              </h3>

              <p class="mt-1 text-sm text-slate-500">
                FIK & FEB
              </p>

              <p class="mt-4 font-medium text-slate-700">
                "Sinergi Nyata, Berdampak Bersama"
              </p>

              <div class="mt-5">
                <p class="mb-2 text-sm font-semibold">
                  Program Unggulan
                </p>

                <ul class="space-y-2 text-sm text-slate-600">
                  <li class="flex gap-2">
                    <span class="text-purple-600">•</span>
                    Digitalisasi layanan mahasiswa
                  </li>

                  <li class="flex gap-2">
                    <span class="text-purple-600">•</span>
                    Penguatan organisasi mahasiswa
                  </li>

                  <li class="flex gap-2">
                    <span class="text-purple-600">•</span>
                    Beasiswa dan pengembangan prestasi
                  </li>
                </ul>
              </div>

              <div class="mt-6 flex gap-3">

                <button type="button"
                  class="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold hover:bg-slate-50">
                  Visi & Misi
                </button>

                <button type="button"
                  class="flex-1 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700">
                  Pilih Paslon 01
                </button>

              </div>

            </div>
          </article>


          <!-- PASLON 02 -->
          <article class="relative overflow-hidden rounded-2xl border-2 border-purple-600 bg-white shadow-md">

            <div class="absolute right-4 top-4 z-10 rounded-full bg-purple-600 px-4 py-2 text-xs font-bold text-white">
              PILIHAN ANDA SAAT INI
            </div>

            <div class="relative">

              <img src="https://lh3.googleusercontent.com/aida-public/..." alt="Dimas Arya Prasetya & Siti Rahmawati"
                class="h-56 w-full object-cover" />

              <div class="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-lg font-bold shadow">
                02
              </div>

            </div>

            <div class="p-6">

              <span class="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                Kampus Inklusif & Berdaya
              </span>

              <h3 class="mt-4 text-xl font-bold">
                Dimas Arya Prasetya
                <span class="text-slate-400">&</span>
                Siti Rahmawati
              </h3>

              <p class="mt-1 text-sm text-slate-500">
                Fakultas Teknik & FISIP
              </p>

              <p class="mt-4 font-medium text-slate-700">
                "Kampus Inklusif, Prestasi Berkelanjutan"
              </p>

              <div class="mt-5">
                <p class="mb-2 text-sm font-semibold">
                  Program Unggulan
                </p>

                <ul class="space-y-2 text-sm text-slate-600">
                  <li>• Pusat kreativitas mahasiswa</li>
                  <li>• Transparansi anggaran organisasi</li>
                  <li>• Pengembangan kewirausahaan mahasiswa</li>
                </ul>
              </div>

              <div class="mt-6 flex gap-3">

                <button type="button" class="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold">
                  Visi & Misi
                </button>

                <button type="button"
                  class="flex-1 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white">
                  Terpilih (Siap Dikirim)
                </button>

              </div>

            </div>
          </article>


          <!-- PASLON 03 -->
          <article class="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm">

            <div class="relative">

              <img src="https://lh3.googleusercontent.com/aida-public/..." alt="Bagas Wicaksono & Amanda Clarissa"
                class="h-56 w-full object-cover" />

              <div class="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-lg font-bold shadow">
                03
              </div>

            </div>

            <div class="p-6">

              <span class="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                Daulat Integritas
              </span>

              <h3 class="mt-4 text-xl font-bold">
                Bagas Wicaksono
                <span class="text-slate-400">&</span>
                Amanda Clarissa
              </h3>

              <p class="mt-1 text-sm text-slate-500">
                Fakultas Hukum & Fakultas Psikologi
              </p>

              <p class="mt-4 font-medium text-slate-700">
                "Integritas Tegas, Suara Mahasiswa Berdaulat"
              </p>

              <div class="mt-5">
                <p class="mb-2 text-sm font-semibold">
                  Program Unggulan
                </p>

                <ul class="space-y-2 text-sm text-slate-600">
                  <li>• Penguatan integritas organisasi</li>
                  <li>• Advokasi mahasiswa yang responsif</li>
                  <li>• Ruang aspirasi mahasiswa</li>
                </ul>
              </div>

              <div class="mt-6 flex gap-3">

                <button type="button" class="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold">
                  Visi & Misi
                </button>

                <button type="button"
                  class="flex-1 rounded-lg bg-purple-600 px-4 py-3 text-sm font-semibold text-white">
                  Pilih Paslon 03
                </button>

              </div>

            </div>
          </article>

        </div>

      </section>


      <!-- CRYPTOGRAPHIC GUARANTEE -->
      <section class="mt-12 rounded-2xl border border-slate-200 bg-white p-8">

        <div class="mb-6">
          <h2 class="text-xl font-bold">
            Jaminan Keamanan & Kriptografis
          </h2>

          <p class="mt-1 text-sm text-slate-500">
            Suara Anda dilindungi dengan mekanisme kriptografis.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-3">

          <div class="rounded-xl bg-slate-50 p-5">
            <span class="material-symbols-outlined text-purple-600">
              encrypted
            </span>

            <h3 class="mt-3 font-semibold">
              Zero-Knowledge Proof
            </h3>

            <p class="mt-2 text-sm text-slate-500">
              Pilihan suara dapat diverifikasi tanpa mengungkap
              identitas pemilih.
            </p>
          </div>

          <div class="rounded-xl bg-slate-50 p-5">
            <span class="material-symbols-outlined text-purple-600">
              receipt_long
            </span>

            <h3 class="mt-3 font-semibold">
              Ballot Receipt
            </h3>

            <p class="mt-2 text-sm text-slate-500">
              Setiap suara memiliki bukti kriptografis unik.
            </p>
          </div>

          <div class="rounded-xl bg-slate-50 p-5">
            <span class="material-symbols-outlined text-purple-600">
              verified
            </span>

            <h3 class="mt-3 font-semibold">
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

      <div class="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

        <div>
          <p class="text-xs text-slate-500">
            Pilihan Anda
          </p>

          <p class="font-semibold">
            Paslon 02 — Dimas Arya Prasetya & Siti Rahmawati
          </p>
        </div>

        <div class="flex items-center gap-3">

          <button type="button" class="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold">
            Batalkan Pilihan
          </button>

          <NuxtLink to="/voter/receipt"
            class="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700">
            Kirim & Kunci Suara Saya
          </NuxtLink>

        </div>

      </div>

    </div>


    <!-- FOOTER -->
    <footer class="bg-slate-900 px-6 py-10 text-slate-400">

      <div class="mx-auto max-w-7xl">

        <div class="flex flex-col justify-between gap-6 md:flex-row">

          <div>
            <h3 class="font-bold text-white">
              A-VOTE
            </h3>

            <p class="mt-2 text-sm">
              Sistem Pemilihan Raya Digital
            </p>
          </div>

          <div class="text-sm">
            © 2025 A-VOTE. Semua hak dilindungi.
          </div>

        </div>

      </div>

    </footer>

  </div>
</template>