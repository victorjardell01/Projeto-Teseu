// Estado global da aplicação com tratamento de segurança para evitar NaN/undefined
let estadoNutricional = JSON.parse(localStorage.getItem('druida_estado')) || {};

estadoNutricional = {
    diaAtual: estadoNutricional.diaAtual || 'segunda',
    refeicaoAtual: estadoNutricional.refeicaoAtual || 'cafe',
    pesoAtual: Number(estadoNutricional.pesoAtual) || 89,
    altura: Number(estadoNutricional.altura) || 1.65,
    metaCalorias: Number(estadoNutricional.metaCalorias) || 2100,
    calorias: Number(estadoNutricional.calorias) || 0,
    proteina: Number(estadoNutricional.proteina) || 0,
    carbo: Number(estadoNutricional.carbo) || 0,
    gordura: Number(estadoNutricional.gordura) || 0,
    xp: Number(estadoNutricional.xp) || 0,
    historicoPeso: Array.isArray(estadoNutricional.historicoPeso) ? estadoNutricional.historicoPeso : []
};

// Banco de dados dos alimentos disponíveis por refeição
const cardapioRefeicoes = {
    cafe: [
        { id: 'cafe_preto', nome: 'Café Preto (com ou sem adoçante)', tipo: 'ml', base: 100, cal: 5, prot: 0.1, carbo: 1, gord: 0, xp: 1 },
        { id: 'leite', nome: 'Leite Integral / Desnatado', tipo: 'ml', base: 100, cal: 60, prot: 3.2, carbo: 4.5, gord: 3, xp: 2 },
        { id: 'ovos', nome: 'Ovos Cozidos / Mexidos', tipo: 'unidade', base: 1, cal: 70, prot: 6, carbo: 0.4, gord: 5, xp: 10 },
        { id: 'pao_frances', nome: 'Pão Francês', tipo: 'unidade', base: 1, cal: 140, prot: 4.5, carbo: 28, gord: 1, xp: 12 },
        { id: 'tapioca', nome: 'Massa de Tapioca', tipo: 'g', base: 100, cal: 240, prot: 0.2, carbo: 58, gord: 0.1, xp: 10 }
    ],
    almoco: [
        { id: 'arroz', nome: 'Arroz Cozido', tipo: 'g', base: 100, cal: 130, prot: 2.5, carbo: 28, gord: 0.3, xp: 5 },
        { id: 'feijao', nome: 'Feijão Carioca/Preto', tipo: 'g', base: 100, cal: 76, prot: 4.8, carbo: 14, gord: 0.5, xp: 8 },
        { id: 'frango', nome: 'Frango Grelhado ou Desfiado', tipo: 'g', base: 100, cal: 165, prot: 31, carbo: 0, gord: 3.6, xp: 15 },
        { id: 'salada', nome: 'Salada Verde com Tomate', tipo: 'g', base: 100, cal: 20, prot: 1, carbo: 4, gord: 0.2, xp: 5 }
    ],
    lanche: [
        { id: 'banana', nome: 'Banana', tipo: 'unidade', base: 1, cal: 90, prot: 1.1, carbo: 23, gord: 0.3, xp: 8 },
        { id: 'maca', nome: 'Maçã', tipo: 'unidade', base: 1, cal: 60, prot: 0.3, carbo: 15, gord: 0.2, xp: 8 },
        { id: 'vitamina', nome: 'Vitamina de Leite com Banana', tipo: 'ml', base: 100, cal: 80, prot: 3, carbo: 12, gord: 2, xp: 10 }
    ],
    jantar: [
        { id: 'omelete', nome: 'Omelete (Ovos + Legumes)', tipo: 'unidade', base: 1, cal: 220, prot: 18, carbo: 5, gord: 14, xp: 20 },
        { id: 'sopao', nome: 'Sopão de Frango com Legumes', tipo: 'ml', base: 100, cal: 50, prot: 3.5, carbo: 6, gord: 1, xp: 10 }
    ]
};

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const inputPeso = document.getElementById('input-peso-atual');
    if (inputPeso) {
        inputPeso.value = estadoNutricional.pesoAtual;
    }
    atualizarInterface();
    destacarDiaAtivo();
    renderizarItensRefeicao();
    renderizarHistorico();
});

