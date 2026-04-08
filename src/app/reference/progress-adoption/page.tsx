import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";

const SOURCES = [
  { label: "METR Time Horizons", href: "https://metr.org/time-horizons/" },
  { label: "METR Long Tasks blog", href: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/" },
  { label: "OECD AI trajectories through 2030", href: "https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/02/exploring-possible-ai-trajectories-through-2030_b6fb75d9/cb41117a-en.pdf" },
  { label: "Anthropic agent autonomy", href: "https://www.anthropic.com/news/measuring-agent-autonomy" },
  { label: "OpenAI GPT-5.3-Codex", href: "https://openai.com/index/introducing-gpt-5-3-codex/" },
  { label: "Google Ironwood TPU", href: "https://blog.google/products/google-cloud/ironwood-tpu-age-of-inference/" },
  { label: "Google TPU v6e", href: "https://cloud.google.com/tpu/docs/v6e" },
  { label: "Sakana AI Darwin Gödel Machine", href: "https://sakana.ai/dgm/" },
  { label: "Sakana AI Scientist in Nature", href: "https://sakana.ai/ai-scientist-nature/" },
  { label: "Anthropic Claude Code case studies", href: "https://www.anthropic.com/news/how-anthropic-teams-use-claude-code" },
  { label: "Anthropic Rakuten case study", href: "https://www.anthropic.com/customers/rakuten" },
  { label: "Anthropic Ramp case study", href: "https://www.anthropic.com/customers/ramp" },
  { label: "Anthropic Graphite case study", href: "https://www.anthropic.com/customers/graphite" },
  { label: "OpenAI Rakuten Codex case study", href: "https://openai.com/index/rakuten/" },
] as const;

export const metadata: Metadata = {
  title: "AI 발전 속도와 도입 사례",
  description:
    "AI 모델, 자율 에이전트, self-improving 기법, TPU 인프라, 실제 회사 도입 사례를 1차 자료 기준으로 정리한 페이지입니다.",
};

export default function ProgressAdoptionPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Progress</ProseEyebrow>
        <ProseHeading level={1}>AI 발전 속도와 실제 도입 사례</ProseHeading>
        <ProseParagraph>
          agentic coding harness를 설계할 때는 “지금 모델이 좋다” 수준의 인상 비평보다, 실제로 얼마나 빨리 발전하고 있는지,
          어떤 인프라가 그 속도를 떠받치고 있는지, self-improving 흐름은 어디까지 왔는지, 그리고 어떤 회사들이 어떻게 도입해 성과를 냈는지를 같이 봐야 합니다.
          이 페이지는 그 질문에 대한 1차 자료 기반 요약입니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCES.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <Callout tone="warning" title="미래 예측 범위">
          <p>
            이 페이지는 가능한 한 측정 가능한 자료를 우선합니다. 특히 “올해 어디까지 갈까” 같은 질문은 METR과 OECD처럼
            명시적으로 시나리오를 제시한 자료 범위 안에서만 요약합니다.
          </p>
        </Callout>

        <ProseHeading level={2}>1. 발전 속도는 ‘긴 작업을 얼마나 해내는가’로 측정되는 흐름이 강해졌습니다</ProseHeading>
        <ProseParagraph>
          METR는 최근 frontier AI를 “긴 작업을 얼마나 성공적으로 해내는가”로 측정하는 time horizon 프레임을 계속 업데이트하고 있습니다.
          2025년 블로그는 50% 신뢰도 기준 task length가 약 7개월마다 두 배씩 늘었다고 설명했고, 2026년 3월 3일 업데이트된 time horizons 페이지는
          이 측정을 최신 모델들로 계속 추적하고 있습니다.
        </ProseParagraph>
        <ProseParagraph>
          여기서 중요한 건 “AI가 더 똑똑해졌다”보다 “AI가 더 긴 multi-step task를 다룰 수 있게 됐다”는 관점입니다.
          이건 곧 하네스 엔지니어링에서 context management, task decomposition, stop condition이 더 중요해진다는 뜻과 연결됩니다.
        </ProseParagraph>

        <ProseHeading level={2}>2. 올해와 그 이후를 말할 때는 시나리오 기반으로 읽어야 합니다</ProseHeading>
        <ProseParagraph>
          OECD의 2026년 보고서는 METR 데이터를 바탕으로 2030까지 여러 시나리오를 제시합니다. 여기에는 progress continues, slows, halts, accelerates 같은
          서로 다른 가정이 같이 놓여 있습니다. 즉, 공식 기관 수준의 정리도 “무조건 이만큼 간다”가 아니라, 어떤 가정을 두느냐에 따라 결과가 달라진다고 봅니다.
        </ProseParagraph>
        <ProseParagraph>
          그래서 이 사이트도 같은 원칙을 따르는 편이 안전합니다. “올해 안에 몇 시간짜리 작업을 완전히 자동화한다” 같은 표현은 과장되기 쉽고,
          대신 “현재 관측 가능한 추세는 긴 작업 처리 능력과 자율 작업 길이가 꾸준히 늘고 있다” 정도가 더 정확합니다.
        </ProseParagraph>

        <ProseHeading level={2}>3. self-improving 기술은 실제로 존재하지만, 범위를 구분해야 합니다</ProseHeading>
        <ProseParagraph>
          OpenAI의 2026년 GPT-5.3-Codex 발표는 초기 버전의 Codex가 자체 개발, 배포, 테스트 진단에 도움을 줬다고 설명합니다.
          이건 “에이전트가 자기 자신을 만드는 데 기여했다”는 매우 흥미로운 방향성을 보여 줍니다.
        </ProseParagraph>
        <ProseParagraph>
          Sakana AI는 2025년 Darwin Gödel Machine을 통해 “자기 코드를 다시 써서 더 나아지는” self-improving 흐름을 공개했고,
          2026년에는 AI Scientist 관련 Nature 논문 발표를 통해 자동화된 연구 루프를 더 강하게 밀고 있습니다.
          다만 이걸 곧바로 “완전 자율적 자기개선 시스템이 실무에서 일반화됐다”로 읽으면 과장입니다. 현재는 연구와 실험 축이 강하다고 보는 편이 정확합니다.
        </ProseParagraph>

        <ProseHeading level={2}>4. 인프라 쪽에서는 TPU와 inference 최적화가 분명한 추세입니다</ProseHeading>
        <ProseParagraph>
          Google 은 2024년 Trillium(v6e), 2025년 Ironwood 를 발표하며 TPU 의 training + serving, 그리고
          thinking · inference 모델 최적화를 강하게 밀고 있습니다. Trillium 공식 문서는 v6e 가 transformer,
          text-to-image, CNN 학습 · 서빙을 겨냥한다고 설명합니다. Google 은 Ironwood 를 “age of inference” 를
          위한 TPU 라고 직접 표현합니다.
        </ProseParagraph>
        <ProseParagraph>
          즉, 모델 자체만 발전하는 것이 아니라, 그 모델을 더 길고 더 자주 더 안정적으로 돌릴 수 있게 해 주는
          하드웨어와 서빙 스택이 같이 발전하고 있습니다. 하네스 엔지니어링 관점에서 이 변화는 매우 중요합니다.
          reasoning-heavy 모델과 long-running agent 가 늘수록 latency, cost, availability 문제가 함께 커지기
          때문입니다.
        </ProseParagraph>

        <ProseHeading level={2}>5. 회사 도입 사례는 이미 ‘실험’을 넘어서고 있습니다</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Rakuten × OpenAI Codex</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              OpenAI 2026년 사례에 따르면, Rakuten 은 Codex 를 incident recovery, code review, full-stack
              build 에 연결했습니다. 그 결과 “fixes issues twice as fast” 라는 지표를 보고했습니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Rakuten × Claude Code</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Anthropic 사례는 Claude Code로 79% time-to-market 단축, 7시간 자율 코딩, 99.9% accuracy 같은 지표를 제시합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Ramp</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Anthropic 사례에서 Ramp는 30일 동안 100만 줄 이상의 AI-suggested code, incident investigation 시간 최대 80% 절감 사례를 제시합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Graphite</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Graphite 사례는 PR feedback loop를 40배 빠르게 만들었다고 설명하며, code review 자동화의 실효성을 보여 줍니다.
            </p>
          </div>
        </div>

        <ProseHeading level={2}>6. 실제로 잘되는 회사들의 공통점</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>모델만 도입하지 않고 workflow와 guardrails를 같이 설계합니다.</li>
          <li>incident response, code review, documentation, build/test처럼 측정 가능한 업무부터 붙입니다.</li>
          <li>사람 검토를 없애기보다, 사람이 봐야 할 범위를 더 전략적인 층으로 올립니다.</li>
          <li>도입 효과를 추상적 만족도가 아니라 시간 단축, 품질 향상, adoption rate 같은 지표로 봅니다.</li>
        </ul>

        <ProseHeading level={2}>7. 이 사이트 관점으로 번역하면</ProseHeading>
        <ProseParagraph>
          이 모든 흐름은 결국 한 방향으로 모입니다. 모델의 지능은 계속 오르고 있고, 자율 작업 길이는 늘고 있으며, self-improving 연구와 inference 인프라도 빠르게 발전하고 있습니다.
          하지만 회사가 실제로 성과를 내는 지점은 모델 이름이 아니라, <strong>하네스와 운영 설계</strong> 를 같이 붙이는 곳입니다.
        </ProseParagraph>
        <ProseParagraph>
          그래서 사내 도입 문서에서는 항상 세 가지를 같이 봐야 합니다. 첫째, 모델과 인프라의 발전 속도. 둘째, 그 모델을 감싸는 guardrails와 workflow.
          셋째, 도입 이후의 metrics와 실제 사례. 이 셋이 같이 있을 때만 “요즘 트렌드”가 아니라 “우리 조직에서 쓸 수 있는 기술”이 됩니다.
        </ProseParagraph>

        <ProseHeading level={2}>8. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/handbook" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              큰그림과 조직 적용 관점에서 이 흐름을 더 넓게 읽습니다.
            </p>
          </Link>
          <Link href="/reference/trends-direction" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">최신 트렌드와 방향</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              agent teams, autonomy, tool quality, governance 축을 같이 봅니다.
            </p>
          </Link>
          <Link href="/reference/metrics-observability" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Metrics / Observability</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              실제 도입 효과를 어떻게 수치로 볼지 이어서 읽기 좋습니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
