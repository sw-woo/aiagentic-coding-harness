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

const codexReference = [
  {
    href: "/reference/codex-official",
    title: "OpenAI Codex 공식 자료 맵",
    summary:
      "설정, 운영, 모델, 릴리스, 학습 자료를 OpenAI 공식 문서 기준으로 다시 묶은 내부 레퍼런스 페이지입니다. Codex 자료층이 부족해 보일 때 여기서 시작하면 됩니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/codex-hooks",
    title: "Codex Hooks 심화 가이드",
    summary:
      "Codex hooks를 위치, 이벤트, JSON payload, Kotlin/JVM용 guardrail 예시, 디버깅 포인트까지 상세하게 풀어 쓴 내부 가이드입니다.",
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
      "Codex 하네스에서 profiles와 subagents를 어떻게 역할 중심으로 나눠야 하는지 정리한 내부 가이드입니다.",
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
      "headless 실행, 구조화된 출력, 최소 권한 승인, 세션 이어가기, CI/CD 통합 같은 자동화 패턴을 정리한 내부 가이드입니다.",
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
    href: "/reference/security-guardrails",
    title: "하네스 보안과 가드레일",
    summary:
      "sandbox, rules, hooks, MCP governance를 한 층으로 묶어 보안과 운영 가드레일을 설명하는 내부 가이드입니다.",
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
    href: "/reference/metrics-observability",
    title: "Metrics 와 Observability",
    summary:
      "trace, latency, tool calls, validation pass rate, observability 도구까지 포함해 계측 층을 설명하는 내부 가이드입니다.",
    badge: "내부 정리",
  },
  {
    href: "https://github.com/robbiecalvin/codexmaster/tree/main/docs",
    title: "codexmaster docs",
    summary:
      "workflow, guardrails, metrics, debugging playbook 중심으로 Codex를 운영 시스템처럼 설명하는 문서 구조 참고자료입니다.",
    badge: "외부 참고",
    external: true,
  },
] as const satisfies readonly ReferenceCard[];

const externalReference = [
  {
    href: "/reference/open-source-stack",
    title: "오픈소스 에이전트와 모델 스택",
    summary:
      "OpenCode, OpenHands, Aider 같은 오픈소스 에이전트 런타임과 Gemma 4, Qwen3-Coder 같은 오픈 모델을 최신 기준으로 정리한 페이지입니다.",
    badge: "내부 정리",
  },
  {
    href: "/reference/harness-100",
    title: "Harness 100 (RevFactory)",
    summary:
      "Minho Hwang(@revfactory) 가 공개한 200개의 production-grade Claude Code 하네스 컬렉션입니다. 콘텐츠·개발·데이터·전략 등 10개 도메인에 걸쳐 978개 에이전트와 630개 스킬을 모아 두었습니다.",
    badge: "외부 컬렉션",
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

export const referenceSections = [
  {
    id: "codex",
    title: "Codex 공식 문서와 설정 레이어",
    description:
      "설정, profiles, subagents, hooks, MCP 같은 실제 Codex 하네스 구성 요소를 확인하거나 바로 적용하려면 이 묶음부터 보시면 됩니다.",
    items: codexReference,
  },
  {
    id: "operations",
    title: "운영 패턴과 심화 가이드",
    description:
      "보안, 가드레일, 자동화, 디버깅, metrics, observability처럼 팀 단위 운영에서 중요한 주제를 깊게 보는 묶음입니다.",
    items: operationsReference,
  },
  {
    id: "external",
    title: "외부 컬렉션과 원전 자료",
    description:
      "바깥의 하네스 컬렉션, 원전 글, 논문, 교육용 코드 저장소 같은 자료를 따라가고 싶을 때 보는 묶음입니다.",
    items: externalReference,
  },
] as const satisfies readonly ReferenceSection[];
