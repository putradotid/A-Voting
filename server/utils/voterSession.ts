import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'

export interface VoterSessionPayload {
  nim: string
  name: string
  faculty: string
  major: string
  electionId: string
  electionName: string
  dptId: string
  hasVoted: boolean
  csrfToken: string
  issuedAt: number
  expiresAt: number
}

const SESSION_COOKIE_NAME = 'a_voting_voter_session'
const CSRF_COOKIE_NAME = 'a_voting_csrf'
// Masa aktif sesi: 30 menit (cukup untuk membaca visi misi dan mencoblos)
const SESSION_MAX_AGE_SECONDS = 30 * 60

/**
 * Mendapatkan secret key untuk tanda tangan kriptografis HMAC.
 * Menolak keras penggunaan secret default pada lingkungan production.
 */
function getSecretKey(): string {
  let secret: string | undefined

  try {
    if (typeof useRuntimeConfig === 'function') {
      const config = useRuntimeConfig()
      secret = config.voterSessionSecret || process.env.VOTER_SESSION_SECRET
    }
  } catch {
    // Abaikan jika dipanggil di luar konteks runtime Nitro
  }

  if (!secret) {
    secret = process.env.VOTER_SESSION_SECRET
  }

  const isProd = process.env.NODE_ENV === 'production'

  if (secret && String(secret).trim().length >= 32) {
    return String(secret).trim()
  }

  // Pada production, HENTIKAN penerbitan sesi jika secret belum disetel dengan aman
  if (isProd) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Konfigurasi keamanan server belum lengkap (VOTER_SESSION_SECRET wajib diatur minimal 32 karakter pada production).'
    })
  }

  // Fallback hanya diizinkan secara terbatas pada mode lokal / development
  return 'a-voting-dev-secret-key-minimum-32-chars-for-local-testing-only'
}

/**
 * Membuat token sesi bertanda tangan (HMAC-SHA256).
 */
export function signSessionPayload(payload: VoterSessionPayload): string {
  const secret = getSecretKey()
  const serialized = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signature = createHmac('sha256', secret).update(serialized).digest('base64url')
  return `${serialized}.${signature}`
}

/**
 * Memvalidasi dan mendecode token sesi bertanda tangan.
 */
export function verifySessionToken(token: string): VoterSessionPayload | null {
  if (!token || typeof token !== 'string' || !token.includes('.')) {
    return null
  }

  const [serialized, signature] = token.split('.')
  if (!serialized || !signature) {
    return null
  }

  try {
    const secret = getSecretKey()
    const expectedSignature = createHmac('sha256', secret).update(serialized).digest('base64url')

    // Bandingkan signature secara timing-safe untuk mencegah timing attack
    const sigBuffer = Buffer.from(signature)
    const expectedBuffer = Buffer.from(expectedSignature)
    if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
      return null
    }

    const rawJson = Buffer.from(serialized, 'base64url').toString('utf-8')
    const payload = JSON.parse(rawJson) as VoterSessionPayload

    // Periksa batas masa berlaku sesi
    if (!payload.expiresAt || Date.now() > payload.expiresAt) {
      return null
    }

    return payload
  } catch {
    return null
  }
}

/**
 * Membuat CSRF token acak berkeamanan tinggi.
 */
export function generateCsrfToken(): string {
  return randomBytes(24).toString('hex')
}

/**
 * Menyimpan sesi pemilih ke dalam HTTP-Only Cookie yang aman.
 * Menggunakan SameSite: 'lax' untuk mendukung navigasi top-level sah sekaligus mencegah CSRF.
 */
export function setVoterSessionCookie(event: H3Event, payload: VoterSessionPayload): void {
  const token = signSessionPayload(payload)
  const isProd = process.env.NODE_ENV === 'production'

  setCookie(event, SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS
  })

  // Cookie CSRF dapat dibaca browser untuk dikirimkan melalui header x-csrf-token
  setCookie(event, CSRF_COOKIE_NAME, payload.csrfToken, {
    httpOnly: false,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS
  })
}

/**
 * Membaca dan memvalidasi sesi pemilih dari cookie request.
 */
export function getVoterSessionFromCookie(event: H3Event): VoterSessionPayload | null {
  const token = getCookie(event, SESSION_COOKIE_NAME)
  if (!token) {
    return null
  }
  return verifySessionToken(token)
}

/**
 * Menghapus cookie sesi pemilih saat logout atau ketika sesi kadaluwarsa.
 */
export function clearVoterSessionCookie(event: H3Event): void {
  deleteCookie(event, SESSION_COOKIE_NAME, {
    path: '/',
    sameSite: 'lax'
  })
  deleteCookie(event, CSRF_COOKIE_NAME, {
    path: '/',
    sameSite: 'lax'
  })
}

/**
 * Memvalidasi CSRF token pada endpoint mutasi (POST, PUT, DELETE).
 */
export function validateCsrfToken(event: H3Event, session: VoterSessionPayload): boolean {
  const headerToken = getHeader(event, 'x-csrf-token') || getHeader(event, 'x-xsrf-token')
  if (!headerToken || typeof headerToken !== 'string') {
    return false
  }

  const tokenBuffer = Buffer.from(headerToken)
  const expectedBuffer = Buffer.from(session.csrfToken)
  if (tokenBuffer.length !== expectedBuffer.length) {
    return false
  }

  return timingSafeEqual(tokenBuffer, expectedBuffer)
}
