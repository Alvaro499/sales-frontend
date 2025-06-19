import { ventasApi } from './clients.service';
import { Category, Product } from '../models/Products.models';
import { ErrorResponse } from '../models/Api.models';


const BASE_PATH = 'api/products';
const BASE_PATH_CATEGORIES = 'api/categories';

export const createProduct = async (product: Product): Promise<Product | ErrorResponse> => {
	try {
		const productRequest: any = {
			name: product.name,
			description: product.description,
			price: product.price,
			category: product.category,
			images: product.images,
			available: product.available,
			promotion: product.promotion ? String(product.promotion) : '0',
			stock: product.stock,
			pymeId: product.pyme_id,
		};
		return await ventasApi.doPost<any, Product>(productRequest, BASE_PATH);
	} catch (error) {
		return {
			message: 'Error al crear producto',
			code: 500,
			params: 'CREATE_PRODUCT_ERROR',
		};
	}
};

export const getProducts = async (): Promise<Product[]> => {
    const url = `${BASE_PATH}/search`;  // URL correcta de la API
    const response = await ventasApi.doGet<{ message: string; data: Product[] }>(url);
    console.log('Respuesta de productos:', response); // Verifica la respuesta en la consola
    return response.data;  // Aquí estamos accediendo a la propiedad 'data' que contiene los productos
};



export const getCategories = async (): Promise<Category[]> => {
	return await ventasApi.doGet<Category[]>(BASE_PATH_CATEGORIES);
};

export const getProductById2 = async (id: string): Promise<Product> => {
	return await ventasApi.doGet<Product>(`${BASE_PATH}/${id}`);
};

export const getProductById = async (id: string): Promise<Product[]> => {
	const response = await ventasApi.doGet<{ message: string; data: any[] }>(`${BASE_PATH}/by-pyme/${id}`);

	const products: Product[] = response.data.map(item => ({
		id: item.id,
		name: item.name,
		description: item.description,
		price: item.price,
		category: item.category ? item.category.map((cat: { name: string }) => cat.name) : null,
		images: item.images ? item.images.map((img: { url: string }) => img.url) : [],
		available: item.available,
		promotion: item.promotion,
		stock: item.stock,
		pyme_id: item.pyme_id,
	}));
	return products;
};


export const unpublishProduct = async (
	productId: string,
	product: Product
): Promise<Product | ErrorResponse> => {
	try {
		const url = `${BASE_PATH}/unpublish/${productId}`;
		return await ventasApi.doPut<Product, Product>(product, url);
	} catch (error) {
		return {
			message: 'Error al despublicar producto',
			code: 500,
			params: 'UNPUBLISH_PRODUCT_ERROR',
		};
	}
};

export const updateProduct = async (
	productId: string,
	updates: { stock?: number; available?: boolean }
): Promise<Product | ErrorResponse> => {
	try {
		const url = `${BASE_PATH}/update-stock/${productId}`;
		return await ventasApi.doPut<typeof updates, Product>(updates, url);
	} catch (error) {
		return {
			message: 'Error al actualizar producto',
			code: 500,
			params: 'UPDATE_PRODUCT_ERROR',
		};
	}
};
