/* ══════════════════════════════════════════════════════════════
   TEST DE FRAPPE — typing.js
   Système Ratatype exact :
   • Chaque caractère est un <span> individuel coloré
   • Les erreurs BLOQUENT la progression (on doit corriger avant d'avancer)
   • Le timer démarre au premier keypress (pas au clic sur commencer)
   • Curseur visible sur le caractère actuel
   • Musique : assets/sounds/typing_music.mp3 — démarre au début du test,
     pause/resume avec le test, reprend à la même position si pause,
     repart du début si reset/nouveau test
   • Son death : assets/sounds/death_typing.mp3 — à l'affichage de l'image
   • Barre de volume dans la section (pour la musique uniquement)
   • Image death selon WPM (plein écran 2.5s)
══════════════════════════════════════════════════════════════ */

const TEXT_PARAGRAPHS = [
  "Au lycée en filière STI2D, Lucas passait ses pauses à discuter de la chaîne Webedia avec son ami Douglas. Entre deux blagues sur une vieille chaussette oubliée dans le gymnase, ils évoquaient aussi Virgile Pages, un auteur local dont les récits parlaient souvent d'une mystérieuse pierre polie retrouvée près de la rivière.",
  "Lors de l'hiver 1420, un village situé près de la montagne chevallier aurait aperçu une étrange lumière surnommée skwalalerte. Les anciens racontaient qu'un homme appelé JNR transportait alors une relique nommée xybiton, cachée dans un coffre recouvert de tissu picard.",
  "Le café Le crousty servait un sandwich particulièrement tasty, accompagné d'une boisson appelée vody. Ce lieu était fréquenté par bouzelouf, un musicien assez connu dans le quartier, qui répétait sans cesse que l'ambiance du bar avait une incroyable aura depuis la venue de doro.",
  "Dans la salle informatique, les étudiants comparaient leurs projets de robotique en utilisant un programme nommé stranal. L'un d'eux, surnommé 67, affirmait avoir été totalement mogged pendant le concours régional organisé par Webedia, malgré l'aide de Douglas et les conseils de Virgile Pages.",
  "Au marché de Noël, une vieille dame vendait une étrange pierre polie censée apporter de l'aura à celui qui la possédait. À côté de son stand, un vendeur picard distribuait des biscuits crousty pendant qu'un groupe de jeunes en STI2D cherchait désespérément une chaussette perdue dans la foule.",
  "Le vieux manoir de la montagne chevallier cachait un laboratoire abandonné où figurait le mot xybiton gravé sur les murs. Selon JNR, ce lieu avait appartenu à un scientifique nommé Virgile Pages, disparu en 1420 après une expérience liée à la mystérieuse machine stranal.",
  "Pendant la soirée étudiante, bouzelouf racontait à tout le monde comment il avait été complètement mogged lors d'un tournoi organisé par 67. Heureusement, l'ambiance restait chaleureuse grâce aux snacks tasty, à la musique de doro et aux boissons vody servies au comptoir.",
  "Le documentaire produit par Webedia évoquait les traditions d'un petit village picard où les habitants célébraient chaque année la fête de la skwalalerte. On y voyait notamment Douglas porter une énorme chaussette rouge tandis qu'un artisan sculptait une magnifique pierre polie devant les visiteurs.",
  "Dans son carnet, Virgile Pages décrivait un étrange symbole nommé xybiton, découvert près de la montagne chevallier. Ses recherches mentionnaient également JNR, un explorateur réputé pour son incroyable aura, ainsi qu'un ancien manuscrit daté de 1420.",
  "Après les cours de STI2D, les élèves se retrouvaient au snack Le crousty pour manger des plats très tasty. Entre deux discussions sur Webedia, bouzelouf plaisantait avec doro tandis que 67 tentait de convaincre tout le monde que la boisson vody était meilleure que n'importe quel soda classique.",
];

const WPM_CATEGORIES = [
  { max: 20,  label: 'Très lent',   color: '#c0392b', pct: 10  },
  { max: 30,  label: 'Débutant',    color: '#e67e22', pct: 25  },
  { max: 40,  label: 'Moyen',       color: '#d4ac0d', pct: 42  },
  { max: 60,  label: 'Bon',         color: '#27ae60', pct: 60  },
  { max: 80,  label: 'Très rapide', color: '#1abc9c', pct: 80  },
  { max: Infinity, label: 'Élite 🔥', color: '#c0392b', pct: 100 },
];

const TEST_DURATION = 15;

/* ══ Musique ══ */
let typingMusic = null;
let musicVolume = 0.35;
let musicPaused = false; // track whether music was manually paused during test pause

