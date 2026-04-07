import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { CodeBlock } from "@/components/content/code-block";
import { Callout } from "@/components/content/callout";

type Slug = "setup-claude-code" | "setup-codex";

const SLUGS: readonly Slug[] = ["setup-claude-code", "setup-codex"] as const;

const META: Record<Slug, { title: string; eyebrow: string; description: string }> = {
  "setup-claude-code": {
    title: "Claude Code 설정 플레이북",
    eyebrow: "플레이북 · 01",
    description:
      "Anthropic Claude Code 의 프로젝트 메모리·스킬·훅·권한을 처음 셋업하는 가장 짧은 경로입니다.",
  },
  "setup-codex": {
    title: "Codex CLI 하네스 심화 설정 가이드",
    eyebrow: "플레이북 · 02",
    description:
      "현재 공식 Codex 기능을 기준으로, Kotlin/JVM 프로젝트에 하네스를 깊게 심는 방법을 정리한 실전형 가이드입니다.",
  },
};

const CODEX_DOC_LINKS = [
  { label: "Codex 홈", href: "https://developers.openai.com/codex/" },
  { label: "Config basics", href: "https://developers.openai.com/codex/config-basic" },
  { label: "Config advanced", href: "https://developers.openai.com/codex/config-advanced" },
  { label: "Config reference", href: "https://developers.openai.com/codex/config-reference" },
  { label: "MCP", href: "https://developers.openai.com/codex/mcp" },
  { label: "Hooks", href: "https://developers.openai.com/codex/hooks" },
  { label: "Rules", href: "https://developers.openai.com/codex/rules" },
  { label: "Subagents", href: "https://developers.openai.com/codex/subagents" },
  { label: "모델 개요", href: "https://platform.openai.com/docs/models" },
  { label: "GPT-5-Codex 모델 문서", href: "https://platform.openai.com/docs/models/gpt-5-codex" },
  { label: "GPT-5.4 mini 모델 문서", href: "https://platform.openai.com/docs/models/gpt-5.4-mini" },
  { label: "Codex GitHub 저장소", href: "https://github.com/openai/codex" },
  { label: "Codex GitHub Releases", href: "https://github.com/openai/codex/releases" },
] as const;

const PLANNING_DOCS = [
  {
    title: "2026 AIOps/MLOps 플랫폼 기술기획",
    description:
      "역할 분리, 납품 전략, 라이선스 검토, 학습 이력·승인·배포 화면, 멀티테넌트 전략까지 묶어 보는 상위 전략 문서입니다.",
  },
  {
    title: "AIOps/MLOps 포털 UI 정보구조",
    description:
      "좌측 사이드바형 포털 IA, 메뉴 구조, 화면별 컴포넌트 매핑을 정리한 문서입니다.",
  },
  {
    title: "AIOps/MLOps 플랫폼 개발 실행계획",
    description:
      "전략 문서를 실제 구현 순서로 풀어낸 실행 문서로, 단계별 산출물과 완료 기준을 포함합니다.",
  },
  {
    title: "반자동 개발 작업 분할",
    description:
      "랄프 루프에 맡길 반복 구현과 사람 확인이 필요한 승인·운영 영역을 분리한 기준 문서입니다.",
  },
  {
    title: "회사 UI 컴포넌트 가이드",
    description:
      "Next.js, Tailwind, 공통 레이아웃·테이블·모달·차트 패턴과 디자인 토큰을 정리한 UI 기준 문서입니다.",
  },
] as const;

const HARNESS_ROWS = [
  {
    feature: "프로젝트 메모리",
    codex: "AGENTS.md",
    purpose: "세션 시작 전 자동으로 읽히는 저장소 기본 규칙",
  },
  {
    feature: "런타임 설정",
    codex: ".codex/config.toml",
    purpose: "모델, sandbox, approval, profile, MCP, subagent 등록",
  },
  {
    feature: "Skills",
    codex: ".codex/skills/ 또는 기존 호환 .agents/skills/",
    purpose: "반복되는 워크플로를 문서화해서 재사용",
  },
  {
    feature: "Subagents",
    codex: ".codex/agents/*.toml",
    purpose: "리뷰·검증·문서 확인처럼 좁은 역할 분리",
  },
  {
    feature: "Rules",
    codex: ".codex/rules/*.rules",
    purpose: "파괴적 명령과 승인 경계를 선언형으로 정의",
  },
  {
    feature: "Hooks",
    codex: ".codex/hooks.json + .codex/hooks/",
    purpose: "SessionStart, PreToolUse, PostToolUse 자동화",
  },
  {
    feature: "검증 명령",
    codex: "README / AGENTS.md / scripts/",
    purpose: "모든 표면이 같은 검증 흐름을 가리키도록 유지",
  },
] as const;

