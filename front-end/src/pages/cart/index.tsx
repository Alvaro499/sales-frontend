import React from 'react';
import useCart from './hooks';
import { useNavigate } from 'react-router-dom';

const CartPage: React.FC = () => {
	const { cartItems, calculateTotal, updateQuantityFromCart, removeItemFromCart, goToCheckout } =
		useCart();
	const navigate = useNavigate();

	return (
		<div className='container mt-5'>
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
							onClick={() => navigate('/')} 
						>
							<i className='bi bi-house-door'></i> Home
						</button>
					</div>
				</div>
			</nav>

			{/* Carrito */}
			<h1 className='mb-4 text-center'>Carrito de Compras</h1>

			<table className='table table-bordered table-striped'>
				<thead>
					<tr>
						<th>Imagen</th>
						<th>Nombre</th>
						<th>Precio</th>
						<th>Cantidad</th>
						<th>Total</th>
						<th>Acción</th>
					</tr>
				</thead>
				<tbody>
					{cartItems.map(item => (
						<tr key={item.id}>
							<td>
								<img src={item.images[0]} alt={item.name} width={50} />
							</td>
							<td>{item.name}</td>
							<td>${item.price}</td>
							<td>
								<input
									type='number'
									value={item.quantity}
									min='1'
									max={item.stock}
									onChange={e =>
										updateQuantityFromCart(item.id, parseInt(e.target.value))
									}
									className='form-control'
								/>
							</td>
							<td>${item.price * item.quantity}</td>
							<td>
								<button
									className='btn btn-danger'
									onClick={() => removeItemFromCart(item.id)}
								>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className='d-flex justify-content-between mt-4'>
				<h2>Total: ${calculateTotal()}</h2>
				<button className='btn btn-success' onClick={goToCheckout}>
					Continuar con el Checkout
				</button>
			</div>
		</div>
	);
};

export default CartPage;
