# Clone Facebook

## Laporan Progress Tugas Besar

Laporan progress tugas besar cloning Facebook dapat diakses melalui tautan berikut:

[Laporan Progress Tugas Besar Cloning Facebook](https://docs.google.com/document/d/1OwPiXkDV1Hle0Uq3St45m89hIQwYwXTj3xJ8fGbesxo/edit?tab=t.9hq5o51i0w7p)

## Tech Stack

- Monorepo: Bun + TypeScript
- Frontend: Vite, React, Tailwind CSS, ShadcnUI-ready structure
- Backend: ElysiaJS, Prisma ORM
- Shared: package `@ppwl/shared` untuk type dan utilitas bersama

## Struktur Proyek

```txt
apps/
  api/      Backend ElysiaJS + Prisma
  web/      Frontend Vite + React + Tailwind
packages/
  shared/   Type dan utilitas bersama
```

## Menjalankan Proyek

Install dependency:

```bash
bun install
```

Generate Prisma Client:

```bash
bun run prisma:generate
```

Jalankan migration database lokal:

```bash
bun run prisma:migrate
```

Jalankan frontend dan backend:

```bash
bun run dev
```

Endpoint default:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`
- Health check API: `http://localhost:3000/health`
