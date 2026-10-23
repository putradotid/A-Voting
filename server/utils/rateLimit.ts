import { createHash } from 'node:crypto'
import { getAdminFirestore } from './firebaseAdmin'

export interface RateLimitStatus {
  allowed: boolean
  remainingAttempts: number
  retryAfterSeconds: number
  message?: string
}

// In-memory fallback jika Firestore Admin belum siap / tidak terjangkau
const memoryStore = new Map<string, { attempts: number; firstAttempt: number; blockedUntil: number }>()

/**
 * Membuat hash SHA-256 untuk anonymisasi identifier (IP / NIM) dalam database.
 */
export function hashRateLimitKey(prefix: string, identifier: string): string {
  const hash = createHash('sha256').update(identifier.trim().toLowerCase()).digest('hex').slice(0, 32)
  return `${prefix}_${hash}`
}

/**
 * Memeriksa status rate limit untuk identifier tertentu.
 */
export async function checkRateLimit(
  docKey: string,
  maxAttempts: number = 5,
  windowSeconds: number = 300,
  lockoutSeconds: number = 900
): Promise<RateLimitStatus> {
  const now = Date.now()
  const db = getAdminFirestore()

  if (db) {
    try {
      const docRef = db.collection('system_rate_limits').doc(docKey)
      const snap = await docRef.get()

      if (snap.exists) {
        const data = snap.data()
        const blockedUntil = Number(data?.blockedUntil || 0)
        const attempts = Number(data?.attempts || 0)
        const firstAttempt = Number(data?.firstAttempt || 0)

        // Sedang dalam status diblokir
        if (blockedUntil > now) {
          const retryAfter = Math.ceil((blockedUntil - now) / 1000)
          const retryMinutes = Math.ceil(retryAfter / 60)
          return {
            allowed: false,
            remainingAttempts: 0,
            retryAfterSeconds: retryAfter,
            message: `Terlalu banyak percobaan masuk yang gagal. Silakan coba kembali dalam ${retryMinutes} menit.`
          }
        }

        // Window sudah kedaluwarsa, kuota kembali penuh
        if (now - firstAttempt > windowSeconds * 1000) {
          return {
            allowed: true,
            remainingAttempts: maxAttempts,
            retryAfterSeconds: 0
          }
        }

        const remaining = Math.max(0, maxAttempts - attempts)
        return {
          allowed: remaining > 0,
          remainingAttempts: remaining,
          retryAfterSeconds: 0
        }
      }

      return {
        allowed: true,
        remainingAttempts: maxAttempts,
        retryAfterSeconds: 0
      }
    } catch (err: any) {
      console.error('[RateLimit] Gagal memeriksa rate limit di Firestore:', err.message || err)
      // Fail-secure: jika Firestore error pada live environment, jangan diam-diam izinkan tanpa batas
      return {
        allowed: false,
        remainingAttempts: 0,
        retryAfterSeconds: 30,
        message: 'Sistem verifikasi keamanan sedang mengalami gangguan sementara. Akses ditolak sementara demi melindungi keamanan akun.'
      }
    }
  }

  // In-Memory Fallback untuk pengujian lokal / mock
  const entry = memoryStore.get(docKey)
  if (!entry) {
    return {
      allowed: true,
      remainingAttempts: maxAttempts,
      retryAfterSeconds: 0
    }
  }

  if (entry.blockedUntil > now) {
    const retryAfter = Math.ceil((entry.blockedUntil - now) / 1000)
    const retryMinutes = Math.ceil(retryAfter / 60)
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: retryAfter,
      message: `Terlalu banyak percobaan masuk yang gagal. Silakan coba kembali dalam ${retryMinutes} menit.`
    }
  }

  if (now - entry.firstAttempt > windowSeconds * 1000) {
    memoryStore.delete(docKey)
    return {
      allowed: true,
      remainingAttempts: maxAttempts,
      retryAfterSeconds: 0
    }
  }

  const remaining = Math.max(0, maxAttempts - entry.attempts)
  return {
    allowed: remaining > 0,
    remainingAttempts: remaining,
    retryAfterSeconds: 0
  }
}

