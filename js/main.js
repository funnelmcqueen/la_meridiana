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
