import { useEffect, useState } from 'react';
import { recommendationService } from '../../services/recommendation.service';
import {
  UseRecommendedProductsProps,
  UseRecommendedProductsResult,
} from './types';
import { Recommendation } from '../../models/Recommendation.models';
import { ErrorResponse } from '../../models/Api.models';

export const useRecommendedProducts = ({
  userId,
  productId,
  type,
}: UseRecommendedProductsProps): UseRecommendedProductsResult => {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      let result;
      if (type === 'association' && userId !== undefined) {
        result = await recommendationService.getByAssociation(userId);
      } else if (type === 'content' && productId !== undefined) {
        result = await recommendationService.getByContent(productId);
      } else {
        setError({ message: 'Parámetros inválidos', code: 400 });
        setLoading(false);
        return;
      }

      if ('recommendations' in result) {
        setItems(result.recommendations);
      } else {
        setError(result);
      }

      setLoading(false);
    };

    fetchRecommendations();
  }, [type, userId, productId]);

  return { items, loading, error };
};