function initMusic() {
  if (typingMusic) return; // already created
  typingMusic = new Audio('assets/sounds/typing_music.mp3');
  typingMusic.loop = true;
  typingMusic.volume = musicVolume;
}

function startMusic() {
  initMusic();
  typingMusic.currentTime = 0; // toujours reprendre depuis le début pour un nouveau test
  typingMusic.volume = musicVolume;
  typingMusic.play().catch(() => {});
}

function pauseMusic() {
  if (typingMusic && !typingMusic.paused) typingMusic.pause();
}

function resumeMusic() {
  if (typingMusic && typingMusic.paused) {
    typingMusic.volume = musicVolume;
    typingMusic.play().catch(() => {});
  }
}

function stopMusic() {
  if (typingMusic) { typingMusic.pause(); typingMusic.currentTime = 0; }
}

/* ══ Son death — 25% chance death_alt.mp3 ══ */
function playDeathSound() {
  try {
    const useAlt = Math.random() < 0.25;
    const src = useAlt ? 'assets/sounds/death_alt.mp3' : 'assets/sounds/death_typing.mp3';
    const a = new Audio(src);
    a.volume = 1;
    a.play().catch(() => {
      if (useAlt) { const b = new Audio('assets/sounds/death_typing.mp3'); b.volume=1; b.play().catch(()=>{}); }
    });
  } catch (e) {}
}

/* ══ État ══ */
let ts = resetState();

function resetState() {
  return {
    text: '', chars: [],
    status: 'idle',    // idle | running | paused | finished
    timer: null,
    timeLeft: TEST_DURATION,
    // Ratatype exact : on ne compte que les caractères corrects consécutifs
    // (les erreurs bloquent, on ne les compte pas dans correctCount)
    correctCount: 0,   // chars correctement tapés
    totalTyped: 0,     // toutes les touches
    currentIdx: 0,     // index du caractère à taper
    elapsed: 0,        // secondes écoulées avant pause
    timerStarted: false, // timer démarre au 1er keypress
  };
}

function pickText() {
  return TEXT_PARAGRAPHS[Math.floor(Math.random() * TEXT_PARAGRAPHS.length)];
}

/* ══ Rend le texte caractère par caractère comme Ratatype ══ */
function renderText(text) {
  const box = document.getElementById('typingTextBox');
  if (!box) return [];
  box.innerHTML = '';
  const chars = [];
  [...text].forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'char';
    span.textContent = ch;
    if (i === 0) span.classList.add('cursor');
    box.appendChild(span);
    chars.push(span);
  });
  return chars;
}

function updateStats() {
  const elapsed = ts.elapsed + (ts.status === 'running' && ts.timerStarted
    ? (TEST_DURATION - ts.timeLeft) : 0);
  const minutes = elapsed / 60;
  const wpm = minutes > 0.01 ? Math.round(ts.correctCount / 5 / minutes) : 0;
  const acc = ts.totalTyped > 0
    ? Math.round((ts.correctCount / ts.totalTyped) * 100) : 100;
  document.getElementById('wpmDisplay').textContent  = wpm;
  document.getElementById('accDisplay').textContent  = acc;
  document.getElementById('timerDisplay').textContent = ts.timeLeft;
}

function tick() {
  if (!ts.timerStarted) return;
  ts.timeLeft--;
  updateStats();
  if (ts.timeLeft <= 0) finishTest();
}

function finishTest() {
  clearInterval(ts.timer);
  ts.status = 'finished';
  stopMusic();

  const elapsed = ts.elapsed + (TEST_DURATION - ts.timeLeft);
  const minutes = elapsed > 0 ? elapsed / 60 : TEST_DURATION / 60;
  const wpm = Math.round(ts.correctCount / 5 / minutes);
  const acc = ts.totalTyped > 0 ? Math.round((ts.correctCount / ts.totalTyped) * 100) : 100;
  const cat = WPM_CATEGORIES.find(c => wpm < c.max) || WPM_CATEGORIES.at(-1);

  document.getElementById('resultWpm').textContent = `${wpm} WPM — ${acc}% précision`;
  const catEl = document.getElementById('resultCat');
  catEl.textContent = cat.label; catEl.style.color = cat.color;
  document.getElementById('typingResult').classList.remove('hidden');
  setTimeout(() => {
    const bar = document.getElementById('resultBar');
    bar.style.width = cat.pct + '%'; bar.style.background = cat.color;
  }, 100);

  if (wpm >= 60) launchConfetti();
  showTypingDeathImage(wpm);

  const input = document.getElementById('typingInput');
  if (input) input.disabled = true;
  setStartBtn('▶ Commencer');
}

