const dotenv=require('dotenv')
const express = require('express')
const app=express()
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')
const mongoose = require('mongoose');
const flash=require('express-flash')
const session = require('express-session')
const MongoDBstore=require('connect-mongo')(session)
const passport=require('passport')

dotenv.config({ path: './config.env' })

const DB = process.env.DB.replace(
    '<password>',
    process.env.DB_PW
  );

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  const connection = mongoose.connection;
  connection.once('open', () => {
      console.log('Database connected...');
  }).catch(err => {
      console.log('Connection failed...')
  });

  const passportInit =require('./app/config/passport')
  passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

  let mongoStore = new MongoDBstore({
    mongooseConnection: connection,
    collection: 'sessions'
})
  app.use(session({
    secret:process.env.COKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.use(flash())
  



app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
module.exports=app