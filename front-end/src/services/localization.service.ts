import { ventasApi } from './clients.service';
import { ErrorResponse } from '../models/Api.models';
import { RawProduct, adaptProduct } from '../adapters/productAdapter';

const BASE_PATH = 'api/products/search';

// Servicio para buscar productos según filtros como término, categoría y rango de precio,
// que adapta la respuesta del backend a un formato estandarizado para la aplicación.
export const localizationService = {
  locateProducts: async (
    term?: string,
    categoryId?: number,
    minPrice?: number | null,
    maxPrice?: number | null
  ): Promise<any[] | ErrorResponse> => {
    try {
      const queryParams = new URLSearchParams();

      if (term) queryParams.append('term', term);
      if (categoryId != null) queryParams.append('categoryId', categoryId.toString());
      if (minPrice != null) queryParams.append('priceMin', minPrice.toString());
      if (maxPrice != null) queryParams.append('priceMax', maxPrice.toString());

      const url = `${BASE_PATH}${queryParams.toString() ? `?${queryParams}` : ''}`;

      const response = await ventasApi.doGet<any>(url);

      let rawProducts: RawProduct[] = [];

      if (Array.isArray(response)) {
        rawProducts = response;
      } else if (Array.isArray(response.data)) {
        rawProducts = response.data;
      } else if (Array.isArray(response.productos)) {
        rawProducts = response.productos;
      } else {
        return {
          message: 'Formato de respuesta inesperado',
          code: 500,
          params: 'UNEXPECTED_FORMAT',
        };
      }

      // Adaptar productos al formato interno
      const adapted = rawProducts.map((item: RawProduct) =>
        adaptProduct({
          ...item,
          urlImg: item.urlImg || [],
          categories: item.categories || [],
          createdAt: item.createdAt || new Date().toISOString(),
        })
      );

      return adapted;
    } catch (error) {
      console.error('Error locating products:', error);
      return {
        message: 'Error al localizar productos',
        code: 500,
        params: 'LOCALIZATION_ERROR',
      };
    }
  },
};
