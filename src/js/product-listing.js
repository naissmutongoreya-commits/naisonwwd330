import ExternalServices from "./externalServices.mjs";

import ProductListing from "./productList.mjs";
import { loadHeaderFooter, getParams } from "./utils.mjs";

const category = getParams("category");

const productData = new ExternalServices();
const example = document.querySelector(".product-list");
const productList = new ProductListing(category, productData, example);

productList.init();
loadHeaderFooter();
