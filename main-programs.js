/* ===== CONTACT FORM ===== */
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzjTFrHgEG01mmEsZgLy-LVrkUlrMOqdrHyUsG-mSOsXzZYXlicNJP7-ubRocYujSIY/exec';

document.getElementById('hubContactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const btn = document.getElementById('hubSubmitBtn');
  btn.disabled = true;
  btn.textContent = 'שולח...';

  const data = {
    type: 'hub-contact',
    name:    document.getElementById('hname').value,
    phone:   document.getElementById('hphone').value,
    message: document.getElementById('hmsg').value,
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    document.getElementById('hubContactForm').style.display = 'none';
    document.getElementById('hubSuccess').style.display = 'block';
  } catch (err) {
    btn.disabled = false;
    btn.textContent = 'שלח פרטים';
    alert('שגיאה בשליחה, נסה שוב');
  }
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ===== GSAP - Programs Hub ===== */
gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-logo',   { duration: 0.9, y: -30, opacity: 0, ease: 'power3.out' });
gsap.from('.hub-title',   { duration: 1,   y: 30,  opacity: 0, ease: 'power3.out', delay: 0.3 });
gsap.from('.hub-subtitle',{ duration: 0.8, y: 20,  opacity: 0, ease: 'power2.out', delay: 0.5 });

gsap.utils.toArray('.hub-card').forEach((el, i) => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
    duration: 0.7, y: 50, opacity: 0, ease: 'power2.out', delay: i * 0.12
  });
});

gsap.from('.hub-unsure', {
  scrollTrigger: { trigger: '.hub-unsure', start: 'top 90%', toggleActions: 'play none none none' },
  duration: 0.6, y: 20, opacity: 0, ease: 'power2.out'
});

// Parallax glows
document.addEventListener('mousemove', e => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  gsap.to('.glow-1', { x: x * 40,  y: y * 40,  duration: 1.5, ease: 'power1.out' });
  gsap.to('.glow-2', { x: -x * 30, y: -y * 30, duration: 1.5, ease: 'power1.out' });
});
