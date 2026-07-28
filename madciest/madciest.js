// =========================================================
// LABORATÓRIO SECRETO DE GADGETS - MAD SCIENTIST (madscientist.js)
// =========================================================

const STORAGE_KEY = 'rpg_dados_completos';

let dadosMadScientist = {
    nivel: 1,
    xp: 0,
    xpProximoNivel: 100,
    experimentos: []
};

const titulosMadScientist = [
    "Pesquisador do Caos",
    "Mestre dos Esporos",
    "Alquimista Digital",
    "Cientista Louco Sênior",
    "Viajante de Linhas Temporais",
    "Mad Scientist Supremo"
];

const quotesKyouma = [
    "\"Eu sou o Mad Scientist Hououin Kyouma! O caos e o conhecimento são minhas armas!\"",
    "\"El Psy Kongroo. Tudo faz parte da organização!\"",
    "\"A umidade e a temperatura estão perfeitas para a mutação! Muahahahaha!\"",
    "\"Contemplem a genialidade pura do Future Gadget Laboratory!\""
];

// Carregar progresso ao iniciar a página
function carregarProgressoLab() {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    if (dadosSalvos) {
        try {
            const dadosGlobais = JSON.parse(dadosSalvos);
            if (dadosGlobais.madscientist) {
                dadosMadScientist = { ...dadosMadScientist, ...dadosGlobais.madscientist };
            }
        } catch (e) {
            console.error("Erro ao carregar dados do laboratório:", e);
        }
    }
    atualizarInterfaceLab();
    renderizarExperimentos();
    iniciarDivergenceMeter();
}

// Salvar progresso mantendo a estrutura global do RPG
function salvarProgressoLab() {
    let dadosGlobais = {};
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    if (dadosSalvos) {
        try {
            dadosGlobais = JSON.parse(dadosSalvos);
        } catch (e) {
            console.error("Erro ao ler dados globais:", e);
        }
    }
    dadosGlobais.madscientist = dadosMadScientist;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosGlobais));
}

// Sistema de XP e Level Up do Laboratório
function adicionarXpLab(quantidade) {
    dadosMadScientist.xp += quantidade;

    while (dadosMadScientist.xp >= dadosMadScientist.xpProximoNivel) {
        dadosMadScientist.xp -= dadosMadScientist.xpProximoNivel;
        dadosMadScientist.nivel += 1;
        dadosMadScientist.xpProximoNivel = Math.floor(dadosMadScientist.xpProximoNivel * 1.2);
        alert(`⚡ EL PSY KONGROO!\nSeu nível no laboratório subiu para Nível ${dadosMadScientist.nivel}!`);
    }

    salvarProgressoLab();
    atualizarInterfaceLab();
}

// Registrar novo experimento (botão principal)
function registrarExperimento() {
    const nome = document.getElementById('input-nome-experimento').value.trim();
    const categoria = document.getElementById('select-categoria-exp').value;
    const variaveis = document.getElementById('input-variaveis').value.trim();
    const resultado = document.getElementById('select-resultado').value;
    const notas = document.getElementById('textarea-notas-lab').value.trim();

    if (!nome) {
        alert("Elaborar um nome ou código para o experimento é essencial, cientista!");
        return;
    }

    const novoExp = {
        id: Date.now(),
        nome,
        categoria,
        variaveis: variaveis || "Não especificadas",
        resultado,
        notas: notas || "Nenhuma anotação registrada.",
        data: new Date().toLocaleDateString('pt-BR')
    };

    dadosMadScientist.experimentos.unshift(novoExp);

    // Limpar campos do formulário
    document.getElementById('input-nome-experimento').value = '';
    document.getElementById('input-variaveis').value = '';
    document.getElementById('textarea-notas-lab').value = '';

    adicionarXpLab(35);
    alert("🧪 Dados injetados com sucesso no Servidor Central! (+35 XP)");
    renderizarExperimentos();
}

