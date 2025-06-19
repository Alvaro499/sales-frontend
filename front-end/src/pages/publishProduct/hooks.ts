import { useEffect, useState } from 'react';
import { Product } from '../../models/Products.models';
import { createProduct, getCategories } from '../../services/product.services';

const usePublishProduct = () => {
	const [product, setProduct] = useState<Product>({
		id: '',
		pyme_id: '',
		name: '',
		description: '',
		price: 0,
		category: [],
		urlImg: [],
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
				console.log('Categories data:', categoriesData); // Verifica la respuesta de la API
				setCategories(categoriesData); // Guardar las categorías en el estado
			} catch (error) {
				setError('Error al cargar las categorías.');
				console.error(error);
			}
		};

		fetchCategories();
	}, []);

	const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const categoryId = Number(e.target.value); // Asegurarse de que el ID es un número
		const isChecked = e.target.checked; // Si el checkbox está marcado o desmarcado

		setProduct(prev => {
			let updatedCategories = [...prev.category];

			if (isChecked) {
				// Si el checkbox está marcado, agregar el categoryId si no está ya en el arreglo
				if (!updatedCategories.includes(categoryId)) {
					updatedCategories.push(categoryId);
				}
			} else {
				// Si está desmarcado, eliminar el categoryId del arreglo
				updatedCategories = updatedCategories.filter(id => id !== categoryId);
			}

			return {
				...prev,
				category: updatedCategories, // Actualizar las categorías seleccionadas
			};
		});
	};

	// Manejar inputs de texto, number, textarea
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value, type } = e.target;
		setProduct(prev => ({
			...prev,
			[name]: type === 'number' ? (isNaN(Number(value)) ? 0 : Number(value)) : value,
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

	// Manejar cambio URLs imágenes
	const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  const imageUrls = value.split(',').map(url => url.trim()); // Esto convierte las URLs en un arreglo plano
  setProduct(prev => ({
    ...prev,
    urlImg: imageUrls, // Actualiza `urlImg` como un arreglo plano
  }));
};

	// Validar formulario
	const validateForm = () => {
		if (
			!product.name ||
			!product.description ||
			!product.price ||
			!product.stock ||
			!product.urlImg.length ||
			product.category.length === 0
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

	// Publicar producto
	const handlePublish = async () => {
		if (!validateForm()) return;

		setIsLoading(true);
		setError('');
		try {
			const productData = {
				...product,
				category: product.category, // Enviar array de IDs
				urlImg: product.urlImg,
			};
			await createProduct(productData);
			setProduct({
				id: '',
				pyme_id: '',
				name: '',
				description: '',
				price: 0,
				category: [],
				urlImg: [],
				available: true,
				promotion: null,
				stock: 0,
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
		handleImageUrlChange,
		handlePublish,
	};
};

export default usePublishProduct;
