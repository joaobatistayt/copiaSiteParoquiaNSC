// Função para verificar a veracidade ou não das repostas

function verificarRespostas() {

  const respostasCorretas = {
    q1: 'a',
    q2: 'd',
    q3: 'd',
    q4: 'c',
    q5: 'b',
  };

  let pontuacao = 0;
  const form = document.getElementById('quizForm');
  const formData = new FormData(form);

  // Verificar se todas as perguntas foram respondidas
  for (let pergunta in respostasCorretas) {
    if (!formData.has(pergunta)) {
      alert('Por favor, responda todas as perguntas.');
      return;
    }
  }

  // Verificar respostas enviadas, cada uma correta vale 20 pontos
  for (let [pergunta, resposta] of formData.entries()) {
    if (resposta === respostasCorretas[pergunta]) {
      pontuacao += 20;
    }
  }

  // Mostrar resultado do jogador
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.style.display = 'block';
  resultadoDiv.innerHTML = `
  <h2>Resultado</h2>
  <p>Pontuação: ${pontuacao} / 100</p>
  <h3>Respostas Corretas:</h3>
  <ul>
  <li>1. "Às 16 horas do dia 03 de fevereiro (dia de São Brás) de 1963, nesta Igreja Matriz de Nossa Senhora da Conceição...", techo da ata de instalação.</li>
  <li>2. A Igreja Matriz não possui número.</li>
  <li>3. A festa de Nossa Senhora da Conceição, nossa Padroeira, acontece no dia 08 de dezembro.</li>
  <li>4. Nosso co-Padroeiro é São José, esposo da Santíssima Virgem Maria.</li>
  <li>5. Sempre tivemos como Padroeira da Paróquia, desde a sua fundação, Nossa Senhora da Conceição.</li>
  </ul>
  `;
}
