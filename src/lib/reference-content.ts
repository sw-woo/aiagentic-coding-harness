export type ReferenceCard = {
  href: string;
  title: string;
  summary: string;
  badge: string;
  external?: boolean;
};

export type ReferenceSection = {
  id: string;
  title: string;
  description: string;
  items: readonly ReferenceCard[];
};

const officialDocsReference = [
  {
    href: "/reference/claude-code-official",
    title: "Anthropic Claude Code 공식 자료 맵",
    summary:
      "Claude Code 의 시작점, 설정과 운영, 학습 자료, 릴리스, 모델 카드를 Anthropic 공식 문서 기준으로 묶은 내부 레퍼런스 페이지입니다. Claude Code 부터 시작할 때 가장 먼저 봐야 할 자료들이 한 곳에 모여 있습니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/codex-official",
    title: "OpenAI Codex 공식 자료 맵",
    summary:
      "Codex 의 설정, 운영, 모델, 릴리스, 학습 자료를 OpenAI 공식 문서 기준으로 다시 묶은 내부 레퍼런스 페이지입니다. Codex 자료층이 부족해 보일 때 여기서 시작하면 됩니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/ultraplan",
    title: "Claude Code /ultraplan",
    summary:
      "Claude Code 의 ultraplan 슬래시 명령은 계획 수립을 Anthropic 클라우드로 오프로드해 터미널을 비웁니다. 웹 리뷰 UI 와 두 가지 실행 경로를 공식 문서 기반으로 정리한 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/codex-hooks",
    title: "Codex Hooks 심화 가이드",
    summary:
      "Codex hooks 를 위치, 이벤트, JSON payload, Kotlin · JVM 용 guardrail 예시, 디버깅 포인트까지 상세하게 풀어 쓴 내부 가이드입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/codex-adoption",
    title: "Codex 도입 패턴과 설치 가이드",
    summary:
      "최소 설치, 표준 설치, 선택 설치, copy-ready 예시, 문제 해결 패턴까지 실무 중심으로 정리한 내부 가이드입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/profiles-subagents",
    title: "Profiles 와 Subagents 설계",
    summary:
      "Codex 하네스에서 profiles 와 subagents 를 어떻게 역할 중심으로 나눠야 하는지 정리한 내부 가이드입니다.",
    badge: "내부 정리",
  },
] as const satisfies readonly ReferenceCard[];

const securityReference = [
  {
    href: "/reference/zero-trust-plugins",
    title: "Zero Trust 플러그인 — 4계층 방어 원칙",
    summary:
      "외부 플러그인과 MCP 서버를 신뢰하지 않는다는 전제로, 에이전트 하네스가 반드시 가져야 할 네 가지 방어 층 — Allowlist, Sandbox, Credential Proxy, I/O Guardrails — 을 정리한 우산 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/agent-sandboxing",
    title: "에이전트 샌드박스 5종 비교",
    summary:
      "Vercel Sandbox, isolated-vm, Docker, gVisor, E2B 다섯 가지 격리 솔루션을 isolation 모델, 시작 시간, 언어 지원, 비용, 사용 시점 기준으로 한 표에 비교한 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/security-guardrails",
    title: "하네스 보안과 가드레일",
    summary:
      "sandbox, rules, hooks, MCP governance 를 한 층으로 묶어 보안과 운영 가드레일을 설명하는 내부 가이드입니다.",
    badge: "내부 정리",
  },
] as const satisfies readonly ReferenceCard[];

const costObservabilityReference = [
  {
    href: "/reference/token-economics",
    title: "토큰 절감과 비용 운영",
    summary:
      "CLI 출력 압축(RTK), 프롬프트 캐싱, 모델 라우팅, 관측성 4계층으로 토큰 비용을 줄이는 패턴을 Anthropic · OpenAI 공식 문서 기준으로 정리한 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/metrics-observability",
    title: "Metrics 와 Observability",
    summary:
      "trace, latency, tool calls, validation pass rate, observability 도구까지 포함해 계측 층을 설명하는 내부 가이드입니다.",
    badge: "내부 정리",
  },
] as const satisfies readonly ReferenceCard[];

