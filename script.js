/* ============ DATA ============ */
const PRODUCTS = [
  { id:'aura',   name:'Aura X1 Headphones', cat:'audio',    price:249, old:299, rating:4.9, reviews:812, tag:'Bestseller', emoji:'🎧',
    img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
  { id:'chrono', name:'Chrono Prime Watch', cat:'wearable', price:399, old:null, rating:4.8, reviews:236, tag:'Limited', emoji:'⌚',
    img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
  { id:'pulse',  name:'Pulse Buds Pro',     cat:'audio',    price:149, old:179, rating:4.7, reviews:540, tag:'New', emoji:'🎵',
    img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80' },
  { id:'vision', name:'Vision Smart Shades',cat:'style',    price:189, old:null, rating:4.6, reviews:198, tag:'Trending', emoji:'🕶',
    img:'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80' },
  { id:'zoom',   name:'Lens Cam Mark II',   cat:'gear',     price:549, old:629, rating:4.9, reviews:121, tag:'Pro', emoji:'📷',
    img:'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80' },
  { id:'stride', name:'Stride Neo Sneakers',cat:'style',    price:169, old:null, rating:4.7, reviews:402, tag:'Hot', emoji:'👟',
    img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
  { id:'key',    name:'Hexa Mech Keyboard', cat:'gear',     price:129, old:159, rating:4.8, reviews:365, tag:'RGB', emoji:'⌨',
    img:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80' },
  { id:'phone',  name:'Nova Fold Phone',    cat:'gear',     price:899, old:999, rating:4.6, reviews:88,  tag:'Flagship', emoji:'📱',
    img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80' },
];
const FREE_SHIP = 99, SHIP_FEE = 9;

const DETAILS = {
  aura:   { desc:'Flagship over-ear headphones with adaptive noise cancelling and a spatial 3D sound stage that follows your head.',
            specs:[['Noise cancelling','Up to 60 dB'],['Battery','48 hours'],['Connection','Bluetooth 6, multipoint'],['Weight','248 g']] },
  chrono: { desc:'A titanium smartwatch with sapphire glass and a holographic face that reacts to your pulse. Limited to 500 units.',
            specs:[['Case','Grade 5 titanium'],['Display','1.9" AMOLED, sapphire'],['Battery','7 days'],['Water rating','10 ATM']] },
  pulse:  { desc:'Compact true-wireless earbuds with studio-grade drivers, adaptive transparency and a pocketable charging case.',
            specs:[['Drivers','11 mm dynamic'],['Battery','8 h + 32 h case'],['Charging','USB-C, wireless'],['Water rating','IPX5']] },
  vision: { desc:'Lightweight smart shades with open-ear speakers, photochromic lenses and touch controls on the temple.',
            specs:[['Lenses','Photochromic, UV400'],['Audio','Open-ear speakers'],['Battery','10 hours'],['Weight','42 g']] },
  zoom:   { desc:'A pocket mirrorless camera with a stabilised 1" sensor, 4K 120 fps video and instant wireless transfer.',
            specs:[['Sensor','1" stacked CMOS'],['Video','4K up to 120 fps'],['Stabilisation','5-axis'],['Storage','UHS-II card slot']] },
  stride: { desc:'Everyday sneakers with a responsive foam sole, recycled knit upper and a reflective accent trim.',
            specs:[['Upper','Recycled knit'],['Sole','Responsive foam'],['Weight','260 g (size 42)'],['Care','Machine washable']] },
  key:    { desc:'A hot-swappable mechanical keyboard with per-key RGB, a CNC aluminium frame and a tactile gasket mount.',
            specs:[['Layout','75%, hot-swap'],['Frame','CNC aluminium'],['Lighting','Per-key RGB'],['Connection','USB-C, wireless']] },
  phone:  { desc:'A foldable flagship with a seamless inner display, titanium hinge and an all-day battery.',
            specs:[['Display','7.6" foldable OLED'],['Hinge','Titanium'],['Battery','4,800 mAh'],['Charging','65 W wired']] },
};

/* ============ HELPERS ============ */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => '$' + n.toLocaleString('en-US');
const byId = id => PRODUCTS.find(p => p.id === id);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============ PRODUCTS ============ */
const grid = $('#products');

function stars(r){ const f = Math.round(r); return '★'.repeat(f) + '☆'.repeat(5 - f); }

function productCard(p, i){
  return `
  <article class="card tilt" data-cat="${p.cat}" data-open="${p.id}" tabindex="0" role="button" aria-label="View ${p.name}" style="animation-delay:${i * 70}ms">
    <div class="card-media">
      <span class="tag">${p.tag}</span>
      <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.parentElement.classList.add('fallback');this.replaceWith(document.createTextNode('${p.emoji}'))">
    </div>
    <div class="card-body">
      <div class="card-cat">${p.cat}</div>
      <h3 class="card-title">${p.name}</h3>
      <div class="stars">${stars(p.rating)}<em>${p.rating} (${p.reviews})</em></div>
      <div class="card-foot">
        <div class="price">${money(p.price)}${p.old ? `<s>${money(p.old)}</s>` : ''}</div>
        <button class="add" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button>
      </div>
    </div>
  </article>`;
}

function renderProducts(filter = 'all'){
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  grid.innerHTML = list.map(productCard).join('');
  bindTilt($$('.card', grid));
}

$('#filters').addEventListener('click', e => {
  const b = e.target.closest('.filter'); if (!b) return;
  $$('.filter').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  renderProducts(b.dataset.filter);
});

/* ============ CART ============ */
let cart = [];
try { cart = JSON.parse(localStorage.getItem('nexus-cart')) || []; } catch(_) {}
const save = () => { try { localStorage.setItem('nexus-cart', JSON.stringify(cart)); } catch(_) {} };

const drawer = $('#drawer'), overlay = $('#overlay');
const openCart  = () => { drawer.classList.add('open'); overlay.classList.add('open'); };
const closeCart = () => { drawer.classList.remove('open'); overlay.classList.remove('open'); };
$('#cartBtn').addEventListener('click', openCart);
$('#closeCart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
addEventListener('keydown', e => { if (e.key === 'Escape'){ closeCart(); closeModal(); } });

function addToCart(id){
  const item = cart.find(i => i.id === id);
  item ? item.qty++ : cart.push({ id, qty: 1 });
  save(); renderCart();
  const btn = $('#cartBtn'); btn.classList.remove('bump'); void btn.offsetWidth; btn.classList.add('bump');
  toast(`${byId(id).name} added to cart`);
}

function renderCart(){
  const wrap = $('#cartItems');
  const count = cart.reduce((s, i) => s + i.qty, 0);
  $('#cartCount').textContent = count;

  if (!cart.length){
    wrap.innerHTML = `<div class="empty"><span>🛸</span>Your cart is floating empty.</div>`;
  } else {
    wrap.innerHTML = cart.map(i => {
      const p = byId(i.id);
      return `
      <div class="line">
        <img src="${p.img}" alt="${p.name}" onerror="this.outerHTML='<div class=ph></div>'">
        <div>
          <h4>${p.name}</h4>
          <small>${money(p.price)}</small>
          <div class="qty">
            <button data-dec="${p.id}" aria-label="Decrease">−</button>
            <span>${i.qty}</span>
            <button data-inc="${p.id}" aria-label="Increase">+</button>
          </div>
        </div>
        <button class="rm" data-rm="${p.id}">Remove</button>
      </div>`;
    }).join('');
  }

  const sub = cart.reduce((s, i) => s + byId(i.id).price * i.qty, 0);
  const ship = !cart.length ? 0 : (sub >= FREE_SHIP ? 0 : SHIP_FEE);
  $('#cartSubtotal').textContent = money(sub);
  $('#cartShip').textContent = !cart.length ? '—' : (ship ? money(ship) : 'Free');
  $('#cartTotal').textContent = money(sub + ship);
}

$('#cartItems').addEventListener('click', e => {
  const t = e.target;
  const inc = t.dataset.inc, dec = t.dataset.dec, rm = t.dataset.rm;
  if (inc) cart.find(i => i.id === inc).qty++;
  if (dec){ const it = cart.find(i => i.id === dec); it.qty--; if (it.qty <= 0) cart = cart.filter(i => i.id !== dec); }
  if (rm)  cart = cart.filter(i => i.id !== rm);
  if (inc || dec || rm){ save(); renderCart(); }
});

document.addEventListener('click', e => {
  const b = e.target.closest('[data-add]'); if (b) addToCart(b.dataset.add);
});

$('#checkoutBtn').addEventListener('click', () => {
  if (!cart.length) return toast('Add something first');
  toast('Checkout is a demo — connect a payment provider to go live');
});

/* ============ TOAST ============ */
let toastTimer;
function toast(msg){
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

/* ============ 3D TILT ============ */
function bindTilt(els){
  if (reduceMotion) return;
  els.forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      el.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) translateZ(10px)`;
    });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  });
}

/* Hero card follows pointer */
const stage = $('#heroStage'), heroCard = $('#heroCard');
if (!reduceMotion){
  stage.addEventListener('mousemove', e => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - .5;
    const y = (e.clientY - r.top)  / r.height - .5;
    heroCard.style.transform = `rotateY(${x * 24}deg) rotateX(${-y * 24}deg)`;
  });
  stage.addEventListener('mouseleave', () => { heroCard.style.transform = ''; });
}

/* Cursor glow */
const glow = $('#cursorGlow');
addEventListener('pointermove', e => { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px'; });

/* Nav shadow */
addEventListener('scroll', () => $('#nav').classList.toggle('scrolled', scrollY > 30), { passive:true });

/* ============ REVEAL + COUNTERS ============ */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

function countUp(el){
  const target = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
  const start = performance.now(), dur = 1600;
  (function step(now){
    const p = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * e).toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  })(start);
}
$$('[data-count]').forEach(countUp);

/* ============ COUNTDOWN ============ */
const dropEnd = new Date(); dropEnd.setDate(dropEnd.getDate() + 9); dropEnd.setHours(20, 0, 0, 0);
const pad = n => String(n).padStart(2, '0');
function tick(){
  let d = Math.max(0, dropEnd - Date.now());
  const D = Math.floor(d / 864e5); d %= 864e5;
  const H = Math.floor(d / 36e5);  d %= 36e5;
  const M = Math.floor(d / 6e4);   d %= 6e4;
  $('#tD').textContent = pad(D); $('#tH').textContent = pad(H);
  $('#tM').textContent = pad(M); $('#tS').textContent = pad(Math.floor(d / 1e3));
}
tick(); setInterval(tick, 1000);

/* ============ NEWSLETTER ============ */
$('#joinForm').addEventListener('submit', e => {
  e.preventDefault();
  $('#joinMsg').textContent = 'Welcome to the orbit! Check your inbox for 10% off.';
  e.target.reset();
});

/* ============ THREE.JS BACKGROUND ============ */
function initThree(){
  if (typeof THREE === 'undefined' || reduceMotion) return;
  const canvas = $('#bg3d');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, 1, .1, 100);
  camera.position.z = 14;

  // particle field
  const N = 900, pos = new Float32Array(N * 3);
  for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - .5) * 60;
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(pg, new THREE.PointsMaterial({ color:0x8fdcff, size:.07, transparent:true, opacity:.8 }));
  scene.add(stars);

  // floating wireframe shapes
  const shapes = [];
  const geos = [new THREE.IcosahedronGeometry(1.3, 0), new THREE.OctahedronGeometry(1.1), new THREE.TorusGeometry(1, .28, 12, 40), new THREE.TetrahedronGeometry(1.2), new THREE.TorusKnotGeometry(.8, .25, 80, 10)];
  const colors = [0x22e6ff, 0x8b5cff, 0xff4fd8];
  for (let i = 0; i < 12; i++){
    const m = new THREE.Mesh(geos[i % geos.length], new THREE.MeshBasicMaterial({ color:colors[i % 3], wireframe:true, transparent:true, opacity:.45 }));
    m.position.set((Math.random() - .5) * 28, (Math.random() - .5) * 18, (Math.random() - .5) * 10 - 3);
    m.userData = { rx:(Math.random() - .5) * .01, ry:(Math.random() - .5) * .01, fy:Math.random() * 6, sp:.3 + Math.random() * .6, y0:m.position.y };
    scene.add(m); shapes.push(m);
  }

  // lets the theme toggle recolour the background scene
  window.__bgTheme = light => {
    stars.material.color.set(light ? 0x4b3fd0 : 0x8fdcff);
    stars.material.opacity = light ? .6 : .8;
    shapes.forEach(s => { s.material.opacity = light ? .6 : .45; });
  };
  window.__bgTheme(document.documentElement.dataset.theme === 'light');

  let mx = 0, my = 0, sy = 0;
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });
  addEventListener('scroll', () => { sy = scrollY; }, { passive:true });

  function resize(){
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  const clock = new THREE.Clock();
  (function loop(){
    const t = clock.getElapsedTime();
    shapes.forEach(s => {
      s.rotation.x += s.userData.rx + .002; s.rotation.y += s.userData.ry + .003;
      s.position.y = s.userData.y0 + Math.sin(t * s.userData.sp + s.userData.fy) * 1.1;
    });
    stars.rotation.y = t * .01;
    camera.position.x += (mx * 3 - camera.position.x) * .04;
    camera.position.y += (-my * 2 - sy * .004 - camera.position.y) * .04;
    camera.lookAt(0, -sy * .002, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  })();
}

/* ============ THEME TOGGLE ============ */
const themeBtn = $('#themeBtn');
function applyTheme(mode){
  const light = mode === 'light';
  if (light) document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  themeBtn.textContent = light ? '☀' : '☾';
  if (window.__bgTheme) window.__bgTheme(light);
}
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('nexus-theme', next); } catch(_) {}
  applyTheme(next);
});

/* ============ PRODUCT DETAIL MODAL ============ */
const modal = $('#modal');
let modalId = null, lastFocus = null;

function openModal(id){
  const p = byId(id), d = DETAILS[id]; if (!p) return;
  modalId = id; lastFocus = document.activeElement;
  $('#mCat').textContent = p.cat;
  $('#mTitle').textContent = p.name;
  $('#mStars').innerHTML = `${stars(p.rating)}<em>${p.rating} (${p.reviews} reviews)</em>`;
  $('#mDesc').textContent = d ? d.desc : '';
  $('#mSpecs').innerHTML = d ? d.specs.map(([k, v]) => `<li><span>${k}</span><b>${v}</b></li>`).join('') : '';
  $('#mPrice').innerHTML = `${money(p.price)}${p.old ? `<s>${money(p.old)}</s>` : ''}`;
  const media = $('#mMedia');
  media.innerHTML = `<img src="${p.img}" alt="${p.name}" onerror="this.replaceWith(document.createTextNode('${p.emoji}'))">`;
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  $('#modalClose').focus();
}
function closeModal(){
  if (!modal.classList.contains('open')) return;
  modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocus) lastFocus.focus();
}
grid.addEventListener('click', e => {
  if (e.target.closest('.add')) return;           // the + button adds to cart instead
  const c = e.target.closest('[data-open]'); if (c) openModal(c.dataset.open);
});
grid.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-open]')){
    e.preventDefault(); openModal(e.target.dataset.open);
  }
});
$('#modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
$('#mAdd').addEventListener('click', () => { if (modalId){ addToCart(modalId); closeModal(); openCart(); } });

const mMedia = $('#mMedia');
if (!reduceMotion){
  mMedia.addEventListener('mousemove', e => {
    const r = mMedia.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    mMedia.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  });
  mMedia.addEventListener('mouseleave', () => { mMedia.style.transform = ''; });
}

/* ============ INTERACTIVE 3D MODEL ============ */
function initModel(){
  const canvas = $('#modelCanvas'); if (!canvas) return;
  if (typeof THREE === 'undefined'){
    canvas.parentElement.insertAdjacentHTML('beforeend', '<p style="position:absolute;inset:0;display:grid;place-items:center;color:var(--muted)">3D view needs WebGL.</p>');
    return;
  }
  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 50);
  camera.position.set(0, .2, 9);

  scene.add(new THREE.AmbientLight(0xffffff, .75));
  const key = new THREE.DirectionalLight(0xffffff, 1.1); key.position.set(4, 5, 6); scene.add(key);
  const rim1 = new THREE.PointLight(0x22e6ff, 1.6, 30); rim1.position.set(-6, 2, 3); scene.add(rim1);
  const rim2 = new THREE.PointLight(0xff4fd8, 1.4, 30); rim2.position.set(6, -2, -3); scene.add(rim2);

  const bodyMat = new THREE.MeshStandardMaterial({ color:0x8b5cff, metalness:.55, roughness:.3 });
  const padMat  = new THREE.MeshStandardMaterial({ color:0x15172e, metalness:.1, roughness:.9 });
  const glowMat = new THREE.MeshBasicMaterial({ color:0x22e6ff });

  const headphones = new THREE.Group();

  // headband (upper half of a torus) + soft inner band
  const band = new THREE.Mesh(new THREE.TorusGeometry(1.55, .13, 24, 90, Math.PI), bodyMat);
  headphones.add(band);
  const pad = new THREE.Mesh(new THREE.TorusGeometry(1.43, .08, 16, 90, Math.PI * .6), padMat);
  pad.rotation.z = Math.PI * .2; headphones.add(pad);

  // ear cups
  [-1, 1].forEach(side => {
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(.82, .82, .5, 56), bodyMat);
    cup.rotation.z = Math.PI / 2; cup.position.set(side * 1.62, -.25, 0); headphones.add(cup);

    const cushion = new THREE.Mesh(new THREE.TorusGeometry(.62, .2, 20, 48), padMat);
    cushion.rotation.y = Math.PI / 2; cushion.position.set(side * 1.28, -.25, 0); headphones.add(cushion);

    const ring = new THREE.Mesh(new THREE.TorusGeometry(.5, .04, 12, 64), glowMat);
    ring.rotation.y = Math.PI / 2; ring.position.set(side * 1.9, -.25, 0); headphones.add(ring);

    const yoke = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, .55, 16), bodyMat);
    yoke.position.set(side * 1.55, .2, 0); headphones.add(yoke);
  });
  scene.add(headphones);

  // floating halo
  const halo = new THREE.Mesh(new THREE.TorusGeometry(3, .015, 8, 120), new THREE.MeshBasicMaterial({ color:0x8b5cff, transparent:true, opacity:.5 }));
  halo.rotation.x = Math.PI / 2.4; scene.add(halo);

  // drag to rotate, with inertia and auto-spin when idle
  let rotY = -.5, rotX = .12, velY = 0, dragging = false, lastX = 0, lastY = 0, idle = 0;
  canvas.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; lastY = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => {
    if (!dragging) return;
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    velY = dx * .01; rotY += velY; rotX = Math.max(-.7, Math.min(.7, rotX + dy * .006));
    lastX = e.clientX; lastY = e.clientY; idle = 0;
  });
  const stop = () => { dragging = false; };
  canvas.addEventListener('pointerup', stop); canvas.addEventListener('pointercancel', stop);

  // finish swatches
  $('#swatches').addEventListener('click', e => {
    const b = e.target.closest('.swatch'); if (!b) return;
    $$('.swatch').forEach(s => s.classList.remove('active')); b.classList.add('active');
    bodyMat.color.set(b.dataset.color); glowMat.color.set(b.dataset.glow);
  });

  function resize(){
    const w = canvas.clientWidth, h = canvas.clientHeight; if (!w || !h) return;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas); resize();

  let visible = true;
  new IntersectionObserver(en => { visible = en[0].isIntersecting; }).observe(canvas);

  const clock = new THREE.Clock();
  (function loop(){
    requestAnimationFrame(loop);
    if (!visible) return;
    const t = clock.getElapsedTime();
    if (!dragging){ velY *= .95; rotY += velY; idle++; if (idle > 90 && !reduceMotion) rotY += .006; }
    headphones.rotation.y = rotY; headphones.rotation.x = rotX;
    headphones.position.y = reduceMotion ? 0 : Math.sin(t * 1.4) * .12;
    halo.rotation.z = t * .3;
    renderer.render(scene, camera);
  })();
}

/* ============ INIT ============ */
renderProducts();
renderCart();
bindTilt($$('.feature'));
initThree();
initModel();
applyTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');