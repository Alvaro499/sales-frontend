// useProducts.ts
import { useState, useEffect } from 'react';
import { Product, Category } from '../../models/Products.models';
import { localizationService } from '../../services/localization.service';

interface UseProductsReturn {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export function useProducts(
  search: string = '',
  selectedCategory: string = 'all',
  minPrice: number | null = null,
  maxPrice: number | null = null
): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar categorías al montar
  useEffect(() => {
    setLoading(true);
    localizationService
      .getCategories()
      .then(data => {
        if ('params' in data) {
          setError(data.message);
        } else if (Array.isArray(data)) {
          setCategories(data);
          setError(null);
        }
      })
      .catch(() => setError('Failed to fetch categories'))
      .finally(() => setLoading(false));
  }, []);

  // Cargar todos los productos al montar
  useEffect(() => {
    setLoading(true);
    localizationService
      .locateProducts('', null, null, null)
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
          setFilteredProducts(data);
          setError(null);
        } else if ('params' in data) {
          setError(data.message);
        }
      })
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  // Buscar y filtrar productos con debounce
  useEffect(() => {
    const shouldSearch =
      search.trim() !== '' ||
      selectedCategory !== 'all' ||
      minPrice !== null ||
      maxPrice !== null;

    if (!shouldSearch) {
      setFilteredProducts(products);
      return;
    }

    setLoading(true);

    const delayDebounceFn = setTimeout(() => {
      const categoryId = selectedCategory !== 'all' ? Number(selectedCategory) : null;

      localizationService
        .locateProducts(search, categoryId, minPrice, maxPrice)
        .then(data => {
          if ('params' in data) {
            setError(data.message);
            setFilteredProducts([]);
          } else if (Array.isArray(data)) {
            setFilteredProducts(data);
            setError(null);
          }
        })
        .catch(() => {
          setError('An error occurred while searching for products.');
          setFilteredProducts([]);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, selectedCategory, minPrice, maxPrice, products]);

  return { products, filteredProducts, categories, loading, error };
}