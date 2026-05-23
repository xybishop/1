/* ══════════════════════════════════════════════════════════════
   YOKAI WATCH — yokai.js
   ──────────────────────────────────────────────────────────────

   COMMENT MODIFIER LES LIENS DES ÉPISODES :
   ───────────────────────────────────────────
   Chaque saison est un tableau. Chaque ligne = un épisode dans l'ordre.
   Remplace simplement l'URL entre les guillemets.

   FORMATS ACCEPTÉS (tout ce qui s'embède dans un <iframe>) :
     • Sibnet  : "https://video.sibnet.ru/shell.php?videoid=XXXXXXX"
     • Sendvid : "https://sendvid.com/embed/XXXXXXXX"
     • Vidmoly : "https://vidmoly.biz/embed-XXXXXXXXXX.html"
     • Dailymotion : "https://www.dailymotion.com/embed/video/XXXXXXX"
     • Tout autre site qui autorise l'embed (vérifie avec X-Frame-Options)

   SI UN ÉPISODE N'EST PAS ENCORE TROUVÉ : mets "" (chaîne vide)
   → le player affichera un message "épisode non disponible"

   PAS DE YOUTUBE : YouTube bloque les iframes externes.
══════════════════════════════════════════════════════════════ */

/* ════════════════════════════════
   SAISON 1 — 26 épisodes (Sibnet)
════════════════════════════════ */
const S1 = [
  /* Ep 01 */ "https://sendvid.com/embed/8oxfyg49",
  /* Ep 02 */ "https://sendvid.com/embed/bc32qkxi",
  /* Ep 03 */ "https://sendvid.com/embed/jyuam3lm",
  /* Ep 04 */ "https://sendvid.com/embed/4zk8abl6",
  /* Ep 05 */ "https://sendvid.com/embed/ewrgyc6p",
  /* Ep 06 */ "https://sendvid.com/embed/7zgok2lx",
  /* Ep 07 */ "https://sendvid.com/embed/2m44zw36",
  /* Ep 08 */ "https://sendvid.com/embed/067h6825",
  /* Ep 09 */ "https://sendvid.com/embed/ea69t9ez",
  /* Ep 10 */ "https://video.sibnet.ru/shell.php?videoid=5474064",
  /* Ep 11 */ "https://sendvid.com/embed/jgqfptur",
  /* Ep 12 */ "https://sendvid.com/embed/89fvih9u",
  /* Ep 13 */ "https://sendvid.com/embed/89wrhdbl",
  /* Ep 14 */ "https://sendvid.com/embed/bhcc22iz",
  /* Ep 15 */ "https://video.sibnet.ru/shell.php?videoid=5474072",
  /* Ep 16 */ "https://sendvid.com/embed/n4c0mtce",
  /* Ep 17 */ "https://sendvid.com/embed/adk40ywm",
  /* Ep 18 */ "https://sendvid.com/embed/31kendzj",
  /* Ep 19 */ "https://sendvid.com/embed/5bw90lqh",
  /* Ep 20 */ "https://sendvid.com/embed/fkjomzwb",
  /* Ep 21 */ "https://sendvid.com/embed/4imd0ip6",
  /* Ep 22 */ "https://video.sibnet.ru/shell.php?videoid=5474080",
  /* Ep 23 */ "https://sendvid.com/embed/7gg7qglq",
  /* Ep 24 */ "https://video.sibnet.ru/shell.php?videoid=5474082",
  /* Ep 25 */ "https://sendvid.com/embed/hycizk3l",
  /* Ep 26 */ "https://sendvid.com/embed/6hpmmhdx",
];

