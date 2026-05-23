/* ══════════════════════════════════════════════════════════════
   PANIER — cart.js
══════════════════════════════════════════════════════════════ */

let cart = JSON.parse(localStorage.getItem('xybishop_cart') || '[]');

function saveCart()    { localStorage.setItem('xybishop_cart', JSON.stringify(cart)); }

function updateBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cartBadge');
  if (el) el.textContent = total;
}

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) existing.qty++;
  else cart.push({ id: product.id, name: product.name, price: product.price, img: product.gallery[0], qty: 1 });
  saveCart(); updateBadge(); flashAddBtn(product.id); renderCartItems();
}

function flashAddBtn(id) {
  const btn = document.querySelector(`.btn-add[data-id="${id}"]`);
  if (!btn) return;
  const orig = btn.textContent;
  btn.textContent = '✓ Ajouté'; btn.style.background = '#27ae60'; btn.style.color = '#fff';
  setTimeout(() => { btn.textContent = orig; btn.style.background = ''; btn.style.color = ''; }, 1300);
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(0, item.qty + delta);
  if (item.qty === 0) cart = cart.filter(i => i.id !== id);
  saveCart(); updateBadge(); renderCartItems();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart(); updateBadge(); renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const totalEl   = document.getElementById('cartTotal');
  if (!container) return;

  if (!cart.length) {
    container.innerHTML = '<div class="cart-empty">Votre panier est vide</div>';
    if (totalEl) totalEl.textContent = '0.00';
    return;
  }

  let total = 0;
  container.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.name}"
          onerror="this.src='data:image/svg+xml,<svg xmlns=\\'http://www.w3.org/2000/svg\\'><rect width=\\'56\\' height=\\'56\\' fill=\\'%23eae9e6\\'/></svg>'" />
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${(item.price * item.qty).toFixed(2)} €</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, +1)">+</button>
          </div>
        </div>
        <button class="cart-item-del" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = total.toFixed(2);
}

function openCart()  { document.getElementById('cartOverlay')?.classList.add('open'); }
function closeCart() { document.getElementById('cartOverlay')?.classList.remove('open'); }

document.addEventListener('DOMContentLoaded', () => {
  updateBadge();
  renderCartItems();

  document.getElementById('cartBtn')?.addEventListener('click', openCart);
  document.getElementById('cartClose')?.addEventListener('click', closeCart);
  document.getElementById('cartOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('cartOverlay')) closeCart();
  });

  document.getElementById('payBtn')?.addEventListener('click', () => {
    closeCart();
    try { const a=new Audio('assets/sounds/livraison.mp3'); a.volume=0.85; a.play().catch(()=>{}); } catch(e){}
    document.getElementById('payModal')?.classList.add('open');
  });
  document.getElementById('closePayModal')?.addEventListener('click', () => {
    document.getElementById('payModal')?.classList.remove('open');
  });
  document.getElementById('payModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('payModal'))
      document.getElementById('payModal').classList.remove('open');
  });
});
