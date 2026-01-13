const radios = document.querySelectorAll('input[name="payment"]');
const botao = document.querySelector(".btnFinalizar");

let totalFinallizar = document.getElementById("total")

let typePaymente = ''

radios.forEach(radio => {
    radio.addEventListener("change", () => {

        if (radio.value) {
            botao.disabled = false;
            console.log(radio.value)
            typePaymente = radio.value
        } else {
            botao.disabled = true;
        }

    });
});

function finalizar() {
    console.log(typePaymente)
}

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let lista = document.getElementById("lista-carrinho");
    let total = 0;

    
    // return; 
    
    carrinho.forEach((item, index) => {
        total += Number(item.price);
        console.log(total)
    });
    
    totalFinallizar.innerHTML = real.format(total)


     


}

carregarCarrinho()