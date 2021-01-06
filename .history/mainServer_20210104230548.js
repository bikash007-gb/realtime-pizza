const dotenv=require('dotenv')
const mongoose = require('mongoose');

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
  .then(() => console.log('DB connection successful!'));


  const port = 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});