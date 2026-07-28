// =========================================================
// MONGE - AUTOCONTROLE & DISCIPLINA (monge.js)
// =========================================================

let mongeDados = {
  streakDiasLimpo: 0,
  registrosSono: [],
  minutosMeditacao: 0,
  minutosAlongamento: 0,
  historico: []
};

// CITATIONS / FRASES DE SABEDORIA ZEN
const frasesZen = [
  '"O vento não quebra o bambu porque ele sabe se curvar."',
  '"Assim como a água limpa reflete o céu, a mente calma reflete a verdade."',
  '"Sua única competição é quem você foi ontem no espelho."',
  '"O autocontrole é o combustível do guerreiro silencioso."',
  '"A dor do treino é temporária. O orgulho da disciplina é permanente."'
];

// INICIALIZAR TEXTO DO ANEL DE RESPIRAÇÃO GUIADO
function iniciarCicloRespiracao() {
  const elementoTexto = document.getElementById('fase-respiracao');
  if (!elementoTexto) return;

  const fases = ["Inspire...", "Segure...", "Expire...", "Pause..."];
  let indice = 0;

  setInterval(() => {
    indice = (indice + 1) % fases.length;
    elementoTexto.innerText = fases[indice];
  }, 4000); // Sincronizado com os 16s da animação CSS (4s cada fase)
}

// --- INTEGRAÇÃO COM XP GLOBAL DO RPG ---
function adicionarXPNativo(nomeClasse, quantidadeXP) {
  let dadosRPG = JSON.parse(localStorage.getItem('dadosRPG')) || {
    moedas: 0,
    classes: {}
  };

  if (!dadosRPG.classes[nomeClasse]) {
    dadosRPG.classes[nomeClasse] = { xp: 0, nivel: 1 };
  }

  let classe = dadosRPG.classes[nomeClasse];
  classe.xp += quantidadeXP;
  let xpNecessario = classe.nivel * 100;

  if (classe.xp >= xpNecessario) {
    classe.nivel += 1;
    classe.xp -= xpNecessario;
    dadosRPG.moedas += 50;
    alert(`🧘‍♂️ "A mente que domina a si mesma domina o mundo."\nSua alma de MONGE subiu para o Nível ${classe.nivel}! +50 Moedas obtidas.`);
  }

  localStorage.setItem('dadosRPG', JSON.stringify(dadosRPG));
}

// --- CARREGAR & SALVAR ---
function carregarDados() {
  const salvos = localStorage.getItem('rpg_monge_dados');
  if (salvos) {
    mongeDados = JSON.parse(salvos);
  }
  
  // Sorteia frase do dia
  const quoteEl = document.getElementById('texto-quote');
  if (quoteEl) {
    const randomIdx = Math.floor(Math.random() * frasesZen.length);
    quoteEl.innerText = frasesZen[randomIdx];
  }

  renderizarTudo();
}

function salvarDados() {
  localStorage.setItem('rpg_monge_dados', JSON.stringify(mongeDados));
  renderizarTudo();
}

// --- PILAR 1: REGISTRAR SONO ---
function registrarSono() {
  const horas = parseFloat(document.getElementById('input-horas-sono').value);
  const qualidade = parseInt(document.getElementById('select-qualidade-sono').value);

  if (isNaN(horas) || horas <= 0) {
    alert("Informe uma quantidade válida de horas dormidas.");
    return;
  }

  const semTelas = document.getElementById('chk-sem-telas').checked;
  const quartoEscuro = document.getElementById('chk-quarto-escuro').checked;

  let xpGanho = 20;
  if (horas >= 7 && horas <= 9) xpGanho += 5;
  if (semTelas) xpGanho += 5;
  if (quartoEscuro) xpGanho += 5;

  const novoRegistro = {
    id: Date.now(),
    tipo: 'Sono Perfeito',
    detalhes: `${horas}h de sono (Qualidade: ${qualidade}/5)`,
    data: new Date().toLocaleDateString('pt-BR'),
    xp: xpGanho
  };

  mongeDados.registrosSono.push(horas);
  mongeDados.historico.unshift(novoRegistro);

  adicionarXPNativo('monge', xpGanho);
  alert(`🌙 Noite registrada com sucesso! +${xpGanho} XP de Monge.`);

  document.getElementById('input-horas-sono').value = '';
  salvarDados();
}

// --- PILAR 2: REGISTRAR MEDITAÇÃO ---
function registrarMeditacao() {
  const tecnica = document.getElementById('select-tipo-respiracao').value;
  const minutos = parseInt(document.getElementById('input-minutos-meditacao').value) || 0;

  if (minutos <= 0) {
    alert("Digite o tempo em minutos da sua prática.");
    return;
  }

  const xpGanho = 15 + Math.floor(minutos / 5) * 2;

  const novoRegistro = {
    id: Date.now(),
    tipo: 'Respiração & Meditação',
    detalhes: `${tecnica} (${minutos} min)`,
    data: new Date().toLocaleDateString('pt-BR'),
    xp: xpGanho
  };

  mongeDados.minutosMeditacao += minutos;
  mongeDados.historico.unshift(novoRegistro);

  adicionarXPNativo('monge', xpGanho);
  alert(`🌬️ Sessão de meditação concluída! +${xpGanho} XP de Monge.`);

  salvarDados();
}

