/**
 * Memvalidasi apakah string tanggal lahir sesuai format YYYY-MM-DD,
 * merupakan tanggal kalender yang valid, dan tidak berada di masa depan.
 */
export function isValidBirthDate(dateStr?: string | null): boolean {
  if (!dateStr || typeof dateStr !== 'string') return false
  const trimmed = dateStr.trim()
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(trimmed)) return false

  const [yearStr, monthStr, dayStr] = trimmed.split('-')
  const year = Number(yearStr)
  const month = Number(monthStr)
  const day = Number(dayStr)

  const currentYear = new Date().getFullYear()
  if (year < 1940 || year > currentYear) return false
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false

  const dateObj = new Date(year, month - 1, day)
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    return false
  }

  const today = new Date()
  today.setHours(23, 59, 59, 999)
  if (dateObj > today) {
    return false
  }

  return true
}

/**
 * Menormalisasi berbagai format tanggal lahir input pemilih menjadi format baku ISO YYYY-MM-DD.
 * Mendukung format:
 * - YYYY-MM-DD (misal: 2003-08-17)
 * - DD-MM-YYYY atau DD/MM/YYYY (misal: 17-08-2003 atau 17/08/2003)
 * - 8 digit angka DDMMYYYY (misal: 17082003) atau YYYYMMDD (misal: 20030817)
 */
export function normalizeDateInput(input?: string | null): string | null {
  if (!input || typeof input !== 'string') {
    return null
  }

  const cleaned = input.trim()

  // 1. Format standar ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(cleaned)) {
    return isValidBirthDate(cleaned) ? cleaned : null
  }

  // 2. Format dengan pemisah strip atau garis miring (DD-MM-YYYY atau DD/MM/YYYY)
  const separatorMatch = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/.exec(cleaned)
  if (separatorMatch) {
    const day = separatorMatch[1].padStart(2, '0')
    const month = separatorMatch[2].padStart(2, '0')
    const year = separatorMatch[3]
    const iso = `${year}-${month}-${day}`
    return isValidBirthDate(iso) ? iso : null
  }

  // 3. Format 8 digit tanpa pemisah (DDMMYYYY atau YYYYMMDD)
  if (/^\d{8}$/.test(cleaned)) {
    const currentYear = new Date().getFullYear()

    // Cek apakah diawali 4 digit tahun yang wajar (YYYYMMDD)
    const first4 = cleaned.slice(0, 4)
    const first4Year = Number(first4)
    if (first4Year >= 1940 && first4Year <= currentYear) {
      const year = first4
      const month = cleaned.slice(4, 6)
      const day = cleaned.slice(6, 8)
      const iso = `${year}-${month}-${day}`
      if (isValidBirthDate(iso)) {
        return iso
      }
    }

    // Default asumsi format lazim di formulir Indonesia: DDMMYYYY
    const day = cleaned.slice(0, 2)
    const month = cleaned.slice(2, 4)
    const year = cleaned.slice(4, 8)
    const iso = `${year}-${month}-${day}`
    if (isValidBirthDate(iso)) {
      return iso
    }
  }

  return null
}
