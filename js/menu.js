document.addEventListener("DOMContentLoaded", () => {
    const botaoMenu = document.querySelector(".menu-hamburguer");
    const cabecalho = document.querySelector(".cabecalho");

    botaoMenu.addEventListener("click", () => {
        cabecalho.classList.toggle("menu-ativo");
    });
});
