import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
  ProseQuote,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";

export const metadata = {
  title: "Harness 100 — RevFactory의 200개 production-grade 컬렉션",
  description:
    "Minho Hwang(@revfactory) 가 공개한 Claude Code 용 200개 production-grade 하네스 컬렉션을 사실 기반으로 정리하고, 본 사이트의 견본과 비교합니다.",
};

const STATS = [
  { label: "총 하네스", value: "200" },
  { label: "한국어", value: "100" },
  { label: "영어", value: "100" },
  { label: "에이전트 정의", value: "978" },
  { label: "스킬", value: "630" },
  { label: "Markdown 파일", value: "1,808" },
];

const DOMAINS = [
  "콘텐츠 제작 & 크리에이티브 (01-15)",
  "소프트웨어 개발 & DevOps (16-30)",
  "데이터 & AI/ML (31-42)",
  "비즈니스 & 전략 (43-55)",
  "교육 & 학습 (56-65)",
  "법률 & 컴플라이언스 (66-72)",
  "보건 & 라이프스타일 (73-80)",
  "커뮤니케이션 & 문서 (81-88)",
  "운영 & 프로세스 (89-95)",
  "특화 도메인 (96-100): 부동산, 이커머스, 지속가능성, IP",
];

export default function Harness100Page() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose>
        <ProseEyebrow>참고자료 · 외부 컬렉션</ProseEyebrow>
        <ProseHeading level={1}>Harness 100 — RevFactory</ProseHeading>
        <ProseParagraph>
          이 사이트는 단 하나의 “견본 하네스” 를 깊게 보여드립니다. 그러나 같은 패러다임을 폭으로 가장 광범위하게 정리한 컬렉션이 따로 있습니다.
          Minho Hwang(@revfactory) 의 <strong>Harness 100</strong> 입니다. 이 컬렉션은 Claude Code 용 200개의 production-grade 하네스를 한 저장소에 모았습니다.
          한국어 100개와 영어 100개가 평행 구조로 들어 있고, 콘텐츠·개발·데이터·전략·교육·법률·보건·커뮤니케이션·운영·특화의 10개 도메인을 망라합니다.
          이 글은 그 컬렉션을 사실 기반으로 정리하고, 본 사이트의 견본과 어떻게 다른지 보여드립니다.
        </ProseParagraph>

        <ProseHeading level={2}>한눈에 보는 숫자</ProseHeading>
      </Prose>

      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border px-0 sm:grid-cols-3 sm:px-6">
        {STATS.map((s) => (
          <div key={s.label} className="bg-surface px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
              {s.label}
            </p>
            <p className="mt-2 font-sans text-3xl font-semibold tracking-tight text-foreground">
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <Prose className="mt-12">
        <ProseHeading level={2}>저자와 라이선스</ProseHeading>
        <ProseParagraph>
          저장소는 <strong>Minho Hwang (GitHub: revfactory)</strong> 가 2026년 3월 22일 공개했고, 같은 달 23일에 마지막으로 업데이트됐습니다.
          라이선스는 <strong>Apache 2.0</strong> 입니다. 모든 한국어/영어 하네스가 단일 commit 으로 함께 publish 되어 있습니다.
          저장소 주소는 다음입니다.
        </ProseParagraph>
        <ProseQuote
          cite={{
            label: "github.com/revfactory/harness-100",
            href: "https://github.com/revfactory/harness-100",
          }}
        >
          Harness 100 — production-grade agent team harness collection for Claude Code. 4-5 specialist agents per harness,
          an orchestrator skill, and 2-3 agent-extending skills.
        </ProseQuote>

        <ProseHeading level={2}>철학 — 도메인 방법론을 코드의 1급 단위로</ProseHeading>
        <ProseParagraph>
          Harness 100 의 핵심 주장은 단순합니다 — “문서 뒷부분의 사족이 아니라 에이전트 자체에 도메인 방법론을 박아 넣자”. 그래서 각 하네스는
          OWASP Top 10(보안), Bloom 의 분류학(교육), Porter 의 다섯 가지 힘(전략), DCF 모델(재무), GDPR/PIPA(컴플라이언스), GHG Protocol(지속가능성) 같은
          확립된 프레임워크를 에이전트와 스킬 안에 내장합니다. 저자의 표현을 빌리면 이렇습니다.
        </ProseParagraph>
        <ProseQuote
          cite={{
            label: "harness-100 README",
            href: "https://raw.githubusercontent.com/revfactory/harness-100/main/README.md",
          }}
        >
          Every harness includes: Agent Team Mode, Domain Expertise, Structured Outputs, Dependency DAG, Error Handling, Scale Modes, Test Scenarios, Trigger Boundaries.
        </ProseQuote>
        <ProseParagraph>
          이 컬렉션의 “quick-start 철학” 은 한 줄 명령어로 끝납니다 — <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[15px]">cp -r en/01-youtube-production/.claude/ /path/to/project/.claude/</code>.
          하네스 하나를 통째로 복사하면 즉시 동작 가능한 멀티 에이전트 팀이 됩니다.
        </ProseParagraph>

        <ProseHeading level={2}>10개 도메인</ProseHeading>
      </Prose>

      <ul className="mx-auto mt-6 grid max-w-3xl list-disc gap-2 px-4 pl-12 font-serif text-foreground sm:px-6">
        {DOMAINS.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>

      <Prose className="mt-12">
        <ProseHeading level={2}>이 사이트의 견본과 어떻게 다른가요</ProseHeading>
        <ProseParagraph>
          한 줄 비교를 드리면 이렇습니다 — Harness 100 은 <strong>폭(breadth)</strong> 을, 이 사이트의 견본은 <strong>깊이(depth)</strong> 를 보여드립니다.
          Harness 100 은 100개의 도메인에 대해 “당장 복사해서 쓰는” 컬렉션이고, 본 사이트는 단 하나의 도메인(Innogrid AIOps/MLOps)에 대해
          5-레이어 아키텍처를 끝까지 풀어 설명하는 견본입니다. 두 접근은 충돌하지 않고 서로를 보완합니다.
        </ProseParagraph>
      </Prose>

      <div className="mx-auto mt-8 max-w-5xl overflow-x-auto px-4 sm:px-6">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 overflow-hidden rounded-lg border border-border bg-surface">
          <thead className="bg-surface-2">
            <tr>
              <th className="border-b border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                축
              </th>
              <th className="border-b border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                Harness 100
              </th>
              <th className="border-b border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                이 사이트의 견본
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["스코프", "100개 도메인 (수평)", "단일 도메인을 5-레이어로 (수직)"],
              ["사용 방식", "복사·붙여넣기로 즉시 배포", "코드와 함께 학습 후 자기 것으로 적용"],
              ["프레임워크 내장", "OWASP, Porter, Bloom, DCF, GDPR 등을 에이전트에 내장", "에이전트 코딩 패턴 자체를 깊이 다룸"],
              ["언어", "한/영 평행 컬렉션 (200개)", "한국어 존댓말 essay + 영어 1차 자료 인용"],
              ["에이전트 수", "978개 (1 하네스당 4~5개 specialist + orchestrator)", "단일 하네스 안의 좁은 역할 모음"],
              ["스킬 수", "630개 (도메인 확장 스킬 위주)", "재사용 워크플로 중심 (review, verify 등)"],
              ["결과 형식", "Structured Output Templates", "MDX essay + 카탈로그 + 인포그래픽"],
              ["라이선스", "Apache 2.0", "Apache 2.0 (LICENSE 참조)"],
            ].map((row, i) => (
              <tr key={row[0]} className={i % 2 === 0 ? "bg-background" : "bg-surface/60"}>
                <td className="border-b border-border px-4 py-3 align-top font-sans text-sm font-medium text-foreground">{row[0]}</td>
                <td className="border-b border-border px-4 py-3 align-top font-serif text-[14px] text-foreground-muted">{row[1]}</td>
                <td className="border-b border-border px-4 py-3 align-top font-serif text-[14px] text-foreground-muted">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Prose className="mt-12">
        <ProseHeading level={2}>Harness 100 에서 배워야 할 것</ProseHeading>
        <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
          <li><strong>Framework-First Design</strong> — 에세이가 아니라 에이전트의 1급 단위로 도메인 방법론을 박아 넣는 접근입니다. 코딩 도메인이라면 SOLID, 12-factor app, clean architecture 같은 패턴도 같은 방식으로 넣을 수 있습니다.</li>
          <li><strong>Explicit Scalability Modes</strong> — 같은 하네스에 full / reduced / single-agent 세 모드를 미리 정의합니다. 비용·시간 제약에 따라 유연하게 운영하기 좋은 패턴입니다.</li>
          <li><strong>Structured Output Templates</strong> — 각 에이전트의 출력 스키마를 미리 정의해 두면 다음 에이전트가 그것을 직접 입력으로 받을 수 있습니다.</li>
          <li><strong>Trigger Boundary Documentation</strong> — “이 하네스는 언제 호출되어야 하고, 언제 호출되어선 안 되는가” 를 명시적으로 적습니다. 오용 방지에 매우 효과적입니다.</li>
          <li><strong>Bilingual Parity</strong> — 한국어/영어 평행 구조는 한국어 사용자와 글로벌 사용자를 동시에 지원하기 위한 좋은 패턴입니다.</li>
        </ul>

        <ProseHeading level={2}>본 견본이 더 잘 보여드리는 것</ProseHeading>
        <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
          <li><strong>교육적 명확성</strong> — 본 사이트는 5-레이어 아키텍처를 처음 학습하시는 분에게 단계적으로 설명합니다.</li>
          <li><strong>자기 참조성(meta)</strong> — 이 사이트는 자기 자신의 견본이라, 카탈로그 페이지에서 “이 사이트를 만든 하네스” 의 모든 항목을 직접 보실 수 있습니다.</li>
          <li><strong>훅 시스템의 깊이</strong> — PreToolUse / PostToolUse / SessionStart 의 실제 스크립트와 smoke test 까지 모두 보여드립니다.</li>
          <li><strong>출처 기반 1차 자료 인용</strong> — 모든 essay 가 1차 자료 URL 과 함께 제공됩니다.</li>
        </ul>

        <Callout tone="tip" title="둘 다 사용하시면 됩니다">
          가장 좋은 사용법은 둘 다 사용하는 것입니다. 본 사이트의 견본으로 5-레이어 아키텍처를 이해하시고, Harness 100 에서 자기 도메인에 맞는
          하네스를 가져다 쓰시면 됩니다. 두 컬렉션은 서로를 대체하는 것이 아니라 보완합니다.
        </Callout>

        <ProseHeading level={2}>1차 자료</ProseHeading>
      </Prose>

      <ul className="mx-auto mt-6 max-w-3xl list-disc space-y-2 px-4 pl-12 font-serif text-foreground sm:px-6">
        <li><a className="underline-offset-2 hover:underline text-accent-2" href="https://github.com/revfactory/harness-100" target="_blank" rel="noreferrer">github.com/revfactory/harness-100 ↗</a></li>
        <li><a className="underline-offset-2 hover:underline text-accent-2" href="https://raw.githubusercontent.com/revfactory/harness-100/main/README.md" target="_blank" rel="noreferrer">README (영어 원문) ↗</a></li>
        <li><a className="underline-offset-2 hover:underline text-accent-2" href="https://github.com/revfactory/harness-100/tree/main/en" target="_blank" rel="noreferrer">100개 영어 하네스 트리 ↗</a></li>
        <li><a className="underline-offset-2 hover:underline text-accent-2" href="https://github.com/revfactory/harness-100/tree/main/ko" target="_blank" rel="noreferrer">100개 한국어 하네스 트리 ↗</a></li>
      </ul>

      <Prose className="mt-12">
        <hr className="my-10 border-border" />
        <p className="font-mono text-sm text-foreground-muted">
          ←{" "}
          <Link href="/reference" className="text-accent-2 hover:underline">
            참고자료 목록으로 돌아가기
          </Link>
        </p>
      </Prose>
    </div>
  );
}
