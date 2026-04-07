import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
  ProseQuote,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";

export const metadata = {
  title: "선언문",
  description:
    "이 사이트의 모든 콘텐츠가 따르는 다섯 가지 원칙입니다. 출처 없는 주장은 사이트에 올라가지 않습니다.",
  robots: {
    index: false,
    follow: false,
  },
};

const SUB_PAGES = [
  {
    href: "/manifesto/what-ai-actually-is",
    title: "AI는 인격체가 아니라 계산입니다",
    summary: "Vaswani 외 2017 의 transformer 정의와 nanoGPT 약 300줄 코드로 LLM 의 본질을 다시 정의합니다.",
  },
  {
    href: "/manifesto/why-harness-exists",
    title: "왜 하네스가 존재해야 하는가",
    summary: "Bostrom 의 paperclip maximizer 사고실험과 그것에 대한 sandbox/permissions/hooks 의 실용적 답입니다.",
  },
  {
    href: "/manifesto/realistic-trajectory",
    title: "현실 기반의 미래 궤적",
    summary: "TPU 세대, frontier 컴퓨트, METR 의 task 길이 두 배 증가 연구 같은 측정 가능한 변수로만 미래를 말합니다.",
  },
];

export default function ManifestoPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose>
        <ProseEyebrow>선언문 · v0.1</ProseEyebrow>
        <ProseHeading level={1}>다섯 가지 원칙</ProseHeading>
        <ProseParagraph>
          이 사이트는 에이전틱 코딩 하네스(agentic coding harness)에 대한 정보 공유 사이트입니다.
          모든 페이지는 아래 다섯 가지 원칙을 따릅니다. 이 원칙들은 변경되지 않으며, 사이트의 모든 essay와
          카탈로그가 같은 규칙을 공유합니다.
        </ProseParagraph>

        <ProseHeading level={2} id="rule-1">1. 사실 기반, 출처 명시</ProseHeading>
        <ProseParagraph>
          모든 사실 주장에는 출처 URL 또는 1차 자료가 있어야 합니다. 출처를 확인하지 못한 부분은
          {" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[15px]">[출처 미확인]</code>
          {" "}
          마커로 명시합니다. 인용은 verbatim 으로만 사용하며, 그 자리에서 직접 확인하지 못한 인용은
          paraphrase 로 표시합니다. 마케팅 슬로건이나 추측은 사이트에 올라가지 않습니다.
        </ProseParagraph>

        <ProseHeading level={2} id="rule-2">2. 한국어 존댓말</ProseHeading>
        <ProseParagraph>
          이 사이트의 모든 한국어 산문은 평어가 아닌 존댓말로 작성합니다. 영어 1차 자료의 인용은 원문 그대로
          유지하고, 그 뒤에 한국어 요약을 존댓말로 덧붙여 줍니다. 사이트 자체가 한국어 사용자가 보고 따라할 수
          있는 견본이라는 점을 항상 기억합니다.
        </ProseParagraph>

        <ProseHeading level={2} id="rule-3">3. AI는 인격체가 아니라 계산입니다</ProseHeading>
        <ProseParagraph>
          대규모 언어 모델은 정확히 다음과 같습니다.
        </ProseParagraph>
        <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
          <li>토큰 임베딩 룩업 + 다중 헤드 어텐션(scaled dot-product Q·K·V) + 피드포워드 + 정규화</li>
          <li>대규모 자기회귀 디코딩 (auto-regressive decoding)</li>
          <li>그래디언트 디센트로 학습된 가중치 행렬</li>
          <li>그것을 GPU/TPU 행렬 연산 유닛 위에서 빠르게 실행하는 컴파일러 스택</li>
        </ul>
        <ProseParagraph>
          이게 전부입니다. 이건 마음이 아니라 행렬 곱셈입니다. 의도가 아니라 토큰 시퀀스 위의 확률분포입니다.
          이 정의에서 출발해서 사이트의 모든 essay 가 작성됩니다.
        </ProseParagraph>
        <ProseQuote
          cite={{
            label: "Vaswani 외, “Attention Is All You Need”, 2017 (arxiv:1706.03762)",
            href: "https://arxiv.org/abs/1706.03762",
          }}
        >
          이 정의는 transformer 원논문과 Karpathy 의 nanoGPT 약 300줄 PyTorch 코드에서 직접 확인할 수 있습니다.
          GPT-2 가 한 파일 안에 들어간다는 사실 자체가 LLM 이 무엇인지에 대한 가장 정직한 정의입니다.
        </ProseQuote>

        <ProseHeading level={2} id="rule-4">4. 속도와 스케일이 본질적 변수입니다</ProseHeading>
        <ProseParagraph>
          LLM 의 능력 곡선은 신비한 무엇이 아니라 측정 가능한 변수의 함수로 움직입니다. 모델 파라미터 수,
          학습 토큰 수, 학습 컴퓨트(FLOPs), 추론 컴퓨트(=행렬 곱셈 횟수 × 토큰 길이), TPU/GPU 세대,
          데이터센터 전력과 연결성. “미래 AI 가 어디까지 갈까” 라는 질문은 곧 “위 변수들이 어디까지
          늘어나는가” 라는 질문입니다.
        </ProseParagraph>

        <ProseHeading level={2} id="rule-5">5. 미래 예측은 사실 기반으로만</ProseHeading>
        <ProseParagraph>
          미래에 대한 모든 진술은 인용 가능한 자료에서만 가져옵니다. 이 사이트가 현재 출처로 인정하는
          예시는 다음과 같습니다.
        </ProseParagraph>
        <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
          <li>METR 의 task 길이 두 배 증가 연구 (<a className="underline-offset-2 hover:underline" href="https://metr.org" target="_blank" rel="noreferrer">metr.org</a>)</li>
          <li>Epoch AI 의 컴퓨트 스케일 추정 (<a className="underline-offset-2 hover:underline" href="https://epoch.ai" target="_blank" rel="noreferrer">epoch.ai</a>)</li>
          <li>Dario Amodei, “Machines of Loving Grace” (<a className="underline-offset-2 hover:underline" href="https://www.darioamodei.com/essay/machines-of-loving-grace" target="_blank" rel="noreferrer">2024년 10월</a>)</li>
          <li>Anthropic Responsible Scaling Policy (<a className="underline-offset-2 hover:underline" href="https://www.anthropic.com/news" target="_blank" rel="noreferrer">anthropic.com/news</a>)</li>
          <li>Sam Altman, “Three Observations” (<a className="underline-offset-2 hover:underline" href="https://blog.samaltman.com" target="_blank" rel="noreferrer">2025년 2월</a>)</li>
        </ul>

        <Callout tone="note" title="이 다섯 가지를 왜 못 박았나요">
          에이전틱 코딩 하네스를 만드는 일은 본질적으로 “출처 없는 자신감을 검증 가능한 시스템으로 바꾸는 일” 입니다.
          LLM 은 자기가 모르는 것을 모른다고 말하지 않습니다. 사이트가 그 자신감을 그대로 답습한다면, 사이트 자체가
          LLM 이 만든 거짓말의 또 다른 표면이 됩니다. 다섯 가지 원칙은 그것에 대한 단순한 답입니다.
        </Callout>

        <ProseHeading level={2}>이어서 읽을 글</ProseHeading>
      </Prose>

      <div className="mx-auto mt-8 grid max-w-5xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
        {SUB_PAGES.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
          >
            <h3 className="font-sans text-lg font-medium text-foreground">{s.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-foreground-muted">{s.summary}</p>
            <span aria-hidden="true" className="font-mono text-xs text-foreground-subtle transition group-hover:text-accent-2">
              읽기 →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
