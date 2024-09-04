export let cart;
export function loadLocalStorage()
{
   cart=JSON.parse(localStorage.getItem('cart'));


if(!cart)
  {
   cart=
  [ 
    {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', productQuantity: 2,
    deliveryOptionId:'1'
    }
   ,
    {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', productQuantity: 1,
    deliveryOptionId:'2'
    }];
  }
  // console.log(cart);
  
}

export function updateQuantity(productId,newQuantity)
{
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.productQuantity = newQuantity;

  saveToStorage();
}

export function addToCart(productId,quantity)
{
  // console.log(cart);
  // console.log(productId)
  let matchingItem=false;

        cart.forEach((cartItem)=>
        {
          if(cartItem.productId===productId)
          {
            cartItem.productQuantity+=quantity;
            matchingItem=true
          }
        })

        if(!matchingItem)
        { 
          cart.push({
            
            productId:productId,
            productQuantity:quantity,
            deliveryOptionId:'1'
          })
        }
saveToStorage();
}
export function removeFromCart(productid)
{
  const newCart=[];
  cart.forEach((item)=>
  {
    if(item.productId!=productid)
    {
      newCart.push(item)
    }
  })
  cart=newCart
  saveToStorage();
  console.log(cart);
  
}
export function saveToStorage()
{
  localStorage.setItem('cart',JSON.stringify(cart))
}
export function calculateCartQuantity()
{
  
  let cartQuantity=0;

        // console.log(cart);
        
        cart.forEach((cartItem)=>
        {
          // console.log(cartItem.quantity)
          cartQuantity+=cartItem.productQuantity;
        })
        return cartQuantity;
}

export function updateDeliveryOption(productId,deliveryOptionId)
{
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

