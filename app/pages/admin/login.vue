<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'auth',
  middleware: 'admin-auth',
})

const { login, loading, error: authError } = useAdminAuth()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const localError = ref<string | null>(null)

const validateForm = (): boolean => {
  localError.value = null

  if (!email.value.trim()) {
    localError.value = 'Email wajib diisi.'
    return false
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value.trim())) {
    localError.value = 'Format email tidak valid.'
    return false
  }

  if (!password.value) {
    localError.value = 'Password wajib diisi.'
    return false
  }

  return true
}

const handleLogin = async () => {
  if (loading.value) return

  if (!validateForm()) return

  const success = await login(email.value.trim(), password.value)
  if (success) {
    await navigateTo('/admin/dashboard')
  }
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2">


          <!-- =====================================================
               LEFT : ADMIN SECURITY INFORMATION
          ====================================================== -->
          <div
            class="bg-gradient-to-br from-[#f8f6ff] via-[#f5f1ff] to-[#eee9ff] p-6 sm:p-10 lg:p-12"
          >
            <div class="h-full flex flex-col">

              <!-- Header -->
              <div>
                <h1
                  class="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight"
                >
                  Portal Manajemen &amp;
                  <br class="hidden sm:block" />
                  Pengawasan Pleno
                </h1>

                <p
                  class="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4 max-w-lg"
                >
                  Akses terbatas terotorisasi untuk Komisioner KPU,
                  Badan Pengawas Pemilu Mahasiswa (Panwaslu), Saksi
                  Pasangan Calon, dan Auditor Kriptografi Kampus.
                </p>
              </div>

              <!-- Network Integrity Card -->
              <div
                class="bg-white border border-purple-100/80 rounded-xl p-4 sm:p-5 mt-6 shadow-sm"
              >

                <!-- Card Header -->
                <div
                  class="flex items-start justify-between gap-4"
                >
                  <div class="flex items-start gap-3">
                    <div
                      class="w-8 h-8 rounded-lg bg-purple-50 text-[#582be8] flex items-center justify-center shrink-0"
                    >
                      <span class="text-lg">✣</span>
                    </div>

                    <div>
                      <h2
                        class="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wide leading-tight"
                      >
                        Integritas Jaringan Node
                        <br />
                        KPU
                      </h2>
                    </div>
                  </div>

                  <div
                    class="bg-[#e9e4ff] text-[#582be8] px-3 py-2 rounded-lg text-xs font-bold leading-tight"
                  >
                    <span class="block">5/5</span>
                    <span class="block">SINKRON</span>
                  </div>
                </div>

                <!-- Byzantine -->
                <div
                  class="mt-4 bg-[#f3f6ff] rounded-lg p-3 flex items-center justify-between gap-3"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="w-11 h-11 rounded-full border-4 border-[#582be8] flex items-center justify-center shrink-0"
                    >
                      <span
                        class="text-[10px] font-bold text-[#582be8]"
                      >
                        100%
                      </span>
                    </div>

                    <div>
                      <h3
                        class="text-xs sm:text-sm font-bold text-slate-900"
                      >
                        Byzantine Fault Tolerant
                      </h3>

                      <p
                        class="text-[11px] sm:text-xs text-slate-500 font-mono mt-0.5"
                      >
                        Blok Genesis #2025-PEMIRA-01
                      </p>
                    </div>
                  </div>

                  <span
                    class="text-[#582be8] text-lg"
                  >
                    ♢
                  </span>
                </div>

                <!-- Security Features -->
                <div
                  class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3"
                >

                  <!-- MFA -->
                  <div
                    class="bg-[#f3f6ff] rounded-lg p-3.5"
                  >
                    <div
                      class="flex items-center gap-2 text-[#582be8] mb-2"
                    >
                      <span class="text-sm">♟</span>

                      <h3
                        class="text-xs font-bold uppercase tracking-wide"
                      >
                        Protokol MFA
                      </h3>
                    </div>

                    <p
                      class="text-xs sm:text-sm text-slate-600 leading-relaxed"
                    >
                      FIDO2 WebAuthn &amp;
                      <br class="hidden sm:block" />
                      Time-based OTP
                      <br class="hidden sm:block" />
                      terikat sesi.
                    </p>
                  </div>

                  <!-- Zero Tamper -->
                  <div
                    class="bg-[#f3f6ff] rounded-lg p-3.5"
                  >
                    <div
                      class="flex items-center gap-2 text-[#582be8] mb-2"
                    >
                      <span class="text-sm">♧</span>

                      <h3
                        class="text-xs font-bold uppercase tracking-wide"
                      >
                        Zero-Tamper
                        <br />
                        Trail
                      </h3>
                    </div>

                    <p
                      class="text-xs sm:text-sm text-slate-600 leading-relaxed"
                    >
                      Setiap penekanan
                      <br class="hidden sm:block" />
                      tombol tercatat di
                      <br class="hidden sm:block" />
                      ledger permanen.
                    </p>
                  </div>

                </div>

                <!-- Auto Lock -->
                <div
                  class="flex items-start gap-2.5 mt-4 px-2 text-slate-600"
                >
                  <span
                    class="text-[#582be8] text-sm mt-0.5"
                  >
                    ◷
                  </span>

                  <p
                    class="text-[11px] sm:text-xs font-mono leading-relaxed"
                  >
                    Auto-lock 15 menit
                    inaktivitas | Subnet
                    <br class="hidden sm:block" />
                    Kampus Terdaftar
                  </p>
                </div>
              </div>

              <!-- Protocol Warning -->
              <div
                class="bg-[#f1ecff] border border-purple-100/60 rounded-xl p-4 sm:p-5 mt-4"
              >
                <div class="flex items-start gap-3">

                  <div
                    class="text-[#582be8] text-lg shrink-0"
                  >
                    ◉
                  </div>

                  <div>
                    <h2
                      class="text-xs sm:text-sm font-bold text-[#4c27c9] uppercase tracking-wide"
                    >
                      Peringatan Protokol Dewan Kehormatan
                    </h2>

                    <p
                      class="text-[11px] sm:text-xs text-[#582be8] leading-relaxed mt-2"
                    >
                      Sesuai UU Pemira Mahasiswa Pasal 42,
                      setiap upaya penetrasi ilegal atau rekayasa
                      data penghitungan suara diproses melalui
                      Mahkamah Mahasiswa serta sanksi pidana UU ITE
                      Republik Indonesia.
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <!-- =====================================================
               RIGHT : ADMIN LOGIN
          ====================================================== -->
          <div
            class="p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white"
          >
            <div class="max-w-md w-full mx-auto">

              <!-- Brand Logo -->
              <div class="flex items-center gap-3 mb-6">
                <img
                  src="/A-voting%20logo.png"
                  alt="A-Vote Logo"
                  class="w-10 h-10 object-contain shrink-0"
                />
                <div class="flex items-center gap-2">
                  <span class="text-xl font-bold tracking-tight text-[#582be8]">A-Vote</span>
                  <span class="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                    Admin Panel
                  </span>
                </div>
              </div>

              <!-- Heading -->
              <div class="mb-8">
                <span
                  class="text-[11px] font-semibold text-[#582be8] uppercase tracking-wider"
                >
                  Akses Admin
                </span>

                <h2
                  class="text-2xl sm:text-3xl font-bold text-slate-900 mt-2"
                >
                  Login Admin / Panitia
                </h2>

                <p
                  class="text-sm text-slate-500 mt-2 leading-relaxed"
                >
                  Masuk menggunakan akun administrator yang telah
                  diberikan oleh sistem.
                </p>
              </div>

              <!-- Form -->
              <form class="space-y-5" @submit.prevent="handleLogin">

                <!-- Error Alert -->
                <div
                  v-if="localError || authError"
                  class="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-start gap-2.5"
                >
                  <span class="text-rose-500 text-base leading-none">⚠</span>
                  <span class="flex-1 leading-relaxed">{{ localError || authError }}</span>
                </div>

                <!-- Username -->
                <div>
                  <label
                    for="username"
                    class="block text-sm font-semibold text-slate-800 mb-2"
                  >
                    Email / Username
                  </label>

                  <div class="relative">
                    <span
                      class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none"
                    >
                      ✉
                    </span>

                    <input
                      id="username"
                      name="username"
                      type="email"
                      v-model="email"
                      :disabled="loading"
                      @input="localError = null"
                      placeholder="admin@kampus.ac.id"
                      autocomplete="username"
                      class="w-full h-12 pl-11 pr-4 bg-slate-50 border border-purple-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#582be8] focus:ring-2 focus:ring-purple-100 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <!-- Password -->
                <div>
                  <label
                    for="password"
                    class="block text-sm font-semibold text-slate-800 mb-2"
                  >
                    Password
                  </label>

                  <div class="relative">
                    <span
                      class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none"
                    >
                      🔒
                    </span>

                    <input
                      id="password"
                      name="password"
                      :type="showPassword ? 'text' : 'password'"
                      v-model="password"
                      :disabled="loading"
                      @input="localError = null"
                      placeholder="Masukkan password"
                      autocomplete="current-password"
                      class="w-full h-12 pl-11 pr-11 bg-slate-50 border border-purple-100 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-[#582be8] focus:ring-2 focus:ring-purple-100 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    />

                    <button
                      type="button"
                      @click="showPassword = !showPassword"
                      class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-[#582be8]"
                      :aria-label="showPassword ? 'Sembunyikan password' : 'Lihat password'"
                    >
                      {{ showPassword ? '👁' : '◉' }}
                    </button>
                  </div>
                </div>

                <!-- Remember & Forgot -->
                <div
                  class="flex items-center justify-between gap-4"
                >
                  <label
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      v-model="rememberMe"
                      class="w-4 h-4 rounded border-purple-200 text-[#582be8] focus:ring-purple-200"
                    />

                    <span
                      class="text-xs sm:text-sm text-slate-600"
                    >
                      Ingat saya
                    </span>
                  </label>

                  <a
                    href="#forgot-password"
                    class="text-xs sm:text-sm font-medium text-[#582be8] hover:underline"
                  >
                    Lupa password?
                  </a>
                </div>

                <!-- Login Button -->
                <button
                  type="submit"
                  :disabled="loading"
                  class="w-full h-12 bg-[#582be8] hover:bg-[#4820ca] disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-purple-600/15 hover:shadow-lg hover:shadow-purple-600/20 transition-all duration-200 active:scale-[0.99]"
                >
                  <template v-if="loading">
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Memproses...</span>
                  </template>
                  <template v-else>
                    <span class="text-lg">→</span>
                    <span>Masuk ke Dashboard</span>
                  </template>
                </button>

              </form>

              <!-- Divider -->
              <div
                class="flex items-center gap-4 my-7"
              >
                <div
                  class="flex-1 h-px bg-purple-100"
                ></div>

                <span
                  class="text-xs text-slate-400"
                >
                  atau
                </span>

                <div
                  class="flex-1 h-px bg-purple-100"
                ></div>
              </div>

              <!-- OTP -->
              <button
                type="button"
                class="w-full h-12 bg-white hover:bg-purple-50 text-[#582be8] border border-purple-300 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              >
                <span class="text-lg">⚿</span>

                <span>
                  Login dengan OTP
                </span>
              </button>

              <!-- Security Info -->
              <div
                class="mt-8 flex items-center justify-center gap-2 text-center"
              >
                <span
                  class="text-[#582be8]"
                >
                  🛡️
                </span>

                <p
                  class="text-[11px] text-slate-400"
                >
                  Akses admin dilindungi autentikasi berlapis
                </p>
              </div>

            </div>
          </div>

  </div>
</template>