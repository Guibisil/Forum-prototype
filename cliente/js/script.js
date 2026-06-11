const btn_login = document.getElementById("btn_login");

function carregar() {
    if (sessionStorage.getItem('user')) {
        btn_login.innerHTML = '<img src="./resource/imagens/icons/user.png" style="height: 40px;"/>';
        btn_login.classList.remove('btn-success');
        btn_login.classList.add('pincel', 'p-0');

        const menu_tema = document.getElementById("menu_tema");
        menu_tema.style.right = '60px';
    } 
}

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