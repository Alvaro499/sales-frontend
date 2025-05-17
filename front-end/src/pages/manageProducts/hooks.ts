import { useState } from 'react';
import { getProducts } from '../../services/product.services';
import { Product } from '../../models/Products.models';

const useProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]); // Estado para los productos
    const [error, setError] = useState<string>(''); // Estado para manejar errores

    const getProductsFromAPI = async () => {
        try {
            const products = await getProducts();
            setProducts(products); // Actualiza el estado con los productos obtenidos
        } catch (err) {
            setError('Error al listar los productos: ' + err);
        }
    };

    return { products, getProductsFromAPI, error }; // Exporta los datos y funciones necesarias
};

export default useProductManagement;