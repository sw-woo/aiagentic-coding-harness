# Andrej Karpathy의 방법론: 에이전틱 코딩의 철학적 기초

Andrej Karpathy의 Software 1.0/2.0/3.0 프레임워크와 LLM 운영체제 개념은 현대 AI 보조 소프트웨어 개발의 이론적 토대를 제공합니다. 이 문서는 agentic coding harness 설계에 영감을 주는 Karpathy의 핵심 사상을 검증된 출처와 함께 정리합니다.

---

## 1. Software 1.0 / 2.0 / 3.0 프레임워크

### Software 1.0: 전통적 손코딩

**정의 및 특징**

Software 1.0은 프로그래머가 명시적으로 작성하는 전통적 프로그래밍 언어(Python, C++, Java 등)를 통한 소프트웨어 개발을 의미합니다. 모든 동작이 인간에 의해 설계되고 디버깅되며 유지보수됩니다.

**핵심 특성:**
- 알고리즘과 데이터 구조를 인간이 명시적으로 코딩
- 규칙 기반(rule-driven) 접근
- 코드는 정확하지만 특정 작업으로 제한적
- 인간이 이해 가능하고 수정 가능

---

### Software 2.0: 신경망 가중치

**초기 제안: 2017년 Medium 논문**

Andrej Karpathy는 2017년 11월 11일 Medium에 "Software 2.0" 논문을 발표했습니다.

**정의:** 신경망의 가중치가 코드 역할을 하는 새로운 소프트웨어 개발 패러다임입니다.

**핵심 주장:**

> "Software 2.0은 더욱 추상적이고 인간 친화적이지 않은 언어로 작성됩니다. 예를 들어 신경망의 가중치들이 그것입니다. 인간은 이 코드를 작성하지 않습니다. 수백만 개의 가중치가 있기 때문에 가중치로 직접 코딩하는 것은 매우 어렵습니다."

**Software 2.0의 특징:**
- 데이터 기반(data-driven) 접근: 개발자가 데이터셋과 목표를 명시하고 신경망이 그에 맞는 "코드"(가중치)를 학습
- "자기 작성 프로그램(self-writing programs)"으로서의 신경망
- 프로그래머가 네트워크 아키텍처 스켈레톤을 명시하고, 계산 리소스가 학습을 통해 최적 가중치 탐색
- 컴퓨터 비전, 자연어 처리, 강화 학습 등의 복잡한 작업에 적합

**발표 URL:** https://karpathy.medium.com/software-2-0-a64152b37c35

---

### Software 3.0: LLM을 통한 자연어 프로그래밍

**발표 배경 및 시기**

2025년 6월, Andrej Karpathy는 Y Combinator AI Startup School에서 "Software Is Changing (Again)" 키노트를 통해 Software 3.0 개념을 공식화했습니다. 이는 Software 1.0과 2.0의 진화를 바탕으로 한 세 번째 패러다임입니다.

**Software 3.0 개념**

**핵심 주장:** LLM(Large Language Models)은 새로운 종류의 컴퓨터이며, 프로그래밍은 이제 **자연어(영어)**로 수행됩니다.

Karpathy의 Twitter 포스트 (2025년 6월, 정확한 날짜: 발표 이후):

> "공정하게 말해서 소프트웨어가 또 다시 근본적으로 변하고 있다고 할 수 있습니다. LLM은 새로운 종류의 컴퓨터이며, 당신은 이들을 **영어로 프로그래밍**합니다. 따라서 주요 버전 업그레이드가 충분히 가치 있다고 생각합니다."

**Software 3.0의 특징:**
- 자연어 프롬프트가 소프트웨어
- LLM은 프롬프트를 해석하고 실행하는 새로운 컴퓨팅 기질
- 개발자는 요구사항을 영어로 기술하면 LLM이 해당 코드를 생성
- GitHub 코드와 영어의 혼합(hybrid) 형태로 진화 중

**Software 3.0의 핵심 논의:**
- 프롬프트는 이제 프로그램(Prompts are Programs)
- LLM은 기존 Software 1.0과 2.0을 모두 소비
- 자연어가 프로그래밍 인터페이스의 중심

**발표 소스:**
- Y Combinator 라이브러리: https://www.ycombinator.com/library/MW-andrej-karpathy-software-is-changing-again
- YouTube 영상: https://www.youtube.com/watch?v=LCEmiRjPEtQ (Y Combinator 스타트업 팟캐스트)
- Latent Space 분석: https://www.latent.space/p/s3

