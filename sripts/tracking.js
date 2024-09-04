import { getProduct, loadProducts } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
const url=new URL(window.location.href);
const productId=url.searchParams.get('productId');
const quantity=url.searchParams.get('quantity');

loadProducts(trackPage);

function trackPage()
{
  let matchingItem=getProduct(productId);
  const d=dayjs()
  
const trackHTML=`<div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on Monday, June 13
        </div>

        <div class="product-info">
          ${matchingItem.name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${matchingItem.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`
      document.querySelector('.js-main').innerHTML=trackHTML;
}
