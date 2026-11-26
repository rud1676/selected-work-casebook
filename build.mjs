import { cp, mkdir, writeFile } from 'node:fs/promises';
import { cases, profile } from './content.mjs';

const out = new URL('./dist/', import.meta.url);
const write = (path, html) => writeFile(new URL(path, out), html);

function page(title, body, base = './', className = '') {
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title><link rel="stylesheet" href="${base}style.css"></head>
<body class="${className}">${body}</body></html>`;
}

function links(base = './') {
  return cases.map((item) => `<li><a href="${base}#${item.id}">${item.name}</a></li>`).join('');
}

function slide(item) {
  return `<article class="slide" id="${item.id}">
    <p class="eyebrow">BlueField / ${item.label}</p>
    <h2>${item.title}</h2>
    <ol class="steps">${item.steps.map((step) => `<li>${step}</li>`).join('')}</ol>
    <dl class="points"><div><dt>문제</dt><dd>${item.problem}</dd></div>
    <div><dt>내가 한 일</dt><dd>${item.decision}</dd></div>
    <div><dt>결과</dt><dd>${item.result}</dd></div></dl>
    <p class="evidence">${item.evidence}</p>
  </article>`;
}

const header = (base = './') => `<header class="bar"><a href="${base}">${profile.name} <span>대표 작업</span></a>
<a class="button" href="${base}portfolio.pdf" download>PDF 다운로드</a></header>`;

await mkdir(new URL('bluefield/', out), { recursive: true });
await cp(new URL('./assets/', import.meta.url), new URL('assets/', out), { recursive: true });
for (const file of ['style.css', 'deck.js']) {
  await cp(new URL(file, import.meta.url), new URL(file, out));
}

await write('index.html', page('주경진 · 대표 작업', `${header()}<main>
  <section class="intro"><p class="eyebrow">주경진 / 풀스택 개발자</p><h1>${profile.headline}</h1><p>${profile.summary}</p></section>
  <section class="work" aria-labelledby="works"><h2 id="works">프리랜서 작업</h2>
    <div class="project"><div class="project-copy"><p class="eyebrow">개인 의뢰 · 1인 개발·운영</p>
    <h3>BlueField</h3><p>${profile.project}</p>
    <a class="button primary" href="bluefield/">사례집 보기</a>
    <ul class="index">${links('bluefield/')}</ul></div>
    <figure><img src="assets/bluefield.png" alt="BlueField 데이터센터 화면"><figcaption>BlueField 데이터센터</figcaption></figure></div>
  </section></main>`));

await write('bluefield/index.html', page('BlueField · 주경진', `${header('../')}<main class="deck">
  <h1 class="deck-title">BlueField 사례집</h1>
  <nav aria-label="사례 목차"><ul class="index">${links('')}</ul></nav>
  <div class="slides">${cases.map(slide).join('')}</div>
  <nav class="controls" aria-label="슬라이드 이동" hidden>
    <button type="button" id="previous">이전</button><output id="position" aria-live="polite"></output><button type="button" id="next">다음</button>
  </nav></main><script src="../deck.js" defer></script>`, '../'));

await write('print.html', page('주경진 · 대표 작업', `<main>
  <article class="slide cover"><p class="eyebrow">주경진 / 풀스택 개발자</p><h1>${profile.headline}</h1><p>${profile.summary}</p>
  <h2>BlueField</h2><p>${profile.project}</p><ul>${links('')}</ul></article>
  ${cases.map(slide).join('')}</main>`, './', 'print'));
await write('.nojekyll', '');
