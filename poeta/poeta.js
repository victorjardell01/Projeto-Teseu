// =========================================================
// POETA - CATARSE & ANTOLOGIA SOMBRIA (poeta.js)
// =========================================================

let poetaDados = {
  totalVersos: 0,
  historicoPoemas: []
};

// TITULOS CONFORME O NÍVEL DE POETA
const titulosPoeta = [
  "Alma Solitária",
  "Sombra das Palavras",
  "Voz da Melancolia",
  "Bardo do Abismo",
  "Arquiteto da Desolação",
  "Mestre das Horas Mortas"
];

// FRASES SOMBRIAS DE ABERTURA
const frasesSombrias = [
  '"A escuridão não é a ausência de luz, é a presença do que não pode ser dito."',
  '"Escrevo para expurgar fantasmas que insistem em habitar meu peito."',
  '"Há uma beleza trágica no que se quebra em silêncio."',
  '"O papel aceita o peso que o coração não consegue carregar."',
  '"Na calada da noite, meus versos são a única testemunha."'
];

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

    const tituloAtual = titulosPoeta[Math.min(classe.nivel - 1, titulosPoeta.length - 1)];
    alert(`🥀 "A dor transmutada em arte."\nSua alma de POETA ascendeu para o Nível ${classe.nivel} (${tituloAtual})! +50 Moedas obtidas.`);
  }

  localStorage.setItem('dadosRPG', JSON.stringify(dadosRPG));
}

// --- CARREGAR & SALVAR ---
function carregarDados() {
  const salvos = localStorage.getItem('rpg_poeta_dados');
  if (salvos) {
    poetaDados = JSON.parse(salvos);
  }

  // Frase sombria do dia
  const quoteEl = document.getElementById('texto-quote-poeta');
  if (quoteEl) {
    const randomIdx = Math.floor(Math.random() * frasesSombrias.length);
    quoteEl.innerText = frasesSombrias[randomIdx];
  }

  renderizarTudo();
}

function salvarDados() {
  localStorage.setItem('rpg_poeta_dados', JSON.stringify(poetaDados));
  renderizarTudo();
}

// --- REGISTRAR NOVO POEMA ---
function registrarPoema() {
  const titulo = document.getElementById('input-titulo-poema').value.trim() || "Sem Título (Versos no Escuro)";
  const sentimento = document.getElementById('select-sentimento').value;
  const corpo = document.getElementById('textarea-corpo-poema').value.trim();

  if (!corpo) {
    alert("Escreva ao menos algumas linhas para eternizar seu poema.");
    return;
  }

  // Conta os versos (linhas preenchidas)
  const linhas = corpo.split('\n').filter(linha => linha.trim().length > 0);
  const qtdVersos = linhas.length;

  // Cálculo de XP: 30 XP base + 2 XP bônus por verso
  const xpGanho = 30 + (qtdVersos * 2);

  const novoPoema = {
    id: Date.now(),
    titulo: titulo,
    sentimento: sentimento,
    corpo: corpo,
    versos: qtdVersos,
    data: new Date().toLocaleDateString('pt-BR'),
    xp: xpGanho
  };

  poetaDados.historicoPoemas.unshift(novoPoema);
  poetaDados.totalVersos += qtdVersos;

  adicionarXPNativo('poeta', xpGanho);
  alert(`🖋️ Poema eternizado na sua antologia! +${xpGanho} XP obtidos.`);

  // Limpar formulário
  document.getElementById('input-titulo-poema').value = '';
  document.getElementById('textarea-corpo-poema').value = '';

  salvarDados();
}

function deletarPoema(id) {
  if (confirm("Deseja apagar estes versos da sua antologia? As palavras sumirão para sempre.")) {
    const poema = poetaDados.historicoPoemas.find(p => p.id === id);
    if (poema) {
      poetaDados.totalVersos = Math.max(0, poetaDados.totalVersos - poema.versos);
    }
    poetaDados.historicoPoemas = poetaDados.historicoPoemas.filter(p => p.id !== id);
    salvarDados();
  }
}

// --- RENDERIZAÇÃO ---
function renderizarTudo() {
  // Stats
  document.getElementById('stat-total-poemas').innerText = poetaDados.historicoPoemas.length;
  document.getElementById('stat-total-versos').innerText = poetaDados.totalVersos;

  // Level do RPG
  const dadosRPG = JSON.parse(localStorage.getItem('dadosRPG')) || {};
  const classePoeta = dadosRPG.classes?.poeta || { nivel: 1 };
  const indexTitulo = Math.min(classePoeta.nivel - 1, titulosPoeta.length - 1);
  document.getElementById('badge-nivel-poeta').innerText = `Nível ${classePoeta.nivel} - ${titulosPoeta[indexTitulo]}`;

  // Antologia de Poemas
  const container = document.getElementById('container-antologia-poemas');
  container.innerHTML = '';

  if (poetaDados.historicoPoemas.length === 0) {
    container.innerHTML = '<p style="color: var(--texto-suave); font-style: italic; text-align: center; padding: 20px;">Sua antologia ainda está em branco. Escreva seu primeiro verso acima.</p>';
    return;
  }

  poetaDados.historicoPoemas.forEach(poema => {
    const card = document.createElement('div');
    card.className = 'poema-card';
    card.innerHTML = `
      <div class="poema-header">
        <div>
          <h4 class="poema-titulo">${poema.titulo}</h4>
          <small style="color: var(--texto-suave);">${poema.data} • ${poema.versos} versos</small>
        </div>
        <span class="poema-tag">${poema.sentimento}</span>
      </div>
      <div class="poema-corpo">${poema.corpo}</div>
      <div class="poema-footer">
        <span style="color: var(--cor-sangue); font-weight: 600;">+${poema.xp} XP</span>
        <button onclick="deletarPoema(${poema.id})" class="btn-secundario" style="padding: 2px 8px; font-size: 0.72rem;">Queimar Poema</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// INICIALIZAR
window.addEventListener('DOMContentLoaded', carregarDados);
