let base_url = window.localStorage.getItem("base_url");

async function do_pagination(url){
    window.current_page = 0;
    window.size = 8;
    
    const objetos = async () => {
        let url_to_fetch = `${base_url}${url}?page=${window.current_page}&size=${window.size}`;
        let response = await fetch(url_to_fetch);
        let content = await response.json();
        window.totalPages = content.totalPages;
        window.first = content.first;
        window.last = content.last;
        switch_page(content.content);
    }

    const switch_page = async(page) => {
        let json = page;        
        let table = document.querySelector("tbody");
        load_html(json, table, first, last, totalPages);
    }

    const load_html = async(array, table) => {
        let length = array.length;
        let string = "";
        let url_edit = "";
        let url_delete = "";
        for(let i = 0; i < length; i++){
            string += `<tr>`;
            for(item in array[i]){
                if(item != "id"){
                    string += `<td>${array[i][item]}</td>`;
                }else{
                    url_delete = `${array[i][item]}`; 
                    url_edit = `${window.location.pathname.split("/listar")[0]}/editar/index.html?id=${array[i][item]}`;
                }
            }

            string +=
                    `<td>
                        <i class='fa fa-trash-o' id='apagar' value=${url_delete}></i>
                        <a href='${url_edit}'>
                            <i class='fa fa-pencil'></i>
                        </a>
                    </td>
                </tr>`;
        }

        table.innerHTML = string;

        await modules();
    }

    const modules = async() => {
        const arrows = async() => {
            let arrow_left =  document.getElementById("arrow_left");
            let arrow_right =  document.getElementById("arrow_right")

            arrow_left.disabled = window.first;
            arrow_right.disabled = window.last;

            arrow_left.addEventListener("click", () => {
                window.current_page--;
                objetos();
            });

            arrow_right.addEventListener("click", () => {
                window.current_page++;
                objetos();
            });
        }

        const totalPages = async() => {
            document.getElementById("total_pages").innerHTML = `${window.current_page + 1} de ${window.totalPages}`;
        }

        const controllers = async() => {
            let string = ` <div class="controles">
                                <button id="arrow_left"><i class="fa fa-angle-left"></i></button>
                                <span id="total_pages"></span>
                                <button id="arrow_right"><i class="fa fa-angle-right"></i></button>
                            </div>`;

            document.querySelector("tbody").innerHTML += string;
        }

        const excluirItem = async() => {
            document.querySelectorAll("#apagar").forEach(x => {
                x.addEventListener("click", () => {
                    if(confirm("Tem certeza que deseja excluir?")){
                        deletar(x.getAttribute("value"));
                    }else{
                        alert("Não foi possível excluir!");
                    }
                })
            });

            const deletar = async (id) => {
                if(url.includes("/page")){
                    url = url.split("/page")[0];
                }

                let url_to_delete = `${base_url}${url}/${id}`;

                let settings = {
                    method: 'DELETE',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    }
                }

                let response = await fetch(url_to_delete, settings);

                if(response.status == 200){
                    alert("Excluido com sucesso!");
                    location.reload();
                }
            }
        }

        await controllers();
        await arrows();
        await totalPages();
        await excluirItem();
    }

    objetos();
}
