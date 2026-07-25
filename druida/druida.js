// Estado global da aplicação com persistência no localStorage
let estadoNutricional = JSON.parse(localStorage.getItem('druida_estado')) || {
    diaAtual: 'segunda',
    calorias: 0,
    proteina: 0,
    carbo: 0,
    gordura: 0,
    fibra: 0,
    xp: 0
};

// Banco de dados base do inventário (valores por unidade base: 1g, 1ml ou 1 unidade)
const inventarioBanco = {
    arroz: { cal: 130, prot: 2.5, carbo: 28, gord: 0.3, fibra: 0.4, xp: 5, tipo: 'g', base: 100 },
    feijao: { cal: 76, prot: 4.8, carbo: 14, gord: 0.5, fibra: 5.5, xp: 8, tipo: 'g', base: 100 },
    frango: { cal: 165, prot: 31, carbo: 0, gord: 3.6, fibra: 0, xp: 15, tipo: 'g', base: 100 },
    ovo: { cal: 70, prot: 6, carbo: 0.4, gord: 5, fibra: 0, xp: 10, tipo: 'unidade', base: 1 },
    pao_frances: { cal: 140, prot: 4.5, carbo: 28, gord: 1, fibra: 1.2, xp: 12, tipo: 'unidade', base: 1 },
    tapioca: { cal: 240, prot: 0.2, carbo: 58, gord: 0.1, fibra: 0.5, xp: 10, tipo: 'g', base: 100 },
    banana: { cal: 90, prot: 1.1, carbo: 23, gord: 0.3, fibra: 2.6, xp: 8, tipo: 'unidade', base: 1 },
    suco: { cal: 0.5, prot: 0.03, carbo: 0.12, gord: 0.01, fibra: 0.01, xp: 0.1, tipo: 'ml', base: 1 }, // por 1 ml
    sopa: { cal: 0.6, prot: 0.04, carbo: 0.07, gord: 0.02, fibra: 0.01, xp: 0.1, tipo: 'ml', base: 1 }   // por 1 ml
};

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarInterface();
    configurarSeletorDias();
});

// Configura a troca visual e lógica dos dias da semana
function configurarSeletorDias() {
    const botoesDias = document.querySelectorAll('.day-btn');
    
    botoesDias.forEach(btn => {
        if(btn.dataset.day === estadoNutricional.diaAtual) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        btn.addEventListener('click', () => {
            botoesDias.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            estadoNutricional.diaAtual = btn.dataset.day;
            salvarEstado();
        });
    });
}

// Atualiza o rótulo da unidade (g, ml ou un) dinamicamente ao selecionar o item
function atualizarUnidadeMedida() {
    const select = document.getElementById('inventario-alimento');
    const labelUnidade = document.getElementById('label-unidade');
    const selectedOption = select.options[select.selectedIndex];
    
    const tipo = selectedOption.dataset.tipo;
    if (tipo === 'g') {
        labelUnidade.innerText = 'g';
    } else if (tipo === 'ml') {
        labelUnidade.innerText = 'ml';
    } else if (tipo === 'unidade') {
        labelUnidade.innerText = 'un';
    } else {
        labelUnidade.innerText = '';
    }
}

// Adiciona o item selecionado do inventário calculando proporcionalmente à quantidade informada
function adicionarDoInventario() {
    const select = document.getElementById('inventario-alimento');
    const inputQtd = document.getElementById('inventario-quantidade');
    
    const chaveAlimento = select.value;
    const quantidade = parseFloat(inputQtd.value);

    if (!chaveAlimento) {
        alert("Por favor, selecione um item do inventário.");
        return;
    }

    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, informe uma quantidade válida.");
        return;
    }

    const alimento = inventarioBanco[chaveAlimento];
    
    // Cálculo proporcional baseado na base do alimento (ex: se for por 100g, divide por 100 e multiplica pelas gramas digitadas)
    const proporcao = quantidade / alimento.base;

    // Soma os valores ao estado atual
    estadoNutricional.calorias += Math.round(alimento.cal * proporcao);
    estadoNutricional.proteina += Math.round((alimento.prot * proporcao) * 10) / 10;
    estadoNutricional.carbo += Math.round((alimento.carbo * proporcao) * 10) / 10;
    estadoNutricional.gordura += Math.round((alimento.gord * proporcao) * 10) / 10;
    estadoNutricional.xp += Math.round(alimento.xp * proporcao);

    // Limpa os campos após adicionar
    select.value = "";
    inputQtd.value = "";
    document.getElementById('label-unidade').innerText = 'un';

    salvarEstado();
    atualizarInterface();
}

// Salva o progresso no localStorage
function salvarEstado() {
    localStorage.setItem('druida_estado', JSON.stringify(estadoNutricional));
}

// Atualiza os elementos visuais do Dashboard no HTML
function atualizarInterface() {
    document.getElementById('calorias-atual').innerText = estadoNutricional.calorias;
    document.getElementById('proteina-atual').innerText = estadoNutricional.proteina;
    document.getElementById('carbo-atual').innerText = estadoNutricional.carbo;
    document.getElementById('gordura-atual').innerText = estadoNutricional.gordura;
    document.getElementById('xp-atual').innerText = estadoNutricional.xp;
}
