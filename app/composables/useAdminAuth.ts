import { computed, watch } from 'vue'
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
  type Auth
} from 'firebase/auth'

let isListenerAttached = false

const mapAuthErrorMessage = (code?: string): string => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Format email tidak valid.'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email atau password yang Anda masukkan salah.'
    case 'auth/user-disabled':
      return 'Akun pengguna ini telah dinonaktifkan. Silakan hubungi administrator.'
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan masuk yang gagal. Silakan coba beberapa saat lagi.'
    case 'auth/network-request-failed':
      return 'Gagal terhubung ke server autentikasi. Periksa koneksi internet Anda.'
    case 'auth/operation-not-allowed':
      return 'Metode login Email/Password belum diaktifkan pada sistem.'
    default:
      return 'Gagal melakukan autentikasi. Silakan periksa kembali data Anda.'
  }
}

export const useAdminAuth = () => {
  const nuxtApp = useNuxtApp()
  // Menggunakan instance $auth yang telah disediakan oleh app/plugins/firebase.client.ts
  const auth = nuxtApp.$auth as Auth | null | undefined

  const user = useState<User | null>('admin_auth_user', () => null)
  const loading = useState<boolean>('admin_auth_loading', () => true)
  const error = useState<string | null>('admin_auth_error', () => null)

  const initAuthListener = () => {
    // Jalankan listener hanya di client dan hanya satu kali untuk menghindari duplikasi listener
    if (!import.meta.client || isListenerAttached) {
      return
    }

    if (!auth) {
      loading.value = false
      return
    }

    isListenerAttached = true
    loading.value = true

    onAuthStateChanged(
      auth,
      (currentUser) => {
        user.value = currentUser
        loading.value = false
      },
      (err) => {
        console.error('[useAdminAuth] Listener error:', err)
        error.value = 'Terjadi kendala saat memeriksa status sesi autentikasi.'
        loading.value = false
      }
    )
  }

  initAuthListener()

  /**
   * Menunggu inisialisasi sesi Firebase Auth selesai dipulihkan dari penyimpanan lokal.
   * Menggunakan auth.authStateReady() bawaan Firebase Modular SDK jika tersedia.
   */
  const waitUntilReady = async (): Promise<User | null> => {
    if (!import.meta.client) {
      return null
    }

    if (auth && typeof auth.authStateReady === 'function') {
      try {
        await auth.authStateReady()
      } catch (err) {
        console.error('[useAdminAuth] authStateReady error:', err)
      }
      if (auth.currentUser && !user.value) {
        user.value = auth.currentUser
      }
      loading.value = false
      return user.value
    }

    if (!loading.value) {
      return user.value
    }

    return new Promise((resolve) => {
      const unwatch = watch(
        loading,
        (isLoading) => {
          if (!isLoading) {
            unwatch()
            resolve(user.value)
          }
        },
        { immediate: true }
      )
    })
  }

  /**
   * Mengambil daftar whitelist email admin dari konfigurasi environment (runtimeConfig.public.adminEmails).
   */
  const getAdminEmails = (): string[] => {
    const config = useRuntimeConfig()
    const raw = (config.public.adminEmails || '') as string
    return raw
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)
  }

  /**
   * Memeriksa apakah user tertentu termasuk dalam whitelist email admin terotorisasi.
   * Catatan: Ini adalah proteksi navigasi UI, bukan otorisasi Firestore Security Rules.
   */
  const checkIsAdmin = (targetUser?: User | null): boolean => {
    const u = targetUser !== undefined ? targetUser : user.value
    if (!u || !u.email) return false
    const list = getAdminEmails()
    if (list.length === 0) return false
    return list.includes(u.email.trim().toLowerCase())
  }

  const isAdmin = computed(() => checkIsAdmin(user.value))

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!auth) {
      error.value = 'Layanan autentikasi tidak tersedia pada environment ini.'
      return false
    }

    if (!email || !password) {
      error.value = 'Email dan password wajib diisi.'
      return false
    }

    loading.value = true
    error.value = null

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password)
      user.value = userCredential.user
      return true
    } catch (err: any) {
      error.value = mapAuthErrorMessage(err.code)
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async (): Promise<boolean> => {
    if (!auth) {
      error.value = 'Layanan autentikasi tidak tersedia.'
      return false
    }

    loading.value = true
    error.value = null

    try {
      await signOut(auth)
      user.value = null
      return true
    } catch (err: any) {
      console.error('[useAdminAuth] Logout error:', err)
      error.value = 'Gagal mengakhiri sesi. Silakan coba kembali.'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    login,
    logout,
    waitUntilReady,
    checkIsAdmin,
    isAdmin,
    getAdminEmails,
  }
}
