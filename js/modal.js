document.addEventListener("DOMContentLoaded", () => {
    const botaoCarrinho = document.querySelector(".botao-carrinho");
    const modal = document.getElementById("modal-1");
    const fechar = modal.querySelector(".fechar");

    botaoCarrinho.addEventListener("click", () => {
        modal.setAttribute("aria-hidden", "false");
        modal.classList.add("ativo"); 
    });

    fechar.addEventListener("click", () => {
        modal.setAttribute("aria-hidden", "true");
        modal.classList.remove("ativo");
        document.activeElement.blur();
    });
});
