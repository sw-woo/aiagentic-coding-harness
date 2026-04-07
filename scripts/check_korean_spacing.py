#!/usr/bin/env python3
"""
한글 띄어쓰기 점검 스크립트

- KSS의 correct_spacing 기능을 사용해 한국어 문장이 들어간 라인을 점검합니다.
- 자동 수정은 하지 않고, 원문과 추천문이 다른 라인만 보고합니다.
- TSX/TS/MD 같은 혼합 파일에서 오탐이 있을 수 있으므로 "작성 보조" 용도로만 사용합니다.

설치:
  python3 -m pip install kss

실행:
  python3 scripts/check_korean_spacing.py src/app src/components docs
"""

from __future__ import annotations

import pathlib
import re
import sys
from typing import Iterable

try:
    from kss import Kss
except ImportError:  # pragma: no cover
    print("KSS가 설치되어 있지 않습니다.", file=sys.stderr)
    print("설치: python3 -m pip install kss", file=sys.stderr)
    sys.exit(2)


ALLOWED_EXTENSIONS = {".md", ".mdx", ".tsx", ".ts", ".txt"}
HANGUL_RE = re.compile(r"[가-힣]")
COMMENT_PREFIXES = ("//", "#", "*", "-", ">")
correct_spacing = Kss("correct_spacing")


def iter_files(paths: Iterable[str]) -> Iterable[pathlib.Path]:
    for raw in paths:
      path = pathlib.Path(raw)
      if not path.exists():
          continue
      if path.is_file() and path.suffix in ALLOWED_EXTENSIONS:
          yield path
          continue
      if path.is_dir():
          for file in path.rglob("*"):
              if file.is_file() and file.suffix in ALLOWED_EXTENSIONS:
                  yield file


def clean_line(line: str) -> str:
    stripped = line.strip()
    for prefix in COMMENT_PREFIXES:
        if stripped.startswith(prefix):
            stripped = stripped.removeprefix(prefix).strip()
    stripped = stripped.replace("`", " ").replace('"', " ").replace("'", " ")
    stripped = re.sub(r"https?://\S+", " ", stripped)
    stripped = re.sub(r"\b[a-zA-Z0-9_./:-]+\b", " ", stripped)
    stripped = re.sub(r"\s+", " ", stripped).strip()
    return stripped


def should_check(line: str) -> bool:
    if not HANGUL_RE.search(line):
        return False
    candidate = clean_line(line)
    if len(candidate) < 8:
        return False
    if candidate.count(" ") < 1:
        return False
    return True


def main() -> int:
    targets = sys.argv[1:] or ["src", "docs"]
    changed = 0

    for file in iter_files(targets):
        try:
            lines = file.read_text(encoding="utf-8").splitlines()
        except UnicodeDecodeError:
            continue

        for line_no, line in enumerate(lines, start=1):
            if not should_check(line):
                continue

            original = clean_line(line)
            if not original:
                continue

            suggested = correct_spacing(original)
            if suggested and suggested != original:
                if changed == 0:
                    print("한글 띄어쓰기 점검 결과\n")
                changed += 1
                print(f"[{file}:{line_no}]")
                print(f"원문: {original}")
                print(f"추천: {suggested}\n")

    if changed == 0:
        print("한글 띄어쓰기 점검: 차이 없음")
    else:
        print(f"총 {changed}개 라인에서 점검 후보를 찾았습니다.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
