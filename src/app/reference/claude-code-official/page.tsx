import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";

const GETTING_STARTED = [
  {
    title: "Claude Code Overview",
    href: "https://docs.anthropic.com/en/docs/claude-code/overview",
    summary: "Claude Code 전체 문서의 진입점입니다. 설치, 인증, 핵심 개념이 여기서 갈라집니다.",
  },
  {
    title: "Getting started",
    href: "https://docs.anthropic.com/en/docs/claude-code",
    summary: "터미널에서 처음 Claude Code 를 시작하는 가장 짧은 경로입니다.",
  },
  {
    title: "Pro / Max 플랜으로 사용",
    href: "https://support.claude.com/en/articles/11145838-using-claude-code-with-your-max-plan",
    summary: "Claude Pro 또는 Max 구독자가 추가 비용 없이 Claude Code 를 쓰는 방법을 정리한 공식 도움말입니다.",
  },
  {
    title: "Anthropic for developers",
    href: "https://www.anthropic.com/api",
    summary: "Claude Code 외에 Claude API · Agent SDK · Computer Use 같은 상위 진입점입니다.",
  },
] as const;

const CONFIGURATION = [
  {
    title: "Memory (CLAUDE.md)",
    href: "https://docs.anthropic.com/en/docs/claude-code/memory",
    summary: "프로젝트 메모리 파일의 위치, @import 문법, 권장 구조를 설명합니다.",
  },
  {
    title: "Settings",
    href: "https://docs.anthropic.com/en/docs/claude-code/settings",
    summary: ".claude/settings.json 의 필드와 평가 순서, 환경별 분리 방법을 다룹니다.",
  },
  {
    title: "Permissions",
    href: "https://docs.anthropic.com/en/docs/claude-code/iam",
    summary: "allow / ask / deny 매처 문법과 위험 명령 차단 패턴을 설명합니다.",
  },
  {
    title: "Hooks",
    href: "https://docs.anthropic.com/en/docs/claude-code/hooks",
    summary: "PreToolUse · PostToolUse · SessionStart 같은 라이프사이클 hook 의 입력 형식과 종료 코드를 설명합니다.",
  },
  {
    title: "Sub-agents",
    href: "https://docs.anthropic.com/en/docs/claude-code/sub-agents",
    summary: "커스텀 서브에이전트 등록과 좁은 역할 분리 방법을 다룹니다.",
  },
  {
    title: "Skills",
    href: "https://docs.anthropic.com/en/docs/claude-code/slash-commands",
    summary: ".claude/skills/ 디렉터리의 SKILL.md frontmatter 와 자동 활성화 매커니즘을 설명합니다.",
  },
  {
    title: "MCP",
    href: "https://docs.anthropic.com/en/docs/claude-code/mcp",
    summary: "stdio / HTTP MCP 서버 등록과 플러그인 마켓 연동을 설명합니다.",
  },
  {
    title: "Plugin marketplace",
    href: "https://docs.anthropic.com/en/docs/claude-code/plugins",
    summary: "공식 플러그인을 발견하고 설치하는 마켓 인터페이스 사용법입니다.",
  },
] as const;

const LEARN = [
  {
    title: "Building Effective Agents",
    href: "https://www.anthropic.com/engineering/building-effective-agents",
    summary: "워크플로 vs 에이전트 구분, 가장 단순한 모델로 시작하라는 원칙을 정리한 Anthropic 공식 엔지니어링 글입니다.",
  },
  {
    title: "Claude Code GitHub",
    href: "https://github.com/anthropics/claude-code",
    summary: "Claude Code CLI 의 공식 오픈소스 저장소입니다. 이슈와 토론도 여기서 진행됩니다.",
  },
  {
    title: "Best practices",
    href: "https://docs.anthropic.com/en/docs/claude-code/best-practices",
    summary: "Anthropic 이 권장하는 Claude Code 운영 패턴 모음입니다.",
  },
  {
    title: "/ultraplan (research preview)",
    href: "https://code.claude.com/docs/en/ultraplan",
    summary: "클라우드 오프로드 planning 슬래시 명령 공식 문서입니다. v2.1.91+ 가 필요합니다.",
  },
] as const;

const RELEASES = [
  {
    title: "Claude Code Changelog",
    href: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
    summary: "CLI 의 실제 릴리스 버전과 변경사항을 추적할 때 보는 페이지입니다.",
  },
  {
    title: "Anthropic News",
    href: "https://www.anthropic.com/news",
    summary: "모델 출시 · 정책 변경 · 새 기능 발표 같은 상위 변경 이력입니다.",
  },
  {
    title: "Claude Opus 4.6 발표",
    href: "https://www.anthropic.com/news/claude-opus-4-6",
    summary: "Opus 4.6 와 Agent Teams 발표 노트입니다. 멀티 에이전트 흐름의 시작점이기도 합니다.",
  },
  {
    title: "Responsible Scaling Policy",
    href: "https://www.anthropic.com/news/anthropics-responsible-scaling-policy",
    summary: "Anthropic 이 모델 능력 증가에 대응하는 안전 정책 문서입니다. 조직 거버넌스 참고 자료입니다.",
  },
] as const;