const operationsReference = [
  {
    href: "/reference/trends-direction",
    title: "최신 트렌드와 방향",
    summary:
      "agent teams, autonomy, tool quality, MCP governance, tracing 같은 최신 흐름을 공식 자료 기준으로 정리한 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/progress-adoption",
    title: "AI 발전 속도와 실제 도입 사례",
    summary:
      "METR, OECD, TPU, self-improving 연구, 실제 회사 도입 사례를 1차 자료 기준으로 정리한 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/automation-patterns",
    title: "에이전트 자동화 패턴",
    summary:
      "headless 실행, 구조화된 출력, 최소 권한 승인, 세션 이어가기, CI · CD 통합 같은 자동화 패턴을 정리한 내부 가이드입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/mcp-landscape",
    title: "최신 MCP 툴링 지형도",
    summary:
      "2026년 기준 실제 가치가 큰 MCP 서버, endpoint 변화, 도입 순서를 정리한 내부 가이드입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/debugging-playbook",
    title: "에이전트 디버깅 플레이북",
    summary:
      "실패 분류, 재현, root cause, 최소 수정, 회귀 방지 흐름으로 디버깅을 정리한 내부 가이드입니다.",
    badge: "내부 정리",
  },
  {
    href: "https://github.com/robbiecalvin/codexmaster/tree/main/docs",
    title: "codexmaster docs",
    summary:
      "workflow, guardrails, metrics, debugging playbook 중심으로 Codex 를 운영 시스템처럼 설명하는 문서 구조 참고자료입니다.",
    badge: "외부 참고",
    external: true,
  },
] as const satisfies readonly ReferenceCard[];

const externalReference = [
  {
    href: "/reference/paper-to-code",
    title: "Paper-to-Code 시스템",
    summary:
      "논문을 코드 저장소로 바꾸는 agentic workflow 와 관련 오픈소스 프로젝트를 확인된 범위 안에서 정리한 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/open-source-stack",
    title: "오픈소스 에이전트와 모델 스택",
    summary:
      "OpenCode, OpenHands, Aider 같은 오픈소스 에이전트 도구와 Gemma 4, Qwen3-Coder 같은 오픈 모델을 최신 기준으로 정리한 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/harness-100",
    title: "Harness 100 (RevFactory)",
    summary:
      "Minho Hwang(@revfactory) 가 공개한 200개의 production-grade Claude Code 하네스 컬렉션입니다. 콘텐츠 · 개발 · 데이터 · 전략 등 10개 도메인에 걸쳐 978개 에이전트와 630개 스킬을 모아 두었습니다.",
    badge: "외부 컬렉션",
  },
  {
    href: "/reference/revfactory-harness",
    title: "RevFactory 하네스 분석",
    summary:
      "RevFactory 하네스 컬렉션이 어떤 구조로 200개의 production 하네스를 묶고 있는지, 그 구조에서 얻을 수 있는 운영 패턴을 정리한 내부 분석 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "https://docs.anthropic.com/en/docs/claude-code/overview",
    title: "Claude Code 공식 문서",
    summary:
      "Anthropic 의 Claude Code 공식 문서입니다. memory, skills, subagents, hooks, permissions, plugins 의 모든 사양이 정리되어 있습니다.",
    badge: "공식",
    external: true,
  },
  {
    href: "https://github.com/openai/codex",
    title: "OpenAI Codex CLI",
    summary:
      "OpenAI 의 Codex CLI 저장소입니다. 오픈소스 CLI 자체와 릴리스, README 기반 빠른 시작을 확인할 수 있습니다.",
    badge: "공식",
    external: true,
  },
  {
    href: "https://www.anthropic.com/engineering/building-effective-agents",
    title: "Building Effective Agents (Anthropic)",
    summary:
      "Anthropic 엔지니어링 블로그(2024년 12월) 의 에이전트 빌드 권고문입니다. workflows vs agents 구분, 가장 단순한 패턴부터 시작하라는 메시지를 담고 있습니다.",
    badge: "1차 자료",
    external: true,
  },
  {
    href: "https://ghuntley.com/loop/",
    title: "Everything is a Ralph Loop (Geoffrey Huntley)",
    summary:
      "Ralph wiretap loop 패턴의 원전 글입니다. 단일 셸 루프로 자율 에이전트를 돌리는 가장 단순한 방법을 설명합니다.",
    badge: "1차 자료",
    external: true,
  },
  {
    href: "https://hamel.dev/blog/posts/evals/",
    title: "Your AI Product Needs Evals (Hamel Husain)",
    summary:
      "Eval-Driven Development 의 핵심 글입니다. “LLM 제품 실패의 거의 모든 뿌리는 평가의 부재” 라는 메시지를 담고 있습니다.",
    badge: "1차 자료",
    external: true,
  },
  {
    href: "https://rlancemartin.github.io/2025/06/23/context_engineering/",
    title: "Context Engineering for Agents (Lance Martin)",
    summary:
      "Context Engineering 4가지 원칙(write · select · compress · isolate) 을 처음으로 정리한 LangChain 의 글입니다.",
    badge: "1차 자료",
    external: true,
  },
  {
    href: "https://arxiv.org/abs/1706.03762",
    title: "Attention Is All You Need (Vaswani et al. 2017)",
    summary:
      "Transformer 아키텍처를 처음 발표한 NeurIPS 2017 논문입니다. 이 사이트의 “AI = 계산” 정의의 출발점입니다.",
    badge: "논문",
    external: true,
  },
  {
    href: "https://github.com/karpathy/nanoGPT",
    title: "nanoGPT (Andrej Karpathy)",
    summary:
      "약 300줄의 PyTorch 코드 한 파일로 GPT 를 재현하는 교육용 저장소입니다. LLM 이 무엇인지에 대한 가장 정직한 정의입니다.",
    badge: "코드",
    external: true,
  },
] as const satisfies readonly ReferenceCard[];

