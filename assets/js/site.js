// Shared page behavior.
// 1. Topic filter for the research pipeline on projects.html. Without JavaScript every card stays visible.
// 2. Opens a collapsed <details> section when a link or URL hash points at it (Chartered page).
(function () {
  var bar = document.querySelector('[data-filters]');
  if (bar) {
    var buttons = bar.querySelectorAll('button[data-filter]');
    var cards = document.querySelectorAll('[data-topic]');
    bar.hidden = false;

    var show_topic = function (topic) {
      buttons.forEach(function (b) {
        var isOn = b.getAttribute('data-filter') === topic;
        b.setAttribute('aria-pressed', isOn ? 'true' : 'false');
        b.classList.toggle('tt-btn-primary', isOn);
        b.classList.toggle('tt-btn-secondary', !isOn);
      });
      cards.forEach(function (c) {
        c.hidden = !(topic === 'all' || c.getAttribute('data-topic') === topic);
      });
    };

    buttons.forEach(function (b) {
      b.addEventListener('click', function () { show_topic(b.getAttribute('data-filter')); });
    });
    show_topic('all');
  }

  var open_hash_target = function () {
    if (!location.hash) return;
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target && target.tagName === 'DETAILS') {
      target.open = true;
      target.scrollIntoView();
    }
  };
  if (document.querySelector('details[id]')) {
    open_hash_target();
    window.addEventListener('hashchange', open_hash_target);
  }
})();
