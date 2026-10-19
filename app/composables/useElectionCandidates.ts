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

// ── Master Candidate (Profil Master Independen) ───────────────────────────────
export interface MasterCandidate {
  id: string
  type: CandidateType
  name: string
  leadCandidate: CandidatePerson
  viceCandidate?: CandidatePerson
  tagline: string
  photo: string
  color: string
  coalition: string
  visi: string
  misi: string[]
  pillars: string[]
  documents?: CandidateRequirementDoc[]
  createdAt: string
  updatedAt?: string
}

// ── Election Candidate Participation (Relasi Keikutsertaan per Election) ─────
export interface ElectionCandidateParticipation {
  id: string // ID partisipasi unik (misal cand-pem01-01)
  electionId: string // Agenda Pemilihan
  candidateId: string // Merujuk ke MasterCandidate.id
  ballotNumber: string // Nomor urut unik dalam satu Election
  status: CandidateVerificationStatus
  isInBallot: boolean
  votesCount: number
  createdAt: string
  updatedAt?: string
}

// ── Unified View (Kompatibel dengan template yang mengonsumsi ElectionCandidate) ─
export interface ElectionCandidate extends MasterCandidate {
  id: string // ID partisipasi
  participationId: string
  candidateId: string // ID master kandidat
  electionId: string
  ballotNumber: string
  status: CandidateVerificationStatus
  isInBallot: boolean
  votesCount: number
  participationCreatedAt?: string
  participationUpdatedAt?: string
}

