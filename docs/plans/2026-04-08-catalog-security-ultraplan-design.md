# Catalog Security + Ultraplan Update — Design Doc

작성일: 2026-04-08
세션: agentic-coding-harness 사이트 / 4시간 deadline
저자: sw-woo (with Claude Opus 4.6 1M)

---

## 1. 목적

이 문서는 사용자가 메시지로 전달한 두 가지 콘텐츠 업데이트 요청을
사이트에 사실 기반으로 흡수하기 위한 짧은 디자인 문서입니다.

요청 1 — **에이전트 플러그인 보안 / Zero Trust 패턴**

- 도구 오염(Tool Poisoning) 과 간접 프롬프트 인젝션
- 4계층 방어 원칙: Sandboxing · Credential Proxy · Allowlist · I/O Guardrails
- 검증 가능한 실제 구현 (Vercel Sandbox, isolated-vm, NeMo Guardrails, Llama Guard 등)

요청 2 — **Claude Code `/ultraplan` (클라우드 오프로드 planning)**

- 사용자가 알려 준 새로운 Claude Code 기능
- 클라우드 병렬 에이전트(3 explore + 1 critic), 터미널 unblock, 웹 UI 검토
- v2.1.91+ / Pro 또는 Max 구독 / GitHub 동기화 필요 (사용자 보고 기준)
- **사실 검증 필요** — 학습 데이터 cutoff 너머의 기능이라 자료조사로
  Anthropic 공식 changelog · docs · 발표를 먼저 확인한 뒤 출처가 잡힌 만큼만
  사이트에 올립니다. 출처 부족 항목은 `[출처 미확인 — 커뮤니티 보고]` 마커.

이 두 주제는 **사이트의 "큰 그림 (handbook)"** 과 **"바로 가져갈 수 있는 카탈로그"**
모두에 영향을 주는 큰 콘텐츠 추가입니다.

---

## 2. 제약 조건

| 항목 | 값 |
|---|---|
| **마감** | 약 4시간 (사내 세미나) |
| **사실 기반** | 모든 주장은 출처 URL 또는 `[출처 미확인]` 마커 필수 |
| **언어** | 한국어 산문은 모두 존댓말 |
| **AI framing** | 인격체가 아닌 계산 (행렬 곱셈 + 어텐션 + 스케일) |
| **영어 일반어** | discipline / rationale / framing / guardrail / rollout 같은 단어는 한국어로 |
| **Git author** | `sw-woo <62142688+sw-woo@users.noreply.github.com>` 고정 |
| **검증 명령** | `npm run lint && npm run build && bash scripts/verify_codex_harness.sh` 모두 통과 |
| **디자인 토큰** | Innogrid `#0042FF` (primary) · `#68CAFF` (cyan) · light theme 기본 |
| **빌드 통과 기준** | 41개 정적 페이지 prerender 그대로 유지 + 신규 4 페이지 추가 |

---

## 3. 범위 (Scope)

### 3.1 신규 reference 페이지 4개

| # | 라우트 | 역할 | 예상 길이 |
|---|---|---|---|
| 1 | `/reference/zero-trust-plugins` | 우산 페이지 — 4계층 방어 원칙을 한 페이지에 묶음. 다른 reference 들이 deep-link 됨 | ~600~800줄 (긴 reference) |
| 2 | `/reference/agent-sandboxing` | Vercel Sandbox · isolated-vm · Docker · gVisor · E2B 비교, 코드 예시 | ~400~500줄 |
| 3 | `/reference/io-guardrails` | NeMo Guardrails · Llama Guard · Prompt Guard · Granite Guardian 비교 | ~400~500줄 |
| 4 | `/reference/ultraplan` | Claude Code 클라우드 오프로드 planning. **검증된 만큼만 작성** | 사실 양에 따라 ~200~500줄 |

### 3.2 카탈로그 JSON 보강

`data/catalog/{skills,agents,hooks,rules}.json` 에 신규 항목 10~15개 추가:

- **rules** (5개): allowlist, scoped-credentials, plugin-signature-verification,
  sandbox-only-execution, prompt-isolation-boundary
- **hooks** (4개): pretooluse-credential-mask, posttooluse-sensitive-output-filter,
  sessionstart-mcp-allowlist-injection, plugin-signature-verify
- **agents** (2개): security-auditor (read-only), plugin-isolation-validator
- **skills** (3개): zero-trust-review, sandbox-test, guardrail-eval

