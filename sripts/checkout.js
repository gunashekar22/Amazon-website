import { loadLocalStorage } from "../data/cart.js";
import { renderOrderSummary } from "./checkout/ordersummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js'
import { loadProducts } from "../data/products.js";


async function loadPage()
{
  console.log('load page');
  
}
loadPage().then(()=>
{
  console.log('1');
  
})
loadPage();


new Promise((resolve,reject)=>
  {
    console.log(`start`);
    loadProducts(()=>
      {
        resolve();

      })
    
  }).then(()=>
  {
    console.log('start page');
    
    renderPaymentSummary();
        renderOrderSummary();
  })



 
