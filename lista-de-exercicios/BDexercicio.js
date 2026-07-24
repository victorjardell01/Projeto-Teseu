// ==========================================
// 1. AGENDA SEMANAL DE TREINOS (QUARTEL DE MISSÕES)
// ==========================================
const agendaTreinos = {
  segunda: [
    { id: "puxada-alta-aberta", nome: "Barra fixa ou Puxada alta aberta", grupo: "Costas (Foco em Largura - Asas) • 4 séries", xp: 50 },
    { id: "puxada-neutra", nome: "Puxada neutra (triângulo)", grupo: "Costas • 3 séries", xp: 45 },
    { id: "pulldown-bracos-estendidos", nome: "Pulldown na polia alta", grupo: "Costas (Amplitude máxima) • 3 séries", xp: 40 },
    { id: "rosca-martelo", nome: "Rosca martelo", grupo: "Bíceps & Antebraço • 3 séries", xp: 35 },
    { id: "rosca-scott", nome: "Rosca Scott", grupo: "Bíceps & Antebraço • 3 séries", xp: 35 },
    { id: "rosca-direta", nome: "Rosca direta", grupo: "Bíceps & Antebraço • 3 séries", xp: 35 },
    { id: "rosca-inversa", nome: "Rosca inversa", grupo: "Antebraço • 3 séries", xp: 30 },
    { id: "encolhimento-halteres", nome: "Encolhimento com halteres", grupo: "Trapézio • 4 séries", xp: 40 }
  ],
  terca: [
    { id: "agachamento", nome: "Agachamento (Livre ou Hack)", grupo: "Pernas • 4x 6-8 reps", xp: 60 },
    { id: "leg-press", nome: "Leg Press", grupo: "Pernas • 3x 10-12 reps", xp: 50 },
    { id: "cadeira-extensora", nome: "Cadeira Extensora", grupo: "Pernas (Falha Metabólica) • 3x 12-15 reps", xp: 45 },
    { id: "mesa-flexora", nome: "Mesa Flexora ou Cadeira Flexora", grupo: "Posteriores • 4x 10-12 reps", xp: 45 },
    { id: "gemeos", nome: "Gêmeos Sentado ou Em Pé", grupo: "Panturrilha • 4x 15 reps", xp: 35 }
  ],
  quarta: [
    { id: "descanso", nome: "Descanso Total e Recuperação", grupo: "Recuperação Mental e Física", xp: 0 }
  ],
  quinta: [
    { id: "remada-curvada", nome: "Remada curvada com barra", grupo: "Costas (Foco em Espessura) • 4 séries", xp: 55 },
    { id: "remada-cavalinho", nome: "Remada cavalinho ou Remada baixa com pegada neutra", grupo: "Costas • 4 séries", xp: 50 },
    { id: "remada-unilateral", nome: "Remada unilateral com halter (Serrote)", grupo: "Costas • 3 séries", xp: 45 },
    { id: "rosca-inclinada-45", nome: "Rosca inclinada 45° com halteres", grupo: "Bíceps & Antebraço • 3 séries", xp: 35 },
    { id: "rosca-concentrada", nome: "Rosca concentrada", grupo: "Bíceps & Antebraço • 3 séries", xp: 35 },
    { id: "rosca-de-punho", nome: "Rosca de punho", grupo: "Bíceps & Antebraço • 3 séries", xp: 30 },
    { id: "encolhimento-barra", nome: "Encolhimento na barra por trás ou na polia", grupo: "Trapézio • 4 séries", xp: 40 }
  ],
  sexta: [
    { id: "supino-inclinado", nome: "Supino Inclinado (Halteres / Articulado)", grupo: "Peitoral Superior • 4x 8-10 reps", xp: 50 },
    { id: "supino-reto", nome: "Supino Reto (Barra ou Máquina)", grupo: "Peitoral • 3x 8-10 reps", xp: 45 },
    { id: "crossover-pec-deck", nome: "Crossover ou Pec Deck (Voador)", grupo: "Peitoral (Esmagamento) • 3x 12 reps", xp: 40 },
    { id: "desenvolvimento-elevacao", nome: "Desenvolvimento com Halteres / Elevação Lateral", grupo: "Ombros (Largura) • 4x 10-12 reps", xp: 40 },
    { id: "triceps-pulley", nome: "Tríceps Pulley (Corda ou Barra)", grupo: "Tríceps • 3x 10-12 reps", xp: 35 },
    { id: "triceps-testa-frances", nome: "Tríceps Testa ou Francês", grupo: "Tríceps • 3x 10 reps", xp: 35 }
  ],
  sabado: [],
  domingo: []
};

