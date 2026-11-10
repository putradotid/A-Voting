export default defineNuxtRouteMiddleware((to, from) => {
  // Ambil Global State hasil verifikasi liveness
  const isFaceVerified = useState<boolean>('liveness_verified', () => false)

  // Tolak akses jika wajah belum tervalidasi dan kembalikan ke halaman regulasi/pra-voting
  if (!isFaceVerified.value) {
    return navigateTo('/voter/pre-voting')
  }
})

