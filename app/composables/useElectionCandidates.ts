import { computed } from 'vue'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  writeBatch,
  type Firestore,
  type DocumentData
} from 'firebase/firestore'

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

// ── Helper: Normalisasi Dokumen Firestore ke MasterCandidate ──────────────────
export function normalizeFirestoreCandidate(id: string, data: DocumentData): MasterCandidate {
  const parseDate = (val: any): string => {
    if (!val) return new Date().toISOString()
    if (typeof val.toDate === 'function') {
      return val.toDate().toISOString()
    }
    if (typeof val === 'string') {
      return val
    }
    if (typeof val === 'number') {
      return new Date(val).toISOString()
    }
    return new Date().toISOString()
  }

  const rawLead = data.leadCandidate || {}
  const leadCandidate: CandidatePerson = {
    name: String(rawLead.name || '').trim(),
    nim: String(rawLead.nim || '').trim(),
    faculty: String(rawLead.faculty || '').trim(),
    major: String(rawLead.major || '').trim(),
    semester: typeof rawLead.semester === 'number' ? rawLead.semester : Number(rawLead.semester) || 6,
    gpa: typeof rawLead.gpa === 'number' ? rawLead.gpa : Number(rawLead.gpa) || 3.5
  }
  if (rawLead.studentId) leadCandidate.studentId = String(rawLead.studentId).trim()
  if (rawLead.facultyCode) leadCandidate.facultyCode = String(rawLead.facultyCode).trim()

  let viceCandidate: CandidatePerson | undefined = undefined
  if (data.type === 'pair' && data.viceCandidate) {
    const rawVice = data.viceCandidate
    viceCandidate = {
      name: String(rawVice.name || '').trim(),
      nim: String(rawVice.nim || '').trim(),
      faculty: String(rawVice.faculty || '').trim(),
      major: String(rawVice.major || '').trim(),
      semester: typeof rawVice.semester === 'number' ? rawVice.semester : Number(rawVice.semester) || 6,
      gpa: typeof rawVice.gpa === 'number' ? rawVice.gpa : Number(rawVice.gpa) || 3.5
    }
    if (rawVice.studentId) viceCandidate.studentId = String(rawVice.studentId).trim()
    if (rawVice.facultyCode) viceCandidate.facultyCode = String(rawVice.facultyCode).trim()
  }

  const misi = Array.isArray(data.misi)
    ? data.misi.map((m: any) => String(m).trim()).filter(Boolean)
    : []

  const pillars = Array.isArray(data.pillars)
    ? data.pillars.map((p: any) => String(p).trim()).filter(Boolean)
    : []

  const documents: CandidateRequirementDoc[] = Array.isArray(data.documents)
    ? data.documents.map((doc: any) => {
        const item: CandidateRequirementDoc = {
          name: String(doc.name || 'Dokumen Persyaratan'),
          status: (doc.status === 'valid' || doc.status === 'pending' || doc.status === 'rejected') ? doc.status : 'pending'
        }
        if (doc.note) {
          item.note = String(doc.note).trim()
        }
        return item
      })
    : [
        { name: 'KRS & Transkrip IPK (≥ 3.25)', status: leadCandidate.gpa && leadCandidate.gpa >= 3.25 ? 'valid' : 'pending' },
        { name: 'Surat Bebas Sanksi Akademik & SKCK', status: 'valid' },
        { name: 'Dukungan Mahasiswa Sah', status: 'valid' }
      ]

  const mapped: MasterCandidate = {
    id,
    type: data.type === 'single' ? 'single' : 'pair',
    name: String(data.name || '').trim(),
    leadCandidate,
    tagline: String(data.tagline || '').trim(),
    photo: String(data.photo || '').trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    color: String(data.color || '#582be8').trim(),
    coalition: String(data.coalition || '').trim() || (data.type === 'pair' ? 'Koalisi Paslon' : 'Independen'),
    visi: String(data.visi || '').trim(),
    misi,
    pillars,
    documents,
    createdAt: parseDate(data.createdAt)
  }
  if (viceCandidate) {
    mapped.viceCandidate = viceCandidate
  }
  if (data.updatedAt) {
    mapped.updatedAt = parseDate(data.updatedAt)
  }
  return mapped
}

