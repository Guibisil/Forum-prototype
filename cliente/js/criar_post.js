const novo_post = document.getElementById('criar_post');

novo_post.addEventListener('click', (e) => {
    e.preventDefault();
    esta_logado();
});

function enviar_post() {
    if (esta_logado()) {
        criar_post();
    }
}

function esta_logado() {
    if (!sessionStorage.getItem("user")) {
        alert("Você precisa estar logado para criar um post.");
        window.location.href = "login.html";
        return false;
    } else {
        return true;
    }
}

async function criar_post() {
    const corpo = document.getElementById('corpo').value;
    const titulo = document.getElementById('titulo_post').value;
    const user_id = sessionStorage.getItem('user_id');

    const data = new Date();
    const hora = data.toLocaleDateString('pt-BR', {hour: '2-digit', minute: '2-digit'});

    let obj_post = {"titulo": titulo, "conteudo": corpo, "hora": hora, "autor_id": user_id}

    try {
        const resposta = await fetch(`http://127.0.0.1:5000/adicionar-post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj_post)
        });

        const resultado = await resposta.json();
        console.log("Resposta do servidor:", resultado);
        
    } catch (erro) {
        console.error("Erro ao enviar dados:", erro);
    }
    
}