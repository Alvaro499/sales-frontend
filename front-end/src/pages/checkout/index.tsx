// CheckoutPage.tsx
import React from 'react';
import useCheckout from './hooks';
import { PaymentMethod, ShippingMethod } from '../../models/Order.models';

const CheckoutPage: React.FC = () => {
	const { order, paymentMethods, shippingMethods, errorMessage, updateOrder, handleSubmit } = useCheckout();

	return (
		<div className='container mt-5'>
			<h1 className='mb-4 text-center'>Formulario de Compra</h1>

			<form>
				{/* Información del usuario */}
				<div className='mb-3'>
					<label className='form-label'>Nombre</label>
					<input
						type='text'
						className='form-control'
						value={order.firstName}
						onChange={e => updateOrder('firstName', e.target.value)}
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Apellido</label>
					<input
						type='text'
						className='form-control'
						value={order.lastName}
						onChange={e => updateOrder('lastName', e.target.value)}
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Correo Electrónico</label>
					<input
						type='email'
						className='form-control'
						value={order.email}
						onChange={e => updateOrder('email', e.target.value)}
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Teléfono</label>
					<input
						type='text'
						className='form-control'
						value={order.phone}
						onChange={e => updateOrder('phone', e.target.value)}
					/>
				</div>

				<div className='mb-3'>
					<label className='form-label'>Dirección de Envío</label>
					<input
						type='text'
						className='form-control'
						value={order.shippingAddress}
						onChange={e => updateOrder('shippingAddress', e.target.value)}
					/>
				</div>

				{/* Métodos de pago */}
				<div className='mb-3'>
					<label className='form-label'>Método de Pago</label>
					<select
						className='form-select'
						value={order.paymentMethod.name}
						onChange={e =>
							updateOrder('paymentMethod', {
								...order.paymentMethod,
								name: e.target.value,
							})
						}
					>
						{paymentMethods.map((method: PaymentMethod) => (
							<option key={method.name} value={method.name}>
								{method.description}
							</option>
						))}
					</select>
				</div>

				{/* Métodos de envío */}
				<div className='mb-3'>
					<label className='form-label'>Método de Envío</label>
					<select
						className='form-select'
						value={order.shippingMethod.name}
						onChange={e =>
							updateOrder('shippingMethod', {
								...order.shippingMethod,
								name: e.target.value,
							})
						}
					>
						{shippingMethods.map((method: ShippingMethod) => (
							<option key={method.name} value={method.name}>
								{method.description}
							</option>
						))}
					</select>
				</div>
				{errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
				<button type='button' className='btn btn-success' onClick={handleSubmit}>
					Comprar
				</button>
			</form>
		</div>
	);
};

export default CheckoutPage;
