#!/usr/bin/env python3
"""
한국어 가독성 점검 스크립트

목적:
- 긴 제목/문단을 찾아 읽기 피로가 높은 후보를 보고
- 저해상도 텍스트 이미지 후보를 찾아 보고
- handbook, methodology, guide 같은 장문 페이지를 다듬을 때 재사용

주의:
- 자동 수정은 하지 않습니다.
- 규칙 기반의 보조 도구이므로 최종 판단은 사람이 합니다.
"""

from __future__ import annotations

import pathlib
import re
import sys
from dataclasses import dataclass
from typing import Iterable

TEXT_EXTENSIONS = {".tsx", ".ts", ".md", ".mdx"}
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}
HANGUL_RE = re.compile(r"[가-힣]")


@dataclass
class Finding:
    kind: str
    file: str
    line: int | None
    message: str


def iter_text_files(paths: Iterable[str]) -> Iterable[pathlib.Path]:
    for raw in paths:
        path = pathlib.Path(raw)
        if not path.exists():
            continue
        if path.is_file() and path.suffix in TEXT_EXTENSIONS:
            yield path
            continue
        if path.is_dir():
            for file in path.rglob("*"):
                if file.is_file() and file.suffix in TEXT_EXTENSIONS:
                    yield file


def iter_image_files(paths: Iterable[str]) -> Iterable[pathlib.Path]:
    for raw in paths:
        path = pathlib.Path(raw)
        if not path.exists():
            continue
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS:
            yield path
            continue
        if path.is_dir():
            for file in path.rglob("*"):
                if file.is_file() and file.suffix.lower() in IMAGE_EXTENSIONS:
                    yield file


def clean_inline_text(text: str) -> str:
    text = text.strip()
    text = re.sub(r"<[^>]+>", " ", text)
    text = text.replace("{", " ").replace("}", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def find_text_issues(file: pathlib.Path) -> list[Finding]:
    findings: list[Finding] = []
    text = file.read_text(encoding="utf-8")
    lines = text.splitlines()

    for idx, line in enumerate(lines, start=1):
        if not HANGUL_RE.search(line):
            continue

        cleaned = clean_inline_text(line)
        if not cleaned:
            continue

        # 제목 후보: h1/h2/h3/ProseHeading 인근에서 너무 긴 한국어 제목
        if ("<h1" in line or "<h2" in line or "<h3" in line or "ProseHeading" in line) and len(cleaned) > 30:
            findings.append(
                Finding(
                    kind="heading",
                    file=str(file),
                    line=idx,
                    message=f"긴 제목 후보 ({len(cleaned)}자): {cleaned[:80]}",
                )
            )

        # 장문 후보: 한국어가 들어간 한 줄 문자열이 너무 길면 읽기 피로 가능성
        if len(cleaned) > 120:
            findings.append(
                Finding(
                    kind="paragraph",
                    file=str(file),
                    line=idx,
                    message=f"긴 문장/문단 후보 ({len(cleaned)}자): {cleaned[:100]}",
                )
            )

    return findings


def get_png_dimensions(file: pathlib.Path) -> tuple[int, int] | None:
    try:
        import struct

        with file.open("rb") as f:
            header = f.read(24)
        if len(header) < 24 or header[:8] != b"\x89PNG\r\n\x1a\n":
            return None
        width, height = struct.unpack(">II", header[16:24])
        return width, height
    except Exception:
        return None


def find_image_issues(file: pathlib.Path) -> list[Finding]:
    findings: list[Finding] = []
    if file.suffix.lower() != ".png":
        return findings
    size = get_png_dimensions(file)
    if not size:
        return findings
    width, height = size
    if width < 900 or height < 900:
        findings.append(
            Finding(
                kind="image",
                file=str(file),
                line=None,
                message=f"작은 텍스트 이미지 후보 ({width}x{height})",
            )
        )
    return findings


def main() -> int:
    targets = ["src/app", "src/components", "docs"]
    image_targets = ["public"]
    findings: list[Finding] = []

    for file in iter_text_files(targets):
        findings.extend(find_text_issues(file))

    for file in iter_image_files(image_targets):
        findings.extend(find_image_issues(file))

    if not findings:
        print("가독성 점검: 특이사항 없음")
        return 0

    print("가독성 점검 결과\n")
    for item in findings:
        where = f"{item.file}:{item.line}" if item.line is not None else item.file
        print(f"[{item.kind}] {where}")
        print(f"- {item.message}\n")

    print(f"총 {len(findings)}개 후보를 찾았습니다.")
    print("이 결과는 수정 지시가 아니라 검토 후보 목록입니다.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
