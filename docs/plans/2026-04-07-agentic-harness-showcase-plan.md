# Agentic Coding Harness Showcase — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. For parallel tracks (Phase 3+), use `superpowers:subagent-driven-development` with `superpowers:dispatching-parallel-agents` and `superpowers:using-git-worktrees`.

**Goal:** Ship a polished, dark-default information showcase site for "agentic coding harness" methodology and a kotlin-codex catalog to Vercel today.

**Architecture:** Next.js 16 App Router (RSC, Turbopack) + Fumadocs for docs UX + shadcn/ui + Tailwind CSS v4. Content is MDX. Catalog is generated at build time from a JSON inventory of `/Users/usermackbookpro/innogrid-prj/kotlin-codex/`. Deployed via `vercel` CLI from main branch. Foundation work happens on main; content/catalog/architecture work happens in 3 parallel git worktrees that fast-forward back to main.

**Tech Stack:** Next.js 16, React 19, TypeScript 5, Fumadocs (latest), Tailwind CSS v4, shadcn/ui, MDX, Shiki, Mermaid, cmdk, next/font (Geist Sans + Geist Mono + Newsreader), pnpm 10, Vercel CLI.

**Design system locked:**
- Background dark `#0a0a0a` zinc-950
- Accent primary `#0042FF` (Innogrid Deep Blue)
- Accent secondary `#68CAFF` (Innogrid Light Cyan)
- Danger `#f87171`, Success `#34d399`
- Fonts: Geist Sans (UI), Newsreader (long-form essays), Geist Mono (code/meta)

**Content principles (must appear in every essay frontmatter as a constitutional reminder):**
1. No fabrication — all factual claims have a source URL or `[출처 미확인]` marker
2. Korean prose in honorific 존댓말
3. AI = computation (matrix multiplication + attention + gradient descent), not consciousness
4. Speed and scale are the substrate variables
5. Forecasts only with cited sources

**Working directory:** `/Users/usermackbookpro/innogrid-prj/agentic-coding-harness`

**Repo:** `https://github.com/sw-woo/aiagentic-coding-harness` (initial commit `8b033ca` already pushed)

---

## Phase 0 — Repo bootstrap (sequential, on main)

### Task 0.1: Create `.gitignore` and basic project files

**Files:**
- Create: `.gitignore`
- Create: `.editorconfig`
- Create: `.nvmrc`

**Step 1:** Write `.gitignore` covering Node, Next.js, IDE, OS noise:
```
node_modules
.next
out
.vercel
.turbo
.DS_Store
*.log
.env
.env.local
.env*.local
coverage
.cache
dist
build
.idea
.vscode
*.tsbuildinfo
next-env.d.ts
```

**Step 2:** Write `.editorconfig`:
```
root = true
[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
```

**Step 3:** Write `.nvmrc`: `25`

**Step 4:** Commit
```bash
git add .gitignore .editorconfig .nvmrc
git commit -m "chore: add gitignore, editorconfig, nvmrc"
```

### Task 0.2: Scaffold Next.js 16 app with TypeScript + Tailwind v4

**Files:**
- Create: many (Next.js scaffold)

**Step 1:** Run scaffold (use `--ts --tailwind --eslint --app --src-dir --import-alias "@/*"` for clarity)
```bash
pnpm create next-app@latest . --ts --tailwind --eslint --app --src-dir --use-pnpm --import-alias "@/*" --turbopack --no-git --yes
```
If it complains about non-empty dir, allow it (we have LICENSE + docs/ + .gitignore which the scaffolder should accept). If it refuses, move LICENSE/docs aside, scaffold, then move them back.

**Step 2:** Verify install
```bash
ls package.json next.config.* src/app/page.tsx
```

**Step 3:** Run dev once to confirm it boots, then kill
```bash
pnpm dev &
sleep 5
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
kill %1 2>/dev/null || true
```
Expected: `200`

**Step 4:** Commit
```bash
git add .
git commit -m "chore: scaffold Next.js 16 app with TS, Tailwind v4, App Router"
```

### Task 0.3: Install supporting dependencies

**Files:**
- Modify: `package.json`

**Step 1:** Install runtime deps
```bash
pnpm add fumadocs-ui fumadocs-core fumadocs-mdx next-themes lucide-react clsx tailwind-merge class-variance-authority cmdk shiki mermaid @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-popover
```

**Step 2:** Install dev deps
```bash
pnpm add -D @types/node @types/react @types/react-dom @tailwindcss/typography prettier
```

**Step 3:** Commit
```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add fumadocs, shadcn primitives, mdx, mermaid deps"
```

### Task 0.4: Configure Tailwind v4 with Innogrid design tokens

**Files:**
- Modify: `src/app/globals.css`

