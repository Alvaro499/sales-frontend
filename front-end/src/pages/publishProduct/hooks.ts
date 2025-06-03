import { useState } from 'react';
import { Product } from './types'; // Ajusta esta importación según tu proyecto
import { createProduct } from '../../services/product.services';

const usePublishProduct = () => {
	const [product, setProduct] = useState<Product>({
		id: '',
		product_id: '',
		pyme_id: '',
		name: '',
		description: '',
		price: 0,
		available: true,
		promotion: null,
		stock: 0,
		url_img: '',
		is_active: true,
		category_id: null,
	});

	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const categories = [
		{ category_id: 1, name: 'Electronics' },
		{ category_id: 2, name: 'Clothing' },
		{ category_id: 3, name: 'Food' },
	];

	// Manejar inputs de texto, number, textarea
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		setProduct(prev => ({
			...prev,
			[name]: type === 'number' ? Number(value) : value,
		}));
	};

	// Manejar checkbox disponible
	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setProduct(prev => ({
			...prev,
			[name]: checked,
		}));
	};

	// Manejar select categoría
	const handleCategoryChange = (value: number) => {
		setProduct(prev => ({
			...prev,
			category_id: value,
		}));
	};

	const validateForm = () => {
		if (
			!product.name ||
			!product.description ||
			!product.price ||
			!product.stock ||
			!product.url_img ||
			product.category_id === null
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

	const handlePublish = async () => {
		if (!validateForm()) return;

		setIsLoading(true);
		setError('');
		try {
			// Aquí la llamada real a la API
			await createProduct(product);
			alert('Producto publicado con éxito!');
			// Opcional: limpiar formulario o redirigir
			setProduct({
				id: '',
				product_id: '',
				pyme_id: '',
				name: '',
				description: '',
				price: 0,
				available: true,
				promotion: null,
				stock: 0,
				url_img: '',
				is_active: true,
				category_id: null,
			});
		} catch (e) {
			setError('Error al publicar el producto.');
			throw new Error(String(e));
		} finally {
			setIsLoading(false);
		}
	};

	return {
		product,
		categories,
		error,
		isLoading,
		handleInputChange,
		handleCheckboxChange,
		handleCategoryChange,
		handlePublish,
	};
};

export default usePublishProduct;
