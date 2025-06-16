// localization.service.ts
import { ventasApi } from './clients.service';
import { Product, Category } from '../models/Products.models';
import { ErrorResponse } from '../models/Api.models';

const BASE_PATH = '/api/localization';

export const localizationService = {
  locateProducts: async (
    term?: string,
    categoryId?: number | null,
    minPrice?: number | null,
    maxPrice?: number | null
  ): Promise<Product[] | ErrorResponse> => {
    try {
      const params = new URLSearchParams();
      if (term) params.append('term', term);
      if (categoryId !== null && categoryId !== undefined) params.append('categoryId', categoryId.toString());
      if (minPrice !== null && minPrice !== undefined) params.append('priceMin', minPrice.toString());
      if (maxPrice !== null && maxPrice !== undefined) params.append('priceMax', maxPrice.toString());

      const query = params.toString();
      const url = query ? `${BASE_PATH}/search?${query}` : `${BASE_PATH}/search`;

      return await ventasApi.doGet<Product[]>(url);
    } catch (error) {
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
      return {
        message: 'Error retrieving categories',
        code: 500,
        params: 'CATEGORIES_ERROR',
      };
    }
  },
};
