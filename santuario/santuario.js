// Estado inicial do Clérigo salvo no navegador
let clerigoData = JSON.parse(localStorage.getItem('clerigoData')) || {
    xp: 0,
    nivel: 1,
    xpProximoNivel: 100,
    titulo: "Aspirante",
    oracaoConcluidaHoje: false,
    aventurancasConcluidas: {}
};

// Títulos progressivos baseados na jornada espiritual
const titulosClerigo = [
    { nivel: 1, nome: "Aspirante" },
    { nivel: 2, nome: "Iniciado na Palavra" },
    { nivel: 3, nome: "Servo Fiel" },
    { nivel: 4, nome: "Guardião da Fé" },
    { nivel: 5, nome: "Clérigo Consagrado" }
];

function adicionarXP(quantidade) {
    clerigoData.xp += quantidade;
    
    // Sistema de Level Up
    if (clerigoData.xp >= clerigoData.xpProximoNivel) {
        clerigoData.nivel++;
        clerigoData.xp -= clerigoData.xpProximoNivel;
        clerigoData.xpProximoNivel = Math.floor(clerigoData.xpProximoNivel * 1.3); // Aumenta a dificuldade do próximo nível
        
        // Atualiza o título se houver correspondente
        let novoTitulo = titulosClerigo.find(t => t.nivel === clerigoData.nivel);
        if (novoTitulo) {
            clerigoData.titulo = novoTitulo.nome;
        }
        
        alert(`Glória! Seu Clérigo alcançou o Nível ${clerigoData.nivel}: ${clerigoData.titulo}! ✝`);
    }

    salvarEAtualizarInterface();
}

function concluirOracao() {
    if (!clerigoData.oracaoConcluidaHoje) {
        clerigoData.oracaoConcluidaHoje = true;
        adicionarXP(30); // 30 de XP por concluir a prece diária
        atualizarBotaoOracao();
    }
}

function meditarAventuranca(checkbox) {
    let id = checkbox.id;
    
    if (checkbox.checked) {
        if (!clerigoData.aventurancasConcluidas[id]) {
            clerigoData.aventurancasConcluidas[id] = true;
            adicionarXP(15); // 15 de XP por cada bem-aventurança refletida
        }
    } else {
        // Se desmarcar, remove o registro (opcional, mas mantém o estado consistente)
        clerigoData.aventurancasConcluidas[id] = false;
    }
}

function salvarEAtualizarInterface() {
    localStorage.setItem('clerigoData', JSON.stringify(clerigoData));
    
    // Atualiza os elementos visuais de XP e Nível
    document.getElementById('nivel-display').innerText = `Nível ${clerigoData.nivel}: ${clerigoData.titulo}`;
    document.getElementById('xp-display').innerText = `XP: ${clerigoData.xp} / ${clerigoData.xpProximoNivel}`;
    
    let porcentagem = Math.min((clerigoData.xp / clerigoData.xpProximoNivel) * 100, 100);
    document.getElementById('barra-progresso').style.width = `${porcentagem}%`;

    // Atualiza estado do botão de oração
    atualizarBotaoOracao();

    // Restaura o estado das caixas de seleção das bem-aventuranças salvas
    for (let id in clerigoData.aventurancasConcluidas) {
        let checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = clerigoData.aventurancasConcluidas[id];
        }
    }
}

function atualizarBotaoOracao() {
    let btnOracao = document.getElementById('btn-oracao');
    if (btnOracao) {
        if (clerigoData.oracaoConcluidaHoje) {
            btnOracao.innerText = "Oração Concluida Hoje ✓";
            btnOracao.disabled = true;
        } else {
            btnOracao.innerText = "Concluir Oração (Amém)";
            btnOracao.disabled = false;
        }
    }
}

// Inicializa a interface assim que a página carregar
window.onload = function() {
    salvarEAtualizarInterface();
};
