let aosInitialized = false;

/* =====================================================
   LOADER
===================================================== */
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    if (!loader) return;

    setTimeout(() => {
        loader.classList.add('hidden');
        initGSAP();
    }, 500);
});

/* =====================================================
   DOM READY
===================================================== */
document.addEventListener('DOMContentLoaded', () => {

    /* AOS */
    if (window.AOS && !aosInitialized) {
        AOS.init({ duration: 800, once: false, easing: 'ease-out-cubic' });
        aosInitialized = true;
    }

    /* Elements */
    const openBtn        = document.getElementById('open-invitation-btn');
    const audio          = document.getElementById('bg-music');
    const soundBtn       = document.getElementById('music-btn');
    const musicIcon      = document.getElementById('music-icon');
    const floatingWrapper = document.getElementById('floating-wrapper');
    const mobileNav      = document.getElementById('mobile-nav');
    const navButtons     = document.querySelectorAll('.nav-btn');
    const navToggle      = document.getElementById('nav-toggle');

    /* Nav toggle */
    navToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('minimized');
        navToggle.querySelector('i')?.classList.toggle('fa-chevron-up');
        navToggle.querySelector('i')?.classList.toggle('fa-times');
    });

    /* Open Invitation */
    openBtn?.addEventListener('click', (e) => {
        e.preventDefault();

        if (audio) {
            audio.volume = 1;
            audio.play().catch(() => {});
        }

        if (musicIcon) musicIcon.className = 'fa fa-volume-off';

        floatingWrapper.classList.remove('hidden');
        mobileNav.classList.remove('hidden');

        openInvitation();
    });

    /* Music Toggle */
    soundBtn?.addEventListener('click', () => {
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            musicIcon.className = 'fa fa-volume-off';
        } else {
            audio.pause();
            musicIcon.className = 'fa fa-volume-up';
        }
    });

    /* Guest Name from URL */
    const to = new URLSearchParams(window.location.search).get('to');
    if (to) {
        const guest = document.getElementById('invited-guest');
        if (guest) guest.textContent = to;
    }

    /* Thumbnail Slider */
    document.querySelectorAll('.thumb').forEach(el => {
        el.addEventListener('click', () => {
            const main = document.getElementById('mainPreview');
            if (main) main.src = el.src;
        });
    });

    /* Scroll to section */
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = document.querySelector(btn.dataset.target);
            if (!target) return;
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* Active nav on scroll */
    const sections = [...navButtons].map(btn => document.querySelector(btn.dataset.target));

    window.addEventListener('scroll', () => {
        let current = null;

        sections.forEach(section => {
            if (!section) return;
            if (window.scrollY >= section.offsetTop - 150) current = section;
        });

        navButtons.forEach(btn => {
            btn.classList.toggle('active', current && btn.dataset.target === getSelector(current));
        });
    });

    function getSelector(el) {
        return el.id ? `#${el.id}` : `.${el.classList[0]}`;
    }

    initLazyLoad();
});

/* =====================================================
   OPEN INVITATION
===================================================== */
function openInvitation() {
    const hero   = document.querySelector('.hero');
    const target = document.getElementById('open-invitation');

    hero?.classList.add('hide');

    hero?.addEventListener('transitionend', () => {
        hero.remove();

        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setTimeout(() => {
            if (window.AOS) AOS.refreshHard();
            if (window.ScrollTrigger) ScrollTrigger.refresh();
        }, 200);
    }, { once: true });

    document.querySelectorAll('section:not(.hero)').forEach(sec => sec.classList.add('show'));
}

/* =====================================================
   LAZY LOAD
===================================================== */
function initLazyLoad() {
    const lazyImages  = [...document.querySelectorAll('img.lazy')];
    const lazySources = [...document.querySelectorAll('source[data-srcset]')];

    if (!('IntersectionObserver' in window)) {
        lazyImages.forEach(img => img.src = img.dataset.src || img.src);
        lazySources.forEach(src => src.srcset = src.dataset.srcset || '');
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            if (entry.target.tagName === 'IMG' && entry.target.dataset.src) {
                entry.target.src = entry.target.dataset.src;
            }
            if (entry.target.tagName === 'SOURCE' && entry.target.dataset.srcset) {
                entry.target.srcset = entry.target.dataset.srcset;
            }

            obs.unobserve(entry.target);
        });
    }, { rootMargin: '200px', threshold: 0.01 });

    lazyImages.forEach(img => observer.observe(img));
    lazySources.forEach(src => observer.observe(src));
}

/* =====================================================
   GSAP & SCROLLTRIGGER
===================================================== */
function initGSAP() {
    if (!window.gsap || !window.ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.grid-img', {
        scrollTrigger: { trigger: '.grid-autofit', start: 'top bottom-=100' },
        y: 24, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out'
    });

    gsap.from('.masonry-item', {
        scrollTrigger: { trigger: '.masonry', start: 'top bottom-=120' },
        y: 28, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
    });

    gsap.from('#galleryCarousel .carousel-item img', {
        scrollTrigger: { trigger: '#galleryCarousel', start: 'top bottom-=100' },
        y: 20, opacity: 0, duration: 0.8, stagger: 0.15
    });

    gsap.from('.thumb', {
        scrollTrigger: { trigger: '.section-wrap', start: 'top bottom-=100' },
        y: 12, opacity: 0, duration: 0.6, stagger: 0.08
    });
}
