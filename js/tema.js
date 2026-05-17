function tema() {
    if (localStorage.getItem(theme)) {
        mudar_tema(localStorage.getItem(theme));
    }
    else {
        mudar_tema("dft");
    }
}

function mudar_tema(e) {
    document.body.setAttribute("data-tema", "tema-" + e);
}