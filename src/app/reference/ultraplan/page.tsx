import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";

const SOURCE_LINKS = [
  {
    label: "Claude Code — Ultraplan 공식 문서",
    href: "https://code.claude.com/docs/en/ultraplan",
  },
  {
    label: "Claude Code Changelog",
    href: "https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md",
  },
  {
    label: "Anthropic Opus 4.6 — Agent Teams",
    href: "https://www.anthropic.com/news/claude-opus-4-6",
  },
  {
    label: "Claude Support — Using Claude Code with Pro/Max",
    href: "https://support.claude.com/en/articles/11145838-using-claude-code-with-your-max-plan",
  },
] as const;

const RELATED_PAGES = [
  {
    href: "/reference/codex-best-practices",
    title: "Codex Best Practices",
    description:
      "OpenAI Codex PM 이 제시한 운영 원칙. Planning 을 처음부터 구조화하는 관점은 ultraplan 과 맞닿아 있습니다.",
  },
  {
    href: "/handbook#future",
    title: "핸드북 — 앞으로의 방향",
    description:
      "클라우드 오프로드 planning 을 런타임 경쟁의 다음 단계로 정리한 섹션입니다.",
  },
  {
    href: "/architecture/claude-vs-codex",
    title: "Claude Code vs Codex 비교",
    description:
      "Plan mode · 메모리 · 서브에이전트 차이를 한 장으로 정리한 페이지입니다.",
  },
] as const;

export const metadata: Metadata = {
  title: "Claude Code /ultraplan — 클라우드 오프로드 planning",
  description:
    "Claude Code 의 ultraplan 슬래시 명령은 계획 수립 단계를 Anthropic 클라우드로 오프로드해 터미널을 점유 해제하고, 웹 기반 리뷰 UI 와 두 가지 실행 경로(Teleport 또는 PR) 를 제공합니다. 공식 문서 기반 정리 페이지입니다.",
};

