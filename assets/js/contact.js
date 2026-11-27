// Contact form for contact.html. Messages are sent through Web3Forms
// (https://web3forms.com), so neither founder's email address appears in the page.
// Each founder has their own access key; the form sends one copy per person ticked.
// An access key is safe to publish: it only lets this form email that one person.
// The form stays hidden, and the LinkedIn notice shows, until BOTH keys are filled in.
var CONTACT_KEYS = {
  aaron: '', // Aaron's Web3Forms access key
  mark: ''   // Mark's Web3Forms access key
};

(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var notice = document.getElementById('contact-notice');
  var keysReady = Object.keys(CONTACT_KEYS).every(function (who) { return !!CONTACT_KEYS[who]; });
  if (keysReady) {
    form.hidden = false;
    if (notice) notice.hidden = true;
  }

  var status = document.getElementById('form-status');
  var toError = document.getElementById('to-error');
  var button = form.querySelector('button[type="submit"]');
  var names = { aaron: 'Aaron', mark: 'Mark' };

  var say = function (text) { status.textContent = text; };

  var set_field_error = function (el, isBad) {
    var err = document.getElementById(el.id + '-error');
    el.setAttribute('aria-invalid', isBad ? 'true' : 'false');
    if (err) err.hidden = !isBad;
  };

  var check_fields = function () {
    var isOk = true, first = null;
    var isTicked = form.querySelectorAll('input[name="to"]:checked').length > 0;
    toError.hidden = isTicked;
    if (!isTicked) { isOk = false; first = form.querySelector('input[name="to"]'); }
    ['cf-name', 'cf-email', 'cf-message'].forEach(function (id) {
      var el = document.getElementById(id);
      var isBad = !el.value.trim() || (el.type === 'email' && !el.checkValidity());
      set_field_error(el, isBad);
      if (isBad) { isOk = false; first = first || el; }
    });
    if (first) first.focus();
    return isOk;
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.botcheck.checked) return;
    if (!check_fields()) { say('Please fix the fields marked below.'); return; }

    var to = Array.prototype.map.call(form.querySelectorAll('input[name="to"]:checked'), function (c) { return c.value; });
    if (to.some(function (who) { return !CONTACT_KEYS[who]; })) {
      say("The contact form isn't switched on yet. Please reach us on LinkedIn below for now.");
      return;
    }

    var name = document.getElementById('cf-name').value.trim();
    var email = document.getElementById('cf-email').value.trim();
    var topic = document.getElementById('cf-topic').value;
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
          subject: 'Two Tail Technologies website: ' + (topic ? topic + ' from ' : 'message from ') + name,
          from_name: 'Two Tail Technologies website',
          name: name,
          email: email,
          replyto: email,
          topic: topic || 'Not specified',
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
