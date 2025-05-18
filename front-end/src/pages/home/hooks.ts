import { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../../services/product.services';
import { Product } from '../../models/Products.models';
import { Category } from '../../models/Products.models';

export function useProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		Promise.all([getProducts(), getCategories()])
			.then(([productsData, categoriesData]) => {
				setProducts(productsData);
				setCategories(categoriesData);
				setLoading(false);
			})
			.catch(() => {
				setError('Error al cargar productos o categorías');
				setLoading(false);
			});
	}, []);

	return { products, categories, loading, error };
}
