import {
  ProseHeading,
  ProseParagraph,
  ProseQuote,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";
import { CodeBlock } from "@/components/content/code-block";
import { Mermaid } from "@/components/content/mermaid";

/* ──────────────────────────────────────────────────────────────
   AutoResearch 심층 분석 — 40-60분 세미나 자료
   55개 소스 · NotebookLM 44개 소스 연동 · 2026-04-21
   ────────────────────────────────────────────────────────────── */

export function AutoResearch() {
  return (
    <>
      {/* ── 도입 ── */}
      <Callout tone="note" title="이 페이지는 40–60분 세미나 발표 자료입니다">
        55개 소스(GitHub 22, 학술 논문 12, 아티클 17, 영상·한국어 4)를 기반으로
        조사·분석한 내용을 발표 흐름에 맞추어 정리했습니다. 주요 29개를 이 페이지 하단에 수록했습니다. 실습 파트가 포함되어 있습니다.
      </Callout>

      <ProseParagraph>
        2026년 3월, Andrej Karpathy 가 630줄의 파이썬 스크립트를 GitHub 에 올리고
        잠자리에 들었습니다. 아침에 일어나니 AI 가 밤새 700번의 실험을 돌려 20가지
        개선점을 발견해 놓았습니다. 수개월간 손으로 튜닝한 코드에서 인간이 놓친 버그까지
        찾아냈습니다.
      </ProseParagraph>
      <ProseParagraph>
        이 이야기는 단순한 자동화가 아닙니다.
        AI 가 스스로 실험하고, 스스로 평가하고, 스스로 개선하는 <strong>목표달성 루프</strong>가
        현실이 되었다는 선언입니다. 이 글은 그 현상의 전체 지도를 그립니다.
      </ProseParagraph>

      <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard n="74.5k" l="GitHub Stars" />
        <StatCard n="700+" l="자율 실험 횟수" />
        <StatCard n="20" l="발견된 최적화" />
        <StatCard n="11%" l="GPT-2 시간 단축" />
      </div>

      {/* ════════════════════════════════════════════════════════
          Part 1. 패러다임 전환
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>패러다임의 전환 — 바이브에서 하네스까지</ProseHeading>

      <ProseParagraph>
        AI 를 활용한 소프트웨어 개발은 18개월 만에 세 번의 패러다임 전환을 겪었습니다.
      </ProseParagraph>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-foreground-muted">
            <th className="py-2 pr-4">단계</th><th className="py-2 pr-4">시기</th>
            <th className="py-2 pr-4">인간 위치</th><th className="py-2">특징</th>
          </tr></thead>
          <tbody className="font-serif text-foreground">
            <Tr cells={["바이브 코딩", "2025", "루프 밖 (Outside)", "AI 와 채팅, 결과를 희망"]} />
            <Tr cells={["에이전틱 엔지니어링", "2026.02", "루프 안 (In)", "에이전트 오케스트레이션·감독"]} />
            <Tr cells={["하네스 엔지니어링", "2026.02~", "루프 위 (On)", "환경(제약·피드백·린터) 설계"]} highlight />
          </tbody>
        </table>
      </div>

      <Mermaid
        chart={`timeline
    title 에이전틱 엔지니어링 타임라인
    2025.02 : Karpathy "Vibe Coding" 명명
    2025.12 : Karpathy 코딩 방식 역전 (80% 수동→80% 에이전트)
    2026.02.05 : Hashimoto "하네스 엔지니어링" 명명
    2026.02.17 : LangChain Terminal Bench 30위→5위
    2026.03.07 : Karpathy AutoResearch 출시 (74.5k stars)
    2026.03.11 : LangChain "Agent Harness 해부학" 발표
    2026.03.15 : LangChain Deep Agents 출시 (9.9k stars/5h)`}
        caption="하네스 엔지니어링 타임라인 — 세 흐름이 독립적으로 같은 결론에 수렴합니다"
      />

      <ProseParagraph>
        Mitchell Hashimoto(Terraform 창시자)가 명명한 하네스 엔지니어링의 핵심 원칙은 한 줄입니다 —
        &ldquo;에이전트가 실수할 때마다, 다시는 그 실수를 반복하지 못하도록 시스템을 설계하라.&rdquo;
      </ProseParagraph>

      <Callout tone="tip" title="컴퓨터 아키텍처 비유 (Beren Millidge)">
        CPU = LLM 모델, RAM = 컨텍스트 윈도우, 디스크 = 외부 DB, 디바이스 드라이버 = 도구/API,
        <strong> 운영체제(OS) = 에이전트 하네스</strong>. &ldquo;에이전트를 만들었다&rdquo; 는
        하네스를 만들고 모델을 연결했다는 뜻입니다 (LangChain).
      </Callout>

      {/* ════════════════════════════════════════════════════════
          Part 2. AutoResearch 해부
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>AutoResearch — 목표달성 루프의 원형</ProseHeading>

      <ProseParagraph>
        공식 레포:{" "}
        <a href="https://github.com/karpathy/autoresearch" target="_blank" rel="noreferrer"
          className="text-accent-2 hover:underline">github.com/karpathy/autoresearch</a>{" "}
        (74.5k stars). 630줄 Python + 1개 마크다운 파일. 단일 NVIDIA GPU, Python 3.10+, uv.
        Fortune 지는 이 방법론을 &ldquo;The Karpathy Loop&rdquo; 이라 명명했습니다.
      </ProseParagraph>

      <ProseHeading level={3}>3-파일 아키텍처</ProseHeading>

      <div className="my-6 grid gap-4 sm:grid-cols-3">
        <RoleCard title="prepare.py" subtitle="불변의 평가자" color="text-green-400">
          데이터, 토크나이저, <code>evaluate_bpb</code> 함수. 에이전트도 인간도 수정 불가.
          보상 해킹을 원천 차단합니다.
        </RoleCard>
        <RoleCard title="train.py" subtitle="에이전트의 샌드박스" color="text-amber-400">
          GPT 아키텍처, Muon+AdamW 옵티마이저, 학습 루프. 에이전트가 자유롭게 수정할 수 있는
          유일한 파일입니다. 630줄 = LLM 이 한눈에 파악 가능합니다.
        </RoleCard>
        <RoleCard title="program.md" subtitle="산문으로 된 프로그램" color="text-accent-2">
          연구 방향, 제약, 9단계 루프 규칙. 인간이 작성하는 유일한 파일입니다.
          핵심 지시: <strong>NEVER STOP</strong>.
        </RoleCard>
      </div>

      <ProseQuote cite={{ label: "Andrej Karpathy", href: "https://github.com/karpathy/autoresearch" }}>
        인간은 .md 를 프로그래밍하고, 에이전트는 .py 를 프로그래밍합니다.
      </ProseQuote>

      <ProseHeading level={3}>9단계 실행 루프</ProseHeading>

      <ol className="my-4 list-decimal space-y-1 pl-6 font-serif text-foreground">
        <li>program.md 읽기 → 연구 우선순위 파악</li>
        <li>train.py + results.tsv 검토</li>
        <li>가설 제안 (아키텍처 / 옵티마이저 / 학습)</li>
        <li>train.py 수정</li>
        <li>git commit</li>
        <li><strong className="text-accent-2">5분간 학습 실행</strong> (고정 벽시계 시간)</li>
        <li>실패 시 → 로그 확인, 수정 또는 포기</li>
        <li>val_bpb + 메모리 측정, results.tsv 기록</li>
        <li>개선됨? → <span className="text-green-400">git keep</span> | 안 됨? → <span className="text-red-400">git reset HEAD~1</span></li>
      </ol>
      <Mermaid
        chart={`flowchart TD
    A["1. program.md 읽기"] --> B["2. train.py + results.tsv 검토"]
    B --> C["3. 가설 제안"]
    C --> D["4. train.py 수정"]
    D --> E["5. git commit"]
    E --> F["6. 5분간 학습 실행"]
    F --> G{"크래시?"}
    G -->|Yes| H["로그 확인 → 수정 or 포기"]
    H --> A
    G -->|No| I["8. val_bpb 측정"]
    I --> J{"개선됨?"}
    J -->|"Yes (낮아짐)"| K["✅ git keep"]
    J -->|"No"| L["❌ git reset HEAD~1"]
    K --> A
    L --> A

    style F fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style K fill:#064e3b,stroke:#10b981,color:#e2e8f0
    style L fill:#7f1d1d,stroke:#ef4444,color:#e2e8f0`}
        caption="AutoResearch 9단계 실행 루프 — 무한 반복하며 개선만 누적합니다"
      />

      <ProseParagraph>
        이 루프는 <strong>무한 반복</strong>됩니다. 시간당 약 12회, 하룻밤에 약 100회 실험이 실행됩니다.
      </ProseParagraph>

      <ProseHeading level={3}>실제 소스코드 — program.md 핵심 발췌</ProseHeading>

      <CodeBlock filename="program.md (발췌 1 — CAN/CANNOT)" language="markdown">
{`**What you CAN do:**
- Modify train.py — this is the only file you edit.
  Everything is fair game: architecture, optimizer,
  hyperparameters, training loop, batch size, model size.

**What you CANNOT do:**
- Modify prepare.py. It is read-only.
- Install new packages or add dependencies.
- Modify the evaluation harness.`}
      </CodeBlock>

      <CodeBlock filename="program.md (발췌 2 — Simplicity Criterion)" language="markdown">
{`**Simplicity criterion**: simpler is better.
A 0.001 val_bpb improvement that adds 20 lines of
hacky code? Probably not worth it.
A 0.001 improvement from deleting code? Definitely keep.`}
      </CodeBlock>

      <CodeBlock filename="program.md (발췌 3 — NEVER STOP)" language="markdown">
{`**NEVER STOP**: The human might be asleep.
You are autonomous. If you run out of ideas,
think harder — read papers referenced in the code,
try combining previous near-misses,
try more radical architectural changes.
The loop runs until the human interrupts you, period.`}
      </CodeBlock>

      <Callout tone="note" title="NEVER STOP 과 에이전트 호환성">
        Claude Code 는 이 지시를 충실히 따르지만, Codex 는 무시하여 호환되지 않습니다.
        Karpathy 가 직접 GitHub Issue #57 에 보고한 사항입니다.
      </Callout>

      <ProseHeading level={3}>실제 소스코드 — train.py GPTConfig</ProseHeading>

      <CodeBlock filename="train.py (첫 20줄)" language="python">
{`from prepare import (MAX_SEQ_LEN, TIME_BUDGET,
                     Tokenizer, make_dataloader, evaluate_bpb)

@dataclass
class GPTConfig:
    sequence_len: int = 2048
    vocab_size: int = 32768
    n_layer: int = 12      # ← 에이전트가 변경 가능
    n_head: int = 6
    n_kv_head: int = 6
    n_embd: int = 768
    window_pattern: str = "SSSL"  # S=Sliding, L=Full`}
      </CodeBlock>

      <ProseParagraph>
        <code>from prepare import ... evaluate_bpb</code> — 평가 함수는 prepare.py 에서 import 합니다.
        수정 불가의 신뢰 경계입니다. 전체 630줄이 단일 파일이므로 LLM 컨텍스트 윈도우 안에서
        전체 흐름을 한눈에 파악할 수 있습니다.
      </ProseParagraph>

      <ProseHeading level={3}>700회 실험의 구체적 결과</ProseHeading>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-foreground-muted">
            <th className="py-2 pr-4">발견</th><th className="py-2">내용</th>
          </tr></thead>
          <tbody className="font-serif text-foreground">
            <Tr cells={["QK-Norm 버그 수정", "수개월간 Karpathy 본인이 놓친 버그를 에이전트가 발견"]} />
            <Tr cells={["배치 사이즈 최적화", "시간 고정 시 배치를 줄여 더 많은 스텝 확보가 유리"]} />
            <Tr cells={["Weight decay / AdamW beta", "미세 하이퍼파라미터 스위트 스팟 발견"]} />
            <Tr cells={["RoPE 주파수 조정", "인간이 일일이 시도하기 어려운 영역"]} />
          </tbody>
        </table>
      </div>

      <Callout tone="tip" title="핵심 수치">
        20개 최적화 모두 누적 적용(additive) 가능 → depth=24 모델에도 전이 →
        GPT-2 도달 시간 <strong>2.02시간 → 1.80시간 (11% 단축)</strong>.
      </Callout>

      <ProseHeading level={3}>Shopify CEO Tobi Lutke 의 적용 결과</ProseHeading>

      <ProseParagraph>
        <strong>쿼리 확장 모델</strong> — 37회 실험, 8시간 야간 실행으로 검증 점수 19% 향상.
        에이전트가 최적화한 0.8B 모델이 수동 튜닝 1.6B 모델을 능가했습니다.
        &ldquo;더 크면 더 좋다&rdquo; 가 아니라, 하드웨어에 맞춰 최적화하면 작은 모델이 이깁니다.
      </ProseParagraph>
      <ProseParagraph>
        <strong>Liquid 템플릿 엔진</strong>(Shopify 핵심 인프라) — 93개 자동 커밋으로
        렌더링 속도 53% 향상, 메모리 할당 61% 감소.
      </ProseParagraph>

      {/* ════════════════════════════════════════════════════════
          Part 2.5. 왜 작동하는가
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>왜 작동하는가 — 제약이 혁신입니다</ProseHeading>

      <ProseQuote cite={{ label: "Augment Code, Harness Engineering for AI Coding Agents", href: "https://www.augmentcode.com/guides/harness-engineering-ai-coding-agents" }}>
        AutoResearch 의 혁신은 에이전트의 지능이 아니라, 에이전트를 감싸는 제약의 탁월함입니다.
      </ProseQuote>

      <ProseParagraph>
        에이전트의 자유를 제한할수록 생산성이 극적으로 올라갑니다. 630줄 + 5분 + 단일 메트릭으로
        제한하면, 모델은 정답에 더 빠르고 효율적으로 수렴합니다.
      </ProseParagraph>

      <ProseHeading level={3}>AutoGPT 는 왜 실패하고 AutoResearch 는 왜 성공했는가</ProseHeading>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-foreground-muted">
            <th className="py-2 pr-4"></th><th className="py-2 pr-4">AutoGPT (실패)</th><th className="py-2">AutoResearch (성공)</th>
          </tr></thead>
          <tbody className="font-serif text-foreground">
            <Tr cells={["환경", "제약 없는 개방형", "1 GPU, 1 파일, 1 메트릭"]} />
            <Tr cells={["결과", "방황, 무한 루프, 컨텍스트 고갈", "700회 실험, 20개 최적화"]} />
            <Tr cells={["핵심 차이", "자유도 과다", "극단적 제약 → 알고리즘에만 집중"]} />
          </tbody>
        </table>
      </div>

      <Callout tone="warning" title="제약을 풀면 무너집니다">
        한 실무자(Jay Kim)가 에이전트에게 아키텍처를 더 자유롭게 변경하도록 범위를 열자,
        에이전트는 흔들리기 시작했습니다 — 회귀, 역전, 이미 폐기한 아이디어로의 회귀 (softmaxdata.com).
      </Callout>

      <ProseHeading level={3}>Fowler/Böckeler 프레임워크로 본 AutoResearch</ProseHeading>

      <ProseParagraph>
        Martin Fowler 사이트에 발표된 Birgitta Böckeler(ThoughtWorks)의 프레임워크로 분석하면,
        AutoResearch 의 모든 구성 요소가 <strong>가이드(Feedforward)</strong>와{" "}
        <strong>센서(Feedback)</strong>로 깔끔하게 분류됩니다.
      </ProseParagraph>

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <RoleCard title="가이드 (행동 전)" subtitle="Feedforward 통제" color="text-green-400">
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
            <li><strong>program.md</strong> — 방향, 규칙 제시</li>
            <li><strong>Simplicity Criterion</strong> — 기술 부채 방지</li>
            <li><strong>NEVER STOP</strong> — 야간 자율 실행 허용</li>
            <li><strong>VRAM Soft Constraint</strong> — 메모리 폭발 방지</li>
          </ul>
        </RoleCard>
        <RoleCard title="센서 (행동 후)" subtitle="Feedback 통제" color="text-amber-400">
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
            <li><strong>prepare.py (val_bpb)</strong> — 결정론적 측정</li>
            <li><strong>git commit/revert</strong> — 자동 롤백</li>
            <li><strong>results.tsv</strong> — 반복 시도 방지</li>
            <li><strong>10분 타임아웃</strong> — 폭주 방지</li>
          </ul>
        </RoleCard>
      </div>

      <Callout tone="tip" title="센서가 모두 Computational(결정론적)입니다">
        AutoResearch 의 센서는 전부 CPU 가 실행하는 결정론적 검사입니다.
        LLM-as-Judge 에 의존하지 않으므로 환각 기반 자기기만이 원천적으로 불가능합니다.
      </Callout>

      <Mermaid
        chart={`flowchart LR
    subgraph 가이드["🟢 가이드 (Feedforward)"]
        P["program.md"] --> AG["에이전트"]
        SC["Simplicity Criterion"] --> AG
        NS["NEVER STOP"] --> AG
    end

    AG --> EX["train.py 수정 + 5분 학습"]

    subgraph 센서["🟠 센서 (Feedback)"]
        EX --> PP["prepare.py → val_bpb 측정"]
        PP --> GIT{"개선?"}
        GIT -->|Yes| KEEP["git keep ✅"]
        GIT -->|No| RESET["git reset ❌"]
    end

    KEEP --> TSV["results.tsv 기록"]
    RESET --> TSV
    TSV --> AG

    style 가이드 fill:#064e3b22,stroke:#10b981
    style 센서 fill:#7f1d1d22,stroke:#f59e0b`}
        caption="AutoResearch 의 조향 루프 — 가이드(행동 전)와 센서(행동 후)가 결합되어 자율 개선 사이클을 형성합니다"
      />

      <ProseParagraph>
        <strong>AutoResearch 가 증명한 것</strong>: 둘 중 하나만으로는 부족합니다.
        program.md(컨텍스트 엔지니어링)만 있고 prepare.py(하네스의 센서)가 없으면 보상 해킹이 가능합니다.
        prepare.py 만 있고 program.md 가 없으면 에이전트가 방향을 잃습니다.
        둘이 결합되어야 자는 동안 700번 실험이 가능해집니다.
      </ProseParagraph>

      {/* ════════════════════════════════════════════════════════
          Part 3. 하네스 엔지니어링
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>하네스 엔지니어링 — 왜 88%가 실패하는가</ProseHeading>

      <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard n="88%" l="에이전트 실패율" />
        <StatCard n="55.8%" l="AI 코드 취약점" />
        <StatCard n="97.8%" l="정적 분석 미탐지" />
        <StatCard n="78.7%" l="자기 리뷰 탐지율" />
      </div>

      <ProseParagraph>
        AI 에이전트 프로젝트의 88%가 프로덕션에 도달하기 전에 실패합니다.
        실패 원인은 모델의 지능 부족이 아니라, 하네스의 부재입니다 (miraflow.ai).
      </ProseParagraph>

      <ProseHeading level={3}>LangChain Terminal Bench — 하네스의 증거</ProseHeading>

      <ProseParagraph>
        모델: <code>gpt-5.2-codex</code> — 모델 변경 0. 하네스만 개선(자가 검증 루프 + LangSmith 실패 패턴 분석).
        결과: <strong>52.8% → 66.5% (+13.7 포인트), 순위 30위 → 5위</strong>.
      </ProseParagraph>

      <ProseQuote cite={{ label: "LangChain Blog, Improving Deep Agents with Harness Engineering, 2026년 2월", href: "https://blog.langchain.com/improving-deep-agents-with-harness-engineering/" }}>
        같은 모델. 다른 하네스. 극적으로 다른 결과.
      </ProseQuote>

      <ProseHeading level={3}>OpenAI Codex 100만 줄 실험</ProseHeading>

      <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard n="0줄" l="인간 코드" />
        <StatCard n="100만" l="프로덕션 코드" />
        <StatCard n="1,500" l="병합된 PR" />
        <StatCard n="3.5/일" l="엔지니어당 PR" />
        <StatCard n="10x" l="속도 향상" />
        <StatCard n="5개월" l="기간 (3→7명)" />
      </div>

      <ProseHeading level={3}>Generation-Review Asymmetry</ProseHeading>

      <ProseParagraph>
        &ldquo;Broken by Default&rdquo; 연구가 Z3 SMT 솔버로 AI 생성 코드 3,500개를 수학적으로 검증한 결과,
        모델은 코드 생성 시 55.8%의 취약점을 만들지만 동일 모델이 자기 코드를 리뷰하면 78.7%를 정확히 탐지합니다.
        모델은 안전한 코드를 작성할 지식을 갖고 있지만 생성 단계에서 적용하지 못합니다.
        Generator-Evaluator 분리가 하네스에서 필수적인 이유입니다 (arxiv.org, 2604.05292).
      </ProseParagraph>

      <ProseHeading level={3}>LangChain Deep Agents — 독립적 수렴의 증거</ProseHeading>

      <ProseParagraph>
        흥미로운 점은, AutoResearch(3/7)와 거의 같은 시기에 LangChain 도 독립적으로 같은 결론에 도달했다는 것입니다.
        LangChain 의 하네스 엔지니어링 블로그(2/17)는 AutoResearch 보다 <strong>3주 먼저</strong> 발표되었습니다.
        두 프로젝트는 서로를 참조하지 않았지만, 동일한 원리 — &ldquo;모델이 아니라 하네스가 성능을 결정한다&rdquo; — 에 수렴했습니다.
      </ProseParagraph>

      <ProseParagraph>
        2026년 3월 15일, LangChain 이{" "}
        <a href="https://github.com/langchain-ai/deepagents" target="_blank" rel="noreferrer" className="text-accent-2 hover:underline">Deep Agents</a>를
        공개했습니다. Harrison Chase 가 <strong>Claude Code 를 역공학</strong>하여 만든 범용 에이전트 하네스입니다
        (AutoResearch 가 아닌 Claude Code 가 영감의 출처입니다).
        출시 5시간 만에 GitHub 9.9k stars 를 기록했습니다.
        LangChain 은 자사 생태계를 세 계층으로 공식 구분합니다 — <strong>LangChain</strong>(프레임워크),{" "}
        <strong>LangGraph</strong>(런타임), <strong>Deep Agents</strong>(하네스).
      </ProseParagraph>

      <Mermaid
        chart={`block-beta
    columns 3
    A["LangChain\n(Framework)\n모델·도구·프롬프트"]:1
    B["LangGraph\n(Runtime)\n상태·그래프·체크포인트"]:1
    C["Deep Agents\n(Harness)\n계획·파일시스템·서브에이전트"]:1

    style A fill:#1e293b,stroke:#64748b,color:#e2e8f0
    style B fill:#1e293b,stroke:#3b82f6,color:#e2e8f0
    style C fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0`}
        caption="LangChain 생태계 3계층 — Framework → Runtime → Harness"
      />

      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <RoleCard title="Deep Agents 핵심 기능" subtitle="하네스 내장 도구" color="text-accent-2">
          <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
            <li><strong>write_todos</strong> — 작업 분해 + 진행 추적</li>
            <li><strong>파일시스템</strong> — 컨텍스트 오프로딩 (윈도우 overflow 방지)</li>
            <li><strong>서브에이전트</strong> — context firewall (저렴한 모델 위임)</li>
            <li><strong>자동 요약</strong> — 컨텍스트 85% 도달 시 자동 압축</li>
            <li><strong>영속 메모리</strong> — 세션/스레드 간 기억 유지</li>
          </ul>
        </RoleCard>
        <RoleCard title="미들웨어 파이프라인" subtitle="Terminal Bench 30위→5위 구조" color="text-green-400">
          <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm">
            <li><strong>LocalContextMiddleware</strong> — 코드베이스 매핑</li>
            <li><strong>LoopDetectionMiddleware</strong> — 둠 루프 감지</li>
            <li><strong>ReasoningSandwichMiddleware</strong> — xhigh-high-xhigh</li>
            <li><strong>PreCompletionChecklistMiddleware</strong> — 종료 전 검증</li>
          </ol>
        </RoleCard>
      </div>

      <ProseHeading level={3}>State of Agent Engineering 2026</ProseHeading>

      <ProseParagraph>
        LangChain 의 1,340명 대상 서베이 결과, 에이전트 프로덕션 배포율은 <strong>57.3%</strong>로 전년(51%) 대비 상승했습니다.
        품질이 최대 장벽(32%)이며, 비용은 오히려 하락했습니다. 관측성(observability) 도입률은 <strong>89%</strong>에 도달했습니다.
        10,000명 이상 조직에서는 67%가 이미 프로덕션에 에이전트를 운영 중입니다
        (<a href="https://www.langchain.com/state-of-agent-engineering" target="_blank" rel="noreferrer" className="text-accent-2 hover:underline">langchain.com</a>).
      </ProseParagraph>

      <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard n="57.3%" l="프로덕션 배포율" />
        <StatCard n="32%" l="품질 = 최대 장벽" />
        <StatCard n="89%" l="관측성 도입" />
        <StatCard n="67%" l="만명+ 조직 배포율" />
      </div>

      {/* ════════════════════════════════════════════════════════
          Part 4. AI Builds AI 생태계
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>AI Builds AI — 자기개선 생태계</ProseHeading>

      <ProseHeading level={3}>AutoResearch 도메인 적용 — ML 을 넘어서</ProseHeading>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-foreground-muted">
            <th className="py-2 pr-4">도메인</th><th className="py-2 pr-4">메트릭</th><th className="py-2">결과</th>
          </tr></thead>
          <tbody className="font-serif text-foreground">
            <Tr cells={["Shopify Liquid", "렌더링 시간", "53% 속도↑, 61% 메모리↓"]} />
            <Tr cells={["Pytest 최적화", "실행 시간", "295초 → 71초"]} />
            <Tr cells={["Rust 스도쿠 솔버", "벤치마크", "312실험, 4/6 벤치 1위"]} />
            <Tr cells={["SQLite 수집", "속도", "588배 향상"]} />
            <Tr cells={["브라우저 에이전트", "Mind2Web", "97% 벤치마크 도달"]} />
            <Tr cells={["Flash-MoE (Metal)", "tok/s", "43 실험, 20.34 tok/s"]} />
          </tbody>
        </table>
      </div>

      <ProseHeading level={3}>자기개선 AI 프레임워크 비교</ProseHeading>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-foreground-muted">
            <th className="py-2 pr-4">시스템</th><th className="py-2 pr-4">개발처</th><th className="py-2">핵심</th>
          </tr></thead>
          <tbody className="font-serif text-foreground">
            <Tr cells={["AI Scientist-v2", "Sakana AI", "에이전틱 트리 탐색 → ICLR 피어리뷰 통과 논문"]} />
            <Tr cells={["Darwin Gödel Machine", "Sakana AI", "자기 코드 수정 + 개방형 진화"]} />
            <Tr cells={["EvoAgentX", "EMNLP 2025", "멀티 에이전트 워크플로우 자동 진화"]} />
            <Tr cells={["Meta Hyperagents", "Meta", "자기 추론 메커니즘 재작성"]} />
            <Tr cells={["AlphaEvolve", "DeepMind", "진화적 코딩 → 활성화 함수 발견"]} />
            <Tr cells={["AutoSOTA", "arXiv 2026", "8-에이전트, 논문→SOTA 초과 + Red Line"]} />
          </tbody>
        </table>
      </div>

      <Mermaid
        chart={`graph TD
    AR["🔬 AutoResearch\n(Karpathy)\n단일 파일 · 단일 메트릭"]
    AR --> CLI["autoresearch-cli\n범용 CLI"]
    AR --> MLX["autoresearch-mlx\nApple Silicon"]
    AR --> EVERYWHERE["autoresearch-everywhere\n크로스 플랫폼"]

    AR -.->|"같은 원리"| DA["Deep Agents\n(LangChain)\nClaude Code 역공학"]
    AR -.->|"같은 원리"| CODEX["Codex Harness\n(OpenAI)\n100만줄 실험"]

    subgraph 자기개선["AI Builds AI"]
        AIS["AI Scientist v2\n(Sakana AI)"]
        DGM["Darwin Gödel Machine\n(Sakana AI)"]
        AE["AlphaEvolve\n(DeepMind)"]
        SOTA["AutoSOTA\n8-에이전트"]
    end

    AR -.->|"확장"| 자기개선

    style AR fill:#1e3a5f,stroke:#3b82f6,color:#e2e8f0
    style DA fill:#064e3b,stroke:#10b981,color:#e2e8f0
    style CODEX fill:#064e3b,stroke:#10b981,color:#e2e8f0
    style 자기개선 fill:#7f1d1d22,stroke:#f59e0b`}
        caption="AutoResearch 에서 시작된 생태계 — 플랫폼 포크, 산업 하네스, AI Builds AI 프레임워크로 확산"
      />

      {/* ════════════════════════════════════════════════════════
          Part 5. 안전성
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>안전성 — 목표달성 루프의 어두운 면</ProseHeading>

      <ProseParagraph>
        재귀적 자기개선의 가장 큰 위험: 성능이 10% 올라도 진실성이 15% 하락하면
        그것은 개선이 아니라 퇴화입니다.
      </ProseParagraph>

      <ProseParagraph>
        SAHOO 프레임워크(Safeguarded Alignment for High-Order Optimization)는 세 가지 수학적 안전장치를 제시합니다.
        첫째, <strong>목표 표류 지수(GDI)</strong> — 의미론적·어휘론적·구조적·분포적 변화를 종합 측정합니다.
        둘째, <strong>제약 보존 검사</strong> — 불변량 위반 시 명시적 페널티를 부여합니다.
        셋째, <strong>회귀 위험 정량화</strong> — 이전 성과를 무효화하는 시점을 정량화하여 종료 기준을 제공합니다
        (arxiv.org, 2603.06333).
      </ProseParagraph>

      {/* ════════════════════════════════════════════════════════
          Part 6. 실습
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>실습 — AutoResearch 직접 실행하기</ProseHeading>

      <Callout tone="tip" title="아래 순서대로 따라하면, 오늘 밤 자는 동안 AI 가 실험을 돌려줍니다">
        NVIDIA GPU 또는 Apple Silicon Mac 이 있으면 바로 시작할 수 있습니다.
      </Callout>

      <ProseHeading level={3}>Step 1 — 준비물 확인</ProseHeading>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-foreground-muted">
            <th className="py-2 pr-4">항목</th><th className="py-2 pr-4">NVIDIA GPU</th><th className="py-2">Mac (Apple Silicon)</th>
          </tr></thead>
          <tbody className="font-serif text-foreground">
            <Tr cells={["GPU", "H100 / A100 / RTX", "M1 ~ M5 Mac"]} />
            <Tr cells={["Python", "3.10+", "3.10+"]} />
            <Tr cells={["도구", "uv", "uv"]} />
            <Tr cells={["에이전트", "Claude Code (권장)", "Claude Code (권장)"]} />
          </tbody>
        </table>
      </div>

      <ProseHeading level={3}>Step 2 — 레포 클론 & 환경 설정</ProseHeading>

      <CodeBlock filename="터미널" language="bash">
{`# NVIDIA GPU
git clone https://github.com/karpathy/autoresearch.git
cd autoresearch && uv sync

# Mac (Apple Silicon MLX)
git clone https://github.com/trevin-creator/autoresearch-mlx.git
cd autoresearch-mlx && uv sync`}
      </CodeBlock>

      <ProseHeading level={3}>Step 3 — 데이터 준비</ProseHeading>

      <CodeBlock filename="터미널" language="bash">
{`uv run prepare.py
# → ~/.cache/autoresearch/ 에 데이터 샤드 + 토크나이저 생성
# → 수 분 소요 (첫 실행만)`}
      </CodeBlock>

      <ProseHeading level={3}>Step 4 — 베이스라인 측정 (수동 1회)</ProseHeading>

      <CodeBlock filename="터미널" language="bash">
{`uv run train.py > run.log 2>&1
grep "^val_bpb:" run.log
# → val_bpb: 0.997900  ← 이것이 베이스라인입니다`}
      </CodeBlock>

      <ProseHeading level={3}>Step 5 — AI 에이전트 실행 (자율 루프 시작)</ProseHeading>

      <CodeBlock filename="터미널" language="bash">
{`# Claude Code 실행
claude

# 프롬프트:
"Read program.md and begin the autoresearch
 experiment loop. Start with a baseline run,
 then iterate autonomously."

# program.md 가 모든 지시를 포함하므로
# "Start autoresearch" 한 줄이면 충분합니다`}
      </CodeBlock>

      <Callout tone="note" title="이제 잠자리에 들면 됩니다">
        아침에 <code>git log --oneline</code> 과 <code>cat results.tsv</code> 로 결과를 확인하십시오.
        성공한 변경만 남은 깨끗한 브랜치 + 실패 포함 전체 이력이 기다리고 있습니다.
      </Callout>

      <ProseHeading level={3}>Step 6 — 결과 확인</ProseHeading>

      <CodeBlock filename="터미널" language="bash">
{`git log --oneline          # 성공한 실험만 남은 커밋
cat results.tsv            # 전체 이력 (성공 + 실패 + 크래시)
uv run train.py > final.log 2>&1
grep "^val_bpb:" final.log # 최종 점수 확인`}
      </CodeBlock>

      <ProseHeading level={3}>Step 7 — ML 외 도메인에 적용하기</ProseHeading>

      <ProseParagraph>
        <strong>The Karpathy Loop 공식</strong>: AGENT + CONSTRAINED_SCOPE + SCALAR_METRIC + FAST_VERIFICATION = AUTONOMOUS_IMPROVEMENT.
        아래 세 가지만 준비하면 어떤 도메인이든 적용할 수 있습니다.
      </ProseParagraph>

      <CodeBlock filename="범용 적용 체크리스트" language="markdown">
{`1. Editable Asset  — 에이전트가 수정할 파일
   예: strategy.py, config.yaml, test_suite.py

2. Scalar Metric   — 자동 계산 가능한 성공 지표
   예: pytest 실행 시간, 렌더링 속도, 점수

3. Time-boxed Cycle — 실험당 고정 시간
   예: 5분, 10분 (도메인에 따라 조정)`}
      </CodeBlock>

      <CodeBlock filename="범용 CLI 사용 예시" language="bash">
{`cargo install autoresearch-cli
autoresearch run --metric "pytest duration" \\
                 --file "tests/" --budget 300`}
      </CodeBlock>

      {/* ════════════════════════════════════════════════════════
          Part 7. 조직 성숙도
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>조직 성숙도 자가 진단</ProseHeading>

      <div className="my-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-foreground-muted">
            <th className="py-2 pr-4">레벨</th><th className="py-2 pr-4">이름</th>
            <th className="py-2 pr-4">인간 역할</th><th className="py-2">다음 단계</th>
          </tr></thead>
          <tbody className="font-serif text-foreground">
            <Tr cells={["1", "No AI", "전통적 개발", ""]} />
            <Tr cells={["2", "Chatbot", "채팅 복붙", "AGENTS.md 작성"]} />
            <Tr cells={["3", "Human-in-Loop", "에이전트 + 전수 리뷰", "린터/테스트 훅 자동화"]} />
            <Tr cells={["4", "Systematic Harness", "하네스 설계자", "에이전트 간 리뷰"]} highlight />
            <Tr cells={["5", "Agentic Flywheel", "전략 큐레이터", "에이전트가 하네스 진화"]} />
          </tbody>
        </table>
      </div>

      <Callout tone="tip" title="매주 금요일 5분 — 조향 루프">
        1) 이번 주 에이전트 실패 목록 확인 →
        2) 가장 빈번한 실패 1개 선택 →
        3) &ldquo;왜 에이전트가 예방하지 못했는가?&rdquo; 분석 →
        4) AGENTS.md 규칙 추가 또는 테스트 코드 작성 →
        5) 다음 주 — 이 실패가 영구 차단됩니다.
        모델이 좋아져서가 아니라, 시스템이 학습하기 때문에 에이전트가 신뢰할 수 있게 됩니다.
      </Callout>

      {/* ════════════════════════════════════════════════════════
          핵심 메시지
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>핵심 메시지</ProseHeading>

      <div className="my-8 rounded-2xl border border-accent/30 bg-accent/5 px-6 py-10 text-center">
        <p className="font-serif text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl">
          &ldquo;모델을 바꾸지 말고,<br />
          <span className="text-accent-2">하네스를 개선하십시오.</span>&rdquo;
        </p>
        <p className="mt-4 font-serif text-base text-foreground-muted">
          LangChain — 모델 변경 0, 하네스만으로 30위→5위<br />
          OpenAI — 하네스 설계만으로 인간 코딩 0줄 → 100만줄<br />
          Karpathy — 630줄 + 제약 = 밤새 700번 실험, 20개 최적화
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════
          참고 자료
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>참고 자료</ProseHeading>

      <ProseHeading level={3}>GitHub 레포</ProseHeading>
      <RefList refs={[
        ["karpathy/autoresearch — 74.5k stars", "https://github.com/karpathy/autoresearch"],
        ["trevin-creator/autoresearch-mlx — Apple Silicon", "https://github.com/trevin-creator/autoresearch-mlx"],
        ["Entrpi/autoresearch-everywhere — 크로스 플랫폼", "https://github.com/Entrpi/autoresearch-everywhere"],
        ["199-biotechnologies/autoresearch-cli — 범용 CLI", "https://github.com/199-biotechnologies/autoresearch-cli"],
        ["alvinreal/awesome-autoresearch — 파생 큐레이션", "https://github.com/alvinreal/awesome-autoresearch"],
        ["SakanaAI/AI-Scientist-v2 (2k stars)", "https://github.com/SakanaAI/AI-Scientist-v2"],
        ["SakanaAI/AI-Scientist v1 — Nature 게재 (12k stars)", "https://github.com/SakanaAI/AI-Scientist"],
        ["EvoAgentX/EvoAgentX — 자기진화 멀티 에이전트", "https://github.com/EvoAgentX/EvoAgentX"],
        ["kayba-ai/recursive-improve — 재귀적 자기개선", "https://github.com/kayba-ai/recursive-improve"],
        ["aiming-lab/AutoHarness — 자동 하네스 생성", "https://github.com/aiming-lab/AutoHarness"],
      ]} />

      <ProseHeading level={3}>핵심 아티클</ProseHeading>
      <RefList refs={[
        ["Martin Fowler — Harness Engineering (가이드/센서 프레임워크)", "https://martinfowler.com/articles/harness-engineering.html"],
        ["LangChain — Terminal Bench 30위→5위 기법", "https://blog.langchain.com/improving-deep-agents-with-harness-engineering/"],
        ["The New Stack — Karpathy 630-line Script", "https://thenewstack.io/karpathy-autonomous-experiment-loop/"],
        ["PJFP — Karpathy No Priors Interview", "https://pjfp.com/andrej-karpathy-on-autoresearch-ai-agents-and-why-he-stopped-writing-code-full-breakdown-of-his-2026-no-priors-interview/"],
        ["DataCamp — Guide to AutoResearch", "https://www.datacamp.com/tutorial/guide-to-autoresearch"],
        ["InfoQ — OpenAI Codex 100만줄", "https://www.infoq.com/news/2026/02/openai-harness-engineering-codex/"],
        ["SoftMax — Why AutoResearch Works", "https://softmaxdata.com/blog/autoresearch/"],
        ["LangChain — Deep Agents (2026.03)", "https://www.langchain.com/blog/deep-agents"],
        ["LangChain — The Anatomy of an Agent Harness (2026.03)", "https://blog.langchain.com/the-anatomy-of-an-agent-harness/"],
        ["LangChain — State of Agent Engineering 2026", "https://www.langchain.com/state-of-agent-engineering"],
      ]} />

      <ProseHeading level={3}>학술 논문</ProseHeading>
      <RefList refs={[
        ["AutoSOTA — 8-에이전트 자동 SOTA (arXiv 2604.05550)", "https://arxiv.org/pdf/2604.05550"],
        ["SAHOO — 정렬 안전장치 (arXiv 2603.06333)", "https://arxiv.org/pdf/2603.06333"],
        ["Broken by Default — AI 코드 55.8% 취약점 (arXiv 2604.05292)", "https://arxiv.org/pdf/2604.05292"],
        ["VeRO — 에이전트가 에이전트를 최적화 (arXiv 2602.22480)", "https://arxiv.org/pdf/2602.22480"],
        ["Darwin Gödel Machine (Sakana AI)", "https://sakana.ai/dgm/"],
        ["AI Scientist-v2 (Sakana AI)", "https://pub.sakana.ai/ai-scientist-v2/paper/paper.pdf"],
      ]} />

      <ProseHeading level={3}>영상 & 한국어</ProseHeading>
      <RefList refs={[
        ["Karpathy on AutoResearch (YouTube)", "https://www.youtube.com/watch?v=kwSVtQ7dziU"],
        ["GPTers — 하네스 엔지니어링 완벽 정리", "https://www.gpters.org/nocode/post/harness-engineering-complete-summary-3knw3BTfdPoX5K0"],
        ["GeekNews — Karpathy AutoResearch", "https://news.hada.io/topic?id=27706"],
      ]} />
    </>
  );
}

/* ── 헬퍼 컴포넌트 ── */

function StatCard({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4 text-center">
      <p className="font-mono text-2xl font-extrabold text-accent-2">{n}</p>
      <p className="mt-1 text-xs text-foreground-muted">{l}</p>
    </div>
  );
}

function RoleCard({
  title,
  subtitle,
  color,
  children,
}: {
  title: string;
  subtitle: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h4 className={`text-base font-bold ${color}`}>{title}</h4>
      <p className="text-xs text-foreground-muted">{subtitle}</p>
      <div className="mt-2 font-serif text-sm text-foreground">{children}</div>
    </div>
  );
}

function Tr({ cells, highlight }: { cells: string[]; highlight?: boolean }) {
  return (
    <tr className={highlight ? "bg-accent/5" : ""}>
      {cells.map((c, i) => (
        <td key={i} className={`border-b border-border py-2 ${i < cells.length - 1 ? "pr-4" : ""} ${i === 0 ? "font-semibold" : ""}`}>
          {c}
        </td>
      ))}
    </tr>
  );
}

function RefList({ refs }: { refs: [string, string][] }) {
  return (
    <ul className="my-4 space-y-1 pl-0">
      {refs.map(([label, url]) => (
        <li key={url} className="text-sm">
          <a href={url} target="_blank" rel="noreferrer" className="text-foreground-muted hover:text-accent-2 hover:underline">
            {label} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}
