import { useState } from 'react';
import { applyPromotion, getProductById, unpublishProduct, updateProduct } from '../../services/product.services';
import { Product } from '../../models/Products.models';

const useProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]); // Estado para los productos
    const [error, setError] = useState<string>(''); // Estado para manejar errores

    const getProductsFromAPI = async () => {
        try {
            
            // Se necesita el ID de la pyme para obtener los productos
            const userId = localStorage.getItem('userId') || '';
            // if (!userId) throw new Error('Usuario no autenticado');

            const products = await getProductById("cb4a1a63-b716-4604-a2b1-c232e3abe0e6"); // Obtener ID de la pyme
            
            setProducts(products); // Actualiza el estado con los productos obtenidos
        } catch (err) {
            setError('Error al listar los productos: ' + err);
        }
    };
// Para despublicar un producto
    const unpublishProductFromAPI = async (productId: string, product: Product) => {
        try {
            const updatedProduct = await unpublishProduct(productId, product);
            setProducts((prev) =>
                prev.map((p) => (p.id === productId ? updatedProduct as Product : p))
            );
        } catch (err) {
            setError('Error al despublicar el producto: ' + err);
        }
    };

// Para actualizar un producto (por ejemplo, stock)
    const updateProductFromAPI = async (productId: string, product: Product) => {
        try {
            const updatedProduct = await updateProduct(productId, product);
            setProducts((prev) =>
                prev.map((p) => (p.id === productId ? updatedProduct as Product : p))
            );
        } catch (err) {
            setError('Error al actualizar el producto: ' + err);
        }
    };

    const applyPromotionFromAPI = async (productId: string, promotion: string) => {
        try {
            const updatedProduct = await applyPromotion(productId, promotion);
            setProducts((prev) =>
                prev.map((p) => (p.id === productId ? updatedProduct as Product : p))
            );
        } catch (err) {
            setError('Error al aplicar la promoción: ' + err);
        }
    };

    return { products, getProductsFromAPI, updateProductFromAPI, unpublishProductFromAPI, applyPromotionFromAPI, error }; // Exporta los datos y funciones necesarias
};

export default useProductManagement;