// Status filter for projects.html. Without JavaScript every card stays visible.
(function () {
  var bar = document.querySelector('[data-filters]');
  if (!bar) return;
  var buttons = bar.querySelectorAll('button[data-filter]');
  var cards = document.querySelectorAll('[data-status]');
  bar.hidden = false;

  function show(status) {
    buttons.forEach(function (b) {
      var on = b.getAttribute('data-filter') === status;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.classList.toggle('tt-btn-primary', on);
      b.classList.toggle('tt-btn-secondary', !on);
    });
    cards.forEach(function (c) {
      c.hidden = !(status === 'all' || c.getAttribute('data-status') === status);
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { show(b.getAttribute('data-filter')); });
  });
  show('all');
})();
