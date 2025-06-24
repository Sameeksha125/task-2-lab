const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

window.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', () => {
  const task = input.value.trim();
  if (task) {
    addTaskToList(task);
    saveTask(task);
    input.value = '';
  }
});

function addTaskToList(taskText, isDone = false) {
  const li = document.createElement('li');
  li.className = 'task';
  if (isDone) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = taskText;
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateLocalStorage();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', () => {
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: taskText, done: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTaskToList(task.text, task.done));
}

function updateLocalStorage() {
  const taskElements = document.querySelectorAll('.task');
  const updatedTasks = [];

  taskElements.forEach(taskEl => {
    const text = taskEl.querySelector('span').textContent;
    const done = taskEl.classList.contains('completed');
    updatedTasks.push({ text, done });
  });

  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
