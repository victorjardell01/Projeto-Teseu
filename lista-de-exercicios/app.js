// Pega automaticamente o nome do exercício baseado no título da página HTML
const nomeExercicio = document.title.replace(" - Detalhes", "").trim();

document.addEventListener("DOMContentLoaded", () => {
  carregarDadosExercicio();
});

// Salva a carga e as repetições no navegador
function salvarDadosExercicio() {
  const cargaInput = document.getElementById("input-carga").value;
  const repsInput = document.getElementById("input-reps").value;

  const dados = {
    carga: cargaInput,
    reps: repsInput
  };

  // Salva usando o nome do exercício como chave única (ex: "Puxada Alta-dados")
  localStorage.setItem(`${nomeExercicio}-dados`, JSON.stringify(dados));
  
  // Feedback visual rápido de salvo
  const btnSalvar = document.getElementById("btn-salvar");
  const textoOriginal = btnSalvar.innerHTML;
  btnSalvar.innerHTML = "💾 Salvo! ✔";
  btnSalvar.style.background = "#00ffcc";
  btnSalvar.style.color = "#000";

  setTimeout(() => {
    btnSalvar.innerHTML = textoOriginal;
    btnSalvar.style.background = "";
    btnSalvar.style.color = "";
  }, 1500);
}

// Carrega os dados salvos anteriormente quando a página abre
function carregarDadosExercicio() {
  const dadosSalvos = localStorage.getItem(`${nomeExercicio}-dados`);

  if (dadosSalvos) {
    const dados = JSON.parse(dadosSalvos);
    document.getElementById("input-carga").value = dados.carga;
    document.getElementById("input-reps").value = dados.reps;
  }
}
