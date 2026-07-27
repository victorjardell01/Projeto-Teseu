// ==========================================
// 1. ESTADO DO JOGO E DADOS SALVOS
// ==========================================
const estadoInicial = {
  guerreiro: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  mago: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  clerigo: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  druida: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  ladino: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  mercador: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  moedas: 0,
  missoes: {
    tarefasGuerreiro: { progresso: 0, objetivo: 5, concluida: false, recompensa: 50 },
    nivelMago: { nivelAlvo: 5, concluida: false, recompensa: 100 },
    diasSeguidosClerigo: { diasAlvo: 3, atual: 0, concluida: false, recompensa: 80 }
  }
};

let dadosRPG = JSON.parse(localStorage.getItem("rpg_dados_completos")) || estadoInicial;

// Garante compatibilidade caso o save seja antigo (adiciona propriedades faltantes)
Object.keys(estadoInicial).forEach(chave => {
  if (chave !== "moedas" && chave !== "missoes") {
    if (!dadosRPG[chave]) dadosRPG[chave] = estadoInicial[chave];
    if (dadosRPG[chave].ultimoNivelColetado === undefined) {
      dadosRPG[chave].ultimoNivelColetado = 0;
    }
  }
});

if (dadosRPG.moedas === undefined) dadosRPG.moedas = 0;
if (dadosRPG.missoes === undefined) dadosRPG.missoes = estadoInicial.missoes;

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
  renderizarNotificacoesColeta();
}

function voltarParaAvatares() {
  document.getElementById("screen-bencaos").classList.add("hidden");
  document.getElementById("screen-avatars").classList.remove("hidden");
  atualizarNiveisNaTela(); // Atualiza os avatares ao voltar
}

// Renderiza dinamicamente as opções de coleta bloqueando se já foi resgatado
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

  container.innerHTML = "";

  classesInfo.forEach(c => {
    const dadosClasse = dadosRPG[c.id];
    const nivel = dadosClasse.level;
    const jaColetouNivelAtual = dadosClasse.ultimoNivelColetado >= nivel;
    const premio = nivel * 15;

    const card = document.createElement("div");
    card.className = "card-bencao-item";
    
    if (jaColetouNivelAtual) {
      card.innerHTML = `
        <div class="info-bencao">
          <h4>${c.emoji} ${c.nome} (Lvl ${nivel})</h4>
          <p>Recompensa já resgatada para este nível!</p>
        </div>
        <button class="btn-acao-bencao" disabled style="background: #333; color: #777; cursor: not-allowed;">Resgatado ✔️</button>
      `;
    } else {
      card.innerHTML = `
        <div class="info-bencao">
          <h4>${c.emoji} ${c.nome} (Lvl ${nivel})</h4>
          <p>Resgatar bônus de ${premio} moedas</p>
        </div>
        <button onclick="coletarMoedasDeClasse('${c.id}')" class="btn-acao-bencao">COLETAR ${premio} 🪙</button>
      `;
    }

    container.appendChild(card);
  });
}

function coletarMoedasDeClasse(classe) {
  const dadosClasse = dadosRPG[classe];
  const nivel = dadosClasse.level;

  if (dadosClasse.ultimoNivelColetado >= nivel) {
    alert("Você já resgatou o bônus deste nível! Suba de nível nos estudos ou treinos para coletar novamente.");
    return;
  }

  const premio = nivel * 15; 
  dadosRPG.moedas += premio;
  dadosClasse.ultimoNivelColetado = nivel;

  atualizarMoedasNaTela();
  renderizarNotificacoesColeta();
  
  alert(`Parabéns! Você resgatou ${premio} moedas com o seu ${classe.toUpperCase()}! 🪙`);
}

function comprarRecompensa(item, custo) {
  if (dadosRPG.moedas >= custo) {
    dadosRPG.moedas -= custo;
    atualizarMoedasNaTela();
    alert(`Resgate efetuado com sucesso! Aproveite o seu prêmio: "${item}". Você mereceu! 🎉`);
  } else {
    alert("Moedas insuficientes! Volte aos treinos e estudos para farmar mais moedas no reino! ⚔️");
  }
}

// ==========================================
// 6. SISTEMA DE XP E RESET (LVL MAX)
// ==========================================
function adicionarXP(classe, quantidadeXP) {
  const dadosClasse = dadosRPG[classe];
  const LEVEL_MAX = 10; 

  dadosClasse.xp += quantidadeXP;

  while (dadosClasse.xp >= dadosClasse.xpMax) {
    dadosClasse.xp -= dadosClasse.xpMax;
    dadosClasse.level += 1;

    if (dadosClasse.level > LEVEL_MAX) {
      dadosClasse.level = 1; 
      dadosClasse.xp = 0;
      dadosClasse.xpMax = 100; 
      dadosClasse.ultimoNivelColetado = 0; 

      alert(`🏆 GLÓRIA! O seu ${classe.toUpperCase()} atingiu o ápice (Lvl ${LEVEL_MAX}) e completou o ciclo de maestria! Ele retornou ao Lvl 1 com poder renovado e novas bênçãos para farmar! 🎉`);
    } else {
      dadosClasse.xpMax = Math.floor(dadosClasse.xpMax * 1.2); 
    }
    
    verificarMissaoNivel(classe, dadosClasse.level);
  }

  localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
  atualizarNiveisNaTela();
}

// ==========================================
// 7. SISTEMA DE MISSÕES E CONQUISTAS
// ==========================================
function progredirMissao(chaveMissao, quantidade = 1) {
  if (!dadosRPG.missoes) return;
  
  const missao = dadosRPG.missoes[chaveMissao];
  if (missao && !missao.concluida) {
    missao.progresso = (missao.progresso || 0) + quantidade;
    
    if (missao.progresso >= missao.objetivo) {
      missao.concluida = true;
      dadosRPG.moedas += missao.recompensa;
      
      atualizarMoedasNaTela();
      alert(`🎉 Missão Concluída! Você ganhou ${missao.recompensa} moedas. Elas já foram adicionadas ao seu saldo para usar nas bênçãos! 🪙`);
    }
    
    localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
  }
}

function verificarMissaoNivel(classe, nivelAtual) {
  if (!dadosRPG.missoes) return;

  if (classe === "mago" && nivelAtual >= dadosRPG.missoes.nivelMago.nivelAlvo) {
    const missao = dadosRPG.missoes.nivelMago;
    if (missao && !missao.concluida) {
      missao.concluida = true;
      dadosRPG.moedas += missao.recompensa;
      
      atualizarMoedasNaTela();
      alert(`🏆 Conquista Desbloqueada: Mago no Nível ${missao.nivelAlvo}! Recompensa: ${missao.recompensa} moedas adicionadas às suas Bênçãos.`);
      localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
    }
  }
}

// ==========================================
// 8. REDIRECIONAMENTO DE CLASSES
// ==========================================
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
window.adicionarXP = adicionarXP;
window.progredirMissao = progredirMissao;