// ── Helper: Normalisasi Dokumen Firestore ke ElectionCandidateParticipation ──
export function normalizeFirestoreParticipation(id: string, data: DocumentData): ElectionCandidateParticipation & { _rawSnapshot?: any } {
  const parseDate = (val: any): string => {
    if (!val) return new Date().toISOString()
    if (typeof val.toDate === 'function') {
      return val.toDate().toISOString()
    }
    if (typeof val === 'string') {
      return val
    }
    if (typeof val === 'number') {
      return new Date(val).toISOString()
    }
    return new Date().toISOString()
  }

  let status: CandidateVerificationStatus = 'Menunggu Berkas'
  if (data.status === 'Terverifikasi KPU') {
    status = 'Terverifikasi KPU'
  } else if (data.status === 'Ditolak') {
    status = 'Ditolak'
  } else if (data.status === 'Revisi Dukungan') {
    status = 'Revisi Dukungan'
  }

  const ballotNum = data.ballotNumber !== undefined && data.ballotNumber !== null
    ? String(data.ballotNumber).trim().padStart(2, '0')
    : ''

  return {
    id,
    electionId: String(data.electionId || '').trim(),
    candidateId: String(data.candidateId || id).trim(),
    ballotNumber: ballotNum,
    status,
    isInBallot: typeof data.isInBallot === 'boolean' ? data.isInBallot : (status === 'Terverifikasi KPU'),
    votesCount: typeof data.votesCount === 'number' ? data.votesCount : Number(data.votesCount) || 0,
    createdAt: parseDate(data.createdAt),
    updatedAt: data.updatedAt ? parseDate(data.updatedAt) : undefined,
    _rawSnapshot: data
  }
}

// ── Helper: Menghapus nilai undefined secara rekursif agar payload Firestore valid ──
function cleanFirestorePayload(val: any): any {
  if (val === undefined) {
    return undefined
  }
  if (val === null || typeof val !== 'object') {
    return val
  }
  if (val instanceof Date) {
    return val
  }
  if (Array.isArray(val)) {
    return val
      .map(item => cleanFirestorePayload(item))
      .filter(item => item !== undefined)
  }
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(val)) {
    if (value === undefined) {
      continue
    }
    const cleaned = cleanFirestorePayload(value)
    if (cleaned !== undefined) {
      result[key] = cleaned
    }
  }
  return result
}

// ── Master Candidate Seed Data (Referensi Pengembangan) ──────────────────────
export const SEED_MASTER_CANDIDATES: MasterCandidate[] = [
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
]

