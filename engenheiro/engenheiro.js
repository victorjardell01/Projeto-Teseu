// ==========================================
// MÓDULO DO ENGENHEIRO - LÓGICA E GRÁFICOS (ESCALA 1-10)
// ==========================================

const ENGENHEIRO_KEY = "rpg_engenheiro_dados_v2";

let dadosEngenheiro = carregarDados();
let meuGrafico = null;

function carregarDados() {
    const salvo = localStorage.getItem(ENGENHEIRO_KEY);
    if (salvo) {
        return JSON.parse(salvo);
    }
    return {
        nivel: 1,
        xp: 0,
        xpProximoNivel: 100,
        pilares: [5, 5, 5, 5, 5] // Valores iniciais na escala de 1 a 10
    };
}

function salvarNoStorage() {
    localStorage.setItem(ENGENHEIRO_KEY, JSON.stringify(dadosEngenheiro));
}

// Inicializa os inputs e o gráfico ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    for (let i = 1; i <= 5; i++) {
        const slider = document.getElementById(`pilar${i}`);
        if (slider) {
            slider.value = dadosEngenheiro.pilares[i - 1];
        }
    }
    atualizarValoresVisuais();
    inicializarGrafico();
    atualizarInterfaceTexto();
});

function atualizarValoresVisuais() {
    for (let i = 1; i <= 5; i++) {
        const inputVal = document.getElementById(`pilar${i}`).value;
        const spanVal = document.getElementById(`val-p${i}`);
        if (spanVal) {
            spanVal.textContent = inputVal;
        }
    }
    
    // Atualiza os dados em tempo real no gráfico se ele já existir
    if (meuGrafico) {
        meuGrafico.data.datasets[0].data = [
            parseInt(document.getElementById('pilar1').value),
            parseInt(document.getElementById('pilar2').value),
            parseInt(document.getElementById('pilar3').value),
            parseInt(document.getElementById('pilar4').value),
            parseInt(document.getElementById('pilar5').value)
        ];
        meuGrafico.update();
    }
}

function inicializarGrafico() {
    const ctx = document.getElementById('graficoPilares').getContext('2d');
    
    meuGrafico = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                '1. Autoconhecimento (O Eu)', 
                '2. Relações (A Tribo)', 
                '3. Trabalho (Produtividade)', 
                '4. Vitalidade (O Veículo)', 
                '5. Propósito (O Legado)'
            ],
            datasets: [{
                label: 'Sintonia dos Pilares',
                data: dadosEngenheiro.pilares,
                backgroundColor: 'rgba(217, 119, 6, 0.2)',
                borderColor: '#d97706',
                borderWidth: 2,
                pointBackgroundColor: '#06b6d4',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#06b6d4'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#e7e2dc',
                        font: {
                            family: 'Courier New',
                            size: 11
                        }
                    },
                    ticks: {
                        display: false,
                        max: 10,   // Limite máximo alterado para 10
                        min: 0,    // Mínimo mantido em 0 para proporção correta do radar
                        stepSize: 2
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Ação de manutenção: recolhe os valores dos sliders, bonifica com XP e atualiza o sistema
function salvarManutencaoPilares() {
    for (let i = 1; i <= 5; i++) {
        dadosEngenheiro.pilares[i - 1] = parseInt(document.getElementById(`pilar${i}`).value);
    }

    const ganhoXp = 35;
    const ganhoMoedas = 20;

    dadosEngenheiro.xp += ganhoXp;

    // Verificação de Level Up
    if (dadosEngenheiro.xp >= dadosEngenheiro.xpProximoNivel) {
        dadosEngenheiro.nivel++;
        dadosEngenheiro.xp -= dadosEngenheiro.xpProximoNivel;
        dadosEngenheiro.xpProximoNivel = Math.floor(dadosEngenheiro.xpProximoNivel * 1.3);
        alert(`⚡ SISTEMA RECALIBRADO: O Engenheiro atingiu o Nível ${dadosEngenheiro.nivel}!`);
    }

    salvarNoStorage();
    atualizarInterfaceTexto();

    if (typeof adicionarMoedas === "function") {
        adicionarMoedas(ganhoMoedas);
    }

    alert(`⚙️ Manutenção de pilares concluída com sucesso! +${ganhoXp} XP gerados.`);
}

function atualizarInterfaceTexto() {
    const lblNivel = document.getElementById("label-nivel");
    const lblXp = document.getElementById("label-xp");
    const lblProximoXp = document.getElementById("label-proximo-xp");

    if (lblNivel) lblNivel.textContent = `Lvl ${dadosEngenheiro.nivel}`;
    if (lblXp) lblXp.textContent = dadosEngenheiro.xp;
    if (lblProximoXp) lblProximoXp.textContent = dadosEngenheiro.xpProximoNivel;

    const badgeLvlIndex = document.getElementById("lvl-engenheiro");
    if (badgeLvlIndex) {
        badgeLvlIndex.textContent = `Lvl ${dadosEngenheiro.nivel}`;
    }
}
