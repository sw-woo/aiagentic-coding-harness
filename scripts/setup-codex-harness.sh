#!/usr/bin/env bash
set -euo pipefail

SOURCE_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGET_DIR="${1:-$PWD}"

mkdir -p "$TARGET_DIR"

copy_if_missing() {
  local src="$1"
  local dest="$2"

  if [ -e "$dest" ]; then
    echo "[skip] $dest already exists"
    return 0
  fi

  mkdir -p "$(dirname "$dest")"
  cp -R "$src" "$dest"
  echo "[add] $dest"
}

copy_if_missing "$SOURCE_ROOT/AGENTS.md" "$TARGET_DIR/AGENTS.md"
copy_if_missing "$SOURCE_ROOT/.codex" "$TARGET_DIR/.codex"
copy_if_missing "$SOURCE_ROOT/.agents" "$TARGET_DIR/.agents"
copy_if_missing "$SOURCE_ROOT/scripts/verify_codex_harness.sh" "$TARGET_DIR/scripts/verify_codex_harness.sh"

cat <<'EOF'

Codex 하네스 최소 표면을 복사했습니다.

다음 단계:
1. AGENTS.md의 저장소 설명과 검증 명령을 프로젝트에 맞게 수정
2. .codex/config.toml의 profiles / agents / hooks 확인
3. 필요 시 .agents/skills에 프로젝트 전용 skill 추가
4. 아래 프롬프트를 Codex에 붙여넣기

붙여넣을 프롬프트:
이 프로젝트 주제에 맞춰서 Codex 하네스를 구성해줘.
현재 있는 AGENTS.md, .codex/, .agents/skills/ 를 기준으로
이 프로젝트에 꼭 필요한 rules, hooks, skills, subagents 를 보강해줘.
과장 없이 최소한의 구조부터 맞추고, 변경 후 검증 명령까지 정리해줘.
EOF
