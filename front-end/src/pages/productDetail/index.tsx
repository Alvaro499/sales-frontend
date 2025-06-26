import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductDetail } from './hooks';

const ProductDetailPage: React.FC = () => {
	const { productId } = useParams();
	const { product, loading, error, quantity, setQuantity, addToCart } = useProductDetail(
		productId!
	);

	if (loading) return <p className='text-center'>Cargando producto...</p>;
	if (error) return <p className='text-center text-danger'>{error}</p>;
	if (!product) return <p className='text-center'>Producto no encontrado.</p>;

	return (
		<div className='container py-5'>
			<h1>{product.name}</h1>
			<img src={product.images[0]} alt={product.name} style={{ maxWidth: '100%' }} />
			<p>{product.description}</p>
			<p>
				<strong>Precio:</strong> ${product.price.toFixed(2)}
			</p>
			<p>
				<strong>Stock:</strong> {product.stock}
			</p>

			<div className='mb-3' style={{ maxWidth: '120px' }}>
				<label htmlFor='quantity' className='form-label'>
					Cantidad
				</label>
				<input
					type='number'
					id='quantity'
					className='form-control'
					min={1}
					max={product.stock}
					value={quantity}
					onChange={e =>
						setQuantity(Math.min(Math.max(1, Number(e.target.value)), product.stock))
					}
				/>
			</div>

			<button className='btn btn-primary' onClick={addToCart} disabled={product.stock === 0}>
				{product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
			</button>
		</div>
	);
};

export default ProductDetailPage;
