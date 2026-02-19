import { saveToStorage, loadFromStorage } from "./storage.js";

let tasks = loadFromStorage("tasks");

export function getTasks() {
  return tasks;
}

export function addTask(task) {
  tasks.push(task);
  saveToStorage("tasks", tasks);
}

export function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveToStorage("tasks", tasks);
}

export function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  task.completed = !task.completed;
  saveToStorage("tasks", tasks);
}