/* ════════════════════════════════
   SAISON 2 — 49 épisodes
   Ep 01-21 et 23-42 = Sibnet
   Ep 22 = Vidmoly
   Ep 43-49 = Sendvid
════════════════════════════════ */
const S2 = [
  /* Ep 01 */ "https://sendvid.com/embed/wjhnjjbh",
  /* Ep 02 */ "https://sendvid.com/embed/nebamu9y",
  /* Ep 03 */ "https://sendvid.com/embed/sg932xq7",
  /* Ep 04 */ "https://sendvid.com/embed/zv6y2aqm",
  /* Ep 05 */ "https://sendvid.com/embed/iqyiystj",
  /* Ep 06 */ "https://sendvid.com/embed/52rooux7",
  /* Ep 07 */ "https://sendvid.com/embed/aqj0mamp",
  /* Ep 08 */ "https://sendvid.com/embed/ly3anxzd",
  /* Ep 09 */ "https://sendvid.com/embed/rr1i8d9n",
  /* Ep 10 */ "https://sendvid.com/embed/gmkaowe0",
  /* Ep 11 */ "https://sendvid.com/embed/etpq9xca",
  /* Ep 12 */ "https://sendvid.com/embed/etpq9xca",
  /* Ep 13 */ "https://video.sibnet.ru/shell.php?videoid=5474100",
  /* Ep 14 */ "https://sendvid.com/embed/7dnjf5i9",
  /* Ep 15 */ "https://sendvid.com/embed/3brmcual",
  /* Ep 16 */ "https://sendvid.com/embed/5uwab9t5",
  /* Ep 17 */ "https://sendvid.com/embed/w2quqpz4",
  /* Ep 18 */ "https://sendvid.com/embed/pdy4u77a",
  /* Ep 19 */ "https://sendvid.com/embed/0586s5b0",
  /* Ep 20 */ "https://sendvid.com/embed/8f18s25p",
  /* Ep 21 */ "https://sendvid.com/embed/kqtk9b3m",
  /* Ep 22 */ "https://vidmoly.biz/embed-vtlxrp4rd3ve.html",
  /* Ep 23 */ "https://sendvid.com/embed/oroonmtt",
  /* Ep 24 */ "https://sendvid.com/embed/d594egdp",
  /* Ep 25 */ "https://sendvid.com/embed/fzo14g2w",
  /* Ep 26 */ "https://sendvid.com/embed/0n7v7oke",
  /* Ep 27 */ "https://sendvid.com/embed/1j2d0bsq",
  /* Ep 28 */ "https://sendvid.com/embed/jkiwyfst",
  /* Ep 29 */ "https://sendvid.com/embed/rod5pj5w",
  /* Ep 30 */ "https://sendvid.com/embed/nm5tvdc7",
  /* Ep 31 */ "https://sendvid.com/embed/x7tfdw8s",
  /* Ep 32 */ "https://sendvid.com/embed/874q2hbm",
  /* Ep 33 */ "https://sendvid.com/embed/f2l4c53l",
  /* Ep 34 */ "https://sendvid.com/embed/ntvp4fn0",
  /* Ep 35 */ "https://sendvid.com/embed/pkrc0elt",
  /* Ep 36 */ "https://sendvid.com/embed/zigcpi0f",
  /* Ep 37 */ "https://sendvid.com/embed/h7acgfw4",
  /* Ep 38 */ "https://sendvid.com/embed/ochwhheq",
  /* Ep 39 */ "https://video.sibnet.ru/shell.php?videoid=5474129",
  /* Ep 40 */ "https://video.sibnet.ru/shell.php?videoid=5474130",
  /* Ep 41 */ "https://video.sibnet.ru/shell.php?videoid=5474131",
  /* Ep 42 */ "https://video.sibnet.ru/shell.php?videoid=5474132",
  /* Ep 43 */ "https://sendvid.com/embed/vl49rgpq",
  /* Ep 44 */ "https://sendvid.com/embed/pkrc0elt",
  /* Ep 45 */ "https://sendvid.com/embed/zigcpi0f",
  /* Ep 46 */ "https://sendvid.com/embed/h7acgfw4",
  /* Ep 47 */ "https://sendvid.com/embed/ochwhheq",
  /* Ep 48 */ "https://sendvid.com/embed/zvsu6ts2",
  /* Ep 49 */ "",
];

