// ==========================================
// BANCO DE DADOS UNIFICADO (TREINOS A, B e C COMPLETOS)
// ==========================================
const BD_EXERCICIOS = {
  // --- TREINO A: COSTAS, BÍCEPS E TRAPÉZIO ---
  "remada-curvada": {
    nome: "Remada Curvada com Barra",
    grupo: "Costas",
    xp: 50,
    gif: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Bent-over-row-1.gif",
    musculos: {
      primarios: ["Latíssimo do Dorso", "Trapézio Médio"],
      secundarios: ["Bíceps Braquial", "Lombares"]
    },
    analise: "Mantenha a coluna neutra e puxe a barra em direção ao umbigo enfatizando a adução escapular no final.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps", "Série 4: 10 reps"]
  },
  "puxada-alta": {
    nome: "Puxada Alta (Polia)",
    grupo: "Costas",
    xp: 50,
    gif: "https://upload.wikimedia.org/wikipedia/commons/8/86/Lat-pulldown-1.gif",
    musculos: {
      primarios: ["Latíssimo do Dorso (Grande Dorsal)"],
      secundarios: ["Bíceps", "Braquiorradial"]
    },
    analise: "Puxe a barra em direção ao peitoral superior sem inclinar o tronco excessivamente para trás.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps", "Série 4: 12 reps"]
  },
  "remada-baixa": {
    nome: "Remada Baixa (Triângulo)",
    grupo: "Costas",
    xp: 40,
    gif: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    musculos: {
      primarios: ["Latíssimo do Dorso", "Romboides"],
      secundarios: ["Bíceps", "Trapézio"]
    },
    analise: "Mantenha o peito estufado e puxe o manípulo controlando a volta do peso para máximo alongamento.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "rosca-direta": {
    nome: "Rosca Direta com Barra",
    grupo: "Bíceps",
    xp: 30,
    gif: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Biceps-curl-1.gif",
    musculos: {
      primarios: ["Bíceps Braquial"],
      secundarios: ["Braquial Anterior", "Antebraço"]
    },
    analise: "Mantenha os cotovelos fixos ao lado do corpo e evite usar o balanço do quadril.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "rosca-martelo": {
    nome: "Rosca Martelo com Halteres",
    grupo: "Bíceps",
    xp: 30,
    gif: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
    musculos: {
      primarios: ["Braquiorradial", "Bíceps Braquial"],
      secundarios: ["Antebraço"]
    },
    analise: "Com as palmas das mãos voltadas uma para a outra, execute o movimento focando na espessura do braço.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "encolhimento": {
    nome: "Encolhimento com Halteres",
    grupo: "Trapézio",
    xp: 30,
    gif: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Dumbbell-shrug-1.gif",
    musculos: {
      primarios: ["Trapézio Superior"],
      secundarios: ["Levantador da Escápula"]
    },
    analise: "Eleve os ombros reto em direção às orelhas. Evite rodar os ombros para proteger a articulação.",
    series: ["Série 1: 15 reps", "Série 2: 15 reps", "Série 3: 15 reps", "Série 4: 15 reps"]
  },

  // --- TREINO B: PERNAS ---
  "agachamento": {
    nome: "Agachamento Livre",
    grupo: "Pernas",
    xp: 60,
    gif: "https://upload.wikimedia.org/wikipedia/commons/8/82/Squat-1.gif",
    musculos: {
      primarios: ["Quadríceps", "Glúteo Máximo"],
      secundarios: ["Isquiotibiais", "Eretores da Espinha"]
    },
    analise: "Mantenha os joelhos alinhados com as pontas dos pés e desça preservando as curvaturas naturais da coluna.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps", "Série 4: 10 reps"]
  },
  "leg-press": {
    nome: "Leg Press 45º",
    grupo: "Pernas",
    xp: 50,
    gif: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    musculos: {
      primarios: ["Quadríceps", "Glúteos"],
      secundarios: ["Isquiotibiais"]
    },
    analise: "Evite tirar a região lombar e o quadril do encosto do banco durante a descida da plataforma.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps", "Série 4: 12 reps"]
  },
  "extensora": {
    nome: "Cadeira Extensora",
    grupo: "Pernas",
    xp: 40,
    gif: "https://upload.wikimedia.org/wikipedia/commons/2/22/Leg-extension-1.gif",
    musculos: {
      primarios: ["Quadríceps (Isolamento)"],
      secundarios: ["Nenhum (Isolado)"]
    },
    analise: "Ajuste o encosto para alinhar o joelho com o eixo da máquina. Segure a extensão por 1s no topo.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "flexora": {
    nome: "Mesa Flexora",
    grupo: "Pernas",
    xp: 40,
    gif: "https://upload.wikimedia.org/wikipedia/commons/2/23/Lying-leg-curl-1.gif",
    musculos: {
      primarios: ["Isquiotibiais (Posterior de Coxa)"],
      secundarios: ["Gastrocnêmio"]
    },
    analise: "Mantenha o quadril firme contra o banco para não sobrecarregar a região lombar durante a flexão.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "stiff": {
    nome: "Stiff com Barra",
    grupo: "Pernas",
    xp: 50,
    gif: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    musculos: {
      primarios: ["Isquiotibiais", "Glúteo Máximo"],
      secundarios: ["Eretores da Espinha"]
    },
    analise: "Mantenha os joelhos levemente flexionados (sem travar) e mova o quadril para trás sentindo alongar o posterior.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "panturrilha": {
    nome: "Gêmeos em Pé",
    grupo: "Panturrilhas",
    xp: 30,
    gif: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Standing-calf-raise-1.gif",
    musculos: {
      primarios: ["Gastrocnêmio"],
      secundarios: ["Sóleo"]
    },
    analise: "Faça uma amplitude completa: desça bem o calcanhar e suba no ponto máximo da ponta do pé.",
    series: ["Série 1: 15 reps", "Série 2: 15 reps", "Série 3: 15 reps", "Série 4: 15 reps"]
  },

  // --- TREINO C: PEITO, OMBRO, TRÍCEPS E ANTEBRAÇO ---
  "supino-reto": {
    nome: "Supino Reto com Barra",
    grupo: "Peitoral",
    xp: 50,
    gif: "https://upload.wikimedia.org/wikipedia/commons/9/91/Bench-press-1.gif",
    musculos: {
      primarios: ["Peitoral Maior"],
      secundarios: ["Tríceps Braquial", "Deltoide Anterior"]
    },
    analise: "Mantenha os pés firmes no chão, aduza as escápulas e desça a barra até tocar suavemente o peito.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps", "Série 4: 10 reps"]
  },
  "supino-inclinado": {
    nome: "Supino Inclinado c/ Halteres",
    grupo: "Peitoral",
    xp: 40,
    gif: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Incline-dumbbell-press-1.gif",
    musculos: {
      primarios: ["Peitoral Superior (Clavicular)"],
      secundarios: ["Deltoide Anterior", "Tríceps"]
    },
    analise: "O banco inclinado a 30°/45° direciona a carga com precisão para a porção superior do peitoral.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "crucifixo": {
    nome: "Crucifixo Reto com Halteres",
    grupo: "Peitoral",
    xp: 30,
    gif: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    musculos: {
      primarios: ["Peitoral Maior (Isolamento)"],
      secundarios: ["Deltoide Anterior"]
    },
    analise: "Mantenha uma leve flexão fixa nos cotovelos e abra os braços sentindo o peito esticar no eixo horizontal.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "desenvolvimento": {
    nome: "Desenvolvimento c/ Halteres",
    grupo: "Ombros",
    xp: 40,
    gif: "https://upload.wikimedia.org/wikipedia/commons/5/52/Dumbbell-shoulder-press-1.gif",
    musculos: {
      primarios: ["Deltoide Anterior e Lateral"],
      secundarios: ["Tríceps Braquial", "Trapézio"]
    },
    analise: "Empurre os halteres até quase estender totalmente os cotovelos sem bater as cargas no topo.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "elevacao-lateral": {
    nome: "Elevação Lateral",
    grupo: "Ombros",
    xp: 30,
    gif: "https://upload.wikimedia.org/wikipedia/commons/0/01/Dumbbell-lateral-raise-1.gif",
    musculos: {
      primarios: ["Deltoide Lateral"],
      secundarios: ["Trapézio Superior"]
    },
    analise: "Suba os cotovelos levemente flexionados até a linha dos ombros evitando o balanço do tronco.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "triceps-pulley": {
    nome: "Tríceps Pulley (Corda)",
    grupo: "Tríceps",
    xp: 30,
    gif: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Triceps-pushdown-1.gif",
    musculos: {
      primarios: ["Tríceps Braquial"],
      secundarios: ["Ancôneo"]
    },
    analise: "Mantenha o cotovelo totalmente fixo ao lado do corpo, abrindo a corda no final para pico de contração.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "triceps-testa": {
    nome: "Tríceps Testa com Barra W",
    grupo: "Tríceps",
    xp: 40,
    gif: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
    musculos: {
      primarios: ["Tríceps Braquial (Cabeça Longa)"],
      secundarios: ["Antebraço"]
    },
    analise: "Deitado no banco, flexione apenas os cotovelos trazendo a barra em direção à testa ou logo atrás da cabeça.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "antebraco": {
    nome: "Rosca Inversa / Flexão de Punho",
    grupo: "Antebraço",
    xp: 30,
    gif: "https://upload.wikimedia.org/wikipedia/commons/7/70/Reverse-barbell-curl-1.gif",
    musculos: {
      primarios: ["Braquiorradial", "Extensores do Punho"],
      secundarios: ["Bíceps Braquial"]
    },
    analise: "Segure a barra com pegada pronada (palmas para baixo) para focar na ativação do antebraço.",
    series: ["Série 1: 15 reps", "Série 2: 15 reps", "Série 3: 15 reps"]
  }
};

