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
  tabs.forEach(function(t){
    t.addEventListener('click', function(){
      tabs.forEach(function(x){ x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
      t.classList.add('active'); t.setAttribute('aria-selected','true');
      document.querySelectorAll('.pane').forEach(function(p){ p.classList.remove('active'); });
      document.getElementById('pane-' + t.dataset.pane).classList.add('active');
    });
  });

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

    if(reduced){
      dialSun.style.transform = xform(live.deg);
    } else {
      var climb = 1500, dwell = 450, settle = 1500, t0 = null;
      function frame(ts){
        if(t0 === null) t0 = ts;
        var e = ts - t0, deg;
        if(e < climb)                 deg = 180 - 90*ease(e/climb);                     // sunrise -> noon
        else if(e < climb + dwell)    deg = 90;                                         // dwell at the meridian
        else if(e < climb + dwell + settle) deg = 90 + (live.deg - 90)*ease((e - climb - dwell)/settle); // noon -> now
        else { dialSun.style.transform = xform(live.deg); return; }
        dialSun.style.transform = xform(deg);
        requestAnimationFrame(frame);
      }
      setTimeout(function(){ requestAnimationFrame(frame); }, 700);      // let the arc draw first
    }

    /* keep it honest over a long visit — glide to the new position each minute */
    setInterval(function(){
      if(reduced) return;
      var a = angleNow();
      dialSun.style.transition = 'transform 2s var(--ease)';
      dialSun.style.transform = xform(a.deg);
      dialSun.classList.toggle('is-night', a.night);
    }, 60000);
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

  /* marquee — duplicate track for seamless loop */
  var track = document.getElementById('marqueeTrack');
  if(track){ track.innerHTML += track.innerHTML; }

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
})();
