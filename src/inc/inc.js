const media = require('@wstd/media');
const header = require('./header/header');
const loader = require('./loader/loader');
require('./footer/footer');

const init = () => {
  media.init();
  header.init();
  loader.init();
};

window.addEventListener('load', init);

let resizeTimer = 0;
window.addEventListener('resize', () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(init, 200);
});
