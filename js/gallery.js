document.addEventListener('DOMContentLoaded', () => {

    const swiper = new Swiper('.gallery-swiper', {
        loop: true,
        spaceBetween: 24,
        preventClicks: false,
        preventClicksPropagation: false,
        slideToClickedSlide: false,

        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },

        breakpoints: {
            0: {
                slidesPerView: 1
            },
            576: {
                slidesPerView: 1
            },
            992: {
                slidesPerView: 1
            },
            1200: {
                slidesPerView: 1
            },
        
        }
    });

    /* MODAL ZOOM */
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.zoom-trigger');
        if (!trigger) return;

        modal.style.display = 'flex';
        modalImg.src = trigger.dataset.src;
    });

    closeBtn.onclick = () => modal.style.display = 'none';

    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };

});