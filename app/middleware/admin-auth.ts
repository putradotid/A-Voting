export default defineNuxtRouteMiddleware(async (to) => {
  // Hanya eksekusi pemeriksaan di sisi client karena Firebase Auth berjalan di client
  if (import.meta.server) return

  const { waitUntilReady, checkIsAdmin } = useAdminAuth()

  // Tunggu Firebase Auth selesai memulihkan status sesi dari penyimpanan lokal
  const currentUser = await waitUntilReady()
  const isAuthorized = checkIsAdmin(currentUser)

  const isLoginPage = to.path === '/admin/login'

  // Jika membuka halaman login admin:
  // Pengguna yang sudah memiliki sesi aktif dan termasuk dalam whitelist admin dialihkan ke dashboard
  if (isLoginPage) {
    if (isAuthorized) {
      return navigateTo('/admin/dashboard')
    }
    return
  }

  // Untuk semua rute admin terproteksi:
  // Pengguna yang belum login atau emailnya tidak termasuk dalam whitelist admin diarahkan ke /admin/login
  if (!isAuthorized) {
    return navigateTo('/admin/login')
  }
})