// Excluir arquivo confidencial do laboratório
function depararExperimento(id) {
    // Compatibilidade com onclick caso necessário
}

function deletarExperimento(id) {
    dadosMadScientist.experimentos = dadosMadScientist.experimentos.filter(exp => exp.id !== id);
    salvarProgressoLab();
    renderizarExperimentos();
    atualizarInterfaceLab();
}

// Renderizar lista de arquivos confidenciais
function renderizarExperimentos() {
    const container = document.getElementById('container-experimentos');
    if (!container) return;

    container.innerHTML = '';

    if (dadosMadScientist.experimentos.length === 0) {
        container.innerHTML = '<p style="color: #71717a; font-style: italic; padding: 10px;">Nenhum experimento registrado nos arquivos confidenciais.</p>';
        return;
    }

    dadosMadScientist.experimentos.forEach(exp => {
        const card = document.createElement('div');
        card.style.cssText = 'background: #121214; border: 1px solid #2d2d35; border-radius: 6px; padding: 14px; margin-bottom: 12px;';

        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                    <strong style="color: #00ff66; font-size: 1rem;">${exp.nome}</strong>
                    <div style="font-size: 0.8rem; color: #a8a8b3;">Ramo: ${exp.categoria} | Data: ${exp.data}</div>
                </div>
                <button onclick="deletarExperimento(${exp.id})" class="btn-secundario" style="padding: 2px 8px; font-size: 0.75rem; border-color: #ff3b3b; color: #ff3b3b; cursor: pointer;">Excluir</button>
            </div>
            <div style="font-size: 0.85rem; color: #d4d4d8; margin-bottom: 6px;">
                <strong>Variáveis:</strong> ${exp.variaveis}
            </div>
            <div style="font-size: 0.85rem; color: #38bdf8; margin-bottom: 6px;">
                <strong>Status:</strong> ${exp.resultado}
            </div>
            <p style="font-size: 0.85rem; color: #a1a1aa; font-style: italic; background: #1a1a1e; padding: 8px; border-radius: 4px; margin-top: 6px;">"${exp.notas}"</p>
        `;
        container.appendChild(card);
    });
}

// Atualizar painéis de estatísticas e credencial
function atualizarInterfaceLab() {
    const totalExpEl = document.getElementById('stat-total-experimentos');
    const totalCultivosEl = document.getElementById('stat-total-cultivos');
    const badgeNivelEl = document.getElementById('badge-nivel-mad');

    const totalExp = dadosMadScientist.experimentos.length;
    const totalCultivos = dadosMadScientist.experimentos.filter(exp => 
        exp.categoria.includes('Micologia') || 
        exp.categoria.includes('Fermentação') || 
        exp.categoria.includes('Botânica') ||
        exp.categoria.includes('Café')
    ).length;

    if (totalExpEl) totalExpEl.textContent = totalExp;
    if (totalCultivosEl) totalCultivosEl.textContent = totalCultivos;

    const indexTitulo = Math.min(dadosMadScientist.nivel - 1, titulosMadScientist.length - 1);
    if (badgeNivelEl) {
        badgeNivelEl.textContent = `Nível ${dadosMadScientist.nivel} - ${titulosMadScientist[indexTitulo]}`;
    }
}

// Animação e dinamismo do Divergence Meter e Quotes
function iniciarDivergenceMeter() {
    const displayDiv = document.getElementById('display-divergence');
    const quoteEl = document.getElementById('texto-quote-mad');

    if (displayDiv) {
        let baseDivergence = 1.048596;
        setInterval(() => {
            const variacao = (Math.random() * 0.000010 - 0.000005).toFixed(6);
            displayDiv.textContent = `${(baseDivergence + parseFloat(variacao)).toFixed(6)}%`;
        }, 4000);
    }

    if (quoteEl) {
        let indexQuote = 0;
        setInterval(() => {
            indexQuote = (indexQuote + 1) % quotesKyouma.length;
            quoteEl.textContent = quotesKyouma[indexQuote];
        }, 10000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProgressoLab();
});
