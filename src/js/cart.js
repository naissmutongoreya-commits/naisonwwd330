import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./shoppingCart.mjs";

//Event listener to remove item from Local Storage. It needs to be outside so that the event is put, after the whole page is rendered.

const shoppingCart = new ShoppingCart(
  "so-cart",
  ".product-list",
  ".remove-button",
);
shoppingCart.init();

loadHeaderFooter();
