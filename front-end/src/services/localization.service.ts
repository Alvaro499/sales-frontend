// services/localization.service.ts
import { doGet } from './http.service';
import { Product, Category } from '../models/Products.models';
import { ErrorResponse } from '../models/Api.models';

const BASE_PATH = '/api/localization';

export const localizationService = {
	localizarProductos: async (
		termino?: string,
		categoriaId?: number | null,
		precioMin?: number | null,
		precioMax?: number | null
	): Promise<Product[] | ErrorResponse> => {
		try {
			const params = new URLSearchParams();
			if (termino) params.append('termino', termino);
			if (categoriaId) params.append('categoria', categoriaId.toString());
			if (precioMin !== undefined && precioMin !== null)
				params.append('precioMin', precioMin.toString());
			if (precioMax !== undefined && precioMax !== null)
				params.append('precioMax', precioMax.toString());

			const query = params.toString();
			const url = query ? `${BASE_PATH}/buscar?${query}` : `${BASE_PATH}/buscar`;

			return await doGet<Product[]>(url);
		} catch (error) {
			return {
				message: 'Error al localizar productos',
				code: 500,
				errorCode: 'LOCALIZACION_ERROR',
			};
		}
	},

	obtenerCategorias: async (): Promise<Category[] | ErrorResponse> => {
		try {
			return await doGet<Category[]>('/api/categorias');
		} catch (error) {
			return {
				message: 'Error al obtener categorías',
				code: 500,
				errorCode: 'CATEGORIAS_ERROR',
			};
		}
	},
};
