const axios = require('axios');
const _ = require('lodash');

const anAsyncFunction = async (sellerID) => {
	const res = await axios.get(`https://api.mercadolibre.com/users/${sellerID}`);
	return res.data;
};

class ProductService {
	async getProducts() {
		let data = [];
		const products = await this.requestProductsML();
		const sellers = await this.requestSellers(products);

		// Create the return object
		products.map((product) => {
			let seller = sellers.find((x) => x.id === product.seller.id);
			data.push({
				Seller_ID: product.seller.id,
				Seller_Name: seller.nickname,
				Marca: product.attributes.value_name,
				Envio_Gratis: product.shipping.free_shipping,
				Tipo_de_logistica: product.shipping.logistic_type,
				Precio_de_Venta: product.price,
				Lugar_de_Operaciones_del_Seller: `${seller.address.city} ${seller.address.state}`,
				Condicion_articulo: product.condition,
			});
		});

		const dataOrderByPrice = _.sortBy(p, ['Precio_de_Venta']); //

		return dataOrderByPrice || [];
	}

	async requestProductsML() {
		let offset = 0;
		let products = [];
		try {
			while (offset < 1000) {
				const response = await axios.get(
					`https://api.mercadolibre.com/sites/MLM/search?category=MLM1055&sort=price_desc&offset=${offset}`
				);
				response.data.results.map((product) => {
					products.push(product);
				});
				offset += 50;
			}
		} catch (err) {
			console.log(err);
		}
		return products;
	}

	async requestSellers(products) {
		// Leave just unique seller id
		const sellers = new Set();
		products.map((product) => {
			sellers.add(product.seller.id);
		});

		// Get the seller information
		return Promise.all(
			Array.from(sellers).map(async (seller) => {
				const s = await axios.get(`https://api.mercadolibre.com/users/${seller}`);
				return s.data;
			})
		);
	}
}

module.exports = ProductService;
