/* La Meridiana — shared behaviour (extracted from approved design) */
(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* preloader — lift the curtain when ready (hard cap so it never hangs) */
  function lift(){ document.body.classList.add('loaded'); }
  if(reduced){ lift(); }
  else{
    window.addEventListener('load', function(){ setTimeout(lift, 500); });
    setTimeout(lift, 2600);
  }

  /* year */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* nav state */
  var nav = document.getElementById('nav');
  function onScrollNav(){ nav.classList.toggle('scrolled', window.scrollY > 40); }
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, {passive:true});

  /* mobile menu */
  var burger = document.getElementById('burger');
  var mob = document.getElementById('mobilemenu');
  burger.addEventListener('click', function(){
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('open');
      burger.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    });
  });

  /* reveal on scroll */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  /* menu tabs */
  var tabs = document.querySelectorAll('.tab');
  function activateTab(slug){
    var target = null;
    tabs.forEach(function(x){
      var on = x.dataset.pane === slug;
      x.classList.toggle('active', on); x.setAttribute('aria-selected', on ? 'true' : 'false');
      if(on) target = x;
    });
    document.querySelectorAll('.pane').forEach(function(p){ p.classList.remove('active'); });
    var pane = document.getElementById('pane-' + slug);
    if(pane) pane.classList.add('active');
    return target;
  }
  tabs.forEach(function(t){
    t.addEventListener('click', function(){ activateTab(t.dataset.pane); });
  });
  /* deep-link support: menu.html#setlunch / #takeaway opens that tab */
  if(tabs.length){
    function fromHash(){
      var slug = (location.hash || '').replace('#','');
      if(slug && document.getElementById('pane-' + slug)){
        var t = activateTab(slug);
        if(t) t.scrollIntoView({block:'nearest'});
      }
    }
    fromHash();
    window.addEventListener('hashchange', fromHash);
  }

  /* meridian sun follows scroll */
  var sun = document.getElementById('meridianSun');
  function moveSun(){
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? window.scrollY / h : 0;
    sun.style.top = (p * 100) + '%';
  }
  if(sun && !reduced){
    moveSun();
    window.addEventListener('scroll', function(){ requestAnimationFrame(moveSun); }, {passive:true});
  }

  /* ---- La Linea: the sun-disc rides the brass spine with scroll; section
         markers flare as it passes and the section heading gets a light-sweep. */
  (function(){
    var linea = document.getElementById('linea');
    if(!linea || reduced) return;
    var disc = linea.querySelector('.linea__disc');
    var marks = [].slice.call(linea.querySelectorAll('.linea__mark'));

    function range(){ return Math.max(1, document.documentElement.scrollHeight - window.innerHeight); }
    function layout(){
      var R = range();
      marks.forEach(function(m){
        var sec = document.getElementById(m.dataset.target);
        m._prog = sec ? Math.max(0, Math.min(1, sec.offsetTop / R)) : 0;
        m.style.top = (m._prog * 100) + '%';
        m._flared = false; m.classList.remove('flare');
      });
    }
    function sweep(id){
      var sec = document.getElementById(id);
      var head = sec && sec.querySelector('h1, h2, .display');
      if(!head) return;
      head.classList.remove('lightsweep');
      void head.offsetWidth;                 // restart the animation
      head.classList.add('lightsweep');
      setTimeout(function(){ head.classList.remove('lightsweep'); }, 950);
    }
    var ticking = false;
    function frame(){
      ticking = false;
      var p = window.scrollY / range();
      disc.style.top = (Math.max(0, Math.min(1, p)) * 100) + '%';
      marks.forEach(function(m){
        var passed = p >= m._prog - 0.004;
        if(passed && !m._flared){ m._flared = true; m.classList.add('flare'); sweep(m.dataset.target); }
        else if(!passed && m._flared){ m._flared = false; m.classList.remove('flare'); }
      });
    }
    function onScroll(){ if(!ticking){ ticking = true; requestAnimationFrame(frame); } }

    layout(); frame();
    window.addEventListener('scroll', onScroll, {passive:true});
    var rt; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ layout(); frame(); }, 150); }, {passive:true});
    window.addEventListener('load', function(){ layout(); frame(); });   // positions settle after images
  })();

  /* ---- Hero sundial: on load the sun sweeps up to the meridian (noon), then
         settles where the sun actually is over East Horsley right now. The
         position is recomputed on the arc EVERY FRAME, so it truly hugs the
         curve — no straight-line shortcuts. London time, BST-aware. --------- */
  (function(){
    var fig = document.querySelector('.herodial');
    if(!fig) return;
    var dialSun = fig.querySelector('.sun');
    if(!dialSun) return;
    var LAT = 51.278, LNG = -0.435, R = 110, RAD = Math.PI/180;

    /* current sun angle along the arc: 180deg = sunrise (left horizon),
       90deg = solar noon (apex), 0deg = sunset (right horizon). */
    function angleNow(){
      var now = new Date();
      var p = new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',hour12:false})
        .formatToParts(now).reduce(function(a,x){a[x.type]=x.value;return a;},{});
      var tLon = (+p.hour) + (+p.minute)/60;
      var utc  = now.getUTCHours() + now.getUTCMinutes()/60;
      var off  = tLon - utc; if(off>12) off-=24; if(off<-12) off+=24;   // London UTC offset
      var yStart = Date.UTC(now.getUTCFullYear(),0,0);
      var N = Math.floor((Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()) - yStart)/86400000);
      var decl = -23.44*Math.cos(RAD*(360/365*(N+10)));
      var B = RAD*(360/365*(N-81));
      var EoT = 9.87*Math.sin(2*B) - 7.53*Math.cos(B) - 1.5*Math.sin(B);  // minutes
      var cosH = -Math.tan(RAD*LAT)*Math.tan(RAD*decl);
      cosH = Math.max(-1, Math.min(1, cosH));
      var H = Math.acos(cosH)/RAD;                                        // half-day arc, degrees
      var noon = 12 - LNG/15 - EoT/60 + off;                             // solar noon, London time
      var sr = noon - H/15, ss = noon + H/15;
      var deg;
      if(tLon <= sr) deg = 180;
      else if(tLon < noon) deg = 180 - 90*(tLon - sr)/(noon - sr);
      else if(tLon <= ss)  deg = 90 - 90*(tLon - noon)/(ss - noon);
      else deg = 0;
      return {deg: deg, night: (tLon < sr || tLon > ss)};
    }
    /* point ON the arc for a given angle (base circle sits at the left horizon) */
    function xform(deg){
      var r = deg*RAD;
      return 'translate(' + (R + R*Math.cos(r)).toFixed(2) + 'px,' + (-R*Math.sin(r)).toFixed(2) + 'px)';
    }
    function ease(t){ return t < .5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2)/2; } // easeInOut

    var live = angleNow();
    dialSun.classList.toggle('is-night', live.night);

    /* sweep the sun sunrise -> noon -> current time, ON the arc every frame */
    function sweep(done){
      var climb = 1000, dwell = 250, settle = 1000, t0 = null;
      function frame(ts){
        if(t0 === null) t0 = ts;
        var e = ts - t0, deg;
        if(e < climb)                 deg = 180 - 90*ease(e/climb);
        else if(e < climb + dwell)    deg = 90;
        else if(e < climb + dwell + settle) deg = 90 + (live.deg - 90)*ease((e - climb - dwell)/settle);
        else { dialSun.style.transform = xform(live.deg); if(done) done(); return; }
        dialSun.style.transform = xform(deg);
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    /* keep it honest over a long visit — glide to the new position each minute */
    function startLive(){
      setInterval(function(){
        if(reduced) return;
        var a = angleNow();
        dialSun.style.transition = 'transform 2s var(--ease)';
        dialSun.style.transform = xform(a.deg);
        dialSun.classList.toggle('is-night', a.night);
      }, 60000);
    }

    var overlay = document.getElementById('sunintro');
    var timeEl  = overlay && overlay.querySelector('.sunintro__time');

    /* ---------- reduced-motion / no-overlay: place the sun, no intro -------- */
    if(reduced || !overlay){
      dialSun.style.transform = xform(live.deg);
      document.body.classList.add('lit');                    // release the held nav/hero content
      if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      startLive();
      return;
    }

    /* ---------- the full-screen intro ------------------------------------- */
    if(timeEl){
      var tp = new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',hour12:false})
        .formatToParts(new Date()).reduce(function(a,x){a[x.type]=x.value;return a;},{});
      timeEl.textContent = tp.hour + ':' + tp.minute + ' · East Horsley';
    }

    function playIntro(){
      if(fig.classList.contains('is-intro')) return;         // guard against double-run
      window.scrollTo(0, 0);
      var vw = window.innerWidth, vh = window.innerHeight;
      var R0 = fig.getBoundingClientRect();
      if(!R0.width){                                          // dial not measurable — skip intro safely
        dialSun.style.transform = xform(live.deg);
        document.body.classList.add('lit');                   // never leave the hero/nav held hidden
        if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
        startLive(); return;
      }
      var targetW = Math.min(vw*0.82, vh*1.15, 900);
      var scale = targetW / R0.width;
      var cx = R0.left + R0.width/2, cy = R0.top + R0.height/2;
      var tx = vw/2 - cx, ty = vh/2 - cy;

      /* leave a same-size placeholder so the hero doesn't reflow (no jump) while
         the dial is lifted out to the top layer */
      var ph = document.createElement('div');
      ph.style.width = R0.width + 'px';
      ph.style.height = R0.height + 'px';
      ph.style.margin = '0 0 30px';
      ph.style.flex = '0 0 auto';
      fig.parentNode.insertBefore(ph, fig);

      document.body.style.overflow = 'hidden';
      fig.classList.add('is-intro');
      document.body.appendChild(fig);                        // lift out of the hero stacking context
      fig.style.position = 'fixed';
      fig.style.left = R0.left + 'px';
      fig.style.top = R0.top + 'px';
      fig.style.width = R0.width + 'px';
      fig.style.zIndex = '9999';
      fig.style.transformOrigin = 'center center';
      fig.style.transition = 'none';
      fig.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
      void fig.offsetWidth;                                  // commit the big state

      /* place the wordmark just above the arc's apex, then fade it in */
      var logoEl = overlay.querySelector('.sunintro__logo');
      if(logoEl){
        var bigH = R0.height * scale;
        var apexY = (vh/2 - bigH/2) + (18/150)*bigH;         // arc apex, on screen
        logoEl.style.top = 'auto';
        logoEl.style.bottom = (vh - (apexY - 26)) + 'px';    // sit just above the curve
      }
      setTimeout(function(){ overlay.classList.add('show-logo'); }, 150);

      setTimeout(function(){
        sweep(function(){
          if(timeEl) timeEl.classList.add('show');
          setTimeout(function(){ shrink(ph); }, 420);
        });
      }, 300);
    }

    function shrink(ph){
      if(overlay) overlay.classList.add('lift');             // fade the backdrop away
      document.body.classList.add('lit');                    // nav/logo + hero content settle into place
      if(timeEl) timeEl.classList.remove('show');
      fig.classList.add('settled');                          // freeze draw-ins so nothing replays
      fig.style.transition = 'transform 1s var(--ease)';
      fig.style.transform = 'none';                          // glide back to the hero rect (R0)
      var ended = false;
      function end(){
        if(ended) return; ended = true;
        fig.removeEventListener('transitionend', end);
        ph.parentNode.insertBefore(fig, ph);                 // drop the dial back into its reserved slot
        ph.parentNode.removeChild(ph);
        fig.classList.remove('is-intro');
        ['position','left','top','width','margin','zIndex','transformOrigin','transition','transform']
          .forEach(function(k){ fig.style[k] = ''; });
        dialSun.style.transform = xform(live.deg);           // sun stays at the current time
        document.body.style.overflow = '';
        if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        startLive();
      }
      fig.addEventListener('transitionend', end);
      setTimeout(end, 1300);                                 // fallback if transitionend misses
    }

    /* start once fonts are settled so the measured hero rect is accurate */
    if(document.fonts && document.fonts.ready){
      document.fonts.ready.then(function(){ requestAnimationFrame(playIntro); });
      setTimeout(playIntro, 1200);                           // fallback
    } else {
      setTimeout(playIntro, 200);
    }
  })();

  /* gentle hero parallax */
  var heroImg = document.getElementById('heroImg');
  if(heroImg && !reduced){
    window.addEventListener('scroll', function(){
      requestAnimationFrame(function(){
        var y = Math.min(window.scrollY, window.innerHeight);
        heroImg.style.transform = 'scale(1.02) translateY(' + (y * 0.08) + 'px)';
      });
    }, {passive:true});
  }

  /* atmosphere band parallax */
  var pImgs = document.querySelectorAll('[data-parallax]');
  if(pImgs.length && !reduced){
    window.addEventListener('scroll', function(){
      requestAnimationFrame(function(){
        pImgs.forEach(function(img){
          var r = img.parentElement.getBoundingClientRect();
          if(r.bottom < 0 || r.top > window.innerHeight) return;
          var p = (r.top + r.height/2 - window.innerHeight/2) / window.innerHeight;
          img.style.transform = 'translateY(' + (p * -60) + 'px)';
        });
      });
    }, {passive:true});
  }

  /* gallery lightbox */
  var lb = document.getElementById('lb');
  var lbImg = document.getElementById('lbImg');
  var lbCap = document.getElementById('lbCap');
  function closeLb(){ lb.classList.remove('open'); document.body.style.overflow=''; }
  document.querySelectorAll('.gal__item').forEach(function(fig){
    fig.addEventListener('click', function(){
      var img = fig.querySelector('img');
      var cap = fig.querySelector('.cap');
      if(!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lbCap.textContent = cap ? cap.textContent : '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  lb.addEventListener('click', function(e){ if(e.target === lb) closeLb(); });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeLb(); });

  /* marquee — duplicate track for seamless loop, then feed it live sun times */
  var track = document.getElementById('marqueeTrack');
  if(track){
    track.innerHTML += track.innerHTML;
    var updateMarquee = function(){
      var S = window.Sole; if(!S) return;
      track.querySelectorAll('[data-sole="noon"]').forEach(function(el){ el.textContent = 'Sole al meridiano oggi · ' + S.noonStr; });
      track.querySelectorAll('[data-sole="golden"]').forEach(function(el){ el.textContent = 'Golden hour · ' + S.goldenStr; });
    };
    updateMarquee();
    document.addEventListener('sole:phase', updateMarquee);
  }

  /* image fallback if CDN blocked in preview */
  document.querySelectorAll('img').forEach(function(img){
    img.addEventListener('error', function(){
      var ph = document.createElement('div');
      ph.className = 'imgph';
      ph.textContent = 'Photo — ' + (img.alt || 'La Meridiana');
      img.replaceWith(ph);
    });
  });

  /* booking buttons — intentionally unwired until client sign-off */
  document.querySelectorAll('[data-booking]').forEach(function(b){
    b.addEventListener('click', function(e){ e.preventDefault(); });
  });

  /* ---- Il Cursore: the cursor is the sun (desktop, fine pointer only).
         A warm glow follows the pointer; .sun-lit elements lean their shadow
         away from it. Element centres are cached in PAGE coords (recomputed on
         resize/load only), so scrolling never re-measures layout. -------------- */
  (function(){
    if(reduced) return;
    if(!window.matchMedia || !window.matchMedia('(pointer:fine)').matches) return;

    /* tag a capped set of elements (no HTML churn) */
    var lit = [];
    ['.stagcard', '.gal__item', '.plaque', '.fhrs', '.award-photo', '.feature__media', '.btn--brass', '.card']
      .forEach(function(sel){ [].slice.call(document.querySelectorAll(sel)).forEach(function(el){ if(lit.length < 25) { el.classList.add('sun-lit'); lit.push(el); } }); });
    if(!lit.length) return;

    var glow = document.createElement('div');
    glow.className = 'sun-cursor'; glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    var centres = [];
    function measure(){
      var sx = window.scrollX, sy = window.scrollY;
      centres = lit.map(function(el){
        var r = el.getBoundingClientRect();
        return { el: el, x: r.left + sx + r.width / 2, y: r.top + sy + r.height / 2 };
      });
    }
    measure();

    var mx = window.innerWidth / 2, my = window.innerHeight / 2, raf = 0;
    var REACH = 620;
    function paint(){
      raf = 0;
      glow.style.transform = 'translate(' + (mx - 260) + 'px,' + (my - 260) + 'px)';
      var cx = mx + window.scrollX, cy = my + window.scrollY;   // cursor in page coords
      for(var i = 0; i < centres.length; i++){
        var c = centres[i], dx = c.x - cx, dy = c.y - cy;
        var dist = Math.sqrt(dx * dx + dy * dy);
        var reach = dist < REACH ? (1 - dist / REACH) : 0;      // 1 near → 0 far
        var len = 5 + reach * 16;
        var inv = dist || 1;
        c.el.style.setProperty('--sl-x', (dx / inv * len).toFixed(1) + 'px');
        c.el.style.setProperty('--sl-y', (dy / inv * len).toFixed(1) + 'px');
        c.el.style.setProperty('--sl-op', (0.05 + reach * 0.30).toFixed(3));
      }
    }
    function schedule(){ if(!raf) raf = requestAnimationFrame(paint); }
    window.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; schedule(); }, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });   // cached centres, no re-measure
    var rt; window.addEventListener('resize', function(){ clearTimeout(rt); rt = setTimeout(function(){ measure(); schedule(); }, 150); }, { passive: true });
    window.addEventListener('load', function(){ measure(); schedule(); });
    schedule();
  })();
})();
