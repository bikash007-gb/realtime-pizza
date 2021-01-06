let addToCart = document.querySelectorAll('.add-to-cart')

// addToCart.forEach((btn)=>{
//     btn.eventListener('click',(e)=>{
//         let pizza=btn.dataset.pizza
//         console.log(pizza)
//     })
// })

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza)
        console.log(pizza)
    })
})