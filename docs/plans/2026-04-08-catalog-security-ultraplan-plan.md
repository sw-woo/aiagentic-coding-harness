# Catalog Security + Token Economics + Ultraplan Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add 4 new `/reference/*` pages (zero-trust-plugins, agent-sandboxing, token-economics, ultraplan), 17 catalog items, 1 React diagram component, and light updates to existing pages — all sourced and live on Vercel within 4 hours.

**Architecture:** Research-first parallel execution. Dispatch 12 source categories to parallel agents in Phase 0, then build pages bottom-up as research lands. Each page is a Server Component .tsx file under `src/app/reference/<slug>/page.tsx` following the same structure as the existing 14 reference pages. Catalog additions go to `data/catalog/{skills,agents,hooks,rules}.json` and are auto-rendered by the existing `CatalogPageShell`. The new diagram is a self-contained React component under `src/components/diagrams/`.

**Tech Stack:** Next.js 16 App Router · React Server Components · Tailwind v4 · Geist Sans/Mono + Newsreader · Innogrid `#0042FF` design tokens · light theme default · Vercel auto-deploy on `main` push.

**Reference design doc:** `docs/plans/2026-04-08-catalog-security-ultraplan-design.md` (commits `b5c77c6`, `57dcd15`, `9cfb4e4`).

---

## Time Budget (4 hours total)

| 시간 | Phase | 작업 |
|---|---|---|
| 0:00 ~ 0:25 | Phase 0 + Phase 1 | 자료조사 dispatch + 카탈로그 JSON 보강 |
| 0:25 ~ 1:05 | Phase 2 | `/reference/zero-trust-plugins` |
| 1:05 ~ 1:35 | Phase 3 | `/reference/agent-sandboxing` |
| 1:35 ~ 2:10 | Phase 4 | `/reference/token-economics` |
| 2:10 ~ 2:35 | Phase 5 | `/reference/ultraplan` |
| 2:35 ~ 2:50 | Phase 6 | `<ZeroTrustPipeline />` 컴포넌트 |
| 2:50 ~ 3:05 | Phase 7 | 기존 페이지 가벼운 보강 |
| 3:05 ~ 3:20 | Phase 8 | 빌드 + lint + verify |
| 3:20 ~ 3:30 | Phase 9 | commit + push + Vercel 확인 |
| 3:30 ~ 4:00 | 버퍼 | 30분 (수정 / 사용자 점검) |

---

## Escalation triggers (시간 초과 시 자동 축소)

각 마일스톤 종료 시 진행률이 plan 보다 30% 이상 뒤처지면 다음 순서로 축소합니다.

1. `/reference/ultraplan` 을 stub 으로 축소 (검증 부족 시 자연 축소)
2. `<ZeroTrustPipeline />` 을 단순 ordered list 카드로 대체
3. `/reference/token-economics` 의 §6 운영 원칙 단락 축소
4. 카탈로그 17 → 10개로 축소 (rules 5 → 3, hooks 4 → 2, skills 3 → 1)
5. Phase 7 (`/handbook` + `/architecture/claude-vs-codex` 보강) 다음 세션으로 미룸

---

## Phase 0: Setup + Parallel Research Dispatch

### Task 0.1: Verify clean working tree

```bash
git status
```

Expected: `nothing to commit, working tree clean` (디자인 doc commit 직후 상태).
실패 시: 무엇이 dirty 한지 확인하고 의도된 변경인지 검증한 뒤 진행.

### Task 0.2: Dispatch parallel research agents

Use `superpowers:dispatching-parallel-agents` skill. Dispatch 5~8 background agents covering 12 source categories. Each agent writes its result to `docs/research/2026-04-08-<topic>.md`.

**Source categories (12개):**

