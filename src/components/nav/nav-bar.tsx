import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/site-config";

/**
 * lucide-react 1.7.0 에는 Github 아이콘 export 가 빠져 있어, 공식 GitHub octicon 을 inline SVG 로 사용합니다.
 */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>
  );
}

const NAV_ITEMS = [
  { href: "/manifesto", label: "선언문" },
  { href: "/methodology/karpathy", label: "방법론" },
  { href: "/architecture/overview", label: "아키텍처" },
  { href: "/catalog/skills", label: "카탈로그" },
  { href: "/playbook/setup-claude-code", label: "플레이북" },
] as const;

/**
 * 사이트 상단 고정 네비게이션입니다.
 * - 좌측: 로고 + 버전 칩
 * - 가운데: 주요 섹션 링크 (md 이상)
 * - 우측: GitHub + 테마 토글
 */
export function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[color-mix(in_oklab,var(--background)_82%,transparent)] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--background)_70%,transparent)]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-foreground"
        >
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-sm bg-accent"
          />
          {siteConfig.shortName}
          <span className="ml-2 hidden rounded-sm border border-border px-1.5 py-0.5 text-[10px] font-normal text-foreground-muted sm:inline-block">
            v0.1
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="주요 섹션">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 저장소 열기"
            className="hidden h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground-muted transition hover:border-accent hover:text-foreground sm:inline-flex"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
