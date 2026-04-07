import Link from "next/link";

const SNIPPET = `# .codex/config.toml — 이 사이트가 자기 자신의 견본입니다
model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[features]
codex_hooks = true
multi_agent = true

[agents.reviewer]
config_file = ".codex/agents/reviewer.toml"
`;

/**
 * 랜딩 페이지의 에디토리얼 히어로입니다.
 * 그라디언트 없이 큰 serif 헤드라인 + Innogrid 블루 액센트 CTA + 코드 카드로 구성합니다.
 */
export function EditorialHero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="mb-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
            <span aria-hidden="true" className="inline-block h-1.5 w-7 bg-accent" />
            Research Engineering · v0.1
          </p>
          <h1 className="font-serif text-[40px] leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[72px]">
            진지한 시스템을 위한
            <br />
            <span className="text-accent">에이전틱 코딩 하네스</span>
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-foreground-muted md:text-xl">
            Karpathy 방법론, 멀티 에이전트 오케스트레이션, 그리고 Innogrid AIOps/MLOps 플랫폼을 만들면서 검증한 패턴을 한 곳에 정리했습니다.
            모든 사실에는 출처가 있고, AI는 인격체가 아니라 행렬 곱셈 위의 확률분포로 정의합니다.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/manifesto"
              className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-3 font-mono text-sm font-medium text-white transition hover:opacity-90"
            >
              선언문 읽기 →
            </Link>
            <Link
              href="/catalog/skills"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 font-mono text-sm text-foreground transition hover:border-accent-2 hover:text-accent-2"
            >
              카탈로그 탐색
            </Link>
            <Link
              href="/architecture/overview"
              className="hidden items-center gap-2 px-2 py-3 font-mono text-sm text-foreground-muted transition hover:text-accent-2 sm:inline-flex"
            >
              5-레이어 다이어그램 →
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full overflow-hidden rounded-lg border border-border bg-surface shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 border-b border-border bg-surface-2 px-4 py-2.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/40" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/40" />
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-foreground-subtle/40" />
              <span className="ml-3 font-mono text-xs text-foreground-muted">.codex/config.toml</span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-foreground"><code>{SNIPPET}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
}
