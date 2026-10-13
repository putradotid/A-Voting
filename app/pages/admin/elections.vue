<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})
</script>

<template>
  <div class="flex flex-col w-full">



                <!-- Page Header Area -->
                <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6">
                    <div class="space-y-1">
                        <div class="flex items-center gap-2">
                            <h1 class="text-2xl text-slate-800">Manajemen Pemilihan</h1>
                            <span
                                class="px-2.5 py-0.5 rounded-full bg-violet-50 text-violet-600 font-mono text-[10px]">Semester
                                Genap 2024/2025</span>
                        </div>
                        <p class="text-sm text-slate-500">Kelola, buat, dan pantau seluruh agenda pemilihan di
                            lingkungan kampus — dari draft persiapan hingga pengumuman hasil rekapitulasi.</p>
                    </div>
                    <!-- Top Action Buttons -->
                    <div class="flex items-center gap-3 shrink-0">
                        <button
                            class="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-slate-800 text-sm font-medium rounded-xl shadow-sm hover:bg-slate-50 transition">
                            <span class="material-symbols-outlined text-[18px]">download</span>
                            Export Data Pemilihan
                        </button>
                        <button
                            class="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl shadow-md hover:bg-primary transition">
                            <span class="material-symbols-outlined text-[18px]">add_circle</span>
                            + Buat Pemilihan Baru
                        </button>
                    </div>
                </div>
                <!-- Quick Stat Metric Bar -->
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                    <!-- Stat 1: Total -->
                    <div class="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
                        <div
                            class="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-[24px]">ballot</span>
                        </div>
                        <div class="min-w-0">
                            <p class="font-mono text-[10px] text-slate-500 uppercase tracking-wider">Total Agenda</p>
                            <p class="text-lg text-slate-800 font-bold">12 <span
                                    class="text-xs font-normal text-slate-500">Pemilihan</span></p>
                        </div>
                    </div>
                    <!-- Stat 2: Berlangsung -->
                    <div class="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
                        <div
                            class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-[24px]"
                                style="font-variation-settings: 'FILL' 1;">how_to_vote</span>
                        </div>
                        <div class="min-w-0">
                            <div class="flex items-center gap-1.5">
                                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <p
                                    class="font-mono text-[10px] text-emerald-700 uppercase tracking-wider font-semibold">
                                    Berlangsung</p>
                            </div>
                            <p class="text-lg text-slate-800 font-bold">3 <span
                                    class="text-xs font-normal text-slate-500">Bilik Aktif</span></p>
                        </div>
                    </div>
                    <!-- Stat 3: Terjadwal -->
                    <div class="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
                        <div
                            class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-[24px]">schedule</span>
                        </div>
                        <div class="min-w-0">
                            <p class="font-mono text-[10px] text-amber-700 uppercase tracking-wider font-semibold">
                                Terjadwal</p>
                            <p class="text-lg text-slate-800 font-bold">2 <span
                                    class="text-xs font-normal text-slate-500">Akan Datang</span></p>
                        </div>
                    </div>
                    <!-- Stat 4: Draft -->
                    <div class="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4">
                        <div
                            class="w-12 h-12 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-[24px]">edit_note</span>
                        </div>
                        <div class="min-w-0">
                            <p class="font-mono text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Draft
                            </p>
                            <p class="text-lg text-slate-800 font-bold">4 <span
                                    class="text-xs font-normal text-slate-500">Persiapan</span></p>
                        </div>
                    </div>
                    <!-- Stat 5: Selesai -->
                    <div class="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 col-span-2 md:col-span-1">
                        <div
                            class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                            <span class="material-symbols-outlined text-[24px]">task_alt</span>
                        </div>
                        <div class="min-w-0">
                            <p class="font-mono text-[10px] text-indigo-700 uppercase tracking-wider font-semibold">
                                Selesai</p>
                            <p class="text-lg text-slate-800 font-bold">3 <span
                                    class="text-xs font-normal text-slate-500">Diarsipkan</span></p>
                        </div>
                    </div>
                </div>
                <!-- Main Content Area: Master List + Sidebar Guide -->
                <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                    <!-- Left Column: Election Management Table & Filters (9 Cols) -->
                    <div class="xl:col-span-9 flex flex-col space-y-6">
                        <!-- Filter & Search Panel -->
                        <div class="bg-white p-5 rounded-xl shadow-sm flex flex-col gap-4">
                            <!-- Search bar + Dropdowns -->
                            <div class="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                                <div class="relative flex-1">
                                    <span
                                        class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                        <span class="material-symbols-outlined text-[20px]">search</span>
                                    </span>
                                    <input
                                        class="w-full pl-10 pr-4 py-2.5 bg-slate-50 rounded-xl text-sm text-slate-800 placeholder:text-slate-500 focus:outline-none focus:bg-white transition"
                                        placeholder="Cari nama pemilihan, fakultas, atau kode ID pemilihan..."
                                        type="text">
                                </div>
                                <div class="flex items-center gap-3 shrink-0">
                                    <!-- Faculty Filter -->
                                    <select
                                        class="px-3.5 py-2.5 bg-slate-50 text-slate-800 rounded-xl text-sm focus:outline-none cursor-pointer">
                                        <option value="">Semua Tingkat</option>
                                        <option value="univ">Universitas (BEM KM)</option>
                                        <option value="ft">Fakultas Teknik</option>
                                        <option value="fh">Fakultas Hukum</option>
                                        <option value="feb">Fakultas Ekonomika &amp; Bisnis</option>
                                        <option value="himpunan">Himpunan Jurusan</option>
                                    </select>
                                    <!-- Sorting Filter -->
                                    <select
                                        class="px-3.5 py-2.5 bg-slate-50 text-slate-800 rounded-xl text-sm focus:outline-none cursor-pointer">
                                        <option value="newest">Terbaru Ditambahkan</option>
                                        <option value="deadline">Batas Waktu Terdekat</option>
                                        <option value="turnout">Partisipasi Tertinggi</option>
                                        <option value="dpt">Jumlah DPT Terbanyak</option>
                                    </select>
                                </div>
                            </div>
                            <!-- Filter Pills Tabs -->
                            <div class="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-2">
                                <button
                                    class="px-4 py-1.5 rounded-full bg-violet-600 text-white font-medium shrink-0 shadow-sm">
                                    Semua (12)
                                </button>
                                <button
                                    class="px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100 shrink-0 transition">
                                    Berlangsung (3)
                                </button>
                                <button
                                    class="px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100 shrink-0 transition">
                                    Terjadwal (2)
                                </button>
                                <button
                                    class="px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100 shrink-0 transition">
                                    Draft (4)
                                </button>
                                <button
                                    class="px-4 py-1.5 rounded-full bg-slate-50 text-slate-500 hover:text-slate-800 hover:bg-slate-100 shrink-0 transition">
                                    Selesai (3)
                                </button>
                            </div>
                        </div>
                        <!-- Election Cards Collection -->
                        <div class="space-y-4">
                            <!-- CARD 1: Pemilihan Raya Ketua BEM 2025 (Berlangsung) -->
                            <div
                                class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-5">
                                <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div class="flex items-start gap-4">
                                        <div
                                            class="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <span class="material-symbols-outlined text-[26px]">account_balance</span>
                                        </div>
                                        <div class="space-y-1">
                                            <div class="flex flex-wrap items-center gap-2">
                                                <span
                                                    class="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">#PEM-2025-01</span>
                                                <span class="text-xs text-slate-500 font-medium">• Tingkat: Universitas
                                                    (BEM KM)</span>
                                            </div>
                                            <h3 class="text-lg text-slate-800 font-bold">Pemilihan Raya Ketua &amp;
                                                Wakil Ketua BEM 2025</h3>
                                            <div class="flex items-center gap-4 text-slate-500 text-xs pt-1">
                                                <span class="flex items-center gap-1.5">
                                                    <span class="material-symbols-outlined text-[16px]">event</span>
                                                    26 Feb 2025, 08:00 - 28 Feb 2025, 17:00 WIB
                                                </span>
                                                <span class="flex items-center gap-1.5">
                                                    <span class="material-symbols-outlined text-[16px]">groups</span>
                                                    3 Pasangan Calon Terdaftar
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Status Badge -->
                                    <div class="flex items-center gap-2 self-start">
                                        <span
                                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-semibold">
                                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                            Berlangsung
                                        </span>
                                    </div>
                                </div>
                                <!-- Live Participation Meter -->
                                <div
                                    class="bg-slate-50 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div class="flex-1 space-y-2">
                                        <div class="flex items-center justify-between text-xs">
                                            <span class="font-medium text-slate-800">Progres Partisipasi Mahasiswa (DPT
                                                Masuk)</span>
                                            <span class="font-mono text-xs font-bold text-violet-600">78.4%
                                                Turnout</span>
                                        </div>
                                        <!-- Progress Bar -->
                                        <div class="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div class="h-full bg-violet-600 rounded-full" style="width: 78.4%;"></div>
                                        </div>
                                        <div class="flex justify-between items-center text-xs text-slate-500">
                                            <span>Total Surat Suara: <strong
                                                    class="text-slate-800 font-semibold">2,150</strong>
                                                terverifikasi</span>
                                            <span>Target DPT: <strong class="text-slate-800 font-semibold">2,740
                                                    Pemilih</strong></span>
                                        </div>
                                    </div>
                                    <!-- Action Buttons -->
                                    <div class="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                                        <button
                                            class="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-xs font-medium rounded-lg hover:bg-primary transition shadow-sm">
                                            <span class="material-symbols-outlined text-[18px]">query_stats</span>
                                            Kelola &amp; Monitoring
                                        </button>
                                        <button
                                            class="p-2 rounded-lg bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                                            title="Menu Opsi">
                                            <span class="material-symbols-outlined text-[20px]">more_vert</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- CARD 2: DPM Fakultas Teknik 2025 (Berlangsung) -->
                            <div
                                class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-5">
                                <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div class="flex items-start gap-4">
                                        <div
                                            class="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <span class="material-symbols-outlined text-[26px]">engineering</span>
                                        </div>
                                        <div class="space-y-1">
                                            <div class="flex flex-wrap items-center gap-2">
                                                <span
                                                    class="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">#PEM-2025-02</span>
                                                <span class="text-xs text-slate-500 font-medium">• Tingkat: Fakultas
                                                    Teknik</span>
                                            </div>
                                            <h3 class="text-lg text-slate-800 font-bold">Dewan Perwakilan Mahasiswa
                                                (DPM) Fakultas Teknik 2025</h3>
                                            <div class="flex items-center gap-4 text-slate-500 text-xs pt-1">
                                                <span class="flex items-center gap-1.5">
                                                    <span class="material-symbols-outlined text-[16px]">event</span>
                                                    27 Feb 2025, 09:00 - 01 Mar 2025, 20:00 WIB
                                                </span>
                                                <span class="flex items-center gap-1.5">
                                                    <span
                                                        class="material-symbols-outlined text-[16px]">person_outline</span>
                                                    5 Kandidat Independen
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Status Badge -->
                                    <div class="flex items-center gap-2 self-start">
                                        <span
                                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-semibold">
                                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                                            Berlangsung
                                        </span>
                                    </div>
                                </div>
                                <!-- Live Participation Meter -->
                                <div
                                    class="bg-slate-50 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div class="flex-1 space-y-2">
                                        <div class="flex items-center justify-between text-xs">
                                            <span class="font-medium text-slate-800">Progres Partisipasi Mahasiswa (DPT
                                                Masuk)</span>
                                            <span class="font-mono text-xs font-bold text-violet-600">62.6%
                                                Turnout</span>
                                        </div>
                                        <!-- Progress Bar -->
                                        <div class="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div class="h-full bg-indigo-500 rounded-full" style="width: 62.6%;"></div>
                                        </div>
                                        <div class="flex justify-between items-center text-xs text-slate-500">
                                            <span>Total Surat Suara: <strong
                                                    class="text-slate-800 font-semibold">1,270</strong>
                                                terverifikasi</span>
                                            <span>Target DPT: <strong class="text-slate-800 font-semibold">2,028
                                                    Pemilih</strong></span>
                                        </div>
                                    </div>
                                    <!-- Action Buttons -->
                                    <div class="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                                        <button
                                            class="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 text-white text-xs font-medium rounded-lg hover:bg-primary transition shadow-sm">
                                            <span class="material-symbols-outlined text-[18px]">query_stats</span>
                                            Kelola &amp; Monitoring
                                        </button>
                                        <button
                                            class="p-2 rounded-lg bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                                            title="Menu Opsi">
                                            <span class="material-symbols-outlined text-[20px]">more_vert</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- CARD 3: HMIF (Terjadwal) -->
                            <div
                                class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-5">
                                <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div class="flex items-start gap-4">
                                        <div
                                            class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <span class="material-symbols-outlined text-[26px]">terminal</span>
                                        </div>
                                        <div class="space-y-1">
                                            <div class="flex flex-wrap items-center gap-2">
                                                <span
                                                    class="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">#PEM-2025-03</span>
                                                <span class="text-xs text-slate-500 font-medium">• Tingkat: Jurusan
                                                    Informatika</span>
                                            </div>
                                            <h3 class="text-lg text-slate-800 font-bold">Pemilihan Ketua Himpunan
                                                Mahasiswa Informatika (HMIF)</h3>
                                            <div class="flex items-center gap-4 text-slate-500 text-xs pt-1">
                                                <span class="flex items-center gap-1.5 text-amber-700 font-medium">
                                                    <span class="material-symbols-outlined text-[16px]">schedule</span>
                                                    Mulai 05 Mar 2025, 08:00 WIB (Buka dalam 5 hari)
                                                </span>
                                                <span class="flex items-center gap-1.5">
                                                    <span class="material-symbols-outlined text-[16px]">badge</span>
                                                    2 Calon Ketua
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Status Badge -->
                                    <div class="flex items-center gap-2 self-start">
                                        <span
                                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-mono text-[10px] font-semibold">
                                            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                                            Terjadwal
                                        </span>
                                    </div>
                                </div>
                                <!-- Bottom Meta & Actions -->
                                <div
                                    class="bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div class="flex items-center gap-6 text-xs">
                                        <span class="text-slate-500">DPT Terdaftar: <strong
                                                class="text-slate-800 font-semibold">820 Mahasiswa Aktif</strong></span>
                                        <span class="text-slate-500">Status Bilik: <span
                                                class="text-emerald-700 font-medium">Terkunci (Auto-Start)</span></span>
                                    </div>
                                    <div class="flex items-center gap-2.5 shrink-0">
                                        <button
                                            class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-800 text-xs font-medium rounded-lg hover:bg-slate-100 transition">
                                            <span class="material-symbols-outlined text-[16px]">tune</span>
                                            Konfigurasi Bilik
                                        </button>
                                        <button
                                            class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-violet-600 text-white text-xs font-medium rounded-lg hover:bg-primary transition shadow-sm">
                                            <span class="material-symbols-outlined text-[16px]">edit</span>
                                            Edit Paslon &amp; Aturan
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- CARD 4: HMM (Draft) -->
                            <div
                                class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-5">
                                <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div class="flex items-start gap-4">
                                        <div
                                            class="w-12 h-12 rounded-xl bg-violet-50 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                                            <span
                                                class="material-symbols-outlined text-[26px]">drive_file_rename_outline</span>
                                        </div>
                                        <div class="space-y-1">
                                            <div class="flex flex-wrap items-center gap-2">
                                                <span
                                                    class="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">#PEM-2025-04</span>
                                                <span class="text-xs text-slate-500 font-medium">• Tingkat: Jurusan
                                                    Manajemen</span>
                                            </div>
                                            <h3 class="text-lg text-slate-800 font-bold">Pemilihan Ketua Himpunan
                                                Mahasiswa Manajemen (HMM)</h3>
                                            <div class="flex items-center gap-4 text-slate-500 text-xs pt-1">
                                                <span class="flex items-center gap-1.5 text-slate-500">
                                                    <span class="material-symbols-outlined text-[16px]">info</span>
                                                    Menunggu kelengkapan berkas visi-misi calon paslon
                                                </span>
                                                <span class="flex items-center gap-1.5">
                                                    <span class="material-symbols-outlined text-[16px]">person</span>
                                                    1 Paslon Masuk Verifikasi
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Status Badge -->
                                    <div class="flex items-center gap-2 self-start">
                                        <span
                                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-500 font-mono text-[10px] font-semibold">
                                            <span class="w-2 h-2 rounded-full bg-slate-400"></span>
                                            Draft
                                        </span>
                                    </div>
                                </div>
                                <!-- Bottom Meta & Actions -->
                                <div
                                    class="bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div class="flex items-center gap-4 text-xs text-slate-500">
                                        <span>Status DPT: <span class="text-amber-700 font-medium">Belum
                                                di-generate</span></span>
                                        <span>Kelengkapan Berkas: <strong
                                                class="text-slate-800 font-semibold">40%</strong></span>
                                    </div>
                                    <div class="flex items-center gap-2.5 shrink-0">
                                        <button
                                            class="inline-flex items-center gap-1.5 px-3.5 py-2 text-red-600 hover:bg-error-container/40 text-xs font-medium rounded-lg transition">
                                            <span class="material-symbols-outlined text-[16px]">delete</span>
                                            Hapus Draft
                                        </button>
                                        <button
                                            class="inline-flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white text-xs font-medium rounded-lg hover:bg-primary transition shadow-sm">
                                            <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                                            Lanjutkan Setup Draft
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- CARD 5: BEM Fakultas Hukum (Selesai) -->
                            <div
                                class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-5">
                                <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                    <div class="flex items-start gap-4">
                                        <div
                                            class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                            <span class="material-symbols-outlined text-[26px]">gavel</span>
                                        </div>
                                        <div class="space-y-1">
                                            <div class="flex flex-wrap items-center gap-2">
                                                <span
                                                    class="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">#PEM-2024-09</span>
                                                <span class="text-xs text-slate-500 font-medium">• Tingkat: Fakultas
                                                    Hukum</span>
                                            </div>
                                            <h3 class="text-lg text-slate-800 font-bold">Musyawarah Mahasiswa BEM
                                                Fakultas Hukum 2024/2025</h3>
                                            <div class="flex items-center gap-4 text-slate-500 text-xs pt-1">
                                                <span class="flex items-center gap-1.5">
                                                    <span class="material-symbols-outlined text-[16px]">history</span>
                                                    Berakhir 15 Jan 2025 • 2 Paslon
                                                </span>
                                                <span class="flex items-center gap-1.5 font-medium text-indigo-700">
                                                    <span class="material-symbols-outlined text-[16px]">verified</span>
                                                    1,140 Suara Sah (94.2% Final Turnout)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Status Badge -->
                                    <div class="flex items-center gap-2 self-start">
                                        <span
                                            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 font-mono text-[10px] font-semibold">
                                            <span class="material-symbols-outlined text-[14px]">done_all</span>
                                            Selesai
                                        </span>
                                    </div>
                                </div>
                                <!-- Bottom Meta & Actions -->
                                <div
                                    class="bg-slate-50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div class="flex items-center gap-3 text-xs text-slate-500">
                                        <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                                        <span>Hasil rekapitulasi resmi telah ditandatangani KPU Kampus</span>
                                    </div>
                                    <div class="flex items-center gap-2.5 shrink-0">
                                        <button
                                            class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-800 text-xs font-medium rounded-lg hover:bg-slate-100 transition">
                                            <span class="material-symbols-outlined text-[16px]">description</span>
                                            Lihat Berita Acara Rekapitulasi
                                        </button>
                                        <button
                                            class="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white text-slate-800 text-xs font-medium rounded-lg hover:bg-slate-100 transition">
                                            <span class="material-symbols-outlined text-[16px]">picture_as_pdf</span>
                                            Unduh Laporan PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Pagination Footer -->
                        <div
                            class="bg-white p-4 rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p class="text-xs text-slate-500">
                                Menampilkan <strong class="text-slate-800 font-semibold">1 - 5</strong> dari <strong
                                    class="text-slate-800 font-semibold">12</strong> agenda pemilihan
                            </p>
                            <div class="flex items-center gap-1.5">
                                <button
                                    class="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40" disabled>
                                    <span class="material-symbols-outlined text-[18px]">chevron_left</span>
                                </button>
                                <button
                                    class="w-8 h-8 rounded-lg bg-violet-600 text-white text-xs font-semibold flex items-center justify-center shadow-sm">
                                    1
                                </button>
                                <button
                                    class="w-8 h-8 rounded-lg bg-slate-50 text-slate-800 text-xs font-medium hover:bg-slate-100 flex items-center justify-center transition">
                                    2
                                </button>
                                <button
                                    class="w-8 h-8 rounded-lg bg-slate-50 text-slate-800 text-xs font-medium hover:bg-slate-100 flex items-center justify-center transition">
                                    3
                                </button>
                                <button class="p-2 rounded-lg bg-slate-50 text-slate-800 hover:bg-slate-100 transition">
                                    <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Right Column: Institutional Flow Guide & Quick Stats Card (3 Cols) -->
                    <div class="xl:col-span-3 flex flex-col space-y-6">
                        <!-- Siklus Alur Pemilihan Kampus -->
                        <div class="bg-white p-6 rounded-xl shadow-sm space-y-5">
                            <div class="flex items-center justify-between pb-3 border-b-0">
                                <div class="flex items-center gap-2">
                                    <span
                                        class="material-symbols-outlined text-violet-600 text-[20px]">account_tree</span>
                                    <h4 class="text-[16px] leading-[22px] text-slate-800 font-bold">Alur Siklus Pemilu
                                    </h4>
                                </div>
                                <span class="font-mono text-[10px] text-violet-600 font-semibold">SOP A-Vote</span>
                            </div>
                            <p class="text-xs text-slate-500">Setiap bilik pemilihan suara digital kampus melalui
                                tahapan berurutan sesuai pedoman kepemiluan mahasiswa:</p>
                            <!-- Vertical Flow Steps -->
                            <div
                                class="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                                <!-- Step 1: Draft -->
                                <div class="flex items-start gap-3.5 relative">
                                    <div
                                        class="w-8 h-8 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                                        1
                                    </div>
                                    <div class="min-w-0 pt-0.5">
                                        <h5 class="text-xs font-bold text-slate-800">1. Draft Persiapan</h5>
                                        <p class="text-xs text-slate-500 text-[11px] leading-4">Input profil paslon,
                                            unggah SK KPUM, dan penentuan kuota DPT.</p>
                                    </div>
                                </div>
                                <!-- Step 2: Terjadwal -->
                                <div class="flex items-start gap-3.5 relative">
                                    <div
                                        class="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                                        2
                                    </div>
                                    <div class="min-w-0 pt-0.5">
                                        <h5 class="text-xs font-bold text-slate-800">2. Terjadwal &amp; Uji Coba</h5>
                                        <p class="text-xs text-slate-500 text-[11px] leading-4">Simulasi bilik, aktivasi
                                            token NIM pemilih, countdown otomatis.</p>
                                    </div>
                                </div>
                                <!-- Step 3: Berlangsung -->
                                <div class="flex items-start gap-3.5 relative">
                                    <div
                                        class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                                        3
                                    </div>
                                    <div class="min-w-0 pt-0.5">
                                        <h5 class="text-xs font-bold text-slate-800">3. Pemungutan Suara</h5>
                                        <p class="text-xs text-slate-500 text-[11px] leading-4">Bilik aktif, mahasiswa
                                            memilih, pemantauan realtime turnout.</p>
                                    </div>
                                </div>
                                <!-- Step 4: Selesai -->
                                <div class="flex items-start gap-3.5 relative">
                                    <div
                                        class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                                        4
                                    </div>
                                    <div class="min-w-0 pt-0.5">
                                        <h5 class="text-xs font-bold text-slate-800">4. Selesai &amp; Penguncian</h5>
                                        <p class="text-xs text-slate-500 text-[11px] leading-4">Bilik suara otomatis
                                            terkunci tepat waktu sesuai batas jadwal.</p>
                                    </div>
                                </div>
                                <!-- Step 5: Rekapitulasi -->
                                <div class="flex items-start gap-3.5 relative">
                                    <div
                                        class="w-8 h-8 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center font-mono text-[10px] font-bold shrink-0">
                                        5
                                    </div>
                                    <div class="min-w-0 pt-0.5">
                                        <h5 class="text-xs font-bold text-slate-800">5. Rekapitulasi &amp; BA</h5>
                                        <p class="text-xs text-slate-500 text-[11px] leading-4">Penerbitan Berita Acara
                                            resmi, persetujuan saksi, dan publikasi.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Campus Election Security & Integrity Banner -->
                        <div class="bg-violet-600 p-6 rounded-xl shadow-md text-white space-y-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 rounded-lg bg-white/15 flex items-center justify-center">
                                    <span class="material-symbols-outlined text-white text-[22px]">verified_user</span>
                                </div>
                                <div>
                                    <h5 class="text-[15px] font-bold leading-tight">Integritas Bilik Suara</h5>
                                    <span class="font-mono text-[10px] text-violet-100">Single-Vote per NIM</span>
                                </div>
                            </div>
                            <p class="text-xs text-violet-100 leading-relaxed">
                                Setiap suara terlindungi oleh token sesi tunggal berbasis NIM mahasiswa aktif terdaftar
                                di Siakad. Bilik dijamin bebas intervensi.
                            </p>
                            <div class="pt-2 flex items-center justify-between text-xs">
                                <span class="font-mono text-[10px] opacity-90">SLA Server: 99.98%</span>
                                <a class="inline-flex items-center gap-1 font-semibold text-white hover:underline"
                                    href="#">
                                    Audit Log
                                    <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
                                </a>
                            </div>
                        </div>
                        <!-- Quick Tips Card -->
                        <div class="bg-white p-5 rounded-xl shadow-sm space-y-3">
                            <div class="flex items-center gap-2 text-slate-800">
                                <span class="material-symbols-outlined text-amber-600 text-[20px]">lightbulb</span>
                                <h5 class="text-sm font-bold">Tips Penjadwalan</h5>
                            </div>
                            <p class="text-xs text-slate-500 leading-relaxed">
                                Disarankan membuka bilik suara digital minimal selama 2 hari kerja kampus agar mahasiswa
                                yang sedang praktikum atau kuliah lapangan tetap memiliki waktu menggunakan hak
                                suaranya.
                            </p>
                        </div>
                    </div>
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

.custom-scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #eff4ff;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #c9c3d9;
    border-radius: 9999px;
}
</style>
