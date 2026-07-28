let chartInstance = null;
let despesas = [];
let historico = [];

// --- LÓGICA DO RPG & LOCALSTORAGE ---
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
    alert(`🎉 "Heh heh heh... Thank you!"\nA classe ${nomeClasse.toUpperCase()} subiu para o Nível ${classe.nivel}! Você ganhou +50 Moedas!`);
  }

  localStorage.setItem('dadosRPG', JSON.stringify(dadosRPG));
}

// --- CARREGAR E SALVAR DADOS DA FERRAMENTA ---
function carregarDadosSalvos() {
  const dadosMercador = JSON.parse(localStorage.getItem('rpg_comercio_dados')) || {};
  
  document.getElementById('input-ganhos').value = dadosMercador.ganhos || 0;
  document.getElementById('input-renda-extra').value = dadosMercador.rendaExtra || 0;
  document.getElementById('input-nome-desejo').value = dadosMercador.nomeDesejo || '';
  document.getElementById('input-valor-desejo').value = dadosMercador.valorDesejo || 0;
  
  despesas = dadosMercador.despesas || [];
  historico = dadosMercador.historico || [];

  renderizarDespesas();
  renderizarHistorico();
}

function salvarDados() {
  const dadosMercador = {
    ganhos: parseFloat(document.getElementById('input-ganhos').value) || 0,
    rendaExtra: parseFloat(document.getElementById('input-renda-extra').value) || 0,
    nomeDesejo: document.getElementById('input-nome-desejo').value || '',
    valorDesejo: parseFloat(document.getElementById('input-valor-desejo').value) || 0,
    despesas: despesas,
    historico: historico
  };
  localStorage.setItem('rpg_comercio_dados', JSON.stringify(dadosMercador));
}

// --- INICIALIZAR GRÁFICO CHART.JS (PALETA RE4) ---
function inicializarGrafico() {
  const ctx = document.getElementById('financeChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Reserva do Baú', 'Compromissos', 'Ouro Livre'],
      datasets: [{
        data: [20, 0, 80],
        /* Dourado Antigo, Vermelho Carmesim e Laranja Tocha */
        backgroundColor: ['#e5b869', '#a82e2e', '#d9822b'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { 
            color: '#d1c2a5', 
            font: { size: 11, family: 'Segoe UI, serif' } 
          }
        }
      }
    }
  });
}

// --- GERENCIAR LISTA DE DESPESAS ---
function adicionarDespesa() {
  const nomeInput = document.getElementById('novo-item-nome');
  const valorInput = document.getElementById('novo-item-valor');
  const tipoInput = document.getElementById('novo-item-tipo');

  const nome = nomeInput.value.trim();
  const valor = parseFloat(valorInput.value);

  if (!nome || isNaN(valor) || valor <= 0) {
    alert("Stranger, informe um nome e valor válidos em Pesetas!");
    return;
  }

  despesas.push({
    id: Date.now(),
    nome: nome,
    valor: valor,
    tipo: tipoInput.value
  });

  nomeInput.value = '';
  valorInput.value = '';

  renderizarDespesas();
  atualizarTudo();
}

function removerDespesa(id) {
  despesas = despesas.filter(item => item.id !== id);
  renderizarDespesas();
  atualizarTudo();
}

