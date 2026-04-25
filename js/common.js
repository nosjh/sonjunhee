let cur = 0;
let busy = false;
let touchStartX = 0;

window.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

window.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  
  if (Math.abs(diff) > 50) { 
    if (diff > 0) goTo(cur + 1); 
    else goTo(cur - 1);          
  }
});

//

const total = document.querySelectorAll('.section').length;
const panel = document.querySelector('.panel');

function goTo(target) {
  if (busy || target === cur) return;
  busy = true;

  const direction = target > cur ? 1 : -1;

  // 섹션
  const wrap = document.getElementById('wrap');
  wrap.style.transition = target === total - 1
    ? 'transform 1.1s ease-in-out'
    : 'transform 1.1s ease-in-out';

  cur = target;
  wrap.style.transform = `translateX(-${cur * 100}vw)`;

  // 패널
  panel.style.transition = 'none';
  panel.style.transform = direction === 1 ? 'translateX(100%)' : 'translateX(-100%)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      panel.style.transition = 'transform 1.2s linear';
      panel.style.transform = direction === 1 ? 'translateX(-100%)' : 'translateX(100%)';
    });
  });

  setTimeout(() => { busy = false; }, 600);

  // 텍스트 효과
  document.querySelectorAll('.container').forEach(s => s.classList.remove('animate'));

  setTimeout(() => {
  document.querySelectorAll('.container')[target].classList.add('animate');
  }, 1200);
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

//스와이퍼
swiper = new Swiper('.swiper', {
  loop: true,
  mousewheel: false,
  keyboard: { enabled: true },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  autoplay: {
      delay: 3000,
  },
  speed: 800,
  slidesPerView: "auto",
});