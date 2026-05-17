const btn_login = document.getElementById("btn_login");

function carregar() {
    if (sessionStorage.getItem('user')) {
        btn_login.innerHTML = '<img src="./resource/imagens/icons/user.png" style="height: 40px;"/>';
        btn_login.classList.remove('btn-success');
        btn_login.classList.add('pincel', 'p-0');

        const menu_tema = document.getElementById("menu_tema");
        menu_tema.style.right = '60px';
    } 
}

