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

async function validar() {
    try {
        const resposta = await fetch('http://127.0.0.1:5000/dados-usuarios');
        const usuarios = await resposta.json();
        
        usuarios.forEach(u => {
            if (senha.value == u.senha && usuario.value == u.nome) {
                sessionStorage.setItem('user', 'logado');
                window.location.href = 'index.html';
            }
        });

        if (!sessionStorage.getItem('user')) {
            msg.innerHTML = `<h6>Usuário ou Senha Incorretos</h6>`;
        }

    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}