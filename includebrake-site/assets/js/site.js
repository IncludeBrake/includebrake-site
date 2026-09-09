/* ==========================================================================
   IncludeBrake LLC — site.js
   No dependencies. Progressive enhancement only: every page is fully
   readable and usable with JavaScript disabled.
   ========================================================================== */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------ Scroll reveal (obs) -- */

  function observe(selector, onEnter, options) {
    var nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(nodes, onEnter);
      return;
    }

    var opts = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
    if (options) {
      for (var k in options) { if (options.hasOwnProperty(k)) opts[k] = options[k]; }
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          onEnter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, opts);

    Array.prototype.forEach.call(nodes, function (el) { obs.observe(el); });
  }

  function makeVisible(el) { el.classList.add('visible'); }

  observe('[data-animate]', makeVisible);
  observe('[data-stagger]', makeVisible);
  observe('[data-focus]', makeVisible, { threshold: 0.5 });

  /* ---------------------------------------------------------- Mobile nav -- */

  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });

    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && links.classList.contains('open')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }

  /* --------------------------------------------------------- FAQ accordion -- */

  var questions = document.querySelectorAll('.faq-q');

  Array.prototype.forEach.call(questions, function (btn) {
    btn.addEventListener('click', function () {
      var isOpen = btn.getAttribute('aria-expanded') === 'true';

      Array.prototype.forEach.call(questions, function (other) {
        other.setAttribute('aria-expanded', 'false');
        if (other.nextElementSibling) other.nextElementSibling.style.maxHeight = '0px';
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        var panel = btn.nextElementSibling;
        if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  // Keep an open answer correctly sized if the window is resized.
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      Array.prototype.forEach.call(questions, function (btn) {
        if (btn.getAttribute('aria-expanded') === 'true' && btn.nextElementSibling) {
          btn.nextElementSibling.style.maxHeight = btn.nextElementSibling.scrollHeight + 'px';
        }
      });
    }, 150);
  });

  /* ---------------------------------------------------------------- Forms -- */
  /* Submits to the endpoint in the form's `action`. See README.md → Forms.
     If no endpoint is configured yet, the form tells the visitor to call or
     email instead of silently failing. */

  var forms = document.querySelectorAll('form[data-ib-form]');

  Array.prototype.forEach.call(forms, function (form) {
    var status = form.querySelector('.form-status');
    var submit = form.querySelector('button[type="submit"]');

    function say(message, ok) {
      if (!status) return;
      status.textContent = message;
      status.className = 'form-status show ' + (ok ? 'ok' : 'err');
    }

    form.addEventListener('submit', function (e) {
      var action = form.getAttribute('action') || '';

      // Not wired up yet — do not pretend the message was sent.
      if (!action || action.indexOf('REPLACE_WITH') !== -1) {
        e.preventDefault();
        say('This form is not connected yet. Please call or email directly — the address is in the footer.', false);
        return;
      }

      e.preventDefault();

      var original = submit ? submit.textContent : '';
      if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          say(form.getAttribute('data-success') ||
              'Got it. You will hear back within one business day.', true);
        })
        .catch(function () {
          say('That did not go through. Please call or email directly — the address is in the footer.', false);
        })
        .then(function () {
          if (submit) { submit.disabled = false; submit.textContent = original; }
        });
    });
  });

  /* ------------------------------------------------------ Footer year ----- */

  var year = document.querySelectorAll('[data-year]');
  Array.prototype.forEach.call(year, function (el) {
    el.textContent = new Date().getFullYear();
  });

})();