| # | Topic | Output file | Primary sources |
|---|---|---|---|
| A | Vercel Sandbox 사실관계 + 코드 예시 | `docs/research/2026-04-08-vercel-sandbox.md` | https://vercel.com/docs/sandbox, vercel-sandbox SDK npm page |
| B | NVIDIA NeMo Guardrails | `docs/research/2026-04-08-nemo-guardrails.md` | https://docs.nvidia.com/nemo/guardrails/, GitHub `NVIDIA/NeMo-Guardrails` |
| C | Meta Llama Guard 모델군 | `docs/research/2026-04-08-llama-guard.md` | https://llama.meta.com/trust-and-safety, HF `meta-llama/Llama-Guard-3-8B` |
| D | Meta Prompt Guard | `docs/research/2026-04-08-prompt-guard.md` | HF `meta-llama/Prompt-Guard-86M` |
| E | 도구 오염 / 간접 프롬프트 인젝션 | `docs/research/2026-04-08-tool-poisoning.md` | Simon Willison "Prompt injection" 시리즈, Anthropic safety, Microsoft Threat Intel "Skeleton Key", Lakera 블로그 |
| F | isolated-vm | `docs/research/2026-04-08-isolated-vm.md` | https://github.com/laverdet/isolated-vm |
| G | gVisor + E2B | `docs/research/2026-04-08-gvisor-e2b.md` | https://gvisor.dev, https://e2b.dev/docs |
| H | **Claude Code `/ultraplan`** | `docs/research/2026-04-08-ultraplan.md` | Anthropic Claude Code changelog, https://docs.anthropic.com/en/docs/claude-code, X/Twitter announcements, reddit/HN. **반드시 사실/출처미확인/커뮤니티추정 셋으로 분류** |
| I | RTK (Rust Token Killer) | `docs/research/2026-04-08-rtk.md` | GitHub rust-token-killer, 사용자 환경 `~/.claude/RTK.md` 가이드 |
| J | Anthropic prompt caching | `docs/research/2026-04-08-anthropic-caching.md` | https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching |
| K | OpenAI prompt caching | `docs/research/2026-04-08-openai-caching.md` | https://platform.openai.com/docs/guides/prompt-caching |
| L | LLM observability vendors | `docs/research/2026-04-08-observability.md` | helicone.ai, smith.langchain.com, phoenix.arize.com 공식 |

**Dispatch 패턴 (parallel-agents skill 따라):**

각 agent 에 다음 입력을 줍니다:
- 좁은 scope (1~2개 카테고리만)
- 출력 파일 경로 (위 표)
- 사실 검증 규칙: 모든 주장에 출처 URL 또는 `[출처 미확인]` 마커 필수
- 출력 형식: markdown 헤딩 + 본문 + 출처 섹션
- 최대 길이 ~500줄
- "코드 예시는 공식 docs 의 예시 그대로 인용. 새로 작성 금지"

5~8개 agent 를 한 번의 메시지에서 동시 dispatch (skill 가이드).

**Run in background:** 모든 agent 가 background 로 돌아가 Phase 1 을 동시에 진행할 수 있게 합니다.

### Task 0.3: Update task list

`TaskCreate` 로 다음 새 task 들 생성 (Phase 1~9 추적용):

- "Phase 1: Catalog JSON 17개 항목 추가"
- "Phase 2: /reference/zero-trust-plugins 작성"
- "Phase 3: /reference/agent-sandboxing 작성"
- "Phase 4: /reference/token-economics 작성"
- "Phase 5: /reference/ultraplan 작성 (검증된 만큼만)"
- "Phase 6: ZeroTrustPipeline 다이어그램 컴포넌트"
- "Phase 7: 기존 페이지 가벼운 보강"
- "Phase 8: 빌드 검증"
- "Phase 9: commit + push + Vercel 확인"

---

## Phase 1: Catalog JSON 17개 항목 추가

자료조사 결과를 기다리지 않고 시작합니다. 사용자 메시지 + Vercel Sandbox 스킬에서 이미 확보한 사실로 충분합니다.

### Task 1.1: Read current catalog files

```bash
cat data/catalog/skills.json | python3 -c "import sys, json; d = json.load(sys.stdin); print(f'{len(d[\"items\"])} items')"
cat data/catalog/agents.json | python3 -c "import sys, json; d = json.load(sys.stdin); print(f'{len(d[\"items\"])} items')"
cat data/catalog/hooks.json | python3 -c "import sys, json; d = json.load(sys.stdin); print(f'{len(d[\"items\"])} items')"
cat data/catalog/rules.json | python3 -c "import sys, json; d = json.load(sys.stdin); print(f'{len(d[\"items\"])} items')"
```

Expected: 15 / 10 / 6 / 33 (현재 baseline 확인).

### Task 1.2: Inspect existing item shape

