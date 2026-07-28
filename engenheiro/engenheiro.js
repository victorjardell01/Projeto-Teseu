// ==========================================
// MÓDULO DA CLASSE: ENGENHEIRO
// Foco: Mecanismos / Sistema / Projetos
// ==========================================

const ENGENHEIRO_KEY = "rpg_engenheiro_dados";

// Estado inicial do Engenheiro
let dadosEngenheiro = carregarDadosEngenheiro();

function carregarDadosEngenheiro() {
  const salvo = localStorage.getItem(ENGENHEIRO_KEY);
  if (salvo) {
    return JSON.parse(salvo);
  }
  return {
    nivel: 1,
    xp: 0,
    xpProximoNivel: 100,
    projetosCriados: 0
  };
}

function salvarDadosEngenheiro() {
  localStorage.setItem(ENGENHEROL_KEY = ENGENHEIRO_KEY, JSON.stringify(dadosEngenheiro));
}

// Função para registrar a conclusão de uma tarefa de engenharia/código
function concluirProjetoEngenheiro(nomeProjeto) {
  const ganhoXp = 45;
  const ganhoMoedas = 30;

  dadosEngenheiro.xp += ganhoXp;
  dadosEngenheiro.projetosCriados++;

  // Verifica se upou de nível
  if (dadosEngenheiro.xp >= dadosEngenheiro.xpProximoNivel) {
    dadosEngenheiro.nivel++;
    dadosEngenheiro.xp -= dadosEngenheiro.xpProximoNivel;
    dadosEngenheiro.xpProximoNivel = Math.floor(dadosEngenheiro.xpProximoNivel * 1.3);
    
    alert(`⚡ SISTEMA ATUALIZADO: O Engenheiro alcançou o Nível ${dadosEngenheiro.nivel}!`);
  }

  salvarDadosEngenheiro();
  
  // Atualiza as moedas globais do sistema (se houver a função global)
  if (typeof adicionarMoedas === "function") {
    adicionarMoedas(ganhoMoedas);
  }

  atualizarInterfaceEngenheiro();
  console.log(`Projeto "${nomeProjeto}" compilado com sucesso! +${ganhoXp} XP`);
}

function atualizarInterfaceEngenheiro() {
  // Atualiza o badge de nível na tela de seleção, se o elemento existir
  const badgeLvl = document.getElementById("lvl-engenheiro");
  if (badgeLvl) {
    badgeLvl.textContent = `Lvl ${dadosEngenheiro.nivel}`;
  }
}

// Executa a verificação visual ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  atualizarInterfaceEngenheiro();
});
