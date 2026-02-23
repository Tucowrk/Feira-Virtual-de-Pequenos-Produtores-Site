function adicionarCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    // Verificador se o item já está no carrinho pelo ID
    const indexExistente = carrinho.findIndex(item => item.id === produto.id);

    if (indexExistente !== -1) {
        // Se já existe, apenas aumenta a quantidade
        carrinho[indexExistente].quantidade += 1;
    } else {
        // Se não existe, adiciona o produto com quantidade 1
        carrinho.push({ ...produto, quantidade: 1 });
    }
    
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert(`${produto.name} adicionado ao carrinho!`);
}