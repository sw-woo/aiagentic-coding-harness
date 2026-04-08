import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";
import { popularHarnessRepos } from "@/lib/popular-harness-repos";

export const metadata: Metadata = {
  title: "지금 가장 인기 있는 GitHub 하네스 레포 10선",
  description:
    "2026년 4월 GitHub 공개 API 기준으로 검증한 agentic coding 하네스 인기 레포 10개와 각 레포를 자기 저장소에 바로 적용하는 가이드를 정리한 페이지입니다.",
};

const VERIFIED_AT = "2026-04-08";

function formatStars(stars: number): string {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(1)}k`;
  }
  return stars.toString();
}

export default function PopularHarnessReposPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · 인기 레포</ProseEyebrow>
        <ProseHeading level={1}>
          지금 가장 인기 있는 GitHub 하네스 레포 10선
        </ProseHeading>
        <ProseParagraph>
          “하네스를 처음부터 만들지 마시고, 일단 검증된 것 위에 시작하시는 편이 빠릅니다.” 이 페이지는
          GitHub 공개 API 로 직접 확인한 인기 레포 10개를 stars 순서로 정리하고, 각 레포를 자기 저장소에
          바로 적용하는 짧은 가이드를 함께 둡니다.
        </ProseParagraph>

        <Callout tone="note" title="검증 기준">
          <p>
            모든 stars · forks · pushed_at 값은{" "}
            <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">
              https://api.github.com/repos/&lt;owner&gt;/&lt;name&gt;
            </code>{" "}
            에 직접 호출해서 받은 값입니다 ({VERIFIED_AT} 기준). 마케팅성 블로그의 인용 수치는 사용하지
            않았습니다. 시간이 지나면 순위가 바뀔 수 있으므로, 같은 호출로 한 번 더 확인하시는 편이
            안전합니다.
          </p>
        </Callout>

        <ProseHeading level={2}>10개 레포 한눈에 보기</ProseHeading>
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <div className="grid grid-cols-[40px_minmax(0,1fr)_80px_120px] gap-4 border-b border-border bg-surface-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
            <span>#</span>
            <span>레포</span>
            <span className="text-right">Stars</span>
            <span className="hidden sm:block">License</span>
          </div>
          <ul className="divide-y divide-border bg-background">
            {popularHarnessRepos.map((item, idx) => (
              <li
                key={item.repo}
                className="grid grid-cols-[40px_minmax(0,1fr)_80px_120px] items-baseline gap-4 px-5 py-4 text-sm"
              >
                <span className="font-mono text-foreground-subtle">{idx + 1}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:text-accent hover:underline"
                >
                  {item.repo}
                </a>
                <span className="text-right font-mono text-foreground-muted">
                  {formatStars(item.stars)}
                </span>
                <span className="hidden font-mono text-[11px] text-foreground-muted sm:block">
                  {item.license}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <ProseHeading level={2}>각 레포를 바로 적용하는 가이드</ProseHeading>
        <ProseParagraph>
          아래는 각 레포를 자기 저장소에 가장 빠르게 적용하는 짧은 안내입니다. 한 번에 다 넣지 마시고
          한 두 개씩 시도해 보시는 편이 안전합니다.
        </ProseParagraph>

        <div className="mt-6 grid gap-5">
          {popularHarnessRepos.map((item, idx) => (
            <article
              key={item.repo}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    #{idx + 1} · {item.category}
                  </p>
                  <h3 className="mt-2 font-sans text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-foreground-muted">
                  <span>★ {formatStars(item.stars)}</span>
                  <span>· {item.license}</span>
                  <span>· last push {item.lastPushed}</span>
                </div>
              </div>

              <p className="mt-3 text-sm leading-7 text-foreground-muted">{item.summary}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.worksWith.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[11px] text-foreground-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-border bg-background p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
                  바로 적용
                </p>
                {item.applyGuide.command ? (
                  <pre className="mt-2 overflow-x-auto rounded-lg bg-surface-2 px-3 py-2 font-mono text-[12px] leading-6 text-foreground">
                    <code>{item.applyGuide.command}</code>
                  </pre>
                ) : null}
                <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.applyGuide.note}</p>
              </div>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center font-mono text-xs text-accent hover:underline"
              >
                GitHub 에서 열기 ↗
              </a>
            </article>
          ))}
        </div>

        <Callout tone="tip" title="이 페이지를 어떻게 쓰시면 가장 좋은가">
          <p>
            처음이시면 <strong>1번 (ECC)</strong> 또는 <strong>2번 (Superpowers)</strong> 중 하나를
            골라 보십시오. 두 개 모두 “당장 쓸 수 있는 검증된 묶음” 입니다. 5번 (awesome-claude-code) 와
            9번 (VoltAgent subagents) 은 큐레이션 리스트라 자기 팀에 맞는 부분만 골라 가져가시면 됩니다.
            나머지는 특정 사용 시나리오에 강점이 있으니 상황에 맞춰 보시면 됩니다.
          </p>
        </Callout>

        <ProseHeading level={2}>이 사이트와 어떻게 연결되나요</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            href="/catalog/skills"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">카탈로그 — 스킬</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              위 레포에서 가져온 스킬 패턴이 자기 저장소에서 어떻게 보이는지 카탈로그에서 같이 비교해
              보실 수 있습니다.
            </p>
          </Link>
          <Link
            href="/reference/open-source-stack"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">오픈소스 스택</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              하네스 레포 외에 OpenCode, OpenHands, Aider 같은 오픈소스 에이전트 도구와 오픈 모델까지
              함께 보고 싶을 때 이 페이지로 이어가시면 됩니다.
            </p>
          </Link>
          <Link
            href="/reference"
            className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="text-lg font-semibold text-foreground">참고자료 인덱스</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              공식 자료 맵, 보안, 비용, 운영 패턴까지 다섯 묶음으로 정리한 참고자료 인덱스입니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
