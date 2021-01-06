const dotenv=require('dotenv')
const mongoose = require('mongoose');
const session = require('express-session')
const MongoDBstore=require('connect-mongo')(session)

dotenv.config({ path: './config.env' })
const app = require('./server');

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
  const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});