import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";

export const metadata = {
  title: "참고자료",
  description:
    "이 사이트를 만들면서 참고하거나 함께 살펴볼 만한 외부 하네스 컬렉션, 공식 문서, 1차 자료 모음입니다.",
};

const REFERENCES = [
  {
    href: "/reference/harness-100",
    title: "Harness 100 (RevFactory)",
    summary:
      "Minho Hwang(@revfactory) 가 공개한 200개의 production-grade Claude Code 하네스 컬렉션입니다. 콘텐츠·개발·데이터·전략 등 10개 도메인에 걸쳐 978개 에이전트와 630개 스킬을 모아 두었습니다.",
    badge: "외부 컬렉션",
  },
  {
    href: "https://docs.anthropic.com/en/docs/claude-code/overview",
    title: "Claude Code 공식 문서",
    summary:
      "Anthropic 의 Claude Code 공식 문서입니다. memory, skills, subagents, hooks, permissions, plugins 의 모든 사양이 정리되어 있습니다.",
    badge: "공식",
    external: true,
  },
  {
    href: "https://github.com/openai/codex",
    title: "OpenAI Codex CLI",
    summary:
      "OpenAI 의 Codex CLI 저장소입니다. config.toml 사양, profiles, 서브에이전트, execpolicy 가 모두 README 에 정리되어 있습니다.",
    badge: "공식",
    external: true,
  },
  {
    href: "https://www.anthropic.com/engineering/building-effective-agents",
    title: "Building Effective Agents (Anthropic)",
    summary:
      "Anthropic 엔지니어링 블로그(2024년 12월) 의 에이전트 빌드 권고문입니다. workflows vs agents 구분, 가장 단순한 패턴부터 시작하라는 메시지를 담고 있습니다.",
    badge: "1차 자료",
    external: true,
  },
  {
    href: "https://ghuntley.com/loop/",
    title: "Everything is a Ralph Loop (Geoffrey Huntley)",
    summary:
      "Ralph wiretap loop 패턴의 원전 글입니다. 단일 셸 루프로 자율 에이전트를 돌리는 가장 단순한 방법을 설명합니다.",
    badge: "1차 자료",
    external: true,
  },
  {
    href: "https://hamel.dev/blog/posts/evals/",
    title: "Your AI Product Needs Evals (Hamel Husain)",
    summary:
      "Eval-Driven Development 의 핵심 글입니다. “LLM 제품 실패의 거의 모든 뿌리는 평가의 부재” 라는 메시지를 담고 있습니다.",
    badge: "1차 자료",
    external: true,
  },
  {
    href: "https://rlancemartin.github.io/2025/06/23/context_engineering/",
    title: "Context Engineering for Agents (Lance Martin)",
    summary:
      "Context Engineering 4가지 원칙(write · select · compress · isolate) 을 처음으로 정리한 LangChain 의 글입니다.",
    badge: "1차 자료",
    external: true,
  },
  {
    href: "https://arxiv.org/abs/1706.03762",
    title: "Attention Is All You Need (Vaswani et al. 2017)",
    summary:
      "Transformer 아키텍처를 처음 발표한 NeurIPS 2017 논문입니다. 이 사이트의 “AI = 계산” 정의의 출발점입니다.",
    badge: "논문",
    external: true,
  },
  {
    href: "https://github.com/karpathy/nanoGPT",
    title: "nanoGPT (Andrej Karpathy)",
    summary:
      "약 300줄의 PyTorch 코드 한 파일로 GPT 를 재현하는 교육용 저장소입니다. LLM 이 무엇인지에 대한 가장 정직한 정의입니다.",
    badge: "코드",
    external: true,
  },
];

export default function ReferenceIndexPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose>
        <ProseEyebrow>참고자료</ProseEyebrow>
        <ProseHeading level={1}>1차 자료와 외부 컬렉션</ProseHeading>
        <ProseParagraph>
          이 사이트는 사실 기반으로 작성됩니다. 모든 에세이는 아래 링크된 1차 자료를 직접 참고했습니다. 함께 살펴보시면
          이 사이트가 어떤 자료들 위에 서 있는지 확인하실 수 있고, 본인의 프로젝트에 가져갈 수 있는 또 다른 견본도 만나실 수 있습니다.
        </ProseParagraph>
      </Prose>

      <div className="mx-auto mt-10 grid max-w-5xl gap-4 px-4 sm:grid-cols-2 sm:px-6">
        {REFERENCES.map((r) => {
          const isExternal = "external" in r && r.external;
          const Wrapper = isExternal
            ? ({ children }: { children: React.ReactNode }) => (
                <a
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
                >
                  {children}
                </a>
              )
            : ({ children }: { children: React.ReactNode }) => (
                <Link
                  href={r.href}
                  className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
                >
                  {children}
                </Link>
              );

          return (
            <Wrapper key={r.href}>
              <span className="self-start rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-foreground-muted">
                {r.badge}
              </span>
              <h3 className="font-sans text-lg font-medium text-foreground">{r.title}</h3>
              <p className="flex-1 text-sm leading-relaxed text-foreground-muted">{r.summary}</p>
              <span className="mt-2 font-mono text-xs text-foreground-subtle transition group-hover:text-accent-2">
                {isExternal ? "원문 열기 ↗" : "자세히 보기 →"}
              </span>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
