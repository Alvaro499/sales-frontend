import { doGet, doPost, doPut } from './http.service'; //doGet, doPut
import { Category, Product } from '../models/Products.models';
//import { OkResponse, ErrorResponse } from '../models/Api.models';

const BASE_PATH = '/productos'; // Cambia esto a la ruta real de tu backend
const BASE_PATH_CATEGORIES = '/categories';

export const createProduct = async (product: Product): Promise<Response> => {
	console.log(product);
	const response = await doPost<Product, Response>(product, BASE_PATH);

	return response;
};

export const getProducts = async (): Promise<Product[]> => {
    const response = await doGet<Product[]>(BASE_PATH); // Cambia esto por la ruta correcta
    return response;
};

export const getCategories = async (): Promise<Category[]> => {
  const response = await doGet<Category[]>(BASE_PATH_CATEGORIES);
  return response;
};

export const unpublishProduct = async (productId: string, product: Product): Promise<Product> => {
    const url = `${BASE_PATH}/${productId}`;
    return await doPut<Product, Product>(product, url);
};

export const updateProduct = async (productId: string, product: Product): Promise<Product> => {
    const url = `${BASE_PATH}/${productId}`;
   return await doPut<Product, Product>(product, url);
};