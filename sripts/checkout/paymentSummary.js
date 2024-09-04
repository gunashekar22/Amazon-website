 import { calculateCartQuantity, cart } from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";
 import { getProduct } from "../../data/products.js";
import formatCurency from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
 
 export function renderPaymentSummary()
{
  
  let productPriceCents=0;
  let shippingPriceCents=0;


 cart.forEach((cartItem) => {
  const product=getProduct(cartItem.productId);

  productPriceCents+=product.priceCents*cartItem.productQuantity
  const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId)
  shippingPriceCents+=deliveryOption.priceCents
  
  
  
  
  
  
 });
const totalBeforeTaxCents=productPriceCents+shippingPriceCents
 const taxCents=totalBeforeTaxCents*0.1;
 const totalCents=totalBeforeTaxCents+taxCents;
 const paymentSummaryHTML=`

        
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${calculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurency(totalBeforeTaxCents+shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-palce-order">
            Place your order
          </button>`
    
 
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;
  
  const cart1 = cart.map(item => {
    return {
      productId: item.productId,
      quantity: item.productQuantity,
      deliveryOptionId: item.deliveryOptionId
    };
  });

  document.querySelector('.js-palce-order').addEventListener('click',async ()=>
  {
    const response=await fetch('https://supersimplebackend.dev/orders',{
      method:'POST',
      headers:{
        'content-Type':'application/json'
      },
      body:JSON.stringify({cart:cart1})
      
      
    })
   const order= await response.json();
   addOrder(order);
 
   
  })
}