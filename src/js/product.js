import ProductDetails from "./productDetails.mjs";
import ExternalServices from "./externalServices.mjs";
import { getParams, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices();
const productId = getParams("product");

//console.log(dataSource.findProductById(productId));

const productInfo = new ProductDetails(productId, dataSource);
productInfo.init();
loadHeaderFooter();
// add to cart button event handler
//async function addToCartHandler(e) {
//  const nProduct = await dataSource.findProductById(e.target.dataset.id);
//  addProductToCart(nProduct);
//}

// add listener to Add to Cart button

//document
//  .getElementById("addToCart")
//  .addEventListener("click", addToCartHandler);
