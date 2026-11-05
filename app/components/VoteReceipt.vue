<script setup lang="ts">
import { computed, ref } from 'vue'
import QrcodeVue from 'qrcode.vue'

const props = defineProps<{
  hashString: string
}>()

const emit = defineEmits<{
  (e: 'finish'): void
}>()

// URL untuk verifikasi keaslian suara
const verificationUrl = computed(() => {
  return `https://avote.local/verify?hash=${props.hashString}`
})

// State salin hash
const isCopied = ref(false)
const copyHash = async () => {
  if (navigator?.clipboard) {
    await navigator.clipboard.writeText(props.hashString)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  }
}

// Fungsi cetak / simpan bukti sebagai PDF
const handleDownload = () => {
  if (import.meta.client) {
    window.print()
  }
}

// Selesai dan kembali
const handleFinish = () => {
  emit('finish')
}
</script>

<template>
  <div class="w-full max-w-md mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center print:shadow-none print:border-none">
    <!-- Icon Status Sukses -->
    <div class="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold mb-3 shadow-inner">
      ✓
    </div>

    <!-- Header & Ucapan -->
    <h2 class="text-xl font-bold text-slate-800 text-center">Bilik Suara Tersegel</h2>
    <p class="text-xs text-slate-500 text-center mt-1 max-w-xs leading-relaxed">
      Terima kasih, suara Anda telah masuk kotak suara enkripsi.
    </p>

    <!-- QR Code Container -->
    <div class="my-6 p-4 bg-purple-50/60 border-2 border-dashed border-purple-200 rounded-2xl flex flex-col items-center">
      <div class="bg-white p-3 rounded-xl shadow-xs">
        <QrcodeVue
          :value="verificationUrl"
          :size="180"
          level="H"
          render-as="svg"
        />
      </div>
      <span class="text-[10px] font-mono font-medium text-purple-700 mt-2.5">
        Scan untuk Verifikasi Resi Kriptografis
      </span>
    </div>

    <!-- Info String Hash Asli -->
    <div class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-3.5 mb-6">
      <div class="flex items-center justify-between mb-1.5">
        <span class="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          Kode Hash Kriptografi (SHA-256)
        </span>
        <button
          type="button"
          @click="copyHash"
          class="text-[10px] font-semibold text-purple-600 hover:text-purple-700 cursor-pointer"
        >
          {{ isCopied ? 'Tersalin! ✓' : 'Salin' }}
        </button>
      </div>
      <p class="font-mono text-[11px] text-slate-700 break-all select-all leading-snug">
        {{ hashString }}
      </p>
    </div>

    <!-- Tombol Aksi (Disembunyikan saat dicetak) -->
    <div class="w-full space-y-2.5 print:hidden">
      <button
        type="button"
        @click="handleDownload"
        class="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white text-xs font-semibold rounded-xl shadow-md shadow-purple-600/20 transition duration-150 flex items-center justify-center gap-2 cursor-pointer"
      >
        <span>📥</span>
        <span>Unduh Bukti (Cetak / Simpan PDF)</span>
      </button>

      <button
        type="button"
        @click="handleFinish"
        class="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:scale-[0.99] text-slate-700 text-xs font-semibold rounded-xl transition duration-150 cursor-pointer"
      >
        Selesai &amp; Keluar
      </button>
    </div>
  </div>
</template>

<style scoped>
@media print {
  body {
    background: white !important;
  }
}
</style>

