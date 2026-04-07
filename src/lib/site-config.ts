/**
 * 사이트 전역 설정
 * - 한국어 사용자가 보는 정보 공유 사이트
 * - 출처 https://www.innogrid.com/pr/ci 의 CI 컬러를 액센트로 사용합니다.
 */
export const siteConfig = {
  name: "에이전틱 코딩 하네스",
  shortName: "agentic-harness",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiagentic-coding-harness.vercel.app",
  description:
    "에이전틱 코딩 하네스의 살아있는 견본입니다. Karpathy 방법론, 멀티 에이전트 오케스트레이션, Innogrid AIOps/MLOps 플랫폼을 만들면서 검증한 패턴을 사실 기반으로 정리합니다.",
  repo: "https://github.com/sw-woo/aiagentic-coding-harness",
  organization: "Innogrid",
  organizationUrl: "https://www.innogrid.com",
  ciSourceUrl: "https://www.innogrid.com/pr/ci",
} as const;

export type SiteConfig = typeof siteConfig;
