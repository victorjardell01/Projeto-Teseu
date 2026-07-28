// ==========================================
// 1. ESTADO DO JOGO E DADOS SALVOS
// ==========================================
const estadoInicial = {
  guerreiro: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  mago: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  clerigo: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  druida: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  ladino: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  mercador: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  bardo: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  monge: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  poeta: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  madciest: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  ranger: { level: 1, xp: 0, xpMax: 100, ultimoNivelColetado: 0 },
  moedas: 0,
  dataUltimasMissoes: null,
  missoesAtivas: [],
  missoes: {
    tarefasGuerreiro: { progresso: 0, objetivo: 5, concluida: false, recompensa: 50 },
    nivelMago: { nivelAlvo: 5, concluida: false, recompensa: 100 },
    diasSeguidosClerigo: { diasAlvo: 3, atual: 0, concluida: false, recompensa: 80 }
  }
};

let dadosRPG = JSON.parse(localStorage.getItem("rpg_dados_completos")) || estadoInicial;

// Garante compatibilidade caso o save seja antigo
Object.keys(estadoInicial).forEach(chave => {
  if (chave !== "moedas" && chave !== "missoes" && chave !== "dataUltimasMissoes" && chave !== "missoesAtivas") {
    if (!dadosRPG[chave]) dadosRPG[chave] = estadoInicial[chave];
    if (dadosRPG[chave].ultimoNivelColetado === undefined) {
      dadosRPG[chave].ultimoNivelColetado = 0;
    }
  }
});

if (dadosRPG.moedas === undefined) dadosRPG.moedas = 0;
if (dadosRPG.missoes === undefined) dadosRPG.missoes = estadoInicial.missoes;
if (!dadosRPG.missoesAtivas) dadosRPG.missoesAtivas = [];

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
  const telaMissoes = document.getElementById("screen-missoes");

  if (telaLogin) telaLogin.classList.add("hidden");
  if (telaBencaos) telaBencaos.classList.add("hidden");
  if (telaMissoes) telaMissoes.classList.add("hidden");
  if (telaAvatares) telaAvatares.classList.remove("hidden");

  atualizarNiveisNaTela();
  atualizarMoedasNaTela();
}

function atualizarNiveisNaTela() {
  const classes = [
    "guerreiro", "mago", "clerigo", "druida", 
    "ladino", "mercador", "bardo", "monge", 
    "poeta", "madciest", "ranger"
  ];
  
  classes.forEach(classe => {
    const elementoLevel = document.getElementById(`lvl-${classe}`);
    if (elementoLevel) {
      elementoLevel.textContent = `Lvl ${dadosRPG[classe].level}`;
    }
  });
}

function atualizarMoedasNaTela() {
  const contadores = document.querySelectorAll("#contador-moedas, #contador-moedas-topo, #contador-moedas-missoes");
  contadores.forEach(el => {
    if (el) el.textContent = dadosRPG.moedas;
  });
  
  localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
}

// ==========================================
// 5. NAVEGAÇÃO DE TELAS (MISSÕES E BÊNÇÃOS)
// ==========================================
function abrirMissoes() {
  document.getElementById("screen-avatars").classList.add("hidden");
  document.getElementById("screen-bencaos").classList.add("hidden");
  document.getElementById("screen-missoes").classList.remove("hidden");
  
  atualizarMoedasNaTela();
  renderizarMissoes();
}

function abrirBencaos() {
  document.getElementById("screen-avatars").classList.add("hidden");
  document.getElementById("screen-missoes").classList.add("hidden");
  document.getElementById("screen-bencaos").classList.remove("hidden");
  
  atualizarMoedasNaTela();
  renderizarNotificacoesColeta();
}

function voltarParaAvatares() {
  document.getElementById("screen-bencaos").classList.add("hidden");
  document.getElementById("screen-missoes").classList.add("hidden");
  document.getElementById("screen-avatars").classList.remove("hidden");
  atualizarNiveisNaTela();
}