const TOP10_EXTENSIONS = [
  {
    name: "Context7 MCP",
    kind: "문서 grounding",
    why: "버전 민감 라이브러리 문서를 최신 상태로 끌어와 API hallucination을 줄입니다.",
    setup: "원격 MCP: https://mcp.context7.com/mcp",
    href: "https://context7.com/docs/installation",
  },
  {
    name: "Playwright MCP",
    kind: "브라우저 자동화",
    why: "UI 점검, 시나리오 확인, 접근성 snapshot 기반 검증에 가장 실용적입니다.",
    setup: "stdio: npx @playwright/mcp@latest --headless",
    href: "https://playwright.dev/docs/next/getting-started-mcp",
  },
  {
    name: "Playwright CLI",
    kind: "skill형 브라우저 도구",
    why: "토큰 효율이 중요한 코딩 에이전트 루프에서는 MCP보다 더 가볍게 브라우저를 다룰 수 있습니다.",
    setup: "npx playwright-cli 또는 editor-integrated skill",
    href: "https://playwright.dev/docs/getting-started-cli",
  },
  {
    name: "GitHub MCP",
    kind: "저장소·PR·이슈",
    why: "리포지토리, 이슈, PR, 리뷰 맥락을 에이전트 세션 안으로 직접 가져옵니다.",
    setup: "공식 GitHub MCP 서버 문서 기준으로 추가",
    href: "https://docs.github.com/en/copilot/customizing-copilot/using-model-context-protocol/using-the-github-mcp-server",
  },
  {
    name: "Figma MCP",
    kind: "디자인→코드",
    why: "디자인 토큰, 컴포넌트, 선택 프레임 맥락을 코드 생성에 직접 연결합니다.",
    setup: "원격 MCP: https://mcp.figma.com/mcp",
    href: "https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server",
  },
  {
    name: "Linear MCP",
    kind: "이슈·프로젝트",
    why: "요구사항과 구현 상태를 같은 세션에서 읽고 갱신할 수 있어 작업 분할이 쉬워집니다.",
    setup: "원격 MCP: https://mcp.linear.app/mcp",
    href: "https://linear.app/docs/mcp",
  },
  {
    name: "Slack MCP",
    kind: "팀 대화 맥락",
    why: "메시지, 스레드, 캔버스를 직접 읽고 전송해 결정 맥락을 코드 작업에 붙일 수 있습니다.",
    setup: "원격 MCP: https://mcp.slack.com/mcp",
    href: "https://docs.slack.dev/ai/slack-mcp-server/",
  },
  {
    name: "Atlassian Rovo MCP",
    kind: "Jira·Confluence",
    why: "기획서, 티켓, 위키를 에이전트 세션에 연결해 구현과 문서가 분리되지 않게 합니다.",
    setup: "원격 MCP: https://mcp.atlassian.com/v1/mcp",
    href: "https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/",
  },
  {
    name: "Sentry AI Agent Monitoring",
    kind: "관측성 / skill",
    why: "토큰 사용량, tool latency, agent 오류를 추적해 '잘 되는 척' 하는 상태를 줄입니다.",
    setup: "Sentry skill 또는 SDK instrumentation 추가",
    href: "https://docs.sentry.io/platforms/javascript/guides/cloudflare/tracing/instrumentation/ai-agents-module/",
  },
  {
    name: "MCP Inspector + 공식 MCP Servers",
    kind: "MCP 디버깅 / 확장",
    why: "직접 붙인 MCP 서버의 툴 스키마를 검증하고, Postgres·검색·파일 시스템 같은 범용 서버를 빠르게 실험할 수 있습니다.",
    setup: "npx @modelcontextprotocol/inspector + registry/servers 참고",
    href: "https://github.com/modelcontextprotocol/servers",
  },
] as const;

