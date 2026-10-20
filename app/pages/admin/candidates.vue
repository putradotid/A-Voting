<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type {
  ElectionCandidate,
  CandidateType,
  CandidateVerificationStatus
} from '~/composables/useElectionCandidates'

definePageMeta({
  layout: 'admin',
  middleware: 'admin-auth',
})

// ─── Shared Candidates Composable ────────────────────────────────────
const {
  masterCandidatesDatabase,
  masterCandidatesLoading,
  masterCandidatesError,
  fetchMasterCandidates,
  electionCandidateParticipationsDatabase,
  candidatesDatabase,
  getAllMasterCandidates,
  getMasterCandidateById,
  addMasterCandidate,
  updateMasterCandidate,
  deleteMasterCandidate,
  canDeleteMasterCandidate,
  getMasterCandidateParticipations,
  getCandidatesByElection,
  getCandidateStats,
  isBallotNumberAvailable,
  updateCandidateParticipation,
  addCandidate,
  updateCandidate,
  deleteCandidate,
  canDeleteCandidate
} = useElectionCandidates()

onMounted(async () => {
  await fetchMasterCandidates()
})

function getCandidateParticipationsList(candidateId: string) {
  return getMasterCandidateParticipations(candidateId)
}

// ─── Master Daftar Pemilihan (Mapping Referensi) ─────────────────────
const electionsList = [
  { id: 'all', name: 'Semua Agenda Pemilihan', shortName: 'Semua Agenda', code: 'ALL-ELECTIONS' },
  { id: 'PEM-2025-01', name: 'Pemilihan Raya Ketua & Wakil BEM 2025', shortName: 'BEM 2025', code: 'PEMIRA-BEM-2025' },
  { id: 'PEM-2025-02', name: 'DPM Fakultas Teknik 2025', shortName: 'DPM FT 2025', code: 'PEMIRA-DPMFT-2025' },
  { id: 'PEM-2025-03', name: 'HMIF Informatika 2025', shortName: 'HMIF 2025', code: 'PEMIRA-HMIF-2025' },
  { id: 'PEM-2025-04', name: 'HMM Manajemen 2025', shortName: 'HMM 2025', code: 'PEMIRA-HMM-2025' },
  { id: 'PEM-2024-09', name: 'BEM Fakultas Hukum 2024/2025', shortName: 'BEM FH 2024', code: 'PEMIRA-BEMFH-2024' },
  { id: 'PEM-2025-05', name: 'BEM Fakultas Ekonomika & Bisnis 2025', shortName: 'BEM FEB 2025', code: 'PEMIRA-BEMFEB-2025' }
]

function getElectionName(electionId: string): string {
  const found = electionsList.find(e => e.id === electionId)
  return found?.name || electionId
}

function getElectionCode(electionId: string): string {
  const found = electionsList.find(e => e.id === electionId)
  return found?.code || electionId
}

// ─── Filter & Search State ───────────────────────────────────────────
const selectedElectionId = ref('all')
const statusFilter = ref<'Semua' | 'Terverifikasi' | 'Menunggu' | 'Ditolak'>('Semua')
const searchQuery = ref('')
const sortAsc = ref(true)

// ─── Toast Feedback System ───────────────────────────────────────────
const toastMessage = ref('')
const showToast = ref(false)
let toastTimer: any = null
function triggerToast(msg: string) {
  toastMessage.value = msg
  showToast.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    showToast.value = false
  }, 3500)
}

function downloadArchive() {
  triggerToast('Rekap berkas KPU (ZIP) sedang disiapkan. Seluruh dokumen visi-misi dan syarat sah diarsipkan.')
}

function toggleSort() {
  sortAsc.value = !sortAsc.value
  triggerToast(`Nomor urut calon diurutkan secara ${sortAsc.value ? 'Menaik (01 → 05)' : 'Menurun (05 → 01)'}.`)
}

// ─── Dynamic Statistics ──────────────────────────────────────────────
const stats = computed(() => getCandidateStats(selectedElectionId.value))

// ─── Candidates by Selected Election ─────────────────────────────────
const electionCandidates = computed(() => {
  if (selectedElectionId.value === 'all') {
    // Tampilkan seluruh master kandidat yang ada (terhidrasi atau standalone)
    return masterCandidatesDatabase.value.map(m => {
      const parts = getMasterCandidateParticipations(m.id)
      if (parts.length > 0) {
        const part = parts[0]
        return {
          ...m,
          id: part.id,
          participationId: part.id,
          candidateId: m.id,
          electionId: part.electionId,
          ballotNumber: part.ballotNumber,
          status: part.status,
          isInBallot: part.isInBallot,
          votesCount: parts.reduce((acc, p) => acc + p.votesCount, 0)
        }
      }
      return {
        ...m,
        id: m.id,
        participationId: '',
        candidateId: m.id,
        electionId: 'none',
        ballotNumber: '-',
        status: 'Terverifikasi KPU' as CandidateVerificationStatus,
        isInBallot: false,
        votesCount: 0
      }
    })
  }
  return getCandidatesByElection(selectedElectionId.value)
})

// Counts per status for filter tabs
const countSemua = computed(() => electionCandidates.value.length)
const countTerverifikasi = computed(() => electionCandidates.value.filter(c => c.status === 'Terverifikasi KPU').length)
const countMenunggu = computed(() => electionCandidates.value.filter(c => c.status === 'Menunggu Berkas' || c.status === 'Revisi Dukungan').length)
const countDitolak = computed(() => electionCandidates.value.filter(c => c.status === 'Ditolak').length)

// ─── Filtered & Sorted Candidates ────────────────────────────────────
const filteredCandidates = computed(() => {
  return electionCandidates.value.filter(c => {
    // 1. Status Filter
    let matchStatus = true
    if (statusFilter.value === 'Terverifikasi') {
      matchStatus = c.status === 'Terverifikasi KPU'
    } else if (statusFilter.value === 'Menunggu') {
      matchStatus = c.status === 'Menunggu Berkas' || c.status === 'Revisi Dukungan'
    } else if (statusFilter.value === 'Ditolak') {
      matchStatus = c.status === 'Ditolak'
    }

    // 2. Search Query (Nama, NIM, Nomor Urut, Koalisi)
    const q = searchQuery.value.trim().toLowerCase()
    let matchSearch = true
    if (q) {
      const matchName = c.name.toLowerCase().includes(q)
      const matchNumber = c.ballotNumber.toLowerCase().includes(q)
      const matchLeadName = c.leadCandidate.name.toLowerCase().includes(q)
      const matchLeadNim = c.leadCandidate.nim.toLowerCase().includes(q)
      const matchViceName = c.viceCandidate ? c.viceCandidate.name.toLowerCase().includes(q) : false
      const matchViceNim = c.viceCandidate ? c.viceCandidate.nim.toLowerCase().includes(q) : false
      const matchCoalition = (c.coalition || '').toLowerCase().includes(q)
      matchSearch = matchName || matchNumber || matchLeadName || matchLeadNim || matchViceName || matchViceNim || matchCoalition
    }

    return matchStatus && matchSearch
  }).sort((a, b) => {
    const cmp = a.ballotNumber.localeCompare(b.ballotNumber, undefined, { numeric: true })
    return sortAsc.value ? cmp : -cmp
  })
})

// Split for aesthetic representation: Pair (Paslon Cards) and Single (Legislatif/Table)
const pairCandidates = computed(() => filteredCandidates.value.filter(c => c.type === 'pair'))
const singleCandidates = computed(() => filteredCandidates.value.filter(c => c.type === 'single'))

