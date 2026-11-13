// Two Tail Technologies — menu toggle and project grid sorting/filtering
(function () {
  "use strict";

  // Mobile menu
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Project grid
  var grid = document.getElementById("project-grid");
  if (!grid) return;

  var cards = Array.prototype.slice.call(grid.querySelectorAll("li[data-name]"));
  var sortSelect = document.getElementById("sort");
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll("[data-filter]"));
  var count = document.getElementById("result-count");
  var state = { sort: "status", filter: "all" };

  // Read initial state from the URL (?sort=newest&status=idea) so views can be shared
  var params = new URLSearchParams(window.location.search);
  if (params.get("sort")) state.sort = params.get("sort");
  if (params.get("status")) state.filter = params.get("status");

  var sorters = {
    status: function (a, b) {
      return a.dataset.rank - b.dataset.rank || b.dataset.started.localeCompare(a.dataset.started) || a.dataset.name.localeCompare(b.dataset.name);
    },
    newest: function (a, b) {
      return b.dataset.started.localeCompare(a.dataset.started) || a.dataset.name.localeCompare(b.dataset.name);
    },
    name: function (a, b) {
      return a.dataset.name.localeCompare(b.dataset.name);
    }
  };

  function render() {
    if (!sorters[state.sort]) state.sort = "status";
    sortSelect.value = state.sort;
    cards.sort(sorters[state.sort]).forEach(function (card) { grid.appendChild(card); });

    var shown = 0;
    cards.forEach(function (card) {
      var match = state.filter === "all" || card.dataset.status === state.filter;
      card.hidden = !match;
      if (match) shown++;
    });
    filterButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.filter === state.filter ? "true" : "false");
    });
    count.textContent = "Showing " + shown + " of " + cards.length + " projects";

    var q = new URLSearchParams();
    if (state.sort !== "status") q.set("sort", state.sort);
    if (state.filter !== "all") q.set("status", state.filter);
    var qs = q.toString();
    history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : ""));
  }

  sortSelect.addEventListener("change", function () { state.sort = sortSelect.value; render(); });
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { state.filter = btn.dataset.filter; render(); });
  });
  render();
})();
