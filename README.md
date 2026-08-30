# Naman Yadav — Portfolio

A scroll-driven "evolution of mobile" portfolio experience, built with Next.js, TypeScript, Tailwind CSS v4, and Framer Motion.

**Live:** https://unon4all.github.io

## Stack

- Next.js 16 (App Router, static export)
- TypeScript
- Tailwind CSS v4
- Framer Motion

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Outputs a fully static site to `out/` (configured via `output: "export"` in `next.config.ts`).

## Deployment

This repo auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`. No manual steps needed after the initial GitHub Pages setup (Settings → Pages → Source: GitHub Actions).
