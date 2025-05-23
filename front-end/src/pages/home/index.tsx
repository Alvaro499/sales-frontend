import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from './hooks';
import { Product } from '../../models/Products.models';
import './Styles.css';

const Home: React.FC = () => {
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const { filteredProducts, categories, loading, error } = useProducts(search, selectedCategory);

	const navigate = useNavigate();

	return (
		<>
			{/* Navbar elegante */}
			<nav className='navbar navbar-expand-lg navbar-light bg-light shadow-sm py-3'>
				<div className='container'>
					<a className='navbar-brand d-flex align-items-center' href='/'>
						<img
							src='https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg'
							alt='Logo de la empresa'
							width={45}
							height={45}
							className='me-2 rounded shadow-sm'
							style={{ objectFit: 'contain' }}
						/>
						<strong className='fs-4'>PYME Site</strong>
					</a>

					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarContent'
						aria-controls='navbarContent'
						aria-expanded='false'
						aria-label='Alternar navegación'
					>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div
						className='collapse navbar-collapse justify-content-end'
						id='navbarContent'
					>
						<div className='navbar-actions d-flex align-items-center gap-3'>
							<input
								className='form-control search-bar'
								type='search'
								placeholder='Buscar productos...'
								aria-label='Buscar productos'
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>

							<select
								className='form-select'
								aria-label='Filtrar por categoría'
								value={selectedCategory}
								onChange={e => setSelectedCategory(e.target.value)}
								style={{ maxWidth: '180px' }}
							>
								<option value='all'>Todas las categorías</option>
								{categories.map(cat => (
									<option key={cat.category_id} value={cat.category_id}>
										{cat.name}
									</option>
								))}
							</select>

							<div className='d-flex gap-2'>
								<button
									className='btn btn-outline-primary'
									onClick={() => navigate('/registro')}
								>
									Login
								</button>
								<button
									className='btn btn-primary'
									onClick={() => navigate('/admin')}
								>
									Admin
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<main className='container py-5'>
				<h1 className='text-center mb-5'>Productos Disponibles</h1>

				{loading && <p className='text-center'>Cargando productos...</p>}
				{error && !categories.length && (
					<p className='text-center text-danger' role='alert'>
						{error}
					</p>
				)}

				{!loading && filteredProducts.length === 0 && !error && (
					<p className='text-center text-muted'>No se encontraron productos.</p>
				)}

				<div className='row g-4'>
					{filteredProducts.map((product: Product) => (
						<div key={product.product_id} className='col-12 col-md-6 col-lg-4'>
							<article
								className='card h-100 border-0 shadow-lg rounded-4 product-card'
								tabIndex={0}
								aria-labelledby={`producto-${product.product_id}-nombre`}
								aria-describedby={`producto-${product.product_id}-descripcion`}
							>
								<img
									src={product.url_img}
									alt={`Imagen de ${product.name}`}
									className='card-img-top rounded-top'
									style={{ objectFit: 'cover', height: '200px' }}
								/>
								<div className='card-body d-flex flex-column'>
									<h2
										id={`producto-${product.product_id}-nombre`}
										className='card-title h5 text-primary'
									>
										{product.name}
									</h2>
									<p
										id={`producto-${product.product_id}-descripcion`}
										className='card-text text-muted'
									>
										{product.description}
									</p>
									<p className='fw-bold fs-5 text-dark'>
										${product.price.toFixed(2)}
									</p>

									<button
										className='btn btn-outline-primary mt-3'
										onClick={() => navigate(`/producto/${product.product_id}`)}
									>
										Ver Detalle
									</button>
								</div>
							</article>
						</div>
					))}
				</div>
			</main>
		</>
	);
};

export default Home;