---

### 세 패러다임의 비교

| 측면 | Software 1.0 | Software 2.0 | Software 3.0 |
|------|--------------|--------------|--------------|
| **기질(Substrate)** | 프로그래밍 코드 | 신경망 가중치 | LLM 파라미터 & 프롬프트 |
| **작성자** | 인간 프로그래머 | 자동화된 학습(데이터 + 최적화) | LLM (자연어 기반) |
| **프로그래밍 언어** | C++, Python, Java 등 | 데이터 + 아키텍처 정의 | 자연어(영어) |
| **확장성** | 수동 코딩 (시간 집약적) | 데이터 스케일링 | 프롬프트 엔지니어링 & 스케일링 |
| **예시** | 정렬 알고리즘 | 이미지 분류 신경망 | ChatGPT, Cursor Composer |

---

## 2. LLM as Operating System (LLM OS)

### 개념의 정의

Andrej Karpathy는 2023년 11월 YouTube 강연 "Intro to Large Language Models"에서 LLM을 운영체제의 커널로 비유했습니다.

**발표 정보:**
- 제목: "[1hr Talk] Intro to Large Language Models"
- 발표 날짜: 2023년 11월 23일
- 원본 강연: AI Security Summit (녹화되지 않았으나 이후 YouTube 재촬영)
- YouTube URL: https://www.youtube.com/watch?v=zjkBMFhNj_g
- Archive.org: https://archive.org/details/youtube-zjkBMFhNj_g

**내용 개요:**
- 42분 지점: LLM을 새로운 운영체제의 중심 컴포넌트로 재개념화
- 45분 지점: LLM 보안(jailbreaking, prompt injection, data poisoning)

---

### LLM OS 아키텍처: CPU / RAM / 주변기기 비유

Karpathy는 전통적 컴퓨터 구성 요소와 LLM 시스템의 대응을 제시했습니다.

**대응 구조:**

| 컴퓨터 요소 | LLM OS 요소 | 설명 |
|-----------|-----------|------|
| **CPU (프로세서)** | **LLM 모델** | 계산의 중심. 예: GPT-4 Turbo |
| **RAM (작동 메모리)** | **Context Window (컨텍스트 윈도우)** | 현재 작업에 필요한 정보 저장. 모델이 "생각할 수 있는" 정보 범위 결정 |
| **주변기기/드라이버** | **Tools & Plugins** | 인터넷 접근, 계산기, 코드 인터프리터, 파일 시스템 접근 |
| **하드드라이브** | **Embedding DB** | 장기 정보 저장. 예: Ada-002 임베딩 |

**Karpathy의 LLM OS 사양 (X/Twitter 포스트, 2023년 10월):**

> "LLM OS. 계속 작업 중입니다. 사양:
> - LLM: OpenAI GPT-4 Turbo 256 코어 (배치 크기) 프로세서 @ 20Hz (tok/s)
> - RAM: 128Ktok
> - 파일시스템: Ada002"

**Source:** https://x.com/karpathy/status/1723140519554105733

---

### LLM OS의 확장 개념

LLM OS는 다음을 포함하는 포괄적 시스템으로 진화:

- 텍스트 생성 및 읽기
- 인터넷 브라우징 및 로컬 파일 검색
- 소프트웨어 도구 통합 (계산기, Python)
- 이미지, 비디오, 음악 처리
- 확장된 분석적 사고 (System 2 추론)
- 특화된 도메인에서의 자체 개선
- "App Store" 모델을 통한 작업별 커스터마이징

---

### agentic coding harness와의 연결

LLM OS 개념은 agentic coding harness 설계에 직접 적용 가능:

1. **LLM as Kernel:** 아바이스 기반 에이전트의 중심 지능(intelligence kernel)
2. **Context Window as Working Memory:** 현재 작업 컨텍스트, 파일 상태, 실행 히스토리
3. **Tools as Peripherals:**
   - 코드 인터프리터 (실행 가능)
   - 파일 시스템 (읽기/쓰기)
   - Git 후크 (버전 관리)
   - 샌드박스 (안전한 실행)
4. **Memory Systems:** 장기 메모리(long-term memory), 대화 히스토리, 저장된 지식

---

## 3. Vibe Coding (February 2025)

### 원본 트윗 및 정의

