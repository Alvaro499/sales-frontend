import { doGet, doPost, doPut } from './http.service'; //doGet, doPut
import { Category, Product } from '../models/Products.models';
//import { OkResponse, ErrorResponse } from '../models/Api.models';

const BASE_PATH = '/api/products'; // Cambia esto a la ruta real de tu backend
const BASE_PATH_CATEGORIES = '/categories';


export const createProduct = async (product: Product): Promise<Response> => {
    const productRequest: any = {
        name: product.name,
        description: product.description,
        price: product.price,
        category: [String(product.category_id)], // <-- Corrige aquí, siempre array de strings
        images: product.url_img ? [product.url_img] : [],
        available: product.available,
        promotion: product.promotion ? String(product.promotion) : "0", // <-- Corrige aquí, siempre string
        stock: product.stock,
        pymeId: product.pyme_id,
    };

    const response = await doPost<any, Response>(productRequest, BASE_PATH);
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


export const getProductById = async (id: string): Promise<Product[]> => {
    const response = await doGet<{ message: string; data: any[] }>(`${BASE_PATH}/by-pyme/${id}`);

    const products: Product[] = response.data.map((item) => ({
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


export const unpublishProduct = async (productId: string, product: Product): Promise<Product> => {
    const url = `${BASE_PATH}/unpublish/${productId}`;
    return await doPut<Product, Product>(product, url);
};

export const updateProduct = async (productId: string, updates: { stock?: number; available?: boolean }): Promise<Product> => {
    const url = `${BASE_PATH}/update-stock/${productId}`;
    return await doPut<typeof updates, Product>(updates, url);
};