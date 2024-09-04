
// import { products } from "../data/backend-practise.js";
import { cart,addToCart, calculateCartQuantity, loadLocalStorage } from "../data/cart.js";
import { products,loadProducts } from "../data/products.js";

import { formatCurency } from "./utils/money.js";

// loadProducts();
loadLocalStorage();



function updateCartQuantity()
{
  let cartQuantity=calculateCartQuantity()

    
          document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
         
}
function checkmarkMessage(productId)
{
  const addedMessage= document.querySelector(`.js-added-to-cart-${productId}`);
        
        
        addedMessage.classList.add('added-to-cart-visible');
        let x=0;
        if(!x)
        {
          clearTimeout(x);
        }
        x=setTimeout(() => {
          addedMessage.classList.remove('added-to-cart-visible')
        }, 2000);
}
export function renderProductSummary()
{


  let productsHtml='';
  products.forEach((product)=>
    {
      const html=` <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars*10}.png">
              <div class="product-rating-count link-primary">
              ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${formatCurency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>


            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`
          productsHtml+=html;
          
          
      
    })
    
    document.querySelector('.js-product-grid').innerHTML=productsHtml;
    document.querySelectorAll('.js-add-to-cart').forEach(
      (button)=>
      {
        button.addEventListener('click',()=>
        {
          
          let {productId} =button.dataset;
          
          
          const quantitySelector = document.querySelector(
            `.js-quantity-selector-${button.dataset.productId}`); 
            const quantity=Number(quantitySelector.value);
         
          checkmarkMessage(productId);
        
          addToCart(productId,quantity);
          updateCartQuantity(productId,quantity);
     
        })
        
        
      }) 
}
loadProducts(renderProductSummary)

updateCartQuantity();
    
  
  