```bash
python3 -c "import json; d = json.load(open('data/catalog/skills.json')); print(json.dumps(d['items'][0], indent=2, ensure_ascii=False))"
python3 -c "import json; d = json.load(open('data/catalog/rules.json')); print(json.dumps(d['items'][0], indent=2, ensure_ascii=False))"
```

각 카탈로그의 `items[0]` 구조를 보고 새 항목 schema 맞춥니다. 절대 새로운 필드를 만들지 않고 기존 필드만 사용합니다.

### Task 1.3: Add 5 new rules to data/catalog/rules.json

기존 `items` 배열 끝에 다음 5개 추가. id 는 기존 패턴 따라 (`rule-XXX` 형식).

1. **allowlist-only-mcp-servers** — 검증된 MCP 서버만 등록 (Codex execpolicy + Claude permissions 양쪽)
2. **scoped-credentials** — API 키를 에이전트 컨텍스트에 직접 두지 말고 프록시 경유 (forbidden 패턴)
3. **plugin-signature-verify** — MCP 서버 또는 plugin 설치 전 서명 / 출처 검증
4. **sandbox-only-execution** — 에이전트가 생성한 코드는 sandbox 에서만 실행 (workspace-write 외 금지)
5. **prompt-isolation-boundary** — 외부 컨텐츠와 시스템 프롬프트의 컨텍스트 경계 명시

각 항목은 `decision`, `pattern`, `category`, `platform`, `description` 필드를 채웁니다.

### Task 1.4: Add 4 new hooks to data/catalog/hooks.json

1. **PreToolUse-credential-mask** — Bash 명령에 API 키 패턴이 있으면 마스킹
2. **PostToolUse-sensitive-output-filter** — 도구 출력에서 시크릿 패턴 마스킹
3. **SessionStart-mcp-allowlist-injection** — 세션 시작 시 허용된 MCP 서버 목록 주입
4. **PostToolUse-token-counter** — 도구 호출 직후 토큰 사용량 stderr 에 기록

각 항목은 `event`, `matcher`, `command`, `path`, `platform`, `description` 필드를 채웁니다.

### Task 1.5: Add 2 new agents to data/catalog/agents.json

1. **security-auditor** — 읽기 전용. zero-trust 위반 점검
2. **plugin-isolation-validator** — plugin 설치 전 sandbox / credential 격리 검증

### Task 1.6: Add 4 new skills to data/catalog/skills.json

1. **zero-trust-review** — 신규 plugin / MCP 서버 추가 시 4계층 방어 점검
2. **sandbox-test** — 격리된 환경에서 신규 코드 실행 검증
3. **guardrail-eval** — I/O guardrails 통과율 평가
4. **token-budget-review** — PR 단위 토큰 사용량 측정 + 보고

### Task 1.7: Add 2 more rules (expected count = 17)

Wait — 위의 합계: rules 5 + hooks 4 + agents 2 + skills 4 = **15 항목**.

§11.1 의 17 목표를 맞추려면 추가 2개가 필요합니다:

- rules: **verbose-output-compression** — 긴 stdout 자동 truncate (RTK 패턴)
- rules: **prompt-cache-discipline** — Anthropic / OpenAI prompt caching 키 안정성 (긴 시스템 프롬프트는 변경 금지)

총 = rules 7 + hooks 4 + agents 2 + skills 4 = **17개**. ✓

### Task 1.8: Verify catalog JSON parses

```bash
python3 -c "import json; json.load(open('data/catalog/rules.json'))" && echo OK
python3 -c "import json; json.load(open('data/catalog/hooks.json'))" && echo OK
python3 -c "import json; json.load(open('data/catalog/agents.json'))" && echo OK
python3 -c "import json; json.load(open('data/catalog/skills.json'))" && echo OK
```

Expected: 4 OK 라인.

### Task 1.9: Verify build still passes

```bash
npm run build 2>&1 | tail -10
```

Expected: `Compiled successfully`, exit 0, **41개 정적 페이지** 그대로 (아직 신규 페이지 안 만들었으므로).

### Task 1.10: Commit Phase 1

