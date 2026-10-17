export interface ElectionDptEntry {
  id: string
  electionId: string
  studentId: string
  nim: string
  hasVoted: boolean
  votedAt?: string
  tokenSent: boolean
  assignedAt: string
}

export interface ElectionVoterDetail {
  dptId: string
  electionId: string
  studentId: string
  nim: string
  name: string
  initials: string
  avatarColor: string
  email: string
  faculty: string
  facultyCode: string
  major: string
  academicYear: string
  semester: number
  academicStatus: string
  accountStatus: string
  hasVoted: boolean
  votedAt?: string
  tokenSent: boolean
  assignedAt: string
}

export const useElectionDpt = () => {
  const masterStudents = useStudentsMaster()

  const dptDatabase = useState<ElectionDptEntry[]>('electionDptDatabase', () => [
    // ── PEM-2025-01 (Pemilihan Raya BEM KM) ──
    {
      id: 'DPT-PEM-2025-01-MHS-001',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-001',
      nim: '2208101012',
      hasVoted: true,
      votedAt: '26 Feb 2025, 09:42 WIB',
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-01-MHS-002',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-002',
      nim: '2305202045',
      hasVoted: false,
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-01-MHS-003',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-003',
      nim: '2101303088',
      hasVoted: true,
      votedAt: '26 Feb 2025, 08:15 WIB',
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-01-MHS-005',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-005',
      nim: '2208101099',
      hasVoted: true,
      votedAt: '26 Feb 2025, 11:02 WIB',
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-01-MHS-006',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-006',
      nim: '2301103022',
      hasVoted: false,
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-01-MHS-007',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-007',
      nim: '2403105018',
      hasVoted: true,
      votedAt: '26 Feb 2025, 10:30 WIB',
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-01-MHS-009',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-009',
      nim: '2108101001',
      hasVoted: true,
      votedAt: '26 Feb 2025, 08:42 WIB',
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-01-MHS-010',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-010',
      nim: '2102102008',
      hasVoted: false,
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-01-MHS-011',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-011',
      nim: '2101103014',
      hasVoted: true,
      votedAt: '26 Feb 2025, 10:20 WIB',
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-01-MHS-012',
      electionId: 'PEM-2025-01',
      studentId: 'MHS-012',
      nim: '2205106019',
      hasVoted: true,
      votedAt: '26 Feb 2025, 11:34 WIB',
      tokenSent: true,
      assignedAt: '20 Feb 2025'
    },

    // ── PEM-2025-02 (DPM Fakultas Teknik) ──
    {
      id: 'DPT-PEM-2025-02-MHS-001',
      electionId: 'PEM-2025-02',
      studentId: 'MHS-001',
      nim: '2208101012',
      hasVoted: false, // Belum memilih di DPM FT
      tokenSent: true,
      assignedAt: '22 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-02-MHS-003',
      electionId: 'PEM-2025-02',
      studentId: 'MHS-003',
      nim: '2101303088',
      hasVoted: true,
      votedAt: '27 Feb 2025, 09:10 WIB',
      tokenSent: true,
      assignedAt: '22 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-02-MHS-009',
      electionId: 'PEM-2025-02',
      studentId: 'MHS-009',
      nim: '2108101001',
      hasVoted: false,
      tokenSent: true,
      assignedAt: '22 Feb 2025'
    },

    // ── PEM-2025-03 (HMIF Informatika) ──
    {
      id: 'DPT-PEM-2025-03-MHS-001',
      electionId: 'PEM-2025-03',
      studentId: 'MHS-001',
      nim: '2208101012',
      hasVoted: false,
      tokenSent: false,
      assignedAt: '25 Feb 2025'
    },
    {
      id: 'DPT-PEM-2025-03-MHS-009',
      electionId: 'PEM-2025-03',
      studentId: 'MHS-009',
      nim: '2108101001',
      hasVoted: false,
      tokenSent: false,
      assignedAt: '25 Feb 2025'
    }
  ])

  // Get raw DPT entries for an election
  const getDptEntries = (electionId: string) => {
    return dptDatabase.value.filter(entry => entry.electionId === electionId)
  }

  // Get full voter detail combined with student master info
  const getVotersByElection = (electionId: string): ElectionVoterDetail[] => {
    const entries = getDptEntries(electionId)
    const result: ElectionVoterDetail[] = []

    for (const entry of entries) {
      const student = masterStudents.value.find(s => s.id === entry.studentId || s.nim === entry.nim)
      if (student) {
        result.push({
          dptId: entry.id,
          electionId: entry.electionId,
          studentId: student.id,
          nim: student.nim,
          name: student.name,
          initials: student.initials,
          avatarColor: student.avatarColor,
          email: student.email,
          faculty: student.faculty,
          facultyCode: student.facultyCode,
          major: student.major,
          academicYear: student.academicYear,
          semester: student.semester,
          academicStatus: student.academicStatus,
          accountStatus: student.accountStatus,
          hasVoted: entry.hasVoted,
          votedAt: entry.votedAt,
          tokenSent: entry.tokenSent,
          assignedAt: entry.assignedAt
        })
      }
    }

    return result
  }

  // Check if a student is already registered in this election
  const isStudentInElectionDpt = (electionId: string, studentId: string): boolean => {
    return dptDatabase.value.some(entry => entry.electionId === electionId && entry.studentId === studentId)
  }

  // Assign multiple students to an election DPT
  const assignStudentsToElection = (electionId: string, studentIds: string[]): { added: number; skipped: number } => {
    let added = 0
    let skipped = 0

    const todayStr = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    for (const sId of studentIds) {
      if (isStudentInElectionDpt(electionId, sId)) {
        skipped++
        continue
      }

      const student = masterStudents.value.find(s => s.id === sId)
      if (!student) {
        skipped++
        continue
      }

      dptDatabase.value.push({
        id: `DPT-${electionId}-${student.id}`,
        electionId,
        studentId: student.id,
        nim: student.nim,
        hasVoted: false,
        tokenSent: true,
        assignedAt: todayStr
      })
      added++
    }

    return { added, skipped }
  }

  // Remove a student from an election DPT (only allowed if has not voted)
  const removeStudentFromElection = (electionId: string, studentId: string): { success: boolean; message: string } => {
    const index = dptDatabase.value.findIndex(entry => entry.electionId === electionId && entry.studentId === studentId)
    if (index === -1) {
      return { success: false, message: 'Data penetapan DPT tidak ditemukan.' }
    }

    const entry = dptDatabase.value[index]
    if (entry.hasVoted) {
      return {
        success: false,
        message: 'Hak suara telah digunakan di bilik digital. Surat suara telah tercatat dan tidak dapat dicabut.'
      }
    }

    dptDatabase.value.splice(index, 1)
    return { success: true, message: 'Hak suara mahasiswa berhasil dicabut dari pemilihan ini.' }
  }

  return {
    dptDatabase,
    getDptEntries,
    getVotersByElection,
    isStudentInElectionDpt,
    assignStudentsToElection,
    removeStudentFromElection
  }
}
