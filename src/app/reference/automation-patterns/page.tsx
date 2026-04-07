import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { CodeBlock } from "@/components/content/code-block";
import { Callout } from "@/components/content/callout";

const SOURCE_LINKS = [
  { label: "Wikidocs: Headless 모드와 스크립트", href: "https://wikidocs.net/332179" },
  { label: "OpenAI Codex 홈", href: "https://developers.openai.com/codex/" },
  { label: "OpenAI Codex Use cases", href: "https://developers.openai.com/codex/use-cases" },
  { label: "OpenAI Config Reference", href: "https://developers.openai.com/codex/config-reference" },
] as const;

export const metadata: Metadata = {
  title: "에이전트 자동화 패턴",
  description:
    "headless 실행, 구조화된 출력, 최소 권한 승인, 세션 이어가기, CI/CD 통합 같은 자동화 패턴을 정리한 참고 페이지입니다.",
};

export default function AutomationPatternsPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Automation</ProseEyebrow>
        <ProseHeading level={1}>에이전트 자동화 패턴</ProseHeading>
        <ProseParagraph>
          링크해주신 위키독스 문서에서 가장 좋은 부분은 “대화형 사용법”을 넘어서, 자동화 파이프라인에서 에이전트를 어떻게 다뤄야 하는지
          패턴으로 설명한다는 점입니다. 이 페이지는 그중 실제로 우리 사이트에 가져올 가치가 큰 패턴만 추려 정리한 것입니다.
        </ProseParagraph>

        <Callout tone="warning" title="중요한 구분">
          <p>
            아래 내용은 <strong>개념과 운영 패턴</strong> 을 가져온 것입니다. CLI 옵션 이름이나 세부 문법은 제품마다 다를 수 있습니다.
            특히 위키독스 페이지의 예시는 Claude Code 기준이므로, Codex 쪽에 그대로 복붙하면 안 됩니다.
          </p>
        </Callout>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <ProseHeading level={2}>1. headless 실행은 반드시 별도 패턴으로 생각합니다</ProseHeading>
        <ProseParagraph>
          자동화에서 가장 중요한 변화는 “대화형 세션”이 아니라 “스크립트나 CI가 에이전트를 호출한다”는 점입니다.
          이때는 프롬프트 문장보다 <strong>입력/출력 계약</strong>, <strong>허용된 도구 범위</strong>, <strong>실패 시 재시도 정책</strong> 이 더 중요합니다.
        </ProseParagraph>
        <CodeBlock filename="headless 작업 체크리스트" language="text">
{`1. 입력은 짧고 구조화된 task contract 로 준다
2. 출력은 사람이 읽는 문장보다 기계가 파싱할 수 있는 형식도 같이 고려한다
3. 허용 도구 범위를 최소화한다
4. 실패 시 재현 가능한 로그를 남긴다
5. 성공/실패를 CI나 wrapper가 판단할 수 있게 만든다`}
        </CodeBlock>

        <ProseHeading level={2}>2. 구조화된 출력이 중요합니다</ProseHeading>
        <ProseParagraph>
          위키독스 문서에서 특히 가져올 만한 부분은 “JSON 출력과 스키마 강제” 관점입니다. 자동화된 환경에서는 자연어 한 단락보다
          <strong>구조화된 결과</strong> 가 더 중요합니다. 예를 들어 파일 목록, 검증 결과, 리스크 분류, 수정 추천 목록은
          나중에 다른 스크립트나 대시보드가 읽을 수 있는 구조로 남기는 편이 좋습니다.
        </ProseParagraph>
        <CodeBlock filename="구조화된 출력 예시" language="json">
{`{
  "task": "repository_review",
  "status": "needs_changes",
  "issues": [
    {
      "severity": "high",
      "file": "src/app/playbook/[slug]/page.tsx",
      "summary": "공식 자료 링크 확인 필요"
    }
  ],
  "next_actions": [
    "공식 문서 기준 링크 검증",
    "관련 reference 페이지 갱신"
  ]
}`}
        </CodeBlock>

        <ProseHeading level={2}>3. 자동화에서는 최소 권한이 더 중요합니다</ProseHeading>
        <ProseParagraph>
          대화형 세션에서는 사람이 눈으로 중간 과정을 봅니다. 하지만 headless나 CI에서는 그 안전망이 줄어듭니다.
          그래서 자동화일수록 허용 도구 범위를 더 좁게 잡아야 합니다. 이 점은 Claude든 Codex든 똑같습니다.
        </ProseParagraph>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-8 text-foreground">
          <li>읽기 전용 분석 작업은 read-only 또는 최소 read 도구만</li>
          <li>수정 작업도 특정 디렉터리와 특정 도구 범위만</li>
          <li>git push, 배포, 클러스터 변경은 자동화 대상이 아니라 승인 대상</li>
          <li>headless일수록 sandbox와 rules와 hooks를 함께 사용</li>
        </ul>

        <ProseHeading level={2}>4. 세션 이어가기보다 상태 복구가 더 중요합니다</ProseHeading>
        <ProseParagraph>
          위키독스 문서가 세션 이어가기와 resume 개념을 잘 짚고 있는 점도 좋습니다. 다만 실무에서는 세션 복원 기능 자체보다,
          <strong>상태를 외부 문서와 파일에 남기는 습관</strong> 이 더 중요합니다. 즉, handoff 문서, plan 문서, verify 스크립트,
          작업 체크리스트가 있어야 특정 런타임에 종속되지 않고 이어서 작업할 수 있습니다.
        </ProseParagraph>

        <ProseHeading level={2}>5. CI/CD 통합은 작은 자동화부터 시작합니다</ProseHeading>
        <ProseParagraph>
          위키독스 문서처럼 CI/CD 통합 패턴을 설명하는 건 매우 유용합니다. 다만 실제 도입은 “코드 전체 수정 자동화”보다
          “분석, 요약, 검증 보조”부터 시작하는 것이 안전합니다.
        </ProseParagraph>
        <CodeBlock filename="추천 자동화 순서" language="text">
{`1. 변경 요약 생성
2. lint / build / test 결과 요약
3. 보안 / 품질 리뷰 보조
4. 문서 초안 생성
5. 이후에만 제한적 수정 자동화 고려`}
        </CodeBlock>

        <ProseHeading level={2}>6. 우리 사이트에 반영할 가치가 있는 부분</ProseHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">가져올 가치가 큰 것</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              headless automation 관점, 구조화된 출력, 최소 권한 승인, 세션 복원 개념, CI/CD 연동 패턴, 스크립트 호출 예시.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">그대로 가져오면 안 되는 것</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Claude 전용 CLI 플래그, allowedTools 문법, 세션 옵션 이름, 제품 특화된 동작 가정.
            </p>
          </div>
        </div>

        <ProseHeading level={2}>7. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/reference/codex-adoption" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 도입 패턴</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              실제 설치와 선택 도입 순서를 보려면 이 페이지로 이어집니다.
            </p>
          </Link>
          <Link href="/reference/codex-hooks" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex Hooks 심화</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              동적 guardrail과 자동 검증 쪽을 더 깊게 보려면 여기로 이어집니다.
            </p>
          </Link>
          <Link href="/handbook" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              자동화 패턴을 하네스 엔지니어링 큰그림 안에서 보려면 이 페이지가 맞습니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
