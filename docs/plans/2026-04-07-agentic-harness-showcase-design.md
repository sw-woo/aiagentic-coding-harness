# Agentic Coding Harness Showcase — Design Doc

**날짜**: 2026-04-07
**저장소**: https://github.com/sw-woo/aiagentic-coding-harness
**작성자**: Claude (brainstorming session, user-approved)
**상태**: Approved — 즉시 implementation 진행

---

## 1. 목표

- Vercel에 오늘 안에 배포되는 정보 공유 사이트
- "agentic coding harness"에 대한 학습 가이드 + 살아있는 레퍼런스 카탈로그를 한 곳에 통합
- Andrej Karpathy 등 최신 방법론을 사실 기반으로 정리해 한국어 존댓말로 제공
- 사이트 자체가 자기 자신의 살아있는 예시(meta) — 사이트를 만든 하네스가 카탈로그에 들어 있음
- 회사(Innogrid) CI 컬러를 시각 정체성에 반영해 사내·대외 공유에 일관된 브랜드 톤 유지

## 2. 콘텐츠 원칙 (Content Constitution — 변경 불가)

1. **No fabrication** — 모든 사실 주장에는 출처 URL 또는 1차 자료. 출처 없으면 `[출처 미확인]` 마커 명시.
2. **모든 산문은 존댓말** — 한국어 콘텐츠는 평어가 아닌 존댓말로 통일.
3. **AI는 인격체가 아닌 계산입니다** — 모든 essay는 LLM을 "행렬 곱셈 + 어텐션 + 그래디언트 디센트 + 토큰 시퀀스 위의 확률분포 + 그것을 빠르게 만드는 하드웨어"로 정의하는 톤을 유지합니다.
4. **속도와 스케일이 본질적 변수입니다** — TPU 세대, 컴퓨트 클러스터 크기, 모델 파라미터, 학습 토큰량 같은 측정 가능한 변수로 "지금 어디까지 왔는지"를 표현합니다.
5. **미래 예측은 사실 기반으로만** — METR의 task 길이 두 배 증가 연구, Epoch AI 컴퓨트 추정, Dario Amodei "Machines of Loving Grace" 같은 출처 있는 자료만 인용합니다.

## 3. 시각 디자인 시스템

### 3.1 컨셉
**Research Engineering** — Distill.pub / Anthropic Research의 연구 노트북 미학(serif essays + sidenote)과 Vercel/Linear/Inkeep의 엔지니어링 에디토리얼(sharp sans + monospace metadata + 고대비)을 의도적으로 혼합. essay 페이지는 long-form 연구 노트, catalog 페이지는 엔지니어링 콘솔처럼 보이게 하여 단일 컬러 시스템과 grid로 묶음.

### 3.2 컬러 — Innogrid CI 기반
출처: https://www.innogrid.com/pr/ci

| Token | 값 | 용도 |
|---|---|---|
| `bg` | `#0a0a0a` (zinc-950) | 페이지 배경 (다크 기본) |
| `surface` | `#18181b` (zinc-900) | 카드, 사이드바 |
| `surface-2` | `#27272a` (zinc-800) | hover, code block |
| `border` | `#3f3f46` (zinc-700) | 보더 |
| `fg` | `#fafafa` (zinc-50) | 본문 |
| `fg-muted` | `#a1a1aa` (zinc-400) | 메타데이터 |
| `fg-subtle` | `#71717a` (zinc-500) | 캡션 |
| **`accent`** | **`#0042FF`** (Innogrid Deep Blue) | 링크, primary CTA, 활성 nav, 강조 |
| **`accent-2`** | **`#68CAFF`** (Innogrid Light Cyan) | hover 상태, secondary highlight |
| `danger` | `#f87171` (red-400) | forbidden rules, danger blocks |
| `success` | `#34d399` (emerald-400) | allow rules, OK 상태 |
| `info` | `#60a5fa` (blue-400) | 보조 (드물게) |

라이트 모드는 같은 토큰명, 값만 swap. accent는 라이트 모드에서도 `#0042FF` 유지(대비 충분), accent-2는 `#0066CC`로 약간 어둡게.

### 3.3 타이포그래피 — Triple System

| 역할 | 폰트 | 이유 |
|---|---|---|
| Display + Headings | **Geist Sans** (Vercel) | sharp, geometric, 엔지니어링 정체성 |
| Long-form 본문 (essays) | **Newsreader** (Google Fonts variable) | research notebook 톤 |
| Monospace | **Geist Mono** | code, file path, agent name, KBD chips |

