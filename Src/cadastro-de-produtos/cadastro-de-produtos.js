 // ===== Estado =====
    const state = {
      produtos: JSON.parse(localStorage.getItem('produtosFV') || '[]'),
      imagensBuffer: [] // File objects temporários para o produto atual
    };

    // ===== Util =====
    const el = (sel,root=document)=>root.querySelector(sel);
    const money = v => Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

    // ===== Renderização da lista =====
    const lista = el('#listaProdutos');
    const emptyState = el('#emptyState');

    function renderLista(filter=''){
      lista.innerHTML = '';
      const dados = state.produtos.filter(p => p.nome.toLowerCase().includes(filter.toLowerCase()));
      emptyState.style.display = dados.length ? 'none' : 'block';

      dados.forEach((p, idx)=>{
        const card = document.createElement('div');
        card.className = 'p-card';
        card.innerHTML = `
          <div class="img">${p.imagens?.length ? `<img src="${p.imagens[0]}" alt="${p.nome}">` : '🖼️'}</div>
          <div class="info">
            <div class="row">
              <div class="category-name">${p.nome}</div>
              <div class="chip">${p.unidade}</div>
            </div>
            <div class="row">
              <div>
                <span class="price-24">${money(p.preco)}</span>
                <span class="text-14 muted"> • Estoque: ${p.estoque}</span>
              </div>
              <span class="text-14 muted">${p.categoria}</span>
            </div>
            <p class="product-desc" style="margin:4px 0 0">${p.descricao ? p.descricao : ''}</p>
            <div class="row" style="margin-top:8px">
              <button class="btn light cart-label" data-editar="${idx}" title="Editar">Editar</button>
              <div class="actions">
                <button class="btn ghost cart-label" data-detalhes="${idx}" title="Detalhes">Detalhes</button>
                <button class="btn danger cart-label" data-excluir="${idx}" title="Excluir">Excluir</button>
              </div>
            </div>
          </div>`;
        lista.appendChild(card);
      });
    }

    // ===== Filtro =====
    el('#busca').addEventListener('input', e=> renderLista(e.target.value));

    // ===== Upload (drag & drop) =====
    const drop = el('#drop');
    const fileInput = el('#file');
    const preview = el('#preview');

    function addFiles(files){
      for(const f of files){
        if(!f.type.startsWith('image/')) continue;
        const url = URL.createObjectURL(f);
        state.imagensBuffer.push({file:f, url});
        const box = document.createElement('div');
        box.className = 'thumb';
        box.innerHTML = `<img src="${url}" alt="Prévia">
                         <button type="button" title="Remover">✕</button>`;
        box.querySelector('button').onclick = ()=>{
          URL.revokeObjectURL(url);
          state.imagensBuffer = state.imagensBuffer.filter(i=>i.url!==url);
          box.remove();
        };
        preview.appendChild(box);
      }
    }

    drop.addEventListener('dragover', e=>{ e.preventDefault(); drop.classList.add('drag'); });
    drop.addEventListener('dragleave', ()=> drop.classList.remove('drag'));
    drop.addEventListener('drop', e=>{
      e.preventDefault(); drop.classList.remove('drag');
      addFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', e=> addFiles(e.target.files));

    // ===== Formulário =====
    const form = el('#formProduto');
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      // validações simples
      const nome = el('#nome').value.trim();
      const categoria = el('#categoria').value;
      const preco = parseFloat(el('#preco').value.replace(',','.'));
      const unidade = el('#unidade').value;
      const estoque = parseInt(el('#estoque').value);
      const status = el('#status').value;
      const descricao = el('#descricao').value.trim();

      if(!nome || !categoria || !unidade || isNaN(preco) || isNaN(estoque)){
        alert('Preencha os campos obrigatórios.'); return;
      }

      // “Upload” fake: mantém URLs temporárias para visualização
      const imagens = state.imagensBuffer.map(i=>i.url);

      state.produtos.push({nome,categoria,preco,unidade,estoque,status,descricao,imagens,createdAt:Date.now()});
      localStorage.setItem('produtosFV', JSON.stringify(state.produtos));

      // reset
      form.reset();
      preview.innerHTML = '';
      state.imagensBuffer = [];

      renderLista(el('#busca').value);
      window.scrollTo({top:0,behavior:'smooth'});
    });

    // Ações dos cards (delegation)
    lista.addEventListener('click', e=>{
      const del = e.target.closest('[data-excluir]');
      const det = e.target.closest('[data-detalhes]');
      const edt = e.target.closest('[data-editar]');
      if(del){
        const i = +del.dataset.excluir;
        if(confirm('Excluir este produto?')){
          state.produtos.splice(i,1);
          localStorage.setItem('produtosFV', JSON.stringify(state.produtos));
          renderLista(el('#busca').value);
        }
      }
      if(det){
        const i = +det.dataset.detalhes;
        const p = state.produtos[i];
        alert(`${p.nome}\n${p.categoria} • ${money(p.preco)} • ${p.unidade}\nEstoque: ${p.estoque}\nStatus: ${p.status}\n\n${p.descricao || ''}`);
      }
      if(edt){
        const i = +edt.dataset.editar;
        const p = state.produtos[i];
        // carrega no formulário para edição rápida
        el('#nome').value = p.nome;
        el('#categoria').value = p.categoria;
        el('#preco').value = p.preco;
        el('#unidade').value = p.unidade;
        el('#estoque').value = p.estoque;
        el('#status').value = p.status;
        el('#descricao').value = p.descricao || '';
        preview.innerHTML = '';
        state.imagensBuffer = [];
        // remove do array e salva; ao enviar, voltará como novo
        state.produtos.splice(i,1);
        localStorage.setItem('produtosFV', JSON.stringify(state.produtos));
        renderLista(el('#busca').value);
        window.scrollTo({top:document.body.scrollHeight,behavior:'smooth'});
      }
    });

    // Inicializa com 4 itens fake se vazio (só para ilustração)
    if (state.produtos.length === 0) {
  state.produtos = [
    {
      nome: 'Banana Prata',
      categoria: 'Frutas',
      preco: 5.90,
      unidade: 'Kg',
      estoque: 30,
      status: 'Ativo',
      descricao: 'Banana fresca.',
      imagens: ['https://i.pinimg.com/736x/67/da/bb/67dabbc19222e088058cda4e621c7c60.jpg']        // 👈 caminho relativo no repo
    },
    {
      nome: 'Geleia de Goiaba',
      categoria: 'Outros',
      preco: 12.00,
      unidade: 'Un',
      estoque: 12,
      status: 'Ativo',
      descricao: 'Geleia artesanal.',
      imagens: ['https://i.pinimg.com/1200x/f5/55/7e/f5557e02f4141464268099198dd710e7.jpg']      // 👈 webp também funciona
    },
    {
      nome: 'Leite de Coco',
      categoria: 'Bebidas',
      preco: 8.50,
      unidade: 'Lt',
      estoque: 20,
      status: 'Ativo',
      descricao: 'Extrato natural.',
      imagens: ['https://i.pinimg.com/736x/5a/44/f1/5a44f15edc3dd4071b37e661f7043b84.jpg']
    },
    {
      nome: 'Uva Itália',
      categoria: 'Frutas',
      preco: 11.90,
      unidade: 'Kg',
      estoque: 18,
      status: 'Ativo',
      descricao: 'Doce e fresca.',
      imagens: ['https://i.pinimg.com/1200x/35/cc/55/35cc55d78087205b01a5ff1b0473230c.jpg']
    }
  ];
  localStorage.setItem('produtosFV', JSON.stringify(state.produtos));
}
renderLista();