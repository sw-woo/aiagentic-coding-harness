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
import { CodeBlock } from "@/components/content/code-block";
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
    description: "Software 1.0 · 2.0 · 3.0, LLM as Operating System, vibe coding 의 진짜 의미와 한계를 풀어 적었습니다.",
  },
  "ralph-loop": {
    title: "Ralph Loop",
    eyebrow: "방법론 · 02",
    description: "Geoffrey Huntley 의 wiretap loop — 단일 셸 루프 하나로 끝없이 작업을 흡수하는 가장 단순한 자율 패턴입니다.",
  },
  "eval-driven": {
    title: "Eval-Driven Development",
    eyebrow: "방법론 · 03",
    description: "Hamel Husain 등이 강조하는 “LLM 시스템에서 평가가 곧 단위 테스트다” 라는 방법론을 현실 사례와 함께 정리했습니다.",
  },
  "context-engineering": {
    title: "Context Engineering",
    eyebrow: "방법론 · 04",
    description: "context window 자체를 1급 엔지니어링 대상으로 다루는 4가지 원칙: write · select · compress · isolate.",
  },
  "agent-teams": {
    title: "Agent Teams",
    eyebrow: "방법론 · 05",
    description: "멀티 에이전트 오케스트레이션 — Claude Code Agent Teams, OpenAI Swarm, LangGraph, AutoGen, Magentic-One.",
  },
  "self-improving-systems": {
    title: "Self-Improving Systems",
    eyebrow: "방법론 · 06",
    description: "“AI 가 AI 를 만든다” 라는 표현 뒤에 실제로 무엇이 있는지 — AutoML, AlphaZero, Constitutional AI, DSPy, Sakana AI Scientist.",
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) return {};
  return {
    title: META[slug as Slug].title,
    description: META[slug as Slug].description,
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
        <p className="mt-4 font-serif text-lg leading-relaxed text-foreground-muted">{meta.description}</p>

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
      <ProseParagraph>
        혹시 이런 의문을 가져보신 적이 있으신가요. “LLM 으로 코드를 만든다는 게 결국 어떤 의미인가요? 이게 단순히
        자동완성이 좀 똑똑해진 건가요, 아니면 정말 새로운 프로그래밍 패러다임인가요?” Andrej Karpathy 는 이 질문에 대해
        지난 8년간 가장 명확한 답을 내놓아 온 사람입니다. 그가 만든 framing 인 Software 1.0 · 2.0 · 3.0 은 지금 우리가
        만들고 있는 모든 에이전틱 코딩 하네스의 출발점입니다. 이 글에서는 그 framing 을 사실 기반으로 정리해 드립니다.
      </ProseParagraph>

      <ProseHeading level={2}>Software 1.0 — 사람이 손으로 적는 코드</ProseHeading>
      <ProseParagraph>
        Software 1.0 은 우리가 잘 아는 그것입니다. Python, Java, Kotlin, TypeScript 같은 언어로 사람이 직접 알고리즘을 적습니다.
        모든 분기와 모든 변수, 모든 정렬 알고리즘이 사람의 손으로 결정됩니다. 정확하지만 도메인이 좁고, 사람이 모르는 패턴은 다룰 수 없습니다.
        지금까지 50년 동안의 거의 모든 소프트웨어가 여기에 속합니다.
      </ProseParagraph>

      <ProseHeading level={2}>Software 2.0 — 신경망 가중치가 곧 코드</ProseHeading>
      <ProseParagraph>
        Karpathy 는 2017년 11월 11일 Medium 에 “Software 2.0” 글을 발표했습니다. 그의 핵심 주장은 한 줄로 요약됩니다 —
        “신경망의 가중치 자체가 코드” 입니다. Software 2.0 에서는 사람이 알고리즘을 적지 않습니다. 사람은 데이터셋과 목표 함수만 정하고,
        학습이라는 자동 최적화 과정이 그 목표를 만족하는 가중치 행렬을 찾아 줍니다. 이미지 분류, 음성 인식, 번역, 강화학습 — 사람이 손으로는
        절대 적을 수 없었던 작업들이 이 패러다임으로 풀렸습니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "Andrej Karpathy, “Software 2.0”, Medium, 2017년 11월 11일",
          href: "https://karpathy.medium.com/software-2-0-a64152b37c35",
        }}
      >
        Software 2.0 is written in much more abstract, human unfriendly language, such as the weights of a neural network.
        No human is involved in writing this code because there are a lot of weights (typical networks might have millions),
        and coding directly in weights is kind of hard.
      </ProseQuote>
      <ProseParagraph>
        쉽게 풀어 드리면 이렇습니다 — Software 1.0 에서는 “고양이 사진을 알아내는 함수를 적어 보세요” 라고 하면 사람이 직접 if 문을
        쌓아야 했습니다. Software 2.0 에서는 같은 요청에 대해 사람이 데이터셋(고양이 사진 10만 장)과 목표(정답 라벨) 만 주고, 그 다음은
        학습이 가중치를 찾아 줍니다. 사람은 가중치를 읽지 못하지만, 함수는 동작합니다.
      </ProseParagraph>

      <ProseHeading level={2}>Software 3.0 — LLM 이 컴퓨터, 영어가 코드</ProseHeading>
      <ProseParagraph>
        2025년 6월 Karpathy 는 Y Combinator AI Startup School 에서 “Software is Changing (Again)” 키노트를 통해 Software 3.0 을 공식화했습니다.
        그의 새로운 주장은 더 강합니다 — “LLM 자체가 새로운 종류의 컴퓨터이며, 영어(자연어) 가 그 위에서 동작하는 새로운 프로그래밍 언어다”.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "Y Combinator Library — Andrej Karpathy: Software Is Changing (Again), 2025년 6월",
          href: "https://www.ycombinator.com/library/MW-andrej-karpathy-software-is-changing-again",
        }}
      >
        It’s actually fair to say that software is changing again, fundamentally. LLMs are a new kind of computer,
        and you program them in English. Therefore, I think this counts as a major version upgrade.
      </ProseQuote>
      <ProseParagraph>
        Software 3.0 의 코드는 영어(또는 한국어) 로 적은 프롬프트입니다. 같은 LLM 이라는 컴퓨터 위에서 다른 프롬프트가 다른 동작을 만듭니다.
        이건 농담이 아니라 실제 운영의 변화입니다. ChatGPT 의 “GPT” 도, Cursor 의 Composer 도, Claude Code 의 슬래시 명령도 모두 자연어 프롬프트가
        주된 “코드” 입니다. 이 사이트의 카탈로그에 들어 있는 스킬과 서브에이전트 정의도 사실 대부분 자연어입니다.
      </ProseParagraph>
      <Callout tone="tip" title="세 가지를 한 줄로">
        Software 1.0 = 사람이 적은 코드. Software 2.0 = 학습된 신경망 가중치. Software 3.0 = LLM 위에서 동작하는 자연어 프롬프트.
        세 가지는 서로를 대체하는 것이 아니라 위에 쌓입니다 — 지금 우리가 만드는 시스템은 1.0(엔지니어링 글루) + 2.0(모델 추론) + 3.0(프롬프트) 가 동시에 작동합니다.
      </Callout>

      <ProseHeading level={2}>LLM as Operating System — 운영체제 비유</ProseHeading>
      <ProseParagraph>
        2023년 11월 23일 공개된 “[1hr Talk] Intro to Large Language Models” 강연에서 Karpathy 는 LLM 을 운영체제 커널에 비유했습니다.
        이 비유 하나가 지금 우리가 만드는 모든 하네스 설계의 토대입니다.
      </ProseParagraph>
      <CodeBlock filename="LLM OS 비유">
{`LLM ≈ CPU              — 토큰을 받아 다음 토큰을 계산하는 연산 유닛
context window ≈ RAM   — 지금 이 순간에 모델이 “보고 있는” 정보
tools / browser ≈ I/O  — 외부 세계와 통신하는 주변 장치
memory file ≈ disk     — 세션 너머에서 살아남는 영속 저장소
hooks ≈ device driver  — 이벤트마다 자동 실행되는 작은 프로그램
sandbox ≈ process      — 실행 권한과 격리 경계를 결정하는 단위
permissions ≈ syscall ACL — 어떤 명령을 누가 호출할 수 있는지의 정책`}
      </CodeBlock>
      <ProseParagraph>
        이 비유가 단순히 멋진 표현이 아닌 이유는, 이 비유에서 도출되는 설계 원칙이 실제로 동작하기 때문입니다. RAM 이 작으면 OS 가 swap 을
        쓰듯이, context window 가 차오르면 우리는 메모리 파일과 서브에이전트로 “swap out” 합니다. 시스템 콜 ACL 이 위험 명령을 막듯이,
        우리는 settings.json 의 permissions 와 .codex/rules/default.rules 로 위험 명령을 막습니다. driver 가 하드웨어 이벤트마다 동작하듯이,
        우리는 PreToolUse 훅으로 도구 호출 직전마다 사전 검사를 돌립니다. 이 사이트의 5-레이어 아키텍처 페이지가 이 비유의 직접적인 구현입니다.
      </ProseParagraph>
      <Infographic
        src="/infographics/karpathy-vision.png"
        alt="Karpathy 의 Software 1/2/3.0 과 LLM as OS 비전을 한 페이지로 정리한 인포그래픽"
        caption="Karpathy 의 AI 소프트웨어 비전 — Software 1/2/3.0, LLM as Operating System, vibe coding, nanoGPT 의 단일 파일 교육 철학을 한 페이지로 시각화한 자료입니다."
        source={{
          label: "Google NotebookLM (사이트 docs/research/01 source pack 기반 자동 생성)",
          href: "https://notebooklm.google.com",
        }}
      />

      <ProseHeading level={2}>Vibe coding 의 진짜 의미</ProseHeading>
      <ProseParagraph>
        2025년 2월 Karpathy 는 트위터에서 “vibe coding” 이라는 표현을 썼습니다. 원래 의도는 “LLM 을 옆에 두고 즉흥적으로 프로토타입을 만드는 즐거움”
        을 묘사한 것이었습니다. 그러나 표현이 빠르게 확산되면서 “계획·검증·리뷰 없이 LLM 출력을 그대로 commit” 하는 행동까지 같은 이름으로 포장되는
        부작용이 생겼습니다.
      </ProseParagraph>
      <ProseParagraph>
        Karpathy 자신은 vibe coding 을 production 시스템의 권장 방법론으로 제시한 적이 없습니다. 즉흥성이 즐거움의 본질이지만, 같은 즉흥성이
        production 의 사고로 이어지면 다른 이름이 필요합니다. 진지한 에이전틱 코딩 하네스(이 사이트가 견본으로 보여드리는 그것) 는 vibe coding 의
        즉흥성과 검증 가능한 엔지니어링 사이의 차이를 명시적으로 다룹니다 — hooks, rules, eval loops, verification gates 가 그 답입니다.
      </ProseParagraph>
      <Callout tone="warning" title="vibe coding 과 진지한 하네스의 차이">
        vibe coding 은 빠른 프로토타입과 학습용으로는 훌륭합니다. 하지만 production 으로 가면 hooks(위험 명령 차단), rules(권한 정책),
        eval loops(자동 회귀 검증), verification gates(사실 기반 완료 선언) 가 반드시 필요합니다. 이 사이트의 카탈로그가 그 도구들의 살아있는
        예시입니다.
      </Callout>

      <ProseHeading level={2}>nanoGPT 의 단일 파일 미학</ProseHeading>
      <ProseParagraph>
        Karpathy 의 또 다른 큰 영향은 “단일 파일·해킹 가능·교육적” 이라는 미학입니다. nanoGPT 는 약 300줄의 PyTorch 코드 한 파일로 GPT 를 재현하고,
        micrograd 는 약 100줄로 자동미분을 재현합니다. 두 저장소 모두 “이건 너무 작아서 거짓말이 끼어들 자리가 없다” 라는 메시지를 던집니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "github.com/karpathy/nanoGPT",
          href: "https://github.com/karpathy/nanoGPT",
        }}
      >
        nanoGPT — The simplest, fastest repository for training/finetuning medium-sized GPTs.
      </ProseQuote>
      <ProseParagraph>
        이 미학은 이 사이트의 디자인에도 반영되어 있습니다. 사이트 자체가 자기 자신의 견본이고, 모든 페이지가 출처와 함께 짧고 정직하게 작성됩니다.
        “단순한 것 위에 사실을 쌓는다” 가 nanoGPT 의 메시지이고, 이 사이트의 메시지이기도 합니다.
      </ProseParagraph>
    </>
  );
}