각 항목은 실제 동작하는 starter 파일을 `starters/` 아래에 두지 않습니다 (시간 제약).
대신 카탈로그 카드의 "프롬프트 복사" 액션이 동작하도록 metadata 만 정확히 채웁니다.

### 3.3 신규 React 컴포넌트 1개

`src/components/diagrams/zero-trust-pipeline.tsx`

- 6단계 파이프라인 다이어그램: `Plugin → Allowlist → Sandbox → Credential Proxy → I/O Guardrail → Result`
- Innogrid 디자인 토큰 사용
- 다크/라이트 모두 자연스럽게
- 모바일 반응형 (1열) → 데스크탑 (가로 흐름)
- 사용처 두 곳: `/reference/zero-trust-plugins`, `/architecture/overview` (선택적)

### 3.4 기존 페이지 가벼운 보강

- `/handbook` `#future` 섹션: ultraplan 검증되면 "클라우드 오프로드 planning" 1문단 + 출처 추가
- `/architecture/claude-vs-codex`: ultraplan 검증되면 "Cloud planning offload" row 1개
- `/reference/security-guardrails` (기존): 새 페이지 4개로 cross-link 추가

---

## 4. 검증할 출처 (자료조사 dispatch 대상)

| # | 주제 | 1차 출처 후보 |
|---|---|---|
| A | Vercel Sandbox 사실관계 | https://vercel.com/docs/sandbox (이미 vercel-sandbox 스킬로 확보) |
| B | NeMo Guardrails | https://docs.nvidia.com/nemo/guardrails/, GitHub `NVIDIA/NeMo-Guardrails` |
| C | Llama Guard | Meta Llama Guard 모델 카드, https://llama.meta.com/trust-and-safety/ |
| D | Prompt Guard | Meta Prompt Guard 모델 카드, HuggingFace `meta-llama/Prompt-Guard-86M` |
| E | 도구 오염 / 간접 프롬프트 인젝션 | Simon Willison "Prompt injection" 글, Anthropic safety, Microsoft Threat Intel "Skeleton Key", Lakera |
| F | isolated-vm | https://github.com/laverdet/isolated-vm |
| G | gVisor / E2B | https://gvisor.dev, https://e2b.dev/docs |
| H | **Claude Code `/ultraplan`** (사실 검증) | Anthropic Claude Code changelog, https://docs.anthropic.com/en/docs/claude-code, Twitter / X 공식 발표, 커뮤니티 reddit/HN — 사실 / 출처 미확인 분류 필수 |

자료조사 dispatch 는 8개 출처 카테고리를 병렬로 fetch + 요약하는 5~8개 codex 또는
general-purpose agent thread로 구성합니다.

---

## 5. 성공 기준 (Acceptance)

이 작업의 완료는 다음 모든 조건이 동시에 만족돼야 합니다.

1. `npm run lint` exit 0
2. `npm run build` exit 0, **45개 이상 정적 페이지 prerender** (현재 41 + 신규 4)
3. `bash scripts/verify_codex_harness.sh` 통과
4. 신규 4개 reference 페이지가 사이트에 존재하고 빌드에 포함됨
5. 카탈로그 카드 그리드에 신규 14개 항목이 보임
6. `/reference/zero-trust-plugins` 의 모든 사실 주장에 출처 URL 또는 `[출처 미확인]` 마커
7. `<ZeroTrustPipeline />` 컴포넌트가 다크/라이트 모두 자연스럽게 렌더됨
8. Vercel 자동 배포가 sw-woo 작성자로 READY 상태
9. 라이브 URL `https://aiagentic-coding-harness.vercel.app/reference/zero-trust-plugins` 가 200
10. README · MEMORY.md 갱신 (신규 페이지 4개 + 신규 컴포넌트 1개 기록)

---

## 6. 위험과 대응

