// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    head: {
      title: 'A-Vote — Platform Pemilihan Digital Mahasiswa',
      link: [
        { rel: 'icon', type: 'image/png', href: '/A-voting%20logo.png' }
      ]
    }
  },
  runtimeConfig: {
    // Server-only runtime config (tidak pernah diekspos ke browser / client bundle)
    firebaseAdminProjectId: process.env.FIREBASE_ADMIN_PROJECT_ID || '',
    firebaseAdminClientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || '',
    firebaseAdminPrivateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY || '',
    firebaseAdminServiceAccountPath: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_PATH || '',
    voterSessionSecret: process.env.VOTER_SESSION_SECRET || '',
    testActiveElectionId: process.env.TEST_ACTIVE_ELECTION_ID || '',

    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID || '',
      firebaseMeasurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
      adminEmails: process.env.NUXT_PUBLIC_ADMIN_EMAILS || process.env.ADMIN_EMAILS || '',
    },
  },
})
