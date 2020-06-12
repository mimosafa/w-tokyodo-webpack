const $header = $('#header');
const $gbtn = $header.find('.header_gnav_btn a');
const $brands = $header.find('.header_gnav_brand');
const $gmenu = $header.find('.header_gnav_menu');
const $others = $header.find('.header_gnav_other');
const $overlay = $('.header_overlay');

const media = require('@wstd/media');

const fadeSpeed = 350;

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

  $overlay.hide();
};

$gbtn.on('click', (e) => {
  e.preventDefault();

  $gbtn.toggleClass('active');
  $brands.slideToggle(fadeSpeed);
  $gmenu.slideToggle(fadeSpeed);

  if (media.isPhone()) {
    $others.slideToggle(fadeSpeed);
  }

  $overlay.fadeToggle(fadeSpeed);
});

// $overlay.on('click', init);

module.exports = {
  init
};
