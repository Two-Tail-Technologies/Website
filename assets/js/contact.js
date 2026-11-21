// Contact form for contact.html. Messages are sent through Web3Forms
// (https://web3forms.com), so neither founder's email address appears in the page.
// Each founder has their own access key; the form sends one copy per person ticked.
// An access key is safe to publish: it only lets this form email that one person.
var CONTACT_KEYS = {
  aaron: '', // NEEDS: Aaron's Web3Forms access key
  mark: ''   // NEEDS: Mark's Web3Forms access key
};

(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var toError = document.getElementById('to-error');
  var button = form.querySelector('button[type="submit"]');
  var names = { aaron: 'Aaron', mark: 'Mark' };

  function say(text) { status.textContent = text; }

  function check() {
    var ok = true, first = null;
    var ticked = form.querySelectorAll('input[name="to"]:checked').length > 0;
    toError.hidden = ticked;
    if (!ticked) { ok = false; first = form.querySelector('input[name="to"]'); }
    ['cf-name', 'cf-email', 'cf-message'].forEach(function (id) {
      var el = document.getElementById(id);
      var bad = !el.value.trim() || (el.type === 'email' && !el.checkValidity());
      el.setAttribute('aria-invalid', bad ? 'true' : 'false');
      if (bad) { ok = false; first = first || el; }
    });
    if (first) first.focus();
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.botcheck.checked) return;
    if (!check()) { say('Please fill in the highlighted fields.'); return; }

    var to = Array.prototype.map.call(form.querySelectorAll('input[name="to"]:checked'), function (c) { return c.value; });
    if (to.some(function (who) { return !CONTACT_KEYS[who]; })) {
      say("The contact form isn't switched on yet. Please reach us on LinkedIn below for now.");
      return;
    }

    var name = document.getElementById('cf-name').value.trim();
    var email = document.getElementById('cf-email').value.trim();
    var message = document.getElementById('cf-message').value.trim();
    var label = to.length === 2 ? 'Aaron and Mark' : names[to[0]];
    button.disabled = true;
    say('Sending…');

    Promise.all(to.map(function (who) {
      return fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: CONTACT_KEYS[who],
          subject: 'Two Tail Technologies website: message from ' + name,
          from_name: 'Two Tail Technologies website',
          name: name,
          email: email,
          replyto: email,
          sent_to: label,
          message: message
        })
      }).then(function (r) { return r.json(); }).then(function (d) {
        return { who: who, ok: !!d.success };
      }, function () { return { who: who, ok: false }; });
    })).then(function (results) {
      var sent = results.filter(function (r) { return r.ok; });
      var failed = results.filter(function (r) { return !r.ok; });
      if (!failed.length) {
        form.reset();
        say('Thanks, ' + name + '. Your message is on its way to ' + label + '.');
      } else if (sent.length) {
        // Untick whoever already has it, so a retry doesn't send them a second copy.
        sent.forEach(function (r) { form.querySelector('input[name="to"][value="' + r.who + '"]').checked = false; });
        say('Your message reached ' + names[sent[0].who] + ' but not ' + names[failed[0].who] + '. Press Send again to retry.');
      } else {
        say("Sorry, your message didn't send. Please try again, or reach us on LinkedIn below.");
      }
    }).then(function () { button.disabled = false; });
  });
})();
