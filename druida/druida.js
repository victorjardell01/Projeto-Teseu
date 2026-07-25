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

// Banco de dados base para os macros por unidade ou por 100g/ml
const baseNutricional = {
    // Café da Manhã
    ovos_tapioca: { cal: 320, prot: 14, carbo: 42, gord: 10, fibra: 2, xp: 50 },
    pao_frances: { cal: 250, prot: 8, carbo: 30, gord: 4, fibra: 1.5, xp: 40 },
    
    // Almoço
    frango_arroz: { cal: 550, prot: 45, carbo: 65, gord: 6, fibra: 5, xp: 100 },
    
    // Lanche da Tarde
    fruta_ovo: { cal: 210, prot: 13, carbo: 28, gord: 8, fibra: 3, xp: 40 },
    vitamina_leite: { cal: 0.8, prot: 0.03, carbo: 0.12, gord: 0.03, fibra: 0.01, xp: 0.2, tipo: 'por_ml' }, // por ml
    
    // Jantar
    omelete: { cal: 340, prot: 22, carbo: 6, gord: 24, fibra: 2, xp: 80 },
    sopao: { cal: 0.5, prot: 0.04, carbo: 0.06, gord: 0.01, fibra: 0.01, xp: 0.1, tipo: 'por_ml' } // por ml
};

// Inicialização ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarInterface();
    configurarSeletorDias();
});

// Configura a troca visual e lógica dos dias da semana
function configurarSeletorDias() {
    const botoesDias = document.querySelectorAll('.day-btn');
    
    // Marca o botão ativo com base no estado salvo
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

// Função principal para adicionar refeição (suporta presets e cálculo proporcional por g/ml ou valor fixo)
function adicionarRefeicao(tipoRefeicao) {
    const select = document.getElementById(`preset-${tipoRefeicao}`);
    const inputQtd = document.getElementById(`qnt-${tipoRefeicao}`);
    
    const chavePreset = select.value;
    const quantidade = parseFloat(inputQtd.value) || 0;

    if (!chavePreset) {
        alert("Por favor, selecione uma opção pré-definida.");
        return;
    }

    const alimento = baseNutricional[chavePreset];
    let mult = 1;

    // Se for calculado por gramas ou ml (ex: vitamina ou sopa por ml)
    if (alimento.tipo === 'por_ml' || alimento.tipo === 'por_g') {
        if (quantidade <= 0) {
            alert("Por favor, informe a quantidade em gramas (g) ou mililitros (ml).");
            return;
        }
        mult = quantidade;
    } else {
        // Se o usuário digitou gramas/ml em um item padrão, faz uma proporção simples baseada em 100g/ml ou usa a unidade cheia
        if (quantidade > 0) {
            mult = quantidade / 100; // Exemplo proporcional caso queira ajustar por peso customizado
        }
    }

    // Soma os valores ao estado atual
    estadoNutricional.calorias += Math.round(alimento.cal * mult);
    estadoNutricional.proteina += Math.round((alimento.prot * mult) * 10) / 10;
    estadoNutricional.carbo += Math.round((alimento.carbo * mult) * 10) / 10;
    estadoNutricional.gordura += Math.round((alimento.gord * mult) * 10) / 10;
    estadoNutricional.fibra += Math.round((alimento.fibra * mult) * 10) / 10;
    estadoNutricional.xp += Math.round(alimento.xp * (mult === 0 ? 1 : (alimento.tipo ? (quantidade / 100) : 1)));

    // Limpa os campos após o consumo
    select.value = "";
    inputQtd.value = "";

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
    document.getElementById('fibra-atual').innerText = estadoNutricional.fibra;
    document.getElementById('xp-atual').innerText = estadoNutricional.xp;
}
