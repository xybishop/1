/* ============================================================
 *  MAIN — navigation par sections (pas de scroll entre sections)
 * ============================================================ */

/* ---- Section switching ---- */
function showSection(id) {
  document.querySelectorAll('.page-section').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  // Update active nav link
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.section === id);
  });
  // Persist in URL hash without scrolling
  history.replaceState(null, '', '#' + id);
}

/* ---- Nav links ---- */
document.querySelectorAll('[data-section]').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    showSection(el.dataset.section);
  });
});

/* ---- On load: respect URL hash ---- */
const initSection = (location.hash.slice(1)) || 'home';
showSection(initSection);

/* ---- Navbar hide on scroll within section ---- */
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (y < 80) nav.classList.remove('hide');
  else if (y > lastY + 5) nav.classList.add('hide');
  else if (y < lastY - 5) nav.classList.remove('hide');
  lastY = y;
}, { passive: true });
