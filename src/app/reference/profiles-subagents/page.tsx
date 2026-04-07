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
  { label: "OpenAI Config Advanced", href: "https://developers.openai.com/codex/config-advanced" },
  { label: "OpenAI Config Reference", href: "https://developers.openai.com/codex/config-reference" },
  { label: "OpenAI Subagents", href: "https://developers.openai.com/codex/subagents" },
  { label: "GPT-5.4 mini", href: "https://platform.openai.com/docs/models/gpt-5.4-mini" },
] as const;

export const metadata: Metadata = {
  title: "Profiles 와 Subagents 설계",
  description:
    "Codex 하네스에서 profiles와 subagents를 어떻게 역할 중심으로 나눠야 하는지 정리한 심화 페이지입니다.",
};

export default function ProfilesSubagentsPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Profiles / Subagents</ProseEyebrow>
        <ProseHeading level={1}>Profiles 와 Subagents 설계</ProseHeading>
        <ProseParagraph>
          Codex 하네스를 제대로 설명하려면 config와 hooks만으로는 부족합니다. 실제 실무에서는 “어떤 mode로 실행할 것인가”와
          “어떤 역할을 서브에이전트로 분리할 것인가”가 생산성과 비용, 안정성을 크게 좌우합니다. 이 페이지는 그 두 층을 같이 설명합니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <ProseHeading level={2}>1. Profiles는 작업 모드를 나누는 층입니다</ProseHeading>
        <ProseParagraph>
          profile은 “개인 취향 저장소”가 아니라, 팀이 반복적으로 합의한 작업 모드를 나누는 층으로 보는 것이 좋습니다.
          예를 들어 review, verify, codex, quick 같은 이름은 역할이 분명하지만, 개인 실험값을 계속 추가한 profile은 팀 공통 설정을 오염시키기 쉽습니다.
        </ProseParagraph>
        <CodeBlock filename=".codex/config.toml" language="toml">
{`[profiles.review]
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
model_reasoning_effort = "high"`}
        </CodeBlock>

        <ProseHeading level={2}>2. 어떤 profile이 유용한가</ProseHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">review</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              읽기 전용, 보수적, 리스크 확인 중심. 리뷰와 분석 작업에 적합합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">verify</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              변경 후 build, lint, test를 돌리고 결과를 읽는 검증 전용 모드입니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">codex</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Codex 전용 모델이나 실험적 코딩 흐름을 따로 돌릴 때 쓰는 profile입니다.
            </p>
          </div>
        </div>

        <Callout tone="warning" title="좋지 않은 profile 설계">
          <p>개인 취향을 팀 공용 config에 계속 넣는 것</p>
          <p>이름만 보고 역할이 드러나지 않는 것</p>
          <p>작업 모드가 너무 많아 선택 비용만 커지는 것</p>
        </Callout>

        <ProseHeading level={2}>3. Subagents는 역할을 좁게 나눠야 합니다</ProseHeading>
        <ProseParagraph>
          좋은 subagent는 메인 에이전트의 축소판이 아닙니다. reviewer, verifier, docs researcher, ops auditor처럼
          좁고 검증 가능한 역할을 가져야 병렬화 가치가 생깁니다.
        </ProseParagraph>
        <CodeBlock filename=".codex/agents/reviewer.toml" language="toml">
{`model = "gpt-5.4-mini"
sandbox_mode = "read-only"

system_prompt = """
변경사항을 읽기 전용으로 검토합니다.
행동 회귀, 누락 테스트, 위험한 수정, 계약 드리프트를 우선 확인합니다.
"""`}
        </CodeBlock>

        <ProseHeading level={2}>4. 실무에서 유용한 역할 분리</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>reviewer: 회귀, 누락 테스트, 위험 수정 확인</li>
          <li>gradle_verifier: build / lint / test 검증</li>
          <li>docs_researcher: 공식 문서와 링크 검증</li>
          <li>ops_safety_auditor: 배포 / 인프라 / destructive operation 검토</li>
          <li>python_mlops_reviewer: 파이프라인 / drift / registry 변경 검토</li>
        </ul>

        <ProseHeading level={2}>5. 모델 배치 원칙</ProseHeading>
        <ProseParagraph>
          메인 세션은 이해력과 설명 품질이 중요한 모델을 두고, subagent는 더 좁은 역할에 맞는 빠른 모델을 두는 편이 좋습니다.
          현재 공식 모델 카드 기준으로 GPT-5.4 mini는 subagent나 고속 coding 보조 역할에 상당히 적합합니다.
        </ProseParagraph>

        <ProseHeading level={2}>6. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/playbook/setup-codex" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 심화 플레이북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              profiles, agents, MCP, rules를 전체 하네스 관점으로 봅니다.
            </p>
          </Link>
          <Link href="/reference/codex-adoption" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 도입 패턴</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              어떤 단계에서 profiles와 subagents를 넣을지 봅니다.
            </p>
          </Link>
          <Link href="/reference/metrics-observability" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Metrics / Observability</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              subagent fan-out과 검증 효과를 어떻게 측정할지 봅니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
