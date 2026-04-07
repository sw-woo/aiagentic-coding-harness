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

type Slug =
  | "karpathy"
  | "ralph-loop"
  | "eval-driven"
  | "context-engineering"
  | "agent-teams"
  | "self-improving-systems";

const SLUGS: readonly Slug[] = [
  "karpathy",
  "ralph-loop",
  "eval-driven",
  "context-engineering",
  "agent-teams",
  "self-improving-systems",
] as const;

const META: Record<Slug, { title: string; eyebrow: string; description: string }> = {
  karpathy: {
    title: "Karpathy 방법론",
    eyebrow: "방법론 · 01",
    description: "Software 1.0/2.0/3.0, LLM as Operating System, vibe coding 의 진짜 의미와 한계.",
  },
  "ralph-loop": {
    title: "Ralph Loop",
    eyebrow: "방법론 · 02",
    description: "Geoffrey Huntley 의 wiretap loop — 단일 셸 루프로 끝없이 작업을 흡수하는 패턴입니다.",
  },
  "eval-driven": {
    title: "Eval-Driven Development",
    eyebrow: "방법론 · 03",
    description: "Hamel Husain 등이 강조하는, 평가를 1급 개발 단위로 만드는 방법론입니다.",
  },
  "context-engineering": {
    title: "Context Engineering",
    eyebrow: "방법론 · 04",
    description: "context window 자체를 엔지니어링 대상으로 다루는 4가지 원칙: select·compress·isolate·persist.",
  },
  "agent-teams": {
    title: "Agent Teams",
    eyebrow: "방법론 · 05",
    description: "멀티 에이전트 오케스트레이션 — Claude Code Agent Teams, OpenAI Swarm, LangGraph, AutoGen.",
  },
  "self-improving-systems": {
    title: "Self-Improving Systems",
    eyebrow: "방법론 · 06",
    description: "AutoML, AlphaZero, Constitutional AI, DSPy, AI Scientist 같은 ‘AI 가 AI 를 만드는’ 흐름.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!SLUGS.includes(params.slug as Slug)) return {};
  return {
    title: META[params.slug as Slug].title,
    description: META[params.slug as Slug].description,
  };
}

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();
  const meta = META[slug as Slug];

  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose>
        <ProseEyebrow>{meta.eyebrow}</ProseEyebrow>
        <ProseHeading level={1}>{meta.title}</ProseHeading>
        <p className="mt-4 font-serif text-lg text-foreground-muted">{meta.description}</p>

        {slug === "karpathy" && <Karpathy />}
        {slug === "ralph-loop" && <RalphLoop />}
        {slug === "eval-driven" && <EvalDriven />}
        {slug === "context-engineering" && <ContextEngineering />}
        {slug === "agent-teams" && <AgentTeams />}
        {slug === "self-improving-systems" && <SelfImproving />}

        <hr className="my-12 border-border" />
        <p className="font-mono text-sm text-foreground-muted">
          다른 방법론 글도 있습니다 →{" "}
          {SLUGS.filter((s) => s !== slug).map((s, i) => (
            <span key={s}>
              {i > 0 ? " · " : ""}
              <Link href={`/methodology/${s}`} className="text-accent-2 hover:underline">
                {META[s].title}
              </Link>
            </span>
          ))}
        </p>
      </Prose>
    </div>
  );
}

