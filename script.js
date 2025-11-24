// JS (put this at the end of <body> or wrap in DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('backToTop');
  if (!btn) return console.warn('#backToTop not found');

  // Use .app if it exists; otherwise use the document/window
  const container = document.querySelector('.app');
  const usesWindow = !container;

  const getScrollTop = () =>
    usesWindow
      ? (window.scrollY || document.documentElement.scrollTop)
      : container.scrollTop;

  const scrollToTop = () =>
    usesWindow
      ? window.scrollTo({ top: 0, behavior: 'smooth' })
      : container.scrollTo({ top: 0, behavior: 'smooth' });

  const onScroll = () => {
    btn.classList.toggle('show', getScrollTop() > 300);
  };

  // Listen on the correct scroller
  (usesWindow ? window : container).addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // set initial state

  btn.addEventListener('click', scrollToTop);
});

window.addEventListener("load", () => {
    document.querySelector(".headshot").style.opacity = "1";
});

window.addEventListener("load", () => {
    document.querySelector(".headshot").classList.add("show");
});
