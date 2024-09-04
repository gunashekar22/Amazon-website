// function Cart()
// {

// }

const cart={
   cartItems:undefined,
   loadLocalStorage() {
    cart.cartItems=JSON.parse(localStorage.getItem('cart'));
    if(!this.cartItems)
    {
      this.cartItems=
    [ 
      {productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', productQuantity: 2,
      deliveryOptionId:'1'
      }
    ,
      {productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d', productQuantity: 1,
      deliveryOptionId:'2'
      }
    ];
    }
    },
    saveToStorage()
    {
      localStorage.setItem('cart',JSON.stringify(cart))
    },

    addToCart(productId,quantity)
    {

      let matchingItem=false;

            this.cart.forEach((cartItem)=>
            {
              if(cartItem.productId===productId)
              {
                cartItem.productQuantity+=quantity;
                matchingItem=true
              }
            })
            if(!matchingItem)
            {
              this.cart.push({
                productId:productId,
                productQuantity:quantity,
                deliveryOptionId:'1'
              })
            }
    this.saveToStorage();
    },
      updateQuantity(productId,newQuantity)
      {
        let matchingItem;

        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });

        matchingItem.productQuantity = newQuantity;

        saveToStorage();
      },
      removeFromCart(productid)
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
        
      },
      updateDeliveryOption(productId,deliveryOptionId)
      {
        let matchingItem;

        cart.forEach((cartItem) => {
          if (productId === cartItem.productId) {
            matchingItem = cartItem;
          }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        saveToStorage();
      },
      calculateCartQuantity()
      {
        let cartQuantity=0;
              cart.forEach((cartItem)=>
              {
                cartQuantity+=cartItem.productQuantity;
              })
              return cartQuantity;
      }

   }
cart.loadLocalStorage();
// console.log(cart);
// cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
// console.log(cart.calculateCartQuantity());

