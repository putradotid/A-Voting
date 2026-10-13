<template>
  <!-- =====================================================
       FOOTER
  ====================================================== -->
  <footer
    class="w-full bg-white border-t border-purple-100/50 py-8 mt-12"
  >
    <div
      class="max-w-[1216px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-8 h-8 rounded-lg bg-[#582be8] flex items-center justify-center text-white"
        >
          ✓
        </div>

        <div class="flex flex-col">
          <span
            class="text-sm font-semibold text-slate-900"
          >
            A-Vote Platform Demokrasi Digital
          </span>

          <span
            class="text-[10px] font-mono text-slate-400"
          >
            Sistem Pemilihan Terbuka Terverifikasi Zero-Knowledge Proof
          </span>
        </div>
      </div>

      <div
        class="flex items-center gap-6"
      >
        <span
          class="hidden lg:block text-[10px] font-mono text-slate-400"
        >
          Hash Protokol: 0x8f2d...94ca
        </span>

        <div class="flex items-center gap-4">
          <NuxtLink
            to="/voter/audit"
            class="text-xs text-slate-500 hover:text-[#582be8] transition"
          >
            Protokol Audit
          </NuxtLink>

          <NuxtLink
            to="/voter/audit"
            class="text-xs text-slate-500 hover:text-[#582be8] transition"
          >
            Integritas Data
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
