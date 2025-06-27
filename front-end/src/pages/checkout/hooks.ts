import { useState, useEffect } from 'react';
import { CreateOrderRequest } from '../../models/Order.models';
import { createOrder } from '../../services/checkout.services';
import { showPurchaseSuccessAlert } from '../../utilities/alerts/purcharseComplete';
import { useNavigate } from 'react-router-dom';

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
		const paymentData = ['EFECTIVO', 'SINPE', 'DEBITO'];
		setPaymentMethods(paymentData);

		setOrder(prevState => ({
			...prevState,
			paymentMethod: '',
		}));

		const shippingData = ['ENTREGA_LOCAL', 'CORREOS_CR', 'ENVIOS_EXPRESS'];
		setShippingMethods(shippingData);

		setOrder(prevState => ({
			...prevState,
			shippingMethod: '',
		}));
	}, []);

	useEffect(() => {
		const userId = localStorage.getItem('userId');

		// Si el userId existe, lo agregamos al order y cambiamos el buyerType a USER
		setOrder(prevState => ({
			...prevState,
			guestUserId: userId ?? '', 
			buyerType: userId ? 'USER' : 'CLIENT', 
		}));

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
		const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

		const mappedProducts = storedCart.map((item: any) => {
			return {
				productId: item.productId, // Esto debe existir
				quantity: item.quantity,
			};
		});

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

	const handleSubmit = async () => {
		if (!validateForm()) return;
		setIsProcessing(true);

		try {
			const response = await createOrder(order);

			if (response && response.userId) {
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
			navigate('/');
		}
	};

	const updateOrder = (key: keyof CreateOrderRequest, value: any) => {
		setOrder(prevState => ({
			...prevState,
			[key]: value,
		}));
	};

	const navigate = useNavigate();
	const formatMethodName = (name: string) => {
		return name.replace(/_/g, ' '); 
	};

	return {
		order,
		paymentMethods,
		shippingMethods,
		errorMessage,
		updateOrder,
		handleSubmit,
		isProcessing,
		navigate,
		formatMethodName
	};
};

export default useCheckout;
