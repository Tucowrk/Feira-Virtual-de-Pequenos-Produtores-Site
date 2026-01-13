// Filtrar por categoria
const filtroCategoria = document.getElementById("filtroCategoria");
const cardsProdutos = document.querySelectorAll(".card");

filtroCategoria.addEventListener("change", () => {
    const categoriaSelecionada = filtroCategoria.value;

    // Redirecionar para páginas ARTESANATO e HORTIFRUTI
    if (categoriaSelecionada === "Artesanato") {
        window.location.href = "../Artesanato/artesanato.html"; // Alterar o caminho (aguardando)
        return;
    }
    if (categoriaSelecionada === "Hortifruti") {
        window.location.href = "../Hortifruti/hortifruti.html"; // Alterar o caminho (aguardando)
        return;
    }

    if (categoriaSelecionada === "Mercearia") {
        window.location.href = "../Mercearia/Mercearia.html"; // Alterar o caminho (aguardando)
        return;
    }

    // Se selecionou "Todas as categorias", mostra todos os cards na página atual
    cardsProdutos.forEach(card => {
        const categoriaCard = card.getAttribute("data-categoria");

        if (categoriaSelecionada === "Todas as categorias" || categoriaSelecionada === categoriaCard) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// Ordenar por preço
const ordenarPreco = document.getElementById("ordenarPreco");
const containerCards = document.querySelector(".cards-produtos");

ordenarPreco.addEventListener("change", () => {
    let cardsArray = Array.from(cardsProdutos);

    if (ordenarPreco.value === "Menor preço") {
        cardsArray.sort((a, b) => extrairPreco(a) - extrairPreco(b));
    }
    if (ordenarPreco.value === "Maior preço") {
        cardsArray.sort((a, b) => extrairPreco(b) - extrairPreco(a));
    }
    if (ordenarPreco.value === "Mais recentes") {
        cardsArray.reverse();
    }

    containerCards.innerHTML = "";
    cardsArray.forEach(c => containerCards.appendChild(c));
});

function extrairPreco(card) {
    let precoTexto = card.querySelector(".preco").innerText;
    return parseFloat(precoTexto.replace("R$", "").replace(",", "."));
}


// Busca por nome, categoria
const campoBusca = document.querySelector(".campo-busca");

campoBusca.addEventListener("input", () => {
    const query = campoBusca.value.toLowerCase().trim();

    cardsProdutos.forEach(card => {
        const nomeProduto = card.querySelector("p").innerText.toLowerCase();
        const categoriaCard = card.getAttribute("data-categoria").toLowerCase();

        if (nomeProduto.includes(query) || categoriaCard.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});






function listProducts(list) {
    const listProducts = document.querySelector('#listProducts');

    list.forEach(item => {

        listProducts.innerHTML +=
            `
            <div class="card" data-categoria="Mercearia">
                <img src="../assets/pagina-padrao/pagina-mercearia/${item.img}" alt="Doce de Leite Caseiro">
                <p>${item.name}</p>
                <p>${real.format(item.price)}</p>
                <button class="btn-carrinho" onclick="adicionarCarrinho(${item})">Adicionar ao carrinho</button>
            </div>
            `
    });

}

listProducts(produtos);