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

});
