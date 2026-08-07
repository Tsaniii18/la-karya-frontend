<template>
  <main class="flex min-h-screen flex-col bg-background text-text">
    <header class="w-full border-b border-white/15 bg-primary">
      <div class="mx-auto flex h-20 max-w-7xl items-center px-5 sm:h-[5.5rem] sm:px-8 lg:px-12">
        <a
          href="/"
          class="rounded text-2xl font-semibold leading-none tracking-[-0.03em] focus:outline-2 focus:outline-offset-4 focus:outline-white sm:text-3xl"
        >
          <span class="text-white">La</span><span class="text-[#9FC3E3]">Karya</span>
        </a>
      </div>
    </header>

    <section class="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 overflow-hidden px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:px-12 lg:py-24">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <span class="absolute -right-24 top-10 h-64 w-64 rounded-full border border-primary/5 sm:-right-16 sm:h-80 sm:w-80" />
        <span class="absolute -right-8 top-28 h-40 w-40 rounded-full border border-primary-soft/10 sm:right-8 sm:h-52 sm:w-52" />
        <span class="absolute bottom-14 left-5 h-px w-28 bg-primary/5 sm:left-12 sm:w-44" />
      </div>

      <div class="relative z-10 max-w-3xl">
        <h1 class="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.025em] text-primary sm:text-5xl lg:text-[3.65rem]">
          Semua kebutuhan kerja, lebih mudah bersama
          <span class="text-primary-soft">LaKarya.</span>
        </h1>

        <p class="mt-6 max-w-2xl text-base leading-7 text-text-muted sm:text-lg sm:leading-8">
          Ajukan cuti, izin, reimbursement, dan keluhan internal dalam satu
          portal. Setiap proses tersusun rapi dan mudah dipantau sampai selesai.
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <RouterLink
            to="/login"
            class="w-full rounded-lg bg-primary px-7 py-4 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(15,39,71,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/95 hover:shadow-[0_14px_32px_rgba(15,39,71,0.24)] focus:outline-2 focus:outline-offset-2 focus:outline-primary sm:w-auto"
          >
            Mulai dengan LaKarya
          </RouterLink>
          <RouterLink
            to="/register"
            class="w-full rounded-lg border border-border bg-surface/80 px-6 py-4 text-sm font-semibold text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary-soft hover:bg-surface focus:outline-2 focus:outline-offset-2 focus:outline-primary sm:w-auto"
          >
            Belum punya akun? Buat akun
          </RouterLink>
        </div>
      </div>

      <div class="relative z-10 rounded-2xl border border-border/90 bg-surface/95 p-4 shadow-[0_24px_70px_rgba(15,39,71,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,39,71,0.13)] sm:p-6">
        <div class="px-1 pb-6">
          <h2 class="text-xl font-semibold tracking-tight text-primary">
            Kenapa memilih LaKarya?
          </h2>
        </div>

        <div class="overflow-hidden rounded-xl border border-border bg-background/45">
          <article class="group grid grid-cols-[2.5rem_1fr] gap-4 p-5 transition-colors duration-200 hover:bg-surface sm:grid-cols-[3rem_1fr]">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F2EF] text-sm font-semibold text-success transition-colors duration-200 group-hover:bg-success group-hover:text-white">✓</span>
            <div>
              <h3 class="text-sm font-semibold text-primary">Pengajuan terpusat</h3>
              <p class="mt-1 text-sm leading-6 text-text-muted">
                Cuti, izin, reimbursement, dan keluhan tersedia dalam satu portal.
              </p>
            </div>
          </article>

          <article class="group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border p-5 transition-colors duration-200 hover:bg-surface sm:grid-cols-[3rem_1fr]">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F2EF] text-sm font-semibold text-success transition-colors duration-200 group-hover:bg-success group-hover:text-white">✓</span>
            <div>
              <h3 class="text-sm font-semibold text-primary">Persetujuan yang jelas</h3>
              <p class="mt-1 text-sm leading-6 text-text-muted">
                Setiap pengajuan mengikuti proses persetujuan yang terarah.
              </p>
            </div>
          </article>

          <article class="group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border p-5 transition-colors duration-200 hover:bg-surface sm:grid-cols-[3rem_1fr]">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F2EF] text-sm font-semibold text-success transition-colors duration-200 group-hover:bg-success group-hover:text-white">✓</span>
            <div>
              <h3 class="text-sm font-semibold text-primary">Mudah dipantau</h3>
              <p class="mt-1 text-sm leading-6 text-text-muted">
                Perkembangan dan keputusan pengajuan dapat dilihat dengan mudah.
              </p>
            </div>
          </article>

          <article class="group grid grid-cols-[2.5rem_1fr] gap-4 border-t border-border p-5 transition-colors duration-200 hover:bg-surface sm:grid-cols-[3rem_1fr]">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-[#E7F2EF] text-sm font-semibold text-success transition-colors duration-200 group-hover:bg-success group-hover:text-white">✓</span>
            <div>
              <h3 class="text-sm font-semibold text-primary">Lebih tertata</h3>
              <p class="mt-1 text-sm leading-6 text-text-muted">
                Informasi layanan tersimpan rapi dan mudah ditemukan kembali.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <footer class="w-full border-t border-border">
      <div class="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>© 2026 LaKarya</p>
        <p>Portal layanan internal karyawan.</p>
      </div>
    </footer>
  </main>
</template>
