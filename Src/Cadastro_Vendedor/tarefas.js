document.addEventListener("DOMContentLoaded", () => {
    const cadastroForm = document.getElementById("cadastro-form");

    // Função para preencher o formulário se já houver dados salvos
    function preencherFormulario() {
        const savedEmail = localStorage.getItem("ultimo_email_vendedor");
        if (!savedEmail) return;

        const vendedorData = localStorage.getItem(`vendedor_${savedEmail}`);
        if (!vendedorData) return;

        const vendedor = JSON.parse(vendedorData);

        document.getElementById("nome").value = vendedor.nome || "";
        document.getElementById("email").value = vendedor.email || "";
        document.getElementById("telefone").value = vendedor.telefone || "";
        document.getElementById("senha").value = vendedor.senha || "";
        document.getElementById("localizacao").value = vendedor.localizacao || "";
        document.getElementById("descricao").value = vendedor.descricao || "";

        // Preenche checkboxes de produção
        if (vendedor.tiposProducao && vendedor.tiposProducao.length > 0) {
            vendedor.tiposProducao.forEach(tipo => {
                const checkbox = document.querySelector(`input[name="tipo_producao"][value="${tipo}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }

        // Marca termos como aceitos (opcional)
        document.getElementById("terms").checked = true;
    }

    if (cadastroForm) {
        cadastroForm.addEventListener("submit", handleFormSubmission);
    }

    function handleFormSubmission(event) {
        event.preventDefault();

        const name = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const localizacao = document.getElementById("localizacao").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const termosAceitos = document.getElementById("terms").checked;
        const tiposProducao = Array.from(
            document.querySelectorAll('input[name="tipo_producao"]:checked')
        ).map(item => item.value);

        // Validações
        if (!name || !email || !senha) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }

        if (!termosAceitos) {
            alert("Você deve aceitar os termos para continuar.");
            return;
        }

        // Monta objeto do vendedor
        const vendedor = {
            nome: name,
            email: email,
            telefone: telefone,
            senha: senha,
            localizacao: localizacao,
            descricao: descricao,
            tiposProducao: tiposProducao
        };

        // Salva no localStorage (usar email como chave para facilitar)
        localStorage.setItem(`vendedor_${email}`, JSON.stringify(vendedor));
        // Salva último email usado para preencher automaticamente
        localStorage.setItem("ultimo_email_vendedor", email);

        alert("Cadastro realizado com sucesso!");
        window.location.href = "../Configuracoes_produtor/Configuracoes_Produtor.html";
    }

    // Chama a função para preencher o formulário se já existir cadastro
    preencherFormulario();
});
