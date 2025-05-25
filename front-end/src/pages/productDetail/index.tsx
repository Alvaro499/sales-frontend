import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from './hooks';

const ProductDetailPage: React.FC = () => {
	const { productId } = useParams();
	const { product, loading, error } = useProductDetail(productId!);

	if (loading) return <p className='text-center'>Cargando producto...</p>;
	if (error) return <p className='text-center text-danger'>{error}</p>;
	if (!product) return <p className='text-center'>Producto no encontrado.</p>;

	return (
		<div className='container py-5'>
			<h1>{product.name}</h1>
			<img src={product.url_img} alt={product.name} style={{ maxWidth: '100%' }} />
			<p>{product.description}</p>
			<p><strong>Precio:</strong> ${product.price.toFixed(2)}</p>
			<p><strong>Stock:</strong> {product.stock}</p>
			{/* Puedes agregar más campos aquí */}
		</div>
	);
};

export default ProductDetailPage;
