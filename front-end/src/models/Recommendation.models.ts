export interface Recommendation {
  product_id: number;
  name: string;
  score: number;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
}
