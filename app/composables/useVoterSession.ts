import { computed } from 'vue'

export interface VoterProfile {
  nim: string
  name: string
  faculty: string
  major: string
  electionId: string
  electionName: string
  hasVoted: boolean
}

export interface VoterReceipt {
  receiptToken: string
  votedAt: string
  electionId: string
  electionName: string
  voter: {
    nim: string
    name: string
    faculty: string
    major: string
  }
}

export const useVoterSession = () => {
  const voter = useState<VoterProfile | null>('voter_session_profile', () => null)
  const receipt = useState<VoterReceipt | null>('voter_session_receipt', () => null)
  const csrfToken = useState<string | null>('voter_session_csrf_token', () => null)
  const loading = useState<boolean>('voter_session_loading', () => false)
  const error = useState<string | null>('voter_session_error', () => null)
  const isInitialized = useState<boolean>('voter_session_initialized', () => false)

  const isAuthenticated = computed(() => !!voter.value)

  /**
   * Mengambil token CSRF dari cookie klien jika state belum terisi
   */
  function getClientCsrfToken(): string {
    if (csrfToken.value) return csrfToken.value
    if (import.meta.client) {
      const match = document.cookie.match(/(^|;)\s*a_voting_csrf\s*=\s*([^;]+)/)
      if (match && match[2]) {
        csrfToken.value = decodeURIComponent(match[2])
        return csrfToken.value
      }
    }
    return ''
  }

  /**
   * Memeriksa status sesi pemilih ke server (/api/voter/session).
   */
  async function fetchSession(force = false): Promise<VoterProfile | null> {
    if (isInitialized.value && !force && voter.value) {
      return voter.value
    }

    loading.value = true
    error.value = null

    try {
      // Pada SSR, teruskan header cookie dari request klien agar sesi terverifikasi
      // Hanya dikirimkan ke endpoint internal /api/voter/session (tidak bocor ke domain eksternal)
      const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined
      const res = await $fetch<{ authenticated: boolean; voter: VoterProfile | null; receipt?: VoterReceipt | null }>('/api/voter/session', {
        headers
      })
      if (res.authenticated && res.voter) {
        voter.value = res.voter
        if (res.receipt) {
          receipt.value = res.receipt
        }
      } else {
        voter.value = null
        receipt.value = null
      }
      isInitialized.value = true
      return voter.value
    } catch (err: any) {
      console.warn('[useVoterSession] Gagal memverifikasi sesi pemilih dari server:', err.message || err)
      voter.value = null
      isInitialized.value = true
      return null
    } finally {
      loading.value = false
    }
  }

  /**
   * Melakukan login pemilih dengan NIM dan Tanggal Lahir via POST /api/voter/login.
   */
  async function login(nim: string, dob: string): Promise<VoterProfile> {
    loading.value = true
    error.value = null

    try {
      const res = await $fetch<{
        success: boolean
        message: string
        csrfToken: string
        voter: VoterProfile
      }>('/api/voter/login', {
        method: 'POST',
        body: { nim, dob }
      })

      if (!res.success || !res.voter) {
        throw new Error(res.message || 'Gagal melakukan verifikasi identitas pemilih.')
      }

      voter.value = res.voter
      if (res.csrfToken) {
        csrfToken.value = res.csrfToken
      }
      isInitialized.value = true
      return res.voter
    } catch (err: any) {
      const msg = err.data?.statusMessage || err.message || 'Gagal melakukan login. Periksa kembali NIM dan tanggal lahir Anda.'
      error.value = msg
      throw new Error(msg)
    } finally {
      loading.value = false
    }
  }

  /**
   * Mengakhiri sesi pemilih via POST /api/voter/logout.
   */
  async function logout(): Promise<void> {
    loading.value = true
    try {
      const token = getClientCsrfToken()
      await $fetch('/api/voter/logout', {
        method: 'POST',
        headers: token ? { 'x-csrf-token': token } : {}
      })
    } catch (err) {
      console.warn('[useVoterSession] Kendala saat logout di server:', err)
    } finally {
      voter.value = null
      receipt.value = null
      csrfToken.value = null
      isInitialized.value = false
      loading.value = false
      if (import.meta.client) {
        await navigateTo('/voter/login')
      }
    }
  }

  return {
    voter,
    receipt,
    csrfToken,
    loading,
    error,
    isInitialized,
    isAuthenticated,
    fetchSession,
    login,
    logout,
    getClientCsrfToken
  }
}
