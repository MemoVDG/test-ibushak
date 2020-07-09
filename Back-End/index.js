const express = require('express');
const app = express();
const productsAPI = require('./routes/products');
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world');
  });

productsAPI(app);
app.listen(process.env.PORT || port, () => console.log(`Listening in port: ${port}`));
