/* ── Config ────────────────────────────────────────────── */
const API_BASE = 'http://localhost:3001/api';

/* ── Catalog data (replace with API call when ready) ──── */
const PRODUCTS = [
  { name: 'Linen Throw Pillow',  price: '$38' },
  { name: 'Matte Ceramic Vase',  price: '$52' },
  { name: 'Amber Glass Candle',  price: '$24' },
  { name: 'Rattan Wall Mirror',  price: '$86' },
  { name: 'Cotton Table Runner', price: '$19' },
  { name: 'Pebble Soap Dish',    price: '$14' },
];

/* ── Render catalog ─────────────────────────────────────── */
function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(({ name, price }) => `
    <article class="product-card">
      <div class="product-card__image" role="img" aria-label="${name}"></div>
      <div class="product-card__body">
        <h3 class="product-card__name">${name}</h3>
        <p class="product-card__price">${price}</p>
      </div>
    </article>
  `).join('');
}

/* ── Contact form ───────────────────────────────────────── */
async function handleContactSubmit(e) {
  e.preventDefault();

  const form   = e.target;
  const status = document.getElementById('formStatus');
  const btn    = form.querySelector('button[type="submit"]');

  const payload = {
    name:    form.name.value.trim(),
    email:   form.email.value.trim(),
    phone:   form.phone.value.trim(),
    message: form.message.value.trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    setStatus(status, 'Please fill in all required fields.', 'error');
    return;
  }

  btn.disabled = true;
  setStatus(status, 'Sending…', '');

  try {
    const res = await fetch(`${API_BASE}/contacts`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus(status, 'Thank you! We will be in touch shortly.', 'success');
      form.reset();
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus(status, data.error || 'Something went wrong. Please try again.', 'error');
    }
  } catch {
    setStatus(status, 'Unable to reach the server. Please try again later.', 'error');
  } finally {
    btn.disabled = false;
  }
}

function setStatus(el, text, type) {
  el.textContent = text;
  el.className   = 'form__status' + (type ? ` form__status--${type}` : '');
}

/* ── Footer year ─────────────────────────────────────────── */
function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Init ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  setFooterYear();
  document.getElementById('contactForm')?.addEventListener('submit', handleContactSubmit);
});
