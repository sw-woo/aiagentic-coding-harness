import Link from "next/link";

type PrincipleCardProps = {
  number: string;
  title: string;
  description: string;
  href: string;
  hint?: string;
};

/**
 * 랜딩 페이지 카드 단위입니다.
 * 라이트 배경에서도 밀도 있게 읽히도록 대비와 간격을 정리합니다.
 */
export function PrincipleCard({ number, title, description, href, hint }: PrincipleCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[220px] flex-col gap-3 rounded-2xl border border-border bg-surface p-7 shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-accent"
    >
      <span className="font-mono text-xs tracking-[0.18em] text-foreground-subtle">{number}</span>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-sm leading-7 text-foreground-muted">{description}</p>
      <div className="mt-auto flex items-center justify-between pt-4 text-xs">
        {hint ? <span className="font-mono text-foreground-subtle">{hint}</span> : <span />}
        <span aria-hidden="true" className="font-mono text-foreground-subtle transition group-hover:text-accent-2">
          →
        </span>
      </div>
    </Link>
  );
}
