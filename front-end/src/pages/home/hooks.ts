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
    selectedCategory: number = 0,
	minPrice: number | null = null,
	maxPrice: number | null = null
): UseProductsReturn {
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

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

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			setError(null);

			try {
				const response = await localizationService.locateProducts(
					search,
                 selectedCategory !== 0 ? selectedCategory : undefined,
					minPrice,
					maxPrice
				);

				if (isErrorResponse(response)) {
					setError(response.message || 'Error en la búsqueda');
					setProducts([]);
					return;
				}

				setProducts(response as Product[]);
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

			const productDetails = await getProductById(productId);

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