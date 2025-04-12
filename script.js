let currentView = 'daily';

function getTasks() {
  return JSON.parse(localStorage.getItem(currentView)) || [];
}

function saveTasks(tasks) {
  localStorage.setItem(currentView, JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  const tasks = getTasks();
  let completed = 0;

  tasks.forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="${task.completed ? 'completed' : ''}">
        ${task.text} (${task.time} mins)
      </span>
      <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${i})" />
    `;
    if (task.completed) completed++;
    taskList.appendChild(li);
  });

  updatePerformance(completed, tasks.length);
}

function updatePerformance(completed, total) {
  const stat = document.getElementById('performance-stats');
  stat.textContent = `You've completed ${completed} of ${total} ${currentView} tasks 🎉`;
}

document.getElementById('task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const text = document.getElementById('task-input').value;
  const time = document.getElementById('task-time').value;

  const tasks = getTasks();
  tasks.push({ text, time, completed: false });
  saveTasks(tasks);
  renderTasks();

  e.target.reset();
});

function toggleComplete(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}

function changeView(view) {
  currentView = view;
  renderTasks();
}

window.onload = renderTasks;
