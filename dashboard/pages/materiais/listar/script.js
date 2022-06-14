window.addEventListener("load", init);
// let base_url = window.localStorage.getItem("base_url");

async function init(){
    await do_pagination(`/api/material/page`);

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