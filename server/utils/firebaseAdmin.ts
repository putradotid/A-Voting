import { initializeApp, getApps, getApp, cert, applicationDefault, type App } from 'firebase-admin/app'
import { getFirestore, type Firestore } from 'firebase-admin/firestore'
import { getAuth, type Auth } from 'firebase-admin/auth'
import fs from 'node:fs'
import path from 'node:path'

let adminAppInstance: App | null = null

function getSafeConfig(): any {
  try {
    if (typeof useRuntimeConfig === 'function') {
      return useRuntimeConfig()
    }
  } catch {
    // Abaikan jika di luar konteks Nitro
  }
  return { public: {} }
}

/**
 * Menyelesaikan path berkas Service Account secara deterministik pada lingkungan Nuxt / Nitro.
 * Mendukung path absolut, path relatif terhadap root proyek, serta toleransi terhadap ekstensi ganda (.json.json di Windows).
 */
export function resolveServiceAccountPath(inputPath?: string | null): string | null {
  if (!inputPath || typeof inputPath !== 'string') return null

  const trimmed = inputPath.trim()
  if (!trimmed) return null

  // Variasi nama berkas (termasuk penanganan kasus Windows Explorer extension hiding .json.json)
  const fileVariants: string[] = [trimmed]
  if (trimmed.endsWith('.json') && !trimmed.endsWith('.json.json')) {
    fileVariants.push(trimmed + '.json')
  }
  if (trimmed.endsWith('.json.json')) {
    fileVariants.push(trimmed.slice(0, -5))
  }

  // 1. Jika path absolut
  if (path.isAbsolute(trimmed)) {
    for (const variant of fileVariants) {
      if (fs.existsSync(variant)) {
        try {
          if (fs.statSync(variant).isFile()) {
            return path.normalize(variant)
          }
        } catch {
          // Abaikan jika tidak dapat diakses
        }
      }
    }
    return null
  }

  // 2. Jika path relatif: cari terhadap direktori kandidat root proyek
  const candidateDirs: string[] = []
  const cwd = process.cwd()
  candidateDirs.push(cwd)

  // Jika proses berjalan dari subdirektori build (misal .output/server)
  if (cwd.includes('.output')) {
    const rootFromCwd = cwd.split('.output')[0]
    if (rootFromCwd && !candidateDirs.includes(rootFromCwd)) {
      candidateDirs.push(rootFromCwd)
    }
  }

  // Cari direktori leluhur yang memuat package.json (root proyek aktual)
  try {
    let dir = cwd
    for (let i = 0; i < 4; i++) {
      if (fs.existsSync(path.join(dir, 'package.json')) && !candidateDirs.includes(dir)) {
        candidateDirs.push(dir)
        break
      }
      const parent = path.dirname(dir)
      if (parent === dir) break
      dir = parent
    }
  } catch {
    // Abaikan error penelusuran folder
  }

  for (const dir of candidateDirs) {
    for (const variant of fileVariants) {
      const full = path.resolve(dir, variant)
      if (fs.existsSync(full)) {
        try {
          if (fs.statSync(full).isFile()) {
            return path.normalize(full)
          }
        } catch {
          // Abaikan jika tidak dapat diakses
        }
      }
    }
  }

  return null
}

/**
 * Memeriksa apakah kredensial Firebase Admin SDK telah terkonfigurasi.
 */
export function isFirebaseAdminConfigured(): boolean {
  const config = getSafeConfig()
  const accountPath = config.firebaseAdminServiceAccountPath || process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH
  const clientEmail = config.firebaseAdminClientEmail || process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = config.firebaseAdminPrivateKey || process.env.FIREBASE_ADMIN_PRIVATE_KEY
  const projectId = config.firebaseAdminProjectId || process.env.FIREBASE_ADMIN_PROJECT_ID || config.public?.firebaseProjectId

  if (accountPath) {
    const resolvedPath = resolveServiceAccountPath(accountPath)
    if (resolvedPath) {
      return true
    }
  }

  if (projectId && clientEmail && privateKey) {
    return true
  }

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
    return true
  }

  return false
}

/**
 * Menginisialisasi atau mengambil instance Firebase Admin App secara singleton (mencegah inisialisasi ganda).
 * Berjalan secara eksklusif di server runtime (Nitro).
 */
export function getAdminApp(): App | null {
  // Cegah inisialisasi ganda dengan memeriksa getApps() bawaan Firebase Admin SDK
  if (getApps().length > 0) {
    return getApp()
  }

  if (adminAppInstance) {
    return adminAppInstance
  }

  const config = getSafeConfig()
  const accountPath = config.firebaseAdminServiceAccountPath || process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH
  const clientEmail = config.firebaseAdminClientEmail || process.env.FIREBASE_ADMIN_CLIENT_EMAIL
  const privateKey = config.firebaseAdminPrivateKey || process.env.FIREBASE_ADMIN_PRIVATE_KEY
  const projectId = config.firebaseAdminProjectId || process.env.FIREBASE_ADMIN_PROJECT_ID || config.public?.firebaseProjectId

  try {
    // 1. Inisialisasi melalui file JSON Service Account jika ditentukan dan filenya ada
    if (accountPath) {
      const resolvedPath = resolveServiceAccountPath(accountPath)
      if (resolvedPath) {
        const rawJson = fs.readFileSync(resolvedPath, 'utf-8')
        const serviceAccount = JSON.parse(rawJson)
        adminAppInstance = initializeApp({
          credential: cert(serviceAccount),
          projectId: serviceAccount.project_id || projectId
        })
        return adminAppInstance
      } else if (import.meta.dev) {
        const safeBase = path.basename(accountPath)
        console.warn(`[Firebase Admin] File service account ("${safeBase}") tidak ditemukan di root proyek.`)
      }
    }

    // 2. Inisialisasi melalui environment variables individual
    if (projectId && clientEmail && privateKey) {
      // Normalisasi karakter newline pada private key PEM yang sering ter-escape (\n -> baris baru)
      const formattedPrivateKey = privateKey.replace(/\\n/g, '\n')
      adminAppInstance = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: formattedPrivateKey
        }),
        projectId
      })
      return adminAppInstance
    }

    // 3. Inisialisasi melalui Google Application Default Credentials (ADC)
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS && fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)) {
      adminAppInstance = initializeApp({
        credential: applicationDefault(),
        projectId
      })
      return adminAppInstance
    }

    // 4. Jika belum dikonfigurasi, log peringatan di mode dev tanpa membuat server crash
    if (import.meta.dev) {
      console.warn(
        '[Firebase Admin] Kredensial server belum dikonfigurasi. Pastikan FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH atau FIREBASE_ADMIN_CLIENT_EMAIL dan FIREBASE_ADMIN_PRIVATE_KEY telah diatur pada file .env.'
      )
    }

    return null
  } catch (err: any) {
    console.error('[Firebase Admin] Gagal menginisialisasi Firebase Admin SDK:', err.message || err)
    return null
  }
}

/**
 * Mendapatkan instance Cloud Firestore dengan hak akses istimewa server (Admin SDK).
 * Melewati Security Rules secara aman untuk pemrosesan backend privat.
 */
export function getAdminFirestore(): Firestore | null {
  const app = getAdminApp()
  if (!app) {
    return null
  }
  return getFirestore(app)
}

/**
 * Mendapatkan instance Firebase Auth dengan hak akses server (Admin SDK).
 */
export function getAdminAuth(): Auth | null {
  const app = getAdminApp()
  if (!app) {
    return null
  }
  return getAuth(app)
}
