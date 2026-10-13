<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <div class="w-full flex flex-col gap-8">
    <!-- Page Heading -->
    <section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div class="mb-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-slate-400">
          <span>A-Vote</span>
          <span>/</span>
          <span>Pemilu Mahasiswa 2025</span>
          <span>/</span>
          <span class="font-semibold text-[#582be8]">Kandidat &amp; Paslon</span>
        </div>

        <h1 class="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Kandidat &amp; Paslon</h1>
        <p class="mt-1 max-w-3xl text-xs sm:text-sm text-slate-500 leading-relaxed">
          Kelola data pasangan calon dan kandidat independen, verifikasi kelengkapan berkas visi-misi, nomor urut resmi, serta status penetapan bilik suara.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition"
        >
          <span class="material-symbols-outlined text-[18px] text-[#582be8]">folder_zip</span>
          Unduh Rekap Berkas
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          Tambah Paslon / Kandidat
        </button>
      </div>
    </section>

    <!-- Statistics -->
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-purple-200 hover:shadow transition">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Paslon / Kandidat</p>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#582be8]">
            <span class="material-symbols-outlined text-[24px]">groups</span>
          </div>
        </div>
        <p class="mt-4 text-3xl font-extrabold text-[#582be8]">10 <span class="text-xs font-normal text-slate-500">Terdaftar</span></p>
        <p class="mt-2 text-xs text-slate-400">Dari 4 agenda pemilihan aktif/mendatang</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200 hover:shadow transition">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Berkas Terverifikasi</p>
          <span class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">80% Memenuhi</span>
        </div>
        <p class="mt-4 text-3xl font-extrabold text-emerald-600">8 <span class="text-xs font-normal text-emerald-700">Lolos KPU</span></p>
        <p class="mt-2 text-xs text-slate-400">Dinyatakan sah masuk bilik e-voting</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-amber-200 hover:shadow transition">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Menunggu Verifikasi</p>
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">2 Berkas Baru</span>
        </div>
        <p class="mt-4 text-3xl font-extrabold text-amber-600">2 <span class="text-xs font-normal text-amber-700">Paslon</span></p>
        <p class="mt-2 text-xs text-slate-400">Perlu pemeriksaan berkas LPJ dan visi</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-purple-200 hover:shadow transition">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Penetapan Nomor Urut</p>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#582be8]">
            <span class="material-symbols-outlined text-[24px]">verified</span>
          </div>
        </div>
        <p class="mt-4 text-3xl font-extrabold text-[#582be8]">Selesai <span class="text-xs font-normal text-slate-500">(100%)</span></p>
        <p class="mt-2 text-xs text-slate-400">Undian nomor urut resmi tuntas</p>
      </div>
    </section>

    <!-- Filters -->
    <section class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <select class="min-h-10 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#582be8] cursor-pointer shadow-sm">
          <option>Pemilihan Raya Ketua &amp; Wakil BEM 2025 (3 Paslon)</option>
          <option>DPM Fakultas Teknik 2025 (5 Kandidat)</option>
          <option>HMIF Informatika 2025 (2 Paslon)</option>
        </select>

        <div class="flex gap-1.5 overflow-x-auto">
          <button type="button" class="whitespace-nowrap rounded-xl bg-[#582be8] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm shadow-purple-600/25">Semua (3)</button>
          <button type="button" class="whitespace-nowrap rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">Terverifikasi (3)</button>
          <button type="button" class="whitespace-nowrap rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">Menunggu (0)</button>
          <button type="button" class="whitespace-nowrap rounded-xl bg-white border border-slate-200 px-3.5 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">Ditolak (0)</button>
        </div>
      </div>

      <div class="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div class="relative min-w-0 flex-1 sm:w-72">
          <input
            type="text"
            placeholder="Cari nama paslon, NIM, nomor urut..."
            class="w-full min-h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#582be8] focus:bg-white"
          />
        </div>
        <button type="button" class="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition">
          <span class="material-symbols-outlined text-[18px]">swap_vert</span>
          Atur Nomor Urut
        </button>
      </div>
    </section>

    <!-- BEM Candidates -->
    <section>
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-lg font-bold text-slate-900">Pasangan Calon Tetap BEM 2025</h2>
          <span class="rounded-full bg-purple-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#582be8]">3 Paslon Resmi</span>
        </div>
        <span class="font-mono text-[10px] text-slate-400">Bilik Suara #PEMIRA-BEM-2025</span>
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <!-- Paslon 01 -->
        <article class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-purple-200 hover:shadow-md">
          <div class="flex-1 space-y-5 p-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#582be8] text-xl font-extrabold text-white shadow-sm">01</div>
                <div>
                  <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">Nomor Urut Resmi</p>
                  <span class="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Terverifikasi KPU
                  </span>
                </div>
              </div>
              <button type="button" class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition">
                <span class="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>

            <div class="relative h-48 overflow-hidden rounded-xl bg-purple-50 border border-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUExGpIuQjTmx2t9uax_Q5HJRcEObG8QLy91Pwz4WVcQeaT4vw3FAEZF5ZdtptXSgG0XRhi0AaGcT-45Ie2Ii51DfEgU_F3Z7jnkcUWMwnP6UtkEp5guzaiD20rUJKDdYk71aKL3j38287bX9FoWzJ5qJZC_YO4H_w1EMjuPm_g6K44vPEPtviGAAbULzHDJ8u65BGgHR4AfMHoUARCeR9j9CBJ4DFxhKiagiMctRqTV5pwdaEjiHCPA"
                alt="Foto pasangan calon Farhan dan Nabila"
                class="h-full w-full object-cover object-top"
              />
              <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white">
                <span class="w-fit rounded bg-[#582be8]/90 px-2 py-0.5 text-[10px] font-semibold">BEM FT-FEB</span>
                <h3 class="mt-1.5 text-lg font-bold">Farhan &amp; Nabila</h3>
              </div>
            </div>

            <div class="space-y-2">
              <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-[10px] font-bold uppercase text-[#582be8]">Calon Ketua BEM</p>
                <p class="mt-1 text-sm font-bold text-slate-900">Muhammad Farhan</p>
                <p class="mt-1 text-xs text-slate-500">NIM 2108101012 • S1 Teknik Informatika (FT)</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-[10px] font-bold uppercase text-[#582be8]">Calon Wakil Ketua BEM</p>
                <p class="mt-1 text-sm font-bold text-slate-900">Nabila Putri</p>
                <p class="mt-1 text-xs text-slate-500">NIM 2102102045 • S1 Akuntansi (FEB)</p>
              </div>
            </div>

            <div class="rounded-xl border border-purple-100/60 bg-purple-50/60 p-3 text-center text-xs font-semibold italic text-[#582be8]">
              “Sinergi Nyata, Berdampak Bersama”
            </div>

            <div>
              <p class="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">Pilar Program Kerja</p>
              <ul class="space-y-2 text-xs leading-5">
                <li class="flex gap-2"><span class="material-symbols-outlined text-base text-[#582be8]">check_circle</span><span><strong>Digitalisasi Ormawa:</strong> Satu pintu administrasi terpadu</span></li>
                <li class="flex gap-2"><span class="material-symbols-outlined text-base text-[#582be8]">check_circle</span><span><strong>Advokasi Transparan:</strong> Pelayanan UKT tanggap 24/7</span></li>
                <li class="flex gap-2"><span class="material-symbols-outlined text-base text-[#582be8]">check_circle</span><span><strong>Beasiswa Kampus:</strong> Akses pendanaan riset merata</span></li>
              </ul>
            </div>

            <div class="space-y-2.5 border-t border-slate-100 pt-4 text-xs">
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">IPK &amp; SKCK</span>
                <span class="font-semibold text-emerald-700">Lengkap (Valid)</span>
              </div>
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">Rekomendasi Fakultas</span>
                <span class="font-semibold text-emerald-700">Disetujui Dekanat</span>
              </div>
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">Visi Misi</span>
                <a href="#" class="font-semibold text-[#582be8] hover:underline">PDF (Unduh)</a>
              </div>
            </div>
          </div>

          <div class="flex gap-2 px-5 pb-5">
            <button type="button" class="inline-flex items-center justify-center gap-1 flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">
              <span class="material-symbols-outlined text-base">visibility</span>
              Lihat Detail
            </button>
            <button type="button" class="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">
              <span class="material-symbols-outlined text-base">edit</span>
              Edit
            </button>
          </div>
        </article>

        <!-- Paslon 02 -->
        <article class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-purple-200 hover:shadow-md">
          <div class="flex-1 space-y-5 p-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-extrabold text-white shadow-sm">02</div>
                <div>
                  <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">Nomor Urut Resmi</p>
                  <span class="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Terverifikasi KPU
                  </span>
                </div>
              </div>
              <button type="button" class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition">
                <span class="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>

            <div class="relative h-48 overflow-hidden rounded-xl bg-indigo-50 border border-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUZUXWyq8lHl78RSQTBsTkQzxcLwqf0PZM2ckU4ns1ZNstpAleqx4vYBT4v5V-4qB_aUIC63ui3Ai7fKkcwaWmLiCyXsyC7VGjAyCIUNojE372e86v8JTiDPOWTDSkJ8OsdjVD-grmktM7MkG0snpvLBEE4GlxSV93jPUkVWZWIdFBf2WeSM9eTuEEfkQLr5toKR0-V-wVlX2dhWvNSivJfh08fz_GkDe9gLgf-JI-Tdeb0jDCwavRPA"
                alt="Foto pasangan calon Dimas dan Siti"
                class="h-full w-full object-cover object-top"
              />
              <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white">
                <span class="w-fit rounded bg-indigo-600/90 px-2 py-0.5 text-[10px] font-semibold">BEM FT-FISIP</span>
                <h3 class="mt-1.5 text-lg font-bold">Dimas &amp; Siti</h3>
              </div>
            </div>

            <div class="space-y-2">
              <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-[10px] font-bold uppercase text-indigo-600">Calon Ketua BEM</p>
                <p class="mt-1 text-sm font-bold text-slate-900">Dimas Arya Prasetya</p>
                <p class="mt-1 text-xs text-slate-500">NIM 2104104018 • S1 Teknik Elektro (FT)</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-[10px] font-bold uppercase text-indigo-600">Calon Wakil Ketua BEM</p>
                <p class="mt-1 text-sm font-bold text-slate-900">Siti Rahmawati</p>
                <p class="mt-1 text-xs text-slate-500">NIM 2109101099 • S1 Ilmu Komunikasi (FISIP)</p>
              </div>
            </div>

            <div class="rounded-xl border border-indigo-100/60 bg-indigo-50/60 p-3 text-center text-xs font-semibold italic text-indigo-700">
              “Kampus Inklusif, Prestasi Berkelanjutan”
            </div>

            <div>
              <p class="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">Pilar Program Kerja</p>
              <ul class="space-y-2 text-xs leading-5">
                <li class="flex gap-2"><span class="material-symbols-outlined text-base text-indigo-600">check_circle</span><span><strong>Inkubasi Karir Kreatif:</strong> Akselerasi sertifikasi industri</span></li>
                <li class="flex gap-2"><span class="material-symbols-outlined text-base text-indigo-600">check_circle</span><span><strong>Fasilitas Disabilitas:</strong> Aksesibilitas gedung ramah difabel</span></li>
                <li class="flex gap-2"><span class="material-symbols-outlined text-base text-indigo-600">check_circle</span><span><strong>Dana Ormawa Mandiri:</strong> Crowdfunding legal kampus</span></li>
              </ul>
            </div>

            <div class="space-y-2.5 border-t border-slate-100 pt-4 text-xs">
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">IPK &amp; SKCK</span>
                <span class="font-semibold text-emerald-700">Lengkap &amp; Valid</span>
              </div>
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">Rekomendasi Fakultas</span>
                <span class="font-semibold text-emerald-700">Disetujui Dekanat</span>
              </div>
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">Visi Misi</span>
                <a href="#" class="font-semibold text-[#582be8] hover:underline">PDF (Unduh)</a>
              </div>
            </div>
          </div>

          <div class="flex gap-2 px-5 pb-5">
            <button type="button" class="inline-flex items-center justify-center gap-1 flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">
              <span class="material-symbols-outlined text-base">visibility</span>
              Lihat Detail
            </button>
            <button type="button" class="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">
              <span class="material-symbols-outlined text-base">edit</span>
              Edit
            </button>
          </div>
        </article>

        <!-- Paslon 03 -->
        <article class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-purple-200 hover:shadow-md">
          <div class="flex-1 space-y-5 p-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-700 text-xl font-extrabold text-white shadow-sm">03</div>
                <div>
                  <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">Nomor Urut Resmi</p>
                  <span class="mt-1 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">
                    <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Terverifikasi KPU
                  </span>
                </div>
              </div>
              <button type="button" class="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition">
                <span class="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>

            <div class="relative h-48 overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbw28c2ei6uJsELzn1ihDYFYlUoVI-imSyE6S_CCaJjz7Ihy-ylnRj8REA1TLVDfG-isUlz9M_2z1cZyUWABdA7-K6ckfkXIt7JJ-FMW0JooTfi4K_b8oXfiIXug9Fk9Uvu3otAGAC-EN0ysMdqhopur651zoEp2Swm4YXYF344f4GQsfpuF86xDA--Sf7btmi4RghcSa2PX0X0W2KQUWEvQfD5kxqoAlSBFfMA9PbXW_c1ERGHClqWQ"
                alt="Foto pasangan calon Bagas dan Amanda"
                class="h-full w-full object-cover object-top"
              />
              <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white">
                <span class="w-fit rounded bg-slate-800/90 px-2 py-0.5 text-[10px] font-semibold">BEM FH-FPSI</span>
                <h3 class="mt-1.5 text-lg font-bold">Bagas &amp; Amanda</h3>
              </div>
            </div>

            <div class="space-y-2">
              <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-[10px] font-bold uppercase text-[#582be8]">Calon Ketua BEM</p>
                <p class="mt-1 text-sm font-bold text-slate-900">Bagas Wicaksono</p>
                <p class="mt-1 text-xs text-slate-500">NIM 2101103011 • S1 Ilmu Hukum (FH)</p>
              </div>
              <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-[10px] font-bold uppercase text-[#582be8]">Calon Wakil Ketua BEM</p>
                <p class="mt-1 text-sm font-bold text-slate-900">Amanda Clarissa</p>
                <p class="mt-1 text-xs text-slate-500">NIM 2107102033 • S1 Psikologi (FPsi)</p>
              </div>
            </div>

            <div class="rounded-xl border border-slate-200/60 bg-slate-100 p-3 text-center text-xs font-semibold italic text-slate-800">
              “Integritas Tegas, Suara Mahasiswa Berdaulat”
            </div>

            <div>
              <p class="mb-2.5 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">Pilar Program Kerja</p>
              <ul class="space-y-2 text-xs leading-5">
                <li class="flex gap-2"><span class="material-symbols-outlined text-base text-[#582be8]">check_circle</span><span><strong>Reformasi Regulasi:</strong> Penegakan hak konstitusi mahasiswa</span></li>
                <li class="flex gap-2"><span class="material-symbols-outlined text-base text-[#582be8]">check_circle</span><span><strong>Kolaborasi Riset:</strong> Hub saintifik lintas fakultas</span></li>
                <li class="flex gap-2"><span class="material-symbols-outlined text-base text-[#582be8]">check_circle</span><span><strong>Transparansi Anggaran:</strong> Laporan dana BEM publik</span></li>
              </ul>
            </div>

            <div class="space-y-2.5 border-t border-slate-100 pt-4 text-xs">
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">IPK &amp; SKCK</span>
                <span class="font-semibold text-emerald-700">Lengkap &amp; Valid</span>
              </div>
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">Rekomendasi Fakultas</span>
                <span class="font-semibold text-emerald-700">Disetujui Dekanat</span>
              </div>
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">Visi Misi</span>
                <a href="#" class="font-semibold text-[#582be8] hover:underline">PDF (Unduh)</a>
              </div>
            </div>
          </div>

          <div class="flex gap-2 px-5 pb-5">
            <button type="button" class="inline-flex items-center justify-center gap-1 flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">
              <span class="material-symbols-outlined text-base">visibility</span>
              Lihat Detail
            </button>
            <button type="button" class="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">
              <span class="material-symbols-outlined text-base">edit</span>
              Edit
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- DPM Candidates -->
    <section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-base sm:text-lg font-bold text-slate-900">Daftar Calon Anggota DPM FT</h2>
            <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">5 Kandidat</span>
          </div>
          <p class="mt-1 text-xs leading-5 text-slate-500">
            Pemilihan legislatif perwakilan jurusan Fakultas Teknik: Informatika, Elektro, Sipil, dan Mesin.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button type="button" class="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">
            <span class="material-symbols-outlined text-base">filter_list</span>
            Filter Jurusan
          </button>
          <button type="button" class="inline-flex items-center gap-1 rounded-xl bg-[#582be8] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#471ec7] shadow-sm shadow-purple-600/20 transition">
            <span class="material-symbols-outlined text-base">person_add</span>
            Calon DPM
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[850px] text-left text-xs">
          <thead>
            <tr class="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <th class="rounded-l-xl px-4 py-3.5">No. Urut</th>
              <th class="px-4 py-3.5">Foto &amp; Nama Calon</th>
              <th class="px-4 py-3.5">NIM &amp; Program Studi</th>
              <th class="px-4 py-3.5">Semester / IPK</th>
              <th class="px-4 py-3.5">Kelengkapan Berkas</th>
              <th class="px-4 py-3.5">Status Bilik Suara</th>
              <th class="rounded-r-xl px-4 py-3.5 text-right">Aksi KPU</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
            <tr class="hover:bg-slate-50/70 transition">
              <td class="px-4 py-4 font-mono font-bold text-[#582be8]">#01</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgAcMU-_OxM5D1DEV3ig96Zw7hhYWdS7II7hvEPkDBlgjmNdPdHwPxtex9o0gOxta4CGj6CVIB73T6w4S6bHoK_rjVe7ed8uAABZhuFBKpLlZN8tsNbMOVj0dZJUcWGXKPLVzn2jxARMQM4ZqhxZXmKoTn32k6p2-ByX6m_K8dg8AyWI1hdVq0OTYAFtCda18vfXkr_Z5kgLNe1A7Nt_nDovaZwt1gmNmlmtnlt4BJBDpb0nh09To2zg" alt="Aldi Firmansyah" class="h-10 w-10 rounded-xl object-cover" />
                  <div>
                    <p class="font-semibold text-slate-900">Aldi Firmansyah</p>
                    <p class="mt-0.5 text-[10px] text-slate-500">Departemen TI</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="font-mono text-slate-900">2208101004</p>
                <p class="mt-0.5 text-xs text-slate-500">S1 Teknik Informatika</p>
              </td>
              <td class="px-4 py-4">
                <p>Sem. 6</p>
                <p class="mt-0.5 font-semibold text-emerald-700">IPK 3.78</p>
              </td>
              <td class="px-4 py-4 font-semibold text-emerald-700">✓ 100% Lengkap</td>
              <td class="px-4 py-4">
                <span class="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">Siap di Bilik</span>
              </td>
              <td class="px-4 py-4 text-right">
                <button type="button" class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">Detail</button>
              </td>
            </tr>

            <tr class="hover:bg-slate-50/70 transition">
              <td class="px-4 py-4 font-mono font-bold text-[#582be8]">#02</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhNw-Xr5Cte8One2BrRBpRq8xJyhZcShgO8JsEyASTAiYXAxlkE_FEa8-Soyf-GQFQe0Epv1yaVm-fuMw2f3G9y62BKQYSw3bYymqJAL1jwl4l8aHwAat4fjTGP_1m9gJPwPgjbYjiKk1-guphN_RqfWG-7QqfUkEMEriF7rYjewxwcVdnrB9agTO4s1m2CJmPqnP20qhPG-AkcB7RNqbaNU2lTpUamsgDLKtTgIbglRhsRrMJXyANBg" alt="Ratna Dewi" class="h-10 w-10 rounded-xl object-cover" />
                  <div>
                    <p class="font-semibold text-slate-900">Ratna Dewi</p>
                    <p class="mt-0.5 text-[10px] text-slate-500">Departemen Elektro</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="font-mono text-slate-900">2204102019</p>
                <p class="mt-0.5 text-xs text-slate-500">S1 Teknik Elektro</p>
              </td>
              <td class="px-4 py-4">
                <p>Sem. 6</p>
                <p class="mt-0.5 font-semibold text-emerald-700">IPK 3.65</p>
              </td>
              <td class="px-4 py-4 font-semibold text-emerald-700">✓ 100% Lengkap</td>
              <td class="px-4 py-4">
                <span class="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">Siap di Bilik</span>
              </td>
              <td class="px-4 py-4 text-right">
                <button type="button" class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">Detail</button>
              </td>
            </tr>

            <tr class="hover:bg-slate-50/70 transition">
              <td class="px-4 py-4 font-mono font-bold text-[#582be8]">#03</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8ZolsDt3nkBLwOHctmLoRNvWc088cxfD6y44-TPisMrMWndDerR7aA8l9zAC8u62eeNlwax20qIkAWN6UBHaGcXKv2UR7cVTqQ5LLtaMyPz3iwURAC1-3WamDzHu1eewR28qrWv3SvkpKa62aHVz4ydh9LMGuiFHnzoKom9uwyskdncQBV00diAh5uxcsxgqqOtKxFISCfbnV30XTOOS8PjmWkcR65cp3mzwhWtPncP0BiF-bytBHgQ" alt="Kevin Pratama" class="h-10 w-10 rounded-xl object-cover" />
                  <div>
                    <p class="font-semibold text-slate-900">Kevin Pratama</p>
                    <p class="mt-0.5 text-[10px] text-slate-500">Departemen Sipil</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="font-mono text-slate-900">2103103055</p>
                <p class="mt-0.5 text-xs text-slate-500">S1 Teknik Sipil</p>
              </td>
              <td class="px-4 py-4">
                <p>Sem. 8</p>
                <p class="mt-0.5 font-semibold text-emerald-700">IPK 3.52</p>
              </td>
              <td class="px-4 py-4 font-semibold text-emerald-700">✓ 100% Lengkap</td>
              <td class="px-4 py-4">
                <span class="whitespace-nowrap rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800">Siap di Bilik</span>
              </td>
              <td class="px-4 py-4 text-right">
                <button type="button" class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition">Detail</button>
              </td>
            </tr>

            <tr class="hover:bg-slate-50/70 transition">
              <td class="px-4 py-4 font-mono font-bold text-slate-400">#04</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD63BmQhg12pZpZKonjYHL_esj95QaS6lHrV6jNvI9JxUGtfPolNd1kHg0HZ8zqkH8pWR6o-eAQwth1gTdIOfUcPUIQzQZ0gV0sqDmH7kl39K1xoKbPeXXuw8AJP33wH102_1nrdYWTobAnlhKIJOAQFFpuEWkRl8-Q4eYzvAUK7Bl6zZgzvkasScV9RtZBZXs_mujOaz_BFm-Z5btVxQ4IK9wjyfm91B78rtftaMfv5VfbEOZ21LowDw" alt="Maya Anindita" class="h-10 w-10 rounded-xl object-cover" />
                  <div>
                    <p class="font-semibold text-slate-900">Maya Anindita</p>
                    <p class="mt-0.5 text-[10px] text-slate-500">Departemen Mesin</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="font-mono text-slate-900">2205101088</p>
                <p class="mt-0.5 text-xs text-slate-500">S1 Teknik Mesin</p>
              </td>
              <td class="px-4 py-4">
                <p>Sem. 6</p>
                <p class="mt-0.5 font-semibold text-emerald-700">IPK 3.80</p>
              </td>
              <td class="px-4 py-4 font-semibold text-amber-700">Menunggu SKCK</td>
              <td class="px-4 py-4">
                <span class="whitespace-nowrap rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800">Verifikasi Berkas</span>
              </td>
              <td class="px-4 py-4 text-right">
                <button type="button" class="rounded-lg bg-[#582be8] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#471ec7] shadow-sm shadow-purple-600/20 transition">Verifikasi</button>
              </td>
            </tr>

            <tr class="hover:bg-slate-50/70 transition">
              <td class="px-4 py-4 font-mono font-bold text-slate-400">#05</td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC6whJ-zQgpnIq9ZBiWhLAgJ7_WusIKoHIHNvLdSxQlZ6BA7G3qpLL0M1QAgUwTvHrJEvQgTm3WYRwSw1WyrmnkbzYAnvGZNOct2GkeEpmXp9J5m5RzibPHX8R2YSL_dmewMWhMdsjnmr0J_wkkVVQCSIwdYdHXOLNoQtw55GHf3wegTHXLBCeLjs3CX7BeXvgE6AUHIKIn-ARD-SDKrzGGPppgicNEwvMJfCNeq09whEpzisIVNYHPA" alt="Fikri Haikal" class="h-10 w-10 rounded-xl object-cover" />
                  <div>
                    <p class="font-semibold text-slate-900">Fikri Haikal</p>
                    <p class="mt-0.5 text-[10px] text-slate-500">Departemen Arsitektur</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-4">
                <p class="font-mono text-slate-900">2106102041</p>
                <p class="mt-0.5 text-xs text-slate-500">S1 Arsitektur</p>
              </td>
              <td class="px-4 py-4">
                <p>Sem. 8</p>
                <p class="mt-0.5 font-semibold text-emerald-700">IPK 3.42</p>
              </td>
              <td class="px-4 py-4 font-semibold text-amber-700">Kurang 12 KTM</td>
              <td class="px-4 py-4">
                <span class="whitespace-nowrap rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-semibold text-amber-800">Revisi Dukungan</span>
              </td>
              <td class="px-4 py-4 text-right">
                <button type="button" class="rounded-lg bg-[#582be8] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#471ec7] shadow-sm shadow-purple-600/20 transition">Verifikasi</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- SOP -->
    <section class="flex flex-col gap-5 rounded-2xl border border-purple-100/70 bg-purple-50/50 p-6 md:flex-row shadow-sm">
      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-[#582be8]">
        <span class="material-symbols-outlined text-[28px]">gavel</span>
      </div>

      <div class="flex-1">
        <h2 class="text-base sm:text-lg font-bold text-slate-900">SOP Penetapan Kandidat &amp; Paslon Pemira</h2>

        <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-1.5 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
              <span class="material-symbols-outlined text-base text-[#582be8]">rule</span>
              Standar Kelayakan KPU Mahasiswa
            </h3>
            <p class="text-xs leading-5 text-slate-500">
              Syarat minimal IPK ≥ 3.25, tidak sedang dalam sanksi akademik atau tindak pidana, telah menempuh minimal 80 SKS aktif, serta menyertakan minimal 150 tanda tangan bukti dukungan mahasiswa resmi (NIM dan KTM sah).
            </p>
          </div>

          <div>
            <h3 class="mb-1.5 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
              <span class="material-symbols-outlined text-base text-[#582be8]">how_to_vote</span>
              Regulasi Bilik Suara Digital
            </h3>
            <p class="text-xs leading-5 text-slate-500">
              Paslon yang berstatus <strong class="text-emerald-700">Terverifikasi KPU</strong> diteruskan ke bilik suara digital pemilih. Perubahan berkas atau nama setelah penetapan membutuhkan persetujuan sidang pleno.
            </p>
          </div>
        </div>
      </div>
    </section>

    <footer class="flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-[10px] text-slate-400 sm:flex-row">
      <p>A-Vote Campus System · Admin Panel</p>
      <p>Pemilu Mahasiswa 2025</p>
    </footer>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
</style>