```bash
git add data/catalog/rules.json data/catalog/hooks.json data/catalog/agents.json data/catalog/skills.json
git -c user.name=sw-woo -c user.email=62142688+sw-woo@users.noreply.github.com commit -m "feat(catalog): add 17 zero-trust + token-economics items

- 7 rules: allowlist-only-mcp-servers, scoped-credentials,
  plugin-signature-verify, sandbox-only-execution,
  prompt-isolation-boundary, verbose-output-compression,
  prompt-cache-discipline
- 4 hooks: PreToolUse credential-mask, PostToolUse sensitive-output-filter,
  SessionStart mcp-allowlist-injection, PostToolUse token-counter
- 2 agents: security-auditor, plugin-isolation-validator
- 4 skills: zero-trust-review, sandbox-test, guardrail-eval,
  token-budget-review

Verified: catalog JSON parses, npm run build green (41 pages stable).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Phase 2: /reference/zero-trust-plugins (umbrella page)

### Task 2.1: Read an existing reference page as template

```bash
wc -l src/app/reference/security-guardrails/page.tsx src/app/reference/mcp-landscape/page.tsx
head -80 src/app/reference/security-guardrails/page.tsx
```

기존 page 의 구조를 그대로 따릅니다 (sticky TOC + 본문 카드 섹션 + Sources). 새로운 패턴 만들지 않습니다.

### Task 2.2: Create page shell

**File:** `src/app/reference/zero-trust-plugins/page.tsx`

페이지 구조:
- `metadata` export (title, description)
- `TOC` 배열 (intro, threat-model, defense-layers, allowlist, sandboxing, credential-proxy, io-guardrails, sources)
- `default function ZeroTrustPluginsPage()` — sticky aside + 본문
- 각 섹션은 `rounded-2xl border bg-surface p-7` 카드
- 한국어 존댓말, 모든 사실 주장에 출처 URL 또는 `[출처 미확인]` 마커

**§intro** — 우산 페이지 목적 (1단락)

**§threat-model** — 도구 오염 + 간접 프롬프트 인젝션 메커니즘
- 출처: research file E (`docs/research/2026-04-08-tool-poisoning.md`) 결과 흡수
- 실제 공격 패턴 1~2개 인용
- "Zero Trust" 원칙의 정의

**§defense-layers** — 4계층 방어 한 페이지 요약 (각 계층 카드 1개)
- `<ZeroTrustPipeline />` 컴포넌트 사용 (Phase 6 에서 만듦. 그 전엔 placeholder div)

**§allowlist** — 허용 목록 패턴 (1단락 + 코드 예시 1개)
- Codex execpolicy + Claude permissions 형태로 양쪽 보여줌

**§sandboxing** — 짧게 (1단락) + `/reference/agent-sandboxing` 으로 deep-link

**§credential-proxy** — Cloudflare AI Gateway / Vercel AI Gateway 짧은 소개 + 코드 예시
- 출처: 공식 docs URL 인용

**§io-guardrails** — NeMo Guardrails / Llama Guard / Prompt Guard 비교 (3단락 짧게)
- 이 페이지 안에 io-guardrails 내용 흡수 (option C 결정 §11.2)
- 출처: research files B, C, D

**§sources** — 모든 출처 URL 한 곳에 모음

### Task 2.3: Verify page builds

```bash
npm run build 2>&1 | tail -10
```

Expected: 42개 페이지 prerendered (41 + 1).

### Task 2.4: Commit Phase 2

```bash
git add src/app/reference/zero-trust-plugins/page.tsx
git -c user.name=sw-woo -c user.email=62142688+sw-woo@users.noreply.github.com commit -m "feat(reference): /reference/zero-trust-plugins umbrella page

