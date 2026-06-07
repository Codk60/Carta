/* ============================================
   FONDO — BOKEH, PARTÍCULAS, CORAZONES
   ============================================ */
(function initBackground() {
  // Bolas bokeh desenfocadas
  const bokehWrap = document.getElementById('bgBokeh');
  const bokehColors = [
    'rgba(233,78,119,1)', 'rgba(198,40,91,1)',
    'rgba(247,168,184,1)', 'rgba(255,140,170,1)',
    'rgba(180,20,60,1)',  'rgba(255,180,200,1)'
  ];
  for (let i = 0; i < 10; i++) {
    const b = document.createElement('div');
    b.className = 'bokeh-ball';
    const size = 100 + Math.random() * 200;
    b.style.width  = size + 'px';
    b.style.height = size + 'px';
    b.style.left   = (Math.random() * 110 - 5) + 'vw';
    b.style.top    = (Math.random() * 110) + 'vh';
    b.style.background = bokehColors[Math.floor(Math.random() * bokehColors.length)];
    b.style.setProperty('--blur', (30 + Math.random() * 50) + 'px');
    b.style.setProperty('--op',   (0.08 + Math.random() * 0.16).toFixed(2));
    b.style.setProperty('--dx',   (Math.random() * 30 - 15) + 'px');
    b.style.setProperty('--dy',   -(10 + Math.random() * 25) + 'px');
    b.style.animationDuration = (20 + Math.random() * 28) + 's';
    b.style.animationDelay    = (-Math.random() * 25) + 's';
    bokehWrap.appendChild(b);
  }

  // Partículas doradas flotando hacia arriba
  const partWrap = document.getElementById('bgParticles');
  for (let i = 0; i < 32; i++) {
    const p = document.createElement('div');
    p.className = 'gold-particle';
    const size = 2 + Math.random() * 3;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = Math.random() * 100 + 'vw';
    p.style.top    = (55 + Math.random() * 55) + 'vh';
    p.style.setProperty('--py', -(70 + Math.random() * 100) + 'px');
    p.style.animationDuration = (10 + Math.random() * 14) + 's';
    p.style.animationDelay    = (-Math.random() * 14) + 's';
    partWrap.appendChild(p);
  }

  // Manchas de pintura — fondo
  const splWrap = document.getElementById('bgSplatters');
  const splColors = [
    'rgba(190,28,65,VAL)', 'rgba(160,10,45,VAL)',
    'rgba(210,40,80,VAL)', 'rgba(140,5,35,VAL)',
    'rgba(220,60,90,VAL)'
  ];
  const blobRadii = [
    '60% 40% 55% 45% / 50% 60% 40% 50%',
    '45% 55% 40% 60% / 60% 40% 55% 45%',
    '70% 30% 50% 50% / 45% 55% 50% 50%',
    '35% 65% 60% 40% / 55% 45% 40% 60%',
    '50% 50% 65% 35% / 40% 60% 45% 55%',
    '65% 35% 45% 55% / 50% 50% 60% 40%',
  ];
  for (let i = 0; i < 18; i++) {
    const s = document.createElement('div');
    s.className = 'bg-splatter';
    const size = 28 + Math.random() * 80;
    const op   = (0.07 + Math.random() * 0.13).toFixed(2);
    const col  = splColors[Math.floor(Math.random() * splColors.length)].replace('VAL', op);
    s.style.width        = size + 'px';
    s.style.height       = (size * (0.5 + Math.random() * 0.7)).toFixed(1) + 'px';
    s.style.left         = (Math.random() * 105 - 2) + 'vw';
    s.style.top          = (Math.random() * 105 - 2) + 'vh';
    s.style.background   = col;
    s.style.borderRadius = blobRadii[Math.floor(Math.random() * blobRadii.length)];
    s.style.transform    = `rotate(${Math.random() * 360}deg)`;
    splWrap.appendChild(s);
  }

  // Corazones flotantes del fondo
  const fhWrap  = document.getElementById('bgFloatHearts');
  const fhChars = ['❤', '♥', '💕', '❤'];
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('span');
    h.className   = 'bg-fheart';
    h.textContent = fhChars[Math.floor(Math.random() * fhChars.length)];
    h.style.left  = (Math.random() * 100) + 'vw';
    h.style.top   = (40 + Math.random() * 60) + 'vh';
    h.style.setProperty('--fs',  (0.8 + Math.random() * 1.4) + 'rem');
    h.style.setProperty('--fb',  (0.5 + Math.random() * 2) + 'px');
    h.style.setProperty('--fop', (0.1 + Math.random() * 0.18).toFixed(2));
    h.style.animationDuration = (14 + Math.random() * 18) + 's';
    h.style.animationDelay    = (-Math.random() * 18) + 's';
    fhWrap.appendChild(h);
  }
})();

