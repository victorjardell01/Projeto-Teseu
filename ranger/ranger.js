// ==========================================
// MÓDULO RANGER // LÓGICA, FILTRAGEM E EDIÇÃO
// ==========================================

let baseDeDadosRanger = JSON.parse(localStorage.getItem("ranger_dados_catalogo")) || [
    {
        id: 1,
        nome: "Capim-Santo",
        categorias: ["infusoes"],
        termoBusca: "capim santo cidreira cha",
        tituloBadge: "Plantas para Infusões",
        paraQueServe: "Excelente calmante natural, alivia dores musculares e estados de ansiedade leve na trilha.",
        propriedades: "Antiespasmódico, bactericida e rico em mirceno."
    },
    {
        id: 2,
        nome: "Hortelã-Comum",
        categorias: ["infusoes", "comestiveis"],
        termoBusca: "hortela menta cha tempero",
        tituloBadge: "Infusões / Comestíveis",
        paraQueServe: "Auxilia na digestão pesada após longas caminhadas, combate náuseas e refresca.",
        propriedades: "Rico em mentol, ação digestiva e antisséptica."
    },
    {
        id: 3,
        nome: "Mangueira (Manga)",
        categorias: ["frutiferas"],
        termoBusca: "manga mangueira arvore fruta",
        tituloBadge: "Árvores Frutíferas",
        paraQueServe: "Fornece frutos densos em energia e carboidratos de rápida absorção.",
        propriedades: "Altíssima concentração de Vitamina A, C e fibras alimentares."
    },
    {
        id: 4,
        nome: "Peixes de Água Doce (Ex: Lambari / Tilápia)",
        categorias: ["pesca"],
        termoBusca: "peixe pesca lambari tilapia carne aquatica",
        tituloBadge: "Pesca e Recursos Fluviais",
        paraQueServe: "Fonte primária de proteína magra e ácidos graxos essenciais de fácil digestão em ambientes fluviais.",
        propriedades: "Rico em ômega-3, fósforo e proteínas de alto valor biológico com baixo tecido conjuntivo."
    },
    {
        id: 5,
        nome: "Carne de Caça Magra (Ex: Cervo / Animais de Médio Porte)",
        categorias: ["caca"],
        termoBusca: "caca carne vermelha silvestre proteina",
        tituloBadge: "Proteína Silvestre (Caça)",
        paraQueServe: "Alimento altamente calórico e denso para suporte energético em climas frios e longas jornadas.",
        propriedades: "Teor de gordura extremamente baixo, altíssima concentração de ferro heme e zinco."
    }
];

function salvarDadosRanger() {
    localStorage.setItem("ranger_dados_catalogo", JSON.stringify(baseDeDadosRanger));
}

function renderizarCatalogoRanger(itens) {
    const grid = document.getElementById('entryGridRanger');
    if (!grid) return;
    grid.innerHTML = '';

    if (itens.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-style: italic; color: var(--text-muted); padding: 20px;">Nenhum espécime encontrado nas anotações...</p>';
        return;
    }

    itens.forEach(item => {
        const card = document.createElement('div');
        card.className = 'entry-card';
        card.innerHTML = `
            <h3>${item.nome}</h3>
            <span class="badge">${item.tituloBadge}</span>
            <p><strong>Para que serve:</strong> ${item.paraQueServe}</p>
            <p><strong>Propriedades:</strong> ${item.propriedades}</p>
            <button class="btn-excluir" onclick="excluirEspetaculoRanger(${item.id})">🗑️ Apagar Nota</button>
        `;
        grid.appendChild(card);
    });
}

function filtrarItensRanger() {
    let input = document.getElementById('searchInput').value.toLowerCase().trim();
    let categoriaSelecionada = document.getElementById('categoryFilter').value;

    let itensFiltrados = baseDeDadosRanger.filter(item => {
        let correspondeNome = item.nome.toLowerCase().includes(input) || item.termoBusca.includes(input);
        let correspondeCategoria = (categoriaSelecionada === 'todos' || item.categorias.includes(categoriaSelecionada));
        return correspondeNome && correspondeCategoria;
    });

    renderizarCatalogoRanger(itensFiltrados);
}

function adicionarNovoEspécime() {
    const nome = prompt("Nome do espécime ou recurso:");
    if (!nome || nome.trim() === "") return;

    const categoriaSelect = prompt("Escolha a categoria:\n1 - Infusões\n2 - Comestíveis (Plantas)\n3 - Árvores Frutíferas\n4 - Pesca e Recursos Fluviais\n5 - Proteína Silvestre (Caça)");
    let cats = ["comestiveis"];
    let badge = "Plantas Comestíveis";

    if (categoriaSelect === "1") { cats = ["infusoes"]; badge = "Plantas para Infusões"; }
    else if (categoriaSelect === "2") { cats = ["comestiveis"]; badge = "Plantas Comestíveis"; }
    else if (categoriaSelect === "3") { cats = ["frutiferas"]; badge = "Árvores Frutíferas"; }
    else if (categoriaSelect === "4") { cats = ["pesca"]; badge = "Pesca e Recursos Fluviais"; }
    else if (categoriaSelect === "5") { cats = ["caca"]; badge = "Proteína Silvestre (Caça)"; }

    const paraQueServe = prompt("Para que serve este recurso?");
    const propriedades = prompt("Quais as propriedades específicas (ex: teor de gordura, ferro, região)?");

    const novoItem = {
        id: Date.now(),
        nome: nome.trim(),
        categorias: cats,
        termoBusca: nome.toLowerCase(),
        tituloBadge: badge,
        paraQueServe: paraQueServe ? paraQueServe.trim() : "Sem anotações detalhadas.",
        propriedades: propriedades ? propriedades.trim() : "Não catalogado."
    };

    baseDeDadosRanger.push(novoItem);
    salvarDadosRanger();
    filtrarItensRanger();
    alert(`🌿 Espécime "${novoItem.nome}" registrado com sucesso no Diário de Campo!`);
}

function excluirEspetaculoRanger(id) {
    if (confirm("Deseja realmente apagar esta nota do diário?")) {
        baseDeDadosRanger = baseDeDadosRanger.filter(item => item.id !== id);
        salvarDadosRanger();
        filtrarItensRanger();
    }
}

// Inicializa a página carregando todos os itens do Ranger
window.addEventListener("DOMContentLoaded", () => {
    filtrarItensRanger();
});
