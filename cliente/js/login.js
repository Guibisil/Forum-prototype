const usuario = document.getElementById('user');
const senha = document.getElementById('senha');
const msg = document.getElementById('mensagem');

function carregar() {
    const menu_tema = document.getElementById("menu_tema");
    menu_tema.style.right = '18px';

    if (sessionStorage.getItem('user')) {
        window.location.href = 'index.html'
    } 
}

function validar() {
    if (senha.value == 12345 && usuario.value == 'teste123') {
        sessionStorage.setItem('user', 'logado');
        window.location.href = 'index.html'
        
    } else {
        msg.innerHTML = `<h6>Usuário ou Senha Incorretos</h6>`
        
    }
}