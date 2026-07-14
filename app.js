const CHAVE_CORRETA = "1234";

document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o usuário já estava logado
  if (localStorage.getItem("rpg_logado") === "true") {
    mostrarDashboard();
  }
  carregarMetas();
});

/* SISTEMA DE LOGIN */
function tentarLogin() {
  const input = document.getElementById("login-key");
  const erro = document.getElementById("login-error");

  if (input.value === CHAVE_CORRETA) {
    erro.textContent = "";
    localStorage.setItem("rpg_logado", "true");
    mostrarDashboard();
    input.value = "";
  } else {
    erro.textContent = "Chave de acesso incorreta.";
    input.value = "";
    input.focus();
  }
}

function mostrarDashboard() {
  document.getElementById("page-login").classList.remove("active");
  document.getElementById("page-dashboard").classList.add("active");
}

function logout() {
  localStorage.removeItem("rpg_logado");
  document.getElementById("page-dashboard").classList.remove("active");
  document.getElementById("page-login").classList.add("active");
}

/* TROCA DE ABAS */
function mudarAba(tabId, botao) {
  const panes = document.querySelectorAll(".tab-pane");
  panes.forEach(pane => pane.classList.remove("active"));

  const botoes = document.querySelectorAll(".tab-btn");
  botoes.forEach(btn => btn.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  botao.classList.add("active");
}

/* SISTEMA DE PROGRESSO DO RPG */
function salvarMetas() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const progresso = [];

  checkboxes.forEach((cb, index) => {
    progresso.push({ id: index, checked: cb.checked });
  });

  localStorage.setItem("rpg_progresso", JSON.stringify(progresso));
  atualizarProgressoVisual();
}

function carregarMetas() {
  const salvo = localStorage.getItem("rpg_progresso");
  const checkboxes = document.querySelectorAll("input[type='checkbox']");

  if (salvo && checkboxes.length > 0) {
    const progresso = JSON.parse(salvo);
    progresso.forEach(item => {
      if (checkboxes[item.id]) {
        checkboxes[item.id].checked = item.checked;
      }
    });
  }
  atualizarProgressoVisual();
}

function atualizarProgressoVisual() {
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  if (checkboxes.length === 0) return;

  const total = checkboxes.length;
  const marcados = Array.from(checkboxes).filter(cb => cb.checked).length;
  const porcentagem = Math.round((marcados / total) * 100);

  // Calcula o offset da borda do círculo (Circunferência r=40 é 251.2)
  const circunferencia = 251.2;
  const offset = circunferencia - (porcentagem / 100) * circunferencia;

  // Aplica o valor no círculo SVG e no texto
  document.getElementById("ring-geral").style.strokeDashoffset = offset;
  document.getElementById("txt-geral").textContent = `${porcentagem}%`;
}
