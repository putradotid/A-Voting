<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits<{
  (e: 'verified'): void
  (e: 'failed', reason?: string): void
}>()

// --- State Management ---
const videoRef = ref<HTMLVideoElement | null>(null)
const isLoading = ref(true)
const statusMessage = ref('Memuat model biometrik...')
const currentEAR = ref<number | null>(null)
const timeLeft = ref(45)

// State siklus kedipan
const eyesOpenedFirst = ref(false)
const eyesClosed = ref(false)
const isFinished = ref(false)

// Threshold Eye Aspect Ratio (EAR)
const EAR_THRESHOLD_CLOSED = 0.25
const EAR_THRESHOLD_OPEN = 0.28

let stream: MediaStream | null = null
let animationFrameId: number | null = null
let countdownTimer: ReturnType<typeof setInterval> | null = null
let faceapi: any = null

// Rumus Euclidean Distance antar titik landmark koordinat
const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }): number => {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}

// Rumus Eye Aspect Ratio (EAR): (||p2 - p6|| + ||p3 - p5||) / (2 * ||p1 - p4||)
const calculateEAR = (eye: { x: number; y: number }[]): number => {
  if (!eye || eye.length < 6) return 0
  const v1 = getDistance(eye[1], eye[5])
  const v2 = getDistance(eye[2], eye[4])
  const h = getDistance(eye[0], eye[3])
  if (h === 0) return 0
  return (v1 + v2) / (2.0 * h)
}

// Mulai timer hitung mundur 45 detik
const startTimeoutCountdown = () => {
  countdownTimer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      handleFailed('Batas waktu verifikasi habis (45 detik).')
    }
  }, 1000)
}

// Inisialisasi face-api.js dan webcam
const initialize = async () => {
  try {
    statusMessage.value = 'Memuat model AI...'
    // Dynamic import face-api.js agar tidak menyebabkan SSR crash di Nuxt
    faceapi = await import('face-api.js')

    const MODEL_URL = '/models'
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
    ])

    statusMessage.value = 'Menghubungkan webcam...'
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user',
        width: { ideal: 640 },
        height: { ideal: 480 }
      },
      audio: false
    })

    if (videoRef.value) {
      videoRef.value.srcObject = stream
      videoRef.value.onloadedmetadata = () => {
        videoRef.value?.play()
        isLoading.value = false
        statusMessage.value = 'Posisikan wajah Anda dan tatap kamera'
        startTimeoutCountdown()
        startDetectionLoop()
      }
    }
  } catch (err: any) {
    handleFailed('Gagal mengakses kamera atau memuat model biometrik.')
  }
}

// Loop deteksi frame video real-time
const startDetectionLoop = () => {
  const detect = async () => {
    if (isFinished.value || !videoRef.value) return

    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 320,
      scoreThreshold: 0.5
    })

    try {
      const detection = await faceapi
        .detectSingleFace(videoRef.value, options)
        .withFaceLandmarks()

      if (detection) {
        const landmarks = detection.landmarks
        const leftEye = landmarks.getLeftEye()
        const rightEye = landmarks.getRightEye()

        const leftEAR = calculateEAR(leftEye)
        const rightEAR = calculateEAR(rightEye)
        const avgEAR = (leftEAR + rightEAR) / 2.0
        currentEAR.value = Number(avgEAR.toFixed(2))

        // 1. Pastikan pengguna membuka mata normal terlebih dahulu
        if (!eyesOpenedFirst.value && avgEAR >= EAR_THRESHOLD_OPEN) {
          eyesOpenedFirst.value = true
          statusMessage.value = 'Wajah terdeteksi. Silakan kedipkan mata Anda.'
        }

        // 2. Deteksi mata tertutup (EAR < 0.25)
        if (eyesOpenedFirst.value && !eyesClosed.value && avgEAR < EAR_THRESHOLD_CLOSED) {
          eyesClosed.value = true
          statusMessage.value = 'Kedipan terdeteksi, buka mata kembali...'
        }

        // 3. Deteksi mata kembali terbuka (Siklus kedipan sempurna: Buka -> Tutup -> Buka)
        if (eyesOpenedFirst.value && eyesClosed.value && avgEAR >= EAR_THRESHOLD_OPEN) {
          handleSuccess()
          return
        }
      } else {
        currentEAR.value = null
        if (!eyesOpenedFirst.value) {
          statusMessage.value = 'Arahkan wajah ke dalam lingkaran kamera'
        }
      }
    } catch (e) {
      // Abaikan frame error transien
    }

    if (!isFinished.value) {
      animationFrameId = requestAnimationFrame(detect)
    }
  }

  detect()
}

