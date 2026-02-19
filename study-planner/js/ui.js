import { getTasks, deleteTask, toggleComplete } from "./tasks.js";

export function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  getTasks().forEach((task) => {
    const li = document.createElement("li");
    li.textContent = `${task.title} - ${task.subject} (${task.date})`;

    if (task.completed) {
      li.style.textDecoration = "line-through";
    }

    li.addEventListener("click", () => toggleComplete(task.id));

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
