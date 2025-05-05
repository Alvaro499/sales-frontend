import { useState } from 'react';
import { Product } from './types';

const usePublishProduct = () => {
	const [product, setProduct] = useState<Product>({
		product_id: '',
		pyme_id: '',
		name: '',
		description: '',
		price: 0,
		available: true, // Por defecto está disponible
		promotion: null,
		stock: 0,
		url_img: '',
		is_active: true,
	});

	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// Handle form input changes
	const handleInputChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setProduct(prevProduct => ({
			...prevProduct,
			[name]: value,
		}));
	};

	// Handle price input as number
	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const numericValue = value ? parseFloat(value) : 0; // Convertir el valor a número o establecer 0 si está vacío
		setProduct(prevProduct => ({
			...prevProduct,
			price: numericValue >= 0 ? numericValue : 0, // Asegurarse de que el precio sea positivo
		}));
	};

	// Handle checkbox change (availability)
	const handleAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checked } = e.target;
		setProduct(prevProduct => ({
			...prevProduct,
			available: checked, // Actualizamos el estado de disponibilidad
		}));
	};

	// Validate inputs before publishing
	const validateForm = () => {
		if (
			!product.name ||
			!product.description ||
			!product.price ||
			!product.stock ||
			!product.url_img
		) {
			setError('Todos los campos son obligatorios.');
			return false;
		}
		if (isNaN(product.price) || product.price <= 0) {
			setError('El precio debe ser un número positivo.');
			return false;
		}
		setError('');
		return true;
	};

	// Function to handle product publishing
	const handlePublish = async () => {
		// Validación manual del precio
		if (product.price <= 0 || isNaN(product.price)) {
			setError('El precio debe ser un número positivo');
			return;
		}

		if (!validateForm()) {
			return;
		}

		setIsLoading(true);
		try {
			// Simulate API call to publish product
			const response = await publishProductToAPI(product); // Replace with real API call
			if (response.success) {
				// Handle success, like redirecting or showing success message
				alert('Producto publicado con éxito!');
			} else {
				setError('No se pudo publicar el producto.');
			}
		} catch (err) {
			setError('Error al publicar el producto.' + err);
		} finally {
			setIsLoading(false);
		}
	};

	// Simulate API call (you should replace this with real API interaction)
	const publishProductToAPI = async (product: Product) => {
		return new Promise<{ success: boolean }>(resolve => {
			setTimeout(() => resolve({ success: true }), 1000); // Simulating success response
		});
	};

	return {
		product,
		error,
		isLoading,
		handleInputChange,
		handlePriceChange,
		handleAvailabilityChange, // Added this function to handle availability change
		handlePublish,
	};
};

export default usePublishProduct;