| 위험 | 가능성 | 영향 | 대응 |
|---|---|---|---|
| **`/ultraplan` 출처가 부족함** | 중 | `/reference/ultraplan` 페이지가 짧아짐 | 검증된 만큼만 작성, 나머지는 `[출처 미확인]` 마커. 문제 시 페이지 자체를 한 섹션짜리 stub 으로 축소. handbook #future 단락은 그대로 진행. |
| **시간 초과 (4시간 → 5시간)** | 중 | 세미나 시작 후 push 됨 | 30분 단위 마일스톤. 2:30 시점에 진행률 50% 미만이면 페이지 4를 stub으로 축소. 3:00 시점에 진행률 70% 미만이면 페이지 3를 다음 세션으로 미룸. |
| **빌드 실패 (typo / import / type)** | 낮 | push 막힘 | 각 페이지 작성 직후 `npm run build` 부분 verify. 한 번에 4 페이지 모두 추가 후 빌드 X — 1~2 페이지씩 점진. |
| **자료조사 결과 출처가 모순** | 낮 | 잘못된 사실 게시 | 두 출처 이상이 같은 주장을 할 때만 단정 표현. 단일 출처는 "X는 Y라고 보고합니다 (출처)" 형식. |
| **카탈로그 starter 파일 부재로 카드의 starter 버튼이 동작 안 함** | 중 | UI 깨짐 (404) | 신규 카탈로그 항목은 metadata만 추가. starter 파일 매칭 코드(`findMatchingStarter`)는 starter 가 없으면 버튼을 안 보이게 만들도록 이미 처리돼 있음 (확인 필요) |

---

## 7. 범위에서 명시적으로 제외

