import { useState, useEffect } from 'react';
import { Product } from '../../models/Products.models';
import { getProductById2 } from '../../services/product.services';

export function useProductDetail(productId: string) {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Estado y función para manejar carrito local (puedes cambiar esto a contexto, redux, etc)
	const [quantity, setQuantity] = useState<number>(1);

	useEffect(() => {
		setLoading(true);
		setError(null);
		getProductById2(productId)
			.then(setProduct)
			.catch(() => setError('Error al cargar el producto'))
			.finally(() => setLoading(false));
	}, [productId]);

	// Función para agregar al carrito (ejemplo local, adaptarla a tu implementación)
	const addToCart = () => {
		if (!product) return;
		if (quantity < 1 || quantity > product.stock) {
			alert('Cantidad inválida');
			return;
		}

		// Ejemplo simple: guardamos en localStorage (puedes cambiar a contexto, redux, API, etc)
		const cartString = localStorage.getItem('cart');
		const cart = cartString ? JSON.parse(cartString) : [];

		// Buscar si producto ya está en carrito
		const existingIndex = cart.findIndex((item: any) => item.product_id === product.id);

		if (existingIndex >= 0) {
			cart[existingIndex].quantity += quantity;
		} else {
			cart.push({ ...product, quantity });
		}

		localStorage.setItem('cart', JSON.stringify(cart));
		alert(`Añadido ${quantity} x ${product.name} al carrito`);
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
