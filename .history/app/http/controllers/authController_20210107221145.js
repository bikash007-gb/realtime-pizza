const User = require('../../models/user')
const bcrypt=require('bcrypt')
function authController(){
    return {
        login(req,res){
            res.render('auth/login')
        },
        register(req,res){
            res.render('auth/register')
        },
        postLogin(req,res){

        },
        async postRegister(req,res){
            const {name,email,password}=req.body
            // Validate request 
            if (!email||!name||!password){
                req.flash('error','All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }
            User.exists({email:email},(err,result)=>{
                if(result){
                    req.flash('error','All fields are required')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')   
                }
            })
            const hashed=await bcrypt.hash(password,10)
            const user=new User({name:name,email:email,password:hashed})

            user.save().then((user)=>{
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                    return res.redirect('/register')
             })
        }
    }
}

module.exports =authController