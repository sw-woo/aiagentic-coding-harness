import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";
import { CodeBlock } from "@/components/content/code-block";

const SOURCE_LINKS = [
  {
    label: "README.ko.md",
    href: "https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/README.ko.md",
  },
  {
    label: "공식 웹사이트",
    href: "https://yeachan-heo.github.io/oh-my-claudecode-website",
  },
  {
    label: "CLI 레퍼런스",
    href: "https://yeachan-heo.github.io/oh-my-claudecode-website/docs.html#cli-reference",
  },
  {
    label: "워크플로우 문서",
    href: "https://yeachan-heo.github.io/oh-my-claudecode-website/docs.html#workflows",
  },
  {
    label: "마이그레이션 가이드",
    href: "https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/MIGRATION.md",
  },
  {
    label: "아키텍처 문서",
    href: "https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/ARCHITECTURE.md",
  },
] as const;

const EXECUTION_MODES = [
  {
    name: "Team",
    summary:
      "README.ko.md 확인 시점인 2026-04-08 기준으로 표준 오케스트레이션 표면입니다. `swarm`과 `ultrapilot`은 레거시 호환 경로로 남고, 실제 런타임은 Team 기준으로 설명됩니다.",
  },
  {
    name: "omc team",
    summary:
      "tmux 위에 Codex · Gemini · Claude CLI 워커를 일시적으로 띄우는 별도 실행 표면입니다. Claude Code 네이티브 Team과는 구분해서 읽어야 하며, 외부 CLI를 병렬 워커로 붙일 때 씁니다.",
  },
  {
    name: "Autopilot / Ralph / Ultrawork",
    summary:
      "완전 자율 실행, 끝날 때까지 밀어붙이는 지속 실행, Team 없이 병렬 수정하는 모드로 구분됩니다. README는 자연어 입력과 매직 키워드를 함께 지원하는 UX를 핵심으로 설명합니다.",
  },
] as const;

const UTILITY_ROWS = [
  {
    name: "Custom Skills",
    summary:
      "프로젝트 스코프 `.omc/skills/`와 사용자 스코프 `~/.omc/skills/`를 나눠 재사용 패턴을 쌓고 자동 주입합니다.",
  },
  {
    name: "omc wait",
    summary:
      "속도 제한이 풀릴 때 Claude Code 세션을 자동 재개하는 유틸리티입니다. tmux 세션 감지가 전제됩니다.",
  },
  {
    name: "알림 / OpenClaw",
    summary:
      "Telegram · Discord · Slack 태그 콜백과 OpenClaw 게이트웨이 연동을 선택적으로 붙일 수 있습니다. 코어 실행에 필수는 아니고, 조직 운영 자동화에 가까운 기능입니다.",
  },
] as const;

export const metadata: Metadata = {
  title: "oh-my-claudecode 읽기 가이드",
  description:
    "oh-my-claudecode README.ko.md 전체를 읽고, 빠른 시작 · Team 표준 · tmux CLI worker · 업데이트 절차를 이 사이트 관점으로 다시 정리한 페이지입니다.",
};