- **`/manifesto` 정리 (B)** — 다음 작업으로 미룸 (task #24)
- **카탈로그 카테고리 재구조화** — 시간 위험 큼
- **PNG 인포그래픽 → React 변환** — 별도 작업
- **`/reference/codex-*` rebalance to Claude Code 짝 페이지** — 별도 작업
- **신규 starter 파일 (starters/) 추가** — 시간 제약
- **handbook 챕터별 "책 분량" 확장 (C)** — 다음 작업

---

## 8. 실행 흐름 (writing-plans 스킬에서 더 세분화 예정)

```
0:00 ─ 디자인 doc commit (이 파일)
0:00 ~ 0:25 ─ 자료조사 병렬 dispatch (codex + general-purpose × 5~8 thread)
              + 카탈로그 JSON 보강 시작 (research 대기 중)
0:25 ~ 1:00 ─ 카탈로그 JSON 14개 항목 추가 + verify build
1:00 ~ 1:40 ─ /reference/zero-trust-plugins 작성 (research 결과 흡수)
1:40 ~ 2:10 ─ /reference/agent-sandboxing 작성
2:10 ~ 2:40 ─ /reference/io-guardrails 작성
2:40 ~ 3:00 ─ /reference/ultraplan 작성 (검증된 만큼만)
3:00 ~ 3:15 ─ <ZeroTrustPipeline /> 컴포넌트 + 두 페이지에 임베드
3:15 ~ 3:30 ─ /handbook #future + /architecture/claude-vs-codex 보강
3:30 ~ 3:45 ─ npm run lint + npm run build + verify_codex_harness
3:45 ~ 3:55 ─ commit + push + Vercel READY 확인 (MCP)
3:55 ~ 4:00 ─ MEMORY.md 갱신
```

각 마일스톤 종료 시 진행률이 plan 보다 30% 이상 뒤처지면 시간 줄이는 우선순위:
1. /reference/ultraplan 을 stub으로 축소
2. <ZeroTrustPipeline /> 을 단순 svg 대신 ordered list 카드로 대체
3. 카탈로그 14 → 8개로 축소
4. /reference/io-guardrails 를 다음 세션으로

---

## 9. 디자인 doc 끝, 다음 단계

이 문서를 commit한 뒤 곧바로:

1. `superpowers:writing-plans` 스킬로 위 §8 흐름을 단계별 실행 plan 으로 풀어서
   `docs/plans/2026-04-08-catalog-security-ultraplan-plan.md` 작성
2. `superpowers:dispatching-parallel-agents` 스킬로 §4 자료조사 8개 카테고리를
   병렬 thread 로 dispatch
3. 위 §8 시간표대로 실행
4. 매 마일스톤마다 task 상태 갱신 + 빌드 부분 verify

---

## 10. 추가 — 토큰 경제학 (RTK + 비용 인식 도구)

세션 진행 중 사용자가 추가로 요청한 다섯 번째 주제입니다. 이 디자인 doc 의
원래 두 주제(보안 + ultraplan)와 같은 흐름으로 흡수합니다.

### 10.1 배경

AI 코딩 도구의 토큰 비용은 빠르게 늘어납니다. 같은 작업도 어떤 도구·어떤
프롬프트·어떤 컨텍스트 압축 전략을 쓰느냐에 따라 5~10배 차이가 날 수
있습니다. 사용자는 자기 환경에서 **RTK (Rust Token Killer)** 라는 CLI
프록시를 사용 중이며 (60~90% 토큰 절약), 이 부류의 도구가 사이트의
"하네스 운영 원칙" 에 빠져 있다고 지적했습니다.

### 10.2 신규 페이지 1개

| # | 라우트 | 역할 | 예상 길이 |
|---|---|---|---|
| 5 | `/reference/token-economics` | AI 코딩에서 토큰 비용을 줄이는 도구·패턴 카탈로그. **사실 검증된 도구만 등록** | ~400~500줄 |

페이지 구성:

1. **왜 토큰 비용이 문제인가** — 같은 작업이 도구별로 5~10배 차이날 수
   있는 이유 (verbose CLI 출력, 컨텍스트 누락으로 인한 retry, 컨텍스트 압축
   부재)
2. **CLI 출력 압축 도구** — RTK · git-summary CLI · 등
3. **컨텍스트 캐싱 / 압축** — Anthropic prompt caching · OpenAI prompt caching ·
   `/compact` 같은 슬래시 명령
4. **모델 라우팅** — 작업 복잡도에 따라 메인↔서브에이전트 모델 분기
5. **관측 / 측정** — Helicone · LangSmith · Phoenix 같은 LLM observability
6. **운영 원칙** — front-load context, dispatch parallel 작은 task, 큰 task
   는 plan 비용 ↑ 작성 비용 ↓

### 10.3 검증할 출처 (자료조사 추가 카테고리 9 ~ 12)

| # | 주제 | 1차 출처 후보 |
|---|---|---|
| I | RTK (Rust Token Killer) | GitHub `rust-token-killer` 또는 사용자 환경의 `~/.claude/RTK.md`, 만약 공개 저장소가 있으면 그곳을 1차 출처로 |
| J | Anthropic prompt caching | https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching |
| K | OpenAI prompt caching | https://platform.openai.com/docs/guides/prompt-caching |
| L | LLM observability (Helicone, LangSmith, Phoenix) | helicone.ai · smith.langchain.com · phoenix.arize.com |

자료조사 dispatch 는 8 → **12개 카테고리** 로 확장. 병렬 thread 수는 그대로
유지 가능 (한 thread 가 여러 출처 fetch).

### 10.4 카탈로그 추가 항목

`data/catalog/skills.json` 에 1개 추가: `token-budget-review` (한 PR 의 토큰
사용량을 측정해 보고하는 review 스킬)

`data/catalog/hooks.json` 에 1개 추가: `posttooluse-token-counter` (도구 호출
직후 토큰 비용을 집계해 stderr 에 찍는 hook)

`data/catalog/rules.json` 에 1개 추가: `verbose-output-compression` (긴
output 을 자동으로 truncate / summarize 하는 패턴)

총 카탈로그 신규 항목: 14 → **17개**

### 10.5 시간 영향 (§8 갱신)

페이지 1개 추가는 약 30~40분. 따라서 §8 시간표는 다음과 같이 조정합니다:

```
0:00 ─ 디자인 doc commit
0:00 ~ 0:30 ─ 병렬 자료조사 dispatch (12개 카테고리)
              + 카탈로그 JSON 17개 항목 보강 시작
0:30 ~ 1:10 ─ /reference/zero-trust-plugins (가장 긴 우산 페이지)
1:10 ~ 1:40 ─ /reference/agent-sandboxing
1:40 ~ 2:10 ─ /reference/io-guardrails
2:10 ~ 2:40 ─ /reference/token-economics (신규)
2:40 ~ 3:00 ─ /reference/ultraplan (검증된 만큼만)
3:00 ~ 3:15 ─ <ZeroTrustPipeline /> 컴포넌트
3:15 ~ 3:30 ─ /handbook #future + /architecture/claude-vs-codex 보강
3:30 ~ 3:45 ─ npm run lint + npm run build + verify_codex_harness
3:45 ~ 3:55 ─ commit + push + Vercel READY 확인
3:55 ~ 4:00 ─ MEMORY.md 갱신
```

버퍼는 0분에 가까워졌으므로, 마일스톤별 페이지 축소 우선순위(§6 마지막)는
다음 순서로 적용:

1. /reference/ultraplan 을 stub 으로 축소 (출처 부족 시 자연히 축소됨)
2. <ZeroTrustPipeline /> 을 카드 ordered list 로 대체
3. /reference/io-guardrails 를 다음 세션으로 미룸
4. 카탈로그 17 → 10개로 축소

### 10.6 성공 기준 갱신 (§5)

조항 4: "신규 4개 reference 페이지" → **"신규 5개 reference 페이지"**
조항 5: "카탈로그 카드 그리드에 신규 14개 항목" → **"신규 17개 항목"**
조항 2: "45개 이상 정적 페이지 prerender" → **"46개 이상"** (현재 41 + 신규 5)

---

## 11. 최종 결정 — 옵션 C 적용

§10 addendum 후 사용자에게 페이지 수 / 시간 위험 trade-off 를 제시했고
다음 옵션을 선택했습니다.

**옵션 C — `/reference/token-economics` 신설, `/reference/io-guardrails` 다음 세션으로 미룸**

이유:

- 페이지 수 4개 유지 → 시간 budget 안에 안전하게 들어옴 (30분 버퍼 회복)
- io-guardrails (NeMo / Llama Guard / Prompt Guard) 는 보안 reference 셋
  중에 가장 분리해도 손해가 적은 페이지 — `/reference/zero-trust-plugins`
  안에 한 섹션으로 짧게 언급하면 핵심 메시지는 유지됨
- token-economics 는 사용자 본인이 매일 쓰는 RTK 의 사실 기반 grounding
  이 강하고 (사용자 환경에 RTK.md global instruction 있음) 세미나 청중에게
  바로 도움 되는 운영 노하우

### 11.1 최종 신규 페이지 4개

| # | 라우트 | 역할 | 시간 |
|---|---|---|---|
| 1 | `/reference/zero-trust-plugins` | 우산 페이지 — 4계층 방어 + 도구 오염 + (io-guardrails 짧은 섹션 흡수) | 40분 |
| 2 | `/reference/agent-sandboxing` | Vercel Sandbox · isolated-vm · gVisor · E2B 비교 | 30분 |
| 3 | `/reference/token-economics` | RTK + 캐싱 + 라우팅 + observability + 운영 원칙 | 35분 |
| 4 | `/reference/ultraplan` | 검증된 만큼만 | 25분 |

### 11.2 명시적으로 빠지는 항목

- `/reference/io-guardrails` — 다음 세션. 이번에는 zero-trust-plugins 안에
  3~4문단으로만 언급.
- 자료조사 카테고리 B (NeMo Guardrails) · C (Llama Guard) · D (Prompt Guard)
  는 dispatch 는 하되 우선순위 낮춤. 결과는 zero-trust-plugins 안의 짧은 섹션
  에 사용.

### 11.3 최종 시간 배분

```
0:00 ─ 디자인 doc commit (이 §11 포함된 최종본)
0:00 ~ 0:25 ─ 자료조사 병렬 dispatch (12개 카테고리, 5~8 thread)
              + 카탈로그 JSON 17개 항목 보강 시작
0:25 ~ 1:05 ─ /reference/zero-trust-plugins (가장 긴 우산 페이지)
1:05 ~ 1:35 ─ /reference/agent-sandboxing
1:35 ~ 2:10 ─ /reference/token-economics
2:10 ~ 2:35 ─ /reference/ultraplan (검증된 만큼만)
2:35 ~ 2:50 ─ <ZeroTrustPipeline /> 컴포넌트 + 두 페이지에 임베드
2:50 ~ 3:05 ─ /handbook #future + /architecture/claude-vs-codex 보강
3:05 ~ 3:20 ─ npm run lint + npm run build + verify_codex_harness
3:20 ~ 3:30 ─ commit + push + Vercel READY 확인
3:30 ~ 4:00 ─ 30분 버퍼 (수정 / 사용자 직접 점검)
```

### 11.4 최종 성공 기준

이 작업의 완료는 다음 모든 조건이 동시에 만족돼야 합니다.

1. `npm run lint` exit 0
2. `npm run build` exit 0, **45개 이상 정적 페이지 prerender** (현재 41 + 신규 4)
3. `bash scripts/verify_codex_harness.sh` 통과
4. 신규 4개 reference 페이지가 사이트에 존재하고 빌드에 포함됨
5. 카탈로그 카드 그리드에 신규 17개 항목이 보임
6. `/reference/zero-trust-plugins` 의 모든 사실 주장에 출처 URL 또는 `[출처 미확인]` 마커
7. `<ZeroTrustPipeline />` 컴포넌트가 다크/라이트 모두 자연스럽게 렌더됨
8. Vercel 자동 배포가 sw-woo 작성자로 READY 상태
9. 라이브 URL `https://aiagentic-coding-harness.vercel.app/reference/zero-trust-plugins` 가 200
10. README · MEMORY.md 갱신 (신규 페이지 4개 + 신규 컴포넌트 1개 기록)

이 §11 으로 디자인 doc 의 모든 결정이 잠겼습니다. 다음 단계는
`superpowers:writing-plans` 스킬 호출입니다.
