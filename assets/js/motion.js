// Landing-page motion: scroll-triggered reveals.
// Progressive enhancement: without this file every element renders in its
// final, visible state. The `motion-js` class on <html> gates the hidden
// pre-reveal styles in motion.css, so no-JS visitors never see blank cards.
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function setupReveals() {
    var targets = document.querySelectorAll(".reveal:not(.in-view)");
    if (targets.length === 0) {
      return;
    }

    // Children of a [data-stagger] container follow each other by 90ms,
    // capped so a long list never feels like a slideshow.
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      var kids = group.querySelectorAll(".reveal");
      kids.forEach(function (el, i) {
        el.style.setProperty("--reveal-delay", Math.min(i * 90, 450) + "ms");
      });
    });

    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      targets.forEach(function (el) {
        el.classList.add("in-view", "reveal-done");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("in-view");
          // Hand the element back to normal CSS once the reveal
          // transition has finished, so later hover styles apply
          // without waiting on the reveal delay.
          var el = entry.target;
          var delay = parseFloat(getComputedStyle(el).transitionDelay) || 0;
          var duration = parseFloat(getComputedStyle(el).transitionDuration) || 0;
          window.setTimeout(function () {
            el.classList.add("reveal-done");
          }, (delay + duration) * 1000 + 100);
          observer.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  function init() {
    document.documentElement.classList.add("motion-js");
    setupReveals();
    setupCounters();
  }

  // The savings figure counts up the first time it scrolls into view.
  // The markup already contains the final number, so every fallback
  // (no JS, no IntersectionObserver, reduced motion) shows it statically.
  function setupCounters() {
    var counters = document.querySelectorAll("[data-count-to]");
    if (counters.length === 0) {
      return;
    }
    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          observer.unobserve(entry.target);
          animateCount(entry.target);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count-to"));
    var duration = 1100;
    var start;
    function tick(ts) {
      if (start === undefined) {
        start = ts;
      }
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }
    requestAnimationFrame(tick);
  }

  // Turbo Drive swaps the body on internal navigation; the script itself is
  // loaded once, so re-arm on every Turbo load as well as the first paint.
  document.addEventListener("turbo:load", init);
  document.addEventListener("DOMContentLoaded", init);
})();