/* ============================================
   MINI CORAZONES + DESTELLOS ALREDEDOR DEL CORAZÓN SVG
   ============================================ */
(function initHeartOrbit() {
  // Mini corazones orbitales
  const mhWrap = document.getElementById('miniHearts');
  if (mhWrap) {
    const emojis = ['♥', '♡', '♥', '✦', '♡'];
    const count  = 7;
    for (let i = 0; i < count; i++) {
      const el  = document.createElement('span');
      el.className   = 'mini-heart-el';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const ang = (Math.PI * 2 / count) * i;
      const r1  = 30 + Math.random() * 15;
      const r2  = r1 + 18 + Math.random() * 10;
      const r3  = r2 + 12 + Math.random() * 8;
      const r4  = r3 + 8;
      el.style.setProperty('--x0', Math.cos(ang) * r1 + 'px');
      el.style.setProperty('--y0', Math.sin(ang) * r1 + 'px');
      el.style.setProperty('--x1', Math.cos(ang + 0.25) * r2 + 'px');
      el.style.setProperty('--y1', Math.sin(ang + 0.25) * r2 + 'px');
      el.style.setProperty('--x2', Math.cos(ang + 0.55) * r3 + 'px');
      el.style.setProperty('--y2', Math.sin(ang + 0.55) * r3 + 'px');
      el.style.setProperty('--x3', Math.cos(ang + 0.8) * r4 + 'px');
      el.style.setProperty('--y3', Math.sin(ang + 0.8) * r4 + 'px');
      el.style.animationDuration = (2.8 + Math.random() * 2.5) + 's';
      el.style.animationDelay    = (-Math.random() * 4) + 's';
      mhWrap.appendChild(el);
    }
  }

  // Destellos dorados
  const spWrap = document.getElementById('heartSparkles');
  if (spWrap) {
    const sparkChars = ['✦', '✧', '✶', '⋆'];
    for (let i = 0; i < 9; i++) {
      const el  = document.createElement('span');
      el.className   = 'sparkle-el';
      el.textContent = sparkChars[Math.floor(Math.random() * sparkChars.length)];
      const ang = (Math.PI * 2 / 9) * i;
      const r1  = 40 + Math.random() * 18;
      const r2  = r1 + 12 + Math.random() * 10;
      el.style.setProperty('--sx',  Math.cos(ang) * r1 + 'px');
      el.style.setProperty('--sy',  Math.sin(ang) * r1 + 'px');
      el.style.setProperty('--sx2', Math.cos(ang + 0.5) * r2 + 'px');
      el.style.setProperty('--sy2', Math.sin(ang + 0.5) * r2 + 'px');
      el.style.animationDuration = (1.8 + Math.random() * 2.2) + 's';
      el.style.animationDelay    = (-Math.random() * 3) + 's';
      spWrap.appendChild(el);
    }
  }
})();

/* ============================================
   MARCO LUMINOSO SVG — ONDA ELEGANTE DE PUNTITOS
   ============================================ */
class BorderMarquee {
  constructor() {
    this.svg      = document.getElementById('borderSVG');
    this.card     = document.getElementById('passwordCard');
    if (!this.svg || !this.card) return;
    this.INSET    = 3;
    this.RADIUS   = 29;   // card 32px − inset 3px
    this.SPACING  = 14;   // px entre puntitos
    this.DURATION = 8;    // segundos por vuelta de onda
    this.W = this.H = 0;
    requestAnimationFrame(() => this.build());
    // Reconstruir cuando la card cambie de altura (ej. al aparecer el error)
    if (window.ResizeObserver) {
      new ResizeObserver(() => {
        clearTimeout(this._rt);
        this._rt = setTimeout(() => this.build(), 60);
      }).observe(this.card);
    }
  }

