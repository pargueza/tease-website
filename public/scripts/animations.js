function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// Run on initial load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

// Run on Astro page transitions
document.addEventListener('astro:page-load', initAnimations);

// Cursor trail
function initCursorTrail() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const trail = document.createElement('div');
  trail.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: #C8A96E;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(trail);

  let timeout;
  document.addEventListener('mousemove', (e) => {
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.opacity = '0.9';

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      trail.style.opacity = '0';
    }, 800);
  });
}

initCursorTrail();