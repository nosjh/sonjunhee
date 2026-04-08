let cur = 0;
let busy = false;
const total = document.querySelectorAll('.section').length;
const panel = document.querySelector('.panel');

window.addEventListener('wheel', (e) => {
  if (busy) return;

  if (e.deltaY > 0 && cur < total - 1) {
    busy = true;

    // 패널 + 섹션 전환 동시에
    cur++;
    document.getElementById('wrap').style.transform = `translateY(-${cur * 100}vh)`;

    panel.style.transition = 'none';
    panel.style.transform = 'translateX(100%)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 1.25s ease-in-out';
        panel.style.transform = 'translateX(-100%)'; // 오른쪽에서 왼쪽으로 한번에 통과
      });
    });

    setTimeout(() => { busy = false; }, 600);

  } else if (e.deltaY < 0 && cur > 0) {
    busy = true;

    cur--;
    document.getElementById('wrap').style.transform = `translateY(-${cur * 100}vh)`;

    panel.style.transition = 'none';
    panel.style.transform = 'translateX(-100%)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 1.25s ease-in-out';
        panel.style.transform = 'translateX(100%)';
      });
    });

    setTimeout(() => { busy = false; }, 600);
  }
});