export default function OhMyClaudeCodeReferencePage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · 외부 하네스</ProseEyebrow>
        <ProseHeading level={1}>oh-my-claudecode 읽기 가이드</ProseHeading>
        <ProseParagraph>
          이 페이지는{" "}
          <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">
            README.ko.md
          </code>{" "}
          전체를 2026년 4월 8일 기준으로 읽고, 우리 사이트의 정보 구조에 맞게 다시 정리한 내부 가이드입니다.
          목적은 README를 그대로 번역해 옮기는 것이 아니라, 실제로 어떤 기능이 있고 무엇부터 적용해야 하는지 빠르게 파악하게 만드는 데 있습니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent hover:underline"
            >
              {item.label} ↗
            </a>
          ))}
        </div>

        <Callout tone="note" title="이 페이지에서 잡은 해석 기준">
          <p>
            이 저장소는 Claude Code 전체를 덮어쓰는 대체 문서를 만들지 않습니다. 대신
            <strong> 빠른 시작</strong>, <strong>표준 오케스트레이션 방식</strong>, <strong>선택 기능과 운영 유틸리티</strong> 세 층으로 나눠 읽습니다.
          </p>
        </Callout>

        <ProseHeading level={2}>1. 가장 짧은 시작 경로</ProseHeading>
        <ProseParagraph>
          README가 제시하는 기본 동선은 간단합니다. Claude Code 안에서 플러그인을 설치하고, 셋업을 한 번 실행한 뒤,
          자연어 프롬프트나 워크플로우 키워드로 바로 작업을 시작하는 흐름입니다. 우리 쪽 관점에서도 이 순서가 가장 안전합니다.
        </ProseParagraph>
        <CodeBlock filename="Claude Code 안에서 실행" language="bash">
{`# 1) 마켓플레이스 등록
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode

# 2) 플러그인 설치
/plugin install oh-my-claudecode

# 3) 설정 반영
/omc-setup

# 4) 바로 시작
autopilot: build a REST API for managing tasks

# 요구사항이 아직 흐리면
/deep-interview "I want to build a task management app"`}
        </CodeBlock>
        <Callout tone="tip" title="우리 사이트 기준 해석">
          <p>
            아이디어가 아직 흐릴 때는 <strong>/deep-interview</strong>, 구현을 끝까지 밀어야 할 때는
            <strong> autopilot</strong> 또는 <strong>ralph</strong>, 명확한 작업을 병렬로 태울 때는
            <strong> team</strong> 순서로 읽으시면 됩니다.
          </p>
        </Callout>

        <ProseHeading level={2}>2. Team이 표준이고, swarm은 레거시입니다</ProseHeading>
        <ProseParagraph>
          README는 <strong>v4.1.7부터 Team이 표준 오케스트레이션</strong>이라고 명확히 적습니다. 그래서 지금 OMC를 읽을 때는
          `swarm` 문법을 중심에 두면 안 됩니다. 새 문서와 새 사용 예시는 모두 `team` 기준으로 보시는 편이 맞습니다.
        </ProseParagraph>
        <CodeBlock filename="native Team 활성화 예시" language="json">
{`{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}`}
        </CodeBlock>
        <p className="mt-3 text-sm leading-7 text-foreground-muted">
          Team 파이프라인은 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">team-plan → team-prd → team-exec → team-verify → team-fix</code> 순서로 설명됩니다.
          즉 “에이전트를 많이 띄운다”보다 <strong>단계별 검증</strong>이 중심인 구조로 이해하시는 편이 정확합니다.
        </p>
        <CodeBlock filename="대표 예시" language="bash">
{`/team 3:executor "fix all TypeScript errors"`}
        </CodeBlock>

        <ProseHeading level={2}>3. Codex · Gemini worker 구조</ProseHeading>
        <ProseParagraph>
          README는 <strong>v4.4.0부터 Codex/Gemini MCP 서버 경로를 제거하고</strong>, 대신{" "}
          <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">omc team</code> 기반 tmux CLI worker 런타임을 강조합니다.
          이 점은 우리 쪽 콘텐츠에서도 분명히 분리해 둬야 합니다. Claude Code 네이티브 Team과, 외부 CLI를 병렬 워커로 호출하는 OMC Team은 같은 기능이 아닙니다.
        </ProseParagraph>
        <CodeBlock filename="tmux CLI worker 예시" language="bash">
{`omc team 2:codex "review auth module for security issues"
omc team 2:gemini "redesign UI components for accessibility"
omc team 1:claude "implement the payment flow"
/ccg Review this PR — architecture (Codex) and UI components (Gemini)`}
        </CodeBlock>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>필수 조건은 `tmux` 와 해당 CLI 설치입니다.</li>
          <li>`codex` 와 `gemini` 는 선택 기능입니다. Claude-only로도 OMC 자체는 동작합니다.</li>
          <li>교차 검토나 UI/아키텍처 분리 리뷰가 필요할 때만 붙이시는 편이 현실적입니다.</li>
        </ul>

        <ProseHeading level={2}>4. 우리 기준 핵심 세 가지</ProseHeading>
        <div className="mt-6 grid gap-4">
          {EXECUTION_MODES.map((item) => (
            <article key={item.name} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
              <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.summary}</p>
            </article>
          ))}
        </div>
        <Callout tone="warning" title="무엇을 바로 복사하면 안 되는가">
          <p>
            OMC를 읽고 곧바로 모든 키워드와 모든 유틸리티를 한 번에 팀 표준으로 정하시면 과합니다.
            처음에는 <strong>plugin 설치 → /omc-setup → team 또는 deep-interview 한두 개만 사용</strong> 순서가 더 안전합니다.
          </p>
        </Callout>

        <ProseHeading level={2}>5. 스킬 학습과 운영 유틸리티는 선택 계층입니다</ProseHeading>
        <ProseParagraph>
          README 후반부는 실행 모드 외에 재사용 패턴 축적, rate limit 대응, 알림과 외부 이벤트 연동을 설명합니다.
          이 영역은 코어 설치보다 한 단계 뒤에 읽으시면 됩니다.
        </ProseParagraph>
        <div className="mt-6 space-y-4">
          {UTILITY_ROWS.map((item) => (
            <div key={item.name} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
              <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.summary}</p>
            </div>
          ))}
        </div>

        <ProseHeading level={2}>6. 업데이트 절차는 두 단계로 보면 됩니다</ProseHeading>
        <ProseParagraph>
          README가 제시하는 공식 업데이트 절차는 단순합니다. 마켓플레이스 사본을 갱신하고, 셋업을 다시 실행해
          로컬 설정을 동기화하는 방식입니다. 문제가 나면 doctor 성격의 정리 명령으로 캐시와 상태를 점검합니다.
        </ProseParagraph>
        <CodeBlock filename="업데이트와 문제 복구" language="bash">
{`# 1) 마켓플레이스 동기화
/plugin marketplace update omc

# 2) 설정 다시 반영
/omc-setup

# 3) 문제 발생 시 점검
/omc-doctor`}
        </CodeBlock>
        <p className="mt-3 text-sm leading-7 text-foreground-muted">
          README는 auto-update가 꺼져 있으면 먼저{" "}
          <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">/plugin marketplace update omc</code>{" "}
          를 실행하라고 안내합니다. 우리 쪽 가이드도 이 절차를 기준으로 잡는 편이 맞습니다.
        </p>

        <ProseHeading level={2}>7. 이 사이트에서 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            href="/playbook/setup-claude-code"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">Claude Code 플레이북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Claude Code 기본 하네스를 먼저 잡고, OMC를 어떤 층에 올릴지 연결해서 읽으시면 됩니다.
            </p>
          </Link>
          <Link
            href="/reference/popular-harness-repos"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">인기 하네스 레포 10선</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              OMC를 다른 하네스 묶음과 비교해 어느 문제를 잘 푸는지 같이 보실 수 있습니다.
            </p>
          </Link>
          <Link
            href="/reference/open-source-stack"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">오픈소스 스택</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Codex CLI와 Gemini CLI를 왜 선택적 worker로 읽어야 하는지도 이 페이지에서 같이 정리됩니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
