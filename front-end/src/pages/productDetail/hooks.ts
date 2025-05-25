import { useState, useEffect } from 'react';
import { Product } from '../../models/Products.models';
import { getProductById } from '../../services/product.services';

export function useProductDetail(productId: string) {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		getProductById(productId)
			.then(setProduct)
			.catch(() => setError('Error al cargar el producto'))
			.finally(() => setLoading(false));
	}, [productId]);

	return { product, loading, error };
}