// ==========================================
// 2. BANCO DE DADOS UNIFICADO DE EXERCÍCIOS
// ==========================================
const BD_EXERCICIOS = {
  // --- SEGUNDA-FEIRA (Costas / Bíceps / Antebraço / Trapézio) ---
  "puxada-alta-aberta": {
    nome: "Barra fixa ou Puxada alta aberta",
    grupo: "Costas (Foco em Largura - Asas)",
    xp: 50,
    musculos: { 
      primarios: ["Latíssimo do Dorso"], 
      secundarios: ["Bíceps", "Braquiorradial"] 
    },
    analise: "Puxe a barra em direção ao peitoral superior sem inclinar o tronco excessivamente. Mantenha as escápulas deprimidas.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 8 reps", "Série 4: 8 reps"]
  },
  "puxada-neutra": {
    nome: "Puxada neutra (triângulo)",
    grupo: "Costas",
    xp: 45,
    musculos: { primarios: ["Latíssimo do Dorso", "Romboides"], secundarios: ["Bíceps"] },
    analise: "Foque no alongamento completo no topo e na contração embaixo, mantendo o peito estufado.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "pulldown-bracos-estendidos": {
    nome: "Pulldown na polia alta",
    grupo: "Costas (Amplitude máxima)",
    xp: 40,
    musculos: { primarios: ["Latíssimo do Dorso"], secundarios: ["Tríceps (Cabeça Longa)", "Redondo Maior"] },
    analise: "Isole o movimento fazendo um arco com os braços estendidos até as coxas, contraindo forte as dorsais.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "rosca-martelo": {
    nome: "Rosca martelo",
    grupo: "Bíceps & Antebraço",
    xp: 35,
    musculos: { primarios: ["Braquiorradial", "Bíceps Braquial"], secundarios: ["Antebraço"] },
    analise: "Palmas voltadas para dentro focando no braquial e na espessura do braço.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps"]
  },
  "rosca-scott": {
    nome: "Rosca Scott",
    grupo: "Bíceps & Antebraço",
    xp: 35,
    musculos: { primarios: ["Bíceps Braquial"], secundarios: ["Braquial"] },
    analise: "Apoie bem os braços no coxim e controle a descida (fase excêntrica) sem tirar o cotovelo do apoio.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "rosca-direta": {
    nome: "Rosca direta",
    grupo: "Bíceps & Antebraço",
    xp: 35,
    musculos: { primarios: ["Bíceps Braquial"], secundarios: ["Antebraço"] },
    analise: "Mantenha os cotovelos colados ao lado do corpo e evite balançar o tronco (roubar).",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "rosca-inversa": {
    nome: "Rosca inversa",
    grupo: "Antebraço",
    xp: 30,
    musculos: { primarios: ["Braquiorradial", "Extensores do Antebraço"], secundarios: ["Bíceps"] },
    analise: "Pegada pronada (palmas para baixo) para focar no desenvolvimento do antebraço.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "encolhimento-halteres": {
    nome: "Encolhimento com halteres",
    grupo: "Trapézio",
    xp: 40,
    musculos: { primarios: ["Trapézio Superior"], secundarios: ["Elevador da Escápula"] },
    analise: "Eleve os ombros em direção às orelhas em linha reta, segurando 1 segundo no topo.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps", "Série 4: 10 reps"]
  },

  // --- TERÇA-FEIRA (Pernas / Panturrilha) ---
  "agachamento": {
    nome: "Agachamento (Livre ou Hack)",
    grupo: "Pernas",
    xp: 60,
    musculos: { primarios: ["Quadríceps", "Glúteo Máximo"], secundarios: ["Isquiotibiais", "Core"] },
    analise: "Mantenha o tronco firme e desça controlando até formar 90 graus ou mais, empurrando o chão com os calcanhares.",
    series: ["Série 1: 8 reps", "Série 2: 8 reps", "Série 3: 6 reps", "Série 4: 6 reps"]
  },
  "leg-press": {
    nome: "Leg Press",
    grupo: "Pernas",
    xp: 50,
    musculos: { primarios: ["Quadríceps", "Glúteos"], secundarios: ["Isquiotibiais"] },
    analise: "Evite tirar a lombar do encosto ao flexionar os joelhos. Posicione os pés na largura dos ombros.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps"]
  },
  "cadeira-extensora": {
    nome: "Cadeira Extensora",
    grupo: "Pernas (Falha Metabólica)",
    xp: 45,
    musculos: { primarios: ["Quadríceps"], secundarios: [] },
    analise: "Segure por 1 segundo no topo espremendo o quadríceps ao máximo.",
    series: ["Série 1: 15 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "mesa-flexora": {
    nome: "Mesa Flexora ou Cadeira Flexora",
    grupo: "Posteriores",
    xp: 45,
    musculos: { primarios: ["Isquiotibiais"], secundarios: ["Gastrocnêmio"] },
    analise: "Mantenha o quadril firmemente pressionado contra o banco durante a flexão.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps", "Série 4: 10 reps"]
  },
  "gemeos": {
    nome: "Gêmeos Sentado ou Em Pé",
    grupo: "Panturrilha",
    xp: 35,
    musculos: { primarios: ["Gastrocnêmio", "Sóleo"], secundarios: [] },
    analise: "Amplitude máxima: alongue bem embaixo e suba ao ponto mais alto da ponta dos pés.",
    series: ["Série 1: 15 reps", "Série 2: 15 reps", "Série 3: 15 reps", "Série 4: 15 reps"]
  },

  // --- QUARTA-FEIRA (Descanso) ---
  "descanso": {
    nome: "Descanso Total e Recuperação",
    grupo: "Recuperação Mental e Física",
    xp: 0,
    musculos: { primarios: ["Sistema Nervoso Central"], secundarios: ["Foco Acadêmico"] },
    analise: "Dia focado na regeneração muscular completa, nutrição e descanso mental.",
    series: ["Série Única: Descanso Estratégico 🛡️"]
  },

  // --- QUINTA-FEIRA (Costas / Bíceps / Antebraço / Trapézio) ---
  "remada-curvada": {
    nome: "Remada curvada com barra",
    grupo: "Costas (Foco em Espessura)",
    xp: 55,
    musculos: { primarios: ["Latíssimo do Dorso", "Trapézio Médio", "Romboides"], secundarios: ["Bíceps", "Lombares"] },
    analise: "Coluna neutra e tronco inclinado à frente, puxando a barra em direção ao umbigo.",
    series: ["Série 1: 8 reps", "Série 2: 8 reps", "Série 3: 6 reps", "Série 4: 6 reps"]
  },
  "remada-cavalinho": {
    nome: "Remada cavalinho ou Remada baixa com pegada neutra",
    grupo: "Costas",
    xp: 50,
    musculos: { primarios: ["Romboides", "Trapézio", "Latíssimo"], secundarios: ["Bíceps"] },
    analise: "Foque na retração escapular forte a cada repetição para adensar o miolo das costas.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps", "Série 4: 10 reps"]
  },
  "remada-unilateral": {
    nome: "Remada unilateral com halter (Serrote)",
    grupo: "Costas",
    xp: 45,
    musculos: { primarios: ["Latíssimo do Dorso"], secundarios: ["Bíceps", "Core"] },
    analise: "Apoie o joelho e a mão no banco, trazendo o cotovelo rente às costelas.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "rosca-inclinada-45": {
    nome: "Rosca inclinada 45° com halteres",
    grupo: "Bíceps & Antebraço",
    xp: 35,
    musculos: { primarios: ["Bíceps Braquial (Cabeça Longa)"], secundarios: ["Antebraço"] },
    analise: "Deixe os braços caírem para trás do eixo do corpo para maximizar o alongamento do bíceps.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "rosca-concentrada": {
    nome: "Rosca concentrada",
    grupo: "Bíceps & Antebraço",
    xp: 35,
    musculos: { primarios: ["Bíceps Braquial (Pico)"], secundarios: [] },
    analise: "Apoie o cotovelo na parte interna da coxa e isole o movimento do pico do bíceps.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "rosca-de-punho": {
    nome: "Rosca de punho",
    grupo: "Bíceps & Antebraço",
    xp: 30,
    musculos: { primarios: ["Flexores do Antebraço"], secundarios: [] },
    analise: "Apoie os antebraços nas coxas ou em um banco e faça flexão completa dos punhos.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "encolhimento-barra": {
    nome: "Encolhimento na barra por trás ou na polia",
    grupo: "Trapézio",
    xp: 40,
    musculos: { primarios: ["Trapézio Superior e Médio"], secundarios: ["Antebraço"] },
    analise: "Mantenha o corpo ereto e levante os ombros verticalmente com foco total na contração superior.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps", "Série 4: 10 reps"]
  },

  // --- SEXTA-FEIRA (Peito / Ombros / Tríceps) ---
  "supino-inclinado": {
    nome: "Supino Inclinado (Halteres / Articulado)",
    grupo: "Peitoral Superior",
    xp: 50,
    musculos: { primarios: ["Peitoral Superior"], secundarios: ["Tríceps", "Deltoide Anterior"] },
    analise: "Banco regulado entre 30º e 45º focando na porção clavicular do peito.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 8 reps", "Série 4: 8 reps"]
  },
  "supino-reto": {
    nome: "Supino Reto (Barra ou Máquina)",
    grupo: "Peitoral",
    xp: 45,
    musculos: { primarios: ["Peitoral Maior"], secundarios: ["Tríceps", "Deltoide Anterior"] },
    analise: "Retraia as escápulas, mantenha os pés firmes no chão e desça a barra controladamente.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 8 reps"]
  },
  "crossover-pec-deck": {
    nome: "Crossover ou Pec Deck (Voador)",
    grupo: "Peitoral (Esmagamento)",
    xp: 40,
    musculos: { primarios: ["Peitoral Maior (Isolamento)"], secundarios: ["Deltoide Anterior"] },
    analise: "Mantenha uma leve flexão nos cotovelos e concentre-se em juntar os braços espremendo o peito.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "desenvolvimento-elevacao": {
    nome: "Desenvolvimento com Halteres / Elevação Lateral",
    grupo: "Ombros (Largura)",
    xp: 40,
    musculos: { primarios: ["Deltoide Lateral e Anterior"], secundarios: ["Tríceps", "Trapézio"] },
    analise: "Execute o movimento de forma fluida, controlando tanto a subida quanto a descida.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps", "Série 4: 10 reps"]
  },
  "triceps-pulley": {
    nome: "Tríceps Pulley (Corda ou Barra)",
    grupo: "Tríceps",
    xp: 35,
    musculos: { primarios: ["Tríceps Braquial"], secundarios: ["Core"] },
    analise: "Mantenha os cotovelos fixos ao lado do tronco, estendendo totalmente os braços embaixo.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps"]
  },
  "triceps-testa-frances": {
    nome: "Tríceps Testa ou Francês",
    grupo: "Tríceps",
    xp: 35,
    musculos: { primarios: ["Tríceps (Cabeça Longa)"], secundarios: [] },
    analise: "Estabilize os braços e movimente apenas os antebraços para alongar ao máximo a cabeça longa.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  }
};

