<template>
  <main class="flex min-h-screen items-center justify-center bg-background px-5 py-12 text-text">
    <section class="w-full max-w-md rounded-xl border border-border bg-surface p-8 text-center">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F8EFDF] text-xl text-[#9A6824]">
        ○
      </div>
      <h1 class="mt-6 text-2xl font-semibold text-primary">Akun menunggu verifikasi</h1>
      <p class="mt-3 text-sm leading-6 text-text-muted">
        Registrasi berhasil. Akun Anda perlu diaktifkan oleh HR Manager sebelum dapat login.
      </p>
      <RouterLink
        to="/login"
        class="mt-7 inline-flex rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-primary"
      >
        Kembali ke login
      </RouterLink>
    </section>
  </main>
</template>
