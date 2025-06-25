// useCheckout.ts
import { useState, useEffect } from 'react';
import { CreateOrderRequest } from '../../models/Order.models';
import { createOrder } from '../../services/checkout.services';
import { showPurchaseSuccessAlert } from '../../utilities/alerts/purcharseComplete';

const useCheckout = () => {
	// Estado para almacenar los métodos de pago y envío disponibles
	const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
	const [shippingMethods, setShippingMethods] = useState<string[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isProcessing, setIsProcessing] = useState(false);

	// Estado para la orden
	const [order, setOrder] = useState<CreateOrderRequest>({
		guestUserId: '',
		buyerType: 'CLIENT',
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		shippingAddress: '',
		products: [],
		shippingMethod: '',
		paymentMethod: '',
	});

	useEffect(() => {
		// Datos de métodos de pago
		const paymentData = ['EFECTIVO', 'SINPE', 'DEBITO'];
		setPaymentMethods(paymentData);

		// Establecer el primer método de pago como valor predeterminado
		setOrder(prevState => ({
			...prevState,
			paymentMethod: paymentData[0], // Establecer el primer método de pago
		}));

		// Datos de métodos de envío
		const shippingData = ['ENTREGA_LOCAL', 'CORREOS_CR', 'ENVIOS_EXPRESS'];
		setShippingMethods(shippingData);

		// Establecer el primer método de envío como valor predeterminado
		setOrder(prevState => ({
			...prevState,
			shippingMethod: shippingData[0], // Establecer el primer método de envío
		}));
	}, []);

	// Este useEffect se ejecuta al inicio para configurar los valores correctos
	useEffect(() => {
		// Obtener el userId desde localStorage
		const userId = localStorage.getItem('userId');

		// Si el userId existe, lo agregamos al order y cambiamos el buyerType a USER
		setOrder(prevState => ({
			...prevState,
			guestUserId: userId ?? '', // Si no existe, se usa cadena vacía o null
			buyerType: userId ? 'USER' : 'CLIENT', // BuyerType es USER si existe el userId, CLIENT si no
		}));

		// Obtener los productos del carrito y agregarlo al estado
		const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
		const mappedProducts = storedCart.map((item: any) => ({
			productId: item.productId,
			quantity: item.quantity,
		}));
		setOrder(prevState => ({
			...prevState,
			products: mappedProducts,
		}));
	}, []);

	useEffect(() => {
		// Obtener el carrito desde localStorage
		const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

		// Mapear productos, asegurando que cada uno tenga productId y quantity
		const mappedProducts = storedCart.map((item: any) => {
			return {
				productId: item.productId, // Esto debe existir
				quantity: item.quantity,
			};
		});

		// Actualizar el estado de la orden con los productos mapeados
		setOrder(prevState => ({
			...prevState,
			products: mappedProducts,
		}));
	}, []);
	const validateForm = () => {
		if (
			!order.email ||
			!order.firstName ||
			!order.lastName ||
			!order.phone ||
			!order.shippingAddress
		) {
			setErrorMessage('Todos los campos deben ser llenados.');
			return false;
		}

		if (!order.paymentMethod) {
			setErrorMessage('Debe seleccionar un método de pago.');
			return false;
		}

		if (!order.shippingMethod) {
			setErrorMessage('Debe seleccionar un método de envío.');
			return false;
		}

		setErrorMessage('');
		return true;
	};

	// Función para manejar el envío del formulario
	const handleSubmit = async () => {
		if (!validateForm()) return;
		setIsProcessing(true);

		try {
			const response = await createOrder(order);

			if (response && response.userId) {
				// Eliminar el carrito de localStorage después de la compra exitosa
				localStorage.removeItem('cart');
				showPurchaseSuccessAlert();
				setOrder({
					guestUserId: '',
					buyerType: 'CLIENT',
					email: '',
					firstName: '',
					lastName: '',
					phone: '',
					shippingAddress: '',
					products: [],
					shippingMethod: '',
					paymentMethod: '',
				});
			}
		} catch (error) {
			console.error('Error al crear la orden:', error);
		} finally {
			// Rehabilitar el botón después de que termine el proceso
			setIsProcessing(false);
		}
	};

	// Función para actualizar el estado del formulario
	const updateOrder = (key: keyof CreateOrderRequest, value: any) => {
		setOrder(prevState => ({
			...prevState,
			[key]: value,
		}));
	};

	return {
		order,
		paymentMethods,
		shippingMethods,
		errorMessage,
		updateOrder,
		handleSubmit,
		isProcessing,
	};
};

export default useCheckout;
