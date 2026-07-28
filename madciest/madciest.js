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
    salvarProgressoLab();
    renderizarExperimentos();
    atualizarInterfaceLab();
    alert("🧪 Dados injetados com sucesso no Servidor Central! (+35 XP)");
}

// Excluir arquivo confidencial do laboratório
function deletarExperimento(id) {
    dadosMadScientist.experimentos = dadosMadScientist.experimentos.filter(exp => exp.id !== id);
    salvarProgressoLab();
    renderizarExperimentos();
    atualizarInterfaceLab();
}

// Renderizar lista de arquivos confidenciais usando o CSS oficial
function renderizarExperimentos() {
    const container = document.getElementById('container-experimentos');
    if (!container) return;

    container.innerHTML = '';

    if (dadosMadScientist.experimentos.length === 0) {
        container.innerHTML = '<p style="color: var(--texto-suave); font-family: var(--fonte-code); font-style: italic; padding: 10px;">Nenhum experimento registrado nos arquivos confidenciais.</p>';
        return;
    }

    dadosMadScientist.experimentos.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'exp-card';

        card.innerHTML = `
            <div class="exp-header">
                <div>
                    <div class="exp-titulo">${exp.nome}</div>
                    <span style="font-size: 0.75rem; color: var(--texto-suave); font-family: var(--fonte-code);">Data: ${exp.data}</span>
                </div>
                <span class="exp-categoria">${exp.categoria}</span>
            </div>
            <div class="exp-variaveis">
                <strong>Variáveis:</strong> ${exp.variaveis}
            </div>
            <div style="font-size: 0.82rem; color: var(--cor-neon); margin-bottom: 8px; font-family: var(--fonte-code);">
                <strong>Status:</strong> ${exp.resultado}
            </div>
            <div class="exp-corpo">${exp.notas}</div>
            <div class="exp-footer">
                <span>ID: #${exp.id}</span>
                <button onclick="deletarExperimento(${exp.id})" class="btn-secundario" style="border-color: #331414; color: #ff5555; cursor: pointer;">Excluir Arquivo</button>
            </div>
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
