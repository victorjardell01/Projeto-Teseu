// Chave e Senha Padrão
const SENHA_CORRETA = "baki123";

// Inicializa a senha no localStorage se não existir
if (!localStorage.getItem("app_password")) {
    localStorage.setItem("app_password", SENHA_CORRETA);
}

// ================= TELA DE LOGIN =================
function realizarLogin() {
    const inputSenha = document.getElementById("input-senha").value;
    const senhaSalva = localStorage.getItem("app_password");
    const erroMsg = document.getElementById("login-erro");

    if (inputSenha === senhaSalva) {
        document.getElementById("page-login").classList.remove("active");
        document.getElementById("page-dashboard").classList.add("active");
        inicializarBanco();
    } else {
        erroMsg.textContent = "Senha incorreta. Acesso negado.";
    }
}

function realizarLogout() {
    document.getElementById("page-dashboard").classList.remove("active");
    document.getElementById("page-login").classList.add("active");
    document.getElementById("input-senha").value = "";
}

// ================= NAVEGAÇÃO DE ABAS =================
function mudarAba(tabId) {
    document.querySelectorAll(".tab-pane").forEach(pane => pane.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));

    document.getElementById(tabId).classList.add("active");
    event.target.classList.add("active");
}

// ================= BANCO DE DADOS (LOCAL STORAGE) =================
let db = [];

function inicializarBanco() {
    const dadosSalvos = localStorage.getItem("rpg_history");
    db = dadosSalvos ? JSON.parse(dadosSalvos) : [];
    carregarProgressoDia();
    gerarRelatorios();
}

function salvarDadosDia(data, progresso) {
    // Procura se já existe registro para hoje, se sim, atualiza. Se não, adiciona.
    const index = db.findIndex(item => item.data === data);
    if (index !== -1) {
        db[index].progresso = progresso;
    } else {
        db.push({ data, progresso });
    }
    localStorage.setItem("rpg_history", JSON.stringify(db));
    gerarRelatorios();
}

// ================= CÁLCULOS E GAMEPLAY =================
function atualizarProgresso() {
    let xp = 0;
    if (document.getElementById("task-treino").checked) xp += 25;
    if (document.getElementById("task-agua").checked) xp += 10;
    if (document.getElementById("task-leitura").checked) xp += 15;
    if (document.getElementById("task-penitencia").checked) xp += 15;

    // Atualiza o gráfico circular do Pilar Corpo como exemplo de XP de treino
    let pctCorpo = document.getElementById("task-treino").checked ? 100 : 0;
    setCircleProgress("ring-corpo", "pct-corpo", pctCorpo);

    // Salva o dia atual no formato AAAA-MM-DD
    const hoje = new Date().toISOString().split('T')[0];
    salvarDadosDia(hoje, xp);
}

function setCircleProgress(circleId, textId, percent) {
    const circle = document.getElementById(circleId);
    const text = document.getElementById(textId);
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    text.textContent = `${percent}%`;
}

function gerarRelatorios() {
    if (db.length === 0) return;
    
    // Cálculo simples de XP acumulado para simular o relatório
    const totalXp = db.reduce((sum, item) => sum + item.progresso, 0);
    const media = Math.round(totalXp / db.length);

    document.getElementById("stat-semana").textContent = `${media}%`;
    document.getElementById("stat-mes").textContent = `${media}%`;
}

function carregarProgressoDia() {
    const hoje = new Date().toISOString().split('T')[0];
    const registroHoje = db.find(item => item.data === hoje);
    if (registroHoje) {
        // Carrega o estado das tarefas salvas
        // (Aqui você associará os checkboxes com as tarefas salvas futuramente)
    }
}

function limparHistorico() {
    if (confirm("Deseja realmente apagar todo o seu histórico de evolução?")) {
        localStorage.removeItem("rpg_history");
        db = [];
        gerarRelatorios();
        alert("Evolução reiniciada.");
    }
}
