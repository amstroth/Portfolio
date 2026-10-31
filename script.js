// Mark that JS is running so CSS can set up entrance animations safely.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Hero headshot entrance ---------- */
    const headshot = document.querySelector('.headshot');
    const reveal = () => requestAnimationFrame(() => document.documentElement.classList.add('is-loaded'));
    if (headshot && !headshot.complete) {
        headshot.addEventListener('load', reveal, { once: true });
        headshot.addEventListener('error', reveal, { once: true });
        setTimeout(reveal, 2500); // never leave the hero hidden
    } else {
        reveal();
    }

    /* ---------- Mobile nav ---------- */
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
        const close = () => { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); };
        toggle.addEventListener('click', () => {
            const open = links.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        links.addEventListener('click', e => { if (e.target.closest('a')) close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }

    /* ---------- Active nav link while scrolling ---------- */
    const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const sections = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(s => io.observe(s));
    }

    /* ---------- Before / after sliders ---------- */
    document.querySelectorAll('.compare').forEach(fig => {
        const range = fig.querySelector('.compare-range');
        if (!range) return;
        const set = () => fig.style.setProperty('--pos', range.value + '%');
        range.addEventListener('input', set);
        set();
    });

    /* ---------- Scroll reveal ---------- */
    const revealables = document.querySelectorAll(
        '.section-title, .compare, .retouch-note, .photo-feature, .video-item, .brand-grid > *, .brand-cloud, .zine, .typeface, .gallery img, .ui-item, .web-card, .project'
    );
    if ('IntersectionObserver' in window) {
        const ro = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) { entry.target.classList.add('in'); obs.unobserve(entry.target); }
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        revealables.forEach(el => { el.classList.add('reveal'); ro.observe(el); });
    }

    /* ---------- Back to top ---------- */
    const btn = document.getElementById('backToTop');
    if (btn) {
        const onScroll = () => btn.classList.toggle('show', window.scrollY > 600);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ---------- Footer year ---------- */
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    /* ---------- Pause the looping clip when off-screen ---------- */
    document.querySelectorAll('video[autoplay]').forEach(v => {
        if (!('IntersectionObserver' in window)) return;
        new IntersectionObserver(([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); }).observe(v);
    });
});
