import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { referenceSections, type ReferenceCard } from "@/lib/reference-content";

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
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
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
          이 사이트는 사실 기반으로 작성됩니다. 그래서 참고자료도 한 리스트로 쌓기보다,
          어떤 목적의 자료인지에 따라 묶어서 보는 편이 더 좋습니다. 아래에서는 Codex 설정과 운영에 직접 필요한 자료,
          하네스 운영 패턴을 깊게 설명하는 자료, 그리고 바깥의 원전과 외부 컬렉션을 분리해 두었습니다.
        </ProseParagraph>

        {referenceSections.map((section, index) => (
          <section key={section.id} className="mt-12">
            <ProseHeading level={2}>{`${index + 1}. ${section.title}`}</ProseHeading>
            <ProseParagraph>{section.description}</ProseParagraph>
            <ReferenceGrid items={section.items} />
          </section>
        ))}
      </Prose>
    </div>
  );
}