// ─── Quick Actions & Verifikasi ──────────────────────────────────────
async function quickVerify(c: ElectionCandidate) {
  const res = await updateCandidate(c.id, {
    status: 'Terverifikasi KPU'
  })
  if (res.success) {
    triggerToast(`Kandidat "${c.name}" (#${c.ballotNumber}) berhasil diverifikasi dan disahkan masuk bilik suara digital.`)
  } else {
    triggerToast(res.message)
  }
}

// ─── Modals State (Create, Edit, Detail, Delete) ───────────────────────
const showCandidateModal = ref(false)
const candidateModalMode = ref<'create' | 'edit'>('create')
const editingCandidateId = ref<string | null>(null)
const editingMasterId = ref<string | null>(null)
const editingParticipationId = ref<string | null>(null)
const candidateFormError = ref('')
const isSavingCandidate = ref(false)
const isDeletingCandidate = ref(false)

interface CandidateFormState {
  electionId: string
  type: CandidateType
  ballotNumber: string
  name: string
  tagline: string
  coalition: string
  color: string
  photo: string
  status: CandidateVerificationStatus
  leadName: string
  leadNim: string
  leadFaculty: string
  leadMajor: string
  leadSemester: number
  leadGpa: number
  viceName: string
  viceNim: string
  viceFaculty: string
  viceMajor: string
  viceSemester: number
  viceGpa: number
  visi: string
  misiText: string
  pillarsText: string
}

const defaultCandidateForm = (): CandidateFormState => ({
  electionId: selectedElectionId.value === 'all' ? 'none' : selectedElectionId.value,
  type: 'pair',
  ballotNumber: '',
  name: '',
  tagline: '',
  coalition: '',
  color: '#582be8',
  photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  status: 'Menunggu Berkas',
  leadName: '',
  leadNim: '',
  leadFaculty: '',
  leadMajor: '',
  leadSemester: 6,
  leadGpa: 3.5,
  viceName: '',
  viceNim: '',
  viceFaculty: '',
  viceMajor: '',
  viceSemester: 6,
  viceGpa: 3.5,
  visi: '',
  misiText: '',
  pillarsText: ''
})

const candidateForm = ref<CandidateFormState>(defaultCandidateForm())

function onElectionChange() {
  if (candidateForm.value.electionId === 'none') {
    candidateForm.value.ballotNumber = ''
  } else if (!candidateForm.value.ballotNumber || candidateForm.value.ballotNumber === '-') {
    const listInTarget = getCandidatesByElection(candidateForm.value.electionId)
    const existingNums = listInTarget.map(c => parseInt(c.ballotNumber, 10)).filter(n => !isNaN(n))
    const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1
    candidateForm.value.ballotNumber = String(nextNum).padStart(2, '0')
  }
}

function openCreateCandidateModal() {
  candidateModalMode.value = 'create'
  editingCandidateId.value = null
  editingMasterId.value = null
  editingParticipationId.value = null
  candidateFormError.value = ''

  const targetElection = selectedElectionId.value === 'all' ? 'none' : selectedElectionId.value
  let suggestedBallot = ''
  if (targetElection !== 'none') {
    const listInTarget = getCandidatesByElection(targetElection)
    const existingNums = listInTarget.map(c => parseInt(c.ballotNumber, 10)).filter(n => !isNaN(n))
    const nextNum = existingNums.length > 0 ? Math.max(...existingNums) + 1 : 1
    suggestedBallot = String(nextNum).padStart(2, '0')
  }

  candidateForm.value = {
    ...defaultCandidateForm(),
    electionId: targetElection,
    type: targetElection === 'PEM-2025-02' ? 'single' : 'pair',
    ballotNumber: suggestedBallot
  }
  showCandidateModal.value = true
}

function openEditCandidateModal(c: ElectionCandidate) {
  candidateModalMode.value = 'edit'
  editingCandidateId.value = c.id
  editingMasterId.value = c.candidateId || c.id
  editingParticipationId.value = c.participationId || (c.id.startsWith('cand-') ? c.id : null)
  candidateFormError.value = ''

  candidateForm.value = {
    electionId: c.electionId,
    type: c.type,
    ballotNumber: c.electionId !== 'none' && c.ballotNumber !== '-' ? c.ballotNumber : '',
    name: c.name,
    tagline: c.tagline || '',
    coalition: c.coalition || '',
    color: c.color || '#582be8',
    photo: c.photo || '',
    status: c.status,
    leadName: c.leadCandidate.name,
    leadNim: c.leadCandidate.nim,
    leadFaculty: c.leadCandidate.faculty,
    leadMajor: c.leadCandidate.major,
    leadSemester: c.leadCandidate.semester || 6,
    leadGpa: c.leadCandidate.gpa || 3.5,
    viceName: c.viceCandidate?.name || '',
    viceNim: c.viceCandidate?.nim || '',
    viceFaculty: c.viceCandidate?.faculty || '',
    viceMajor: c.viceCandidate?.major || '',
    viceSemester: c.viceCandidate?.semester || 6,
    viceGpa: c.viceCandidate?.gpa || 3.5,
    visi: c.visi || '',
    misiText: (c.misi || []).join('\n'),
    pillarsText: (c.pillars || []).join('\n')
  }
  showCandidateModal.value = true
}

