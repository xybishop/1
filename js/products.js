/* ══════════════════════════════════════════════════════════════
   CATALOGUE — products.js

   COMMENT AJOUTER UN PRODUIT :
   1. Copie une entrée existante, donne-lui un id unique (ex: 21)
   2. Remplis name, label, desc, price
   3. Mets les images dans assets/images/produitX/ et liste-les dans gallery[]
   4. Le produit apparaît automatiquement dans la grille

   COMMENT MODIFIER TITRE / DESCRIPTION :
   - Modifie les champs name, label, desc, price dans l'entrée correspondante

   COMMENT CHANGER L'ORDRE DES IMAGES D'UN PRODUIT :
   - Réorganise simplement les lignes dans le tableau gallery[] de ce produit
   - La première image de gallery[] est celle affichée dans la grille du shop
   - Les suivantes s'affichent dans l'ordre dans les miniatures du modal
══════════════════════════════════════════════════════════════ */

const PRODUCTS = [
  {
    id: 1,
    name: "JNR - Kit Puff Itadakimasu X Samolito Ice 28000 Bouffées",
    label: "Exclusif",
    desc: "Puff 28k Rechargeable saveur Fruit du Dragon, mure et fraicheur",
    price: 14.95,
    gallery: [
      "assets/images/produit1/JNR_SAMO.png"
    ]
  },
  {
    id: 2,
    name: "Bonnet Xybiton Bird Head Toque 24K Black",
    label: "Accessoire",
    desc: "Ce bonnet merveilleusement chaud est conçu par la luxueuse marque d'extérieur Xybiton. La combinaison de la laine mérinos et de l'acrylique donne au chapeau une sensation merveilleusement douce sur votre cuir chevelu.",
    price: 29.95,
    gallery: [
      "assets/images/produit2/XYBITON_BONNET.png"
    ]
  },
  {
    id: 3,
    name: "Casquette Make Xybiton Great Again",
    label: "Casquette",
    desc: "Quand il a compéti pour les élections présidentielles, LilYaang a eu sa phrase choc : Make Xybiton Great Again. Parfois abrégé MXGA, ce slogan politique renfermait la quintessence des idées défendues par le Républicain. Faite en coton, cette casquette Américaine convient à ceux qui pensent que le nationalisme devrait primer.",
    price: 29.90,
    gallery: [
      "assets/images/produit3/MAKE_XYBITON_GREAT_AGAIN_CASQUETTE.png"
    ]
  },
  {
    id: 4,
    name: "Yo-Kai Watch 3DS",
    label: "Collector",
    desc: "Article neuf. Produit non utilisé. Emballage pouvant présenter de légères marques liées au stockage ou au transport.",
    price: 17.00,
    gallery: [
      "assets/images/produit4/Yo-Kai-Watch-3DS.jpg"
    ]
  },
  {
    id: 5,
    name: "VAXEE PD155 Series Mousepad",
    label: "Nouveauté",
    desc: "Lors de la fabrication des tapis de souris série PD, chaque pièce est découpée et finie à la main. De légères irrégularités sur les bords peuvent donc apparaître. Si les finitions sont importantes pour vous, veuillez consulter les photos ci-dessus.",
    price: 64.99,
    gallery: [
      "assets/images/produit5/PD155FRONT.jpg",
      "assets/images/produit5/PD155SIDE.jpg",
      "assets/images/produit5/PD155TOP.jpg"
    ]
  },
  {
    id: 6,
    name: "Bac STI2D – 100 fiches de révision : toutes les matières",
    label: "Édition spéciale",
    desc: "Tu passes le Bac STI2D et tu veux réviser efficacement sans te perdre dans des heures de cours ? Ce livre est fait pour toi. Avec 100 fiches de révision claires, synthétiques et directement utiles, tu vas pouvoir aller à l’essentiel, mémoriser rapidement les notions clés et gagner un temps précieux dans tes révisions. Conçu pour les élèves de STI2D, cet ouvrage regroupe tout le programme officiel dans un format simple, structuré et facile à comprendre.",
    price: 18.99,
    gallery: [
      "assets/images/produit6/BACSTI2D_FRONT.jpg",
      "assets/images/produit6/BACSTI2D_BACK.jpg"
    ]
  },
  {
    id: 7,
    name: "Colin d'Alaska à la bordelaise et riz aux légumes Picard",
    label: "Gastronomie",
    desc: "Place à la tradition avec ce colin d’Alaska à la bordelaise, recouvert de sa chapelure légèrement gratinée, et déposé sur un lit de riz basmati et de petits légumes. Prêt en quelques minutes au micro-ondes, ce plat express individuel vous offre saveur et équilibre à l'heure de la pause déjeuner.",
    price: 4.20,
    gallery: [
      "assets/images/produit7/colin-alaska-bordelais_COVER.webp",
      "assets/images/produit7/colin-alaska-bordelais-fe.webp"
    ]
  },
  {
    id: 8,
    name: "Sculpture 'Pierre Polie'",
    label: "Minéral",
    desc: "Sculpture 'Pierre Polie' Verre soufflé. Miroir argenté. Miroir fumé. 37 x 34 x 18 cm | Couleur : Argent et Fumé Comme chaque pièce est réalisée sur commande, la sculpture finale peut légèrement varier en apparence, ce qui fait partie du caractère unique de l'œuvre.",
    price: 5900.00,
    gallery: [
      "assets/images/produit8/PIERRE_POLIE_FRONT.webp",
      "assets/images/produit8/PIERRE_POLIE_ZOOM.webp"
    ]
  },
  {
    id: 9,
    name: "Chaussettes hautes homme mille-pattes - Lot de 1420",
    label: "Chaussettes",
    desc: "Découvrez ce lot de 1420 paires de chaussettes hautes mille-pattes pour homme, idéales pour le multi-sport. Composées de 68% coton, 30% polyester et 2% élasthanne, elles garantissent un confort optimal. Lavables à 30°, elles sont parfaites pour vos activités sportives.",
    price: 3251.80,
    gallery: [
      "assets/images/produit9/WHITE_WINGS_SOCKS_LEFT.png",
      "assets/images/produit9/WHITE_WINGS_SOCKS_RIGHT.png"
    ]
  },
  {
    id: 10,
    name: "Villa de luxe Xybiton - A Tel Aviv",
    label: "Location",
    desc: "Logement entier : Peut héberger jusqu'à plus de 73,1 k personnes. La villa est située au centre de Tel Aviv dans l'un des endroits les plus exclusifs au monde. Non seulement elle offre une vue panoramique sur la Méditerranée, mais est également juste en face de la Montagne Chevallier. Le tarif de location est de 161 714 € par mois pour cette propriété d’exception.",
    price: 161714.00,
    gallery: [
      /* ── Réorganise ces lignes pour changer l'ordre des images ── */
      "assets/images/produit10/1.png",
      "assets/images/produit10/2.jpg",
      "assets/images/produit10/3.png",
      "assets/images/produit10/4.jpg",
      "assets/images/produit10/5.jpg",
      "assets/images/produit10/image_1779146608675.jpg",
      "assets/images/produit10/image_1779146672241.jpg",
      "assets/images/produit10/image_1779146623503.jpg",
      "assets/images/produit10/image_1779146629014.jpg",
      "assets/images/produit10/image_1779146635171.jpg",
      "assets/images/produit10/image_1779146654461.jpg",
      "assets/images/produit10/image_1779146660838.jpg",
      "assets/images/produit10/image_1779146616002.jpg",
      "assets/images/produit10/image_1779146698468.jpg",
      "assets/images/produit10/image_1779146705631.jpg",
      "assets/images/produit10/image_1779146713482.jpg",  
      "assets/images/produit10/image_1779146733385.jpg",
      "assets/images/produit10/image_1779146958932.jpg",
      "assets/images/produit10/image_1779146965362.jpg",
      "assets/images/produit10/image_1779146970516.jpg",
      "assets/images/produit10/image_1779146977885.jpg",
      "assets/images/produit10/image_1779146983266.jpg",
      "assets/images/produit10/image_1779146987539.jpg",
      "assets/images/produit10/image_1779146991552.jpg",
      "assets/images/produit10/image_1779146995619.jpg",
      "assets/images/produit10/image_1779146999247.jpg",
      "assets/images/produit10/image_1779147003586.jpg",
      "assets/images/produit10/image_1779147007688.jpg"
      
    ]
  },
  {
    id: 11,
    name: "ANGRY BIRDS - T-Shirt Angry Birds Red",
    label: "Nouveauté",
    desc: "TEE shirt manches courtes angry birds parfait pour concept artist",  
    price: 19.99,
    gallery: [
      "assets/images/produit11/FIGGE1115L_1.jpg"
    ]
  },
  {
    id: 12,
    name: "Conteneur maritime jaune 20’IICL6, 280 161-0",
    label: "Transport",
    desc: "Vous recherchez un conteneur durable et fiable ? Nous vous présentons un conteneur maritime jaune d’une taille de 20 pieds (6 mètres), qui est actuellement stocké sur le site B de Icebox et est prêt pour sa prochaine utilisation.",
    price: 3206.00,
    gallery: [
      /* ── Réorganise ces lignes pour changer l'ordre des images ── */
      "assets/images/produit12/ONEISYELLOW_DIAGONALE.png",
      "assets/images/produit12/dimensioni-del-container-marittimo-pagamento-del-container-container-di-spedizione-20.jpg",
      "assets/images/produit12/ONEISYELLOW_FRONT.png",
      "assets/images/produit12/namorny-kontajner-rozmery-platba-kontajnera-lodne-kontajnery-20.jpg",
      "assets/images/produit12/tengeri-kontener-meretei-kontener-fizetes-szallitasi-kontenerek-20.jpg",
      "assets/images/produit12/sea-container-dimensions-container-payment-shipping-containers-20.jpg",
      "assets/images/produit12/wymiary-kontenerow-morskich-platnosc-kontenerowa-kontenery-transportowe-20.jpg",
      "assets/images/produit12/dimensoes-do-conteiner-maritimo-pagamento-do-conteiner-conteineres-de-transporte-20.jpg"
    ]
  },
  {
    id: 13,
    name: "Ops-Core FAST SF 10-4 Headborne System",
    label: "Militaire",
    desc: "Le casque balistique FAST SF 10-4 d’Ops-Core est leur modèle le plus léger à ce jour, grâce à une nouvelle coque, un rembourrage LockDown™ et une jugulaire Head-Loc® Flex. Il offre un meilleur confort, une protection optimale et des performances approuvées par les forces spéciales du MOSSAD.",
    price: 1999.95,
    gallery: [
      "assets/images/produit13/10-4CASQUE.png",
      "assets/images/produit13/FAST_SF_NG_PDP_06__96645.1743691222.jpg",
      "assets/images/produit13/Sizing_Guide_FAST__23325.1745943129.jpg"
    ]
  },
  {
    id: 14,
    name: "Raise The Black Flag 90 x 150 cm",
    label: "Drapeau",
    desc: "Drapeau Raise The Black Flag de 90 x 150 cm. Nos drapeaux sont fabriqués en polyester résistant aux intempéries et à une vitesse extrême du vent.",
    price: 9.45,
    gallery: [
      "assets/images/produit14/RAISE_THE_BLACK_FLAG.png"
    ]
  },
  {
    id: 15,
    name: "BRASSARD IN PROFESSIONNEL",
    label: "Brassard",
    desc: "Pack x1 Brassard IN - Brassard Réfléchissant Fluo Vert avec Scratch - Fluorescent Haute Visibilité pour Staff, Sécurité Privée, Événement - Ajustable 41-50 cm",
    price: 6.97,
    gallery: [
      "assets/images/produit15/BRASSARD_IN_CLEAN.png",
      "assets/images/produit15/BRASSARD_IN_ZOOM.png",
      "assets/images/produit15/BRASSARD_IN_DESCRIPTION.png",
      "assets/images/produit15/BRASSARD_IN_SACHET.png",
      "assets/images/produit15/BRASSARD_IN_SCRATCH.jpg"
    ]
  },
  {
    id: 16,
    name: "BRASSARD OUT PROFESSIONNEL",
    label: "Brassard",
    desc: "Pack x1 Brassard OUT - Brassard Réfléchissant Fluo Rouge avec Scratch - Fluorescent Haute Visibilité pour Staff, Sécurité Privée, Événement - Ajustable 41-50 cm",
    price: 6.97,
    gallery: [
      "assets/images/produit16/BRASSARD_OUT_CLEAN.png",
      "assets/images/produit16/BRASSARD_OUT_ZOOM.png",
      "assets/images/produit16/BRASSARD_OUT_DESCRIPTION.png",
      "assets/images/produit16/BRASSARD_OUT_SACHET.png",
      "assets/images/produit15/BRASSARD_IN_SCRATCH.jpg"
    ]
  },
  {
    id: 17,
    name: "Stranal crème hémorroïdes 30 g",
    label: "Soins",
    desc: "C'est bête d'avoir mal ! Stranal crème est préconisée pour soulager les hémorroïdes externes, internes, les sensations de brûlures et de démangeaisons dues aux crises hémorroïdaires.",
    price: 3.90,
    gallery: [
      "assets/images/produit17/STRANAL_FRONT.png",
      "assets/images/produit17/STRANAL_FRONT_allonge.png",
      "assets/images/produit17/STRANAL_allonge.png",
      "assets/images/produit17/STRANAL_semibottom.png",
      "assets/images/produit17/STRANAL_BOTTOM.png"
    ]
  },
  {
    id: 18,
    name: "Pendentif en diamant sur mesure Skwalalerte",
    label: "Premium",
    desc: "Ce pendentif est tout simplement exceptionnel grâce à son design remarquable et sa qualité de fabrication irréprochable. Le moyen idéal d'affirmer votre style et votre goût !",
    price: 48661.95,
    gallery: [
      "assets/images/produit18/SKWALALERTE_DIAGONAL.png",
      "assets/images/produit18/SKWALALERTE_HAND.png",
      "assets/images/produit18/SKWALALERTE_SIDE.png",
      "assets/images/produit18/SKWALALERTE_TOP.png",
      "assets/images/produit18/SKWALALERTE_BACK.jpg"
    ]
  },
  {
    id: 19,
    name: "Veste de costume coupe ajustée Pages",
    label: "Nouveauté",
    desc: "Veste de costume ajustée aspect chiné à motifs façonnés Pages. Coupe ajustée. Doublure unie satinée. Composition en lin mélangé.",
    price: 139.00,
    gallery: [
      /* ── Réorganise ces lignes pour changer l'ordre des images ── */
      "assets/images/produit19/pages.png",
      "assets/images/produit19/1.png",
      "assets/images/produit19/2.jpg",
      "assets/images/produit19/3.png",
      "assets/images/produit19/4.jpg",
      "assets/images/produit19/5.png",
      "assets/images/produit19/6.jpg",
      "assets/images/produit19/7.jpg"
    ]
  },
  {
    id: 20,
    name: "Red Bull Energy Drink Zone2Keh Edition",
    label: "Nouveauté",
    desc: "250 ml - L'édition juteuse qui te réveille en une gorgée",
    price: 4.99,
    gallery: [
      "assets/images/produit20/redbull2keh.png"
    ]
  },
  {
    id: 21,
    name: "Blender pour les nuls",
    label: "Modélisation anale",
    desc: "Apprenez la 3D avec Blender : interface, modélisation, animation, rendu et export. Un guide simple et complet pour débuter rapidement sur Mac, Windows ou Linux.",
    price: 16.99,
    gallery: [
      "assets/images/produit21/blender.jpg"
    ]
  },
  {
    id: 22,
    name: "Guérit le phimosis sans circoncision",
    label: "Soins",
    desc: "Dispositif médical en silicone de qualité médicale à faible invasivité, basé sur la recherche clinique de l’Université Tor Vergata et conçu pour traiter le phimosis par dilatation progressive.",
    price: 149.90,
    gallery: [
      "assets/images/produit22/1.jpg",
      "assets/images/produit22/2.jpg",
      "assets/images/produit22/3.jpg",
      "assets/images/produit22/4.jpg",
      "assets/images/produit22/5.jpg"
    ]
  },
  {
    id: 23,
    name: "Epitech Poto synthesis Premium Oversized Hoodie",
    label: "Vêtements",
    desc: "Hoodie premium oversize au style rétro 90s, en molleton épais et ultra confortable, parfait pour un look décontracté et chaleureux.",
    price: 55.95,
    gallery: [
      "assets/images/produit23/mehdi.png",
      "assets/images/produit23/2.jpg",
      "assets/images/produit23/3.jpg",
      "assets/images/produit23/4.jpg",
      "assets/images/produit23/5.jpg"

    ]
  }
];

