let cur = 0;
let busy = false;
const total = document.querySelectorAll('.section').length;
const panel = document.querySelector('.panel');

window.addEventListener('wheel', (e) => {
  if (busy) return;

  if (e.deltaY > 0 && cur < total - 1) {
    busy = true;

    // 패널 오른쪽에서 진입
    panel.style.transition = 'none';
    panel.style.transform = 'translateX(100%)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 0.5s ease-in-out';
        panel.style.transform = 'translateX(0%)';
      });
    });

    // 패널 중앙 도달 시 섹션 전환 후 왼쪽으로 빠져나감
    setTimeout(() => {
      cur++;
      document.getElementById('wrap').style.transform = `translateY(-${cur * 100}vh)`;

      panel.style.transition = 'transform 0.5s ease-in-out';
      panel.style.transform = 'translateX(-100%)';

      setTimeout(() => { busy = false; }, 500);
    }, 500);

  } else if (e.deltaY < 0 && cur > 0) {
    busy = true;

    // 패널 왼쪽에서 진입
    panel.style.transition = 'none';
    panel.style.transform = 'translateX(-100%)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 0.5s ease-in-out';
        panel.style.transform = 'translateX(0%)';
      });
    });

    setTimeout(() => {
      cur--;
      document.getElementById('wrap').style.transform = `translateY(-${cur * 100}vh)`;

      panel.style.transition = 'transform 0.5s ease-in-out';
      panel.style.transform = 'translateX(100%)';

      setTimeout(() => { busy = false; }, 500);
    }, 500);
  }
});