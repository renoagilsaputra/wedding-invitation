// Offset WIB (UTC +7 jam)
const WIB_OFFSET = 7 * 60 * 60 * 1000;

// Target tanggal: 1 Juni 2026 00:00 WIB
const targetDate =
    Date.UTC(2026, 5, 1, 0, 0, 0) + WIB_OFFSET;

function updateCountdown() {
    const nowUTC = Date.now();
    const nowWIB = nowUTC + WIB_OFFSET;

    const distance = targetDate - nowWIB;

    if (distance <= 0) {
        document.querySelector('.overlay-card').innerHTML = `
            <h1 class="fw-bold">Hari Ini Acara Dimulai</h1>
            <p class="fs-5 mt-3">Terima kasih telah menunggu</p>
        `;
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);
