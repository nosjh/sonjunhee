let cur = 0;
let busy = false;
const total = document.querySelectorAll('.section').length;
const panel = document.querySelector('.panel');

function goTo(target) {
  if (busy || target === cur) return;
  busy = true;

  const direction = target > cur ? 1 : -1;

  const wrap = document.getElementById('wrap');
  wrap.style.transition = target === total - 1
    ? 'transform 1.1s linear'
    : 'transform 1.1s linear';

  cur = target;
  wrap.style.transform = `translateX(-${cur * 100}vw)`;

  panel.style.transition = 'none';
  panel.style.transform = direction === 1 ? 'translateX(100%)' : 'translateX(-100%)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panel.style.transition = 'transform 1.2s linear';
      panel.style.transform = direction === 1 ? 'translateX(-100%)' : 'translateX(100%)';
    });
  });

  setTimeout(() => { busy = false; }, 600);
}

window.addEventListener('wheel', (e) => {
  if (busy) return;
  if (e.deltaY > 0 && cur < total - 1) goTo(cur + 1);
  else if (e.deltaY < 0 && cur > 0) goTo(cur - 1);
});

document.querySelectorAll('.header a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = parseInt(link.dataset.section);
    goTo(target);
  });
});

// 햄버거 토글
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
});

// 모바일 메뉴
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = parseInt(link.dataset.section);
    goTo(target);
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
  });
});

const headerHeight = document.querySelector('.header').offsetHeight;
const contentHeight = window.innerHeight - headerHeight;
console.log(window.innerWidth, contentHeight);