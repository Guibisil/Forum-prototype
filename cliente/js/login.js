const usuario = document.getElementById('user');
const senha = document.getElementById('senha');
const email = document.getElementById('email');
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
                sessionStorage.setItem('user_id', u.id);
                sessionStorage.setItem('user_name', u.nome);
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

function registrar() {
    window.location.href = 'registrar.html';
}

async function novo_user(e) {
    e.preventDefault();

    if (validacao_dados()) {
        const novo_usuario = {"nome": usuario.value, "senha": senha.value, "email": email.value}
        
        try {
            const resposta = await fetch('http://127.0.0.1:5000/adicionar-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novo_usuario)
            });

            sessionStorage.setItem('user', 'logado');
            window.location.href = 'index.html';
            
        } catch (erro) {
            console.error("Erro ao enviar dados:", erro);
        } 
    }
    
}

function validacao_dados() {
    const conf_senha = document.getElementById('conf_senha');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (usuario.value == "" || usuario.value == null) {
        msg.innerHTML = `<h6>Nome de usuário inválido</h6>`;
    } else if (senha.value == "" || senha.value == null) {
        msg.innerHTML = `<h6>Senha inválida</h6>`;
    } else if (!regex.test(email.value)) {
        msg.innerHTML = `<h6>Email inválido</h6>`;
    } else if (conf_senha.value != senha.value) {
        msg.innerHTML = `<h6>As senhas não coincidem</h6>`;
    } else {
        return true;
    }

    return false;
}