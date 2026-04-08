# Prompt Caching — Anthropic와 OpenAI 비교

모델 API 사용 비용과 지연시간을 줄이는 데 있어서 prompt caching은 핵심 최적화 기법입니다. 본 문서는 Anthropic과 OpenAI의 공식 문서를 기반으로 두 플랫폼의 구현과 실전 활용법을 정리했습니다.

## 1. Anthropic Prompt Caching

### 작동 원리

Anthropic의 prompt caching은 요청(request) 내에서 명시적인 캐시 breakpoint를 설정하는 방식으로 작동합니다. (https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

요청을 보낼 때:

1. 시스템이 프롬프트 prefix를 캐시에서 검색합니다.
2. 캐시 hit이 발생하면 캐시된 버전을 사용하여 비용과 지연시간을 줄입니다.
3. 캐시 miss이면 전체 프롬프트를 처리하고 캐시에 저장합니다.

```python
# Automatic caching 예시 (Anthropic 공식 문서)
import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1024,
    cache_control={"type": "ephemeral"},
    system="You are an AI assistant tasked with analyzing literary works.",
    messages=[
        {"role": "user", "content": "Analyze the major themes in 'Pride and Prejudice'."}
    ],
)
print(response.usage.model_dump_json())
```

### 지원되는 모델과 최소 캐시 크기

다음 모델들이 prompt caching을 지원합니다. (https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

| 모델 | 최소 캐시 크기 |
|------|--------------|
| Claude Opus 4.6, 4.5 | 4,096 토큰 |
| Claude Haiku 4.5 | 4,096 토큰 |
| Claude Sonnet 4.6 | 2,048 토큰 |
| Claude Haiku 3.5 | 2,048 토큰 |
| Claude Sonnet 4.5, Opus 4.1, 4 | 1,024 토큰 |

### 가격 정책

캐시 쓰기와 읽기 가격이 명확히 분리되어 있습니다. (https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

| 모델 | 기본 입력 | 5분 캐시 쓰기 | 1시간 캐시 쓰기 | 캐시 hit |
|------|---------|-------------|--------------|---------|
| Claude Opus 4.6 | $5/MTok | $6.25/MTok | $10/MTok | $0.50/MTok |
| Claude Sonnet 4.6 | $3/MTok | $3.75/MTok | $6/MTok | $0.30/MTok |
| Claude Haiku 4.5 | $1/MTok | $1.25/MTok | $2/MTok | $0.10/MTok |

**가격 배수:**
- 5분 캐시 쓰기: 기본 입력 가격의 1.25배
- 1시간 캐시 쓰기: 기본 입력 가격의 2배
- 캐시 hit: 기본 입력 가격의 0.1배

캐시 hit는 기본 입력 가격의 1/10 수준이므로, 반복되는 작업에서 상당한 비용 절감이 가능합니다.

### 캐시 수명(TTL)

기본 캐시 수명은 5분입니다. 1시간 연장 캐시는 명시적으로 `ttl` 파라미터를 설정하여 활성화합니다. (https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

```json
{
  "cache_control": {
    "type": "ephemeral",
    "ttl": "1h"
  }
}
```

### 캐시 무효화

다음 상황에서 캐시가 무효화됩니다. (https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

- 도구(tools) 정의 변경
- 웹 검색 설정 변경
- 인용(citations) 설정 변경
- 이미지 또는 문서 변경
- 시스템 프롬프트 변경

한 번 캐시 breakpoint 위치가 지나면, 그 이후의 변경 사항만 무효화됩니다. 일부 콘텐츠 블록(예: citations, 빈 텍스트 블록)은 캐시될 수 없습니다.

### Anthropic 캐시 모니터링

API 응답의 `usage` 필드를 통해 캐시 성능을 추적합니다. (https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

```python
{
    "cache_read_input_tokens": 100000,      # 캐시에서 읽은 토큰
    "cache_creation_input_tokens": 248,     # 캐시에 쓴 토큰
    "input_tokens": 50,                     # 마지막 breakpoint 이후 토큰
    "output_tokens": 503
}
# 총 입력 토큰 = 100,000 + 248 + 50 = 100,298
```

## 2. OpenAI Prompt Caching

### 작동 원리

OpenAI의 prompt caching은 자동이며, 요청에 추가 코드 변경이 필요하지 않습니다. (https://platform.openai.com/docs/guides/prompt-caching)

내부 작동:

1. API 서버는 최근에 동일한 프롬프트를 처리한 서버로 요청을 라우팅합니다.
2. Prefix matching을 통해 정확히 일치하는 프롬프트 접두사(prefix)를 검색합니다.
3. Hit이 발생하면 지연시간을 최대 80%까지, 입력 토큰 비용을 최대 90%까지 줄입니다.

### 지원되는 모델

GPT-4o 이상의 최신 모델에서 자동으로 지원됩니다. (https://platform.openai.com/docs/guides/prompt-caching)

- gpt-4o
- gpt-4o-mini
- 기타 최신 모델

### 최소 요구사항과 캐시 길이

자동 캐시는 프롬프트 길이가 1,024 토큰을 초과할 때만 작동합니다. (https://platform.openai.com/docs/guides/prompt-caching)

캐시 hit을 위해서는 정적 콘텐츠(instructions, examples)를 프롬프트 시작 부분에, 변수 콘텐츠(user-specific data)를 끝에 배치해야 합니다.

### OpenAI 캐시 유지(Retention)

OpenAI는 두 가지 캐시 정책을 제공합니다. (https://platform.openai.com/docs/guides/prompt-caching)

**In-Memory Policy (기본):**
- 비활성 상태 5~10분 동안 캐시 유지
- 최대 1시간까지 보관

**Extended Prompt Cache Retention:**
- 최대 24시간까지 캐시 유지

### OpenAI 가격 정책

OpenAI는 prompt caching에 대해 추가 요금을 부과하지 않습니다. (https://platform.openai.com/docs/guides/prompt-caching) 캐시 hit의 효과는 지연시간 감소와 throughput 향상입니다.

실제 토큰 비용은 입력 토큰으로만 계산되며, 반복 요청에서도 기본 요금이 청구됩니다. 따라서 비용 절감은 처리량 증가로 인한 전체 비용 최소화 관점입니다.

## 3. Anthropic vs OpenAI 비교

| 특성 | Anthropic | OpenAI |
|------|-----------|--------|
| **활성화 방식** | 명시적 `cache_control` 필요 | 자동 (코드 변경 없음) |
| **제어 수준** | 세밀한 breakpoint 설정 가능 | 자동 prefix matching (수동 제어 불가) |
| **최소 캐시 크기** | 1,024~4,096 토큰 (모델별) | 1,024 토큰 |
| **캐시 hit 비용** | 기본 가격의 0.1배 | 추가 요금 없음 (구조 상 이점만) |
| **캐시 쓰기 비용** | 1.25배 또는 2배 | 없음 |
| **기본 TTL** | 5분 | 5~10분 (비활성 기준) |
| **연장 TTL** | 1시간 (2배 비용) | 24시간 |
| **무효화 규칙** | 도구, 시스템 프롬프트, 이미지 등 명시 | prefix match만 고려 (자동) |
| **조직 격리** | 예 (캐시 공유 없음) | 불명시 |

### 어느 것이 더 나은가

**Anthropic이 나은 경우:**
- 캐시 hit 비용을 최소화해야 하는 비용 민감 애플리케이션
- 시스템 프롬프트나 도구 정의가 자주 바뀌는 경우 (정확한 무효화 제어 필요)
- 캐시 성능을 세부적으로 모니터링하고 최적화하려는 경우

**OpenAI가 나은 경우:**
- "그냥 작동해야 한다" 원칙의 빠른 통합
- 추가 API 설계 변경을 최소화하려는 경우
- 24시간 캐시 유지로 인한 높은 재사용률이 필요한 경우

## 4. 실전 적용 팁

### 캐시 대상으로 가장 좋은 것들

다음 콘텐츠는 캐시 효율이 높습니다. (https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

1. **Long system prompts** — 수백 줄의 역할 정의, 지침, 제약 조건
2. **Tool definitions** — API 스키마, 함수 설명 (자주 변하지 않음)
3. **Few-shot examples** — 일관된 사용자 예시 집합
4. **Static context** — RAG 문서 검색 결과의 고정 부분
5. **Conversation history** — 다중 턴 대화의 이전 메시지

### 캐시 무효화 패턴 (피해야 할 것)

- ❌ 타임스탬프나 요청별 메시지를 캐시 breakpoint 위에 배치
- ❌ 캐시 miss가 발생할 때마다 도구 정의를 변경
- ❌ 동시 요청에서 캐시 hit을 기대 (첫 요청이 완료될 때까지 대기 필요)
- ❌ 변경 콘텐츠에 breakpoint를 너무 가깝게 배치

### 일반적인 비용 절감

Anthropic의 경우, 캐시 hit은 기본 입력 토큰 비용의 1/10입니다. (https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

예를 들어, 1시간 캐시를 사용할 때:

```
첫 요청: 100,000 토큰 쓰기 (2배 비용) = 100,000 × $3 × 2 = $600
캐시 hit: 100,000 토큰 읽기 (0.1배 비용) = 100,000 × $3 × 0.1 = $30
절감: (600 - 30) / 600 = 95% 할인 (쓰기 비용 제외)
```

OpenAI의 경우 토큰 비용은 동일하지만, 처리량 향상으로 인한 인프라 효율화가 이점입니다.

### Anthropic의 Multi-Breakpoint 패턴

여러 breakpoint를 설정하면 다양한 변경 빈도의 콘텐츠를 분리할 수 있습니다. (https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)

```json
{
  "tools": [
    { "name": "tool1", ... },
    { "name": "tool2", ..., "cache_control": {"type": "ephemeral"} }
  ],
  "system": [
    { "type": "text", "text": "Instructions...", "cache_control": {"type": "ephemeral"} },
    { "type": "text", "text": "RAG context...", "cache_control": {"type": "ephemeral"} }
  ],
  "messages": [
    { "role": "user", "content": "...", "cache_control": {"type": "ephemeral"} }
  ]
}
```

이 패턴은 도구, 지침, 문서, 대화를 독립적으로 캐시하여 각 부분이 변경될 때만 그 부분 이후를 재처리합니다.

---

## Sources

- [Anthropic Prompt Caching Guide](https://platform.claude.com/docs/en/docs/build-with-claude/prompt-caching)
- [OpenAI Prompt Caching Documentation](https://platform.openai.com/docs/guides/prompt-caching)
