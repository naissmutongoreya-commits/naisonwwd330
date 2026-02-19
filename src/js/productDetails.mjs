import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails(this.product);

    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document.getElementById('addToCart')
      .addEventListener('click', () => { this.addProductToCart(this.product) });
  }

  moveToCart(productId) {
    const currentWishlist = getLocalStorage("wishlist") || [];
    const productIndex = currentWishlist.findIndex(item => item.Result.Id === productId);

    if (productIndex > -1) {
      const product = currentWishlist[productIndex];
      this.addToCart(product); // Reuse the existing addToCart method
      currentWishlist.splice(productIndex, 1); // Remove from wishlist
      setLocalStorage("wishlist", currentWishlist);
      this.renderWishlist(); // Re-render wishlist
    }
  }

  addProductToCart(product) {
    // product should be an array
    const currentCart = getLocalStorage("so-cart") || [];
    currentCart.push(product);
    setLocalStorage("so-cart", currentCart);
    alertMessage(`You Have Successfully Added ${product.Result.Brand.Name} in Your Cart`);
    const cartIcon = document.querySelector(".cart");
    cartIcon.id = "cart-icon-id";
  }

  addToWishlist(product) {
    const currentWishlist = getLocalStorage("wishlist") || [];

    const existingProductIndex = currentWishlist.findIndex(item => item.Result.Id === product.Result.Id);

    if (existingProductIndex === -1) {
      // Add the product to the wishlist
      currentWishlist.push(product);
      setLocalStorage("wishlist", currentWishlist);
      alert("Added to wishlist!");
    } else {
      alert("Item already in wishlist!");
    }
  }

  renderProductDetails(product) {
    const html = document.querySelector(".product-detail")
    if (product.Result.FinalPrice < product.Result.SuggestedRetailPrice) {
      //added the discount flag on the product details page
      const newProduct = `<section class="product-detail">
        <p class="product__discount">⚑ Discount: <span class="discount-price-span">${(((product.Result.SuggestedRetailPrice - product.Result.FinalPrice) / product.Result.SuggestedRetailPrice) * 100).toFixed(2)}% off (-${(product.Result.SuggestedRetailPrice - product.Result.FinalPrice).toFixed(2)})</span></p>
        <h3>${product.Result.Brand.Name}</h3>
  
        <h2 class="divider">${product.Result.Name}</h2>
  
        <img
          class="divider"
          src="${product.Result.Images.PrimaryLarge}"
          alt="${product.Result.Name}"
        />
  
        <p class="product-card__price">${product.Result.FinalPrice}</p>
  
        <p class="product__color">${product.Result.Colors[0].ColorName}</p>
  
        <p class="product__description">${product.Result.DescriptionHtmlSimple}</p>
  
        <div class="product-detail__add">
          <button id="addToCart" data-id=${product.Result.Id}>Add to Cart</button>
           <button id="addToWishlist" data-id=${product.Result.Id}>Add to Wishlist</button>
        </div>
      </section>`
      html.innerHTML = newProduct;
    } else {
      const newProduct = `<section class="product-detail">
        <h3>${product.Result.Brand.Name}</h3>
  
        <h2 class="divider">${product.Result.Name}</h2>
  
        <img
          class="divider"
          src="${product.Result.Images.PrimaryLarge}"
          alt="${product.Result.Name}"
        />
  
        <p class="product-card__price">${product.Result.FinalPrice}</p>
  
        <p class="product__color">${product.Result.Colors[0].ColorName}</p>
  
        <p class="product__description">${product.Result.DescriptionHtmlSimple}</p>
  
        <div class="product-detail__add">
          <button id="addToCart" data-id=${product.Result.Id}>Add to Cart</button>
          <button id="addToWishlist" data-id=${product.Result.Id}>Add to Wishlist</button>
        </div>
      </section>`
      html.innerHTML = newProduct;
    }

    // Add event listener for wishlist button
    document.getElementById('addToWishlist').addEventListener('click', () => {
      this.addToWishlist(product);
    });
  }
}