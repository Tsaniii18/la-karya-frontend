<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { register, type DepartmentName } from '../auth';

const router = useRouter();
const employeeNumber = ref('');
const name = ref('');
const email = ref('');
const password = ref('');
const department = ref<DepartmentName>('HR');
const error = ref('');
const isSubmitting = ref(false);

async function submit() {
  error.value = '';
  isSubmitting.value = true;

  try {
    await register({
      employeeNumber: employeeNumber.value,
      name: name.value,
      email: email.value,
      password: password.value,
      department: department.value,
    });
    await router.push('/pending-account');
  } catch (caughtError) {
    error.value =
      caughtError instanceof Error ? caughtError.message : 'Registrasi gagal';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-text">
    <section class="w-full max-w-lg rounded-xl border border-border bg-surface p-6 sm:p-8">
      <RouterLink to="/" class="text-2xl font-semibold tracking-tight text-primary">
        La<span class="text-primary-soft">Karya</span>
      </RouterLink>

      <div class="mt-8">
        <h1 class="text-2xl font-semibold text-primary">Buat akun</h1>
        <p class="mt-2 text-sm text-text-muted">
          Akun baru akan menunggu verifikasi sebelum dapat digunakan.
        </p>
      </div>

      <form class="mt-8 grid gap-5 sm:grid-cols-2" @submit.prevent="submit">
        <div>
          <label for="employee-number" class="text-sm font-medium">Nomor pegawai</label>
          <input
            id="employee-number"
            v-model="employeeNumber"
            type="text"
            required
            class="mt-2 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary-soft"
          />
        </div>

        <div>
          <label for="name" class="text-sm font-medium">Nama</label>
          <input
            id="name"
            v-model="name"
            type="text"
            autocomplete="name"
            required
            class="mt-2 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary-soft"
          />
        </div>

        <div>
          <label for="register-email" class="text-sm font-medium">Email</label>
          <input
            id="register-email"
            v-model="email"
            type="email"
            autocomplete="email"
            required
            class="mt-2 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary-soft"
          />
        </div>

        <div>
          <label for="department" class="text-sm font-medium">Department</label>
          <select
            id="department"
            v-model="department"
            class="mt-2 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:border-primary-soft"
          >
            <option value="HR">HR</option>
            <option value="FINANCE">Finance</option>
            <option value="IT">IT</option>
            <option value="MARKETING">Marketing</option>
          </select>
        </div>

        <div class="sm:col-span-2">
          <label for="register-password" class="text-sm font-medium">Password</label>
          <input
            id="register-password"
            v-model="password"
            type="password"
            autocomplete="new-password"
            required
            class="mt-2 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:border-primary-soft"
          />
        </div>

        <p v-if="error" class="rounded-lg bg-[#F7E8E7] px-3 py-2 text-sm text-danger sm:col-span-2">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {{ isSubmitting ? 'Memproses...' : 'Buat akun' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-text-muted">
        Sudah punya akun?
        <RouterLink to="/login" class="font-medium text-primary-soft">
          Masuk
        </RouterLink>
      </p>
    </section>
  </main>
</template>
