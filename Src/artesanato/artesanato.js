
function listProducts(list) {
    const listProducts = document.querySelector('.cards-produtos');
    listProducts.innerHTML = ''
    if(list.length == 0) {
        listProducts.innerHTML = `<p>Sem produtos nesta categoria</p>`
        return;
    }
    
    list.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML =
            `
                <img src="${item.img}" alt="cesta-de-palha">
                <p>${item.name}</p>
                <p>${real.format(item.price)}</P>
                <button>Adicionar ao carrinho</button>
            `

        card.querySelector('button').addEventListener('click', () => adicionarCarrinho(item));
        listProducts.appendChild(card);

    });

}


// Filtrar por categoria
const filtroCategoria = document.getElementById("filtroCategoria");
const cardsProdutos = document.querySelectorAll(".card");



filtroCategoria.addEventListener("change", () => {
    const categoriaSelecionada = filtroCategoria.value;

    if(categoriaSelecionada == ''){
        listProducts(produtos)
        return;
    }
    
    let filterItens = produtos.filter(prod => prod.category == categoriaSelecionada.toLowerCase())
    console.log(filterItens)
    listProducts(filterItens)

    
});



function setValue(value) {
    let filterItens = produtos.filter(prod => prod.category == value.toLowerCase())
    console.log('ss',filterItens)
    listProducts(filterItens)
}




 
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
 
// Adicionar ao Carrinho
const botoesCarrinho = document.querySelectorAll(".btn-carrinho");
 
botoesCarrinho.forEach(btn => {
    btn.addEventListener("click", () => {
        const produto = btn.parentElement.querySelector("p").innerText;
        const preco = btn.parentElement.querySelector(".preco").innerText;
 
        let quantidade = prompt(`Quantas unidades de "${produto}" deseja adicionar?`);
 
        if (quantidade === null || quantidade === "" || quantidade <= 0) {
            alert("Quantidade inválida");
            return;
        }
 
       
        let itemCarrinho = {
            produto: produto,
            preco: preco,
            quantidade: quantidade
        };
 
        localStorage.setItem("itemCarrinho", JSON.stringify(itemCarrinho));
 
        // Redirecionar para carrinho
        window.location.href = "../carrinho/carrinho.html";
    });
});
 
// Busca por nome, categoria
const campoBusca = document.querySelector(".campo-busca");
 
campoBusca.addEventListener("input", () => {
    const query = campoBusca.value.toLowerCase().trim();
 
    cardsProdutos.forEach(card => {
        const nomeProduto = card.querySelector("p").innerText.toLowerCase();
        const categoriaCard = "artesanato";
 
        if (nomeProduto.includes(query) || categoriaCard.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

function getFilterParams() {
    const currentUrl = window.location.href;
    const params = new URL(currentUrl).searchParams;
    const category = params.get("categoria")
    console.log(category.toString())
    setValue(category)
}



listProducts(produtos);
getFilterParams();
