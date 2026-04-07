import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

/**
 * 사이트 하단 푸터입니다.
 * 로고, 출처 안내, 그리고 사실 기반 작성 원칙을 명시합니다.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 text-sm text-foreground-muted sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-foreground">
            <span aria-hidden="true" className="mr-2 inline-block h-2 w-2 rounded-sm bg-accent" />
            {siteConfig.shortName}
          </p>
          <p className="max-w-md text-foreground-muted">
            {siteConfig.organization} AIOps/MLOps 플랫폼을 만들면서 검증한 에이전틱 코딩 하네스의 견본입니다.
            모든 사실 주장은 출처가 있고, 출처가 없는 부분은 명시해 두었습니다.
          </p>
        </div>

        <nav aria-label="푸터 링크" className="flex flex-col gap-2 md:items-end">
          <a
            href={siteConfig.repo}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-foreground"
          >
            소스 저장소 ↗
          </a>
          <a
            href={siteConfig.organizationUrl}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-foreground"
          >
            Innogrid ↗
          </a>
          <Link href="/manifesto" className="transition hover:text-foreground">
            선언문 다섯 가지 원칙
          </Link>
          <a
            href={siteConfig.ciSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-foreground-subtle transition hover:text-foreground"
          >
            액센트 컬러 출처: Innogrid CI
          </a>
        </nav>
      </div>
    </footer>
  );
}
