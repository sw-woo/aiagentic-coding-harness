import Link from "next/link";

/**
 * 랜딩 페이지의 핵심 가치 제안을 짧고 직접적으로 보여주는 히어로입니다.
 */
export function EditorialHero() {
  return (
    <section className="border-b border-border bg-[linear-gradient(180deg,rgba(0,66,255,0.05),transparent_55%)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-18 sm:px-6 lg:grid-cols-[1.2fr_0.9fr] lg:py-24">
        <div className="flex flex-col justify-center">
          <p className="mb-5 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
            <span aria-hidden="true" className="inline-block h-1.5 w-7 bg-accent" />
            Practical Agentic Patterns
          </p>
          <h1 className="font-serif text-[40px] leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[72px]">
            에이전틱 코딩
            <br />
            <span className="text-accent">하네스</span>
          </h1>
          <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-foreground-muted md:text-xl">
            이 사이트는 agentic coding harness 엔지니어링을 이해하고, 실제 저장소에 설정하고, 팀 단위로 운영하는 방법까지 이어서 읽을 수 있게 정리한 안내형 문서 사이트입니다.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-8 text-foreground-muted">
            처음이라면 큰그림부터, 바로 적용하려면 셋업 가이드부터, 세부 설정이 궁금하면 레퍼런스와 카탈로그부터 보시면 됩니다.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-md border border-accent bg-accent px-5 py-3 font-mono text-sm font-medium text-white transition hover:opacity-90"
            >
              어디서부터 읽을지 보기 →
            </Link>
            <Link
              href="/handbook"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 font-mono text-sm text-foreground transition hover:border-accent-2 hover:text-accent-2"
            >
              큰그림부터 읽기
            </Link>
            <Link
              href="/playbook/setup-codex"
              className="inline-flex items-center gap-2 px-2 py-3 font-mono text-sm text-foreground-muted transition hover:text-accent-2"
            >
              바로 셋업하기 →
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-full rounded-2xl border border-border bg-surface p-7 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">이 사이트를 읽는 세 가지 방식</p>
            <div className="mt-6 space-y-5">
              <div className="rounded-xl border border-border bg-background p-5">
                <p className="font-mono text-xs text-accent">01</p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">처음 이해하려면</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  `핸드북`에서 과거 발전사, 현재 핫한 스택, 미래 방향까지 한 흐름으로 읽으시면 됩니다.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-5">
                <p className="font-mono text-xs text-accent">02</p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">바로 적용하려면</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  `플레이북`에서 AGENTS.md, config.toml, rules, hooks, subagents, MCP 순서로 따라가시면 됩니다.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background p-5">
                <p className="font-mono text-xs text-accent">03</p>
                <h2 className="mt-2 text-lg font-semibold text-foreground">세부 자료를 찾으려면</h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  `카탈로그`와 `레퍼런스`에서 실제 파일, 공식 문서, 심화 가이드로 바로 내려가시면 됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