[message body]

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```

---

## Phase 3: /reference/agent-sandboxing

### Task 3.1: Create page shell

**File:** `src/app/reference/agent-sandboxing/page.tsx`

구조 (Phase 2 와 동일 패턴):
- TOC: intro, why-isolation, comparison, vercel-sandbox, isolated-vm, gvisor-e2b, when-to-use, sources
- §intro — 왜 격리가 필요한가 (1단락)
- §comparison — 5개 솔루션 비교 표 (Vercel Sandbox, isolated-vm, Docker, gVisor, E2B)
- §vercel-sandbox — Firecracker microVMs, 사용 패턴, 코드 예시 (vercel-sandbox 스킬에서 확보)
- §isolated-vm — V8 isolate 기반, 가벼움, 노드 안 격리. 코드 예시 (research file F)
- §gvisor-e2b — 컨테이너 runtime 보안 (research file G)
- §when-to-use — 시나리오별 권장 (browser automation → Vercel Sandbox, in-process JS → isolated-vm, 등)
- §sources

### Task 3.2: Verify build

```bash
npm run build 2>&1 | tail -10
```

Expected: 43개 페이지.

### Task 3.3: Commit Phase 3

표준 commit 메시지.

---

## Phase 4: /reference/token-economics

### Task 4.1: Create page shell

**File:** `src/app/reference/token-economics/page.tsx`

구조:
- TOC: intro, why-cost, cli-compression, prompt-caching, model-routing, observability, principles, sources
- §why-cost — 토큰 비용이 5~10배 차이날 수 있는 이유 (1~2단락)
- §cli-compression — RTK + git-summary CLI 등. RTK 사용자 환경 검증 가능
  - **RTK 출처**: research file I 가 GitHub 저장소를 찾으면 1차 출처 URL. 못 찾으면 사용자 환경의 `~/.claude/RTK.md` 인용 + `[출처: 사용자 로컬 환경]` 마커
- §prompt-caching — Anthropic + OpenAI prompt caching 비교 (research files J, K)
- §model-routing — 작업 복잡도별 모델 분기 패턴 (cost-aware-llm-pipeline 스킬 참고 가능)
- §observability — Helicone / LangSmith / Phoenix 비교 (research file L)
- §principles — front-load context, parallel small dispatch 등 운영 원칙
- §sources

### Task 4.2: Verify build

Expected: 44개 페이지.

### Task 4.3: Commit Phase 4

---

## Phase 5: /reference/ultraplan

### Task 5.1: Read research result

```bash
cat docs/research/2026-04-08-ultraplan.md
```

Research agent 가 분류한 사실 / 출처 미확인 / 커뮤니티 보고 비율을 봅니다.

### Task 5.2: Decide page depth

| 검증된 사실 양 | 페이지 형태 |
|---|---|
| 풍부함 (5+ 공식 출처) | 정상 페이지 (~400줄, 7~8 섹션) |
| 부분적 (2~3 출처) | 짧은 페이지 (~200줄, 4~5 섹션) + `[출처 미확인]` 단락 |
| 부족 (0~1 출처) | Stub (~80줄): 사용자 보고 요약 + "공식 출처 확인 후 확장 예정" 마커 |

### Task 5.3: Create page

**File:** `src/app/reference/ultraplan/page.tsx`

구조 (검증된 만큼만):
- TOC: intro, what-is, architecture, requirements, use-cases, prompting-tips, sources
- §intro — 1단락 + 검증 상태 명시 (어떤 부분이 사실이고 어떤 부분이 [출처 미확인]인지)
- §what-is — Claude Code 의 클라우드 오프로드 planning. 기본 설명
- §architecture — 4 cloud agents (3 explore + 1 critic) — **사용자 보고 기준, 공식 출처 부족 시 [출처 미확인]**
- §requirements — v2.1.91+, Claude Pro/Max, GitHub 동기화 — **사용자 보고 기준**
- §use-cases — 대규모 마이그레이션 등 — 사용자 보고 + Anthropic 공식 사례 있으면 같이
- §prompting-tips — front-load context, 핵심 파일 경로 명시 — 일반 best practice 라 사실 grounding 가능
- §sources — 검증된 URL 만

### Task 5.4: Verify build

Expected: 45개 페이지.

### Task 5.5: Commit Phase 5

---

## Phase 6: <ZeroTrustPipeline /> diagram component

### Task 6.1: Create component file

**File:** `src/components/diagrams/zero-trust-pipeline.tsx`

```tsx
/**
 * Zero Trust 파이프라인 다이어그램.
 * 6단계: Plugin → Allowlist → Sandbox → Credential Proxy → I/O Guardrail → Result
 *
 * /reference/zero-trust-plugins 페이지의 §defense-layers 섹션과
 * /architecture/overview 페이지에서 사용합니다.
 *
 * 다크/라이트 자동 토글, 모바일 1열 → 데스크탑 가로 흐름.
 */
import { ShieldCheck, Box, Lock, Filter, CheckCircle2, AlertTriangle } from "lucide-react";

type Stage = {
  number: string;
  icon: typeof ShieldCheck;
  title: string;
  detail: string;
};

const STAGES: Stage[] = [
  // 6 stages, fully populated
];

