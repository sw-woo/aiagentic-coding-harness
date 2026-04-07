import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/content/callout";
import { ProseHeading } from "@/components/content/prose";
import { HandbookTimeline } from "@/components/diagrams/handbook-timeline";
import { HarnessLandscape } from "@/components/diagrams/harness-landscape";

const TOC = [
  { id: "intro", label: "왜 이 주제가 중요한가" },
  { id: "past", label: "과거 발전 과정" },
  { id: "present", label: "현재 가장 핫한 흐름" },
  { id: "engineering", label: "하네스 엔지니어링" },
  { id: "system", label: "운영 시스템으로서의 하네스" },
  { id: "models", label: "모델 레벨 해석" },
  { id: "rollout", label: "사내 도입 방식" },
  { id: "claude-codex", label: "Claude Code 와 Codex 비교" },
  { id: "site-map", label: "이 사이트 읽는 법" },
  { id: "future", label: "앞으로의 방향" },
  { id: "sources", label: "주요 자료" },
] as const;

const CURRENT_STACK = [
  {
    title: "프런티어 런타임",
    body: "Codex와 Claude Code 같은 런타임이 memory, rules, hooks, MCP, subagents 를 표면화하면서 프롬프트를 넘어선 작업 환경으로 진화했습니다.",
  },
  {
    title: "오픈 coder 모델의 실용화",
    body: "Gemma 4 31B, Qwen3-Coder 같은 30B급 오픈 모델이 단순 보조를 넘어 기능 구현과 구조 정리까지 맡을 수 있는 구간으로 올라왔습니다.",
  },
  {
    title: "MCP 기반 확장성",
    body: "Playwright, Context7, Figma, Linear, Slack, Atlassian 같은 외부 시스템이 MCP로 연결되면서 에이전트가 진짜 맥락을 읽고 행동할 수 있게 됐습니다.",
  },
  {
    title: "검증과 관측성",
    body: "좋은 에이전트 팀은 더 이상 출력 길이나 말투로 평가하지 않습니다. eval, replay, traces, tool metrics, build results로 평가합니다.",
  },
] as const;

const HARNESS_SURFACES = [
  {
    title: "Memory",
    detail:
      "AGENTS.md, CLAUDE.md, 압축 문서, runbook, module map 같은 장기 기억층입니다. 세션이 바뀌어도 프로젝트의 룰과 검증 명령을 유지합니다.",
  },
  {
    title: "Skills",
    detail:
      "반복되는 워크플로를 재사용 가능한 문서 단위로 끌어올립니다. build, review, verify, deploy-check 같은 흐름이 여기에 속합니다.",
  },
  {
    title: "Subagents",
    detail:
      "reviewer, verifier, docs researcher, ops auditor 같이 좁은 역할을 나누어 병렬성과 정확성을 높입니다.",
  },
  {
    title: "Rules",
    detail:
      "위험 명령, 승인 경계, 읽으면 안 되는 비밀정보, 운영 시스템 변경 제한을 선언형으로 고정합니다.",
  },
  {
    title: "Hooks",
    detail:
      "세션 시작 시 컨텍스트 주입, 위험한 bash 차단, 수정 후 자동 lint/test 같은 동적 안전 장치를 맡깁니다.",
  },
] as const;

const MODEL_LEVELS = [
  {
    level: "L1",
    title: "빠른 보조",
    summary:
      "작은 파일 수정, 테스트 작성, 문서 초안, 반복 명령 자동화에 적합합니다. 설계 책임을 맡기기엔 아직 좁습니다.",
  },
  {
    level: "L2",
    title: "강한 구현자",
    summary:
      "명확한 계약 아래에서 기능 구현, 리팩터, API 분해, 테스트 루프까지 소화합니다. 현재 강한 30B 오픈 모델이 여기에 들어옵니다.",
  },
  {
    level: "L3",
    title: "아키텍트 보조",
    summary:
      "애매한 요구사항 정리, 장기 리팩터, 시스템 경계 설계까지 상당 수준으로 돕습니다. 그래도 최종 승인권은 사람에게 남아야 합니다.",
  },
] as const;

const ROLLOUT_STEPS = [
  "공통 검증 명령을 먼저 고정합니다.",
  "Claude Code 는 CLAUDE.md, Codex 는 AGENTS.md 와 config.toml 로 팀 공통 기본값을 맞춥니다. 두 파일은 보통 서로의 일부를 import 하거나 교차 참조하면 됩니다.",
  "review / verify / docs-researcher 같은 좁은 역할부터 subagent 로 분리합니다 (Claude Code 는 .claude/agents/, Codex 는 .codex/agents/).",
  "Playwright 와 Context7 처럼 가치가 즉시 보이는 MCP부터 붙입니다. 두 런타임 모두 같은 MCP 서버를 공유할 수 있습니다.",
  "위험 명령은 Rules 와 Hooks 두 층으로 막습니다 (Claude Code 는 settings.json permissions + hooks, Codex 는 execpolicy + hooks.json).",
  "도입 후에는 성능이 아니라 build 성공률, 리뷰 속도, 회귀 감소를 측정합니다.",
] as const;

const SYSTEM_STAGES = [
  {
    title: "Route",
    detail: "요청이 어떤 종류의 작업인지 분류하고, 필요한 문서와 역할을 먼저 결정합니다.",
  },
  {
    title: "Resolve",
    detail: "어떤 문서와 설정이 현재 authoritative source 인지 정합니다. AGENTS.md, runbook, architecture map 이 여기 들어갑니다.",
  },
  {
    title: "Execute",
    detail: "skills, subagents, tools, MCP를 사용해 실제 작업을 수행합니다.",
  },
  {
    title: "Validate",
    detail: "lint, build, test, review, replay 로 결과가 맞는지 검증합니다.",
  },
  {
    title: "Measure",
    detail: "성공률, 회귀, 리뷰 속도, 재작업 시간을 숫자로 남깁니다.",
  },
  {
    title: "Improve",
    detail: "실패 패턴을 기준으로 prompts가 아니라 harness 자체를 개선합니다.",
  },
  {
    title: "Recover",
    detail: "실패가 나면 원인 분류, 디버깅 playbook, rollback 전략으로 복구합니다.",
  },
] as const;

const MEASUREMENT_AXES = [
  "정확성: 결과가 실제로 맞는가",
  "완전성: 요청된 범위를 다 수행했는가",
  "명료성: 다른 개발자가 결과를 이해하고 이어받을 수 있는가",
  "효율성: 과도한 복잡도 없이 끝냈는가",
  "신뢰성: 비슷한 작업에서 일관되게 동작하는가",
  "제약 준수: rules, hooks, approval, security bar 를 지켰는가",
] as const;

