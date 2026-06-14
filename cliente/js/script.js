const btn_login = document.getElementById("btn_login");
const usuario_menu = document.querySelectorAll(".usuario li");

function carregar() {
    if (sessionStorage.getItem('user')) {
        btn_login.innerHTML = '<img src="./resource/imagens/icons/user.png" style="height: 40px;"/>';
        btn_login.classList.remove('btn-success');
        btn_login.classList.add('pincel', 'p-0');

        const menu_tema = document.getElementById("menu_tema");
        menu_tema.style.right = '60px';
    } 

    posts();
}

async function posts() {
    try {
        const resposta = await fetch('http://127.0.0.1:5000/dados-posts');
        const dados = await resposta.json();

        dados.map((post) => {
            area_posts.innerHTML = `<article id="post_${post.id}" class="container my-3 p-3 borda" style="border: solid 1px; border-radius: 10px;">
            <div>
                <p><b style="font-size: larger;">${post.titulo}</b><i style="font-size:smaller">
                 - ${post.hora}</i></p>
            </div>
            <div>
                <p>${post.conteudo}</p>
            </div>
        </article>` + area_posts.innerHTML;
        });
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

usuario_menu.forEach(item => {
    item.addEventListener('click', () => {

        console.log(item.id);

        if (item.id === 'detalhes_user') {
            window.location.href = 'detalhes.html';
        } else if (item.id === 'deslogar_user') {
            sessionStorage.removeItem('user');
            window.location.reload();
        }

    })
});


async function json() {
    const teste_banco = {a:4, b:"damasco"};

    try {
        const resposta = await fetch('http://127.0.0.1:5000/adicionar-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teste_banco)
        });

        const resultado = await resposta.json();
        console.log("Resposta do servidor:", resultado);
        
    } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
    }
}

async function teste_get() {
    try {
        const resposta = await fetch('http://127.0.0.1:5000/dados');
        
        const dados = await resposta.json();
        
        console.log(dados);
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}