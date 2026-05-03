/* ══════════════════════════════════════
   Komal & Milind Wedding — main.js
══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Envelope open ── */
  const envScreen = document.getElementById('envelope-screen');
  const invitation = document.getElementById('invitation');

  function openEnvelope() {
    envScreen.classList.add('fade-out');
    setTimeout(function () {
      envScreen.style.display = 'none';
      invitation.classList.remove('hidden');
      requestAnimationFrame(function () {
        invitation.classList.add('in');
      });
      initAll();
    }, 1000);
  }

  envScreen.addEventListener('click', openEnvelope);
  envScreen.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') openEnvelope();
  });

  /* ── Smooth scroll helper ── */
  window.scrollTo = function (id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── All initialisations ── */
  function initAll() {
    spawnPetals();
    spawnConfetti();
    initScratch();
    initCountdown();
    initReveal();
  }

  /* ────────────────────────────────── */
  /*  FALLING PETALS                   */
  /* ────────────────────────────────── */
  function spawnPetals() {
    var container = document.getElementById('petals-root');
    if (!container) return;
    var colors = ['#8B2030', '#C9933A', '#7B1E2E', '#A0522D'];
    for (var i = 0; i < 12; i++) {
      (function (i) {
        var p = document.createElement('div');
        p.className = 'petal';
        p.style.left = Math.random() * 100 + '%';
        p.style.background = colors[i % colors.length];
        p.style.animationDuration = (6 + Math.random() * 6) + 's';
        p.style.animationDelay = (Math.random() * 8) + 's';
        p.style.opacity = (0.3 + Math.random() * 0.5).toFixed(2);
        p.style.width = (6 + Math.random() * 6) + 'px';
        p.style.height = (10 + Math.random() * 8) + 'px';
        container.appendChild(p);
      })(i);
    }
  }

  /* ────────────────────────────────── */
  /*  CONFETTI DOTS                    */
  /* ────────────────────────────────── */
  function spawnConfetti() {
    var container = document.getElementById('confetti-root');
    if (!container) return;
    var colors = ['#C9933A', '#7B1E2E', '#E8C06A', '#FFFFFF'];
    var shapes = [
      { w: 7, h: 7, r: '50%' },
      { w: 10, h: 4, r: '2px' },
      { w: 4, h: 12, r: '2px' },
      { w: 8, h: 8, r: '2px' }
    ];
    for (var i = 0; i < 14; i++) {
      (function (i) {
        var d = document.createElement('div');
        d.className = 'confetti-dot';
        var s = shapes[i % shapes.length];
        d.style.width = s.w + 'px';
        d.style.height = s.h + 'px';
        d.style.borderRadius = s.r;
        d.style.background = colors[i % colors.length];
        d.style.top = (10 + Math.random() * 80) + '%';
        d.style.left = (5 + Math.random() * 90) + '%';
        d.style.animationDuration = (3 + Math.random() * 3) + 's';
        d.style.animationDelay = (Math.random() * 3) + 's';
        d.style.opacity = (0.4 + Math.random() * 0.5).toFixed(2);
        container.appendChild(d);
      })(i);
    }
  }

  /* ────────────────────────────────── */
  /*  SCRATCH CARD                     */
  /* ────────────────────────────────── */
  function initScratch() {
    var canvas = document.getElementById('scratch-canvas');
    if (!canvas) return;

    var wrap = canvas.parentElement;
    canvas.width = wrap.offsetWidth || 280;
    canvas.height = wrap.offsetHeight || 90;

    var ctx = canvas.getContext('2d');

    // Gold scratch layer
    ctx.fillStyle = '#B8852E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scratch text
    ctx.fillStyle = '#E8C06A';
    ctx.font = 'bold 14px Lato, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦  Scratch here  ✦', canvas.width / 2, canvas.height / 2);

    var isDrawing = false;
    var scratched = false;

    function getPos(e) {
      var rect = canvas.getBoundingClientRect();
      var scaleX = canvas.width / rect.width;
      var scaleY = canvas.height / rect.height;
      var src = e.touches ? e.touches[0] : e;
      return {
        x: (src.clientX - rect.left) * scaleX,
        y: (src.clientY - rect.top) * scaleY
      };
    }

    function scratch(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    }

    function checkComplete() {
      if (scratched) return;
      var data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      var total = data.length / 4;
      var cleared = 0;
      for (var i = 3; i < data.length; i += 4) {
        if (data[i] === 0) cleared++;
      }
      if (cleared / total > 0.55) {
        scratched = true;
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        setTimeout(function () { canvas.style.display = 'none'; }, 700);
      }
    }

    canvas.addEventListener('mousedown', function (e) { isDrawing = true; var p = getPos(e); scratch(p.x, p.y); });
    canvas.addEventListener('mousemove', function (e) { if (!isDrawing) return; var p = getPos(e); scratch(p.x, p.y); checkComplete(); });
    canvas.addEventListener('mouseup', function () { isDrawing = false; checkComplete(); });
    canvas.addEventListener('mouseleave', function () { isDrawing = false; });

    canvas.addEventListener('touchstart', function (e) { e.preventDefault(); isDrawing = true; var p = getPos(e); scratch(p.x, p.y); }, { passive: false });
    canvas.addEventListener('touchmove', function (e) { e.preventDefault(); if (!isDrawing) return; var p = getPos(e); scratch(p.x, p.y); checkComplete(); }, { passive: false });
    canvas.addEventListener('touchend', function () { isDrawing = false; checkComplete(); });
  }

  /* ────────────────────────────────── */
  /*  LIVE COUNTDOWN                   */
  /* ────────────────────────────────── */
  function initCountdown() {
    var target = new Date('2026-06-23T00:00:00');

    function update() {
      var now = new Date();
      var diff = Math.max(0, target - now);

      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);

      var days = document.getElementById('cd-d');
      var hrs  = document.getElementById('cd-h');
      var min  = document.getElementById('cd-m');
      var sec  = document.getElementById('cd-s');

      if (days) days.textContent = d;
      if (hrs)  hrs.textContent  = pad(h);
      if (min)  min.textContent  = pad(m);
      if (sec)  sec.textContent  = pad(s);
    }

    function pad(n) { return String(n).padStart(2, '0'); }

    update();
    setInterval(update, 1000);
  }

  /* ────────────────────────────────── */
  /*  SCROLL REVEAL                    */
  /* ────────────────────────────────── */
  function initReveal() {
    var targets = document.querySelectorAll('.reveal');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(function (el) { observer.observe(el); });
  }

  /* ────────────────────────────────── */
  /*  RSVP SUBMIT                      */
  /* ────────────────────────────────── */
  window.submitRSVP = function (e) {
    e.preventDefault();
    var name   = document.getElementById('r-name').value.trim();
    var email  = document.getElementById('r-email').value.trim();
    var attend = document.getElementById('r-attend').value;
    var msg    = document.getElementById('r-msg').value.trim();

    if (!name || !email) {
      alert('Please fill in your name and email.');
      return;
    }

    // Here you would normally POST to a backend / Formspree / EmailJS
    // For now we log and show success
    console.log('RSVP:', { name, email, attend, msg });

    var successEl = document.getElementById('rsvp-success');
    if (successEl) {
      successEl.classList.remove('hidden');
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    document.getElementById('rsvp-form').reset();
  };

})();