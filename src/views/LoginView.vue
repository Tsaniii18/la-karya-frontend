<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { login } from '../auth';

const route = useRoute();
const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const isSubmitting = ref(false);

async function submit() {
  error.value = '';
  isSubmitting.value = true;

  try {
    await login(email.value, password.value);
    const redirect =
      typeof route.query.redirect === 'string'
        ? route.query.redirect
        : '/profile';
    await router.push(redirect);
  } catch (caughtError) {
    error.value =
      caughtError instanceof Error ? caughtError.message : 'Login gagal';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-text">
    <section class="w-full max-w-md rounded-xl border border-border bg-surface p-6 sm:p-8">
      <RouterLink to="/" class="text-2xl font-semibold tracking-tight text-primary">
        La<span class="text-primary-soft">Karya</span>
      </RouterLink>

      <div class="mt-8">
        <h1 class="text-2xl font-semibold text-primary">Masuk ke akun</h1>
        <p class="mt-2 text-sm text-text-muted">
          Gunakan akun aktif Anda untuk mengakses portal.
        </p>
      </div>

      <form class="mt-8 space-y-5" @submit.prevent="submit">
        <div>
          <label for="email" class="text-sm font-medium">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            class="mt-2 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary-soft"
          />
        </div>

        <div>
          <label for="password" class="text-sm font-medium">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required
            class="mt-2 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary-soft"
          />
        </div>

        <p v-if="error" class="rounded-lg bg-[#F7E8E7] px-3 py-2 text-sm text-danger">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ isSubmitting ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-text-muted">
        Belum punya akun?
        <RouterLink to="/register" class="font-medium text-primary-soft">
          Buat akun
        </RouterLink>
      </p>
    </section>
  </main>
</template>
