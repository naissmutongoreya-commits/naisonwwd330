import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./externalServices.mjs";
import { alertMessage } from "./utils.mjs";


const dataSource = new ExternalServices();

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        return {
            id: item.Result.Id,
            name: item.Result.Name,
            price: item.Result.FinalPrice,
            quantity: 1
        };
    });
    return simplifiedItems;
}

function formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const data = {};
    formData.forEach(function (value, key) {
        data[key] = value;
    });
    return data;
}



export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }
    calculateItemSummary() {
        this.itemTotal = this.list.reduce((acc, item) => acc + item.Result.FinalPrice, 0);
        const subtotal = document.querySelector(".order-subtotal");
        subtotal.textContent = `Subtotal: $${this.itemTotal.toFixed(2)} for ${this.list.length} item(s)`;
        
    }
    calculateOrderTotal() {
        this.shipping = 10 + ((this.list.length-1) * 2);
        this.tax = this.itemTotal * 0.06;
        this.orderTotal = this.itemTotal + this.shipping + this.tax;
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        const shipping = document.querySelector(".order-shipping");
        const tax = document.querySelector(".order-tax");
        const total = document.querySelector(".order-total");
        shipping.textContent = `Shipping: $${this.shipping.toFixed(2)}`;
        tax.textContent = `Tax: $${this.tax.toFixed(2)}`;
        total.textContent = `Total: $${this.orderTotal.toFixed(2)}`;
    }
    async checkout() {
        const formElement = document.querySelector("#checkout-form-id");
        const json = formDataToJSON(formElement);
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);

        try {
            const response = await dataSource.checkout(json);
            //console.log(response);
            //alert("Order Submitted");
            window.location.replace("../checkout/success.html");
            localStorage.removeItem("so-cart");
        } catch (error) {
            const alertError = await error;
            const alertE = await alertError.message;
            const errorList = Object.values(alertE);
            for (let a in errorList) {
                alertMessage(errorList[a]);
            }
        }
    }
}