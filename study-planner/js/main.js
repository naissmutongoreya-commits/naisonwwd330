import { addTask } from "./tasks.js";
import { renderTasks } from "./ui.js";
import { searchBooks, searchDefinition } from "./api.js";

/* ===============================
   TASK SECTION
================================ */

document.getElementById("add-task").addEventListener("click", () => {
  const titleInput = document.getElementById("task-title");
  const subjectInput = document.getElementById("task-subject");
  const dateInput = document.getElementById("task-date");

  const title = titleInput.value.trim();
  const subject = subjectInput.value.trim();
  const date = dateInput.value;

  if (!title || !subject || !date) {
    alert("Please fill in all fields.");
    return;
  }

  const task = {
    id: Date.now(),
    title,
    subject,
    date,
    completed: false,
  };

  addTask(task);
  renderTasks();

  titleInput.value = "";
  subjectInput.value = "";
  dateInput.value = "";
});

/* ===============================
   BOOK SEARCH
================================ */

document.getElementById("search-books").addEventListener("click", async () => {
  const query = document.getElementById("search-input").value.trim();
  const resultsContainer = document.getElementById("results");

  if (!query) return;

  resultsContainer.innerHTML = "Loading books...";

  const books = await searchBooks(query);
  displayBooks(books);
});

/* ===============================
   DICTIONARY SEARCH
================================ */

document
  .getElementById("search-definition")
  .addEventListener("click", async () => {
    const word = document.getElementById("search-input").value.trim();
    const resultsContainer = document.getElementById("results");

    if (!word) return;

    resultsContainer.innerHTML = "Loading definition...";

    const definition = await searchDefinition(word);
    displayDefinition(definition);
  });

/* ===============================
   DISPLAY BOOKS
================================ */

function displayBooks(items) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!items.length) {
    container.textContent = "No books found.";
    return;
  }

  items.forEach((item) => {
    const book = item.volumeInfo;

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.authors ? book.authors.join(", ") : "Unknown Author"}</p>
      <a href="${book.previewLink}" target="_blank">Preview</a>
    `;

    container.appendChild(card);
  });
}

/* ===============================
   DISPLAY DEFINITION
================================ */

function displayDefinition(entry) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  if (!entry) {
    container.textContent = "No definition found.";
    return;
  }

  const meaning = entry.meanings[0].definitions[0].definition;

  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <h3>${entry.word}</h3>
    <p>${meaning}</p>
  `;

  container.appendChild(card);
}

/* ===============================
   INIT
================================ */

renderTasks();
