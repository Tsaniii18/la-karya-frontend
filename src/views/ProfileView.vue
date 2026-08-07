<script setup lang="ts">
import { computed } from 'vue';
import { currentUser } from '../auth';
import AppLayout from '../components/AppLayout.vue';

const userInitial = computed(() =>
  currentUser.value?.name.charAt(0).toUpperCase(),
);
</script>

<template>
  <AppLayout>
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-medium text-primary-soft">Workspace / Profile</p>
        <h1 class="mt-1 text-2xl font-semibold text-primary">Profile Karyawan</h1>
        <p class="mt-2 text-sm text-text-muted">
          Informasi akun dan posisi Anda di LaKarya.
        </p>
      </div>
      <span
        v-if="currentUser"
        class="inline-flex w-fit items-center gap-2 rounded-full bg-[#E7F2EF] px-3 py-1.5 text-xs font-medium text-success"
      >
        <span class="h-2 w-2 rounded-full bg-success" />
        Akun {{ currentUser.accountStatus.toLowerCase() }}
      </span>
    </header>

    <template v-if="currentUser">
      <section class="relative mt-7 overflow-hidden rounded-xl bg-primary px-6 py-7 text-white sm:px-8 sm:py-8">
        <div class="absolute -right-12 -top-20 h-56 w-56 rounded-full border border-white/10" />
        <div class="absolute -right-2 -top-6 h-32 w-32 rounded-full border border-white/10" />
        <div class="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <div class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-3xl font-semibold">
            {{ userInitial }}
          </div>
          <div>
            <p class="text-sm text-white/60">Employee profile</p>
            <h2 class="mt-1 text-2xl font-semibold">{{ currentUser.name }}</h2>
            <div class="mt-3 flex flex-wrap gap-2">
              <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                {{ currentUser.role }}
              </span>
              <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                {{ currentUser.department }} Department
              </span>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section class="rounded-xl border border-border bg-surface p-6 sm:p-7">
          <div class="flex items-center justify-between border-b border-border pb-5">
            <div>
              <h2 class="text-lg font-semibold text-primary">Informasi Personal</h2>
              <p class="mt-1 text-sm text-text-muted">Detail identitas akun karyawan.</p>
            </div>
            <div class="hidden h-10 w-10 items-center justify-center rounded-lg bg-[#E9F0F7] text-primary-soft sm:flex">
              <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>

          <dl class="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <dt class="text-xs font-medium uppercase tracking-wide text-text-muted">Nama lengkap</dt>
              <dd class="mt-2 text-sm font-medium text-text">{{ currentUser.name }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium uppercase tracking-wide text-text-muted">Nomor pegawai</dt>
              <dd class="mt-2 text-sm font-medium text-text">{{ currentUser.employeeNumber }}</dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-xs font-medium uppercase tracking-wide text-text-muted">Email perusahaan</dt>
              <dd class="mt-2 break-all text-sm font-medium text-text">{{ currentUser.email }}</dd>
            </div>
          </dl>
        </section>

        <section class="rounded-xl border border-border bg-surface p-6 sm:p-7">
          <div class="border-b border-border pb-5">
            <h2 class="text-lg font-semibold text-primary">Informasi Organisasi</h2>
            <p class="mt-1 text-sm text-text-muted">Penempatan dan akses akun.</p>
          </div>

          <div class="mt-6 space-y-4">
            <div class="rounded-lg bg-background px-4 py-4">
              <p class="text-xs font-medium uppercase tracking-wide text-text-muted">Department</p>
              <p class="mt-2 text-sm font-semibold text-primary">{{ currentUser.department }}</p>
            </div>
            <div class="rounded-lg bg-background px-4 py-4">
              <p class="text-xs font-medium uppercase tracking-wide text-text-muted">Role</p>
              <p class="mt-2 text-sm font-semibold text-primary">{{ currentUser.role }}</p>
            </div>
            <div class="flex items-center gap-3 rounded-lg bg-[#E7F2EF] px-4 py-4">
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-success text-sm text-white">✓</span>
              <div>
                <p class="text-sm font-medium text-success">Akun terverifikasi</p>
                <p class="mt-0.5 text-xs text-success/75">Akses portal telah aktif.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </template>
  </AppLayout>
</template>
