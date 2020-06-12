const $pageTop = $('#footer .footer_pagetop');

const position = 200;

window.addEventListener('scroll', () => {
  const y = window.pageYOffset;
  if (y < position) {
    $pageTop.fadeOut();
  } else {
    $pageTop.fadeIn();
  }
});

$pageTop.on('click', (e) => {
  e.preventDefault();
  $("body, html").animate({scrollTop: 0}, 500);
});
