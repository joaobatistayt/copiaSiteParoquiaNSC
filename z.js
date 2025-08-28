    // Carrega eventos do localStorage (se houver)
    const eventos = JSON.parse(localStorage.getItem("eventos")) || [];

    // Referências aos elementos do DOM
    const tituloInput = document.getElementById('titulo');
    const tipoSelect = document.getElementById('tipoEvento');
    const dataInput = document.getElementById('dataEvento');
    const localInput = document.getElementById('localEvento');
    const listaEventos = document.getElementById('listaEventos');
    const botaoAgendar = document.getElementById('agendarBtn');

    // Listener do botão
    botaoAgendar.addEventListener('click', () => {
      const titulo = tituloInput.value.trim();
      const tipo = tipoSelect.value;
      const data = dataInput.value;
      const local = localInput.value.trim();

      if (!titulo || !data || !local) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      const novoEvento = { titulo, tipo, data, local };
      eventos.push(novoEvento);

      // Salvar no localStorage
      localStorage.setItem("eventos", JSON.stringify(eventos));

      renderizarEventos();
      limparFormulario();
    });

    // Função para renderizar eventos na tela
    function renderizarEventos() {
      listaEventos.innerHTML = "";

      if (eventos.length === 0) {
        listaEventos.innerHTML = "<p>Nenhum evento agendado.</p>";
        return;
      }

      eventos.forEach(evento => {
        const div = document.createElement('div');
        div.textContent = `${evento.titulo} - ${evento.tipo} - ${evento.data} - ${evento.local}`;
        listaEventos.appendChild(div);
      });
    }

    // Função para limpar os campos após agendar
    function limparFormulario() {
      tituloInput.value = "";
      tipoSelect.value = "missa";
      dataInput.value = "";
      localInput.value = "";
    }

    // Renderiza os eventos salvos ao carregar a página
    renderizarEventos();