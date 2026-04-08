이 디렉터리는 카탈로그와 문서에서 복사/다운로드용으로 노출하는 starter source 모음입니다.

원칙:
- live runtime 설정 파일과 분리합니다.
- `data/catalog/local-starters.json` 는 이 디렉터리의 파일을 읽어 생성합니다.
- 사용자에게 보여 주는 `path` 는 대상 프로젝트에 둘 권장 경로이고, 이 디렉터리의 실제 위치와는 다를 수 있습니다.
- starter source가 canonical 원본입니다. `data/catalog/local-starters.json` 는 파생 산출물입니다.
- 변경 후에는 `python3 scripts/build_local_starters.py` 또는 `python3 scripts/build_local_starters.py --check` 로 동기화 상태를 확인합니다.
