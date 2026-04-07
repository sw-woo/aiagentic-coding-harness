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
  { label: "OpenAI Agents SDK Tracing", href: "https://openai.github.io/openai-agents-python/tracing/" },
  { label: "OpenAI Agents SDK JS Tracing", href: "https://openai.github.io/openai-agents-js/guides/tracing/" },
  { label: "Langfuse Observability Overview", href: "https://langfuse.com/docs/observability/overview" },
  { label: "Langfuse Get Started", href: "https://langfuse.com/docs/observability/get-started" },
  { label: "Sentry AI Agent Monitoring", href: "https://docs.sentry.io/platforms/javascript/guides/cloudflare/tracing/instrumentation/ai-agents-module/" },
] as const;

export const metadata: Metadata = {
  title: "Metrics 와 Observability",
  description:
    "agentic coding harness에서 tracing, metrics, observability를 어떻게 설계해야 하는지 정리한 페이지입니다.",
};

export default function MetricsObservabilityPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Metrics</ProseEyebrow>
        <ProseHeading level={1}>Metrics 와 Observability</ProseHeading>
        <ProseParagraph>
          에이전트 도입은 체감만으로 평가하면 실패합니다. “똑똑해 보인다” 대신, trace, latency, tool calls, token usage,
          validation pass rate, regression rate, rework time 같은 수치를 봐야 합니다. 이 페이지는 그 측정 층을 정리합니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <Callout tone="note" title="왜 observability가 중요한가">
          <p>
            에이전트 시스템은 비결정적입니다. 따라서 “왜 이런 결과가 나왔는지”를 관찰할 수 없으면 개선이 거의 불가능합니다.
          </p>
        </Callout>

        <ProseHeading level={2}>1. 무엇을 측정해야 하나</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>정확성: validation과 tests를 통과했는가</li>
          <li>완전성: 요청된 범위를 다 수행했는가</li>
          <li>명료성: 다른 개발자가 결과를 이해할 수 있는가</li>
          <li>효율성: 과한 복잡도 없이 끝냈는가</li>
          <li>신뢰성: 비슷한 요청에서 일관되게 동작하는가</li>
          <li>제약 준수: rules, hooks, approval 경계를 지켰는가</li>
        </ul>

        <ProseHeading level={2}>2. Trace가 남겨야 하는 것</ProseHeading>
        <CodeBlock filename="trace 핵심 항목" language="text">
{`- workflow_name
- trace_id / session_id
- group_id
- model
- tool calls
- handoffs
- guardrails triggered
- latency
- token / cost
- validation result
- final outcome`}
        </CodeBlock>

        <ProseHeading level={2}>3. OpenAI Agents SDK에서 볼 수 있는 것</ProseHeading>
        <ProseParagraph>
          OpenAI Agents SDK tracing 문서는 trace와 span 개념을 분명히 설명합니다. 기본적으로 agent runs, LLM generations, tool calls,
          handoffs, guardrails가 trace 안에 들어갑니다. 이건 결국 “하네스의 실행 기록”을 남기는 것입니다.
        </ProseParagraph>

        <ProseHeading level={2}>4. 외부 observability 도구는 언제 붙이나</ProseHeading>
        <ProseParagraph>
          팀 단위 rollout에서는 Langfuse나 Sentry 같은 도구를 붙일 가치가 커집니다. Langfuse는 traces, sessions, observations,
          cost/latency/quality 를 중심으로 보고, Sentry는 AI Agent Monitoring으로 errors와 runtime behavior를 같이 봅니다.
        </ProseParagraph>

        <ProseHeading level={2}>5. 사내 도입 기준</ProseHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">초기 단계</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              lint/build/test pass rate, reviewer findings, rework rate 같은 내부 지표만 먼저 모아도 충분합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">확장 단계</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              traces, cost, latency, tool failure, MCP errors, workflow grouping까지 외부 observability 도구로 내보내는 것이 좋습니다.
            </p>
          </div>
        </div>

        <ProseHeading level={2}>6. 추천 운영 루프</ProseHeading>
        <CodeBlock filename="measure loop" language="text">
{`1. 요청 실행
2. validation / tests
3. trace 저장
4. metrics 집계
5. 실패 분류
6. hooks / rules / AGENTS / skills / prompts 중 어디를 고칠지 결정
7. 재실행`}
        </CodeBlock>

        <ProseHeading level={2}>7. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/reference/debugging-playbook" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">디버깅 플레이북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              trace와 metrics가 실제로 어떻게 디버깅에 쓰이는지 봅니다.
            </p>
          </Link>
          <Link href="/reference/security-guardrails" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">보안과 가드레일</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              observability가 왜 정책과 함께 가야 하는지 이해하기 좋습니다.
            </p>
          </Link>
          <Link href="/handbook" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              metrics와 observability를 큰그림 안에서 읽으려면 이 페이지가 맞습니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
