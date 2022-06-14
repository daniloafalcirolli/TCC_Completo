window.addEventListener("load", init);
let base_url = window.localStorage.getItem("base_url");

function init() {
    adicionar_eventos();
}

const adicionar_eventos = async () => {
    let btn_submit = document.getElementById("submit");
    btn_submit.addEventListener("click", () => {
        salvar();
    });
}

const salvar = async () => {
    let json = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        endereco: document.getElementById("endereco").value
    }

    let url = `${base_url}/api/cliente`;
    let settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    };

    let response = await fetch(url, settings);
    if (response.status == 201) {
        document.querySelector(".modal").classList.add("show");
        document.querySelector(".modal").style.display = "block";

        document.getElementById("concluir").addEventListener("click", () => {
            document.querySelector(".modal").classList.remove("show");
            window.location.href = "/pages/clientes/listar/index.html";
        })
    }
}
