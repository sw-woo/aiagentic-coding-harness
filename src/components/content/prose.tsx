import * as React from "react";
import { cn } from "@/lib/utils";

type ProseProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide";
};

/**
 * 긴 글(에세이) 본문을 위한 serif 래퍼입니다.
 * Newsreader 폰트, 1.75 line-height, 68ch 측정 폭을 기본으로 사용합니다.
 */
export function Prose({ children, className, size = "default" }: ProseProps) {
  return (
    <article
      className={cn(
        "mx-auto px-4 font-serif text-[18px] leading-[1.75] text-foreground",
        size === "default" ? "max-w-[68ch]" : "max-w-[80ch]",
        className,
      )}
    >
      {children}
    </article>
  );
}

/**
 * 본문 위에 사용할 라벨 / 카테고리 표시입니다.
 */
export function ProseEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-foreground-muted">
      <span aria-hidden="true" className="inline-block h-1 w-6 bg-accent" />
      {children}
    </p>
  );
}

/**
 * 본문 헤드라인입니다. serif, tight tracking.
 */
export function ProseHeading({
  children,
  level = 1,
  id,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  id?: string;
}) {
  const className =
    level === 1
      ? "font-serif text-4xl leading-tight tracking-tight text-foreground sm:text-5xl"
      : level === 2
        ? "mt-14 font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        : "mt-10 font-sans text-xl font-semibold tracking-tight text-foreground";
  if (level === 1) return <h1 id={id} className={className}>{children}</h1>;
  if (level === 2) return <h2 id={id} className={className}>{children}</h2>;
  return <h3 id={id} className={className}>{children}</h3>;
}

/**
 * 본문 단락입니다. serif 본문 톤으로, 단락 간 여백을 조절합니다.
 */
export function ProseParagraph({ children }: { children: React.ReactNode }) {
  return <p className="mt-5 font-serif leading-[1.85] text-foreground">{children}</p>;
}

/**
 * 본문 인용구입니다. 좌측 액센트 보더 + 살짝 어두운 surface 배경.
 */
export function ProseQuote({
  children,
  cite,
}: {
  children: React.ReactNode;
  cite?: { label: string; href?: string };
}) {
  return (
    <blockquote className="mt-8 rounded-r-md border-l-4 border-accent bg-surface/60 px-5 py-4 font-serif text-foreground">
      <div className="text-foreground">{children}</div>
      {cite ? (
        <footer className="mt-3 text-xs font-sans text-foreground-muted">
          {cite.href ? (
            <a href={cite.href} target="_blank" rel="noreferrer" className="hover:text-accent-2">
              {cite.label} ↗
            </a>
          ) : (
            cite.label
          )}
        </footer>
      ) : null}
    </blockquote>
  );
}
