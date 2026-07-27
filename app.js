// ==========================================
// 1. ESTADO DO JOGO E DADOS SALVOS
// ==========================================
const estadoInicial = {
  guerreiro: { level: 1, xp: 0, xpMax: 100 },
  mago: { level: 1, xp: 0, xpMax: 100 },
  clerigo: { level: 1, xp: 0, xpMax: 100 },
  druida: { level: 1, xp: 0, xpMax: 100 },
  ladino: { level: 1, xp: 0, xpMax: 100 },
  mercador: { level: 1, xp: 0, xpMax: 100 },
  moedas: 0
};

let dadosRPG = JSON.parse(localStorage.getItem("rpg_dados_completos")) || estadoInicial;

// Garante que a propriedade de moedas existe caso o save seja antigo
if (dadosRPG.moedas === undefined) {
  dadosRPG.moedas = 0;
}

// Senha de acesso definida para o sistema
const SENHA_SECRETA = "1234";

// ==========================================
// 2. INICIALIZAÇÃO
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  const logado = sessionStorage.getItem("rpg_logado");
  
  if (logado === "true") {
    mostrarTelaAvatares();
  }
  atualizarMoedasNaTela();
});

// ==========================================
// 3. SISTEMA DE LOGIN / AUTENTICAÇÃO
// ==========================================
function autenticarUsuario(event) {
  event.preventDefault();
  
  const senhaDigitada = document.getElementById("input-password").value;

  if (senhaDigitada === SENHA_SECRETA) {
    sessionStorage.setItem("rpg_logado", "true");
    mostrarTelaAvatares();
  } else {
    alert("Senha incorreta! O reino permanece fechado.");
    document.getElementById("input-password").value = "";
  }
}

// ==========================================
// 4. CONTROLE DE TELAS E INTERFACE
// ==========================================
function mostrarTelaAvatares() {
  const telaLogin = document.getElementById("screen-login");
  const telaAvatares = document.getElementById("screen-avatars");
  const telaBencaos = document.getElementById("screen-bencaos");

  if (telaLogin) telaLogin.classList.add("hidden");
  if (telaBencaos) telaBencaos.classList.add("hidden");
  if (telaAvatares) telaAvatares.classList.remove("hidden");

  atualizarNiveisNaTela();
  atualizarMoedasNaTela();
}

function atualizarNiveisNaTela() {
  const classes = ["guerreiro", "mago", "clerigo", "druida", "ladino", "mercador"];
  
  classes.forEach(classe => {
    const elementoLevel = document.getElementById(`lvl-${classe}`);
    if (elementoLevel) {
      elementoLevel.textContent = `Lvl ${dadosRPG[classe].level}`;
    }
  });
}

function atualizarMoedasNaTela() {
  const contadores = document.querySelectorAll("#contador-moedas, #contador-moedas-topo");
  contadores.forEach(el => {
    if (el) el.textContent = dadosRPG.moedas;
  });
  
  localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
}

// ==========================================
// 5. NAVEGAÇÃO E SISTEMA DE BÊNÇÃOS / LOJA
// ==========================================
function abrirBencaos() {
  document.getElementById("screen-avatars").classList.add("hidden");
  document.getElementById("screen-bencaos").classList.remove("hidden");
  atualizarMoedasNaTela();
  renderizarNotificacoesColeta(); // Atualiza a lista de coleta com os níveis atuais
}

function voltarParaAvatares() {
  document.getElementById("screen-bencaos").classList.add("hidden");
  document.getElementById("screen-avatars").classList.remove("hidden");
}

// Renderiza dinamicamente as opções de coleta para cada classe no Santuário
function renderizarNotificacoesColeta() {
  const container = document.getElementById("notificacoes-container");
  if (!container) return;

  const classesInfo = [
    { id: "guerreiro", nome: "Guerreiro", emoji: "💪" },
    { id: "mago", nome: "Mago", emoji: "🧠" },
    { id: "clerigo", nome: "Clérigo", emoji: "✨" },
    { id: "druida", nome: "Druida", emoji: "🍃" },
    { id: "ladino", nome: "Ladino", emoji: "🏃" },
    { id: "mercador", nome: "Mercador", emoji: "💼" }
  ];

  container.innerHTML = ""; // Limpa antes de recriar

  classesInfo.forEach(c => {
    const nivel = dadosRPG[c.id].level;
    const premio = nivel * 15;

    const card = document.createElement("div");
    card.className = "card-notificacao";
    card.style.cssText = "background: rgba(255,255,255,0.05); padding: 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; border: 1px solid #333;";
    
    card.innerHTML = `
      <span style="font-size: 0.9rem;">${c.emoji} ${c.nome} (Lvl ${nivel}) - Resgatar bônus</span>
      <button onclick="coletarMoedasDeClasse('${c.id}')" class="btn-primary" style="padding: 6px 12px; font-size: 0.8rem; width: auto;">Coletar ${premio} 🪙</button>
    `;

    container.appendChild(card);
  });
}

// Coletar moedas com base no nível do personagem ativo
function coletarMoedasDeClasse(classe) {
  const nivel = dadosRPG[classe].level;
  const premio = nivel * 15; 

  dadosRPG.moedas += premio;
  atualizarMoedasNaTela();
  renderizarNotificacoesColeta(); // Atualiza a tela
  
  alert(`Parabéns! Você resgatou ${premio} moedas com o seu ${classe.toUpperCase()}! 🪙`);
}

// Comprar recompensas na lojinha
function comprarRecompensa(item, custo) {
  if (dadosRPG.moedas >= custo) {
    dadosRPG.moedas -= custo;
    atualizarMoedasNaTela();
    alert(`Resgate efetuado com sucesso! Aproveite o seu prêmio: "${item}". Você mereceu! 🎉`);
  } else {
    alert("Moedas insuficientes! Volte aos treinos e estudos para farmar mais moedas no reino! ⚔️");
  }
}

function entrarComoClasse(classe) {
  localStorage.setItem("rpg_classe_ativa", classe);

  setTimeout(() => {
    switch (classe) {
      case "guerreiro":
        window.location.href = "lista-de-exercicios/exercicio.html";
        break;
      case "mago":
        window.location.href = "estudos/estudo.html";
        break;
      case "clerigo":
        window.location.href = "santuario/santuario.html";
        break;
      case "druida":
        window.location.href = "druida/druida.html";
        break;
      case "ladino":
        window.location.href = "destreza/destreza.html";
        break;
      case "mercador":
        window.location.href = "comercio/comercio.html";
        break;
    }
  }, 200);
}

// ==========================================
// EXPOR FUNÇÕES PARA O HTML
// ==========================================
window.autenticarUsuario = autenticarUsuario;
window.entrarComoClasse = entrarComoClasse;
window.abrirBencaos = abrirBencaos;
window.voltarParaAvatares = voltarParaAvatares;
window.coletarMoedasDeClasse = coletarMoedasDeClasse;
window.comprarRecompensa = comprarRecompensa;
