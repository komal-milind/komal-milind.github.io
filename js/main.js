/* ════════════════════════════════════
   Komal & Milind Wedding — main.js
════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Envelope open ── */
  const envScreen = document.getElementById('envelope-screen');
  const invitation = document.getElementById('invitation');

  function spawnSparks() {
    var container = document.getElementById('env-sparks');
    if (!container) return;
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;
    for (var i = 0; i < 18; i++) {
      var s = document.createElement('div');
      s.className = 'spark';
      var angle = (i / 18) * Math.PI * 2;
      var dist  = 40 + Math.random() * 80;
      s.style.left = cx + 'px';
      s.style.top  = cy + 'px';
      s.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
      s.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
      s.style.animationDelay = (Math.random() * 0.15) + 's';
      s.style.width  = (3 + Math.random() * 4) + 'px';
      s.style.height = s.style.width;
      container.appendChild(s);
    }
  }

  function openEnvelope() {
    envScreen.removeEventListener('click', openEnvelope);
    envScreen.removeEventListener('keydown', onEnvKey);

    // 1 — sparks burst at centre
    spawnSparks();

    // 2 — after tiny delay, trigger the split
    setTimeout(function () {
      envScreen.classList.add('splitting');
    }, 180);

    // 3 — once panels are off-screen, reveal invitation
    setTimeout(function () {
      envScreen.style.display = 'none';
      invitation.classList.remove('hidden');
      requestAnimationFrame(function () {
        invitation.classList.add('in');
      });
      initAll();
    }, 1350);
  }

  function onEnvKey(e) {
    if (e.key === 'Enter' || e.key === ' ') openEnvelope();
  }

  envScreen.addEventListener('click', openEnvelope);
  envScreen.addEventListener('keydown', onEnvKey);

  /* ── All initialisations ── */
  function initAll() {
    spawnPetals();
    spawnConfetti();
    initScratch();
    initCountdown();
    initReveal();
    initMusic();
  }

  /* ────────────────────────────────── */
  /*  MUSIC — HTML5 Audio              */
  /*  Put your MP3 at music/song.mp3   */
  /* ────────────────────────────────── */
  function initMusic() {
    var btn = document.getElementById('music-btn');
    if (!btn) return;

    var audio = document.createElement('audio');
    audio.src = 'music/song.mp3';
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = 'auto';
    document.body.appendChild(audio);

    var playing = false;

    function updateBtn() {
      btn.textContent = playing ? '♪' : '♩';
      btn.title = playing ? 'Pause music' : 'Play music';
      btn.classList.toggle('music-playing', playing);
    }

    // Auto-start — envelope tap counts as the user gesture browsers require
    audio.play().then(function () {
      playing = true;
      updateBtn();
    }).catch(function () {
      // Autoplay blocked — user can tap the button manually
      playing = false;
      updateBtn();
    });

    btn.addEventListener('click', function () {
      if (playing) {
        audio.pause();
        playing = false;
      } else {
        audio.play();
        playing = true;
      }
      updateBtn();
    });
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

    ctx.fillStyle = '#B8852E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        setTimeout(function () {
          canvas.style.display = 'none';
          // Reveal the date in the countdown block with a pop
          var dateEl = document.getElementById('big-date-el');
          var dayEl  = document.getElementById('date-day-el');
          if (dateEl) { dateEl.classList.add('date-revealed'); }
          if (dayEl)  { dayEl.classList.add('date-revealed'); }
          // Scroll smoothly down to the countdown
          var cdBlock = document.querySelector('.countdown-block');
          if (cdBlock) {
            setTimeout(function () {
              cdBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        }, 700);
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
      var now  = new Date();
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

})();
