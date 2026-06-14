const btn_login = document.getElementById("btn_login");

function carregar() {
    if (sessionStorage.getItem('user')) {
        const menu_tema = document.getElementById("menu_tema");
        menu_tema.style.right = '92px';
    } else {
        window.location.href = 'login.html';
    }

}

function logout() {
    sessionStorage.removeItem('user');
    window.location.href = 'index.html';
}