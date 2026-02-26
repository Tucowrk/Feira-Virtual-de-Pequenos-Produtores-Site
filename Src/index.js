// Este arquivo está reservado APENAS para lógicas exclusivas da Página Inicial (Home).
// OBS: Toda a lógica de Carrinho e Formatação de Moeda está no global.js.

// Escutador de cliques global para os botões "Adicionar ao Carrinho"
document.addEventListener('click', function(e) {
    // Verifica se o elemento clicado tem a classe 'btn-add-carrinho'
    if (e.target.classList.contains('btn-add-carrinho')) {
        
        // Pega os atributos data-* do HTML do botão
        const id = e.target.dataset.id; // Adicionado ID para a lógica de quantidade funcionar
        const nome = e.target.dataset.name;
        const preco = e.target.dataset.price;
        const img = e.target.dataset.img;
        
        // Chama a nossa função global
        adicionarCarrinho({ id: id, name: nome, price: preco, img: img });
    }
});