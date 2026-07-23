// DADOS DO PERSONAGEM (Carregados do LocalStorage ou iniciados do zero)
let usuario = JSON.parse(localStorage.getItem("rpg_usuario")) || {
  classe: null,
  level: 1,
  xp: 0,
  xpMax: 100
};

// AO CARREGAR A PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  atualizarInterface();
});

// ABRIR E FECHAR MODAL
function abrirSeletorClasses() {
  const modal = document.getElementById("modal-classes");
  if (modal) modal.classList.remove("hidden");
}

function fecharSeletorClasses() {
  const modal = document.getElementById("modal-classes");
  if (modal) modal.classList.add("hidden");
}

// SELECIONAR CLASSE E NAVEGAR
function selecionarClasse(classe) {
  usuario.classe = classe;
  localStorage.setItem("rpg_usuario", JSON.stringify(usuario));

  // Atualiza a interface da página principal
  atualizarInterface();
  fecharSeletorClasses();

  // Redireciona para a página da classe correspondente
  switch (classe) {
    case "guerreiro":
      window.location.href = "lista-de-exercicios/exercicio.html"; // Treino
      break;
    case "mago":
      window.location.href = "mente.html"; // Mente
      break;
    case "clerigo":
      window.location.href = "alma.html"; // Alma
      break;
    case "druida":
      window.location.href = "alimentacao.html"; // Alimentação
      break;
  }
}

// LÓGICA DE EVOLUÇÃO E ATUALIZAÇÃO DE INTERFACE
function atualizarInterface() {
  // Loop para tratar subida de múltiplos níveis se ganhar muito XP de uma vez
  while (usuario.xp >= usuario.xpMax) {
    usuario.level += 1;
    usuario.xp -= usuario.xpMax;
    usuario.xpMax = Math.floor(usuario.xpMax * 1.5); // Aumenta a meta do próximo nível
    alert(`🎉 PARABÉNS! Seu personagem subiu para o Nível ${usuario.level}!`);
  }

  // Salva o progresso
  localStorage.setItem("rpg_usuario", JSON.stringify(usuario));

  // Atualiza Nível e XP
  const elLevel = document.getElementById("char-level");
  const elXpText = document.getElementById("xp-text");
  const elXpFill = document.getElementById("xp-fill");

  if (elLevel) elLevel.textContent = `Lvl ${usuario.level}`;
  if (elXpText) elXpText.textContent = `${usuario.xp} / ${usuario.xpMax} XP`;

  // Barra de XP
  if (elXpFill) {
    const porcentagem = Math.min((usuario.xp / usuario.xpMax) * 100, 100);
    elXpFill.style.width = `${porcentagem}%`;
  }

  // Atualiza Nome, Classe e Avatar do Personagem
  if (usuario.classe) {
    const nomesClasses = {
      guerreiro: "Guerreiro (Treino)",
      mago: "Mago (Mente)",
      clerigo: "Clérigo (Alma)",
      druida: "Druida (Alimentação)"
    };

    // Imagens personalizadas para cada classe (usando a API DiceBear)
    const avataresClasses = {
      guerreiro: "https://api.dicebear.com/7.x/bottts/svg?seed=Guerreiro",
      mago: "https://api.dicebear.com/7.x/bottts/svg?seed=Mago",
      clerigo: "https://api.dicebear.com/7.x/bottts/svg?seed=Clerigo",
      druida: "https://api.dicebear.com/7.x/bottts/svg?seed=Druida"
    };

    const elTitle = document.getElementById("char-class-title");
    const elImg = document.getElementById("avatar-img");

    if (elTitle) elTitle.textContent = nomesClasses[usuario.classe];
    if (elImg) elImg.src = avataresClasses[usuario.classe];
  }
}

// FUNÇÃO GLOBAL PARA GANHAR XP
function ganharXP(qtd) {
  usuario.xp += qtd;
  atualizarInterface();
}
