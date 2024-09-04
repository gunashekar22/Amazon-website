import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader()
{
  cartQuantity =calculateCartQuantity();
  document.querySelector('.return-to-home-link').innerHTML=`${cartQuantity} items`;
}