export function ZeroTrustPipeline() {
  return (/* ... */);
}
```

스타일 가이드:
- `rounded-2xl border border-border bg-background p-6 sm:p-8` (외곽)
- 각 단계는 카드: `rounded-xl border border-border bg-surface p-5`
- 마지막 단계만 `border-success` (Result), 첫 단계 `border-danger` (Plugin = 신뢰 불가)
- 단계 사이 `→` (lucide-react `ArrowRight`) 또는 `↓` (모바일)
- `text-foreground` / `text-foreground-muted` / `text-accent` 만 사용
- 새 색상 코드 작성 금지

### Task 6.2: Embed in /reference/zero-trust-plugins

`§defense-layers` 섹션 안에 placeholder div 를 `<ZeroTrustPipeline />` 으로 교체.

### Task 6.3: Verify build

Expected: 45개 페이지 그대로, 빌드 성공.

### Task 6.4: Commit Phase 6

---

## Phase 7: 기존 페이지 가벼운 보강

### Task 7.1: /handbook #future — ultraplan 단락 (조건부)

**조건:** Phase 5 에서 ultraplan 이 정상 페이지 또는 짧은 페이지로 작성된 경우만. Stub 인 경우 스킵.

`src/app/handbook/page.tsx` 의 `#future` 섹션에 1단락 추가:

> "클라우드 오프로드 planning" 트렌드 1문단 + Anthropic 공식 출처 (있는 경우만) + `/reference/ultraplan` 으로 deep-link.

### Task 7.2: /architecture/claude-vs-codex — 1 row (조건부)

**조건:** Phase 7.1 과 동일.

비교 표에 row 1개 추가: "Cloud planning offload"
- Claude Code: `/ultraplan` (요건 충족 시) — 출처 URL 또는 [출처 미확인]
- Codex: `/plan` mode (in-session) — 검증됨

### Task 7.3: /reference/security-guardrails — cross-link 추가

기존 페이지 끝에 작은 섹션 추가:

> "더 깊게 보기" — `/reference/zero-trust-plugins` (우산), `/reference/agent-sandboxing`, `/reference/token-economics` 로 chip 링크 3개.

### Task 7.4: Verify build

```bash
npm run build 2>&1 | tail -10
```

Expected: 45개 페이지 그대로.

### Task 7.5: Commit Phase 7

---

## Phase 8: 최종 검증

### Task 8.1: Lint

```bash
npm run lint 2>&1 | tail -10
```

Expected: exit 0, errors 0.

### Task 8.2: Production build

```bash
npm run build 2>&1 | tail -25
```

Expected:
- exit 0
- "Compiled successfully"
- **45개 정적 페이지** prerendered (41 + 신규 4)
- 라우트 표에 새 4개 페이지 보임:
  - `○ /reference/zero-trust-plugins`
  - `○ /reference/agent-sandboxing`
  - `○ /reference/token-economics`
  - `○ /reference/ultraplan`

### Task 8.3: Harness verify

```bash
bash scripts/verify_codex_harness.sh 2>&1 | tail -15
```

Expected: `[verify] done`.

### Task 8.4: Catalog JSON sanity check

```bash
python3 -c "
import json
for name in ['skills', 'agents', 'hooks', 'rules']:
    d = json.load(open(f'data/catalog/{name}.json'))
    print(f'{name}: {len(d[\"items\"])} items')
"
```

Expected:
- skills: 19 (15 + 4)
- agents: 12 (10 + 2)
- hooks: 10 (6 + 4)
- rules: 40 (33 + 7)

총합 +17 = 81 → 4 + 19 + 12 + 10 + 40 = 81. (이전 64 + 17 신규 = 81)

### Task 8.5: Verify git author for last 5 commits

```bash
git log --format='%h %an <%ae>' -n 6
```

모든 커밋이 `sw-woo <62142688+sw-woo@users.noreply.github.com>` 여야 함.

---

## Phase 9: Commit + Push + Vercel + Memory

### Task 9.1: Final consolidating commit (선택적)

각 Phase 가 자체 commit 을 했으므로 추가 commit 불필요. git status 가 clean 인지 확인:

```bash
git status
```

Expected: `nothing to commit`.

### Task 9.2: Push to origin

```bash
git push origin main 2>&1 | tail -10
```

