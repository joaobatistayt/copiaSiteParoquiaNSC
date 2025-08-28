// Pegando elemento do HTML 

const typeInput = document.getElementById("type-input");
const localInput = document.getElementById("local-input");
const dateInput = document.getElementById("date-input");
const complementoInput = document.getElementById("complemento-input");
const addTaskBtn = document.getElementById("add-task-btn");
const saveTasksBtn = document.getElementById("save-tasks-btn");
const taskList = document.getElementById("task-list");

let activities = [];
// Função que exibe os agendamentos salvos na tela
function renderTasks() {
  taskList.innerHTML = ""; 
  activities.sort((a, b) => {
  const typeA = a.type || "";
  const typeB = b.type || "";
  return typeA.localeCompare(typeB);
});

  activities.forEach((activity, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <span><strong>Tipo de Celebração:</strong> ${activity.type}</span><br><br>
        <span><strong>Data da Celebração:</strong> ${formatDate(activity.date)}</span><br><br>
        <span><strong>Local da Celebração:</strong> ${activity.local}</span><br><br>
        <span><strong>Complemento:</strong> ${activity.complemento}</span>
      </div>
      <button class="delete-btn">Remover</button>
    `;

    if (activity.done) {
      li.classList.add("done");
    }

    li.addEventListener("click", () => {
      activities[index].done = !activities[index].done;
      renderTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", (event) => {
      event.stopPropagation();
      activities.splice(index, 1);
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

// Solicitar um novo agendamento de celebração
addTaskBtn.addEventListener("click", () => {
  const type = typeInput.value.trim();
  const local = localInput.value.trim();
  const date = dateInput.value.trim();
  const complemento = normalizeText(complementoInput.value.trim());

  if (type !== "" && local !== "" && date !== "" && complemento !== "") {
    activities.push({ type:type, local:local, date:date, complemento:complemento,done: false });
    typeInput.value = "";
    localInput.value = "";
    dateInput.value = "";
    complementoInput.value = "";
    typeInput.focus();
    localStorage.setItem("tarefasKey", JSON.stringify(activities));
    alert("Solicitação enviada com sucesso!");
    renderTasks();
  } else {
    alert("Preencha todos os campos antes de enviar a solicitação!");
  }

});

saveTasksBtn.addEventListener("click", () => {
  localStorage.setItem("tarefasKey", JSON.stringify(activities));
  alert("Lista de solicitações atualizada com sucesso!");
//   localStorage.setItem("tarefasKey", JSON.stringify(activities)); 
  renderTasks();
});

// Carrega tarefas do localStorage ao iniciar
function loadTasks() {
  const stored = localStorage.getItem("tarefasKey");
  if (stored) {
    activities = JSON.parse(stored);
    renderTasks();
  }
}
// Inicializa carregando as tarefas
loadTasks();

function formatDate(isoDate) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

function normalizeText(text) {
  return text.normalize("NFD") // separa os acentos
             .replace(/[\u0300-\u036f]/g, "") // remove os acentos
             .toUpperCase(); // deixa tudo em maiúsculo
}