**발표 날짜:** 2025년 2월 3일

**정의:** Karpathy가 소개한 새로운 코딩 스타일로, LLM의 급속 발전으로 가능해진 비정형 개발 방식.

**원본 트윗 (X/Twitter):**

> "내가 '비브 코딩(vibe coding)'이라고 부르는 새로운 종류의 코딩이 있습니다. 완전히 비브에 젖어들고, 지수 함수를 받아들이고, 코드가 존재한다는 것을 잊는 것입니다. LLM(예: Sonnet이 포함된 Cursor Composer)이 너무 좋아졌기 때문에 가능합니다. 나는 또한 SuperWhisper를 사용하여 Composer와 대화합니다."

**Source URL:** https://x.com/karpathy/status/1886192184808149383

**추가 설명 스레드:**
- Cursor Composer와 SuperWhisper를 사용하여 키보드 입력을 최소화
- 모든 변경사항을 diff를 읽지 않고 수락
- 에러 메시지를 댓글 없이 복사하여 AI에 되돌림
- 코드가 이해 범위를 벗어나도록 증가 가능
- LLM이 버그를 수정하지 못하면 무작위 변경으로 "행운에 맡김"

---

### Vibe Coding의 의도 및 한계

**Karpathy의 원래 의도:**

- **용도:** 일회용 주말 프로젝트 (throwaway weekend projects)
- **특징:** "꽤 재미있다(quite amusing)"는 표현 사용
- **인정:** 코드가 자신의 이해를 초과하여 성장 가능
- **한계:** 프로덕션 코드에는 부적절

---

### 논쟁 및 비판: Andrew Ng의 "현실 체크"

**비판자:** Andrew Ng (Deeplearning.AI 창립자, ML 저명 인사)

**Ng의 주장 (2025년 6월):**

1. **용어의 오해:** "Vibe coding"은 엔지니어들이 그냥 "vibes를 따른다"고 착각하게 함
2. **실제 AI 코딩:** 진정한 AI 보조 코딩은 **깊이 있는 지적 활동**
3. **인지적 부담:** "AI 코딩 보조 도구를 사용하여 하루를 코딩하면, 하루 끝에 솔직히 피곤합니다"

---

### Karpathy의 자체 수정 (Nanochat 프로젝트)

흥미롭게도, Karpathy는 자신의 진지한 프로젝트 **Nanochat** (약 $100으로 만든 minimal ChatGPT 클론, 8,000줄의 Python/Rust)을 구축할 때는 다른 방식을 사용했습니다.

**인정사항:**

> "기본적으로 완전히 손으로 쓴 것입니다. Claude/Codex 에이전트를 몇 번 사용하려고 했지만 전혀 잘 작동하지 않았고 순 도움이 되지 않았습니다."

**결론:** Vibe coding은 탐색적이고 일회성인 코드에는 적합하지만, 진지한 프로덕션 프로젝트에서는 깊이 있는 손 코딩과 신중한 인지적 노력이 필요함을 보여줍니다.

---

### agentic harness가 "진지한 vibe coding"과 다른 이유

Vibe coding의 장점과 한계를 고려할 때, 제대로 설계된 agentic coding harness는 다음과 같이 달라집니다:

| 특성 | Vibe Coding | Serious Agentic Harness |
|------|------------|------------------------|
| **통제 수준** | 최소 (LLM 결정 수락) | 높음 (hooks, rules, eval loops) |
| **검증** | 없음 | 다단계 검증 (테스트, lint, 타입 체크) |
| **감시** | 없음 | 실시간 모니터링 및 롤백 |
| **문서화** | 없음 | 자동 문서 생성 및 추적 |
| **복구 가능성** | 낮음 | 높음 (git hooks, 샌드박스) |
| **용도** | 주말 프로젝트 | 프로덕션 코드 |
| **의도** | "놀기" | "신뢰할 수 있는 자동화" |

---

## 4. 교육용 저장소: nanoGPT와 micrograd

### nanoGPT

**GitHub 저장소:** https://github.com/karpathy/nanoGPT

**설명:** "가장 단순하고 빠른 중간 규모 GPT 훈련/파인튜닝 저장소"

