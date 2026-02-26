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

document.addEventListener("DOMContentLoaded", () => {
    // 1. Verifica se existe alguém logado no localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const linkConta = document.getElementById("link-conta");

    // Se o usuário estiver logado e o link existir na tela
    if (usuarioLogado && linkConta) {
        // Pega apenas o primeiro nome para não ficar muito longo
        const primeiroNome = usuarioLogado.nome.split(" ")[0];

        // 2. Troca o ícone pelo nome do usuário
        linkConta.innerHTML = `<span style="font-weight: 600; font-size: 16px; margin-right: 15px;">Olá, ${primeiroNome}</span>`;
        linkConta.href = "#"; // Aqui futuramente pode ir para uma página de Perfil
        linkConta.title = "Meu Perfil";

        // 3. Cria um botão simples de "Sair" (Logout)
        const navIcons = document.querySelector(".icons");
        const btnSair = document.createElement("a");
        btnSair.href = "#";
        btnSair.innerHTML = `<span style="font-size: 14px; margin-right: 15px; color: #ffd1d1; font-weight: bold;">Sair</span>`;
        
        // 4. Lógica de Sair: limpa o storage e recarrega a página
        btnSair.addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.removeItem("usuarioLogado"); // Apaga a "sessão"
            window.location.reload(); // Recarrega a página (o botão de login volta)
        });

        // Adiciona o botão "Sair" antes do link do usuário
        navIcons.insertBefore(btnSair, linkConta);
    }
});