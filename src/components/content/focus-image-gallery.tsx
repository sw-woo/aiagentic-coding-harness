import Image from "next/image";
import Link from "next/link";

type FocusArea = {
  label: string;
  objectPosition: string;
};

type FocusImageGalleryProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  areas: FocusArea[];
};

/**
 * 텍스트가 많은 이미지를 전체 보기 + 확대 조각 보기로 보여주는 컴포넌트입니다.
 * 원본이 아주 크지 않을 때도 페이지 안에서 읽기 쉽게 만드는 것이 목적입니다.
 */
export function FocusImageGallery({
  src,
  alt,
  width,
  height,
  areas,
}: FocusImageGalleryProps) {
  const cropHeight = Math.min(360, Math.max(220, Math.round(height * 0.34)));

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-auto max-w-full rounded-xl border border-border"
          quality={100}
          unoptimized
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {areas.map((area) => (
          <section key={area.label} className="overflow-hidden rounded-xl border border-border bg-surface">
            <div className="border-b border-border bg-surface-2 px-4 py-2">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                {area.label}
              </p>
            </div>
            <div
              className="relative w-full bg-background"
              style={{ height: `${cropHeight}px` }}
            >
              <Image
                src={src}
                alt={`${alt} - ${area.label}`}
                fill
                className="object-cover"
                style={{ objectPosition: area.objectPosition }}
                quality={100}
                unoptimized
              />
            </div>
          </section>
        ))}
      </div>

      <div className="pt-1">
        <Link
          href={src}
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs text-accent hover:underline"
        >
          원본 크게 보기 ↗
        </Link>
      </div>
    </div>
  );
}