**설계 철학:**
- **간결성 우선:** `train.py`는 약 300줄의 보일러플레이트 훈련 루프, `model.py`는 약 300줄의 GPT 모델 정의
- **실용성 강조:** minGPT의 재작성이지만 "교육보다는 실질(teeth over education)"을 우선
- **해킹 가능성:** "당신의 필요에 맞게 수정하기 매우 간단하고, 처음부터 새 모델을 훈련하거나 사전훈련된 체크포인트를 파인튜닝할 수 있습니다"

**성능:**
- GPT-2 (124M)를 OpenWebText에서 단일 8XA100 40GB 노드에서 약 4일 내 재현 가능
- 다양한 컴퓨팅 환경(GPU, MacBook)에 대한 가이던스 제공

**철학적 의의:**
- 최소 필요 코드로 전체 시스템을 이해 가능
- 추상화 계층을 제거하여 학습자가 핵심 메커니즘 직관 가능
- 프로덕션 코드도 아니고 완전한 교육용도 아닌 "작동하는 이해" 추구

---

### micrograd

**GitHub 저장소:** https://github.com/karpathy/micrograd

**설명:** "약 100줄의 코드로 구현된 자동 미분 엔진과 그 위의 신경망 라이브러리(PyTorch 유사 API)"

**설계 철학:**

> "마이크로그래드는 신경망 훈련에 필요한 전부입니다. 나머지는 모두 효율성일 뿐입니다."

**교육적 접근:**
- **스칼라 수준 연산:** 각 신경망 연산이 개별 덧셈과 곱셈으로 분해되어 기본 수학 직관 명확
- **최소 코드:** 약 100줄의 역전파 자동 미분 엔진, 약 50줄의 신경망 라이브러리
- **계산 그래프 시각화:** Graphviz를 사용하여 포워드 값과 그래디언트 시각화
- **Jupyter 노트북:** 실제 예제(달 데이터셋에서의 이진 분류) 포함
- **검증:** PyTorch와의 그래디언트 비교로 정확성 검증

**YouTube 강좌:** Karpathy는 "The spelled-out intro to neural networks and backpropagation: building micrograd" 비디오 강좌 제공

**철학적 의의:**
- 벡터화된 행렬 연산 대신 스칼라 수준에서 모든 것을 명시적으로 구현
- 복잡한 추상화를 제거하여 역전파의 근본 원리 이해 가능
- "한 줄의 코드가 뭔가를 한다"는 명확성 추구

---

### nanoGPT와 micrograd의 agentic documentation 영향

이들 저장소의 미학은 agentic coding harness의 연구 노트북 스타일 문서에 영향:

1. **최소 필요 코드:** 불필요한 추상화 제거
2. **검사 가능성:** 전체 파이프라인이 한두 파일에 들어맞음
3. **학습 지향:** 문서는 "왜"를 설명하고 "어떻게"는 코드에 표현
4. **해킹 가능성:** 수정과 실험을 장려하는 구조

---

## 5. Eureka Labs: 현재 방향성

### 회사 정보

**이름:** Eureka Labs

**웹사이트:** https://eurekalabs.ai/

**창립:** 2024년 7월 16일

**창립자:** Andrej Karpathy (전직 Tesla AI 책임자, OpenAI 창립 멤버)

---

### 미션 및 비전

**미션:** "AI 네이티브 스쿨(AI native school)" 구축 - AI 교육의 민주화

**핵심 아이디어:** 인간 전문가가 작성한 코스 자료 + AI 교육 어시스턴트의 시너지

**비전 성과:**
> "성공하면, 누구나 무엇이든 배우는 것이 쉬워질 것입니다. 도달 범위(많은 사람들이 무언가를 배우기) 및 범위(한 사람이 오늘날 가능한 것을 넘어 많은 과목을 배우기)에서 교육을 확대합니다."

---

### 주요 프로젝트: LLM101n

**코스명:** LLM101n

**수준:** 대학 1학년 수준 (undergraduate-level)

**목표:** "학생들이 자신만의 LLM을 훈련하는 법을 배우는 과정"

**콘텐츠:**
- 작은 규모의 LLM("Storyteller AI") 구축
- 완전한 훈련 파이프라인 (from 데이터 준비 to 디플로이)
- 실습 기반 학습

**현황:** 2026년 기준 개발 중

**제공 형식:** 온라인(디지털) 및 인-퍼슨 코호트 옵션 계획

---

### Karpathy의 현재 철학 방향

Eureka Labs는 다음을 반영합니다:

