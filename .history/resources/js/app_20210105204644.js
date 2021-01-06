let addToCart=document.querySelector('.add-to-cart')

addToCart.forEach((btn)=>{
    btn.eventListener('click',(e)=>{
        let pizza=btn.dataset.pizza
        console.log(pizza)
    })
})