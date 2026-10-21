<script setup lang="ts">
import { computed } from 'vue'

const { user, logout, loading } = useAdminAuth()

const handleLogout = async () => {
  if (loading.value) return
  await logout()
  await navigateTo('/admin/login')
}

const displayEmail = computed(() => user.value?.email || 'admin@kampus.ac.id')
const displayInitials = computed(() => {
  if (!user.value?.email) return 'AD'
  return user.value.email.slice(0, 2).toUpperCase()
})
</script>

<template>
  <!-- =====================================================
       TOP NAVIGATION
  ====================================================== -->
  <header
    class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm"
  >
    <div
      class="px-4 sm:px-6 py-3 flex items-center justify-between"
    >
      <!-- Brand -->
      <div class="flex items-center gap-4 lg:gap-6">
        <NuxtLink to="/admin/dashboard" class="flex items-center gap-2.5">
          <img
            src="/A-voting%20logo.png"
            alt="A-Vote Logo"
            class="w-9 h-9 object-contain shrink-0"
          />

          <div class="flex items-center gap-2">
            <span
              class="text-xl font-bold tracking-tight text-[#582be8]"
            >
              A-Vote
            </span>

            <span
              class="text-xs px-2 py-0.5 rounded-md font-semibold bg-purple-50 text-purple-700 border border-purple-200"
            >
              Admin
            </span>
          </div>
        </NuxtLink>

        <!-- Security Status -->
        <div
          class="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-medium"
        >
          <span
            class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
          ></span>

          <span>
            Sistem Enkripsi: Aktif &amp; Terlindungi (SHA-256)
          </span>
        </div>
      </div>

      <!-- Search -->
      <div class="hidden md:block w-72 lg:w-96">
        <div class="relative">
          <span
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
          </span>

          <input
            type="text"
            placeholder="Cari NIK, pemilih, atau ID pemilihan..."
            class="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#582be8] transition"
          />
        </div>
      </div>

      <!-- User -->
      <div class="flex items-center gap-3 sm:gap-4">
        <!-- Notification -->
        <button
          type="button"
          aria-label="Notifikasi"
          class="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>

          <span
            class="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"
          ></span>
        </button>

        <div class="h-6 w-px bg-slate-200"></div>

        <!-- Profile -->
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-semibold flex items-center justify-center text-xs border border-purple-200"
          >
            {{ displayInitials }}
          </div>

          <div class="hidden sm:block text-left leading-tight">
            <p class="text-xs font-semibold text-slate-800 truncate max-w-[150px]">
              {{ displayEmail }}
            </p>

            <p class="text-[11px] text-[#582be8] font-medium">
              Administrator
            </p>
          </div>

          <button
            type="button"
            @click="handleLogout"
            :disabled="loading"
            class="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition disabled:opacity-50"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

