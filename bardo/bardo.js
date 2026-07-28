// =========================================================
// BARDO - NOIR, JAZZ & BLUES EDITION (bardo.js)
// "See you space cowboy..."
// =========================================================

let bardoDados = {
  livros: [],        // Livros em andamento
  midias: [],        // Filmes, Séries, Músicas (Inspiração do Bardo)
  concluidos: []     // Livros finalizados
};

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
    alert(`🎷 "Nenhum homem é uma ilha..."\nSua alma de BARDO subiu para o Nível ${classe.nivel}! +50 Moedas obtidas nas sombras.`);
  }

  localStorage.setItem('dadosRPG', JSON.stringify(dadosRPG));
}

// --- CARREGAR & SALVAR DADOS LOCAIS ---
function carregarDados() {
  const salvos = localStorage.getItem('rpg_bardo_dados');
  if (salvos) {
    bardoDados = JSON.parse(salvos);
  }
  renderizarTudo();
}

function salvarDados() {
  localStorage.setItem('rpg_bardo_dados', JSON.stringify(bardoDados));
  renderizarTudo();
}

// --- ALTERNAR CAMPOS DO FORMULÁRIO ---
function alternarCamposMidia() {
  const tipo = document.getElementById('select-tipo-midia').value;
  const camposLivro = document.getElementById('campos-livro');
  const camposSerie = document.getElementById('campos-serie');
  const camposMidiaGeral = document.getElementById('campos-midia-geral');

  camposLivro.style.display = tipo === 'livro' ? 'grid' : 'none';
  camposSerie.style.display = tipo === 'serie' ? 'grid' : 'none';
  camposMidiaGeral.style.display = (tipo === 'filme' || tipo === 'musica') ? 'grid' : 'none';
}

// --- ADICIONAR ITEM AO REPERTÓRIO ---
function adicionarAoRepertorio() {
  const tipo = document.getElementById('select-tipo-midia').value;
  const titulo = document.getElementById('input-titulo').value.trim();
  const categoria = document.getElementById('select-categoria').value;

  if (!titulo) {
    alert("Um bardo precisa dar nome ao seu poema, fita ou livro, amigo.");
    return;
  }

  if (tipo === 'livro') {
    const totalPaginas = parseInt(document.getElementById('input-total-paginas').value) || 0;
    const paginaAtual = parseInt(document.getElementById('input-pagina-atual').value) || 0;

    if (totalPaginas <= 0) {
      alert("Informe um número válido de páginas para o tomo.");
      return;
    }

    const novoLivro = {
      id: Date.now(),
      titulo,
      categoria,
      totalPaginas,
      paginaAtual: Math.min(paginaAtual, totalPaginas),
      dataInicio: new Date().toLocaleDateString('pt-BR')
    };

    if (novoLivro.paginaAtual >= novoLivro.totalPaginas) {
      finalizarLivroObjeto(novoLivro);
    } else {
      bardoDados.livros.push(novoLivro);
      alert(`📖 "${titulo}" adicionado à sua estante à meia-noite.`);
    }

  } else if (tipo === 'serie') {
    const temp = parseInt(document.getElementById('input-temp-atual').value) || 1;
    const ep = parseInt(document.getElementById('input-ep-atual').value) || 1;

    const nota = prompt("Qual nota de 1 a 5 você dá para essa série até agora?", "5");
    const analise = prompt("Uma breve reflexão ou vibe sobre a série (opcional):", "Ritmo envolvente e trilha marcante.") || "Sem análise.";

    const novaSerie = {
      id: Date.now(),
      tipo: 'Série',
      titulo,
      categoria,
      detalhe: `Temp ${temp}, Ep ${ep}`,
      nota: parseInt(nota) || 5,
      analise
    };

    bardoDados.midias.push(novaSerie);
    adicionarXPNativo('bardo', 15);
    alert(`📺 Série registrada no arquivo noir. +15 XP de Bardo.`);

  } else if (tipo === 'musica') { // VIBE DA SEMANA (INSPIRAÇÃO DO BARDO)
    const autorArtista = document.getElementById('input-autor-artista').value.trim() || "Artista Desconhecido";
    const analise = prompt(`Qual a vibe dessa música ("${titulo}") no seu loop?`, "Tocado no fundo de um bar à meia-noite.") || "Vibe da Semana.";

    const novaMusica = {
      id: Date.now(),
      tipo: 'Inspiração do Bardo',
      titulo,
      autorArtista,
      categoria,
      nota: 5,
      analise
    };

    bardoDados.midias.push(novaMusica);
    adicionarXPNativo('bardo', 10);
    alert(`🎵 "${titulo}" registrada como Inspiração do Bardo! +10 XP.`);

  } else if (tipo === 'filme') {
    const autorArtista = document.getElementById('input-autor-artista').value.trim() || "Diretor Desconhecido";
    const nota = prompt(`Nota de 1 a 5 para o filme "${titulo}"?`, "5");
    const analise = prompt("Sua crítica ou impressão rápida do filme:", "Atmosfera marcante e iluminação impecável.") || "Noir puro.";

    const novoFilme = {
      id: Date.now(),
      tipo: 'Filme',
      titulo,
      autorArtista,
      categoria,
      nota: parseInt(nota) || 5,
      analise
    };

    bardoDados.midias.push(novoFilme);
    adicionarXPNativo('bardo', 25);
    alert(`🎬 Filme registrado no repertório. +25 XP de Bardo!`);
  }

  // Limpar formulários
  document.getElementById('input-titulo').value = '';
  document.getElementById('input-total-paginas').value = '';
  document.getElementById('input-pagina-atual').value = '0';
  document.getElementById('input-autor-artista').value = '';

  salvarDados();
}

