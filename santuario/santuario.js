// Chave usada para salvar os dados do Clérigo no localStorage global do RPG
const STORAGE_KEY = 'rpg_dados_completos';

// Estrutura de dados inicial do Clérigo
let dadosClerigo = {
    nivel: 1,
    xp: 0,
    xpProximoNivel: 100,
    oracaoConcluidaHoje: false,
    tarefasConcluidas: {}, // Armazena o estado das checkboxes (bem-aventuranças e penitências)
    bencaoAtiva: null,
    liturgia: {
        manha: false,
        tarde: false,
        noite: false
    }
};

// Carrega os dados salvos ao iniciar a página
function carregarProgresso() {
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    if (dadosSalvos) {
        try {
            const dadosGlobais = JSON.parse(dadosSalvos);
            // Se já houver dados específicos do clérigo salvos, mesclamos
            if (dadosGlobais.clerigo) {
                dadosClerigo = { ...dadosClerigo, ...dadosGlobais.clerigo };
            }
        } catch (e) {
            console.error("Erro ao carregar os dados do RPG:", e);
        }
    }
    atualizarInterface();
    restaurarCheckboxes();
}

// Salva os dados no localStorage mantendo a estrutura global
function salvarProgresso() {
    let dadosGlobais = {};
    const dadosSalvos = localStorage.getItem(STORAGE_KEY);
    if (dadosSalvos) {
        try {
            dadosGlobais = JSON.parse(dadosSalvos);
        } catch (e) {
            console.error("Erro ao ler dados globais para salvar:", e);
        }
    }
    
    dadosGlobais.clerigo = dadosClerigo;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosGlobais));
}

// Adiciona XP e gerencia subidas de nível
function adicionarXp(quantidade) {
    dadosClerigo.xp += quantidade;
    
    // Sistema simples de level up
    while (dadosClerigo.xp >= dadosClerigo.xpProximoNivel) {
        dadosClerigo.xp -= dadosClerigo.xpProximoNivel;
        dadosClerigo.nivel += 1;
        dadosClerigo.xpProximoNivel = Math.floor(dadosClerigo.xpProximoNivel * 1.2); // Aumenta a exigência por nível
        alert(`Parabéns! Seu Clérigo subiu para o Nível ${dadosClerigo.nivel}!`);
    }
    
    salvarProgresso();
    atualizarInterface();
}

// Ação de concluir a Prece Diária (30 XP)
function concluirOracao() {
    if (dadosClerigo.oracaoConcluidaHoje) {
        alert("Você já concluiu sua prece diária hoje!");
        return;
    }

    dadosClerigo.oracaoConcluidaHoje = true;
    
    // Desabilita o botão visualmente
    const btnOracao = document.getElementById('btn-oracao');
    if (btnOracao) {
        btnOracao.disabled = true;
        btnOracao.textContent = "Prece Concluída Hoje ✓";
        btnOracao.style.backgroundColor = "#555";
    }

    adicionarXp(30);
}

// Ação unificada para Bem-Aventuranças e Penitências (15 XP cada)
function meditarAventuranca(checkbox) {
    const id = checkbox.id;
    const estaMarcado = checkbox.checked;

    if (estaMarcado && !dadosClerigo.tarefasConcluidas[id]) {
        dadosClerigo.tarefasConcluidas[id] = true;
        adicionarXp(15);
    } else if (!estaMarcado && dadosClerigo.tarefasConcluidas[id]) {
        dadosClerigo.tarefasConcluidas[id] = false;
        dadosClerigo.xp = Math.max(0, dadosClerigo.xp - 15);
        salvarProgresso();
        atualizarInterface();
    }
}

// Sistema de Bênçãos (Altar)
function ativarBencao(nomeBencao, descricao) {
    dadosClerigo.bencaoAtiva = `${nomeBencao} (${descricao})`;
    salvarProgresso();
    atualizarInterface();
    alert(`✨ Altar Consagrado!\nVocê recebeu a Bênção da ${nomeBencao}: ${descricao}. Que o dia seja produtivo e abençoado!`);
}

// Sistema de Liturgia das Horas
function concluirLiturgia(periodo) {
    if (!dadosClerigo.liturgia) {
        dadosClerigo.liturgia = { manha: false, tarde: false, noite: false };
    }

    if (dadosClerigo.liturgia[periodo]) {
        alert(`Você já cumpriu a liturgia de ${periodo} hoje!`);
        return;
    }

    dadosClerigo.liturgia[periodo] = true;
    adicionarXp(20);
    bloquearBotaoLiturgia(periodo);
    salvarProgresso();

    alert(`⏳ Liturgia das Horas (${periodo.toUpperCase()}) cumprida com reverência! (+20 XP)`);
}

function bloquearBotaoLiturgia(periodo) {
    const btn = document.getElementById(`btn-liturgia-${periodo}`);
    if (btn) {
        btn.innerText = "Realizada ✓";
        btn.disabled = true;
        btn.style.backgroundColor = "#555";
    }
}

// Restaura o estado das checkboxes e mecânicas salvas no localStorage ao carregar a página
function restaurarCheckboxes() {
    // Restaura as tarefas (tanto bem-aventuranças quanto penitências)
    if (dadosClerigo.tarefasConcluidas) {
        for (const [id, concluido] of Object.entries(dadosClerigo.tarefasConcluidas)) {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                checkbox.checked = concluido;
            }
        }
    }

    // Restaura o botão de oração
    if (dadosClerigo.oracaoConcluidaHoje) {
        const btnOracao = document.getElementById('btn-oracao');
        if (btnOracao) {
            btnOracao.disabled = true;
            btnOracao.textContent = "Prece Concluída Hoje ✓";
            btnOracao.style.backgroundColor = "#555";
        }
    }

    // Restaura Liturgia
    if (dadosClerigo.liturgia) {
        if (dadosClerigo.liturgia.manha) bloquearBotaoLiturgia('manha');
        if (dadosClerigo.liturgia.tarde) bloquearBotaoLiturgia('tarde');
        if (dadosClerigo.liturgia.noite) bloquearBotaoLiturgia('noite');
    }
}

// Atualiza visualmente a barra de progresso, textos de nível/XP e buffs
function atualizarInterface() {
    const nivelDisplay = document.getElementById('nivel-display');
    const xpDisplay = document.getElementById('xp-display');
    const barraProgresso = document.getElementById('barra-progresso');
    const buffDisplay = document.getElementById('buff-ativo-display');

    if (nivelDisplay) {
        nivelDisplay.textContent = `Nível ${dadosClerigo.nivel}: Clérigo`;
    }
    if (xpDisplay) {
        xpDisplay.textContent = `XP: ${dadosClerigo.xp} / ${dadosClerigo.xpProximoNivel}`;
    }
    if (barraProgresso) {
        const porcentagem = (dadosClerigo.xp / dadosClerigo.xpProximoNivel) * 100;
        barraProgresso.style.width = `${Math.min(porcentagem, 100)}%`;
    }
    if (buffDisplay) {
        if (dadosClerigo.bencaoAtiva) {
            buffDisplay.innerHTML = `🛡️ Bênção Ativa: <strong>${dadosClerigo.bencaoAtiva}</strong>`;
        } else {
            buffDisplay.innerHTML = `✨ Nenhuma Bênção Consagrada Hoje`;
        }
    }
}

// Executa assim que o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    carregarProgresso();
});
