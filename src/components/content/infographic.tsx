import Image from "next/image";

type InfographicProps = {
  src: string;
  alt: string;
  caption: string;
  source?: { label: string; href?: string };
  width?: number;
  height?: number;
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
}: InfographicProps) {
  return (
    <figure className="my-12 overflow-hidden rounded-lg border border-border bg-surface">
      <div className="relative w-full bg-background">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-auto w-full"
          priority={false}
        />
      </div>
      <figcaption className="space-y-1 border-t border-border bg-surface-2 px-5 py-3 font-sans text-xs text-foreground-muted">
        <p className="text-foreground">{caption}</p>
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
