<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {
  approveAccount,
  getPendingAccounts,
  type PendingAccount,
} from '../auth';
import AppLayout from '../components/AppLayout.vue';

const accounts = ref<PendingAccount[]>([]);
const isLoading = ref(true);
const approvingId = ref<number | null>(null);
const error = ref('');
const pendingUsers = computed(
  () => accounts.value.filter((account) => account.role.name === 'USER').length,
);
const pendingManagers = computed(
  () =>
    accounts.value.filter((account) => account.role.name === 'MANAGER').length,
);

async function loadAccounts() {
  isLoading.value = true;
  error.value = '';

  try {
    accounts.value = await getPendingAccounts();
  } catch (caughtError) {
    error.value =
      caughtError instanceof Error
        ? caughtError.message
        : 'Data akun gagal dimuat';
  } finally {
    isLoading.value = false;
  }
}

async function approve(userId: number) {
  approvingId.value = userId;
  error.value = '';

  try {
    await approveAccount(userId);
    accounts.value = accounts.value.filter((account) => account.id !== userId);
  } catch (caughtError) {
    error.value =
      caughtError instanceof Error
        ? caughtError.message
        : 'Akun gagal disetujui';
  } finally {
    approvingId.value = null;
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));
}

onMounted(loadAccounts);
</script>

