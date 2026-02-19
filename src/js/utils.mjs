import { breadCrumb } from "./breadCrumbs";
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key)
};

export function alertMessage(message, scroll=true) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  const alertMsg = document.createElement("p");
  alertMsg.textContent = message
  const alertButton = document.createElement("button");
  alertButton.textContent = "X"
  alert.appendChild(alertMsg);
  alert.appendChild(alertButton);
  alertButton.classList.add("alert-button")
  alert.addEventListener("click", (e) => {
    if (e.target.tagName) {
      const main = document.querySelector("main")
      main.removeChild(alert);
    }
  })
  const main = document.querySelector("main");
  main.prepend(alert);
  if (scroll) {
    window.scrollTo(0,0);
  }
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param)
  return product
}

export function renderListWithTemplate(productCardTemplate, parentElement, list, position = "afterbegin", clear = false) {
  if (clear == true) {
    while (parentElement.hasChildNodes()) {
      parentElement.removeChild(parentElement.firstChild);
    }
  } else {
    const newList = list;
    parentElement.insertAdjacentHTML(position, newList.map((item) => productCardTemplate(item)).join(""));
  }
}

function renderWithTemplate(template, parentElement, position = "afterbegin", clear = false) {
  const newTemplate = template.content.cloneNode(true);
  parentElement.appendChild(newTemplate);
}

export async function loadHeaderFooter() {
  const header = document.querySelector("#main-header");
  const footer = document.querySelector("#main-footer");

  const footerPath = "/partials/footer.html";
  const headerPath = "/partials/header.html";

  const footerTemplate = await loadTemplate(footerPath);
  const headerTemplate = await loadTemplate(headerPath);

  renderWithTemplate(headerTemplate, header);
  renderWithTemplate(footerTemplate, footer);

  breadCrumb();
  searchProducts();
}


export async function loadTemplate(path) {
  const response = await fetch(path);
  const html = await response.text();
  const template = document.createElement("template");
  template.innerHTML = html;
  return template;
}

function searchProducts() {
  const sButton = document.getElementById("searchButton");
  sButton.addEventListener("click", function (e) {
    const searchTerm = document.getElementById("searchInput").value;

    performSearch(searchTerm);
  });
}

export function performSearch(term) {
  console.log("Performing search for:", term);

  //URL with the search term as a query parameter
  const searchParams = new URLSearchParams();
  searchParams.append("category", term);

  //get the current URL without the query string
  const baseUrl = `${window.location.origin}/`;
  console.log("Base URL:", baseUrl);

  //construct the full Url
  const newUrl = `product-listing/index.html?${searchParams.toString()}`;
  console.log("New URL:", newUrl);

  //navigate to new Url
  window.location.href = baseUrl + newUrl;
}