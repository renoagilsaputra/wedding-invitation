let lastY = 0;

window.addEventListener("scroll", () => {
    const parallax = document.querySelector(".parallax-bg");
    if (!parallax) return;

    const rect = parallax.parentElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
        let target = (rect.top / windowHeight) * -30;

        // smoothing
        lastY += (target - lastY) * 0.1;

        parallax.style.transform = `translateY(${lastY}px)`;
    }
});