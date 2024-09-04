import { calculateCartQuantity, cart,loadLocalStorage,updateDeliveryOption } from "../../data/cart.js";
import { getProduct} from "../../data/products.js";
import { formatCurency } from "../utils/money.js";
import { removeFromCart } from "../../data/cart.js";
import {updateQuantity} from "../../data/cart.js";

import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
// import { renderPaymentSummary } from "./paymentSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
loadLocalStorage();

// renderOrderSummary();



export function renderOrderSummary()
{


    let cartSummaryHtml='';

    updateCartQuantity();
    cart.forEach((cartItem)=>
    {
  
    const {productId}=cartItem;
    const {productQuantity}=cartItem;


    let matchingItem=getProduct(productId);

    

    if (!matchingItem) {
      
      return; 
    }
 
    const {deliveryOptionId}=cartItem;

    let deliveryOption=getDeliveryOption(deliveryOptionId);


    const today=dayjs();
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
    const dateString=deliveryDate.format('dddd, MMMM D');

      
      
      cartSummaryHtml+=`<div class="cart-item-container js-cart-tem-container-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    $${formatCurency(matchingItem.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}" >${cartItem.productQuantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${matchingItem.id}" data-product-id=${matchingItem.id}>
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingItem.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${matchingItem.id} >Save</span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingItem.id}>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>

                  ${deliveryOptionHTML(matchingItem,cartItem)}
                  
                  
                </div>
              </div>
            </div>`
    });

    document.querySelector('.js-order-summary').innerHTML=cartSummaryHtml
    document.querySelectorAll('.js-delete-link').forEach((link)=>
    {
      link.addEventListener('click',()=>
      {
        const productid=link.dataset.productId;
       
        removeFromCart(productid);
        
        updateCartQuantity();
        renderPaymentSummary();
        renderOrderSummary();
        renderCheckoutHeader();

      })
    }
    )
    function updateCartQuantity()
    {
    let cartQuantity=calculateCartQuantity();

           
            document.querySelector('.return-to-home-link').innerHTML=`${cartQuantity} items`;
            
    }
    document.querySelectorAll('.js-update-quantity-link').forEach((link)=>
    {
    link.addEventListener('click',()=>
    {
      const productId=link.dataset.productId
      const container=document.querySelector(`.js-cart-tem-container-${productId}`).classList;

      container.add('is-editing-quantity');
      document.querySelector(`.js-update-quantity-link-${productId}`).innerHTML='';
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML='';
      
      
      
    })


    })
    document.querySelectorAll(`.js-save-quantity-link`).forEach((link)=>
    {
    link.addEventListener('click',()=>
    {

      const productId=link.dataset.productId;
      const value=document.querySelector(`.js-quantity-input-${productId}`).value
      if(value>=0 && value<1000)
      {

      
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML=value;
      

      document.querySelector(`.js-update-quantity-link-${productId}`).innerHTML='Update';
      const container=document.querySelector(`.js-cart-tem-container-${productId}`).classList;
      container.remove('is-editing-quantity');
    
      updateQuantity(productId,Number(value));
      updateCartQuantity();
      
      }
      else{
        alert('entered negative value')
        
      }
      renderPaymentSummary();
      
      
    })
    })
    function deliveryOptionHTML(matchingItem,cartItem)
    {
    let html=``
    deliveryOptions.forEach((deliveryOption)=>
    {
      const today=dayjs();
      const deliveryDate=today.add(deliveryOption.deliveryDays,'days');
      const dateString=deliveryDate.format('dddd, MMMM D')
      const priceCents=deliveryOption.priceCents===0?
      'FREE':`$${formatCurency(deliveryOption.priceCents)}`
      const isChecked=deliveryOption.id===cartItem.deliveryOptionId;
      // console.log(isChecked);
      // When displaying these options in the cart, each option is compared against the delivery option that was previously selected for each cart item using the isChecked logic. The user can see the different delivery options, and the one that matches the deliveryOptionId of the cart item will be preselected.
      //
      html+=`<div class="delivery-option js-delivery-options"
              data-product-id=${matchingItem.id}
              data-delivery-option-id=${deliveryOption.id}>
                    <input type="radio" 
                    ${isChecked? 'checked': ''}
                    
                    class="delivery-option-input"
                      name="delivery-option-${matchingItem.id}">
                    <div>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceCents} - Shipping
                      </div>
                    </div>
                  </div>`
    })
    return html
    }
    document.querySelectorAll('.js-delivery-options').forEach((element)=>
    {
    element.addEventListener('click',()=>
    {
      const {productId,deliveryOptionId}=element.dataset;
      updateDeliveryOption(productId,deliveryOptionId)
      renderOrderSummary()
      renderPaymentSummary()
    })
    })
}








              
          
  