// Tangani keberhasilan liveness
const handleSuccess = () => {
  if (isFinished.value) return
  isFinished.value = true
  statusMessage.value = 'Verifikasi Berhasil! Kedipan Dikonfirmasi.'
  cleanup()
  setTimeout(() => {
    emit('verified')
  }, 600)
}

// Tangani kegagalan / pembatalan
const handleFailed = (reason: string) => {
  if (isFinished.value) return
  isFinished.value = true
  cleanup()
  emit('failed', reason)
}

// Hentikan kamera dan timer
const cleanup = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
    stream = null
  }
}

onMounted(() => {
  if (import.meta.client) {
    initialize()
  }
})

onBeforeUnmount(() => {
  cleanup()
})
</script>

<template>
  <div class="w-full max-w-md mx-auto p-5 sm:p-6 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center">
    <!-- Header & Timer -->
    <div class="w-full flex items-center justify-between mb-4">
      <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold">
        <span class="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
        Deteksi Kehadiran Fisik
      </div>
      <div class="text-xs font-mono font-bold" :class="timeLeft <= 10 ? 'text-rose-600 animate-pulse' : 'text-slate-500'">
        ⏱️ {{ timeLeft }}s
      </div>
    </div>

    <!-- Viewport Kamera & Panduan Wajah -->
    <div class="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-purple-600 bg-slate-950 shadow-inner flex items-center justify-center">
      <video
        ref="videoRef"
        playsinline
        autoplay
        muted
        class="w-full h-full object-cover transform -scale-x-100"
      ></video>

      <!-- Frame Oval Panduan -->
      <div class="absolute inset-4 border-2 border-dashed border-white/50 rounded-full pointer-events-none transition-all duration-300"
           :class="{ 'border-emerald-400': eyesClosed }"></div>

      <!-- Loading State -->
      <div v-if="isLoading" class="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center text-center p-4">
        <div class="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p class="text-xs text-purple-200 font-medium">{{ statusMessage }}</p>
      </div>

      <!-- Success State -->
      <div v-if="isFinished && statusMessage.includes('Berhasil')" class="absolute inset-0 bg-emerald-600/95 flex flex-col items-center justify-center text-white">
        <div class="w-14 h-14 bg-white text-emerald-600 rounded-full flex items-center justify-center text-3xl font-black mb-2 shadow-lg">
          ✓
        </div>
        <span class="text-sm font-bold">Terverifikasi!</span>
      </div>
    </div>

    <!-- Instruksi Status & EAR -->
    <div class="w-full text-center mt-5">
      <p class="text-sm font-semibold text-slate-800 transition-colors">
        {{ statusMessage }}
      </p>
      <div v-if="currentEAR !== null" class="text-[11px] font-mono text-slate-400 mt-1">
        Rasio Kedipan (EAR): <span :class="currentEAR < EAR_THRESHOLD_CLOSED ? 'text-purple-600 font-bold' : 'text-slate-600'">{{ currentEAR }}</span>
      </div>
    </div>

    <!-- Tombol Batalkan -->
    <div class="w-full mt-6">
      <button
        type="button"
        @click="handleFailed('Dibatalkan oleh pengguna')"
        class="w-full py-2.5 px-4 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-xl transition duration-200"
      >
        Batalkan &amp; Kembali
      </button>
    </div>
  </div>
</template>

