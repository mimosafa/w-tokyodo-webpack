let width = 0;

const init = () => {
  width = window.innerWidth;
};

const media = () => {
  if (!width) {
    init();
  }
  return width > 896 ? 'desktop' : 'phone';
};

const isPhone = () => {
  return media() === 'phone';
};

const isDesktop = () => {
  return media() === 'desktop';
};

module.exports = {
  init, media, isPhone, isDesktop
};
