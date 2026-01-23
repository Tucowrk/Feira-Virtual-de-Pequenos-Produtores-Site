function adicionarCarrinho(data) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    carrinho.push(data);
    
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

const real = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});
