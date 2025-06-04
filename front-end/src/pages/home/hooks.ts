// useProducts.ts
import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../../services/product.services';
import { Product, Category } from '../../models/Products.models';
import { localizationService } from '../../services/localization.service';

export function useProducts(
  search?: string,
  selectedCategory?: string,
  minPrice?: number | null,
  maxPrice?: number | null
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setFilteredProducts(productsData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products or categories');
        setLoading(false);
      });
  }, []);

  // Initial categories loading
  useEffect(() => {
    setLoading(true);
    localizationService
      .getCategories()
      .then(data => {
        if ('errorCode' in data) {
          setError(data.message);
        } else if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(() => setError('Failed to fetch categories'))
      .finally(() => setLoading(false));
  }, []);

  // Dynamic search and filtering with debounce
  useEffect(() => {
    const shouldSearch =
      (search && search.trim() !== '') ||
      (selectedCategory && selectedCategory !== 'all') ||
      (minPrice !== undefined && minPrice !== null) ||
      (maxPrice !== undefined && maxPrice !== null);

    if (!shouldSearch) {
      setFilteredProducts(products); // Show all initially loaded products
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      const categoryId =
        selectedCategory && selectedCategory !== 'all' ? Number(selectedCategory) : null;

      localizationService
        .locateProducts(search, categoryId, minPrice, maxPrice)
        .then(data => {
          if ('errorCode' in data) {
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
