const btn_login = document.getElementById("btn_login");
const area_posts = document.getElementById('area_posts');
const pesquisa = document.getElementById('busca_post');
const btn_busca = document.getElementById('btn_busca'); 

function carregar() {

    if (sessionStorage.getItem('user')) {
        btn_login.innerHTML = '<img src="./resource/imagens/icons/user.png" style="height: 40px;"/>';
        btn_login.classList.remove('btn-success');
        btn_login.classList.add('pincel', 'p-0');

        const menu_tema = document.getElementById("menu_tema");
        menu_tema.style.right = '60px';
    } 

    get_posts().then(dados => {
        if (dados) {
            criacao_post(dados);
        }
    });
}

//direcionameto para posts
area_posts.addEventListener('click', (e) => {
    
    if (e.target.classList.contains('titulo')) {
        const titulo = e.target;
        const tag_article = titulo.closest('article');
        
        if (tag_article) {
            const id_post = tag_article.id.split("_")[1];
            window.location.href = `post.html?id=${id_post}`;
        }
    }
});

async function get_posts() {
    try {
        const resposta = await fetch('http://127.0.0.1:5000/dados-posts');
        const dados = await resposta.json();

        return dados;
    } catch (erro) {
        alert("Erro ao buscar dados:", erro);
    }
}

//criação dos posts
function criacao_post(dados) {
    area_posts.innerHTML = '';

    dados.forEach((post) => {
        let novo_post = `<article id="post_${post.id}" class="container my-3 p-3 borda post" style="border: solid 1px; border-radius: 10px;">
            <div>
                <p><b class="titulo">${post.titulo}</b><i style="font-size:smaller"> - ${post.hora}</i></p>
            </div>
            <div>
                <p class="quebra">${post.conteudo}</p>
            </div>
        </article>`;

        area_posts.insertAdjacentHTML('afterbegin', novo_post);
    });
}


//Busca
pesquisa.addEventListener('input', (e) => {
    if (pesquisa.value == null || !pesquisa.value) {
        btn_busca.disabled = true;
        
        get_posts().then(dados => {
            if (dados) {
                criacao_post(dados);
            }
        });
    } else {
        btn_busca.disabled = false;
    }
});

btn_busca.addEventListener('click', (e) => {
    e.preventDefault();
    busca();
});

function busca() {
    const busca = pesquisa.value.toLowerCase().trim();
    
    get_posts().then(dados => {
        if (dados) {
            const compativeis = verifica_busca(dados, busca);
            criacao_post(compativeis);
        }
    });
}

function verifica_busca(t, b) {

    let titulos_ok = []; 
    
    t.forEach((post) => {
        const post_t = post.titulo.toLowerCase();

        if (post_t.includes(b)) {
            titulos_ok.push(post); 
        }
    });

    return titulos_ok;
}