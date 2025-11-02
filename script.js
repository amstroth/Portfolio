const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (backToTopBtn) {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    });
}