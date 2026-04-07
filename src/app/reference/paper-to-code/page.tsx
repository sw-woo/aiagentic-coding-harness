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

const SOURCES = [
  { label: "going-doer/Paper2Code", href: "https://github.com/going-doer/Paper2Code" },
  { label: "HKUDS/DeepCode", href: "https://github.com/HKUDS/DeepCode" },
  { label: "Paper2Code paper summary source", href: "https://arxiv.org/pdf/2504.17192" },
] as const;

export const metadata: Metadata = {
  title: "Paper-to-Code 시스템",
  description:
    "논문에서 코드로 넘어가는 agentic workflow와 관련 오픈소스 프로젝트를 확인된 범위 안에서 정리한 페이지입니다.",
};

export default function PaperToCodePage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Paper-to-Code</ProseEyebrow>
        <ProseHeading level={1}>Paper-to-Code 시스템</ProseHeading>
        <ProseParagraph>
          최근 agentic coding 흐름 중 하나는 논문을 읽고 코드로 재현하는 과정을 자동화하는 것입니다.
          다만 이 영역은 이름이 비슷한 프로젝트가 많고, README 설명과 실제 구현 범위가 다를 수 있어서 주의가 필요합니다.
          이 페이지는 현재 공개 저장소 기준으로 확인된 프로젝트만 추려 정리합니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCES.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <Callout tone="warning" title="정확성 범위">
          <p>
            사용자님이 적어주신 `PrathamLearnsToCode/paper2code` 형태의 Claude Code skill 저장소는 이번 확인 범위에서 직접 검증하지 못했습니다.
            대신, `Paper2Code / PaperCoder` 계열의 공개 오픈소스 프로젝트와 관련 논문/시스템만 다룹니다.
          </p>
        </Callout>

        <ProseHeading level={2}>1. going-doer / Paper2Code</ProseHeading>
        <ProseParagraph>
          이 저장소는 `Paper2Code: Automating Code Generation from Scientific Papers in Machine Learning`라는 공개 프로젝트입니다.
          README 기준으로는 PaperCoder라는 multi-agent LLM 시스템이 논문을 코드 저장소로 바꾸는 흐름을 설명합니다.
          planning, analysis, code generation을 에이전트 단계로 나누고, 결과 저장소를 benchmark와 model-based evaluation으로 평가합니다.
        </ProseParagraph>
        <CodeBlock filename="README 기준 핵심 구조" language="text">
{`outputs/
├── Transformer/
│   ├── analyzing_artifacts
│   ├── coding_artifacts
│   └── planning_artifacts
└── Transformer_repo`}
        </CodeBlock>
        <ProseParagraph>
          또 README는 OpenAI API 경로와 open-source models + vLLM 경로를 모두 제공합니다.
          즉 이 프로젝트는 “논문 → 코드 저장소”를 하나의 멀티에이전트 pipeline으로 다루는 실험/연구 축에 가깝습니다.
        </ProseParagraph>

        <ProseHeading level={2}>2. HKUDS / DeepCode</ProseHeading>
        <ProseParagraph>
          `DeepCode`는 자신을 `Open Agentic Coding (Paper2Code & Text2Web & Text2Backend)`라고 설명합니다.
          즉 논문 구현뿐 아니라 text-to-web, text-to-backend까지 묶어, 보다 넓은 agentic coding 플랫폼으로 포지셔닝하고 있습니다.
          README는 multi-agent system, CLI/Web 인터페이스, experimental results, PaperBench 평가를 강조합니다.
        </ProseParagraph>

        <ProseHeading level={2}>3. 이 흐름에서 중요한 개념</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>논문을 바로 구현하는 것이 아니라, 먼저 planning / analysis / generation 단계로 나눈다</li>
          <li>논문 PDF 또는 LaTeX를 구조화된 intermediate format으로 바꾸는 전처리가 중요하다</li>
          <li>생성 코드 자체의 품질을 benchmark나 model-based evaluation으로 다시 평가한다</li>
          <li>논문에서 명시되지 않은 구현 결정은 따로 기록하거나 불확실성으로 관리하는 것이 중요하다</li>
        </ul>

        <ProseHeading level={2}>4. 이걸 하네스 관점에서 보면</ProseHeading>
        <ProseParagraph>
          이 계열 프로젝트는 결국 `paper → planner → analyzer → builder → evaluator` 흐름을 하나의 하네스로 묶는 사례입니다.
          그래서 이 사이트의 language로 번역하면, paper-to-code 시스템도 `하네스의 한 종류`라고 볼 수 있습니다.
          다만 “모든 구현 결정이 논문 섹션에 정확히 인용된다” 같은 강한 주장은 실제 저장소 원문에서 직접 확인되지 않으면 그대로 옮기면 안 됩니다.
        </ProseParagraph>

        <Callout tone="tip" title="이 사이트에 어떻게 넣으면 좋은가">
          <p>
            `paper2code skill`처럼 단정적으로 쓰기보다, `paper-to-code systems`라는 더 넓은 카테고리 안에서
            검증된 오픈소스 프로젝트를 묶어 설명하는 편이 더 안전하고 오래 갑니다.
          </p>
        </Callout>

        <ProseHeading level={2}>5. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/reference/trends-direction" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">최신 트렌드와 방향</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              agent teams, autonomy, tracing, governance와 함께 읽으면 좋습니다.
            </p>
          </Link>
          <Link href="/reference/open-source-stack" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">오픈소스 에이전트와 모델 스택</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              runtime / orchestration layer와 함께 보면 전체 그림이 더 잘 잡힙니다.
            </p>
          </Link>
          <Link href="/handbook" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              하네스 엔지니어링 큰그림 안에서 이런 흐름을 읽을 수 있습니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
