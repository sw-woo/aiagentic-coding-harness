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
    label: "Anthropic Prompt Caching 문서",
    href: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching",
  },
  {
    label: "OpenAI Prompt Caching 가이드",
    href: "https://platform.openai.com/docs/guides/prompt-caching",
  },
  {
    label: "Helicone 공식 사이트",
    href: "https://helicone.ai",
  },
  {
    label: "LangSmith 공식 사이트",
    href: "https://smith.langchain.com",
  },
  {
    label: "Arize Phoenix (오픈소스 observability)",
    href: "https://phoenix.arize.com",
  },
] as const;

const RELATED_PAGES = [
  {
    href: "/reference/zero-trust-plugins",
    title: "Zero Trust 플러그인",
    description:
      "토큰 절약 이전에 보안 경계가 먼저입니다. 4계층 방어 원칙을 먼저 정리한 우산 페이지입니다.",
  },
  {
    href: "/reference/agent-sandboxing",
    title: "에이전트 샌드박싱",
    description:
      "격리 실행 환경 비교. 샌드박스 선택이 토큰 비용에도 영향을 줍니다 (재실행 빈도).",
  },
  {
    href: "/reference/metrics-observability",
    title: "관측성 (기본)",
    description:
      "traces, metrics, observability 의 기본 개념과 도구 목록입니다.",
  },
] as const;

export const metadata: Metadata = {
  title: "토큰 경제학 — CLI 압축 · 캐싱 · 라우팅 · 관측",
  description:
    "AI 코딩에서 토큰 비용을 실질적으로 줄이는 방법을 RTK 같은 CLI 출력 압축, Anthropic · OpenAI 프롬프트 캐싱, 모델 라우팅, observability 도구 순서로 정리한 페이지입니다.",
};

