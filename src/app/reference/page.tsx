import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import {
  recentReferenceHighlights,
  referenceReadingPaths,
  referenceSections,
  type ReferenceCard,
} from "@/lib/reference-content";

export const metadata = {
  title: "참고자료",
  description:
    "이 사이트를 만들면서 참고하거나 함께 살펴볼 만한 공식 문서, 운영 가이드, 외부 원전 자료 모음입니다.",
};

function ReferenceGrid({
  items,
}: {
  items: readonly ReferenceCard[];
}) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const Wrapper = item.external
          ? ({ children }: { children: React.ReactNode }) => (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
              >
                {children}
              </a>
            )
          : ({ children }: { children: React.ReactNode }) => (
              <Link
                href={item.href}
                className="group flex h-full flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
              >
                {children}
              </Link>
            );

        return (
          <Wrapper key={item.href}>
            <span className="self-start rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-foreground-muted">
              {item.badge}
            </span>
            <h3 className="font-sans text-lg font-medium text-foreground">{item.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-foreground-muted">{item.summary}</p>
            <span className="mt-2 font-mono text-xs text-foreground-subtle transition group-hover:text-accent-2">
              {item.external ? "원문 열기 ↗" : "자세히 보기 →"}
            </span>
          </Wrapper>
        );
      })}
    </div>
  );
}

export default function ReferenceIndexPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료</ProseEyebrow>
        <ProseHeading level={1}>공식 문서, 운영 가이드, 외부 원전</ProseHeading>
        <ProseParagraph>
          이 사이트는 사실 기반으로 작성됩니다. 그래서 참고자료도 한 리스트로 쌓기보다, 어떤 목적의
          자료인지에 따라 묶어서 보는 편이 더 좋습니다. 아래에서는 공식 자료 맵, 보안과 Zero Trust,
          비용과 관측성, 운영 패턴, 외부 컬렉션 다섯 묶음으로 분리해 두었습니다.
        </ProseParagraph>

        {/* 최근 추가된 페이지 highlight */}
        <section className="mt-10 rounded-2xl border border-accent/40 bg-accent/[0.04] p-6 sm:p-8">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-2">
              최근 추가
            </p>
            <p className="font-mono text-[11px] text-foreground-muted">
              주요 참고 페이지 5개
            </p>
          </div>
          <h2 className="mt-3 font-serif text-2xl tracking-tight text-foreground sm:text-[28px]">
            가장 많이 찾는 자료
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {recentReferenceHighlights.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col gap-2 rounded-lg border border-border bg-surface p-4 transition hover:border-accent"
                >
                  <span className="font-sans text-base font-semibold text-foreground">
                    {item.title}
                  </span>
                  <span className="text-sm leading-6 text-foreground-muted">{item.note}</span>
                  <span className="mt-1 font-mono text-[11px] text-accent-2 transition group-hover:underline">
                    {item.href}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* 목적별 읽는 순서 */}
        <section className="mt-10">
          <ProseHeading level={2}>목적에 따라 읽는 순서</ProseHeading>
          <ProseParagraph>
            필요에 따라 다음 세 가지 순서 중 하나로 읽으시면 가장 빠릅니다. 각 카드의 단계는
            그대로 클릭해서 따라가실 수 있습니다.
          </ProseParagraph>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {referenceReadingPaths.map((path) => (
              <article
                key={path.title}
                className="flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5"
              >
                <h3 className="font-sans text-base font-semibold text-foreground">{path.title}</h3>
                <p className="text-sm leading-6 text-foreground-muted">{path.description}</p>
                <ol className="mt-1 space-y-1.5">
                  {path.steps.map((href, idx) => (
                    <li key={href} className="flex items-baseline gap-2">
                      <span className="font-mono text-[11px] text-foreground-subtle">
                        {idx + 1}.
                      </span>
                      <Link
                        href={href}
                        className="font-mono text-[12px] text-accent hover:underline"
                      >
                        {href}
                      </Link>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        {referenceSections.map((section, index) => (
          <section key={section.id} className="mt-14">
            <ProseHeading level={2}>{`${index + 1}. ${section.title}`}</ProseHeading>
            <ProseParagraph>{section.description}</ProseParagraph>
            <ReferenceGrid items={section.items} />
          </section>
        ))}
      </Prose>
    </div>
  );
}
