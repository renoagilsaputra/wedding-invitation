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