  // {x,y} sobre el borde interno, t ∈ [0,1)
  point(t) {
    const { W, H, INSET: P, RADIUS: r } = this;
    const sW = (W-2*P)-2*r, sH = (H-2*P)-2*r;
    const cLen = Math.PI/2*r;
    const total = 2*(sW+sH)+4*cLen;
    let d = (((t%1)+1)%1)*total;
    if (d < sW) return { x: P+r+d, y: P };
    d -= sW;
    if (d < cLen) { const a=d/r; return { x: W-P-r+Math.sin(a)*r, y: P+r-Math.cos(a)*r }; }
    d -= cLen;
    if (d < sH)  return { x: W-P, y: P+r+d };
    d -= sH;
    if (d < cLen) { const a=d/r; return { x: W-P-r+Math.cos(a)*r, y: H-P-r+Math.sin(a)*r }; }
    d -= cLen;
    if (d < sW)  return { x: W-P-r-d, y: H-P };
    d -= sW;
    if (d < cLen) { const a=d/r; return { x: P+r-Math.sin(a)*r, y: H-P-r+Math.cos(a)*r }; }
    d -= cLen;
    if (d < sH)  return { x: P, y: H-P-r-d };
    d -= sH;
    const a=d/r; return { x: P+r-Math.cos(a)*r, y: P+r-Math.sin(a)*r };
  }

  build() {
    this.W = this.card.offsetWidth;
    this.H = this.card.offsetHeight;
    if (!this.W) return;
    const { W, H, INSET: P, RADIUS: r, SPACING, DURATION: D } = this;

    this.svg.setAttribute('width',   W);
    this.svg.setAttribute('height',  H);
    this.svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    const perim = 2*((W-2*P-2*r)+(H-2*P-2*r))+2*Math.PI*r;
    const n = Math.floor(perim / SPACING);
    let dots = '';
    for (let i = 0; i < n; i++) {
      const p = this.point(i / n);
      const x = p.x.toFixed(2), y = p.y.toFixed(2);
      // El delay hace que el pico de brillo viaje de puntito en puntito
      const delay = ((i/n)*D - D/2).toFixed(3) + 's';
      // Puntito base: siempre visible, dorado suave
      dots += `<circle cx="${x}" cy="${y}" r="2" fill="#C9A84C" opacity="0.60"/>`;
      // Puntito activo: parpadea con la onda (CSS keyframe definido en style.css)
      dots += `<circle cx="${x}" cy="${y}" r="3.5" fill="#D4A843" opacity="0" filter="url(#mq_glow)" style="animation:marqWavePulse ${D}s linear ${delay} infinite"/>`;
    }

    this.svg.innerHTML = `
      <defs>
        <filter id="mq_glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <clipPath id="mq_clip">
          <rect x="0" y="0" width="${W}" height="${H}" rx="32" ry="32"/>
        </clipPath>
      </defs>
      <g clip-path="url(#mq_clip)">${dots}</g>
    `;
  }

  resize() { this.build(); }

  intensify() {
    this.DURATION = 2;
    this.build();
  }
}

const marquee = new BorderMarquee();
window.addEventListener('resize', () => marquee.resize());

/* ============================================
   CONTRASEÑA
   ============================================ */
const CLAVE_CORRECTA = 'Micurita04';

function checkPassword() {
  const input    = document.getElementById('passwordInput');
  const errorBox = document.getElementById('errorBox');
  const val      = input.value.trim();

  if (val === CLAVE_CORRECTA) {
    errorBox.classList.add('hidden');
    unlockPage();
  } else {
    input.value = '';
    input.focus();
    vibrar([60, 40, 60]);
    input.classList.remove('shake');
    void input.offsetWidth;
    input.classList.add('shake');

    errorBox.classList.remove('hidden');
    errorBox.style.animation = 'none';
    void errorBox.offsetWidth;
    errorBox.style.animation = '';

    lanzarDestellosDorados(document.getElementById('openBtn'), 6);
  }
}

