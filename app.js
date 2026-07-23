// ==========================================
// 1. ESTADO INICIAL / LOCAL STORAGE
// ==========================================
let usuario = JSON.parse(localStorage.getItem("rpg_usuario")) || {
  classe: null,
  level: 1,
  xp: 0,
  xpMax: 100
};

// ==========================================
// 2. INICIALIZAÇÃO DA PÁGINA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  atualizarInterface();

  // Escutador direto de clique no avatar
  const avatarBox = document.getElementById("btn-avatar");
  if (avatarBox) {
    avatarBox.addEventListener("click", abrirSeletorClasses);
  }
});

// ==========================================
// 3. CONTROLE DA MODAL DE CLASSES
// ==========================================
function abrirSeletorClasses() {
  const modal = document.getElementById("modal-classes");
  if (modal) {
    modal.classList.remove("hidden");
  }
}

function fecharSeletorClasses() {
  const modal = document.getElementById("modal-classes");
  if (modal) {
    modal.classList.add("hidden");
  }
}

// ==========================================
// 4. SELEÇÃO DE CLASSE E NAVEGAÇÃO
// ==========================================
function selecionarClasse(classe) {
  usuario.classe = classe;
  localStorage.setItem("rpg_usuario", JSON.stringify(usuario));

  fecharSeletorClasses();
  atualizarInterface();

  // Pequeno delay para o usuário ver o modal fechar antes de redirecionar
  setTimeout(() => {
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
  }, 250);
}

// ==========================================
// 5. LÓGICA DE EVOLUÇÃO E RENDERIZAÇÃO
// ==========================================
function atualizarInterface() {
  // Trata a evolução de níveis caso ganhe muito XP de uma vez
  while (usuario.xp >= usuario.xpMax) {
    usuario.level += 1;
    usuario.xp -= usuario.xpMax;
    usuario.xpMax = Math.floor(usuario.xpMax * 1.5);
    alert(`🎉 PARABÉNS! Seu personagem subiu para o Nível ${usuario.level}!`);
  }

  // Salva no LocalStorage
  localStorage.setItem("rpg_usuario", JSON.stringify(usuario));

  // Atualiza Nível e XP na tela
  const elLevel = document.getElementById("char-level");
  const elXpText = document.getElementById("xp-text");
  const elXpFill = document.getElementById("xp-fill");

  if (elLevel) elLevel.textContent = `Lvl ${usuario.level}`;
  if (elXpText) elXpText.textContent = `${usuario.xp} / ${usuario.xpMax} XP`;

  if (elXpFill) {
    const porcentagem = Math.min((usuario.xp / usuario.xpMax) * 100, 100);
    elXpFill.style.width = `${porcentagem}%`;
  }

  // Mapeamento de Avatares estilo RPG
  const avatares = {
    padrao: "https://api.dicebear.com/7.x/adventurer/svg?seed=Aventureiro",
    guerreiro: "https://api.dicebear.com/7.x/adventurer/svg?seed=Guerreiro",
    mago: "https://api.dicebear.com/7.x/adventurer/svg?seed=Mago",
    clerigo: "https://api.dicebear.com/7.x/adventurer/svg?seed=Clerigo",
    druida: "https://api.dicebear.com/7.x/adventurer/svg?seed=Druida"
  };

  const elTitle = document.getElementById("char-class-title");
  const elImg = document.getElementById("avatar-img");

  if (usuario.classe) {
    const nomesClasses = {
      guerreiro: "Guerreiro (Treino)",
      mago: "Mago (Mente)",
      clerigo: "Clérigo (Alma)",
      druida: "Druida (Alimentação)"
    };
    if (elTitle) elTitle.textContent = nomesClasses[usuario.classe];
    if (elImg) elImg.src = avatares[usuario.classe];
  } else {
    if (elImg) elImg.src = avatares.padrao;
  }
}

// ==========================================
// 6. FUNÇÃO PÚBLICA PARA RECOMPENSAS
// ==========================================
function ganharXP(quantidade) {
  usuario.xp += quantidade;
  atualizarInterface();
}
