window.location.href = "../Acesse a sua conta/Acesse a sua conta.html";

// Formatação de Moeda Padrão
const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
};

// Gerenciamento de Carrinho (Simplificado e Centralizado)
const Carrinho = {
    adicionar: (produto) => {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        carrinho.push(produto);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        alert(`${produto.name} adicionado ao carrinho!`);
    },
    
    obterTotal: () => {
        let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
        return carrinho.reduce((total, item) => total + Number(item.price), 0);
    },

    listar: () => {
        return JSON.parse(localStorage.getItem('carrinho')) || [];
    }
};

// Exemplo de uso no clique do botão (genérico)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-add-carrinho')) {
        // Supondo que o botão tenha atributos data-name e data-price
        const nome = e.target.dataset.name;
        const preco = e.target.dataset.price;
        const img = e.target.dataset.img;
        
        Carrinho.adicionar({ name: nome, price: preco, img: img });
    }
});