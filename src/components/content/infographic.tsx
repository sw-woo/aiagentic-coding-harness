import Image from "next/image";
import Link from "next/link";

type InfographicProps = {
  src: string;
  alt: string;
  caption: string;
  source?: { label: string; href?: string };
  width?: number;
  height?: number;
  maxDisplayWidth?: number;
};

/**
 * Essay 본문에 NotebookLM 으로 생성한 infographic 을 삽입할 때 사용하는 컴포넌트입니다.
 * 출처 라벨과 caption 을 함께 표시해 사이트의 사실 기반 원칙을 따릅니다.
 */
export function Infographic({
  src,
  alt,
  caption,
  source,
  width = 1536,
  height = 2752,
  maxDisplayWidth = 980,
}: InfographicProps) {
  return (
    <figure className="my-12 rounded-lg border border-border bg-surface">
      <div className="relative flex justify-center bg-background p-4 sm:p-6">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={`(min-width: 1280px) ${Math.min(maxDisplayWidth, width)}px, (min-width: 768px) 80vw, 100vw`}
          className="h-auto w-auto max-w-full rounded-md border border-border object-contain"
          style={{ maxWidth: `${Math.min(maxDisplayWidth, width)}px` }}
          quality={100}
          unoptimized
          priority={false}
        />
      </div>
      <figcaption className="space-y-1 border-t border-border bg-surface-2 px-5 py-3 font-sans text-xs text-foreground-muted">
        <p className="text-foreground">{caption}</p>
        <p className="font-mono text-foreground-subtle">
          텍스트가 작게 보이면 원본 크게 보기로 확인하시는 편이 좋습니다.
        </p>
        <p className="font-mono text-foreground-subtle">
          <Link href={src} target="_blank" rel="noreferrer" className="hover:text-accent-2">
            원본 크게 보기 ↗
          </Link>
        </p>
        {source ? (
          <p className="font-mono text-foreground-subtle">
            출처:{" "}
            {source.href ? (
              <a
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent-2"
              >
                {source.label} ↗
              </a>
            ) : (
              source.label
            )}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}
