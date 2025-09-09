export async function calcularFrete(cep) {
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

export function validarCep(cep) {
    const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
    return cepRegex.test(cep);
}