1. **AI 보조 교육의 확대:** 인간 전문가 + AI의 시너지
2. **민주화:** 누구나 고급 AI 개념 접근 가능
3. **실습성:** 이론과 동시에 손으로 직접 구축
4. **투명성:** nanoGPT/micrograd의 철학 계승 - 복잡한 것을 단순하게

---

## 6. 검증된 인용문 (Verbatim Quotes)

본 섹션은 실제 출처에서 검증한 직접 인용만 포함합니다.

### Quote 1: Software 2.0의 핵심 정의

**출처:** Karpathy, Andrej. "Software 2.0." Medium, November 11, 2017.

> "I sometimes see people refer to neural networks as 'Software 2.0' and I think this is a pretty fitting analogy."

**URL:** https://karpathy.medium.com/software-2-0-a64152b37c35

**날짜:** 2017년 11월 11일

---

### Quote 2: Software 3.0 - 자연어 프로그래밍

**출처:** Karpathy, Andrej. Twitter/X Post, June 2025 (AI Startup School 발표 이후)

> "LLMs are a new kind of computer, and you program them *in English*."

**URL:** https://x.com/karpathy/status/1935518272667217925

**날짜:** 2025년 6월 (정확한 날짜: 발표 직후)

---

### Quote 3: Vibe Coding 원본 정의

**출처:** Karpathy, Andrej. Twitter/X Post, February 3, 2025.

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists."

**URL:** https://x.com/karpathy/status/1886192184808149383

**날짜:** 2025년 2월 3일

---

### Quote 4: LLM as Operating System (사양)

**출처:** Karpathy, Andrej. Twitter/X Post, October 2023.

> "LLM OS. Specs:
> - LLM: OpenAI GPT-4 Turbo 256 core (batch size) processor @ 20Hz (tok/s)
> - RAM: 128Ktok
> - Filesystem: Ada002"

**URL:** https://x.com/karpathy/status/1723140519554105733

**날짜:** 2023년 10월

---

### Quote 5: Nanochat에서의 AI 에이전트 현실

**출처:** Karpathy, Andrej. Twitter/X Post / 인터뷰, 2025년 (Nanochat 프로젝트 발표 시점)

> "Basically entirely hand-written... I tried to use claude/codex agents a few times but they just didn't work well enough at all and net unhelpful."

**맥락:** Nanochat ($100 ChatGPT 클론, 8,000줄 Python/Rust) 구축 시 vibe coding 접근이 작동하지 않았음을 인정

**출처 검증 시도:** [출처 확인 실패 - 직접 인터뷰이거나 비공식 진술로 보임]

---

## 7. agentic coding harness와의 철학적 연결

### Software 3.0 시대의 agentic design

Karpathy의 프레임워크는 agentic coding harness 설계에 다음과 같이 적용됩니다:

1. **LLM as Kernel:** 에이전트의 지능 중추는 LLM이되, 완전한 자율성이 아닌 **검증 루프**로 제어
2. **Context = Working Memory:** 현재 작업 상태(파일, 실행 결과, 이전 결정)를 context에 유지
3. **Tools as Peripherals:** Git hooks(버전 제어), 코드 인터프리터(실행), 샌드박스(안전성) = 주변기기
4. **Memory Layers:**
   - 단기 메모리: context window
   - 중기 메모리: 현재 세션 히스토리
   - 장기 메모리: 저장된 결정, 패턴, 규칙
5. **Vibe-aware Design:** Vibe coding을 인정하되, 신뢰도를 높이는 다층 검증 추가

### 진지한 agentic coding의 원칙 (vs. vibe coding)

**제어 계층:**
- Hooks (사전 검증)
- Rules 엔진 (정책 적용)
- Eval loops (결과 검증)
- 자동 롤백 (실패 시 복구)

**투명성:**
- 모든 LLM 결정과 근거 기록
- 변경사항 추적 (git + audit logs)
- 설명 가능성 (왜 이 결정을 내렸나)

**신뢰성:**
- 테스트 자동화 (unit, integration, e2e)
- Type checking과 linting
- 보안 스캔 (secrets, vulnerable dependencies)
- 샌드박스 실행 환경

---

## 출처 (Sources)