export const useElectionCandidates = () => {
  const nuxtApp = useNuxtApp()

  const getDb = (): Firestore | null => {
    if (!import.meta.client) return null
    try {
      return (nuxtApp.$firestore || nuxtApp.$db) as Firestore | null
    } catch {
      return null
    }
  }

  // ── Master Candidates Database (Koleksi Firestore: master_candidates) ────
  // State dimulai dari array kosong. Data dimuat dari Firestore melalui fetchMasterCandidates().
  const masterCandidatesDatabase = useState<MasterCandidate[]>('masterCandidatesDatabase', () => [])
  const masterCandidatesLoading = useState<boolean>('masterCandidatesLoading', () => false)
  const masterCandidatesError = useState<string | null>('masterCandidatesError', () => null)
  const masterCandidatesLoaded = useState<boolean>('masterCandidatesLoaded', () => false)

  const fetchMasterCandidates = async (force = false): Promise<MasterCandidate[]> => {
    if (!import.meta.client) {
      return masterCandidatesDatabase.value
    }

    if (masterCandidatesLoaded.value && !force && masterCandidatesDatabase.value.length > 0) {
      return masterCandidatesDatabase.value
    }

    const db = getDb()
    if (!db) {
      masterCandidatesError.value = 'Layanan Cloud Firestore belum siap atau tidak tersedia di klien.'
      masterCandidatesLoading.value = false
      return []
    }

    masterCandidatesLoading.value = true
    masterCandidatesError.value = null

    try {
      const colRef = collection(db, 'master_candidates')
      const snapshot = await getDocs(colRef)
      const loaded: MasterCandidate[] = snapshot.docs.map(docSnap => {
        return normalizeFirestoreCandidate(docSnap.id, docSnap.data())
      })
      masterCandidatesDatabase.value = loaded
      masterCandidatesLoaded.value = true
      return loaded
    } catch (err: any) {
      console.error('[useElectionCandidates] Gagal membaca koleksi master_candidates dari Firestore:', err)
      let msg = err.message || 'Gagal memuat data master kandidat dari Cloud Firestore.'
      if (err.code === 'permission-denied') {
        msg = 'Akses Firestore ditolak (Permission Denied). Pastikan Anda telah login sebagai admin terdaftar.'
      } else if (err.code === 'unavailable') {
        msg = 'Tidak dapat terhubung ke Cloud Firestore. Periksa koneksi internet Anda.'
      }
      masterCandidatesError.value = msg
      // PERINGATAN: Jangan diam-diam mengisi seed data saat Firestore gagal dibaca
      return []
    } finally {
      masterCandidatesLoading.value = false
    }
  }

  // ── Election Candidate Participations Database (Koleksi Firestore: candidate_participations) ──
  // State dimulai dari array kosong. Data dimuat secara reaktif dari Firestore melalui fetchCandidateParticipations().
  const electionCandidateParticipationsDatabase = useState<ElectionCandidateParticipation[]>(
    'electionCandidateParticipationsDatabase',
    () => []
  )
  const participationsLoading = useState<boolean>('participationsLoading', () => false)
  const participationsError = useState<string | null>('participationsError', () => null)
  const participationsLoaded = useState<boolean>('participationsLoaded', () => false)

  const fetchCandidateParticipations = async (
    electionId?: string,
    force = false
  ): Promise<ElectionCandidateParticipation[]> => {
    if (!import.meta.client) {
      return electionCandidateParticipationsDatabase.value
    }

    if (participationsLoaded.value && !force && !electionId && electionCandidateParticipationsDatabase.value.length > 0) {
      return electionCandidateParticipationsDatabase.value
    }

    const db = getDb()
    if (!db) {
      participationsError.value = 'Layanan Cloud Firestore belum siap atau tidak tersedia di klien.'
      participationsLoading.value = false
      return electionCandidateParticipationsDatabase.value
    }

    participationsLoading.value = true
    participationsError.value = null

    try {
      let snapshot
      if (electionId && electionId !== 'all') {
        const q = query(
          collection(db, 'candidate_participations'),
          where('electionId', '==', electionId)
        )
        snapshot = await getDocs(q)
      } else {
        const colRef = collection(db, 'candidate_participations')
        snapshot = await getDocs(colRef)
      }

      const loaded: ElectionCandidateParticipation[] = snapshot.docs.map(docSnap =>
        normalizeFirestoreParticipation(docSnap.id, docSnap.data())
      )

      if (electionId && electionId !== 'all') {
        // Ganti hanya partisipasi untuk electionId ini secara bersih
        const otherParts = electionCandidateParticipationsDatabase.value.filter(
          p => p.electionId !== electionId
        )
        electionCandidateParticipationsDatabase.value = [...otherParts, ...loaded]
      } else {
        // Pengambilan global / seluruh agenda
        electionCandidateParticipationsDatabase.value = loaded
      }

      participationsLoaded.value = true
      return loaded
    } catch (err: any) {
      console.error('[useElectionCandidates] Gagal membaca koleksi candidate_participations dari Firestore:', err)
      let msg = err.message || 'Gagal memuat data partisipasi kandidat dari Cloud Firestore.'
      if (err.code === 'permission-denied') {
        msg = 'Akses Firestore ditolak (Permission Denied). Pastikan akun Anda telah login sebagai admin terdaftar.'
      } else if (err.code === 'unavailable') {
        msg = 'Tidak dapat terhubung ke Cloud Firestore. Periksa koneksi internet Anda.'
      }
      participationsError.value = msg
      return electionCandidateParticipationsDatabase.value
    } finally {
      participationsLoading.value = false
    }
  }

  // ── Helper: Join Master with Participation ──────────────────────────────
  const hydrateParticipation = (part: ElectionCandidateParticipation & { _rawSnapshot?: any }): ElectionCandidate | null => {
    let master = masterCandidatesDatabase.value.find(m => m.id === part.candidateId)

    // Jika master belum ada di masterCandidatesDatabase, periksa fallback embedded snapshot dari dokumen Firestore
    if (!master && part._rawSnapshot) {
      const emb = part._rawSnapshot
      const leadRaw = emb.leadCandidate || emb.chairman || emb.ketua || {}
      const viceRaw = emb.viceCandidate || emb.viceChairman || emb.wakil
      const leadName = String(leadRaw.name || '').trim()
      const viceName = viceRaw ? String(viceRaw.name || '').trim() : ''
      const fallbackName = leadName && viceName
        ? `${leadName} & ${viceName}`
        : (leadName || `Kandidat #${part.ballotNumber || part.id}`)

      master = {
        id: part.candidateId,
        type: viceRaw ? 'pair' : 'single',
        name: String(emb.name || emb.fullName || fallbackName).trim(),
        leadCandidate: {
          name: leadName || '-',
          nim: String(leadRaw.nim || '-').trim(),
          faculty: String(leadRaw.faculty || '-').trim(),
          major: String(leadRaw.studyProgram || leadRaw.major || '-').trim(),
          semester: Number(leadRaw.semester) || 6,
          gpa: Number(leadRaw.gpa) || 3.5
        },
        viceCandidate: viceRaw ? {
          name: viceName || '-',
          nim: String(viceRaw.nim || '-').trim(),
          faculty: String(viceRaw.faculty || '-').trim(),
          major: String(viceRaw.studyProgram || viceRaw.major || '-').trim(),
          semester: Number(viceRaw.semester) || 6,
          gpa: Number(viceRaw.gpa) || 3.5
        } : undefined,
        tagline: String(emb.tagline || '').trim(),
        photo: String(emb.photo || leadRaw.photoUrl || '').trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        color: String(emb.color || '#582be8').trim(),
        coalition: String(emb.coalition || 'Independen').trim(),
        visi: String(emb.visi || emb.vision || '').trim(),
        misi: Array.isArray(emb.misi) ? emb.misi : (Array.isArray(emb.missions) ? emb.missions : []),
        pillars: Array.isArray(emb.pillars) ? emb.pillars : [],
        createdAt: part.createdAt
      }
    }

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
    const validCandidates = getCandidatesByElection(electionId)
    return !validCandidates.some(c => {
      if (
        excludeParticipationId &&
        (c.participationId === excludeParticipationId ||
         c.id === excludeParticipationId ||
         c.candidateId === excludeParticipationId)
      ) {
        return false // Exclude candidate currently being edited
      }
      return c.ballotNumber.trim().padStart(2, '0') === cleanNumber
    })
  }

  // Cari nomor urut berikutnya yang tersedia pada suatu Election
  const getNextAvailableBallotNumber = (electionId: string): string => {
    const validCandidates = getCandidatesByElection(electionId)
    const existing = validCandidates
      .map(c => parseInt(c.ballotNumber, 10))
      .filter(n => !isNaN(n))
    
    let candidateNum = 1
    while (existing.includes(candidateNum)) {
      candidateNum++
    }
    return String(candidateNum).padStart(2, '0')
  }

  // ── Validation: Aturan Penghapusan Master Kandidat ──────────────────────
  const canDeleteMasterCandidate = (
    candidateId: string
  ): { allowed: boolean; reason?: string } => {
    const master = masterCandidatesDatabase.value.find(m => m.id === candidateId)
    if (!master) {
      return { allowed: false, reason: 'Data master kandidat tidak ditemukan dalam sistem.' }
    }

    const activeParts = getMasterCandidateParticipations(candidateId)
    if (activeParts.length > 0) {
      const electionIds = activeParts.map(p => p.electionId).join(', ')
      return {
        allowed: false,
        reason: `Kandidat masih berpartisipasi dalam agenda pemilihan (${electionIds}). Cabut keikutsertaan kandidat dari agenda pemilihan terkait terlebih dahulu sebelum menghapus data master.`
      }
    }

    return { allowed: true }
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
      // Jika dipanggil dengan ID master kandidat tanpa partisipasi
      const master = masterCandidatesDatabase.value.find(m => m.id === participationOrCandidateId)
      if (master) {
        return canDeleteMasterCandidate(master.id)
      }
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

  // ── Mutation Master: Tambah Master Kandidat ke Firestore ────────────────
  const addMasterCandidate = async (
    data: Omit<MasterCandidate, 'id' | 'createdAt'>
  ): Promise<{ success: boolean; message: string; candidate?: MasterCandidate }> => {
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

    const db = getDb()
    if (!db) {
      return {
        success: false,
        message: 'Layanan Cloud Firestore belum siap atau tidak tersedia di klien.'
      }
    }

    try {
      // Konsistensi ID: ID dokumen Firestore adalah persis ID kandidat yang digunakan aplikasi
      const colRef = collection(db, 'master_candidates')
      const docRef = doc(colRef)
      const newId = docRef.id

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

      if (newMaster.type === 'single') {
        delete newMaster.viceCandidate
      }

      const payload = cleanFirestorePayload(newMaster)
      await setDoc(docRef, payload)

      masterCandidatesDatabase.value.push(newMaster)
      return {
        success: true,
        message: `Master data kandidat "${newMaster.name}" berhasil didaftarkan ke Firestore.`,
        candidate: newMaster
      }
    } catch (err: any) {
      console.error('[useElectionCandidates] Gagal menambahkan master kandidat ke Firestore:', err)
      const msg = err.code === 'permission-denied'
        ? 'Gagal menyimpan ke Firestore: Akses ditolak (Permission Denied). Pastikan akun Anda memiliki akses admin.'
        : (err.message || 'Terjadi kesalahan saat menyimpan master kandidat ke Firestore.')
      return { success: false, message: msg }
    }
  }

  // ── Mutation Master: Update Master Kandidat di Firestore ─────────────────
  const updateMasterCandidate = async (
    id: string,
    updates: Partial<Omit<MasterCandidate, 'id' | 'createdAt'>>
  ): Promise<{ success: boolean; message: string; candidate?: MasterCandidate }> => {
    const idx = masterCandidatesDatabase.value.findIndex(m => m.id === id)
    if (idx === -1) {
      return { success: false, message: 'Master kandidat tidak ditemukan.' }
    }

    const db = getDb()
    if (!db) {
      return { success: false, message: 'Layanan Cloud Firestore belum siap atau tidak tersedia.' }
    }

    try {
      const existing = masterCandidatesDatabase.value[idx]
      const updated: MasterCandidate = {
        ...existing,
        ...updates,
        updatedAt: new Date().toISOString()
      }

      if (updated.type === 'single') {
        delete updated.viceCandidate
      }

      const docRef = doc(db, 'master_candidates', id)
      const payload = cleanFirestorePayload(updated)

      if (process.dev) {
        const hasUndefined = Object.entries(payload).some(([_, v]) => v === undefined)
        if (hasUndefined) {
          console.warn('[useElectionCandidates] Peringatan: Terdapat field undefined pada payload update master_candidates')
        }
      }

      await setDoc(docRef, payload)

      masterCandidatesDatabase.value[idx] = updated
      return {
        success: true,
        message: `Data master kandidat "${updated.name}" berhasil diperbarui di Firestore.`,
        candidate: updated
      }
    } catch (err: any) {
      console.error('[useElectionCandidates] Gagal memperbarui master kandidat di Firestore:', err)
      const msg = err.code === 'permission-denied'
        ? 'Gagal memperbarui: Akses Firestore ditolak (Permission Denied).'
        : (err.message || 'Terjadi kesalahan saat memperbarui data master kandidat.')
      return { success: false, message: msg }
    }
  }

  // ── Mutation Master: Hapus Master Kandidat dari Firestore ────────────────
  const deleteMasterCandidate = async (
    candidateId: string
  ): Promise<{ success: boolean; message: string }> => {
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

    const db = getDb()
    if (!db) {
      return { success: false, message: 'Layanan Cloud Firestore belum siap atau tidak tersedia.' }
    }

    try {
      const name = masterCandidatesDatabase.value[idx].name
      const docRef = doc(db, 'master_candidates', candidateId)
      await deleteDoc(docRef)

      masterCandidatesDatabase.value.splice(idx, 1)
      return {
        success: true,
        message: `Master kandidat "${name}" berhasil dihapus dari Firestore.`
      }
    } catch (err: any) {
      console.error('[useElectionCandidates] Gagal menghapus master kandidat dari Firestore:', err)
      const msg = err.code === 'permission-denied'
        ? 'Gagal menghapus: Akses Firestore ditolak (Permission Denied).'
        : (err.message || 'Terjadi kesalahan saat menghapus data master kandidat.')
      return { success: false, message: msg }
    }
  }

  // ── Mutation Participation: Tetapkan Kandidat ke Election di Firestore ───────
  const assignCandidatesToElection = async (
    electionId: string,
    candidateIds: string[],
    defaultStatus: CandidateVerificationStatus = 'Terverifikasi KPU'
  ): Promise<{ success: boolean; message: string; added: number; participations: ElectionCandidateParticipation[] }> => {
    if (!electionId) {
      return { success: false, message: 'ID agenda pemilihan tidak valid.', added: 0, participations: [] }
    }
    if (!candidateIds.length) {
      return { success: false, message: 'Pilih minimal satu kandidat dari master.', added: 0, participations: [] }
    }

    const db = getDb()
    if (!db) {
      return { success: false, message: 'Layanan Cloud Firestore belum siap atau tidak tersedia.', added: 0, participations: [] }
    }

    if (masterCandidatesDatabase.value.length === 0) {
      await fetchMasterCandidates()
    }

    const addedList: ElectionCandidateParticipation[] = []
    const newDocsToSave: Array<{ docId: string; payload: Record<string, any>; part: ElectionCandidateParticipation }> = []

    const existingCandidates = getCandidatesByElection(electionId)
    const existingNumbers = new Set(
      existingCandidates.map(c => parseInt(c.ballotNumber, 10)).filter(n => !isNaN(n))
    )

    let nextNum = 1
    const getNextNum = () => {
      while (existingNumbers.has(nextNum)) {
        nextNum++
      }
      existingNumbers.add(nextNum)
      return String(nextNum).padStart(2, '0')
    }

    for (const candId of candidateIds) {
      const master = masterCandidatesDatabase.value.find(m => m.id === candId)
      if (!master) continue

      const alreadyIn = isCandidateInElection(electionId, candId)
      if (alreadyIn) continue

      const ballotNum = getNextNum()
      const isInBallot = defaultStatus === 'Terverifikasi KPU'

      // Pola ID dokumen deterministik & stabil: `${electionId}_${candId}`
      const participationId = `${electionId}_${candId}`
      const nowIso = new Date().toISOString()

      const newPart: ElectionCandidateParticipation = {
        id: participationId,
        electionId,
        candidateId: candId,
        ballotNumber: ballotNum,
        status: defaultStatus,
        isInBallot,
        votesCount: 0,
        createdAt: nowIso,
        updatedAt: nowIso
      }

      // Payload lengkap untuk koleksi candidate_participations
      const payload: Record<string, any> = {
        id: participationId,
        electionId,
        candidateId: candId,
        ballotNumber: ballotNum,
        status: defaultStatus,
        isInBallot,
        votesCount: 0,
        createdAt: nowIso,
        updatedAt: nowIso,

        // Snapshot profil master kandidat untuk interoperabilitas bilik suara dan audit
        name: master.name,
        fullName: master.name,
        type: master.type,
        tagline: master.tagline || '',
        photo: master.photo || '',
        color: master.color || '#582be8',
        coalition: master.coalition || (master.type === 'pair' ? 'Koalisi Paslon' : 'Independen'),
        facultyBadge: master.leadCandidate?.faculty || 'Paslon Resmi',
        visi: master.visi || '',
        misi: Array.isArray(master.misi) ? master.misi : [],
        pillars: Array.isArray(master.pillars) ? master.pillars : [],
        programKerja: Array.isArray(master.pillars)
          ? master.pillars.map((p, idx) => ({ title: `Pilar ${idx + 1}`, desc: p }))
          : [],
        leadCandidate: cleanFirestorePayload(master.leadCandidate),
        ketua: cleanFirestorePayload(master.leadCandidate),
        chairman: cleanFirestorePayload(master.leadCandidate)
      }

      if (master.type === 'pair' && master.viceCandidate) {
        payload.viceCandidate = cleanFirestorePayload(master.viceCandidate)
        payload.wakil = cleanFirestorePayload(master.viceCandidate)
        payload.viceChairman = cleanFirestorePayload(master.viceCandidate)
      }

      newDocsToSave.push({
        docId: participationId,
        payload: cleanFirestorePayload(payload),
        part: newPart
      })
    }

    if (newDocsToSave.length === 0) {
      return {
        success: true,
        message: 'Semua kandidat yang dipilih sudah terdaftar sebelumnya.',
        added: 0,
        participations: []
      }
    }

    try {
      const batch = writeBatch(db)
      for (const item of newDocsToSave) {
        const docRef = doc(db, 'candidate_participations', item.docId)
        batch.set(docRef, item.payload)
      }
      await batch.commit()

      for (const item of newDocsToSave) {
        const existingIdx = electionCandidateParticipationsDatabase.value.findIndex(p => p.id === item.docId)
        if (existingIdx !== -1) {
          electionCandidateParticipationsDatabase.value[existingIdx] = item.part
        } else {
          electionCandidateParticipationsDatabase.value.push(item.part)
        }
        addedList.push(item.part)
      }

      return {
        success: true,
        message: `Berhasil menetapkan ${addedList.length} pasangan calon ke agenda ${electionId} di Cloud Firestore.`,
        added: addedList.length,
        participations: addedList
      }
    } catch (err: any) {
      console.error('[useElectionCandidates] Gagal menyimpan partisipasi kandidat ke Firestore:', err)
      const msg = err.code === 'permission-denied'
        ? 'Akses Firestore ditolak (Permission Denied). Pastikan akun Anda memiliki hak akses admin.'
        : (err.message || 'Gagal menyimpan partisipasi kandidat ke Cloud Firestore.')
      return {
        success: false,
        message: msg,
        added: 0,
        participations: []
      }
    }
  }

  // ── Mutation Participation: Cabut Keikutsertaan dari Election di Firestore ──
  const removeCandidateFromElection = async (
    electionId: string,
    participationOrCandidateId: string,
    electionStatus?: string
  ): Promise<{ success: boolean; message: string }> => {
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
    const docId = removedPart.id || `${electionId}_${removedPart.candidateId}`

    const db = getDb()
    if (!db) {
      return { success: false, message: 'Layanan Cloud Firestore belum siap atau tidak tersedia.' }
    }

    try {
      const docRef = doc(db, 'candidate_participations', docId)
      await deleteDoc(docRef)

      electionCandidateParticipationsDatabase.value.splice(idx, 1)

      const master = masterCandidatesDatabase.value.find(m => m.id === removedPart.candidateId)
      const candName = master ? master.name : `Kandidat #${removedPart.ballotNumber}`

      return {
        success: true,
        message: `Kandidat "${candName}" (#${removedPart.ballotNumber}) berhasil dicabut dari agenda ${electionId} di Firestore.`
      }
    } catch (err: any) {
      console.error('[useElectionCandidates] Gagal menghapus dokumen candidate_participations di Firestore:', err)
      const msg = err.code === 'permission-denied'
        ? 'Akses Firestore ditolak (Permission Denied). Pastikan akun Anda memiliki hak akses admin.'
        : (err.message || 'Gagal menghapus partisipasi kandidat dari Cloud Firestore.')
      return { success: false, message: msg }
    }
  }

  // ── Mutation Participation: Update Partisipasi di Firestore ───────────────
  const updateCandidateParticipation = async (
    participationId: string,
    updates: Partial<Omit<ElectionCandidateParticipation, 'id' | 'electionId' | 'candidateId' | 'createdAt'>>
  ): Promise<{ success: boolean; message: string; participation?: ElectionCandidateParticipation }> => {
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

    const db = getDb()
    if (db) {
      try {
        const docRef = doc(db, 'candidate_participations', existing.id)
        await setDoc(docRef, cleanFirestorePayload({
          ballotNumber: updated.ballotNumber,
          status: updated.status,
          isInBallot: updated.isInBallot,
          updatedAt: updated.updatedAt
        }), { merge: true })
      } catch (err: any) {
        console.error('[useElectionCandidates] Gagal memperbarui partisipasi di Firestore:', err)
        return { success: false, message: `Gagal memperbarui Firestore: ${err.message}` }
      }
    }

    electionCandidateParticipationsDatabase.value[idx] = updated
    return {
      success: true,
      message: 'Data keikutsertaan kandidat berhasil diperbarui di Firestore.',
      participation: updated
    }
  }

  // ── Backward-Compatibility Helpers ───────────────────────────────────────
  const addCandidate = async (
    data: Omit<ElectionCandidate, 'id' | 'createdAt' | 'isInBallot' | 'participationId' | 'candidateId'> & {
      isInBallot?: boolean
      candidateId?: string
    }
  ): Promise<{ success: boolean; message: string; candidate?: ElectionCandidate }> => {
    if (!data.electionId) {
      return { success: false, message: 'ID pemilihan (electionId) wajib disertakan.' }
    }

    const ballotNum = (data.ballotNumber || '').trim().padStart(2, '0')
    if (!ballotNum || ballotNum === '00') {
      return { success: false, message: 'Nomor urut resmi tidak valid atau kosong.' }
    }
    if (!isBallotNumberAvailable(data.electionId, ballotNum)) {
      return {
        success: false,
        message: `Nomor urut #${ballotNum} sudah digunakan oleh calon lain pada pemilihan ini. Pilih nomor urut lain.`
      }
    }

    let masterId = data.candidateId
    if (!masterId) {
      const masterRes = await addMasterCandidate({
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

    if (isCandidateInElection(data.electionId, masterId)) {
      return { success: false, message: 'Kandidat ini sudah terdaftar pada agenda pemilihan tersebut.' }
    }

    const isInBallot = data.status === 'Terverifikasi KPU'
    const partDocId = `${data.electionId}_${masterId}`
    const nowIso = new Date().toISOString()

    const newPart: ElectionCandidateParticipation = {
      id: partDocId,
      electionId: data.electionId,
      candidateId: masterId,
      ballotNumber: ballotNum,
      status: data.status,
      isInBallot,
      votesCount: data.votesCount || 0,
      createdAt: nowIso,
      updatedAt: nowIso
    }

    const db = getDb()
    if (db) {
      try {
        const partDocRef = doc(db, 'candidate_participations', partDocId)
        const partPayload = cleanFirestorePayload({
          ...newPart,
          name: data.name,
          fullName: data.name,
          type: data.type,
          tagline: data.tagline || '',
          photo: data.photo || '',
          color: data.color || '#582be8',
          coalition: data.coalition || (data.type === 'pair' ? 'Koalisi Paslon' : 'Independen'),
          facultyBadge: data.leadCandidate?.faculty || 'Paslon Resmi',
          visi: data.visi || '',
          misi: data.misi || [],
          pillars: data.pillars || [],
          leadCandidate: cleanFirestorePayload(data.leadCandidate),
          ketua: cleanFirestorePayload(data.leadCandidate),
          chairman: cleanFirestorePayload(data.leadCandidate),
          viceCandidate: data.viceCandidate ? cleanFirestorePayload(data.viceCandidate) : undefined,
          wakil: data.viceCandidate ? cleanFirestorePayload(data.viceCandidate) : undefined,
          viceChairman: data.viceCandidate ? cleanFirestorePayload(data.viceCandidate) : undefined
        })
        await setDoc(partDocRef, partPayload)
      } catch (err: any) {
        console.error('[useElectionCandidates] Gagal menyimpan dokumen partisipasi ke Firestore:', err)
        return { success: false, message: `Gagal menyimpan ke Firestore: ${err.message}` }
      }
    }

    electionCandidateParticipationsDatabase.value.push(newPart)
    const hydrated = hydrateParticipation(newPart)

    return {
      success: true,
      message: `Kandidat "${hydrated?.name || data.name}" (#${ballotNum}) berhasil ditambahkan ke agenda pemilihan dan tersimpan di Firestore.`,
      candidate: hydrated || undefined
    }
  }

  const updateCandidate = async (
    id: string,
    updates: Partial<Omit<ElectionCandidate, 'id' | 'electionId' | 'createdAt'>>
  ): Promise<{ success: boolean; message: string; candidate?: ElectionCandidate }> => {
    let part = electionCandidateParticipationsDatabase.value.find(p => p.id === id)
    if (!part) {
      part = electionCandidateParticipationsDatabase.value.find(p => p.candidateId === id)
    }

    if (part) {
      const partIdx = electionCandidateParticipationsDatabase.value.findIndex(p => p.id === part!.id)
      const originalPart = { ...part }

      if (updates.ballotNumber !== undefined && updates.ballotNumber.trim() !== '') {
        const cleanNum = updates.ballotNumber.trim().padStart(2, '0')
        if (!isBallotNumberAvailable(part.electionId, cleanNum, part.id)) {
          return {
            success: false,
            message: `Nomor urut #${cleanNum} sudah digunakan oleh kandidat lain dalam pemilihan ini.`
          }
        }
      }

      // 1. Update profil master di Cloud Firestore
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
        const masterRes = await updateMasterCandidate(part.candidateId, masterUpdates)
        if (!masterRes.success) {
          if (partIdx !== -1) {
            electionCandidateParticipationsDatabase.value[partIdx] = originalPart
          }
          return { success: false, message: masterRes.message }
        }
      }

      // 2. Update data keikutsertaan / nomor urut di Firestore dan lokal
      const partUpdates: Partial<ElectionCandidateParticipation> = {}
      if (updates.ballotNumber !== undefined) partUpdates.ballotNumber = updates.ballotNumber
      if (updates.status !== undefined) partUpdates.status = updates.status
      if (updates.isInBallot !== undefined) partUpdates.isInBallot = updates.isInBallot

      if (Object.keys(partUpdates).length > 0) {
        const partRes = await updateCandidateParticipation(part.id, partUpdates)
        if (!partRes.success) {
          if (partIdx !== -1) {
            electionCandidateParticipationsDatabase.value[partIdx] = originalPart
          }
          return { success: false, message: partRes.message }
        }
      }

      // Sinkronkan juga snapshot data profil ke dokumen candidate_participations
      const db = getDb()
      if (db && Object.keys(masterUpdates).length > 0) {
        try {
          const docRef = doc(db, 'candidate_participations', part.id)
          await setDoc(docRef, cleanFirestorePayload({
            name: updates.name,
            fullName: updates.name,
            type: updates.type,
            tagline: updates.tagline,
            coalition: updates.coalition,
            color: updates.color,
            photo: updates.photo,
            leadCandidate: updates.leadCandidate ? cleanFirestorePayload(updates.leadCandidate) : undefined,
            ketua: updates.leadCandidate ? cleanFirestorePayload(updates.leadCandidate) : undefined,
            chairman: updates.leadCandidate ? cleanFirestorePayload(updates.leadCandidate) : undefined,
            viceCandidate: updates.viceCandidate ? cleanFirestorePayload(updates.viceCandidate) : undefined,
            wakil: updates.viceCandidate ? cleanFirestorePayload(updates.viceCandidate) : undefined,
            viceChairman: updates.viceCandidate ? cleanFirestorePayload(updates.viceCandidate) : undefined,
            visi: updates.visi,
            misi: updates.misi,
            pillars: updates.pillars,
            updatedAt: new Date().toISOString()
          }), { merge: true })
        } catch {
          // Non-blocking jika pembaruan snapshot tambahan gagal
        }
      }

      const refreshed = hydrateParticipation(electionCandidateParticipationsDatabase.value[partIdx])
      return {
        success: true,
        message: `Data profil master kandidat "${refreshed?.name || ''}" berhasil diperbarui di Firestore dan nomor paslon aktif pada sesi ini.`,
        candidate: refreshed || undefined
      }
    }

    const master = masterCandidatesDatabase.value.find(m => m.id === id)
    if (master) {
      const res = await updateMasterCandidate(id, updates as any)
      return {
        success: res.success,
        message: res.message
      }
    }

    return { success: false, message: 'Kandidat tidak ditemukan.' }
  }

  const deleteCandidate = async (
    candidateIdOrPartId: string,
    electionStatus?: string
  ): Promise<{ success: boolean; message: string }> => {
    const part = electionCandidateParticipationsDatabase.value.find(
      p => p.id === candidateIdOrPartId || p.candidateId === candidateIdOrPartId
    )

    if (part) {
      return await removeCandidateFromElection(part.electionId, part.id, electionStatus)
    }

    return await deleteMasterCandidate(candidateIdOrPartId)
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
    masterCandidatesLoading,
    masterCandidatesError,
    fetchMasterCandidates,
    electionCandidateParticipationsDatabase,
    participationsLoading,
    participationsError,
    participationsLoaded,
    fetchCandidateParticipations,
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
    canDeleteMasterCandidate,
    canDeleteCandidate,
    addCandidate,
    updateCandidate,
    deleteCandidate,
    getCandidateStats
  }
}
