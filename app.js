// ==========================================
// 1. ESTADO DO JOGO E DADOS SALVOS
// ==========================================
// Como cada área tem seu próprio nível, o estado agora salva os atributos separadamente.
const estadoInicial = {
  guerreiro: { level: 1, xp: 0, xpMax: 100 },
  mago: { level: 1, xp: 0, xpMax: 100 },
  clerigo: { level: 1, xp: 0, xpMax: 100 },
  druida: { level: 1, xp: 0, xpMax: 100 }
};

let dadosRPG = JSON.parse(localStorage.getItem("rpg_dados_completos")) || estadoInicial;

// Senha de acesso definida para o sistema (você pode alterar aqui)
const SENHA_SECRETA = "1234";

// ==========================================
// 2. INICIALIZAÇÃO
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  // Verifica se o usuário já fez login nesta sessão (opcional, mas melhora a experiência)
  const logado = sessionStorage.getItem("rpg_logado");
  
  if (logado === "true") {
    mostrarTelaAvatares();
  }
});

// ==========================================
// 3. SISTEMA DE LOGIN / AUTENTICAÇÃO
// ==========================================
function autenticarUsuario(event) {
  // Evita que a página recarregue ao enviar o formulário
  event.preventDefault();
  
  const senhaDigitada = document.getElementById("input-password").value;

  if (senhaDigitada === SENHA_SECRETA) {
    // Salva na sessão atual para não pedir senha se recarregar a página
    sessionStorage.setItem("rpg_logado", "true");
    mostrarTelaAvatares();
  } else {
    alert("Senha incorreta! O reino permanece fechado.");
    document.getElementById("input-password").value = ""; // Limpa o campo
  }
}

// ==========================================
// 4. CONTROLE DE TELAS E INTERFACE
// ==========================================
function mostrarTelaAvatares() {
  const telaLogin = document.getElementById("screen-login");
  const telaAvatares = document.getElementById("screen-avatars");

  if (telaLogin) telaLogin.classList.add("hidden");
  if (telaAvatares) telaAvatares.classList.remove("hidden");

  atualizarNiveisNaTela();
}

function atualizarNiveisNaTela() {
  // Atualiza os badges de nível acima de cada avatar
  const classes = ["guerreiro", "mago", "clerigo", "druida"];
  
  classes.forEach(classe => {
    const elementoLevel = document.getElementById(`lvl-${classe}`);
    if (elementoLevel) {
      elementoLevel.textContent = `Lvl ${dadosRPG[classe].level}`;
    }
  });
}

// ==========================================
// 5. NAVEGAÇÃO E ESCOLHA DE CAMINHO
// ==========================================
function entrarComoClasse(classe) {
  // Salva qual classe o usuário está acessando agora, para a página seguinte saber
  localStorage.setItem("rpg_classe_ativa", classe);

  // Pequeno delay para efeito visual (opcional)
  setTimeout(() => {
    switch (classe) {
      case "guerreiro":
        window.location.href = "lista-de-exercicios/exercicio.html";
        break;
      case "mago":
        window.location.href = "estudos/estudo.html";
        break;
      case "clerigo":
        window.location.href = "alma.html";
        break;
      case "druida":
        window.location.href = "alimentacao.html";
        break;
    }
  }, 200);
}

// ==========================================
// EXPOR FUNÇÕES PARA O HTML
// ==========================================
window.autenticarUsuario = autenticarUsuario;
window.entrarComoClasse = entrarComoClasse;
