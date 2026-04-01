function copyGiftInfo(idElement, idAlert) {
    const el = document.getElementById(idElement);
    const alertEl = document.getElementById(idAlert);
    const textToCopy = el.innerText.trim();

    const showAlert = () => {
        alertEl.classList.remove("d-none");
        if (window['timer_' + idAlert]) clearTimeout(window['timer_' + idAlert]);
        window['timer_' + idAlert] = setTimeout(() => {
            alertEl.classList.add("d-none");
        }, 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(showAlert);
    } else {
        const ta = document.createElement("textarea");
        ta.value = textToCopy;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showAlert();
    }
}

function copyAllGiftInfo() {
    const nama = document.getElementById('giftNama').innerText.trim();
    const alamat = document.getElementById('giftAlamat').innerText.trim();
    const kodePos = document.getElementById('giftKodePos').innerText.trim();
    const wa = document.getElementById('giftWA').innerText.trim();

    const fullText = `Atas Nama : ${nama}\nAlamat    : ${alamat}\nKode Pos  : ${kodePos}\nNo. WA    : ${wa}`;
    const alertEl = document.getElementById('copyAlertAll');

    const showAlert = () => {
        alertEl.classList.remove("d-none");
        if (window['timer_copyAll']) clearTimeout(window['timer_copyAll']);
        window['timer_copyAll'] = setTimeout(() => {
            alertEl.classList.add("d-none");
        }, 2500);
    };

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(fullText).then(showAlert);
    } else {
        const ta = document.createElement("textarea");
        ta.value = fullText;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showAlert();
    }
}

function copyRekening(idRekening, idAlert) {
    const noRekElement = document.getElementById(idRekening);
    const alertBox = document.getElementById(idAlert);
    const textToCopy = noRekElement.innerText.replace(/\s/g, '');

    const showAlert = () => {
        alertBox.classList.remove("d-none");
        if (window['timer_' + idAlert]) clearTimeout(window['timer_' + idAlert]);
        window['timer_' + idAlert] = setTimeout(() => {
            alertBox.classList.add("d-none");
        }, 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy).then(showAlert);
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showAlert();
    }
}