const MODELS = [
  {
    title: "Claude Opus 4.6",
    href: "https://www.anthropic.com/claude/opus",
    summary: "메인 세션과 설계 판단에 권장되는 최상위 모델 카드입니다.",
  },
  {
    title: "Claude Sonnet 4.6",
    href: "https://www.anthropic.com/claude/sonnet",
    summary: "구현과 보조 설계에 권장되는 균형 모델 카드입니다.",
  },
  {
    title: "Claude Haiku 4.5",
    href: "https://www.anthropic.com/claude/haiku",
    summary: "reviewer · verifier · docs researcher 같은 좁은 서브에이전트 역할에 권장되는 빠르고 가벼운 모델입니다.",
  },
  {
    title: "Models overview",
    href: "https://docs.anthropic.com/en/docs/about-claude/models",
    summary: "Claude 모델 전체와 권장 시작점을 한눈에 비교하는 문서입니다.",
  },
] as const;

export const metadata: Metadata = {
  title: "Anthropic Claude Code 공식 자료 맵",
  description:
    "Anthropic Claude Code 의 공식 문서와 저장소를 시작점, 설정과 운영, 학습 자료, 릴리스, 모델 관점에서 정리한 참고 페이지입니다.",
};

function ResourceGrid({
  title,
  items,
}: {
  title: string;
  items: readonly { title: string; href: string; summary: string }[];
}) {
  return (
    <>
      <ProseHeading level={2}>{title}</ProseHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="font-sans text-lg font-medium text-foreground">{item.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-foreground-muted">{item.summary}</p>
            <span className="font-mono text-xs text-foreground-subtle transition group-hover:text-accent-2">
              공식 문서 열기 ↗
            </span>
          </a>
        ))}
      </div>
    </>
  );
}

export default function ClaudeCodeOfficialReferencePage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Claude Code</ProseEyebrow>
        <ProseHeading level={1}>Anthropic Claude Code 공식 자료 맵</ProseHeading>
        <ProseParagraph>
          Anthropic Claude Code 는 문서가 비교적 한 곳에 모여 있습니다. 그래도 시작점, 설정,
          학습 자료, 릴리스 정보, 모델 카드가 각각 다른 페이지에 있어서 처음에는 어디부터 봐야
          할지 헷갈릴 수 있습니다. 이 페이지는 공식 자료를 한 군데에 묶어, Claude Code 하네스를
          설계하거나 업데이트할 때 어디를 먼저 봐야 하는지 빠르게 찾도록 돕는 정리본입니다.
        </ProseParagraph>

        <Callout tone="note" title="정리 기준">
          <p>
            이 페이지는 Anthropic 공식 문서와{" "}
            <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">
              anthropics/claude-code
            </code>{" "}
            저장소만 기준으로 묶었습니다. 제3자 블로그나 요약 글은 넣지 않았습니다.
          </p>
        </Callout>

        <ProseHeading level={2}>현재 읽는 순서 추천</ProseHeading>
        <ProseParagraph>
          처음이면{" "}
          <strong>
            Overview → Memory → Settings → Permissions → Hooks → Sub-agents → MCP → Best practices
          </strong>{" "}
          순서가 가장 좋습니다. 이미 쓰고 있다면{" "}
          <strong>Changelog · Anthropic News · Responsible Scaling Policy</strong> 를 주기적으로
          보는 편이 더 중요합니다.
        </ProseParagraph>

        <ResourceGrid title="1. 시작점" items={GETTING_STARTED} />
        <ResourceGrid title="2. 설정과 운영" items={CONFIGURATION} />
        <ResourceGrid title="3. 학습 자료" items={LEARN} />
        <ResourceGrid title="4. 릴리스와 정책" items={RELEASES} />
        <ResourceGrid title="5. 모델 문서" items={MODELS} />

        <ProseHeading level={2}>이 사이트와 어떻게 연결되나요</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            href="/reference/codex-official"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">OpenAI Codex 자료 맵</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              같은 구조로 정리한 Codex 측 공식 문서 모음입니다. 두 런타임을 비교할 때 같이 봐
              주십시오.
            </p>
          </Link>
          <Link
            href="/playbook/setup-claude-code"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">Claude Code 셋업 플레이북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              실제 하네스 파일 구조와 settings.json / hooks / agents 예시를 보려면 이 페이지로
              이어집니다.
            </p>
          </Link>
          <Link
            href="/reference/ultraplan"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">/ultraplan</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              클라우드 오프로드 planning 기능을 공식 문서 기반으로 정리한 페이지입니다.
            </p>
          </Link>
          <Link
            href="/handbook"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              하네스 엔지니어링의 과거 · 현재 · 미래 흐름을 장문으로 설명하는 중심 페이지입니다.
            </p>
          </Link>
          <Link
            href="/architecture/claude-vs-codex"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">Claude vs Codex 비교</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              두 런타임을 같은 항목으로 한 행씩 나란히 비교한 표입니다.
            </p>
          </Link>
          <Link
            href="/guide"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">사이트 가이드</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              이 사이트 전체를 어떤 순서로 읽을지 정리한 위키형 안내 페이지입니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