export default function UltraplanPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Claude Code</ProseEyebrow>
        <ProseHeading level={1}>
          Claude Code /ultraplan — 클라우드에서 계획을 돌리고 터미널은 비워 둡니다
        </ProseHeading>
        <ProseParagraph>
          Claude Code 의 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">/ultraplan</code>{" "}
          슬래시 명령은 기존 로컬 plan mode 와 다른 새로운 작동 방식을 도입합니다. 계획 수립 단계를
          Anthropic 의 클라우드 인프라에서 수행해서, 계획이 작성되는 동안 로컬 터미널은 다른 작업에
          자유롭게 쓸 수 있습니다. 이 페이지는 Anthropic 공식 문서를 1차 출처로 해서 ultraplan 의
          동작 방식, 요구 조건, 실행 경로, 운영 팁을 정리합니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent hover:underline"
            >
              {source.label} ↗
            </a>
          ))}
        </div>

        <Callout tone="warning" title="이 기능은 Research Preview 상태입니다">
          <p>
            Anthropic 공식 문서는 ultraplan 을 &ldquo;research preview&rdquo; 로 표기합니다 (
            <a
              href="https://code.claude.com/docs/en/ultraplan"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              code.claude.com/docs/en/ultraplan
            </a>
            ). 인터페이스와 동작은 안정화 이전이며, Claude Code 의 일반 release train 과 분리된
            기능 플래그 뒤에 있을 수 있습니다. 본 페이지의 내용은 2026-04-08 기준 공식 문서의
            스냅샷입니다.
          </p>
        </Callout>

        <ProseHeading level={2}>1. 무엇인가 — 한 문단 요약</ProseHeading>
        <ProseParagraph>
          Ultraplan 은 Claude Code 의 슬래시 명령으로, 사용자가 요청한 작업의 &ldquo;계획&rdquo; 을 로컬이 아니라
          Anthropic 의 클라우드에서 작성합니다. 로컬 Claude Code 는 계획 요청을 전달한 즉시 제어권을
          돌려받고, 사용자는 터미널에서 다른 작업을 계속하면서 웹 브라우저에서 작성된 계획을 검토하고
          수정할 수 있습니다. 계획이 확정되면 두 가지 경로로 실행을 이어갈 수 있습니다. 클라우드 세션이
          그대로 구현을 맡아 PR 을 생성하거나 (&ldquo;Approve Claude&apos;s plan and start coding&rdquo;),
          계획만 로컬 터미널로 다시 끌어오는 teleport 모드 (&ldquo;Approve plan and teleport back to
          terminal&rdquo;) 입니다 (
          <a
            href="https://code.claude.com/docs/en/ultraplan"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            공식 문서
          </a>
          ).
        </ProseParagraph>

        <ProseHeading level={2}>2. 세 가지 호출 방법</ProseHeading>
        <ProseParagraph>
          공식 문서는 ultraplan 을 시작하는 세 가지 방법을 설명합니다.
        </ProseParagraph>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            <strong>슬래시 명령</strong>:{" "}
            <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">/ultraplan</code>{" "}
            뒤에 프롬프트를 붙여 실행합니다. 문서 인용: &ldquo;run{" "}
            <code>/ultraplan</code> followed by your prompt&rdquo; (
            <a
              href="https://code.claude.com/docs/en/ultraplan"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              공식 문서
            </a>
            ).
          </li>
          <li>
            <strong>키워드 감지</strong>: 일반 프롬프트 안에 &ldquo;ultraplan&rdquo; 이라는 단어를
            포함하면 Claude Code 가 자동으로 ultraplan 경로를 제안합니다.
          </li>
          <li>
            <strong>로컬 plan mode 에서 업그레이드</strong>: 이미 로컬에서 plan mode 를 실행 중이면
            그 세션에서 직접 ultraplan 으로 상승시킬 수 있습니다.
          </li>
        </ul>

        <ProseHeading level={2}>3. 요구 조건</ProseHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">요구 1</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">Claude Code v2.1.91 이상</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              공식 문서: &ldquo;Ultraplan is in research preview and requires Claude Code v2.1.91
              or later.&rdquo;
              {" "}
              (
              <a
                href="https://code.claude.com/docs/en/ultraplan"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                공식 문서
              </a>
              )
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">요구 2</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">Pro / Max / Team / Enterprise 플랜</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              공식 문서: &ldquo;Ultraplan requires a Claude Code on the web account (Pro, Max, Team,
              or Enterprise)&rdquo; (
              <a
                href="https://code.claude.com/docs/en/ultraplan"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                공식 문서
              </a>
              ). 사용자가 많이 퍼뜨린 &ldquo;Pro/Max 만 지원&rdquo; 은 공식 문서 기준 정확하지
              않습니다 — Team · Enterprise 도 포함됩니다.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">요구 3</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">GitHub 저장소 연결</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              공식 문서: &ldquo;Ultraplan requires a Claude Code on the web account and a GitHub
              repository.&rdquo; 프로젝트가 GitHub 과 동기화돼 있어야 클라우드 세션이 계획을 읽고
              PR 을 생성할 수 있습니다.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-danger">제약</p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              AWS Bedrock · GCP Vertex AI · Microsoft Foundry 에서는 작동하지 않음
            </h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              공식 문서 인용: &ldquo;Because it runs on Anthropic&apos;s cloud infrastructure, it is
              not available when using Amazon Bedrock, Google Cloud Vertex AI, or Microsoft
              Foundry.&rdquo; 우회 연동 환경에서는 기존 로컬 plan mode 를 쓰셔야 합니다.
            </p>
          </article>
        </div>

        <ProseHeading level={2}>4. 실제 흐름 — 호출부터 PR 까지</ProseHeading>
        <ProseParagraph>
          공식 문서의 흐름을 요약하면 다음과 같습니다.
        </ProseParagraph>
        <ol className="mt-5 list-decimal space-y-3 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            사용자가 로컬 Claude Code 에서{" "}
            <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">/ultraplan</code>{" "}
            명령으로 작업을 요청합니다.
          </li>
          <li>
            로컬 CLI 는 클라우드 세션을 시작한 뒤 즉시 제어권을 반환합니다. 문서 인용:
            &ldquo;Claude drafts the plan in the cloud while you keep working in your
            terminal.&rdquo; CLI 는 3초 간격으로 상태를 폴링하면서 계획 진행 상황을 보여줍니다.
          </li>
          <li>
            클라우드 세션이 계획 문서를 작성하는 동안 사용자는 브라우저에서 웹 UI 를 열 수
            있습니다. 웹 UI 는 다음 세 가지 리뷰 기능을 제공합니다.
            <ul className="mt-2 list-disc space-y-1 pl-6 text-[15px] text-foreground-muted">
              <li>
                <strong>Inline comments</strong>: 계획의 특정 구간을 선택해서 수정 요청 댓글을
                남깁니다. 인용: &ldquo;highlight any passage and leave a comment for Claude to
                address.&rdquo;
              </li>
              <li>
                <strong>Emoji reactions</strong>: 긴 코멘트 없이 이모지 반응으로 승인·우려 신호를
                전달합니다.
              </li>
              <li>
                <strong>Outline sidebar</strong>: 긴 계획 문서의 섹션을 사이드바에서 빠르게
                점프합니다.
              </li>
            </ul>
          </li>
          <li>
            사용자가 계획을 승인하면 두 가지 실행 경로 중 선택합니다.
            <ul className="mt-2 list-disc space-y-1 pl-6 text-[15px] text-foreground-muted">
              <li>
                <strong>Approve Claude&apos;s plan and start coding</strong>: 같은 클라우드 세션이
                그대로 구현을 이어갑니다. 완료 시 웹에서 diff 를 검토하고 PR 을 생성합니다.
              </li>
              <li>
                <strong>Approve plan and teleport back to terminal</strong>: 웹 세션은 아카이브되고,
                계획이 로컬 터미널로 돌아옵니다. 이후 구현은 평소처럼 로컬 Claude Code 에서
                진행합니다. CLI 는 &ldquo;Ultraplan approved&rdquo; 다이얼로그로 Implement here /
                Start new session / Cancel 세 옵션을 보여줍니다.
              </li>
            </ul>
          </li>
        </ol>

        <ProseHeading level={2}>5. 언제 쓰면 가치가 있는가</ProseHeading>
        <ProseParagraph>
          공식 문서는 ultraplan 의 가치를 세 가지 표현으로 설명합니다.
        </ProseParagraph>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            <strong>Targeted feedback</strong>: 계획의 특정 섹션에 대해 구체적인 수정 요청을 주고받을
            수 있어 대규모 작업의 초기 방향 잡기가 쉬워집니다.
          </li>
          <li>
            <strong>Hands-off drafting</strong>: 계획이 원격에서 생성되므로 로컬 터미널이 다른 작업에
            자유롭게 쓸 수 있습니다.
          </li>
          <li>
            <strong>Flexible execution</strong>: 승인 후 클라우드에서 바로 PR 을 만들지, 로컬에서
            구현할지 선택할 수 있습니다.
          </li>
        </ul>
        <Callout tone="note" title="크기별 권장은 공식 문서에 없습니다">
          <p>
            &ldquo;대규모 리팩토링에는 좋지만 소규모 변경에는 과도하다&rdquo; 는 논의는 개발자 블로그
            (Medium, DEV Community 등) 에서 커뮤니티 평가로 나옵니다. Anthropic 공식 문서에는 크기별
            권장 임계값이나 사용 사례 제한이 <em>명시되지 않았습니다</em> [출처 미확인 — 공식 문서에
            구체 가이드 없음]. 운영 판단은 팀마다 다를 수 있습니다.
          </p>
        </Callout>

        <ProseHeading level={2}>6. 내부 아키텍처에 대한 알림</ProseHeading>
        <ProseParagraph>
          사용자가 보고한 &ldquo;3개 탐색 에이전트 + 1개 비평 에이전트 병렬 실행&rdquo; 구성은 공식
          Anthropic 출처에서 직접 확인되지 않습니다. Opus 4.6 의 &ldquo;Agent Teams&rdquo; 발표
          (
          <a
            href="https://www.anthropic.com/news/claude-opus-4-6"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            anthropic.com/news/claude-opus-4-6
          </a>
          )
          가 병렬 에이전트 조율 개념을 도입했고 ultraplan 이 그 위에서 동작할 가능성은 높지만,
          정확한 에이전트 개수와 역할 구성은 현재 공식 문서에서 공개되지 않았습니다. 이 부분은{" "}
          <strong>[출처 미확인 — 공식 문서 미명시, 커뮤니티 소스 분석만 존재]</strong> 로 표기합니다.
        </ProseParagraph>

        <ProseHeading level={2}>7. 운영 팁 — Front-load Context 가 가장 중요합니다</ProseHeading>
        <ProseParagraph>
          Ultraplan 의 클라우드 세션은 사용자의 로컬 환경을 완전히 처음 보는 상태에서 시작합니다.
          로컬 CLAUDE.md, .claude/ 설정, 기존 파일 구조를 백지에서 탐색해야 하므로, 프롬프트를 짤 때
          다음 세 가지를 앞쪽에 넣는 것이 결과 품질에 크게 영향을 줍니다.
        </ProseParagraph>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            <strong>핵심 파일 경로</strong>: 작업의 시작점이 되는 파일들을 경로로 명시하면 클라우드
            에이전트가 탐색 시간을 아낄 수 있습니다.
          </li>
          <li>
            <strong>현재 아키텍처의 한 줄 요약</strong>: 어느 프레임워크, 어느 빌드 시스템, 어느
            배포 파이프라인인지 먼저 알려 주면 중간 판단이 빨라집니다.
          </li>
          <li>
            <strong>반드시 피해야 할 경로</strong>: 수정하면 안 되는 디렉터리, 손대면 안 되는
            설정 파일, destructive 명령 금지 같은 제약을 앞에 둡니다.
          </li>
        </ul>
        <ProseParagraph>
          이 원칙은 ultraplan 에만 해당하지 않고, 모든 클라우드 기반 AI 코딩 도구에 공통되는
          권장입니다. 핵심은 &ldquo;컨텍스트를 에이전트가 탐색하게 두지 말고, 처음부터 사용자가
          던져라&rdquo; 입니다.
        </ProseParagraph>

        <ProseHeading level={2}>8. 로컬 Plan mode 와의 차이</ProseHeading>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  축
                </th>
                <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  로컬 Plan mode (기존)
                </th>
                <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  /ultraplan (클라우드 오프로드)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 align-top font-semibold text-foreground">
                  계획 실행 위치
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  사용자 로컬 머신
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  Anthropic 클라우드 인프라
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top font-semibold text-foreground">
                  터미널 점유
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  점유 (사용자는 기다려야 함)
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  즉시 반환 + 3초 폴링 상태
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top font-semibold text-foreground">
                  리뷰 UI
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  터미널 텍스트
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  브라우저 웹 UI (인라인 댓글, 이모지, 아웃라인)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top font-semibold text-foreground">
                  실행 경로
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  로컬 세션 계속
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  클라우드 구현 + PR or Teleport
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top font-semibold text-foreground">
                  요구 조건
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  Claude Code 설치만 있으면 됨
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  v2.1.91+ · Pro/Max/Team/Enterprise · GitHub · Anthropic 클라우드
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top font-semibold text-foreground">
                  3rd-party 제공자
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  Bedrock · Vertex AI · Foundry 지원
                </td>
                <td className="px-4 py-3 align-top text-foreground-muted">
                  모두 미지원
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <ProseHeading level={2}>9. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {RELATED_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
            >
              <h3 className="text-lg font-semibold text-foreground">{page.title}</h3>
              <p className="mt-2 text-sm leading-7 text-foreground-muted">{page.description}</p>
            </Link>
          ))}
        </div>

        <ProseHeading level={2}>10. Sources</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            Claude Code — Ultraplan 공식 문서 (1차 출처):{" "}
            <a
              href="https://code.claude.com/docs/en/ultraplan"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              code.claude.com/docs/en/ultraplan
            </a>
          </li>
          <li>
            Claude Code — Amazon Bedrock 설정 문서 (3rd-party 제약 확인):{" "}
            <a
              href="https://code.claude.com/docs/en/amazon-bedrock"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              code.claude.com/docs/en/amazon-bedrock
            </a>
          </li>
          <li>
            Claude Support — Using Claude Code with your Pro or Max plan:{" "}
            <a
              href="https://support.claude.com/en/articles/11145838-using-claude-code-with-your-max-plan"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              support.claude.com
            </a>
          </li>
          <li>
            Claude Code Changelog (v2.1.91 릴리스 히스토리):{" "}
            <a
              href="https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              github.com/anthropics/claude-code
            </a>
          </li>
          <li>
            Anthropic News — Claude Opus 4.6 Agent Teams:{" "}
            <a
              href="https://www.anthropic.com/news/claude-opus-4-6"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              anthropic.com/news/claude-opus-4-6
            </a>
          </li>
        </ul>

        <hr className="my-12 border-border" />
        <p className="font-mono text-sm text-foreground-muted">
          ←{" "}
          <Link href="/reference" className="text-accent-2 hover:underline">
            참고자료 인덱스로 돌아가기
          </Link>
        </p>
      </Prose>
    </div>
  );
}
