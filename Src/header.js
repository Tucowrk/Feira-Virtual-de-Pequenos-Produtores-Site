document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const linkConta = document.getElementById("link-conta");

    if (usuarioLogado && linkConta) {
        const primeiroNome = usuarioLogado.nome.split(" ")[0];

        // Troca o ícone pelo nome do usuário 
        linkConta.innerHTML = `<span style="font-weight: 600; font-size: 16px; margin-right: 15px;">Olá, ${primeiroNome}</span>`;
        linkConta.href = "#"; // Aqui futuramente pode ir para uma página de Perfil
        linkConta.title = "Meu Perfil";

        // Cria um botão simples de "Sair" (Logout)
        const navIcons = document.querySelector(".icons");
        const btnSair = document.createElement("a");
        btnSair.href = "#";
        btnSair.innerHTML = `<span style="font-size: 14px; margin-right: 15px; color: #ffd1d1; font-weight: bold;">Sair</span>`;
        
        // Lógica de Sair: limpa o storage e recarrega a página
        btnSair.addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.removeItem("usuarioLogado"); // Apaga a "sessão"
            window.location.reload(); // Recarrega a página (o botão de login volta)
        });

        // Adiciona o botão "Sair" antes do link do usuário
        navIcons.insertBefore(btnSair, linkConta);
    }
});