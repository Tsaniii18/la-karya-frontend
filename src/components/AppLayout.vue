<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { currentUser, logout } from '../auth';

const route = useRoute();
const router = useRouter();
const isSidebarOpen = ref(false);
const isHrManager = computed(
  () =>
    currentUser.value?.role === 'MANAGER' &&
    currentUser.value.department === 'HR',
);
const userInitial = computed(() =>
  currentUser.value?.name.charAt(0).toUpperCase(),
);

watch(
  () => route.fullPath,
  () => {
    isSidebarOpen.value = false;
  },
);

async function handleLogout() {
  try {
    await logout();
  } finally {
    await router.push('/login');
  }
}
</script>

<template>
  <div class="min-h-screen bg-background text-text md:grid md:grid-cols-[260px_1fr]">
    <aside
      class="fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col bg-primary px-5 py-6 text-white shadow-2xl transition-transform duration-200 md:sticky md:top-0 md:h-screen md:w-auto md:!translate-x-0 md:px-6 md:py-8 md:shadow-none"
      :class="isSidebarOpen ? '!translate-x-0' : '!-translate-x-full'"
    >
      <div class="flex items-center justify-between">
        <RouterLink to="/profile" class="text-2xl font-semibold tracking-tight">
          La<span class="text-[#9FC3E3]">Karya</span>
        </RouterLink>

        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white md:hidden"
          aria-label="Tutup menu"
          @click="isSidebarOpen = false"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div class="mt-7 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <p class="text-xs font-medium uppercase tracking-[0.14em] text-white/50">
          Employee Portal
        </p>
        <p class="mt-1 text-sm text-white/80">Internal workspace</p>
      </div>

      <nav class="mt-8 flex flex-1 flex-col gap-2">
        <p class="mb-1 px-3 text-xs font-medium uppercase tracking-[0.12em] text-white/45">
          Menu
        </p>
        <RouterLink
          to="/profile"
          class="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/75 hover:bg-white/5 hover:text-white"
          active-class="bg-white/10 !text-white"
        >
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5.5 20c.6-4 2.7-6 6.5-6s5.9 2 6.5 6" />
            </svg>
          </span>
          Profile
        </RouterLink>
        <RouterLink
          v-if="isHrManager"
          to="/account-verification"
          class="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-white/75 hover:bg-white/5 hover:text-white"
          active-class="bg-white/10 !text-white"
        >
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
              <circle cx="9.5" cy="7" r="3.5" />
              <path d="m17 9 1.5 1.5L22 7" />
            </svg>
          </span>
          Account Verification
        </RouterLink>
      </nav>

      <div v-if="currentUser" class="border-t border-white/10 pt-5">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#9FC3E3] font-semibold text-primary">
            {{ userInitial }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">{{ currentUser.name }}</p>
            <p class="truncate text-xs text-white/55">
              {{ currentUser.role }} · {{ currentUser.department }}
            </p>
          </div>
        </div>
        <button
          type="button"
          class="mt-4 w-full rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white"
          @click="handleLogout"
        >
          Logout
        </button>
      </div>
    </aside>

    <button
      v-if="isSidebarOpen"
      type="button"
      class="fixed inset-0 z-30 bg-primary/45 md:hidden"
      aria-label="Tutup menu"
      @click="isSidebarOpen = false"
    />

    <div class="min-w-0">
      <header class="sticky top-0 z-20 flex h-16 items-center border-b border-border bg-surface/95 px-5 md:hidden">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-primary"
          aria-label="Buka menu"
          @click="isSidebarOpen = true"
        >
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <p class="ml-3 text-sm font-semibold text-primary">Employee Portal</p>
      </header>

      <main class="mx-auto w-full max-w-7xl p-5 sm:p-8 lg:p-10">
        <slot />
      </main>
    </div>
  </div>
</template>