export default function TokenEconomicsPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Token economics</ProseEyebrow>
        <ProseHeading level={1}>
          토큰 경제학 — 같은 작업도 5~10배 차이가 나는 이유
        </ProseHeading>
        <ProseParagraph>
          같은 코드 작업을 두 팀이 수행해도, 어떤 도구와 어떤 운영 원칙을 쓰느냐에 따라 소비하는
          토큰의 양은 크게 차이납니다. 이 페이지는 AI 코딩 환경에서 토큰 비용을 낮추는 네 가지
          방법 — CLI 출력 압축, 프롬프트 캐싱, 모델 라우팅, 관측성 — 을 실제 검증 가능한 도구와
          함께 정리합니다.
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

        <Callout tone="note" title="왜 이 페이지가 필요한가">
          <p>
            &ldquo;AI 도구가 비싸다&rdquo; 는 말의 상당 부분은 <strong>도구 그 자체가 아니라 운영 방식</strong> 의
            문제입니다. 같은 모델을 쓰면서도 캐시 hit 비율이 낮거나, verbose 한 CLI 출력을 그대로
            컨텍스트에 흘리거나, 단순한 작업에 최상위 모델을 쓰는 습관이 누적되면 비용이 급증합니다.
          </p>
          <p>
            이 페이지의 네 층을 모두 적용하면 많은 경우 토큰 비용을 50~80% 수준까지 줄일 수 있습니다.
            정확한 수치는 환경과 워크로드에 따라 다르므로, 마지막 절의 &ldquo;실제로 측정하라&rdquo; 부분을
            반드시 참고해 주십시오.
          </p>
        </Callout>

        <ProseHeading level={2}>1. 토큰 비용이 왜 문제가 되는가</ProseHeading>
        <ProseParagraph>
          AI 코딩 도구의 청구서가 예상보다 빠르게 늘어나는 이유는 대부분 다음 네 가지입니다.
        </ProseParagraph>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            <strong>Verbose CLI 출력</strong>: 빌드 로그, 패키지 설치 로그, 테스트 결과 전체를
            컨텍스트에 그대로 투입해서 토큰이 급증합니다.
          </li>
          <li>
            <strong>캐시 미활용</strong>: 시스템 프롬프트와 도구 정의가 매 세션마다 조금씩 달라져서
            Anthropic · OpenAI 의 prompt caching 이 hit 되지 않습니다.
          </li>
          <li>
            <strong>모델 오버스펙</strong>: 단순 grep 수준의 작업에도 최상위 모델을 쓰고, 실패하면
            다시 최상위 모델로 재시도합니다.
          </li>
          <li>
            <strong>관측 부재</strong>: 어떤 단계가 비용을 크게 쓰는지 측정하지 않아서, 개선 지점을
            찾지 못합니다.
          </li>
        </ul>

        <ProseHeading level={2}>2. Layer 1 — CLI 출력 압축 (RTK 사례)</ProseHeading>
        <ProseParagraph>
          에이전트가 터미널에서 실행한 명령의 출력이 길면 그만큼 컨텍스트 창이 소비됩니다.
          해결책은 긴 출력을 자동으로 요약하거나 핵심만 남기는 CLI 프록시 계층을 쓰는 것입니다.
          본 저장소의 사용자 환경에는 <strong>RTK (Rust Token Killer)</strong> 가 설치돼 있어서
          실제 측정 가능한 예시로 쓸 수 있습니다.
        </ProseParagraph>
        <ProseParagraph>
          RTK 의 사용자 로컬 가이드에는 다음과 같이 정리돼 있습니다
          (출처: 사용자 로컬 환경 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">~/.claude/RTK.md</code>).
        </ProseParagraph>
        <Callout tone="tip" title="RTK 의 자기 소개 (사용자 로컬 원문 인용)">
          <p className="font-mono text-sm">
            &ldquo;RTK — Rust Token Killer. Usage: Token-optimized CLI proxy (60-90% savings on dev
            operations).&rdquo;
          </p>
        </Callout>
        <ProseParagraph>
          RTK 는 Claude Code hook 을 통해 <em>투명하게</em> 동작합니다. 개발자가 터미널에서 치는
          모든 명령이 RTK 프록시를 거쳐 가고, 긴 출력은 자동으로 필터링되어 에이전트 컨텍스트에는
          압축된 형태로 전달됩니다. 사용자 가이드의 hook 관련 설명은 다음과 같습니다
          (같은 출처).
        </ProseParagraph>
        <Callout tone="note" title="RTK hook 기반 사용 (사용자 로컬 원문 인용)">
          <p className="font-mono text-sm">
            &ldquo;All other commands are automatically rewritten by the Claude Code hook. Example:
            <br />
            <code>git status</code> → <code>rtk git status</code> (transparent, 0 tokens
            overhead)&rdquo;
          </p>
        </Callout>
        <ProseParagraph>
          RTK 는 또한 토큰 절약량을 측정하는 메타 명령을 제공합니다. 이 부분이 이 페이지 관점에서
          가장 중요합니다 — &ldquo;절약했다&rdquo; 고 주장하는 대신 실제 수치로 볼 수 있어야 합니다.
        </ProseParagraph>
        <CodeBlock filename="rtk-meta-commands.sh" language="bash">
{`# 토큰 절약 분석 (사용자 환경: ~/.claude/RTK.md)
rtk gain              # 전체 토큰 절약 수치 표시
rtk gain --history    # 명령별 사용 이력 + 절약량
rtk discover          # Claude Code 이력에서 놓친 절약 기회 탐지
rtk proxy <cmd>       # 필터링 없이 원본 실행 (디버깅용)

# 설치 확인
rtk --version
rtk gain
which rtk`}
        </CodeBlock>
        <ProseParagraph>
          RTK 는 공개 저장소{" "}
          <a
            href="https://github.com/rtk-ai/rtk"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            github.com/rtk-ai/rtk
          </a>
          {" "}에서 운영됩니다. Rust 단일 바이너리로 배포되며, macOS 에서는{" "}
          <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">brew install rtk</code>
          {" "}한 줄로 설치할 수 있습니다. 100 여 개 이상의 명령어 (git, cargo, pytest, vitest,
          AWS / Docker / Kubernetes CLI 등) 에 대한 압축 프로파일을 기본 제공합니다. 공식 문서에
          기록된 구체 사례로는{" "}
          <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">git status</code>{" "}
          약 80% 절감,{" "}
          <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">cargo test</code>{" "}
          약 90% 절감, 30분 Claude Code 세션 150,000 → 45,000 토큰 (약 70% 감소) 이 언급됩니다.
        </ProseParagraph>
        <Callout tone="warning" title="이름 충돌 주의">
          <p>
            GitHub 에는 같은 이름의{" "}
            <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">
              reachingforthejack/rtk
            </code>{" "}
            (Rust Type Kit — TypeScript 도구) 프로젝트가 따로 있습니다. Token Killer 를 설치할 때는
            반드시{" "}
            <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">rtk-ai/rtk</code>{" "}
            저장소인지 확인해 주십시오. 설치 후{" "}
            <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">rtk gain</code>{" "}
            명령이 동작하면 Token Killer 가 맞습니다.
          </p>
        </Callout>

        <ProseHeading level={2}>3. Layer 2 — Prompt Caching (Anthropic + OpenAI)</ProseHeading>
        <ProseParagraph>
          두 번째 층은 시스템 프롬프트와 도구 정의를 캐시에 올려서 매번 다시 과금되지 않게 만드는
          것입니다. Anthropic 과 OpenAI 모두 공식 기능으로 제공합니다.
        </ProseParagraph>

        <ProseHeading level={3}>3.1 Anthropic Prompt Caching</ProseHeading>
        <ProseParagraph>
          Anthropic 은 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">cache_control</code>{" "}
          파라미터로 프롬프트의 특정 부분을 캐시 지점 (cache breakpoint) 으로 지정할 수 있게 합니다.
          해당 지점 이전까지의 내용은 재사용될 때 대폭 할인된 요율로 과금됩니다. 공식 문서는 다음
          URL 입니다
          (
          <a
            href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            docs.anthropic.com/en/docs/build-with-claude/prompt-caching
          </a>
          ).
        </ProseParagraph>
        <CodeBlock filename="anthropic-cached-request.ts" language="typescript">
{`// Anthropic Messages API — prompt caching 예시
// 출처: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
const response = await anthropic.messages.create({
  model: "claude-opus-4-6",
  max_tokens: 1024,
  system: [
    {
      type: "text",
      text: "You are a senior Kotlin reviewer for the aiops-api project.",
    },
    {
      type: "text",
      text: LARGE_CODEBASE_CONTEXT, // 이 부분을 캐싱
      cache_control: { type: "ephemeral" },
    },
  ],
  messages: [
    { role: "user", content: "이 PR 에 보안 리뷰 부탁합니다." },
  ],
});`}
        </CodeBlock>

        <ProseHeading level={3}>3.2 OpenAI Prompt Caching</ProseHeading>
        <ProseParagraph>
          OpenAI 는 프롬프트의 앞부분(prefix) 이 이전 요청과 같으면 자동으로 캐시를 활용합니다.
          별도의 플래그가 없이, 동일한 prefix 를 유지하는 것만으로 캐시 hit 가 발생합니다. 공식
          가이드는 다음 URL 입니다
          (
          <a
            href="https://platform.openai.com/docs/guides/prompt-caching"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            platform.openai.com/docs/guides/prompt-caching
          </a>
          ).
        </ProseParagraph>
        <ProseParagraph>
          두 API 의 설계는 다르지만, <strong>운영 원칙은 같습니다</strong>. 시스템 프롬프트와 도구
          정의가 요청마다 조금씩 바뀌면 캐시가 깨집니다. 따라서 다음 세 가지를 지켜야 합니다.
        </ProseParagraph>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            시스템 프롬프트의 앞 부분을 고정합니다. 동적 값 (현재 시간, 세션 ID 등) 은 뒤쪽 user
            메시지에만 둡니다.
          </li>
          <li>
            도구 (tool / function) 정의의 순서를 변경하지 않습니다. 한 개만 바뀌어도 캐시가
            무효화됩니다.
          </li>
          <li>
            매 세션마다 재사용되는 긴 컨텍스트 (코드베이스, 문서, 예시) 는 반드시 캐시 대상 영역에
            둡니다.
          </li>
        </ul>
        <ProseParagraph>
          실제 얼마나 절약되는지는 캐시 hit 비율과 prefix 길이에 따라 다르므로, 이 페이지는 &ldquo;몇 배
          절약&ldquo; 같은 단정 수치를 피합니다. 양쪽 공식 문서에 명시된 정확한 요율을 직접 확인해
          주십시오.
        </ProseParagraph>

        <ProseHeading level={2}>4. Layer 3 — 모델 라우팅</ProseHeading>
        <ProseParagraph>
          세 번째 층은 모든 작업을 최상위 모델에 던지는 대신, 작업 복잡도에 따라 모델을 다르게
          배치하는 것입니다. 간단한 grep, 파일 이동, 단순 반복 작업은 Haiku 급 모델이면 충분한 경우가
          많고, 설계·대규모 리팩토링만 Opus 급 모델에 맡기는 식으로 분기합니다.
        </ProseParagraph>
        <ProseParagraph>
          Anthropic 은 이 패턴을 &ldquo;Building effective agents&rdquo; 에서 공식적으로 권장합니다 — 워크플로의
          각 단계에 가장 단순한 모델을 배치하고, 필요할 때만 더 복잡한 모델을 호출하라는 원칙입니다
          (
          <a
            href="https://www.anthropic.com/engineering/building-effective-agents"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            anthropic.com/engineering/building-effective-agents
          </a>
          ).
        </ProseParagraph>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              메인 세션
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">상위 모델</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              설계 판단, 대규모 리팩토링, 요구사항 해석, 최종 리뷰. Claude Opus 4.6 또는 GPT-5.4
              급.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              서브에이전트
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">중간 모델</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              reviewer, verifier, docs-researcher 같은 좁은 역할. Haiku, GPT-5.4 mini, Gemma 4
              31B, Qwen3-Coder 30B 급.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              고정 루틴
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">소형 / 로컬 모델</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              파일 탐색, 간단한 grep, 요약. 작은 open coder 모델이나 캐시된 응답이면 충분합니다.
            </p>
          </article>
        </div>
        <ProseParagraph>
          모델 라우팅은 직접 구현할 수도 있지만, Vercel AI Gateway
          (
          <a
            href="https://vercel.com/docs/ai-gateway"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            vercel.com/docs/ai-gateway
          </a>
          )
          나 OpenRouter 같은 게이트웨이 서비스가 요청을 프록시하면서 모델 선택·failover·캐싱을 통합
          관리해 주기도 합니다.
        </ProseParagraph>

        <ProseHeading level={2}>5. Layer 4 — 관측성 (Observability)</ProseHeading>
        <ProseParagraph>
          마지막 층은 &ldquo;측정 없이는 개선도 없다&rdquo; 원칙입니다. 어느 단계가 가장 많은 토큰을 쓰는지,
          어느 프롬프트가 캐시 hit 에 실패하는지, 어느 도구 호출이 비용을 튀게 만드는지 실제로
          측정하지 않으면 개선할 지점을 찾을 수 없습니다. 오픈소스 · SaaS 세 가지를 소개합니다.
        </ProseParagraph>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Helicone</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              OpenAI · Anthropic · 기타 주요 API 에 프록시로 붙어서 요청·응답·토큰 사용량을 기록합니다.
              base URL 하나만 바꾸면 기존 SDK 가 그대로 동작합니다
              {" "}
              (
              <a
                href="https://helicone.ai"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                helicone.ai
              </a>
              ).
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">LangSmith</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              LangChain 팀이 만든 traces + evals 플랫폼. LangChain 외 프레임워크에서도 decorators
              만 붙이면 사용할 수 있습니다
              {" "}
              (
              <a
                href="https://smith.langchain.com"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                smith.langchain.com
              </a>
              ).
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Arize Phoenix</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              오픈소스 LLM observability. 자체 호스팅 가능하고 OpenTelemetry 기반이라 기존 관측
              스택과 섞어 쓸 수 있습니다
              {" "}
              (
              <a
                href="https://phoenix.arize.com"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                phoenix.arize.com
              </a>
              ).
            </p>
          </article>
        </div>
        <ProseParagraph>
          세 도구 모두 같은 질문에 답합니다. &ldquo;어느 요청이 가장 많은 토큰을 썼는가&rdquo;, &ldquo;캐시 hit 비율은
          얼마인가&ldquo;, &rdquo;평균 latency 는 어떻게 변하고 있는가&ldquo;, &rdquo;어떤 사용자 플로가 가장 비싼가&ldquo;. 이
          수치를 매주 한 번이라도 보면 운영 원칙이 감에서 수치로 바뀝니다.
        </ProseParagraph>

        <ProseHeading level={2}>6. 운영 원칙 — 네 층을 묶는 일상 습관</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            <strong>Front-load context</strong>: 필요할 것 같은 핵심 파일 경로·제약·규칙을 첫 번째
            메시지에 한 번에 전달합니다. 에이전트가 탐색에 토큰을 덜 씁니다.
          </li>
          <li>
            <strong>작은 작업은 작은 모델에게</strong>: 파일 이동, grep, 포맷 수정 같은 루틴에는
            Haiku / GPT mini / 로컬 작은 모델을 씁니다.
          </li>
          <li>
            <strong>캐시 prefix 를 건드리지 마십시오</strong>: 시스템 프롬프트 앞 부분, 도구 정의
            순서, 예시 세트 순서는 고정해 두어야 Anthropic · OpenAI 프롬프트 캐시가 hit 됩니다.
          </li>
          <li>
            <strong>긴 출력은 파일로</strong>: 빌드 로그, 테스트 결과, 패키지 설치 로그 같은 긴
            출력을 에이전트 컨텍스트에 그대로 붓지 말고, 파일에 저장하고 요약만 전달합니다.
          </li>
          <li>
            <strong>관측 대시보드를 주 1회 봅니다</strong>: Helicone · LangSmith · Phoenix 중 어느
            것이든 좋습니다. 보지 않으면 개선도 없습니다.
          </li>
          <li>
            <strong>실패 retry 를 막습니다</strong>: 같은 실패를 재시도하는 것만큼 비싼 것이 없습니다.
            실패 시 반드시 짧은 log 로 원인을 확정한 뒤 접근을 바꿉니다.
          </li>
        </ul>

        <ProseHeading level={2}>7. 실제로 측정하기 — 이 페이지의 마지막 원칙</ProseHeading>
        <ProseParagraph>
          이 페이지의 모든 권장안은 환경에 따라 효과가 다릅니다. 어떤 팀은 RTK 로 70% 절약을 보고,
          어떤 팀은 캐시 정렬로 50% 절약을 봅니다. 가장 큰 병목은 팀마다 다르기 때문에, 권장안을
          전부 도입하기 전에 <strong>지금의 기준선을 먼저 측정</strong> 하십시오. 한 주 동안의 총
          토큰 사용량과 세션당 평균 비용을 기록하고, 변경 후 같은 기간을 다시 측정하면 개선 여부를
          판단할 수 있습니다.
        </ProseParagraph>
        <Callout tone="tip" title="측정 없이 주장하지 마십시오">
          <p>
            &ldquo;캐시를 썼더니 빨라진 것 같다&rdquo;, &ldquo;모델을 작은 걸로 바꿨더니 괜찮은 것 같다&rdquo; 는 인상은
            유지가 어렵습니다. 숫자로 남기고, 주간 리뷰에 포함시키는 순간부터 운영 원칙이 됩니다.
          </p>
        </Callout>

        <ProseHeading level={2}>8. 같이 읽으면 좋은 페이지</ProseHeading>
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

        <ProseHeading level={2}>9. Sources</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            RTK — Rust Token Killer: 사용자 로컬 환경의 운영 가이드{" "}
            <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-xs">
              ~/.claude/RTK.md
            </code>
            . 공개 저장소 URL 은 [출처 미확인] — 각자 환경에서 같은 패턴(CLI 프록시 + hook 기반 투명
            재작성)을 구현하셔도 됩니다.
          </li>
          <li>
            Anthropic Prompt Caching 공식 문서:{" "}
            <a
              href="https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              docs.anthropic.com/en/docs/build-with-claude/prompt-caching
            </a>
          </li>
          <li>
            OpenAI Prompt Caching 가이드:{" "}
            <a
              href="https://platform.openai.com/docs/guides/prompt-caching"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              platform.openai.com/docs/guides/prompt-caching
            </a>
          </li>
          <li>
            Anthropic Building Effective Agents:{" "}
            <a
              href="https://www.anthropic.com/engineering/building-effective-agents"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              anthropic.com/engineering/building-effective-agents
            </a>
          </li>
          <li>
            Vercel AI Gateway:{" "}
            <a
              href="https://vercel.com/docs/ai-gateway"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              vercel.com/docs/ai-gateway
            </a>
          </li>
          <li>
            Helicone 공식 사이트:{" "}
            <a
              href="https://helicone.ai"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              helicone.ai
            </a>
          </li>
          <li>
            LangSmith 공식 사이트:{" "}
            <a
              href="https://smith.langchain.com"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              smith.langchain.com
            </a>
          </li>
          <li>
            Arize Phoenix 오픈소스 LLM observability:{" "}
            <a
              href="https://phoenix.arize.com"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              phoenix.arize.com
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
