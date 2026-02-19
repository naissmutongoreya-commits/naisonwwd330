import { setLocalStorage, getLocalStorage, getParams } from "./utils.mjs";

export function breadCrumb() {
  //Get the element from the current page.
  const link = document.getElementById("last-page-link");

  //If the path name iquals to only / or iquals to /index.html (because both exists)
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html"
  ) {
    //Create in the localStorage a current-page key with the link of the current webpage
    setLocalStorage("current-page", window.location.href);

    // This should be called whne selecting a product, but it isn't being called. You finish this and you're done.
  } else if (getLocalStorage("list-items")) {
    //Change the inner HTML from the breadCrumb so that it shows the category from the old page that the user entered
    link.innerHTML = getLocalStorage("list-items");

    //Gets the category name from the page and stores it into param
    const param = getParams("category");

    //Creates a list-items key for localStorage and stores the category from the old page.
    setLocalStorage("list-items", param);

    //Create and store in local storage an key called last-page and stores the link inside the current-page key from local storage
    setLocalStorage("last-page", getLocalStorage("current-page"));

    //Set the current-page localStorage key with the current link in the webpage.
    setLocalStorage("current-page", window.location.href);

    //Add an event for when the user clicks that category to go back to that page.
    link.addEventListener("click", changeURL(link));

    //If in the local storage the link in the current-page key is not equal to /index.html or /
  } else if (
    getLocalStorage("current-page") === "/index.html" ||
    getLocalStorage("current-page") !== "/"
  ) {
    //Gets the category name from the page and stores it into param
    const param = getParams("category");

    //Creates a list-items key for localStorage and stores the category from the old page.
    setLocalStorage("list-items", param);

    //Create and store in local storage an key called last-page and stores the link inside the current-page key from local storage
    setLocalStorage("last-page", getLocalStorage("current-page"));

    //Set the current-page localStorage key with the current link in the webpage.
    setLocalStorage("current-page", window.location.href);
  } else {
    console.error("There is no link");
  }
}

//This function gets the html element and modify the href to the old web page, so that when it's cliked, it sends the user back.
function changeURL(htmlElement) {
  const path = getLocalStorage("last-page");
  if (htmlElement) {
    htmlElement.href = path;
  }
}
