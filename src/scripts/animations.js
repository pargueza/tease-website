---
import '../styles/global.css';
import type { ImageMetadata } from 'astro';
import FallbackImage from '../assets/blog-placeholder-1.jpg';
import { SITE_TITLE } from '../consts';
import { Font } from 'astro:assets';

interface Props {
  title: string;
  description: string;
  image?: ImageMetadata;
}

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
const { title, description, image = FallbackImage } = Astro.props;
---

<!-- Global Metadata -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" href="/favicon.ico" />
<link rel="sitemap" href="/sitemap-index.xml" />
<link rel="alternate" type="application/rss+xml" title={SITE_TITLE} href={new URL('rss.xml', Astro.site)} />
<meta name="generator" content={Astro.generator} />

<Font cssVariable="--font-atkinson" preload />

<!-- Canonical URL -->
<link rel="canonical" href={canonicalURL} />

<!-- Primary Meta Tags -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={new URL(image.src, Astro.url)} />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={Astro.url} />
<meta property="twitter:title" content={title} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={new URL(image.src, Astro.url)} />

<!-- Animations -->
<script is:inline>
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

document.addEventListener('astro:page-load', initAnimations);

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
</script>