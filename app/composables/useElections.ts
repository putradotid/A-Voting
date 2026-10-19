export type ElectionStatus = 'Draft' | 'Terjadwal' | 'Berlangsung' | 'Selesai'

export interface Election {
  id: string
  name: string
  title?: string
  description: string
  organization: string
  position: string
  period: string
  level: string
  icon: string
  status: ElectionStatus
  startDate: string
  endDate: string
  candidates: number
  candidatesCount: number
  candidateLabel: string
  dptTarget: number
  dptVoted: number
  turnout: number
  info: string
  quorumPercentage: number
  createdAt: string
  updatedAt?: string
}

export type ElectionDetail = Election

// ─── Transition Rules ────────────────────────────────────────────────
export const allowedTransitions: Record<ElectionStatus, ElectionStatus[]> = {
  Draft: ['Terjadwal'],
  Terjadwal: ['Berlangsung', 'Draft'],
  Berlangsung: ['Selesai'],
  Selesai: []
}

export function canTransitionStatus(currentStatus: ElectionStatus, targetStatus: ElectionStatus): boolean {
  if (currentStatus === targetStatus) return true
  const allowed = allowedTransitions[currentStatus] || []
  return allowed.includes(targetStatus)
}

export function getAvailableTransitions(currentStatus: ElectionStatus): ElectionStatus[] {
  const allowed = allowedTransitions[currentStatus] || []
  return [currentStatus, ...allowed]
}

// ─── Schedule & Date Helpers ─────────────────────────────────────────
export interface ElectionScheduleValidation {
  valid: boolean
  errors: {
    startDate?: string
    endDate?: string
  }
}

