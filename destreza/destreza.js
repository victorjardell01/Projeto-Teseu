document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. MAPEAMENTO E CÁLCULO DE PERCURSO
    ========================================== */
    const formRota = document.getElementById('form-rota');
    const distanciaVal = document.getElementById('distancia-val');
    const tempoVal = document.getElementById('tempo-val');

    formRota.addEventListener('submit', (event) => {
        event.preventDefault();

        const origem = document.getElementById('origem').value.trim();
        const destino = document.getElementById('destino').value.trim();

        if (origem && destino) {
            // Simulação de cálculo de rota baseada nos nomes inseridos
            const kmSimulado = Math.floor((origem.length + destino.length) * 1.2) + 3;
            const tempoSimulado = Math.round(kmSimulado * 2.2); // Estimativa de tempo em trânsito urbano

            // Atualiza os valores na tela
            distanciaVal.textContent = `${kmSimulado} km`;
            tempoVal.textContent = `${tempoSimulado} min`;
        }
    });


    /* ==========================================
       2. GESTÃO DE MANUTENÇÃO (INSERÇÃO DINÂMICA)
    ========================================== */
    const formManutencao = document.getElementById('form-manutencao');
    const listaManutencao = document.getElementById('lista-manutencao');

    formManutencao.addEventListener('submit', (event) => {
        event.preventDefault();

        const tipo = document.getElementById('tipo-manutencao').value.trim();
        const kmAtual = document.getElementById('km-atual').value.trim();
        const proximaRevisao = document.getElementById('proxima-revisao').value.trim();

        if (tipo && kmAtual && proximaRevisao) {
            // Cria uma nova linha na tabela
            const novaLinha = document.createElement('tr');

            // Formata o número do KM
            const kmFormatado = Number(kmAtual).toLocaleString('pt-BR');

            novaLinha.innerHTML = `
                <td>${tipo}</td>
                <td>${kmFormatado} km</td>
                <td>${proximaRevisao}</td>
                <td>Agendado</td>
            `;

            // Adiciona à tabela e limpa os campos
            listaManutencao.appendChild(novaLinha);
            formManutencao.reset();
        }
    });

});