/**
 * Mencatat kegagalan percobaan login secara atomik menggunakan Firestore Transaction.
 */
export async function recordFailedAttempt(
  docKey: string,
  maxAttempts: number = 5,
  windowSeconds: number = 300,
  lockoutSeconds: number = 900
): Promise<RateLimitStatus> {
  const now = Date.now()
  const db = getAdminFirestore()

  if (db) {
    try {
      const docRef = db.collection('system_rate_limits').doc(docKey)

      // Gunakan Firestore Transaction untuk menjamin konsistensi atomik (mencegah race condition multi-instance)
      const result = await db.runTransaction(async (transaction) => {
        const snap = await transaction.get(docRef)
        let attempts = 1
        let firstAttempt = now
        let blockedUntil = 0

        if (snap.exists) {
          const data = snap.data()
          const oldFirst = Number(data?.firstAttempt || 0)
          const oldAttempts = Number(data?.attempts || 0)
          const oldBlocked = Number(data?.blockedUntil || 0)

          if (oldBlocked > now) {
            blockedUntil = Math.max(oldBlocked, now + lockoutSeconds * 1000)
            attempts = oldAttempts + 1
            firstAttempt = oldFirst
          } else if (now - oldFirst <= windowSeconds * 1000) {
            attempts = oldAttempts + 1
            firstAttempt = oldFirst
          }
        }

        if (attempts >= maxAttempts) {
          blockedUntil = now + lockoutSeconds * 1000
        }

        transaction.set(docRef, {
          attempts,
          firstAttempt,
          blockedUntil,
          updatedAt: new Date().toISOString()
        }, { merge: true })

        const retryAfter = blockedUntil > now ? Math.ceil((blockedUntil - now) / 1000) : 0
        const remaining = Math.max(0, maxAttempts - attempts)

        return {
          allowed: attempts < maxAttempts,
          remainingAttempts: remaining,
          retryAfterSeconds: retryAfter,
          message: blockedUntil > now
            ? `Terlalu banyak percobaan gagal. Akses ditangguhkan sementara selama ${Math.ceil(retryAfter / 60)} menit.`
            : undefined
        }
      })

      return result
    } catch (err: any) {
      console.error('[RateLimit] Gagal mencatat rate limit secara atomik di Firestore:', err.message || err)
      // Fail-secure: jika terjadi kendala pencatatan ke database terdistribusi, tolak percobaan
      return {
        allowed: false,
        remainingAttempts: 0,
        retryAfterSeconds: 30,
        message: 'Terjadi kendala pada sistem keamanan verifikasi rate limit.'
      }
    }
  }

  // In-Memory Fallback untuk pengujian lokal / mock
  const entry = memoryStore.get(docKey)
  let attempts = 1
  let firstAttempt = now
  let blockedUntil = 0

  if (entry && now - entry.firstAttempt <= windowSeconds * 1000) {
    attempts = entry.attempts + 1
    firstAttempt = entry.firstAttempt
  }

  if (attempts >= maxAttempts) {
    blockedUntil = now + lockoutSeconds * 1000
  }

  memoryStore.set(docKey, { attempts, firstAttempt, blockedUntil })

  const retryAfter = blockedUntil > now ? Math.ceil((blockedUntil - now) / 1000) : 0
  const remaining = Math.max(0, maxAttempts - attempts)

  return {
    allowed: attempts < maxAttempts,
    remainingAttempts: remaining,
    retryAfterSeconds: retryAfter,
    message: blockedUntil > now
      ? `Terlalu banyak percobaan gagal. Akses ditangguhkan sementara selama ${Math.ceil(retryAfter / 60)} menit.`
      : undefined
  }
}

/**
 * Menghapus catatan percobaan saat login berhasil.
 */
export async function resetRateLimit(docKey: string): Promise<void> {
  memoryStore.delete(docKey)
  const db = getAdminFirestore()
  if (db) {
    try {
      await db.collection('system_rate_limits').doc(docKey).delete()
    } catch (err) {
      console.warn('[RateLimit] Gagal mereset rate limit di Firestore:', err)
    }
  }
}
