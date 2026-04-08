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
