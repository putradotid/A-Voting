<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useVoterSession } from '~/composables/useVoterSession'

const router = useRouter()
const { logout } = useVoterSession()

// Handler saat verifikasi kedipan mata berhasil
const handleVerified = () => {
  // Arahkan ke bilik suara (sesuaikan path rute jika '/voting' atau '/voter/voting')
  router.push('/voter/voting')
}

// Handler saat verifikasi gagal atau user membatalkan
const handleFailed = async (reason?: string) => {
  if (reason) {
    console.warn('[Liveness] Verifikasi dibatalkan/gagal:', reason)
  }

  // =========================================================================
  // CATATAN: LETAK PENGHAPUSAN TOKEN / PEMBERSIHAN SESI SAAT LIVENESS GAGAL
  // =========================================================================
  try {
    // 1. Jika menggunakan composable sesi internal A-Vote:
    await logout()

    // 2. Jika Anda menyimpan token manual di cookie/localStorage:
    // const tokenCookie = useCookie('voter_token')
    // tokenCookie.value = null
    // if (import.meta.client) {
    //   localStorage.removeItem('voter_session')
    // }
  } catch (err) {
    console.error('[Liveness] Gagal membersihkan sesi:', err)
  }

  // Melempar kembali pengguna ke halaman login
  router.push('/voter/login')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-8">
    <div class="mb-6 text-center">
      <h1 class="text-2xl font-bold text-slate-900">Verifikasi Bilik Suara</h1>
      <p class="text-xs text-slate-500 mt-1">Konfirmasi kehadiran fisik sebelum membuka surat suara</p>
    </div>

    <!-- Wajib dibungkus ClientOnly untuk mencegah SSR Error pada pemanggilan webcam/canvas -->
    <ClientOnly>
      <LivenessAuth
        @verified="handleVerified"
        @failed="handleFailed"
      />
      <template #fallback>
        <div class="w-full max-w-md p-8 bg-white rounded-3xl shadow-md border border-slate-100 flex flex-col items-center text-center">
          <div class="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p class="text-xs font-semibold text-slate-600">Menyiapkan modul kamera...</p>
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

