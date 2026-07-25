// --- SCRIPT JAVASCRIPT DO DRUIDA ---
let caloriasAtuais = parseInt(localStorage.getItem('druida-calorias')) || 0;
let aguaAtual = parseInt(localStorage.getItem('druida-agua')) || 0;
const metaCalorias = 2500;
const metaAgua = 3000;

function atualizarPainelDruida() {
    const elCalorias = document.getElementById('texto-calorias');
    const elAgua = document.getElementById('texto-agua');
    if (elCalorias) elCalorias.innerText = `${caloriasAtuais} / ${metaCalorias} kcal`;
    if (elAgua) elAgua.innerText = `${aguaAtual} / ${metaAgua} ml`;

    let totalMarcados = 0;
    for (let i = 0; i < localStorage.length; i++) {
        const chave = localStorage.key(i);
        if (chave && chave.startsWith('druida-') && localStorage.getItem(chave) === 'true') {
            totalMarcados++;
        }
    }

    let bonusCalorias = Math.floor(caloriasAtuais / 250);
    let bonusAgua = Math.floor(aguaAtual / 500);
    let xpTotal = (totalMarcados * 15) + (bonusCalorias * 5) + (bonusAgua * 5);

    const xpPorNivel = 100;
    const nivelAtual = Math.floor(xpTotal / xpPorNivel) + 1;
    const xpNoNivelAtual = xpTotal % xpPorNivel;
    const porcentagemBarra = Math.min((xpNoNivelAtual / xpPorNivel) * 100, 100);

    const elBarra = document.getElementById('barra-preenchimento');
    const elNivel = document.getElementById('texto-nivel');
    const elXp = document.getElementById('texto-xp');

    if (elBarra) elBarra.style.width = porcentagemBarra + '%';
    if (elNivel) elNivel.innerText = `Nível ${nivelAtual} (Arquidruida)`;
    if (elXp) elXp.innerText = `${xpNoNivelAtual} / ${xpPorNivel} XP (Total: ${xpTotal} XP)`;
}

function adicionarCalorias(qtd) {
    caloriasAtuais += qtd;
    if (caloriasAtuais > metaCalorias) caloriasAtuais = metaCalorias;
    localStorage.setItem('druida-calorias', caloriasAtuais);
    atualizarPainelDruida();
}

function adicionarAgua(qtd) {
    aguaAtual += qtd;
    if (aguaAtual > metaAgua) aguaAtual = metaAgua;
    localStorage.setItem('druida-agua', aguaAtual);
    atualizarPainelDruida();
}

function calcularIMC() {
    const inputPeso = document.getElementById('peso-input');
    const inputAltura = document.getElementById('altura-input');
    const textoImc = document.getElementById('texto-imc');

    if (!inputPeso || !inputAltura || !textoImc) return;

    const peso = parseFloat(inputPeso.value);
    const altura = parseFloat(inputAltura.value);

    if (!peso || !altura || altura <= 0) {
        textoImc.innerText = "Insira valores válidos!";
        return;
    }

    const imc = peso / (altura * altura);
    let classificacao = "";

    if (imc < 18.5) classificacao = "Abaixo do peso";
    else if (imc < 25) classificacao = "Peso normal";
    else if (imc < 30) classificacao = "Sobrepeso";
    else classificacao = "Obesidade";

    textoImc.innerText = `IMC: ${imc.toFixed(1)} (${classificacao})`;
    localStorage.setItem('druida-peso', peso);
    localStorage.setItem('druida-altura', altura);
}

function toggleRefeicao(id, elemento) {
    const estaMarcado = elemento.classList.toggle('check');
    localStorage.setItem(`druida-${id}`, estaMarcado);
    if (estaMarcado) {
        adicionarCalorias(400);
    }
    atualizarPainelDruida();
}

function salvarRotina(diaId) {
    const campo = document.getElementById(diaId);
    if (campo) {
        localStorage.setItem(`druida-rotina-${diaId}`, campo.value);
    }
}

function carregarDadosDruida() {
    ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].forEach(dia => {
        const salvo = localStorage.getItem(`druida-rotina-${dia}`);
        if (salvo) {
            const campo = document.getElementById(dia);
            if (campo) campo.value = salvo;
        }
    });

    document.querySelectorAll('.checkbox-refeicao').forEach((el, index) => {
        const id = `ref-${index + 1}`;
        if (localStorage.getItem(`druida-${id}`) === 'true') {
            el.classList.add('check');
        }
    });

    const pesoSalvo = localStorage.getItem('druida-peso');
    const alturaSalva = localStorage.getItem('druida-altura');
    const inputPeso = document.getElementById('peso-input');
    const inputAltura = document.getElementById('altura-input');

    if (pesoSalvo && inputPeso) inputPeso.value = pesoSalvo;
    if (alturaSalva && inputAltura) inputAltura.value = alturaSalva;
    if (pesoSalvo && alturaSalva) calcularIMC();

    atualizarPainelDruida();
}

window.onload = carregarDadosDruida;

// --- CANVAS: FOLHAS E FLUXO DA FLORESTA ---
const canvas = document.getElementById('canvas-fundo');
const ctx = canvas ? canvas.getContext('2d') : null;
let particulas = [];

function ajustarCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    particulas = [];
    const quantidade = Math.floor(canvas.width / 40);
    for (let i = 0; i < quantidade; i++) {
        particulas.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            velocidade: 0.2 + Math.random() * 0.5,
            tamanho: 2 + Math.random() * 3,
            opacidade: 0.2 + Math.random() * 0.4
        });
    }
}

function desenharFloresta() {
    if (!ctx || !canvas) return;
    ctx.fillStyle = "#0c1810";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    particulas.forEach(p => {
        ctx.fillStyle = `rgba(82, 183, 136, ${p.opacidade})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.tamanho, 0, Math.PI * 2);
        ctx.fill();

        p.y -= p.velocidade;

        if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
        }
    });
}

if (canvas) {
    ajustarCanvas();
    setInterval(desenharFloresta, 35);
    window.addEventListener('resize', ajustarCanvas);
}
