/**
 * 사이트 전역 설정
 * - 한국어 사용자가 보는 에이전틱 코딩 자료 사이트
 */
export const siteConfig = {
  name: "에이전틱 코딩 하네스",
  shortName: "agentic-harness",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiagentic-coding-harness.vercel.app",
  description:
    "Karpathy 방법론, 멀티 에이전트 오케스트레이션, 그리고 실전에서 검증한 에이전틱 코딩 패턴을 정리한 자료 모음입니다.",
  repo: "https://github.com/sw-woo/aiagentic-coding-harness",
  organization: "Innogrid",
  organizationUrl: "https://www.innogrid.com",
  ciSourceUrl: "https://www.innogrid.com/pr/ci",
} as const;

export type SiteConfig = typeof siteConfig;
