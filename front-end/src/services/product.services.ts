import { doGet, doPost } from './http.service'; //doGet, doPut
import { Product } from '../models/Products.models';
//import { OkResponse, ErrorResponse } from '../models/Api.models';

const BASE_PATH = '/productos'; // Cambia esto a la ruta real de tu backend

export const createProduct = async (product: Product): Promise<Response> => {
	console.log(product);
	const response = await doPost<Product, Response>(product, BASE_PATH);

	return response;
};

export const getProducts = async (): Promise<Product[]> => {
    const response = await doGet<Product[]>(BASE_PATH); // Cambia esto por la ruta correcta
    return response;
};