document.getElementById('passwordInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPassword();
});

/* ============================================
   DESBLOQUEO — SECUENCIA COMPLETA
   ============================================ */
function unlockPage() {
  const heart  = document.getElementById('mainHeart');
  const card   = document.getElementById('passwordCard');
  const screen = document.getElementById('passwordScreen');
  const btn    = document.getElementById('openBtn');

  vibrar([40, 20, 60, 20, 100]);
  sonidoCampanillas();

  // Corazón late rápido
  heart.classList.add('beating-fast');
  lanzarCorazones(btn, 22);
  lanzarDestellosDorados(btn, 24);

  // Marco acelera
  marquee.intensify();

  // Tarjeta se abre
  setTimeout(() => { card.classList.add('opening'); }, 900);

  // Pantalla desaparece → overlay de voz
  setTimeout(() => {
    screen.classList.add('fade-out');
    setTimeout(() => { screen.style.display = 'none'; }, 700);
    mostrarOverlayVoz();
  }, 1500);
}

/* ─── Overlay de voz con máquina de escribir ─── */
const TEXTO_VOZ =
  'Hola mi amor...\n\nSi estás leyendo esto es porque encontraste esta carta.\n\nHay cosas que quiero decirte desde el corazón...';

function mostrarOverlayVoz() {
  const overlay = document.getElementById('voiceOverlay');
  const typerEl = document.getElementById('voiceTypewriter');
  const main    = document.getElementById('mainPage');

  overlay.classList.remove('hidden');
  typerEl.textContent = '';

  let i = 0;
  const tick = setInterval(() => {
    if (TEXTO_VOZ[i] === '\n') {
      typerEl.appendChild(document.createElement('br'));
      if (TEXTO_VOZ[i + 1] === '\n') { typerEl.appendChild(document.createElement('br')); i++; }
    } else {
      typerEl.insertAdjacentText('beforeend', TEXTO_VOZ[i]);
    }
    i++;
    if (i >= TEXTO_VOZ.length) clearInterval(tick);
  }, 38);

  setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => {
      overlay.style.display = 'none';
      main.classList.remove('hidden');
      main.classList.add('unfurl');
      setTimeout(initLetterBody, 800);
    }, 650);
  }, 4800);
}

/* ============================================
   SONIDOS SINTÉTICOS
   ============================================ */
function sonidoCampanillas() {
  try {
    const AudioCtx = window.AudioContext || /** @type {any} */ (window).webkitAudioContext;
    const ctx   = new AudioCtx();
    const notas = [523, 659, 784, 1047, 1319];
    notas.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.13;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.9);
    });
  } catch (e) {}
}

/* ============================================
   MÚSICA DE FONDO
   ============================================ */
let musicaActiva = false;
const bgMusic  = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');

function startMusic() {
  bgMusic.play().then(() => {
    musicaActiva = true;
    musicBtn.classList.add('playing');
    musicBtn.setAttribute('aria-label', 'Desactivar música');
  }).catch(() => {});
}

function toggleMusic() {
  if (musicaActiva) {
    bgMusic.pause();
    musicaActiva = false;
    musicBtn.classList.remove('playing');
    musicBtn.setAttribute('aria-label', 'Activar música');
  } else {
    startMusic();
  }
}

bgMusic.volume = 0.5;
// Intentar autoplay inmediato
startMusic();
// Si el navegador lo bloqueó, arrancar en el primer gesto (touchstart captura antes que click)
const _unlockMusic = () => {
  if (!musicaActiva) startMusic();
  document.removeEventListener('touchstart', _unlockMusic, true);
  document.removeEventListener('mousedown',  _unlockMusic, true);
  document.removeEventListener('keydown',    _unlockMusic, true);
};
document.addEventListener('touchstart', _unlockMusic, { capture: true, once: true });
document.addEventListener('mousedown',  _unlockMusic, { capture: true, once: true });
document.addEventListener('keydown',    _unlockMusic, { capture: true, once: true });

/* ============================================
   HELPERS — VIBRAR, CORAZONES, DESTELLOS
   ============================================ */
