# E-commerce Dofus 3.0 com Automação (N8n) - Autoral

**Descrição**  
Projeto autoral inspirado no universo de Dofus (Edição Física: Heróis do Mundo dos Doze). Um e-commerce funcional de classes do jogo, construído com HTML, CSS e JavaScript, e automatizado com N8n para funcionalidades como API de frete. 

Link do projeto: (https://erickao-120hzz.github.io/e-commerce-Dofus-n8n/)

---

##  Tecnologias Utilizadas

- **HTML5** — Estrutura semântica e acessível do site.  
- **CSS3** — Estilos com Flexbox e Grid, design responsivo e visual personalizado.  
- **JavaScript (Vanilla)** — Lógica do carrinho de compras, manipulação do DOM, armazenamento no localStorage e integração com APIs.  
- **N8n** — Automação de backend para fluxo de trabalho, como consulta à API de frete ou envio de notificações.  
- **API de Frete** — Integração para cálculo dinâmico de frete, exibindo o valor corretamente no carrinho.  

---

##  Funcionalidades Principais

- Catálogo de produtos (classes de Dofus) com nomes, imagens e preços.  
- Adicionar produtos ao carrinho com atualização dinâmica da quantidade e cálculo correto de preço (lembrando o fix com `replace(",", ".")`).  
- Internação no localStorage para persistência entre sessões.  
- Automatização do cálculo de frete/envio com N8n.  
- Checkout simulado (com placeholders ou automações conforme aprimoramento futuro).

---

##  Exemplo de uso

1. Acesse o repositório e clone-o:  
   ```bash
   git clone https://github.com/erickao-120hzz/e-commerce-Dofus-n8n.git

2. Navegue até a pasta do projeto:

cd e-commerce-Dofus-n8n

3. Abra o arquivo index.html no navegador da sua escolha.

4. Interaja com o e-commerce: adicione produtos ao carrinho, veja os cálculos de valores e automações em funcionamento.

Como rodar localmente com servidor (opcional)

Para evitar problemas com CORS ou funcionalidades de API, pode ser útil rodar um servidor local simples:

---

# Com Python 3
python -m http.server 8000

# Ou, se usar o Node.js
npx http-server

Depois, abra http://localhost:8000.

---

Contribuições e próximos passos:

# Esse é um projeto em desenvolvimento. Futuramente, serão bem-vindas:

Integração real com método de pagamento.

Finalização do fluxo com N8n (ex: confirmação de pedido via Discord ou e-mail).

Melhorias visuais e responsivas.

Testes automatizados (Jest) e deploy contínuo.

---

## Contato 

Feito por Erick 

GitHub: erickao-120hzz

E-mail: (erickcarvalho661@hotmail.com)

LinkedIn: (https://www.linkedin.com/in/erick-carvalho-394860243/)

---

###  Por que esse modelo funciona bem:

- **Clareza**: define logo o que é o projeto e seu objetivo.
- **Profissionalismo**: evidencia as tecnologias e automações usadas.
- **Prático**: mostra como executar localmente.
- **Foco futuro**: abre caminho para você evoluir o projeto e mostrar versatilidade.

---
