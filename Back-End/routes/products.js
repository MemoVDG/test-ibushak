const express = require('express');
const ProductService = require('../services/products');

/**
 * Endpoints to get ML information
 * @function productsAPI
 * @param  express foo express object
 * @return {[type]}     [description]
 */
function productsAPI(app) {
	const router = express.Router();
	app.use('/api/products', router);
	const productService = new ProductService();

	router.get('/', async (req, res, next) => {
		productService.getProducts()
		.then((products) => {
			res.status(200).send(products);
		}).catch(err => {
			next(err);
		});
	});
}

module.exports = productsAPI;