const MODEL_BENCHMARK_ROWS = [
  {
    name: "GPT-5-Codex",
    tier: "프런티어 폐쇄형",
    benchmark: "공식 모델 페이지 기준 agentic coding 최적화, 400K context, tool use / structured outputs / function calling 지원",
    interpretation:
      "저장소 전역 맥락 이해, 긴 리팩터, 다단계 디버깅, 아키텍처 트레이드오프 정리에 적합합니다.",
    href: "https://platform.openai.com/docs/models/gpt-5-codex",
  },
  {
    name: "GPT-5.4 mini",
    tier: "프런티어 mini",
    benchmark: "공식 문서 기준 coding, computer use, subagents 용 강한 mini 라인",
    interpretation:
      "메인 아키텍트보다는 reviewer, verifier, docs researcher 같은 좁은 역할에 가장 효율적입니다.",
    href: "https://platform.openai.com/docs/models/gpt-5.4-mini",
  },
  {
    name: "Gemma 4 31B",
    tier: "강한 오픈 30B",
    benchmark: "LiveCodeBench v6 80.0, Codeforces 2150, MMLU-Pro 85.2, GPQA Diamond 84.3, context 256K",
    interpretation:
      "중형 서비스 설계, 코드베이스 리팩터, 테스트 보강, 명확한 요구사항 기반의 아키텍처 분해까지 실전에 쓸 수 있는 수준입니다.",
    href: "https://huggingface.co/google/gemma-4-31B",
  },
  {
    name: "Gemma 4 26B A4B",
    tier: "고효율 오픈 MoE",
    benchmark: "LiveCodeBench v6 77.1, Codeforces 1718, MMLU-Pro 82.6, active params 3.8B, context 256K",
    interpretation:
      "속도와 비용을 아끼면서도 꽤 강한 코딩 에이전트 루프를 돌릴 수 있는 실용 구간입니다.",
    href: "https://huggingface.co/google/gemma-4-31B",
  },
  {
    name: "Qwen3-Coder-30B-A3B-Instruct",
    tier: "강한 오픈 coder",
    benchmark: "공식 카드 기준 30.5B total / 3.3B activated, 256K native context, agentic coding · browser-use 강점",
    interpretation:
      "명확한 계약 아래에서 기능 구현, 도구 호출, repo-scale 코드 탐색에 강하고, 사람 주도 아키텍처 아래서 생산성이 높습니다.",
    href: "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
  },
  {
    name: "Qwen3-Coder-480B-A35B-Instruct",
    tier: "최상위 오픈 coder",
    benchmark: "공식 블로그 기준 SWE-Bench Verified open-source SOTA, Claude Sonnet 4 급 비교 언급, context 256K",
    interpretation:
      "로컬 개인 장비 대상은 아니지만, 강한 오픈 모델로 장기 계획·도구 사용·실제 소프트웨어 엔지니어링 태스크까지 겨냥한 레벨입니다.",
    href: "https://qwenlm.github.io/blog/qwen3-coder/",
  },
] as const;

const WIKI_SECTIONS = [
  { id: "docs", label: "공식 문서" },
  { id: "planning", label: "관련 기획" },
  { id: "layout", label: "하네스 구조" },
  { id: "agents", label: "AGENTS.md" },
  { id: "config", label: "config.toml" },
  { id: "safety", label: "Rules / Hooks" },
  { id: "skills", label: "Skills / Subagents" },
  { id: "models", label: "모델 벤치마크" },
  { id: "extensions", label: "외부 확장 Top 10" },
  { id: "checklist", label: "체크리스트" },
] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!SLUGS.includes(params.slug as Slug)) return {};
  return {
    title: META[params.slug as Slug].title,
    description: META[params.slug as Slug].description,
  };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();
  const typedSlug = slug as Slug;

  if (typedSlug === "setup-codex") {
    return <CodexWikiPage meta={META[typedSlug]} />;
  }

  return <ClaudePlaybookPage meta={META[typedSlug]} />;
}

function ClaudePlaybookPage({
  meta,
}: {
  meta: { title: string; eyebrow: string; description: string };
}) {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose>
        <ProseEyebrow>{meta.eyebrow}</ProseEyebrow>
        <ProseHeading level={1}>{meta.title}</ProseHeading>
        <p className="mt-4 font-serif text-lg text-foreground-muted">{meta.description}</p>

        <ClaudePlaybook />

        <hr className="my-12 border-border" />
        <p className="font-mono text-sm text-foreground-muted">
          ←{" "}
          <Link href="/architecture/overview" className="text-accent-2 hover:underline">
            5-레이어 아키텍처로 돌아가기
          </Link>
        </p>
      </Prose>
    </div>
  );
}