// --- ATUALIZAR PÁGINAS DO LIVRO ---
function atualizarPaginaLivro(id) {
  const livro = bardoDados.livros.find(l => l.id === id);
  if (!livro) return;

  const novaPaginaStr = prompt(`Página atual de "${livro.titulo}" (Total: ${livro.totalPaginas}):`, livro.paginaAtual);
  if (novaPaginaStr === null) return;

  const novaPagina = parseInt(novaPaginaStr);
  if (isNaN(novaPagina) || novaPagina < 0) {
    alert("Número de página inválido.");
    return;
  }

  livro.paginaAtual = Math.min(novaPagina, livro.totalPaginas);

  if (livro.paginaAtual >= livro.totalPaginas) {
    bardoDados.livros = bardoDados.livros.filter(l => l.id !== id);
    finalizarLivroObjeto(livro);
  } else {
    salvarDados();
  }
}

// --- LÓGICA DE FINALIZAR LIVRO E CALCULAR XP (5 XP A CADA 10 PGS) ---
function finalizarLivroObjeto(livro) {
  const xpGanhado = Math.floor(livro.totalPaginas / 10) * 5;

  const analise = prompt(`🏆 Parabéns por terminar "${livro.titulo}"!\nEscreva sua crítica/análise rápida:`, "Obra-prima lida no silêncio da noite.") || "Lido e absorvido.";
  const nota = prompt("Qual nota de 1 a 5 estrelas você dá para o livro?", "5");

  const livroConcluido = {
    ...livro,
    paginaAtual: livro.totalPaginas,
    nota: parseInt(nota) || 5,
    analise,
    dataConclusao: new Date().toLocaleDateString('pt-BR'),
    xpGanhado
  };

  bardoDados.concluidos.push(livroConcluido);
  adicionarXPNativo('bardo', xpGanhado);
  alert(`🚬 "See you space cowboy..." Livro concluído!\nVocê ganhou +${xpGanhado} XP de Bardo pelas ${livro.totalPaginas} páginas!`);
  salvarDados();
}

function removerItem(id, listaNome) {
  if (confirm("Deseja apagar este registro do seu arquivo noir?")) {
    bardoDados[listaNome] = bardoDados[listaNome].filter(item => item.id !== id);
    salvarDados();
  }
}

// --- RENDERIZAR TUDO NA TELA ---
function renderizarTudo() {
  renderizarEstatisticas();
  renderizarLivrosAndamento();
  renderizarOutrasMidias();
  renderizarLivrosConcluidos();
}

function renderizarEstatisticas() {
  const pgsConcluidas = bardoDados.concluidos.reduce((acc, curr) => acc + curr.totalPaginas, 0);
  const pgsAndamento = bardoDados.livros.reduce((acc, curr) => acc + curr.paginaAtual, 0);
  const totalPgs = pgsConcluidas + pgsAndamento;

  document.getElementById('total-paginas-lidas').innerText = totalPgs;
  document.getElementById('total-livros-lidos').innerText = bardoDados.concluidos.length;
  document.getElementById('total-midias-consumidas').innerText = bardoDados.midias.length;

  const dadosRPG = JSON.parse(localStorage.getItem('dadosRPG')) || {};
  const classeBardo = dadosRPG.classes?.bardo || { nivel: 1 };
  document.getElementById('badge-nivel-bardo').innerText = `Nível ${classeBardo.nivel} - Saxofonista Noir`;
}

