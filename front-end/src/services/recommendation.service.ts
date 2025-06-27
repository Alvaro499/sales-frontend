// src/services/recommendation.service.ts
import { recommendationApi } from './clients.service';
import { RecommendationResponse } from '../models/Recommendation.models';
import { ErrorResponse } from '../models/Api.models';

export const recommendationService = {
  /**
   * Obtiene productos similares por contenido (TF-IDF)
   */
  getByContent: async (
    productId: number
  ): Promise<RecommendationResponse | ErrorResponse> => {
    try {
      const res = await recommendationApi.doGet<RecommendationResponse>(
        `/recommendations/content/${productId}`
      );
      return res;
    } catch (error) {
      console.error('Error en getByContent:', error);
      return {
        message: 'No se pudieron obtener recomendaciones',
        code: 500,
        params: 'CONTENT_RECOMMENDATION_ERROR',
      };
    }
  },

  /**
   * Obtiene productos recomendados por asociación (Apriori)
   */
  getByAssociation: async (
    userId: string
  ): Promise<RecommendationResponse | ErrorResponse> => {
    try {
      const res = await recommendationApi.doGet<RecommendationResponse>(
        `/recommendations/association/${userId}`
      );
      return res;
    } catch (error) {
      return {
        message: 'No se pudieron obtener recomendaciones',
        code: 500,
        params: 'ASSOCIATION_RECOMMENDATION_ERROR',
      };
    }
  },
};
