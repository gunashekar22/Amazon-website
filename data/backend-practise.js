const xhr=  new XMLHttpRequest();

xhr.addEventListener('load',()=>
{
 
  JSON.parse(xhr.response)
  
});
xhr.open('GET','https://supersimplebackend.dev/products');
xhr.send();