**Step 1:** Replace globals.css with the design token system using Tailwind v4 `@theme`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

@theme {
  --color-bg: #0a0a0a;
  --color-surface: #18181b;
  --color-surface-2: #27272a;
  --color-border: #3f3f46;
  --color-fg: #fafafa;
  --color-fg-muted: #a1a1aa;
  --color-fg-subtle: #71717a;
  --color-accent: #0042ff;
  --color-accent-2: #68caff;
  --color-danger: #f87171;
  --color-success: #34d399;
  --color-info: #60a5fa;

  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, "SF Mono", Menlo, monospace;
  --font-serif: var(--font-newsreader), ui-serif, Georgia, serif;

  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
}

:root {
  color-scheme: dark;
}

html {
  background: var(--color-bg);
  color: var(--color-fg);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

html.light {
  --color-bg: #fafafa;
  --color-surface: #ffffff;
  --color-surface-2: #f4f4f5;
  --color-border: #e4e4e7;
  --color-fg: #0a0a0a;
  --color-fg-muted: #52525b;
  --color-fg-subtle: #71717a;
  color-scheme: light;
}

body {
  background: var(--color-bg);
  color: var(--color-fg);
  min-height: 100dvh;
}

::selection {
  background: var(--color-accent);
  color: #ffffff;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 2:** Verify build still passes
```bash
pnpm build 2>&1 | tail -20
```
Expected: success.

**Step 3:** Commit
```bash
git add src/app/globals.css
git commit -m "feat(design): add Innogrid CI design tokens, dark default, Tailwind v4 theme"
```

### Task 0.5: Configure fonts via next/font

**Files:**
- Create: `src/lib/fonts.ts`
- Modify: `src/app/layout.tsx`

**Step 1:** Create `src/lib/fonts.ts`:
```ts
import { Geist, Geist_Mono, Newsreader } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});
```

**Step 2:** Modify `src/app/layout.tsx` to import fonts and apply variables to `<html>`:
```tsx
import type { Metadata } from "next";
import { geistSans, geistMono, newsreader } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agentic Coding Harness — Innogrid",
  description:
    "에이전틱 코딩 하네스 — Karpathy 방법론, 멀티 에이전트 오케스트레이션, 그리고 Innogrid AIOps/MLOps 플랫폼을 위한 살아있는 레퍼런스.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
```

**Step 3:** Verify build
```bash
pnpm build 2>&1 | tail -10
```

**Step 4:** Commit
```bash
git add src/lib/fonts.ts src/app/layout.tsx
git commit -m "feat(design): add Geist Sans/Mono and Newsreader via next/font"
```

### Task 0.6: First push to GitHub (foundation)

```bash
git push origin main
```

Expected: push succeeds, GitHub shows the new files.

---

## Phase 1 — Track A: Foundation (sequential, on main)

### Task 1.1: Add `cn` utility and shadcn-style folder structure

**Files:**
- Create: `src/lib/utils.ts`
- Create: `src/components/ui/.gitkeep`
- Create: `src/components/nav/.gitkeep`
- Create: `src/components/footer/.gitkeep`

**Step 1:** Write `src/lib/utils.ts`:
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Step 2:** Create the empty placeholder dirs (Next.js needs them tracked):
```bash
mkdir -p src/components/ui src/components/nav src/components/footer src/components/landing src/components/catalog src/components/diagrams
touch src/components/ui/.gitkeep src/components/nav/.gitkeep src/components/footer/.gitkeep src/components/landing/.gitkeep src/components/catalog/.gitkeep src/components/diagrams/.gitkeep
```

**Step 3:** Commit
```bash
git add src/lib/utils.ts src/components
git commit -m "chore: add cn util and component dirs"
```

### Task 1.2: Theme provider (next-themes) with class-based dark/light

**Files:**
- Create: `src/components/theme-provider.tsx`
- Modify: `src/app/layout.tsx`

**Step 1:** `src/components/theme-provider.tsx`:
```tsx
"use client";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
```

**Step 2:** Wrap children in layout:
```tsx
// in layout.tsx, inside <body>:
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
  {children}
</ThemeProvider>
```

**Step 3:** Build + commit
```bash
pnpm build 2>&1 | tail -5
git add src/components/theme-provider.tsx src/app/layout.tsx
git commit -m "feat(theme): add next-themes dark/light provider"
```

### Task 1.3: NavBar component

**Files:**
- Create: `src/components/nav/nav-bar.tsx`
- Create: `src/components/nav/theme-toggle.tsx`

**Step 1:** Theme toggle (lucide icons + next-themes):
```tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label="테마 전환"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)] hover:border-[var(--color-accent)]"
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="block h-4 w-4 dark:hidden" />
    </button>
  );
}
```

**Step 2:** NavBar:
```tsx
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/manifesto", label: "선언문" },
  { href: "/methodology/karpathy", label: "방법론" },
  { href: "/architecture/overview", label: "아키텍처" },
  { href: "/catalog/skills", label: "카탈로그" },
  { href: "/playbook/setup-claude-code", label: "플레이북" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg)_80%,transparent)] backdrop-blur">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[var(--color-accent)]" />
          agentic-harness
          <span className="ml-2 rounded-sm border border-[var(--color-border)] px-1.5 py-0.5 text-[10px] font-normal text-[var(--color-fg-muted)]">v0.1</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/sw-woo/aiagentic-coding-harness"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-[var(--color-fg-muted)] transition hover:text-[var(--color-fg)] md:block"
          >
            GitHub
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

**Step 3:** Build + commit
```bash
pnpm build 2>&1 | tail -5
git add src/components/nav
git commit -m "feat(nav): add sticky NavBar with theme toggle"
```

### Task 1.4: Footer

**Files:**
- Create: `src/components/footer/site-footer.tsx`

**Step 1:**
```tsx
export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 text-sm text-[var(--color-fg-muted)] md:flex-row md:items-center md:justify-between">
        <div className="font-mono">
          <span className="text-[var(--color-fg)]">agentic-harness</span> ·
          {" "}Innogrid AIOps/MLOps 플랫폼 레퍼런스
        </div>
        <div className="flex flex-col gap-1 md:flex-row md:gap-6">
          <a href="https://github.com/sw-woo/aiagentic-coding-harness" target="_blank" rel="noreferrer" className="hover:text-[var(--color-fg)]">소스</a>
          <a href="https://www.innogrid.com" target="_blank" rel="noreferrer" className="hover:text-[var(--color-fg)]">Innogrid</a>
          <span>본문은 사실 기반으로 작성되며 출처를 명시합니다.</span>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2:** Wire NavBar + Footer into layout:
```tsx
// src/app/layout.tsx — inside ThemeProvider:
<NavBar />
<main className="min-h-[calc(100dvh-3.5rem-7rem)]">{children}</main>
<SiteFooter />
```

**Step 3:** Build + commit
```bash
pnpm build 2>&1 | tail -5
git add src/components/footer src/app/layout.tsx
git commit -m "feat(footer): add SiteFooter and wire layout"
```

### Task 1.5: Editorial landing page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/landing/editorial-hero.tsx`
- Create: `src/components/landing/principle-card.tsx`

**Step 1:** EditorialHero (serif headline, Innogrid blue accent CTA, no gradient, with code snippet card):
```tsx
import Link from "next/link";

const SNIPPET = `# .codex/config.toml
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[features]
codex_hooks = true
multi_agent = true`;

export function EditorialHero() {
  return (
    <section className="border-b border-[var(--color-border)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">
            <span className="inline-block h-1.5 w-6 bg-[var(--color-accent)]" />
            Research Engineering · v0.1
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[var(--color-fg)] md:text-6xl lg:text-7xl">
            진지한 시스템을 위한
            <br />
            <span className="text-[var(--color-accent)]">에이전틱 코딩 하네스</span>
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-[var(--color-fg-muted)]">
            Karpathy의 방법론, 다중 에이전트 오케스트레이션, 그리고 Innogrid AIOps/MLOps 플랫폼을 만들면서 정리한 살아있는 레퍼런스입니다. 모든 사실에는 출처가 있고, AI를 인격체가 아닌 계산으로 정의합니다.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-3 font-mono text-sm font-medium text-white transition hover:opacity-90"
            >
              선언문 읽기 →
            </Link>
            <Link
              href="/catalog/skills"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-3 font-mono text-sm text-[var(--color-fg)] transition hover:border-[var(--color-accent-2)] hover:text-[var(--color-accent-2)]"
            >
              카탈로그 탐색
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-full overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 border-b border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-fg-subtle)]/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-fg-subtle)]/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-fg-subtle)]/40" />
              <span className="ml-3 font-mono text-xs text-[var(--color-fg-muted)]">.codex/config.toml</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-[var(--color-fg)]"><code>{SNIPPET}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2:** PrincipleCard:
```tsx
import Link from "next/link";

export function PrincipleCard({
  number,
  title,
  description,
  href,
}: {
  number: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition hover:border-[var(--color-accent)]"
    >
      <span className="font-mono text-xs text-[var(--color-fg-subtle)]">{number}</span>
      <h3 className="font-sans text-lg font-medium text-[var(--color-fg)]">{title}</h3>
      <p className="text-sm leading-relaxed text-[var(--color-fg-muted)]">{description}</p>
      <span className="mt-auto font-mono text-xs text-[var(--color-fg-subtle)] transition group-hover:text-[var(--color-accent-2)]">→</span>
    </Link>
  );
}
```

**Step 3:** Landing page composition (`src/app/page.tsx`):
```tsx
import { EditorialHero } from "@/components/landing/editorial-hero";
import { PrincipleCard } from "@/components/landing/principle-card";

const PRINCIPLES = [
  { number: "01", title: "선언문", description: "모든 콘텐츠가 따르는 다섯 가지 원칙. 출처 없는 주장은 사이트에 올라가지 않습니다.", href: "/manifesto" },
  { number: "02", title: "Karpathy 방법론", description: "Software 1.0/2.0/3.0, LLM as OS, vibe coding의 진짜 의미와 한계.", href: "/methodology/karpathy" },
  { number: "03", title: "5-레이어 아키텍처", description: "skills · agents · rules · hooks · sandbox로 구성된 하네스의 인터랙티브 다이어그램.", href: "/architecture/overview" },
  { number: "04", title: "살아있는 카탈로그", description: "이 사이트를 만든 하네스의 모든 skill, agent, hook, rule을 검색·필터·복사할 수 있습니다.", href: "/catalog/skills" },
];

export default function Home() {
  return (
    <>
      <EditorialHero />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-fg-muted)]">목차</p>
        <h2 className="font-serif text-3xl text-[var(--color-fg)]">사이트 안에서 어디로 갈 수 있나요</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <PrincipleCard key={p.number} {...p} />
          ))}
        </div>
      </section>
    </>
  );
}
```

**Step 4:** Build + run + verify
```bash
pnpm build 2>&1 | tail -10
```

**Step 5:** Commit
```bash
git add src/app/page.tsx src/components/landing
git commit -m "feat(landing): add editorial hero and principle cards"
```

### Task 1.6: Initial Vercel deploy (first preview URL)

**Files:** none

**Step 1:** Push current state
```bash
git push origin main
```

**Step 2:** Vercel link + deploy preview (only if user provides Vercel access; otherwise mark as USER step)
```bash
# USER ACTION (preferred): import the repo at https://vercel.com/new
# OR (if vercel CLI is logged in):
# vercel link --yes --project agentic-coding-harness
# vercel --yes
```

Expected: Live preview URL printed.

---

## Phase 2 — Worktree fan-out

### Task 2.1: Create worktrees for parallel tracks

**Files:** none

**Step 1:** Create three sibling worktrees:
```bash
git worktree add ../agentic-coding-harness-content -b track/content origin/main
git worktree add ../agentic-coding-harness-catalog -b track/catalog origin/main
git worktree add ../agentic-coding-harness-architecture -b track/architecture origin/main
```

**Step 2:** Verify
```bash
git worktree list
```
Expected: 4 entries (main + 3 tracks).

---

## Phase 3 — Track B: Content (parallel, in `wt-content` worktree)

> Run inside `/Users/usermackbookpro/innogrid-prj/agentic-coding-harness-content/`. This track only touches `content/**`, `src/app/(content)/**`, and adds Fumadocs MDX wiring. Do NOT touch `src/components/ui/**`, `src/components/nav/**`, etc.

### Task 3.1: Wire Fumadocs MDX

**Files:**
- Create: `source.config.ts`
- Create: `src/lib/source.ts`
- Modify: `next.config.mjs`

**Step 1:** `source.config.ts` (Fumadocs source definition)
```ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

export const docs = defineDocs({
  dir: "content",
});

export default defineConfig();
```

**Step 2:** `src/lib/source.ts` (source loader)
```ts
import { docs } from "@/.source";
import { loader } from "fumadocs-core/source";

export const source = loader({
  baseUrl: "/",
  source: docs.toFumadocsSource(),
});
```

**Step 3:** `next.config.mjs` — wrap with Fumadocs MDX:
```js
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
};

export default withMDX(config);
```

**Step 4:** Run `pnpm build` to verify Fumadocs source generation
```bash
pnpm build 2>&1 | tail -20
```

**Step 5:** Commit
```bash
git add source.config.ts src/lib/source.ts next.config.mjs
git commit -m "feat(content): wire fumadocs-mdx source loader"
```

### Task 3.2: Manifesto essay (placeholder + 5 principles)

**Files:**
- Create: `content/manifesto/index.mdx`
- Create: `src/app/manifesto/page.tsx`
- Create: `src/components/content/prose.tsx`

**Step 1:** `src/components/content/prose.tsx` — serif long-form wrapper
```tsx
import { cn } from "@/lib/utils";

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <article
      className={cn(
        "prose prose-invert mx-auto max-w-[68ch] font-serif text-[18px] leading-[1.75]",
        "prose-headings:font-sans prose-headings:tracking-tight prose-headings:text-[var(--color-fg)]",
        "prose-h1:text-5xl prose-h2:text-3xl prose-h2:mt-16 prose-h3:text-xl",
        "prose-p:text-[var(--color-fg)]",
        "prose-a:text-[var(--color-accent-2)] prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-[var(--color-fg)]",
        "prose-code:font-mono prose-code:text-[15px] prose-code:bg-[var(--color-surface-2)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
        "prose-blockquote:border-l-4 prose-blockquote:border-[var(--color-accent)] prose-blockquote:bg-[var(--color-surface)]/50 prose-blockquote:py-1 prose-blockquote:not-italic prose-blockquote:font-serif",
        className,
      )}
    >
      {children}
    </article>
  );
}
```

**Step 2:** `content/manifesto/index.mdx` — the constitutional essay (Korean 존댓말, source-cited):

```mdx
---
title: 선언문 — 다섯 가지 원칙
description: 이 사이트의 모든 콘텐츠가 따르는 변경 불가능한 원칙입니다.
---

# 선언문

이 사이트는 에이전틱 코딩 하네스(agentic coding harness)에 대한 정보 공유 사이트입니다. 모든 페이지는 아래 다섯 가지 원칙을 따릅니다. 이 원칙들은 변경 불가능합니다.

## 1. 사실 기반, 출처 명시

모든 사실 주장에는 출처 URL 또는 1차 자료가 있어야 합니다. 출처가 없는 주장은 \`[출처 미확인]\` 마커로 명시합니다. 인용문은 verbatim으로만 사용하고, 확인하지 못한 인용은 paraphrase로 표시합니다.

## 2. 한국어 존댓말

이 사이트의 모든 한국어 산문은 평어가 아닌 존댓말로 작성합니다. 영어 1차 자료의 인용은 원문 그대로 두고, 그 뒤에 한국어 요약을 존댓말로 덧붙입니다.

## 3. AI는 인격체가 아니라 계산입니다

대규모 언어 모델은 정확히 다음과 같습니다.

- 토큰 임베딩 룩업 + 다중 헤드 어텐션(스케일드 닷-프로덕트 Q·K·V) + 피드포워드 레이어
- 대규모 자기회귀 디코딩
- 그래디언트 디센트로 학습된 가중치 행렬
- 그것을 GPU/TPU 행렬 연산 유닛 위에서 빠르게 실행하는 컴파일러 스택

이게 전부입니다. 이건 마음이 아니라 행렬 곱셈입니다. 의도가 아니라 토큰 시퀀스 위의 확률분포입니다. 이 사이트의 모든 essay는 이 정의에서 출발합니다.

> 이 정의는 Vaswani 외 "Attention Is All You Need"(2017, [arxiv:1706.03762](https://arxiv.org/abs/1706.03762))과 Karpathy의 nanoGPT([github.com/karpathy/nanoGPT](https://github.com/karpathy/nanoGPT))에서 직접 확인할 수 있습니다. 약 300줄의 PyTorch 코드가 GPT-2를 재현하는 사실이 곧 LLM이 무엇인지에 대한 가장 정직한 정의입니다.

## 4. 속도와 스케일이 본질적 변수입니다

LLM의 능력 곡선은 신비한 무언가가 아니라, 측정 가능한 변수의 함수로 움직입니다.

- 모델 파라미터 수
- 학습 토큰 수
- 학습 컴퓨트(FLOPs)
- 추론 컴퓨트 = 행렬 곱셈 횟수 × 토큰 길이
- TPU/GPU 세대 (메모리 대역폭, 행렬 연산 유닛 처리량)
- 데이터센터 전력과 연결성

"미래 AI가 어디까지 갈까"라는 질문은 곧 "위 변수들이 어디까지 늘어나는가"라는 질문입니다. 우리는 [/manifesto/realistic-trajectory](/manifesto/realistic-trajectory)에서 이 변수의 사실 기반 추정을 정리합니다.

## 5. 미래 예측은 사실 기반으로만

추측이나 마케팅 슬로건은 이 사이트에 올리지 않습니다. 미래에 대한 모든 진술은 다음과 같이 인용 가능한 자료에서만 가져옵니다.

- METR의 task 길이 두 배 증가 연구([metr.org](https://metr.org))
- Epoch AI의 컴퓨트 스케일 추정([epoch.ai](https://epoch.ai))
- Dario Amodei의 "Machines of Loving Grace"([darioamodei.com/machines-of-loving-grace](https://darioamodei.com/machines-of-loving-grace))
- Anthropic Responsible Scaling Policy([anthropic.com](https://www.anthropic.com/news))
- Sam Altman "Three Observations"([blog.samaltman.com](https://blog.samaltman.com))

근거 없는 1년·5년·10년 예측은 이 사이트의 어디에도 등장하지 않습니다.

---

## 왜 이 다섯 가지를 못 박았나요

에이전틱 코딩 하네스를 만드는 일은 본질적으로 "출처 없는 자신감을 검증 가능한 시스템으로 바꾸는 일"입니다. LLM은 자기가 모르는 것을 모른다고 말하지 않습니다. 이 사이트가 그 자신감을 그대로 답습한다면, 사이트 자체가 LLM이 만든 거짓말의 또 다른 표면이 됩니다.

이 다섯 가지 원칙은 그것에 대한 단순한 답입니다. 사이트의 essay, catalog, playbook, 그리고 이 사이트를 만든 하네스의 모든 hook과 rule이 같은 원칙을 따릅니다.
```

**Step 3:** `src/app/manifesto/page.tsx` (uses Fumadocs source to render the MDX):
```tsx
import { source } from "@/lib/source";
import { Prose } from "@/components/content/prose";
import { notFound } from "next/navigation";

export default async function ManifestoPage() {
  const page = source.getPage(["manifesto"]);
  if (!page) notFound();
  const MDX = page.data.body;
  return (
    <div className="px-6 py-16">
      <Prose>
        <MDX />
      </Prose>
    </div>
  );
}
```
*(If Fumadocs API differs in current version, use whatever the docs prescribe — the agent should consult the running version's actual API. Goal: render the MDX content inside `<Prose>`.)*

**Step 4:** Build + verify route
```bash
pnpm build 2>&1 | tail -15
```

**Step 5:** Commit
```bash
git add content/manifesto src/app/manifesto src/components/content/prose.tsx
git commit -m "feat(content): add manifesto essay with five constitutional principles"
```

### Task 3.3: Karpathy methodology essay (consumes research 01)

**Files:**
- Create: `content/methodology/karpathy.mdx`
- Create: `src/app/methodology/karpathy/page.tsx`

**Step 1:** Read `docs/research/01-karpathy-methodology.md` (created by background agent). If still missing, use placeholder structure with `[출처 미확인 — 자료조사 진행 중]` markers.

**Step 2:** Write `content/methodology/karpathy.mdx`. Sections (Korean 존댓말):
- 도입: Karpathy가 누구이며 왜 그의 framing이 중요한가
- Software 1.0 / 2.0 / 3.0 — 정의, 출전, 인용
- LLM as Operating System — Intro to LLMs talk, CPU/RAM/peripheral 비유, 하네스 설계와의 매핑
- Vibe coding의 진짜 의미 — Karpathy의 원래 의도와, 진지한 하네스가 어떻게 그것을 넘어서는가
- nanoGPT의 미학 — 단일 파일, 해킹 가능, 교육적
- 사이트의 다음 글: ralph loop, eval-driven, context engineering

각 주장 뒤에 footnote 또는 inline link로 출처 URL.

**Step 3:** Add page route (mirrors Task 3.2)

**Step 4:** Commit
```bash
git add content/methodology src/app/methodology
git commit -m "feat(content): add Karpathy methodology essay (sourced from research 01)"
```

### Task 3.4: Methodology placeholder pages

**Files:**
- Create: `content/methodology/{ralph-loop,eval-driven,context-engineering,agent-teams,self-improving-systems}.mdx`
- Create: `src/app/methodology/[slug]/page.tsx` (dynamic)

**Step 1:** Each MDX has frontmatter + 3-paragraph intro + `[자료조사 진행 중]` callout linking to the research files.

**Step 2:** Dynamic route uses `source.getPage([slug])`

**Step 3:** Commit
```bash
git commit -am "feat(content): add methodology placeholder pages with research links"
```

### Task 3.5: Manifesto sub-pages (what-ai-actually-is, why-harness-exists, realistic-trajectory)

**Files:**
- Create: `content/manifesto/{what-ai-actually-is,why-harness-exists,realistic-trajectory}.mdx`

**Step 1:** Write each as 1-page essay using research 06 (AI substrate). If research not yet ready, use placeholder structure with `[자료조사 진행 중]` markers.

**Step 2:** Commit
```bash
git commit -am "feat(content): add manifesto sub-essays"
```

### Task 3.6: Push track-content branch

```bash
pnpm build 2>&1 | tail -10
git push -u origin track/content
```

---

## Phase 4 — Track C: Catalog (parallel, in `wt-catalog` worktree)

> Run inside `/Users/usermackbookpro/innogrid-prj/agentic-coding-harness-catalog/`. Touches only `data/catalog/**`, `src/components/catalog/**`, `src/app/catalog/**`, `scripts/**`.

### Task 4.1: Inventory data builder script

**Files:**
- Create: `scripts/build-catalog.ts`
- Create: `data/catalog/skills.json`, `data/catalog/agents.json`, `data/catalog/hooks.json`, `data/catalog/rules.json`

**Step 1:** Write a Node TS script that scans `/Users/usermackbookpro/innogrid-prj/kotlin-codex/.claude/skills/*/SKILL.md` and `/Users/usermackbookpro/innogrid-prj/kotlin-codex/.agents/skills/*/SKILL.md`, parses YAML frontmatter, and emits JSON. Same for agents (`.claude/agents/*.md`, `.codex/agents/*.toml`), hooks (`.claude/settings.json` hooks, `.codex/hooks.json`), and permissions/rules (`.claude/settings.json` permissions, `.codex/rules/default.rules`, `.claude/rules/*.md`).

The script reads from the kotlin-codex repo path passed as first arg, falling back to `/Users/usermackbookpro/innogrid-prj/kotlin-codex`.

**Step 2:** Add `pnpm catalog:build` script in `package.json`:
```json
"catalog:build": "tsx scripts/build-catalog.ts /Users/usermackbookpro/innogrid-prj/kotlin-codex"
```
Add `tsx` as dev dep: `pnpm add -D tsx js-yaml @types/js-yaml @iarna/toml`

**Step 3:** Run it
```bash
pnpm catalog:build
ls -la data/catalog/
```
Expected: 4 JSON files with non-empty arrays.

**Step 4:** Commit
```bash
git add scripts data/catalog package.json pnpm-lock.yaml
git commit -m "feat(catalog): add inventory builder script and generated JSON"
```

### Task 4.2: Catalog card components

**Files:**
- Create: `src/components/catalog/skill-card.tsx`
- Create: `src/components/catalog/catalog-grid.tsx`
- Create: `src/components/catalog/filter-bar.tsx`

**Step 1:** SkillCard — monospace title, description, tags, hover Innogrid blue border, `→` arrow.

**Step 2:** CatalogGrid — responsive grid, accepts filtered items.

**Step 3:** FilterBar — search input + tag filter chips, controlled component.

**Step 4:** Commit
```bash
git commit -am "feat(catalog): add SkillCard, CatalogGrid, FilterBar components"
```

### Task 4.3: Catalog routes

**Files:**
- Create: `src/app/catalog/skills/page.tsx`
- Create: `src/app/catalog/agents/page.tsx`
- Create: `src/app/catalog/hooks/page.tsx`
- Create: `src/app/catalog/rules/page.tsx`
- Create: `src/app/catalog/layout.tsx` (sidebar with category nav)

**Step 1:** Each page imports its JSON and renders `<CatalogGrid items={...} />` with `<FilterBar />`.

**Step 2:** Layout shows the four category links sticky on the left.

**Step 3:** Build + verify all routes pre-render
```bash
pnpm build 2>&1 | tail -15
```

**Step 4:** Commit
```bash
git commit -am "feat(catalog): add skills/agents/hooks/rules catalog pages"
```

### Task 4.4: Detail pages

**Files:**
- Create: `src/app/catalog/[type]/[slug]/page.tsx`

**Step 1:** Dynamic route reads the matching JSON record by slug, renders title, description, source file path, and the full skill/agent/hook/rule body in a `<CodeBlock>`.

**Step 2:** generateStaticParams for SSG.

**Step 3:** Commit
```bash
git commit -am "feat(catalog): add catalog detail pages with full source view"
```

### Task 4.5: Push track-catalog branch

```bash
pnpm build 2>&1 | tail -10
git push -u origin track/catalog
```

---

## Phase 5 — Track D: Architecture (parallel, in `wt-architecture` worktree)

> Run inside `/Users/usermackbookpro/innogrid-prj/agentic-coding-harness-architecture/`. Touches only `src/components/diagrams/**`, `src/app/architecture/**`, `src/lib/mermaid.tsx`.

### Task 5.1: Mermaid SSR-safe wrapper

**Files:**
- Create: `src/components/diagrams/mermaid-diagram.tsx`

**Step 1:** Client component that lazy-loads mermaid, renders SVG into a div.

**Step 2:** Commit
```bash
git add src/components/diagrams/mermaid-diagram.tsx
git commit -m "feat(diagrams): add SSR-safe Mermaid wrapper"
```

### Task 5.2: HarnessLayer 5-layer signature diagram

**Files:**
- Create: `src/components/diagrams/harness-layer.tsx`

**Step 1:** A custom SVG component (no mermaid for this one — handcrafted for sharper visual). 5 stacked horizontal bars: Skills / Agents / Rules / Hooks / Sandbox. Each bar has a click target that opens a side panel with description and a code snippet. Uses Innogrid blue accent for the active layer.

**Step 2:** Commit

### Task 5.3: Architecture overview page

**Files:**
- Create: `src/app/architecture/overview/page.tsx`

**Step 1:** Composes EditorialHero-lite + HarnessLayerDiagram + paragraphs explaining each layer.

**Step 2:** Commit

### Task 5.4: Claude vs Codex comparison page

**Files:**
- Create: `src/app/architecture/claude-vs-codex/page.tsx`
- Create: `src/components/diagrams/comparison-table.tsx`
- Create: `data/comparison/claude-vs-codex.json` (sourced from research files; placeholder if missing)

**Step 1:** Comparison data structure: rows = feature category, columns = Claude / Codex / shared concept.

**Step 2:** Sticky-header table with diff highlights.

**Step 3:** Page composes intro paragraph + table + footnotes.

**Step 4:** Commit + push
```bash
pnpm build 2>&1 | tail -10
git commit -am "feat(architecture): add overview, harness layer diagram, and Claude vs Codex comparison"
git push -u origin track/architecture
```

---

## Phase 6 — Integration & Deployment

### Task 6.1: Merge tracks back to main

**Files:** none (git only)

**Step 1:** Switch to main worktree
```bash
cd /Users/usermackbookpro/innogrid-prj/agentic-coding-harness
git fetch --all
```

**Step 2:** Merge each track (fast-forward where possible)
```bash
git merge --no-ff origin/track/content -m "merge: track/content"
git merge --no-ff origin/track/catalog -m "merge: track/catalog"
git merge --no-ff origin/track/architecture -m "merge: track/architecture"
```

If conflicts, resolve in favor of preserving each track's owned files; use the boundary rules in the design doc.

**Step 3:** Verify build still passes
```bash
pnpm install
pnpm build 2>&1 | tail -20
```
Expected: success.

### Task 6.2: Pre-deploy verification

**Files:** none

**Step 1:** Lint
```bash
pnpm lint
```

**Step 2:** Type check
```bash
pnpm exec tsc --noEmit 2>&1 | tail -20
```

**Step 3:** Build
```bash
pnpm build
```

**Step 4:** Local smoke test
```bash
pnpm start &
sleep 5
for path in / /manifesto /methodology/karpathy /architecture/overview /catalog/skills /catalog/agents /catalog/hooks /catalog/rules; do
  printf "%-40s " "$path"
  curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000$path"
done
kill %1 2>/dev/null || true
```
Expected: every path returns `200`.

### Task 6.3: Push and deploy

**Step 1:** Final push
```bash
git push origin main
```

**Step 2:** Vercel deploy options:
- **(A) GitHub integration**: user opens https://vercel.com/new, imports `sw-woo/aiagentic-coding-harness`, accepts defaults, clicks Deploy. (Recommended.)
- **(B) Vercel CLI** (if logged in):
  ```bash
  vercel link --yes --project agentic-coding-harness
  vercel --prod --yes
  ```

**Step 3:** Capture live URL and verify
```bash
curl -s -o /dev/null -w "%{http_code}\n" <LIVE_URL>
```

### Task 6.4: Worktree cleanup

```bash
git worktree remove ../agentic-coding-harness-content
git worktree remove ../agentic-coding-harness-catalog
git worktree remove ../agentic-coding-harness-architecture
git branch -d track/content track/catalog track/architecture
```

### Task 6.5: Update README

**Files:**
- Create: `README.md`

**Step 1:** Short README pointing to live URL, the design doc, the implementation plan, and how to develop locally.

**Step 2:** Commit + push
```bash
git add README.md
git commit -m "docs: add project README pointing to live site and plans"
git push origin main
```

---

## Definition of Done (오늘 배포)

- [ ] `https://github.com/sw-woo/aiagentic-coding-harness` main에 모든 트랙 머지 완료
- [ ] `pnpm build` 무경고 통과
- [ ] `pnpm lint` 통과
- [ ] `tsc --noEmit` 통과
- [ ] 12개 페이지 모두 200 응답
- [ ] Vercel preview URL이 살아 있음
- [ ] 한글 본문이 모두 존댓말
- [ ] 모든 사실 주장에 출처 또는 `[출처 미확인]` 마커
- [ ] 다크 모드 기본, 라이트 토글 동작
- [ ] Innogrid `#0042FF` 액센트가 실제 화면에 적용

---

## Execution Handoff

**Plan complete and saved to `docs/plans/2026-04-07-agentic-harness-showcase-plan.md`. Two execution options:**

**1. Subagent-Driven (this session)** — I dispatch a fresh subagent per task on main, then for Phase 3-5 I create worktrees and dispatch one parallel agent per track, reviewing between tasks.

**2. Parallel Session (separate)** — User opens new sessions in each worktree and runs `superpowers:executing-plans` independently.

**Recommendation given the today deadline: Option 1 (Subagent-Driven, this session)**, with parallel agents for Phases 3-5 once Phase 0-1 foundation is committed.