const SOURCES = [
  { label: "Andrej Karpathy, Software 2.0", href: "https://karpathy.medium.com/software-2-0-a64152b37c35" },
  { label: "YC: Andrej Karpathy, Software Is Changing (Again)", href: "https://www.ycombinator.com/library/MW-andrej-karpathy-software-is-changing-again" },
  { label: "Anthropic, Building Effective Agents", href: "https://www.anthropic.com/news/building-effective-agents" },
  { label: "Anthropic Claude Code Overview", href: "https://docs.anthropic.com/en/docs/claude-code/overview" },
  { label: "Anthropic Claude Code Memory (CLAUDE.md)", href: "https://docs.anthropic.com/en/docs/claude-code/memory" },
  { label: "Anthropic Claude Code Hooks", href: "https://docs.anthropic.com/en/docs/claude-code/hooks" },
  { label: "Anthropic Claude Code Subagents", href: "https://docs.anthropic.com/en/docs/claude-code/sub-agents" },
  { label: "OpenAI Codex Docs", href: "https://developers.openai.com/codex/" },
  { label: "OpenAI Codex MCP Docs", href: "https://developers.openai.com/codex/mcp" },
  { label: "OpenAI Codex Hooks Docs", href: "https://developers.openai.com/codex/hooks" },
  { label: "OpenAI Codex AGENTS.md", href: "https://developers.openai.com/codex/agents-md" },
  { label: "Google Gemma 4 announcement", href: "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/" },
  { label: "Qwen3-Coder official blog", href: "https://qwenlm.github.io/blog/qwen3-coder/" },
  { label: "Context7 installation", href: "https://context7.com/docs/installation" },
  { label: "Playwright coding agents", href: "https://playwright.dev/docs/getting-started-cli" },
] as const;

const PAST_SOURCE_LINKS = [
  { label: "Software 2.0", href: "https://karpathy.medium.com/software-2-0-a64152b37c35" },
  { label: "LLM intro talk", href: "https://www.youtube.com/watch?v=zjkBMFhNj_g" },
  { label: "Software Is Changing (Again)", href: "https://www.ycombinator.com/library/MW-andrej-karpathy-software-is-changing-again" },
  { label: "Building Effective Agents", href: "https://www.anthropic.com/news/building-effective-agents" },
] as const;

const PRESENT_SOURCE_LINKS = [
  { label: "OpenAI Codex docs", href: "https://developers.openai.com/codex/" },
  { label: "OpenAI MCP docs", href: "https://developers.openai.com/codex/mcp" },
  { label: "Gemma 4 announcement", href: "https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/" },
  { label: "Qwen3-Coder blog", href: "https://qwenlm.github.io/blog/qwen3-coder/" },
  { label: "Context7 installation", href: "https://context7.com/docs/installation" },
  { label: "Playwright coding agents", href: "https://playwright.dev/docs/getting-started-cli" },
] as const;

const MODEL_SOURCE_LINKS = [
  { label: "Claude Opus 4.6", href: "https://www.anthropic.com/claude/opus" },
  { label: "Claude Sonnet 4.6", href: "https://www.anthropic.com/claude/sonnet" },
  { label: "Claude Haiku 4.5", href: "https://www.anthropic.com/claude/haiku" },
  { label: "GPT-5-Codex", href: "https://platform.openai.com/docs/models/gpt-5-codex" },
  { label: "GPT-5.4 mini", href: "https://platform.openai.com/docs/models/gpt-5.4-mini" },
  { label: "Gemma 4 31B", href: "https://huggingface.co/google/gemma-4-31B" },
  { label: "Qwen3-Coder-30B", href: "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct" },
] as const;

const CONCEPT_MAPPING = [
  {
    concept: "프로젝트 메모리",
    claude: "CLAUDE.md (@AGENTS.md import 가능)",
    codex: "AGENTS.md (디렉터리 계층 자동 탐색 + override)",
  },
  {
    concept: "런타임 설정",
    claude: ".claude/settings.json",
    codex: ".codex/config.toml + ~/.codex/config.toml",
  },
  {
    concept: "Skills (재사용 워크플로)",
    claude: ".claude/skills/<name>/SKILL.md (frontmatter, description 매칭으로 자동 활성화)",
    codex: ".agents/skills/<name>/SKILL.md (마크다운, 명시 호출 또는 description 매칭)",
  },
  {
    concept: "서브에이전트",
    claude: ".claude/agents/<name>.md (Markdown + frontmatter, sonnet/opus/haiku)",
    codex: ".codex/agents/<name>.toml (TOML, gpt-5.4 / gpt-5.4-mini / gpt-5.3-codex)",
  },
  {
    concept: "Hooks",
    claude: "settings.json hooks 섹션 + .claude/hooks/ 스크립트",
    codex: ".codex/hooks.json + .codex/hooks/ 스크립트",
  },
  {
    concept: "Rules / Permissions",
    claude: "settings.json allow/deny + .claude/rules/<path>.md",
    codex: ".codex/rules/default.rules (execpolicy: forbidden / prompt / allow)",
  },
  {
    concept: "MCP 외부 도구",
    claude: "플러그인 마켓 + 글로벌 mcp 설정",
    codex: ".codex/config.toml [mcp] 섹션 또는 codex mcp add",
  },
  {
    concept: "슬래시 명령",
    claude: "/skill-name (사용자 정의 + 플러그인)",
    codex: "/plan, /review, /compact, /resume, /fork (내장 강력)",
  },
  {
    concept: "샌드박스",
    claude: "권한 시스템 (allow / ask / deny 매처)",
    codex: "workspace-write / read-only / danger-full-access 명시 모드",
  },
  {
    concept: "멀티 에이전트",
    claude: "Agent Teams (실험적, env-var 게이트)",
    codex: "[agents] max_threads + parallel execution 정식 지원",
  },
] as const;

const COMMON_PATTERNS = [
  "팀의 사실은 모두 메모리 파일(CLAUDE.md / AGENTS.md)에 박는 것이 첫 단계입니다. 두 런타임 모두 세션 시작 시 자동 로드합니다.",
  "위험 명령은 declarative rules + dynamic hooks 두 층으로 막습니다. 한 층만 믿으면 우회 가능합니다.",
  "reviewer / verifier / docs-researcher 처럼 좁은 역할의 read-only 서브에이전트를 먼저 만드는 것이 가장 효과적입니다.",
  "MCP 서버는 두 런타임이 공유합니다. Playwright MCP 하나 설치하면 양쪽에서 같이 쓸 수 있습니다.",
  "검증 루프 (build, test, lint, eval) 가 끝나야 작업 완료입니다. 두 런타임 모두 verify-before-completion 패턴이 권장됩니다.",
  "세션 시작 hook 으로 저장소 컨텍스트(검증 명령, 운영 원칙)를 매번 주입하면 컨텍스트 누락이 줄어듭니다.",
  "파일 경로 기반 path-specific 규칙을 분리해 두면, 모듈별로 다른 안전 기준을 적용할 수 있습니다.",
  "분기별로 모델, MCP, rules, hooks, skills 를 같이 갱신하는 운영 리듬이 필요합니다.",
] as const;

