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

export const metadata: Metadata = {
  title: "RevFactory Harness 플러그인",
  description:
    "revfactory/harness Claude Code 플러그인의 실제 설치, 사용 방식, 생성 산출물, 관련 생태계를 확인된 저장소 기준으로 정리한 페이지입니다.",
};

export default function RevfactoryHarnessPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · RevFactory</ProseEyebrow>
        <ProseHeading level={1}>RevFactory Harness 플러그인</ProseHeading>
        <ProseParagraph>
          `revfactory/harness`는 실제로 존재하는 Claude Code 플러그인입니다. 저장소 원문 기준으로 보면, 이 플러그인은
          프로젝트 도메인에 맞는 agent team과 skill 구성을 자동으로 설계하는 <strong>메타 스킬</strong> 성격을 가집니다.
          즉, 개별 skill 하나를 제공하는 것이 아니라, 하네스 자체를 생성하는 도구입니다.
        </ProseParagraph>

        <Callout tone="note" title="확인한 범위">
          <p>저장소: `revfactory/harness`</p>
          <p>플러그인 매니페스트: `.claude-plugin/plugin.json` 존재</p>
          <p>Marketplace 설치 명령: README에 명시</p>
          <p>6가지 아키텍처 패턴과 6-Phase workflow: README에 명시</p>
          <p>추가로 CHANGELOG와 SKILL 문서에는 Phase 0 감사, Phase 7 진화 메커니즘 같은 확장 흐름이 보입니다.</p>
        </Callout>

        <ProseHeading level={2}>1. 실제 설치 방법</ProseHeading>
        <CodeBlock filename="README 기준 설치" language="bash">
{`# 1) 마켓플레이스 등록
/plugin marketplace add revfactory/harness

# 2) 플러그인 설치
/plugin install harness@harness`}
        </CodeBlock>

        <ProseParagraph>
          README는 추가로 “global skill처럼 직접 설치”하는 경로도 보여 줍니다. 즉 marketplace 없이 `skills/harness`를
          `~/.claude/skills/harness` 아래에 복사하는 방식도 가능합니다.
        </ProseParagraph>

        <ProseHeading level={2}>2. 실제 사용 방식</ProseHeading>
        <ProseParagraph>
          설치 뒤에는 복잡한 명령보다 자연어 트리거가 핵심입니다. README_KO와 SKILL 문서 둘 다
          `하네스 구성해줘`, `하네스 구축해줘`, `이 프로젝트에 맞는 에이전트 팀을 설계해줘` 같은 요청을 직접 예시로 제시합니다.
        </ProseParagraph>
        <CodeBlock filename="README / README_KO 기준 예시 프롬프트" language="text">
{`하네스 구성해줘
이 프로젝트에 맞는 에이전트 팀 구축해줘
풀스택 웹사이트 개발 하네스를 구성해줘
Build a harness for this project
Design an agent team for this domain`}
        </CodeBlock>

        <ProseHeading level={2}>3. README 기준 핵심 워크플로</ProseHeading>
        <CodeBlock filename="README 기준 6-Phase workflow" language="text">
{`Phase 1: Domain Analysis
Phase 2: Team Architecture Design (Agent Teams vs Subagents)
Phase 3: Agent Definition Generation (.claude/agents/)
Phase 4: Skill Generation (.claude/skills/)
Phase 5: Integration & Orchestration
Phase 6: Validation & Testing`}
        </CodeBlock>

        <ProseParagraph>
          주의할 점은 저장소 안의 실제 SKILL/CHANGELOG를 더 읽어보면, 운영 단계에서는 `Phase 0: 현황 감사`와
          `Phase 7: 하네스 진화` 같은 흐름도 추가되어 있다는 점입니다. 따라서 간단히 소개할 때는 “README 기준 6단계,
          내부 운영 문서까지 보면 0/7단계가 더 있다”고 설명하는 편이 가장 정확합니다.
        </ProseParagraph>

        <ProseHeading level={2}>4. 지원하는 팀 아키텍처 패턴</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>Pipeline</li>
          <li>Fan-out / Fan-in</li>
          <li>Expert Pool</li>
          <li>Producer-Reviewer</li>
          <li>Supervisor</li>
          <li>Hierarchical Delegation</li>
        </ul>

        <ProseHeading level={2}>5. 생성되는 산출물</ProseHeading>
        <CodeBlock filename="README 기준 생성 결과" language="text">
{`your-project/
└── .claude/
    ├── agents/
    │   ├── analyst.md
    │   ├── builder.md
    │   └── qa.md
    └── skills/
        ├── analyze/
        │   └── SKILL.md
        └── build/
            └── SKILL.md`}
        </CodeBlock>

        <ProseHeading level={2}>6. 관련 생태계</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            <a href="https://github.com/revfactory/harness-100" target="_blank" rel="noreferrer" className="text-accent hover:underline">
              revfactory/harness-100
            </a>
            : 100개 하네스, 한영 200패키지, 1,808개 markdown 파일
          </li>
          <li>
            <a href="https://github.com/revfactory/claude-code-harness" target="_blank" rel="noreferrer" className="text-accent hover:underline">
              revfactory/claude-code-harness
            </a>
            : 구조화된 사전 설정이 코드 에이전트 품질에 미치는 영향을 다룬 연구 저장소
          </li>
        </ul>

        <ProseHeading level={2}>7. 이 사이트에 어떻게 반영하면 좋은가</ProseHeading>
        <Callout tone="tip" title="Claude 플레이북에 넣기 좋은 내용">
          <p>설치를 먼저 보여 주고, 그 다음 자연어 프롬프트 예시를 바로 붙입니다.</p>
          <p>“이 플러그인은 하네스 자체를 생성하는 메타 스킬”이라는 점을 먼저 설명합니다.</p>
          <p>README 기준 6-Phase workflow와 6가지 아키텍처 패턴을 짧게 요약합니다.</p>
        </Callout>

        <Callout tone="warning" title="Codex 플레이북에는 그대로 일반화하면 안 됩니다">
          <p>
            현재 확인된 것은 `Claude Code` 플러그인입니다. 따라서 Codex 플레이북에는 “동등한 Codex 플러그인이 있다”고 쓰지 말고,
            대신 copy-ready starter, setup script, internal harness surface 같은 방향으로 구분해 설명하는 편이 정확합니다.
          </p>
        </Callout>

        <ProseHeading level={2}>8. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/playbook/setup-claude-code" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Claude Code 플레이북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              이 플러그인을 실제 온보딩 흐름 안에 넣어 설명하는 쪽과 연결됩니다.
            </p>
          </Link>
          <Link href="/reference/harness-100" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Harness 100</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              플러그인으로 생성된 대규모 하네스 생태계를 같이 읽기 좋습니다.
            </p>
          </Link>
          <a href="https://github.com/revfactory/harness" target="_blank" rel="noreferrer" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">원문 저장소</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              README, README_KO, SKILL, CHANGELOG를 직접 확인할 수 있습니다.
            </p>
          </a>
        </div>
      </Prose>
    </div>
  );
}
