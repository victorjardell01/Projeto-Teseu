// --- DADOS DAS MATÉRIAS E ASSUNTOS ---
const dadosEstudos = {
    portugues: ["Gramática", "Interpretação de Texto", "Sintaxe", "Pontuação", "Morfologia"],
    matematica: ["Cálculo", "Geometria Plana", "Probabilidade e Estatística", "Álgebra", "Geometria Espacial", "Analise combinatoria", "Logica Matematica", "Matematica Basica"],
    fisica: ["Cinemática", "Dinâmica", "Estatica", "Hidrostática", "Termodinamica", "Ondulatoria e Otica", "Eletromagnetismo", "Relatividade", "Fisica Quantica", "Fisica Nuclear e de Particulas", "Fisica do Estado Solido"],
    quimica: ["Estequiometria", "Soluções", "Química Orgânica", "Termoquímica", "Equilíbrio Químico"],
    legislação: ["LDB", "ECA", "BNCC", "Didática e Avaliação", "Constitucional", "Penal", "Processo Penal", "Administrativo"]
};

// --- LÓGICA DE MATÉRIAS ---
function mostrarAssuntos(materia) {
    const container = document.getElementById('lista-assuntos');
    if (!container) return;

    container.innerHTML = `<h2>Estudando: ${materia.toUpperCase()}</h2>`;

    dadosEstudos[materia].forEach(assunto => {
        const idAssunto = `${materia}-${assunto.replace(/\s+/g, '')}`;
        const ultimaRevisao = localStorage.getItem(`data-${idAssunto}`);
        
        let infoData = 'Nunca revisado';
        if (ultimaRevisao) {
            infoData = `Última marcação: ${new Date(ultimaRevisao).toLocaleDateString()}`;
        }

        const divAssunto = document.createElement('div');
        divAssunto.className = 'item-assunto';
        divAssunto.innerHTML = `
            <h3>${assunto}</h3>
            <span class="data-revisao" style="font-size: 0.7rem; opacity: 0.6; display: block; margin-bottom: 10px;">${infoData}</span>
            <div class="quadrados-container">
                ${gerarQuadrados(materia, assunto)}
            </div>
        `;
        container.appendChild(divAssunto);
    });
}

function gerarQuadrados(materia, assunto) {
    let html = '';
    for (let i = 1; i <= 15; i++) {
        const idUnico = `${materia}-${assunto.replace(/\s+/g, '')}-${i}`;
        const check = localStorage.getItem(idUnico) === 'true' ? 'check' : '';
        html += `<div class="quadrado ${check}" onclick="toggleCheck('${idUnico}', this, '${materia}', '${assunto}')"></div>`;
    }
    return html;
}

function toggleCheck(id, elemento, materia, assunto) {
    const estaMarcado = elemento.classList.toggle('check');
    localStorage.setItem(id, estaMarcado);
    
    const idAssunto = `${materia}-${assunto.replace(/\s+/g, '')}`;
    localStorage.setItem(`data-${idAssunto}`, new Date().toISOString());
    
    const spanData = elemento.closest('.item-assunto').querySelector('.data-revisao');
    if (spanData) {
        spanData.innerText = `Última marcação: ${new Date().toLocaleDateString()}`;
    }
    
    atualizarXP();
}

// --- SISTEMA DE XP E NÍVEIS DO MAGO (ISOLADO E PRECISO) ---
function atualizarXP() {
    let totalMarcados = 0;
    
    // Varre exclusivamente as chaves que pertencem aos quadrados das matérias
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (chave && (chave.includes('portugues-') || chave.includes('matematica-') || chave.includes('fisica-') || chave.includes('quimica-') || chave.includes('legislação-'))) {
            if (localStorage.getItem(chave) === 'true') {
                totalMarcados++;
            }
        }
    }

    const xpTotal = totalMarcados * 10;
    const xpPorNivel = 100;
    const nivelAtual = Math.floor(xpTotal / xpPorNivel) + 1;
    const xpNoNivelAtual = xpTotal % xpPorNivel;
    const porcentagemBarra = (xpNoNivelAtual / xpPorNivel) * 100;

    const barra = document.getElementById('barra-preenchimento');
    const textoNivel = document.getElementById('texto-nivel');
    const textoXp = document.getElementById('texto-xp');

    if (barra) barra.style.width = porcentagemBarra + '%';
    if (textoNivel) textoNivel.innerText = `Nível ${nivelAtual} (Mago)`;
    if (textoXp) textoXp.innerText = `${xpNoNivelAtual} / ${xpPorNivel} XP (Total: ${xpTotal} XP)`;
}

// --- ROTINA SEMANAL ---
function salvarRotina(diaId) {
    const campo = document.getElementById(diaId);
    if (campo) {
        localStorage.setItem(`rotina-${diaId}`, campo.value);
    }
}

function carregarDados() {
    ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].forEach(dia => {
        const salvo = localStorage.getItem(`rotina-${dia}`);
        if (salvo) {
            const campo = document.getElementById(dia);
            if (campo) campo.value = salvo;
        }
    });

    mostrarAssuntos('portugues');
    atualizarXP();
}

// ==========================================
// --- FUNDO MÁGICO: ANIMAÇÃO DO PÊNDULO ---
// ==========================================
const canvas = document.getElementById('canvas-fundo');
const ctx = canvas ? canvas.getContext('2d') : null;

if (canvas && ctx) {
    let angulo = Math.PI / 4; // Ângulo inicial de 45°
    let velocidadeAngular = 0;
    let aceleracaoAngular = 0;

    const gravidade = 0.5;
    let comprimentoFio = Math.min(window.innerHeight * 0.5, 350);
    const amortecimento = 0.9995; // Mantém a oscilação suave por longo tempo

    function ajustarCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        comprimentoFio = Math.min(window.innerHeight * 0.5, 350);
    }

    function animarPendulo() {
        // Limpa a tela
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const origemX = canvas.width / 2;
        const origemY = 0;

        // Cálculo da física do movimento harmônico
        aceleracaoAngular = (-1 * gravidade / comprimentoFio) * Math.sin(angulo);
        velocidadeAngular += aceleracaoAngular;
        velocidadeAngular *= amortecimento;
        angulo += velocidadeAngular;

        // Posição da esfera no espaço
        const penduloX = origemX + comprimentoFio * Math.sin(angulo);
        const penduloY = origemY + comprimentoFio * Math.cos(angulo);

        // 1. Linha / Haste
        ctx.beginPath();
        ctx.moveTo(origemX, origemY);
        ctx.lineTo(penduloX, penduloY);
        ctx.strokeStyle = '#6c5ce7';
        ctx.lineWidth = 3;
        ctx.stroke();

        // 2. Ponto de Fixação (Topo)
        ctx.beginPath();
        ctx.arc(origemX, origemY, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#2c3e50';
        ctx.fill();

        // 3. Esfera / Peso do Pêndulo
        ctx.beginPath();
        ctx.arc(penduloX, penduloY, 22, 0, Math.PI * 2);
        ctx.fillStyle = '#6c5ce7';
        ctx.fill();
        ctx.strokeStyle = '#2c3e50';
        ctx.lineWidth = 2;
        ctx.stroke();

        requestAnimationFrame(animarPendulo);
    }

    ajustarCanvas();
    window.addEventListener('resize', ajustarCanvas);
    animarPendulo();
}

window.onload = carregarDados;