function RalphLoop() {
  return (
    <>
      <ProseParagraph>
        잠깐 상상해 보십시오 — 셸 스크립트 한 줄짜리 무한 루프가, LLM 에게 같은 프롬프트를 계속 던지면서, 매 반복마다 git 히스토리와 파일 상태만으로
        진행 상황을 기억합니다. 컨텍스트 윈도우가 차오르면? 다음 반복은 새로운 컨텍스트로 시작합니다. 다 끝났는지는? 미리 적어 둔 PRD 항목이 모두
        통과했는지로만 확인합니다. 이게 Geoffrey Huntley 가 정리한 Ralph loop 입니다. 이름은 The Simpsons 의 Ralph Wiggum 에서 따 왔습니다 —
        “순진해 보이지만 실제로는 동작한다” 는 점이 닮았다는 농담입니다.
      </ProseParagraph>

      <ProseHeading level={2}>왜 이렇게 단순한 루프가 동작하는가</ProseHeading>
      <ProseParagraph>
        Ralph loop 의 핵심 통찰은 한 줄입니다 — “진행 상태는 컨텍스트 윈도우 안에 있어선 안 됩니다. 파일과 git 히스토리에 있어야 합니다.”
        이 한 줄이 왜 중요할까요? 일반적인 LLM 대화는 컨텍스트가 차오르면 “기억상실” 을 겪습니다. 그래서 사람들은 더 큰 컨텍스트, 더 비싼 모델,
        더 복잡한 프롬프트로 그 한계를 밀어붙이려 합니다. Ralph 는 그 방향이 잘못됐다고 말합니다. 진행 상태를 외부(파일·git) 에 두면, 컨텍스트는
        매 반복마다 깔끔히 리셋되어도 됩니다. 컨텍스트는 “지금 이 순간 한 가지 일” 만 보면 충분합니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "Geoffrey Huntley, “everything is a ralph loop”",
          href: "https://ghuntley.com/loop/",
        }}
      >
        Progress lives outside the context window. When context exhausts, the next loop iteration starts fresh,
        examining only the current file state and recent git diffs, not conversation history.
      </ProseQuote>

      <ProseHeading level={2}>가장 간단한 Ralph loop</ProseHeading>
      <ProseParagraph>
        실제 코드는 놀랍도록 짧습니다. 아래는 Huntley 의 패턴을 그대로 따른 최소 셸 스크립트입니다.
      </ProseParagraph>
      <CodeBlock filename="ralph-loop.sh" language="bash">
{`#!/bin/bash
# 자율 에이전트 루프 — Ralph 패턴

PROMPT="Build a Kotlin AIOps harness per AGENTS.md spec"
MAX_ITERATIONS=50
ITERATION=0

while [ $ITERATION -lt $MAX_ITERATIONS ]; do
  ITERATION=$((ITERATION + 1))
  echo "=== Ralph Loop Iteration $ITERATION ==="

  # 최소 컨텍스트: 마지막 체크포인트 이후의 git diff 만
  RECENT_CHANGES=$(git diff HEAD~1)
  SPEC=$(cat AGENTS.md)

  # 같은 결정론적 프롬프트로 에이전트 호출
  claude --no-stream --file AGENTS.md --prompt "$PROMPT"

  # 완료 조건
  if pnpm test && git log --oneline -1 | grep -q "COMPLETE"; then
    echo "✓ All PRD items complete at iteration $ITERATION"
    break
  fi

  git add -A
  git commit -m "ralph-iter-$ITERATION: auto-iteration"
done`}
      </CodeBlock>

      <ProseHeading level={2}>AGENTS.md 에 “해야 할 일” 만 적어 두면 됩니다</ProseHeading>
      <ProseParagraph>
        Ralph loop 의 또 다른 매력은 “계획” 자체도 LLM 가 알아볼 수 있는 형식이면 충분하다는 점입니다. PRD 항목을 markdown 체크박스로 적어 두고,
        각 항목이 끝났는지를 git 커밋·테스트로 검증하는 것만으로도 자동화가 동작합니다.
      </ProseParagraph>
      <CodeBlock filename="AGENTS.md" language="markdown">
{`# AGENTS.md — Ralph Loop 작업 명세

## 목표
최소한의 Kotlin JVM AIOps 하네스를 eval-driven 방식으로 구축합니다.

## PRD 항목
- [ ] OpenAI 호환 도구 스펙 형식 파싱
- [ ] 코드 리뷰용 read-only 병렬 서브에이전트 구현
- [ ] eval 루프 연결: 테스트 작성 → 에이전트 실행 → 채점 → 개선
- [ ] 메모리를 ~/.claude/projects/*/memory/MEMORY.md 에 영속화

## 성공 기준
- 모든 테스트 통과: ./gradlew test
- git 히스토리에 점진적 커밋이 있음
- eval 이 ≥95% spec compliance 보고`}
      </CodeBlock>

      <Callout tone="note" title="우리 사이트도 Ralph 의 정신을 빌렸습니다">
        지금 보고 계신 이 사이트도 단순한 의미에서 Ralph loop 의 아이디어를 빌렸습니다. 진행 상태는 모두 git push 마다 Vercel 의 자동 빌드로
        검증되고, 콘텐츠는 docs/research/ 의 markdown 파일에 영속화됩니다. 컨텍스트 윈도우 안에 “지금 이 사이트를 어디까지 만들었는지” 를 외울
        필요가 없습니다.
      </Callout>
      <Infographic
        src="/infographics/agentic-patterns.png"
        alt="현대 AI 에이전틱 코딩 8가지 패턴을 한 페이지로 정리한 인포그래픽"
        caption="현대 에이전틱 코딩 패턴 — Ralph wiretap loop 를 비롯한 8가지 패턴을 카드 형태로 시각화한 자료입니다."
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
        한 번 솔직히 생각해 봅시다 — 평소 LLM 으로 무언가를 만들 때, 어떻게 “이게 잘 되고 있는지” 를 판단하시나요? 직접 몇 번 눈으로 확인해 보고
        “음, 잘 되네” 하고 넘어가신 적이 분명히 있을 겁니다. Hamel Husain 같은 분들이 강조하는 Eval-Driven Development(EDD) 는 그 “눈으로 확인” 단계를
        자동화 가능한 평가(eval) 로 바꿉니다. 곧, “LLM 에 대한 단위 테스트” 입니다.
      </ProseParagraph>

      <ProseHeading level={2}>왜 평가가 핵심인가</ProseHeading>
      <ProseParagraph>
        실패하는 LLM 제품은 거의 모두 같은 한 가지 뿌리를 공유합니다 — 견고한 평가 시스템이 없습니다. Hamel 의 표현을 빌리자면, 잘하는 팀은 도구
        이야기를 거의 하지 않고 측정과 반복(measurement and iteration) 만 이야기합니다. 평가는 다음 셋을 모두 가능하게 합니다.
      </ProseParagraph>
      <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
        <li><strong>Unit tests for LLMs</strong> — 작고, 단정 기반이고, 자주 돌릴 수 있는 테스트</li>
        <li><strong>인간 + 모델 평가</strong> — LLM-as-judge 로 출력 품질에 대한 비판을 자동화</li>
        <li><strong>A/B 테스트</strong> — 충분히 성숙한 기능을 실제 사용자 트래픽에서 검증</li>
      </ul>
      <ProseQuote
        cite={{
          label: "Hamel Husain, “Your AI Product Needs Evals”",
          href: "https://hamel.dev/blog/posts/evals/",
        }}
      >
        Most successful approaches to building AI products use evals as a forcing function for everything else.
        Evals are the most important thing to get right.
      </ProseQuote>

      <ProseHeading level={2}>Eval 루프는 이렇게 돕니다</ProseHeading>
      <ol className="mt-3 list-decimal space-y-2 pl-6 font-serif text-foreground">
        <li>평가를 먼저 적습니다 — 입력, 기대 동작, 채점 방식</li>
        <li>에이전트를 평가 데이터셋에 대해 실행하고 trace 를 수집합니다</li>
        <li>출력을 채점합니다 (LLM-as-judge, 사람, 도메인 메트릭)</li>
        <li>실패 케이스의 패턴을 분석합니다</li>
        <li>프롬프트, 도구, 컨텍스트, 모델을 개선합니다</li>
        <li>다시 평가를 돌려 개선이 실제로 효과가 있었는지 확인합니다</li>
      </ol>
      <ProseParagraph>
        이건 TDD 의 LLM 버전입니다. 다른 점은 기대값이 정확한 문자열이 아니라 “이 출력이 충분히 좋은가” 라는 판단이라는 것뿐입니다. 그 판단을
        LLM-as-judge 또는 사람 또는 도메인 메트릭으로 자동화하면, “테스트 없이는 코드 없음” 원칙을 LLM 에도 그대로 적용할 수 있습니다.
      </ProseParagraph>

      <ProseHeading level={2}>실제 코드 — Python eval 스위트</ProseHeading>
      <CodeBlock filename="evals/agentic_harness_evals.py" language="python">
{`# 에이전틱 하네스의 평가 스위트
import json
from datetime import datetime
from typing import Callable

class HarnessEval:
    """AIOps 에이전트 하네스 평가 스위트."""

    def __init__(self):
        self.results = {"passed": 0, "failed": 0, "traces": []}

    def eval_tool_parsing(self, agent_output: str) -> bool:
        """단위 평가: 에이전트가 도구 스펙을 정확히 파싱하는가?"""
        try:
            parsed = json.loads(agent_output)
            required = ["name", "description", "parameters"]
            return all(f in parsed for f in required)
        except Exception:
            return False

    def eval_agent_concurrency(self, agent_traces: list) -> dict:
        """모델 평가: 에이전트가 병렬 서브에이전트를 올바르게 사용했는가?"""
        prompt = f'''
        다음 에이전트 세션 trace 를 검토해 주세요. 에이전트가:
        1. read-only 리뷰 서브에이전트를 병렬로 띄웠습니까?
        2. 에이전트들 사이에 write 충돌을 피했습니까?
        3. eval deadline 안에 완료했습니까?

        Trace: {json.dumps(agent_traces, indent=2)}
        '''
        return call_llm_judge(prompt)

    def run_suite(self, agent_callable: Callable):
        for test in test_cases:
            output = agent_callable(test["input"])
            passed = self.eval_tool_parsing(output)
            self.results["traces"].append({
                "test": test, "output": output, "passed": passed,
                "timestamp": datetime.now().isoformat(),
            })
            self.results["passed" if passed else "failed"] += 1
        return self.results

# CI/CD 게이트
if __name__ == "__main__":
    evals = HarnessEval()
    results = evals.run_suite(agent_main)
    pass_rate = results["passed"] / (results["passed"] + results["failed"])
    assert pass_rate >= 0.95, f"Evals failed: {pass_rate*100:.1f}% pass rate"
    print(json.dumps(results, indent=2))`}
      </CodeBlock>

      <Callout tone="tip" title="작게 시작하는 것이 핵심입니다">
        평가 스위트를 처음부터 완벽하게 만들려고 하지 마십시오. 3~5개의 작은 단위 평가로 시작해서, 실패가 보이는 부분에 평가를 더 추가하는 식이
        훨씬 빠르게 도움이 됩니다. ROUGE/BLEU 같은 일반 메트릭은 도메인에 잘 맞지 않을 때가 많습니다 — 우리 도메인에 맞는 단순한 단정으로 시작하십시오.
      </Callout>
    </>
  );
}

