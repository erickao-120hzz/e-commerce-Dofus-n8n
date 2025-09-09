function atualizarSubtotalPedidos() {
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
const btnAddCarrinho = document.querySelectorAll('.add-ao-carrinho');

btnAddCarrinho.forEach(botao => {
    botao.addEventListener("click", (evento) => {
        const elementoProduto = evento.target.closest(".produto");
        const produtoId = elementoProduto.dataset.id;
        const produtoNome = elementoProduto.querySelector(".nome").textContent;
        const produtoImagem = elementoProduto.querySelector("img").getAttribute("src");
        const produtoPreco = parseFloat(elementoProduto.querySelector(".preco").textContent.replace("R$ ", "").replace(".", "").replace(",", "."));

        const carrinho = obterProdutosDoCarrinho();

        const existeProduto = carrinho.find(produto => produto.id === produtoId);
        if (existeProduto) {
            existeProduto.quantidade += 1;
        } else {

            const produto = {
                id: produtoId,
                nome: produtoNome,
                imagem: produtoImagem,
                preco: produtoPreco,
                quantidade: 1
            };
            carrinho.push(produto);
        }

        salvarProdutosNoCarrinho(carrinho);
        atualizarCarrinhoETabela();

    });
});

function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function obterProdutosDoCarrinho() {
    const produtos = localStorage.getItem("carrinho");
    return produtos ? JSON.parse(produtos) : [];

}

function atualizarContadorCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;

    produtos.forEach(produto => {
        total += produto.quantidade;

    });

    document.getElementById("contador-carrinho").textContent = total;

}

function renderizarTabelaDoCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    const corpoTabela = document.querySelector("#modal-1-content tbody");
    corpoTabela.innerHTML = "";

    produtos.forEach(produto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td class="td-produto">
        <img 
        src="${produto.imagem}" 
        alt=""${produto.nome}">
        </td>
        <td>${produto.nome}</td>
        <td class="td-preco-unitario">R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
                                <td class="td-quantidade"><input type="number" class="input-quantidade" data-id="${produto.id}" value="${produto.quantidade}" min="1"></td>
                                <td class="td-preco-total">R$ ${(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}</td>

                                <td><button class="btn-remover" data-id="${produto.id}"id="deletar"></button></td>`;
        corpoTabela.appendChild(tr);
    });
}

const corpoTabela = document.querySelector("#modal-1-content tbody");
corpoTabela.addEventListener("click", evento => {
    if (evento.target.classList.contains('btn-remover')) {
        const id = evento.target.dataset.id;
        removerProdutodoCarrinho(id);
    }
});

corpoTabela.addEventListener("input", evento => {
    if (evento.target.classList.contains("input-quantidade")) {
        const produtos = obterProdutosDoCarrinho();
        const produto = produtos.find(produto => produto.id === evento.target.dataset.id);
        let novaQuantidade = parseInt(evento.target.value);
        if (produto) {
            produto.quantidade = novaQuantidade;
        }
        salvarProdutosNoCarrinho(produtos);
        atualizarCarrinhoETabela();

    }
});

function removerProdutodoCarrinho(id) {
    const produtos = obterProdutosDoCarrinho();
    const carrinhoAtualizado = produtos.filter(produto => produto.id !== id);
    salvarProdutosNoCarrinho(carrinhoAtualizado);
    atualizarCarrinhoETabela();
}

function atualizarValorTotalCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;

    produtos.forEach(produto => {
        total += produto.preco * produto.quantidade;
    });

    document.getElementById("total-carrinho").textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
}

function atualizarCarrinhoETabela() {
    atualizarContadorCarrinho();
    renderizarTabelaDoCarrinho();
    atualizarValorTotalCarrinho();
    atualizarSubtotalPedidos();
    limparValoresSeCarrinhoVazio();

function limparValoresSeCarrinhoVazio() {
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
}

atualizarCarrinhoETabela();

async function calcularFrete(cep) {
    const url = 'http://localhost:5678/webhook/fe7350bd-a2cd-4703-b45c-51b47379abb1';
    try {
        const produtos = obterProdutosDoCarrinho();
        const products = produtos.map(produto => ({
            quantity: produto.quantidade,
            height: 2,
            width: 10,
            length: 15,
            weight: produto.quantidade * 0.05
        }));

        const payload = { cep, products };

        const resposta = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

    const data = await resposta.json();
    return data;
    } catch (erro) {
        console.error('Erro ao calcular frete:', erro);
        return null;
    }
}
const erroCep = document.querySelector(".erro");
const btnCalcularFrete = document.getElementById("btn-calcular-frete");
const inputCep = document.getElementById("input-cep");
const valorFrete = document.getElementById("valor-frete");

inputCep.addEventListener("keydown", () => {
    if (event.key === "Enter") {
        btnCalcularFrete.click();
    }
});

btnCalcularFrete.addEventListener("click", async () => {
    const cep = inputCep.value.trim();

    if (!validarCep(cep)) {
        erroCep.textContent = "CEP inválido. Por favor, insira um CEP no formato 00000-000.";
        erroCep.style.display = "block";
        return;
    }

    const valorFreteSpan = valorFrete.querySelector('span');
    if (valorFreteSpan) {
        valorFreteSpan.textContent = 'Calculando...';
    }
    atualizarSubtotalPedidos();

    const frete = await calcularFrete(cep);
    if (frete && typeof frete.price !== 'undefined') {
        if (valorFreteSpan) {
            valorFreteSpan.textContent = `R$ ${Number(frete.price).toFixed(2).replace('.', ',')}`;
        }
        erroCep.style.display = 'none';
    } else {
        if (valorFreteSpan) {
            valorFreteSpan.textContent = 'Erro ao calcular frete';
        }
        erroCep.textContent = 'Erro ao calcular frete. Tente novamente.';
        erroCep.style.display = 'block';
    }
});

function validarCep(cep) {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    return cepRegex.test(cep);
}







