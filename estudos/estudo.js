// --- DADOS DAS MATÉRIAS E ASSUNTOS ---
const dadosEstudos = {
    portugues: ["Gramática", "Interpretação de Texto", "Sintaxe", "Pontuação", "Morfologia"],
    matematica: ["Cálculo", "Geometria Plana", "Probabilidade e Estatística", "Álgebra", "Geometria Espacial", "Analise combinatoria", "Logica Matematica", "Matematica Basica"],
    fisica: ["Cinemática", "Dinâmica", "Estatica", "Hidrostática", "Termodinamica", "Ondulatoria e Otica", "Eletromagnetismo", "Relatividade", "Fisica Quantica", "Fisica Nuclear e de Particulas", "Fisica do Estado Solido"],
    quimica: ["Estequiometria", "Soluções", "Química Orgânica", "Termoquímica", "Equilíbrio Químico"],
    legislação: ["LDB", "ECA", "BNCC", "Didática e Avaliação", "Constitucional", "Penal", "Processo Penal", "Administrativo"]
};

// --- LOGICA DE MATÉRIAS ---
function mostrarAssuntos(materia) {
    const container = document.getElementById('lista-assuntos');
    const progressoDiv = document.getElementById('progresso-geral');
    if (!container || !progressoDiv) return;

    progressoDiv.style.display = 'block';
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
    atualizarProgresso();
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
    
    // Atualiza a data da última revisão ao clicar em qualquer quadrado
    const idAssunto = `${materia}-${assunto.replace(/\s+/g, '')}`;
    localStorage.setItem(`data-${idAssunto}`, new Date().toISOString());
    
    // Atualiza o texto da data na tela sem precisar recarregar
    const spanData = elemento.closest('.item-assunto').querySelector('.data-revisao');
    if (spanData) {
        spanData.innerText = `Última marcação: ${new Date().toLocaleDateString()}`;
    }
    
    atualizarProgresso();
}

function atualizarProgresso() {
    const quadrados = document.querySelectorAll('.quadrado');
    const marcados = document.querySelectorAll('.quadrado.check');
    const porcentagem = quadrados.length > 0 ? Math.round((marcados.length / quadrados.length) * 100) : 0;
    
    const barra = document.getElementById('barra-preenchimento');
    const status = document.getElementById('status-porcentagem');
    
    if (barra) barra.style.width = porcentagem + '%';
    if (status) status.innerText = `${porcentagem}% concluído`;
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
}

// --- FUNDO MÁGICO: FÓRMULAS E FUNÇÕES FLUTUANTES ---
const canvas = document.getElementById('canvas-fundo');
const ctx = canvas ? canvas.getContext('2d') : null;
let formulasFlutuantes = [];

const formulas = [
    "f(x) = x²", "∫ f(x)dx", "lim (x→∞)", "dy/dx", "e^(ix)", 
    "∑ (1/n)", "∇·E = ρ", "Δ = b²-4ac", "sin(θ)", "cos(θ)", 
    "A = πr²", "log(x)", "√x", "n!", "P(A|B)"
];

function ajustarCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    formulasFlutuantes = [];
    const quantidade = Math.floor(canvas.width / 45);
    for (let i = 0; i < quantidade; i++) {
        formulasFlutuantes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            velocidade: 0.2 + Math.random() * 0.6,
            texto: formulas[Math.floor(Math.random() * formulas.length)],
            tamanho: 11 + Math.random() * 5,
            opacidade: 0.2 + Math.random() * 0.5
        });
    }
}

function desenharMagiaMatematica() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    formulasFlutuantes.forEach(p => {
        ctx.fillStyle = `rgba(0, 255, 255, ${p.opacidade})`;
        ctx.font = `${p.tamanho}px monospace`;
        ctx.fillText(p.texto, p.x, p.y);

        p.y -= p.velocidade;

        if (p.y < -20) {
            p.y = canvas.height + 20;
            p.x = Math.random() * canvas.width;
            p.texto = formulas[Math.floor(Math.random() * formulas.length)];
        }
    });
}

if (canvas) {
    ajustarCanvas();
    setInterval(desenharMagiaMatematica, 30);
    window.addEventListener('resize', ajustarCanvas);
}

window.onload = carregarDados;
