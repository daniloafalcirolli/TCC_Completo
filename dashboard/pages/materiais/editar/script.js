window.addEventListener("load", init);
let base_url = window.localStorage.getItem("base_url");

async function init(){
    let id_mat = new URL(window.location.href).searchParams.get("id");
    let mat = await material(id_mat);

    preencher_campos(mat);
    adicionar_eventos(mat);
}

const preencher_campos = async(mat) => {
    document.getElementById("material").value = mat.material;

}

const adicionar_eventos = async(mat) => {
    let btn_submit = document.getElementById("submit");
    btn_submit.addEventListener("click", () => {
        salvar(mat);
    });
}

const salvar = async (mat) => {
    let json = {
        id: mat.id,
        material: document.getElementById("material").value,
    }

    let url = `${base_url}/api/material`;
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
        window.location.href = "/pages/materiais/listar/index.html";
    })
}

const material = async (id_func) => {
    let url = `${base_url}/api/material/${id_func}`;
    let response = await fetch(url);
    let json = await response.json();
    return json;
}