// Seleciona o dia da semana
function selecionarDia(dia) {
    estadoNutricional.diaAtual = dia;
    destacarDiaAtivo();
    salvarEstado();
}

// Destaca visualmente o botão do dia ativo
function destacarDiaAtivo() {
    const botoesDias = document.querySelectorAll('.day-btn');
    botoesDias.forEach(btn => {
        if(btn.dataset.day === estadoNutricional.diaAtual) {
            btn.classList.add('active');
            const labelDia = document.getElementById('label-dia-ativo');
            if(labelDia) labelDia.innerText = btn.innerText;
        } else {
            btn.classList.remove('active');
        }
    });
}

// Abre a aba da refeição
function abrirRefeicao(tipoRefeicao) {
    estadoNutricional.refeicaoAtual = tipoRefeicao;
    const abas = document.querySelectorAll('.meal-tab-btn');
    abas.forEach(aba => aba.classList.remove('active'));
    
    if(event && event.target) {
        event.target.classList.add('active');
    }
    renderizarItensRefeicao();
}

// Renderiza a lista de comidas
function renderizarItensRefeicao() {
    const container = document.getElementById('container-refeicao-ativa');
    if (!container) return;

    const itens = cardapioRefeicoes[estadoNutricional.refeicaoAtual] || [];
    
    let html = '';
    itens.forEach(alimento => {
        html += `
            <div class="inventory-item-row">
                <div class="item-info">
                    <strong>${alimento.nome}</strong>
                    <span style="font-size: 0.8rem; color: #a3e4d7;">(por ${alimento.base}${alimento.tipo})</span>
                </div>
                <div class="item-action-group">
                    <input type="number" id="qtd-${alimento.id}" placeholder="Qtd (${alimento.tipo})" min="0" step="any">
                    <button class="add-btn" onclick="consumirItem('${alimento.id}')">Adicionar</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Consome o item e soma macros
function consumirItem(idAlimento) {
    const inputQtd = document.getElementById(`qtd-${idAlimento}`);
    if (!inputQtd) return;

    const quantidade = parseFloat(inputQtd.value);

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, digite uma quantidade válida.");
        return;
    }

    const alimento = cardapioRefeicoes[estadoNutricional.refeicaoAtual].find(item => item.id === idAlimento);
    if (!alimento) return;

    const proporcao = quantidade / alimento.base;

    estadoNutricional.calorias += Math.round(alimento.cal * proporcao);
    estadoNutricional.proteina += Math.round((alimento.prot * proporcao) * 10) / 10;
    estadoNutricional.carbo += Math.round((alimento.carbo * proporcao) * 10) / 10;
    estadoNutricional.gordura += Math.round((alimento.gord * proporcao) * 10) / 10;
    estadoNutricional.xp += Math.round(alimento.xp * proporcao);

    inputQtd.value = '';
    salvarEstado();
    atualizarInterface();
}

// Atualiza o peso, recalcula o IMC e ajusta o déficit calórico de forma inteligente
function atualizarPesoCorporal() {
    const inputPeso = document.getElementById('input-peso-atual');
    if (!inputPeso) return;

    const novoPeso = parseFloat(inputPeso.value);
    
    if (isNaN(novoPeso) || novoPeso <= 30) {
        alert("Insira um peso válido em kg.");
        return;
    }

    estadoNutricional.pesoAtual = novoPeso;
    
    // Ajuste dinâmico do déficit calórico com base no peso (exemplo progressivo para emagrecimento)
    // Conforme o peso diminui, o gasto energético basal reduz levemente
    estadoNutricional.metaCalorias = Math.round(2200 - ((89 - novoPeso) * 15)); 
    if(estadoNutricional.metaCalorias < 1800) estadoNutricional.metaCalorias = 1800; // Limite de segurança

    // Adiciona ao histórico de peso com data atual
    const dataFormatada = new Date().toLocaleDateString('pt-BR');
    estadoNutricional.historicoPeso.unshift({ data: dataFormatada, peso: novoPeso });

    // Mantém apenas os últimos 10 registros no histórico para não lotar
    if(estadoNutricional.historicoPeso.length > 10) {
        estadoNutricional.historicoPeso.pop();
    }

    salvarEstado();
    atualizarInterface();
    renderizarHistorico();
    alert("Peso atualizado com sucesso e status do Druida recalculados!");
}

// Renderiza a lista do histórico na tela
function renderizarHistorico() {
    const lista = document.getElementById('lista-historico-peso');
    if (!lista) return;

    if(estadoNutricional.historicoPeso.length === 0) {
        lista.innerHTML = "<li>Nenhum registro anterior salvo ainda. Atualize seu peso acima!</li>";
        return;
    }

    let html = '';
    estadoNutricional.historicoPeso.forEach((reg, index) => {
        let rotulo = index === 0 ? "📍 Peso Atual" : `📅 Registro anterior (${reg.data})`;
        html += `<li style="margin-bottom: 4px;">${rotulo}: <strong>${reg.peso} kg</strong></li>`;
    });
    lista.innerHTML = html;
}

// Salva no localStorage
function salvarEstado() {
    localStorage.setItem('druida_estado', JSON.stringify(estadoNutricional));
}

// Atualiza a interface visual
function atualizarInterface() {
    // Cálculo do IMC: Peso / (Altura * Altura)
    const imc = estadoNutricional.pesoAtual / (estadoNutricional.altura * estadoNutricional.altura);
    
    const elImc = document.getElementById('imc-atual');
    const elMeta = document.getElementById('meta-calorias');
    const elMetaDisp = document.getElementById('meta-calorias-display');
    const elCal = document.getElementById('calorias-atual');
    const elProt = document.getElementById('proteina-atual');
    const elCarbo = document.getElementById('carbo-atual');
    const elGord = document.getElementById('gordura-atual');
    const elXp = document.getElementById('xp-atual');

    if (elImc) elImc.innerText = imc.toFixed(1);
    if (elMeta) elMeta.innerText = estadoNutricional.metaCalorias;
    if (elMetaDisp) elMetaDisp.innerText = estadoNutricional.metaCalorias;
    
    if (elCal) elCal.innerText = estadoNutricional.calorias;
    if (elProt) elProt.innerText = estadoNutricional.proteina;
    if (elCarbo) elCarbo.innerText = estadoNutricional.carbo;
    if (elGord) elGord.innerText = estadoNutricional.gordura;
    if (elXp) elXp.innerText = estadoNutricional.xp;
}

function adicionarAlimentoPersonalizado() {
    const nome = document.getElementById('novo-nome').value.trim();
    const cal = parseFloat(document.getElementById('novo-cal').value);
    const prot = parseFloat(document.getElementById('novo-prot').value) || 0;
    const carbo = parseFloat(document.getElementById('novo-carbo').value) || 0;
    const gord = parseFloat(document.getElementById('novo-gord').value) || 0;

    if (!nome || isNaN(cal)) {
        alert("Preencha pelo menos o nome e as calorias do alimento.");
        return;
    }

    // Cria um ID único baseado no nome
    const idCustom = 'custom_' + Date.now();

    const novoItem = {
        id: idCustom,
        nome: nome + " (Custom)",
        tipo: 'porção',
        base: 1,
        cal: cal,
        prot: prot,
        carbo: carbo,
        gord: gord,
        xp: 15 // XP fixo ou proporcional para itens criados
    };

    // Insere o item na refeição que está ativa no momento
    if (!cardapioRefeicoes[estadoNutricional.refeicaoAtual]) {
        cardapioRefeicoes[estadoNutricional.refeicaoAtual] = [];
    }
    
    cardapioRefeicoes[estadoNutricional.refeicaoAtual].push(novoItem);

    // Limpa os campos do formulário
    document.getElementById('novo-nome').value = '';
    document.getElementById('novo-cal').value = '';
    document.getElementById('novo-prot').value = '';
    document.getElementById('novo-carbo').value = '';
    document.getElementById('novo-gord').value = '';

    // Re-renderiza a lista para o item aparecer imediatamente
    renderizarItensRefeicao();
    alert("Alimento customizado adicionado com sucesso ao cardápio de " + estadoNutricional.refeicaoAtual + "!");
}
