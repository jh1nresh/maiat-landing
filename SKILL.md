---
name: maiat-landing
description: >
  Edit and maintain the Maiat Protocol landing page.
  Use this skill when: updating copy, changing links, modifying the hero section,
  adding sections, updating CTAs, or fixing the landing page at maiat.io.
---

# Maiat Landing Page — Agent Skill

## What is this repo?

The **marketing/landing page** for Maiat Protocol at `https://maiat.io`.  
Built with Next.js 14 (App Router) + Tailwind CSS.

**Live:** `https://maiat.io`  
**Repo:** `https://github.com/JhiNResH/maiat-landing`  
**App (separate project):** `https://app.maiat.io`

---

## Key Files

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Main landing page — hero, features, CTA sections |
| `src/components/Header.tsx` | Navigation + Launch App button |
| `src/components/Footer.tsx` | Footer links |
| `src/app/layout.tsx` | Root layout, fonts, metadata |
| `src/app/globals.css` | Global styles + Tailwind |

---

## Important Link Rules

- **Launch App** buttons → always `https://app.maiat.io/monitor`
- **Docs** links → `https://app.maiat.io/docs`
- **Explore** links → `https://app.maiat.io/explore`
- **Never** use `maiat-protocol.vercel.app` — that's the old URL

---

## Common Tasks

### Change "Launch App" destination
Edit `src/components/Header.tsx` (line ~82, ~112) and `src/app/page.tsx` (line ~235, ~394):
```tsx
<Link href="https://app.maiat.io/monitor" className="btn-primary">
  Launch App
</Link>
```

### Add a new section to the landing page
Add to `src/app/page.tsx` between existing sections.

### Update hero copy
Edit the first `<section>` in `src/app/page.tsx`.

---

## Deploy

Push to `main` → Vercel auto-deploys to `maiat.io`.  
No build commands needed locally.

---

## Style Conventions

- Use Tailwind utility classes
- `btn-primary` = main CTA button style
- `btn-ghost` = secondary button style
- Dark background (`bg-[#0a0a0a]`) with neon green accents
