require('dotenv').config();
const app = require('./app');
const productRoute = require('./src/routes/products');
const userRoute = require('./src/routes/users');

const PORT = process.env.PORT || 8000;

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Express server listening on ${PORT}`);
  }
});
