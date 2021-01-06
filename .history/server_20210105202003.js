const dotenv=require('dotenv')
const express = require('express')
const app=express()
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')
const session = require('express-session')
const flash=require('express-flash')
const MongoDBstore=require('connect-mongo')(session)
dotenv.config({ path: './config.env' })



app.use(flash())

app.use(express.static('public'))
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)


module.exports=app