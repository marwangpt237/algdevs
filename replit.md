# AlgDevs

A bilingual (Arabic primary, English secondary) free resource directory for Algerian developers and students — inspired by fmhy.net. Covers AI tools, dev tools, courses, books, hosting, software, privacy, entertainment, and mobile apps.

## Run & Operate

- `pnpm --filter @workspace/algdevs run dev` — run the frontend (port 25192)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (static, no backend)
- Routing: Wouter
- Search: Fuse.js (client-side fuzzy search)
- Animations: Framer Motion
- UI: Tailwind CSS + shadcn/ui
- Fonts: Cairo (Arabic), Inter (English)
- **Fully static — deployable to GitHub Pages**

## Where things live

- `artifacts/algdevs/src/` — React app source
- `artifacts/algdevs/src/data/resources.json` — **source of truth for all resources** — edit this to add/remove resources
- `artifacts/algdevs/src/pages/` — page components (home, category, submit, about)
- `artifacts/algdevs/src/hooks/` — useLanguage, useTheme hooks

## Architecture decisions

- **Static-only**: No backend or database. Resources are stored in a JSON file bundled with the app. This works perfectly for GitHub Pages.
- **Community submissions via GitHub Issues**: Users click "Submit a Resource" which opens a pre-filled GitHub Issue. Admin reviews and edits `resources.json` manually.
- **Bilingual RTL/LTR**: Language toggle switches `document.documentElement.dir` and `lang`. Arabic uses Cairo font with RTL layout, English uses Inter with LTR layout.
- **Client-side search**: Fuse.js fuzzy search across title, Arabic/English descriptions, and tags.

## Product

- Homepage with hero search, category grid, stats (16 categories, 184 resources)
- Category pages with tag filtering and free-only toggle
- Submit page linking to GitHub Issues for community submissions
- About page with mission and contribution guide
- Dark/light mode, Arabic/English language toggle

## User preferences

- Arabic is the primary language, English is secondary
- Deployed to GitHub Pages (static build)
- Community submissions with admin approval (via GitHub Issues)
- Covers everything: AI, dev tools, courses, books, hosting, software, privacy, entertainment, mobile apps

## Gotchas

- **GitHub Pages base path**: When you set up GitHub Pages, if your repo is at `github.com/username/algdevs`, update `vite.config.ts` `base` to `"/algdevs/"` (matching your repo name). If it's at a custom domain or root, keep `base: "/"`.
- **Adding resources**: Edit `artifacts/algdevs/src/data/resources.json` directly. The JSON structure is documented in the file.
- **GitHub Issues submission URL**: The submit page links to `https://github.com/algdevs/algdevs/issues/new` — update this URL in `artifacts/algdevs/src/pages/submit.tsx` to match your actual GitHub repo.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
