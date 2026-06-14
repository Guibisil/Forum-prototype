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

        //document.body.innerHTML = post.conteudo;

    } catch (erro) {
        //alert("<h1>Erro ao carregar post</h1>");
    }
}