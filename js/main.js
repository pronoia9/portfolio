$('[data-fancybox="gallery"]').fancybox({
  animationEffect: 'zoom-in-out',
  animationDuration: 600,
  transitionDuration: 1200,
  buttons: ['zoom', 'share', 'slideShow', 'thumbs', 'close'],
});

$('[data-fancybox="diplome"]').fancybox({
  animationEffect: 'zoom-in-out',
  animationDuration: 600,
  transitionDuration: 1200,
  buttons: ['zoom', 'slideShow', 'thumbs', 'close'],
});

$('[data-fancybox="avatar"]').fancybox({
  animationEffect: 'zoom-in-out',
  animationDuration: 600,
  transitionDuration: 1200,
  buttons: ['zoom', 'close'],
});

$('[data-fancybox="recommendation"]').fancybox({
  animationEffect: 'zoom-in-out',
  animationDuration: 600,
  transitionDuration: 1200,
  buttons: ['zoom', 'slideShow', 'thumbs', 'close'],
});

$.fancybox.defaults.hash = false;