function renderizarDespesas() {
  const lista = document.getElementById('lista-despesas');
  lista.innerHTML = '';

  if (despesas.length === 0) {
    lista.innerHTML = '<li style="color: #8a7b63; text-align: center; padding: 10px; font-style: italic;">Nenhum suprimento ou dívida registrada no baú.</li>';
    return;
  }

  despesas.forEach(item => {
    const li = document.createElement('li');
    li.className = `item-despesa ${item.tipo}`;
    li.innerHTML = `
      <div>
        <strong>${item.nome}</strong> <small style="color: #a39274;">(${item.tipo.toUpperCase()})</small>
      </div>
      <div>
        <span>R$ ${item.valor.toFixed(2)}</span>
        <button class="btn-del" onclick="removerDespesa(${item.id})" title="Remover">✖</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// --- ATUALIZAÇÃO E CÁLCULOS FINANCEIROS ---
function atualizarTudo() {
  const ganhos = parseFloat(document.getElementById('input-ganhos').value) || 0;
  const rendaExtra = parseFloat(document.getElementById('input-renda-extra').value) || 0;
  const totalRenda = ganhos + rendaExtra;

  const totalCompromissos = despesas.reduce((acc, curr) => acc + curr.valor, 0);

  // Regra dos 20%
  const reserva = totalRenda * 0.20;
  const saldoLivre = totalRenda - reserva - totalCompromissos;

  // Atualiza Cards
  document.getElementById('resumo-reserva').innerText = `R$ ${reserva.toFixed(2)}`;
  document.getElementById('resumo-compromissos').innerText = `R$ ${totalCompromissos.toFixed(2)}`;
  document.getElementById('resumo-livre').innerText = `R$ ${saldoLivre.toFixed(2)}`;

  // Percentuais
  const pctReservaVal = totalRenda > 0 ? ((reserva / totalRenda) * 100).toFixed(0) : 0;
  const pctCompVal = totalRenda > 0 ? ((totalCompromissos / totalRenda) * 100).toFixed(0) : 0;
  const pctLivreVal = totalRenda > 0 ? ((saldoLivre / totalRenda) * 100).toFixed(0) : 0;

  document.getElementById('pct-reserva').innerText = `${pctReservaVal}% da renda`;
  document.getElementById('pct-compromissos').innerText = `${pctCompVal}% da renda`;
  document.getElementById('pct-livre').innerText = `${pctLivreVal}% da renda`;

  // Rank do Mercador (RE4 Style)
  const badge = document.getElementById('badge-status');
  if (totalRenda === 0) {
    badge.className = "status-badge status-excelente";
    badge.innerText = "Forasteiro";
  } else if (saldoLivre < 0) {
    badge.className = "status-badge status-critico";
    badge.innerText = "Mercador Falido";
  } else if (pctCompVal > 60) {
    badge.className = "status-badge status-atencao";
    badge.innerText = "Sob Pressão";
  } else {
    badge.className = "status-badge status-excelente";
    badge.innerText = "Magnata das Pesetas";
  }

  // Previsão de Meta de Compra
  const nomeDesejo = document.getElementById('input-nome-desejo').value.trim();
  const valorDesejo = parseFloat(document.getElementById('input-valor-desejo').value) || 0;
  const textoMeta = document.getElementById('texto-previsao-meta');

  if (valorDesejo > 0) {
    if (saldoLivre <= 0) {
      textoMeta.innerHTML = `<span style="color: #a82e2e;">Precisa de ouro livre positivo para adquirir <strong>${nomeDesejo || 'este equipamento'}</strong>, stranger!</span>`;
    } else {
      const mesesNecessarios = Math.ceil(valorDesejo / saldoLivre);
      textoMeta.innerHTML = `Poupando seu ouro livre (R$ ${saldoLivre.toFixed(2)}/mês), você comprará <strong>${nomeDesejo || 'seu item'}</strong> em aproximadamente <strong style="color: #e5b869;">${mesesNecessarios} mês(es)</strong>!`;
    }
  } else {
    textoMeta.innerText = "Insira um valor em Pesetas para calcular o tempo de aquisição.";
  }

  // Fundo de Reserva de Emergência (6 meses)
  const reservaEmergenciaIdeal = totalCompromissos * 6;
  document.getElementById('val-reserva-emergencia').innerText = `R$ ${reservaEmergenciaIdeal.toFixed(2)}`;

  // Atualiza Gráfico
  if (chartInstance) {
    chartInstance.data.datasets[0].data = [reserva, totalCompromissos, saldoLivre > 0 ? saldoLivre : 0];
    chartInstance.update();
  }

  salvarDados();
}

// --- SALVAR HISTÓRICO ---
function salvarNoHistorico() {
  const ganhos = parseFloat(document.getElementById('input-ganhos').value) || 0;
  const rendaExtra = parseFloat(document.getElementById('input-renda-extra').value) || 0;
  const totalRenda = ganhos + rendaExtra;

  if (totalRenda <= 0) {
    alert("Stranger, adicione seus ganhos em Pesetas antes de registrar!");
    return;
  }

  const dataAtual = new Date().toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });
  const totalCompromissos = despesas.reduce((acc, curr) => acc + curr.valor, 0);
  const reserva = totalRenda * 0.20;
  const saldoLivre = totalRenda - reserva - totalCompromissos;

  historico.unshift({
    data: dataAtual,
    renda: totalRenda,
    guardado: reserva,
    livre: saldoLivre
  });

  if (historico.length > 5) historico.pop();
  renderizarHistorico();
  salvarDados();
  alert("📜 Balanço registrado no pergaminho do Mercador!");
}

function renderizarHistorico() {
  const lista = document.getElementById('lista-historico');
  lista.innerHTML = '';

  if (historico.length === 0) {
    lista.innerHTML = '<li style="color: #8a7b63; text-align: center; font-style: italic;">Nenhum registro gravado ainda.</li>';
    return;
  }

  historico.forEach(item => {
    const li = document.createElement('li');
    li.className = 'historico-item';
    li.innerHTML = `
      <span><strong>${item.data}:</strong> Pesetas R$ ${item.renda.toFixed(0)}</span>
      <span>Baú: <span style="color: #e5b869;">R$ ${item.guardado.toFixed(0)}</span> | Livre: <span style="color: #d9822b;">R$ ${item.livre.toFixed(0)}</span></span>
    `;
    lista.appendChild(li);
  });
}

// --- FINALIZAR E GANHAR XP ---
function finalizarBalanco() {
  const ganhos = parseFloat(document.getElementById('input-ganhos').value) || 0;

  if (ganhos <= 0) {
    alert("Not enough cash, stranger! Preencha seus ganhos para analisar o balanço!");
    return;
  }

  // Adiciona o XP nativamente no localStorage
  adicionarXPNativo("mercador", 30);

  alert("💰 'Ah, a rare customer!' Balanço registrado! Você ganhou +30 XP de Mercador.");
}

// INICIALIZAÇÃO
window.addEventListener('DOMContentLoaded', () => {
  inicializarGrafico();
  carregarDadosSalvos();
  atualizarTudo();
});
