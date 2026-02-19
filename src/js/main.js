import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const closeBtn = document.querySelector(".close-btn");
const signUpBtn = document.querySelector(".sign-up-btn");

//i'm sure these functions below can be integrated in the utils.mjs module. But chose to placed it here to
//allow my teammates easily see the mini update.
//added eventlistener to the closebtn to permit closure of the pop up box
closeBtn.addEventListener("click", () => {
  const popUpBox = document.querySelector(".pop-up-box");
  popUpBox.style.display = "none";
});

//added eventlistener to take user to sign up page in another tab when the sign up btn is clicked
signUpBtn.addEventListener("click", () => {
  window.open("../signup/index.html");
  const popUpBox = document.querySelector(".pop-up-box");
  popUpBox.style.display = "none";
});

//create a function to chaange the display of the pop up box to block
function myFunction() {
  const popUpBox = document.querySelector(".pop-up-box");
  popUpBox.style.display = "block";
}

//checked when the window has loaded all before displaying the pop-box
window.addEventListener("load", () => {
  myFunction();
});

const shoppingCart = new shoppingCart(
  "so-cart",
  ".cart-container",
  ".remove-button",
);
shoppingCart.init();
