import type { Metadata } from "next";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
  ProseQuote,
} from "@/components/content/prose";

const SOURCE_URL =
  "https://www.linkedin.com/pulse/getting-started-codex-best-practices-better-results-derrick-choi-d2pwe/";

export const metadata: Metadata = {
  title: "Codex 모범 사례",
  description:
    "Derrick Choi의 LinkedIn 기사 ‘Getting started with Codex: Best practices for better results’를 한국어 존댓말로 정리한 요약 페이지입니다.",
};

function ArticleQuote({
  english,
  korean,
}: {
  english: string;
  korean: string;
}) {
  return (
    <ProseQuote
      cite={{
        label: "Derrick Choi, LinkedIn, Published Mar 9, 2026",
        href: SOURCE_URL,
      }}
    >
      <p lang="en" className="leading-relaxed text-foreground">
        {english}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
        번역: {korean}
      </p>
    </ProseQuote>
  );
}

function CodeExample({ children }: { children: string }) {
  return (
    <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface px-4 py-4 text-sm leading-6 text-foreground">
      <code>{children}</code>
    </pre>
  );
}

export default function CodexBestPracticesPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>방법론 · Codex</ProseEyebrow>
        <ProseHeading level={1}>Codex 베스트 프랙티스</ProseHeading>
        <p className="mt-4 font-serif text-lg text-foreground-muted">
          Derrick Choi가 LinkedIn에 공개한 Codex 입문 가이드를 기사 구조 그대로 정리했습니다.
          링크드인 페이지에는 2026년 3월 9일 게시로 표시되며, 사용 환경에 따라 2026년 3월 10일로
          보실 수도 있습니다.
        </p>

        <ProseHeading level={2}>도입</ProseHeading>
        <ProseParagraph>
          이 글은 OpenAI Codex PM인 Derrick Choi가 새 사용자에게 “무엇을 먼저 익혀야
          하는가”를 한 번에 설명하는 입문용 정리입니다. 핵심 메시지는 단순합니다. Codex를
          한 번 쓰고 끝내는 도구가 아니라, 설정과 지침과 검증 루프를 함께 키워 가는 팀원처럼
          다루면 품질이 급격히 안정된다는 점입니다. 기사 범위도 넓습니다. 프롬프트 구조,
          계획 모드, AGENTS.md, 설정 파일, 리뷰 루프, MCP, skill, automation, 세션 제어까지
          실제 운영 습관을 순서대로 훑습니다.
        </ProseParagraph>
        <ProseParagraph>
          이 페이지는 원문을 한국어 존댓말로 충실하게 요약하되, 영어 원문은 짧게 직접 인용하고
          아래에 한국어 풀이를 덧붙였습니다. 링크는{" "}
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            LinkedIn 원문
          </a>
          입니다.
        </ProseParagraph>
        <ArticleQuote
          english="This guide will help you get better results faster."
          korean="이 가이드는 더 빠르게 더 나은 결과를 얻도록 돕겠다는 뜻입니다."
        />
        <CodeExample>{`# 기사 원문
open "${SOURCE_URL}"`}</CodeExample>

        <ProseHeading level={2}>
          1. 강력한 첫 사용을 위한 컨텍스트와 프롬프트
        </ProseHeading>
        <ProseParagraph>
          기사에서 첫 번째로 강조하는 것은 완벽한 프롬프트 문학이 아니라, 작업 컨텍스트를
          구조화해서 주는 습관입니다. Derrick Choi는 기본 골격으로 Goal, Context,
          Constraints, Done when 네 가지를 권합니다. 무엇을 바꾸려는지, 어떤 파일과 문서가
          중요한지, 어떤 규칙을 따라야 하는지, 무엇이 완료 조건인지가 분명하면 Codex가
          추측할 여지가 줄어듭니다. 특히 큰 저장소나 위험도가 높은 변경에서는 이 구조가 범위를
          지키게 해 주고, 결과물을 더 쉽게 리뷰하고 검증할 수 있게 만듭니다.
        </ProseParagraph>
        <ProseParagraph>
          기사에서는 reasoning level도 작업 난이도에 따라 선택하라고 합니다. 쉬운 일에는 낮게,
          디버깅이나 복잡한 수정에는 Medium 또는 High, 장시간 추론이 필요한 작업에는 Extra
          High를 쓰라는 식입니다. 요점은 “좋은 프롬프트는 장식이 아니라 작업 계약서”라는
          데 있습니다.
        </ProseParagraph>
        <ArticleQuote
          english="This helps Codex stay scoped, make fewer assumptions, and produce work that is easier to review and validate."
          korean="이 구조는 Codex가 범위를 지키고, 가정을 줄이고, 리뷰와 검증이 쉬운 결과를 내도록 돕습니다."
        />
        <CodeExample>{`Goal: src/app/methodology/codex-best-practices/page.tsx 페이지를 작성합니다.
Context: 기사 원문, src/components/content/prose.tsx, 기존 methodology 페이지 패턴
Constraints: Next.js 16 서버 컴포넌트, 한국어 존댓말, 단일 파일만 수정
Done when: 빌드 가능한 TSX 페이지가 생성되고 출처/인용/체크리스트가 모두 반영됩니다.`}</CodeExample>

        <ProseHeading level={2}>2. 어려운 작업은 먼저 계획하기</ProseHeading>
        <ProseParagraph>
          두 번째 조언은 복잡하거나 애매한 일에서 곧바로 코딩부터 하지 말라는 것입니다.
          기사에서는 먼저 계획하게 하면 실수를 줄일 수 있다고 설명합니다. 가장 쉬운 방법은
          Plan mode를 켜는 것이고, CLI에서는 <code>/plan</code> 으로, 앱에서는
          <code>Shift+Tab</code> 으로 진입할 수 있다고 적습니다. 이렇게 하면 Codex가 맥락을
          더 모으고, 질문을 던지고, 구현 전에 실행 계획을 세우게 됩니다.
        </ProseParagraph>
        <ProseParagraph>
          아이디어는 있는데 설명이 흐릿하다면 “먼저 저를 인터뷰해 달라”고 요청하라고도
          권합니다. 더 긴 작업에서는 <code>PLANS.md</code> 같은 템플릿을 두고 그것을 따르게
          하는 방식도 소개합니다. 즉, 계획은 출력 전 단계가 아니라 실패 비용을 낮추는
          제어장치입니다. 작은 수정이 아니라 여러 파일, 여러 의사결정, 여러 이해관계가
          엮이는 작업일수록 이 단계를 먼저 거치는 편이 낫습니다.
        </ProseParagraph>
        <ArticleQuote
          english="If the task is complex, ambiguous, or hard to describe clearly, ask Codex to plan before it starts coding."
          korean="작업이 복잡하거나 모호하거나 설명하기 어렵다면, 코딩 전에 먼저 계획하게 하라는 뜻입니다."
        />
        <CodeExample>{`/plan

Interview me first.
Challenge my assumptions, turn this vague feature request into a concrete plan,
and write a short PLANS.md outline before you touch code.`}</CodeExample>

        <ProseHeading level={2}>3. AGENTS.md 로 반복되는 지침 재사용</ProseHeading>
        <ProseParagraph>
          세 번째 섹션은 한 번 효과가 있었던 지침을 더 이상 매번 프롬프트에 붙여 넣지 말고
          AGENTS.md로 승격하라는 내용입니다. Derrick Choi는 AGENTS.md를 “에이전트를 위한
          README”처럼 보라고 설명합니다. 저장소 구조, 실행 방법, 빌드·테스트·린트 명령,
          엔지니어링 규칙, 금지 사항, 완료 정의, 검증 방식까지 기록해 두면 Codex가 다음
          세션에서도 같은 기준으로 움직일 수 있습니다. 길고 추상적인 선언보다 짧고 정확한
          운영 문서가 낫다는 점도 분명히 짚습니다.
        </ProseParagraph>
        <ProseParagraph>
          계층 구조도 중요합니다. 개인 기본값은 <code>~/.codex/AGENTS.md</code>, 저장소
          공통 규칙은 루트 AGENTS.md, 더 깊은 폴더에는 더 구체적인 로컬 규칙을 둘 수 있으며,
          가까운 파일이 우선한다고 설명합니다. CLI의 <code>/init</code> 은 초안을 만드는
          빠른 시작점일 뿐이고, 반드시 팀의 실제 작업 방식에 맞게 다듬어야 한다는 점이
          핵심입니다.
        </ProseParagraph>
        <ArticleQuote
          english="Think of AGENTS.md as a README for agents."
          korean="AGENTS.md를 에이전트를 위한 README로 보시면 된다는 뜻입니다."
        />
        <CodeExample>{`/init

# AGENTS.md 예시
- 빌드: pnpm build
- 린트: pnpm lint
- 완료 조건: 관련 페이지가 렌더링되고 출처가 명시되어야 함
- 금지: 임의 인용 생성 금지`}</CodeExample>

        <ProseHeading level={2}>4. 일관된 동작을 위한 Codex 설정</ProseHeading>
        <ProseParagraph>
          네 번째 조언은 설정 파일을 통해 세션 간 일관성을 확보하라는 것입니다. 기사에서는
          개인 기본 설정은 <code>~/.codex/config.toml</code> 에, 저장소별 동작은
          <code>.codex/config.toml</code> 에 두고, CLI 플래그는 예외적 일회성 상황에서만
          덮어쓰라고 권합니다. 여기에는 모델 기본값, reasoning effort, sandbox mode,
          approval policy, profile, MCP, 실험 기능 같은 지속 설정이 들어갑니다.
        </ProseParagraph>
        <ProseParagraph>
          특히 초보자라면 권한을 보수적으로 시작하라는 조언이 명확합니다. 승인 정책과
          샌드박스를 기본적으로 타이트하게 두고, 신뢰 가능한 저장소나 이미 이해한 워크플로에서만
          점진적으로 열라는 뜻입니다. 기사 요점은 많은 품질 문제의 원인이 모델 자체보다 잘못된
          작업 디렉터리, 쓰기 권한 부족, 도구 부재 같은 “설정 문제”일 수 있다는 점입니다.
        </ProseParagraph>
        <ArticleQuote
          english="Configuration is one of the main ways to make Codex behave more consistently across sessions and surfaces."
          korean="설정은 세션과 제품 표면을 가로질러 Codex의 동작을 더 일관되게 만드는 주요 수단이라는 뜻입니다."
        />
        <CodeExample>{`# ~/.codex/config.toml
model = "gpt-5.4"
reasoning_effort = "medium"

# .codex/config.toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"`}</CodeExample>

        <ProseHeading level={2}>5. 테스트·검증·리뷰 루프</ProseHeading>
        <ProseParagraph>
          다섯 번째 섹션은 “수정 요청”에서 끝내지 말고 테스트와 검증과 리뷰까지 하나의 루프로
          요구하라는 이야기입니다. 변경이 있으면 필요한 테스트를 만들거나 고치고, 맞는 테스트
          스위트를 돌리고, 린트와 타입 체크를 확인하고, 최종 동작이 요청과 일치하는지 검증하고,
          diff를 다시 검토해 버그와 회귀를 찾게 해야 한다는 것입니다. Codex는 이 전 과정을
          도와줄 수 있지만, 무엇이 좋은 결과인지 기준을 알려 줘야 합니다.
        </ProseParagraph>
        <ProseParagraph>
          기사에서는 <code>/review</code> 명령도 강조합니다. 기준 브랜치 대비 PR 스타일
          리뷰, 미커밋 변경 검토, 특정 커밋 리뷰, 사용자 지정 리뷰 지침을 모두 지원한다고
          설명합니다. 그리고 팀 차원에서는 <code>code_review.md</code> 를 AGENTS.md에서
          참조하게 하면 저장소마다 리뷰 행동을 일관되게 만들 수 있다고 권합니다.
        </ProseParagraph>
        <ArticleQuote
          english="Codex should not just generate code."
          korean="Codex는 코드만 만들어 내는 도구에 머물면 안 된다는 뜻입니다."
        />
        <CodeExample>{`/review main

# code_review.md 예시
- 회귀 가능성이 있는 조건 분기 확인
- 테스트 공백 확인
- 타입 안전성 및 예외 경로 확인`}</CodeExample>

        <ProseHeading level={2}>6. MCP 로 외부 도구 연결</ProseHeading>
        <ProseParagraph>
          여섯 번째 섹션은 필요한 맥락이 저장소 밖에 있을 때는 복사해서 붙여 넣기보다 MCP를
          쓰라고 권합니다. Model Context Protocol은 Codex가 외부 도구와 시스템에 연결되는
          개방형 표준이며, 라이브 정보가 자주 바뀌거나 여러 사용자와 프로젝트에 반복 가능한
          통합이 필요할 때 특히 가치가 있습니다. 기사 기준으로 Codex는 STDIO 서버와 OAuth를
          포함한 Streamable HTTP 서버를 지원합니다.
        </ProseParagraph>
        <ProseParagraph>
          중요한 점은 “도구를 많이 다는 것”이 아니라 “실제 수작업 루프를 지워 주는 도구를
          먼저 다는 것”입니다. 앱에서는 Settings의 MCP servers에서 보거나 설치를 도와달라고
          요청할 수 있고, CLI에서는 <code>codex mcp add</code> 로 직접 추가할 수 있다고
          설명합니다. 즉, MCP는 지식을 더 많이 넣는 방법이 아니라, 최신의 진짜 맥락에 접속하게
          만드는 방법입니다.
        </ProseParagraph>
        <ArticleQuote
          english="Use MCPs when the context Codex needs lives outside the repo."
          korean="Codex에 필요한 맥락이 저장소 밖에 있을 때 MCP를 쓰라는 뜻입니다."
        />
        <CodeExample>{`codex mcp add github https://mcp.example.com/github \
  --oauth

# 또는 stdio 서버 등록 예시
codex mcp add local-db stdio://node ./scripts/mcp-db-server.js`}</CodeExample>

        <ProseHeading level={2}>7. 반복 워크플로를 skill 로 패키지화</ProseHeading>
        <ProseParagraph>
          일곱 번째 섹션은 반복 프롬프트를 더 길게 쓰지 말고 skill로 묶으라는 조언입니다.
          기사에서는 <code>SKILL.md</code>, 관련 컨텍스트, 보조 로직을 함께 패키지해 CLI,
          IDE, Codex app 전반에서 재사용하라고 설명합니다. 중요한 원칙은 범위를 좁게 잡는
          것입니다. 하나의 skill은 하나의 반복 작업에 집중하고, 2~3개의 대표 use case부터
          시작하고, 입력과 출력, 언제 써야 하는지를 설명문에 분명히 적어야 합니다.
        </ProseParagraph>
        <ProseParagraph>
          또한 모든 엣지 케이스를 초기에 포괄하려 하지 말고, 먼저 대표 작업 하나를 잘 굴린 뒤
          점진적으로 개선하라고 합니다. 기사 원문은 개인 skill은 <code>$HOME/.agents/skills</code>,
          팀 공유 skill은 저장소 안 <code>.agents/skills</code> 에 두는 패턴을 권하고,
          첫 버전의 scaffold를 만드는 출발점으로 <code>$skill-creator</code> 를 직접
          추천합니다.
        </ProseParagraph>
        <ArticleQuote
          english="A good rule of thumb: if you keep reusing the same prompt or correcting the same workflow, it should probably become a skill."
          korean="같은 프롬프트를 반복해서 쓰거나 같은 워크플로를 계속 교정하게 된다면, 그것은 skill로 승격할 시점이라는 뜻입니다."
        />
        <CodeExample>{`.agents/skills/release-notes/SKILL.md

name: release-notes
description: Summarize merged PRs into release notes. Use when preparing weekly or release announcements.

# 사용 예시
$skill-creator
$release-notes`}</CodeExample>

        <ProseHeading level={2}>8. 자동화로 반복 작업 스케줄링</ProseHeading>
        <ProseParagraph>
          여덟 번째 조언은 워크플로가 충분히 안정화된 뒤에 automation으로 넘기라는 것입니다.
          기사에서는 Codex app의 Automations 탭에서 프로젝트, 프롬프트, cadence, 실행 환경을
          선택해 주기적 작업을 백그라운드에서 돌릴 수 있다고 설명합니다. 여기서 중요한 구분은
          “skill은 방법을 정의하고, automation은 일정을 정의한다”는 문장입니다. 아직 사람이
          계속 조향해야 하는 일이라면 먼저 skill로 다듬고, 예측 가능해진 뒤 자동화로 옮기라는
          흐름입니다.
        </ProseParagraph>
        <ProseParagraph>
          반복 후보로는 최근 커밋 요약, 잠재 버그 스캔, 릴리스 노트 초안, CI 실패 점검,
          스탠드업 요약이 제시됩니다. 실행 환경에서는 전용 git worktree를 선택할 수도 있고
          로컬 환경을 사용할 수도 있다고 하니, 같은 파일을 여러 live thread가 건드리는 상황을
          피하고 싶다면 worktree 기반 자동화를 우선 고려하는 편이 맞습니다.
        </ProseParagraph>
        <ArticleQuote
          english="A useful rule is that skills define the method, automations define the schedule."
          korean="유용한 규칙은 skill이 방법을, automation이 일정을 정의한다는 뜻입니다."
        />
        <CodeExample>{`Automation
project: showcase-site
prompt: "지난 24시간 커밋을 요약하고 release-notes skill을 적용하세요."
cadence: every weekday at 09:00
execution: dedicated git worktree`}</CodeExample>

        <ProseHeading level={2}>9. 세션 제어</ProseHeading>
        <ProseParagraph>
          아홉 번째 섹션은 Codex 세션을 단순 채팅 로그가 아니라 작업 스레드로 보라고 설명합니다.
          한 세션에는 컨텍스트, 결정, 행동 기록이 계속 쌓이므로, 스레드 경계를 어떻게 나누느냐가
          품질에 큰 영향을 줍니다. 기사에서는 앱 UI가 여러 작업을 관리하기 가장 쉽다고 하면서도,
          CLI에서 특히 유용한 슬래시 명령들을 따로 정리합니다. 실험 기능 토글용
          <code>/experimental</code>, 저장된 대화 재개용 <code>/resume</code>, 원본 기록을
          유지한 채 새 분기를 만드는 <code>/fork</code>, 긴 스레드를 요약하는 <code>/compact</code>,
          멀티 에이전트 전환용 <code>/agent</code>, 테마 변경용 <code>/theme</code>, 앱 연결용
          <code>/apps</code>, 세션 상태 확인용 <code>/status</code> 가 그 목록입니다.
        </ProseParagraph>
        <ProseParagraph>
          조언은 명확합니다. 같은 문제라면 같은 스레드에 남아서 추론 흔적을 보존하고, 일이
          실제로 갈라질 때만 fork 하라는 것입니다. 그리고 주 작업은 메인 에이전트에 두고,
          탐색·테스트·트리아지 같은 bounded work는 서브에이전트로 넘기라고 권합니다.
        </ProseParagraph>
        <ArticleQuote
          english="Codex sessions are not just chat history."
          korean="Codex 세션은 단순한 대화 기록이 아니라는 뜻입니다."
        />
        <CodeExample>{`/status
/fork
/compact
/agent

# 원칙
# 같은 문제면 같은 thread 유지, 진짜 분기일 때만 fork`}</CodeExample>

        <ProseHeading level={2}>10. 흔한 실수</ProseHeading>
        <ProseParagraph>
          마지막 본문 섹션에서는 초기에 자주 하는 실수를 일곱 가지로 정리합니다. 첫째,
          오래 유지할 규칙을 프롬프트에 계속 실어 나르고 AGENTS.md나 skill로 옮기지 않는 것.
          둘째, 빌드와 테스트를 어떻게 실행해야 하는지 알려 주지 않아 에이전트가 자기 결과를
          보지 못하게 만드는 것. 셋째, 다단계 복잡 작업에서 계획을 생략하는 것. 넷째, 워크플로를
          이해하기 전에 컴퓨터 전체 권한을 다 열어 주는 것. 다섯째, git worktree 없이 같은
          파일에 여러 live thread를 동시에 돌리는 것. 여섯째, 수동으로도 불안정한 작업을 너무
          일찍 automation으로 넘기는 것. 일곱째, Codex를 옆에서 한 단계씩 감시해야 하는 대상으로
          보고 병렬 작업 파트너로 쓰지 않는 것입니다.
        </ProseParagraph>
        <ProseParagraph>
          요약하면 실수의 공통 원인은 규칙의 영속화 부족, 관찰 가능성 부족, 작업 분기 관리
          실패, 자동화 시점 착오에 있습니다.
        </ProseParagraph>
        <ArticleQuote
          english="A few common mistakes to avoid when first using Codex:"
          korean="Codex를 처음 쓸 때 피해야 할 흔한 실수들이 있다는 뜻입니다."
        />
        <CodeExample>{`# 피해야 할 패턴
1. 규칙을 매번 프롬프트에만 적기
2. 테스트 명령을 알려주지 않기
3. 복잡한 작업에서 계획 생략
4. 초기부터 과한 권한 부여
5. worktree 없이 병렬 live thread 실행
6. 불안정한 작업의 조기 자동화
7. Codex를 병렬 파트너로 쓰지 않기`}</CodeExample>

        <ProseHeading level={2}>체크리스트</ProseHeading>
        <ProseParagraph>
          기사 말미의 체크리스트는 앞선 열 가지를 실제 시작 순서로 압축한 실행판입니다.
          첫째 Goal, Context, Constraints, Done when을 명확히 줍니다. 둘째 어려운 작업은
          먼저 계획하게 합니다. 셋째 starter AGENTS.md를 만듭니다. 넷째 빌드·테스트·검증·리뷰
          방식을 알려 줍니다. 다섯째 워크플로에 맞는 설정 기본값을 잡습니다. 여섯째 가치가 큰
          외부 도구에는 MCP를 연결합니다. 일곱째 반복 워크플로는 skill로 승격합니다. 여덟째
          충분히 안정된 뒤에만 automation을 겁니다. 즉, 프롬프트, 계획, 지침, 설정, 검증,
          확장, 재사용, 자동화가 순서대로 쌓여야 한다는 뜻입니다.
        </ProseParagraph>
        <ArticleQuote
          english="The more you turn your workflow, standards, and context into something Codex can use, the more you’ll see what the agent can really do."
          korean="워크플로와 기준과 컨텍스트를 Codex가 실제로 사용할 수 있는 형태로 바꿀수록, 에이전트의 실력이 더 잘 드러난다는 뜻입니다."
        />
        <ul className="mt-6 list-disc space-y-2 pl-6 font-serif text-foreground">
          <li>Goal, Context, Constraints, Done when을 먼저 적습니다.</li>
          <li>어려운 작업은 먼저 계획하게 합니다.</li>
          <li>AGENTS.md 초안을 만들고 저장소 규칙으로 다듬습니다.</li>
          <li>빌드, 테스트, 검증, 리뷰 명령을 명시합니다.</li>
          <li>config.toml 기본값을 실제 워크플로에 맞춥니다.</li>
          <li>외부 라이브 맥락이 필요한 곳에 MCP를 연결합니다.</li>
          <li>반복 작업은 skill로 패키지화합니다.</li>
          <li>안정화된 작업만 automation으로 스케줄링합니다.</li>
        </ul>

        <ProseHeading level={2}>이 저장소에 적용한 것</ProseHeading>
        <ProseParagraph>
          이 저장소를 기사 관점에서 보면, 이미 일부 조언은 강하게 반영되어 있고 일부는 아직
          “구조는 보이지만 체크인된 실체는 제한적”인 상태입니다. 루트{" "}
          <code>AGENTS.md</code> 는 Next.js 16 문서를 먼저 읽으라는 짧고 강한 규칙으로,
          반복 지침을 프롬프트 밖으로 빼라는 기사 3번 조언과 정확히 맞닿아 있습니다. 또한
          저장소 안에는 <code>.omx/</code> 상태 파일과 <code>data/catalog/hooks.json</code>
          이 있어, 세션 상태와 hook 카탈로그를 명시적으로 추적하는 운영 습관이 보입니다.
        </ProseParagraph>
        <ProseParagraph>
          반면 기사 4번에서 말한 <code>.codex/config.toml</code> 은 현재 루트 기준으로
          보이지 않았습니다. 따라서 이 페이지에서는 “저장소에 설정 철학이 없다”가 아니라,
          AGENTS와 OMX 상태, hook 카탈로그는 확인되지만 repo-local Codex 설정 파일은 현재
          체크인본에서 직접 확인되지 않았다고 정리하는 편이 정확합니다. skill도 저장소 안
          <code>.agents/skills</code> 나 <code>.codex</code> 디렉터리로는 보이지 않았고,
          대신 hook 카탈로그가 <code>.codex/hooks.json</code> 경로를 참조하고 있어 향후
          Codex 전용 운영 레이어를 둘 자리는 이미 설계되어 있다고 볼 수 있습니다.
        </ProseParagraph>
        <ArticleQuote
          english="Guidance stays practical and based on real friction."
          korean="지침은 실제 마찰에서 나온 실용적인 내용이어야 한다는 뜻입니다."
        />
        <ul className="mt-6 list-disc space-y-2 pl-6 font-serif text-foreground">
          <li>AGENTS.md: Next.js 16 관련 핵심 주의사항을 짧게 고정합니다.</li>
          <li>.codex/config.toml: 기사상 권장 대상이지만, 현재 체크인본에서는 직접 확인되지 않았습니다.</li>
          <li>skills: 저장소 내부 skill 디렉터리는 보이지 않았고, skill 패턴은 향후 확장 지점으로 남아 있습니다.</li>
          <li>hooks: <code>data/catalog/hooks.json</code> 이 Codex/Claude hook 경로와 스크립트를 카탈로그화합니다.</li>
          <li>.omx state: 세션 제어와 상태 지속성은 이미 운용 중인 흔적이 있습니다.</li>
        </ul>

        <ProseHeading level={2}>Sources</ProseHeading>
        <ul className="mt-6 list-disc space-y-2 pl-6 font-serif text-foreground">
          <li>
            Derrick Choi, “Getting started with Codex: Best practices for better results,”
            LinkedIn, Published Mar 9, 2026.{" "}
            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              {SOURCE_URL}
            </a>
          </li>
        </ul>
      </Prose>
    </div>
  );
}
