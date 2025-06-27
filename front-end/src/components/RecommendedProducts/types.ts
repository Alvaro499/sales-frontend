import { Recommendation } from '../../models/Recommendation.models';
import { ErrorResponse } from '../../models/Api.models';

export type RecommendationType = 'association' | 'content';

export interface UseRecommendedProductsProps {
  userId?: string;   // Cambiado a string porque es UUID
  productId?: number;
  type: RecommendationType;
}

export interface UseRecommendedProductsResult {
  items: Recommendation[];
  loading: boolean;
  error: ErrorResponse | null;
}
