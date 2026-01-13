function cadastrarCliente() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.querySelector('input[type="email"]').value.trim();
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmar").value;
    const erro = document.getElementById("erro-senha");

    erro.style.display = "none";
    erro.innerText = "";

    // Validação do nome
    if (nome === "") {
        erro.innerText = "Preencha o seu nome.";
        erro.style.display = "block";
        return;
    }

    // Validação do email
    if (email === "") {
        erro.innerText = "Preencha o seu e-mail.";
        erro.style.display = "block";
        return;
    }

    // Validação senha
    if (senha.length < 6) {
        erro.innerText = "A senha deve ter no mínimo 6 caracteres.";
        erro.style.display = "block";
        return;
    }

    // Confirmação de senha
    if (senha !== confirmar) {
        erro.innerText = "As senhas não são iguais.";
        erro.style.display = "block";
        return;
    }

    // Salvar no localStorage
    const usuario = { nome, email, senha };
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado com sucesso!");

    // Redirecionamento após cadastro
    window.location.href = "../index.html";
}

