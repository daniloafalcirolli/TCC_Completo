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
        material: document.getElementById("material").value,
    }

    let url = `${base_url}/api/material`;
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
            window.location.href = "/pages/materiais/listar/index.html";
        })
    }
}
