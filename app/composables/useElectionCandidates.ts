export type CandidateType = 'pair' | 'single'

export type CandidateVerificationStatus =
  | 'Terverifikasi KPU'
  | 'Menunggu Berkas'
  | 'Revisi Dukungan'
  | 'Ditolak'

export interface CandidatePerson {
  studentId?: string
  name: string
  nim: string
  faculty: string
  facultyCode?: string
  major: string
  semester?: number
  gpa?: number
}

export interface CandidateRequirementDoc {
  name: string
  status: 'valid' | 'pending' | 'rejected'
  note?: string
}

export interface ElectionCandidate {
  id: string
  electionId: string
  type: CandidateType
  ballotNumber: string
  name: string
  leadCandidate: CandidatePerson
  viceCandidate?: CandidatePerson
  tagline: string
  photo: string
  color: string
  coalition: string
  status: CandidateVerificationStatus
  isInBallot: boolean
  visi: string
  misi: string[]
  pillars: string[]
  documents?: CandidateRequirementDoc[]
  votesCount: number
  createdAt: string
  updatedAt?: string
}

export const useElectionCandidates = () => {
  const candidatesDatabase = useState<ElectionCandidate[]>('electionCandidatesDatabase', () => [
    // ══════════════════════════════════════════════════════════════════════════
    // PEM-2025-01: Pemilihan Raya Ketua & Wakil Ketua BEM 2025 (Pasangan Calon)
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: 'cand-pem01-01',
      electionId: 'PEM-2025-01',
      type: 'pair',
      ballotNumber: '01',
      name: 'Farhan & Nabila',
      leadCandidate: {
        name: 'Muhammad Farhan',
        nim: '2108101012',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'S1 Teknik Informatika',
        semester: 8,
        gpa: 3.82
      },
      viceCandidate: {
        name: 'Nabila Putri',
        nim: '2102102045',
        faculty: 'Fakultas Ekonomika & Bisnis',
        facultyCode: 'FEB',
        major: 'S1 Akuntansi',
        semester: 8,
        gpa: 3.75
      },
      tagline: '“Sinergi Nyata, Berdampak Bersama”',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      color: '#582be8',
      coalition: 'BEM FT - FEB Bersatu',
      status: 'Terverifikasi KPU',
      isInBallot: true,
      visi: 'Terwujudnya BEM yang sinergis, adaptif, dan berdampak nyata bagi seluruh civitas akademika melalui penguatan tata kelola organisasi yang transparan, modern, dan berintegritas.',
      misi: [
        'Digitalisasi layanan administrasi ormawa terpadu satu pintu.',
        'Advokasi hak mahasiswa yang responsif dan pengawalan transparansi UKT tanggap 24/7.',
        'Pemerataan akses beasiswa, riset, serta pengembangan prestasi mahasiswa.'
      ],
      pillars: [
        'Digitalisasi Satu Pintu Ormawa Kampus',
        'Layanan Advokasi UKT Tanggap 24/7',
        'Pemerataan Akses Dana Hibah Riset Mahasiswa'
      ],
      documents: [
        { name: 'KRS & Transkrip IPK (≥ 3.25)', status: 'valid', note: 'IPK memenuhi syarat' },
        { name: 'Surat Bebas Sanksi Akademik & SKCK', status: 'valid', note: 'Terverifikasi Dekanat' },
        { name: 'Dukungan Mahasiswa (≥ 150 KTM)', status: 'valid', note: '185 berkas sah terverifikasi' }
      ],
      votesCount: 1485,
      createdAt: '2025-01-20T10:00:00'
    },
    {
      id: 'cand-pem01-02',
      electionId: 'PEM-2025-01',
      type: 'pair',
      ballotNumber: '02',
      name: 'Ahmad & Dimas',
      leadCandidate: {
        name: 'Ahmad Rizky Pratama',
        nim: '2101103022',
        faculty: 'Fakultas Hukum',
        facultyCode: 'FH',
        major: 'S1 Ilmu Hukum',
        semester: 8,
        gpa: 3.68
      },
      viceCandidate: {
        name: 'Dimas Prasetyo',
        nim: '2104104088',
        faculty: 'Fakultas Ilmu Sosial & Politik',
        facultyCode: 'FISIP',
        major: 'S1 Hubungan Internasional',
        semester: 8,
        gpa: 3.55
      },
      tagline: '“Integritas Kampus, Mahasiswa Berdaulat”',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      color: '#2563eb',
      coalition: 'Koalisi Reformasi FH-FISIP',
      status: 'Terverifikasi KPU',
      isInBallot: true,
      visi: 'Menjadikan BEM sebagai wadah integritas berkeadilan yang memperjuangkan aspirasi mahasiswa secara independen dan progresif.',
      misi: [
        'Transparansi anggaran BEM terbuka ke publik.',
        'Pusat bantuan hukum kampus dan satgas pencegahan kekerasan.',
        'Kanal kolaborasi startup mahasiswa & inkubasi bisnis lintas fakultas.'
      ],
      pillars: [
        'Transparansi Anggaran BEM Terbuka ke Publik',
        'Pusat Bantuan Hukum & Satgas Anti Kekerasan',
        'Kanal Kolaborasi Startup & Inkubasi Bisnis'
      ],
      documents: [
        { name: 'KRS & Transkrip IPK (≥ 3.25)', status: 'valid', note: 'IPK memenuhi syarat' },
        { name: 'Surat Bebas Sanksi Akademik & SKCK', status: 'valid', note: 'Terverifikasi Dekanat' },
        { name: 'Dukungan Mahasiswa (≥ 150 KTM)', status: 'valid', note: '162 berkas sah terverifikasi' }
      ],
      votesCount: 665,
      createdAt: '2025-01-22T11:00:00'
    },
    {
      id: 'cand-pem01-03',
      electionId: 'PEM-2025-01',
      type: 'pair',
      ballotNumber: '03',
      name: 'Siti & Kevin',
      leadCandidate: {
        name: 'Siti Aisyah Rahma',
        nim: '2103105011',
        faculty: 'Fakultas Kedokteran',
        facultyCode: 'FK',
        major: 'S1 Pendidikan Dokter',
        semester: 8,
        gpa: 3.90
      },
      viceCandidate: {
        name: 'Kevin Pratama',
        nim: '2105106090',
        faculty: 'Fakultas Psikologi',
        facultyCode: 'FPsi',
        major: 'S1 Psikologi',
        semester: 8,
        gpa: 3.65
      },
      tagline: '“Kesehatan Mental & Prestasi Unggul Mahasiswa”',
      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      color: '#059669',
      coalition: 'Poros Harmoni FK-Psikologi',
      status: 'Terverifikasi KPU',
      isInBallot: true,
      visi: 'Mewujudkan lingkungan kampus yang sehat, suportif, dan berprestasi unggul secara mental maupun akademis.',
      misi: [
        'Layanan klinik konseling mental gratis bagi civitas akademika.',
        'Pekan seni dan olahraga kampus terintegrasi.',
        'Akselerasi pertukaran mahasiswa luar negeri dan workshop internasional.'
      ],
      pillars: [
        'Klinik Konseling Mental Health Gratis',
        'Pekan Olahraga & Seni Kampus Terintegrasi',
        'Akselerasi Pertukaran Mahasiswa Luar Negeri'
      ],
      documents: [
        { name: 'KRS & Transkrip IPK (≥ 3.25)', status: 'valid', note: 'IPK memenuhi syarat' },
        { name: 'Surat Bebas Sanksi Akademik & SKCK', status: 'valid', note: 'Terverifikasi Dekanat' },
        { name: 'Dukungan Mahasiswa (≥ 150 KTM)', status: 'valid', note: '170 berkas sah terverifikasi' }
      ],
      votesCount: 0,
      createdAt: '2025-01-25T14:30:00'
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PEM-2025-02: Dewan Perwakilan Mahasiswa FT 2025 (Kandidat Tunggal/Independen)
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: 'cand-pem02-01',
      electionId: 'PEM-2025-02',
      type: 'single',
      ballotNumber: '01',
      name: 'Bagus Wicaksono',
      leadCandidate: {
        name: 'Bagus Wicaksono',
        nim: '2208101050',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'Teknik Elektro',
        semester: 6,
        gpa: 3.78
      },
      tagline: '“Aspiratif, Kritis, dan Berdedikasi”',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      color: '#7c3aed',
      coalition: 'Independen Elektro',
      status: 'Terverifikasi KPU',
      isInBallot: true,
      visi: 'Mengoptimalkan peran legislasi dan pengawasan DPM FT yang transparan dan akuntabel.',
      misi: [
        'Audit berkala fasilitas laboratorium teknik elektro.',
        'Penguatan regulasi perda ormawa Fakultas Teknik.'
      ],
      pillars: [
        'Audit Fasilitas Laboratorium FT',
        'Penguatan Perda Ormawa FT'
      ],
      documents: [
        { name: 'Transkrip IPK', status: 'valid', note: 'IPK 3.78 memenuhi' },
        { name: 'Dukungan Departemen', status: 'valid', note: '75 dukungan sah' }
      ],
      votesCount: 780,
      createdAt: '2025-01-26T09:00:00'
    },
    {
      id: 'cand-pem02-02',
      electionId: 'PEM-2025-02',
      type: 'single',
      ballotNumber: '02',
      name: 'Rian Syahputra',
      leadCandidate: {
        name: 'Rian Syahputra',
        nim: '2208102031',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'Teknik Mesin',
        semester: 6,
        gpa: 3.60
      },
      tagline: '“Suara Mesin untuk Keadilan Mahasiswa”',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
      color: '#ea580c',
      coalition: 'Independen Mesin',
      status: 'Terverifikasi KPU',
      isInBallot: true,
      visi: 'Memperjuangkan alokasi riset praktikum yang adil bagi seluruh departemen teknik.',
      misi: [
        'Kawal transparansi alokasi dana bengkel dan riset mesin.',
        'Forum aspirasi bulanan terbuka antarmahasiswa teknik.'
      ],
      pillars: [
        'Kawal Alokasi Dana Riset Bengkel',
        'Forum Aspirasi Bulanan Terbuka'
      ],
      documents: [
        { name: 'Transkrip IPK', status: 'valid', note: 'IPK 3.60 memenuhi' },
        { name: 'Dukungan Departemen', status: 'valid', note: '80 dukungan sah' }
      ],
      votesCount: 490,
      createdAt: '2025-01-28T10:00:00'
    },
    {
      id: 'cand-pem02-03',
      electionId: 'PEM-2025-02',
      type: 'single',
      ballotNumber: '03',
      name: 'Kevin Pratama',
      leadCandidate: {
        name: 'Kevin Pratama',
        nim: '2103103055',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'S1 Teknik Sipil',
        semester: 8,
        gpa: 3.52
      },
      tagline: '“Infrastruktur Kampus Nyata dan Berkelanjutan”',
      photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8ZolsDt3nkBLwOHctmLoRNvWc088cxfD6y44-TPisMrMWndDerR7aA8l9zAC8u62eeNlwax20qIkAWN6UBHaGcXKv2UR7cVTqQ5LLtaMyPz3iwURAC1-3WamDzHu1eewR28qrWv3SvkpKa62aHVz4ydh9LMGuiFHnzoKom9uwyskdncQBV00diAh5uxcsxgqqOtKxFISCfbnV30XTOOS8PjmWkcR65cp3mzwhWtPncP0BiF-bytBHgQ',
      color: '#0891b2',
      coalition: 'Departemen Sipil',
      status: 'Terverifikasi KPU',
      isInBallot: true,
      visi: 'Mendorong pengawasan fasilitas sarana prasarana gedung teknik yang aman dan modern.',
      misi: [
        'Audit berkala keselamatan gedung laboratorium teknik.',
        'Kawal renovasi ruang sekretariat himpunan mahasiswa.'
      ],
      pillars: [
        'Revitalisasi Fasilitas Gedung Kampus FT',
        'Kawal Anggaran Pemeliharaan Lab'
      ],
      documents: [
        { name: 'Transkrip IPK (≥ 3.25)', status: 'valid', note: 'IPK 3.52 sah' },
        { name: 'Dukungan Departemen Sipil', status: 'valid', note: '100% Lengkap' }
      ],
      votesCount: 0,
      createdAt: '2025-01-30T11:00:00'
    },
    {
      id: 'cand-pem02-04',
      electionId: 'PEM-2025-02',
      type: 'single',
      ballotNumber: '04',
      name: 'Maya Anindita',
      leadCandidate: {
        name: 'Maya Anindita',
        nim: '2205101088',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'S1 Teknik Mesin',
        semester: 6,
        gpa: 3.80
      },
      tagline: '“Dedikasi & Solusi Aspirasi Departemen Mesin”',
      photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD63BmQhg12pZpZKonjYHL_esj95QaS6lHrV6jNvI9JxUGtfPolNd1kHg0HZ8zqkH8pWR6o-eAQwth1gTdIOfUcPUIQzQZ0gV0sqDmH7kl39K1xoKbPeXXuw8AJP33wH102_1nrdYWTobAnlhKIJOAQFFpuEWkRl8-Q4eYzvAUK7Bl6zZgzvkasScV9RtZBZXs_mujOaz_BFm-Z5btVxQ4IK9wjyfm91B78rtftaMfv5VfbEOZ21LowDw',
      color: '#d97706',
      coalition: 'Departemen Mesin',
      status: 'Menunggu Berkas',
      isInBallot: false,
      visi: 'Mewujudkan representasi aspirasi mahasiswa mesin yang tangguh dan solutif.',
      misi: [
        'Penyusunan perda perlindungan kegiatan praktikum mahasiswa.',
        'Forum temu pimpinan fakultas dengan perwakilan departemen.'
      ],
      pillars: [
        'Advokasi Peralatan Bengkel Mesin',
        'Transparansi Alokasi Praktikum'
      ],
      documents: [
        { name: 'Transkrip IPK', status: 'valid', note: 'IPK 3.80 memenuhi' },
        { name: 'Surat Bebas Sanksi Akademik & SKCK', status: 'pending', note: 'Menunggu SKCK Polres' }
      ],
      votesCount: 0,
      createdAt: '2025-02-02T13:00:00'
    },
    {
      id: 'cand-pem02-05',
      electionId: 'PEM-2025-02',
      type: 'single',
      ballotNumber: '05',
      name: 'Fikri Haikal',
      leadCandidate: {
        name: 'Fikri Haikal',
        nim: '2106102041',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'S1 Arsitektur',
        semester: 8,
        gpa: 3.42
      },
      tagline: '“Kolaborasi Arsitektur untuk Kampus Berkelanjutan”',
      photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC6whJ-zQgpnIq9ZBiWhLAgJ7_WusIKoHIHNvLdSxQlZ6BA7G3qpLL0M1QAgUwTvHrJEvQgTm3WYRwSw1WyrmnkbzYAnvGZNOct2GkeEpmXp9J5m5RzibPHX8R2YSL_dmewMWhMdsjnmr0J_wkkVVQCSIwdYdHXOLNoQtw55GHf3wegTHXLBCeLjs3CX7BeXvgE6AUHIKIn-ARD-SDKrzGGPppgicNEwvMJfCNeq09whEpzisIVNYHPA',
      color: '#b45309',
      coalition: 'Departemen Arsitektur',
      status: 'Revisi Dukungan',
      isInBallot: false,
      visi: 'Menghadirkan tata ruang kampus yang estetik, inklusif, dan ramah lingkungan.',
      misi: [
        'Perda fasilitas studio perancangan dan lab 24 jam.',
        'Kawal program green campus di lingkungan Fakultas Teknik.'
      ],
      pillars: [
        'Green Architecture FT',
        'Fasilitas Studio Ramah Disabilitas'
      ],
      documents: [
        { name: 'Transkrip IPK', status: 'valid', note: 'IPK 3.42 memenuhi' },
        { name: 'Bukti Dukungan Mahasiswa', status: 'pending', note: 'Kurang 12 KTM dukungan' }
      ],
      votesCount: 0,
      createdAt: '2025-02-03T15:00:00'
    },

    // ══════════════════════════════════════════════════════════════════════════
    // PEM-2025-03: Pemilihan Ketua Himpunan Mahasiswa Informatika (HMIF)
    // ══════════════════════════════════════════════════════════════════════════
    {
      id: 'cand-pem03-01',
      electionId: 'PEM-2025-03',
      type: 'pair',
      ballotNumber: '01',
      name: 'Aditya & Ryan',
      leadCandidate: {
        name: 'Aditya Nugraha',
        nim: '2208101015',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'Informatika',
        semester: 6,
        gpa: 3.85
      },
      viceCandidate: {
        name: 'Ryan Saputra',
        nim: '2208101044',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'Sistem Informasi',
        semester: 6,
        gpa: 3.70
      },
      tagline: '“Code The Future, Lead The Innovators”',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
      color: '#0284c7',
      coalition: 'Dev Alliance',
      status: 'Terverifikasi KPU',
      isInBallot: true,
      visi: 'Mewujudkan HMIF sebagai ekosistem rekayasa teknologi informasi yang berdaya saing global.',
      misi: [
        'Inkubasi kompetisi hackathon nasional dan internasional.',
        'Mentoring karir langsung bersama praktisi Big Tech.'
      ],
      pillars: [
        'Inkubasi Hackathon Nasional',
        'Mentoring Karir Big Tech'
      ],
      documents: [
        { name: 'Transkrip IPK', status: 'valid', note: 'IPK memenuhi' },
        { name: 'LPJ Kepengurusan Sebelumnya', status: 'valid', note: 'Diterima KPU HMIF' }
      ],
      votesCount: 0,
      createdAt: '2025-02-05T08:00:00'
    },
    {
      id: 'cand-pem03-02',
      electionId: 'PEM-2025-03',
      type: 'pair',
      ballotNumber: '02',
      name: 'Fajar & Ilham',
      leadCandidate: {
        name: 'Fajar Pratama',
        nim: '2208101077',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'Informatika',
        semester: 6,
        gpa: 3.65
      },
      viceCandidate: {
        name: 'Ilham Ramadhan',
        nim: '2208101092',
        faculty: 'Fakultas Teknik',
        facultyCode: 'FT',
        major: 'Sistem Informasi',
        semester: 6,
        gpa: 3.72
      },
      tagline: '“Konektivitas Komunitas, Karya Nyata Informatika”',
      photo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      color: '#059669',
      coalition: 'Tech Open Source',
      status: 'Terverifikasi KPU',
      isInBallot: true,
      visi: 'Membangun kebersamaan mahasiswa informatika berbasis riset kolaboratif dan kontribusi open-source.',
      misi: [
        'Penyelenggaraan workshop AI & Cloud Computing berkala.',
        'Kanal advokasi akademik tugas akhir dan kerja praktik.'
      ],
      pillars: [
        'Open Source Community Lab',
        'Kanal Advokasi Tugas Akhir'
      ],
      documents: [
        { name: 'Transkrip IPK', status: 'valid', note: 'IPK memenuhi' },
        { name: 'Surat Rekomendasi Dosen Pembimbing', status: 'valid', note: 'Lengkap' }
      ],
      votesCount: 0,
      createdAt: '2025-02-06T09:30:00'
    }
  ])

  // ── Query Helpers ────────────────────────────────────────────────────────
  const getCandidatesByElection = (electionId: string): ElectionCandidate[] => {
    return candidatesDatabase.value
      .filter(c => c.electionId === electionId)
      .sort((a, b) => a.ballotNumber.localeCompare(b.ballotNumber, undefined, { numeric: true }))
  }

  const getCandidateById = (id: string): ElectionCandidate | undefined => {
    return candidatesDatabase.value.find(c => c.id === id)
  }

  // ── Validation: Nomor Urut Unik per Pemilihan ────────────────────────────
  const isBallotNumberAvailable = (
    electionId: string,
    ballotNumber: string,
    excludeCandidateId?: string
  ): boolean => {
    const cleanNumber = ballotNumber.trim().padStart(2, '0')
    return !candidatesDatabase.value.some(
      c => c.electionId === electionId &&
           c.id !== excludeCandidateId &&
           c.ballotNumber.trim().padStart(2, '0') === cleanNumber
    )
  }

  // ── Validation: Aturan Penghapusan Kandidat (Aturan Bisnis 6) ─────────────
  const canDeleteCandidate = (
    candidateId: string,
    electionStatus?: string
  ): { allowed: boolean; reason?: string } => {
    const candidate = getCandidateById(candidateId)
    if (!candidate) {
      return { allowed: false, reason: 'Kandidat tidak ditemukan dalam sistem.' }
    }

    if (candidate.votesCount > 0) {
      return {
        allowed: false,
        reason: `Kandidat telah memiliki ${candidate.votesCount} suara tercatat pada buku besar. Kandidat tidak boleh dihapus demi integritas rekapitulasi.`
      }
    }

    if (electionStatus === 'Berlangsung') {
      return {
        allowed: false,
        reason: 'Pemilihan sedang berlangsung (Live Voting). Perubahan atau penghapusan daftar calon tidak diizinkan selama bilik suara dibuka.'
      }
    }

    if (electionStatus === 'Selesai') {
      return {
        allowed: false,
        reason: 'Pemilihan telah selesai dan hasil suara telah disahkan/terarsip. Data kandidat bersifat historis permanen.'
      }
    }

    return { allowed: true }
  }

  // ── Mutation: Tambah Kandidat ────────────────────────────────────────────
  const addCandidate = (
    data: Omit<ElectionCandidate, 'id' | 'createdAt' | 'isInBallot'> & { isInBallot?: boolean }
  ): { success: boolean; message: string; candidate?: ElectionCandidate } => {
    if (!data.electionId) {
      return { success: false, message: 'ID pemilihan (electionId) wajib disertakan.' }
    }

    if (!data.name.trim()) {
      return { success: false, message: 'Nama paslon atau kandidat wajib diisi.' }
    }

    if (!data.ballotNumber.trim()) {
      return { success: false, message: 'Nomor urut resmi wajib diisi.' }
    }

    const ballotNum = data.ballotNumber.trim().padStart(2, '0')

    if (!isBallotNumberAvailable(data.electionId, ballotNum)) {
      return {
        success: false,
        message: `Nomor urut #${ballotNum} sudah digunakan oleh calon lain pada pemilihan ini. Pilih nomor urut lain.`
      }
    }

    if (!data.leadCandidate.name.trim() || !data.leadCandidate.nim.trim()) {
      return { success: false, message: 'Data ketua/calon utama (Nama dan NIM) wajib diisi lengkap.' }
    }

    if (data.type === 'pair') {
      if (!data.viceCandidate || !data.viceCandidate.name.trim() || !data.viceCandidate.nim.trim()) {
        return { success: false, message: 'Untuk tipe pasangan calon, data wakil ketua (Nama dan NIM) wajib diisi.' }
      }
    }

    const isInBallot = data.status === 'Terverifikasi KPU'

    const newCandidate: ElectionCandidate = {
      ...data,
      id: `cand-${data.electionId.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      ballotNumber: ballotNum,
      isInBallot,
      votesCount: data.votesCount || 0,
      createdAt: new Date().toISOString()
    }

    candidatesDatabase.value.push(newCandidate)
    return {
      success: true,
      message: `Kandidat "${newCandidate.name}" (#${newCandidate.ballotNumber}) berhasil ditambahkan.`,
      candidate: newCandidate
    }
  }

  // ── Mutation: Edit Kandidat ──────────────────────────────────────────────
  const updateCandidate = (
    id: string,
    updates: Partial<Omit<ElectionCandidate, 'id' | 'electionId' | 'createdAt'>>
  ): { success: boolean; message: string; candidate?: ElectionCandidate } => {
    const index = candidatesDatabase.value.findIndex(c => c.id === id)
    if (index === -1) {
      return { success: false, message: 'Kandidat tidak ditemukan.' }
    }

    const existing = candidatesDatabase.value[index]

    if (updates.ballotNumber !== undefined && updates.ballotNumber.trim() !== '') {
      const cleanNum = updates.ballotNumber.trim().padStart(2, '0')
      if (!isBallotNumberAvailable(existing.electionId, cleanNum, existing.id)) {
        return {
          success: false,
          message: `Nomor urut #${cleanNum} sudah digunakan oleh kandidat lain dalam pemilihan ini.`
        }
      }
      updates.ballotNumber = cleanNum
    }

    if (updates.type === 'pair' && updates.viceCandidate) {
      if (!updates.viceCandidate.name.trim() || !updates.viceCandidate.nim.trim()) {
        return { success: false, message: 'Data wakil ketua wajib diisi untuk tipe pasangan calon.' }
      }
    }

    const nextStatus = updates.status !== undefined ? updates.status : existing.status
    const isInBallot = nextStatus === 'Terverifikasi KPU'

    const updated: ElectionCandidate = {
      ...existing,
      ...updates,
      isInBallot,
      updatedAt: new Date().toISOString()
    }

    // Jika tipe diubah ke single, bersihkan viceCandidate
    if (updated.type === 'single') {
      delete updated.viceCandidate
    }

    candidatesDatabase.value[index] = updated
    return {
      success: true,
      message: `Data kandidat "${updated.name}" berhasil diperbarui.`,
      candidate: updated
    }
  }

  // ── Mutation: Hapus Kandidat ─────────────────────────────────────────────
  const deleteCandidate = (
    candidateId: string,
    electionStatus?: string
  ): { success: boolean; message: string } => {
    const check = canDeleteCandidate(candidateId, electionStatus)
    if (!check.allowed) {
      return { success: false, message: check.reason || 'Kandidat tidak dapat dihapus.' }
    }

    const index = candidatesDatabase.value.findIndex(c => c.id === candidateId)
    if (index === -1) {
      return { success: false, message: 'Kandidat tidak ditemukan.' }
    }

    const name = candidatesDatabase.value[index].name
    const num = candidatesDatabase.value[index].ballotNumber
    candidatesDatabase.value.splice(index, 1)

    return {
      success: true,
      message: `Kandidat "${name}" (#${num}) berhasil dihapus dari pemilihan.`
    }
  }

  // ── Statistics Helper ───────────────────────────────────────────────────
  const getCandidateStats = (electionId?: string) => {
    const list = !electionId || electionId === 'all'
      ? candidatesDatabase.value
      : getCandidatesByElection(electionId)

    const total = list.length
    const verified = list.filter(c => c.status === 'Terverifikasi KPU').length
    const pending = list.filter(c => c.status === 'Menunggu Berkas' || c.status === 'Revisi Dukungan').length
    const rejected = list.filter(c => c.status === 'Ditolak').length
    const inBallot = list.filter(c => c.isInBallot).length
    const withNumber = list.filter(c => Boolean(c.ballotNumber)).length
    const verifiedPct = total > 0 ? Number(((verified / total) * 100).toFixed(0)) : 0

    return { total, verified, pending, rejected, inBallot, withNumber, verifiedPct }
  }

  return {
    candidatesDatabase,
    getCandidatesByElection,
    getCandidateById,
    isBallotNumberAvailable,
    canDeleteCandidate,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidateStats
  }
}