// --- PILAR 3: CONTROLE DE VÍCIOS (STREAK) ---
function registrarDiaLimpo() {
  mongeDados.streakDiasLimpo += 1;
  const xpGanho = 20 + (mongeDados.streakDiasLimpo * 5);

  const novoRegistro = {
    id: Date.now(),
    tipo: 'Dia Limpo (Vícios)',
    detalhes: `Streak mantido: ${mongeDados.streakDiasLimpo}º dia seguido!`,
    data: new Date().toLocaleDateString('pt-BR'),
    xp: xpGanho
  };

  mongeDados.historico.unshift(novoRegistro);
  adicionarXPNativo('monge', xpGanho);
  alert(`🛡️ Mais um dia de controle absoluto! Streak: ${mongeDados.streakDiasLimpo} dias (+${xpGanho} XP).`);

  salvarDados();
}

function resetarStreakVicios() {
  if (confirm("O autocontrole exige honestidade. Deseja redefinir seu contador de dias limpos?")) {
    mongeDados.streakDiasLimpo = 0;
    alert("Contador redefinido. Relevante é se levantar mais forte.");
    salvarDados();
  }
}

// --- PILAR 4: ALONGAMENTO ---
function registrarAlongamento() {
  const foco = document.getElementById('input-foco-alongamento').value.trim() || "Corpo inteiro";
  const minutos = parseInt(document.getElementById('input-minutos-alongamento').value) || 0;

  if (minutos <= 0) {
    alert("Informe o tempo da sua sessão de mobilidade.");
    return;
  }

  const xpGanho = 15;

  const novoRegistro = {
    id: Date.now(),
    tipo: 'Alongamento & Mobilidade',
    detalhes: `${foco} (${minutos} min)`,
    data: new Date().toLocaleDateString('pt-BR'),
    xp: xpGanho
  };

  mongeDados.minutosAlongamento += minutos;
  mongeDados.historico.unshift(novoRegistro);

  adicionarXPNativo('monge', xpGanho);
  alert(`🧘‍♀️ Corpo descomprimido e flexível. +15 XP de Monge.`);

  document.getElementById('input-foco-alongamento').value = '';
  salvarDados();
}

// --- PILAR 5: RESILIÊNCIA / DOR / DETOX ---
function registrarResiliencia() {
  const acao = document.getElementById('select-tipo-resiliencia').value;
  const obs = document.getElementById('input-observacao-resiliencia').value.trim() || "Domínio físico e mental.";

  const xpGanho = 15;

  const novoRegistro = {
    id: Date.now(),
    tipo: 'Resiliência & Autocontrole',
    detalhes: `${acao} - "${obs}"`,
    data: new Date().toLocaleDateString('pt-BR'),
    xp: xpGanho
  };

  mongeDados.historico.unshift(novoRegistro);
  adicionarXPNativo('monge', xpGanho);
  alert(`🧊 Ato de autocontrole registrado! +15 XP de Monge.`);

  document.getElementById('input-observacao-resiliencia').value = '';
  salvarDados();
}

function removerItemHistorico(id) {
  mongeDados.historico = mongeDados.historico.filter(item => item.id !== id);
  salvarDados();
}

// --- RENDERIZAÇÃO ---
function renderizarTudo() {
  document.getElementById('stat-dias-limpo').innerText = mongeDados.streakDiasLimpo;
  document.getElementById('display-streak-dias').innerText = `${mongeDados.streakDiasLimpo} DIAS LIMPO`;

  // Média de sono
  if (mongeDados.registrosSono.length > 0) {
    const soma = mongeDados.registrosSono.reduce((a, b) => a + b, 0);
    const media = (soma / mongeDados.registrosSono.length).toFixed(1);
    document.getElementById('stat-media-sono').innerText = `${media}h`;
  } else {
    document.getElementById('stat-media-sono').innerText = '0h';
  }

  // Minutos Zen
  const totalMinutos = mongeDados.minutosMeditacao + mongeDados.minutosAlongamento;
  document.getElementById('stat-minutos-zen').innerText = totalMinutos;

  // Level do RPG
  const dadosRPG = JSON.parse(localStorage.getItem('dadosRPG')) || {};
  const classeMonge = dadosRPG.classes?.monge || { nivel: 1 };
  document.getElementById('badge-nivel-monge').innerText = `Nível ${classeMonge.nivel} - Mente Silenciosa`;

  // Histórico
  const lista = document.getElementById('lista-historico-monge');
  lista.innerHTML = '';

  if (mongeDados.historico.length === 0) {
    lista.innerHTML = '<li style="color: var(--texto-suave); font-style: italic;">Nenhuma prática registrada no templo hoje.</li>';
    return;
  }

  mongeDados.historico.slice(0, 10).forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${item.tipo}</strong> <small style="color: var(--cor-musgo);">(${item.data})</small>
        <br><small style="color: var(--texto-suave);">${item.detalhes}</small>
      </div>
      <div style="text-align: right;">
        <span style="color: var(--cor-destaque); font-weight: bold;">+${item.xp} XP</span>
        <br>
        <button onclick="removerItemHistorico(${item.id})" class="btn-secundario" style="padding: 2px 6px; font-size: 0.7rem; margin-top: 4px;">Apagar</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// INICIALIZAR
window.addEventListener('DOMContentLoaded', () => {
  carregarDados();
  iniciarCicloRespiracao();
});
