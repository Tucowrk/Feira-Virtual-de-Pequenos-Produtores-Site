document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-cadastro");

    formCadastro.addEventListener("submit", function(event) {

        event.preventDefault(); 

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value;
        const confirmar = document.getElementById("confirmar").value;
        const erro = document.getElementById("erro-senha");

        erro.style.display = "none";
        erro.innerText = "";

        if (senha.length < 12) {
            erro.innerText = "A senha deve ter no mínimo 12 caracteres.";
            erro.style.display = "block";
            return;
        }

        if (senha !== confirmar) {
            erro.innerText = "As senhas não são iguais.";
            erro.style.display = "block";
            return;
        }

        // Salvar no localStorage (Apenas para prototipagem)
        const usuario = { nome, email, senha };
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(usuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");

        // Redirecionamento após cadastro
        window.location.href = "./Acesse a sua conta/Acesseasuaconta.html";
    });
});
