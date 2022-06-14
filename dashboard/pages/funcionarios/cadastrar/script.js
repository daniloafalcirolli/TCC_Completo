window.addEventListener("load", init);
let base_url = window.localStorage.getItem("base_url");

function init() {
    adicionar_eventos();
}

const adicionar_eventos = async () => {
    let id_fabricante;
    let id_modelo;
    let id_ano;
    let id_versao;

    let select_fabricantes = document.getElementById("fabricantes");
    let url = `${base_url}/api/carro`;
    let response = await fetch(url);
    let json = await response.json();
    let options = "<option selected='selected' disabled>Selecione</option>";
    for (const fabri of json) {
        options += `<option id='${fabri.id}'>${fabri.nome}</option>`;
    }
    document.getElementById("fabricantes").innerHTML = options;


    select_fabricantes.addEventListener("change", async () => {
        id_fabricante = select_fabricantes.options[select_fabricantes.selectedIndex].id;
        let url_fabricante = `${base_url}/api/carro?fabricante=${id_fabricante}`;
        let response = await fetch(url_fabricante);
        let json = await response.json();

        let options = "<option selected='selected' disabled>Selecione</option>";
        for (const modelo of json) {
            options += `<option id='${modelo.id}'>${modelo.modelo}</option>`;
        }
        document.getElementById("modelos").innerHTML = options;
    });

    let select_modelos = document.getElementById("modelos")
    select_modelos.addEventListener("change", async () => {
        id_modelo = select_modelos.options[select_modelos.selectedIndex].id;
        let url_modelo = `${base_url}/api/carro?fabricante=${id_fabricante}&modelo=${id_modelo}`;
        let response = await fetch(url_modelo);
        let json = await response.json();

        let options = "<option selected='selected' disabled>Selecione</option>";
        for (const modelo of json) {
            options += `<option id='${modelo.id}'>${modelo.ano}</option>`;
        }
        document.getElementById("anos").innerHTML = options;
    });

    let select_ano = document.getElementById("anos");
    select_ano.addEventListener("change", async () => {
        id_ano = select_ano.options[select_ano.selectedIndex].id;
        let url_ano = `${base_url}/api/carro?fabricante=${id_fabricante}&modelo=${id_modelo}&ano=${id_ano}`;
        let response = await fetch(url_ano);
        let json = await response.json();

        let options = "<option selected='selected' disabled>Selecione</option>";

        for (const versao of json) {
            options += `<option id='${versao.id}'>${versao.nome}</option>`;
        }

        document.getElementById("versoes").innerHTML = options;
    });

    let select_versao = document.getElementById("versoes");
    select_versao.addEventListener("change", async () => {
        id_versao = select_versao.options[select_versao.selectedIndex].id;
        let url_versao = `${base_url}/api/carro?fabricante=${id_fabricante}&modelo=${id_modelo}&ano=${id_ano}&versao=${id_versao}`;
        let response = await fetch(url_versao);
        let json = await response.json();

        document.getElementById("km_por_litro").value = json.km_por_litro;
    });

    let btn_submit = document.getElementById("submit");
    btn_submit.addEventListener("click", () => {
        salvar();
    });

    let input_primeiro_nome = document.getElementById("primeiro_nome");
    let input_username = document.getElementById("username");
    input_primeiro_nome.addEventListener("keyup", () => {
        input_username.value = input_primeiro_nome.value.toLowerCase() + "." + input_username.value.split(".")[1].toLowerCase();
    });

    let input_ultimo_nome = document.getElementById("ultimo_nome");
    input_ultimo_nome.addEventListener("keyup", () => {
        input_username.value = input_username.value.split(".")[0].toLowerCase() + "." + input_ultimo_nome.value.toLowerCase();
    });
}


const salvar = async () => {
    let json = {
        primeiro_nome: document.getElementById("primeiro_nome").value,
        ultimo_nome: document.getElementById("ultimo_nome").value,
        username: document.getElementById("username").value,
        cpf: document.getElementById("cpf").value,
        rg: document.getElementById("rg").value,
        telefone: document.getElementById("telefone").value,
        endereco: document.getElementById("endereco").value,
        km_por_litro: document.getElementById("km_por_litro").value,
        placa: document.getElementById("placa").value
    }

    let url = `${base_url}/api/funcionario/cadastro`;
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
            window.location.href = "/pages/funcionarios/listar/index.html";
        })
    }
}