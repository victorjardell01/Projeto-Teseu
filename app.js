// ==========================================
// 1. ESTADO DO JOGO E DADOS SALVOS
// ==========================================
const estadoInicial = {
  guerreiro: { level: 1, xp: 0, xpMax: 100 },
  mago: { level: 1, xp: 0, xpMax: 100 },
  clerigo: { level: 1, xp: 0, xpMax: 100 },
  druida: { level: 1, xp: 0, xpMax: 100 },
  moedas: 0 // Novo campo para guardar o saldo de moedas
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
  const classes = ["guerreiro", "mago", "clerigo", "druida"];
  
  classes.forEach(classe => {
    const elementoLevel = document.getElementById(`lvl-${classe}`);
    if (elementoLevel) {
      elementoLevel.textContent = `Lvl ${dadosRPG[classe].level}`;
    }
  });
}

function atualizarMoedasNaTela() {
  // Atualiza em todos os locais onde o contador de moedas aparece
  const contadores = document.querySelectorAll("#contador-moedas, #contador-moedas-topo");
  contadores.forEach(el => {
    if (el) el.textContent = dadosRPG.moedas;
  });
  
  // Salva o progresso completo automaticamente
  localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
}

// ==========================================
// 5. NAVEGAÇÃO E SISTEMA DE BÊNÇÃOS / LOJA
// ==========================================
function abrirBencaos() {
  document.getElementById("screen-avatars").classList.add("hidden");
  document.getElementById("screen-bencaos").classList.remove("hidden");
  atualizarMoedasNaTela();
}

function voltarParaAvatares() {
  document.getElementById("screen-bencaos").classList.add("hidden");
  document.getElementById("screen-avatars").classList.remove("hidden");
}

// Coletar moedas com base no nível do personagem ativo
function coletarMoedasDeClasse(classe) {
  const nivel = dadosRPG[classe].level;
  const premio = nivel * 15; // Exemplo: nível multiplicado por 15 moedas

  dadosRPG.moedas += premio;
  atualizarMoedasNaTela();
  
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
