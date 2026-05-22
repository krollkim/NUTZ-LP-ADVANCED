/* ===== FAQ Toggle ===== */
function toggleFaq(el) {
  const item = el.parentElement;
  const answer = item.querySelector('.faq-a');
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight = '0';
  });

  if (!isOpen) {
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

/* ===== FORM SUBMIT ===== */
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzjTFrHgEG01mmEsZgLy-LVrkUlrMOqdrHyUsG-mSOsXzZYXlicNJP7-ubRocYujSIY/exec';

document.getElementById('leadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'שולח...';

  const data = {
    type: 'plans',
    name: document.getElementById('fname').value,
    phone: document.getElementById('fphone').value,
    track: document.getElementById('ftrack').value,
    experience: document.getElementById('fexp').value,
    message: document.getElementById('fmsg').value,
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    document.getElementById('leadForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';

  } catch (err) {
    console.error('Form error:', err);
    btn.disabled = false;
    btn.textContent = 'שלח מועמדות';
    alert('שגיאה בשליחה, נסה שוב או פנה אלינו ישירות');
  }
});

/* ===== GSAP ANIMATIONS ===== */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hero entrance
gsap.from('.hero-logo',      { duration: 1,   y: -40, opacity: 0, ease: 'power3.out' });
gsap.from('.hero-badge',     { duration: 0.8, y: 20,  opacity: 0, ease: 'power2.out', delay: 0.3 });
gsap.from('.hero h1',        { duration: 1,   y: 30,  opacity: 0, ease: 'power3.out', delay: 0.4 });
gsap.from('.hero-subtitle',  { duration: 0.8, y: 25,  opacity: 0, ease: 'power2.out', delay: 0.6 });
gsap.from('.hero-cta-group', { duration: 0.8, y: 25,  opacity: 0, ease: 'power2.out', delay: 0.8 });

// Section titles + descs
gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    duration: 0.8, y: 40, opacity: 0, ease: 'power2.out'
  });
});

gsap.utils.toArray('.section-desc').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    duration: 0.8, y: 30, opacity: 0, ease: 'power2.out', delay: 0.15
  });
});

// Cards stagger
gsap.utils.toArray('.process-card, .price-card').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    duration: 0.7, y: 50, opacity: 0, ease: 'power2.out', delay: i % 3 * 0.15
  });
});

// FAQ items
gsap.utils.toArray('.faq-item').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    duration: 0.6, y: 30, opacity: 0, ease: 'power2.out', delay: i * 0.1
  });
});

// About
gsap.from('.about-inner', {
  scrollTrigger: { trigger: '.about-inner', start: 'top 80%', toggleActions: 'play none none none' },
  duration: 0.9, y: 50, opacity: 0, ease: 'power2.out'
});

// Form card
gsap.from('.form-card', {
  scrollTrigger: { trigger: '.form-card', start: 'top 80%', toggleActions: 'play none none none' },
  duration: 0.9, y: 50, opacity: 0, ease: 'power2.out'
});

// Parallax glows on mouse move
document.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  gsap.to('.glow-1', { x: x * 40,  y: y * 40,  duration: 1.5, ease: 'power1.out' });
  gsap.to('.glow-2', { x: -x * 30, y: -y * 30, duration: 1.5, ease: 'power1.out' });
});

// FAQ mascot — entrance + continuous float
gsap.set('.faq-mascot', { y: -60, opacity: 0 });
ScrollTrigger.create({
  trigger: '.faq-section',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    gsap.to('.faq-mascot', {
      y: 0, opacity: 1, duration: 1, ease: 'back.out(1.7)',
      onComplete: () => {
        gsap.to('.faq-mascot', { y: -14, duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true });
        gsap.to('.faq-mascot', { rotation: 4, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.4 });
      }
    });
  }
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) gsap.to(window, { duration: 0.6, scrollTo: { y: t, offsetY: 20 }, ease: 'power2.inOut' });
  });
});
