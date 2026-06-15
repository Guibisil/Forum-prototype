function carregar() {
    if (sessionStorage.getItem('user')) {
        btn_login.innerHTML = '<img src="./resource/imagens/icons/user.png" style="height: 40px;"/>';
        btn_login.classList.remove('btn-success');
        btn_login.classList.add('pincel', 'p-0');

        const menu_tema = document.getElementById("menu_tema");
        menu_tema.style.right = '60px';
    } 

    info_post();
}

async function info_post() {

    const parametro = new URLSearchParams(window.location.search);
    const id_post = parametro.get('id');

    if (!id_post) {
        document.body.innerHTML = "<h1>Post não especificado</h1>";
        return;
    }

    try {
        const resposta = await fetch(`http://127.0.0.1:5000/dados-posts/${id_post}`);
        
        if (!resposta.ok) {
            throw new Error("Post não encontrado no servidor");
        }

        const post = await resposta.json();

        const resposta_autor = await fetch(`http://127.0.0.1:5000/dados-usuarios/${post.autor_id}`);
        const autor = await resposta_autor.json();

        document.getElementById("autor-post").textContent = autor.nome;
        document.getElementById("titulo-post").textContent = post.titulo;
        document.getElementById("conteudo-post").textContent = post.conteudo;

        if (post.comentarios.length > 0) {
            comentarios(post.comentarios);
        } else {
            document.getElementById("comentarios").innerHTML = "<p class='text-center mt-3'><i>Nenhum comentário...</i></p>";
        }
        

    } catch (erro) {
        (erro.message);
    }
}

async function comentarios(p) {
    const comentarios = document.getElementById("comentarios");

    try {
        p.forEach(comentario => {
            let novo_comentario = `<div class="px-3 borda mb-2" style="border-bottom: solid 1px;" id="com_${comentario.id}">
                <article class="row px-2">
                    <img class="col-auto p-1" src="./resource/imagens/icons/user.png" style="height: 35px;"/>
                    <h6 class="col-auto d-flex m-0 p-0 align-items-center small">${comentario.autor_nome}</h6>
                </article>
                <p>${comentario.conteudo}</p>
            </div>`;

            comentarios.insertAdjacentHTML('afterbegin', novo_comentario);
        });

    }catch (erro) {
        (erro.message);
    }
}