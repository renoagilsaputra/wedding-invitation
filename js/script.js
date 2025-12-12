document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector("#open-invitation-btn");
    const audioPlayer = document.getElementById("bg-music");
    const soundToggleButton = document.getElementById("music-btn");
    const musicIcon = document.getElementById("music-icon");

    // TOMBOL BUKA UNDANGAN
    button.addEventListener("click", function (e) {
        e.preventDefault();

        // Play musik saat undangan dibuka
        audioPlayer.volume = 1.0;
        audioPlayer.play().catch(err => console.log("Autoplay blocked:", err));

        musicIcon.className = "fa fa-volume-off";

        // Tampilkan semua section selain hero
        const allSections = document.querySelectorAll("section:not(.hero)");
        allSections.forEach(sec => sec.classList.add("show"));

        // Scroll ke section pertama
        if (allSections.length > 0) {
            allSections[0].scrollIntoView({
                behavior: "smooth"
            });
        }
    });

    // QUERY PARAM 'to'
    const urlParams = new URLSearchParams(window.location.search);
    const to = urlParams.get("to");
    if (to) {
        document.getElementById("invited-guest").textContent = to;
    }

    // FLOATING BUTTON UNTUK PLAY/PAUSE MUSIK
    soundToggleButton.addEventListener("click", function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            musicIcon.className = "fa fa-volume-off";
        } else {
            audioPlayer.pause();
            musicIcon.className = "fa fa-volume-up";
        }
    });

    AOS.init();

    // Slider with thumbnail
    document.querySelectorAll('.thumb').forEach(el => {
        el.onclick = () => {
            document.getElementById('mainPreview').src = el.src;
        };
    });

});

(function () {
    const lazyImages = [].slice.call(document.querySelectorAll('.lazy'));
    const lazySources = [].slice.call(document.querySelectorAll('source[data-srcset]'));

    if ('IntersectionObserver' in window) {
        const config = {
            root: null,
            rootMargin: '200px',
            threshold: 0.01
        };
        const onIntersection = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // handle <img>
                    if (entry.target.tagName.toLowerCase() === 'img') {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                        }
                        // handle srcset on picture > source earlier
                    }
                    // handle <source> elements
                    if (entry.target.tagName.toLowerCase() === 'source') {
                        const source = entry.target;
                        const srcset = source.getAttribute('data-srcset');
                        if (srcset) {
                            source.setAttribute('srcset', srcset);
                            source.removeAttribute('data-srcset');
                        }
                    }
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(onIntersection, config);
        lazyImages.forEach(img => observer.observe(img));
        lazySources.forEach(source => observer.observe(source));
    } else {
        // fallback: load all
        lazySources.forEach(s => {
            s.srcset = s.getAttribute('data-srcset') || '';
        });
        lazyImages.forEach(i => {
            i.src = i.getAttribute('data-src') || i.src;
        });
    }
})();

// ==========================
// Modal Preview (shared)
// - clicking any image (grid/masonry/carousel items/thumbs) opens modal
// ==========================
(function () {
    const modalEl = document.getElementById('galleryModal');
    const modalPreview = document.getElementById('modalPreview');
    const bsModal = new bootstrap.Modal(modalEl);

    // delegate clicks for images inside main
    document.addEventListener('click', function (e) {
        const t = e.target;
        // if clicked an <img> that is part of gallery
        if (t.tagName === 'IMG' && (t.classList.contains('grid-img') || t.classList.contains('masonry-item') || t.classList.contains('carousel-item') || t.classList.contains('modal-img'))) {
            // determine full-size url: prefer data-full, else src
            const full = t.getAttribute('data-full') || t.currentSrc || t.getAttribute('data-src') || t.src;
            if (full) {
                modalPreview.src = full;
                bsModal.show();
            }
        }
    }, false);

    // Also open modal when clicking carousel images:
    // (carousel images have class lazy and become native src when loaded)
})();

// ==========================
// Slider + Thumbnail logic
// - Clicking thumbnail sets main image
// - Prev/Next cycle through thumbnails
// ==========================
(function () {
    const thumbs = Array.from(document.querySelectorAll('.thumb'));
    const main = document.getElementById('mainSliderImg');
    let idx = 0;

    const setMainFromIdx = (i) => {
        i = (i + thumbs.length) % thumbs.length;
        idx = i;
        const full = thumbs[i].getAttribute('data-full') || thumbs[i].getAttribute('data-src');
        if (full) {
            // set picture <source> if exists (we used picture wrapper), but simplest: set main.src
            main.src = full;
        }
        // highlight - add outline
        thumbs.forEach((t, j) => t.style.outline = (j === i) ? '3px solid rgba(201,159,179,0.25)' : 'none');
    };

    thumbs.forEach((t, i) => {
        t.addEventListener('click', () => {
            setMainFromIdx(i);
            // also animate slightly
            gsap.fromTo(main, {
                scale: 0.98,
                opacity: 0
            }, {
                scale: 1,
                opacity: 1,
                duration: 0.35
            });
        });
    });

    document.getElementById('prevSlide').addEventListener('click', () => setMainFromIdx(idx - 1));
    document.getElementById('nextSlide').addEventListener('click', () => setMainFromIdx(idx + 1));

    // init main image from first thumb after loaded
    if (thumbs.length) {
        // Wait a tick for potential lazy data-src to be swapped; safe fallback after short delay
        setTimeout(() => setMainFromIdx(0), 200);
    }
})();

// ==========================
// Initialize AOS & GSAP scroll animations
// ==========================
document.addEventListener('DOMContentLoaded', function () {
    if (window.AOS) AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out-cubic'
    });

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.from('.grid-img', {
            scrollTrigger: {
                trigger: '.grid-autofit',
                start: 'top bottom-=100'
            },
            y: 24,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out'
        });

        gsap.from('.masonry-item', {
            scrollTrigger: {
                trigger: '.masonry',
                start: 'top bottom-=120'
            },
            y: 28,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out'
        });

        gsap.from('#galleryCarousel .carousel-item img', {
            scrollTrigger: {
                trigger: '#galleryCarousel',
                start: 'top bottom-=100'
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15
        });

        gsap.from('.thumb', {
            scrollTrigger: {
                trigger: '.section-wrap',
                start: 'top bottom-=100'
            },
            y: 12,
            opacity: 0,
            duration: 0.6,
            stagger: 0.08
        });
    }
});