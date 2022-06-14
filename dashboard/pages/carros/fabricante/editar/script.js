window.addEventListener("load", init);
let base_url = window.localStorage.getItem("base_url");

async function init(){
    let id_fabri = new URL(window.location.href).searchParams.get("fabricante");
    let fabri = await fabricante(id_fabri);

    preencher_campos(fabri);
    adicionar_eventos();
}

const adicionar_eventos = async() => {
    let btn_submit = document.getElementById("submit");
    btn_submit.addEventListener("click", () => {
        salvar();
    });
}

const salvar = async () => {
    let json = {
        nome: document.getElementById("fabricante").value
    }

    let url = `${base_url}/api/fabricante/${document.getElementById("submit").value}`;
    let settings = {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    };

    let response = await fetch(url, settings);
    if(response.status == 200){
        ativar_modal();
    }
}

const ativar_modal = () => {
    document.querySelector(".modal").classList.add("show");
    document.querySelector(".modal").style.display = "block";

    document.getElementById("concluir").addEventListener("click", () => {
        document.querySelector(".modal").classList.remove("show");
        window.location.href = "/pages/carros/fabricante/listar/index.html";
    })
}

const preencher_campos = async(fabri) => {
    document.getElementById("fabricante").value = fabri.nome;
    document.getElementById("submit").value = fabri.id;
}

const fabricante = async (id_func) => {
    let url = `${base_url}/api/fabricante/${id_func}`;
    let response = await fetch(url);
    let json = await response.json();
    return json;
}