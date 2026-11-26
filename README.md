# Selected Work Casebook

주경진의 대표 작업. 소개 홈, BlueField 네 사례, 통합 PDF를 포함합니다.

`node build.mjs`로 정적 페이지를 생성합니다. `node pdf.mjs`는 Chrome으로 PDF를 생성합니다. 기본 명령은 `google-chrome`이며, 실행 파일 경로는 `CHROME_BIN`으로 지정할 수 있습니다.

소개와 사례 본문은 `content.mjs`에서 편집합니다. `dist/index.html`은 소개, `dist/bluefield/index.html`은 사례집, `dist/portfolio.pdf`는 제출용 파일입니다. HTTP로 미리 볼 때는 `python3 -m http.server --directory dist 8000`을 실행합니다.

공개 저장소의 Settings → Pages에서 소스를 **GitHub Actions**로 선택하면 `main` 브랜치의 워크플로가 세 파일을 함께 배포합니다.