let exercicioAtual = null;

// Lógica de Carregamento Dinâmico
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  exercicioAtual = BD_EXERCICIOS[id];

  if (exercicioAtual) {
    carregarDadosExercicio();
  } else {
    alert("Exercício não encontrado!");
    window.location.href = "../index.html";
  }
});

function carregarDadosExercicio() {
  document.getElementById("ex-nome").textContent = exercicioAtual.nome;
  document.getElementById("ex-grupo").textContent = `Músculo Alvo: ${exercicioAtual.grupo}`;
  document.getElementById("ex-xp").textContent = `+${exercicioAtual.xp} XP Recompensa`;
  
  document.getElementById("ex-animacao").src = exercicioAtual.gif || "";
  document.getElementById("ex-analise-texto").textContent = exercicioAtual.analise || "Execute com boa postura.";

  // Renderizar Badges de Músculos
  const divPrimarios = document.getElementById("musculos-primarios");
  const divSecundarios = document.getElementById("musculos-secundarios");

  divPrimarios.innerHTML = exercicioAtual.musculos.primarios
    .map(m => `<span class="badge-musculo primario">🔴 ${m}</span>`).join("");

  divSecundarios.innerHTML = exercicioAtual.musculos.secundarios
    .map(m => `<span class="badge-musculo secundario">🟡 ${m}</span>`).join("");

  // Renderizar Checklist de Séries
  const containerSeries = document.getElementById("lista-series");
  containerSeries.innerHTML = "";

  exercicioAtual.series.forEach((textoSerie) => {
    const label = document.createElement("label");
    label.className = "serie-item";
    label.innerHTML = `
      <span>${textoSerie}</span>
      <input type="checkbox" class="check-serie" onchange="verificarConclusao()">
    `;
    containerSeries.appendChild(label);
  });
}