// ==========================================
// 6. CATÁLOGO E CICLO DIÁRIO DE MISSÕES
// ==========================================
const POOL_MISSOES = [
  // --- DIÁRIAS GERAIS ---
  { id: 'rot1', titulo: '💧 Hidratação Épica', desc: 'Beba 2L de água ao longo do dia', recompensa: 15, tipo: 'diaria' },
  { id: 'rot2', titulo: '🧘 Pausa Estratégica', desc: 'Desconecte de telas por 15 minutos', recompensa: 20, tipo: 'diaria' },
  { id: 'rot3', titulo: '☀️ Despertar no Horário', desc: 'Levante no primeiro alarme sem adiar', recompensa: 25, tipo: 'diaria' },
  
  // --- GUERREIRO ---
  { id: 'rot4', titulo: '🏋️ Treino Consistente', desc: 'Conclua a série de exercícios programada', recompensa: 40, classe: 'guerreiro' },
  { id: 'rot5', titulo: '🏃 Alongamento / Cardio', desc: 'Realize 15 minutos de mobilidade ou caminhada', recompensa: 30, classe: 'guerreiro' },

  // --- MAGO ---
  { id: 'rot6', titulo: '📚 Bloco de Foco Pomodoro', desc: 'Estude focado sem distrações por 45 minutos', recompensa: 40, classe: 'mago' },
  { id: 'rot7', titulo: '📐 Resolução de Exercícios', desc: 'Complete 5 exercícios teóricos ou práticos', recompensa: 50, classe: 'mago' },

  // --- CLÉRIGO ---
  { id: 'rot8', titulo: '🥗 Nutrição Rituística', desc: 'Mantenha a refeição equilibrada no dia', recompensa: 35, classe: 'clerigo' },

  // --- MERCADOR / LADINO / DRUIDA ---
  { id: 'rot9', titulo: '💼 Gestão Financeira', desc: 'Registre as entradas e saídas do dia', recompensa: 30, classe: 'mercador' },
  { id: 'rot10', titulo: '⚡ Agilidade de Metas', desc: 'Finalize a tarefa mais importante da sua lista', recompensa: 35, classe: 'ladino' },

  // --- BARDO / MONGE / POETA / MADCIEST ---
  { id: 'rot11', titulo: '🎵 Expressão Verbal', desc: 'Pratique oratória, conversação ou escute algo inspirador', recompensa: 30, classe: 'bardo' },
  { id: 'rot12', titulo: '🧘 Controle Mental', desc: 'Realize 10 minutos de meditação ou respiração guiada', recompensa: 35, classe: 'monge' },
  { id: 'rot13', titulo: '✍️ Escrita Criativa', desc: 'Escreva pelo menos um parágrafo ou reflexão do dia', recompensa: 30, classe: 'poeta' },
  { id: 'rot14', titulo: '🧪 Experimento / Projeto', desc: 'Avance uma etapa prática de um projeto pessoal', recompensa: 45, classe: 'madciest' }
];

function gerarMissoesDoDia() {
  const hoje = new Date().toISOString().split('T')[0];
  const classeAtiva = localStorage.getItem("rpg_classe_ativa") || 'guerreiro';

  if (dadosRPG.dataUltimasMissoes === hoje && dadosRPG.missoesAtivas && dadosRPG.missoesAtivas.length > 0) {
    return dadosRPG.missoesAtivas;
  }

  const disponiveis = POOL_MISSOES.filter(m => 
    m.tipo === 'diaria' || m.classe === classeAtiva
  );

  const embaralhadas = [...disponiveis].sort(() => 0.5 - Math.random());
  const sorteadas = embaralhadas.slice(0, 3).map(m => ({
    id: m.id,
    titulo: m.titulo,
    desc: m.desc,
    recompensa: m.recompensa,
    concluida: false
  }));

  dadosRPG.dataUltimasMissoes = hoje;
  dadosRPG.missoesAtivas = sorteadas;
  localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));

  return sorteadas;
}

