const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customers/cartController')
const orderController=require('../app/http/controllers/customers/orderController')
const AdminOderController=require('../app/http/controllers/admin/orderController')
const statusController=require('../app/http/controllers/admin/statusController')
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')
function initRoutes(app){
    app.get('/',homeController().index)
    
    app.get('/cart',cartController().index)
    
    app.get('/login',guest,authController().login)
    
    app.post('/login',authController().postLogin)

    app.post('/logout',authController().logout)

    app.get('/register',guest,authController().register)

    app.post('/register',authController().postRegister)

    app.post('/update-cart',cartController().update)

    app.post('/orders',auth,orderController().store)
    app.get('/customer/orders',auth,orderController().index)

    app.get('/admin/orders',admin,AdminOderController().index)

    app.post('/admin/order/status',admin,statusController().update)
}
module.exports =initRoutes