function ContextEngineering() {
  return (
    <>
      <ProseParagraph>
        Karpathy 가 2025년 초에 X 에 한 줄로 적은 표현이 있습니다 — “context engineering 은 다음 한 단계를 위해 컨텍스트 윈도우를 정확히 채우는 섬세한 예술이자 과학입니다.”
        이 한 줄이 지금 멀티 에이전트 시스템 설계의 가장 중요한 키워드가 됐습니다. 컨텍스트 윈도우는 무한하지 않고, 무한해도 비싸지고, 비싸지 않아도
        오래된 정보가 새 정보를 흐립니다. 그래서 우리는 컨텍스트 자체를 1급 엔지니어링 대상으로 다뤄야 합니다.
      </ProseParagraph>
      <ProseQuote
        cite={{
          label: "Andrej Karpathy, X (구 Twitter), 2025년 초",
          href: "https://x.com/karpathy/status/1937902205765607626",
        }}
      >
        Context engineering is the delicate art and science of filling the context window with just the right information for the next step.
      </ProseQuote>

      <ProseHeading level={2}>왜 이게 중요한가요</ProseHeading>
      <ProseParagraph>
        장시간 실행되는 에이전트 작업은 토큰을 끊임없이 쌓아 갑니다. 그 결과로 보통 셋 중 하나가 일어납니다.
      </ProseParagraph>
      <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
        <li>컨텍스트 윈도우 초과 — 환각, 혼란, 성능 저하</li>
        <li>비용·지연 폭증 — 토큰이 늘수록 추론 시간과 비용이 모두 늘어납니다</li>
        <li>성능 저하 — 오래된, 무관한 정보가 새로운 결정을 흐립니다 (context dilution)</li>
      </ul>
      <ProseParagraph>
        Context engineering 은 컨텍스트 윈도우를 “관리되는 자원(managed resource)” 으로 다룹니다. 공짜 점심이 아닙니다.
      </ProseParagraph>

      <ProseHeading level={2}>4개의 기본 도구 — Lance Martin (LangChain) 의 framework</ProseHeading>
      <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
        <li><strong>Write Context</strong> — 정보를 윈도우 밖에 적어 둡니다 (스크래치패드, 메모리 파일).</li>
        <li><strong>Select Context</strong> — 필요할 때 관련 정보를 가져옵니다 (RAG, 임베딩, 메모리 검색).</li>
        <li><strong>Compress Context</strong> — 토큰은 줄이되 의미는 보존합니다 (요약, 트리밍).</li>
        <li><strong>Isolate Context</strong> — 정보를 서브에이전트 또는 별도 런타임으로 분리합니다.</li>
      </ul>
      <ProseQuote
        cite={{
          label: "Lance Martin, “Context Engineering for Agents”, 2025년 6월 23일",
          href: "https://rlancemartin.github.io/2025/06/23/context_engineering/",
        }}
      >
        Long-running tasks accumulate tokens. Context engineering treats the context window as a managed resource, not a free lunch.
      </ProseQuote>

      <ProseHeading level={2}>실제 적용 — CLAUDE.md 안의 context discipline</ProseHeading>
      <CodeBlock filename="CLAUDE.md (발췌)" language="markdown">
{`# AIOps 하네스를 위한 Context Engineering

## Write Context (윈도우 밖에 영속화)

### Scratchpad 패턴
- 긴 작업 중에는 .claude/memory/scratchpad.md 에 메모합니다
- 형식: ## [작업명] | 상태: in-progress | 사용 토큰: 5,234
- 컨텍스트가 차오르면 scratchpad 를 요약하여 detail 파일로 archive 합니다

### Memory 계층
- MEMORY.md (인덱스, 처음 200줄만 로드) → 토픽 파일 링크
- 토픽 파일: debugging.md, tool-specs.md, design-decisions.md
- 에이전트는 시작 시점이 아니라 “필요할 때만” 토픽 파일을 읽습니다

## Select Context (관련 정보 가져오기)

### Tool spec 검색
- 도구 정의를 .claude/memory/tool-specs.md 에 저장합니다
- 매 반복마다 모든 도구가 아니라 “현재 작업에 관련된” 2~3개만 grep 으로 찾아 로드합니다

## Compress Context (토큰 줄이기)
- scratchpad 가 2KB 를 넘으면 완료된 섹션은 요약합니다
- 오래된 git diff 는 “refactored logging layer” 같은 한 줄 요약으로 압축합니다

## Isolate Context (서브에이전트로 분리)
- 코드 리뷰는 별도 read-only 리뷰어 서브에이전트에게 위임합니다
- 부모 에이전트는 리뷰어의 입력을 직접 보지 않고, 결과만 받습니다`}
      </CodeBlock>

      <Callout tone="tip" title="우리 사이트의 적용 예">
        이 사이트가 견본으로 보여드리는 카탈로그의 서브에이전트들(reviewer, gradle_verifier, docs_researcher) 은 모두 컨텍스트 격리(isolate) 의 직접적인
        예시입니다. 카탈로그에서 “Codex 서브에이전트” 로 필터링하시면 실제 정의 파일을 보실 수 있습니다.
      </Callout>
    </>
  );
}