function concluirMissaoDiaria(idMissao) {
  const missao = dadosRPG.missoesAtivas.find(m => m.id === idMissao);

  if (missao && !missao.concluida) {
    missao.concluida = true;
    dadosRPG.moedas += missao.recompensa;

    atualizarMoedasNaTela();
    renderizarMissoes();
    alert(`🎉 Missão Concluída! Você ganhou ${missao.recompensa} moedas. 🪙`);
  }
}

// ==========================================
// 7. RENDERIZAÇÃO E LÓGICA DAS MISSÕES
// ==========================================
function renderizarMissoes() {
  const container = document.getElementById("missoes-container");
  if (!container) return;

  container.innerHTML = "";

  // 1. Renderiza as Missões Diárias Rotativas
  const missoesDiarias = gerarMissoesDoDia();
  
  const tituloDiario = document.createElement("h3");
  tituloDiario.style.cssText = "color: #00ffcc; margin-bottom: 8px; font-size: 1rem; text-transform: uppercase;";
  tituloDiario.innerText = "📜 Missões do Dia";
  container.appendChild(tituloDiario);

  missoesDiarias.forEach(m => {
    const card = document.createElement("div");
    card.className = "card-bencao-item";

    if (m.concluida) {
      card.innerHTML = `
        <div class="info-bencao">
          <h4>${m.titulo}</h4>
          <p>${m.desc} - <strong>Concluída!</strong></p>
        </div>
        <button class="btn-acao-bencao" disabled style="background: #333; color: #777; border: 1px solid #444; cursor: not-allowed;">Concluída ✔️</button>
      `;
    } else {
      card.innerHTML = `
        <div class="info-bencao">
          <h4>${m.titulo}</h4>
          <p>${m.desc} • <strong>+${m.recompensa} 🪙</strong></p>
        </div>
        <button onclick="concluirMissaoDiaria('${m.id}')" class="btn-acao-bencao">Concluir</button>
      `;
    }
    container.appendChild(card);
  });

  // 2. Renderiza as Conquistas de Longo Prazo
  const tituloConquistas = document.createElement("h3");
  tituloConquistas.style.cssText = "color: #00ffcc; margin-top: 20px; margin-bottom: 8px; font-size: 1rem; text-transform: uppercase;";
  tituloConquistas.innerText = "🏆 Marcos do Reino";
  container.appendChild(tituloConquistas);

  const listaConquistas = [
    { id: "tarefasGuerreiro", titulo: "💪 Força de Guerreiro", desc: "Complete 5 exercícios/tarefas" },
    { id: "nivelMago", titulo: "🧠 Sabedoria de Mago", desc: "Alcance o Nível 5 com o Mago" },
    { id: "diasSeguidosClerigo", titulo: "✨ Devocional de Clérigo", desc: "Mantenha a rotina por 3 dias seguidos" }
  ];

  listaConquistas.forEach(m => {
    const dadosM = dadosRPG.missoes[m.id];
    if (!dadosM) return;

    const card = document.createElement("div");
    card.className = "card-bencao-item";

    if (dadosM.concluida) {
      card.innerHTML = `
        <div class="info-bencao">
          <h4>${m.titulo}</h4>
          <p>${m.desc} - <strong>Concluída!</strong></p>
        </div>
        <button class="btn-acao-bencao" disabled style="background: #333; color: #00ffcc; border: 1px solid #00ffcc; cursor: default;">Concluída ✔️</button>
      `;
    } else {
      let progressoTexto = "";
      if (m.id === "tarefasGuerreiro") progressoTexto = `(${dadosM.progresso}/${dadosM.objetivo})`;
      if (m.id === "nivelMago") progressoTexto = `(Lvl Alvo: ${dadosM.nivelAlvo})`;
      if (m.id === "diasSeguidosClerigo") progressoTexto = `(${dadosM.atual}/${dadosM.diasAlvo} dias)`;

      card.innerHTML = `
        <div class="info-bencao">
          <h4>${m.titulo} <span style="color:#00ffcc; font-size:0.85rem">${progressoTexto}</span></h4>
          <p>${m.desc}</p>
        </div>
        <div style="color:#00ffcc; font-weight:bold; font-size:0.9rem;">+${dadosM.recompensa} 🪙</div>
      `;
    }

    container.appendChild(card);
  });
}

