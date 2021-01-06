const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
function initRoutes(app){
    app.get('/',homeController().index)
    
    app.get('/cart',(req,res)=>{
        res.render('customers/cart')
    })
    
    app.get('/login',authController().login)
    
    app.get('/register',authController().register)
}
module.exports =initRoutes