export interface Recommendation {
  product_id: string;              // <-- Este es el ID del producto
  name: string;
  score: number;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
}
