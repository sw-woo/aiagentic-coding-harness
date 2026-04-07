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
  { label: "codexmaster debugging playbook", href: "https://github.com/robbiecalvin/codexmaster/tree/main/docs/security" },
  { label: "OpenAI Agents SDK Tracing", href: "https://openai.github.io/openai-agents-python/tracing/" },
] as const;

export const metadata: Metadata = {
  title: "에이전트 디버깅 플레이북",
  description:
    "agentic coding harness에서 디버깅을 어떻게 재현, 증거 수집, root cause, 최소 수정, 회귀 방지 흐름으로 다룰지 정리한 페이지입니다.",
};

export default function DebuggingPlaybookPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Debugging</ProseEyebrow>
        <ProseHeading level={1}>에이전트 디버깅 플레이북</ProseHeading>
        <ProseParagraph>
          에이전트가 낸 이상한 결과를 “모델이 원래 그렇다”고 넘기면 하네스는 성장하지 않습니다.
          좋은 하네스는 디버깅 자체도 playbook 화합니다. 즉, 실패를 분류하고, 재현하고, 증거를 모으고, root cause를 찾고, 최소 수정과 회귀 방지까지 한 흐름으로 다룹니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <Callout tone="warning" title="절대 먼저 하면 안 되는 것">
          <p>추측으로 고치기</p>
          <p>근거 없이 여러 파일을 한 번에 건드리기</p>
          <p>테스트 없이 “아마 해결됐을 것”이라고 끝내기</p>
        </Callout>

        <ProseHeading level={2}>1. 표준 디버깅 순서</ProseHeading>
        <CodeBlock filename="debugging workflow" language="text">
{`1. 실패를 분류한다
2. 재현 가능한지 확인한다
3. 에러 메시지 / stack trace / failing assertion 을 모은다
4. 실패 지점을 특정한다
5. 실행 경로를 추적한다
6. root cause 를 정리한다
7. 가장 작은 수정으로 고친다
8. 관련 테스트를 돌린다
9. 회귀 가능성을 확인한다`}
        </CodeBlock>

        <ProseHeading level={2}>2. 에이전트 디버깅에서 특별히 중요한 것</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>문제는 모델 출력이 아니라 harness 설정일 수 있습니다.</li>
          <li>권한, sandbox, hooks, MCP 연결 실패가 실제 원인인 경우가 많습니다.</li>
          <li>“틀린 답변”도 trace 와 tool call history가 있으면 분석 가능한 실패가 됩니다.</li>
        </ul>

        <ProseHeading level={2}>3. 최소 수정 원칙</ProseHeading>
        <ProseParagraph>
          root cause가 잡혔다면, 해결은 가능한 한 작아야 합니다. 큰 리팩터는 디버깅의 승리가 아니라 새로운 실패의 시작일 수 있습니다.
        </ProseParagraph>

        <ProseHeading level={2}>4. 하네스 관점의 실패 분류 예시</ProseHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Context 실패</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              AGENTS.md, docs, state 문서가 부족하거나 우선순위가 꼬여서 잘못된 판단을 하는 경우.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Tool 실패</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              MCP 연결, bash command, filesystem scope, browser automation 자체가 깨진 경우.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Policy 실패</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              rules, sandbox, approval 때문에 실제 필요한 행동을 못 하거나 반대로 열어 두어 위험이 생긴 경우.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Reasoning 실패</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              모델이 문제를 이해했지만 잘못 추론하거나, 충분히 계획하지 못한 경우.
            </p>
          </div>
        </div>

        <ProseHeading level={2}>5. 회귀 방지</ProseHeading>
        <ProseParagraph>
          디버깅이 끝났다면, 그 실패를 다시 못 밟게 해야 합니다. hook, rule, verify script, handoff 문서, 테스트 중 어디에 남길지 결정해야 합니다.
        </ProseParagraph>

        <ProseHeading level={2}>6. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/reference/security-guardrails" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">보안과 가드레일</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">정책 실패와 권한 문제를 같이 봅니다.</p>
          </Link>
          <Link href="/reference/codex-hooks" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex Hooks 심화</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">실행 시점 guardrail을 더 자세히 봅니다.</p>
          </Link>
          <Link href="/reference/metrics-observability" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Metrics / Observability</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">실패를 trace와 metrics로 남기는 층입니다.</p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
