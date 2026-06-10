/* ============================================
   INTRO MÁGICO
   ============================================ */
function skipIntro() {
  gsap.to('#magicIntro', { opacity: 0, duration: 0.5, onComplete: () => {
    document.getElementById('magicIntro').style.display = 'none';
  }});
}

function launchMiParticles() {
  const scene = document.querySelector('.mi-scene');
  if (!scene) return;
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'mi-particle';
    const size = 3 + Math.random() * 6;
    const angle = Math.random() * Math.PI * 2;
    const dist  = 80 + Math.random() * 130;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = '50%';
    p.style.bottom = '30%';
    p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    p.style.setProperty('--ty', (Math.sin(angle) * dist - 40) + 'px');
    p.style.setProperty('--dur', (0.8 + Math.random() * 1.2) + 's');
    p.style.setProperty('--delay', (Math.random() * 0.6) + 's');
    scene.appendChild(p);
    setTimeout(() => p.remove(), 2500);
  }
}

let _introReady = false;

window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') {
    document.getElementById('startScreen').style.display = 'none';
    skipIntro(); return;
  }
  _introReady = true;
});

function startExperience() {
  playBtnSfx();
  const startScreen = document.getElementById('startScreen');
  const magicIntro  = document.getElementById('magicIntro');

  // Mostrar magicIntro invisible y posicionar todos los elementos fuera de pantalla
  magicIntro.style.display = '';
  gsap.set(magicIntro, { opacity: 0 });
  gsap.set(document.getElementById('miOwl'),      { x: 200, y: -220, opacity: 0, rotation: -25, scale: 0.8 });
  gsap.set(document.getElementById('miEnvWrap'),  { opacity: 0, y: 80, scale: 0.85 });
  gsap.set(document.getElementById('miEnvClose'), { opacity: 0 });
  gsap.set(document.getElementById('miEnvOpen'),  { opacity: 0 });
  gsap.set(document.getElementById('miLetter'),   { opacity: 0 });
  gsap.set(document.getElementById('miSparkles'), { opacity: 0, scale: 0.6 });

  // magicIntro ya visible detrás — startScreen lo tapa hasta que desaparece
  gsap.set(magicIntro, { opacity: 1 });

  gsap.to(startScreen, { opacity: 0, duration: 0.45, ease: 'power1.inOut', onComplete: () => {
    startScreen.style.display = 'none';
    runMagicIntro();
  }});
}

