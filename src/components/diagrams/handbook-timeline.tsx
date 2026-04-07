/**
 * 핸드북 페이지의 "과거 발전 과정" 타임라인 다이어그램입니다.
 * 기존 /infographics/agentic-handbook-timeline.svg 를 대체합니다.
 * SVG 안에 한국어가 박스 밖으로 흘러나오던 가독성 문제를 해결하기 위해
 * Tailwind 카드와 자연스러운 텍스트 wrap 으로 다시 만들었습니다.
 */

type TimelineItem = {
  year: string;
  title: string;
  description: string;
  accent: string; // tailwind border / text color class
};

const ITEMS: TimelineItem[] = [
  {
    year: "2017",
    title: "Software 2.0",
    description:
      "Karpathy 가 가중치로 학습된 모델 자체를 또 하나의 소프트웨어 층으로 정식 제시했습니다.",
    accent: "border-l-accent text-accent",
  },
  {
    year: "2023",
    title: "LLM as Operating System",
    description:
      "LLM 을 일종의 커널처럼 보고, 컨텍스트와 도구를 자원처럼 관리하기 시작한 시기입니다.",
    accent: "border-l-violet-500 text-violet-400",
  },
  {
    year: "2024",
    title: "Building Effective Agents",
    description:
      "Anthropic 이 workflow 와 agent 를 구분하면서, 단순 체인이 더 안전한 상황을 명확히 정리했습니다.",
    accent: "border-l-emerald-500 text-emerald-400",
  },
  {
    year: "2025",
    title: "Ralph · Evals · Context Engineering",
    description:
      "Ralph loop, eval-driven dev, context engineering 같은 운영 기법이 묶여 하네스 공학으로 굳어졌습니다.",
    accent: "border-l-orange-500 text-orange-400",
  },
  {
    year: "2026",
    title: "Hot Stack",
    description:
      "Codex 와 Claude Code 런타임, MCP, Playwright, Context7, 강한 30B 오픈 coder 모델, 관측성과 검증 루프가 한 스택으로 묶이는 시기입니다.",
    accent: "border-l-sky-500 text-sky-400",
  },
];

export function HandbookTimeline() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
      <header className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground-subtle">
          Timeline · 2017 → 2026
        </p>
        <h3 className="mt-2 font-serif text-2xl tracking-tight text-foreground sm:text-[28px]">
          Agentic Coding Handbook Timeline
        </h3>
        <p className="mt-2 max-w-[68ch] text-sm leading-7 text-foreground-muted">
          자동완성 시절에서 출발해 하네스 공학으로 이어진 과거의 흐름입니다. 각 항목은
          상위 사이트의 essay 페이지에서 더 깊게 다룹니다.
        </p>
      </header>

      <ol className="relative space-y-3">
        {ITEMS.map((item) => (
          <li
            key={item.year}
            className={`flex flex-col gap-3 rounded-xl border border-border ${item.accent} border-l-[3px] bg-surface p-5 transition hover:border-l-[5px] sm:flex-row sm:gap-6`}
          >
            <div className="flex shrink-0 flex-col gap-1 sm:w-32">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                Year
              </span>
              <span className={`font-serif text-3xl font-semibold leading-none ${item.accent}`}>
                {item.year}
              </span>
            </div>
            <div className="min-w-0 flex-1 space-y-2">
              <h4 className="font-sans text-base font-semibold tracking-tight text-foreground sm:text-lg">
                {item.title}
              </h4>
              <p className="text-sm leading-7 text-foreground-muted">{item.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 rounded-xl border border-border bg-foreground/5 p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          핵심 메시지
        </p>
        <p className="mt-2 text-sm leading-7 text-foreground">
          좋은 agentic coding 은 모델 이름 하나가 아니라{" "}
          <span className="font-semibold">memory · skills · subagents · rules · hooks · evals · observability</span>
          {" "}를 함께 설계하는 문제입니다.
        </p>
      </div>
    </div>
  );
}
