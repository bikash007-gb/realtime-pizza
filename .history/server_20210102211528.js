const express = require('express')
const PORT = process.env.PORT || 3000

const app=express()

const server = app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})