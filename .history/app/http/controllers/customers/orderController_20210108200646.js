const Order=require('../../../models/order')
function orderController(){
    return {
        store(req,res){
            const {phone,address}=req.body;
            if(!phone||!address){
                req.flash('error','All fields are required')
                return res.redirect('/cart')
            }
            const order=new Order({
                customerId: req.user._id,
                items:req.session.cart.items,
                phone,
                address
            })
            order.save().then(result =>{
                req.flash('success','order placed successfully')
                return res.redirect('/')
            }).catch(err =>{
                req.flash('error','Something went wrong')
                res.redirect('/cart')
            })
        },
        async index(req, res){
            const order=await Order.find({customerId: req.user._id})
            res.render('customer/orders',{orders:orders})
        }
    }
}
module.exports =orderController