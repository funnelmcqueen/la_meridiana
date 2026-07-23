/* ============================================================
   IL SOLE — La Meridiana's solar engine.  Vanilla JS, no deps.
   Computes the real sun over East Horsley (lat 51.278, lon -0.433),
   maps it to a body.phase-* class and light/shadow CSS variables that
   the whole site's colour system flows from.
   Testing overrides (mandatory for demos):  ?ora=HH:MM   ?phase=night
   ============================================================ */
(function () {
  var LAT = 51.278, LON = -0.433, RAD = Math.PI / 180;
  var root = document.documentElement;
  var PHASES = ['phase-dawn', 'phase-morning', 'phase-noon', 'phase-golden', 'phase-dusk', 'phase-night'];

  /* London wall-clock (decimal hours) + its UTC offset — BST-aware via Intl */
  function london(d) {
    var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false })
      .formatToParts(d).reduce(function (a, x) { a[x.type] = x.value; return a; }, {});
    var t = (+p.hour) + (+p.minute) / 60;
    var utc = d.getUTCHours() + d.getUTCMinutes() / 60;
    var off = t - utc; if (off > 12) off -= 24; if (off < -12) off += 24;
    return { t: t, off: off };
  }
  function dayOfYear(d) {
    var s = Date.UTC(d.getUTCFullYear(), 0, 0);
    return Math.floor((Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - s) / 86400000);
  }

  /* NOAA-style: declination + equation of time → solar noon, sunrise/sunset, altitude */
  function solar(d, tOverride) {
    var lp = london(d);
    var t = (tOverride != null) ? tOverride : lp.t;
    var N = dayOfYear(d);
    var decl = -23.44 * Math.cos(RAD * (360 / 365 * (N + 10)));                 // deg
    var B = RAD * (360 / 365 * (N - 81));
    var EoT = 9.87 * Math.sin(2 * B) - 7.53 * Math.cos(B) - 1.5 * Math.sin(B);  // minutes
    var noon = 12 - LON / 15 - EoT / 60 + lp.off;                              // local clock hours
    var cosH0 = (Math.sin(-0.833 * RAD) - Math.sin(LAT * RAD) * Math.sin(decl * RAD)) /
                (Math.cos(LAT * RAD) * Math.cos(decl * RAD));
    cosH0 = Math.max(-1, Math.min(1, cosH0));
    var H0 = Math.acos(cosH0) / RAD;                                            // half-day arc, deg
    var sunrise = noon - H0 / 15, sunset = noon + H0 / 15;
    var H = 15 * (t - noon);                                                    // hour angle, deg
    var alt = Math.asin(Math.sin(LAT * RAD) * Math.sin(decl * RAD) +
              Math.cos(LAT * RAD) * Math.cos(decl * RAD) * Math.cos(H * RAD)) / RAD;
    return { t: t, noon: noon, sunrise: sunrise, sunset: sunset, golden: sunset - 1, alt: alt, H0: H0 };
  }

  function phaseOf(s) {
    var t = s.t, sr = s.sunrise, ss = s.sunset, n = s.noon;
    if (t <= sr - 0.5 || t >= ss + 0.67) return 'phase-night';
    if (t < sr + 1) return 'phase-dawn';
    if (t >= s.golden && t < ss) return 'phase-golden';
    if (t >= ss && t < ss + 0.67) return 'phase-dusk';
    if (t >= n - 1.5 && t <= n + 1.5) return 'phase-noon';
    return 'phase-morning';
  }
  function hm(x) {
    var h = ((Math.floor(x) % 24) + 24) % 24, m = Math.round((x - Math.floor(x)) * 60);
    if (m === 60) { h = (h + 1) % 24; m = 0; }
    return (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
  }

  function apply() {
    var params = new URLSearchParams(location.search);
    var now = new Date();
    var tOverride = null, force = null;
    var ora = params.get('ora');
    if (ora && /^\d{1,2}:\d{2}$/.test(ora)) { var q = ora.split(':'); tOverride = (+q[0]) + (+q[1]) / 60; }
    if (params.get('phase')) force = 'phase-' + params.get('phase');

    var s = solar(now, tOverride);
    var phase = (force && PHASES.indexOf(force) >= 0) ? force : phaseOf(s);

    var b = document.body;
    if (b) PHASES.forEach(function (p) { b.classList.toggle(p, p === phase); });

    /* continuous, physically-derived variables */
    var warmth;
    if (phase === 'phase-golden') warmth = 0.95;
    else if (phase === 'phase-night') warmth = 0.15;
    else if (phase === 'phase-dawn') warmth = 0.35;
    else if (phase === 'phase-dusk') warmth = 0.55;
    else warmth = Math.max(0.4, Math.min(1, (s.alt + 6) / 60));

    var altc = Math.max(2, s.alt);                                   // avoid ×0 at horizon
    var shadowLen = Math.max(3, Math.min(30, 3 + 27 * Math.pow(Math.cos(altc * RAD), 2)));
    var frac = (s.t - s.noon) / ((s.H0 / 15) || 6);                  // -1 sunrise · 0 noon · +1 sunset
    var shadowAngle = 90 + Math.max(-1, Math.min(1, frac)) * 70;     // 20°→160° sweep, away from sun

    root.style.setProperty('--sun-altitude', s.alt.toFixed(1));
    root.style.setProperty('--sun-warmth', warmth.toFixed(2));
    root.style.setProperty('--shadow-length', shadowLen.toFixed(1) + 'px');
    root.style.setProperty('--shadow-angle', shadowAngle.toFixed(0) + 'deg');

    /* published state for La Linea (Step 2) / marquee & true-noon (Step 4) */
    window.Sole = {
      phase: phase, alt: s.alt,
      noonStr: hm(s.noon), goldenStr: hm(s.golden), sunriseStr: hm(s.sunrise), sunsetStr: hm(s.sunset),
      isTrueNoon: Math.abs(s.t - s.noon) * 60 < 0.75
    };
    if (b) b.classList.toggle('true-noon', window.Sole.isTrueNoon);

    /* dinner mode: swap the hero to a warm interior (index only) */
    var hero = document.getElementById('heroImg');
    if (hero) {
      var night = phase === 'phase-night';
      if (!hero.dataset.day) hero.dataset.day = hero.getAttribute('src');
      var want = night ? 'assets/img/interior-dining-room.jpg' : hero.dataset.day;
      if (hero.getAttribute('src') !== want) hero.setAttribute('src', want);
    }

    document.dispatchEvent(new CustomEvent('sole:phase', { detail: window.Sole }));
  }

  apply();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  var params = new URLSearchParams(location.search);
  if (!params.get('ora') && !params.get('phase')) setInterval(apply, 60000);  // live, unless demoing
})();