function vibrar(p) { if (navigator.vibrate) navigator.vibrate(p); }

function lanzarCorazones(origen, count = 10) {
  const cont   = document.getElementById('heartsContainer');
  const emojis = ['❤️', '💕', '💗', '🌸', '💖', '💝'];
  const rect   = origen.getBoundingClientRect();
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className   = 'float-heart';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left  = (rect.left + rect.width  / 2 + (Math.random() - 0.5) * 90) + 'px';
    el.style.top   = (rect.top  + rect.height / 2 + (Math.random() - 0.5) * 24) + 'px';
    el.style.fontSize          = (0.85 + Math.random() * 0.9) + 'rem';
    el.style.animationDuration = (1 + Math.random() * 0.7) + 's';
    el.style.animationDelay    = (Math.random() * 0.3) + 's';
    el.style.setProperty('--rs', (Math.random() - 0.5) * 30 + 'deg');
    el.style.setProperty('--re', (Math.random() - 0.5) * 60 + 'deg');
    cont.appendChild(el);
    setTimeout(() => el.remove(), 2300);
  }
}

function lanzarDestellosDorados(origen, count = 12) {
  const cont = document.getElementById('heartsContainer');
  const rect = origen.getBoundingClientRect();
  const cx   = rect.left + rect.width  / 2;
  const cy   = rect.top  + rect.height / 2;
  for (let i = 0; i < count; i++) {
    const el  = document.createElement('div');
    const ang = Math.random() * Math.PI * 2;
    const d   = 38 + Math.random() * 80;
    el.className = 'gold-spark';
    el.style.left = cx + 'px';
    el.style.top  = cy + 'px';
    el.style.animationDuration = (0.85 + Math.random() * 0.6) + 's';
    el.style.animationDelay    = (Math.random() * 0.28) + 's';
    el.style.setProperty('--sx', Math.cos(ang) * d + 'px');
    el.style.setProperty('--sy', Math.sin(ang) * d - 40 + 'px');
    cont.appendChild(el);
    setTimeout(() => el.remove(), 1900);
  }
}

/* ============================================
   CARTA DE PERDÓN DESPLEGABLE
   ============================================ */
const TEXTO_PERDON = `Geraldine,

Si algún día alguien encuentra esta carta entre las cosas que dejé en el mundo, que sepa que fue escrita con el corazón más honesto que tuve en toda mi vida.

No sé cuántas palabras hacen falta para reparar lo que se rompe cuando dos personas que se aman se lastiman. Pero sé que quiero intentarlo. Y que si hay alguien por quien vale la pena intentarlo, eres tú.

Te pido perdón. No el perdón que se dice de prisa para que el silencio duela menos, sino el perdón que se gana con el tiempo, con la paciencia, con cada mañana en que elijo ser mejor. El perdón que tú mereces porque nunca me pediste nada que no fuera real.

Hubo momentos en que fallé. Momentos en que mi orgullo fue más grande que mi amor, y eso no estuvo bien. Momentos en que callé cuando debí hablar, y hablé cuando debí callar. Momentos en que te di menos de lo que dabas, y aun así seguiste ahí. Eso me dice todo sobre quién eres tú.

Eres la clase de persona que ama de verdad. Con todo. Sin medias tintas. Y yo, a veces, no supe cargar con eso sin tener miedo. Pero el miedo no es una excusa. Solo es una razón que quiero dejar de darme.

Quiero que sepas que el 04 no es solo un número para mí. Es la prueba de que algo entre nosotros fue tan real que tuvo nombre propio. Y eso no se borra. No se reemplaza. No se olvida.

No te pido que olvides lo que dolió. Te pido que me dejes demostrarte que puedo amar sin hacerte daño. Que puedo estar sin que tengas que dudar. Que puedo ser constante, presente, tuyo, de una manera que te haga sentir segura y amada todos los días.

Si me das esa oportunidad, la voy a cuidar como si fuera lo más valioso que tengo. Porque lo es.

Con todo mi amor,
El que siempre va a elegirte.`;


