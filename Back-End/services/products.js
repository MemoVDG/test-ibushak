const axios = require('axios');
const _ = require('lodash');


/**
 * Service to consult the ML information
 * @class ProductService
 */
class ProductService {

	/**
	 * Return the array with the necesary information
	 * @async
	 * @function getProducts
	 * @return {Promise<Array>} The seller's data.
	 **/
	async getProducts() {
		let data = [];
		const products = await this.requestProductsML();
		const sellers = await this.requestSellers(products);
		// Create the return object
		products.map((product) => {
			let seller = sellers.find((x) => x.id === product.seller.id);
			
			// Find the atributes
			let attributes = {}
			product.attributes.map(r => {
				return attributes[r.name] = r.value_name
			})

			data.push({
				Meli_ID : product.id,
				Site_ID: product.site_id,
				Titulo_Publicacion: product.title,
				Marca: product.attributes.value_name,
				Envio_Gratis: product.shipping.free_shipping,
				Tipo_de_logistica: product.shipping.logistic_type,
				Precio_de_Venta: product.price,
				Link_Publicacion: product.permalink,
				Cantidad_Disponible: product.available_quantity,
				Condicion_Articulo: product.condition,
				Seller_ID: product.seller.id,
				Seller_Name: seller.nickname,
				Lugar_de_Operaciones_del_Seller: `${seller.address.city} ${seller.address.state}`,
				Attributes: attributes
			});
		});

		// Sort by price
		const dataOrderByPrice = _.sortBy(data, ['Precio_de_Venta']);
		console.log(dataOrderByPrice.length);
		return dataOrderByPrice || [];
	}
	
	/**
	 * Download the products from ML
	 * @async
	 * @function requestProductsML
	 * @return {Promise<Array>} The seller's data.
	 **/
	async requestProductsML() {
		let offset = 0;
		let products = [];
		// Get the first 1000
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
			return [];
		}
		return products;
	}

	/**
	 * Download the sellers from ML
	 * @async
	 * @function requestSellers
	 * @param {Array} url - Products array with the seller's id.
	 * @return {Promise<Array>} The seller's data.
	 * */
	async requestSellers(products) {
		// Keep just uniques seller id
		const sellers = new Set();
		products.map((product) => {
			sellers.add(product.seller.id);
		});

		return Promise.all(
			Array.from(sellers).map(async (seller) => {
				const s = await axios.get(`https://api.mercadolibre.com/users/${seller}`);
				return s.data;
			})
		);
	}
}

module.exports = ProductService;
