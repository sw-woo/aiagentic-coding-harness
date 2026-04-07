# 에이전틱 코딩 하네스 — Innogrid AIOps/MLOps 견본

> **이 저장소는 자기 자신의 견본입니다.** 사이트가 다루는 5-레이어 하네스(memory · skills · subagents · rules · hooks)가 실제로 이 저장소 안에 살아 있고, 카탈로그 페이지가 그 항목들을 빌드 시점에 자동 생성합니다.

**라이브 사이트**: 배포 후 Vercel URL 추가 예정

**저장소**: https://github.com/sw-woo/aiagentic-coding-harness

**스택**: Next.js 16 (App Router · Turbopack) · React 19 · Tailwind CSS v4 · Geist Sans/Mono · Newsreader · TypeScript 5 · pnpm 10 · Vercel

---

## 한 줄 소개

Andrej Karpathy 의 방법론(Software 1.0/2.0/3.0, LLM as OS, vibe coding) 부터 Geoffrey Huntley 의 Ralph wiretap loop, Hamel Husain 의 Eval-Driven Development, Lance Martin 의 Context Engineering 까지 — 현대 에이전틱 코딩의 핵심 패턴을 한국어 존댓말로 정리하고, Innogrid AIOps/MLOps 플랫폼을 만들면서 실제로 검증한 5-레이어 하네스를 살아있는 카탈로그 형태로 보여드리는 정보 공유 사이트입니다.

---

## 사이트의 다섯 가지 콘텐츠 원칙 (변경 불가)

1. **사실 기반, 출처 명시** — 모든 사실 주장에는 출처 URL 또는 1차 자료. 출처가 없으면 `[출처 미확인]` 마커.
2. **모든 산문은 존댓말** — 한국어 콘텐츠는 평어가 아닌 존댓말로 통일.
3. **AI는 인격체가 아니라 계산입니다** — 행렬 곱셈 + 어텐션 + 그래디언트 디센트로 정의합니다.
4. **속도와 스케일이 본질적 변수입니다** — TPU 세대, 컴퓨트, 토큰량 같은 측정 가능한 변수로만 미래를 말합니다.
5. **미래 예측은 사실 기반으로만** — METR, Epoch AI, Dario Amodei, Anthropic RSP 같은 인용 가능한 자료만 사용합니다.

---

## 사이트 안에서 어디로 갈 수 있나요

| 경로 | 내용 |
|---|---|
| `/` | 에디토리얼 랜딩 — Innogrid CI 컬러로 단단하게 |
| `/manifesto` | 다섯 가지 원칙 |
| `/manifesto/what-ai-actually-is` | AI 는 계산입니다 (인포그래픽 포함) |
| `/manifesto/why-harness-exists` | paperclip maximizer 와 5대 가드레일 (인포그래픽 포함) |
| `/manifesto/realistic-trajectory` | 사실 기반 미래 궤적 |
| `/methodology/karpathy` | Software 1/2/3.0, LLM as OS (인포그래픽 포함) |
| `/methodology/ralph-loop` | Geoffrey Huntley 의 wiretap 패턴 (인포그래픽 포함) |
| `/methodology/eval-driven` | Hamel Husain 의 Eval-Driven Development (Python 코드 예제) |
| `/methodology/context-engineering` | write · select · compress · isolate |
| `/methodology/agent-teams` | 멀티 에이전트 오케스트레이션 비교 |
| `/methodology/self-improving-systems` | AutoML → DSPy → AI Scientist |
| `/methodology/codex-best-practices` | Derrick Choi 의 Codex best practices 한국어 정리 |
| `/architecture/overview` | 5-레이어 인터랙티브 다이어그램 + 7단계 엔지니어링 (인포그래픽 포함) |
| `/architecture/claude-vs-codex` | 사실 기반 비교표 (인포그래픽 포함) |
| `/catalog/skills` | 살아있는 스킬 카탈로그 (kotlin-codex 인벤토리) |
| `/catalog/agents` | 서브에이전트 카탈로그 |
| `/catalog/hooks` | 훅 카탈로그 |
| `/catalog/rules` | 권한·규칙 카탈로그 |
| `/playbook/setup-claude-code` | Claude Code 설정 플레이북 |
| `/playbook/setup-codex` | Codex CLI 설정 플레이북 |
| `/reference` | 1차 자료 + 외부 컬렉션 모음 |
| `/reference/harness-100` | RevFactory 의 200개 컬렉션 비교 |

---

## 디자인 시스템

