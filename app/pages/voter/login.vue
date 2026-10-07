```vue
<script setup lang="ts">

</script>

<template>
  <main>
    <section
      class="pt-16 pb-20 px-4 sm:px-6 max-w-[1240px] mx-auto"
    >
      <div
        class="bg-white rounded-2xl border border-purple-100/80 shadow-lg shadow-purple-600/5 overflow-hidden"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2">

          <!-- LEFT -->
          <div
            class="bg-gradient-to-br from-[#f8f6ff] via-[#f5f1ff] to-[#eee9ff] p-6 sm:p-10 lg:p-12 flex flex-col justify-between"
          >
            <div>

              <!-- Status -->
              <div
                class="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-purple-200/80 px-3.5 py-1.5 rounded-full shadow-sm"
              >
                <span class="relative flex w-2 h-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75"
                  ></span>

                  <span
                    class="relative inline-flex rounded-full w-2 h-2 bg-[#582be8]"
                  ></span>
                </span>

                <span
                  class="text-[11px] font-semibold text-[#582be8] uppercase tracking-wider"
                >
                  Pemira Mahasiswa 2025 Sedang Berlangsung
                </span>
              </div>

              <!-- Icon -->
              <div
                class="w-14 h-14 rounded-2xl bg-[#582be8] text-white flex items-center justify-center text-2xl shadow-lg shadow-purple-600/20 mt-7 mb-5"
              >
                🗳️
              </div>

              <h1
                class="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight"
              >
                Suara Anda
                <span class="text-[#582be8]">Berarti.</span>
              </h1>

              <p
                class="text-sm sm:text-base text-slate-600 leading-relaxed mt-4 max-w-lg"
              >
                Gunakan hak pilih Anda untuk memilih Ketua BEM dan
                Anggota DPM Kampus periode 2025/2026.
              </p>

              <div class="mt-8 space-y-5">

                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-lg bg-white border border-purple-100 text-[#582be8] flex items-center justify-center shrink-0"
                  >
                    🪪
                  </div>

                  <div>
                    <h3 class="text-sm font-bold text-slate-800">
                      Identitas Terverifikasi
                    </h3>

                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                      Gunakan NIM dan tanggal lahir yang terdaftar
                      pada sistem akademik kampus.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-lg bg-white border border-purple-100 text-[#582be8] flex items-center justify-center shrink-0"
                  >
                    🔒
                  </div>

                  <div>
                    <h3 class="text-sm font-bold text-slate-800">
                      Aman &amp; Rahasia
                    </h3>

                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                      Data pemilih dan pilihan Anda dijaga
                      kerahasiaannya oleh sistem.
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-3">
                  <div
                    class="w-8 h-8 rounded-lg bg-white border border-purple-100 text-[#582be8] flex items-center justify-center shrink-0"
                  >
                    ✓
                  </div>

                  <div>
                    <h3 class="text-sm font-bold text-slate-800">
                      Satu Pemilih, Satu Suara
                    </h3>

                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                      Setiap mahasiswa yang telah terverifikasi
                      hanya dapat memberikan satu suara.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div
              class="flex items-center gap-2 mt-10 pt-5 border-t border-purple-200/70"
            >
              <span>🛡️</span>

              <span class="text-xs font-medium text-slate-600">
                Sistem pemilihan aman, rahasia &amp; terverifikasi
              </span>
            </div>
          </div>

          <!-- RIGHT -->
          <div
            class="p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white"
          >
            <div class="max-w-md w-full mx-auto">

              <div class="mb-8">
                <span
                  class="text-[11px] font-semibold text-[#582be8] uppercase tracking-wider"
                >
                  Akses Pemilih
                </span>

                <h2
                  class="text-2xl sm:text-3xl font-bold text-slate-900 mt-2"
                >
                  Login Mahasiswa
                </h2>

                <p
                  class="text-sm text-slate-500 mt-2 leading-relaxed"
                >
                  Masuk menggunakan identitas mahasiswa yang
                  terdaftar pada sistem kampus.
                </p>
              </div>

              <form class="space-y-5">

                <!-- NIM -->
                <div>
                  <label
                    for="nim"
                    class="block text-sm font-semibold text-slate-800 mb-2"
                  >
                    Nomor Induk Mahasiswa (NIM)
                  </label>

                  <div class="relative">
                    <span
                      class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
                    >
                      🪪
                    </span>

                    <input
                      id="nim"
                      name="nim"
                      type="text"
                      placeholder="Contoh: 2108101012"
                      autocomplete="username"
                      class="w-full h-12 pl-11 pr-4 bg-slate-50 border border-purple-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#582be8] focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                    />
                  </div>
                </div>

                <!-- DOB -->
                <div>
                  <label
                    for="dob"
                    class="block text-sm font-semibold text-slate-800 mb-2"
                  >
                    Tanggal Lahir
                  </label>

                  <div class="relative">
                    <span
                      class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400"
                    >
                      📅
                    </span>

                    <input
                      id="dob"
                      name="dob"
                      type="text"
                      placeholder="Contoh : ddmmyyyy"
                      class="w-full h-12 pl-11 pr-4 bg-slate-50 border border-purple-100 rounded-xl text-sm text-slate-800 focus:outline-none focus:bg-white focus:border-[#582be8] focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                    />
                  </div>

                  <p class="text-[11px] text-slate-400 mt-2">
                    Pastikan tanggal lahir sesuai dengan data mahasiswa Anda.
                  </p>
                </div>

                <NuxtLink to="/voter/pre-voting"
                  class="w-full h-12 bg-[#582be8] hover:bg-[#4820ca] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-purple-600/15 hover:shadow-lg hover:shadow-purple-600/20 transition-all duration-200 active:scale-[0.99]"
                >
                  <span>Masuk ke Bilik Suara</span>
                  <span>→</span>
                </NuxtLink>
                <!-- <button
                  type="submit"
                  class="w-full h-12 bg-[#582be8] hover:bg-[#4820ca] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-purple-600/15 hover:shadow-lg hover:shadow-purple-600/20 transition-all duration-200 active:scale-[0.99]"
                >
                  <span>Masuk ke Bilik Suara</span>
                  <span>→</span>
                </button> -->

              </form>

              <div
                class="flex flex-col items-center text-center mt-7 gap-2"
              >
                <a
                  href="#helpdesk"
                  class="text-xs font-medium text-[#582be8] hover:underline"
                >
                  Butuh bantuan login? Hubungi Panitia KPU
                </a>

                <a
                  href="#admin"
                  class="text-xs text-slate-500 hover:text-[#582be8] transition-colors"
                >
                  Login sebagai Admin / Panitia
                </a>
              </div>

              <div
                class="mt-8 bg-purple-50 border border-purple-100 rounded-xl p-3.5 flex items-start gap-3"
              >
                <span>🔐</span>

                <p class="text-[11px] text-purple-800 leading-relaxed">
                  Data login Anda digunakan hanya untuk proses verifikasi
                  pemilih dan tidak ditampilkan kepada pihak lain.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  </main>
</template>