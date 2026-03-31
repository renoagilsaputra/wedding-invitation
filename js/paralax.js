let lastY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (ticking) return;

    ticking = true;
    requestAnimationFrame(() => {
        const parallax = document.querySelector('.parallax-bg');
        if (parallax) {
            const rect         = parallax.parentElement.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const target = (rect.top / windowHeight) * -30;
                lastY += (target - lastY) * 0.1;
                parallax.style.transform = `translateY(${lastY}px)`;
            }
        }
        ticking = false;
    });
});
