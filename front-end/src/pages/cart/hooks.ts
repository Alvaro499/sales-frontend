import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../models/Products.models';

const useCart = () => {
	const getCartItemsFromLocalStorage = (): CartItem[] => {
		const storedItems = localStorage.getItem('cart');
		const cartItems = storedItems ? JSON.parse(storedItems) : [];

		// Mapear correctamente los productos desde la estructura anidada
		return cartItems.map((item: any) => ({
			id: item.productId, 
			name: item.data.name, 
			price: item.data.price,
			stock: item.data.stock,
			quantity: item.quantity,
			images: item.data.urlImg,
		}));
	};

	const [cartItems, setCartItems] = useState<CartItem[]>(getCartItemsFromLocalStorage);

	useEffect(() => {
		// Actualizamos el estado cuando el componente se monta o se actualiza
		setCartItems(getCartItemsFromLocalStorage());
	}, []);


	const calculateTotal = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const updateQuantityFromCart = (id: string, newQuantity: number) => {
		const updatedCart = cartItems.map(item => {
			if (item.id === id) {
				return { ...item, quantity: newQuantity };
			}
			return item;
		});
		setCartItems(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart)); 
	};

	const removeItemFromCart = (id: string) => {
		const updatedCart = cartItems.filter(item => item.id !== id);
		setCartItems(updatedCart);
		localStorage.setItem('cart', JSON.stringify(updatedCart)); 
	};


	const navigate = useNavigate();
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