<template>
  <AppLayout>
    <header class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p class="text-sm font-medium text-primary-soft">HR Workspace / Accounts</p>
        <h1 class="mt-1 text-2xl font-semibold text-primary">Account Verification</h1>
        <p class="mt-2 text-sm text-text-muted">
          Tinjau data karyawan sebelum memberikan akses ke portal.
        </p>
      </div>
      <span class="inline-flex w-fit items-center gap-2 rounded-full bg-[#F8EFDF] px-3 py-1.5 text-xs font-medium text-[#9A6824]">
        <span class="h-2 w-2 rounded-full bg-[#C58A32]" />
        {{ accounts.length }} menunggu
      </span>
    </header>

    <section class="mt-7 grid gap-4 sm:grid-cols-3">
      <article class="rounded-xl border border-border bg-surface p-5">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-text-muted">Total Pending</p>
            <p class="mt-2 text-3xl font-semibold text-primary">
              {{ isLoading ? '—' : accounts.length }}
            </p>
          </div>
          <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F8EFDF] text-[#9A6824]">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
        </div>
        <p class="mt-3 text-xs text-text-muted">Akun yang perlu ditinjau</p>
      </article>

      <article class="rounded-xl border border-border bg-surface p-5">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-text-muted">Employee</p>
            <p class="mt-2 text-3xl font-semibold text-primary">
              {{ isLoading ? '—' : pendingUsers }}
            </p>
          </div>
          <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9F0F7] text-primary-soft">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5.5 20c.6-4 2.7-6 6.5-6s5.9 2 6.5 6" />
            </svg>
          </span>
        </div>
        <p class="mt-3 text-xs text-text-muted">Pendaftaran role USER</p>
      </article>

      <article class="rounded-xl border border-border bg-surface p-5">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-text-muted">Manager</p>
            <p class="mt-2 text-3xl font-semibold text-primary">
              {{ isLoading ? '—' : pendingManagers }}
            </p>
          </div>
          <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E7F2EF] text-success">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M4 20v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
              <circle cx="12" cy="7" r="4" />
              <path d="m17 11 1.5 1.5L21 10" />
            </svg>
          </span>
        </div>
        <p class="mt-3 text-xs text-text-muted">Pendaftaran role MANAGER</p>
      </article>
    </section>

    <p v-if="error" class="mt-6 rounded-lg bg-[#F7E8E7] px-4 py-3 text-sm text-danger">
      {{ error }}
    </p>

    <section class="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
      <div class="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
        <div>
          <h2 class="text-base font-semibold text-primary">Pending Accounts</h2>
          <p class="mt-1 text-xs text-text-muted">Daftar akun yang belum memiliki akses.</p>
        </div>
        <span class="rounded-full bg-background px-3 py-1 text-xs font-medium text-text-muted">
          {{ accounts.length }} akun
        </span>
      </div>

      <div v-if="isLoading" class="px-6 py-14 text-center">
        <div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
        <p class="mt-3 text-sm text-text-muted">Memuat akun...</p>
      </div>

      <div v-else-if="accounts.length === 0" class="px-6 py-14 text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E7F2EF] text-success">
          ✓
        </div>
        <h3 class="mt-4 text-sm font-semibold text-primary">Semua akun sudah ditinjau</h3>
        <p class="mt-1 text-sm text-text-muted">Belum ada akun baru yang menunggu verifikasi.</p>
      </div>

      <template v-else>
        <div class="divide-y divide-border md:hidden">
          <article v-for="account in accounts" :key="account.id" class="p-5">
            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E9F0F7] font-semibold text-primary-soft">
                {{ account.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-medium text-primary">{{ account.name }}</p>
                <p class="mt-0.5 truncate text-xs text-text-muted">{{ account.email }}</p>
              </div>
              <span class="rounded-full bg-[#F8EFDF] px-2.5 py-1 text-xs font-medium text-[#9A6824]">
                Pending
              </span>
            </div>

            <dl class="mt-4 grid grid-cols-2 gap-3 rounded-lg bg-background p-4 text-xs">
              <div>
                <dt class="text-text-muted">Nomor pegawai</dt>
                <dd class="mt-1 font-medium text-text">{{ account.employeeNumber }}</dd>
              </div>
              <div>
                <dt class="text-text-muted">Department</dt>
                <dd class="mt-1 font-medium text-text">{{ account.department.name }}</dd>
              </div>
              <div>
                <dt class="text-text-muted">Role</dt>
                <dd class="mt-1 font-medium text-text">{{ account.role.name }}</dd>
              </div>
              <div>
                <dt class="text-text-muted">Tanggal daftar</dt>
                <dd class="mt-1 font-medium text-text">{{ formatDate(account.createdAt) }}</dd>
              </div>
            </dl>

            <button
              type="button"
              :disabled="approvingId !== null"
              class="mt-4 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              @click="approve(account.id)"
            >
              {{ approvingId === account.id ? 'Memproses...' : 'Approve Account' }}
            </button>
          </article>
        </div>

        <div class="hidden overflow-x-auto md:block">
          <table class="w-full min-w-[780px] text-left text-sm">
            <thead class="border-b border-border bg-background/60 text-text-muted">
              <tr>
                <th class="px-5 py-3 font-medium">Karyawan</th>
                <th class="px-5 py-3 font-medium">Nomor pegawai</th>
                <th class="px-5 py-3 font-medium">Department</th>
                <th class="px-5 py-3 font-medium">Role</th>
                <th class="px-5 py-3 font-medium">Tanggal daftar</th>
                <th class="px-5 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="account in accounts"
                :key="account.id"
                class="border-b border-border last:border-b-0 hover:bg-background/40"
              >
                <td class="px-5 py-4">
                  <div class="flex items-center gap-3">
                    <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E9F0F7] text-sm font-semibold text-primary-soft">
                      {{ account.name.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <p class="font-medium text-primary">{{ account.name }}</p>
                      <p class="mt-0.5 text-xs text-text-muted">{{ account.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-4">{{ account.employeeNumber }}</td>
                <td class="px-5 py-4">{{ account.department.name }}</td>
                <td class="px-5 py-4">
                  <span class="rounded-full bg-[#E9F0F7] px-2.5 py-1 text-xs font-medium text-primary-soft">
                    {{ account.role.name }}
                  </span>
                </td>
                <td class="px-5 py-4 text-text-muted">{{ formatDate(account.createdAt) }}</td>
                <td class="px-5 py-4">
                  <button
                    type="button"
                    :disabled="approvingId !== null"
                    class="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-60"
                    @click="approve(account.id)"
                  >
                    {{ approvingId === account.id ? 'Memproses...' : 'Approve' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </section>
  </AppLayout>
</template>
