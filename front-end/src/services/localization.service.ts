import { ventasApi } from './clients.service';
import { Category } from '../models/Products.models';
import { ErrorResponse } from '../models/Api.models';
import { RawProduct } from '../adapters/productAdapter'; // Importa RawProduct

const BASE_PATH = '/api/products';

export const localizationService = {
  locateProducts: async (
    term?: string,
    categoryId?: number | null,
    minPrice?: number | null,
    maxPrice?: number | null
  ): Promise<RawProduct[] | ErrorResponse> => { // Cambia el tipo de retorno
    try {
      const queryParams = new URLSearchParams();

      if (term) queryParams.append('term', term);
      if (categoryId != null) queryParams.append('categoryId', categoryId.toString());
      if (minPrice != null) queryParams.append('priceMin', minPrice.toString());
      if (maxPrice != null) queryParams.append('priceMax', maxPrice.toString());

      const url = `${BASE_PATH}${queryParams.toString() ? `?${queryParams}` : ''}`;
      
      // Cambia el tipo genérico a RawProduct[]
      const response = await ventasApi.doGet<RawProduct[]>(url);
      
      // Asegúrate de que la respuesta tenga el formato correcto
      if (Array.isArray(response)) {
        return response.map(item => ({
          ...item,
          urlImg: item.urlImg || [], // Asegura que urlImg sea un array
          categories: item.categories || [], // Asegura que categories sea un array
          createdAt: item.createdAt || new Date().toISOString() // Valor por defecto
        }));
      }
      return response;
    } catch (error) {
      console.error('Error locating products:', error);
      return {
        message: 'Error locating products',
        code: 500,
        params: 'LOCALIZATION_ERROR',
      };
    }
  },

  getCategories: async (): Promise<Category[] | ErrorResponse> => {
    try {
      return await ventasApi.doGet<Category[]>('/api/categories');
    } catch (error) {
      console.error('Error retrieving categories:', error);
      return {
        message: 'Error retrieving categories',
        code: 500,
        params: 'CATEGORIES_ERROR',
      };
    }
  },
};