// ==========================================
// 3. LÓGICA DE CONTROLE E INTERAÇÃO
// ==========================================
let exercicioAtual = null;

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    return; // Modo agenda semanal (sem ID na URL)
  }

  exercicioAtual = BD_EXERCICIOS[id];

  if (exercicioAtual) {
    carregarDadosExercicio();
  } else {
    alert("Exercício não encontrado!");
    window.location.href = "exercicio.html";
  }
});

function carregarDadosExercicio() {
  const elNome = document.getElementById("ex-nome");
  if (!elNome) return;

  elNome.textContent = exercicioAtual.nome;
  document.getElementById("ex-grupo").textContent = `Músculo Alvo: ${exercicioAtual.grupo}`;
  document.getElementById("ex-xp").textContent = `+${exercicioAtual.xp} XP Recompensa`;
  
  const videoEl = document.getElementById("ex-animacao");
  if (videoEl) {
    videoEl.src = exercicioAtual.gif || "";
    videoEl.load();
  }

  // Carrega a imagem do Mapa Muscular no elemento correspondente do HTML
  const mapaEl = document.getElementById("ex-mapa");
  if (mapaEl) {
    mapaEl.src = exercicioAtual.mapaMuscular || "";
  }

  document.getElementById("ex-analise-texto").textContent = exercicioAtual.analise || "Execute com boa postura.";

  const divPrimarios = document.getElementById("musculos-primarios");
  const divSecundarios = document.getElementById("musculos-secundarios");

  if (divPrimarios && exercicioAtual.musculos) {
    divPrimarios.innerHTML = exercicioAtual.musculos.primarios
      .map(m => `<span class="badge-musculo primario">🔴 ${m}</span>`).join("");
  }

  if (divSecundarios && exercicioAtual.musculos) {
    divSecundarios.innerHTML = exercicioAtual.musculos.secundarios
      .map(m => `<span class="badge-musculo secundario">🟡 ${m}</span>`).join("");
  }

  const containerSeries = document.getElementById("lista-series");
  if (containerSeries) {
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
}

function verificarConclusao() {
  const checkboxes = document.querySelectorAll(".check-serie");
  if (checkboxes.length === 0) return;
  
  const todasConcluidas = Array.from(checkboxes).every(cb => cb.checked);
  const btnFinalizar = document.getElementById("btn-finalizar");

  if (btnFinalizar) {
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
}

function finalizarExercicios() {
  let dadosRPG = JSON.parse(localStorage.getItem("rpg_dados_completos")) || {
    guerreiro: { level: 1, xp: 0, xpMax: 100 },
    mago: { level: 1, xp: 0, xpMax: 100 },
    clerigo: { level: 1, xp: 0, xpMax: 100 },
    druida: { level: 1, xp: 0, xpMax: 100 }
  };

  let guerreiro = dadosRPG.guerreiro;
  guerreiro.xp += exercicioAtual.xp;

  if (guerreiro.xp >= guerreiro.xpMax) {
    guerreiro.xp -= guerreiro.xpMax;
    guerreiro.level += 1;
    guerreiro.xpMax += 50;
    alert(`🎉 LEVEL UP! O Guerreiro alcançou o Nível ${guerreiro.level}!`);
  } else {
    alert(`⚔️ EXERCÍCIO CONCLUÍDO!\nVocê ganhou +${exercicioAtual.xp} XP!`);
  }

  localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
  window.location.href = "exercicio.html";
}