스케일: `12 / 14 / 16 / 18 / 20 / 24 / 32 / 48 / 64`
Line-height: 본문 1.7 (essays), 1.6 (docs), 1.4 (UI)
Measure: 본문 max 68ch (Newsreader), docs 80ch (Geist Sans)

### 3.4 안티 패턴 (절대 안 함)
- ❌ purple/blue/violet AI 그라디언트 hero (단, Innogrid blue는 OK — 그라디언트 X, solid 사용)
- ❌ 이모지 아이콘 (Lucide만)
- ❌ glassmorphism 과용
- ❌ floating 3D blob, mesh gradient background
- ❌ "Powered by AI" 배지
- ❌ 자동 carousel
- ❌ 일반 SaaS 클리셰

## 4. 정보 구조 (사이트 맵)

```
/                                    랜딩 (editorial hero)
├── /manifesto                       선언문 (콘텐츠 원칙 5가지 + AI=계산 framing)
│   ├── /what-ai-actually-is         AI = 계산, 인격체 아님
│   ├── /why-harness-exists          paperclip maximizer → sandbox 답
│   └── /realistic-trajectory        TPU/compute/self-improving 사실 기반 예측
├── /methodology
│   ├── /karpathy                    Software 1.0/2.0/3.0, LLM OS, vibe coding
│   ├── /ralph-loop                  Geoffrey Huntley wiretap loop
│   ├── /eval-driven                 EDD (Hamel Husain 등)
│   ├── /context-engineering         context window 관리
│   ├── /agent-teams                 멀티 에이전트 오케스트레이션 현황
│   └── /self-improving-systems      AutoML → DSPy → AI Scientist
├── /architecture
│   ├── /overview                    5-layer 인터랙티브 다이어그램
│   ├── /claude-vs-codex             사실 기반 비교
│   └── /kotlin-aiops-case           본 저장소를 케이스 스터디로
├── /catalog
│   ├── /skills                      filterable grid
│   ├── /agents                      filterable grid
│   ├── /hooks                       filterable grid + 위험도 표시
│   └── /rules                       exec policy / permissions catalog
├── /playbook
│   ├── /setup-claude-code
│   ├── /setup-codex
│   ├── /verification-loops
│   └── /deployment-vercel           이 사이트를 어떻게 만들었는지 (메타)
└── /reference
    ├── /glossary
    └── /links                       공식 문서 + 논문 + 블로그
```

## 5. 기술 스택

| 영역 | 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router, RSC, Turbopack) |
| 문서 프레임워크 | Fumadocs |
| UI 컴포넌트 | shadcn/ui (Radix + Tailwind) |
| 스타일링 | Tailwind CSS v4 |
| MDX | @next/mdx + Shiki (syntax highlight) |
| 다이어그램 | Mermaid (SSR-safe wrapper) |
| 폰트 | next/font + Geist Sans/Mono + Newsreader |
| 검색 | cmdk (⌘K command palette) |
| 페이지 전환 | View Transitions API |
| 패키지 매니저 | pnpm |
| 배포 | Vercel (zero-config + auto preview on push) |

## 6. 핵심 컴포넌트

shadcn/ui:
- Button, Card, Badge, Tabs, Sheet, Dialog, DropdownMenu, Tooltip, Input, Combobox
- CommandPalette (cmdk)

커스텀:
- `NavBar` (sticky, backdrop-blur, theme toggle, ⌘K trigger)
- `EditorialHero` (랜딩)
- `SkillCard` / `AgentCard` / `HookCard` / `RuleCard`
- `CatalogGrid` (filterable, search)
- `CodeBlock` (Shiki, filename header, copy, line highlight)
- `Callout` (note / warning / danger / tip — serif body)
- `Sidenote` (Tufte 마진 노트)
- `MermaidDiagram` (SSR-safe)
- `KbdChip`
- `HarnessLayerDiagram` (시그니처 인터랙티브)
- `ComparisonTable`
- `Footer`

## 7. MVP 범위 (오늘 배포)

오늘 반드시 배포되는 페이지:

```
/                              ← 랜딩
/manifesto                     ← 콘텐츠 원칙 + AI=계산 framing
/manifesto/what-ai-actually-is ← (research 06번 결과 들어오는 대로 연결)
/methodology/karpathy          ← (research 01번 결과 연결)
/architecture/overview         ← 5-layer 다이어그램
/architecture/claude-vs-codex  ← 사실 기반 비교
/catalog/skills                ← kotlin-codex 인벤토리 자동 생성 (research 05)
/catalog/agents                ← 동일
/catalog/hooks                 ← 동일
/catalog/rules                 ← 동일
/playbook/setup-claude-code    ← 짧은 가이드
/playbook/setup-codex          ← 짧은 가이드
```

