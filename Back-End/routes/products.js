const express = require('express');
const ProductService = require('../services/products');

function productsAPI(app) {
	const router = express.Router();
	app.use('/api/products', router);
	const productService = new ProductService();

	router.get('/:brand', async (req, res, next) => {
		productService.getProducts().then((products) => {
			res.status(200).send(products);
		});
	});
}

module.exports = productsAPI;