function launchConfetti() {
  const zone = document.getElementById('confettiZone');
  if (!zone) return;
  const colors = ['#c0392b','#fff','#f0b429','#27ae60','#1abc9c'];
  for (let i=0;i<30;i++) {
    const p=document.createElement('div'); p.className='confetti-piece';
    p.style.cssText=`left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*.8}s;border-radius:${Math.random()>.5?'50%':'0'};`;
    zone.appendChild(p); setTimeout(()=>p.remove(),2500);
  }
}

function setStartBtn(txt) {
  const btn = document.getElementById('startTyping');
  if (btn) btn.textContent = txt;
}

/* ══ Image death plein écran ══ */
function showTypingDeathImage(wpm) {
  let src;
  if (wpm >= 50) src = 'assets/images/death1.png';
  else if (wpm >= 20) src = 'assets/images/death2.png';
  else src = 'assets/images/death3.png';

  playDeathSound();

  let ov = document.getElementById('typingDeathOverlay');
  if (!ov) {
    ov = document.createElement('div');
    ov.id = 'typingDeathOverlay';
    ov.style.cssText = 'position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.75);pointer-events:none;opacity:0;transition:opacity .3s;';
    document.body.appendChild(ov);
  }
  ov.innerHTML = `<img src="${src}" style="max-width:80vw;max-height:80vh;object-fit:contain;border-radius:12px;"/>`;
  ov.style.display = 'flex';
  requestAnimationFrame(() => { ov.style.opacity = '1'; });
  setTimeout(() => {
    ov.style.opacity = '0';
    setTimeout(() => { ov.style.display = 'none'; }, 350);
  }, 2500);
}

/* ══ Handlers ══ */
function handleStartBtn() {
  if (ts.status === 'idle' || ts.status === 'finished') startTest();
  else if (ts.status === 'running') pauseTest();
  else if (ts.status === 'paused') resumeTest();
}

function startTest() {
  ts = resetState();
  ts.text = pickText();
  ts.chars = renderText(ts.text);
  ts.status = 'running';
  // Timer créé maintenant mais ne comptera QUE quand timerStarted=true (1er keypress)
  ts.timer = setInterval(tick, 1000);

  const input = document.getElementById('typingInput');
  if (input) { input.disabled = false; input.value = ''; input.focus(); }
  document.getElementById('typingResult')?.classList.add('hidden');
  document.getElementById('wpmDisplay').textContent  = '0';
  document.getElementById('accDisplay').textContent  = '100';
  document.getElementById('timerDisplay').textContent = TEST_DURATION;
  setStartBtn('⏸ Pause');

  // Musique repart depuis le début
  startMusic();
}

function pauseTest() {
  if (ts.status !== 'running') return;
  clearInterval(ts.timer);
  if (ts.timerStarted) ts.elapsed += TEST_DURATION - ts.timeLeft;
  ts.status = 'paused';
  const input = document.getElementById('typingInput');
  if (input) input.disabled = true;
  setStartBtn('▶ Reprendre');
  pauseMusic(); // musique se met en pause
}

function resumeTest() {
  if (ts.status !== 'paused') return;
  ts.status = 'running';
  ts.timeLeft = TEST_DURATION - ts.elapsed; // recalcul du temps restant
  // Recréer le timer proprement
  ts.elapsed = 0; // elapsed remis à 0 car on a resynchronisé timeLeft
  ts.timer = setInterval(tick, 1000);
  const input = document.getElementById('typingInput');
  if (input) { input.disabled = false; input.focus(); }
  setStartBtn('⏸ Pause');
  resumeMusic(); // musique reprend là où elle était
}

function fullReset() {
  clearInterval(ts.timer);
  stopMusic();
  ts = resetState();
  ts.text = pickText();
  ts.chars = renderText(ts.text);
  const input = document.getElementById('typingInput');
  if (input) { input.value = ''; input.disabled = true; }
  document.getElementById('wpmDisplay').textContent  = '0';
  document.getElementById('accDisplay').textContent  = '100';
  document.getElementById('timerDisplay').textContent = TEST_DURATION;
  document.getElementById('typingResult')?.classList.add('hidden');
  setStartBtn('▶ Commencer');
}

