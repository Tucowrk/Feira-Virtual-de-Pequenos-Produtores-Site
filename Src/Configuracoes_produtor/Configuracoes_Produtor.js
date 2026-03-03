document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Verifica a Autenticação e Autorização
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Se não tiver ninguém logado OU se o tipo não for 'produtor', joga para fora
    if (!usuarioLogado || usuarioLogado.tipo !== 'produtor') {
        alert("Acesso restrito! Esta área é exclusiva para Produtores Parceiros.");
        window.location.href = "../index.html";
        return;
    }

    // 2. Personaliza a página com os dados do Produtor
    const tituloBoasVindas = document.getElementById("boas-vindas");
    if (tituloBoasVindas) {
        // Pega apenas o primeiro nome (ex: "Sítio São José" -> "Sítio")
        const primeiroNome = usuarioLogado.nome.split(" ")[0];
        tituloBoasVindas.innerText = `Olá, ${primeiroNome}!`;
    }

    // 3. Configura a função de Sair da Conta
    const btnSair = document.getElementById("btn-sair-painel");
    if (btnSair) {
        btnSair.addEventListener("click", () => {
            if(confirm("Tem certeza que deseja sair do seu painel?")) {
                localStorage.removeItem("usuarioLogado");
                window.location.href = "../index.html";
            }
        });
    }

    // 4. Configura o botão para a futura tela de Cadastro de Produtos
    const btnNovoProduto = document.getElementById("btn-novo-produto");
    if (btnNovoProduto) {
        btnNovoProduto.addEventListener("click", () => {
            // Este é o link para a página que construiremos logo em seguida
            window.location.href = "./cadastro-de-produtos.html";
        });
    }
});