async function saveCandidateForm() {
  candidateFormError.value = ''
  const f = candidateForm.value

  if (!f.name.trim()) {
    candidateFormError.value = 'Nama paslon atau kandidat wajib diisi.'
    return
  }
  if (!f.leadName.trim() || !f.leadNim.trim()) {
    candidateFormError.value = 'Nama dan NIM calon utama/ketua wajib diisi.'
    return
  }
  if (f.type === 'pair') {
    if (!f.viceName.trim() || !f.viceNim.trim()) {
      candidateFormError.value = 'Untuk pasangan calon, nama dan NIM wakil ketua wajib diisi.'
      return
    }
  }

  // Jika calon terikat pada agenda pemilihan, nomor urut wajib diisi dan unik
  let cleanBallot = ''
  if (f.electionId !== 'none') {
    if (!f.ballotNumber.trim()) {
      candidateFormError.value = 'Nomor urut resmi wajib diisi jika calon diikutsertakan pada agenda pemilihan.'
      return
    }
    cleanBallot = f.ballotNumber.trim().padStart(2, '0')
    const excludePartId = editingParticipationId.value || undefined
    if (!isBallotNumberAvailable(f.electionId, cleanBallot, excludePartId)) {
      candidateFormError.value = `Nomor urut #${cleanBallot} sudah digunakan oleh calon lain pada pemilihan ini. Pilih nomor urut lain.`
      return
    }
  }

  const misi = f.misiText.split('\n').map(s => s.trim()).filter(Boolean)
  const pillars = f.pillarsText.split('\n').map(s => s.trim()).filter(Boolean)

  isSavingCandidate.value = true
  try {
    if (candidateModalMode.value === 'create') {
      // Mode 1: Simpan sebagai Master Data Saja ke Firestore (Standby tanpa election)
      if (f.electionId === 'none' || !f.electionId) {
        const res = await addMasterCandidate({
          type: f.type,
          name: f.name.trim(),
          tagline: f.tagline.trim(),
          coalition: f.coalition.trim() || (f.type === 'pair' ? 'Koalisi Paslon' : 'Independen'),
          color: f.color || '#582be8',
          photo: f.photo.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          leadCandidate: {
            name: f.leadName.trim(),
            nim: f.leadNim.trim(),
            faculty: f.leadFaculty.trim() || 'Fakultas Teknik',
            major: f.leadMajor.trim() || 'Teknik Informatika',
            semester: Number(f.leadSemester) || 6,
            gpa: Number(f.leadGpa) || 3.5
          },
          viceCandidate: f.type === 'pair' ? {
            name: f.viceName.trim(),
            nim: f.viceNim.trim(),
            faculty: f.viceFaculty.trim() || 'Fakultas Teknik',
            major: f.viceMajor.trim() || 'Teknik Informatika',
            semester: Number(f.viceSemester) || 6,
            gpa: Number(f.viceGpa) || 3.5
          } : undefined,
          visi: f.visi.trim() || 'Mewujudkan kepemimpinan mahasiswa yang berintegritas dan berdampak.',
          misi: misi.length > 0 ? misi : ['Digitalisasi layanan administrasi kemahasiswaan.'],
          pillars: pillars.length > 0 ? pillars : ['Tata Kelola Organisasi Transparan', 'Advokasi Mahasiswa'],
          documents: [
            { name: 'KRS & Transkrip IPK (≥ 3.25)', status: f.leadGpa >= 3.25 ? 'valid' : 'pending' },
            { name: 'Surat Bebas Sanksi Akademik & SKCK', status: 'valid' },
            { name: 'Bukti Dukungan Mahasiswa Sah', status: 'valid' }
          ]
        })

        if (!res.success) {
          candidateFormError.value = res.message
          return
        }

        triggerToast(res.message)
        showCandidateModal.value = false
        return
      }

      // Mode 2: Simpan Master ke Firestore + Daftarkan langsung ke Agenda Pemilihan
      const res = await addCandidate({
        electionId: f.electionId,
        type: f.type,
        ballotNumber: cleanBallot,
        name: f.name.trim(),
        tagline: f.tagline.trim(),
        coalition: f.coalition.trim() || (f.type === 'pair' ? 'Koalisi Paslon' : 'Independen'),
        color: f.color || '#582be8',
        photo: f.photo.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        status: f.status,
        leadCandidate: {
          name: f.leadName.trim(),
          nim: f.leadNim.trim(),
          faculty: f.leadFaculty.trim() || 'Fakultas Teknik',
          major: f.leadMajor.trim() || 'Teknik Informatika',
          semester: Number(f.leadSemester) || 6,
          gpa: Number(f.leadGpa) || 3.5
        },
        viceCandidate: f.type === 'pair' ? {
          name: f.viceName.trim(),
          nim: f.viceNim.trim(),
          faculty: f.viceFaculty.trim() || 'Fakultas Teknik',
          major: f.viceMajor.trim() || 'Teknik Informatika',
          semester: Number(f.viceSemester) || 6,
          gpa: Number(f.viceGpa) || 3.5
        } : undefined,
        visi: f.visi.trim() || 'Mewujudkan kepemimpinan mahasiswa yang berintegritas dan berdampak.',
        misi: misi.length > 0 ? misi : ['Digitalisasi layanan administrasi kemahasiswaan.'],
        pillars: pillars.length > 0 ? pillars : ['Tata Kelola Organisasi Transparan', 'Advokasi Mahasiswa'],
        documents: [
          { name: 'KRS & Transkrip IPK (≥ 3.25)', status: f.leadGpa >= 3.25 ? 'valid' : 'pending' },
          { name: 'Surat Bebas Sanksi Akademik & SKCK', status: f.status === 'Terverifikasi KPU' ? 'valid' : 'pending' },
          { name: 'Bukti Dukungan Mahasiswa Sah', status: f.status === 'Terverifikasi KPU' ? 'valid' : 'pending' }
        ],
        votesCount: 0
      })

      if (!res.success) {
        candidateFormError.value = res.message
        return
      }

      triggerToast(res.message)
      showCandidateModal.value = false
    } else if (candidateModalMode.value === 'edit' && editingMasterId.value) {
      // 1. Update profil master candidate di Cloud Firestore
      const masterRes = await updateMasterCandidate(editingMasterId.value, {
        type: f.type,
        name: f.name.trim(),
        tagline: f.tagline.trim(),
        coalition: f.coalition.trim(),
        color: f.color || '#582be8',
        photo: f.photo.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        leadCandidate: {
          name: f.leadName.trim(),
          nim: f.leadNim.trim(),
          faculty: f.leadFaculty.trim(),
          major: f.leadMajor.trim(),
          semester: Number(f.leadSemester) || 6,
          gpa: Number(f.leadGpa) || 3.5
        },
        viceCandidate: f.type === 'pair' ? {
          name: f.viceName.trim(),
          nim: f.viceNim.trim(),
          faculty: f.viceFaculty.trim(),
          major: f.viceMajor.trim(),
          semester: Number(f.viceSemester) || 6,
          gpa: Number(f.viceGpa) || 3.5
        } : undefined,
        visi: f.visi.trim(),
        misi,
        pillars
      })

      if (!masterRes.success) {
        candidateFormError.value = masterRes.message
        // Sinkronkan ulang data master dari Firestore agar UI tetap konsisten dengan server
        await fetchMasterCandidates()
        return
      }

      // 2. Update keikutsertaan / nomor urut jika terikat pemilihan
      if (f.electionId !== 'none') {
        if (editingParticipationId.value) {
          const partRes = updateCandidateParticipation(editingParticipationId.value, {
            ballotNumber: cleanBallot,
            status: f.status
          })
          if (!partRes.success) {
            candidateFormError.value = partRes.message
            return
          }
        } else {
          // Sebelumnya master standby, sekarang didaftarkan ke pemilihan
          const newPart: ElectionCandidateParticipation = {
            id: `cand-${f.electionId.toLowerCase()}-${Date.now().toString().slice(-4)}`,
            electionId: f.electionId,
            candidateId: editingMasterId.value,
            ballotNumber: cleanBallot,
            status: f.status,
            isInBallot: f.status === 'Terverifikasi KPU',
            votesCount: 0,
            createdAt: new Date().toISOString()
          }
          electionCandidateParticipationsDatabase.value.push(newPart)
        }
        triggerToast(`Profil master kandidat "${f.name}" berhasil diperbarui di Firestore dan nomor paslon aktif pada sesi ini.`)
      } else {
        triggerToast(`Data profil master kandidat "${f.name}" berhasil diperbarui di Firestore.`)
      }

      showCandidateModal.value = false
    }
  } finally {
    isSavingCandidate.value = false
  }
}

// Detail Modal
const showDetailCandidateModal = ref(false)
const selectedDetailCandidate = ref<ElectionCandidate | null>(null)
function openDetailCandidate(c: ElectionCandidate) {
  selectedDetailCandidate.value = c
  showDetailCandidateModal.value = true
}

// Delete Modal with business rule protection
const showDeleteCandidateModal = ref(false)
const candidateToDelete = ref<ElectionCandidate | null>(null)
const deleteValidation = ref<{ allowed: boolean; reason?: string }>({ allowed: true })

function promptDeleteCandidate(c: ElectionCandidate) {
  candidateToDelete.value = c
  const masterId = c.candidateId || c.id
  deleteValidation.value = canDeleteMasterCandidate(masterId)
  showDeleteCandidateModal.value = true
}

