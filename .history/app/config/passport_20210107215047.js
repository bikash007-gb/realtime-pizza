const LocalStrategy =require('passport-local').Strategy
const User= require('../models/user')
const bcrypt = require('bcrypt')
function init(passport){
    passport.use(new LocalStrategy({usernameField:'email'},async (email,password,done)=>{
        //check if email exists
        const user=await User.findOne({email: email})
        if(!user) {
            return done(null, false, { message: 'No user with this email' })
        }
    }))
}

module.exports=init;