자료조사 결과가 배포 전에 들어오지 않은 페이지는 placeholder + `[출처 미확인 — 자료조사 진행 중]` 마커로 배포 후 점진적으로 채웁니다.

**Phase 2 (오늘 이후, git push만으로 자동 재배포)**:
- 나머지 essay 9편
- `/catalog/prompts`, `/reference/glossary`, `/reference/links`
- 검색 고도화, View Transitions, 다이어그램 인터랙션 고도화

## 8. 병렬 개발 전략 — git worktree 4 트랙

| 트랙 | worktree | 책임 영역 | 의존성 |
|---|---|---|---|
| **A. 파운데이션** | `wt-foundation` | scaffold, design tokens, fonts, layout, nav, footer, shadcn 기본, 다크모드 | 없음 (먼저 완료) |
| **B. 콘텐츠 (essays)** | `wt-content` | `content/**/*.mdx` 파일만 | A 완료 후 |
| **C. 카탈로그 시스템** | `wt-catalog` | `data/catalog/*.json` (kotlin-codex 인벤토리에서 빌드), `components/catalog/*`, `app/catalog/[type]/page.tsx`, `scripts/build-catalog.ts` | A 완료 후 (research 05도 필요) |
| **D. 아키텍처 + 비교 페이지** | `wt-architecture` | `components/diagrams/*`, `app/architecture/*`, mermaid wrapper | A 완료 후 |

### 디렉터리 boundaries (충돌 방지)
A 트랙은 다음 파일만 만지고, 다른 트랙은 절대 건드리지 않는 것을 약속:
- `package.json`, `pnpm-lock.yaml`, `next.config.mjs`, `tailwind.config.*`, `tsconfig.json`, `postcss.config.*`
- `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- `components/ui/**` (shadcn), `components/nav/**`, `components/footer/**`
- `lib/fonts.ts`, `lib/utils.ts`, `lib/theme.ts`

B 트랙은 `content/**` 만 만짐.
C 트랙은 `data/catalog/**`, `components/catalog/**`, `app/catalog/**`, `scripts/build-catalog.ts` 만 만짐.
D 트랙은 `components/diagrams/**`, `app/architecture/**`, `lib/mermaid.tsx` 만 만짐.

각 트랙 완료 시 main으로 fast-forward merge.

## 9. 자료조사 의존성

다음 4개 background research agent가 현재 동시 진행 중이며, 결과는 트랙별로 흡수됩니다:

| Research file | 어디로 들어가나 | 트랙 |
|---|---|---|
| `01-karpathy-methodology.md` | `/methodology/karpathy` essay | B |
| `02-agentic-patterns.md` | `/methodology/*` essays | B |
| `06-ai-substrate-trends.md` | `/manifesto/*` essays | B |
| `05-kotlin-codex-inventory.md` | `data/catalog/*.json` 자동 생성 입력 | C |

자료조사가 늦으면 B/C 트랙은 placeholder MDX로 먼저 배포하고 push만으로 갱신합니다.

## 10. 검증 (오늘 배포 전 필수)

- `pnpm build` 성공 (turbopack)
- `pnpm lint` 통과
- `pnpm typecheck` 통과
- 첫 화면 Lighthouse 모바일 90+ (Performance/Accessibility/Best Practices/SEO)
- 다크/라이트 토글 동작
- ⌘K 검색 동작 (최소 페이지 점프)
- 모든 페이지가 빌드 시점에 prerender (RSC)
- Vercel preview URL 정상 응답

## 11. 배포

- GitHub repo: https://github.com/sw-woo/aiagentic-coding-harness
- Vercel 연결: `vercel link --yes` → `vercel --prod` 또는 GitHub 연동(자동)
- 사용자 분기 결정: Vercel CLI로 처음 배포(claude가 토큰 있으면) 또는 사용자가 Vercel 대시보드에서 Import (가장 안전)

## 12. 후속 조치

- `MEMORY.md`에 이번 세션에서 배운 패턴 추가:
  - codex:codex-rescue background mode가 detach killed 되는 이슈 → 같은 세션 내 general-purpose Agent를 쓰는 패턴
  - Innogrid 공식 CI 컬러 (#0042FF / #68CAFF) 정보
- 사이트가 살아 있는 동안 새 essay/skill/hook을 git push로 계속 추가

---

**End of design doc.**
