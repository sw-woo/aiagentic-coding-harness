import Link from "next/link";
import { HarnessLayerDiagram } from "@/components/diagrams/harness-layer-diagram";
import { HarnessEngineeringSteps } from "@/components/diagrams/harness-engineering-steps";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";
import { Infographic } from "@/components/content/infographic";

export const metadata = {
  title: "5-레이어 하네스 아키텍처",
  description:
    "memory · skills · subagents · rules · hooks 다섯 레이어로 구성된 에이전틱 코딩 하네스의 인터랙티브 다이어그램입니다.",
};

export default function ArchitectureOverviewPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose>
        <ProseEyebrow>아키텍처 · 개요</ProseEyebrow>
        <ProseHeading level={1}>5-레이어 하네스 아키텍처</ProseHeading>
        <ProseParagraph>
          에이전틱 코딩 하네스는 단일 거대한 시스템이 아니라, 책임이 분명한 다섯 개의 작은 레이어가 쌓여 만들어집니다.
          각 레이어는 따로 검토할 수 있고, 따로 추가하거나 제거할 수 있으며, 마지막 레이어인 hooks 와 sandbox 에서
          최종적으로 무엇이 실행되는지를 결정합니다.
        </ProseParagraph>
      </Prose>

      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <HarnessLayerDiagram />
      </div>

      <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6">
        <Infographic
          src="/infographics/harness-5-layers.png"
          alt="에이전트 코딩 5단계 아키텍처 스택을 한 페이지로 정리한 인포그래픽"
          caption="에이전트 코딩 5단계 아키텍처 스택 — Memory & Context, Skills & Slash Commands, Subagents, Rules & Permissions, Hooks & Sandbox 다섯 레이어를 위에서 아래로 시각화한 자료입니다."
          source={{
            label: "Google NotebookLM (사이트 source pack 기반 자동 생성)",
            href: "https://notebooklm.google.com",
          }}
        />
      </div>

      <Prose className="mt-20">
        <ProseHeading level={2}>하네스를 만드는 7단계</ProseHeading>
        <ProseParagraph>
          위의 5-레이어를 처음부터 만들 때는 어떤 순서로 가야 할까요. 이 사이트가 권장하는 7단계는 메모리·권한·훅·스킬·서브에이전트·검증·반복 출하 순서입니다.
          순서를 바꿔도 동작은 하지만, 이 순서대로 가면 “안전이 먼저, 자동화는 그 다음” 원칙이 자연스럽게 강제됩니다.
        </ProseParagraph>
      </Prose>

      <div className="mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <HarnessEngineeringSteps />
      </div>

      <Prose className="mt-20">
        <Callout tone="tip" title="이 사이트가 자기 자신의 견본입니다">
          위 5-레이어와 7단계는 모두 본 저장소의 실제 설정으로 살아 있습니다.{" "}
          <Link href="/catalog/skills" className="text-accent-2 hover:underline">카탈로그</Link> 에서 실제 skill, agent,
          hook, rule 을 확인하실 수 있고, 마음에 드는 항목은 자기 프로젝트로 그대로 가져가실 수 있습니다.
        </Callout>

        <ProseHeading level={2}>다음 글</ProseHeading>
        <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
          <li><Link href="/architecture/claude-vs-codex" className="text-accent-2 hover:underline">Claude Code 와 Codex 의 사실 기반 비교</Link></li>
          <li><Link href="/methodology/karpathy" className="text-accent-2 hover:underline">Karpathy 방법론 — Software 1/2/3.0 과 LLM as OS</Link></li>
          <li><Link href="/playbook/setup-claude-code" className="text-accent-2 hover:underline">Claude Code 설정 플레이북</Link></li>
        </ul>
      </Prose>
    </div>
  );
}
