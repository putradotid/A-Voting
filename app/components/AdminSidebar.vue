<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const isRouteActive = (path: string) => {
  if (path === '/admin/dashboard') {
    return route.path === '/admin/dashboard'
  }
  if (path === '/admin/voter-list') {
    return route.path === '/admin/voter-list' || route.path === '/admin/voters'
  }
  return route.path.startsWith(path)
}
</script>

<template>
  <!-- ===================================================
       SIDEBAR
  ==================================================== -->
  <aside
    class="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 hidden md:flex"
  >
    <nav
      aria-label="Menu Admin"
      class="p-4 space-y-1.5"
    >
      <div
        class="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2"
      >
        Main Menu
      </div>

      <!-- Dashboard -->
      <NuxtLink
        to="/admin/dashboard"
        :class="[
          'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition',
          isRouteActive('/admin/dashboard')
            ? 'font-semibold bg-purple-50 text-[#582be8] border border-purple-100 shadow-sm'
            : 'font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        ]"
      >
        <svg
          :class="['w-5 h-5', isRouteActive('/admin/dashboard') ? 'text-[#582be8]' : 'text-slate-400']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>

        <span>Dashboard</span>
      </NuxtLink>

      <!-- Elections -->
      <NuxtLink
        to="/admin/elections"
        :class="[
          'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition',
          isRouteActive('/admin/elections')
            ? 'font-semibold bg-purple-50 text-[#582be8] border border-purple-100 shadow-sm'
            : 'font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        ]"
      >
        <div class="flex items-center gap-3">
          <svg
            :class="['w-5 h-5', isRouteActive('/admin/elections') ? 'text-[#582be8]' : 'text-slate-400']"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>

          <span>Pemilihan</span>
        </div>

        <span
          class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800"
        >
          3 Aktif
        </span>
      </NuxtLink>

      <!-- Voters -->
      <NuxtLink
        to="/admin/voter-list"
        :class="[
          'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition',
          isRouteActive('/admin/voter-list')
            ? 'font-semibold bg-purple-50 text-[#582be8] border border-purple-100 shadow-sm'
            : 'font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        ]"
      >
        <div class="flex items-center gap-3">
          <svg
            :class="['w-5 h-5', isRouteActive('/admin/voter-list') ? 'text-[#582be8]' : 'text-slate-400']"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>

          <span>Daftar Pemilih</span>
        </div>

        <span class="text-[11px] font-medium text-slate-400">
          DPT
        </span>
      </NuxtLink>

      <!-- Candidates -->
      <NuxtLink
        to="/admin/candidates"
        :class="[
          'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition',
          isRouteActive('/admin/candidates')
            ? 'font-semibold bg-purple-50 text-[#582be8] border border-purple-100 shadow-sm'
            : 'font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        ]"
      >
        <svg
          :class="['w-5 h-5', isRouteActive('/admin/candidates') ? 'text-[#582be8]' : 'text-slate-400']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>

        <span>Kandidat &amp; Paslon</span>
      </NuxtLink>

      <!-- Audit -->
      <NuxtLink
        to="/admin/audit"
        :class="[
          'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition',
          isRouteActive('/admin/audit')
            ? 'font-semibold bg-purple-50 text-[#582be8] border border-purple-100 shadow-sm'
            : 'font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        ]"
      >
        <svg
          :class="['w-5 h-5', isRouteActive('/admin/audit') ? 'text-[#582be8]' : 'text-slate-400']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>

        <span>Audit &amp; Rekapitulasi</span>
      </NuxtLink>

      <!-- Configuration -->
      <div
        class="pt-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2"
      >
        Konfigurasi
      </div>

      <NuxtLink
        to="/admin/settings"
        :class="[
          'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm transition',
          isRouteActive('/admin/settings')
            ? 'font-semibold bg-purple-50 text-[#582be8] border border-purple-100 shadow-sm'
            : 'font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50'
        ]"
      >
        <svg
          :class="['w-5 h-5', isRouteActive('/admin/settings') ? 'text-[#582be8]' : 'text-slate-400']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 001.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <path
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>

        <span>Pengaturan Sistem</span>
      </NuxtLink>
    </nav>

    <!-- Sidebar Footer -->
    <div
      class="p-4 border-t border-slate-100 bg-slate-50/60"
    >
      <div
        class="p-3 bg-white rounded-xl border border-slate-200 shadow-sm"
      >
        <div
          class="flex items-center gap-2 text-xs font-semibold text-slate-700"
        >
          <span
            class="w-2 h-2 rounded-full bg-emerald-500"
          ></span>

          <span>
            256-Bit SSL Enkripsi
          </span>
        </div>

        <p class="text-[11px] text-slate-500 mt-1">
          Konsensus node terverifikasi.
        </p>

        <div
          class="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400"
        >
          <span>v2.4.0-Production</span>

          <span class="font-mono text-[#582be8]">
            ONLINE
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>
