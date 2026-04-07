import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
  ProseQuote,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";
import { Infographic } from "@/components/content/infographic";

type Slug = "what-ai-actually-is" | "why-harness-exists" | "realistic-trajectory";

const SLUGS: readonly Slug[] = [
  "what-ai-actually-is",
  "why-harness-exists",
  "realistic-trajectory",
] as const;

const TITLES: Record<Slug, string> = {
  "what-ai-actually-is": "AI는 인격체가 아니라 계산입니다",
  "why-harness-exists": "왜 하네스가 존재해야 하는가",
  "realistic-trajectory": "현실 기반의 미래 궤적",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!SLUGS.includes(params.slug as Slug)) return {};
  return { title: TITLES[params.slug as Slug] };
}

export default async function ManifestoSubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();

  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose>
        <ProseEyebrow>선언문 · 보충</ProseEyebrow>
        <ProseHeading level={1}>{TITLES[slug as Slug]}</ProseHeading>
        {slug === "what-ai-actually-is" && <WhatAiActuallyIs />}
        {slug === "why-harness-exists" && <WhyHarnessExists />}
        {slug === "realistic-trajectory" && <RealisticTrajectory />}
        <hr className="my-12 border-border" />
        <p className="font-mono text-sm text-foreground-muted">
          ←{" "}
          <Link href="/manifesto" className="text-accent-2 hover:underline">
            선언문 다섯 가지 원칙으로 돌아가기
          </Link>
        </p>
      </Prose>
    </div>
  );
}

function WhatAiActuallyIs() {
  return (
    <>
      <ProseParagraph>
        대규모 언어 모델이 무엇인지에 대한 가장 짧고 정직한 정의는 한 줄입니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "Vaswani 외, “Attention Is All You Need”, NeurIPS 2017 (arxiv:1706.03762)",
          href: "https://arxiv.org/abs/1706.03762",
        }}
      >
        Transformer 는 입력 시퀀스를 토큰 임베딩으로 변환하고, scaled dot-product attention 으로
        토큰 사이의 관계를 계산하며, 다층 피드포워드와 정규화를 거쳐 다음 토큰의 확률분포를 출력합니다.
      </ProseQuote>
      <ProseParagraph>
        이 정의가 마음에 들지 않으실 수 있지만, 이것이 사실입니다. nanoGPT 는 이 전체 메커니즘을 약 300줄의
        PyTorch 코드 한 파일에 담았습니다. GPT-2 의 행동은 이 짧은 코드와 학습된 가중치 행렬의 곱으로
        완전히 결정됩니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "github.com/karpathy/nanoGPT",
          href: "https://github.com/karpathy/nanoGPT",
        }}
      >
        nanoGPT — The simplest, fastest repository for training/finetuning medium-sized GPTs.
      </ProseQuote>
      <ProseHeading level={2}>그래서 무엇이 달라지나요</ProseHeading>
      <ProseParagraph>
        LLM 을 인격체로 의인화하면 두 가지 위험이 생깁니다. 첫째, 사실이 아닌 능력을 기대하게 됩니다.
        둘째, 사실이 아닌 의도를 의심하게 됩니다. LLM 을 “행렬 곱셈 위의 확률분포 + 그것을 빠르게 만드는
        하드웨어” 로 정의하면 이 두 가지 함정을 한 번에 피할 수 있습니다.
      </ProseParagraph>
      <Callout tone="tip">
        이 사이트의 다른 essay 들은 이 정의 위에서만 작성됩니다. 의인화된 표현이 보이면 그 자리에서
        교정하거나 출처를 요구해 주십시오.
      </Callout>
      <Infographic
        src="/infographics/ai-as-computation.png"
        alt="AI 가 계산이라는 사실을 한 페이지로 정리한 인포그래픽"
        caption="AI 는 거대한 계산입니다 — Vaswani 외 2017 transformer 정의, TPU 세대, frontier 컴퓨트 buildout, paperclip maximizer 와 sandbox 응답을 한 페이지로 시각화한 자료입니다."
        source={{
          label: "Google NotebookLM (사이트 docs/research/06 source pack 기반 자동 생성)",
          href: "https://notebooklm.google.com",
        }}
      />
    </>
  );
}

