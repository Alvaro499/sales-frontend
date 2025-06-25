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
	const url = `${BASE_PATH}`;
	const response = await ventasApi.doGet<{ message: string; data: Product[] }>(url);
	return response.data;
};

export const getCategories = async (): Promise<Category[] | ErrorResponse> => {
	try {
		return await ventasApi.doGet<Category[]>(`/${BASE_PATH_CATEGORIES}`);
	} catch (error) {
		return {
			message: 'Error retrieving categories',
			code: 500,
			params: 'CATEGORIES_ERROR',
		};
	}
};

export const getProductById = async (id: string): Promise<Product> => {
	return await ventasApi.doGet<Product>(`${BASE_PATH}/info/${id}`);
};


export const getProductBypymeId = async (id: string): Promise<Product[]> => {
	const response = await ventasApi.doGet<{ message: string; data: any[] }>(
		`${BASE_PATH}/by-pyme/${id}`
	);

	const imagenDefault: string = 'https://www.creativefabrica.com/wp-content/uploads/2019/01/Picture-by-Iconika.jpg'; // URL de imagen por defecto

	const products: Product[] = response.data.map((item) => ({
		id: item.id,
		name: item.name,
		description: item.description,
		price: item.price,
		category: item.category ? item.category.map((cat: { name: string }) => cat.name) : [],
		images: item.urlImg ? item.urlImg : [imagenDefault],
		available: item.available,
		promotion: item.promotion,
		stock: item.stock,
		pyme_id: item.pyme_id,
		active: item.active
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

export const applyPromotion = async (
	productId: string,
	promotion: string
): Promise<Product | ErrorResponse> => {
	try {
		const url = `${BASE_PATH}/promotion/${productId}`;
		return await ventasApi.doPut<{ promotion: string }, Product>({ promotion }, url);
	} catch (error) {
		return {
			message: 'Error al aplicar promoción',
			code: 500,
			params: 'APPLY_PROMOTION_ERROR',
		};
	}
};
