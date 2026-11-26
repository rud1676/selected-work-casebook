const slides = [...document.querySelectorAll('.slide')];
const links = [...document.querySelectorAll('nav .index a')];
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const position = document.querySelector('#position');
let active = 0;

function showSlide(index) {
  active = index;
  slides.forEach((slide, number) => {
    slide.hidden = number !== index;
    if (number === index) links[number].setAttribute('aria-current', 'location');
    else links[number].removeAttribute('aria-current');
  });
  previous.disabled = index === 0;
  next.disabled = index === slides.length - 1;
  position.value = `${index + 1} / ${slides.length}`;
}

function followHash() {
  const index = slides.findIndex((slide) => `#${slide.id}` === location.hash);
  showSlide(Math.max(0, index));
}

function move(offset) {
  const target = slides[active + offset];
  if (target) location.hash = target.id;
}

previous.addEventListener('click', () => move(-1));
next.addEventListener('click', () => move(1));
window.addEventListener('hashchange', followHash);
document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === 'ArrowLeft') move(-1);
  if (event.key === 'ArrowRight') move(1);
});

followHash();
document.querySelector('.controls').hidden = false;
