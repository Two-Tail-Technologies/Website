// Download counter for the Chartered page. Asks GitHub how many times each Chartered installer
// (the .exe on every chartered-v* release) has been downloaded and shows the total. GitHub counts
// downloads, not people: a repeat download, a bot, or the game's own "Update now" each count once.
// Shows nothing until there is at least one download, or if GitHub can't be reached.
(function () {
  var counterElement = document.getElementById('chartered-downloads');
  if (!counterElement || !window.fetch) return;
  var RELEASES_URL = 'https://api.github.com/repos/Two-Tail-Technologies/Website/releases?per_page=100';

  function count_downloads(releases) {
    var totalDownloads = 0;
    releases.forEach(function (release) {
      if (release.tag_name.indexOf('chartered-v') !== 0) return;
      release.assets.forEach(function (asset) {
        if (/\.exe$/.test(asset.name)) totalDownloads += asset.download_count;
      });
    });
    return totalDownloads;
  }

  function show_downloads(totalDownloads) {
    if (totalDownloads < 1) return;
    counterElement.textContent = 'Downloaded ' + totalDownloads.toLocaleString('en-US') + (totalDownloads === 1 ? ' time' : ' times');
    counterElement.hidden = false;
  }

  fetch(RELEASES_URL, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (response) { return response.ok ? response.json() : []; })
    .then(function (releases) { show_downloads(count_downloads(releases)); })
    .catch(function () {});
})();
