// useCheckout.ts
import { useState, useEffect } from 'react';
import { CreateOrderRequest } from '../../models/Order.models';
import { createOrder } from '../../services/checkout.services';

const useCheckout = () => {
	// Estado para almacenar los métodos de pago y envío disponibles
	const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
	const [shippingMethods, setShippingMethods] = useState<string[]>([]);
	const [errorMessage, setErrorMessage] = useState<string>('');

	// Estado para la orden
	const [order, setOrder] = useState<CreateOrderRequest>({
		email: '',
		firstName: '',
		lastName: '',
		phone: '',
		shippingAddress: '',
		products: [],
		paymentMethod: '',
		shippingMethod: '',
	});

	useEffect(() => {
		// Datos de métodos de pago
		const paymentData = ['EFECTIVO', 'SINPE', 'DEBITO'];
		setPaymentMethods(paymentData);

		// Datos de métodos de envío
		const shippingData = ['ENTREGA_LOCAL', 'CORREOS_CR', 'ENVIOS_EXPRESS'];
		setShippingMethods(shippingData);
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
		const response = await createOrder(order);
		console.log('Orden creada:', response);
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
	};
};

export default useCheckout;
