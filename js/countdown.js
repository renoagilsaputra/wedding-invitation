// Target: 1 Juni 2026 00:00 WIB (UTC+7)
const targetDate = new Date('2026-06-01T00:00:00+07:00').getTime();

function updateCountdown() {
    const distance = targetDate - Date.now();

    if (distance <= 0) {
        document.querySelector('.overlay-card').innerHTML = `
            <h1 class="fw-bold">Hari Ini Acara Dimulai</h1>
            <p class="fs-5 mt-3">Terima kasih telah menunggu</p>
        `;
        return;
    }

    const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent    = days;
    document.getElementById('hours').textContent   = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);