function initLetterBody() {
  const el = document.getElementById('letterText');
  el.innerHTML = TEXTO_PERDON.trim().split('\n\n').map(p => `<p>${p.replace(/\n/g,'<br/>')}</p>`).join('');
}

/* ── Ogro guardián ── */
let ogroClicks = 0;
const OGRO_MSGS = [
  '¡Alto! Esta carta no se abre sin cariño 💗',
  'Aún no sientes el amor adecuado para abrir la carta... 💔',
  'Ya casi lo logras, pero aún te falta un poco más... 💛',
  'Está bien... confiaré en ti 💗'
];

(function initOgro() {
  const section = document.getElementById('letterSection');
  const wrap    = document.getElementById('ogroGuardian');
  if (!section || !wrap) return;
  let triggered = false;

  const observer = new IntersectionObserver(entries => {
    if (triggered) return;
    if (entries[0].isIntersecting) {
      triggered = true;
      observer.disconnect();
      wrap.classList.remove('ogro-hidden');
      wrap.classList.add('ogro-visible');
      setTimeout(() => wrap.classList.add('ogro-side'), 2800);
    }
  }, { threshold: 0.45 });

  observer.observe(section);
})();

function ogroShake() {
  const wrap = document.getElementById('ogroGuardian');
  if (!wrap) return;
  wrap.classList.remove('ogro-shake');
  void wrap.offsetWidth;
  wrap.classList.add('ogro-shake');
  wrap.addEventListener('animationend', () => wrap.classList.remove('ogro-shake'), { once: true });
}

function ogroBye() {
  const wrap     = document.getElementById('ogroGuardian');
  const sparkles = document.getElementById('ogroSparkles');
  if (!wrap || wrap.classList.contains('ogro-bye')) return;
  wrap.classList.remove('ogro-side');
  const emojis = ['✨','💛','💗','⭐','💖'];
  for (let i = 0; i < 8; i++) {
    const sp = document.createElement('span');
    sp.className   = 'ogro-sp';
    sp.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    sp.style.left  = (20 + Math.random() * 60) + '%';
    sp.style.top   = (10 + Math.random() * 70) + '%';
    sp.style.setProperty('--sx', (Math.random() * 60 - 30) + 'px');
    sp.style.setProperty('--sy', -(30 + Math.random() * 50) + 'px');
    sp.style.animationDelay = (Math.random() * 0.3) + 's';
    sparkles.appendChild(sp);
  }
  setTimeout(() => wrap.classList.add('ogro-bye'), 800);
}

function toggleLetter(btn) {
  const body    = document.getElementById('letterBody');
  const wrap    = document.getElementById('ogroGuardian');
  const bubble  = document.getElementById('ogroBubble');
  const isOpen  = btn.classList.contains('open');

  if (isOpen) {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    body.style.maxHeight = '0';
    return;
  }

  const ogroGone = !wrap || wrap.classList.contains('ogro-bye');

  if (!ogroGone) {
    ogroClicks++;
    vibrar([30, 20]);

    if (ogroClicks < 3) {
      if (bubble) {
        bubble.style.animation = 'none';
        bubble.offsetWidth;
        bubble.textContent = OGRO_MSGS[ogroClicks];
        bubble.style.animation = '';
      }
      ogroShake();
      // Movimiento continuo durante 2 s
      const img = wrap ? wrap.querySelector('.ogro-img') : null;
      if (img) {
        img.classList.add('ogro-react');
        setTimeout(() => img.classList.remove('ogro-react'), 2000);
      }
      return;
    }

    // 3er click — el ogro cede
    if (bubble) {
      bubble.style.animation = 'none';
      bubble.offsetWidth;
      bubble.textContent = OGRO_MSGS[3];
      bubble.style.animation = '';
    }
    ogroBye();
    setTimeout(() => {
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = body.scrollHeight + 36 + 'px';
      lanzarCorazones(btn, 7);
      vibrar([25]);
    }, 3500);
    return;
  }

  btn.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
  body.style.maxHeight = body.scrollHeight + 36 + 'px';
  lanzarCorazones(btn, 7);
  vibrar([25]);
}

/* ============================================
   FRASES OCULTAS — TAP TO REVEAL
   ============================================ */
