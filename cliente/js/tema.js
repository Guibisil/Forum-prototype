const btn_tema = document.querySelectorAll('.menu .btn_tema');
const menu_aberto_fechado = {
    "true" : "false",
    "false" : "true",
}

function tema() {
    if (localStorage.getItem("theme")) {
        mudar_tema(localStorage.getItem("theme"));
    }
    else {
        mudar_tema("dft");
    }
}

function menu_tema() {
    const div_menu = document.getElementById("menu_tema");
    const menu_atual = div_menu.dataset.aberto;

    div_menu.setAttribute("data-aberto", menu_aberto_fechado[menu_atual]);
    document.getElementById("menu_login").setAttribute("data-login", "false");
}

function mudar_tema(e) {
    document.body.setAttribute("data-tema", "tema-" + e);

    localStorage.setItem("theme", e);
}

btn_tema.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const tema_sel = e.target.style.backgroundColor;
        var cor;
        
        if (tema_sel == "rgb(0, 102, 34)") {
            cor = "dft";
        } else if (tema_sel == "rgb(255, 255, 204)") {
            cor = "claro";
        } else if (tema_sel == "rgb(38, 38, 38)") {
            cor = "escuro";
        }

        mudar_tema(cor);
    });
});

function logar() {
    if (sessionStorage.getItem('user')) {
        const div_menu = document.getElementById("menu_login");
        const menu_atual = div_menu.dataset.login;

        div_menu.setAttribute("data-login", menu_aberto_fechado[menu_atual]);
        document.getElementById("menu_tema").setAttribute("data-aberto", "false");
    } else {
        window.location.href = 'login.html';
    }
    
}

const usuario_menu = document.querySelectorAll(".usuario li");
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