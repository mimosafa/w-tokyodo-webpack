const media = require('@wstd/media');
const header = require('./header/header');
require('./footer/footer');

const init = () => {
  media.init();
  header.init();
};

window.addEventListener('load', init);

let resizeTimer = 0;
window.addEventListener('resize', () => {
  if (resizeTimer) {
    clearTimeout(resizeTimer);
  }
  resizeTimer = setTimeout(init, 200);
});
