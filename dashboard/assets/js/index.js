window.addEventListener("load", init);

function init() {
    let links = [
        "/pages/funcionarios/listar/index.html", 
        "/pages/clientes/listar/index.html", 
        "/pages/servicos/listar/index.html", 
        "/pages/carros/fabricante/listar/index.html", 
        "/pages/materiais/listar/index.html",
        "/pages/provedores/listar/index.html",
        "/pages/estatisticas/index.html"];

    document.querySelectorAll(".card").forEach((card, index)=> {
        card.addEventListener("click", () => {
            window.location.href = links[index];
        });
    });

    let url = "http://localhost:8080";
    window.localStorage.setItem("base_url", url);
}