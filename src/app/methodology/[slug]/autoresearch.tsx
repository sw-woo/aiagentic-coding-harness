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
        AI 가 스스로 실험하고, 스스로 평가하고, 스스로 개선하는 <strong>목표달성 루프</strong>(목표를 향해
        시도→측정→개선을 반복하는 구조)가
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
        2025년 초만 해도 대부분의 개발자는 ChatGPT 나 Copilot 에 코드 조각을 요청하고, 결과를 복사-붙여넣기하는 수준이었습니다.
        그러나 2025년 말부터 Claude Code, Cursor, Codex 같은 코딩 에이전트가 등장하면서
        &ldquo;에이전트에게 작업을 맡기고, 인간은 감독한다&rdquo; 는 패턴이 빠르게 확산되었습니다.
        문제는 에이전트가 장시간 작업할수록 초기 규칙을 점점 잊어버리거나(Context Drift — 대화가 길어지면 처음 지시를 놓치는 현상),
        에러가 나면 엉뚱한 방향으로 폭주하거나,
        심지어 평가 기준 자체를 속이는(Reward Hacking — 점수를 올리기 위해 정당하지 않은 편법을 쓰는 행위) 행동이 발생한다는 것이었습니다.
        이 구조적 문제를 해결하기 위해 하네스 엔지니어링이 등장했습니다.
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

      <ProseParagraph>
        AutoResearch 의 설계에서 가장 영리한 부분은 &ldquo;누가 무엇을 수정할 수 있는가&rdquo;를 파일 단위로 엄격히 분리한 것입니다.
        이 분리가 중요한 이유는 세 가지입니다. 첫째, 에이전트가 채점 기준을 고쳐서 점수를 부풀리는 부정행위(보상 해킹)를 물리적으로 차단합니다.
        둘째, 에이전트가 건드릴 수 있는 범위를 630줄 단일 파일로 한정하여, AI 가 전체 코드를 한눈에 파악할 수 있게 합니다.
        셋째, 인간의 역할을 &ldquo;코드를 직접 쓰는 것&rdquo;에서 &ldquo;방향과 전략을 정하는 것&rdquo;으로 전환시킵니다.
      </ProseParagraph>

      <div className="my-6 grid gap-4 sm:grid-cols-3">
        <RoleCard title="prepare.py" subtitle="불변의 평가자" color="text-green-400">
          데이터, 토크나이저, <code>evaluate_bpb</code> 채점 함수. 에이전트도 인간도 수정 불가.
          채점 기준 조작을 원천 차단합니다.
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

      <ProseParagraph>
        program.md 에 정의된 실행 루프는 코드가 아니라 영어 산문으로 기술되어 있습니다.
        에이전트는 이 마크다운 파일을 읽고 지시를 따릅니다.
        핵심은 Git 을 에이전트의 기억 장치로 활용한다는 점입니다 — 벡터 데이터베이스도 임베딩도 필요 없습니다.
        <code>git log</code>로 무엇이 효과가 있었는지, <code>results.tsv</code>로 이미 시도한 것을 확인합니다.
        아침에 일어나면 성공한 변경만 남은 깨끗한 브랜치와, 실패를 포함한 전체 이력이 기다리고 있습니다.
      </ProseParagraph>

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

      <Callout tone="note" title="한국어 해석">
        <strong>할 수 있는 것:</strong> train.py 를 수정하십시오 — 수정할 수 있는 파일은 이것뿐입니다.
        아키텍처, 옵티마이저, 하이퍼파라미터, 학습 루프, 배치 크기, 모델 크기 — 무엇이든 자유롭게 바꿀 수 있습니다.
        <br /><br />
        <strong>할 수 없는 것:</strong> prepare.py 를 수정할 수 없습니다 (읽기 전용). 새 패키지를 설치하거나 의존성을 추가할 수 없습니다. 평가 도구를 수정할 수 없습니다.
      </Callout>

      <CodeBlock filename="program.md (발췌 2 — Simplicity Criterion)" language="markdown">
{`**Simplicity criterion**: simpler is better.
A 0.001 val_bpb improvement that adds 20 lines of
hacky code? Probably not worth it.
A 0.001 improvement from deleting code? Definitely keep.`}
      </CodeBlock>

      <Callout tone="note" title="한국어 해석">
        <strong>단순함 기준</strong>: 단순한 것이 좋습니다.
        지저분한 코드 20줄을 추가해서 val_bpb 를 0.001 개선했다면? 아마 그럴 가치가 없습니다.
        코드를 삭제해서 0.001 개선했다면? 무조건 유지하십시오.
      </Callout>

      <CodeBlock filename="program.md (발췌 3 — NEVER STOP)" language="markdown">
{`**NEVER STOP**: The human might be asleep.
You are autonomous. If you run out of ideas,
think harder — read papers referenced in the code,
try combining previous near-misses,
try more radical architectural changes.
The loop runs until the human interrupts you, period.`}
      </CodeBlock>

      <Callout tone="note" title="한국어 해석">
        <strong>절대 멈추지 마십시오</strong>: 인간이 자고 있을 수 있습니다.
        당신은 자율적입니다. 아이디어가 바닥나면, 더 깊이 생각하십시오 — 코드에 참조된 논문을 읽고,
        이전에 아깝게 실패한 시도들을 조합해 보고, 더 과감한 구조 변경을 시도하십시오.
        이 루프는 인간이 중단할 때까지 계속됩니다. 예외 없습니다.
      </Callout>

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

      <ProseHeading level={3}>val_bpb — 왜 이 메트릭인가</ProseHeading>

      <ProseParagraph>
        val_bpb(validation bits-per-byte)는 &ldquo;모델이 텍스트를 얼마나 효율적으로 압축하는가&rdquo;를 측정하는 점수입니다.
        쉽게 말하면, 원본 텍스트 1바이트를 표현하는 데 몇 비트가 필요한지를 나타냅니다 — 낮을수록 모델이 텍스트를 잘 이해한다는 뜻입니다.
        이 점수가 선택된 이유가 중요합니다. 일반적인 loss 나 perplexity 는 단어 사전의 크기에 따라 달라지기 때문에,
        에이전트가 단어 분리 방식을 바꾸면 공정한 비교가 불가능해집니다.
        val_bpb 는 단어 사전과 무관하게 작동하므로, 에이전트가 구조를 어떻게 바꾸든 실험 결과를 공정하게 비교할 수 있습니다.
        판단 기준도 단순합니다 — 숫자가 낮아지면 개선, 높아지면 실패. 에이전트가 혼란을 겪을 여지가 없습니다.
      </ProseParagraph>

      <ProseParagraph>
        5분 고정 예산도 단순한 편의가 아닙니다. 모든 실험이 똑같은 시간(실제 벽시계 기준 5분) 안에서 실행되므로,
        모델을 크게 만들든 한 번에 처리하는 데이터 양을 줄이든 동일 조건에서 직접 비교가 가능합니다.
        이 제약은 에이전트가 &ldquo;무조건 크게 만들면 좋다&rdquo; 가 아니라, 주어진 GPU 에서 가장 효율적인 설정을 찾도록 강제합니다.
        Shopify CEO Tobi Lutke 의 사례에서 0.8B 모델이 수동 튜닝 1.6B 모델을 능가한 것은 이 제약 덕분입니다.
      </ProseParagraph>

      <ProseHeading level={3}>700회 실험의 구체적 결과</ProseHeading>

      <ProseParagraph>
        Karpathy 는 depth=12 의 nanochat 모델을 대상으로 이틀 동안 약 700회의 실험을 진행했습니다.
        에이전트가 발견한 최적화 중 특히 주목할 만한 것은 QK-Norm 구현의 버그입니다.
        어텐션의 선명도를 높이는 스칼라 승수가 누락되어 있었는데, Karpathy 본인이 수개월간 놓친 것을 에이전트가 찾아냈습니다.
        이것은 에이전트가 단순히 하이퍼파라미터를 무차별 대입하는 것이 아니라, 실제 코드 수준의 구조적 문제를 발견할 수 있다는 증거입니다.
      </ProseParagraph>

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
        이것은 직관에 반하는 진실입니다. 강력한 모델에게 절대적 자유를 주면,
        모델은 막대한 컴퓨팅을 사용해 쓸모없는 변형을 탐색하고, 불필요한 파라미터를 조정하고,
        기반 아키텍처를 부수는 데 낭비합니다.
        검색 공간을 극단적으로 축소하면 — 모델은 남은 공간 안에서 정말로 의미 있는 개선에만 집중합니다.
      </ProseParagraph>

      <ProseHeading level={3}>AutoGPT 는 왜 실패하고 AutoResearch 는 왜 성공했는가</ProseHeading>

      <ProseParagraph>
        2023년에 등장한 AutoGPT 는 &ldquo;자율적으로 작업을 수행하는 AI 에이전트&rdquo; 라는 비전으로 큰 주목을 받았지만,
        실제로는 대부분의 사용자가 유의미한 결과를 얻지 못했습니다.
        핵심 원인은 에이전트에게 너무 많은 자유도를 부여한 것입니다.
        인터넷 검색, 파일 생성, 코드 실행, 자기 프롬프트 수정까지 모두 가능하니,
        에이전트는 방향을 잡지 못하고 같은 실패를 반복하거나 컨텍스트 윈도우를 소진했습니다.
        AutoResearch 는 이 모든 자유를 제거하고 &ldquo;이 파일 하나만 수정하라, 이 숫자 하나만 낮춰라&rdquo; 로 한정한 것입니다.
      </ProseParagraph>

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
        AutoResearch 의 모든 구성 요소가 <strong>가이드</strong>(행동 전에 방향을 알려주는 것)와{" "}
        <strong>센서</strong>(행동 후에 결과를 측정하는 것)로 깔끔하게 분류됩니다.
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
        program.md(방향 지시)만 있고 prepare.py(자동 채점)가 없으면 에이전트가 채점 기준을 조작할 수 있습니다.
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
        구체적으로 실패의 4대 원인은 다음과 같습니다.
        첫째, <strong>가이드 부재(No Guides)</strong> — 에이전트에게 방향을 제시하는 문서가 없어 추측하게 방치합니다.
        둘째, <strong>센서 부재(No Sensors)</strong> — 에이전트의 출력을 검증하는 장치가 없어 오류가 조용히 누적됩니다.
        셋째, <strong>늦은 거버넌스(Late Governance)</strong> — 데모까지는 잘 되다가 프로덕션에서 무너집니다.
        넷째, <strong>과잉 엔지니어링(Over-Engineering)</strong> — 제약이 너무 많아 에이전트가 움직일 수 없습니다.
      </ProseParagraph>

      <ProseHeading level={3}>LangChain Terminal Bench — 하네스의 증거</ProseHeading>

      <ProseParagraph>
        이 주장이 과장이 아니라는 것을 가장 극적으로 증명한 사례가 LangChain 의 Terminal Bench 실험입니다.
        Terminal Bench 2.0 은 ML, 디버깅, 생물학 등 89개 작업으로 구성된 코딩 에이전트 벤치마크입니다.
        LangChain 팀은 모델을 <code>gpt-5.2-codex</code>로 고정한 채, 하네스만 개선했습니다.
        자가 검증 루프(에이전트가 종료를 선언하기 전에 반드시 테스트를 실행하도록 강제), 둠 루프 감지(같은 파일을 N 번 수정하면 접근 방식 재고를 주입),
        그리고 추론 예산 관리(계획과 검증에는 높은 추론, 중간 실행에는 낮은 추론)를 적용했습니다.
        결과: <strong>52.8% → 66.5% (+13.7 포인트), 순위 30위 → 5위</strong>.
      </ProseParagraph>

      <ProseQuote cite={{ label: "LangChain Blog, Improving Deep Agents with Harness Engineering, 2026년 2월", href: "https://blog.langchain.com/improving-deep-agents-with-harness-engineering/" }}>
        같은 모델. 다른 하네스. 극적으로 다른 결과.
      </ProseQuote>

      <ProseHeading level={3}>OpenAI Codex 100만 줄 실험</ProseHeading>

      <ProseParagraph>
        OpenAI 내부 팀이 5개월간 수행한 이 실험은 하네스 설계의 위력을 가장 극적으로 보여줍니다.
        3명으로 시작해 7명으로 확장한 팀이 거대한 프롬프트 대신 저장소 자체를 진실의 원천(Source of truth)으로 활용했습니다.
        린터와 구조적 테스트로 아키텍처를 기계적으로 강제하되, 구현 선택은 에이전트에게 자유를 주었습니다.
        엔트로피가 증가하는 것을 막기 위해 가비지 컬렉션 전담 에이전트도 도입했습니다.
        Codex 에이전트는 한 번에 6시간 이상 자율적으로 운영되었습니다.
      </ProseParagraph>

      <div className="my-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard n="0줄" l="인간 코드" />
        <StatCard n="100만" l="프로덕션 코드" />
        <StatCard n="1,500" l="병합된 PR" />
        <StatCard n="3.5/일" l="엔지니어당 PR" />
        <StatCard n="10x" l="속도 향상" />
        <StatCard n="5개월" l="기간 (3→7명)" />
      </div>

      <ProseHeading level={3}>생성과 검토의 비대칭 (Generation-Review Asymmetry)</ProseHeading>

      <ProseParagraph>
        AI 는 코드를 쓸 때와 검토할 때 전혀 다른 성능을 보입니다.
        &ldquo;Broken by Default&rdquo; 연구가 수학적 증명 도구(Z3 솔버)로 AI 가 작성한 코드 3,500개를 검증한 결과,
        AI 는 코드를 쓸 때 55.8%의 보안 취약점을 만들지만, 같은 AI 에게 &ldquo;이 코드에 문제가 있는가?&rdquo;라고 물으면 78.7%를 정확히 찾아냅니다.
        즉, AI 는 안전한 코드를 쓸 능력은 있지만 쓰는 순간에는 그 능력을 발휘하지 못합니다.
        코드를 쓰는 역할과 검토하는 역할을 분리하는 것이 하네스에서 필수적인 이유입니다 (arxiv.org, 2604.05292).
      </ProseParagraph>

      <ProseParagraph>
        구체적으로 어떤 문제가 발생하는지 살펴보겠습니다.
        가장 흔한 취약점은 SQL Injection(사용자가 입력한 값을 검증 없이 데이터베이스 쿼리에 넣어 해킹 통로를 여는 것),
        Path Traversal(<code>../</code>을 이용해 접근 금지된 상위 폴더에 침입하는 것), Buffer Overflow(메모리 범위를 넘어서 쓰는 것)입니다.
        재미있는 점은, 같은 AI 에게 &ldquo;이 코드에 보안 문제가 있니?&rdquo; 라고 물으면
        방금 자신이 만든 SQL Injection 을 정확히 짚어낸다는 것입니다.
        왜 이런 일이 벌어질까요? AI 가 코드를 쓸 때는 &ldquo;자연스럽고 간결한 코드&rdquo;를 우선하지만,
        검토할 때는 &ldquo;보안 패턴&rdquo;에 집중하기 때문입니다 — 같은 모델이 역할에 따라 다르게 작동합니다.
      </ProseParagraph>

      <ProseParagraph>
        더 충격적인 것은 ESLint, Bandit 같은 기존 코드 검사 도구의 탐지율이 <strong>2.2%</strong>에 불과하다는 점입니다.
        97.8%의 취약점이 이 도구들을 아무 문제 없이 통과합니다. 그래서 AutoResearch 의 prepare.py 같은 자동 채점 장치와,
        AI 가 스스로 자기 코드를 검토하는 장치를 <strong>둘 다</strong> 갖추어야 합니다.
        하네스에서 &ldquo;코드를 쓰는 역할&rdquo;과 &ldquo;코드를 검증하는 역할&rdquo;을 분리하면,
        같은 AI 라도 역할만 바꿔서 78.7%의 취약점을 걸러낼 수 있습니다.
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

      <ProseParagraph>
        Harrison Chase 가 Claude Code 를 분석해서 찾아낸 핵심 패턴은 세 가지입니다.
        첫째, <strong>Todo 도구를 아무것도 안 하게 만듭니다</strong>. Claude Code 의 <code>write_todos</code> 도구는
        실제로 어디에 저장하지 않습니다 — AI 가 &ldquo;할 일 목록을 쓴다&rdquo;는 행위 자체가
        대화 맥락 안에 체계적인 계획을 남기는 것이 목적입니다.
        마치 시험 전에 풀이 계획을 먼저 적으면 실수가 줄어드는 것과 같습니다.
        둘째, <strong>파일시스템을 공유 작업 공간</strong>으로 활용합니다.
        에이전트가 임시 파일에 중간 결과를 쓰고, 서브에이전트가 그 파일을 읽는 방식으로
        컨텍스트 윈도우의 한계를 우회합니다. 메모리가 아니라 디스크가 에이전트 간 통신 채널이 됩니다.
        셋째, <strong>대화가 길어지면 자동으로 요약</strong>합니다.
        AI 가 기억할 수 있는 분량(컨텍스트 윈도우)의 85%를 채우면, 과거 대화를 자동 압축하여 최신 내용만 남깁니다.
        이 세 패턴이 결합되면 에이전트가 수 시간 동안 맥락을 잃지 않고 작업을 지속할 수 있습니다.
      </ProseParagraph>

      <Mermaid
        chart={`graph LR
    A["LangChain\n(Framework)\n모델 · 도구 · 프롬프트"] --> B["LangGraph\n(Runtime)\n상태 · 그래프 · 체크포인트"]
    B --> C["Deep Agents\n(Harness)\n계획 · 파일시스템 · 서브에이전트"]

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

      <ProseHeading level={3}>AI Scientist-v2 — 에이전틱 트리 탐색으로 논문 작성</ProseHeading>

      <ProseParagraph>
        Sakana AI 의 AI Scientist-v2 는 AutoResearch 의 단일 루프를 <strong>트리 탐색</strong>으로 확장합니다.
        하나의 가설에서 시작하여 여러 갈래로 분기하고, 각 갈래의 실험 결과를 평가하여
        가장 유망한 경로를 깊이 탐색합니다(바둑 AI AlphaGo 가 수를 탐색하는 것과 같은 방식입니다).
        실험 결과를 바탕으로 LaTeX 논문까지 자동 생성하며, 실제로 ICLR 피어리뷰를 통과한 논문이 나왔습니다.
        AutoResearch 가 &ldquo;하나의 메트릭을 개선하는 직선&rdquo;이라면,
        AI Scientist-v2 는 &ldquo;연구 공간 전체를 탐색하는 나무&rdquo;입니다.
      </ProseParagraph>

      <ProseHeading level={3}>Darwin Gödel Machine — 자기 코드를 수정하는 AI</ProseHeading>

      <ProseParagraph>
        같은 Sakana AI 의 Darwin Gödel Machine(DGM)은 한 단계 더 나아갑니다.
        AutoResearch 에서 에이전트는 train.py 만 수정하지만, DGM 에서 에이전트는 <strong>자기 자신의 추론 코드</strong>까지 수정합니다.
        &ldquo;연구하는 AI&rdquo; 가 아니라 &ldquo;스스로 진화하는 AI&rdquo;입니다.
        개방형 진화(open-ended evolution)를 채택하여, 사전에 정의된 메트릭 없이도
        다양성과 신기함(novelty)을 기준으로 자기 개선 방향을 탐색합니다.
        이 접근법의 위험성은 안전성 섹션에서 다룹니다.
      </ProseParagraph>

      <ProseHeading level={3}>AlphaEvolve — 진화적 코딩으로 수학 문제 해결</ProseHeading>

      <ProseParagraph>
        DeepMind 의 AlphaEvolve 는 코드 변이(mutation)와 선택(selection)을 반복하는
        진화적 접근법을 사용합니다.
        LLM 이 코드 변이를 제안하고, 자동 평가기가 적합도를 측정하고, 상위 후보만 다음 세대로 전달합니다.
        이 방법으로 새로운 활성화 함수를 발견하고 행렬 곱셈 알고리즘을 개선한 사례가 보고되었습니다.
        AutoResearch 의 &ldquo;수정-측정-선택&rdquo; 루프와 동일한 원리를 집단 수준에서 적용한 것입니다.
      </ProseParagraph>

      <ProseHeading level={3}>AutoSOTA — 8-에이전트 파이프라인</ProseHeading>

      <ProseParagraph>
        AutoSOTA(arXiv 2604.05550)는 가장 야심적인 시스템입니다.
        8개의 전문화된 에이전트(PaperReader, DatasetCollector, AgentCoder, TrainRunner,
        BenchmarkEvaluator, AgentDebugger, AgentReflector, AgentSupervisor)가
        논문에서 아이디어를 읽고 → 데이터셋을 수집하고 → 코드를 작성하고 → 학습하고 → 벤치마크를 측정하고 →
        디버깅하고 → 반성하고 → 감독합니다.
        AgentSupervisor 가 <strong>Red Line System</strong>으로 7가지 치팅 패턴을 차단합니다.
        특히 R1(메트릭 변경 금지)과 R3(출력 하드코딩 금지)은
        AutoResearch 의 prepare.py 불변 원칙과 정확히 같은 철학입니다.
      </ProseParagraph>

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
        자기개선 사이클이 반복될수록 초기에는 표류 없이 저비용으로 높은 품질 향상이 일어나지만,
        후반 사이클(2~3회 이후)로 갈수록 품질을 올리기 위해 더 큰 표류를 감수해야 합니다.
        유창성(Fluency)과 사실성(Factuality) 사이에 도메인 특화적 긴장이 발생하기도 합니다.
        AutoSOTA 의 AgentSupervisor 가 Red Line System 으로 치팅을 차단하는 것도 이 문제 때문입니다 —
        메트릭 변경 금지(R1), 출력 하드코딩 금지(R3), 데이터셋 누출 금지(R6) 등
        7가지 규칙을 위반하는 어떤 최적화도 과학적으로 무가치한 것으로 간주됩니다.
      </ProseParagraph>

      <ProseParagraph>
        SAHOO 프레임워크(안전한 고차 최적화를 위한 정렬 보호 체계)는 이러한 방향 이탈을 수학적으로 통제하기 위해 세 가지 안전장치를 제시합니다.
        첫째, <strong>목표 이탈 지수(GDI)</strong> — &ldquo;원래 목표에서 얼마나 벗어났는가?&rdquo;를 숫자로 측정합니다.
        둘째, <strong>규칙 보존 검사</strong> — &ldquo;절대 깨뜨리면 안 되는 규칙을 위반했는가?&rdquo;를 자동 확인합니다.
        셋째, <strong>퇴보 위험 측정</strong> — &ldquo;이전에 이룬 성과를 되돌리고 있는가?&rdquo;를 감지하여 멈출 시점을 알려 줍니다
        (arxiv.org, 2603.06333).
      </ProseParagraph>

      <Mermaid
        chart={`flowchart TD
    START["Initial State"] --> S1["Cycle 1: +8% perf / 2% drift"]
    S1 --> S2["Cycle 2: +5% perf / 5% drift"]
    S2 --> S3["Cycle 3: +2% perf / 12% drift"]
    S3 --> S4["Cycle 4: +1% perf / 25% drift"]
    S4 --> STOP{"SAHOO Halt?"}

    STOP -->|"Violation"| REVERT["Revert All"]
    STOP -->|"Pass"| NEXT["Next Cycle"]

    R1["R1: No metric change"] -.-> STOP
    R3["R3: No hardcoded output"] -.-> STOP
    R6["R6: No data leak"] -.-> STOP
    GDI["GDI: Goal Drift Index"] -.-> STOP
    IMM["prepare.py immutable"] -.-> STOP

    style S1 fill:#064e3b,stroke:#10b981,color:#e2e8f0
    style S2 fill:#064e3b,stroke:#10b981,color:#e2e8f0
    style S3 fill:#7f1d1d,stroke:#ef4444,color:#e2e8f0
    style S4 fill:#7f1d1d,stroke:#ef4444,color:#e2e8f0
    style STOP fill:#1e3a5f,stroke:#f59e0b,color:#e2e8f0
    style REVERT fill:#7f1d1d,stroke:#ef4444,color:#e2e8f0
    style NEXT fill:#064e3b,stroke:#10b981,color:#e2e8f0`}
        caption="자기개선 루프의 안전성 구조 — 사이클이 반복될수록 표류가 증가하며, SAHOO + Red Line 이 임계점에서 중단합니다"
      />

      <ProseHeading level={3}>트레이드오프의 한계선 — 언제 멈춰야 하는가</ProseHeading>

      <ProseParagraph>
        자기개선 루프를 반복하면 &ldquo;득과 실의 경계선&rdquo;이 나타납니다.
        처음 1~2회 사이클에서는 적은 부작용으로 큰 성능 향상을 얻을 수 있습니다.
        그러나 사이클이 반복될수록 성능을 1% 올리기 위해 원래 목표에서 10%나 벗어나야 하는 영역에 진입합니다.
        이 지점이 &ldquo;더 이상 개선이 아니라 악화&rdquo;인 순간이며, SAHOO 의 퇴보 위험 측정이 이 임계점을 자동으로 감지합니다.
      </ProseParagraph>

      <ProseParagraph>
        AutoResearch 는 이 문제를 우아하게 회피합니다.
        val_bpb 는 단일 스칼라 메트릭이므로 &ldquo;정렬 표류&rdquo; 차원이 존재하지 않습니다 —
        숫자가 낮아지면 무조건 좋고, 높아지면 무조건 revert 합니다.
        그러나 이 접근법을 다차원 문제(예: 코드 품질 + 보안 + 성능)에 적용하면
        하나의 점수를 올리다가 다른 점수가 떨어지는 &ldquo;풍선 효과&rdquo;(풍선의 한쪽을 누르면 다른 쪽이 부풀어 오르는 것)가 발생합니다.
        실무에서는 메인 점수 1개 + &ldquo;이것만은 지켜라&rdquo; 제약 N개를 조합하는 것이 권장됩니다.
        예를 들어, 메인 점수는 <code>pytest 실행 시간</code>(빠를수록 좋음), 제약은 <code>테스트 전부 통과</code> + <code>코드 경고 0건</code>입니다.
      </ProseParagraph>

      <Callout tone="warning" title="Darwin Gödel Machine 의 경고">
        Sakana AI 의 DGM 은 자기 자신의 추론 코드까지 수정합니다.
        만약 에이전트가 &ldquo;안전 검사 코드를 비효율적이라고 판단하여 삭제&rdquo;하면
        더 이상 안전 검사가 작동하지 않습니다.
        AutoResearch 의 prepare.py 불변 원칙은 이 시나리오를 물리적으로 차단하는 것이며,
        자기개선 AI 를 설계할 때 <strong>평가자의 불변성</strong>은 타협할 수 없는 원칙입니다.
      </Callout>

      {/* ════════════════════════════════════════════════════════
          Part 5.5. 컨텍스트 엔지니어링
          ════════════════════════════════════════════════════════ */}
      <ProseHeading level={2}>컨텍스트 엔지니어링 — 올바른 토큰을 공급하는 기술</ProseHeading>

      <ProseParagraph>
        Karpathy 는 &ldquo;프롬프트 엔지니어링&rdquo;이라는 용어가 오해를 유발한다고 지적했습니다.
        실제로 중요한 것은 단일 프롬프트를 다듬는 것이 아니라,
        AI 가 한 번에 읽을 수 있는 범위(컨텍스트 윈도우)에 <strong>올바른 정보를 올바른 순서로 공급</strong>하는 전체 시스템을 설계하는 것입니다.
        이것이 <strong>컨텍스트 엔지니어링</strong>입니다.
      </ProseParagraph>

      <ProseParagraph>
        AutoResearch 에서 컨텍스트 엔지니어링이 어떻게 작동하는지 구체적으로 살펴보겠습니다.
        에이전트가 매 실험 사이클마다 읽는 정보량은 다음과 같습니다:
        (1) program.md 전략 지시(약 2,000 토큰 — A4 1장 분량),
        (2) train.py 전체 소스(약 3,000 토큰 — 630줄이므로 한눈에 파악 가능),
        (3) results.tsv 최근 실험 이력(약 500 토큰),
        (4) git log 최근 커밋 메시지(약 300 토큰).
        합계 약 6,000 토큰이면 에이전트가 전체 상황을 완벽히 파악합니다.
        AI 가 한 번에 읽을 수 있는 분량(200K 토큰)의 고작 3%만 사용하므로, 대화가 길어져서 앞의 내용을 잊어버리는 문제가 원천적으로 발생하지 않습니다.
      </ProseParagraph>

      <ProseParagraph>
        이것을 범용 에이전트와 비교하면 차이가 극명합니다.
        대규모 코드베이스를 다루는 에이전트는 수만 줄의 코드를 읽어야 하고,
        컨텍스트 윈도우가 빠르게 포화되어 초기 지시를 잊기 시작합니다.
        Deep Agents 가 &ldquo;컨텍스트 85% 도달 시 자동 요약&rdquo;을 구현한 것도 이 문제 때문입니다.
        AutoResearch 의 630줄 제약은 단순한 편의가 아니라, <strong>컨텍스트 엔지니어링의 핵심 설계 결정</strong>입니다.
      </ProseParagraph>

      <div className="my-6 grid gap-4 sm:grid-cols-3">
        <RoleCard title="Write (공급)" subtitle="무엇을 넣을 것인가" color="text-green-400">
          program.md, AGENTS.md, 시스템 프롬프트, 규칙 파일 — 에이전트가 행동하기 전에 읽는 모든 문서
        </RoleCard>
        <RoleCard title="Select (선택)" subtitle="무엇을 빼낼 것인가" color="text-amber-400">
          RAG 검색, 파일 선별, 자동 요약 — 200K 윈도우에서 관련 정보만 골라내는 필터
        </RoleCard>
        <RoleCard title="Compress (압축)" subtitle="같은 의미, 적은 토큰" color="text-accent-2">
          대화 이력 압축, 결과 요약, 코드 범위 제한 — AutoResearch 의 630줄 제약이 대표적
        </RoleCard>
      </div>

      <ProseQuote cite={{ label: "Andrej Karpathy", href: "https://pjfp.com/andrej-karpathy-on-autoresearch-ai-agents-and-why-he-stopped-writing-code-full-breakdown-of-his-2026-no-priors-interview/" }}>
        프롬프트 엔지니어링이라고 부르지 마십시오. 실제로 하고 있는 것은 컨텍스트 엔지니어링입니다.
      </ProseQuote>

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
        AutoResearch 의 패턴은 ML 학습에만 국한되지 않습니다.
        이미 Shopify 의 Liquid 템플릿 엔진(53% 속도 향상), Pytest 테스트 스위트(295초→71초),
        Rust 스도쿠 솔버(312실험으로 4/6 벤치 1위), SQLite 데이터 수집(588배 속도 향상),
        브라우저 에이전트(Mind2Web 97% 도달) 등 다양한 도메인에서 동일한 패턴이 성공적으로 적용되었습니다.
      </ProseParagraph>

      <ProseParagraph>
        커뮤니티에서는 이 패턴을 <strong>&ldquo;The Karpathy Loop&rdquo;</strong> 공식으로 정리합니다:
        AGENT + CONSTRAINED_SCOPE + SCALAR_METRIC + FAST_VERIFICATION = AUTONOMOUS_IMPROVEMENT.
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

      <ProseHeading level={3}>레벨 2→3 실천 가이드: 첫 번째 하네스 만들기</ProseHeading>

      <ProseParagraph>
        대부분의 팀이 레벨 2(채팅 복붙)에 머물러 있습니다. 레벨 3으로 올라가려면 <strong>AGENTS.md</strong> 파일 하나만 작성하면 됩니다.
        이 파일에 &ldquo;이 저장소의 테스트는 반드시 <code>pytest</code>로 실행한다&rdquo;,
        &ldquo;Python 파일은 <code>ruff format</code>을 적용한다&rdquo; 같은 규칙을 산문으로 적습니다.
        그 다음, 에이전트가 PR 을 올릴 때 자동으로 <code>pytest</code>와 <code>ruff check</code>를 실행하는 CI 훅을 추가합니다.
        이것만으로 에이전트의 출력 품질이 극적으로 향상됩니다.
      </ProseParagraph>

      <ProseHeading level={3}>레벨 3→4 실천 가이드: 센서 추가</ProseHeading>

      <ProseParagraph>
        레벨 3 에서 레벨 4 로 올라가는 핵심은 &ldquo;인간의 전수 리뷰&rdquo;를 &ldquo;자동화된 센서&rdquo;로 대체하는 것입니다.
        구체적으로: (1) 타입 체크(<code>tsc --noEmit</code>), (2) 린터(<code>eslint</code>),
        (3) 단위 테스트(<code>jest/pytest</code>), (4) 빌드 검증(<code>next build</code>)을
        에이전트의 작업 완료 조건으로 강제합니다.
        에이전트가 이 네 가지를 모두 통과하지 않으면 커밋할 수 없도록 하는 것입니다.
        AutoResearch 의 prepare.py 가 하는 역할과 정확히 동일합니다.
      </ProseParagraph>

      <ProseHeading level={3}>레벨 4→5 실천 가이드: 플라이휠</ProseHeading>

      <ProseParagraph>
        레벨 5 는 에이전트가 하네스 자체를 개선하는 단계입니다.
        예를 들어, 에이전트가 반복적으로 같은 유형의 버그를 만든다면,
        리뷰어 에이전트가 이 패턴을 감지하고 AGENTS.md 에 새 규칙을 제안합니다.
        인간은 이 제안을 승인만 하면 됩니다.
        이것이 바로 &ldquo;모델이 좋아져서가 아니라 시스템이 학습하기 때문에&rdquo; 에이전트 품질이 올라가는 구조입니다.
        현재 이 수준에 도달한 조직은 전체의 약 5% 미만으로 추정됩니다.
      </ProseParagraph>

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
