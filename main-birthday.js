/* ===== COUNTDOWN TIMER ===== */
const deadline = new Date('2026-06-03T23:59:00+03:00');

function updateCountdown() {
  const now = new Date();
  const diff = deadline - now;

  if (diff <= 0) {
    document.getElementById('countdown-wrap').style.display = 'none';
    document.getElementById('countdown-ended').style.display = 'block';
    document.getElementById('hero-cta').style.display = 'none';
    document.getElementById('urgency-strip').style.display = 'none';
    // Disable all sale CTAs
    document.querySelectorAll('.sale-cta').forEach(btn => {
      btn.style.opacity = '0.4';
      btn.style.pointerEvents = 'none';
      btn.textContent = 'המבצע הסתיים';
    });
    document.getElementById('birthdaySubmitBtn').disabled = true;
    document.getElementById('birthdaySubmitBtn').textContent = 'המבצע הסתיים';
    return;
  }

  const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent    = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');

  const urgency = document.getElementById('urgency-days');
  if (urgency) urgency.textContent = days;
}

setInterval(updateCountdown, 1000);
updateCountdown();

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

document.getElementById('birthdayForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('birthdaySubmitBtn');
  btn.disabled = true;
  btn.textContent = 'שולח...';

  const data = {
    type: 'birthday-sale',
    name:       document.getElementById('bname').value,
    phone:      document.getElementById('bphone').value,
    track:      document.getElementById('btrack').value,
    message:    document.getElementById('bmsg').value,
    timestamp:  new Date().toISOString()
  };

  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    document.getElementById('birthdayForm').style.display = 'none';
    document.getElementById('birthdaySuccess').style.display = 'block';

  } catch (err) {
    console.error('Form error:', err);
    btn.disabled = false;
    btn.textContent = 'שליחת פרטים 🎂';
    alert('שגיאה בשליחה, נסה שוב');
  }
});

/* ===== GSAP ANIMATIONS ===== */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.from('.hero-logo',     { duration: 0.9, y: -30, opacity: 0, ease: 'power3.out' });
gsap.from('.bday-badge',    { duration: 0.8, y: 20,  opacity: 0, ease: 'power2.out', delay: 0.3 });
gsap.from('.hero h1',       { duration: 1,   y: 30,  opacity: 0, ease: 'power3.out', delay: 0.4 });
gsap.from('.liav-quote',    { duration: 0.9, y: 30,  opacity: 0, ease: 'power2.out', delay: 0.6 });
gsap.from('.countdown-wrap',{ duration: 0.8, y: 20,  opacity: 0, ease: 'power2.out', delay: 0.8 });
gsap.from('#hero-cta',      { duration: 0.7, y: 20,  opacity: 0, ease: 'power2.out', delay: 1.0 });

gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    duration: 0.8, y: 40, opacity: 0, ease: 'power2.out'
  });
});

gsap.utils.toArray('.price-card').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    duration: 0.7, y: 50, opacity: 0, ease: 'power2.out', delay: i % 3 * 0.15
  });
});

gsap.utils.toArray('.faq-item').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
    duration: 0.6, y: 30, opacity: 0, ease: 'power2.out', delay: i * 0.1
  });
});

gsap.from('.form-card', {
  scrollTrigger: { trigger: '.form-card', start: 'top 80%', toggleActions: 'play none none none' },
  duration: 0.9, y: 50, opacity: 0, ease: 'power2.out'
});

document.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  gsap.to('.glow-1', { x: x * 40,  y: y * 40,  duration: 1.5, ease: 'power1.out' });
  gsap.to('.glow-2', { x: -x * 30, y: -y * 30, duration: 1.5, ease: 'power1.out' });
});

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) gsap.to(window, { duration: 0.6, scrollTo: { y: t, offsetY: 20 }, ease: 'power2.inOut' });
  });
});
