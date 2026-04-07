/**
 * 핸드북 페이지의 "현재 가장 핫한 흐름" 섹션에서 사용하는 stack landscape 그림입니다.
 * 기존 /infographics/agentic-harness-landscape.svg 를 대체합니다.
 * Tailwind 그리드와 자동 텍스트 wrap 으로 한국어/영어 혼합 콘텐츠가 모바일에서도 깨지지 않게 했습니다.
 */

type StackLayer = {
  number: string;
  title: string;
  subtitle: string;
  accent: string;
  items: { name: string; note?: string }[];
};

const LAYERS: StackLayer[] = [
  {
    number: "Layer 1",
    title: "Foundation Models",
    subtitle: "메인 세션과 서브에이전트가 호출하는 실제 모델 층입니다.",
    accent: "text-accent",
    items: [
      { name: "GPT-5-Codex", note: "코딩 특화" },
      { name: "GPT-5.4 mini", note: "서브에이전트" },
      { name: "Claude Opus 4.6", note: "메인 세션" },
      { name: "Claude Sonnet/Haiku", note: "보조" },
      { name: "Gemma 4 31B", note: "오픈 coder" },
      { name: "Qwen3-Coder 30B", note: "오픈 coder" },
    ],
  },
  {
    number: "Layer 2",
    title: "Harness Runtime",
    subtitle:
      "Claude Code · Codex 같은 런타임이 표면화하는 작업 환경 층입니다. 여기가 사실상 지금의 차이를 만듭니다.",
    accent: "text-emerald-400",
    items: [
      { name: "Memory", note: "AGENTS.md · CLAUDE.md" },
      { name: "Skills", note: "반복 워크플로" },
      { name: "Subagents", note: "review · verify · docs" },
      { name: "Rules", note: "승인 · 금지" },
      { name: "Hooks", note: "자동 guardrail" },
      { name: "Evals", note: "회귀 · 품질 바" },
    ],
  },
  {
    number: "Layer 3",
    title: "External Extensions",
    subtitle:
      "MCP 로 붙는 외부 시스템 층입니다. 두 런타임이 같은 MCP 서버를 공유할 수 있습니다.",
    accent: "text-orange-400",
    items: [
      { name: "Playwright MCP" },
      { name: "Context7" },
      { name: "Figma MCP" },
      { name: "Linear MCP" },
      { name: "Slack MCP" },
      { name: "Atlassian MCP" },
      { name: "Sentry AI" },
      { name: "GitHub MCP" },
    ],
  },
];

export function HarnessLandscape() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
      <header className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground-subtle">
          Stack Landscape · 2026
        </p>
        <h3 className="mt-2 font-serif text-2xl tracking-tight text-foreground sm:text-[28px]">
          Modern Agentic Coding Landscape
        </h3>
        <p className="mt-2 max-w-[72ch] text-sm leading-7 text-foreground-muted">
          모델, 하네스, 외부 확장을 한 장에 정리한 현재 스택 지도입니다. 같은 모델을 써도 어떤
          런타임 위에 두고, 어떤 MCP 와 묶느냐에 따라 체감 생산성이 크게 달라집니다.
        </p>
      </header>

      <div className="space-y-4">
        {LAYERS.map((layer, idx) => (
          <section
            key={layer.number}
            className="rounded-xl border border-border bg-surface p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-3">
                <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${layer.accent}`}>
                  {layer.number}
                </span>
                <h4 className="font-sans text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                  {layer.title}
                </h4>
              </div>
              {idx < LAYERS.length - 1 ? (
                <span className="font-mono text-[11px] text-foreground-subtle">↓</span>
              ) : null}
            </div>
            <p className="mt-2 max-w-[72ch] text-sm leading-7 text-foreground-muted">
              {layer.subtitle}
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {layer.items.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-col gap-0.5 rounded-md border border-border bg-background px-3 py-2"
                >
                  <span className="font-mono text-sm font-medium text-foreground">{item.name}</span>
                  {item.note ? (
                    <span className="font-mono text-[11px] text-foreground-subtle">{item.note}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
