const express = require('express')
const app=express()
const ejs=require('ejs')
const expressLayout=require('express-ejs-layout')

const PORT = process.env.PORT || 3000
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

const server = app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})