import React from 'react';
import useCheckout from './hooks';
import './style.css';

const CheckoutPage: React.FC = () => {
	const { order, paymentMethods, shippingMethods, errorMessage, updateOrder, handleSubmit, isProcessing, navigate, formatMethodName} =
		useCheckout();
	
	return (
		<div className="container mt-5">
			{/* Navbar */}
			<nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
				<div className="container">
					<a className="navbar-brand" href="/">
						<div className="d-flex align-items-center">
							<img
								src="https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg"
								alt="Logo"
								width="40"
								height="40"
								className="rounded-circle me-2 border"
							/>
							<span className="fw-bold fs-5 text-primary">PYME Shop</span>
						</div>
					</a>
					<div className="d-flex ms-auto">
						<button
							className="btn btn-outline-primary"
							onClick={() => navigate('/')} 
						>
							<i className="bi bi-house-door"></i> Home
						</button>
					</div>
				</div>
			</nav>

			<h1 className="mb-4 text-center">Formulario de Compra</h1>

			<form>
				{/* Información del usuario */}
				<div className="mb-3">
					<label className="form-label">Nombre</label>
					<input
						type="text"
						className="form-control"
						value={order.firstName}
						onChange={(e) => updateOrder('firstName', e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Apellido</label>
					<input
						type="text"
						className="form-control"
						value={order.lastName}
						onChange={(e) => updateOrder('lastName', e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Correo Electrónico</label>
					<input
						type="email"
						className="form-control"
						value={order.email}
						onChange={(e) => updateOrder('email', e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Teléfono</label>
					<input
						type="text"
						className="form-control"
						value={order.phone}
						onChange={(e) => updateOrder('phone', e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Dirección de Envío</label>
					<input
						type="text"
						className="form-control"
						value={order.shippingAddress}
						onChange={(e) => updateOrder('shippingAddress', e.target.value)}
					/>
				</div>

				{/* Métodos de pago */}
				<div className="mb-3">
					<label className="form-label">Método de Pago</label>
					<select
						className="form-select"
						value={order.paymentMethod}
						onChange={(e) => updateOrder('paymentMethod', e.target.value)}
					>
						<option value="" disabled>Seleccionar método de pago</option> 
						{paymentMethods.map((method, index) => (
							<option key={index} value={method}>
								{method}
							</option>
						))}
					</select>
				</div>

				{/* Métodos de envío */}
				<div className="mb-3">
					<label className="form-label">Método de Envío</label>
					<select
						className="form-select"
						value={order.shippingMethod}
						onChange={(e) => updateOrder('shippingMethod', e.target.value)}
					>
						<option value="" disabled>Seleccionar método de envío</option>  
						{shippingMethods.map((method, index) => (
							<option key={index} value={method}>
								{formatMethodName(method)} 
							</option>
						))}
					</select>
				</div>

				{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

				<button
					type="button"
					className="btn btn-success"
					onClick={handleSubmit}
					disabled={isProcessing}
				>
					{isProcessing ? 'Procesando...' : 'Comprar'}
				</button>
			</form>
		</div>
	);
};

export default CheckoutPage;
