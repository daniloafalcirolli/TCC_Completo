window.addEventListener("load", init);
let base_url = window.localStorage.getItem("base_url");

function init(){
    window.current_page = 0;
    window.size = 10;
    window.pagination = [];

    const funcionarios = async () => {
        let url = `${base_url}/api/fabricante?page=${window.current_page}&size=${window.size}`;
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
                string +=   `<td><a href="/pages/carros/modelo/listar/index.html?fabricante=${array[i].id}">${array[i].nome}</a></td>`;
                string +=   `<td>
                                <i class='fa fa-trash-o'></i>
                                <a href='/pages/carros/fabricante/editar/index.html?fabricante=${array[i].id}'>
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
    })
}