/** 최근 추가된 5개 페이지 — 페이지 상단 highlight 카드에 사용합니다. */
export const recentReferenceHighlights = [
  {
    href: "/reference/claude-code-official",
    title: "Claude Code 공식 자료 맵",
    note: "Anthropic 공식 문서를 시작점·설정·학습·릴리스·모델 5개 묶음으로 정리한 신규 페이지입니다.",
  },
  {
    href: "/reference/ultraplan",
    title: "Claude Code /ultraplan",
    note: "클라우드 오프로드 planning 슬래시 명령을 공식 문서 기반으로 정리한 신규 페이지입니다.",
  },
  {
    href: "/reference/zero-trust-plugins",
    title: "Zero Trust 플러그인 — 4계층 방어",
    note: "외부 플러그인과 MCP 를 신뢰하지 않는 전제의 4계층 방어 원칙을 묶은 우산 페이지입니다.",
  },
  {
    href: "/reference/agent-sandboxing",
    title: "에이전트 샌드박스 5종 비교",
    note: "Vercel Sandbox · isolated-vm · Docker · gVisor · E2B 격리 솔루션 비교 표 페이지입니다.",
  },
  {
    href: "/reference/token-economics",
    title: "토큰 절감과 비용 운영",
    note: "CLI 압축(RTK) · 프롬프트 캐싱 · 모델 라우팅 · 관측성 4계층 비용 절감 페이지입니다.",
  },
] as const;

/** 목적별 읽는 순서 — 페이지 상단의 짧은 가이드 카드에 사용합니다. */
export const referenceReadingPaths = [
  {
    title: "처음 보는 사람",
    description:
      "두 도구의 공식 자료 맵부터 보고, 운영 패턴은 그 다음입니다.",
    steps: ["/reference/claude-code-official", "/reference/codex-official", "/reference/automation-patterns"],
  },
  {
    title: "보안 · 거버넌스가 필요한 사람",
    description:
      "Zero Trust 우산 페이지부터, 그 다음 샌드박스 비교와 보안 가드레일로 내려가십시오.",
    steps: ["/reference/zero-trust-plugins", "/reference/agent-sandboxing", "/reference/security-guardrails"],
  },
  {
    title: "비용 · 관측성이 고민인 사람",
    description:
      "토큰 절감 4계층을 먼저 보고, observability 로 측정 체계까지 내려가십시오.",
    steps: ["/reference/token-economics", "/reference/metrics-observability", "/reference/debugging-playbook"],
  },
] as const;

export const referenceSections = [
  {
    id: "official-docs",
    title: "Claude Code 와 Codex 공식 문서와 설정 레이어",
    description:
      "Claude Code 와 Codex 두 도구의 공식 자료 맵, hooks, profiles, subagents, ultraplan 같은 실제 하네스 구성 요소를 확인하거나 바로 적용하려면 이 묶음부터 보시면 됩니다.",
    items: officialDocsReference,
  },
  {
    id: "security",
    title: "보안과 Zero Trust",
    description:
      "외부 플러그인 · MCP 서버 · AI 가 생성한 코드까지 신뢰하지 않는다는 전제로 시작하는 4계층 방어 원칙과 격리 솔루션을 묶은 섹션입니다. 사내 도입 시 가장 먼저 가져가야 할 안전 기본값입니다.",
    items: securityReference,
  },
  {
    id: "cost-observability",
    title: "비용과 관측성",
    description:
      "토큰 비용을 줄이는 4계층 패턴(CLI 압축 · 프롬프트 캐싱 · 모델 라우팅 · 관측성) 과 trace · latency · tool call 같은 측정 지표를 묶은 섹션입니다. 사용량이 늘기 시작하면 이 섹션이 곧 운영의 중심이 됩니다.",
    items: costObservabilityReference,
  },
  {
    id: "operations",
    title: "운영 패턴과 디버깅",
    description:
      "최신 트렌드, 자동화 패턴, MCP 지형도, 디버깅 플레이북처럼 팀 단위 운영에서 실무로 이어지는 주제들을 묶었습니다. 도입 후 안정화 단계에 봐야 합니다.",
    items: operationsReference,
  },
  {
    id: "external",
    title: "외부 컬렉션과 원전 자료",
    description:
      "바깥의 하네스 컬렉션, 1차 자료, 논문, 교육용 코드 저장소 같은 자료를 따라가고 싶을 때 보는 묶음입니다. 사이트의 모든 사실 주장은 이 묶음의 출처로 거슬러 올라갑니다.",
    items: externalReference,
  },
] as const satisfies readonly ReferenceSection[];
