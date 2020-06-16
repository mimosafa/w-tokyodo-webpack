// Elements
const root = document.querySelector('#contents.simulator');
const wrap = root.querySelector(':scope > .simulator_wrapper');
const contents = wrap.querySelectorAll(':scope > .simulator_page');
const controller = root.querySelector(':scope .simulator_controller');
const prev = controller.querySelector('.simulator_prev');
const next = controller.querySelector('.simulator_next');

const questions = wrap.querySelectorAll('input');

const header = document.getElementById('header');

// Window size
let w, h;

// Data
let status = {};

// Initializing
const init = () => {
  status.step = 0;
  status.length = contents.length;

  status = new Proxy(status, {
    set(target, prop, val) {
      if (prop === 'step') {
        if ((val < 0) || (val > (target.length - 1))) {
          return false;
        }
        if (val !== 0) {
          controller.style.display = 'block';
        } else {
          controller.style.display = 'none';
        }
        wrap.style.left = `-${w * val}px`;
      }
      else if (prop !== 'length') {
        if (target.step < (target.length - 1)) {
          this.set(target, 'step', target.step + 1);
        }
      }
      target[prop] = val;
      return true;
    }
  });
};

// Initializing DOM styles
const initStyles = () => {
  w = window.innerWidth;
  h = window.innerHeight;

  root.style.maxWidth = w + 'px';
  root.style.minHeight = h + 'px';

  wrap.style.width = `${w * status.length}px`;
  wrap.style.height = h + 'px';
  wrap.style.paddingTop = header.clientHeight + 'px';

  for (let i = 0; i < status.length; i++) {
    contents[i].style.width = w + 'px';
  }

  wrap.style.left = `-${w * status.step}px`;
};

window.addEventListener('load', () => {
  init();
  initStyles();
});

let resizeTimer = 0;
window.addEventListener('resize', () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(initStyles, 200);
});

// Page back
prev.addEventListener('click', (e) => {
  e.preventDefault();
  status.step--;
});

// Page forward
next.addEventListener('click', (e) => {
  e.preventDefault();
  status.step++;
});

// Start
document.getElementById('simulator_start').addEventListener('click', () => {
  status.step++;
});

for (let question of questions) {
  question.addEventListener('change', (e) => {
    const q = e.target;
    status[q.name] = q.value;
    console.log(status);
  });
}
