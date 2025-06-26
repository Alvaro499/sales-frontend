import { useEffect, useState } from 'react';
import { Product } from '../../models/Products.models';
import { createProduct, getCategories } from '../../services/product.services';
import { showProductSuccessAlert, showProductErrorAlert } from '../../utilities/alerts/productAlerts';
import { AuthStorage } from '../../hooks/useLocalStorage';

const usePublishProduct = () => {
	
	const pymeId = AuthStorage.getPymeId();
	const [product, setProduct] = useState<Product>({
		id: '',
		pyme_id: pymeId || '',
		name: '',
		description: '',
		price: 0,
		category: [],
		images: [],
		available: true,
		promotion: null,
		stock: 0,
	});

	const [categories, setCategories] = useState<{ category_id: number; name: string }[]>([]);
	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const categoriesData = await getCategories();
				setCategories(categoriesData);
			} catch (error) {
				setError('Error al cargar las categorías.');
				console.error(error);
			}
		};

		fetchCategories();
	}, []);

	const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const categoryId = e.target.value;
		const isChecked = e.target.checked;

		setProduct(prev => {
			let updatedCategories = [...prev.category];

			if (isChecked) {
				if (!updatedCategories.includes(categoryId)) {
					updatedCategories.push(categoryId);
				}
			} else {
				updatedCategories = updatedCategories.filter(id => id !== categoryId);
			}

			return {
				...prev,
				category: updatedCategories,
			};
		});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		setProduct(prev => ({
			...prev,
			[name]: type === 'number' ? (isNaN(Number(value)) ? 0 : Number(value)) : value,
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setProduct(prev => ({
			...prev,
			[name]: checked,
		}));
	};

	const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		const urls = value
			.split(',')
			.map(url => url.trim())
			.filter(url => url !== '');

		setProduct(prev => ({
			...prev,
			images: urls, // Ya es un array plano
		}));
	};

	// Validar formulario
	const validateForm = () => {
		if (
			!product.name ||
			!product.description ||
			!product.price ||
			!product.stock ||
			product.images.length === 0 ||
			product.category.length === 0
		) {
			setError('Todos los campos son obligatorios.');
			return false;
		}
		if (isNaN(product.price) || product.price <= 0) {
			setError('El precio debe ser un número positivo.');
			return false;
		}
		// Validación de formato de imagen
		const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
		const invalidImage = product.images.some(
			url => !validExtensions.some(ext => url.toLowerCase().endsWith(ext))
		);
		if (invalidImage) {
			setError('La imagen no cumple con las especificaciones.');
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
			const imagesToSend = Array.isArray(product.images[0])
				? product.images.flat()
				: product.images;

			const productData = {
				...product,
				category: product.category.map(String),
				images: imagesToSend,
			};

			await createProduct(productData);
			await showProductSuccessAlert(product.name);

			setProduct({
				id: '',
				pyme_id: '',
				name: '',
				description: '',
				price: 0,
				category: [],
				images: [],
				available: true,
				promotion: null,
				stock: 0,
			});
		} catch (error: any) {
			let errorMessage = 'Error al publicar el producto';

			if (error?.response) {
				errorMessage =
					error.response.data?.message ||
					`Error ${error.response.status}: ${error.response.statusText}`;
			} else if (error?.message) {
				errorMessage = error.message;
			}

			setError(errorMessage);
			await showProductErrorAlert(errorMessage);
			throw error;
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
		handleImageUrlChange,
		handlePublish,
	};
};

export default usePublishProduct;
