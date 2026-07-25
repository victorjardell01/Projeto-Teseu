// Chave usada para salvar os dados do Clérigo no localStorage global do RPG
const STORAGE_KEY = 'rpg_dados_completos';

// Estrutura de dados inicial do Clérigo
let dadosClerigo = {
    nivel: 1,
    xp: 0,
    xpProximoNivel: 100,
    oracaoConcluidaHoje: false,
    tarefasConcluidas: {} // Armazena o estado das checkboxes (bem-aventuranças e penitências)
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

    // Evita desmarcar e perder/ganhar XP indevidamente na mesma sessão se desejar, 
    // ou desconta/controla o estado: aqui salvamos o estado booleano
    if (estaMarcado && !dadosClerigo.tarefasConcluidas[id]) {
        dadosClerigo.tarefasConcluidas[id] = true;
        adicionarXp(15);
    } else if (!estaMarcado && dadosClerigo.tarefasConcluidas[id]) {
        dadosClerigo.tarefasConcluidas[id] = false;
        // Opcional: remover XP ao desmarcar (aqui subtraímos 15, respeitando o limite mínimo de 0)
        dadosClerigo.xp = Math.max(0, dadosClerigo.xp - 15);
        salvarProgresso();
        atualizarInterface();
    }
}

// Restaura o estado das checkboxes salvas no localStorage ao carregar a página
function restaurarCheckboxes() {
    // Restaura as tarefas (tanto bem-aventuranças quanto penitências)
    for (const [id, concluido] of Object.entries(dadosClerigo.tarefasConcluidas)) {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = concluido;
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
}

// Atualiza visualmente a barra de progresso e os textos de nível/XP
function atualizarInterface() {
    const nivelDisplay = document.getElementById('nivel-display');
    const xpDisplay = document.getElementById('xp-display');
    const barraProgresso = document.getElementById('barra-progresso');

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
}

// Executa assim que o DOM estiver totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
    carregarProgresso();
});