function progredirMissao(chaveMissao, quantidade = 1) {
  if (!dadosRPG.missoes) return;
  
  const missao = dadosRPG.missoes[chaveMissao];
  if (missao && !missao.concluida) {
    missao.progresso = (missao.progresso || 0) + quantidade;
    
    if (missao.progresso >= missao.objetivo) {
      missao.concluida = true;
      dadosRPG.moedas += missao.recompensa;
      
      atualizarMoedasNaTela();
      renderizarMissoes();
      alert(`🎉 Missão Concluída! Você ganhou ${missao.recompensa} moedas. Elas já foram adicionadas ao seu saldo! 🪙`);
    }
    
    localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
  }
}

function verificarMissaoNivel(classe, nivelAtual) {
  if (!dadosRPG.missoes) return;

  if (classe === "mago" && nivelAtual >= dadosRPG.missoes.nivelMago.nivelAlvo) {
    const missao = dadosRPG.missoes.nivelMago;
    if (missao && !missao.concluida) {
      missao.concluida = true;
      dadosRPG.moedas += missao.recompensa;
      
      atualizarMoedasNaTela();
      renderizarMissoes();
      alert(`🏆 Conquista Desbloqueada: Mago no Nível ${missao.nivelAlvo}! Recompensa: ${missao.recompensa} moedas.`);
      localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
    }
  }
}

// ==========================================
// 8. SISTEMA DE BÊNÇÃOS E LOJA
// ==========================================
function renderizarNotificacoesColeta() {
  const container = document.getElementById("notificacoes-container");
  if (!container) return;

  const classesInfo = [
    { id: "guerreiro", nome: "Guerreiro", emoji: "💪" },
    { id: "mago", nome: "Mago", emoji: "🧠" },
    { id: "clerigo", nome: "Clérigo", emoji: "✨" },
    { id: "druida", nome: "Druida", emoji: "🍃" },
    { id: "ladino", nome: "Ladino", emoji: "🏃" },
    { id: "mercador", nome: "Mercador", emoji: "💼" },
    { id: "bardo", nome: "Bardo", emoji: "🎵" },
    { id: "monge", nome: "Monge", emoji: "🧘" },
    { id: "poeta", nome: "Poeta", emoji: "✍️" },
    { id: "madciest", nome: "Cientista Maluco", emoji: "🧪" },
    { id: "ranger", nome: "Ranger", emoji: "🏹" }
  ];

  container.innerHTML = "";

  classesInfo.forEach(c => {
    const dadosClasse = dadosRPG[c.id];
    if (!dadosClasse) return;

    const nivel = dadosClasse.level;
    const jaColetouNivelAtual = dadosClasse.ultimoNivelColetado >= nivel;
    const premio = nivel * 15;

    const card = document.createElement("div");
    card.className = "card-bencao-item";
    
    if (jaColetouNivelAtual) {
      card.innerHTML = `
        <div class="info-bencao">
          <h4>${c.emoji} ${c.nome} (Lvl ${nivel})</h4>
          <p>Recompensa já resgatada para este nível!</p>
        </div>
        <button class="btn-acao-bencao" disabled style="background: #333; color: #777; cursor: not-allowed;">Resgatado ✔️</button>
      `;
    } else {
      card.innerHTML = `
        <div class="info-bencao">
          <h4>${c.emoji} ${c.nome} (Lvl ${nivel})</h4>
          <p>Resgatar bônus de ${premio} moedas</p>
        </div>
        <button onclick="coletarMoedasDeClasse('${c.id}')" class="btn-acao-bencao">COLETAR ${premio} 🪙</button>
      `;
    }

    container.appendChild(card);
  });
}