const KEY_DIFFERENCES = [
  {
    area: "메모리 import 문법",
    claude: "@AGENTS.md 인라인 import 행 한 줄로 다른 파일을 끌어옵니다.",
    codex: "디렉터리 계층을 자동 탐색합니다. 하위 디렉터리의 AGENTS.override.md 가 우선합니다.",
  },
  {
    area: "Skill 자동 활성화",
    claude: "description 필드와 사용자 메시지가 매칭되면 자동으로 호출됩니다.",
    codex: "기본은 명시 호출입니다. description 매칭 자동 활성화는 더 보수적으로 동작합니다.",
  },
  {
    area: "Hook 입력 방식",
    claude: "$CLAUDE_TOOL_INPUT 환경변수와 stdin 둘 다 지원합니다.",
    codex: "stdin JSON payload 만 지원합니다. tool_input.file_path 같은 키를 직접 파싱합니다.",
  },
  {
    area: "위험 명령 차단 문법",
    claude: "Bash(rm -rf *) 같은 매처를 settings.json deny 배열에 둡니다.",
    codex: "prefix_rule(\"rm -rf\", forbidden) 형식의 execpolicy DSL 을 씁니다.",
  },
  {
    area: "기본 모델군",
    claude: "Opus 4.6 / Sonnet 4.6 / Haiku 4.5 (메인은 Opus, 보조는 Haiku)",
    codex: "gpt-5.4 (메인), gpt-5.3-codex (코딩 특화), gpt-5.4-mini (서브에이전트)",
  },
  {
    area: "내장 슬래시 명령",
    claude: "사용자 정의가 중심이고 내장 명령은 적습니다. 플러그인 마켓이 강합니다.",
    codex: "/plan, /review, /resume, /fork, /compact 등 강력한 내장 명령이 자체로 워크플로를 만듭니다.",
  },
  {
    area: "Plan mode",
    claude: "planning 은 사용자가 명시적으로 요청해야 합니다. 별도 모드는 아닙니다.",
    codex: "/plan 또는 Shift+Tab 으로 plan mode 진입. 어려운 작업의 기본 진입점입니다.",
  },
  {
    area: "비용 모델",
    claude: "Anthropic 구독 (Pro / Team / Enterprise) 또는 API 키.",
    codex: "OpenAI API 키. ChatGPT Plus / Team 계정과도 연동 가능.",
  },
  {
    area: "멀티 에이전트 성숙도",
    claude: "Agent Teams 가 환경변수 게이트 뒤에 있습니다. 아직 실험적입니다.",
    codex: "[agents] 섹션이 정식 기능입니다. max_threads, job_max_runtime_seconds 같은 운영 옵션이 있습니다.",
  },
  {
    area: "이 사이트가 둘 다 지원하는 방식",
    claude: "kotlin-codex/.claude/ 디렉터리 — settings.json hooks 3개, agents 3개, skills 8개.",
    codex: "kotlin-codex/.codex/ 디렉터리 — config.toml, hooks.json, agents 7개, .agents/skills/ 6개.",
  },
] as const;

const WHEN_TO_PICK = [
  {
    title: "팀이 이미 ChatGPT 를 쓰고 있다면",
    answer: "Codex 부터 시작하세요. 기존 OpenAI 계정과 연동되고, plan mode 가 학습 곡선을 줄입니다.",
  },
  {
    title: "팀이 이미 Anthropic Claude 를 쓰고 있다면",
    answer: "Claude Code 부터 시작하세요. 동일 구독 안에서 추가 비용 없이 시작할 수 있고, 플러그인 마켓이 강합니다.",
  },
  {
    title: "둘 다 시도해 보고 싶다면",
    answer:
      "공통 메모리(같은 내용을 CLAUDE.md / AGENTS.md 양쪽에 두기), 공통 검증 명령, 공통 MCP 세트를 먼저 만들고, 그 위에서 두 런타임을 동시에 운영해 보세요. 같은 작업을 양쪽에 던져 보는 것이 가장 빠른 비교입니다.",
  },
  {
    title: "서로 보완해서 쓰고 싶다면",
    answer:
      "Codex 의 plan mode 와 강력한 /review 를 설계 단계에 쓰고, Claude Code 의 플러그인 마켓과 자동 활성화 skills 를 일상 구현 단계에 쓰는 조합이 자주 거론됩니다.",
  },
] as const;

export const metadata: Metadata = {
  title: "Agentic Coding Harness 엔지니어링 핸드북",
  description:
    "agentic coding harness 엔지니어링의 과거 발전 과정, 현재의 최신 스택, 모델 해석, MCP 확장, 사내 도입 방식, 미래 방향을 한 흐름으로 정리한 장문형 핸드북 페이지입니다.",
};

