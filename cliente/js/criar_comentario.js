const novo_com = document.getElementById("criar_comen");
const envio_res = document.getElementById("envio_res");

novo_com.addEventListener("click", (e) => {
    e.preventDefault();
    esta_logado();
});

function enviar_resposta() {
    if (esta_logado()) {
        criar_comentario();
    }
}

function esta_logado() {
    if (!sessionStorage.getItem("user")) {
        alert("Você precisa estar logado para criar um comentário.");
        window.location.href = "login.html";
        return false;
    } else {
        return true;
    }
}

async function criar_comentario() {
    const comentario = document.getElementById("comentario").value;
    const user_name = sessionStorage.getItem('user_name')

    const parametro = new URLSearchParams(window.location.search);
    const id_post = parametro.get('id');

    let obj_comen = {"conteudo": comentario, "autor_nome": user_name}

    try {
        const resposta = await fetch(`http://127.0.0.1:5000/adicionar-post/${id_post}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj_comen)
        });

        const resultado = await resposta.json();
        console.log("Resposta do servidor:", resultado);
        
    } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
    }
}

