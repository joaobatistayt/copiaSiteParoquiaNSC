document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('intencao-form');
    const listaIntencoes = document.getElementById('lista-intencoes');

    // Carrega as intenções salvas do localStorage ou inicia um array vazio
    let intencoesSalvas = JSON.parse(localStorage.getItem('intencoes')) || [];

    // Função para renderizar TODAS as intenções na tela
    function renderizarIntencoes() {
        // Limpa a lista completamente para evitar duplicações
        listaIntencoes.innerHTML = '';

        // Se não houver intenções, não mostra nada
        if (intencoesSalvas.length === 0) {
            return;
        }

        // Adiciona o título e a linha separadora apenas se houver intenções
        listaIntencoes.innerHTML = `
            <hr style="margin: 40px 0;">
            <h3 style="text-align:center;">Intenções Enviadas</h3>
        `;
        
        // Itera sobre a lista de trás para frente para mostrar as mais novas primeiro
        const originalLength = intencoesSalvas.length;
        intencoesSalvas.slice().reverse().forEach((intencao, i) => {
            // Calcula o índice original para usar no botão de apagar
            const originalIndex = originalLength - 1 - i;

            const intencaoElement = document.createElement('div');
            intencaoElement.classList.add('intencao-item');

            const nomeDisplay = intencao.nome || 'Anônimo';

            // Adiciona o conteúdo e o novo botão de apagar com o data-index correto
            intencaoElement.innerHTML = `
                <button class="delete-btn" data-index="${originalIndex}" title="Apagar intenção">&times;</button>
                <h4>"${intencao.intencao}"</h4>
                <p>Enviado por: <strong>${nomeDisplay}</strong></p>
                <p>Tipo: <span class="tipo">${intencao.tipo}</span></p>
            `;

            listaIntencoes.appendChild(intencaoElement);
        });
    }

    // Evento de envio do formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const novaIntencao = {
            nome: document.getElementById('nome').value.trim(),
            intencao: document.getElementById('intencao').value.trim(),
            tipo: document.getElementById('tipo').value
        };

        // Adiciona a nova intenção ao array
        intencoesSalvas.push(novaIntencao);
        
        // Atualiza o localStorage
        localStorage.setItem('intencoes', JSON.stringify(intencoesSalvas));

        // Renderiza a lista atualizada
        renderizarIntencoes();

        // Limpa o formulário
        form.reset();
        
        // Rola a tela para a lista de forma suave
        listaIntencoes.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    // Adiciona um "escutador de cliques" na área da lista para pegar os cliques nos botões
    listaIntencoes.addEventListener('click', (event) => {
        // Verifica se o elemento clicado foi um botão com a classe 'delete-btn'
        if (event.target && event.target.classList.contains('delete-btn')) {
            // Pede confirmação ao usuário
            const querApagar = confirm('Tem certeza que deseja apagar esta intenção?');

            if (querApagar) {
                // Pega o índice que guardamos no atributo 'data-index'
                const indexParaApagar = parseInt(event.target.dataset.index, 10);
    
                // Remove o item do array usando o índice
                intencoesSalvas.splice(indexParaApagar, 1);
    
                // Atualiza o localStorage com o array modificado
                localStorage.setItem('intencoes', JSON.stringify(intencoesSalvas));
    
                // Renderiza a lista novamente para refletir a remoção
                renderizarIntencoes();
            }
        }
    });

    // Renderiza as intenções que já estão salvas quando a página carrega
    renderizarIntencoes();
});