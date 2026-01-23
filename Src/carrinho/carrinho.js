// document.addEventListener("DOMContentLoaded",);
const real = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
});

function carregarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let lista = document.getElementById("lista-carrinho");
    let total = 0;
    

    lista.innerHTML = "";
    console.log(carrinho)


    // return; 

    carrinho.forEach((item, index) => {
        total += Number(item.price);
        console.log(total)

        lista.innerHTML +=
            `
                <div class="cardItem">
                    <div class="cardImage">
                        <img src="${item.img}" alt="Tomate Orgânico" />
                    </div>
                    <div class="cardInfoRow">
                        <div class="cardItemInfo">
                            <h3>${item.name}</h3>
                            <p>Produto do produtor local</p>
                        </div>
                        <div class="cardItemValue">
                            <span>${real.format(item.price)}</span>
                            <div class="cardItemActions">
                                <div class="qty">
                                    <button>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM10.793 5.293L6.793 9.293C6.60553 9.48053 6.50021 9.73484 6.50021 10C6.50021 10.2652 6.60553 10.5195 6.793 10.707L10.793 14.707C10.8852 14.8025 10.9956 14.8787 11.1176 14.9311C11.2396 14.9835 11.3708 15.0111 11.5036 15.0123C11.6364 15.0134 11.7681 14.9881 11.891 14.9378C12.0139 14.8875 12.1255 14.8133 12.2194 14.7194C12.3133 14.6255 12.3875 14.5139 12.4378 14.391C12.4881 14.2681 12.5134 14.1364 12.5123 14.0036C12.5111 13.8708 12.4835 13.7396 12.4311 13.6176C12.3787 13.4956 12.3025 13.3852 12.207 13.293L8.914 10L12.207 6.707C12.3892 6.5184 12.49 6.2658 12.4877 6.0036C12.4854 5.7414 12.3802 5.49059 12.1948 5.30518C12.0094 5.11977 11.7586 5.0146 11.4964 5.01233C11.2342 5.01005 10.9816 5.11084 10.793 5.293Z"
                                                fill="black" />
                                        </svg>

                                    </button>
                                    <div>1</div>
                                    <button>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9.207 14.707L13.207 10.707C13.3945 10.5195 13.4998 10.2652 13.4998 10C13.4998 9.73484 13.3945 9.48053 13.207 9.293L9.207 5.293C9.11475 5.19749 9.00441 5.12131 8.8824 5.0689C8.7604 5.01649 8.62918 4.9889 8.4964 4.98775C8.36362 4.9866 8.23194 5.0119 8.10905 5.06218C7.98615 5.11246 7.8745 5.18671 7.78061 5.2806C7.68671 5.3745 7.61246 5.48615 7.56218 5.60905C7.5119 5.73194 7.4866 5.86362 7.48775 5.9964C7.4889 6.12918 7.51649 6.2604 7.5689 6.3824C7.62131 6.50441 7.69749 6.61475 7.793 6.707L11.086 10L7.793 13.293C7.61084 13.4816 7.51005 13.7342 7.51233 13.9964C7.5146 14.2586 7.61977 14.5094 7.80518 14.6948C7.99059 14.8802 8.2414 14.9854 8.5036 14.9877C8.7658 14.99 9.0184 14.8892 9.207 14.707Z"
                                                fill="black" />
                                        </svg>

                                    </button>
                                </div>
                                <button class="trash" onclick='removerItem(${index})'>
                                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1 5H17M7 9V15M11 9V15M2 5L3 17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19H13C13.5304 19 14.0391 18.7893 14.4142 18.4142C14.7893 18.0391 15 17.5304 15 17L16 5M6 5V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V5"
                                            stroke="black" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>

                                </button>
                            </div>
                        </div>
                    </div>
                </divo
            `
    });

    document.getElementById("total").innerText = real.format(total);
    

}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();

}

carregarCarrinho()

