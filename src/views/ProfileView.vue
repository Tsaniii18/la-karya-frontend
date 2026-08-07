<script setup lang="ts">
import { useRouter } from 'vue-router';
import { currentUser, logout } from '../auth';

const router = useRouter();

async function handleLogout() {
  await logout();
  await router.push('/login');
}
</script>

<template>
  <div class="min-h-screen bg-background text-text md:grid md:grid-cols-[250px_1fr]">
    <aside class="flex items-center justify-between bg-primary px-5 py-5 text-white md:min-h-screen md:flex-col md:items-stretch md:px-6 md:py-8">
      <RouterLink to="/profile" class="text-2xl font-semibold tracking-tight">
        La<span class="text-[#9FC3E3]">Karya</span>
      </RouterLink>

      <nav class="hidden flex-1 pt-12 md:block">
        <RouterLink
          to="/profile"
          class="block rounded-lg bg-white/10 px-4 py-3 text-sm font-medium"
        >
          Profile
        </RouterLink>
      </nav>

      <button
        type="button"
        class="rounded-lg border border-white/30 px-4 py-2 text-sm font-medium md:w-full"
        @click="handleLogout"
      >
        Logout
      </button>
    </aside>

    <main class="p-5 sm:p-8">
      <header>
        <h1 class="text-2xl font-semibold text-primary">Profile</h1>
        <p class="mt-1 text-sm text-text-muted">Informasi akun dan pekerjaan Anda.</p>
      </header>

      <section v-if="currentUser" class="mt-6 max-w-3xl rounded-xl border border-border bg-surface p-6">
        <div class="flex items-center gap-4 border-b border-border pb-6">
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-[#E9F0F7] text-xl font-semibold text-primary-soft">
            {{ currentUser.name.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2 class="text-lg font-semibold text-primary">{{ currentUser.name }}</h2>
            <span class="mt-1 inline-flex rounded-full bg-[#E7F2EF] px-2.5 py-1 text-xs font-medium text-success">
              {{ currentUser.accountStatus }}
            </span>
          </div>
        </div>

        <dl class="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-text-muted">Nomor pegawai</dt>
            <dd class="mt-1 text-sm font-medium">{{ currentUser.employeeNumber }}</dd>
          </div>
          <div>
            <dt class="text-sm text-text-muted">Email</dt>
            <dd class="mt-1 text-sm font-medium">{{ currentUser.email }}</dd>
          </div>
          <div>
            <dt class="text-sm text-text-muted">Role</dt>
            <dd class="mt-1 text-sm font-medium">{{ currentUser.role }}</dd>
          </div>
          <div>
            <dt class="text-sm text-text-muted">Department</dt>
            <dd class="mt-1 text-sm font-medium">{{ currentUser.department }}</dd>
          </div>
        </dl>
      </section>
    </main>
  </div>
</template>
