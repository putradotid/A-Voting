<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    defaultNim?: string
  }>(),
  {
    defaultNim: '2108101001'
  }
)

const nim = ref(props.defaultNim)
const loading = ref(false)
const message = ref<string | null>(null)
const isError = ref(false)

const handleResetVote = async () => {
  if (loading.value) return
  if (!nim.value.trim()) {
    message.value = 'NIM wajib diisi.'
    isError.value = true
    return
  }

  loading.value = true
  message.value = null
  isError.value = false

  try {
    const res = await $fetch<{
      success: boolean
      message: string
      data?: any
    }>('/api/dev/reset-vote', {
      method: 'POST',
      body: {
        nim: nim.value.trim()
      }
    })

    message.value = res.message || 'Status hak suara berhasil di-reset!'
    isError.value = false
  } catch (err: any) {
    message.value = err.data?.statusMessage || err.message || 'Gagal mereset status hak suara.'
    isError.value = true
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl shadow-sm max-w-sm">
    <!-- Header -->
    <div class="flex items-center gap-2 mb-3">
      <span class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-200 text-amber-900 tracking-wide uppercase font-mono">
        DEV TOOL
      </span>
      <span class="text-xs font-semibold text-amber-900">Reset Status Pemilih</span>
    </div>

    <!-- Input & Action Button -->
    <div class="space-y-2">
      <div>
        <label class="block text-[11px] font-medium text-amber-800 mb-1">
          NIM Target
        </label>
        <input
          v-model="nim"
          type="text"
          placeholder="Masukkan NIM..."
          class="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-slate-800"
          :disabled="loading"
        />
      </div>

      <button
        @click="handleResetVote"
        :disabled="loading"
        class="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow transition-all duration-150"
      >
        <svg
          v-if="loading"
          class="w-3.5 h-3.5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span v-else>🔄</span>
        <span>{{ loading ? 'Mereset data...' : 'Reset Hak Suara' }}</span>
      </button>
    </div>

    <!-- Feedback Notification -->
    <div
      v-if="message"
      class="mt-3 p-2.5 rounded-lg text-xs font-medium leading-relaxed transition-all"
      :class="isError ? 'bg-rose-100 text-rose-800 border border-rose-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'"
    >
      <div class="flex items-start gap-1.5">
        <span>{{ isError ? '❌' : '✅' }}</span>
        <span class="flex-1">{{ message }}</span>
      </div>
    </div>
  </div>
</template>

