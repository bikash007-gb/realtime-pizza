let addToCart = document.querySelectorAll('.add-to-cart')


addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza)
        console.log(pizza)
    })
})