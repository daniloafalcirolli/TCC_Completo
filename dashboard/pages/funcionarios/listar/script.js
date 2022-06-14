window.addEventListener("load", init);
let base_url = window.localStorage.getItem("base_url");

function init(){

    window.current_page = 0;
    window.size = 10;
    window.pagination = [];

    const funcionarios = async () => {
        let url = `${base_url}/api/funcionario/page?page=${window.current_page}&size=${window.size}`;
        let response = await fetch(url);
        let content = await response.json();

        switch_page(content.content, content.first, content.last, content.totalPages);
    }

    const switch_page = async(page, first, last, totalPages) => {
        let json = page;        
        let table = document.querySelector("tbody");
        console.log(json);
        load_html(json, table, first, last, totalPages);
    }

    const load_html = async(array, table, first, last, totalPages) => {
        let length = array.length;
        let string = "";

        for (let i = 0; i < length; i++) {
            string += `<tr>`;
                string +=   `<td>${array[i].primeiro_nome} ${array[i].ultimo_nome}</td>`;
                string +=   `<td>${array[i].rg}</td>`;
                string +=   `<td>${array[i].cpf}</td>`;
                string +=   `<td>${array[i].telefone}</td>`;
                string +=   `<td><input class="form-check-input" type="checkbox" id="status" value=${array[i].id} ${array[i].status ? "checked" : ""}></td>`;
                string +=   `<td>
                                <i class='fa fa-trash-o' id='apagar' value=${array[i].id}></i>
                                <a href='/pages/funcionarios/editar/index.html?funcionario=${array[i].id}'>
                                    <i class='fa fa-pencil'></i>
                                </a>
                            </td>`;
            string += `</tr>`;
        }
        table.innerHTML = string;
        
        document.getElementById("total_pages").innerHTML = `${window.current_page + 1} de ${totalPages}`;

        let arrow_left =  document.getElementById("arrow_left");
        let arrow_right =  document.getElementById("arrow_right")

        arrow_left.disabled = first;
        arrow_right.disabled = last;

        let modal_btn_cancelar = document.getElementById("cancelar");
        modal_btn_cancelar.addEventListener("click", () => {
            document.querySelectorAll(".modal")[0].classList.remove("show");
            document.querySelectorAll(".modal")[0].style.display = "none";
        });

        let modal_btn_finalizar = document.getElementById("finalizar");
        modal_btn_finalizar.addEventListener("click", () => {
            document.querySelectorAll(".modal")[1].classList.remove("show");
            document.querySelectorAll(".modal")[1].style.display = "none";

            window.location.reload();
        })

        let modal_btn_concluir = document.getElementById("concluir");
        modal_btn_concluir.addEventListener("click", () => {
            excluir();
        });

        document.querySelectorAll("#status").forEach(x => {
            x.addEventListener("click", () => {
                window.localStorage.setItem("id_func_to_alter_status", x.getAttribute("value"));
                alterar_status();
            })
        })

        document.querySelectorAll("#apagar").forEach(x => {
            x.addEventListener("click", () => {
                document.querySelectorAll(".modal")[0].classList.add("show");
                document.querySelectorAll(".modal")[0].style.display = "block";
                window.localStorage.setItem("id_func_to_delete", x.getAttribute("value"));
            });
        });
    };

    arrow_left.addEventListener("click", () => {
        window.current_page--;
        funcionarios();
    });

    arrow_right.addEventListener("click", () => {
        window.current_page++;
        funcionarios();
    });

    funcionarios();

    const alterar_status = async() => {
        let id_func_to_alter_status = window.localStorage.getItem("id_func_to_alter_status");

        let url_to_alter_status = `${base_url}/api/funcionario/status/${id_func_to_alter_status}`;
        let settings = {
            method: 'PUT',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        }
        let response = await fetch(url_to_alter_status, settings);
        
        window.localStorage.removeItem("id_func_to_alter_status");
    } 
    
    const excluir = async() => {
        let id_func_to_delete = window.localStorage.getItem("id_func_to_delete");

        let url_to_delete = `${base_url}/api/funcionario/${id_func_to_delete}`;
        let settings = {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
        }

        let response = await fetch(url_to_delete, settings);
        if(response.status == 200){
            document.querySelectorAll(".modal")[0].classList.remove("show");
            document.querySelectorAll(".modal")[0].style.display = "none";

            document.querySelectorAll(".modal")[1].classList.add("show");
            document.querySelectorAll(".modal")[1].style.display = "block";
            
            window.localStorage.removeItem("id_func_to_delete");
        }
    }

    let search =  document.getElementById("search");
    search.addEventListener("keyup", () => {
        let value = document.getElementById("search").value.toLowerCase();

        let rows = document.querySelectorAll("tbody>tr");
        for(let i = 0; i < rows.length; i++) {
            if(rows[i].querySelectorAll("td")[0].innerHTML.toLowerCase().includes(value)){
                rows[i].style.display = "table-row";
            }else{
                rows[i].style.display = "none";
            }
        }
    });
}