export default function HandbookPage() {
  return (
    <div className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
                Handbook
              </p>
              <h1 className="balanced-korean-heading mt-3 font-serif text-3xl leading-[1.12] tracking-tight text-foreground">
                Agentic Coding Harness
                <br />
                엔지니어링
              </h1>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                Agentic Coding Handbook
              </p>
              <p className="mt-4 text-sm leading-7 text-foreground-muted">
                사내 개발자가 하네스를 이해하고 직접 셋업해서 생산성을 올릴 수 있도록,
                과거의 발전사부터 현재의 최신 스택, 앞으로의 방향까지 한 흐름으로 연결한 페이지입니다.
              </p>

              <div className="mt-6 border-t border-border pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  On This Page
                </p>
                <nav aria-label="핸드북 목차" className="mt-3 space-y-2">
                  {TOC.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-md px-3 py-2 text-sm text-foreground-muted transition hover:bg-background hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <article className="space-y-8">
              <section id="intro" className="rounded-2xl border border-border bg-surface p-7">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
                  Book-Length Introduction
                </p>
                <h2 className="balanced-korean-heading mt-3 max-w-[19ch] font-serif text-4xl leading-[1.15] tracking-tight text-foreground sm:text-5xl">
                  이제 중요한 것은 “어떤 모델인가”보다
                  <br />
                  “어떤 하네스로 일하게 만드는가”입니다
                </h2>
                <p className="pretty-korean-copy mt-5 max-w-[60ch] text-[17px] leading-8 text-foreground-muted">
                  사내 개발자가 에이전트를 많이 이해하고 많이 셋업해 실제 생산성을 올리려면, 감탄문보다
                  기술적인 뒷받침이 필요합니다. 왜 이 모델이 이 수준의 코딩을 할 수 있는지, 어떤 설정이
                  안전을 보장하는지, 왜 MCP와 hooks와 rules가 필요한지까지 이어져야 도입이 됩니다.
                </p>
                <Callout tone="note" title="이 페이지의 목표">
                  <p>
                    이 핸드북은 사내 개발자에게 “AI 코딩 도구 소개”를 하려는 문서가 아닙니다.
                    <strong> agentic coding harness 엔지니어링</strong>을 하나의 독립된 공학 분야로 다루는 문서입니다.
                  </p>
                </Callout>
              </section>

              <section id="past" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  과거 발전 과정: 자동완성에서 하네스 공학으로
                </h2>
                <div className="mt-6">
                  <HandbookTimeline />
                </div>
                <div className="mt-6 space-y-4 text-[16px] leading-8 text-foreground-muted">
                  <p>
                    <strong>2017</strong> 에는 “사람이 직접 코드를 다 쓰지 않아도, 학습된 모델 자체가 하나의 소프트웨어처럼 작동할 수 있다”는 관점이 널리 정리되기 시작했습니다.
                    지금 우리가 LLM을 도구로 다루는 흐름의 출발점 중 하나가 여기입니다.
                  </p>
                  <p>
                    <strong>2023</strong> 에는 LLM 하나만 보는 게 아니라, 프롬프트, 컨텍스트, 메모리, 도구를 함께 관리하는 방식이 중요하다는 관점이 강해졌습니다.
                    즉, 모델보다 “모델을 둘러싼 실행 환경”이 더 중요해지기 시작한 시기입니다.
                  </p>
                  <p>
                    <strong>2024</strong> 에는 “무조건 복잡한 에이전트를 만들기보다, 단순한 작업 흐름이 더 나을 때가 많다”는 기준이 정리됐습니다.
                    에이전트를 어디에 써야 하고, 어디에는 단순 workflow가 더 좋은지를 구분하는 감각이 생겼습니다.
                  </p>
                  <p>
                    <strong>2025~2026</strong> 에는 Ralph loop, 평가 루프, 컨텍스트 관리, MCP 같은 기법이 한데 모이면서
                    지금의 하네스 엔지니어링으로 이어졌습니다. 이제는 프롬프트를 잘 쓰는 것보다, 작업 환경을 잘 설계하는 것이 더 중요해졌습니다.
                  </p>
                </div>
                <div className="mt-6 rounded-xl border border-border bg-background p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">Section Sources</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {PAST_SOURCE_LINKS.map((source) => (
                      <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
                        {source.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              <section id="present" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  현재 가장 핫한 흐름: 모델보다 런타임과 확장성이 중요해졌습니다
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  2026년의 agentic coding은 “좋은 모델 하나를 고르는 문제”로 설명하기 어렵습니다. 실제 체감 생산성은
                  모델 자체보다 런타임의 능력, 외부 맥락의 품질, 자동화된 검증, 관측성, 조직 정책과 더 강하게 얽혀 있습니다.
                  같은 모델을 써도 누군가는 매우 강한 결과를 얻고, 누군가는 실망하는 이유가 여기 있습니다.
                </p>
                <div className="mt-6">
                  <HarnessLandscape />
                </div>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {CURRENT_STACK.map((item) => (
                    <div key={item.title} className="rounded-xl border border-border bg-background p-5">
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.body}</p>
                    </div>
                  ))}
                </div>
                <Callout tone="warning" title="지금의 핵심 변화">
                  <p>
                    생산성은 더 이상 모델 지능 하나로 결정되지 않습니다. 실제 업무에서는
                    <strong>문서 인용 기반 응답, 브라우저 실행, 이슈 연동, 위험 명령 차단, 검증 루프</strong>가 없는 모델은
                    오래 쓰기 어렵습니다.
                  </p>
                </Callout>
                <ProseHeading level={3}>지금 뜨는 조합은 무엇인가</ProseHeading>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  지금 가장 실용적인 조합은 대체로 비슷합니다. 메인 세션에는 강한 최상위 런타임을 두고, 문서 인용에는 Context7,
                  UI 검증에는 Playwright MCP, 작업 추적에는 Linear나 GitHub, 팀 문서와 협업에는 Slack 또는 Atlassian 같은 외부 연결을 붙입니다.
                  여기에 rules와 hooks로 안전 장치를 추가하고, build/test/verify 스크립트로 품질을 닫는 구조가 현재 가장 재현성이 높습니다.
                </p>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  특히 오픈 모델의 실용화는 중요한 변화입니다. 예전에는 오픈 모델이 “보조적인 분석 도구”에 가까웠다면,
                  지금의 강한 30B급 coder 모델은 명확한 계약과 좋은 하네스 아래에서 실제 구현과 구조 정리, 테스트 보강까지 감당하는 구간으로 올라왔습니다.
                  그래서 앞으로는 “폐쇄형 vs 오픈형”의 이분법보다, 어떤 역할에 어떤 모델을 배치하느냐가 더 중요해집니다.
                </p>
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">Section Sources</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {PRESENT_SOURCE_LINKS.map((source) => (
                      <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
                        {source.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              <section id="engineering" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  왜 “하네스 엔지니어링”이라고 부르는가
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  하네스는 모델을 감싸는 운영 구조입니다. 즉흥적인 vibe coding 과 달리, 구조화된 하네스는 메모리, 스킬,
                  서브에이전트, 정책, 훅, 검증 루프를 설계합니다. 이것은 프롬프트 팁이 아니라 소프트웨어 엔지니어링의 새로운 하위 분야에 가깝습니다.
                </p>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  이 표현을 굳이 “엔지니어링”이라고 부르는 이유는 두 가지입니다. 첫째, 재현 가능성이 있어야 합니다.
                  같은 저장소, 같은 규칙, 같은 검증 명령이라면 다른 개발자나 다른 세션도 비슷한 품질을 내야 합니다.
                  둘째, 유지보수가 가능해야 합니다. 실패가 났을 때 “프롬프트를 좀 더 잘 써 보자”가 아니라, 어느 층에서 고쳐야 하는지 분리해서 다뤄야 합니다.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {HARNESS_SURFACES.map((surface, index) => (
                    <div key={surface.title} className="rounded-xl border border-border bg-background p-5">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
                        0{index + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">{surface.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">{surface.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="system" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  운영 시스템으로서의 하네스
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  이번에 살펴본 <code className="rounded bg-background px-1 py-0.5 font-mono text-sm">codexmaster</code> 문서 구조에서 가장 배울 점은,
                  하네스를 기능 모음이 아니라 <strong>운영 시스템</strong> 으로 설명한다는 것입니다. 이 관점은 우리 사이트에도 잘 맞습니다.
                  실제로 좋은 하네스는 단순한 prompt template이 아니라, 실행 순서와 검증, 계측, 디버깅, 복구를 묶은 시스템입니다.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {SYSTEM_STAGES.map((stage) => (
                    <div key={stage.title} className="rounded-xl border border-border bg-background p-5">
                      <h3 className="text-lg font-semibold text-foreground">{stage.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">{stage.detail}</p>
                    </div>
                  ))}
                </div>

                <Callout tone="note" title="핵심 차이">
                  <p>
                    여기서 중요한 변화는 “잘 쓰는 프롬프트”에서 “잘 설계된 실행 파이프라인”으로 시선이 이동한다는 점입니다.
                    사내 생산성은 개별 개발자의 prompt 감각보다, 이 pipeline 을 얼마나 잘 표준화했는가에 더 크게 좌우됩니다.
                  </p>
                </Callout>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  실무에서 이 시선 전환은 꽤 큽니다. 예를 들어 “왜 어떤 개발자는 잘 쓰고 어떤 개발자는 못 쓰는가”를 개인 역량 문제로 돌리기 쉽지만,
                  실제로는 공통 문서, 공통 검증, 공통 safety bar, 공통 MCP 세트가 없는 팀에서 결과 편차가 커집니다. 반대로 이 층이 잘 설계된 팀은
                  프롬프트를 조금 덜 잘 써도 평균 품질이 안정됩니다.
                </p>

                <ProseHeading level={3}>측정 체계도 함께 있어야 합니다</ProseHeading>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  `codexmaster` 에서 또 좋았던 부분은 metrics 문서를 별도로 둔 점입니다. 우리도 같은 관점이 필요합니다.
                  에이전트 도입은 체감이 아니라 수치로 봐야 합니다.
                </p>
                <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
                  {MEASUREMENT_AXES.map((axis) => (
                    <li key={axis}>{axis}</li>
                  ))}
                </ul>

                <ProseHeading level={3}>디버깅도 playbook 화해야 합니다</ProseHeading>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  에이전트가 낸 이상한 결과를 “모델이 원래 그래”로 넘기지 말고, 실패 재현 → 증거 수집 → root cause →
                  최소 수정 → 검증으로 이어지는 디버깅 playbook을 가져야 합니다. 이 부분도 앞으로 handbook과 playbook에 더 확장할 가치가 큽니다.
                </p>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  결국 하네스는 코드 생성기를 넘어 일종의 개발 운영체제 역할을 하게 됩니다. 문맥을 불러오고, 작업을 분배하고, 위험을 제한하고,
                  실행 결과를 다시 시스템에 학습시키는 구조가 있어야 장기적으로 팀 생산성이 올라갑니다.
                </p>
              </section>

              <section id="models" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  모델을 어떻게 해석해야 하나: 코딩과 아키텍처 능력의 현실적 레벨
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  모델은 계속 경량화되고 빨라지고 있습니다. 중요한 것은 벤치마크 숫자를 외우는 것이 아니라,
                  그 모델이 어느 수준의 코딩과 설계 판단까지 감당할 수 있는지 읽는 것입니다.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {MODEL_LEVELS.map((item) => (
                    <div key={item.level} className="rounded-xl border border-border bg-background p-5">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{item.level}</p>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.summary}</p>
                    </div>
                  ))}
                </div>
                <Callout tone="tip" title="실무 해석">
                  <p>
                    사내 개발 생산성을 높이려면, 작은 모델을 대체재로 보는 대신 역할을 좁혀 쓰는 편이 좋습니다.
                    강한 frontier 모델은 메인 세션과 설계 판단에, 강한 open 30B 모델은 구현과 보조 설계에,
                    작은 모델은 reviewer/verifier/searcher 역할에 두는 것이 가장 현실적입니다.
                  </p>
                </Callout>
                <ProseHeading level={3}>벤치마크를 조직에 어떻게 번역할 것인가</ProseHeading>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  사내 도입 관점에서 중요한 것은 “어떤 모델이 1등인가”가 아닙니다. 실제 질문은 이렇습니다.
                  이 모델을 junior 개발자 보조처럼 쓸 것인지, reviewer처럼 쓸 것인지, 설계 파트너처럼 쓸 것인지, 문서 요약과 검색 전용으로 둘 것인지.
                  즉, 모델 선택은 언제나 역할 설계와 같이 가야 합니다.
                </p>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  또 하나 중요한 점은 비용 구조입니다. 메인 세션을 최고 모델로 두는 것은 꽤 자주 정당화되지만,
                  reviewer나 verifier까지 모두 비싼 모델로 두는 것은 보통 과합니다. “메인 하나 + 작은 서브에이전트 여러 개” 구성이
                  실제 조직에서는 가장 오래 가는 경우가 많습니다.
                </p>
                <div className="rounded-xl border border-border bg-background p-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">Section Sources</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {MODEL_SOURCE_LINKS.map((source) => (
                      <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
                        {source.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              <section id="rollout" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  사내 도입은 도구 소개가 아니라 작업 방식 표준화로 가야 합니다
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  개발자가 많을수록 “각자 알아서 잘 쓰기”는 실패합니다. 공통 검증 명령, 공통 AGENTS.md 구조,
                  공통 safety bar, 공통 MCP 세트, 공통 도입 순서가 먼저 있어야 합니다.
                </p>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  이건 단순한 교육 문제가 아닙니다. 팀에서 “하네스를 어떻게 표준으로 제공할 것인가”의 문제입니다.
                  예를 들어, 누군가는 hooks를 쓰고 누군가는 안 쓰고, 누군가는 다른 verify 명령을 쓰고, 누군가는 로컬에서만 통과하는 스크립트를 쓰면
                  에이전트 품질보다 협업 비용이 먼저 커집니다. 그래서 도입은 항상 문서와 설정을 함께 배포하는 방식으로 가야 합니다.
                </p>
                <div className="mt-5 space-y-3">
                  {ROLLOUT_STEPS.map((step, index) => (
                    <div key={step} className="grid gap-3 rounded-xl border border-border bg-background px-5 py-4 md:grid-cols-[52px_minmax(0,1fr)]">
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border font-mono text-xs text-foreground-subtle">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-foreground-muted">{step}</p>
                    </div>
                  ))}
                </div>
                <CodeBlockLike />
                <ProseHeading level={3}>권장 도입 단계</ProseHeading>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-lg font-semibold text-foreground">Phase 1</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      AGENTS.md, verify script, 기본 config.toml, 최소 rules를 배포합니다. 아직은 공통 안전선만 맞추는 단계입니다.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-lg font-semibold text-foreground">Phase 2</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      reviewer, verifier, hooks, Playwright, Context7 같은 실전 가치가 높은 층을 추가합니다.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-lg font-semibold text-foreground">Phase 3</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      운영 지표, 도구 호출 추적, 팀 단위 MCP 정책, 역할별 서브에이전트를 조직 표준으로 끌어올립니다.
                    </p>
                  </div>
                </div>
              </section>

              <section id="claude-codex" className="rounded-2xl border border-border bg-surface p-7">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
                  Side-by-side
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Claude Code 와 Codex — 같은 개념, 다른 이름
                </h2>
                <p className="mt-4 max-w-[68ch] text-[16px] leading-8 text-foreground-muted">
                  이 사이트의 카탈로그는 두 런타임을 모두 지원합니다. 기능적으로는 거의 같은 일을 합니다. 다만
                  파일 이름, 설정 문법, 슬래시 명령, 안전 장치의 표현 방식이 조금씩 다릅니다. 같은 운영 사상을
                  두 도구에 어떻게 옮기는지가 핵심이며, 이 섹션은 그 mapping 과 차이점을 한 번에 정리합니다.
                </p>

                <ProseHeading level={3}>같은 개념의 자리</ProseHeading>
                <div className="mt-5 overflow-hidden rounded-2xl border border-border">
                  <div className="grid grid-cols-1 bg-surface-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]">
                    <span>개념</span>
                    <span className="hidden md:block">Claude Code</span>
                    <span className="hidden md:block">Codex</span>
                  </div>
                  <ul className="divide-y divide-border bg-background">
                    {CONCEPT_MAPPING.map((row) => (
                      <li
                        key={row.concept}
                        className="grid grid-cols-1 gap-2 px-5 py-4 text-sm md:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)] md:gap-4"
                      >
                        <div className="font-semibold text-foreground">{row.concept}</div>
                        <div className="text-foreground-muted">
                          <span className="md:hidden font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                            Claude Code
                          </span>
                          <span className="block md:inline">{row.claude}</span>
                        </div>
                        <div className="text-foreground-muted">
                          <span className="md:hidden font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">
                            Codex
                          </span>
                          <span className="block md:inline">{row.codex}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <ProseHeading level={3}>둘 다 똑같이 적용되는 공통 패턴</ProseHeading>
                <ul className="mt-5 grid gap-3 md:grid-cols-2">
                  {COMMON_PATTERNS.map((pattern, index) => (
                    <li
                      key={pattern}
                      className="flex gap-3 rounded-xl border border-border bg-background p-4 text-sm leading-7 text-foreground-muted"
                    >
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/60 font-mono text-[11px] text-accent">
                        {index + 1}
                      </span>
                      <span>{pattern}</span>
                    </li>
                  ))}
                </ul>

                <ProseHeading level={3}>의미 있는 차이점</ProseHeading>
                <p className="mt-3 max-w-[68ch] text-sm leading-7 text-foreground-muted">
                  세부 문법 차이는 많지만, 운영에 영향을 주는 지점만 골랐습니다. 도구를 옮기거나 둘을 동시에
                  쓸 때 가장 자주 부딪히는 지점들입니다.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {KEY_DIFFERENCES.map((diff) => (
                    <div key={diff.area} className="rounded-xl border border-border bg-background p-5">
                      <h4 className="font-semibold tracking-tight text-foreground">{diff.area}</h4>
                      <div className="mt-3 grid gap-3 text-sm leading-7 text-foreground-muted">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                            Claude Code
                          </p>
                          <p className="mt-1">{diff.claude}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-2">
                            Codex
                          </p>
                          <p className="mt-1">{diff.codex}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <ProseHeading level={3}>나란히 두는 도입 설정 예시</ProseHeading>
                <p className="mt-3 max-w-[68ch] text-sm leading-7 text-foreground-muted">
                  같은 팀 안전 기본값을 두 런타임에 어떻게 옮기는지 한 화면에 둡니다. 두 파일은 같은 사상을
                  표현하지만 문법이 다릅니다.
                </p>
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                  <div className="overflow-hidden rounded-xl border border-border bg-background">
                    <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/40" />
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/40" />
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/40" />
                      <span className="ml-3 font-mono text-xs text-accent">Claude Code · .claude/settings.json</span>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-foreground">
                      <code>{`{
  "permissions": {
    "allow": [
      "Bash(./gradlew test)",
      "Bash(pnpm build)",
      "Read(**/*.md)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force)",
      "Read(.env)"
    ]
  },
  "hooks": {
    "SessionStart": [
      { "command": ".claude/hooks/session_start.py" }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": ".claude/hooks/pre_bash_guard.py"
      }
    ]
  }
}`}</code>
                    </pre>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-border bg-background">
                    <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/40" />
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/40" />
                      <span className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/40" />
                      <span className="ml-3 font-mono text-xs text-accent-2">Codex · .codex/config.toml + rules</span>
                    </div>
                    <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-foreground">
                      <code>{`# .codex/config.toml
model = "gpt-5.4"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[features]
codex_hooks = true
multi_agent = true

[agents]
max_threads = 6
job_max_runtime_seconds = 1800

# .codex/rules/default.rules
prefix_rule("rm -rf", forbidden)
prefix_rule("git push --force", forbidden)
prefix_rule("git push", prompt)

# .codex/hooks.json
{
  "SessionStart": [{ "command": ".codex/hooks/session_start.py" }],
  "PreToolUse": [
    { "matcher": "Bash", "command": ".codex/hooks/pre_bash_guard.py" }
  ]
}`}</code>
                    </pre>
                  </div>
                </div>

                <ProseHeading level={3}>어느 쪽을 먼저 시작해야 하는가</ProseHeading>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {WHEN_TO_PICK.map((item) => (
                    <div key={item.title} className="rounded-xl border border-border bg-background p-5">
                      <h4 className="font-semibold text-foreground">{item.title}</h4>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.answer}</p>
                    </div>
                  ))}
                </div>

                <Callout tone="tip" title="한 줄 정리">
                  <p>
                    두 런타임은 사상은 거의 같습니다. 다른 것은 파일 이름과 문법뿐입니다. 같은 메모리, 같은 검증
                    명령, 같은 안전 기본값을 두 곳에 모두 두면, 사실상 어느 도구를 쓰든 같은 팀 표준이 됩니다.
                    그 다음에 각자의 강점(Codex 의 plan mode, Claude Code 의 플러그인 마켓)으로 분기하시면 됩니다.
                  </p>
                </Callout>

                <p className="mt-5 max-w-[68ch] text-sm leading-7 text-foreground-muted">
                  더 자세한 비교는{" "}
                  <Link href="/architecture/claude-vs-codex" className="text-accent hover:underline">
                    /architecture/claude-vs-codex
                  </Link>
                  {" "}페이지의 전체 비교 표를, 실제 설정 적용은{" "}
                  <Link href="/playbook/setup-claude-code" className="text-accent hover:underline">
                    /playbook/setup-claude-code
                  </Link>
                  {" "}와{" "}
                  <Link href="/playbook/setup-codex" className="text-accent hover:underline">
                    /playbook/setup-codex
                  </Link>
                  {" "}를 참고해 주십시오.
                </p>
              </section>

              <section id="site-map" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  이 사이트를 어떻게 읽으면 되는가
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  이 핸드북은 설명의 중심축이고, 나머지 페이지들은 각 층을 더 깊게 파는 역할입니다.
                  아래 순서를 따라가면 한 번의 세션에서 이해가 끊기지 않습니다.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <Link href="/guide" className="rounded-xl border border-border bg-background p-5 transition hover:border-accent">
                    <h3 className="text-lg font-semibold text-foreground">사이트 가이드</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      전체 사이트를 어떤 순서로 읽어야 하는지 설명하는 위키형 페이지입니다.
                    </p>
                  </Link>
                  <Link href="/methodology/karpathy" className="rounded-xl border border-border bg-background p-5 transition hover:border-accent">
                    <h3 className="text-lg font-semibold text-foreground">방법론</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      Software 2.0/3.0, Ralph, eval-driven, context engineering 같은 사상층입니다.
                    </p>
                  </Link>
                  <Link href="/architecture/overview" className="rounded-xl border border-border bg-background p-5 transition hover:border-accent">
                    <h3 className="text-lg font-semibold text-foreground">아키텍처</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      5-레이어 구조와 Claude/Codex 비교를 다룹니다.
                    </p>
                  </Link>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-lg font-semibold text-foreground">플레이북</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      실제 설정 파일과 도입 순서를 정리한 실전형 페이지입니다.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link
                        href="/playbook/setup-claude-code"
                        className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-accent hover:border-accent hover:bg-accent/10"
                      >
                        Claude Code →
                      </Link>
                      <Link
                        href="/playbook/setup-codex"
                        className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-accent-2 hover:border-accent-2 hover:bg-accent-2/10"
                      >
                        Codex →
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              <section id="future" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  앞으로의 방향: 모델 경쟁이 런타임 경쟁으로 옮겨갑니다
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  모델 자체의 지능 향상은 앞으로 1~3년도 계속됩니다. Epoch AI 의 컴퓨트 추정에 따르면 최상위 학습
                  컴퓨트는 매년 4~5배 가까이 늘어 왔고, 단기간에 이 곡선이 꺾일 신호는 보이지 않습니다(
                  <a
                    href="https://epoch.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    epoch.ai
                  </a>
                  ). 그런데 같은 모델을 같은 회사 안에서 두 팀이 써도 체감 생산성이 크게 갈리는 현장을 보면, 결국
                  차이는 모델 자체가 아니라 그 모델을 둘러싼 작업 환경 — 즉 하네스 — 에서 벌어집니다.
                </p>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  그래서 다음 1~3년의 경쟁은 “더 큰 모델”이 아니라 다음 다섯 가지 운영 영역에서 결정될 가능성이
                  높습니다.
                </p>

                <ProseHeading level={3}>1. 작업 길이가 늘어나면 감독·검증이 새 병목이 됩니다</ProseHeading>
                <p className="mt-3 text-[16px] leading-8 text-foreground-muted">
                  METR 의 2025년 “Measuring AI Ability to Complete Long Tasks” 연구는 모델이 자율적으로
                  끝낼 수 있는 작업의 길이가 지난 5년 동안 약 7개월마다 두 배가 됐다고 보고했습니다(
                  <a
                    href="https://metr.org"
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    metr.org
                  </a>
                  ). 이 곡선이 계속된다면 다음 세대에서 가장 먼저 무너지는 것은 단순 자동완성이 아니라{" "}
                  <strong>장기 작업을 사람이 어떻게 감독하고 검증할 것인가</strong> 입니다. 모델 벤치마크 숫자로는
                  이 문제가 잡히지 않고, 메모리 운영, 검증 루프, 관측 인프라처럼 하네스 측 변수로만 잡힙니다.
                </p>

                <ProseHeading level={3}>2. 강한 작은 모델의 역할 고정</ProseHeading>
                <p className="mt-3 text-[16px] leading-8 text-foreground-muted">
                  모든 작업을 최상위 모델 한 곳에 던지는 시대는 비용 측면에서도 곧 끝납니다. 앞으로는 메인 세션
                  (Claude Opus 4.6 / GPT-5.4)을 두고, reviewer · verifier · docs researcher · browser
                  operator 같은 좁은 역할은 더 작고 빠른 모델 (Claude Haiku 4.5, GPT-5.4 mini, Gemma 4 31B,
                  Qwen3-Coder 30B)로 분리하는 멀티 에이전트 운영이 일반화될 가능성이 높습니다. Anthropic 의
                  “Building Effective Agents”가 강조한 “필요할 때만 agent, 그 외에는 단순 workflow”라는 원칙도
                  같은 방향입니다(
                  <a
                    href="https://www.anthropic.com/news/building-effective-agents"
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    anthropic.com
                  </a>
                  ).
                </p>

                <ProseHeading level={3}>3. 조직 차원의 정책이 개인 프롬프트보다 중요해집니다</ProseHeading>
                <p className="mt-3 text-[16px] leading-8 text-foreground-muted">
                  “누가 더 좋은 프롬프트를 쓰는가”라는 질문은 점점 의미가 줄어듭니다. 같은 팀이 같은 저장소에서
                  같은 결과를 일관되게 낼 수 있는가가 더 중요해집니다. 그 일관성을 만드는 것은 개인 감각이 아니라
                  팀 표준 — 공통 CLAUDE.md / AGENTS.md, 공통 검증 스크립트, 공통 MCP 세트, 공통 위험 명령 차단,
                  공통 회고 지표 — 입니다. 하네스는 도구 사용법이 아니라 엔지니어링 문화와 운영 표준의 문제입니다.
                </p>

                <ProseHeading level={3}>4. 특히 중요해질 운영 영역 세 가지</ProseHeading>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-border bg-background p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">하나</p>
                    <h4 className="mt-2 text-base font-semibold text-foreground">런타임 관측성</h4>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      어떤 도구가 병목인지, 어떤 MCP 가 자주 실패하는지, 어떤 워크플로에서 토큰 비용이 튀는지 보지
                      못하면 다음 단계 개선이 막힙니다. 도구 호출 추적, MCP 호출 지연시간, 세션당 토큰 사용량을
                      측정하는 일이 예전 APM 만큼 기본기가 됩니다.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">둘</p>
                    <h4 className="mt-2 text-base font-semibold text-foreground">조직 단위 정책</h4>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      팀이 사용할 MCP 등록부, 허용 명령 목록, 프로필 표준, 승인 정책, 비밀정보 마스킹 같은 조직
                      차원의 규칙이 점점 중요해집니다. Anthropic 의 Responsible Scaling Policy 처럼{" "}
                      <em>안전 기본값은 회사가 미리 정해 놓고 개발자는 그 위에서 작업하는 모델</em> 이 일반화될
                      가능성이 높습니다(
                      <a
                        href="https://www.anthropic.com/news/anthropics-responsible-scaling-policy"
                        target="_blank"
                        rel="noreferrer"
                        className="text-accent hover:underline"
                      >
                        anthropic.com
                      </a>
                      ).
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">셋</p>
                    <h4 className="mt-2 text-base font-semibold text-foreground">역할 특화 에이전트 팀</h4>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      메인 세션 하나로 모든 일을 처리하는 대신, 브라우저 전용, 검증 전용, 문서 전용, 보안 감사
                      전용 에이전트로 역할이 분리됩니다. 이 분리는 비용을 줄일 뿐 아니라, 한 에이전트가 컨텍스트
                      한도를 다 써 버리는 상황을 막아 결과 품질을 안정시킵니다.
                    </p>
                  </div>
                </div>

                <ProseHeading level={3}>5. 한국 조직에 특히 중요한 변수</ProseHeading>
                <p className="mt-3 text-[16px] leading-8 text-foreground-muted">
                  위의 흐름은 글로벌 공통이지만, 한국 조직에는 추가로 고려해야 할 변수가 몇 개 더 있습니다.
                </p>
                <ul className="mt-3 list-disc space-y-3 pl-6 text-[16px] leading-8 text-foreground">
                  <li>
                    <strong>데이터 주권과 보안 등급:</strong> 공공·금융·국방 도메인은 외부 LLM API 직접 호출이
                    어려워, 사내 VPC 안에서 돌릴 수 있는 강한 오픈 모델(Gemma 4 31B, Qwen3-Coder 30B 등)과 자체
                    호스팅 추론 스택의 가치가 더 큽니다. 어느 글로벌 모델이 1등인가보다, 망 분리 환경에서 안정적으로
                    돌릴 수 있는 모델을 어떻게 운영하는가가 더 실질적인 질문이 됩니다.
                  </li>
                  <li>
                    <strong>한국어 코드 리뷰와 사양서 품질:</strong> 영어 essay 리뷰는 잘 되지만 한국어 코드
                    코멘트, 한국어 사양서, 한국어 운영 메시지에서는 모델 차이가 더 큽니다. 이 부분은 외부 벤치마크가
                    아니라 사내 평가 데이터셋(eval)으로만 측정할 수 있습니다.
                  </li>
                  <li>
                    <strong>한국 특화 PII 마스킹:</strong> 주민등록번호, 사업자번호, 한글 주소 같은 한국 특화
                    개인정보 필터링은 대부분의 글로벌 가드레일에 빠져 있어, 사내 hook 또는 사전 필터로 직접
                    추가해야 안전합니다.
                  </li>
                  <li>
                    <strong>요금 환경:</strong> 한국 회사 결제 환경에서 OpenAI / Anthropic 구독을 일괄 결제하는
                    방식이 부서별로 다릅니다. 토큰 비용이 곧 회사 비용이 되는 운영 모델을 미리 정해 두지 않으면,
                    개인 카드로 시작했다가 회수가 어려운 경우가 자주 생깁니다.
                  </li>
                </ul>

                <ProseHeading level={3}>3년 뒤에 무엇이 달라져 있어야 하는가</ProseHeading>
                <p className="mt-3 text-[16px] leading-8 text-foreground-muted">
                  Dario Amodei 의 “Machines of Loving Grace”(2024년 10월)는 향후 5~10년의 AI 진보가 과학·헬스
                  케어·개발 생산성에 큰 변화를 줄 가능성을 정리합니다(
                  <a
                    href="https://darioamodei.com/machines-of-loving-grace"
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    darioamodei.com
                  </a>
                  ). 반면 Sam Altman 의 “Three Observations”(2025년 2월)는 같은 곡선을 더 짧은 시간 단위로
                  봅니다(
                  <a
                    href="https://blog.samaltman.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline"
                  >
                    blog.samaltman.com
                  </a>
                  ). 어느 쪽이 더 맞는지와 무관하게, 조직이 지금부터 3년 동안 갖춰 둬야 하는 능력은 다음 세 가지로
                  좁혀집니다.
                </p>
                <ol className="mt-3 list-decimal space-y-2 pl-6 text-[16px] leading-8 text-foreground">
                  <li>
                    세션 메모리, 검증 명령, MCP 세트, hook 정책을 코드처럼 버전 관리하는 운영 능력
                  </li>
                  <li>
                    도구 호출과 에이전트 비용을 지표로 보는 관측 인프라
                  </li>
                  <li>
                    모델이 언제든 교체될 수 있다는 가정 위에서, 모델 종속성을 최소화한 하네스 설계
                  </li>
                </ol>

                <Callout tone="tip" title="한 줄 요약">
                  <p>
                    앞으로의 경쟁은 “더 큰 모델”만으로 설명되지 않습니다. 같은 모델을 두고도 더 좋은 메모리 운영,
                    더 명확한 문서, 더 자동화된 검증 루프, 더 안전한 MCP 정책, 더 정교한 호출 추적을 가진 팀이
                    결국 더 높은 생산성을 가져갑니다.
                  </p>
                </Callout>
              </section>

              <section id="sources" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  주요 자료
                </h2>
                <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
                  {SOURCES.map((source) => (
                    <li key={source.href}>
                      <a href={source.href} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                        {source.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

function CodeBlockLike() {
  return (
    <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-background px-4 py-4 font-mono text-[13px] leading-relaxed text-foreground">
      <code>{`# 사내 도입 예시
1. 루트 CLAUDE.md / AGENTS.md 초안 배포 (두 런타임 모두)
2. 표준 verify 스크립트와 build 명령 고정
3. reviewer / verifier / docs researcher 서브에이전트 제공
4. Playwright + Context7 MCP 기본 세트 제공
5. 팀별로 Figma / Linear / Slack / Atlassian MCP 선택 추가
6. 분기별로 모델과 rules / hooks / skills 갱신
7. 회고 지표: build 성공률, PR 리뷰 속도, 회귀 감소, 재작업 시간 감소`}</code>
    </pre>
  );
}
