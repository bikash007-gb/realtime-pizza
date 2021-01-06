function cartController(){
    return {
        index(req,res){
            res.render('customers/cart')
        },
        update(req,res){
            // for the first time creating cart and adding basic object structure
            if(!req.session.cart){
                req.session.cart={
                    item:{},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart=req.session.cart
        }
    }
}

module.exports =cartController