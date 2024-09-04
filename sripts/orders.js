import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {formatCurency} from "../sripts/utils/money.js"
import { getProduct, loadProducts } from "../data/products.js";
import { calculateCartQuantity, loadLocalStorage } from "../data/cart.js";
import { cart } from "../data/cart.js";
import { products } from "../data/products.js";


let ordersHTML=``
loadLocalStorage();

document.querySelector('.js-cart-quantity').innerHTML=calculateCartQuantity()
loadProducts(returnandorder);


function returnandorder()
{



  orders.forEach((order)=>
  {
    const d=dayjs(order.orderTime)
    

    ordersHTML+=`<div class="order-container">
            
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${d.format('MMMM DD')}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatCurency(order.totalCostCents)}</div>
                </div>
              </div>

              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>`

              order.products.forEach((product)=>
              {
                // console.log(product);
                const productId=product.productId;
                let matchingItem=getProduct(productId);
                // console.log(matchingItem);
                ordersHTML+=`<div class="order-details-grid">
              <div class="product-image-container">
                <img src="${matchingItem.image}">
              </div>

              <div class="product-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-delivery-date">
                  Arriving on: August 15
                </div>
                <div class="product-quantity">
                  Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary">
                  <img class="buy-again-icon" src="images/icons/buy-again.png">
                  <span class="buy-again-message">Buy it again</span>
                </button>
              </div>
              <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${productId}&deliveryDate=${order.orderTime}&quantity=${product.quantity}">
                  <button class="track-package-button button-secondary js-track-package-button">
                    Track package
                  </button>
                </a>
              </div>
            </div>
          </div>`

  })
     
})

document.querySelector('.js-order-grid').innerHTML=ordersHTML;
}