function verificarConclusao() {
  const checkboxes = document.querySelectorAll(".check-serie");
  const todasConcluidas = Array.from(checkboxes).every(cb => cb.checked);
  const btnFinalizar = document.getElementById("btn-finalizar");

  if (todasConcluidas) {
    btnFinalizar.disabled = false;
    btnFinalizar.style.opacity = "1";
    btnFinalizar.style.cursor = "pointer";
  } else {
    btnFinalizar.disabled = true;
    btnFinalizar.style.opacity = "0.5";
    btnFinalizar.style.cursor = "not-allowed";
  }
}

function finalizarExercicios() {
  // Recupera os dados completos do RPG do localStorage
  let dadosRPG = JSON.parse(localStorage.getItem("rpg_dados_completos")) || {
    guerreiro: { level: 1, xp: 0, xpMax: 100 },
    mago: { level: 1, xp: 0, xpMax: 100 },
    clerigo: { level: 1, xp: 0, xpMax: 100 },
    druida: { level: 1, xp: 0, xpMax: 100 }
  };

  let guerreiro = dadosRPG.guerreiro;
  guerreiro.xp += exercicioAtual.xp;

  // Lógica de Level Up
  if (guerreiro.xp >= guerreiro.xpMax) {
    guerreiro.xp -= guerreiro.xpMax;
    guerreiro.level += 1;
    guerreiro.xpMax += 50;
    alert(`🎉 LEVEL UP! O Guerreiro alcançou o Nível ${guerreiro.level}!`);
  } else {
    alert(`⚔️ EXERCÍCIO CONCLUÍDO!\nVocê ganhou +${exercicioAtual.xp} XP!`);
  }

  // Salva de volta no localStorage
  localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
  window.location.href = "../index.html";
}
