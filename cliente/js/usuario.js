const btn_login = document.getElementById("btn_login");
const area_user = document.getElementById('area_user_post');
const nome_user = document.getElementById('nome_user');
const email_user = document.getElementById('email_user');
const id_user = sessionStorage.getItem('user_id');
const btn_delete = document.getElementById('del_user');

function carregar() {
    if (sessionStorage.getItem('user')) {
        const menu_tema = document.getElementById("menu_tema");
        menu_tema.style.right = '92px';
    } else {
        window.location.href = 'login.html';
    }

    posts_user();
}

async function posts_user() {
    
    try {
        const resposta_usuario = await fetch(`http://127.0.0.1:5000/dados-usuarios/${id_user}`)
        const dados_usuario = await resposta_usuario.json();

        nome_user.innerHTML = `${dados_usuario.nome}`
        email_user.innerHTML = `${dados_usuario.email}`

        const resposta = await fetch(`http://127.0.0.1:5000/posts-autor/${id_user}`);
        const dados = await resposta.json();

        if (dados.length == 0) {
            area_user.innerHTML = "<p class='text-center mt-3'><i>Nenhum post...</i></p>"
        } else {
            dados.forEach((post) => {
                let novo_post = `<article id="userP_${post.id}" class="container my-3 p-3 borda post" style="border: solid 1px; border-radius: 10px;">
                    <div>
                        <p class="mb-2"><b class="titulo">${post.titulo}</b><i style="font-size:smaller"> - ${post.hora}</i></p>
                    </div>
                </article>`;

                area_user.insertAdjacentHTML('afterbegin', novo_post);
            });
        }

    } catch (erro) {
        alert("Erro ao buscar dados:", erro);
    }
}

function logout() {
    sessionStorage.removeItem('user');
    window.location.href = 'index.html';
}

btn_delete.addEventListener('click', (e) => {
    e.preventDefault();
    del_user();
});

async function del_user() {
    
    try {
        const resposta_usuario = await fetch(`http://127.0.0.1:5000/remover-user/${id_user}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        alert("Conta excuída.")
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('user_id');
        sessionStorage.removeItem('user_name');
        window.location.href = 'index.html';
    } catch (erro) {
        alert("Erro ao deletar usuário:", erro);
    }
}