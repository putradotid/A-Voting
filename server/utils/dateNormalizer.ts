/**
 * Utilitas Normalisasi dan Validasi Tanggal untuk Sistem A-Vote
 */

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
 * Format objek Date menjadi string YYYY-MM-DD menggunakan tanggal lokal kalender
 */
function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Menormalisasi berbagai tipe data tanggal lahir dari Firestore
 * (Timestamp Firestore, JavaScript Date, maupun String) ke format standar "YYYY-MM-DD".
 *
 * Mendukung input:
 * - Firebase Timestamp (.toDate() atau properti .seconds)
 * - Objek JavaScript Date
 * - String ISO ("2002-04-28T00:00:00.000Z")
 * - String "YYYY-MM-DD" atau "YYYY/MM/DD"
 * - String "MM/DD/YYYY" (misal: "04/28/2002")
 * - String "DD-MM-YYYY" (misal: "28-04-2002")
 */
export function normalizeFirestoreBirthDate(raw: any): string | null {
  if (raw === null || raw === undefined) {
    return null
  }

  // 1. Firebase Timestamp (.toDate() atau properti .seconds)
  if (typeof raw === 'object') {
    if (typeof raw.toDate === 'function') {
      try {
        const date = raw.toDate()
        if (date instanceof Date && !isNaN(date.getTime())) {
          return formatDateToYYYYMMDD(date)
        }
      } catch {
        // Fallback jika pemanggilan .toDate gagal
      }
    }
    if (typeof raw.seconds === 'number') {
      const date = new Date(raw.seconds * 1000)
      if (!isNaN(date.getTime())) {
        return formatDateToYYYYMMDD(date)
      }
    }
  }

  // 2. JavaScript Date instance
  if (raw instanceof Date) {
    if (!isNaN(raw.getTime())) {
      return formatDateToYYYYMMDD(raw)
    }
    return null
  }

  // 3. String representation
  if (typeof raw === 'string') {
    const trimmed = raw.trim()
    if (!trimmed) return null

    // 3a. String format ISO yang memuat timestamp waktu (e.g. "2002-04-28T00:00:00.000Z")
    if (trimmed.includes('T')) {
      const datePart = trimmed.split('T')[0]
      if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
        return isValidBirthDate(datePart) ? datePart : null
      }
    }

    // 3b. Format YYYY-MM-DD atau YYYY/MM/DD
    const ymdMatch = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/.exec(trimmed)
    if (ymdMatch) {
      const year = ymdMatch[1]
      const month = ymdMatch[2].padStart(2, '0')
      const day = ymdMatch[3].padStart(2, '0')
      const iso = `${year}-${month}-${day}`
      return isValidBirthDate(iso) ? iso : null
    }

    // 3c. Format dengan pemisah strip atau garis miring (DD-MM-YYYY, MM/DD/YYYY, DD/MM/YYYY)
    const sepMatch = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/.exec(trimmed)
    if (sepMatch) {
      const part1 = Number(sepMatch[1])
      const part2 = Number(sepMatch[2])
      const year = sepMatch[3]

      let day: string
      let month: string

      // Jika part2 > 12, dipastikan part1 adalah bulan dan part2 adalah hari (misal: "04/28/2002")
      if (part2 > 12 && part1 <= 12) {
        month = String(part1).padStart(2, '0')
        day = String(part2).padStart(2, '0')
      }
      // Jika part1 > 12, dipastikan part1 adalah hari dan part2 adalah bulan (misal: "28-04-2002")
      else if (part1 > 12 && part2 <= 12) {
        day = String(part1).padStart(2, '0')
        month = String(part2).padStart(2, '0')
      }
      // Default asumsi format Indonesia DD-MM-YYYY jika ambigu
      else {
        day = String(part1).padStart(2, '0')
        month = String(part2).padStart(2, '0')
      }

      const iso = `${year}-${month}-${day}`
      return isValidBirthDate(iso) ? iso : null
    }

    // 3d. 8 digit numerik tanpa pemisah (DDMMYYYY atau YYYYMMDD)
    if (/^\d{8}$/.test(trimmed)) {
      return normalizeDateInput(trimmed)
    }
  }

  return null
}

/**
 * Menormalisasi berbagai format tanggal lahir input dari formulir login klien
 * menjadi format baku ISO "YYYY-MM-DD".
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

  // 2. Format dengan pemisah strip atau garis miring (DD-MM-YYYY atau MM/DD/YYYY)
  const separatorMatch = /^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/.exec(cleaned)
  if (separatorMatch) {
    const part1 = Number(separatorMatch[1])
    const part2 = Number(separatorMatch[2])
    const year = separatorMatch[3]

    let day: string
    let month: string

    if (part2 > 12 && part1 <= 12) {
      month = String(part1).padStart(2, '0')
      day = String(part2).padStart(2, '0')
    } else {
      day = String(part1).padStart(2, '0')
      month = String(part2).padStart(2, '0')
    }

    const iso = `${year}-${month}-${day}`
    return isValidBirthDate(iso) ? iso : null
  }

  // 3. Format 8 digit tanpa pemisah (DDMMYYYY atau YYYYMMDD)
  if (/^\d{8}$/.test(cleaned)) {
    const currentYear = new Date().getFullYear()

    // Cek apakah diawali 4 digit tahun wajar (YYYYMMDD)
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