/* ══ Drag-to-reorder state ══ */
let productOrder = JSON.parse(localStorage.getItem('xy_prod_order') || 'null');

function getOrderedProducts() {
  if (!productOrder) return [...PRODUCTS];
  const map = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));
  const ordered = productOrder.map(id => map[id]).filter(Boolean);
  // append any new products not in saved order
  PRODUCTS.forEach(p => { if (!productOrder.includes(p.id)) ordered.push(p); });
  return ordered;
}

function saveOrder(cards) {
  productOrder = [...cards].map(c => parseInt(c.dataset.prodId));
  localStorage.setItem('xy_prod_order', JSON.stringify(productOrder));
}

/* ══ Render grid ══ */
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const ordered = getOrderedProducts();
  ordered.forEach((p, i) => {
    const mainImg = p.gallery[0] || makeSVG(p.name, p.id);
    const count   = p.gallery.length;

    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.prodId = p.id;
    card.style.animationDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <div class="prod-img-wrap">
        <img class="prod-img" src="${mainImg}" alt="${p.name}"
          onerror="this.src='${makeSVG(p.name,p.id)}'" />
        ${count > 1 ? `<span class="prod-count">+${count - 1} photos</span>` : ''}
      </div>
      <div class="prod-info">
        <div class="prod-label">${p.label}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-desc">${p.desc}</div>
        <div class="prod-bottom">
          <div class="prod-price">${p.price.toFixed(2)} €</div>
          <button class="btn-add" data-id="${p.id}">+ Panier</button>
        </div>
      </div>`;

    card.addEventListener('click', e => {
      if (e.target.classList.contains('btn-add')) return;
      openProductModal(p);
    });
    card.querySelector('.btn-add').addEventListener('click', e => {
      e.stopPropagation(); addToCart(p);
    });

    grid.appendChild(card);
  });
}

/* ══ Product modal ══ */
let currentModalProduct = null;

function openProductModal(p) {
  currentModalProduct = p;
  document.getElementById('pmLabel').textContent = p.label;
  document.getElementById('pmName').textContent  = p.name;
  document.getElementById('pmDesc').textContent  = p.desc;
  document.getElementById('pmPrice').textContent = p.price.toFixed(2) + ' €';

  const mainImg = document.getElementById('pmMainImg');
  mainImg.src = p.gallery[0] || makeSVG(p.name, p.id);
  mainImg.alt = p.name;
  mainImg.style.opacity = '1';
  mainImg.onerror = () => { mainImg.src = makeSVG(p.name, p.id); };

  const thumbsEl = document.getElementById('pmThumbs');
  thumbsEl.innerHTML = '';
  p.gallery.forEach((src, idx) => {
    const t = document.createElement('img');
    t.className = 'pm-thumb' + (idx === 0 ? ' active' : '');
    t.src = src;
    t.alt = p.name + ' ' + (idx + 1);
    t.onerror = () => { t.src = makeSVG(p.name, p.id); };
    t.addEventListener('click', () => {
      mainImg.style.opacity = '0';
      setTimeout(() => { mainImg.src = src; mainImg.style.opacity = '1'; }, 160);
      thumbsEl.querySelectorAll('.pm-thumb').forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
    thumbsEl.appendChild(t);
  });
  thumbsEl.style.display = p.gallery.length > 1 ? 'flex' : 'none';

  document.getElementById('productModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
  document.body.style.overflow = '';
  currentModalProduct = null;
}

function makeSVG(name, id) {
  const colors = ['#d4cfc9','#c9cfd4','#cfd4c9','#d4c9cf','#c9d4cf','#cfd4d4'];
  const c = colors[id % colors.length];
  const init = name.split(' ').map(w=>w[0]||'').join('').toUpperCase().slice(0,2);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'><rect fill='${c}' width='400' height='300'/><text x='200' y='165' font-family='Arial Black' font-size='72' fill='rgba(0,0,0,.12)' text-anchor='middle'>${init}</text></svg>`
  )}`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  document.getElementById('closeProductModal')?.addEventListener('click', closeProductModal);
  document.getElementById('productModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('productModal')) closeProductModal();
  });
  document.getElementById('pmAddBtn')?.addEventListener('click', () => {
    if (currentModalProduct) { addToCart(currentModalProduct); closeProductModal(); }
  });
});
