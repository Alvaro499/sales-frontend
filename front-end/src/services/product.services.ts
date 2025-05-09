import { doPost } from './http.service'; //doGet, doPut
import { Product } from '../models/Products.models';
//import { OkResponse, ErrorResponse } from '../models/Api.models';

//Promise ya viene de react, es de tipo Event [], que será el campo data de la respuesta
const BASE_PATH = '/api/';

export const createProduct = async (event: Product): Promise<Response> => {
	console.log(event);
	const response = await doPost<Product, Response>(
		event,
		BASE_PATH + '/api/...' // Cambia esto por la ruta correcta
	);

	return response;
};
