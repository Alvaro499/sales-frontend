import { Product, Category } from "../../models/Products.models";

export interface UseProductsReturn {
  filteredProducts: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  handleProductClick: (productId: string) => void;
}