/* ══ Saisie — Système Ratatype exact ══
   • Chaque keydown est analysé
   • Si erreur → le span devient .wrong MAIS on peut continuer à taper
   • Backspace → revient un caractère en arrière (efface le précédent)
   • Correct → span .correct, avance au suivant
   • Timer démarre au 1er keydown
══════════════════════════════════════════════════════════════ */
function handleKeyDown(e) {
  if (ts.status !== 'running') return;

  // Démarrage du timer au 1er keypress
  if (!ts.timerStarted) ts.timerStarted = true;

  if (e.key === 'Backspace') {
    e.preventDefault();
    if (ts.currentIdx === 0) return;
    // Revenir au caractère précédent
    const prevSpan = ts.chars[ts.currentIdx];
    // Retire le curseur du span courant s'il l'a
    if (prevSpan) prevSpan.classList.remove('cursor');
    ts.currentIdx--;
    const span = ts.chars[ts.currentIdx];
    span.classList.remove('correct', 'wrong', 'cursor');
    span.classList.add('cursor');
    updateStats();
    return;
  }

  // Ignorer les touches de contrôle
  if (e.key.length !== 1) return;
  e.preventDefault();

  const span = ts.chars[ts.currentIdx];
  if (!span) return;

  ts.totalTyped++;
  const expected = ts.text[ts.currentIdx];

  span.classList.remove('cursor', 'correct', 'wrong');

  if (e.key === expected) {
    span.classList.add('correct');
    ts.correctCount++;
  } else {
    span.classList.add('wrong');
  }

  ts.currentIdx++;

  if (ts.currentIdx < ts.chars.length) {
    ts.chars[ts.currentIdx].classList.add('cursor');
    ts.chars[ts.currentIdx].scrollIntoView({ block: 'nearest' });
  } else {
    finishTest();
    return;
  }

  updateStats();
}

/* ══ Barre de volume musique ══ */
function buildVolumeBar() {
  // Cherche si elle existe déjà
  if (document.getElementById('typingVolumeBar')) return;

  const section = document.querySelector('#typing .typing-section-inner');
  if (!section) return;

  const wrap = document.createElement('div');
  wrap.id = 'typingVolumeBar';
  wrap.style.cssText = 'display:flex;align-items:center;gap:10px;margin-top:14px;opacity:.65;transition:opacity .2s;';
  wrap.addEventListener('mouseenter', ()=>{ wrap.style.opacity='1'; });
  wrap.addEventListener('mouseleave', ()=>{ wrap.style.opacity='.65'; });

  wrap.innerHTML = `
    <span style="font-size:.75rem;letter-spacing:1px;font-weight:600;color:var(--muted);">♪ Musique</span>
    <input type="range" id="typingVolSlider" min="0" max="100" value="${Math.round(musicVolume*100)}"
      style="flex:1;max-width:120px;accent-color:var(--text);cursor:pointer;height:3px;">
    <button id="typingMuteBtn" style="font-size:.8rem;background:none;border:none;cursor:pointer;color:var(--muted);padding:2px 6px;border-radius:3px;" title="Couper/Activer">
      🔊
    </button>
  `;
  section.appendChild(wrap);

  const slider = document.getElementById('typingVolSlider');
  const muteBtn = document.getElementById('typingMuteBtn');
  let muted = false;

  slider.addEventListener('input', () => {
    musicVolume = slider.value / 100;
    if (typingMusic) typingMusic.volume = musicVolume;
    muted = musicVolume === 0;
    muteBtn.textContent = muted ? '🔇' : '🔊';
  });

  muteBtn.addEventListener('click', () => {
    muted = !muted;
    if (muted) {
      if (typingMusic) typingMusic.volume = 0;
      muteBtn.textContent = '🔇';
      slider.value = 0;
    } else {
      if (typingMusic) typingMusic.volume = musicVolume > 0 ? musicVolume : 0.35;
      musicVolume = typingMusic ? typingMusic.volume : 0.35;
      muteBtn.textContent = '🔊';
      slider.value = Math.round(musicVolume * 100);
    }
  });
}

/* ══ Init ══ */
document.addEventListener('DOMContentLoaded', () => {
  ts.text  = pickText();
  ts.chars = renderText(ts.text);

  const input = document.getElementById('typingInput');
  if (input) {
    input.disabled = true;
    input.placeholder = '';
    // On écoute keydown (pas input) pour le système Ratatype
    input.addEventListener('keydown', handleKeyDown);
    // Empêcher que l'input accumule du texte
    input.addEventListener('input', () => { input.value = ''; });
  }

  // Cliquer sur la zone texte focus l'input
  document.getElementById('typingTextBox')?.addEventListener('click', () => {
    const input = document.getElementById('typingInput');
    if (input && !input.disabled) input.focus();
    else if (ts.status === 'idle') handleStartBtn();
  });

  document.getElementById('startTyping')?.addEventListener('click', handleStartBtn);
  document.getElementById('resetTyping')?.addEventListener('click', fullReset);

  buildVolumeBar();
});
