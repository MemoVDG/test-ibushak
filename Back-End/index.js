const express = require('express');
const app = express();
const productsAPI = require('./routes/products');

const port = 3000;

productsAPI(app);
app.listen(port, () => console.log(`Listening in port: ${port}`));
