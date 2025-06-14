const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const currentTime = document.getElementById('currentTime');

function updateTime() {
  const now = new Date();
  currentTime.textContent = now.toLocaleString();
}
setInterval(updateTime, 1000);
updateTime();

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTask(taskText);
    taskInput.value = '';
  }
});

function addTask(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const actions = document.createElement('div');
  actions.classList.add('task-actions');

  const checkBtn = document.createElement('button');
  checkBtn.innerHTML = '✔️';
  checkBtn.onclick = () => li.classList.toggle('completed');

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '🗑️';
  deleteBtn.onclick = () => li.remove();

  actions.appendChild(checkBtn);
  actions.appendChild(deleteBtn);
  li.appendChild(actions);

  taskList.appendChild(li);
}
