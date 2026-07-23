// ESTADO DO PERSONAGEM
let usuario = JSON.parse(localStorage.getItem("rpg_usuario")) || {
  classe: null,
  level: 1,
  xp: 0,
  xpMax: 100
};

// CARREGAMENTO INICIAL
window.addEventListener("load", () => {
  atualizarInterface();
});

// ABRIR E FECHAR MODAL
function abrirSeletorClasses() {
  const modal = document.getElementById("modal-classes");
  if (modal) {
    modal.classList.remove("hidden");
  } else {
    console.error("Elemento 'modal-classes' não foi encontrado no HTML!");
  }
}

function fecharSeletorClasses() {
  const modal = document.getElementById("modal-classes");
  if (modal) {
    modal.classList.add("hidden");
  }
}

// SELECIONAR CLASSE
function selecionarClasse(classe) {
  usuario.classe = classe;
  localStorage.setItem("rpg_usuario", JSON.stringify(usuario));

  fecharSeletorClasses();
  atualizarInterface();

  // Redireciona após escolher
  setTimeout(() => {
    switch (classe) {
      case "guerreiro":
        window.location.href = "lista-de-exercicios/exercicio.html";
        break;
      case "mago":
        window.location.href = "mente.html";
        break;
      case "clerigo":
        window.location.href = "alma.html";
        break;
      case "druida":
        window.location.href = "alimentacao.html";
        break;
    }
  }, 300);
}

// ATUALIZAR INTERFACE
function atualizarInterface() {
  while (usuario.xp >= usuario.xpMax) {
    usuario.level += 1;
    usuario.xp -= usuario.xpMax;
    usuario.xpMax = Math.floor(usuario.xpMax * 1.5);
    alert(`🎉 PARABÉNS! Seu personagem subiu para o Nível ${usuario.level}!`);
  }

  localStorage.setItem("rpg_usuario", JSON.stringify(usuario));

  const elLevel = document.getElementById("char-level");
  const elXpText = document.getElementById("xp-text");
  const elXpFill = document.getElementById("xp-fill");

  if (elLevel) elLevel.textContent = `Lvl ${usuario.level}`;
  if (elXpText) elXpText.textContent = `${usuario.xp} / ${usuario.xpMax} XP`;

  if (elXpFill) {
    const porcentagem = Math.min((usuario.xp / usuario.xpMax) * 100, 100);
    elXpFill.style.width = `${porcentagem}%`;
  }

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
