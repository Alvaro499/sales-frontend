import { ventasApi } from './clients.service';
import { Category, Product } from '../models/Products.models';
import { ErrorResponse } from '../models/Api.models';

const BASE_PATH = '/productos';
const BASE_PATH_CATEGORIES = '/categories';

export const createProduct = async (product: Product): Promise<Product | ErrorResponse> => {
	try {
		const productRequest: any = {
			name: product.name,
			description: product.description,
			price: product.price,
			category: [String(product.category_id)],
			images: product.url_img ? [product.url_img] : [],
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
			errorCode: 'CREATE_PRODUCT_ERROR',
		};
	}
};

export const getProducts = async (): Promise<Product[]> => {
	return await ventasApi.doGet<Product[]>(BASE_PATH);
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
		product_id: item.product_id,
		pyme_id: item.pyme_id,
		name: item.name,
		description: item.description,
		price: item.price,
		available: item.available,
		promotion: item.promotion,
		stock: item.stock,
		url_img: item.url_img,
		is_active: item.active,
		category_id: item.category_id,
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
			errorCode: 'UNPUBLISH_PRODUCT_ERROR',
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
			errorCode: 'UPDATE_PRODUCT_ERROR',
		};
	}
};
