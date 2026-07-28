// ==========================================
// 1. CARREGAMENTO E ESTADO DO ENGENHEIRO
// ==========================================
let dadosRPG = JSON.parse(localStorage.getItem("rpg_dados_completos")) || {};

// Garante que o objeto do engenheiro existe nos dados globais
if (!dadosRPG.engenheiro) {
    dadosRPG.engenheiro = { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 };
}

// Inicializa o Gráfico de Pizza via Chart.js
const ctx = document.getElementById('graficoTempoDisposicao').getContext('2d');
const graficoTempo = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Foco / Trabalho', 'Descanso / Lazer', 'Estudos de Código', 'Indisposição / Pausas'],
        datasets: [{
            data: [40, 25, 20, 15], // Valores iniciais de exemplo
            backgroundColor: ['#00ffcc', '#ff007f', '#ffcc00', '#444444']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#fff' }
            }
        }
    }
});

// ==========================================
// 2. FUNÇÕES DE PROGRESSO E XP
// ==========================================
function ganharXPDoEngenheiro(quantidade) {
    let eng = dadosRPG.engenheiro;
    const LEVEL_MAX = 10;

    eng.xp += quantidade;

    while (eng.xp >= eng.xpMax) {
        eng.xp -= eng.xpMax;
        eng.level += 1;

        if (eng.level > LEVEL_MAX) {
            eng.level = 1;
            eng.xp = 0;
            eng.xpMax = 100;
            eng.ultimoNivelColetado = 0;
            alert(`🏆 GLÓRIA! O seu ENGENHEIRO atingiu o ápice (Lvl ${LEVEL_MAX}) e completou o ciclo de maestria! Retornou ao Lvl 1 com poder renovado! 🎉`);
        } else {
            eng.xpMax = Math.floor(eng.xpMax * 1.2);
            alert(`⚡ LEVEL UP! Seu Engenheiro subiu para o Nível ${eng.level}! 📐`);
        }
    }

    // Salva no localStorage principal do Projeto Teseu
    localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
    atualizarInterfaceEngenheiro();
}

function atualizarInterfaceEngenheiro() {
    const eng = dadosRPG.engenheiro;
    const elementoLvl = document.getElementById("engenheiro-lvl");
    const elementoXp = document.getElementById("engenheiro-xp");
    
    if (elementoLvl) elementoLvl.textContent = `Lvl ${eng.level}`;
    if (elementoXp) elementoXp.textContent = `XP: ${eng.xp} / ${eng.xpMax}`;
}

// ==========================================
// 3. AÇÕES DO MÓDULO (PROJETOS E PILARES)
// ==========================================
function adicionarProjeto() {
    const input = document.getElementById('inputProjeto');
    const valor = input.value.trim();

    if (valor !== "") {
        // Concluir ou estruturar um projeto concede XP ao Engenheiro
        ganharXPDoEngenheiro(35);
        alert(`📐 Blueprint estruturado com sucesso: "${valor}"!\n+35 XP concedidos ao Engenheiro! 🚀`);
        input.value = '';
    } else {
        alert("Insira o nome do projeto ou site que deseja estruturar.");
    }
}

// Executa ao carregar a página
window.addEventListener("DOMContentLoaded", () => {
    atualizarInterfaceEngenheiro();
});
S