function coletarMoedasDeClasse(classe) {
  const dadosClasse = dadosRPG[classe];
  const nivel = dadosClasse.level;

  if (dadosClasse.ultimoNivelColetado >= nivel) {
    alert("Você já resgatou o bônus deste nível! Suba de nível nos estudos ou treinos para coletar novamente.");
    return;
  }

  const premio = nivel * 15; 
  dadosRPG.moedas += premio;
  dadosClasse.ultimoNivelColetado = nivel;

  atualizarMoedasNaTela();
  renderizarNotificacoesColeta();
  
  alert(`Parabéns! Você resgatou ${premio} moedas com o seu ${classe.toUpperCase()}! 🪙`);
}

function comprarRecompensa(item, custo) {
  if (dadosRPG.moedas >= custo) {
    dadosRPG.moedas -= custo;
    atualizarMoedasNaTela();
    alert(`Resgate efetuado com sucesso! Aproveite o seu prêmio: "${item}". Você mereceu! 🎉`);
  } else {
    alert("Moedas insuficientes! Volte aos treinos e estudos para farmar mais moedas no reino! ⚔️");
  }
}

// ==========================================
// 9. SISTEMA DE XP E RESET (LVL MAX 10)
// ==========================================
function adicionarXP(classe, quantidadeXP) {
  const dadosClasse = dadosRPG[classe];
  if (!dadosClasse) return;

  const LEVEL_MAX = 10; 

  dadosClasse.xp += quantidadeXP;

  while (dadosClasse.xp >= dadosClasse.xpMax) {
    dadosClasse.xp -= dadosClasse.xpMax;
    dadosClasse.level += 1;

    if (dadosClasse.level > LEVEL_MAX) {
      dadosClasse.level = 1; 
      dadosClasse.xp = 0;
      dadosClasse.xpMax = 100; 
      dadosClasse.ultimoNivelColetado = 0; 

      alert(`🏆 GLÓRIA! O seu ${classe.toUpperCase()} atingiu o ápice (Lvl ${LEVEL_MAX}) e completou o ciclo de maestria! Ele retornou ao Lvl 1 com poder renovado e novas bênçãos para farmar! 🎉`);
    } else {
      dadosClasse.xpMax = Math.floor(dadosClasse.xpMax * 1.2); 
    }
    
    verificarMissaoNivel(classe, dadosClasse.level);
  }

  localStorage.setItem("rpg_dados_completos", JSON.stringify(dadosRPG));
  atualizarNiveisNaTela();
}

// ==========================================
// 10. REDIRECIONAMENTO DE CLASSES
// ==========================================
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
      case "ladino":
        window.location.href = "destreza/destreza.html";
        break;
      case "mercador":
        window.location.href = "comercio/comercio.html";
        break;
      case "bardo":
        window.location.href = "bardo/bardo.html";
        break;
      case "monge":
        window.location.href = "monge/monge.html";
        break;
      case "poeta":
        window.location.href = "poeta/poeta.html";
        break;
      case "madciest":
        window.location.href = "madciest/madciest.html";
        break;
      case "ranger":
        window.location.href = "ranger/ranger.html";
        break;
    }
  }, 200);
}

// ==========================================
// EXPOR FUNÇÕES PARA O HTML
// ==========================================
window.autenticarUsuario = autenticarUsuario;
window.entrarComoClasse = entrarComoClasse;
window.abrirMissoes = abrirMissoes;
window.abrirBencaos = abrirBencaos;
window.voltarParaAvatares = voltarParaAvatares;
window.coletarMoedasDeClasse = coletarMoedasDeClasse;
window.comprarRecompensa = comprarRecompensa;
window.adicionarXP = adicionarXP;
window.progredirMissao = progredirMissao;
window.concluirMissaoDiaria = concluirMissaoDiaria;
