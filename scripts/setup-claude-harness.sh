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

copy_if_missing "$SOURCE_ROOT/CLAUDE.md" "$TARGET_DIR/CLAUDE.md"
copy_if_missing "$SOURCE_ROOT/.claude" "$TARGET_DIR/.claude"

cat <<'EOF'

Claude 하네스 최소 표면을 복사했습니다.

다음 단계:
1. CLAUDE.md의 저장소 설명과 검증 명령을 프로젝트에 맞게 수정
2. .claude/settings.json의 permissions / hooks 확인
3. .claude/agents, .claude/skills, .claude/rules를 프로젝트에 맞게 보강
4. 아래 프롬프트를 Claude Code에 붙여넣기

붙여넣을 프롬프트:
이 프로젝트 주제에 맞춰서 하네스를 구성해줘.
현재 있는 CLAUDE.md 와 .claude/ 를 기준으로
이 프로젝트에 필요한 agents, skills, rules, hooks 를 최소 구조부터 보강해줘.
검증 명령과 운영 안전선도 같이 정리해줘.
EOF
