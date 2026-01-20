// Init romantic carousel
const galleryCarousel = document.querySelector('#galleryCarousel');
new bootstrap.Carousel(galleryCarousel, {
    interval: 5000,
    ride: 'carousel',
    pause: false,
    wrap: true
});

// Zoom modal (carousel & grid)
document.querySelectorAll('.gallery-item, .gallery-grid-img').forEach(el => {
    el.addEventListener('click', function () {
        const imgSrc = this.tagName === 'IMG'
            ? this.src
            : this.querySelector('img').src;

        document.getElementById('modalImage').src = imgSrc;
        new bootstrap.Modal(document.getElementById('galleryModal')).show();
    });
});
