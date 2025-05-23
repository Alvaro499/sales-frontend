import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../../services/product.services';
import { Product } from '../../models/Products.models';
import { Category } from '../../models/Products.models';
import { localizationService } from '../../services/localization.service';

export function useProducts(search?: string, selectedCategory?: string) {
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
				setError('Error al cargar productos o categorías');
				setLoading(false);
			});
	}, []);

	// Carga inicial de categorías
	useEffect(() => {
		setLoading(true);
		localizationService
			.obtenerCategorias()
			.then(data => {
				if ('errorCode' in data) {
					setError(data.message);
				} else if (Array.isArray(data)) {
					setCategories(data); // ✅ solo si es Category[]
				}
			})
			.catch(() => setError('Error al obtener categorías'))
			.finally(() => setLoading(false));
	}, []);

	// Búsqueda y filtrado dinámico con debounce
	useEffect(() => {
		const shouldSearch =
			(search && search.trim() !== '') || (selectedCategory && selectedCategory !== 'all');
		if (!shouldSearch) {
			setFilteredProducts(products); //  Mostrar todos los productos cargados inicialmente
			return;
		}

		setLoading(true);
		const delayDebounceFn = setTimeout(() => {
			const categoriaId =
				selectedCategory && selectedCategory !== 'all' ? Number(selectedCategory) : null;

			localizationService
				.localizarProductos(search, categoriaId)
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
					setError('Ocurrió un error al buscar productos.');
					setFilteredProducts([]);
				})
				.finally(() => setLoading(false));
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [search, selectedCategory, products]);

	return { products, filteredProducts, categories, loading, error };
}