export const useElectionCandidates = () => {
  // ── Master Candidates Database ───────────────────────────────────────────
  const masterCandidatesDatabase = useState<MasterCandidate[]>('masterCandidatesDatabase', () => [
    {
      id: 'mcand-01',
      type: 'pair',
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
      createdAt: '2025-01-20T10:00:00'
    },
    {
      id: 'mcand-02',
      type: 'pair',
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
      createdAt: '2025-01-22T11:00:00'
    },
    {
      id: 'mcand-03',
      type: 'pair',
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
      createdAt: '2025-01-25T14:30:00'
    },
    {
      id: 'mcand-04',
      type: 'single',
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
      createdAt: '2025-01-26T09:00:00'
    },
    {
      id: 'mcand-05',
      type: 'single',
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
      createdAt: '2025-01-28T10:00:00'
    },
    {
      id: 'mcand-06',
      type: 'single',
      name: 'Kevin Pratama (Sipil)',
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
      createdAt: '2025-01-30T11:00:00'
    },
    {
      id: 'mcand-07',
      type: 'single',
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
      createdAt: '2025-02-02T13:00:00'
    },
    {
      id: 'mcand-08',
      type: 'single',
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
      createdAt: '2025-02-03T15:00:00'
    },
    {
      id: 'mcand-09',
      type: 'pair',
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
      createdAt: '2025-02-05T08:00:00'
    },
    {
      id: 'mcand-10',
      type: 'pair',
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
      createdAt: '2025-02-06T09:30:00'
    },
    {
      id: 'mcand-11',
      type: 'single',
      name: 'Rizka Amelia',
      leadCandidate: {
        name: 'Rizka Amelia Putri',
        nim: '2201104018',
        faculty: 'Fakultas Farmasi',
        facultyCode: 'FF',
        major: 'S1 Farmasi Klinis',
        semester: 6,
        gpa: 3.88
      },
      tagline: '“Dedikasi Saintifik untuk Kesehatan Kampus”',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      color: '#ec4899',
      coalition: 'Independen Farmasi',
      visi: 'Menghadirkan advokasi kesehatan mahasiswa terpadu dan penguatan riset sains.',
      misi: [
        'Penyediaan kotak P3K darurat di setiap gedung ormawa.',
        'Edukasi promotif kesehatan mental dan fisik berkala.'
      ],
      pillars: [
        'Layanan Tanggap Darurat Medis Ormawa',
        'Riset Kolaboratif Sains Mahasiswa'
      ],
      documents: [
        { name: 'Transkrip IPK', status: 'valid', note: 'IPK 3.88 memenuhi' },
        { name: 'Dukungan Fakultas', status: 'valid', note: '120 berkas KTM sah' }
      ],
      createdAt: '2025-02-10T11:00:00'
    },
    {
      id: 'mcand-12',
      type: 'pair',
      name: 'Danang & Tiara',
      leadCandidate: {
        name: 'Danang Prasetya',
        nim: '2107102005',
        faculty: 'Fakultas MIPA',
        facultyCode: 'FMIPA',
        major: 'S1 Matematika',
        semester: 8,
        gpa: 3.74
      },
      viceCandidate: {
        name: 'Tiara Maharani',
        nim: '2107103042',
        faculty: 'Fakultas MIPA',
        facultyCode: 'FMIPA',
        major: 'S1 Kimia',
        semester: 8,
        gpa: 3.69
      },
      tagline: '“Akurasi Data, Solusi Nyata Sains Mahasiswa”',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      color: '#06b6d4',
      coalition: 'Poros Kolaborasi Saintis Muda',
      visi: 'Membangun kepemimpinan berbasis data sains analitik untuk perumusan kebijakan kemahasiswaan yang terukur.',
      misi: [
        'Survei kepuasan mahasiswa berbasis big data analitis berkala.',
        'Akselerasi inkubasi olimpiade sains mahasiswa tingkat nasional.'
      ],
      pillars: [
        'Pusat Survei Data Kebijakan Kampus',
        'Inkubasi Prestasi Sains Nasional'
      ],
      documents: [
        { name: 'KRS & Transkrip IPK', status: 'valid', note: 'IPK memenuhi' },
        { name: 'SKCK & Rekomendasi Dekan', status: 'valid', note: 'Sah' }
      ],
      createdAt: '2025-02-12T14:00:00'
    }
  ])

  // ── Election Candidate Participations Database ───────────────────────────
  // Menyimpan 10 data relasi seed yang mempertahankan ID awal (`cand-pemXX-XX`)
  const electionCandidateParticipationsDatabase = useState<ElectionCandidateParticipation[]>(
    'electionCandidateParticipationsDatabase',
    () => [
      // PEM-2025-01
      {
        id: 'cand-pem01-01',
        electionId: 'PEM-2025-01',
        candidateId: 'mcand-01',
        ballotNumber: '01',
        status: 'Terverifikasi KPU',
        isInBallot: true,
        votesCount: 1485,
        createdAt: '2025-01-20T10:00:00'
      },
      {
        id: 'cand-pem01-02',
        electionId: 'PEM-2025-01',
        candidateId: 'mcand-02',
        ballotNumber: '02',
        status: 'Terverifikasi KPU',
        isInBallot: true,
        votesCount: 665,
        createdAt: '2025-01-22T11:00:00'
      },
      {
        id: 'cand-pem01-03',
        electionId: 'PEM-2025-01',
        candidateId: 'mcand-03',
        ballotNumber: '03',
        status: 'Terverifikasi KPU',
        isInBallot: true,
        votesCount: 0,
        createdAt: '2025-01-25T14:30:00'
      },

      // PEM-2025-02
      {
        id: 'cand-pem02-01',
        electionId: 'PEM-2025-02',
        candidateId: 'mcand-04',
        ballotNumber: '01',
        status: 'Terverifikasi KPU',
        isInBallot: true,
        votesCount: 780,
        createdAt: '2025-01-26T09:00:00'
      },
      {
        id: 'cand-pem02-02',
        electionId: 'PEM-2025-02',
        candidateId: 'mcand-05',
        ballotNumber: '02',
        status: 'Terverifikasi KPU',
        isInBallot: true,
        votesCount: 490,
        createdAt: '2025-01-28T10:00:00'
      },
      {
        id: 'cand-pem02-03',
        electionId: 'PEM-2025-02',
        candidateId: 'mcand-06',
        ballotNumber: '03',
        status: 'Terverifikasi KPU',
        isInBallot: true,
        votesCount: 0,
        createdAt: '2025-01-30T11:00:00'
      },
      {
        id: 'cand-pem02-04',
        electionId: 'PEM-2025-02',
        candidateId: 'mcand-07',
        ballotNumber: '04',
        status: 'Menunggu Berkas',
        isInBallot: false,
        votesCount: 0,
        createdAt: '2025-02-02T13:00:00'
      },
      {
        id: 'cand-pem02-05',
        electionId: 'PEM-2025-02',
        candidateId: 'mcand-08',
        ballotNumber: '05',
        status: 'Revisi Dukungan',
        isInBallot: false,
        votesCount: 0,
        createdAt: '2025-02-03T15:00:00'
      },

      // PEM-2025-03
      {
        id: 'cand-pem03-01',
        electionId: 'PEM-2025-03',
        candidateId: 'mcand-09',
        ballotNumber: '01',
        status: 'Terverifikasi KPU',
        isInBallot: true,
        votesCount: 0,
        createdAt: '2025-02-05T08:00:00'
      },
      {
        id: 'cand-pem03-02',
        electionId: 'PEM-2025-03',
        candidateId: 'mcand-10',
        ballotNumber: '02',
        status: 'Terverifikasi KPU',
        isInBallot: true,
        votesCount: 0,
        createdAt: '2025-02-06T09:30:00'
      }
    ]
  )

  // ── Helper: Join Master with Participation ──────────────────────────────
  const hydrateParticipation = (part: ElectionCandidateParticipation): ElectionCandidate | null => {
    const master = masterCandidatesDatabase.value.find(m => m.id === part.candidateId)
    if (!master) return null
    return {
      ...master,
      id: part.id,
      participationId: part.id,
      candidateId: master.id,
      electionId: part.electionId,
      ballotNumber: part.ballotNumber,
      status: part.status,
      isInBallot: part.isInBallot,
      votesCount: part.votesCount,
      participationCreatedAt: part.createdAt,
      participationUpdatedAt: part.updatedAt
    }
  }

  // ── Unified Database Computed (Kompatibel dengan templates) ─────────────
  const candidatesDatabase = computed<ElectionCandidate[]>({
    get() {
      return electionCandidateParticipationsDatabase.value
        .map(hydrateParticipation)
        .filter((c): c is ElectionCandidate => c !== null)
    },
    set(newVal) {
      // no-op to protect one-way hydration
    }
  })

  // ── Query Helpers ────────────────────────────────────────────────────────
  const getAllMasterCandidates = (): MasterCandidate[] => {
    return masterCandidatesDatabase.value
  }

  const getMasterCandidateById = (id: string): MasterCandidate | undefined => {
    return masterCandidatesDatabase.value.find(m => m.id === id)
  }

  const getCandidatesByElection = (electionId: string): ElectionCandidate[] => {
    return electionCandidateParticipationsDatabase.value
      .filter(p => p.electionId === electionId)
      .map(hydrateParticipation)
      .filter((c): c is ElectionCandidate => c !== null)
      .sort((a, b) => a.ballotNumber.localeCompare(b.ballotNumber, undefined, { numeric: true }))
  }

  const getCandidateById = (id: string): ElectionCandidate | undefined => {
    // Cari berdasarkan participation id terlebih dahulu
    const part = electionCandidateParticipationsDatabase.value.find(p => p.id === id)
    if (part) {
      const hydrated = hydrateParticipation(part)
      if (hydrated) return hydrated
    }
    // Jika tidak ditemukan, cari berdasarkan candidateId pertama yang ada
    const partByMaster = electionCandidateParticipationsDatabase.value.find(p => p.candidateId === id)
    if (partByMaster) {
      const hydrated = hydrateParticipation(partByMaster)
      if (hydrated) return hydrated
    }
    // Fallback: master saja dikemas sebagai placeholder candidate
    const master = masterCandidatesDatabase.value.find(m => m.id === id)
    if (master) {
      return {
        ...master,
        id: master.id,
        participationId: '',
        candidateId: master.id,
        electionId: '',
        ballotNumber: '',
        status: 'Menunggu Berkas',
        isInBallot: false,
        votesCount: 0
      }
    }
    return undefined
  }

  const getMasterCandidateParticipations = (candidateId: string): ElectionCandidateParticipation[] => {
    return electionCandidateParticipationsDatabase.value.filter(p => p.candidateId === candidateId)
  }

  // ── Cek Keikutsertaan & Calon yang Belum Terdaftar ────────────────────────
  const isCandidateInElection = (electionId: string, candidateId: string): boolean => {
    return electionCandidateParticipationsDatabase.value.some(
      p => p.electionId === electionId && p.candidateId === candidateId
    )
  }

  const getUnassignedMasterCandidates = (electionId: string): MasterCandidate[] => {
    const assignedIds = new Set(
      electionCandidateParticipationsDatabase.value
        .filter(p => p.electionId === electionId)
        .map(p => p.candidateId)
    )
    return masterCandidatesDatabase.value.filter(m => !assignedIds.has(m.id))
  }

  // ── Validation: Nomor Urut Unik per Pemilihan ────────────────────────────
  const isBallotNumberAvailable = (
    electionId: string,
    ballotNumber: string,
    excludeParticipationId?: string
  ): boolean => {
    const cleanNumber = ballotNumber.trim().padStart(2, '0')
    return !electionCandidateParticipationsDatabase.value.some(
      p => p.electionId === electionId &&
           p.id !== excludeParticipationId &&
           p.ballotNumber.trim().padStart(2, '0') === cleanNumber
    )
  }

  // Cari nomor urut berikutnya yang tersedia pada suatu Election
  const getNextAvailableBallotNumber = (electionId: string): string => {
    const existing = electionCandidateParticipationsDatabase.value
      .filter(p => p.electionId === electionId)
      .map(p => parseInt(p.ballotNumber, 10))
      .filter(n => !isNaN(n))
    
    let candidateNum = 1
    while (existing.includes(candidateNum)) {
      candidateNum++
    }
    return String(candidateNum).padStart(2, '0')
  }

  // ── Validation: Aturan Penghapusan Partisipasi / Kandidat ────────────────
  const canDeleteCandidate = (
    participationOrCandidateId: string,
    electionStatus?: string
  ): { allowed: boolean; reason?: string } => {
    // Cari relasi partisipasi
    const part = electionCandidateParticipationsDatabase.value.find(
      p => p.id === participationOrCandidateId || p.candidateId === participationOrCandidateId
    )

    if (!part) {
      return { allowed: false, reason: 'Kandidat / keikutsertaan tidak ditemukan dalam sistem.' }
    }

    if (part.votesCount > 0) {
      return {
        allowed: false,
        reason: `Kandidat telah memiliki ${part.votesCount} suara tercatat pada buku besar. Kandidat tidak boleh dihapus demi integritas rekapitulasi.`
      }
    }

    if (electionStatus === 'Berlangsung') {
      return {
        allowed: false,
        reason: 'Pemilihan sedang berlangsung (Live Voting). Perubahan atau pencabutan daftar calon tidak diizinkan selama bilik suara dibuka.'
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

  // ── Mutation Master: Tambah Master Kandidat ──────────────────────────────
  const addMasterCandidate = (
    data: Omit<MasterCandidate, 'id' | 'createdAt'>
  ): { success: boolean; message: string; candidate?: MasterCandidate } => {
    if (!data.name.trim()) {
      return { success: false, message: 'Nama paslon atau kandidat wajib diisi.' }
    }
    if (!data.leadCandidate.name.trim() || !data.leadCandidate.nim.trim()) {
      return { success: false, message: 'Data ketua/calon utama (Nama dan NIM) wajib diisi lengkap.' }
    }
    if (data.type === 'pair') {
      if (!data.viceCandidate || !data.viceCandidate.name.trim() || !data.viceCandidate.nim.trim()) {
        return { success: false, message: 'Untuk tipe pasangan calon, data wakil ketua (Nama dan NIM) wajib diisi.' }
      }
    }

    const newId = `mcand-${Date.now().toString().slice(-4)}`
    const newMaster: MasterCandidate = {
      ...data,
      id: newId,
      name: data.name.trim(),
      tagline: data.tagline.trim(),
      coalition: data.coalition.trim() || (data.type === 'pair' ? 'Koalisi Paslon' : 'Independen'),
      color: data.color || '#582be8',
      photo: data.photo.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      visi: data.visi.trim() || 'Mewujudkan kepemimpinan mahasiswa yang berintegritas dan berdampak nyata.',
      misi: data.misi.length > 0 ? data.misi : ['Digitalisasi layanan administrasi kemahasiswaan.'],
      pillars: data.pillars.length > 0 ? data.pillars : ['Tata Kelola Organisasi Transparan', 'Advokasi Mahasiswa'],
      documents: data.documents || [
        { name: 'KRS & Transkrip IPK (≥ 3.25)', status: 'valid', note: 'Berkas master sah' },
        { name: 'Surat Bebas Sanksi Akademik & SKCK', status: 'valid', note: 'Terverifikasi' },
        { name: 'Dukungan Mahasiswa Sah', status: 'valid', note: 'Lengkap' }
      ],
      createdAt: new Date().toISOString()
    }

    masterCandidatesDatabase.value.push(newMaster)
    return {
      success: true,
      message: `Master data kandidat "${newMaster.name}" berhasil didaftarkan.`,
      candidate: newMaster
    }
  }

  // ── Mutation Master: Update Master Kandidat ──────────────────────────────
  const updateMasterCandidate = (
    id: string,
    updates: Partial<Omit<MasterCandidate, 'id' | 'createdAt'>>
  ): { success: boolean; message: string; candidate?: MasterCandidate } => {
    const idx = masterCandidatesDatabase.value.findIndex(m => m.id === id)
    if (idx === -1) {
      return { success: false, message: 'Master kandidat tidak ditemukan.' }
    }

    const existing = masterCandidatesDatabase.value[idx]
    const updated: MasterCandidate = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    if (updated.type === 'single') {
      delete updated.viceCandidate
    }

    masterCandidatesDatabase.value[idx] = updated
    return {
      success: true,
      message: `Data master kandidat "${updated.name}" berhasil diperbarui.`,
      candidate: updated
    }
  }

  // ── Mutation Master: Hapus Master Kandidat ───────────────────────────────
  const deleteMasterCandidate = (
    candidateId: string
  ): { success: boolean; message: string } => {
    const activeParticipations = electionCandidateParticipationsDatabase.value.filter(
      p => p.candidateId === candidateId
    )

    if (activeParticipations.length > 0) {
      const electionIds = activeParticipations.map(p => p.electionId).join(', ')
      return {
        success: false,
        message: `Kandidat masih berpartisipasi dalam agenda pemilihan (${electionIds}). Cabut keikutsertaan terlebih dahulu sebelum menghapus data master.`
      }
    }

    const idx = masterCandidatesDatabase.value.findIndex(m => m.id === candidateId)
    if (idx === -1) {
      return { success: false, message: 'Master kandidat tidak ditemukan.' }
    }

    const name = masterCandidatesDatabase.value[idx].name
    masterCandidatesDatabase.value.splice(idx, 1)

    return {
      success: true,
      message: `Master kandidat "${name}" berhasil dihapus dari sistem.`
    }
  }

  // ── Mutation Participation: Tetapkan Kandidat ke Election ───────────────
  const assignCandidatesToElection = (
    electionId: string,
    candidateIds: string[],
    defaultStatus: CandidateVerificationStatus = 'Terverifikasi KPU'
  ): { added: number; participations: ElectionCandidateParticipation[] } => {
    const addedList: ElectionCandidateParticipation[] = []

    for (const candId of candidateIds) {
      // 1. Cek apakah master kandidat valid
      const master = masterCandidatesDatabase.value.find(m => m.id === candId)
      if (!master) continue

      // 2. Cek apakah sudah terdaftar di election ini (tidak boleh diduplikasi)
      const alreadyIn = isCandidateInElection(electionId, candId)
      if (alreadyIn) continue

      // 3. Tentukan nomor urut unik
      const ballotNum = getNextAvailableBallotNumber(electionId)
      const isInBallot = defaultStatus === 'Terverifikasi KPU'

      const newPart: ElectionCandidateParticipation = {
        id: `cand-${electionId.toLowerCase()}-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`,
        electionId,
        candidateId: candId,
        ballotNumber: ballotNum,
        status: defaultStatus,
        isInBallot,
        votesCount: 0,
        createdAt: new Date().toISOString()
      }

      electionCandidateParticipationsDatabase.value.push(newPart)
      addedList.push(newPart)
    }

    return {
      added: addedList.length,
      participations: addedList
    }
  }

  // ── Mutation Participation: Cabut Keikutsertaan dari Election ───────────
  const removeCandidateFromElection = (
    electionId: string,
    participationOrCandidateId: string,
    electionStatus?: string
  ): { success: boolean; message: string } => {
    const check = canDeleteCandidate(participationOrCandidateId, electionStatus)
    if (!check.allowed) {
      return { success: false, message: check.reason || 'Keikutsertaan kandidat tidak dapat dicabut.' }
    }

    const idx = electionCandidateParticipationsDatabase.value.findIndex(
      p => p.electionId === electionId &&
           (p.id === participationOrCandidateId || p.candidateId === participationOrCandidateId)
    )

    if (idx === -1) {
      return { success: false, message: 'Kandidat tidak terdaftar pada pemilihan ini.' }
    }

    const removedPart = electionCandidateParticipationsDatabase.value[idx]
    const master = masterCandidatesDatabase.value.find(m => m.id === removedPart.candidateId)
    const candName = master ? master.name : `Kandidat #${removedPart.ballotNumber}`

    electionCandidateParticipationsDatabase.value.splice(idx, 1)

    return {
      success: true,
      message: `Kandidat "${candName}" (#${removedPart.ballotNumber}) berhasil dicabut dari agenda ${electionId}. Master kandidat tetap tersimpan aman.`
    }
  }

  // ── Mutation Participation: Update Partisipasi ──────────────────────────
  const updateCandidateParticipation = (
    participationId: string,
    updates: Partial<Omit<ElectionCandidateParticipation, 'id' | 'electionId' | 'candidateId' | 'createdAt'>>
  ): { success: boolean; message: string; participation?: ElectionCandidateParticipation } => {
    const idx = electionCandidateParticipationsDatabase.value.findIndex(p => p.id === participationId)
    if (idx === -1) {
      return { success: false, message: 'Data keikutsertaan kandidat tidak ditemukan.' }
    }

    const existing = electionCandidateParticipationsDatabase.value[idx]

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

    const nextStatus = updates.status !== undefined ? updates.status : existing.status
    const isInBallot = updates.isInBallot !== undefined ? updates.isInBallot : (nextStatus === 'Terverifikasi KPU')

    const updated: ElectionCandidateParticipation = {
      ...existing,
      ...updates,
      status: nextStatus,
      isInBallot,
      updatedAt: new Date().toISOString()
    }

    electionCandidateParticipationsDatabase.value[idx] = updated
    return {
      success: true,
      message: 'Data keikutsertaan kandidat berhasil diperbarui.',
      participation: updated
    }
  }

  // ── Backward-Compatibility Helpers ───────────────────────────────────────
  // Mempertahankan addCandidate() untuk kode lama atau pendaftaran master sekaligus
  const addCandidate = (
    data: Omit<ElectionCandidate, 'id' | 'createdAt' | 'isInBallot' | 'participationId' | 'candidateId'> & {
      isInBallot?: boolean
      candidateId?: string
    }
  ): { success: boolean; message: string; candidate?: ElectionCandidate } => {
    if (!data.electionId) {
      return { success: false, message: 'ID pemilihan (electionId) wajib disertakan.' }
    }

    // 1. Cek atau Buat Master Candidate
    let masterId = data.candidateId
    if (!masterId) {
      const masterRes = addMasterCandidate({
        type: data.type,
        name: data.name,
        leadCandidate: data.leadCandidate,
        viceCandidate: data.viceCandidate,
        tagline: data.tagline,
        photo: data.photo,
        color: data.color,
        coalition: data.coalition,
        visi: data.visi,
        misi: data.misi,
        pillars: data.pillars,
        documents: data.documents
      })
      if (!masterRes.success || !masterRes.candidate) {
        return { success: false, message: masterRes.message }
      }
      masterId = masterRes.candidate.id
    }

    // 2. Cek apakah sudah terdaftar di election ini
    if (isCandidateInElection(data.electionId, masterId)) {
      return { success: false, message: 'Kandidat ini sudah terdaftar pada agenda pemilihan tersebut.' }
    }

    // 3. Cek nomor urut
    const ballotNum = data.ballotNumber.trim().padStart(2, '0')
    if (!isBallotNumberAvailable(data.electionId, ballotNum)) {
      return {
        success: false,
        message: `Nomor urut #${ballotNum} sudah digunakan oleh calon lain pada pemilihan ini. Pilih nomor urut lain.`
      }
    }

    const isInBallot = data.status === 'Terverifikasi KPU'

    const newPart: ElectionCandidateParticipation = {
      id: `cand-${data.electionId.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      electionId: data.electionId,
      candidateId: masterId,
      ballotNumber: ballotNum,
      status: data.status,
      isInBallot,
      votesCount: data.votesCount || 0,
      createdAt: new Date().toISOString()
    }

    electionCandidateParticipationsDatabase.value.push(newPart)
    const hydrated = hydrateParticipation(newPart)

    return {
      success: true,
      message: `Kandidat "${hydrated?.name || data.name}" (#${ballotNum}) berhasil ditambahkan.`,
      candidate: hydrated || undefined
    }
  }

  const updateCandidate = (
    id: string,
    updates: Partial<Omit<ElectionCandidate, 'id' | 'electionId' | 'createdAt'>>
  ): { success: boolean; message: string; candidate?: ElectionCandidate } => {
    // 1. Cari partisipasi
    let part = electionCandidateParticipationsDatabase.value.find(p => p.id === id)
    if (!part) {
      part = electionCandidateParticipationsDatabase.value.find(p => p.candidateId === id)
    }

    if (part) {
      // Update partisipasi (ballotNumber, status, isInBallot)
      const partUpdates: Partial<ElectionCandidateParticipation> = {}
      if (updates.ballotNumber !== undefined) partUpdates.ballotNumber = updates.ballotNumber
      if (updates.status !== undefined) partUpdates.status = updates.status
      if (updates.isInBallot !== undefined) partUpdates.isInBallot = updates.isInBallot

      if (Object.keys(partUpdates).length > 0) {
        const partRes = updateCandidateParticipation(part.id, partUpdates)
        if (!partRes.success) {
          return { success: false, message: partRes.message }
        }
      }

      // Update profil master jika ada perubahan field master
      const masterUpdates: Partial<MasterCandidate> = {}
      if (updates.name !== undefined) masterUpdates.name = updates.name
      if (updates.type !== undefined) masterUpdates.type = updates.type
      if (updates.tagline !== undefined) masterUpdates.tagline = updates.tagline
      if (updates.coalition !== undefined) masterUpdates.coalition = updates.coalition
      if (updates.color !== undefined) masterUpdates.color = updates.color
      if (updates.photo !== undefined) masterUpdates.photo = updates.photo
      if (updates.leadCandidate !== undefined) masterUpdates.leadCandidate = updates.leadCandidate
      if (updates.viceCandidate !== undefined) masterUpdates.viceCandidate = updates.viceCandidate
      if (updates.visi !== undefined) masterUpdates.visi = updates.visi
      if (updates.misi !== undefined) masterUpdates.misi = updates.misi
      if (updates.pillars !== undefined) masterUpdates.pillars = updates.pillars
      if (updates.documents !== undefined) masterUpdates.documents = updates.documents

      if (Object.keys(masterUpdates).length > 0) {
        updateMasterCandidate(part.candidateId, masterUpdates)
      }

      const refreshed = hydrateParticipation(part)
      return {
        success: true,
        message: `Data kandidat "${refreshed?.name || ''}" berhasil diperbarui.`,
        candidate: refreshed || undefined
      }
    }

    // Jika yang diedit langsung master candidate ID
    const master = masterCandidatesDatabase.value.find(m => m.id === id)
    if (master) {
      const res = updateMasterCandidate(id, updates as any)
      return {
        success: res.success,
        message: res.message
      }
    }

    return { success: false, message: 'Kandidat tidak ditemukan.' }
  }

  const deleteCandidate = (
    candidateIdOrPartId: string,
    electionStatus?: string
  ): { success: boolean; message: string } => {
    // Cari apakah ini partisipasi
    const part = electionCandidateParticipationsDatabase.value.find(
      p => p.id === candidateIdOrPartId || p.candidateId === candidateIdOrPartId
    )

    if (part) {
      return removeCandidateFromElection(part.electionId, part.id, electionStatus)
    }

    // Jika murni master candidate tanpa partisipasi
    return deleteMasterCandidate(candidateIdOrPartId)
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
    // State Databases
    masterCandidatesDatabase,
    electionCandidateParticipationsDatabase,
    candidatesDatabase,

    // Master Candidate Operations
    getAllMasterCandidates,
    getMasterCandidateById,
    addMasterCandidate,
    updateMasterCandidate,
    deleteMasterCandidate,
    getMasterCandidateParticipations,

    // Election Participation Operations
    getCandidatesByElection,
    getCandidateById,
    isCandidateInElection,
    getUnassignedMasterCandidates,
    isBallotNumberAvailable,
    getNextAvailableBallotNumber,
    assignCandidatesToElection,
    removeCandidateFromElection,
    updateCandidateParticipation,

    // Shared & Backward Compatibility Operations
    canDeleteCandidate,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidateStats
  }
}
