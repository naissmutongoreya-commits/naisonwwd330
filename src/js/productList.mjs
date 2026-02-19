import { renderListWithTemplate } from "./utils.mjs";



export function productCardTemplate(product) {
    if (product.FinalPrice < product.SuggestedRetailPrice) {
        const newItem = `<li class="product-card">
            <a href="../product_pages/?product=${product.Id}">
              <img
                src="${product.Images.PrimaryMedium}"
                alt="${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.Name}</h2>
              <p> Suggested Price: ${product.SuggestedRetailPrice}</p>
              <p class="discount-price-p">Discount: <span class="discount-price-span">${(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100).toFixed(2)}% off (-${(product.SuggestedRetailPrice - product.FinalPrice).toFixed(2)})</span></p></a>
              <p class="product-card__price">Final Price: ${product.FinalPrice}</p>
          </li>`
        return newItem;
    } else {
        const newItem = `<li class="product-card">
        <a href="../product_pages/?product=${product.Id}">
        <img
            src="${product.Image}"
            alt="${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.Name}</h2>
        <p class="product-card__price">${product.FinalPrice}</p></a
        >
        </li>`
        return newItem;
    }


}
export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        const productHeaderCategory = document.querySelector(".product-header-category");

        //let filteredlist = list.filter(filterData);
        this.renderList(list);
        this.rendercategory(productHeaderCategory);
        const sortElement = document.getElementById("sort");
        sortElement.addEventListener("change", (event) => {
            const sortedList = this.sortList(list, event.target.value);
            this.renderList(sortedList);
        });
    }
    async renderList(list) {
        await renderListWithTemplate(productCardTemplate, this.listElement, list)
    }
    rendercategory(elem) {
        const productHeaderCategory = `Top Product: <span class="prod-cat">${this.category}</span>`;
        elem.insertAdjacentHTML("afterbegin", productHeaderCategory);
    }

    sortList(list, criteria) {
        if (criteria === "name") {
            return list.sort((a, b) => a.Name.localeCompare(b.Name));
        } else if (criteria === "price") {
            return list.sort((a, b) => a.FinalPrice - b.FinalPrice);
        }
        return list;
    }

}

//ProductListig is getting an listElement = undifined
