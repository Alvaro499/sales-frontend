import { Product, Category } from "../../models/Products.models";
export interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}
