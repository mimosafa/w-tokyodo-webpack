const $header = $('#header');
const $gbtn = $header.find('.header_gnav_btn a');
const $brands = $header.find('.header_gnav_brand');
const $gmenu = $header.find('.header_gnav_menu');
const $others = $header.find('.header_gnav_other');

const media = require('@wstd/media');

const init = () => {
  $gbtn.removeClass('active');
  $brands.hide();
  $gmenu.hide();

  if (media.isPhone()) {
    $others.hide();
  }
  else if (media.isDesktop()) {
    $others.show();
  }
};

$gbtn.on('click', (e) => {
  e.preventDefault();

  $gbtn.toggleClass('active');
  $brands.slideToggle(350);
  $gmenu.slideToggle(350);

  if (media.isPhone()) {
    $others.slideToggle(350);
  }
});

module.exports = {
  init
};
