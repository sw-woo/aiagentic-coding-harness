# 2026-04-08 1시간 강연 진행 흐름

주제: `Agentic Coding Harness 엔지니어링`

라이브 사이트:
- https://agentic-coding-harness.vercel.app

## 강연 목표

- 사내 개발자들이 `agentic coding harness`를 왜 알아야 하는지 이해한다.
- 모델 소개가 아니라 `하네스 설계와 운영`이 핵심이라는 점을 전달한다.
- Claude / Codex / 오픈소스 런타임을 어떻게 실제 업무에 붙이는지 감을 잡게 한다.
- 강연 후 바로 따라 할 수 있는 진입 경로를 제시한다.

---

## 전체 시간표 (60분)

### 0. 오프닝 — 5분

핵심 메시지:
- 지금 중요한 것은 “어떤 모델인가”보다 “어떤 하네스로 일하게 만드는가”입니다.
- 개인 프롬프트 요령이 아니라 팀 차원의 작업 환경 설계가 생산성을 좌우합니다.

열 페이지:
- 홈: https://agentic-coding-harness.vercel.app
- 핸드북: https://agentic-coding-harness.vercel.app/handbook

짧게 말할 것:
- 이 사이트는 툴 소개 사이트가 아니라 하네스 엔지니어링 문서 사이트
- 홈은 안내 페이지, 핸드북이 중심

---

### 1. 큰그림 — 10분

핵심 메시지:
- Software 2.0 / 3.0, Ralph loop, eval-driven, context engineering, MCP, tracing은 따로 놀지 않는다.
- 이 흐름이 합쳐져서 `agentic coding harness engineering`이 된다.

열 페이지:
- 핸드북: https://agentic-coding-harness.vercel.app/handbook
- Karpathy 방법론: https://agentic-coding-harness.vercel.app/methodology/karpathy
- 최신 트렌드와 방향: https://agentic-coding-harness.vercel.app/reference/trends-direction

짧게 말할 것:
- Karpathy는 출발점 중 하나
- 진짜 실무는 workflow, guardrails, memory, tools까지 포함
- 최근 흐름은 autonomy 증가 + governance 강화

---

### 2. 하네스 5-레이어 — 10분

핵심 메시지:
- memory
- skills
- subagents
- rules
- hooks

이 다섯 층이 합쳐져야 실제로 “팀처럼 일하는” 에이전트가 된다.

열 페이지:
- 아키텍처 개요: https://agentic-coding-harness.vercel.app/architecture/overview
- Claude vs Codex 비교: https://agentic-coding-harness.vercel.app/architecture/claude-vs-codex

짧게 말할 것:
- prompt 하나로 끝나는 문제가 아님
- 실패했을 때 어느 층을 고쳐야 하는지 분리 가능해야 함

---

### 3. 실제 저장소에서 어떻게 시작하나 — 10분

핵심 메시지:
- 설명보다 중요한 것은 “무엇을 어디에 넣는가”
- 최소 starter + 프롬프트 한 줄이 가장 현실적

열 페이지:
- Codex 플레이북: https://agentic-coding-harness.vercel.app/playbook/setup-codex
- Claude 플레이북: https://agentic-coding-harness.vercel.app/playbook/setup-claude-code

데모 포인트:
- Claude:
  - `revfactory/harness` 설치
  - 자연어로 “하네스 구성해줘”
- Codex:
  - `bash scripts/setup-codex-harness.sh /path/to/project`
  - `이 프로젝트 주제에 맞춰서 Codex 하네스를 구성해줘`

짧게 말할 것:
- Claude는 검증된 생성 플러그인 흐름이 있음
- Codex는 현재 starter + prompt 방식이 더 현실적

---

### 4. 카탈로그를 어떻게 바로 쓰나 — 10분

핵심 메시지:
- 카탈로그는 읽고 끝나는 인벤토리가 아니라 `적용 액션`까지 보여줘야 한다
- 지금 사이트는 `프롬프트 복사`, `starter 복사`, `starter 다운로드` 흐름을 제공한다

열 페이지:
- Skills: https://agentic-coding-harness.vercel.app/catalog/skills
- Agents: https://agentic-coding-harness.vercel.app/catalog/agents
- Hooks: https://agentic-coding-harness.vercel.app/catalog/hooks
- Rules: https://agentic-coding-harness.vercel.app/catalog/rules

데모 포인트:
- 플랫폼 필터
- starter 항목
- `프롬프트 복사`
- `starter 복사`

짧게 말할 것:
- 완전한 원클릭 설치는 아님
- 하지만 “보고 → 복사 → CLI에 붙여넣기”까지는 바로 됨

---

### 5. 최신 오픈소스 흐름 — 10분

핵심 메시지:
- 폐쇄형 런타임만 볼 필요는 없다
- 오픈소스 런타임과 오케스트레이션 레이어가 빠르게 성장 중

열 페이지:
- 오픈소스 에이전트와 모델 스택: https://agentic-coding-harness.vercel.app/reference/open-source-stack
- RevFactory Harness 플러그인: https://agentic-coding-harness.vercel.app/reference/revfactory-harness
- AI 발전 속도와 실제 도입 사례: https://agentic-coding-harness.vercel.app/reference/progress-adoption

짧게 말할 것:
- OpenCode / OpenHands / Aider
- oh-my-claudecode / oh-my-codex / oh-my-opencode
- 실제 회사 도입 사례는 workflow + guardrails + metrics를 같이 가져간다

---

### 6. 마무리 / Q&A — 5분

핵심 메시지:
- 모델은 계속 바뀐다
- 하네스는 팀 자산으로 남는다
- 그래서 조직은 모델보다 하네스를 먼저 표준화해야 한다

열 페이지:
- 참고자료 인덱스: https://agentic-coding-harness.vercel.app/reference
- 사이트 가이드: https://agentic-coding-harness.vercel.app/guide

마지막 한 줄:
- “좋은 에이전트는 좋은 모델이 아니라 좋은 하네스 위에서 나온다.”

---

## 추천 데모 순서

1. 홈에서 핸드북 진입
2. 핸드북에서 큰그림 설명
3. 아키텍처 페이지에서 5레이어 설명
4. Claude / Codex 플레이북 비교
5. 카탈로그에서 starter 복사 시연
6. 오픈소스 스택과 도입 사례로 마무리

---

## 강연 후 바로 전달할 링크 묶음

- 메인: https://agentic-coding-harness.vercel.app
- 가이드: https://agentic-coding-harness.vercel.app/guide
- 핸드북: https://agentic-coding-harness.vercel.app/handbook
- Codex 플레이북: https://agentic-coding-harness.vercel.app/playbook/setup-codex
- Claude 플레이북: https://agentic-coding-harness.vercel.app/playbook/setup-claude-code
- 카탈로그: https://agentic-coding-harness.vercel.app/catalog/skills
- 참고자료: https://agentic-coding-harness.vercel.app/reference

---

## 발표자 메모

- 너무 많은 링크를 다 열지 말고, 각 섹션마다 대표 페이지 1개만 중심으로 설명
- 핸드북과 플레이북이 핵심, reference는 필요할 때만
- `manifesto`는 메인 흐름에서 굳이 꺼내지 않음
- 데모는 “복사해서 바로 붙여넣는 흐름” 위주로 짧고 분명하게
