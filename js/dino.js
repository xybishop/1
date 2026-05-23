/* ══════════════════════════════════════════════════════════════
   GEOMETRY DASH — dino.js
   • Sol bois VISIBLE (pattern repeat-x + transform)
   • Animation MOGGED avec zoom-in + fade
   • Oiseaux jamais dans la zone de saut obligatoire d'une pipe
   • Son mort : 65% death.mp3 | 25% death_alt.mp3 | 10% death_rare.mp3
     → assets/sounds/death_rare.mp3
   • Vidéos démarrent à 1:25, sync section/jeu
   • BOOST : tous les 200 pts une charge se stocke sur la barre bois
     M en jeu = consomme 1 charge, -50 score, 5s invincibilité + skin swap
     → image boost : assets/images/boost_icon.png
   • Pré-chargement sons + vidéos pour éviter les lags
══════════════════════════════════════════════════════════════ */

(function () {
  const canvas = document.getElementById('dinoCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const W = 960, H = 380;
  canvas.width = W; canvas.height = H;

  const GROUND_Y        = H - 55;
  const GRAVITY         = 0.60;
  const JUMP_V          = -16;
  const PLAYER_W        = 90;
  const PLAYER_H        = 74;
  const OBS_W           = 52;
  const OBS_H_MIN       = 38;
  const OBS_H_MAX       = 110;
  const BIRD_SPEED_MULT = 2.2;
  const BOOST_DURATION  = 300; // frames (5s @ 60fps)

  /* ══════════════════════════════════════════
     PRÉ-CHARGEMENT IMAGES
  ══════════════════════════════════════════ */
  const playerImg = new Image(); playerImg.src = 'assets/images/lilyang_wings.png';
  const boostImg  = new Image(); boostImg.src  = 'assets/images/boost_icon.png';
  const pipeImg   = new Image(); pipeImg.src   = 'assets/images/pipe.png';
  const birdImg   = new Image(); birdImg.src   = 'assets/images/lilyang_head.png';

  /* ══════════════════════════════════════════
     PRÉ-CHARGEMENT SONS — évite le lag au premier déclenchement
  ══════════════════════════════════════════ */
  function preloadAudio(src) {
    const a = new Audio();
    a.preload = 'auto';
    a.src = src;
    // Silencieux, juste pour forcer le buffer navigateur
    a.volume = 0;
    a.load();
    return a;
  }
  const sndDeath     = preloadAudio('assets/sounds/death.mp3');
  const sndDeathAlt  = preloadAudio('assets/sounds/death_alt.mp3');
  const sndDeathRare = preloadAudio('assets/sounds/death_rare.mp3');

  /* ══════════════════════════════════════════
     SOL EN BOIS — texture offscreen, pattern repeat-x
  ══════════════════════════════════════════ */
  const WOOD_H = H - GROUND_Y; // 55px
  const woodCanvas = document.createElement('canvas');
  woodCanvas.width = 240; woodCanvas.height = WOOD_H;
  const wctx = woodCanvas.getContext('2d');
  const woodColors = ['#c8a97a','#c2a270','#cdb080','#b8956a','#d4b585'];
  const plankCount = 5;
  const plankH = WOOD_H / plankCount;

  for (let row = 0; row < plankCount; row++) {
    const y0 = row * plankH;
    wctx.fillStyle = woodColors[row % woodColors.length];
    wctx.fillRect(0, y0, 240, plankH);
    wctx.fillStyle = 'rgba(80,50,20,0.22)';
    wctx.fillRect(0, y0, 240, 1.5);
    wctx.strokeStyle = 'rgba(100,60,15,0.12)';
    wctx.lineWidth = 1;
    for (let v = 0; v < 3; v++) {
      const vx = v * 80 + row * 17;
      wctx.beginPath();
      wctx.moveTo(vx, y0 + 2);
      wctx.bezierCurveTo(vx+20, y0+plankH*0.4, vx+50, y0+plankH*0.6, vx+80, y0+plankH-2);
      wctx.stroke();
    }
    const kx = (row * 61 + 40) % 200 + 20;
    wctx.fillStyle = 'rgba(100,55,15,0.15)';
    wctx.beginPath();
    wctx.ellipse(kx, y0 + plankH*0.5, 9, 4, 0.3, 0, Math.PI*2);
    wctx.fill();
  }
  wctx.fillStyle = 'rgba(50,28,8,0.30)';
  wctx.fillRect(0, 0, 240, 2.5);
  const woodPattern = ctx.createPattern(woodCanvas, 'repeat-x');

  /* ── State ── */
  let state = 'idle';
  let score = 0, best = parseInt(localStorage.getItem('xybishop_gd_best') || '0');
  let frame = 0, speed = 5.5;
  let obstacles = [], birds = [], particles = [];
  let animId;

  /* ── Boost ── */
  let boostCharges  = 0;
  let lastBoostMile = 0;
  let boostActive   = false;
  let boostTimer    = 0;

  /* ── Player ── */
  const PL = { x: 100, y: GROUND_Y - PLAYER_H, vy: 0, onGround: true, angle: 0 };
  function jump() { if (PL.onGround) { PL.vy = JUMP_V; PL.onGround = false; } }

  /* ══════════════════════════════════════════
     VIDÉOS — pré-créées, réutilisées entre parties
  ══════════════════════════════════════════ */
  let sectionBgVideo = null;
  let gameBgVideo    = null;
  let videosReady    = false; // true dès que les vidéos ont été créées une fois

  function makeVideoEl(src, muted, loop) {
    const v = document.createElement('video');
    v.src = src; v.muted = muted; v.loop = loop;
    v.playsInline = true; v.autoplay = false;
    v.setAttribute('playsinline', '');
    v.preload = 'auto'; // force le buffer dès la création
    v.style.cssText = [
      'position:absolute','top:50%','left:50%',
      'min-width:100%','min-height:100%',
      'width:auto','height:auto',
      'transform:translate(-50%,-50%)',
      'object-fit:cover','pointer-events:none',
      'display:none', // caché jusqu'à utilisation
    ].join(';');
    return v;
  }

  function preloadVideos() {
    if (videosReady) return;
    videosReady = true;

    // Section bg — attaché à la section #dino dès le début
    const sec = document.getElementById('dino');
    if (sec) {
      const wrap = document.createElement('div');
      wrap.id = 'sectionBgWrap';
      wrap.style.cssText = 'position:absolute;top:-8%;left:0;right:0;bottom:0;z-index:0;overflow:hidden;pointer-events:none;display:none;';
      sectionBgVideo = makeVideoEl('assets/videos/bg_section.mp4', true, true);
      sectionBgVideo.volume = 0;
      wrap.appendChild(sectionBgVideo);
      sec.prepend(wrap);
    }

    // Game bg — attaché au .game-wrap dès le début
    const gw = document.querySelector('.game-wrap');
    if (gw) {
      const wrap = document.createElement('div');
      wrap.id = 'gameBgWrap';
      wrap.style.cssText = 'position:absolute;inset:0;z-index:1;overflow:hidden;pointer-events:none;display:none;';
      gameBgVideo = makeVideoEl('assets/videos/bg_game.mp4', false, true);
      gameBgVideo.volume = 0.5;
      wrap.appendChild(gameBgVideo);
      gw.prepend(wrap);
    }
  }

  function showSectionBg() {
    const wrap = document.getElementById('sectionBgWrap');
    if (!wrap || !sectionBgVideo) return;
    wrap.style.display = '';
    sectionBgVideo.style.display = '';
    if (gameBgVideo && gameBgVideo.currentTime > 0)
      sectionBgVideo.currentTime = gameBgVideo.currentTime;
    sectionBgVideo.play().catch(() => {});
  }

  function hideSectionBg() {
    const wrap = document.getElementById('sectionBgWrap');
    if (wrap) wrap.style.display = 'none';
    if (sectionBgVideo) { sectionBgVideo.pause(); }
  }

  function showGameBg() {
    const wrap = document.getElementById('gameBgWrap');
    if (!wrap || !gameBgVideo) return;
    wrap.style.display = '';
    gameBgVideo.style.display = '';
    gameBgVideo.muted = false;
    gameBgVideo.volume = 0.5;
    gameBgVideo.play().catch(() => {});
  }

  function muteGameBg() {
    if (gameBgVideo) { gameBgVideo.volume = 0; gameBgVideo.muted = true; }
  }

  function hideGameBg() {
    const wrap = document.getElementById('gameBgWrap');
    if (wrap) wrap.style.display = 'none';
    if (gameBgVideo) { gameBgVideo.pause(); gameBgVideo.muted = true; gameBgVideo.volume = 0; }
  }

  /* ══════════════════════════════════════════
     MOGGED — zoom-in + fade
  ══════════════════════════════════════════ */
  function injectShakeCSS() {
    if (document.getElementById('gdShakeStyle')) return;
    const st = document.createElement('style');
    st.id = 'gdShakeStyle';
    st.textContent = `
      @keyframes gdShake {
        0%,100%{transform:translate(0,0)rotate(0)}
        5% {transform:translate(-32px,-24px)rotate(-5deg)}
        10%{transform:translate(34px,26px) rotate(5deg)}
        15%{transform:translate(-36px,22px)rotate(-6deg)}
        20%{transform:translate(32px,-30px)rotate(6deg)}
        25%{transform:translate(-30px,32px)rotate(-5deg)}
        30%{transform:translate(36px,-22px)rotate(5deg)}
        35%{transform:translate(-34px,24px)rotate(-5.5deg)}
        40%{transform:translate(30px,-32px)rotate(5.5deg)}
        50%{transform:translate(32px,-24px)rotate(3deg)}
        60%{transform:translate(-28px,22px)rotate(-2.5deg)}
        70%{transform:translate(24px,-26px)rotate(2deg)}
        85%{transform:translate(-14px,16px)rotate(-1deg)}
        95%{transform:translate(10px,-10px)rotate(1deg)}
      }
      @keyframes moggedIn {
        0%   { opacity:0; transform:scale(0.3); }
        40%  { opacity:1; transform:scale(1.12); }
        60%  { transform:scale(0.95); }
        100% { opacity:1; transform:scale(1); }
      }
      @keyframes moggedOut {
        0%   { opacity:1; transform:scale(1); }
        100% { opacity:0; transform:scale(1.3); }
      }
    `;
    document.head.appendChild(st);
  }

  /* ══════════════════════════════════════════
     SON — rejoue depuis le buffer, pas de new Audio() au moment critique
  ══════════════════════════════════════════ */
  function playBuffered(audioEl) {
    try {
      audioEl.currentTime = 0;
      audioEl.volume = 1;
      audioEl.play().catch(() => {
        // fallback: nouvel objet si le buffer a échoué
        const b = new Audio(audioEl.src);
        b.volume = 1; b.play().catch(() => {});
      });
    } catch(e) {}
  }

  function playDeathSound() {
    const r = Math.random();
    if (r < 0.10)      playBuffered(sndDeathRare);
    else if (r < 0.35) playBuffered(sndDeathAlt);
    else               playBuffered(sndDeath);
  }

  function triggerDeathEffect() {
    injectShakeCSS();
    playDeathSound();
    muteGameBg();

    let m = document.getElementById('moggedOverlay');
    if (!m) {
      m = document.createElement('div');
      m.id = 'moggedOverlay';
      m.style.cssText = 'position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;pointer-events:none;flex-direction:column;gap:20px;';
      document.body.appendChild(m);
    }
    m.innerHTML = `<span style="font-size:clamp(130px,22vw,290px);font-weight:900;font-family:Inter,sans-serif;color:#ff1a1a;text-shadow:0 0 60px rgba(255,0,0,1),0 0 120px rgba(255,0,0,.6),8px 8px 0 #000;letter-spacing:10px;line-height:1;">MOGGED</span>`;
    m.style.display = 'flex';
    document.body.style.animation = 'gdShake .055s linear infinite';
    setTimeout(() => {
      document.body.style.animation = '';
      m.style.display = 'none';
    }, 1100);
  }

  /* ══════════════════════════════════════════
     BOOST UI — icônes sur la barre bois
  ══════════════════════════════════════════ */
  function removeBoostUI() {
    document.getElementById('boostBar')?.remove();
  }

  function updateBoostUI() {
    let bar = document.getElementById('boostBar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'boostBar';
      bar.style.cssText = [
        'position:absolute','bottom:0','left:0',
        'width:100%','height:55px',
        'display:flex','align-items:center',
        'gap:6px','padding-left:12px',
        'pointer-events:none','z-index:10',
        'box-sizing:border-box',
      ].join(';');
      document.querySelector('.game-wrap')?.appendChild(bar);
    }
    bar.innerHTML = '';
    for (let i = 0; i < boostCharges; i++) {
      const img = document.createElement('img');
      img.src = 'assets/images/boost_icon.png';
      img.style.cssText = 'width:36px;height:36px;object-fit:contain;filter:drop-shadow(0 0 4px rgba(255,200,0,.9));';
      bar.appendChild(img);
    }
  }

  function activateBoost() {
    if (boostActive || boostCharges <= 0 || state !== 'running') return;
    boostCharges--;
    boostActive = true;
    boostTimer  = BOOST_DURATION;
    // -50 au score courant (min 0)
    score = Math.max(0, score - 50);
    document.getElementById('dinoScore').textContent = score;
    updateBoostUI();
  }

  function tickBoost() {
    // Charge tous les 200 pts
    const mile = Math.floor(score / 200);
    if (mile > lastBoostMile) {
      lastBoostMile = mile;
      boostCharges++;
      updateBoostUI();
    }
    // Décompte
    if (boostActive) {
      boostTimer--;
      if (boostTimer <= 0) {
        boostActive = false; // → drawPlayerWithBoost reprend playerImg automatiquement
      }
    }
  }

  /* ══════════════════════════════════════════
     INPUTS — window + document pour ne rien rater
  ══════════════════════════════════════════ */
  function isDinoActive() {
    return document.getElementById('dino')?.classList.contains('active');
  }

  function handleKey(e) {
    if (!isDinoActive()) return;
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      e.preventDefault();
      if (state === 'idle' || state === 'dead') beginGame();
      else if (state === 'running') jump();
    }
    if (e.code === 'KeyM' && state === 'running') {
      e.preventDefault();
      activateBoost();
    }
  }
  document.addEventListener('keydown', handleKey);
  window.addEventListener('keydown', handleKey); // filet de sécurité

  canvas.addEventListener('click', () => {
    if (state === 'idle' || state === 'dead') beginGame();
    else if (state === 'running') jump();
  });
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (state === 'idle' || state === 'dead') beginGame();
    else if (state === 'running') jump();
  }, { passive: false });

  /* ══════════════════════════════════════════
     GAME START / OVER
  ══════════════════════════════════════════ */
  function beginGame() {
    cancelAnimationFrame(animId);
    obstacles = []; birds = []; particles = [];
    frame = 0; score = 0; speed = 5.5;
    PL.y = GROUND_Y - PLAYER_H; PL.vy = 0; PL.onGround = true; PL.angle = 0;
    boostCharges = 0; lastBoostMile = 0; boostActive = false; boostTimer = 0;
    removeBoostUI();
    document.getElementById('gameOverlay')?.classList.add('hidden');
    showSectionBg();
    showGameBg();
    document.querySelector('.game-wrap')?.classList.add('playing');
    state = 'running';
    loop();
  }

  function gameOver() {
    state = 'dead';
    boostActive = false; boostTimer = 0; boostCharges = 0; lastBoostMile = 0;
    removeBoostUI();
    if (score > best) { best = score; localStorage.setItem('xybishop_gd_best', best); }
    document.getElementById('dinoBest').textContent = best;
    muteGameBg();
    hideSectionBg();
    document.querySelector('.game-wrap')?.classList.remove('playing');
    triggerDeathEffect();

    setTimeout(() => {
      const overlay = document.getElementById('gameOverlay');
      const msg = document.getElementById('gameMsg');
      if (overlay && msg) {
        msg.innerHTML = `<strong>Score : ${score}</strong><br><span style="font-size:.72rem;opacity:.55;letter-spacing:1px">Espace ou clic pour rejouer</span>`;
        overlay.classList.remove('hidden');
      }
      hideGameBg();
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H);
      drawGround(); drawPlayerSprite(false);
    }, 1200);
  }

  /* ── Spawn obstacles ── */
  function spawnObstacle() {
    const count = Math.random() < 0.3 ? 2 : 1;
    const bigPipe = Math.random() < 0.25;
    const hMin = bigPipe ? 75 : OBS_H_MIN;
    const hMax = bigPipe ? OBS_H_MAX : 72;
    const h = hMin + Math.random() * (hMax - hMin);
    obstacles.push({ x: W + 20, h, count, w: OBS_W * count });
  }

  /* ── Spawn oiseau ── */
  function spawnBird() {
    const t_apex  = -JUMP_V / GRAVITY;
    const y_apex  = (GROUND_Y - PLAYER_H) + JUMP_V * t_apex + 0.5 * GRAVITY * t_apex * t_apex;
    const jumpTop = y_apex - PLAYER_H;
    const BIRD_H  = 78, BIRD_W = 78;
    const pipeIncoming = obstacles.some(o => o.x > PL.x && o.x < PL.x + 380);
    let y;
    const roll = Math.random();
    if (!pipeIncoming) {
      if (roll < 0.40) y = 15 + Math.random() * Math.max(5, jumpTop - 30);
      else if (roll < 0.75) y = GROUND_Y - 90 - Math.random() * 80;
      else y = jumpTop + 10 + Math.random() * 60;
    } else {
      y = 15 + Math.random() * Math.max(5, jumpTop - 20);
    }
    y = Math.max(15, Math.min(y, GROUND_Y - 90));
    birds.push({ x: W + 60, y, vy: (Math.random() - 0.5) * 1.0, phase: 0, w: BIRD_W, h: BIRD_H });
  }

  /* ── Draw ── */
  function drawGround() {
    ctx.save();
    ctx.translate(0, GROUND_Y);
    ctx.fillStyle = woodPattern;
    ctx.fillRect(0, 0, W, WOOD_H);
    ctx.restore();
    ctx.fillStyle = 'rgba(50,28,8,0.35)';
    ctx.fillRect(0, GROUND_Y, W, 2);
  }

  // drawPlayerSprite(withBoost) — utilisé par la boucle ET par drawIdle/gameOver
  function drawPlayerSprite(withBoost) {
    const cx = PL.x + PLAYER_W / 2, cy = PL.y + PLAYER_H / 2;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(PL.angle);
    const img = withBoost ? boostImg : playerImg;
    if (img.complete && img.naturalWidth > 0) {
      if (withBoost) { ctx.shadowColor = 'rgba(255,220,0,0.95)'; ctx.shadowBlur = 22; }
      ctx.drawImage(img, -PLAYER_W/2, -PLAYER_H/2, PLAYER_W, PLAYER_H);
      ctx.shadowBlur = 0;
    } else {
      ctx.fillStyle = withBoost ? '#ffd700' : '#e8a050';
      ctx.fillRect(-PLAYER_W/2, -PLAYER_H/2, PLAYER_W, PLAYER_H);
    }
    ctx.restore();
  }

  function drawObstacle(o) {
    for (let i = 0; i < o.count; i++) {
      const ox = o.x + i * OBS_W, oy = GROUND_Y - o.h;
      if (pipeImg.complete && pipeImg.naturalWidth > 0) {
        ctx.drawImage(pipeImg, ox, oy, OBS_W, o.h);
      } else {
        ctx.fillStyle = '#b5271f';
        ctx.fillRect(ox, oy, OBS_W, o.h);
      }
    }
  }

  function drawBird(b) {
    b.phase += .25;
    const flap = Math.sin(b.phase) * 7;
    if (birdImg.complete && birdImg.naturalWidth > 0) {
      ctx.save(); ctx.translate(b.x+b.w/2, b.y+flap); ctx.scale(-1,1);
      ctx.drawImage(birdImg, -b.w/2, -b.h/2, b.w, b.h); ctx.restore();
    } else {
      ctx.fillStyle='#b5271f';
      ctx.beginPath(); ctx.ellipse(b.x+b.w/2,b.y+flap,b.w/2,b.h/3,0,0,Math.PI*2); ctx.fill();
    }
  }

  function hitsObs(o) {
    const px=PL.x+PLAYER_W*.22, py=PL.y+PLAYER_H*.15, pw=PLAYER_W*.56, ph=PLAYER_H*.7;
    return px < o.x+o.w && px+pw > o.x && py < GROUND_Y && py+ph > GROUND_Y-o.h;
  }
  function hitsBird(b) {
    const px=PL.x+PLAYER_W*.22, py=PL.y+PLAYER_H*.15, pw=PLAYER_W*.56, ph=PLAYER_H*.7;
    return px < b.x+b.w*.7 && px+pw > b.x+b.w*.15 && py < b.y+b.h*.6 && py+ph > b.y+b.h*.15;
  }

  function spawnParticles(x,y) {
    for(let i=0;i<16;i++){
      const a=Math.random()*Math.PI*2,s=2+Math.random()*5;
      particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-3,life:1,size:2+Math.random()*5,color:`hsl(${10+Math.random()*40},80%,55%)`});
    }
  }
  function updateParticles(){
    particles.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.4;p.life-=.028;ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;ctx.fillRect(p.x,p.y,p.size,p.size);});
    ctx.globalAlpha=1; particles=particles.filter(p=>p.life>0);
  }

  function drawHUD() {
    ctx.fillStyle=state==='running'?'rgba(255,255,255,.95)':'rgba(60,55,50,.45)';
    ctx.font='700 15px Inter,sans-serif'; ctx.textAlign='right';
    if(state==='running'){ctx.shadowColor='rgba(0,0,0,.8)';ctx.shadowBlur=5;}
    ctx.fillText(String(score).padStart(5,'0'),W-18,30);
    ctx.shadowBlur=0; ctx.textAlign='left';
    document.getElementById('dinoScore').textContent=score;
  }

  /* ══════════════════════════════════════════
     BOUCLE PRINCIPALE
  ══════════════════════════════════════════ */
  function loop() {
    if (state !== 'running') return;
    frame++;
    ctx.clearRect(0,0,W,H);
    drawGround();

    PL.vy += GRAVITY; PL.y += PL.vy;
    if (PL.y >= GROUND_Y - PLAYER_H) { PL.y=GROUND_Y-PLAYER_H; PL.vy=0; PL.onGround=true; }
    else PL.onGround=false;

    if (!PL.onGround) PL.angle += 0.12;
    else PL.angle = Math.round(PL.angle/(Math.PI/2))*(Math.PI/2);

    drawPlayerSprite(boostActive);

    const interval = Math.max(55, 130 - score * 0.08);
    if (frame % Math.floor(interval) === 0) spawnObstacle();
    if (frame % 90  === 0 && Math.random() < 0.75) spawnBird();
    if (frame % 180 === 0 && Math.random() < 0.40) spawnBird();

    let dead = false;
    obstacles.forEach(o => {
      o.x -= speed; drawObstacle(o);
      if (!dead && !boostActive && hitsObs(o)) { dead=true; spawnParticles(PL.x+PLAYER_W/2,PL.y+PLAYER_H/2); }
    });
    obstacles = obstacles.filter(o=>o.x+o.w>-10);

    birds.forEach(b => {
      b.x -= speed*BIRD_SPEED_MULT; b.y+=b.vy;
      if(b.y<15)b.vy=Math.abs(b.vy); if(b.y>GROUND_Y-85)b.vy=-Math.abs(b.vy);
      drawBird(b);
      if(!dead&&!boostActive&&hitsBird(b)){dead=true;spawnParticles(PL.x+PLAYER_W/2,PL.y+PLAYER_H/2);}
    });
    birds=birds.filter(b=>b.x+b.w>-10);

    if(dead){gameOver();return;}
    updateParticles();
    if(frame%6===0){score++;speed=5.5+Math.floor(score/300)*.4;}
    tickBoost();
    drawHUD();
    animId=requestAnimationFrame(loop);
  }

  /* ── Init ── */
  function drawIdle(){
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H);
    drawGround(); drawPlayerSprite(false); drawHUD();
  }

  // Pré-charger les vidéos dès que la page est prête, sans attendre le premier clic
  if (document.readyState === 'complete') {
    preloadVideos();
  } else {
    window.addEventListener('load', preloadVideos);
  }

  drawIdle();
  document.getElementById('dinoBest').textContent=best;
})();
