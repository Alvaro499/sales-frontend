import { useState, useEffect } from 'react';
import { Product, Category } from '../../models/Products.models';
import { localizationService } from '../../services/localization.service';
import { getCategories, getProductById } from '../../services/product.services';
import { ErrorResponse } from '../../models/Api.models';
import { UseProductsReturn } from './types';
import { useNavigate } from 'react-router-dom';

function isErrorResponse(response: any): response is ErrorResponse {
	return response && typeof response === 'object' && 'message' in response;
}

export function useProducts(
	search: string = '',
	selectedCategory: string = 'all',
	minPrice: number | null = null,
	maxPrice: number | null = null
): UseProductsReturn {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	// Cargar categorías
	useEffect(() => {
		const loadCategories = async () => {
			try {
				const categoriesData = await getCategories();
				if (Array.isArray(categoriesData)) {
					setCategories(categoriesData);
				} else if (isErrorResponse(categoriesData)) {
					setError(categoriesData.message || 'Error obteniendo categorías');
				}
			} catch {
				setError('Error al cargar las categorías');
			}
		};
		loadCategories();
	}, []);

	// Buscar productos
	useEffect(() => {
		const categoryId = selectedCategory !== 'all' ? Number(selectedCategory) : null;

		const fetchProducts = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await localizationService.locateProducts(
					search,
					categoryId,
					minPrice,
					maxPrice
				);

				if (isErrorResponse(response)) {
					setError(response.message || 'Error en la búsqueda');
					setProducts([]);
					return;
				}

				// Aquí no se adapta, porque ya viene adaptado desde el servicio
				setProducts(response as Product[]);
				console.log(response);
			} catch (err) {
				setError('Error al cargar los productos');
				setProducts([]);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [search, selectedCategory, minPrice, maxPrice]);

	const handleProductClick = async (productId: string) => {
		try {
			// Realizamos la solicitud GET para obtener los detalles del producto
			const productDetails = await getProductById(productId);

			// Una vez que obtenemos el producto, lo pasamos a la página de detalles
			navigate(`/products/${productId}`, { state: { product: productDetails } });
		} catch (error) {
			console.error('Error al obtener el producto', error);
		}
	};

	return {
		filteredProducts: products,
		categories,
		loading,
		error,
    handleProductClick,
	};
}
