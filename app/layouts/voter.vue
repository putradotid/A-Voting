<template>
  <div class="min-h-screen bg-[#f8f9ff] text-slate-900 flex flex-col justify-between">
    <VoterHeader />

    <main class="pt-20 flex-1">
      <div class="relative overflow-hidden">
        <!-- Ambient Background -->
        <div
          class="absolute -top-40 -right-40 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl pointer-events-none"
        ></div>

        <div
          class="absolute top-96 -left-32 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"
        ></div>

        <div
          class="relative max-w-[1216px] mx-auto px-4 lg:px-8 py-8 lg:py-12"
        >
          <slot />
        </div>
      </div>
    </main>

    <VoterFooter />
  </div>
</template>
