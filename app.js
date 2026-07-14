/* ==========================================================================
   1. CONFIGURAÇÕES E ESTADO DO SISTEMA
   ========================================================================== */
const CHAVE_ACESSO_CORRETA = "1234"; // Defina aqui sua senha de 4 dígitos

// Carrega o estado do login quando a página inicia
document.addEventListener("DOMContentLoaded", () => {
  const loginSalvo = localStorage.getItem("rpg_treino_logado");
  
  if (loginSalvo === "true") {
    mostrarDashboard();
  }
  
  // Carrega as metas do diário que foram salvas anteriormente
  carregarMetas();
});

/* ==========================================================================
   2. SISTEMA DE LOGIN (SPA)
   ========================================================================== */
function tentarLogin() {
  const campoSenha = document.getElementById("login-key");
  const msgErro = document.getElementById("login-error");
  
  if (campoSenha.value === CHAVE_ACESSO_CORRETA) {
    msgErro.textContent = "";
    localStorage.setItem("rpg_treino_logado", "true");
    mostrarDashboard();
    campoSenha.value = ""; // Limpa o campo
  } else {
    msgErro.textContent = "Chave incorreta. Acesso negado.";
    campoSenha.value = "";
    campoSenha.focus();
  }
}

// Permite dar 'Enter' no campo de senha para logar
document.getElementById("login-key").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    tentarLogin();
  }
});

function mostrarDashboard() {
  document.getElementById("page-login").classList.remove("active");
  document.getElementById("page-dashboard").classList.add("active");
}

function logout() {
  localStorage.removeItem("rpg_treino_logado");
  document.getElementById("page-dashboard").classList.remove("active");
  document.getElementById("page-login").classList.add("active");
}

/* ==========================================================================
   3. NAVEGAÇÃO ENTRE ABAS
   ========================================================================== */
function mudarAba(tabId, botaoClicado) {
  // 1. Oculta todas as abas de conteúdo
  const todasAsAbas = document.querySelectorAll(".tab-pane");
  todasAsAbas.forEach(aba => {
    aba.classList.remove("active");
  });

  // 2. Remove o destaque ativo de todos os botões da nav
  const todosOsBotoes = document.querySelectorAll(".tab-btn");
  todosOsBotoes.forEach(btn => {
    btn.classList.remove("active");
  });

  // 3. Mostra a aba selecionada
  const abaAlvo = document.getElementById(tabId);
  if (abaAlvo) {
    abaAlvo.classList.add("active");
  }

  // 4. Destaca o botão clicado
  if (botaoClicado) {
    botaoClicado.classList.add("active");
  }
}

/* ==========================================================================
   4. PERSISTÊNCIA DO DIÁRIO (LocalStorage)
   ========================================================================== */
function salvarMetas() {
  const checkboxes = document.querySelectorAll("#tab-diario input[type='checkbox']");
  const estadoMetas = [];

  checkboxes.forEach((checkbox, index) => {
    estadoMetas.push({
      id: index,
      concluido: checkbox.checked
    });
  });

  // Salva a lista convertida em texto no LocalStorage
  localStorage.setItem("rpg_treino_metas", JSON.stringify(estadoMetas));
  
  // Atualiza dinamicamente o círculo de progresso do pilar de Foco Diário
  atualizarProgressoFoco(estadoMetas);
}

function carregarMetas() {
  const metasSalvas = localStorage.getItem("rpg_treino_metas");
  const checkboxes = document.querySelectorAll("#tab-diario input[type='checkbox']");

  if (metasSalvas && checkboxes.length > 0) {
    const estadoMetas = JSON.parse(metasSalvas);
    
    estadoMetas.forEach(meta => {
      if (checkboxes[meta.id]) {
        checkboxes[meta.id].checked = meta.concluido;
      }
    });
    
    atualizarProgressoFoco(estadoMetas);
  } else {
    // Se não houver nada salvo, o progresso inicial de foco é 0%
    atualizarCirculoFoco(0);
  }
}

/* ==========================================================================
   5. CONTROLE DINÂMICO DOS CÍRCULOS DE PROGRESSO (SVG)
   ========================================================================== */
function atualizarProgressoFoco(estadoMetas) {
  if (estadoMetas.length === 0) return;
  
  const total = estadoMetas.length;
  const concluidas = estadoMetas.filter(meta => meta.concluido).length;
  const porcentagem = Math.round((concluidas / total) * 100);
  
  atualizarCirculoFoco(porcentagem);
}

function atualizarCirculoFoco(porcentagem) {
  // Acessa o pilar 5 (Foco Diário) no HTML
  const pilarFoco = document.querySelector(".card-pilar:nth-child(5)");
  if (!pilarFoco) return;

  const ringBar = pilarFoco.querySelector(".ring-bar");
  const textDisplay = pilarFoco.querySelector(".progress-text");

  // Circunferência de raio 40 é 2 * PI * 40 ≈ 251.2
  const circunferencia = 251.2;
  const offset = circunferencia - (porcentagem / 100) * circunferencia;

  // Aplica os valores no SVG e no texto central
  ringBar.style.strokeDashoffset = offset;
  textDisplay.textContent = `${porcentagem}%`;
}
