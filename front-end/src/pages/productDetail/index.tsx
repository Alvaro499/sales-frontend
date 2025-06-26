import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useProductDetail } from './hooks';

const ProductDetailPage: React.FC = () => {
	const { productId } = useParams();
	const { product, loading, error, quantity, setQuantity, addToCart } = useProductDetail(
		productId!
	);
	const location = useLocation();
	const { product: productFromState } = location.state || {}; 
	const productToDisplay = productFromState || product;
	const navigate = useNavigate();

	const imageUrl =
		productToDisplay.data.urlImg && productToDisplay.data.urlImg[0]
			? productToDisplay.data.urlImg[0]
			: null;

	if (loading) return <p className='text-center'>Cargando producto...</p>;
	if (error) return <p className='text-center text-danger'>{error}</p>;
	if (!product) return <p className='text-center'>Producto no encontrado.</p>;

	return (
		<div className='container'>
			{/* Navbar */}
			<nav className='navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top'>
				<div className='container'>
					<a className='navbar-brand' href='/'>
						<div className='d-flex align-items-center'>
							<img
								src='https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg'
								alt='Logo'
								width='40'
								height='40'
								className='rounded-circle me-2 border'
							/>
							<span className='fw-bold fs-5 text-primary'>PYME Shop</span>
						</div>
					</a>
					<div className='d-flex ms-auto'>
						<button
							className='btn btn-outline-primary'
							onClick={() => navigate('/cart')}
						>
							<i className='bi bi-cart'></i> Carrito
						</button>
					</div>
				</div>
			</nav>

			{/* Renderizamos los detalles del producto */}
			<div className='container py-5'>
				<h1>{productToDisplay.data.name}</h1>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={productToDisplay.data.name}
						style={{ maxWidth: '100%' }}
					/>
				) : (
					<p>No hay imagen disponible</p>
				)}
				<p>
				<p><strong>Descripción:</strong> {productToDisplay.data.description}</p>
					<strong>Precio:</strong> ${productToDisplay.data.price.toFixed(2)}
				</p>
				<p>
					<strong>Stock:</strong> {productToDisplay.data.stock}
				</p>
				<p>
					<strong>Promoción:</strong> {productToDisplay.data.promotion}
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
						max={productToDisplay.data.stock}
						value={quantity}
						onChange={e =>
							setQuantity(
								Math.min(
									Math.max(1, Number(e.target.value)),
									productToDisplay.data.stock
								)
							)
						}
					/>
				</div>

				<button
					className='btn btn-primary'
					onClick={addToCart}
					disabled={product.stock === 0}
				>
					{productToDisplay.data.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
				</button>
			</div>
		</div>
	);
};

export default ProductDetailPage;
