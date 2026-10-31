document.addEventListener('DOMContentLoaded', () => {
    // Hero headshot: fade + slide up once loaded
    const headshot = document.querySelector('.headshot');
    if (headshot) {
        const show = () => requestAnimationFrame(() => headshot.classList.add('show'));
        headshot.complete ? show() : headshot.addEventListener('load', show, { once: true });
        setTimeout(show, 2500);
    }

    // Mobile menu
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('nav-links');
    if (toggle && links) {
        toggle.addEventListener('click', () => {
            const open = links.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        links.addEventListener('click', e => {
            if (e.target.closest('a')) { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
        });
    }

    // Before/after photos: tap to toggle (hover already works on desktop)
    document.querySelectorAll('.swap').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.setAttribute('aria-pressed', btn.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        });
    });

    // Back to top
    const top = document.getElementById('backToTop');
    if (top) {
        const onScroll = () => top.classList.toggle('show', window.scrollY > 500);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});
