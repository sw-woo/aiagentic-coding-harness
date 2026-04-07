import { siteConfig } from "@/lib/site-config";

/**
 * 사이트 하단 푸터입니다.
 * 최소한의 소개와 외부 링크만 유지합니다.
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
            에이전틱 코딩 하네스를 설계하고 운영할 때 필요한 구조, 자료, 플레이북을 한곳에 정리했습니다.
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
        </nav>
      </div>
    </footer>
  );
}