function runMagicIntro() {
  const owl      = document.getElementById('miOwl');
  const envWrap  = document.getElementById('miEnvWrap');
  const envClose = document.getElementById('miEnvClose');
  const envOpen  = document.getElementById('miEnvOpen');
  const letter   = document.getElementById('miLetter');
  const sparkles = document.getElementById('miSparkles');

  const introSfx = new Audio('assets/efecto-inicio.mp3');
  introSfx.volume = 0.7;
  introSfx.play().catch(() => {});

  const tl = gsap.timeline({ onComplete: () => {
    gsap.to('#magicIntro', { opacity: 0, duration: 0.6, ease: 'power1.inOut', onComplete: () => {
      document.getElementById('magicIntro').style.display = 'none';
    }});
  }});

  // Lechuza entra desde arriba derecha
  tl.to(owl, { x: 0, y: -90, opacity: 1, rotation: 8, scale: 1, duration: 1.6, ease: 'power3.out' })
    .to(owl, { rotation: -10, duration: 0.22, ease: 'sine.inOut' })
    .to(owl, { rotation:  8,  duration: 0.22, ease: 'sine.inOut' })
    .to(owl, { rotation: -6,  duration: 0.18, ease: 'sine.inOut' })
    .to(owl, { rotation:  3,  duration: 0.15, ease: 'sine.inOut' })
    .to(owl, { y: -20, scale: 1.05, duration: 0.3, ease: 'power1.inOut' })
    // Lechuza sale con desenfoque, sobre aparece simultáneamente
    .call(() => {
      gsap.set(envOpen, { opacity: 1 });
      gsap.set(envWrap, { y: 40, scale: 0.6, opacity: 0, rotation: -10 });
    })
    .to(owl, { x: -200, y: -220, opacity: 0, filter: 'blur(8px)', rotation: -25, scale: 0.75, duration: 0.55, ease: 'power2.in' })
    .to(envWrap, { opacity: 1, y: 0, scale: 1.12, rotation: 10, duration: 0.5, ease: 'power2.out' }, '-=0.45')
    .to(envWrap, { rotation: -6, duration: 0.18, ease: 'sine.inOut' })
    .to(envWrap, { rotation: 3,  duration: 0.14, ease: 'sine.inOut' })
    .to(envWrap, { rotation: 0,  duration: 0.11, ease: 'sine.out' })
    // Sparkles y partículas
    .to(sparkles, { opacity: 1, scale: 1.1, duration: 0.3, ease: 'power2.out' }, '-=0.3')
    .call(launchMiParticles, null, '-=0.1')
    // Brillo en el sobre
    .to(envWrap, { filter: 'drop-shadow(0 0 70px rgba(255,230,100,1)) drop-shadow(0 0 120px rgba(255,210,80,0.75))', duration: 0.28, yoyo: true, repeat: 1 }, '+=0.1')
    // Sobre se desvanece suavemente — el flash se encarga del resto
    .to(sparkles, { opacity: 0, duration: 0.18 }, '+=0.05')
    .to(envWrap, { scale: 1.2, opacity: 0, duration: 0.35, ease: 'power2.in' })
    .to({}, { duration: 0.02 });
}

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
  for (let i = 0; i < 55; i++) {
    const p = document.createElement('div');
    p.className = 'gold-particle';
    const size = 2 + Math.random() * 3;
    p.style.width  = size + 'px';
    p.style.height = size + 'px';
    p.style.left   = Math.random() * 100 + 'vw';
    p.style.top    = (5 + Math.random() * 90) + 'vh';
    p.style.setProperty('--py', -(120 + Math.random() * 180) + 'px');
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
   TYPEWRITER — TEXTO DESCRIPCIÓN
   ============================================ */
(function initTypewriter() {
  const target = document.getElementById('pwTypewriter');

  if (!target) return;
  const text1  = 'Esta carta espera a quien ya sabe la clave de mi corazón.';
  const text2  = 'Cada palabra que leerás la escribí con todo lo que siento.';
  const desc   = document.getElementById('pwDesc');
  const cursor = document.querySelector('.pw-cursor');
  const HOLD1  = 2000;
  const HOLD2  = 3800;
  const FADE   = 700;
  const SPEED  = 44;

  function fadeOut(cb) {
    desc.style.transition = `opacity ${FADE}ms ease`;
    desc.style.opacity = '0';
    setTimeout(cb, FADE);
  }
  function fadeIn(txt, cb) {
    target.textContent = txt;
    desc.style.opacity = '1';
    setTimeout(cb, FADE + 200);
  }
  function typeText(txt, cb) {
    let i = 0;
    target.textContent = '';
    if (cursor) { cursor.style.animation = ''; cursor.style.opacity = '1'; }
    const t = setInterval(() => {
      target.textContent = txt.slice(0, ++i);
      if (i >= txt.length) {
        clearInterval(t);
        if (cursor) { cursor.style.animation = 'none'; cursor.style.opacity = '0'; }
        setTimeout(cb, HOLD1);
      }
    }, SPEED);
  }

  function cycle() {
    typeText(text1, () => {
      fadeOut(() => {
        fadeIn(text2, () => {
          setTimeout(() => {
            fadeOut(() => {
              desc.style.transition = 'none';
              target.textContent = '';
              desc.style.opacity = '1';
              setTimeout(cycle, 300);
            });
          }, HOLD2);
        });
      });
    });
  }

  setTimeout(cycle, 1000);
})();

/* ============================================
   BORDE TRAZO ANIMADO
   ============================================ */
(function initBorderDraw() {
  const svg  = document.getElementById('borderSVG');
  const rect = document.getElementById('borderRect');
  const card = document.getElementById('passwordCard');
  if (!svg || !rect || !card) return;

  function build() {
    const W  = card.offsetWidth;
    const H  = card.offsetHeight;
    const rx = 32;
    const perim = 2 * (W - 2*rx) + 2 * (H - 2*rx) + 2 * Math.PI * rx;
    svg.setAttribute('width',  W);
    svg.setAttribute('height', H);
    rect.setAttribute('x',      1);
    rect.setAttribute('y',      1);
    rect.setAttribute('width',  W - 2);
    rect.setAttribute('height', H - 2);
    rect.setAttribute('rx',     rx);
    rect.style.strokeDasharray  = perim;
    svg.style.setProperty('--bd-perim', perim + 'px');
  }

  requestAnimationFrame(build);
  if (window.ResizeObserver) {
    new ResizeObserver(() => requestAnimationFrame(build)).observe(card);
  }
})();

/* ============================================
   CONTRASEÑA
   ============================================ */
const CLAVE_CORRECTA = ''; // contraseña desactivada temporalmente
let claveVisible = false;

function checkPassword() {
  playBtnSfx();
  if (!musicaActiva) startMusic();
  const input    = document.getElementById('passwordInput');
  const errorBox = document.getElementById('errorBox');
  const reveal   = document.getElementById('keyReveal');
  const btnText  = document.getElementById('openBtnText');

  // Contraseña desactivada — entra directo
  unlockPage();
  return;

  if (!claveVisible) {
    claveVisible = true;
    reveal.classList.add('open');
    setTimeout(() => input.focus(), 450);
    btnText.textContent = 'Confirmar';
    return;
  }

  const val = input.value.trim();
  if (val === CLAVE_CORRECTA) {
    errorBox.classList.add('hidden');
    if (!musicaActiva) startMusic();
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
  const heart  = document.querySelector('.rose-icon');
  const card   = document.getElementById('passwordCard');
  const screen = document.getElementById('passwordScreen');
  const btn    = document.getElementById('openBtn');

  vibrar([40, 20, 60, 20, 100]);
  sonidoCampanillas();

  // Corazón late rápido
  heart.classList.add('beating-fast');
  lanzarCorazones(btn, 22);
  lanzarDestellosDorados(btn, 24);

  // Marco se oculta inmediatamente al desbloquear
  const borderSVG = document.getElementById('borderSVG');
  if (borderSVG) borderSVG.style.opacity = '0';

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
  }, 7500);
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

function hideHint() {
  const hint = document.getElementById('musicHint');
  if (hint) hint.classList.add('hide');
}

function hintStartMusic() {
  hideHint();
  if (!musicaActiva) startMusic();
}

function startMusic() {
  bgMusic.play().then(() => {
    musicaActiva = true;
    musicBtn.classList.add('playing');
    musicBtn.setAttribute('aria-label', 'Desactivar música');
    if (typeof unlockMusicKey === 'function') unlockMusicKey();
    hideHint();
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

function playBtnSfx() {
  const sfx = document.getElementById('btnSfx');
  if (!sfx) return;
  sfx.volume = 1.0;
  sfx.currentTime = 0;
  sfx.play().catch(() => {});
}

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
  if (!el) return;
  el.innerHTML = TEXTO_PERDON.trim().replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
}

/* ── Ogro guardián ── */
let ogroStep = 0;
let ogroTriggered = false;

const OGRO_POOL = [
  '¿Está dispuesta a perdonar aunque le duela?',
  '¿Piensa en él incluso cuando no quiere?',
  '¿Lo extraña aunque esté enojada con él?',
  '¿Le late el corazón diferente cuando lo ve?',
  '¿Estaría ahí en sus peores momentos?',
  '¿Lo elegiría otra vez si pudiera volver al principio?',
  '¿Se le va el mal humor cuando él aparece?',
  '¿Siente que con él todo tiene más sentido?'
];

// Seleccionar 3 preguntas al azar de las 8
const OGRO_PREGUNTAS = OGRO_POOL
  .slice().sort(() => Math.random() - 0.5)
  .slice(0, 3);
const OGRO_RESPUESTAS_MAL = [
  '¡Mentira! Los que aman de verdad no dudan.',
  '¡No me convences! Vuelve cuando seas honesta.',
  '¡Eso no es amor, eso es confusión! Piénsalo bien.',
  '¡El corazón no miente! Inténtalo de nuevo.'
];
let _idxMal = 0;
const OGRO_RESPUESTAS_BIEN = [
  'Mmm... tal vez... ¡pero no te confíes! Aún me quedan preguntas 😒',
  'Hmph... eso es algo... ¡pero falta una más! 😤',
  'Está bien, está bien... supongo que sí lo amas de verdad 💛\n¡Pero como le hagas daño, vuelvo! 👊'
];

(function initOgro() {
  const section = document.getElementById('letterSection');
  const wrap    = document.getElementById('ogroGuardian');
  if (!section || !wrap) return;

  const observer = new IntersectionObserver(entries => {
    if (ogroTriggered) return;
    if (entries[0].isIntersecting) {
      ogroTriggered = true;
      observer.disconnect();
      wrap.classList.remove('ogro-hidden');
      wrap.classList.add('ogro-visible');
      // Mostrar primera pregunta después de que el ogro aparece
      setTimeout(() => ogroMostrarPregunta(), 1400);
    }
  }, { threshold: 0.35 });

  observer.observe(section);
})();

function ogroBubbleSet(texto) {
  const bubble = document.getElementById('ogroBubble');
  if (!bubble) return;
  bubble.style.animation = 'none';
  void bubble.offsetWidth;
  bubble.textContent = texto;
  bubble.style.animation = '';
}

function ogroMostrarPregunta() {
  const box = document.getElementById('ogroQuestionBox');
  const q   = document.getElementById('ogroQuestion');
  if (!box || !q) return;
  q.textContent = OGRO_PREGUNTAS[ogroStep];
  box.classList.remove('hidden');
}

function ogroAnswer(isYes) {
  const wrap = document.getElementById('ogroGuardian');
  const box  = document.getElementById('ogroQuestionBox');
  if (!wrap || wrap.classList.contains('ogro-bye')) return;

  // Desactivar botones durante la reacción
  wrap.querySelectorAll('.ogro-btn').forEach(b => b.disabled = true);

  if (!isYes) {
    // Respuesta incorrecta — ogro se enoja
    vibrar([40, 20, 40]);
    ogroBubbleSet(OGRO_RESPUESTAS_MAL[_idxMal % OGRO_RESPUESTAS_MAL.length]);
    _idxMal++;
    wrap.classList.remove('ogro-shake');
    void wrap.offsetWidth;
    wrap.classList.add('ogro-shake');
    wrap.addEventListener('animationend', () => {
      wrap.classList.remove('ogro-shake');
      wrap.querySelectorAll('.ogro-btn').forEach(b => b.disabled = false);
    }, { once: true });
    return;
  }

  // Respuesta correcta
  vibrar([20]);
  ogroBubbleSet(OGRO_RESPUESTAS_BIEN[ogroStep]);
  box.classList.add('hidden');
  ogroStep++;

  if (ogroStep < OGRO_PREGUNTAS.length) {
    // Siguiente pregunta
    setTimeout(() => {
      ogroMostrarPregunta();
      wrap.querySelectorAll('.ogro-btn').forEach(b => b.disabled = false);
    }, 1800);
  } else {
    // Superó todas — ogro cede, más tiempo para leer el mensaje final
    setTimeout(() => ogroBye(), 4200);
  }
}

function ogroBye() {
  const wrap     = document.getElementById('ogroGuardian');
  const sparkles = document.getElementById('ogroSparkles');
  if (!wrap || wrap.classList.contains('ogro-bye')) return;
  const emojis = ['✨','💛','💗','⭐','💖'];
  for (let i = 0; i < 10; i++) {
    const sp = document.createElement('span');
    sp.className   = 'ogro-sp';
    sp.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    sp.style.left  = (15 + Math.random() * 70) + '%';
    sp.style.top   = (10 + Math.random() * 70) + '%';
    sp.style.setProperty('--sx', (Math.random() * 70 - 35) + 'px');
    sp.style.setProperty('--sy', -(30 + Math.random() * 60) + 'px');
    sp.style.animationDelay = (Math.random() * 0.4) + 's';
    sparkles.appendChild(sp);
  }
  setTimeout(() => {
    wrap.classList.add('ogro-bye');
    // Colapsar la escena rosada después de que el ogro desaparece
    setTimeout(() => {
      const scene = wrap.closest('.ogro-scene');
      if (scene) {
        scene.style.transition = 'max-height 0.5s ease, padding 0.5s ease, margin 0.5s ease, opacity 0.4s ease';
        scene.style.maxHeight  = '0';
        scene.style.padding    = '0';
        scene.style.marginBottom = '0';
        scene.style.opacity    = '0';
        scene.style.overflow   = 'hidden';
      }
    }, 600);
    // Revelar carta sellada donde estaba el ogro
    setTimeout(() => {
      const sealed = document.getElementById('sealedLetter');
      const hint   = document.getElementById('slHintAbove');
      if (hint)   hint.classList.remove('hidden');
      if (sealed) sealed.classList.remove('hidden');
    }, 500);
  }, 600);
}

function openSealedLetter(el) {
  if (el.classList.contains('open')) return;
  el.classList.add('open');
  playBtnSfx();

  // Ocultar la carta sellada y el label superior
  setTimeout(() => {
    el.style.display = 'none';
    const hint = document.getElementById('slHintAbove');
    if (hint) hint.style.display = 'none';
  }, 300);

  const body = document.getElementById('letterBody');
  if (body) {
    setTimeout(() => {
      body.style.maxHeight = '3000px';
    }, 350);
  }
  lanzarCorazones(el, 7);
  vibrar([25]);
}

function closeLetter() {
  const sealed = document.getElementById('sealedLetter');
  const hint   = document.getElementById('slHintAbove');
  const body   = document.getElementById('letterBody');

  // Desliza hacia abajo y desvanece antes de colapsar
  if (body) {
    body.style.transition = 'opacity 0.3s ease, transform 0.35s ease';
    body.style.opacity    = '0';
    body.style.transform  = 'translateY(24px)';
  }

  setTimeout(() => {
    if (body) {
      body.style.maxHeight = '0';
      body.style.opacity   = '';
      body.style.transform = '';
    }
  }, 320);

  setTimeout(() => {
    if (sealed) { sealed.classList.remove('open'); sealed.style.display = ''; }
    if (hint)   hint.style.display = '';
  }, 520);

  vibrar([20]);
}

/* ============================================
   LAS LLAVES DE MI CORAZÓN
   ============================================ */
// HORA_LLAVE_TIEMPO reemplazada por TimeKey (datetime configurable + video sorpresa)

const keysState = { time: false, photo: false, music: false, secret: false };

function unlockKey(id) {
  if (keysState[id]) return;
  keysState[id] = true;

  const card = document.getElementById('key-' + id);
  if (!card) return;

  card.classList.add('unlocking');
  vibrar([30, 20, 60]);

  setTimeout(() => {
    card.classList.remove('unlocking');
    card.classList.remove('locked');
    card.classList.add('unlocked');
    const locked   = card.querySelector('.key-locked-face');
    const unlocked = card.querySelector('.key-open-face');
    if (locked)   locked.classList.add('hidden');
    if (unlocked) unlocked.classList.remove('hidden');
    lanzarDestellosDorados(card, 14);
    lanzarCorazones(card, 8);
    checkAllKeysUnlocked();
  }, 500);
}

function checkAllKeysUnlocked() {
  if (!Object.values(keysState).every(Boolean)) return;
  setTimeout(() => {
    const finale = document.getElementById('keysFinale');
    if (finale && finale.classList.contains('hidden')) {
      finale.classList.remove('hidden');
      lanzarCorazones(finale, 20);
      lanzarDestellosDorados(finale, 16);
      setTimeout(() => finale.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
    }
  }, 700);
}

/* ============================================
   BASE DE DATOS COMPARTIDA (IndexedDB)
   ============================================ */
const MicuDB = (() => {
  let _db = null;
  function open() {
    return new Promise((res, rej) => {
      if (_db) { res(_db); return; }
      const r = indexedDB.open('MicuritaDB', 2);
      r.onupgradeneeded = e => {
        const db = e.target.result;
        ['videos','photos'].forEach(s => {
          if (!db.objectStoreNames.contains(s)) db.createObjectStore(s);
        });
      };
      r.onsuccess = e => { _db = e.target.result; res(_db); };
      r.onerror   = () => rej(r.error);
    });
  }
  return {
    put(store, key, val) {
      return open().then(db => new Promise((res, rej) => {
        const tx = db.transaction(store, 'readwrite');
        const r  = tx.objectStore(store).put(val, key);
        r.onsuccess = () => res(); r.onerror = () => rej(r.error);
      }));
    },
    get(store, key) {
      return open().then(db => new Promise((res, rej) => {
        const tx = db.transaction(store, 'readonly');
        const r  = tx.objectStore(store).get(key);
        r.onsuccess = () => res(r.result || null); r.onerror = () => rej(r.error);
      }));
    }
  };
})();

/* ============================================
   LLAVE DEL TIEMPO — EXPERIENCIA DE VIDEO
   ============================================ */
const TimeKey = (() => {
  const VID_KEY = 'timekey';
  const LS_TIME = 'kt_unlock_time';  // "HH:MM"
  const LS_MODE = 'kt_video_mode';   // 'file' | 'link'
  const LS_LINK = 'kt_video_link';   // URL

  let _blobUrl = null;
  let _ivl     = null;
  let _open    = false;

  function saveBlob(blob) { return MicuDB.put('videos', VID_KEY, blob); }
  function loadBlob()     { return MicuDB.get('videos', VID_KEY); }

  /* ── Unlock check (hora del día) ── */
  function isUnlocked() {
    const t = localStorage.getItem(LS_TIME);
    if (!t) return false;
    const [h, m]   = t.split(':').map(Number);
    const now      = new Date();
    return (now.getHours() * 60 + now.getMinutes()) >= (h * 60 + m);
  }

  /* ── UI helpers ── */
  function updateTimeLabel() {
    const el = document.getElementById('ktTimeLabel');
    if (!el) return;
    const t = localStorage.getItem(LS_TIME);
    el.textContent = t ? 'Se abrirá a las ' + t : '';
  }

  function _applyMode(mode) {
    const fileBtn  = document.getElementById('ktModeFile');
    const linkBtn  = document.getElementById('ktModeLink');
    const fileSec  = document.getElementById('ktFileSection');
    const linkSec  = document.getElementById('ktLinkSection');
    if (mode === 'link') {
      if (fileBtn) fileBtn.classList.remove('active');
      if (linkBtn) linkBtn.classList.add('active');
      if (fileSec) fileSec.classList.add('hidden');
      if (linkSec) linkSec.classList.remove('hidden');
    } else {
      if (fileBtn) fileBtn.classList.add('active');
      if (linkBtn) linkBtn.classList.remove('active');
      if (fileSec) fileSec.classList.remove('hidden');
      if (linkSec) linkSec.classList.add('hidden');
    }
  }

  function restoreInputs() {
    const timeEl = document.getElementById('ktTimeInput');
    const t = localStorage.getItem(LS_TIME);
    if (timeEl && t) timeEl.value = t;

    const mode = localStorage.getItem(LS_MODE) || 'file';
    _applyMode(mode);

    const link   = localStorage.getItem(LS_LINK) || '';
    const linkEl = document.getElementById('ktLinkInput');
    if (linkEl && link) linkEl.value = link;
  }

  /* ── Public: setUnlockTime ── */
  function setUnlockTime(value) {
    if (!value) return;
    localStorage.setItem(LS_TIME, value);
    updateTimeLabel();
    if (isUnlocked() && !keysState.time) _triggerUnlock();
  }

  /* ── Public: setMode ── */
  function setMode(mode) {
    localStorage.setItem(LS_MODE, mode);
    _applyMode(mode);
  }

  /* ── Public: setLink ── */
  function setLink(url) {
    if (!url) return;
    localStorage.setItem(LS_LINK, url);
    const st = document.getElementById('ktVideoStatus');
    if (st) st.textContent = 'Link guardado ✓';
  }

  /* ── Public: handleVideoUpload ── */
  function handleVideoUpload(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    const errEl  = document.getElementById('ktVideoErr');
    const tmpUrl = URL.createObjectURL(file);
    const tmpVid = document.createElement('video');
    tmpVid.preload = 'metadata';
    tmpVid.onloadedmetadata = () => {
      URL.revokeObjectURL(tmpUrl);
      if (tmpVid.duration > 120) {
        if (errEl) errEl.classList.remove('hidden');
        input.value = '';
        return;
      }
      if (errEl) errEl.classList.add('hidden');
      saveBlob(file).then(() => {
        if (_blobUrl) URL.revokeObjectURL(_blobUrl);
        _blobUrl = URL.createObjectURL(file);
        const st = document.getElementById('ktVideoStatus');
        if (st) st.textContent = 'Video cargado ✓';
      }).catch(e => console.warn('TimeKey: saveBlob error', e));
    };
    tmpVid.src = tmpUrl;
  }

  /* ── Public: toggleConfig ── */
  function toggleConfig() {
    const panel = document.getElementById('ktConfigPanel');
    const gate  = document.getElementById('ktPinGate');
    if (!panel) return;
    const isOpen = !panel.classList.contains('hidden') || (gate && !gate.classList.contains('hidden'));
    if (isOpen) {
      panel.classList.add('hidden');
      if (gate) gate.classList.add('hidden');
      return;
    }
    const pin = localStorage.getItem('kt_config_pin');
    if (pin) {
      if (gate) {
        const inp = document.getElementById('ktPinInput');
        const err = document.getElementById('ktPinErr');
        if (inp) inp.value = '';
        if (err) err.classList.add('hidden');
        gate.classList.remove('hidden');
        gate.style.animation = 'ktPanelIn 0.22s ease both';
        if (inp) setTimeout(() => inp.focus(), 50);
      }
    } else {
      panel.classList.remove('hidden');
      panel.style.animation = 'ktPanelIn 0.22s ease both';
    }
  }

  /* ── Public: checkPin ── */
  function checkPin() {
    const inp   = document.getElementById('ktPinInput');
    const err   = document.getElementById('ktPinErr');
    const gate  = document.getElementById('ktPinGate');
    const panel = document.getElementById('ktConfigPanel');
    const stored = localStorage.getItem('kt_config_pin');
    if (inp && inp.value === stored) {
      if (gate)  gate.classList.add('hidden');
      if (panel) { panel.classList.remove('hidden'); panel.style.animation = 'ktPanelIn 0.22s ease both'; }
    } else {
      if (err) err.classList.remove('hidden');
      if (inp) { inp.value = ''; inp.focus(); }
    }
  }

  /* ── Public: savePin ── */
  function savePin(value) {
    if (!value || value.length < 4) return;
    localStorage.setItem('kt_config_pin', value);
    const el = document.getElementById('ktNewPin');
    if (el) el.placeholder = 'Clave guardada ✓';
  }

  /* ── Public: openModal ── */
  function openModal() {
    if (_open) return;
    const mode = localStorage.getItem(LS_MODE) || 'file';
    const link = localStorage.getItem(LS_LINK) || '';

    if (mode === 'link') {
      if (!link) { toggleConfig(); return; }
      window.open(link, '_blank', 'noopener,noreferrer');
      return;
    }

    if (!_blobUrl) {
      const panel = document.getElementById('ktConfigPanel');
      if (panel) panel.classList.remove('hidden');
      return;
    }

    _open = true;
    const modal  = document.getElementById('ktModal');
    const reveal = document.getElementById('ktRevealScreen');
    const wrap   = document.getElementById('ktVideoWrap');
    const video  = document.getElementById('ktVideo');
    if (!modal) return;

    ['kt-reveal-icon','kt-reveal-line1','kt-reveal-line2'].forEach(cls => {
      const el = modal.querySelector('.' + cls);
      if (!el) return;
      el.style.animation = 'none';
      void el.offsetHeight;
      el.style.animation = '';
    });

    reveal.classList.remove('hidden');
    wrap.classList.add('hidden');
    video.src = '';
    modal.classList.remove('hidden');
    void modal.offsetHeight;
    modal.classList.add('kt-visible');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (!_open) return;
      reveal.style.transition = 'opacity 0.38s ease';
      reveal.style.opacity    = '0';
      setTimeout(() => {
        if (!_open) return;
        reveal.classList.add('hidden');
        reveal.style.opacity = reveal.style.transition = '';
        video.src = _blobUrl;
        wrap.style.cssText = 'opacity:0;transition:opacity 0.38s ease';
        wrap.classList.remove('hidden');
        void wrap.offsetHeight;
        wrap.style.opacity = '1';
        setTimeout(() => {
          wrap.style.cssText = '';
          video.play().catch(() => {});
        }, 400);
      }, 380);
    }, 2700);
  }

  /* ── Public: closeModal ── */
  function closeModal() {
    if (!_open) return;
    _open = false;
    const modal = document.getElementById('ktModal');
    const video = document.getElementById('ktVideo');
    if (video) { video.pause(); video.src = ''; }
    if (modal) {
      modal.classList.remove('kt-visible');
      setTimeout(() => modal.classList.add('hidden'), 300);
    }
    document.body.style.overflow = '';
  }

  /* ── Internal: trigger unlock ── */
  function _triggerUnlock() {
    const pill = document.getElementById('ktStatusPill');
    if (pill) { pill.textContent = 'Recuerdo disponible'; pill.classList.add('ready'); }
    unlockKey('time');
    if (_ivl) { clearInterval(_ivl); _ivl = null; }
  }

  /* ── Public: init ── */
  function init() {
    restoreInputs();
    updateTimeLabel();
    loadBlob().then(blob => {
      if (!blob) return;
      if (_blobUrl) URL.revokeObjectURL(_blobUrl);
      _blobUrl = URL.createObjectURL(blob);
      const st = document.getElementById('ktVideoStatus');
      if (st) st.textContent = 'Video cargado ✓';
    }).catch(() => {});

    if (isUnlocked()) { _triggerUnlock(); return; }
    if (_ivl) clearInterval(_ivl);
    _ivl = setInterval(() => {
      if (keysState.time) { clearInterval(_ivl); _ivl = null; return; }
      if (isUnlocked()) _triggerUnlock();
    }, 30000);
  }

  /* ── Public: reset ── */
  function reset() {
    if (!confirm('¿Restablecer todo? Se borrará la hora, el video/link y la clave.')) return;
    localStorage.removeItem(LS_TIME);
    localStorage.removeItem(LS_MODE);
    localStorage.removeItem(LS_LINK);
    localStorage.removeItem('kt_config_pin');
    MicuDB.put('videos', VID_KEY, null).catch(() => {});
    if (_blobUrl) { URL.revokeObjectURL(_blobUrl); _blobUrl = null; }
    if (_ivl) { clearInterval(_ivl); _ivl = null; }
    _open = false;

    // Reset UI al estado inicial
    const card     = document.getElementById('key-time');
    const locked   = card && card.querySelector('.kt-locked-body');
    const unlocked = card && card.querySelector('.kt-unlocked-body');
    const pill     = document.getElementById('ktStatusPill');
    const timeLabel = document.getElementById('ktTimeLabel');
    const panel    = document.getElementById('ktConfigPanel');
    const gate     = document.getElementById('ktPinGate');
    const stEl     = document.getElementById('ktVideoStatus');
    const pinEl    = document.getElementById('ktNewPin');

    if (card)     { card.classList.remove('unlocked'); card.classList.add('locked'); }
    if (locked)   locked.classList.remove('hidden');
    if (unlocked) unlocked.classList.add('hidden');
    if (pill)     { pill.textContent = 'Esperando el momento exacto'; pill.classList.remove('ready'); }
    if (timeLabel) timeLabel.textContent = '';
    if (panel)    panel.classList.add('hidden');
    if (gate)     gate.classList.add('hidden');
    if (stEl)     stEl.textContent = 'Cargar video (máx. 2 min)';
    if (pinEl)    { pinEl.value = ''; pinEl.placeholder = 'Nueva clave (4–6 dígitos)'; }

    keysState.time = false;
    restoreInputs();
    init();
  }

  return { init, openModal, closeModal, handleVideoUpload, setUnlockTime, setMode, setLink, toggleConfig, checkPin, savePin, reset };
})();

/* ============================================
   LLAVE DE TU SONRISA — EXPERIENCIA DE FOTO
   ============================================ */
const PhotoKey = (() => {
  const PHOTO_K = 'smilekey';
  const LS_DONE = 'kp_unlocked';

  let _blobUrl = null;
  let _open    = false;

  function saveBlob(blob) { return MicuDB.put('photos', PHOTO_K, blob); }
  function loadBlob()     { return MicuDB.get('photos', PHOTO_K); }

  /* ── Mostrar foto en el marco ── */
  function showPhoto(url) {
    const ph  = document.getElementById('kpPlaceholder');
    const img = document.getElementById('kpPhoto');
    if (ph)  ph.style.display = 'none';
    if (!img) return;
    img.src = url;
    img.style.display = '';
    img.style.animation = 'none';
    void img.offsetHeight;
    img.style.animation = '';
  }

  /* ── Animación de escaneo → desbloqueo ── */
  function startScan() {
    const pill  = document.getElementById('kpStatusPill');
    const frame = document.getElementById('kpFrame');
    const label = document.getElementById('kpBtnUpload');
    if (pill)  { pill.textContent = 'Leyendo sonrisa…'; pill.classList.add('kp-pill-scanning'); }
    if (frame) frame.classList.add('kp-scanning');
    if (label) label.style.pointerEvents = 'none';

    setTimeout(() => {
      if (frame) { frame.classList.remove('kp-scanning'); frame.classList.add('kp-frame-unlocked'); }
      localStorage.setItem(LS_DONE, '1');
      _triggerUnlock();
    }, 2800);
  }

  function _triggerUnlock() {
    const pill = document.getElementById('kpStatusPill');
    if (pill) {
      pill.textContent = 'Sonrisa detectada';
      pill.classList.remove('kp-pill-scanning');
      pill.classList.add('kp-pill-ready');
    }
    unlockKey('photo');
  }

  /* ── Public: handleUpload ── */
  function handleUpload(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    saveBlob(file).then(() => {
      if (_blobUrl) URL.revokeObjectURL(_blobUrl);
      _blobUrl = URL.createObjectURL(file);
      showPhoto(_blobUrl);
      startScan();
    }).catch(() => {
      if (_blobUrl) URL.revokeObjectURL(_blobUrl);
      _blobUrl = URL.createObjectURL(file);
      showPhoto(_blobUrl);
      startScan();
    });
  }

  /* ── Public: openModal ── */
  function openModal() {
    if (_open) return;
    _open = true;
    const modal = document.getElementById('kpModal');
    const mImg  = document.getElementById('kpModalPhoto');
    if (mImg && _blobUrl) mImg.src = _blobUrl;
    if (!modal) return;
    modal.classList.remove('hidden');
    void modal.offsetHeight;
    modal.classList.add('kp-visible');
    document.body.style.overflow = 'hidden';
    const box = modal.querySelector('.kp-modal-box');
    if (box) setTimeout(() => lanzarCorazones(box, 7), 400);
  }

  /* ── Public: closeModal ── */
  function closeModal() {
    if (!_open) return;
    _open = false;
    const modal = document.getElementById('kpModal');
    if (modal) {
      modal.classList.remove('kp-visible');
      setTimeout(() => modal.classList.add('hidden'), 280);
    }
    document.body.style.overflow = '';
  }

  /* ── Public: init ── */
  function init() {
    loadBlob().then(blob => {
      if (!blob) return;
      if (_blobUrl) URL.revokeObjectURL(_blobUrl);
      _blobUrl = URL.createObjectURL(blob);
      showPhoto(_blobUrl);
      const frame = document.getElementById('kpFrame');
      if (frame) frame.classList.add('kp-frame-unlocked');
      if (localStorage.getItem(LS_DONE)) _triggerUnlock();
    }).catch(() => {});
  }

  return { init, handleUpload, openModal, closeModal };
})();

/* Llave 3 — Música (llamada desde startMusic) */
function unlockMusicKey() { unlockKey('music'); }

/* Llave 4 — Palabra secreta */
/* ============================================
   RETO DE RECUERDOS
   ============================================ */
const RetoCupon = (() => {
  const LS_AT    = 'ks_unlocked_at';
  const LS_NUM   = 'ks_coupon_num';
  const LS_WISH  = 'ks_wish';
  const COOLDOWN = 3 * 24 * 60 * 60 * 1000;

  const CUPONES = [
    { premio: 'Tu comida preferida',   valido: 'un antojo especial',      codigo: 'AMOR-001' },
    { premio: 'Una salida sorpresa',   valido: 'una salida especial',     codigo: 'AMOR-002' },
    { premio: 'Un deseo especial',     valido: 'un deseo tuyo',           codigo: 'AMOR-003' },
    { premio: 'Un plan elegido por ti',valido: 'un plan a tu elección',   codigo: 'AMOR-004' },
  ];

  let _num  = 0;
  let _wish = '';

  function _cupon() { return CUPONES[_num % CUPONES.length]; }

  function _daysLeft(at) {
    return Math.ceil((COOLDOWN - (Date.now() - at)) / 86400000);
  }

  function _fill(wish) {
    const c = _cupon();
    document.querySelectorAll('.ks-field-prize').forEach(el => el.textContent = c.premio);
    document.querySelectorAll('.ks-field-wish').forEach(el => el.textContent = 'Deseo: ' + wish);
    document.querySelectorAll('.ks-field-code').forEach(el => el.textContent = c.codigo);
    document.querySelectorAll('.ks-field-valid').forEach(el => el.textContent = 'Válido por: ' + c.valido);
  }

  function init() {
    const at   = parseInt(localStorage.getItem(LS_AT)  || '0');
    const num  = parseInt(localStorage.getItem(LS_NUM) || '0');
    const wish = localStorage.getItem(LS_WISH) || '';

    if (at > 0 && (Date.now() - at) < COOLDOWN) {
      _num  = num;
      _wish = wish;
      const days = _daysLeft(at);
      document.getElementById('ksCooldownMsg').textContent =
        `Nuevo cupón disponible en ${days} día${days !== 1 ? 's' : ''}.`;
      _fill(wish);
      document.getElementById('ks-challenge').classList.add('hidden');
      document.getElementById('ks-cooldown').classList.remove('hidden');
    } else if (at > 0) {
      _num = (num + 1) % CUPONES.length;
      localStorage.setItem(LS_NUM, _num);
    }
  }

  function _showStep(n) {
    [1,2,3,4].forEach(i => {
      document.getElementById('ksStep'+i).classList.toggle('hidden', i !== n);
    });
    document.getElementById('ksStepCounter').textContent = `Pregunta ${n} de 4`;
    const input = document.getElementById('ksQ'+n);
    if (input) setTimeout(() => input.focus(), 80);
  }

  function nextStep(current) {
    const val = document.getElementById('ksQ'+current).value.trim();
    const err = document.getElementById('ksError'+current);
    if (!val) {
      err.classList.remove('hidden');
      setTimeout(() => err.classList.add('hidden'), 2500);
      return;
    }
    err.classList.add('hidden');
    _showStep(current + 1);
  }

  function prevStep(current) {
    _showStep(current - 1);
  }

  function unlock() {
    const q4  = document.getElementById('ksQ4').value.trim();
    const err = document.getElementById('ksError4');
    if (!q4) {
      err.classList.remove('hidden');
      setTimeout(() => err.classList.add('hidden'), 2500);
      return;
    }
    _wish = q4;
    localStorage.setItem(LS_AT,   Date.now().toString());
    localStorage.setItem(LS_NUM,  _num.toString());
    localStorage.setItem(LS_WISH, q4);
    _fill(q4);
    unlockKey('secret');
  }

  function prepareCapture() {
    const existing = document.getElementById('ksCaptureModal');
    if (existing) existing.remove();
    const c    = _cupon();
    const wish = _wish || (localStorage.getItem(LS_WISH) || '');
    const modal = document.createElement('div');
    modal.id = 'ksCaptureModal';
    modal.className = 'ks-capture-modal';
    modal.innerHTML = `
      <div class="ks-capture-inner">
        <div class="ks-coupon-container">
          <img src="img/cupon.png" class="ks-coupon-img" alt="Cupón" draggable="false"/>
          <div class="ks-coupon-overlay">
            <p class="ks-co-for">Cupón para: <strong>mi persona favorita</strong></p>
            <p class="ks-co-prize">${c.premio}</p>
            <p class="ks-co-wish">Deseo: ${wish}</p>
            <p class="ks-co-code">${c.codigo}</p>
            <p class="ks-co-valid">Válido por: ${c.valido}</p>
          </div>
        </div>
        <button class="ks-btn-close" onclick="document.getElementById('ksCaptureModal').remove()">Cerrar</button>
      </div>`;
    document.body.appendChild(modal);
  }

  function sendWhatsApp() {
    const wish = _wish || (localStorage.getItem(LS_WISH) || '');
    const msg  = encodeURIComponent(`Ya desbloqueé mi cupón. Quiero reclamar: ${wish}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  }

  function reset() {
    localStorage.removeItem(LS_AT);
    localStorage.removeItem(LS_NUM);
    localStorage.removeItem(LS_WISH);
    _num = 0; _wish = '';
    ['ksQ1','ksQ2','ksQ3','ksQ4'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
    const card = document.getElementById('key-secret');
    if (card) {
      card.classList.remove('unlocked','unlocking');
      card.classList.add('locked');
      const locked   = card.querySelector('.key-locked-face');
      const unlocked = card.querySelector('.key-open-face');
      if (locked)   locked.classList.remove('hidden');
      if (unlocked) unlocked.classList.add('hidden');
    }
    document.getElementById('ks-cooldown').classList.add('hidden');
    document.getElementById('ks-challenge').classList.remove('hidden');
    _showStep(1);
  }

  return { init, unlock, nextStep, prevStep, prepareCapture, sendWhatsApp, reset };
})();

document.addEventListener('DOMContentLoaded', () => {
  TimeKey.init();
  PhotoKey.init();
  RetoCupon.init();
  // Si la música ya está activa al cargar (autoplay exitoso)
  if (musicaActiva) unlockMusicKey();
});

/* Toggle llaves de mi corazón */
function toggleKeys() {
  const body  = document.getElementById('klCollapseBody');
  const btn   = document.getElementById('klToggleBtn');
  const label = document.getElementById('klToggleLabel');
  const audio = document.getElementById('toystoryAudio');
  const isOpen = body.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
  label.textContent = isOpen ? 'Cerrar las llaves' : 'Abrir las llaves';
  if (isOpen) {
    if (bgMusic) bgMusic.volume = 0.1;
    if (audio) {
      audio.loop = false;
      audio.currentTime = 0;
      audio.volume = 0.6;
      audio.play().catch(() => {});
      audio.onended = () => { if (bgMusic) bgMusic.volume = 0.5; };
    }
  } else {
    if (audio) { audio.pause(); audio.currentTime = 0; audio.onended = null; }
  }
}

/* Botón sorpresa final */
function showKeysFinale(btn) {
  btn.disabled = true;
  btn.textContent = '💖 ¡Te amo, Geraldine!';
  lanzarCorazones(btn, 30);
  lanzarDestellosDorados(btn, 20);
  vibrar([50, 30, 80, 30, 100]);
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
