// ==========================================
// MÓDULO RANGER // LÓGICA E FILTRAGEM
// ==========================================

const baseDeDadosRanger = [
    {
        nome: "Capim-Santo",
        categorias: ["infusoes"],
        termoBusca: "capim santo cidreira cha",
        tituloBadge: "Plantas para Infusões",
        paraQueServe: "Excelente calmante natural, alivia dores musculares e estados de ansiedade leve na trilha.",
        propriedades: "Antiespasmódico, bactericida e rico em mirceno.",
        imagem: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80"
    },
    {
        nome: "Hortelã-Comum",
        categorias: ["infusoes", "comestiveis"],
        termoBusca: "hortela menta cha tempero",
        tituloBadge: "Infusões / Comestíveis",
        paraQueServe: "Auxilia na digestão pesada após longas caminhadas, combate náuseas e refresca.",
        propriedades: "Rico em mentol, ação digestiva e antisséptica.",
        imagem: "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80"
    },
    {
        nome: "Mangueira (Manga)",
        categorias: ["frutiferas"],
        termoBusca: "manga mangueira arvore fruta",
        tituloBadge: "Árvores Frutíferas",
        paraQueServe: "Fornece frutos densos em energia e carboidratos de rápida absorção.",
        propriedades: "Altíssima concentração de Vitamina A, C e fibras alimentares.",
        imagem: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80"
    },
    {
        nome: "Ovos Silvestres / Caipiras",
        categorias: ["carnes"],
        termoBusca: "ovo ovos carnes proteina",
        tituloBadge: "Carnes, Ovos e Afins",
        paraQueServe: "Fonte primária e de altíssimo valor biológico para reconstrução muscular na selva.",
        propriedades: "Rico em proteínas completas, colina e vitaminas do complexo B.",
        imagem: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80"
    }
];

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
            <img src="${item.imagem}" alt="${item.nome}">
            <h3>${item.nome}</h3>
            <span class="badge">${item.tituloBadge}</span>
            <p><strong>Para que serve:</strong> ${item.paraQueServe}</p>
            <p><strong>Propriedades:</strong> ${item.propriedades}</p>
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

// Inicializa a página carregando todos os itens do Ranger
window.addEventListener("DOMContentLoaded", () => {
    renderizarCatalogoRanger(baseDeDadosRanger);
});