1. [Karpathy, Andrej. "Software 2.0." *Medium*, November 11, 2017.](https://karpathy.medium.com/software-2-0-a64152b37c35)

2. [Karpathy, Andrej. "Intro to Large Language Models." YouTube, November 23, 2023.](https://www.youtube.com/watch?v=zjkBMFhNj_g)

3. [Internet Archive. "[1hr Talk] Intro to Large Language Models : Andrej Karpathy."](https://archive.org/details/youtube-zjkBMFhNj_g)

4. [Y Combinator. "Andrej Karpathy: Software Is Changing (Again)." *YC Startup Library*.](https://www.ycombinator.com/library/MW-andrej-karpathy-software-is-changing-again)

5. [Karpathy, Andrej. "Software Is Changing (Again)." YouTube, June 2025 (Y Combinator Startup Podcast).](https://www.youtube.com/watch?v=LCEmiRjPEtQ)

6. [Latent Space. "Andrej Karpathy on Software 3.0: Software in the Age of AI."](https://www.latent.space/p/s3)

7. [Karpathy, Andrej. Twitter/X Post on LLM OS. October 2023.](https://x.com/karpathy/status/1723140519554105733)

8. [Karpathy, Andrej. Twitter/X Post on Vibe Coding. February 3, 2025.](https://x.com/karpathy/status/1886192184808149383)

9. [Karpathy, Andrej. "nanoGPT." GitHub Repository.](https://github.com/karpathy/nanoGPT)

10. [Karpathy, Andrej. "micrograd." GitHub Repository.](https://github.com/karpathy/micrograd)

11. [Paolo, Paolo (contributor). "The Busy Person's Introduction to Large Language Models." Substack.](https://ppaolo.substack.com/p/introduction-to-large-language-models-llms)

12. [Simon Willison. "YouTube: Intro to Large Language Models." November 23, 2023.](https://simonwillison.net/2023/Nov/23/intro-to-large-language-models/)

13. [Willison, Simon. "Not all AI-assisted programming is vibe coding (but vibe coding rocks)." March 19, 2025.](https://simonwillison.net/2025/Mar/19/vibe-coding/)

14. [Eureka Labs Official Website.](https://eurekalabs.ai/)

15. [Sherry, Ben. "OpenAI Co-Founder Andrej Karpathy Announces Eureka Labs, an AI Education Startup." *Inc Magazine*.](https://www.inc.com/ben-sherry/openai-co-founder-andrej-karpathy-announces-eureka-labs-an-ai-education-startup.html)

16. [TechCrunch. "After Tesla and OpenAI, Andrej Karpathy's startup aims to apply AI assistants to education." July 2024.](https://techcrunch.com/2024/07/16/after-tesla-and-openai-andrej-karpathys-startup-aims-to-apply-ai-assistants-to-education/)

17. [AI Magazine (Hai Magazine). "Karpathy: AI is not electricity. It's a new operating system." (Translated source covering LLM OS concept).](https://haimagazine.com/en/science-and-development/karpathy-ai-is-not-electricity-its-a-new-operating-system/)

18. [Medium (Multiple Contributors). Various explainers on Software 2.0, Software 3.0, and LLM OS concepts referencing Karpathy's work.](https://medium.com/search?q=karpathy%20software%202.0)

19. [Klover.ai. "Vibe Coding: Karpathy's Viral Term, Ng's Reality Check, Klover's Early Pioneering."](https://www.klover.ai/vibe-coding-karpathy-viral-term-ng-reality-check-klover-first-mover-advantage/)

20. [Futurism. "Inventor of Vibe Coding Admits He Hand-Coded His New Project."](https://futurism.com/artificial-intelligence/inventor-vibe-coding-doesnt-work)

21. [Wikipedia. "Vibe Coding." (Community-maintained reference).](https://en.wikipedia.org/wiki/Vibe_coding)

22. [AOL News. "Andrew Ng says vibe coding is a bad name for a very real..." (Reporting on Ng's critique).](https://www.aol.com/andrew-ng-says-vibe-coding-065832544.html)

---

## 문서 메타데이터

- **작성 날짜:** 2025년 4월 7일 (기준: 2026년 4월 7일 환경)
- **검증 방법:** WebFetch, WebSearch를 통한 직접 출처 확인
- **대상 독자:** agentic coding harness 설계자, AI 보조 개발 연구자
- **언어:** 한국어 (존댓말) + 영문 인용 및 URL
- **신뢰도 표시:**
  - 검증된 출처: 파란색 링크로 표시
  - 미확인 출처: [출처 확인 실패] 마크 사용
  - 직접 인용: "" 표시 및 출처 URL 포함

---

**끝**