function AgentTeams() {
  return (
    <>
      <ProseParagraph>
        2024년 후반부터 “여러 에이전트를 협업시키는 방법” 에 대한 라이브러리가 폭발적으로 늘었습니다. 모두 같은 추상화를 다른 이름으로 부르고 있다는
        점이 흥미롭습니다 — 좁은 역할, 도구 제한, 병렬 fan-out, 그리고 결과 통합. 어떤 라이브러리가 어떤 강점을 가졌는지 한 번 정리해 드리겠습니다.
      </ProseParagraph>

      <ProseHeading level={2}>주요 라이브러리 비교</ProseHeading>
      <ul className="mt-3 list-disc space-y-3 pl-6 font-serif text-foreground">
        <li>
          <strong>Claude Code Agent Teams</strong> — Anthropic 의 실험 기능. <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[15px]">CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1</code> 환경변수로 활성화합니다.
          서브에이전트 정의(<code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[15px]">.claude/agents/</code>)를 그대로 사용하면서 “팀” 으로 묶을 수 있습니다.
        </li>
        <li>
          <strong>OpenAI Swarm</strong> — 2024년 10월 공개된 OpenAI 의 실험 라이브러리. routine 과 handoff 라는 두 개의 1급 개념으로 멀티 에이전트를 모델링합니다. 후속으로 OpenAI Agents SDK 가 발표됐습니다.
        </li>
        <li>
          <strong>LangGraph</strong> — LangChain 진영의 그래프 기반 멀티 에이전트 프레임워크. 노드 = 에이전트, 엣지 = 상태 전이입니다. 에이전트 사이의 데이터 흐름을 그래프로 모델링하고 싶을 때 강합니다.
        </li>
        <li>
          <strong>CrewAI</strong> — 역할 기반 오케스트레이션. 메모리·계획·도구 사용이 빌트인이고, 작은 코드로 에이전트 “팀” 을 정의할 수 있습니다.
        </li>
        <li>
          <strong>Microsoft AutoGen</strong> — 멀티 에이전트 대화 기반 시스템. 에이전트들이 서로 메시지를 주고받으며 합의에 이르는 방식이 인상적입니다.
        </li>
        <li>
          <strong>Microsoft Magentic-One</strong> — 일반 목적 멀티 에이전트 베이스라인. 코어 “Orchestrator” 가 전문 worker 들을 조정합니다.
        </li>
      </ul>

      <ProseHeading level={2}>이 사이트는 어떤 방식을 썼나요</ProseHeading>
      <ProseParagraph>
        이 사이트를 만들면서 저희는 “Claude Code 의 Agent 도구 + 일반 general-purpose 서브에이전트 병렬 디스패치” 를 가장 많이 사용했습니다.
        그 이유는 단순합니다 — 작업을 시작하는 시점에 “어떤 일을 어느 에이전트가 맡을지” 가 명확했고, 서브에이전트들 사이에 복잡한 메시지 교환이 필요 없었기 때문입니다.
        Ralph loop 처럼 작업 큐가 git/파일 시스템에 영속화되어 있다면, 각 에이전트는 자기 일만 끝내고 결과를 파일로 남기면 그만입니다.
      </ProseParagraph>
      <Callout tone="note" title="‘올바른 멀티 에이전트’ 는 보통 가장 단순한 것입니다">
        Anthropic 의 “Building Effective Agents” 글(2024년 12월) 도 같은 메시지를 강조합니다 — 워크플로(고정된 흐름) 로 충분한 일에 에이전트(자율 결정) 를 쓰지 마십시오.
        멀티 에이전트는 사용 가치가 분명할 때만 도입하시는 것이 좋습니다.
      </Callout>
    </>
  );
}

function SelfImproving() {
  return (
    <>
      <ProseParagraph>
        “AI 가 AI 를 만든다” 는 표현을 들으면 약간 미래 영화처럼 들립니다. 솔직히 말씀드리면 — 그 표현은 약간 과장입니다. 그러나 학습 파이프라인의
        일부 단계가 사람이 아닌 다른 모델 또는 같은 모델의 다른 실행으로 채워지는 흐름은 분명히 존재하고, 그건 측정 가능한 사실입니다.
      </ProseParagraph>

      <ProseHeading level={2}>검증 가능한 사례들</ProseHeading>
      <ul className="mt-3 list-disc space-y-3 pl-6 font-serif text-foreground">
        <li>
          <strong>AutoML / NASNet</strong> (Zoph & Le, 2017) — 신경망 아키텍처 자체를 다른 신경망이 탐색합니다. 결과는 사람이 손으로 디자인한 ResNet 보다 좋은 사례가 다수 보고됐습니다.
        </li>
        <li>
          <strong>AlphaZero</strong> (DeepMind, 2017) — 도메인 지식 없이 self-play 만으로 바둑·체스·쇼기 세 종목에서 사람 챔피언을 능가했습니다. “AI 가 자기 자신과 게임만 해서” 학습한 사례입니다.
        </li>
        <li>
          <strong>Constitutional AI / RLAIF</strong> (Anthropic, Bai et al. 2022) — 사람 라벨 대신 AI 의 비판으로 정렬을 학습합니다. 인간 피드백(RLHF) 의 비용과 일관성 문제를 보완하는 방향입니다.
        </li>
        <li>
          <strong>DSPy</strong> (Stanford NLP, Khattab et al.) — 프롬프트 자체를 자동 최적화합니다. “이 task 에 대해 어떤 프롬프트가 가장 잘 동작하는가” 를 사람 대신 라이브러리가 탐색합니다.
        </li>
        <li>
          <strong>Sakana AI Scientist</strong> (2024) — 가설 생성 → 실험 코드 작성 → 결과 분석 → 논문 작성을 한 파이프라인에 묶었습니다. 실험이 “저렴한 ML 논문 한 편” 에 해당하는 작업을 자동화했다는 보고가 있습니다.
        </li>
        <li>
          <strong>Self-Refine / Self-Rewarding LM / Self-Instruct</strong> — 모델이 자기 출력을 채점하고 개선하는 학습 루프 패밀리. 최근 정렬 연구에서 인용 빈도가 매우 높습니다.
        </li>
      </ul>

      <ProseHeading level={2}>그래서 무엇을 의미하나요</ProseHeading>
      <ProseParagraph>
        이 흐름은 “사람이 더 이상 필요 없다” 는 의미가 아닙니다. “학습 파이프라인의 어떤 구간은 사람이 아닌 다른 모델로 더 빠르고 일관되게 채울 수 있다”
        는 의미입니다. 비용 단가가 낮아지고 처리량이 늘어나면, 같은 시간·같은 예산 안에서 시도할 수 있는 실험의 개수가 늘어납니다. 이건 “지능” 의 정의와는
        무관한, 단순히 “초당 행렬 곱셈” 의 함수입니다. 우리가 사이트의 manifesto 에서 “속도와 스케일이 본질적 변수” 라고 적는 이유입니다.
      </ProseParagraph>
      <Callout tone="note" title="자료조사 진행 중">
        각 항목의 arxiv URL, 저자, 발표 연도가 verbatim 으로 정리된 source pack 이 docs/research/06-ai-substrate-trends.md 에 들어 있습니다.
        다음 push 에서 본문에 verbatim 으로 인용을 추가할 예정입니다.
      </Callout>
    </>
  );
}