function renderizarLivrosAndamento() {
  const container = document.getElementById('lista-livros-andamento');
  container.innerHTML = '';

  if (bardoDados.livros.length === 0) {
    container.innerHTML = '<p style="color: var(--texto-suave); font-family: var(--fonte-mono); font-size: 0.85rem; font-style: italic;">Nenhum livro aberto na mesa do bar no momento...</p>';
    return;
  }

  bardoDados.livros.forEach(livro => {
    const percentual = Math.round((livro.paginaAtual / livro.totalPaginas) * 100);
    const card = document.createElement('div');
    card.className = 'card-livro-item';
    card.innerHTML = `
      <div>
        <h4>${livro.titulo}</h4>
        <span class="categoria-tag">📖 ${livro.categoria}</span>
        <div style="font-family: var(--fonte-mono); font-size: 0.8rem; color: var(--texto-fumaça);">
          Página ${livro.paginaAtual} de ${livro.totalPaginas} (${percentual}%)
        </div>
        <div class="barra-progresso-container">
          <div class="barra-progresso-preenchimento" style="width: ${percentual}%;"></div>
        </div>
      </div>
      <div style="display: flex; gap: 8px; margin-top: 10px;">
        <button onclick="atualizarPaginaLivro(${livro.id})" class="btn-secundario" style="flex: 1;">📝 Modificar Páginas</button>
        <button onclick="removerItem(${livro.id}, 'livros')" class="btn-secundario" style="color: #c94a4a; border-color: #592222;">✖</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function renderizarOutrasMidias() {
  const lista = document.getElementById('lista-outras-midias');
  lista.innerHTML = '';

  if (bardoDados.midias.length === 0) {
    lista.innerHTML = '<li style="color: var(--texto-suave); font-family: var(--fonte-mono); font-size: 0.85rem; font-style: italic;">Nenhum disco, filme ou fita tocando na vitrola.</li>';
    return;
  }

  bardoDados.midias.forEach(item => {
    const li = document.createElement('li');
    const estrelas = '★'.repeat(item.nota || 5) + '☆'.repeat(5 - (item.nota || 5));
    li.innerHTML = `
      <div>
        <strong>${item.titulo}</strong> <small style="color: var(--texto-suave); font-family: var(--fonte-mono);">[${item.tipo} - ${item.categoria}]</small>
        ${item.autorArtista ? `<br><small style="color: var(--cor-ambrada);">${item.autorArtista}</small>` : ''}
        ${item.detalhe ? `<br><small style="color: var(--cor-neon-azul);">${item.detalhe}</small>` : ''}
        <p style="font-style: italic; color: var(--texto-fumaça); margin-top: 4px; font-size: 0.82rem;">"${item.analise}"</p>
      </div>
      <div style="text-align: right; min-width: 90px;">
        <span class="nota-estrelas">${estrelas}</span>
        <br>
        <button onclick="removerItem(${item.id}, 'midias')" class="btn-secundario" style="padding: 2px 6px; font-size: 0.7rem; margin-top: 5px;">Apagar</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function renderizarLivrosConcluidos() {
  const lista = document.getElementById('lista-livros-concluidos');
  lista.innerHTML = '';

  if (bardoDados.concluidos.length === 0) {
    lista.innerHTML = '<li style="color: var(--texto-suave); font-family: var(--fonte-mono); font-size: 0.85rem; font-style: italic;">Nenhum tomo finalizado e catalogado ainda.</li>';
    return;
  }

  bardoDados.concluidos.forEach(livro => {
    const li = document.createElement('li');
    const estrelas = '★'.repeat(livro.nota || 5) + '☆'.repeat(5 - (livro.nota || 5));
    li.innerHTML = `
      <div>
        <strong>📖 ${livro.titulo}</strong> <small style="color: var(--texto-suave);">(${livro.totalPaginas} pgs)</small>
        <br><small style="color: var(--cor-neon-azul); font-family: var(--fonte-mono);">${livro.categoria} • Concluído em ${livro.dataConclusao}</small>
        <p style="font-style: italic; color: var(--texto-fumaça); margin-top: 4px; font-size: 0.82rem;">"${livro.analise}"</p>
      </div>
      <div style="text-align: right; min-width: 100px;">
        <span class="nota-estrelas">${estrelas}</span>
        <br><small style="color: var(--cor-ambrada); font-family: var(--fonte-mono);">+${livro.xpGanhado} XP</small>
        <br>
        <button onclick="removerItem(${livro.id}, 'concluidos')" class="btn-secundario" style="padding: 2px 6px; font-size: 0.7rem; margin-top: 5px;">Apagar</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// INICIALIZAR
window.addEventListener('DOMContentLoaded', () => {
  carregarDados();
  alternarCamposMidia();
});
