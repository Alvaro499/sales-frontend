import { useState, useEffect } from 'react';
import { Product, Category } from '../../models/Products.models';
import { localizationService } from '../../services/localization.service';
import { getCategories } from '../../services/product.services';
import { UseProductsReturn } from './types';


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

  // Cargar categorías al inicio
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await getCategories();
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          setError('Error consiguiendo las categorías');
        }
      } catch {
        setError('Error al cargar las categorías');
      }
    };
    loadCategories();
  }, []);

  // Buscar productos con filtros o sin filtros (todos)
  useEffect(() => {
    const categoryId = selectedCategory !== 'all' ? Number(selectedCategory) : null;

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        // localizationService.locateProducts debe devolver todos si no recibe filtros
        const results = await localizationService.locateProducts(
          search,
          categoryId,
          minPrice,
          maxPrice
        );

        if ('params' in results) {
          setError(results.message || 'Error en la búsqueda de productos');
          setFilteredProducts([]);
          setProducts([]);
        } else if (Array.isArray(results)) {
          setFilteredProducts(results);
          setProducts(results);
        }
      } catch {
        setError('Error al cargar los productos');
        setFilteredProducts([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, selectedCategory, minPrice, maxPrice]);

  return { products, filteredProducts, categories, loading, error };
}
