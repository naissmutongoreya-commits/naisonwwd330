import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();
const selector = document.querySelector(".order-summary");
const checkout = new CheckoutProcess("so-cart", selector);
checkout.init();

const zipCode = document.querySelector("#zip");
zipCode.addEventListener("change", () => {
  if (zipCode.value.length === 0) {
    const tax = document.querySelector(".order-tax");
    tax.textContent = "";
    const shipping = document.querySelector(".order-shipping");
    shipping.textContent = "";
    const total = document.querySelector(".order-total");
    total.textContent = "";
  } else if (zipCode.value.length !== 0) {
    checkout.calculateOrderTotal();
  }
});

const form = document.querySelector("#checkout-form-id");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkout.checkout(form);
});
