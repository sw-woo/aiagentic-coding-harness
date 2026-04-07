import Link from "next/link";

type PrincipleCardProps = {
  number: string;
  title: string;
  description: string;
  href: string;
  hint?: string;
};

/**
 * 랜딩 페이지의 4-up 카드 단위입니다.
 * 마우스 hover 시 액센트 보더로 약하게 강조합니다.
 */
export function PrincipleCard({ number, title, description, href, hint }: PrincipleCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 rounded-lg border border-border bg-surface p-6 transition hover:border-accent"
    >
      <span className="font-mono text-xs text-foreground-subtle">{number}</span>
      <h3 className="font-sans text-lg font-medium text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-foreground-muted">{description}</p>
      <div className="mt-auto flex items-center justify-between pt-4 text-xs">
        {hint ? <span className="font-mono text-foreground-subtle">{hint}</span> : <span />}
        <span aria-hidden="true" className="font-mono text-foreground-subtle transition group-hover:text-accent-2">
          →
        </span>
      </div>
    </Link>
  );
}
