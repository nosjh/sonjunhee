// let cur = 0;
// let busy = false;
// const total = document.querySelectorAll('.section').length;
// const panel = document.querySelector('.panel');
// const wrap = document.getElementById('wrap');

// window.addEventListener('wheel', (e) => {
//   if (busy) return;

//   if (e.deltaY > 0 && cur < total - 1) {
//     busy = true;

//     panel.style.transition = 'none';
//     panel.style.transform = 'translateX(100%)';

//     requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         panel.style.transition = 'transform 0.6s linear';
//         panel.style.transform = 'translateX(0%)';

//         setTimeout(() => {
//           wrap.style.transition = 'transform 0.4s linear';
//           cur++;
//           wrap.style.transform = `translateX(-${cur * 100}vw)`;

//           panel.style.transition = cur === total - 1
//             ? 'transform 0.6s linear'
//             : 'transform 0.6s linear';
//           panel.style.transform = 'translateX(-100%)';

//           setTimeout(() => { busy = false; }, 600);
//         }, 600);
//       });
//     });

//   } else if (e.deltaY < 0 && cur > 0) {
//     busy = true;

//     panel.style.transition = 'none';
//     panel.style.transform = 'translateX(-100%)';

//     requestAnimationFrame(() => {
//       requestAnimationFrame(() => {
//         panel.style.transition = 'transform 0.6s linear';
//         panel.style.transform = 'translateX(0%)';

//         setTimeout(() => {
//           wrap.style.transition = 'transform 0.4s linear';
//           cur--;
//           wrap.style.transform = `translateX(-${cur * 100}vw)`;

//           panel.style.transition = 'transform 0.6s linear';
//           panel.style.transform = 'translateX(100%)';

//           setTimeout(() => { busy = false; }, 600);
//         }, 600);
//       });
//     });
//   }
// });

let cur = 0;
let busy = false;
const total = document.querySelectorAll('.section').length;
const panel = document.querySelector('.panel');

window.addEventListener('wheel', (e) => {
  if (busy) return;

  if (e.deltaY > 0 && cur < total - 1) {
    busy = true;
    cur++;

    const wrap = document.getElementById('wrap');
    wrap.style.transition = cur === total - 1
      ? 'transform 1.3s cubic-bezier(1,0,0,1)'
      : 'transform 1.2s linear';

    wrap.style.transform = `translateX(-${cur * 100}vw)`;

    panel.style.transition = 'none';
    panel.style.transform = 'translateX(100%)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 1.25s linear';
        panel.style.transform = 'translateX(-100%)';
      });
    });

    setTimeout(() => { busy = false; }, 600);

  } else if (e.deltaY < 0 && cur > 0) {
    busy = true;

    const wrap = document.getElementById('wrap');
    wrap.style.transition = cur === total - 1
      ? 'transform 1.3s cubic-bezier(1,0,0,1)'
      : 'transform 1.2s linear';

    cur--;
    wrap.style.transform = `translateX(-${cur * 100}vw)`;

    panel.style.transition = 'none';
    panel.style.transform = 'translateX(-100%)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        panel.style.transition = 'transform 1.25s linear';
        panel.style.transform = 'translateX(100%)';
      });
    });

    setTimeout(() => { busy = false; }, 600);
  }
});