async function confirmDeleteCandidate() {
  if (!candidateToDelete.value) return
  isDeletingCandidate.value = true
  try {
    const masterId = candidateToDelete.value.candidateId || candidateToDelete.value.id
    const res = await deleteMasterCandidate(masterId)
    if (res.success) {
      triggerToast(res.message)
    } else {
      triggerToast(`Gagal: ${res.message}`)
    }
  } finally {
    isDeletingCandidate.value = false
    showDeleteCandidateModal.value = false
    candidateToDelete.value = null
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-8 antialiased">
    <!-- Page Heading -->
    <section class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div class="mb-2 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-slate-400">
          <span>A-Vote</span>
          <span>/</span>
          <span>{{ selectedElectionId === 'all' ? 'Seluruh Pemilihan' : getElectionName(selectedElectionId) }}</span>
          <span>/</span>
          <span class="font-semibold text-[#582be8]">Kandidat &amp; Paslon</span>
        </div>

        <h1 class="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Kandidat &amp; Paslon</h1>
        <p class="mt-1 max-w-3xl text-xs sm:text-sm text-slate-500 leading-relaxed">
          Pusat pengelolaan dan verifikasi berkas seluruh pasangan calon dan kandidat independen kampus. Sinkron otomatis dengan bilik suara digital per pemilihan.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 shrink-0">
        <button
          type="button"
          @click="downloadArchive"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px] text-[#582be8]">folder_zip</span>
          Unduh Rekap Berkas
        </button>
        <button
          type="button"
          @click="openCreateCandidateModal"
          class="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">add</span>
          Tambah Paslon / Kandidat
        </button>
      </div>
    </section>

    <!-- Error State Alert (Firestore Read Error) -->
    <div
      v-if="masterCandidatesError"
      class="flex items-start justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm"
    >
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-red-600 mt-0.5 text-[22px]">error</span>
        <div>
          <h4 class="font-bold text-xs sm:text-sm text-red-900">Kendala Sinkronisasi Cloud Firestore</h4>
          <p class="mt-1 text-xs text-red-700 leading-relaxed">{{ masterCandidatesError }}</p>
        </div>
      </div>
      <button
        type="button"
        @click="fetchMasterCandidates(true)"
        class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-sm transition cursor-pointer shrink-0"
      >
        <span class="material-symbols-outlined text-[16px]">refresh</span>
        Coba Lagi
      </button>
    </div>

    <!-- Loading State Skeleton -->
    <section v-if="masterCandidatesLoading && masterCandidatesDatabase.length === 0" class="rounded-2xl border border-slate-200 bg-white p-12 text-center space-y-4 shadow-sm">
      <div class="inline-flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-purple-200 border-t-[#582be8]"></div>
      <div>
        <h3 class="text-sm font-bold text-slate-800">Menghubungkan ke Cloud Firestore...</h3>
        <p class="mt-1 text-xs text-slate-500">Memuat data master kandidat dari koleksi master_candidates.</p>
      </div>
    </section>

    <!-- Statistics Strip (Dynamic based on selected election) -->
    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-purple-200 hover:shadow transition">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Total Paslon / Kandidat</p>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#582be8]">
            <span class="material-symbols-outlined text-[24px]">groups</span>
          </div>
        </div>
        <p class="mt-4 text-3xl font-extrabold text-[#582be8]">
          {{ stats.total }} <span class="text-xs font-normal text-slate-500">Terdaftar</span>
        </p>
        <p class="mt-2 text-xs text-slate-400">
          {{ selectedElectionId === 'all' ? 'Dari seluruh agenda pemilihan aktif/mendatang' : getElectionName(selectedElectionId) }}
        </p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200 hover:shadow transition">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Berkas Terverifikasi</p>
          <span class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
            {{ stats.verifiedPct }}% Memenuhi
          </span>
        </div>
        <p class="mt-4 text-3xl font-extrabold text-emerald-600">
          {{ stats.verified }} <span class="text-xs font-normal text-emerald-700">Lolos KPU</span>
        </p>
        <p class="mt-2 text-xs text-slate-400">Dinyatakan sah masuk bilik e-voting</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-amber-200 hover:shadow transition">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Menunggu Verifikasi</p>
          <span class="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800">
            {{ stats.pending }} Berkas
          </span>
        </div>
        <p class="mt-4 text-3xl font-extrabold text-amber-600">
          {{ stats.pending }} <span class="text-xs font-normal text-amber-700">Calon</span>
        </p>
        <p class="mt-2 text-xs text-slate-400">Perlu pemeriksaan berkas LPJ dan visi</p>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-purple-200 hover:shadow transition">
        <div class="flex items-center justify-between">
          <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">Penetapan Nomor Urut</p>
          <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-[#582be8]">
            <span class="material-symbols-outlined text-[24px]">verified</span>
          </div>
        </div>
        <p class="mt-4 text-3xl font-extrabold text-[#582be8]">
          {{ stats.withNumber }} <span class="text-xs font-normal text-slate-500">Calon (100%)</span>
        </p>
        <p class="mt-2 text-xs text-slate-400">Nomor urut unik dalam pemilihan</p>
      </div>
    </section>

    <!-- Filters Section -->
    <section class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
        <!-- Dropdown Pemilihan Reaktif -->
        <select
          v-model="selectedElectionId"
          class="min-h-10 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-[#582be8] cursor-pointer shadow-sm"
        >
          <option v-for="e in electionsList" :key="e.id" :value="e.id">
            {{ e.name }} ({{ getCandidateStats(e.id).total }} Calon)
          </option>
        </select>

        <!-- Filter Status Verifikasi -->
        <div class="flex gap-1.5 overflow-x-auto">
          <button
            type="button"
            @click="statusFilter = 'Semua'"
            :class="[
              'whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer',
              statusFilter === 'Semua'
                ? 'bg-[#582be8] text-white shadow-sm shadow-purple-600/25'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            ]"
          >
            Semua ({{ countSemua }})
          </button>
          <button
            type="button"
            @click="statusFilter = 'Terverifikasi'"
            :class="[
              'whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer',
              statusFilter === 'Terverifikasi'
                ? 'bg-[#582be8] text-white shadow-sm shadow-purple-600/25'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            ]"
          >
            Terverifikasi ({{ countTerverifikasi }})
          </button>
          <button
            type="button"
            @click="statusFilter = 'Menunggu'"
            :class="[
              'whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer',
              statusFilter === 'Menunggu'
                ? 'bg-[#582be8] text-white shadow-sm shadow-purple-600/25'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            ]"
          >
            Menunggu ({{ countMenunggu }})
          </button>
          <button
            type="button"
            @click="statusFilter = 'Ditolak'"
            :class="[
              'whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition cursor-pointer',
              statusFilter === 'Ditolak'
                ? 'bg-[#582be8] text-white shadow-sm shadow-purple-600/25'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            ]"
          >
            Ditolak ({{ countDitolak }})
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div class="relative min-w-0 flex-1 sm:w-72">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama paslon, NIM, nomor urut..."
            class="w-full min-h-10 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#582be8] focus:bg-white"
          />
        </div>
        <button
          type="button"
          @click="toggleSort"
          class="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition cursor-pointer"
          :title="sortAsc ? 'Urutkan Nomor Terbesar' : 'Urutkan Nomor Terkecil'"
        >
          <span class="material-symbols-outlined text-[18px]">swap_vert</span>
          Atur Nomor Urut ({{ sortAsc ? '01→05' : '05→01' }})
        </button>
      </div>
    </section>

    <!-- SECTION 1: Pasangan Calon (Eksekutif) Grid Cards -->
    <section v-if="pairCandidates.length > 0">
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div class="flex flex-wrap items-center gap-3">
          <h2 class="text-lg font-bold text-slate-900">
            {{ selectedElectionId === 'all' ? 'Daftar Pasangan Calon Tetap' : 'Pasangan Calon Tetap ' + getElectionName(selectedElectionId) }}
          </h2>
          <span class="rounded-full bg-purple-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#582be8]">
            {{ pairCandidates.length }} Paslon Resmi
          </span>
        </div>
        <span class="font-mono text-[10px] text-slate-400">
          Bilik Suara #{{ getElectionCode(selectedElectionId) }}
        </span>
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <article
          v-for="c in pairCandidates"
          :key="c.id"
          class="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-purple-200 hover:shadow-md"
        >
          <div class="flex-1 space-y-5 p-5">
            <!-- Header: Nomor Urut & Status -->
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-2xl text-xl font-extrabold text-white shadow-sm"
                  :style="{ backgroundColor: c.color || '#582be8' }"
                >
                  {{ c.ballotNumber && c.ballotNumber !== '-' ? c.ballotNumber : '—' }}
                </div>
                <div>
                  <div class="flex items-center gap-1.5 flex-wrap">
                    <p class="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {{ c.electionId === 'none' ? 'Master Kandidat' : 'Nomor Urut · ' + c.electionId }}
                    </p>
                    <span
                      v-if="getCandidateParticipationsList(c.candidateId || c.id).length > 0"
                      class="px-1.5 py-0.2 rounded bg-purple-50 text-[#582be8] font-bold text-[9px]"
                      :title="getCandidateParticipationsList(c.candidateId || c.id).map(p => p.electionId + ' (#' + p.ballotNumber + ')').join(', ')"
                    >
                      {{ getCandidateParticipationsList(c.candidateId || c.id).length }} Agenda Diikuti
                    </span>
                    <span v-else class="px-1.5 py-0.2 rounded bg-slate-100 text-slate-500 font-semibold text-[9px]">
                      Master Standby
                    </span>
                  </div>
                  <span
                    :class="[
                      'mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                      c.status === 'Terverifikasi KPU' ? 'bg-emerald-100 text-emerald-800' :
                      c.status === 'Ditolak' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    ]"
                  >
                    <span
                      :class="[
                        'h-1.5 w-1.5 rounded-full',
                        c.status === 'Terverifikasi KPU' ? 'bg-emerald-500' :
                        c.status === 'Ditolak' ? 'bg-red-500' : 'bg-amber-500'
                      ]"
                    ></span>
                    {{ c.status }}
                  </span>
                </div>
              </div>

              <!-- Quick action more -->
              <button
                type="button"
                @click="promptDeleteCandidate(c)"
                class="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                title="Hapus kandidat"
              >
                <span class="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>

            <!-- Foto & Nama Paslon Hero -->
            <div class="relative h-48 overflow-hidden rounded-xl bg-purple-50 border border-slate-100">
              <img
                :src="c.photo"
                :alt="'Foto pasangan calon ' + c.name"
                class="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-white">
                <span
                  class="w-fit rounded px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm"
                  :style="{ backgroundColor: c.color ? `${c.color}dd` : 'rgba(88,43,232,0.9)' }"
                >
                  {{ c.coalition || 'Paslon Resmi' }}
                </span>
                <h3 class="mt-1.5 text-lg font-bold">{{ c.name }}</h3>
              </div>
            </div>

            <!-- Lead & Vice Candidate Meta -->
            <div class="space-y-2">
              <div class="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-[10px] font-bold uppercase text-[#582be8]">Calon Ketua</p>
                <p class="mt-1 text-sm font-bold text-slate-900">{{ c.leadCandidate.name }}</p>
                <p class="mt-1 text-xs text-slate-500">NIM {{ c.leadCandidate.nim }} • {{ c.leadCandidate.major }} ({{ c.leadCandidate.faculty }})</p>
              </div>

              <div v-if="c.viceCandidate" class="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
                <p class="text-[10px] font-bold uppercase text-[#582be8]">Calon Wakil Ketua</p>
                <p class="mt-1 text-sm font-bold text-slate-900">{{ c.viceCandidate.name }}</p>
                <p class="mt-1 text-xs text-slate-500">NIM {{ c.viceCandidate.nim }} • {{ c.viceCandidate.major }} ({{ c.viceCandidate.faculty }})</p>
              </div>
            </div>

            <!-- Tagline Slogan -->
            <div class="rounded-xl border border-purple-100/60 bg-purple-50/60 p-3 text-center text-xs font-semibold italic text-[#582be8]">
              {{ c.tagline || '“Sinergi Nyata, Berdampak Bersama”' }}
            </div>

            <!-- Pilar Program Kerja -->
            <div v-if="c.pillars && c.pillars.length > 0">
              <p class="mb-2 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">Pilar Program Kerja</p>
              <ul class="space-y-1.5 text-xs leading-5">
                <li v-for="(p, idx) in c.pillars.slice(0, 3)" :key="idx" class="flex gap-2">
                  <span class="material-symbols-outlined text-base text-[#582be8] shrink-0">check_circle</span>
                  <span class="line-clamp-1">{{ p }}</span>
                </li>
              </ul>
            </div>

            <!-- Persyaratan & Kelengkapan Berkas -->
            <div class="space-y-2 border-t border-slate-100 pt-3.5 text-xs">
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">IPK &amp; SKCK</span>
                <span class="font-semibold text-emerald-700">Lengkap (Valid)</span>
              </div>
              <div class="flex justify-between gap-2">
                <span class="text-slate-500">Status Bilik Suara</span>
                <span
                  :class="[
                    'font-semibold',
                    c.isInBallot ? 'text-emerald-700' : 'text-amber-700'
                  ]"
                >
                  {{ c.isInBallot ? '✓ Siap Masuk Bilik' : 'Menunggu Penetapan' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2 px-5 pb-5">
            <button
              type="button"
              @click="openDetailCandidate(c)"
              class="inline-flex items-center justify-center gap-1 flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition cursor-pointer"
            >
              <span class="material-symbols-outlined text-base">visibility</span>
              Lihat Detail
            </button>
            <button
              type="button"
              @click="openEditCandidateModal(c)"
              class="inline-flex items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition cursor-pointer"
            >
              <span class="material-symbols-outlined text-base">edit</span>
              Edit
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- SECTION 2: Kandidat Tunggal / Legislatif (DPM) Table -->
    <section v-if="singleCandidates.length > 0" class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-base sm:text-lg font-bold text-slate-900">
              {{ selectedElectionId === 'all' ? 'Daftar Calon Anggota Legislatif / Independen' : 'Daftar Calon Anggota ' + getElectionName(selectedElectionId) }}
            </h2>
            <span class="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
              {{ singleCandidates.length }} Kandidat
            </span>
          </div>
          <p class="mt-1 text-xs leading-5 text-slate-500">
            Perwakilan departemen &amp; fakultas dengan nomor urut unik lokal per pemilihan.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="openCreateCandidateModal"
            class="inline-flex items-center gap-1 rounded-xl bg-[#582be8] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#471ec7] shadow-sm shadow-purple-600/20 transition cursor-pointer"
          >
            <span class="material-symbols-outlined text-base">person_add</span>
            + Tambah Calon
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[850px] text-left text-xs">
          <thead>
            <tr class="bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <th class="rounded-l-xl px-4 py-3.5">No. Urut</th>
              <th class="px-4 py-3.5">Foto &amp; Nama Calon</th>
              <th class="px-4 py-3.5">NIM &amp; Program Studi</th>
              <th class="px-4 py-3.5">Semester / IPK</th>
              <th class="px-4 py-3.5">Kelengkapan Berkas</th>
              <th class="px-4 py-3.5">Status Bilik Suara</th>
              <th class="rounded-r-xl px-4 py-3.5 text-right">Aksi KPU</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100 text-xs sm:text-sm">
            <tr v-for="c in singleCandidates" :key="c.id" class="hover:bg-slate-50/70 transition">
              <td class="px-4 py-4 font-mono font-bold text-[#582be8]">
                {{ c.ballotNumber && c.ballotNumber !== '-' ? '#' + c.ballotNumber : '—' }}
              </td>

              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img
                    :src="c.photo"
                    :alt="c.name"
                    class="h-10 w-10 rounded-xl object-cover shrink-0 border border-slate-200"
                    loading="lazy"
                  />
                  <div>
                    <p class="font-semibold text-slate-900">{{ c.name }}</p>
                    <p class="mt-0.5 text-[10px] text-slate-500 font-mono">{{ c.coalition }} · {{ c.electionId }}</p>
                  </div>
                </div>
              </td>

              <td class="px-4 py-4">
                <p class="font-mono text-slate-900">{{ c.leadCandidate.nim }}</p>
                <p class="mt-0.5 text-xs text-slate-500">{{ c.leadCandidate.major }}</p>
              </td>

              <td class="px-4 py-4">
                <p>Sem. {{ c.leadCandidate.semester || 6 }}</p>
                <p class="mt-0.5 font-semibold text-emerald-700">IPK {{ (c.leadCandidate.gpa || 3.5).toFixed(2) }}</p>
              </td>

              <td class="px-4 py-4">
                <span
                  :class="[
                    'font-semibold',
                    c.status === 'Terverifikasi KPU' ? 'text-emerald-700' : 'text-amber-700'
                  ]"
                >
                  {{ c.status === 'Terverifikasi KPU' ? '✓ 100% Lengkap' : c.status }}
                </span>
              </td>

              <td class="px-4 py-4">
                <span
                  :class="[
                    'whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-semibold',
                    c.isInBallot ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  ]"
                >
                  {{ c.isInBallot ? 'Siap di Bilik' : 'Verifikasi Berkas' }}
                </span>
              </td>

              <td class="px-4 py-4 text-right">
                <div class="inline-flex items-center gap-1.5 justify-end">
                  <button
                    v-if="!c.isInBallot"
                    type="button"
                    @click="quickVerify(c)"
                    class="rounded-lg bg-[#582be8] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#471ec7] shadow-sm shadow-purple-600/20 transition cursor-pointer"
                  >
                    Verifikasi
                  </button>
                  <button
                    type="button"
                    @click="openDetailCandidate(c)"
                    class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition cursor-pointer"
                  >
                    Detail
                  </button>
                  <button
                    type="button"
                    @click="openEditCandidateModal(c)"
                    class="rounded-lg border border-slate-200 bg-white p-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition cursor-pointer"
                    title="Edit"
                  >
                    <span class="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                  <button
                    type="button"
                    @click="promptDeleteCandidate(c)"
                    class="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
                    title="Hapus"
                  >
                    <span class="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Empty State: Ketika filter tidak mengembalikan kandidat -->
    <section v-if="filteredCandidates.length === 0" class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-3">
      <div class="w-16 h-16 rounded-2xl bg-purple-50 text-[#582be8] flex items-center justify-center mx-auto">
        <span class="material-symbols-outlined text-[36px]">group_off</span>
      </div>
      <h3 class="text-base font-bold text-slate-800">Tidak Ada Kandidat yang Cocok</h3>
      <p class="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
        Tidak ditemukan pasangan calon atau kandidat yang sesuai dengan filter pemilihan <strong>{{ getElectionName(selectedElectionId) }}</strong> atau kata kunci pencarian "{{ searchQuery }}".
      </p>
      <div class="flex items-center justify-center gap-3 pt-2">
        <button
          type="button"
          @click="selectedElectionId = 'all'; statusFilter = 'Semua'; searchQuery = ''"
          class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
        >
          Reset Semua Filter
        </button>
        <button
          type="button"
          @click="openCreateCandidateModal"
          class="px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md transition cursor-pointer"
        >
          + Daftarkan Calon Baru
        </button>
      </div>
    </section>

    <!-- SOP Section -->
    <section class="flex flex-col gap-5 rounded-2xl border border-purple-100/70 bg-purple-50/50 p-6 md:flex-row shadow-sm">
      <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-[#582be8]">
        <span class="material-symbols-outlined text-[28px]">gavel</span>
      </div>

      <div class="flex-1">
        <h2 class="text-base sm:text-lg font-bold text-slate-900">SOP Penetapan Kandidat &amp; Paslon Pemira</h2>

        <div class="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 class="mb-1.5 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
              <span class="material-symbols-outlined text-base text-[#582be8]">rule</span>
              Standar Kelayakan KPU Mahasiswa
            </h3>
            <p class="text-xs leading-5 text-slate-500">
              Syarat minimal IPK ≥ 3.25, tidak sedang dalam sanksi akademik atau tindak pidana, telah menempuh minimal 80 SKS aktif, serta menyertakan minimal 150 tanda tangan bukti dukungan mahasiswa resmi (NIM dan KTM sah).
            </p>
          </div>

          <div>
            <h3 class="mb-1.5 flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900">
              <span class="material-symbols-outlined text-base text-[#582be8]">how_to_vote</span>
              Regulasi Bilik Suara Digital
            </h3>
            <p class="text-xs leading-5 text-slate-500">
              Paslon yang berstatus <strong class="text-emerald-700">Terverifikasi KPU</strong> diteruskan ke bilik suara digital pemilih. Perubahan berkas atau nama setelah penetapan membutuhkan persetujuan sidang pleno.
            </p>
          </div>
        </div>
      </div>
    </section>

    <footer class="flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-[10px] text-slate-400 sm:flex-row">
      <p>A-Vote Campus System · Admin Panel</p>
      <p>Pemilu Mahasiswa 2025</p>
    </footer>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: FORM TAMBAH / EDIT KANDIDAT
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showCandidateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showCandidateModal = false"></div>

          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-purple-50 text-[#582be8] flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px]">{{ candidateModalMode === 'create' ? 'person_add' : 'edit' }}</span>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-slate-900">
                    {{ candidateModalMode === 'create' ? 'Tambah Paslon / Kandidat Baru' : 'Edit Data Paslon / Kandidat' }}
                  </h3>
                  <p class="text-[11px] text-slate-500">Agenda: {{ getElectionName(candidateForm.electionId) }}</p>
                </div>
              </div>
              <button
                type="button"
                @click="showCandidateModal = false"
                class="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
              >
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form @submit.prevent="saveCandidateForm" class="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              <div v-if="candidateFormError" class="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2">
                <span class="material-symbols-outlined text-[18px] shrink-0 text-red-600 mt-0.5">error</span>
                <span class="font-medium leading-relaxed">{{ candidateFormError }}</span>
              </div>

              <!-- Pilihan Agenda Pemilihan -->
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Agenda Pemilihan Terkait</label>
                <select
                  v-model="candidateForm.electionId"
                  @change="onElectionChange"
                  :disabled="candidateModalMode === 'edit' && candidateForm.electionId !== 'none'"
                  class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium outline-none focus:border-[#582be8]"
                >
                  <option value="none">Simpan sebagai Master Data Saja (Tanpa terikat Pemilihan)</option>
                  <option v-for="e in electionsList.filter(x => x.id !== 'all')" :key="e.id" :value="e.id">
                    {{ e.name }} ({{ e.id }})
                  </option>
                </select>
                <p class="text-[10px] text-slate-400 mt-1">
                  Kandidat master dapat dipilih dan diikutsertakan ke agenda pemilihan kapan saja melalui detail pemilihan.
                </p>
              </div>

              <!-- Tipe Pencalonan: Pasangan vs Tunggal -->
              <div>
                <label class="block font-semibold text-slate-700 mb-1.5">Tipe Pencalonan</label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    @click="candidateForm.type = 'pair'"
                    :class="[
                      'p-3 rounded-xl border flex items-center gap-3 transition text-left cursor-pointer',
                      candidateForm.type === 'pair' ? 'border-[#582be8] bg-purple-50 text-[#582be8]' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    ]"
                  >
                    <span class="material-symbols-outlined text-[22px]">groups</span>
                    <div>
                      <p class="font-bold">Pasangan Calon</p>
                      <p class="text-[10px] text-slate-500">Ketua &amp; Wakil Ketua (Eksekutif)</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    @click="candidateForm.type = 'single'"
                    :class="[
                      'p-3 rounded-xl border flex items-center gap-3 transition text-left cursor-pointer',
                      candidateForm.type === 'single' ? 'border-[#582be8] bg-purple-50 text-[#582be8]' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    ]"
                  >
                    <span class="material-symbols-outlined text-[22px]">person</span>
                    <div>
                      <p class="font-bold">Kandidat Tunggal</p>
                      <p class="text-[10px] text-slate-500">Anggota Legislatif / Independen</p>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Nomor Urut & Nama Paslon -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">
                    Nomor Urut Resmi <span v-if="candidateForm.electionId !== 'none'" class="text-red-500">*</span>
                  </label>
                  <div v-if="candidateForm.electionId === 'none'">
                    <input
                      type="text"
                      value="— Ditetapkan Saat Ikut Agenda Pemilihan —"
                      disabled
                      class="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 font-medium text-center text-xs cursor-not-allowed select-none"
                    />
                    <p class="text-[10px] text-slate-400 mt-1">Nomor urut dikelola per agenda pemilihan.</p>
                  </div>
                  <div v-else>
                    <input
                      v-model="candidateForm.ballotNumber"
                      type="text"
                      placeholder="01"
                      maxlength="3"
                      class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] font-mono font-bold text-center outline-none"
                      required
                    />
                    <p class="text-[10px] text-slate-400 mt-1">Unik di pemilihan ini</p>
                  </div>
                </div>

                <div class="sm:col-span-2">
                  <label class="block font-semibold text-slate-700 mb-1">
                    Nama Tampilan Calon <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="candidateForm.name"
                    type="text"
                    placeholder="Farhan & Nabila atau Aldi Firmansyah"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none"
                    required
                  />
                </div>
              </div>

              <!-- Tagline & Koalisi -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Slogan / Tagline</label>
                  <input
                    v-model="candidateForm.tagline"
                    type="text"
                    placeholder="“Sinergi Nyata, Berdampak Bersama”"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none"
                  />
                </div>

                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Partai / Koalisi / Departemen</label>
                  <input
                    v-model="candidateForm.coalition"
                    type="text"
                    placeholder="Departemen TI / Koalisi Mahasiswa"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none"
                  />
                </div>
              </div>

              <!-- Status Verifikasi KPU -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Status Verifikasi KPU</label>
                  <select
                    v-model="candidateForm.status"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none bg-white font-medium"
                  >
                    <option value="Terverifikasi KPU">Terverifikasi KPU (Sah Masuk Bilik)</option>
                    <option value="Menunggu Berkas">Menunggu Berkas (Pemeriksaan SKCK/LPJ)</option>
                    <option value="Revisi Dukungan">Revisi Dukungan (Kurang KTM)</option>
                    <option value="Ditolak">Ditolak (Tidak Memenuhi Syarat)</option>
                  </select>
                </div>

                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Warna Representasi Calon</label>
                  <div class="flex items-center gap-2">
                    <input
                      v-model="candidateForm.color"
                      type="color"
                      class="h-9 w-12 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                    />
                    <input
                      v-model="candidateForm.color"
                      type="text"
                      class="flex-1 px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Data Calon Utama -->
              <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 class="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-[#582be8]">
                  <span class="material-symbols-outlined text-[16px]">badge</span>
                  {{ candidateForm.type === 'pair' ? 'Data Calon Ketua' : 'Data Calon Utama' }}
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Nama Lengkap <span class="text-red-500">*</span></label>
                    <input
                      v-model="candidateForm.leadName"
                      type="text"
                      placeholder="Nama lengkap mahasiswa"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:border-[#582be8] outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">NIM Mahasiswa <span class="text-red-500">*</span></label>
                    <input
                      v-model="candidateForm.leadNim"
                      type="text"
                      placeholder="Contoh: 2108101012"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono focus:border-[#582be8] outline-none"
                      required
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Fakultas</label>
                    <input
                      v-model="candidateForm.leadFaculty"
                      type="text"
                      placeholder="Fakultas Teknik"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Program Studi</label>
                    <input
                      v-model="candidateForm.leadMajor"
                      type="text"
                      placeholder="S1 Teknik Informatika"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">IPK Kumulatif</label>
                    <input
                      v-model="candidateForm.leadGpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.00"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Data Calon Wakil (Pair only) -->
              <div v-if="candidateForm.type === 'pair'" class="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 class="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-[#582be8]">
                  <span class="material-symbols-outlined text-[16px]">how_to_reg</span>
                  Data Calon Wakil Ketua
                </h4>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Nama Lengkap Wakil <span class="text-red-500">*</span></label>
                    <input
                      v-model="candidateForm.viceName"
                      type="text"
                      placeholder="Nama lengkap wakil"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:border-[#582be8] outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">NIM Mahasiswa <span class="text-red-500">*</span></label>
                    <input
                      v-model="candidateForm.viceNim"
                      type="text"
                      placeholder="Contoh: 2102102045"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono focus:border-[#582be8] outline-none"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Fakultas</label>
                    <input
                      v-model="candidateForm.viceFaculty"
                      type="text"
                      placeholder="Fakultas Ekonomika & Bisnis"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">Program Studi</label>
                    <input
                      v-model="candidateForm.viceMajor"
                      type="text"
                      placeholder="S1 Akuntansi"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white outline-none"
                    />
                  </div>
                  <div>
                    <label class="block font-medium text-slate-600 mb-1">IPK Kumulatif</label>
                    <input
                      v-model="candidateForm.viceGpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="4.00"
                      class="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              <!-- Visi, Misi, Pilar -->
              <div>
                <label class="block font-semibold text-slate-700 mb-1">Visi Calon</label>
                <textarea
                  v-model="candidateForm.visi"
                  rows="2"
                  placeholder="Visi utama paslon..."
                  class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Misi Calon (1 per baris)</label>
                  <textarea
                    v-model="candidateForm.misiText"
                    rows="3"
                    placeholder="Misi 1&#10;Misi 2&#10;Misi 3"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none"
                  ></textarea>
                </div>

                <div>
                  <label class="block font-semibold text-slate-700 mb-1">Pilar Program Kerja (1 per baris)</label>
                  <textarea
                    v-model="candidateForm.pillarsText"
                    rows="3"
                    placeholder="Digitalisasi Ormawa Kampus&#10;Layanan Advokasi 24/7&#10;Pemerataan Dana Riset"
                    class="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-[#582be8] outline-none"
                  ></textarea>
                </div>
              </div>
            </form>

            <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
              <button
                type="button"
                @click="showCandidateModal = false"
                :disabled="isSavingCandidate"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition cursor-pointer disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                @click="saveCandidateForm"
                :disabled="isSavingCandidate"
                class="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md shadow-purple-600/25 transition cursor-pointer disabled:opacity-50"
              >
                <span v-if="isSavingCandidate" class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                <span>{{ isSavingCandidate ? 'Menyimpan...' : (candidateModalMode === 'create' ? 'Simpan Data Kandidat' : 'Perbarui Kandidat') }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: DETAIL PROFIL & BERKAS
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showDetailCandidateModal && selectedDetailCandidate" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showDetailCandidateModal = false"></div>

          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div
              class="p-6 text-white relative overflow-hidden"
              :style="{ backgroundColor: selectedDetailCandidate.color || '#582be8' }"
            >
              <div class="flex items-start justify-between relative z-10">
                <div class="flex items-center gap-3">
                  <span class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md text-white text-2xl font-black flex items-center justify-center border border-white/30">
                    {{ selectedDetailCandidate.ballotNumber }}
                  </span>
                  <div>
                    <span class="text-[10px] font-mono uppercase tracking-wider text-white/80 font-bold">
                      {{ selectedDetailCandidate.type === 'pair' ? 'Pasangan Calon' : 'Kandidat Independen' }} · {{ selectedDetailCandidate.electionId }}
                    </span>
                    <h3 class="text-xl font-extrabold text-white">{{ selectedDetailCandidate.name }}</h3>
                    <p class="text-xs text-white/90 italic mt-0.5">{{ selectedDetailCandidate.tagline }}</p>
                  </div>
                </div>

                <button
                  type="button"
                  @click="showDetailCandidateModal = false"
                  class="w-8 h-8 rounded-lg bg-black/20 text-white hover:bg-black/40 flex items-center justify-center transition"
                >
                  <span class="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div class="mt-4 flex flex-wrap items-center gap-2 relative z-10">
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white text-slate-900 shadow-sm">
                  {{ selectedDetailCandidate.status }}
                </span>
                <span
                  :class="[
                    'px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1',
                    selectedDetailCandidate.isInBallot ? 'bg-emerald-400 text-emerald-950' : 'bg-amber-300 text-amber-950'
                  ]"
                >
                  <span class="material-symbols-outlined text-[13px]">{{ selectedDetailCandidate.isInBallot ? 'how_to_vote' : 'hourglass_empty' }}</span>
                  {{ selectedDetailCandidate.isInBallot ? 'Sah di Bilik Suara' : 'Menunggu Penetapan' }}
                </span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/20 text-white">
                  {{ selectedDetailCandidate.coalition }}
                </span>
              </div>
            </div>

            <div class="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <span class="font-mono text-[10px] text-[#582be8] font-bold uppercase">
                    {{ selectedDetailCandidate.type === 'pair' ? 'Calon Ketua' : 'Kandidat Utama' }}
                  </span>
                  <p class="text-sm font-bold text-slate-900">{{ selectedDetailCandidate.leadCandidate.name }}</p>
                  <p class="text-slate-600 font-mono">NIM: {{ selectedDetailCandidate.leadCandidate.nim }}</p>
                  <p class="text-slate-500">{{ selectedDetailCandidate.leadCandidate.major }} · {{ selectedDetailCandidate.leadCandidate.faculty }}</p>
                </div>

                <div v-if="selectedDetailCandidate.type === 'pair' && selectedDetailCandidate.viceCandidate" class="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <span class="font-mono text-[10px] text-[#582be8] font-bold uppercase">Calon Wakil Ketua</span>
                  <p class="text-sm font-bold text-slate-900">{{ selectedDetailCandidate.viceCandidate.name }}</p>
                  <p class="text-slate-600 font-mono">NIM: {{ selectedDetailCandidate.viceCandidate.nim }}</p>
                  <p class="text-slate-500">{{ selectedDetailCandidate.viceCandidate.major }} · {{ selectedDetailCandidate.viceCandidate.faculty }}</p>
                </div>
              </div>

              <div>
                <h4 class="font-bold text-slate-900 mb-1 text-xs">Visi:</h4>
                <p class="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {{ selectedDetailCandidate.visi || 'Belum ada visi tercatat.' }}
                </p>
              </div>

              <div v-if="selectedDetailCandidate.misi && selectedDetailCandidate.misi.length > 0">
                <h4 class="font-bold text-slate-900 mb-1 text-xs">Misi Calon:</h4>
                <ul class="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <li v-for="(m, idx) in selectedDetailCandidate.misi" :key="idx" class="flex items-start gap-2 text-slate-600">
                    <span class="font-mono font-bold text-[#582be8] text-[11px]">{{ idx + 1 }}.</span>
                    <span>{{ m }}</span>
                  </li>
                </ul>
              </div>

              <div v-if="selectedDetailCandidate.pillars && selectedDetailCandidate.pillars.length > 0">
                <h4 class="font-bold text-slate-900 mb-1.5 text-xs">Pilar Program Kerja:</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div
                    v-for="(p, idx) in selectedDetailCandidate.pillars"
                    :key="idx"
                    class="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2"
                  >
                    <span class="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                    <span class="font-medium text-slate-800">{{ p }}</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Perolehan Suara: <strong class="text-slate-700 font-mono">{{ selectedDetailCandidate.votesCount.toLocaleString() }} Suara</strong></span>
                <span>ID: {{ selectedDetailCandidate.id }}</span>
              </div>
            </div>

            <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                type="button"
                @click="showDetailCandidateModal = false"
                class="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition cursor-pointer"
              >
                Tutup
              </button>

              <button
                type="button"
                @click="showDetailCandidateModal = false; openEditCandidateModal(selectedDetailCandidate)"
                class="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#582be8] hover:bg-[#471ec7] rounded-xl shadow-md transition cursor-pointer"
              >
                <span class="material-symbols-outlined text-[16px]">edit</span>
                <span>Edit Calon Ini</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         MODAL: KONFIRMASI HAPUS
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="showDeleteCandidateModal && candidateToDelete" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="showDeleteCandidateModal = false"></div>

          <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">
            <div class="p-6 text-center">
              <div
                :class="[
                  'w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4',
                  deleteValidation.allowed ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                ]"
              >
                <span class="material-symbols-outlined text-[30px]">{{ deleteValidation.allowed ? 'delete_forever' : 'block' }}</span>
              </div>

              <h3 class="text-base font-bold text-slate-900">
                {{ deleteValidation.allowed ? 'Hapus Data Kandidat?' : 'Penghapusan Ditolak Sistem' }}
              </h3>

              <div v-if="!deleteValidation.allowed" class="mt-3 space-y-3 text-left">
                <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs leading-relaxed flex items-start gap-2.5">
                  <span class="material-symbols-outlined text-red-600 text-[20px] shrink-0 mt-0.5">gavel</span>
                  <div>
                    <strong class="block mb-1 font-bold">Aturan Bisnis KPU:</strong>
                    {{ deleteValidation.reason }}
                  </div>
                </div>
              </div>

              <div v-else class="mt-2 text-xs text-slate-500 leading-relaxed">
                <p>
                  Apakah Anda yakin ingin menghapus data master calon <strong class="text-slate-900">{{ candidateToDelete.name }}</strong> dari Cloud Firestore?
                </p>
                <p class="mt-2 text-[11px] text-red-600 font-medium">
                  Tindakan ini permanen. Dokumen master kandidat akan dihapus dari sistem Cloud Firestore.
                </p>
              </div>
            </div>

            <div class="px-6 pb-6 flex items-center gap-3">
              <button
                type="button"
                @click="showDeleteCandidateModal = false"
                :disabled="isDeletingCandidate"
                class="flex-1 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer disabled:opacity-50"
              >
                {{ deleteValidation.allowed ? 'Batal' : 'Tutup' }}
              </button>

              <button
                v-if="deleteValidation.allowed"
                type="button"
                @click="confirmDeleteCandidate"
                :disabled="isDeletingCandidate"
                class="inline-flex items-center justify-center gap-2 flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/25 transition cursor-pointer disabled:opacity-50"
              >
                <span v-if="isDeletingCandidate" class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                <span>{{ isDeletingCandidate ? 'Menghapus...' : 'Ya, Hapus Kandidat' }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════════════════════════════════════════
         TOAST NOTIFICATION POPUP
    ═══════════════════════════════════════════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="showToast"
          class="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 text-xs"
        >
          <span class="material-symbols-outlined text-emerald-400 text-[20px] shrink-0">check_circle</span>
          <span class="flex-1 leading-snug">{{ toastMessage }}</span>
          <button @click="showToast = false" class="text-slate-400 hover:text-white shrink-0">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-active .relative,
.modal-fade-leave-active .relative {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .relative,
.modal-fade-leave-to .relative {
  transform: scale(0.96) translateY(8px);
  opacity: 0;
}
</style>