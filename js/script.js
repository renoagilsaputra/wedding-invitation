document.addEventListener("DOMContentLoaded", function () {

    const button = document.querySelector("#open-invitation-btn");

    button.addEventListener("click", function (e) {
        e.preventDefault();
        const soundToggleButton = document.getElementById('music-btn');
        player.unMute();
        soundToggleButton.innerHTML = '<i class="fa fa-volume-off"></i>';
        // Ambil semua section setelah hero
        const allSections = document.querySelectorAll("section:not(.hero)");
       
        
        // Tampilkan semuanya
        allSections.forEach(sec => sec.classList.add("show"));

        // Scroll ke section pertama
        if (allSections.length > 0) {
            allSections[0].scrollIntoView({
                behavior: "smooth"
            });
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const to = urlParams.get("to");

    if (to) {
        document.getElementById("invited-guest").textContent = to;
    }

    const playerContainer = document.getElementById('youtube-background');
    const iframe = playerContainer.querySelector('iframe');
    let player; // Variabel untuk objek YouTube Player API

    // Muat YouTube IFrame API secara asinkron
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Fungsi yang dipanggil saat YouTube API siap
    window.onYouTubeIframeAPIReady = function () {
        player = new YT.Player(iframe, {
            events: {
                'onReady': onPlayerReady
            }
        });
    }

    function onPlayerReady(event) {
        const soundToggleButton = document.getElementById('music-btn');
        if (soundToggleButton) {
            soundToggleButton.addEventListener('click', function () {
                if (player.isMuted()) {
                    player.unMute();
                    soundToggleButton.innerHTML = '<i class="fa fa-volume-off"></i>';
                } else {
                    player.mute();
                    soundToggleButton.innerHTML = '<i class="fa fa-volume-up"></i>';
                }
            });
        }
    }

});