function Karpathy() {
  return (
    <>
      <ProseHeading level={2}>Software 1.0 / 2.0 / 3.0</ProseHeading>
      <ProseParagraph>
        Karpathy 는 2017년 11월 11일 Medium 에 “Software 2.0” 을 발표했습니다. 핵심 주장은 신경망 가중치 자체가 코드라는 것입니다.
        프로그래머는 알고리즘을 손으로 적는 대신 데이터셋과 목표를 명시하고, 학습이 “자기 작성 프로그램(self-writing programs)” 으로
        그에 맞는 가중치를 찾아 줍니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "Andrej Karpathy, “Software 2.0”, Medium, 2017년 11월 11일",
          href: "https://karpathy.medium.com/software-2-0-a64152b37c35",
        }}
      >
        Software 2.0 is written in much more abstract, human unfriendly language, such as the weights of a neural network.
      </ProseQuote>
      <ProseParagraph>
        2025년 6월 Y Combinator AI Startup School 에서 그는 “Software is Changing (Again)” 키노트를 통해 Software 3.0 개념을
        공식화했습니다. 이 패러다임에서는 LLM 자체가 새로운 컴퓨터이며, 영어(자연어) 가 새로운 프로그래밍 언어입니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "Y Combinator Library — Andrej Karpathy: Software Is Changing (Again)",
          href: "https://www.ycombinator.com/library/MW-andrej-karpathy-software-is-changing-again",
        }}
      >
        LLM 은 새로운 종류의 컴퓨터이며, 당신은 이들을 영어로 프로그래밍합니다. 따라서 주요 버전 업그레이드라고 볼 수 있습니다.
      </ProseQuote>
      <ProseHeading level={2}>LLM as Operating System</ProseHeading>
      <ProseParagraph>
        2023년 11월 23일에 공개된 “[1hr Talk] Intro to Large Language Models” 강연에서 Karpathy 는 LLM 을 운영체제 커널에 비유했습니다.
        LLM ≈ CPU, context window ≈ RAM, tools/code interpreter/browser ≈ peripherals/disk. 이 비유는 우리가 만드는 하네스 설계의
        토대입니다 — skills 는 system call, hooks 는 driver, sandbox 는 process isolation, memory 는 persistent storage 에 해당합니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "Andrej Karpathy, “[1hr Talk] Intro to Large Language Models”, YouTube, 2023년 11월 23일",
          href: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        }}
      >
        LLM 은 단순한 챗봇이 아니라 새로운 컴퓨팅 패러다임의 커널입니다.
      </ProseQuote>
      <ProseHeading level={2}>Vibe Coding 의 진짜 의미</ProseHeading>
      <ProseParagraph>
        2025년 2월 그는 트위터에서 “vibe coding” 이라는 표현을 썼습니다. 원래 의도는 “LLM 을 사용해 즉흥적으로 프로토타입을 만드는 즐거움”
        을 묘사한 것이었습니다. 이 표현은 빠르게 확산되었지만, 동시에 “계획·검증·리뷰 없이 LLM 출력을 그대로 commit” 하는 행동까지 같은 이름으로
        포장되는 부작용을 낳았습니다. 진지한 에이전틱 코딩 하네스는 vibe coding 의 즉흥성과 검증 가능한 엔지니어링 사이의 차이를 명시적으로 다룹니다.
      </ProseParagraph>
      <Callout tone="warning" title="Vibe coding 과 진지한 하네스의 차이">
        vibe coding 은 빠른 프로토타입에 좋지만, production system 으로 가면 hooks, rules, eval loops, verification gates 가
        반드시 필요합니다. 이 사이트의 카탈로그에서 그 도구들을 직접 보실 수 있습니다.
      </Callout>
      <ProseHeading level={2}>nanoGPT 의 미학</ProseHeading>
      <ProseParagraph>
        nanoGPT 와 micrograd 는 약 300줄 / 약 100줄의 단일 파일로 GPT 와 자동미분을 재현합니다. 이 “단일 파일·해킹 가능·교육적” 미학은
        이 사이트의 디자인 자체에도 반영되어 있습니다 — 사이트가 자기 자신의 견본이고, 모든 페이지가 출처와 함께 짧고 정직하게 작성됩니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "github.com/karpathy/nanoGPT",
          href: "https://github.com/karpathy/nanoGPT",
        }}
      >
        nanoGPT — The simplest, fastest repository for training/finetuning medium-sized GPTs.
      </ProseQuote>
      <Infographic
        src="/infographics/karpathy-vision.png"
        alt="Karpathy 의 Software 1.0/2.0/3.0 과 LLM as OS 비전을 한 페이지로 정리한 인포그래픽"
        caption="Karpathy 의 AI 소프트웨어 비전 — Software 1/2/3.0, LLM as Operating System, vibe coding, nanoGPT 의 단일 파일 교육 철학을 한 페이지로 시각화한 자료입니다."
        source={{
          label: "Google NotebookLM (사이트 docs/research/01 source pack 기반 자동 생성)",
          href: "https://notebooklm.google.com",
        }}
      />
    </>
  );
}

function RalphLoop() {
  return (
    <>
      <ProseHeading level={2}>한 줄 정의</ProseHeading>
      <ProseParagraph>
        Ralph Loop 는 Geoffrey Huntley 가 정리한 패턴으로, 단일 셸 루프가 작업 큐(<code>AGENTS.md</code> 또는 inbox) 에서
        다음 작업을 꺼내 LLM 에게 던지고, 결과를 검증한 다음 다시 큐를 갱신하는 wiretap 형 구조입니다.
      </ProseParagraph>
      <Callout tone="note" title="자료조사 진행 중">
        Ralph Loop 의 구체적인 셸 스크립트, 출처 URL, 그리고 이 사이트의 하네스에서 동일 패턴을 어떻게 구현했는지에 대한 자료조사가
        진행 중입니다. 다음 push 에서 출처와 함께 본문이 채워집니다.
      </Callout>
      <Infographic
        src="/infographics/agentic-patterns.png"
        alt="현대 AI 에이전틱 코딩 8가지 패턴을 한 페이지로 정리한 인포그래픽"
        caption="현대 에이전틱 코딩 패턴 — Ralph wiretap loop, EDD, Context Engineering, Subagent-driven dev, Memory systems, Verification loops, Multi-agent orchestration 등 8가지 패턴을 카드 형태로 시각화한 자료입니다."
        source={{
          label: "Google NotebookLM (사이트 docs/research/02 source pack 기반 자동 생성)",
          href: "https://notebooklm.google.com",
        }}
      />
    </>
  );
}