function revealPhrase(el) {
  if (el.classList.contains('revealed')) return;
  el.classList.add('revealed');
  vibrar([30]);
  lanzarCorazones(el, 8);
  lanzarDestellosDorados(el, 6);
}

/* ============================================
   FRASES DE AMOR ALEATORIAS
   ============================================ */
const FRASES = [
  'Eres mi lugar favorito.',
  'Perdón por mis errores, gracias por tu amor.',
  'Si pudiera volver a empezar, te cuidaría mejor desde el primer día.',
  'Mi amor por ti no es perfecto, pero sí es sincero.',
  'Tu nombre es la parte más bonita de mis días.',
  'Quiero sanar contigo, no alejarme de ti.',
  'Nuestro 04 siempre va a tener un lugar especial en mi corazón.'
];
let ultimaFrase = -1;

function showLovePhrase(btn) {
  const el = document.getElementById('lovePhrase');
  let idx;
  do { idx = Math.floor(Math.random() * FRASES.length); }
  while (idx === ultimaFrase && FRASES.length > 1);
  ultimaFrase = idx;
  vibrar([20, 10, 20]);
  lanzarCorazones(btn, 14);
  lanzarDestellosDorados(btn, 8);
  el.classList.add('fade');
  setTimeout(() => { el.textContent = FRASES[idx]; el.classList.remove('fade'); }, 420);
}

/* ============================================
   AUDIO
   ============================================ */
const audioEl       = document.getElementById('audioPlayer');
const progressFill  = document.getElementById('progressFill');
const audioTimeEl   = document.getElementById('audioTime');
const audioProgress = document.getElementById('audioProgress');

function duckMusic(duck) {
  if (!bgMusic) return;
  const target = duck ? 0.07 : 0.5;
  const step   = duck ? -0.04 : 0.04;
  clearInterval(bgMusic._duckTimer);
  bgMusic._duckTimer = setInterval(() => {
    bgMusic.volume = Math.min(1, Math.max(0, bgMusic.volume + step));
    if ((step < 0 && bgMusic.volume <= target) || (step > 0 && bgMusic.volume >= target)) {
      bgMusic.volume = target;
      clearInterval(bgMusic._duckTimer);
    }
  }, 40);
}

function toggleAudio(btn) {
  vibrar([25]);
  if (audioEl.paused) {
    audioEl.play().catch(() => { btn.textContent = 'Audio no disponible 😢'; btn.disabled = true; });
    btn.textContent = 'Pausar 🎵';
    audioProgress.classList.remove('hidden');
    duckMusic(true);
  } else {
    audioEl.pause();
    btn.textContent = 'Escuchar mi voz 🎧';
    duckMusic(false);
  }
}

audioEl.addEventListener('timeupdate', () => {
  if (!audioEl.duration) return;
  progressFill.style.width = (audioEl.currentTime / audioEl.duration * 100) + '%';
  const m = Math.floor(audioEl.currentTime / 60);
  const s = Math.floor(audioEl.currentTime % 60).toString().padStart(2, '0');
  audioTimeEl.textContent = m + ':' + s;
});

audioEl.addEventListener('ended', () => {
  document.getElementById('playBtn').textContent = 'Escuchar mi voz 🎧';
  progressFill.style.width  = '0%';
  audioTimeEl.textContent   = '0:00';
  duckMusic(false);
});

/* ============================================
   VIDEO
   ============================================ */
function showVideo(btn) {
  const container = document.getElementById('videoContainer');
  vibrar([30]);
  btn.style.display = 'none';
  container.classList.remove('hidden');
  document.getElementById('videoPlayer').play().catch(() => {});
}

/* ============================================
   BOTÓN FINAL — LLUVIA DE AMOR
   ============================================ */
function showFinalMessage(btn) {
  const response = document.getElementById('finalResponse');
  vibrar([60, 30, 90, 30, 120]);
  btn.classList.add('hidden');
  response.classList.remove('hidden');
  for (let w = 0; w < 7; w++) {
    setTimeout(() => {
      lanzarCorazones(response, 15);
      lanzarDestellosDorados(response, 10);
    }, w * 230);
  }
}
