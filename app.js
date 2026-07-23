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
  document.getElementById("modal-classes").classList.remove("hidden");
}

function fecharSeletorClasses() {
  document.getElementById("modal-classes").classList.add("hidden");
}

// SELECIONAR CLASSE E REDIRECIONAR
function selecionarClasse(classe) {
  usuario.classe = classe;
  localStorage.setItem("rpg_usuario", JSON.stringify(usuario));

  // Redireciona para a página correspondente à classe
  switch (classe) {
    case "guerreiro":
      window.location.href = "lista-de-exercicios/exercicio.html"; // Página de Treino
      break;
    case "mago":
      window.location.href = "mente.html"; // Página da Mente
      break;
    case "clerigo":
      window.location.href = "alma.html"; // Página da Alma
      break;
    case "druida":
      window.location.href = "alimentacao.html"; // Página de Alimentação
      break;
  }
}

// LÓGICA DE EVOLUÇÃO E ATUALIZAÇÃO DE INTERFACE
function atualizarInterface() {
  // Verifica se subiu de nível
  if (usuario.xp >= usuario.xpMax) {
    usuario.level += 1;
    usuario.xp -= usuario.xpMax;
    usuario.xpMax = Math.floor(usuario.xpMax * 1.5); // Aumenta a meta de XP para o próximo nível
    alert(`🎉 PARABÉNS! Você subiu para o Nível ${usuario.level}!`);
    localStorage.setItem("rpg_usuario", JSON.stringify(usuario));
  }

  // Atualiza Textos
  document.getElementById("char-level").textContent = `Lvl ${usuario.level}`;
  document.getElementById("xp-text").textContent = `${usuario.xp} / ${usuario.xpMax} XP`;

  // Atualiza Classe no Card
  if (usuario.classe) {
    const nomesClasses = {
      guerreiro: "Guerreiro (Treino)",
      mago: "Mago (Mente)",
      clerigo: "Clérigo (Alma)",
      druida: "Druida (Alimentação)"
    };
    document.getElementById("char-class-title").textContent = nomesClasses[usuario.classe];
  }

  // Porcentagem da Barra de XP
  const porcentagem = (usuario.xp / usuario.xpMax) * 100;
  document.getElementById("xp-fill").style.width = `${porcentagem}%`;
}

// FUNÇÃO PARA ADICIONAR XP (Pode ser chamada ao concluir tarefas diárias)
function ganharXP(qtd) {
  usuario.xp += qtd;
  localStorage.setItem("rpg_usuario", JSON.stringify(usuario));
  atualizarInterface();
}
