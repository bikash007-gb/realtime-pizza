let addToCart=document.querySelector('.add-to-cart')

addToCart.forEach((btn)=>{
    btn.eventListener('click',(e)=>{
        console.log(e)
    })
})