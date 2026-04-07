---
glob:
  - "src/app/globals.css"
  - "src/components/**/*.tsx"
  - "src/app/**/*.tsx"
---

# 디자인 시스템 규칙

## 색상 (Innogrid CI)

출처: https://www.innogrid.com/pr/ci

**절대 사용할 토큰**:

- Primary accent: `var(--color-accent)` = `#0042FF` (Innogrid Deep Blue)
- Secondary accent: `var(--color-accent-2)` = `#68CAFF` (Innogrid Light Cyan)
- Background: `var(--color-background)` — 다크 `#0a0a0a`, 라이트 `#fafafa`
- Surface: `var(--color-surface)` — 다크 `#18181b`, 라이트 `#ffffff`
- Foreground: `var(--color-foreground)` — 다크 `#fafafa`, 라이트 `#0a0a0a`
- Foreground muted: `var(--color-foreground-muted)` — 다크 `#a1a1aa`
- Foreground subtle: `var(--color-foreground-subtle)` — 다크 `#71717a`
- Border: `var(--color-border)`
- Danger / Success / Info: `var(--color-danger)` / `--color-success)` / `--color-info`

**Tailwind 클래스는 semantic 토큰을 사용하십시오**: `bg-background`, `text-foreground`,
`border-border`, `bg-surface`, `text-foreground-muted`, `text-accent`, `text-accent-2`, `text-danger`,
`text-success`. 이 클래스들은 `@theme inline` 블록이 자동으로 토큰에 매핑합니다.

## 금지 사항 (Anti-Patterns)

이 사이트에 **절대 나타나지 말아야 할 것**:

- ❌ Purple / blue / violet gradient hero (AI 사이트 클리셰)
- ❌ Glow blobs, mesh gradient background
- ❌ Floating particles, parallax hero
- ❌ Emoji 를 구조 아이콘으로 사용 (lucide-react 만 사용)
- ❌ Stock 3D 일러스트
- ❌ "Powered by AI" badge
- ❌ Glassmorphism overload
- ❌ 생성형 SaaS 중앙 정렬 거대 gradient text
- ❌ 원색 primary (#0000FF, #FF0000) — Innogrid 토큰만
- ❌ 임의의 hex 색상 코드 — 반드시 토큰 사용

## 타이포그래피

- Sans (UI / headings): **Geist Sans** — `var(--font-geist-sans)` / `font-sans`
- Mono (code / metadata): **Geist Mono** — `var(--font-geist-mono)` / `font-mono`
- Serif (long-form essays): **Newsreader** — `var(--font-newsreader)` / `font-serif`

**스케일** (8px rhythm): `12 / 14 / 16 / 18 / 20 / 24 / 32 / 48 / 64`
**Line-height**: 본문 `leading-7` / `leading-8` (에세이), `leading-6` (UI)
**Measure**: 에세이 `max-w-[68ch]`, 기본 docs `max-w-[80ch]`

## 아이콘

- 오직 `lucide-react` 만 사용합니다: `import { Sun, Moon, ArrowRight } from "lucide-react"`
- 다른 아이콘 라이브러리 설치 금지 (Heroicons, Feather, Material Icons 등)
- Emoji 는 구조적 아이콘으로 사용 금지. 본문에 장식용으로 쓰는 것은 허용 (드물게).

## 레이아웃

- Max width: `max-w-7xl` (1280px) 또는 `max-w-[68ch]` (에세이)
- Gutter: `px-4 sm:px-6`
- 카드: `rounded-xl border border-border bg-surface p-5` (기본), `rounded-2xl` (큰 섹션)
- Hover: `hover:border-accent` (주된 패턴), `hover:bg-surface-2` (보조)
- 모션: `transition` (150-250ms ease-out 기본), 모바일에서 `prefers-reduced-motion` 존중

## 다크 / 라이트 모드

- 다크가 기본입니다. `next-themes` 의 `defaultTheme="dark"`
- 라이트 토글 제공 (`src/components/nav/theme-toggle.tsx`)
- 두 모드 모두 Innogrid accent `#0042FF` 는 그대로 유지

## 금지된 외부 asset 소스

- Unsplash, Pexels 같은 stock photo 삽입 금지
- 로고 / 브랜드 이미지 외의 외부 raster 이미지 삽입 금지
- 외부 CDN 에서 실시간 이미지 fetch 금지 (Next.js 이미지 최적화 우회 방지)

## 검증 방법

- 빌드 통과: `pnpm build`
- 수동 시각 확인: `pnpm dev` 후 http://localhost:3000 에서 다크/라이트 토글
- `/handbook` 페이지의 다이어그램이 모바일에서 깨지지 않는지 확인