function CodexWikiPage({
  meta,
}: {
  meta: { title: string; eyebrow: string; description: string };
}) {
  return (
    <div className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
                {meta.eyebrow}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-foreground">
                {meta.title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-foreground-muted">{meta.description}</p>

              <div className="mt-6 border-t border-border pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  On This Page
                </p>
                <nav aria-label="문서 목차" className="mt-3 space-y-2">
                  {WIKI_SECTIONS.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-md px-3 py-2 text-sm text-foreground-muted transition hover:bg-background hover:text-foreground"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-background p-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  핵심 원칙
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-foreground-muted">
                  <li>설명용 문서와 압축용 문서를 분리합니다.</li>
                  <li>정책은 Rules, 동적 guardrail 은 Hooks 로 분리합니다.</li>
                  <li>반복 워크플로만 skill 로 남기고 역할은 좁게 쪼갭니다.</li>
                  <li>외부 확장은 한 번에 다 넣지 말고 검증 가능한 순서로 붙입니다.</li>
                </ul>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <article className="space-y-10">
              <section className="rounded-2xl border border-border bg-surface p-7 shadow-[0_18px_60px_rgba(15,23,42,0.05)]">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
                  Deep Setup Guide
                </p>
                <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
                  Kotlin/JVM 저장소용 Codex 하네스를 위키처럼 설계합니다
                </h2>
                <p className="mt-5 max-w-4xl text-[17px] leading-8 text-foreground-muted">
                  이 페이지는 짧은 인문서가 아니라, 다른 사람이 그대로 따라 해서 설정을 복구할 수 있는 운영 문서입니다.
                  서비스 도메인이나 Ktor 세부 구현은 빼고, 메모리·설정·skills·subagents·rules·hooks·MCP 같은 하네스 레이어만 깊게 다룹니다.
                </p>
              </section>

              <section id="docs" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  현재 공식 Codex 기준 문서
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  이 가이드는 2026년 4월 기준 공개 문서를 기준으로 정리했습니다. “예전 블로그에서 보던 Codex”가 아니라,
                  현재 공식 문서의 설정 표면과 모델 문서에 맞춰 읽으시면 됩니다.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {CODEX_DOC_LINKS.map((item) => (
                    <a
                      key={item.href + item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-border bg-background px-4 py-4 text-sm text-foreground transition hover:border-accent"
                    >
                      {item.label}
                      <span className="mt-1 block font-mono text-[11px] text-foreground-subtle">↗ 공식 문서</span>
                    </a>
                  ))}
                </div>
              </section>

              <section id="planning" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  이 저장소에서 함께 보는 기획 문서
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  좋은 하네스는 설정 파일만으로 유지되지 않습니다. 목표 문서, 실행계획, UI 구조, 작업 분할 기준이 같이 있어야
                  Codex가 “무엇을 왜 이렇게 세팅해야 하는가”를 제대로 이해합니다.
                </p>
                <div className="mt-6 space-y-4">
                  {PLANNING_DOCS.map((doc) => (
                    <div key={doc.title} className="rounded-xl border border-border bg-background px-5 py-4">
                      <h3 className="text-lg font-semibold text-foreground">{doc.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">{doc.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="layout" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  하네스는 어떤 파일로 나뉘어야 하나요
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  좋은 Codex 하네스는 한 파일에 몰아넣지 않습니다. 프로젝트 메모리, 런타임 설정, 재사용 워크플로, 역할 분리,
                  안전 규칙, 자동 훅을 각각 독립된 표면으로 나눠야 나중에 유지보수가 됩니다.
                </p>
                <div className="mt-6 overflow-x-auto rounded-xl border border-border">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-background">
                      <tr>
                        <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">기능</th>
                        <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">권장 표면</th>
                        <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">의도</th>
                      </tr>
                    </thead>
                    <tbody>
                      {HARNESS_ROWS.map((row) => (
                        <tr key={row.feature} className="align-top">
                          <td className="border-b border-border px-4 py-3 font-medium text-foreground">{row.feature}</td>
                          <td className="border-b border-border px-4 py-3 font-mono text-[12px] text-foreground-muted">{row.codex}</td>
                          <td className="border-b border-border px-4 py-3 text-foreground-muted">{row.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <CodeBlock filename="권장 디렉터리 구조" language="text" className="mt-6">
{`project-root/
├── AGENTS.md
├── .codex/
│   ├── config.toml
│   ├── hooks.json
│   ├── hooks/
│   │   ├── session_start_context.py
│   │   ├── pre_bash_guard.py
│   │   └── post_kt_lint.sh
│   ├── rules/
│   │   └── default.rules
│   ├── agents/
│   │   ├── reviewer.toml
│   │   ├── gradle-verifier.toml
│   │   └── docs-researcher.toml
│   └── skills/
│       ├── gradle-codex/SKILL.md
│       ├── kotlin-review/SKILL.md
│       └── platform-safety/SKILL.md
├── scripts/
│   └── verify_codex_harness.sh
└── docs/
    ├── handoffs/
    ├── runbooks/
    └── architecture/`}
                </CodeBlock>
              </section>

              <section id="agents" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  AGENTS.md 는 작업 계약서처럼 씁니다
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  Kotlin/JVM 저장소에서 <code className="rounded bg-background px-1.5 py-0.5 font-mono text-sm">AGENTS.md</code> 는
                  “이 프로젝트에서 Codex가 어떻게 행동해야 하는가”를 고정하는 문서입니다. 도메인 설명을 길게 적기보다
                  검증 명령, 금지 명령, 디렉터리 구조, 완료 기준 같은 오래 살아남는 규칙만 두는 편이 낫습니다.
                </p>
                <CodeBlock filename="AGENTS.md" language="markdown" className="mt-6">
{`# AGENTS.md

- 이 저장소는 Kotlin/JVM + Python + frontend가 섞인 플랫폼 저장소입니다.
- 작업 전 우선 문서: README, docs/handoffs/current-state.md, docs/architecture/module-map.md
- Gradle 검증은 항상 저장소 로컬 캐시를 사용합니다.
- Python 검증은 PYTHONPATH를 명시합니다.
- 운영 파괴 명령은 사용자가 명시적으로 요청한 경우만 승인 대상으로 다룹니다.
- 하네스 변경 후에는 scripts/verify_codex_harness.sh 를 우선 실행합니다.
- 반복 워크플로는 skills로 승격하고, 역할이 좁은 검토 작업만 subagent로 분리합니다.

## 표준 검증
- Kotlin: source ~/.zshrc >/dev/null 2>&1 && export GRADLE_USER_HOME="$PWD/.gradle-user" && ./gradlew ktlintCheck test --no-daemon
- Python: PYTHONPATH=python-mlops python3 -m unittest discover python-mlops/tests -v
- Frontend: cd frontend && npm run build

## 완료 기준
- 관련 변경의 빌드/린트/테스트 결과를 읽고 요약할 것
- 위험 명령, 배포 명령, 외부 쓰기 작업은 승인 경계를 지킬 것
- 최종 답변에 변경 요약, 검증 결과, 남은 리스크를 적을 것`}
                </CodeBlock>
              </section>

              <section id="config" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  config.toml 이 런타임의 중심입니다
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  <code className="rounded bg-background px-1.5 py-0.5 font-mono text-sm">.codex/config.toml</code> 은
                  모델, reasoning, sandbox, approval, profiles, MCP, subagent 등록을 한 번에 고정합니다.
                  Kotlin/JVM 저장소에서는 특히 Gradle/JDK 셸 환경과 저장소 로컬 캐시 정책이 중요합니다.
                </p>
                <CodeBlock filename=".codex/config.toml" language="toml" className="mt-6">
{`# 기본 모델은 이해력과 설명 품질을 우선합니다.
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

# 저장소 안에서는 쓰기 가능, 네트워크는 필요한 순간만 다룹니다.
[sandbox_workspace_write]
network_access = false

[features]
# hooks 는 아직 실험 기능이므로 명시적으로 켭니다.
codex_hooks = true
multi_agent = true
# 원격 MCP(HTTP/OAuth) 서버를 함께 쓸 때 필요할 수 있습니다.
experimental_use_rmcp_client = true

[profiles.review]
model = "gpt-5.4-mini"
sandbox_mode = "read-only"
approval_policy = "on-request"

[profiles.verify]
model = "gpt-5.4-mini"
model_reasoning_effort = "medium"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[profiles.codex]
model = "gpt-5-codex"
model_reasoning_effort = "high"

[agents]
max_threads = 4
max_depth = 1
job_max_runtime_seconds = 1800

[agents.reviewer]
config_file = ".codex/agents/reviewer.toml"

[agents.gradle_verifier]
config_file = ".codex/agents/gradle-verifier.toml"

[agents.docs_researcher]
config_file = ".codex/agents/docs-researcher.toml"

[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--headless"]

[mcp_servers.context7]
url = "https://mcp.context7.com/mcp"

[mcp_servers.linear]
url = "https://mcp.linear.app/mcp"

[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"

[mcp_servers.atlassian]
url = "https://mcp.atlassian.com/v1/mcp"`}
                </CodeBlock>

                <Callout tone="warning" title="최신 원격 MCP 경로">
                  <p>
                    Linear와 Atlassian은 현재 <code className="rounded bg-background px-1 py-0.5 font-mono text-sm">/mcp</code> 엔드포인트를 권장합니다.
                    예전 예시에서 보이는 <code className="rounded bg-background px-1 py-0.5 font-mono text-sm">/sse</code> 는 최신 문서 기준 권장 경로가 아닙니다.
                  </p>
                </Callout>
              </section>

              <section id="safety" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Rules 와 Hooks 는 서로 대체재가 아닙니다
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  안전 장치는 한 층으로 끝내지 않는 편이 좋습니다. Rules 는 선언형 보호막이고, Hooks 는 동적 가드레일입니다.
                  Kotlin/JVM 플랫폼 저장소에서는 두 층을 같이 써야 위험 명령 차단과 수정 직후 자동 검증이 동시에 살아납니다.
                </p>
                <CodeBlock filename=".codex/rules/default.rules" language="text" className="mt-6">
{`# 파괴적 명령은 금지합니다.
prefix_rule(["git", "reset", "--hard"], "forbidden")
prefix_rule(["rm", "-rf"], "forbidden")
prefix_rule(["terraform", "destroy"], "forbidden")
prefix_rule(["kubectl", "delete"], "forbidden")
prefix_rule(["helm", "uninstall"], "forbidden")
prefix_rule(["mlflow", "models", "delete"], "forbidden")

# 외부 반영이나 실행 환경 변이는 prompt 로 둡니다.
prefix_rule(["git", "push"], "prompt")
prefix_rule(["gh", "pr", "create"], "prompt")
prefix_rule(["kubectl", "apply"], "prompt")
prefix_rule(["helm", "upgrade"], "prompt")
prefix_rule(["brew", "install"], "prompt")`}
                </CodeBlock>

                <CodeBlock filename=".codex/hooks.json" language="json" className="mt-6">
{`{
  "hooks": {
    "SessionStart": [
      {
        "command": "/usr/bin/python3 $(git rev-parse --show-toplevel)/.codex/hooks/session_start_context.py"
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "/usr/bin/python3 $(git rev-parse --show-toplevel)/.codex/hooks/pre_bash_guard.py"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit|ApplyPatch",
        "command": "bash $(git rev-parse --show-toplevel)/.codex/hooks/post_kt_lint.sh"
      }
    ]
  }
}`}
                </CodeBlock>

                <CodeBlock filename=".codex/hooks/post_kt_lint.sh" language="bash" className="mt-6">
{`#!/usr/bin/env bash
set -euo pipefail

# Codex PostToolUse payload는 stdin JSON 입니다.
PAYLOAD="$(cat)"
ROOT="$(git rev-parse --show-toplevel)"

# Kotlin 파일이 아니면 아무 일도 하지 않습니다.
FILE_PATH="$(printf '%s' "$PAYLOAD" | jq -r '.tool_input.file_path // .tool_input.path // empty')"
if [[ -z "$FILE_PATH" || "$FILE_PATH" != *.kt ]]; then
  exit 0
fi

# Gradle/JDK 셸 환경을 맞춘 뒤 저장소 로컬 캐시로 ktlint를 실행합니다.
source ~/.zshrc >/dev/null 2>&1 || true
export GRADLE_USER_HOME="$ROOT/.gradle-user"
cd "$ROOT"
./gradlew ktlintCheck --no-daemon`}
                </CodeBlock>
              </section>

              <section id="skills" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  Skills 와 Subagents 는 좁게 나눕니다
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  skill은 반복 워크플로, subagent는 좁은 역할입니다. 무엇이든 다 하는 agent 를 늘리는 것보다
                  reviewer, gradle_verifier, docs_researcher 같이 역할이 분명한 단위로 쪼개는 편이 유지보수와 병렬화 모두에 유리합니다.
                </p>
                <CodeBlock filename=".codex/agents/reviewer.toml" language="toml" className="mt-6">
{`model = "gpt-5.4-mini"
sandbox_mode = "read-only"

system_prompt = """
변경사항을 읽기 전용으로 검토합니다.
행동 회귀, 누락 테스트, Gradle 오용, JDK 가정, 위험한 파일 수정 여부를 우선 확인합니다.
요약보다 findings 를 먼저 적습니다.
"""`}
                </CodeBlock>

                <CodeBlock filename=".codex/skills/gradle-codex/SKILL.md" language="markdown" className="mt-6">
{`# Gradle Codex

이 스킬은 Kotlin/JVM 저장소에서 Gradle 명령을 안전하게 실행하기 위한 워크플로입니다.

## 규칙
- 항상 \`source ~/.zshrc >/dev/null 2>&1\` 를 먼저 고려합니다.
- 항상 \`GRADLE_USER_HOME="$PWD/.gradle-user"\` 를 저장소 안으로 고정합니다.
- 가능하면 \`./gradlew\` 와 \`--no-daemon\` 을 사용합니다.
- 결과를 요약할 때는 실패한 task, 에러 타입, 다음 수정 포인트를 함께 적습니다.

## 대표 명령
- 포맷 검사: \`./gradlew ktlintCheck --no-daemon\`
- 전체 검증: \`./gradlew ktlintCheck test --no-daemon\`
- 모듈 단위 검증: \`./gradlew :module:test --no-daemon\``}
                </CodeBlock>
              </section>

              <section id="models" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  모델 벤치마크와 현실적인 코딩 / 아키텍처 레벨
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  모델은 3개월 단위로 더 가벼워지고 더 빨라지고 있습니다. 중요한 것은 “점수가 높다”가 아니라
                  <strong> 어떤 종류의 코딩과 설계 판단까지 신뢰할 수 있는가</strong> 입니다.
                  아래 표는 공식 모델 카드와 공식 발표 자료를 기준으로, 벤치마크 수치를 실무 능력으로 번역한 요약입니다.
                </p>
                <div className="mt-6 overflow-x-auto rounded-xl border border-border">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="bg-background">
                      <tr>
                        <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">모델</th>
                        <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">구간</th>
                        <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">공식 자료 요약</th>
                        <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">실무 해석</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MODEL_BENCHMARK_ROWS.map((row) => (
                        <tr key={row.name} className="align-top">
                          <td className="border-b border-border px-4 py-3 font-medium text-foreground">
                            <a href={row.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                              {row.name}
                            </a>
                          </td>
                          <td className="border-b border-border px-4 py-3 text-foreground-muted">{row.tier}</td>
                          <td className="border-b border-border px-4 py-3 text-foreground-muted">{row.benchmark}</td>
                          <td className="border-b border-border px-4 py-3 text-foreground-muted">{row.interpretation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 grid gap-4 xl:grid-cols-3">
                  <div className="rounded-xl border border-border bg-background p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">Level 1</p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">빠른 구현 보조</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      파일 단위 수정, 테스트 생성, 리팩터 제안, 반복 명령 자동화에 강합니다.
                      다만 아키텍처의 최종 결정권을 맡기면 흔들릴 수 있습니다.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">Level 2</p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">강한 구현자 / 공동 설계자</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      명확한 계약이 있을 때는 기능 구현, 모듈 경계 정리, API 분해, 테스트 루프까지 실전 투입이 가능합니다.
                      현재 강한 30B 오픈 모델이 이 구간에 들어옵니다.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">Level 3</p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">장기 계획형 아키텍트 보조</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      애매한 요구사항 정리, 장기 리팩터, 여러 하위 시스템 간 트레이드오프 설명까지 가능합니다.
                      그래도 운영 책임과 최종 아키텍처 서명은 여전히 사람이 가져가야 합니다.
                    </p>
                  </div>
                </div>

                <Callout tone="warning" title="벤치마크를 읽는 법">
                  <p>
                    벤치마크 숫자는 같은 조건에서만 공정합니다. 모델 카드마다 데이터셋 버전, 평가 스크립트,
                    test-time scaling, 도구 사용 허용 여부가 다를 수 있으므로, 숫자는 절대 순위가 아니라
                    <strong> 대략 어느 클래스의 모델인지</strong> 를 읽는 자료로 보시는 편이 안전합니다.
                  </p>
                </Callout>
              </section>

              <section id="extensions" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  vibe agentic coding 을 위한 외부 확장 Top 10
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  요즘 잘 되는 에이전트 코딩 환경은 모델 하나로 끝나지 않습니다. 최신 문서, 브라우저 실행, 디자인 맥락,
                  이슈 트래킹, 팀 대화, 운영 관측성까지 바깥 시스템을 붙여야 “그럴듯한 코드 생성”이 아니라
                  “실제로 일을 끝내는 흐름”으로 올라갑니다.
                </p>
                <div className="mt-6 space-y-4">
                  {TOP10_EXTENSIONS.map((item, index) => (
                    <section key={item.name} className="rounded-xl border border-border bg-background px-5 py-5">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
                        {String(index + 1).padStart(2, "0")} · {item.kind}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-foreground">{item.name}</h3>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.why}</p>
                      <p className="mt-2 font-mono text-[11px] text-foreground-subtle">{item.setup}</p>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm text-accent hover:underline"
                      >
                        공식 문서 ↗
                      </a>
                    </section>
                  ))}
                </div>

                <CodeBlock filename=".codex/config.toml (외부 확장 묶음 예시)" language="toml" className="mt-6">
{`[features]
codex_hooks = true
multi_agent = true
experimental_use_rmcp_client = true

# 최신 라이브러리 문서를 바로 가져옵니다.
[mcp_servers.context7]
url = "https://mcp.context7.com/mcp"

# UI 동작과 브라우저 검증을 에이전트가 직접 확인합니다.
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--headless"]

# 디자인 맥락을 코드 생성에 직접 연결합니다.
[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"

# 작업 관리 이슈/프로젝트 맥락을 붙입니다.
[mcp_servers.linear]
url = "https://mcp.linear.app/mcp"

# Jira/Confluence 같은 팀 문서와 티켓을 붙입니다.
[mcp_servers.atlassian]
url = "https://mcp.atlassian.com/v1/mcp"`}
                </CodeBlock>

                <CodeBlock filename="초기 연결 순서" language="bash" className="mt-6">
{`# 1) 로컬 stdio MCP 먼저 붙입니다.
codex mcp add playwright --stdio "npx @playwright/mcp@latest --headless"

# 2) 원격 MCP는 config.toml 또는 서비스 문서 방식으로 추가합니다.
codex mcp add linear --url https://mcp.linear.app/mcp

# 3) OAuth 서버는 로그인 단계를 완료합니다.
codex mcp login linear`}
                </CodeBlock>

                <Callout tone="tip" title="추천 도입 순서">
                  <p>1단계: AGENTS.md + config.toml + reviewer/verify 구조를 먼저 고정합니다.</p>
                  <p>2단계: Playwright MCP와 Context7 MCP를 붙여 코드와 실행 결과를 함께 보게 만듭니다.</p>
                  <p>3단계: Linear, Figma, Atlassian, Slack처럼 팀 맥락 서버를 하나씩 추가합니다.</p>
                  <p>4단계: Sentry 같은 관측성 도구를 붙여 에이전트 실행 품질을 측정합니다.</p>
                </Callout>
              </section>

              <section id="checklist" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  바로 따라 하는 체크리스트
                </h2>
                <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
                  <li>루트에 AGENTS.md 를 만들고 표준 검증 명령과 완료 기준을 먼저 적습니다.</li>
                  <li>.codex/config.toml 에 모델, sandbox, approval, profiles, agents 를 고정합니다.</li>
                  <li>.codex/rules/default.rules 에 금지 명령과 prompt 경계를 먼저 적습니다.</li>
                  <li>.codex/hooks.json 과 SessionStart / PreToolUse / PostToolUse 세 개만 먼저 붙입니다.</li>
                  <li>reviewer, gradle_verifier, docs_researcher 같이 좁은 subagent 부터 시작합니다.</li>
                  <li>skills 는 review, verify, gradle 같이 반복되는 워크플로만 남깁니다.</li>
                  <li>외부 확장은 Context7 + Playwright 를 먼저 붙이고, 팀 맥락 서버는 순차적으로 추가합니다.</li>
                  <li>하네스 변경 후에는 검증 스크립트와 README 설명을 함께 업데이트합니다.</li>
                </ul>

                <Callout tone="tip" title="이 페이지를 어떻게 쓰면 좋은가">
                  <p>
                    새 저장소에 Codex 하네스를 넣을 때는 이 페이지의 예시를 그대로 복붙하기보다,
                    먼저 <strong>검증 명령, 금지 명령, 외부 시스템, 문서 구조</strong> 네 가지만 자기 저장소에 맞게 치환하십시오.
                    그 다음에 skills, subagents, MCP 를 추가해야 오래 갑니다.
                  </p>
                </Callout>
              </section>

              <div className="pt-2 font-mono text-sm text-foreground-muted">
                ←{" "}
                <Link href="/architecture/overview" className="text-accent-2 hover:underline">
                  5-레이어 아키텍처로 돌아가기
                </Link>
              </div>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}

function ClaudePlaybook() {
  return (
    <>
      <ProseHeading level={2}>1. 프로젝트 메모리부터 적습니다</ProseHeading>
      <ProseParagraph>
        프로젝트 루트에 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">CLAUDE.md</code> 파일을 두십시오.
        모든 Claude Code 세션이 시작 시점에 자동으로 읽습니다. 짧고 검증 가능한 문장만 적으십시오.
      </ProseParagraph>
      <CodeBlock filename="CLAUDE.md">
{`# 프로젝트 메모리 (사이트 견본)
- 빌드: pnpm build
- 검증: pnpm lint && pnpm build
- 보안: 운영 계정에 직접 영향이 가는 명령은 반드시 사용자 확인 후 실행
- 한국어 콘텐츠는 모두 존댓말로 작성
- @AGENTS.md
`}
      </CodeBlock>

      <ProseHeading level={2}>2. 권한과 훅을 한 파일에 묶습니다</ProseHeading>
      <ProseParagraph>
        <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">.claude/settings.json</code> 한 파일에
        permissions 와 hooks 를 함께 정의합니다. 위험 명령은 deny, 자주 쓰는 명령은 allow.
      </ProseParagraph>
      <CodeBlock filename=".claude/settings.json" language="json">
{`{
  "permissions": {
    "allow": [
      "Bash(pnpm *)",
      "Bash(git status)",
      "Bash(git log *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)",
      "Read(.env)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "/usr/bin/python3 \\"$CLAUDE_PROJECT_DIR/.claude/hooks/pre_bash_guard.py\\""
      }
    ]
  }
}`}
      </CodeBlock>

      <ProseHeading level={2}>3. 스킬과 서브에이전트는 천천히 추가합니다</ProseHeading>
      <ProseParagraph>
        스킬은 진짜 반복되는 워크플로에만 만드십시오 — <code>/review</code>, <code>/test-all</code>, <code>/verify</code> 정도가 보통 충분합니다.
        서브에이전트는 좁은 read-only 역할(reviewer, gradle_verifier, docs_researcher) 부터 시작합니다.
      </ProseParagraph>

      <Callout tone="tip" title="이 사이트의 견본을 그대로 가져가시려면">
        본 저장소의 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">.claude/</code> 디렉터리 전체를 복사해서
        시작하시는 것이 가장 빠릅니다. 카탈로그 페이지의 각 항목 좌하단에 정확한 파일 경로가 표시되어 있습니다.
      </Callout>
    </>
  );
}
