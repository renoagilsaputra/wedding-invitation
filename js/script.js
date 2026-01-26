/* =====================================================
   GLOBAL STATE
===================================================== */
let aosInitialized = false;
let loaderHidden = false;
const isMobile = window.matchMedia("(max-width: 768px)").matches;

/* =====================================================
   LOADER – MOBILE FRIENDLY + FAIL SAFE
===================================================== */
function hideLoader() {
    if (loaderHidden) return;
    loaderHidden = true;

    const loader = document.getElementById("loading-screen");
    if (!loader) return;

    loader.classList.add("hidden");

    loader.addEventListener(
        "transitionend",
        () => {
            loader.remove();

            // Init GSAP setelah loader benar-benar hilang
            if (typeof initGSAP === "function") {
                initGSAP();
            }
        },
        { once: true }
    );
}

/* DOM READY (CEPAT) */
document.addEventListener("DOMContentLoaded", () => {
    // Fail-safe: loader pasti hilang max ±2.2 detik di HP
    setTimeout(hideLoader, 2200);
});

/* FULL LOAD (IDEAL) */
window.addEventListener("load", () => {
    hideLoader();
});

/* =====================================================
   DOM READY MAIN
===================================================== */
document.addEventListener("DOMContentLoaded", () => {

    /* ================= AOS INIT (1x SAJA) ================= */
    if (window.AOS && !aosInitialized) {
        AOS.init({
            duration: isMobile ? 600 : 800,
            once: true,
            easing: "ease-out-cubic",
            disable: () => window.innerWidth < 360
        });
        aosInitialized = true;
    }

    /* ================= ELEMENTS ================= */
    const openBtn = document.getElementById("open-invitation-btn");
    const audio = document.getElementById("bg-music");
    const soundBtn = document.getElementById("music-btn");
    const musicIcon = document.getElementById("music-icon");

    /* ================= OPEN INVITATION ================= */
    openBtn?.addEventListener("click", (e) => {
        e.preventDefault();

        // Play music (mobile safe)
        if (audio) {
            audio.volume = 1;
            audio.play().catch(() => {});
        }

        if (musicIcon) {
            musicIcon.className = "fa fa-volume-off";
        }

        openInvitation();
    });

    /* ================= MUSIC TOGGLE ================= */
    soundBtn?.addEventListener("click", () => {
        if (!audio) return;

        if (audio.paused) {
            audio.play().catch(() => {});
            musicIcon.className = "fa fa-volume-off";
        } else {
            audio.pause();
            musicIcon.className = "fa fa-volume-up";
        }
    });

    /* ================= QUERY PARAM (NAMA TAMU) ================= */
    const to = new URLSearchParams(window.location.search).get("to");
    if (to) {
        const guest = document.getElementById("invited-guest");
        if (guest) guest.textContent = decodeURIComponent(to);
    }

    /* ================= THUMBNAIL PREVIEW ================= */
    document.querySelectorAll(".thumb").forEach((el) => {
        el.addEventListener("click", () => {
            const main = document.getElementById("mainPreview");
            if (main) main.src = el.src;
        });
    });

    /* ================= LAZY LOAD ================= */
    initLazyLoad();
});

/* =====================================================
   OPEN INVITATION FLOW (AMAN AOS & SCROLL)
===================================================== */
function openInvitation() {
    const hero = document.querySelector(".hero");
    const target = document.getElementById("open-invitation");

    if (hero) {
        hero.classList.add("hide");

        hero.addEventListener(
            "transitionend",
            () => {
                hero.remove();

                target?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Refresh AOS & ScrollTrigger setelah layout fix
                setTimeout(() => {
                    if (window.AOS) AOS.refreshHard();
                    if (window.ScrollTrigger) ScrollTrigger.refresh();
                }, 200);
            },
            { once: true }
        );
    }

    document
        .querySelectorAll("section:not(.hero)")
        .forEach((sec) => sec.classList.add("show"));
}

/* =====================================================
   LAZY LOAD IMAGE & SOURCE
===================================================== */
function initLazyLoad() {
    const lazyImages = document.querySelectorAll("img.lazy");
    const lazySources = document.querySelectorAll("source[data-srcset]");

    if (!("IntersectionObserver" in window)) {
        lazyImages.forEach((img) => {
            if (img.dataset.src) img.src = img.dataset.src;
        });
        lazySources.forEach((src) => {
            if (src.dataset.srcset) src.srcset = src.dataset.srcset;
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                if (entry.target.tagName === "IMG") {
                    const src = entry.target.dataset.src;
                    if (src) entry.target.src = src;
                }

                if (entry.target.tagName === "SOURCE") {
                    const srcset = entry.target.dataset.srcset;
                    if (srcset) entry.target.srcset = srcset;
                }

                obs.unobserve(entry.target);
            });
        },
        {
            rootMargin: "200px",
            threshold: 0.01
        }
    );

    lazyImages.forEach((img) => observer.observe(img));
    lazySources.forEach((src) => observer.observe(src));
}

/* =====================================================
   GSAP & SCROLLTRIGGER (OPTIONAL)
===================================================== */
function initGSAP() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const duration = isMobile ? 0.5 : 0.8;
    const offsetY = isMobile ? 16 : 28;

    gsap.from(".grid-img", {
        scrollTrigger: {
            trigger: ".grid-autofit",
            start: "top bottom-=80"
        },
        y: offsetY,
        opacity: 0,
        duration,
        stagger: isMobile ? 0.05 : 0.1,
        ease: "power2.out"
    });

    gsap.from(".masonry-item", {
        scrollTrigger: {
            trigger: ".masonry",
            start: "top bottom-=100"
        },
        y: offsetY,
        opacity: 0,
        duration,
        stagger: isMobile ? 0.08 : 0.12,
        ease: "power2.out"
    });

    gsap.from(".thumb", {
        scrollTrigger: {
            trigger: ".section-wrap",
            start: "top bottom-=100"
        },
        y: 12,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08
    });
}
