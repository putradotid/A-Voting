import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
    measurementId: config.public.firebaseMeasurementId,
  }

  // Gunakan getApps() dan getApp() untuk mencegah inisialisasi ganda
  const app: FirebaseApp | null = getApps().length === 0
    ? (firebaseConfig.apiKey && firebaseConfig.projectId
        ? initializeApp(firebaseConfig)
        : null)
    : getApp()

  const firestore: Firestore | null = app ? getFirestore(app) : null
  const auth: Auth | null = app ? getAuth(app) : null

  if (!app && import.meta.dev) {
    console.warn(
      '[Firebase Plugin] Firebase belum diinisialisasi karena kredensial di .env belum diisi (minimal NUXT_PUBLIC_FIREBASE_API_KEY dan NUXT_PUBLIC_FIREBASE_PROJECT_ID).'
    )
  }

  return {
    provide: {
      firebaseApp: app,
      firestore: firestore,
      db: firestore,
      auth: auth,
    },
  }
})
