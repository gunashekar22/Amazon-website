

export function getProduct(productId)
{
  let matchingItem;

  products.forEach((product)=>
  {
    
    if(product.id===productId)
    {
      matchingItem=product;
    }
    
  })
  return matchingItem;
}



export let products=[];

export function loadProducts(fun)
{
  const xhr=new XMLHttpRequest();
  xhr.addEventListener('load',()=>
  {
  products=JSON.parse(xhr.response);
  fun();      
  })
  xhr.open('GET','https://supersimplebackend.dev/products');
  xhr.send();
  console.log('loaded product details');

}
// loadProducts();


