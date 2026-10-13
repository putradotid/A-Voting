<template>
  <div class="min-h-screen bg-[#f8f9fc] text-slate-800 antialiased">
    <AdminHeader />
    <div class="flex min-h-[calc(100vh-65px)]">
      <AdminSidebar />
      <main class="min-w-0 flex-1 overflow-y-auto p-5 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
