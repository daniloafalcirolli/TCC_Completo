window.addEventListener("load", init);

async function init(){
    await do_pagination(`/api/provedor/page`);
}