import { useVoterSession } from '~/composables/useVoterSession'

export default defineNuxtRouteMiddleware(async (to) => {
  const { voter, isAuthenticated, fetchSession } = useVoterSession()

  // Verifikasi status sesi terkini dari server
  await fetchSession()

  const isLoginPage = to.path === '/voter/login'
  const isReceiptPage = to.path === '/voter/receipt'

  // 1. Jika belum login:
  // Hanya izinkan akses ke /voter/login, tolak semua rute pemilih lainnya
  if (!isAuthenticated.value) {
    if (isLoginPage) return
    return navigateTo('/voter/login')
  }

  // 2. Jika sudah login tetapi mencoba membuka /voter/login:
  if (isLoginPage) {
    if (voter.value?.hasVoted) {
      return navigateTo('/voter/receipt')
    }
    return navigateTo('/voter/pre-voting')
  }

  // 3. Jika pemilih SUDAH memberikan suara (hasVoted === true):
  // Dilarang kembali ke pra-voting atau bilik suara, arahkan ke bukti receipt
  if (voter.value?.hasVoted) {
    if (to.path === '/voter/pre-voting' || to.path === '/voter/voting') {
      return navigateTo('/voter/receipt')
    }
    return
  }

  // 4. Jika pemilih BELUM memberikan suara (hasVoted === false):
  // Dilarang mengakses bukti receipt sebelum memberikan suara
  if (!voter.value?.hasVoted && isReceiptPage) {
    return navigateTo('/voter/pre-voting')
  }
})
