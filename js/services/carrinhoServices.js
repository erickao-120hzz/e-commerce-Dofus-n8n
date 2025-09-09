export function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

export function obterProdutosDoCarrinho() {
    const produtos = localStorage.getItem("carrinho");
    return produtos ? JSON.parse(produtos) : [];
}

export function atualizarSubtotalPedidos() {
    const produtos = obterProdutosDoCarrinho();
    let subtotal = 0;
    produtos.forEach(produto => {
        subtotal += produto.preco * produto.quantidade;
    });
    const elSubtotal = document.querySelector('#subtotal-pedidos .valor');
    if (elSubtotal) {
        elSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    }
}

export function atualizarContadorCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;
    produtos.forEach(produto => {
        total += produto.quantidade;
    });
    document.getElementById("contador-carrinho").textContent = total;
}

export function atualizarValorTotalCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;
    produtos.forEach(produto => {
        total += produto.preco * produto.quantidade;
    });
    document.getElementById("total-carrinho").textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
}

export function limparValoresSeCarrinhoVazio() {
    const produtos = obterProdutosDoCarrinho();
    if (produtos.length === 0) {
        const elSubtotal = document.querySelector('#subtotal-pedidos .valor');
        if (elSubtotal) {
            elSubtotal.textContent = '';
        }
        const valorFrete = document.getElementById('valor-frete');
        if (valorFrete) {
            const valorFreteSpan = valorFrete.querySelector('span');
            if (valorFreteSpan) {
                valorFreteSpan.textContent = '';
            }
        }
    }
}

export function removerProdutodoCarrinho(id) {
    const produtos = obterProdutosDoCarrinho();
    const carrinhoAtualizado = produtos.filter(produto => produto.id !== id);
    salvarProdutosNoCarrinho(carrinhoAtualizado);
    atualizarCarrinhoETabela();
}
