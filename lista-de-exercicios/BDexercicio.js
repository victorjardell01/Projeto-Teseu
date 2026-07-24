// ==========================================
// 1. AGENDA SEMANAL DE TREINOS (QUARTEL DE MISSÕES)
// ==========================================
const agendaTreinos = {
  segunda: [
    { id: "puxada-alta-aberta", nome: "Puxada Alta (Pegada Aberta Pronada)", grupo: "Costas (Largura) • 4x 8-10 reps", xp: 50 },
    { id: "puxada-neutra", nome: "Puxada Neutra (Triângulo) / Pulldown Articulado", grupo: "Costas (Alongamento) • 3x 10 reps", xp: 45 },
    { id: "remada-baixa-supinada", nome: "Remada Baixa no Cabo (Supinada)", grupo: "Costas (Miolo) • 3x 10 reps", xp: 45 },
    { id: "pulldown-bracos-estendidos", nome: "Pulldown com Barra no Pulley", grupo: "Costas (Isolamento) • 3x 12 reps", xp: 40 },
    { id: "rosca-martelo", nome: "Rosca Martelo", grupo: "Bíceps / Antebraço • 3x 10-12 reps", xp: 35 },
    { id: "rosca-scott-concentrada", nome: "Rosca Scott ou Concentrada", grupo: "Bíceps • 3x 10 reps", xp: 35 }
  ],
  terca: [
    { id: "agachamento-livre", nome: "Agachamento (Livre ou Hack)", grupo: "Pernas • 4x 6-8 reps", xp: 60 },
    { id: "leg-press-45", nome: "Leg Press", grupo: "Pernas • 3x 10-12 reps", xp: 50 },
    { id: "cadeira-extensora", nome: "Cadeira Extensora", grupo: "Pernas (Falha Metabólica) • 3x 12-15 reps", xp: 45 },
    { id: "mesa-flexora", nome: "Mesa Flexora ou Cadeira Flexora", grupo: "Posteriores • 4x 10-12 reps", xp: 45 },
    { id: "gemeos-pe", nome: "Gêmeos Sentado ou Em Pé", grupo: "Panturrilha • 4x 15 reps", xp: 35 }
  ],
  quarta: [
    { id: "descanso", nome: "Descanso Total e Recuperação", grupo: "Recuperação Mental e Física", xp: 0 }
  ],
  quinta: [
    { id: "remada-curvada", nome: "Remada Curvada com Barra", grupo: "Costas (Força Bruta) • 4x 6-8 reps", xp: 55 },
    { id: "remada-cavalinho", nome: "Remada Cavalinho ou T na Máquina", grupo: "Costas (Miolo) • 3x 10 reps", xp: 45 },
    { id: "remada-unilateral", nome: "Remada Unilateral com Halter (Serrote)", grupo: "Costas (Assimetrias) • 3x 10 reps", xp: 45 },
    { id: "crucifixo-invertido", nome: "Crucifixo Invertido ou Face Pull", grupo: "Posterior de Ombro • 4x 12-15 reps", xp: 40 },
    { id: "rosca-direta-w", nome: "Rosca Direta (Barra W)", grupo: "Bíceps • 3x 10 reps", xp: 35 }
  ],
  sexta: [
    { id: "supino-inclinado-halteres", nome: "Supino Inclinado (Halteres / Articulado)", grupo: "Peitoral Superior • 4x 8-10 reps", xp: 50 },
    { id: "supino-reto", nome: "Supino Reto (Barra ou Máquina)", grupo: "Peitoral • 3x 8-10 reps", xp: 45 },
    { id: "crossover-pec-deck", nome: "Crossover ou Pec Deck (Voador)", grupo: "Peitoral (Esmagamento) • 3x 12 reps", xp: 40 },
    { id: "desenvolvimento-lateral", nome: "Desenvolvimento com Halteres / Elevação Lateral", grupo: "Ombros (Largura) • 4x 10-12 reps", xp: 40 },
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
  // --- SEGUNDA-FEIRA ---
  "puxada-alta-aberta": {
    nome: "Puxada Alta (Pegada Aberta Pronada)",
    grupo: "Costas (Largura)",
    xp: 50,
    gif: "imagens/puxada-alta-aberta.mp4",
    musculos: { primarios: ["Latíssimo do Dorso"], secundarios: ["Bíceps", "Braquiorradial"] },
    analise: "Puxe a barra em direção ao peitoral superior sem inclinar o tronco excessivamente.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 8 reps", "Série 4: 8 reps"]
  },
  "puxada-neutra": {
    nome: "Puxada Neutra (Triângulo)",
    grupo: "Costas (Alongamento)",
    xp: 45,
    gif: "imagens/puxada-neutra.mp4",
    musculos: { primarios: ["Latíssimo do Dorso", "Romboides"], secundarios: ["Bíceps"] },
    analise: "Foques no alongamento completo no topo e na contração embaixo.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "remada-baixa-supinada": {
    nome: "Remada Baixa no Cabo (Supinada)",
    grupo: "Costas (Miolo)",
    xp: 45,
    gif: "imagens/remada-baixa-supinada.mp4",
    musculos: { primarios: ["Latíssimo", "Miolo das Costas"], secundarios: ["Bíceps"] },
    analise: "Mantenha os cotovelos colados ao corpo puxando em direção ao abdômen inferior.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "pulldown-bracos-estendidos": {
    nome: "Pulldown com Barra no Pulley",
    grupo: "Costas (Isolamento)",
    xp: 40,
    gif: "imagens/pulldown-bracos-estendidos.mp4",
    musculos: { primarios: ["Latíssimo do Dorso"], secundarios: ["Tríceps (Cabeça Longa)"] },
    analise: "Isole o movimento fazendo um arco com os braços estendidos até as coxas.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "rosca-martelo": {
    nome: "Rosca Martelo com Halteres",
    grupo: "Bíceps / Antebraço",
    xp: 35,
    gif: "imagens/rosca-martelo.mp4",
    musculos: { primarios: ["Braquiorradial", "Bíceps Braquial"], secundarios: ["Antebraço"] },
    analise: "Palmas voltadas para dentro focando no braquial e na espessura do braço.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps"]
  },
  "rosca-scott-concentrada": {
    nome: "Rosca Scott ou Concentrada",
    grupo: "Bíceps",
    xp: 35,
    gif: "imagens/rosca-scott-concentrada.mp4",
    musculos: { primarios: ["Bíceps Braquial"], secundarios: ["Antebraço"] },
    analise: "Controle a fase excêntrica (descida) estendendo totalmente o braço.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },

  // --- TERÇA-FEIRA ---
  "agachamento-livre": {
    nome: "Agachamento (Livre ou Hack)",
    grupo: "Pernas",
    xp: 60,
    gif: "imagens/agachamento-livre.mp4",
    musculos: { primarios: ["Quadríceps", "Glúteo Máximo"], secundarios: ["Isquiotibiais", "Core"] },
    analise: "Mantenha o tronco firme e desça controlando até formar 90 graus ou mais.",
    series: ["Série 1: 8 reps", "Série 2: 8 reps", "Série 3: 6 reps", "Série 4: 6 reps"]
  },
  "leg-press-45": {
    nome: "Leg Press 45º",
    grupo: "Pernas",
    xp: 50,
    gif: "imagens/leg-press-45.mp4",
    musculos: { primarios: ["Quadríceps", "Glúteos"], secundarios: ["Isquiotibiais"] },
    analise: "Evite tirar a lombar do encosto ao flexionar os joelhos.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps"]
  },
  "cadeira-extensora": {
    nome: "Cadeira Extensora",
    grupo: "Pernas (Falha)",
    xp: 45,
    gif: "imagens/cadeira-extensora.mp4",
    musculos: { primarios: ["Quadríceps"], secundarios: [] },
    analise: "Segure por 1 segundo no topo espremendo o quadríceps.",
    series: ["Série 1: 15 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "mesa-flexora": {
    nome: "Mesa Flexora",
    grupo: "Posteriores",
    xp: 45,
    gif: "imagens/mesa-flexora.mp4",
    musculos: { primarios: ["Isquiotibiais"], secundarios: ["Gastrocnêmio"] },
    analise: "Mantenha o quadril pressionado contra o banco durante a flexão.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps", "Série 4: 10 reps"]
  },
  "gemeos-pe": {
    nome: "Gêmeos em Pé ou Sentado",
    grupo: "Panturrilhas",
    xp: 35,
    gif: "imagens/gemeos-pe.mp4",
    musculos: { primarios: ["Gastrocnêmio", "Sóleo"], secundarios: [] },
    analise: "Amplitude máxima: alongue embaixo e suba ao ponto mais alto.",
    series: ["Série 1: 15 reps", "Série 2: 15 reps", "Série 3: 15 reps", "Série 4: 15 reps"]
  },

  // --- QUARTA-FEIRA ---
  "descanso": {
    nome: "Descanso Total e Recuperação",
    grupo: "Recuperação Mental e Física",
    xp: 0,
    gif: "imagens/descanso.mp4", // Pode colocar um vídeo de relaxamento aqui, ou manter vazio se preferir.
    musculos: { primarios: ["Sistema Nervoso Central"], secundarios: ["Foco Acadêmico"] },
    analise: "Dia focado na regeneração muscular e blindagem cognitiva.",
    series: ["Série Única: Foco nos Estudos 📚"]
  },

  // --- QUINTA-FEIRA ---
  "remada-curvada": {
    nome: "Remada Curvada com Barra",
    grupo: "Costas (Força Bruta)",
    xp: 55,
    gif: "imagens/remada-curvada.mp4",
    musculos: { primarios: ["Latíssimo do Dorso", "Trapézio Médio"], secundarios: ["Bíceps", "Lombares"] },
    analise: "Coluna neutra e puxada direcionada ao umbigo para ganho de espessura.",
    series: ["Série 1: 8 reps", "Série 2: 8 reps", "Série 3: 6 reps", "Série 4: 6 reps"]
  },
  "remada-cavalinho": {
    nome: "Remada Cavalinho",
    grupo: "Costas (Miolo)",
    xp: 45,
    gif: "imagens/remada-cavalinho.mp4",
    musculos: { primarios: ["Romboides", "Trapézio"], secundarios: ["Bíceps"] },
    analise: "Foque na retração escapular forte a cada repetição.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "remada-unilateral": {
    nome: "Remada Unilateral com Halter (Serrote)",
    grupo: "Costas (Assimetrias)",
    xp: 45,
    gif: "imagens/remada-unilateral.mp4",
    musculos: { primarios: ["Latíssimo do Dorso"], secundarios: ["Bíceps"] },
    analise: "Apoie o joelho e a mão no banco, trazendo o cotovelo rente à costela.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },
  "crucifixo-invertido": {
    nome: "Crucifixo Invertido / Face Pull",
    grupo: "Posterior de Ombro",
    xp: 40,
    gif: "imagens/crucifixo-invertido.mp4",
    musculos: { primarios: ["Deltoide Posterior"], secundarios: ["Trapézio Superior"] },
    analise: "Abra os braços para trás com foco na saúde articular e postura tridimensional.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps", "Série 4: 12 reps"]
  },
  "rosca-direta-w": {
    nome: "Rosca Direta (Barra W)",
    grupo: "Bíceps",
    xp: 35,
    gif: "imagens/rosca-direta-w.mp4",
    musculos: { primarios: ["Bíceps Braquial"], secundarios: ["Antebraço"] },
    analise: "Pegada anatômica com cotovelos fixos ao lado do tronco.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 10 reps"]
  },

  // --- SEXTA-FEIRA ---
  "supino-inclinado-halteres": {
    nome: "Supino Inclinado c/ Halteres",
    grupo: "Peitoral Superior",
    xp: 50,
    gif: "imagens/supino-inclinado-halteres.mp4",
    musculos: { primarios: ["Peitoral Superior"], secundarios: ["Tríceps", "Deltoide Anterior"] },
    analise: "Banco a 30°-45° direcionando a carga para a porção clavicular do peito.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 8 reps", "Série 4: 8 reps"]
  },
  "supino-reto": {
    nome: "Supino Reto com Barra",
    grupo: "Peitoral",
    xp: 45,
    gif: "imagens/supino-reto.mp4",
    musculos: { primarios: ["Peitoral Maior"], secundarios: ["Tríceps", "Deltoide Anterior"] },
    analise: "Aduza as escápulas e toque a barra suavemente no meio do peito.",
    series: ["Série 1: 10 reps", "Série 2: 10 reps", "Série 3: 8 reps"]
  },
  "crossover-pec-deck": {
    nome: "Crossover ou Pec Deck",
    grupo: "Peitoral (Esmagamento)",
    xp: 40,
    gif: "imagens/crossover-pec-deck.mp4",
    musculos: { primarios: ["Peitoral Maior (Isolamento)"], secundarios: [] },
    analise: "Feche os braços esmagando o centro do peitoral no ápice.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 12 reps"]
  },
  "desenvolvimento-lateral": {
    nome: "Desenvolvimento e Elevação Lateral",
    grupo: "Ombros (Largura)",
    xp: 40,
    gif: "imagens/desenvolvimento-lateral.mp4",
    musculos: { primarios: ["Deltoide Lateral e Anterior"], secundarios: ["Tríceps"] },
    analise: "Controle a subida dos pesos para expandir a silhueta dos ombros.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps", "Série 4: 10 reps"]
  },
  "triceps-pulley": {
    nome: "Tríceps Pulley (Corda)",
    grupo: "Tríceps",
    xp: 35,
    gif: "imagens/triceps-pulley.mp4",
    musculos: { primarios: ["Tríceps Braquial"], secundarios: [] },
    analise: "Abra a corda no final do movimento para contração máxima.",
    series: ["Série 1: 12 reps", "Série 2: 12 reps", "Série 3: 10 reps"]
  },
  "triceps-testa-frances": {
    nome: "Tríceps Testa ou Francês",
    grupo: "Tríceps",
    xp: 35,
    gif: "imagens/triceps-testa-frances.mp4",
    musculos: { primarios: ["Tríceps (Cabeça Longa)"], secundarios: [] },
    analise: "Flexione apenas os cotovelos mantendo os braços firmes.",
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
  videoEl.load(); // Garante que o navegador carregue o novo vídeo do MuscleWiki
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
