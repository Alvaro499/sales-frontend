import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../models/Products.models';

const useCart = () => {
	// Obtiene el carrito guardado en localStorage y lo adapta al formato CartItem
	const getCartItemsFromLocalStorage = (): CartItem[] => {
		const storedItems = localStorage.getItem('cart');
		const cartItems = storedItems ? JSON.parse(storedItems) : [];

		return cartItems.map((item: any) => ({
			id: item.productId,
			name: item.data?.name || 'Producto sin nombre',
			price: item.data?.price || 0,
			stock: item.data?.stock || 0,
			quantity: item.quantity || 1,
			images: Array.isArray(item.data?.urlImg)
				? item.data.urlImg
				: [item.data?.urlImg || 'https://via.placeholder.com/50'],
		}));
	};

	// Estado para almacenar los ítems del carrito
	const [cartItems, setCartItems] = useState<CartItem[]>(getCartItemsFromLocalStorage);

	// Al montar, carga el carrito desde localStorage
	useEffect(() => {
		setCartItems(getCartItemsFromLocalStorage());
	}, []);

	// Calcula el total sumando precio * cantidad
	const calculateTotal = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	// Actualiza la cantidad de un producto en el carrito
	const updateQuantityFromCart = (id: string, newQuantity: number) => {
		const updatedCart = cartItems.map(item =>
			item.id === id ? { ...item, quantity: newQuantity } : item
		);
		setCartItems(updatedCart);
		saveToLocalStorage(updatedCart);
	};

	// Elimina un producto del carrito
	const removeItemFromCart = (id: string) => {
		const updatedCart = cartItems.filter(item => item.id !== id);
		setCartItems(updatedCart);
		saveToLocalStorage(updatedCart);
	};

	// Guarda el carrito en localStorage con el formato original
	const saveToLocalStorage = (items: CartItem[]) => {
		const storedFormat = items.map(item => ({
			productId: item.id,
			quantity: item.quantity,
			data: {
				name: item.name,
				price: item.price,
				stock: item.stock,
				urlImg: item.images,
			},
		}));
		localStorage.setItem('cart', JSON.stringify(storedFormat));
	};

	const navigate = useNavigate();

	// Función para redirigir al checkout
	const goToCheckout = () => {
		navigate('/checkout');
	};

	return {
		cartItems,
		calculateTotal,
		updateQuantityFromCart,
		removeItemFromCart,
		goToCheckout,
	};
};

export default useCart;
