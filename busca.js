// busca.js

// --- 1. FONTE DE DADOS ---
// Adicione ou remova documentos nesta lista.
// O 'url' deve ser o caminho correto para o arquivo na pasta 'docs'.

let documentos = undefined;

async function GetData()
{
    const url = "http://localhost:3000/documentos";
    try
    {
        const response = await fetch(url)
        .then(response => response.json())
        .then(data => {
            documentos = data;
            LoadContent();
        });
    }

    catch (error)
    {
        console.error(error.message);
    }
}

GetData();

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');
});

function LoadContent(){
    // --- 2. FUNÇÃO PARA RENDERIZAR OS DOCUMENTOS ---
    function renderizarDocumentos(docsParaRenderizar) {
        // Limpa os resultados anteriores
        resultsContainer.innerHTML = '';

        if (docsParaRenderizar.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">Nenhum documento encontrado.</p>';
            return;
        }

        docsParaRenderizar.forEach(doc => {
            const docElement = document.createElement('a');
            docElement.href = doc.url;
            docElement.target = '_blank'; // Abre em nova aba
            docElement.classList.add('document-card');

            docElement.innerHTML = `
                <h4>${doc.titulo}</h4>
                <p>${doc.descricao}</p>
                <span class="category-tag">${doc.categoria}</span>
            `;
            resultsContainer.appendChild(docElement);
        });
    }

    // --- 3. EVENTO DE BUSCA AO VIVO ---
    searchInput.addEventListener('input', (event) => {
        if (documentos != undefined)
        {
            const termoBusca = event.target.value.toLowerCase();

            const resultadosFiltrados = documentos.filter(doc => {
                return doc.titulo.toLowerCase().includes(termoBusca);
            });

            renderizarDocumentos(resultadosFiltrados);
        }
    });

    // --- Renderiza todos os documentos ao carregar a página ---
    if (documentos != undefined)
        renderizarDocumentos(documentos);
};