function EvalDriven() {
  return (
    <>
      <ProseParagraph>
        Eval-Driven Development (EDD) 는 LLM 기반 시스템에 대해 “테스트 없이는 코드 없음” 원칙의 LLM 버전입니다. 핵심 루프는
        다음과 같습니다.
      </ProseParagraph>
      <ol className="mt-3 list-decimal space-y-2 pl-6 font-serif text-foreground">
        <li>먼저 평가(eval) 를 작성합니다 — 입력 / 기대 동작 / 채점 방식</li>
        <li>에이전트를 평가에 대해 실행합니다</li>
        <li>실패 케이스를 분석합니다</li>
        <li>프롬프트, 도구, 컨텍스트를 개선합니다</li>
        <li>다시 평가를 실행합니다</li>
      </ol>
      <Callout tone="note" title="자료조사 진행 중">
        Hamel Husain, Eugene Yan, Jason Liu 등이 출판한 EDD 글들의 출처 URL 정리가 진행 중입니다. 다음 push 에서 verbatim 인용과
        함께 본문이 채워집니다.
      </Callout>
    </>
  );
}

function ContextEngineering() {
  return (
    <>
      <ProseParagraph>
        Context Engineering 은 “context window 자체를 1급 엔지니어링 대상으로 다루자” 는 관점입니다. 핵심 원칙은 4가지입니다.
      </ProseParagraph>
      <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
        <li><strong>Select</strong> — 진짜 필요한 정보만 컨텍스트에 넣습니다.</li>
        <li><strong>Compress</strong> — 같은 의미를 더 짧은 토큰으로 표현합니다 (요약, 토큰 절약 재작성).</li>
        <li><strong>Isolate</strong> — 서브에이전트 / 별도 세션으로 컨텍스트를 분리해 메인 세션을 오염시키지 않습니다.</li>
        <li><strong>Persist</strong> — 세션 너머에서 살아남아야 하는 사실만 영속 메모리(memory file)에 적습니다.</li>
      </ul>
      <Callout tone="note" title="자료조사 진행 중">
        Lance Martin (LangChain) 등의 “Context Engineering” 글의 출처 URL 정리가 진행 중입니다.
      </Callout>
    </>
  );
}

function AgentTeams() {
  return (
    <>
      <ProseParagraph>
        2024년 후반부터 멀티 에이전트 오케스트레이션 라이브러리가 빠르게 늘었습니다. 각자의 모델 — 좁은 역할·도구 제한·병렬 fan-out
        — 을 조금씩 다르게 채택합니다.
      </ProseParagraph>
      <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
        <li><strong>Claude Code Agent Teams</strong> — Anthropic 의 실험 기능. <code>CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1</code> 환경변수로 활성화합니다.</li>
        <li><strong>OpenAI Swarm</strong> — 2024년 10월 공개된 OpenAI 의 실험 라이브러리.</li>
        <li><strong>LangGraph</strong> — LangChain 진영의 그래프 기반 멀티 에이전트 프레임워크.</li>
        <li><strong>CrewAI</strong> — 역할 기반 오케스트레이션, 메모리·계획·도구 사용 빌트인.</li>
        <li><strong>Microsoft AutoGen</strong> — 멀티 에이전트 대화 기반 시스템.</li>
        <li><strong>Microsoft Magentic-One</strong> — 일반 목적 멀티 에이전트 베이스라인.</li>
      </ul>
      <Callout tone="note" title="자료조사 진행 중">
        각 라이브러리의 공식 repo 와 문서 URL 정리가 진행 중입니다. 다음 push 에서 verbatim 출처와 함께 본문이 채워집니다.
      </Callout>
    </>
  );
}

function SelfImproving() {
  return (
    <>
      <ProseParagraph>
        “AI 가 AI 를 만든다” 는 표현은 과장입니다. 그러나 학습 파이프라인의 일부 단계가 사람이 아닌 다른 모델 또는 같은 모델의 다른
        실행으로 채워지는 흐름은 분명히 존재합니다. 검증 가능한 사례는 다음과 같습니다.
      </ProseParagraph>
      <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
        <li><strong>AutoML / NASNet</strong> (Zoph & Le, 2017) — 신경망 아키텍처 탐색 자동화.</li>
        <li><strong>AlphaZero</strong> (DeepMind, 2017) — self-play 만으로 도메인 지식 없이 학습.</li>
        <li><strong>Constitutional AI / RLAIF</strong> (Anthropic, 2022) — 인간 라벨 대신 AI 피드백으로 정렬.</li>
        <li><strong>DSPy</strong> (Stanford NLP) — 프롬프트 자체를 자동 최적화.</li>
        <li><strong>Sakana AI Scientist</strong> (2024) — 가설 생성·실험·논문 작성 파이프라인.</li>
        <li><strong>Self-Refine / Self-Rewarding LM / Self-Instruct</strong> — 모델이 자기 출력을 채점/개선하는 학습 루프.</li>
      </ul>
      <Callout tone="note" title="자료조사 진행 중">
        각 항목의 arxiv URL, 저자, 발표 연도를 verbatim 으로 정리한 source pack 이 docs/research/06-ai-substrate-trends.md 에
        들어 있습니다. 다음 push 에서 본문에 직접 인용합니다.
      </Callout>
    </>
  );
}
