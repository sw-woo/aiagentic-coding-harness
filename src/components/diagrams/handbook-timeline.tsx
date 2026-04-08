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
    year: "2022.11",
    title: "ChatGPT 출시",
    description:
      "OpenAI 가 ChatGPT 를 공개해 일반 사용자가 처음으로 LLM 과 직접 대화하기 시작했습니다. AI 코딩 도구의 시작점이자 가장 친숙한 분기점입니다.",
    accent: "border-l-accent text-accent",
  },
  {
    year: "2023",
    title: "GPT-4 와 Copilot Chat",
    description:
      "GPT-4 가 등장하면서 IDE 안의 자동완성에서 대화형 코딩 보조로 무게 중심이 옮겨갔습니다. LLM 을 도구처럼 다루는 흐름이 본격화된 해입니다.",
    accent: "border-l-violet-500 text-violet-400",
  },
  {
    year: "2024",
    title: "Workflow 와 Agent 구분",
    description:
      "Anthropic 의 “Building Effective Agents”(2024년 12월) 가 워크플로(고정 흐름) 와 에이전트(자율 결정) 를 구분했습니다. 무조건 복잡한 에이전트보다 단순한 흐름이 더 좋을 때가 있다는 기준이 잡혔습니다.",
    accent: "border-l-emerald-500 text-emerald-400",
  },
  {
    year: "2025",
    title: "하네스 공학으로",
    description:
      "Ralph loop, 평가 루프, 컨텍스트 관리, MCP 같은 운영 기법이 한데 묶이면서 “AI 가 잘 일하는 작업 환경을 사람이 설계한다”는 관점이 자리잡았습니다.",
    accent: "border-l-orange-500 text-orange-400",
  },
  {
    year: "2026",
    title: "Codex · Claude Code 시대",
    description:
      "Codex 와 Claude Code 같은 터미널 기반 AI 코딩 도구, MCP, Playwright, 강한 30B 오픈 coder 모델, 관측성과 검증 루프가 한 스택으로 묶이는 시기입니다.",
    accent: "border-l-sky-500 text-sky-400",
  },
];

export function HandbookTimeline() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
      <header className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground-subtle">
          Timeline · 2022.11 → 2026
        </p>
        <h3 className="mt-2 font-serif text-2xl tracking-tight text-foreground sm:text-[28px]">
          ChatGPT 출시부터 지금까지 — AI 코딩 도구의 흐름
        </h3>
        <p className="mt-2 max-w-[68ch] text-sm leading-7 text-foreground-muted">
          ChatGPT 가 등장한 2022년 11월부터, AI 코딩 도구가 지금의 “하네스 공학” 으로
          이어진 4년 동안의 과정을 한눈에 보는 타임라인입니다.
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
