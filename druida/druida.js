// Configuração Inicial e Estado do Druida (Focado em Déficit Calórico)
let dadosDruida = JSON.parse(localStorage.getItem('dadosDruida')) || {
    peso: 89,
    altura: 1.65,
    caloriasAtuais: 0,
    caloriasMeta: 2100,
    carboAtual: 0,
    carboMeta: 210,
    protAtual: 0,
    protMeta: 160,
    gordAtual: 0,
    gordMeta: 60,
    fibraAtual: 0,
    fibraMeta: 30,
    aguaAtual: 0,
    aguaMeta: 3000,
    xp: 0
};

// Inicializar tela ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("peso-input").value = dadosDruida.peso;
    document.getElementById("altura-input").value = dadosDruida.altura;
    atualizarInterface();
    calcularIMCAutomatico();
});

// Cálculo automático do IMC
function calcularIMCAutomatico() {
    let peso = parseFloat(dadosDruida.peso);
    let altura = parseFloat(dadosDruida.altura);
    
    if (peso > 0 && altura > 0) {
        let imc = peso / (altura * altura);
        let classificacao = "";
        
        if (imc < 18.5) classificacao = "Abaixo do peso";
        else if (imc < 25) classificacao = "Peso normal";
        else if (imc < 30) classificacao = "Sobrepeso";
        else classificacao = "Obesidade";

        document.getElementById("imc-valor").innerText = `${imc.toFixed(1)} (${classificacao})`;
    } else {
        document.getElementById("imc-valor").innerText = "--";
    }
}

// Atualizar o peso pelo input da interface
function atualizarPeso() {
    let novoPeso = parseFloat(document.getElementById("peso-input").value);
    if (!isNaN(novoPeso) && novoPeso > 0) {
        dadosDruida.peso = novoPeso;
        salvarEstado();
        calcularIMCAutomatico();
        alert("Peso atualizado com sucesso!");
    } else {
        alert("Insira um peso válido.");
    }
}

// Adicionar refeição (Incrementa calorias, macros e fibras de forma balanceada para o déficit)
function adicionarRefeicao() {
    dadosDruida.caloriasAtuais += 300;
    dadosDruida.carboAtual += 30;
    dadosDruida.protAtual += 25;
    dadosDruida.gordAtual += 8;
    dadosDruida.fibraAtual += 5;
    
    dadosDruida.xp += 10; // Adiciona XP de bônus por registrar refeição
    
    atualizarInterface();
    salvarEstado();
}

// Adicionar água
function adicionarAgua() {
    dadosDruida.aguaAtual += 500;
    dadosDruida.xp += 5; // Bônus de XP por hidratação
    
    atualizarInterface();
    salvarEstado();
}

// Atualizar os elementos visuais na tela
function atualizarInterface() {
    document.getElementById("calorias-atual").innerText = dadosDruida.caloriasAtuais;
    document.getElementById("calorias-meta").innerText = dadosDruida.caloriasMeta;
    
    document.getElementById("carbo-atual").innerText = dadosDruida.carboAtual;
    document.getElementById("carbo-meta").innerText = dadosDruida.carboMeta;

    document.getElementById("prot-atual").innerText = dadosDruida.protAtual;
    document.getElementById("prot-meta").innerText = dadosDruida.protMeta;

    document.getElementById("gord-atual").innerText = dadosDruida.gordAtual;
    document.getElementById("gord-meta").innerText = dadosDruida.gordMeta;

    document.getElementById("fibra-atual").innerText = dadosDruida.fibraAtual;
    document.getElementById("fibra-meta").innerText = dadosDruida.fibraMeta;
    
    document.getElementById("agua-atual").innerText = dadosDruida.aguaAtual;
    document.getElementById("agua-meta").innerText = dadosDruida.aguaMeta;

    // Atualização da barra de XP (cada nível exige 100 XP)
    let xpAtualNoNivel = dadosDruida.xp % 100;
    
    document.getElementById("texto-xp").innerText = `${xpAtualNoNivel} / 100 XP (Total: ${dadosDruida.xp} XP)`;
    document.getElementById("barra-xp").style.width = `${xpAtualNoNivel}%`;
}

// Salvar dados no navegador
function salvarEstado() {
    localStorage.setItem('dadosDruida', JSON.stringify(dadosDruida));
}