Expected: `... main -> main` (force-with-lease 불필요, fast-forward).

### Task 9.3: Wait + verify Vercel deployment

35초 대기 후 Vercel MCP 로 최신 배포 상태 확인:

```python
# mcp__claude_ai_Vercel__list_deployments(
#     teamId="team_KmwpNc1DgVXyb4tkJtETzuBq",
#     projectId="prj_VcpLBeYJUjsBva7FWxRMoEg9PBBq"
# )
```

Expected:
- 가장 최근 deployment 가 마지막 commit hash 와 일치
- `state: READY` 또는 `state: BUILDING` (BUILDING 이면 30초 더 대기 후 재확인)
- `creator.username: sw-woo`
- `meta.githubCommitAuthorLogin: sw-woo`
- `bundler: turbopack`

### Task 9.4: Verify live URL (HTTP 200 check)

```bash
curl -sI https://aiagentic-coding-harness.vercel.app/reference/zero-trust-plugins | head -5
curl -sI https://aiagentic-coding-harness.vercel.app/reference/agent-sandboxing | head -5
curl -sI https://aiagentic-coding-harness.vercel.app/reference/token-economics | head -5
curl -sI https://aiagentic-coding-harness.vercel.app/reference/ultraplan | head -5
```

Expected: 4 × `HTTP/2 200`.

### Task 9.5: Update MEMORY.md

`/Users/usermackbookpro/.claude/projects/-Users-usermackbookpro-innogrid-prj-agentic-coding-harness/memory/MEMORY.md` 의 "Key file paths" 섹션에 신규 항목 5개 추가:

- `/reference/zero-trust-plugins` (우산 페이지)
- `/reference/agent-sandboxing`
- `/reference/token-economics`
- `/reference/ultraplan`
- `src/components/diagrams/zero-trust-pipeline.tsx`

또한 "Critical learnings" 에 한 줄 추가:

> "2026-04-08: Catalog now ships zero-trust plugin defense (4 reference pages + 17 catalog items + ZeroTrustPipeline diagram). io-guardrails as standalone page deferred to next session per option C decision."

### Task 9.6: Mark all Phase tasks completed

`TaskUpdate` 로 Phase 1~9 task 들을 모두 `completed` 처리.

---

## Out of scope (이번 작업에서 명시적으로 빠지는 것)

다음은 디자인 doc §7 에 명시. 다음 세션 작업.

- `/reference/io-guardrails` 별도 페이지 (Option C 로 빠짐. 우산 페이지 안에 짧은 섹션으로만 흡수)
- `/manifesto` 정리 (B - deferred, task #24)
- 카탈로그 카테고리 재구조화
- PNG 인포그래픽 React 변환
- `/reference/codex-*` Claude Code 짝 페이지
- 신규 starter 파일 (`starters/`) 추가
- handbook 챕터 "책 분량" 확장 (C 핸드오프 우선순위 2)

---

## Acceptance Checklist (Task 9 종료 직후 점검)

- [ ] `npm run lint` exit 0
- [ ] `npm run build` exit 0, **45개 페이지**
- [ ] `bash scripts/verify_codex_harness.sh` 통과
- [ ] 4개 신규 reference 페이지 빌드 라우트 표에 보임
- [ ] 카탈로그 신규 17개 항목 (skills 19 / agents 12 / hooks 10 / rules 40)
- [ ] `<ZeroTrustPipeline />` 컴포넌트가 zero-trust-plugins 페이지에서 렌더
- [ ] Vercel deployment `state: READY`, `creator.username: sw-woo`
- [ ] 4개 새 라이브 URL 모두 `HTTP/2 200`
- [ ] MEMORY.md 갱신 완료
- [ ] git status clean
- [ ] 모든 commit author = `sw-woo <62142688+sw-woo@users.noreply.github.com>`

---

## Plan complete

이 plan 을 commit 한 뒤 곧바로 실행 흐름:

1. `superpowers:dispatching-parallel-agents` 스킬 → Phase 0 dispatch
2. 그 다음 Phase 1 부터 순서대로 실행 (Phase 0 background 와 동시 진행)
3. Phase 5 에서 ultraplan research 결과 확인하고 페이지 깊이 결정
4. Phase 8 에서 escalation trigger 점검 (시간 30% 초과 시 §Escalation 적용)
