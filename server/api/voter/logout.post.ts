import {
  getVoterSessionFromCookie,
  clearVoterSessionCookie,
  validateCsrfToken
} from '../../utils/voterSession'

export default defineEventHandler(async (event) => {
  const session = getVoterSessionFromCookie(event)

  // Validasi proteksi CSRF jika sesi pemilih masih aktif
  if (session) {
    const isCsrfValid = validateCsrfToken(event, session)
    if (!isCsrfValid) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Token keamanan CSRF tidak valid atau tidak cocok.'
      })
    }
  }

  // Hapus cookie sesi dan CSRF dari browser
  clearVoterSessionCookie(event)

  return {
    success: true,
    message: 'Sesi pemilih berhasil diakhiri.'
  }
})