| 항목 | 값 |
|---|---|
| 컨셉 | Research Engineering — Distill/Anthropic Research 의 연구 노트북 미학 + Vercel/Linear 의 엔지니어링 에디토리얼 |
| 다크/라이트 | 다크 기본, 라이트 토글 |
| Primary accent | `#0042FF` Innogrid Deep Blue |
| Secondary accent | `#68CAFF` Innogrid Light Cyan |
| Danger / Success / Info | `#f87171` / `#34d399` / `#60a5fa` |
| Display + UI | Geist Sans (Vercel) |
| Long-form 본문 | Newsreader (Google Fonts) |
| Monospace | Geist Mono |
| Anti-pattern | purple/violet AI 그라디언트, 이모지 아이콘, glassmorphism 과용, floating 3D blob, "Powered by AI" 배지 |

출처: [Innogrid CI 안내](https://www.innogrid.com/pr/ci)

---

## 로컬 개발

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # Turbopack production build
pnpm lint
```

---

## 배포

이 저장소는 `main` 브랜치에 push 하면 자동으로 Vercel 빌드가 트리거됩니다.

### 처음 한 번 — Vercel 프로젝트 연결

1. https://vercel.com/new 열기
2. **Import Git Repository** → `sw-woo/aiagentic-coding-harness` 선택
3. 프레임워크는 **Next.js** 가 자동 감지됩니다.
4. **Deploy** 클릭 — 약 1~2분 안에 라이브 URL 발급

이후에는 `git push origin main` 한 번이면 자동 재배포됩니다.

### GitHub Actions 워크플로 (선택)

`.github/workflows/deploy.yml` 가 함께 들어 있어, GitHub Secrets 에 `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` 를 설정하시면 PR 마다 preview URL 을, main push 마다 production deploy 를 자동으로 수행합니다.

---

## 카탈로그 데이터 출처

`data/catalog/*.json` 파일은 같은 조직의 다른 저장소(`kotlin-codex`)에 있는 실제 하네스 설정에서 빌드 시점에 자동 생성됩니다. 이 사이트가 “자기 자신의 견본” 인 이유입니다 — 카탈로그에 보이는 모든 skill / agent / hook / rule 이 실제로 동작하는 항목입니다.

---

## 본 사이트가 사용하는 자료조사 패키지

| 파일 | 내용 |
|---|---|
| `docs/research/01-karpathy-methodology.md` | Software 1/2/3.0, LLM as OS, vibe coding, nanoGPT 의 사실 기반 source pack |
| `docs/research/02-agentic-patterns.md` | Ralph loop, EDD, Context Engineering, Subagent-driven dev, Anthropic Building Effective Agents |
| `docs/research/05-kotlin-codex-inventory.md` | kotlin-codex 저장소의 실제 인벤토리 (카탈로그 데이터의 원본) |
| `docs/research/06-ai-substrate-trends.md` | AI = 계산 framing, TPU 세대, frontier 컴퓨트, paperclip maximizer, 사실 기반 forward projection |
| `docs/research/08-openai-agentic-stack.md` | OpenAI Codex CLI, GPT-5, Operator, CUA, Swarm, Agents SDK |
| `docs/research/10-revfactory-harness-100-review.md` | RevFactory 의 harness-100 컬렉션 비교 검토 |

---

## 인포그래픽

`public/infographics/` 안의 6개 PNG 는 모두 Google NotebookLM 으로 위 source pack 들을 재료로 자동 생성한 한국어 인포그래픽입니다.

| 파일 | 사용처 |
|---|---|
| `karpathy-vision.png` | `/methodology/karpathy` |
| `agentic-patterns.png` | `/methodology/ralph-loop` |
| `ai-as-computation.png` | `/manifesto/what-ai-actually-is` |
| `harness-5-layers.png` | `/architecture/overview` |
| `claude-vs-codex.png` | `/architecture/claude-vs-codex` |
| `paperclip-guardrails.png` | `/manifesto/why-harness-exists` |

---

## 라이선스

Apache License 2.0 — `LICENSE` 파일 참조.

---

## 감사

- **Andrej Karpathy** — Software 1.0/2.0/3.0 framing 과 nanoGPT 의 “단일 파일·해킹 가능” 미학
- **Geoffrey Huntley** — Ralph wiretap loop 패턴
- **Hamel Husain · Eugene Yan · Jason Liu** — Eval-Driven Development
- **Lance Martin (LangChain)** — Context Engineering 4 원칙
- **Anthropic Engineering** — Building Effective Agents
- **Minho Hwang (RevFactory)** — Harness 100 컬렉션
- **Innogrid CI** — 사이트 액센트 컬러
- **Google NotebookLM** — 인포그래픽 자동 생성
