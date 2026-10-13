<template>
  <!-- =====================================================
       HEADER
  ====================================================== -->
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-purple-100/60 shadow-sm"
  >
    <div
      class="h-20 max-w-[1216px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4"
    >
      <!-- Brand -->
      <div class="flex items-center gap-6">
        <NuxtLink
          to="/voter"
          class="flex items-center gap-2"
        >
          <div
            class="w-10 h-10 rounded-xl bg-[#582be8] flex items-center justify-center text-white shadow-md shadow-purple-600/20"
          >
            <span class="text-xl">🗳️</span>
          </div>

          <div class="flex flex-col">
            <span
              class="text-lg font-bold tracking-tight text-[#582be8] leading-none"
            >
              A-VOTE
            </span>

            <span
              class="text-[9px] font-mono text-slate-400 uppercase tracking-wider mt-1"
            >
              Sovereign Trust
            </span>
          </div>
        </NuxtLink>

        <!-- Election Status -->
        <div
          class="hidden lg:flex items-center gap-2 pl-5 border-l border-slate-200"
        >
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-[10px] font-mono"
          >
            <span
              class="w-2 h-2 rounded-full bg-[#582be8] animate-pulse"
            ></span>

            Pemilihan Raya BEM 2025
          </div>

          <div
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#582be8] text-[10px] font-mono"
          >
            <span>🔒</span>

            Enkripsi End-to-End Aktif
          </div>
        </div>
      </div>

      <!-- User -->
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex flex-col text-right leading-tight">
          <span class="text-sm font-semibold text-slate-800">
            Ahmad Fauzi
          </span>

          <span class="text-[10px] font-mono text-slate-400">
            Mhs. Aktif / NIK: 3271****48
          </span>
        </div>

        <div
          class="w-8 h-8 rounded-full bg-[#582be8] flex items-center justify-center text-white ring-2 ring-purple-100"
        >
          👤
        </div>

        <NuxtLink
          to="/voter/login"
          class="inline-flex items-center justify-center p-2 rounded-lg text-red-600 hover:bg-red-100 hover:text-red-900 transition-all"
          title="Keluar / Selesai"
        >
          <!-- Ikon Logout bawaan Google Material (tanpa perlu install font) -->
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </header>
</template>