/* ════════════════════════════════
   SAISON 3 — 21 épisodes (Sendvid)
════════════════════════════════ */
const S3 = [
  /* Ep 01 */ "https://sendvid.com/embed/pdr44iku",
  /* Ep 02 */ "https://sendvid.com/embed/3b6zc7mg",
  /* Ep 03 */ "https://sendvid.com/embed/erbqg6gf",
  /* Ep 04 */ "https://sendvid.com/embed/mws91yng",
  /* Ep 05 */ "https://sendvid.com/embed/fi53kc6p",
  /* Ep 06 */ "https://sendvid.com/embed/tyu18z8o",
  /* Ep 07 */ "https://sendvid.com/embed/y1kq91oz",
  /* Ep 08 */ "https://sendvid.com/embed/3i9um4qe",
  /* Ep 09 */ "https://sendvid.com/embed/qdwo3imt",
  /* Ep 10 */ "https://sendvid.com/embed/rfvowi1r",
  /* Ep 11 */ "https://sendvid.com/embed/58pr4yre",
  /* Ep 12 */ "https://sendvid.com/embed/hawni5ba",
  /* Ep 13 */ "https://sendvid.com/embed/mh50uxz3",
  /* Ep 14 */ "https://sendvid.com/embed/a7qjzk6i",
  /* Ep 15 */ "https://sendvid.com/embed/0b4w1zky",
  /* Ep 16 */ "https://sendvid.com/embed/ld7yz08w",
  /* Ep 17 */ "https://sendvid.com/embed/3gfw6sio",
  /* Ep 18 */ "https://sendvid.com/embed/f2eshlmj",
  /* Ep 19 */ "https://sendvid.com/embed/62plwbkg",
  /* Ep 20 */ "https://sendvid.com/embed/kyru69cz",
  /* Ep 21 */ "",
];

/* ════════════════════════════════
   FILM
   Remplace le lien ci-dessous si tu en trouves un meilleur
════════════════════════════════ */
const FILM_URL = "https://anime-sama.to/catalogue/yo-kai-watch/film/vf/";

/* ════════════════════════════════════════════════════════════
   NE TOUCHE PAS AU CODE EN DESSOUS — c'est le moteur du player
════════════════════════════════════════════════════════════ */

const EPISODES = { 1: S1, 2: S2, 3: S3 };

let currentSeason = 1;

document.addEventListener('DOMContentLoaded', () => {
  buildSeasonTabs();
  renderGrid(1);
});

function buildSeasonTabs() {
  const tabs = document.getElementById('ywSeasonTabs');
  if (!tabs) return;
  tabs.addEventListener('click', e => {
    const btn = e.target.closest('.yw-season-tab');
    if (!btn) return;
    tabs.querySelectorAll('.yw-season-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const s = btn.dataset.season;
    currentSeason = parseInt(s);
    renderGrid(currentSeason);
  });
}

function renderGrid(season) {
  const grid = document.getElementById('episodeGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const eps = EPISODES[season] || [];

  eps.forEach((url, idx) => {
    const num = idx + 1;
    const available = url && url.trim() !== '';
    const card = document.createElement('div');
    card.className = 'yw-ep-card' + (!available ? ' yw-ep-unavailable' : '');
    card.dataset.ep = num;

    card.innerHTML = `
      <div class="yw-ep-thumb">
        <div class="yw-ep-thumb-bg">
          <span class="yw-ep-num-big">${num}</span>
        </div>
        <div class="yw-ep-play-icon">
          ${available
            ? `<svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M8 5v14l11-7z"/></svg>`
            : `<svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" opacity=".4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`
          }
        </div>
      </div>
      <div class="yw-ep-info">
        <span class="yw-ep-num-label">Épisode ${num}</span>
        <span class="yw-ep-saison-label">${available ? `Saison ${season}` : 'Non disponible'}</span>
      </div>`;

    if (available) {
      card.addEventListener('click', () => {
        window.open(url, '_blank', 'noopener');
      });
    }
    grid.appendChild(card);
  });
}
