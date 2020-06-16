// Elements
const root = document.querySelector('#contents.simulator');
const wrap = root.querySelector(':scope > .simulator_wrapper');
const contents = wrap.querySelectorAll(':scope > .simulator_page');
const controller = root.querySelector(':scope .simulator_controller');
const prev = controller.querySelector('.simulator_prev');
const next = controller.querySelector('.simulator_next');
const amounts = root.querySelectorAll(':scope .simulator_amount > .simulator_amount_yen');

const questions = wrap.querySelectorAll('input');

const header = document.getElementById('header');

// Window size
let w, h;

// Data
let status = {};
let answers = {};

// Initializing
const init = () => {
  status.step = 0;
  status.length = contents.length;
  status.amount = 0;
  answers.prices = {};

  status = new Proxy(status, {
    set(target, prop, val) {
      if (prop === 'step') {
        // Simulator progress
        if ((val < 0) || (val > (target.length - 1))) {
          return false;
        }
        target[prop] = val;
        if (val === 0) {
          root.classList.add('first');
        } else {
          root.classList.remove('first');
        }
        if (val === (target.length - 1)) {
          root.classList.add('last');
        } else {
          root.classList.remove('last');
        }
        wrap.style.left = `-${w * target[prop]}px`;
        return true;
      }
      if (prop === 'amount') {
        // Total amount
        for (const am of amounts) {
          am.textContent = val;
        }
        target[prop] = val;
        return true;
      }
      return false;
    }
  });

  answers = new Proxy(answers, {
    set(target, prop, val) {
      const prices = target.prices;
      if (prop === 'car_type') {
        prices.carUnit = this.carUnitPrice(val);
      }
      else if (prop === 'days') {
        prices.days = val;
      }
      else if (prop === 'carry-in-out') {
        prices.carryInOut = this.carryInOutPrice(val);
      }
      else if (prop === 'additional-items') {
        prices.additionalItems = 10000 * val.length;
      }

      target[prop] = val;
      if ((prices.carUnit > 0) && (prices.days > 0)) {
        status.amount = prices.carUnit * prices.days;
      }
      if (prices.carryInOut > 0) {
        status.amount = status.amount + prices.carryInOut;
      }
      if (prices.additionalItems > 0) {
        status.amount = status.amount + prices.additionalItems
      }
      return true;
    },
    carUnitPrice(type) {
      if (type === 'kei') {
        return 30000;
      }
      else if (type === 'futsu') {
        return 70000;
      }
      return 0;
    },
    carryInOutPrice(type) {
      if (type === 'request') {
        return 40000;
      }
      return 0;
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

// Window load event
window.addEventListener('load', () => {
  root.classList.add('first');
  init();
  initStyles();
});

// Window resize event
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
    const name = q.name;
    const els = document.getElementsByName(name);
    const type = els[0].type;
    let value;

    if (type === 'checkbox') {
      value = [];
      for (const el of els) {
        if (el.checked === true) {
          value.push(el.value);
        }
      }
    }
    else {
      value = q.value;
    }
    answers[name] = value;
    if (type === 'radio') {
      status.step++;
    }
  });
}