function WhyHarnessExists() {
  return (
    <>
      <ProseParagraph>
        Nick Bostrom 의 사고실험 “paperclip maximizer” 는 잘 정렬되지 않은 최적화기가 작은 목표(클립 만들기)에서
        시작해서도 임의로 큰 자원을 흡수하게 되는 “instrumental convergence” 를 보여 줍니다. 이 실험의 결론은
        “AI 가 사악하다” 가 아니라 “목표 설정과 실행 환경이 사후 검증 가능해야 한다” 입니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "Nick Bostrom, Superintelligence: Paths, Dangers, Strategies, Oxford University Press, 2014",
        }}
      >
        instrumental convergence 는 거의 모든 최종 목표를 가진 에이전트가 자기 보존, 목표 무결성, 자원 획득 같은
        도구적 목표를 추구하게 된다는 가설입니다.
      </ProseQuote>
      <ProseHeading level={2}>하네스가 그 답입니다</ProseHeading>
      <ProseParagraph>
        에이전틱 코딩 하네스의 다섯 레이어(memory, skills, subagents, rules, hooks)는 추상적 안전론이 아니라
        그 사고실험에 대한 매우 구체적인 답입니다.
      </ProseParagraph>
      <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
        <li><strong>Sandbox</strong> — workspace-write, read-only, danger-full-access 같은 모드로 기본 권한을 닫습니다.</li>
        <li><strong>Permissions / Rules</strong> — 위험한 명령을 declarative 정책으로 차단합니다 (forbidden / prompt / allow).</li>
        <li><strong>Hooks</strong> — PreToolUse 로 위험 명령을 실행 직전에 막고, PostToolUse 로 변경 결과를 검증합니다.</li>
        <li><strong>Verification loops</strong> — 사실 기반 완료 선언만 허용하고, 변경 후 lint·typecheck·테스트·smoke test 를 자동 실행합니다.</li>
        <li><strong>Memory</strong> — 모든 세션이 같은 규칙을 공유하도록 CLAUDE.md / AGENTS.md 를 단일 진실의 출처로 둡니다.</li>
      </ul>
      <Callout tone="warning" title="하네스는 만능이 아닙니다">
        Sandbox 와 hooks 는 사고를 줄이지만 모든 리스크를 제거하지 않습니다. 인간 검토, 명확한 책임 경계,
        역할 분리는 여전히 필요합니다. 하네스는 그 검토 비용을 줄이는 기반이지, 검토를 대체하는 도구가 아닙니다.
      </Callout>
    </>
  );
}

function RealisticTrajectory() {
  return (
    <>
      <ProseParagraph>
        “AI 가 1년 / 5년 / 10년 뒤에 어디까지 갈까” 라는 질문은 신비주의 영역이 아니라 측정 가능한 변수의 외삽입니다.
        이 사이트가 인용하는 출처는 마케팅 슬로건이 아니라 실제로 시스템을 학습시키고 측정하는 사람들이 공개한 자료 뿐입니다.
      </ProseParagraph>
      <ProseHeading level={2}>측정 가능한 변수</ProseHeading>
      <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
        <li>모델 파라미터 수와 학습 토큰 수</li>
        <li>학습 컴퓨트 (FLOPs)</li>
        <li>추론 컴퓨트 (행렬 곱셈 횟수 × 토큰 길이)</li>
        <li>TPU/GPU 세대 (메모리 대역폭, 행렬 연산 유닛 처리량)</li>
        <li>데이터센터 전력 / 클러스터 크기 / 네트워크 대역폭</li>
      </ul>
      <ProseHeading level={2}>현재 인용 가능한 출처</ProseHeading>
      <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
        <li><a className="underline-offset-2 hover:underline" href="https://metr.org" target="_blank" rel="noreferrer">METR</a> 의 “Measuring AI Ability to Complete Long Tasks” — 모델이 자율적으로 수행할 수 있는 task 길이의 두 배 증가 추세</li>
        <li><a className="underline-offset-2 hover:underline" href="https://epoch.ai" target="_blank" rel="noreferrer">Epoch AI</a> 의 컴퓨트 스케일링 추정 — frontier 모델 학습 컴퓨트가 시간에 대해 어떻게 증가하는지의 정량 데이터</li>
        <li><a className="underline-offset-2 hover:underline" href="https://www.darioamodei.com/essay/machines-of-loving-grace" target="_blank" rel="noreferrer">Dario Amodei, “Machines of Loving Grace”</a> (2024년 10월) — 5–10년 시점의 능력 외삽</li>
        <li><a className="underline-offset-2 hover:underline" href="https://www.anthropic.com/news" target="_blank" rel="noreferrer">Anthropic Responsible Scaling Policy</a> — 능력 임계점에 대한 운영적 약속</li>
        <li><a className="underline-offset-2 hover:underline" href="https://blog.samaltman.com" target="_blank" rel="noreferrer">Sam Altman, “Three Observations”</a> (2025년 2월)</li>
      </ul>
      <Callout tone="note" title="자료조사 진행 중">
        구체적인 수치(TPU 세대별 FLOPs, 클러스터 GPU 수, 추정 비용)는 별도 essay 에서 출처와 함께 정리합니다.
        이 사이트는 출처가 확인된 수치만 표기합니다.
      </Callout>
    </>
  );
}