export function validateElectionSchedule(
  status: ElectionStatus,
  startDate?: string,
  endDate?: string
): ElectionScheduleValidation {
  const errors: { startDate?: string; endDate?: string } = {}

  if (status === 'Terjadwal' || status === 'Berlangsung') {
    if (!startDate || !startDate.trim()) {
      errors.startDate = 'Tanggal dan waktu mulai wajib diisi untuk status Terjadwal atau Berlangsung.'
    }
    if (!endDate || !endDate.trim()) {
      errors.endDate = 'Tanggal dan waktu selesai wajib diisi untuk status Terjadwal atau Berlangsung.'
    }
  }

  if (startDate && endDate) {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()

    if (isNaN(start)) {
      errors.startDate = 'Format tanggal mulai tidak valid.'
    }
    if (isNaN(end)) {
      errors.endDate = 'Format tanggal selesai tidak valid.'
    }
    if (!isNaN(start) && !isNaN(end) && end <= start) {
      errors.endDate = 'Tanggal selesai harus setelah tanggal mulai.'
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  }
}

export function formatDatetimeLocal(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return ''
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}`
}

export const useElections = () => {

  const activeElectionId = useState<string | null>('activeElectionId', () => 'PEM-2025-01')

  const elections = useState<Election[]>('electionsDatabase', () => [
    {
      id: 'PEM-2025-01',
      name: 'Pemilihan Raya Ketua & Wakil Ketua BEM 2025',
      description: 'Pemilihan umum raya mahasiswa untuk menentukan Presiden Mahasiswa dan Wakil Presiden Mahasiswa Badan Eksekutif Mahasiswa (BEM KM) periode 2025/2026. Bilik suara digital terenkripsi dengan audit node konsensus real-time.',
      organization: 'Badan Eksekutif Mahasiswa (BEM KM)',
      position: 'Ketua & Wakil Ketua BEM',
      period: '2025/2026',
      level: 'Universitas (BEM KM)',
      icon: 'account_balance',
      status: 'Berlangsung',
      startDate: '2025-02-26T08:00',
      endDate: '2025-02-28T17:00',
      candidates: 3,
      candidatesCount: 3,
      candidateLabel: 'Pasangan Calon Terdaftar',
      dptTarget: 2740,
      dptVoted: 2150,
      turnout: 78.4,
      quorumPercentage: 50,
      info: 'Bilik suara dibuka serentak di 8 fakultas. Verifikasi token NIM berjalan normal.',
      createdAt: '2025-01-15T10:00'
    },
    {
      id: 'PEM-2025-02',
      name: 'Dewan Perwakilan Mahasiswa (DPM) Fakultas Teknik 2025',
      description: 'Pemilihan anggota legislatif Dewan Perwakilan Mahasiswa Fakultas Teknik untuk mengawal fungsi anggaran, legislasi, dan pengawasan BEM FT periode 2025/2026.',
      organization: 'DPM Fakultas Teknik',
      position: 'Anggota Dewan Perwakilan Mahasiswa FT',
      period: '2025/2026',
      level: 'Fakultas Teknik',
      icon: 'engineering',
      status: 'Berlangsung',
      startDate: '2025-02-27T09:00',
      endDate: '2025-03-01T20:00',
      candidates: 5,
      candidatesCount: 5,
      candidateLabel: 'Kandidat Independen',
      dptTarget: 2028,
      dptVoted: 1270,
      turnout: 62.6,
      quorumPercentage: 50,
      info: 'Partisipasi tertinggi dicatat oleh Departemen Teknik Informatika dan Sipil.',
      createdAt: '2025-01-20T14:00'
    },
    {
      id: 'PEM-2025-03',
      name: 'Pemilihan Ketua Himpunan Mahasiswa Informatika (HMIF)',
      description: 'Pemilihan Ketua dan Wakil Ketua Himpunan Mahasiswa Informatika periode 2025/2026. Persiapan teknis bilik suara dan penetapan nomor urut calon telah selesai.',
      organization: 'Himpunan Mahasiswa Informatika (HMIF)',
      position: 'Ketua & Wakil Ketua HMIF',
      period: '2025/2026',
      level: 'Jurusan Informatika',
      icon: 'terminal',
      status: 'Terjadwal',
      startDate: '2025-03-05T08:00',
      endDate: '2025-03-07T17:00',
      candidates: 2,
      candidatesCount: 2,
      candidateLabel: 'Calon Ketua',
      dptTarget: 820,
      dptVoted: 0,
      turnout: 0,
      quorumPercentage: 55,
      info: 'Bilik suara terkunci secara otomatis hingga waktu mulai 5 Maret 2025.',
      createdAt: '2025-02-01T09:00'
    },
    {
      id: 'PEM-2025-04',
      name: 'Pemilihan Ketua Himpunan Mahasiswa Manajemen (HMM)',
      description: 'Pemilihan Ketua Himpunan Mahasiswa Manajemen periode 2025/2026. Status saat ini masih dalam draft pendaftaran paslon dan validasi berkas.',
      organization: 'Himpunan Mahasiswa Manajemen (HMM)',
      position: 'Ketua & Wakil Ketua HMM',
      period: '2025/2026',
      level: 'Jurusan Manajemen',
      icon: 'drive_file_rename_outline',
      status: 'Draft',
      startDate: '',
      endDate: '',
      candidates: 1,
      candidatesCount: 1,
      candidateLabel: 'Paslon Masuk Verifikasi',
      dptTarget: 0,
      dptVoted: 0,
      turnout: 0,
      quorumPercentage: 50,
      info: 'Menunggu kelengkapan berkas visi-misi calon paslon.',
      createdAt: '2025-02-10T11:00'
    },
    {
      id: 'PEM-2024-09',
      name: 'Musyawarah Mahasiswa BEM Fakultas Hukum 2024/2025',
      description: 'Pemilihan pengurus BEM Fakultas Hukum yang telah selesai diselenggarakan dan hasil perolehan suaranya telah disahkan.',
      organization: 'BEM Fakultas Hukum',
      position: 'Gubernur & Wakil Gubernur BEM FH',
      period: '2024/2025',
      level: 'Fakultas Hukum',
      icon: 'gavel',
      status: 'Selesai',
      startDate: '2025-01-13T08:00',
      endDate: '2025-01-15T17:00',
      candidates: 2,
      candidatesCount: 2,
      candidateLabel: 'Paslon',
      dptTarget: 1210,
      dptVoted: 1140,
      turnout: 94.2,
      quorumPercentage: 50,
      info: 'Hasil rekapitulasi resmi telah ditandatangani KPU Kampus dan terarsip aman.',
      createdAt: '2024-12-20T08:00'
    },
    {
      id: 'PEM-2025-05',
      name: 'Pemilihan Ketua BEM Fakultas Ekonomika & Bisnis',
      description: 'Pemilihan Ketua dan Wakil Ketua BEM FEB untuk masa bakti 2025/2026.',
      organization: 'BEM Fakultas Ekonomika & Bisnis',
      position: 'Ketua & Wakil Ketua BEM FEB',
      period: '2025/2026',
      level: 'Fakultas Ekonomika & Bisnis',
      icon: 'account_balance_wallet',
      status: 'Berlangsung',
      startDate: '2025-02-25T08:00',
      endDate: '2025-02-27T17:00',
      candidates: 4,
      candidatesCount: 4,
      candidateLabel: 'Pasangan Calon',
      dptTarget: 1850,
      dptVoted: 1420,
      turnout: 76.8,
      quorumPercentage: 50,
      info: 'Pemungutan suara berlangsung kondusif di seluruh bilik lab komputer FEB.',
      createdAt: '2025-01-18T10:00'
    },
    {
      id: 'PEM-2025-06',
      name: 'Pemilihan Ketua Himpunan Mahasiswa Akuntansi (HMA)',
      description: 'Draft pemilihan ketua HMA, berkas masih dalam tahap verifikasi.',
      organization: 'Himpunan Mahasiswa Akuntansi (HMA)',
      position: 'Ketua & Wakil Ketua HMA',
      period: '2025/2026',
      level: 'Jurusan Akuntansi',
      icon: 'calculate',
      status: 'Draft',
      startDate: '',
      endDate: '',
      candidates: 0,
      candidatesCount: 0,
      candidateLabel: 'Calon',
      dptTarget: 0,
      dptVoted: 0,
      turnout: 0,
      quorumPercentage: 50,
      info: 'Berkas pendaftaran calon belum lengkap',
      createdAt: '2025-02-15T13:00'
    },
    {
      id: 'PEM-2025-07',
      name: 'Pemilihan Ketua Himpunan Mahasiswa Sipil (HMS)',
      description: 'Pemilihan Ketua HMS yang telah dijadwalkan dan menunggu waktu pelaksanaan.',
      organization: 'Himpunan Mahasiswa Sipil (HMS)',
      position: 'Ketua & Wakil Ketua HMS',
      period: '2025/2026',
      level: 'Jurusan Teknik Sipil',
      icon: 'construction',
      status: 'Terjadwal',
      startDate: '2025-03-10T08:00',
      endDate: '2025-03-12T17:00',
      candidates: 3,
      candidatesCount: 3,
      candidateLabel: 'Calon Ketua',
      dptTarget: 650,
      dptVoted: 0,
      turnout: 0,
      quorumPercentage: 50,
      info: '',
      createdAt: '2025-02-05T09:00'
    },
    {
      id: 'PEM-2024-10',
      name: 'Pemilihan Ketua Senat Mahasiswa 2024',
      description: 'Pemilihan Ketua Senat Mahasiswa periode 2024/2025 telah selesai dilaksanakan.',
      organization: 'Senat Mahasiswa Universitas',
      position: 'Ketua Senat Mahasiswa',
      period: '2024/2025',
      level: 'Universitas (SMU)',
      icon: 'precision_manufacturing',
      status: 'Selesai',
      startDate: '2024-11-20T08:00',
      endDate: '2024-11-22T17:00',
      candidates: 3,
      candidatesCount: 3,
      candidateLabel: 'Paslon',
      dptTarget: 1980,
      dptVoted: 1750,
      turnout: 88.4,
      quorumPercentage: 50,
      info: 'Hasil rekapitulasi resmi telah diarsipkan',
      createdAt: '2024-11-01T08:00'
    },
    {
      id: 'PEM-2025-08',
      name: 'Pemilihan Ketua Himpunan Mahasiswa Elektro (HME)',
      description: 'Draft persiapan pemilihan ketua HME.',
      organization: 'Himpunan Mahasiswa Elektro (HME)',
      position: 'Ketua & Wakil Ketua HME',
      period: '2025/2026',
      level: 'Jurusan Teknik Elektro',
      icon: 'bolt',
      status: 'Draft',
      startDate: '',
      endDate: '',
      candidates: 0,
      candidatesCount: 0,
      candidateLabel: 'Calon',
      dptTarget: 0,
      dptVoted: 0,
      turnout: 0,
      quorumPercentage: 50,
      info: 'Tahap penentuan kuota DPT',
      createdAt: '2025-02-18T14:00'
    },
    {
      id: 'PEM-2025-09',
      name: 'Pemilihan Ketua Himpunan Mahasiswa Arsitektur (HMA)',
      description: 'Draft persiapan pemilihan ketua HMA.',
      organization: 'Himpunan Mahasiswa Arsitektur (HMA)',
      position: 'Ketua & Wakil Ketua HMA',
      period: '2025/2026',
      level: 'Jurusan Arsitektur',
      icon: 'architecture',
      status: 'Draft',
      startDate: '',
      endDate: '',
      candidates: 0,
      candidatesCount: 0,
      candidateLabel: 'Calon',
      dptTarget: 0,
      dptVoted: 0,
      turnout: 0,
      quorumPercentage: 50,
      info: 'Menunggu SK Panitia',
      createdAt: '2025-02-20T10:00'
    }
  ])

  // ─── Active Election Management ────────────────────────────────────
  function getActiveElectionId(): string | null {
    return activeElectionId.value
  }

  function getActiveElection(): Election | null {
    if (!activeElectionId.value) return null
    const found = getElectionById(activeElectionId.value)
    if (!found) {
      activeElectionId.value = null
      return null
    }
    if (found.status === 'Selesai') {
      activeElectionId.value = null
      return null
    }
    return found
  }

  function isActiveElection(id: string): boolean {
    if (!activeElectionId.value || !id) return false
    return activeElectionId.value === id
  }

  function setActiveElection(id: string | null): { success: boolean; message: string } {
    if (!id) {
      activeElectionId.value = null
      return { success: true, message: 'Penetapan pemilihan aktif berhasil dihapus.' }
    }
    const target = getElectionById(id)
    if (!target) {
      return { success: false, message: 'Pemilihan tidak ditemukan.' }
    }
    if (target.status === 'Selesai') {
      return { success: false, message: 'Pemilihan yang berstatus Selesai tidak dapat ditetapkan sebagai pemilihan aktif.' }
    }
    activeElectionId.value = id
    return { success: true, message: `Pemilihan "${target.name}" berhasil ditetapkan sebagai pemilihan aktif.` }
  }

  // ─── CRUD Operations ───────────────────────────────────────────────
  function getElectionById(id: string): Election | undefined {
    const found = elections.value.find(e => e.id === id)
    if (!found) return undefined
    if (!found.title) {
      found.title = found.name
    }
    return found
  }

  function generateElectionId(): string {
    const currentYear = new Date().getFullYear()
    const regex = new RegExp(`PEM-${currentYear}-(\\d+)`)
    let maxNum = 0
    for (const e of elections.value) {
      const match = e.id.match(regex)
      if (match) {
        const num = parseInt(match[1], 10)
        if (num > maxNum) maxNum = num
      }
    }
    const nextNum = maxNum + 1
    return `PEM-${currentYear}-${String(nextNum).padStart(2, '0')}`
  }

  function addElection(data: Partial<Election> & { name?: string; title?: string; level?: string }): Election {
    const id = data.id || generateElectionId()
    const now = new Date().toISOString()
    const candidatesCount = data.candidatesCount ?? data.candidates ?? 0
    const resolvedName = (data.name || (data as any).title || 'Pemilihan Baru').trim()
    const resolvedLevel = (data.level || 'Universitas').trim()
    const newElection: Election = {
      id,
      name: resolvedName,
      title: resolvedName,
      description: data.description?.trim() || '',
      organization: data.organization?.trim() || 'Komisi Pemilihan Umum Mahasiswa',
      position: data.position?.trim() || 'Ketua & Wakil Ketua',
      period: data.period?.trim() || '2025/2026',
      level: resolvedLevel,
      icon: data.icon || 'ballot',
      status: data.status || (data.startDate && data.endDate ? 'Terjadwal' : 'Draft'),
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      candidates: candidatesCount,
      candidatesCount: candidatesCount,
      candidateLabel: data.candidateLabel || 'Calon',
      dptTarget: data.dptTarget ?? 0,
      dptVoted: data.dptVoted ?? 0,
      turnout: data.turnout ?? 0,
      quorumPercentage: data.quorumPercentage ?? 50,
      info: data.info || (data.startDate && data.endDate ? '' : 'Persiapan awal, berkas belum dilengkapi'),
      createdAt: now,
      updatedAt: now
    }

    elections.value.unshift(newElection)
    return newElection
  }

  function updateElection(id: string, updates: Partial<Election>): { success: boolean; message: string; data?: Election } {
    const idx = elections.value.findIndex(e => e.id === id)
    if (idx === -1) {
      return { success: false, message: 'Pemilihan tidak ditemukan.' }
    }

    const existing = elections.value[idx]

    // 1. Validate status transition
    if (updates.status && updates.status !== existing.status) {
      if (!canTransitionStatus(existing.status, updates.status)) {
        const allowed = allowedTransitions[existing.status].join(', ') || 'tidak ada (status akhir)'
        return {
          success: false,
          message: `Transisi status tidak valid: dari "${existing.status}" ke "${updates.status}". Transisi yang diizinkan: ${allowed}.`
        }
      }
    }

    // 2. Validate schedule
    const targetStatus = updates.status || existing.status
    const targetStart = updates.startDate !== undefined ? updates.startDate : existing.startDate
    const targetEnd = updates.endDate !== undefined ? updates.endDate : existing.endDate

    const scheduleVal = validateElectionSchedule(targetStatus, targetStart, targetEnd)
    if (!scheduleVal.valid) {
      const firstErr = Object.values(scheduleVal.errors)[0]
      return { success: false, message: firstErr || 'Jadwal pemilihan tidak valid.' }
    }

    // 3. Clear active election if updated to Selesai
    if (updates.status === 'Selesai' && activeElectionId.value === id) {
      activeElectionId.value = null
    }

    const candidatesCount = updates.candidatesCount ?? updates.candidates ?? existing.candidatesCount ?? existing.candidates

    elections.value[idx] = {
      ...existing,
      ...updates,
      candidates: candidatesCount,
      candidatesCount: candidatesCount,
      updatedAt: new Date().toISOString()
    }
    return { success: true, message: 'Pemilihan berhasil diperbarui.', data: elections.value[idx] }
  }

  function deleteElection(id: string): { success: boolean; message: string } {
    const election = getElectionById(id)
    if (!election) {
      return { success: false, message: 'Pemilihan tidak ditemukan.' }
    }

    if (election.status !== 'Draft') {
      return {
        success: false,
        message: `Pemilihan berstatus "${election.status}" tidak dapat dihapus. Hanya pemilihan berstatus Draft yang dapat dihapus.`
      }
    }

    const idx = elections.value.findIndex(e => e.id === id)
    if (idx !== -1) {
      elections.value.splice(idx, 1)
    }

    // Clear active status if this was the active election
    if (activeElectionId.value === id) {
      activeElectionId.value = null
    }

    return { success: true, message: `Draft pemilihan "${election.name}" berhasil dihapus.` }
  }

  return {
    elections,
    activeElectionId,
    getElectionById,
    getActiveElectionId,
    getActiveElection,
    isActiveElection,
    setActiveElection,
    generateElectionId,
    addElection,
    updateElection,
    deleteElection
  }
}
