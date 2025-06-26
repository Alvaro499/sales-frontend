import { useState, useEffect } from 'react';
import { Product } from '../../models/Products.models';
import { getProductById } from '../../services/product.services';
import { showAddToCartSuccessAlert } from '../../utilities/alerts/addCart';

export function useProductDetail(productId: string) {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [quantity, setQuantity] = useState<number>(1);

	useEffect(() => {
		setLoading(true);
		setError(null);
		getProductById(productId)
			.then(setProduct)
			.catch(() => setError('Error al cargar el producto'))
			.finally(() => setLoading(false));
	}, [productId]);

	const addToCart = () => {
		if (!product) return;
		if (quantity < 1 || quantity > product.stock) {
			alert('Cantidad inválida');
			return;
		}
		const cartString = localStorage.getItem('cart');
		const cart = cartString ? JSON.parse(cartString) : [];
		const productId = product.data.id;

		const existingIndex = cart.findIndex((item: any) => item.product_id === productId);

		if (existingIndex >= 0) {
			cart[existingIndex].quantity += quantity;
		} else {
			cart.push({ ...product, productId, quantity });
		}

		localStorage.setItem('cart', JSON.stringify(cart));
		showAddToCartSuccessAlert(product.data.name);
	};

	return {
		product,
		loading,
		error,
		quantity,
		setQuantity,
		addToCart,
	};
}
