import type { Firestore } from 'firebase-admin/firestore'

/**
 * Menyelesaikan ID agenda pemilihan aktif di sistem.
 *
 * Kebijakan Isolasi & Keamanan:
 * 1. Pada environment development lokal, variabel lingkungan TEST_ACTIVE_ELECTION_ID
 *    dapat digunakan sebagai override sandbox terisolasi untuk pengujian live
 *    tanpa memodifikasi dokumen produksi `system_settings/active_election`.
 * 2. Pada environment production (NODE_ENV === 'production'), seluruh override pengujian
 *    DITOLAK/DIABAIKAN secara mutlak, sehingga sistem wajib merujuk ke dokumen
 *    Firestore `system_settings/active_election`.
 * 3. Tidak ada parameter request dari browser/klien yang diizinkan untuk memilih agenda.
 */
export async function resolveActiveElectionId(db: Firestore): Promise<string> {
  const isProduction = process.env.NODE_ENV === 'production'
  let testElectionId = ''

  try {
    const config = useRuntimeConfig()
    testElectionId = String(config.testActiveElectionId || process.env.TEST_ACTIVE_ELECTION_ID || '').trim()
  } catch {
    testElectionId = String(process.env.TEST_ACTIVE_ELECTION_ID || '').trim()
  }

  // Pengujian terisolasi hanya aktif di luar mode production
  if (!isProduction && testElectionId) {
    console.info(`[Active Election] Menggunakan agenda pengujian terisolasi (Sandbox Dev): ${testElectionId}`)
    return testElectionId
  }

  const activeSettingSnap = await db.collection('system_settings').doc('active_election').get()
  if (!activeSettingSnap.exists) {
    return ''
  }

  return String(activeSettingSnap.data()?.activeElectionId || '').trim()
}
