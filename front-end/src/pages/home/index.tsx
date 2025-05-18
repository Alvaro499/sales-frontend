import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from './hooks';
import { Product } from './types';

const Home: React.FC = () => {
	const { products, categories, loading, error } = useProducts();
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const navigate = useNavigate();

	// Filtrado combinado por categoría y nombre
	const filteredProducts = products.filter(product => {
		const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
		const matchesCategory =
			selectedCategory === 'all' || product.category_id === Number(selectedCategory);
		return matchesSearch && matchesCategory;
	});

	return (
		<>
			{/* Navbar */}
			<nav
				className='navbar navbar-expand-lg navbar-light bg-light'
				role='navigation'
				aria-label='Main navigation'
			>
				<div className='container-fluid'>
					<a
						className='navbar-brand d-flex align-items-center'
						href='/'
						aria-label='Logo de la empresa'
					>
						<img
							src='https://d500.epimg.net/cincodias/imagenes/2015/05/08/pyme/1431098283_691735_1431098420_noticia_normal.jpg'
							alt='Logo de la empresa'
							width={40}
							height={40}
							className='d-inline-block align-text-top me-2'
							style={{ objectFit: 'contain' }}
						/>
						<span>PYME Site</span>
					</a>

					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Alternar navegación'
					>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div className='collapse navbar-collapse' id='navbarSupportedContent'>
						<form
							className='d-flex ms-auto'
							role='search'
							aria-label='Buscar productos'
						>
							<input
								className='form-control me-2'
								type='search'
								placeholder='Buscar productos'
								aria-label='Buscar productos'
								value={search}
								onChange={e => setSearch(e.target.value)}
							/>
						</form>

						{/* Dropdown categorías */}
						<select
							className='form-select ms-3'
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

						<button
							className='btn btn-primary ms-3'
							type='button'
							aria-label='Iniciar sesión'
							onClick={() => navigate('/registro')}
						>
							Login
						</button>
						<button className='btn btn-primary ms-3' type='button' aria-label='Admin'>
							Admin
						</button>
					</div>
				</div>
			</nav>

			{/* Contenido principal */}
			<main className='container my-4' role='main'>
				<h1 tabIndex={0}>Productos Disponibles</h1>

				{loading && <p>Cargando productos...</p>}
				{error && (
					<p className='text-danger' role='alert'>
						{error}
					</p>
				)}

				<div className='row'>
					{filteredProducts.length === 0 && !loading && (
						<p>No se encontraron productos.</p>
					)}

					{filteredProducts.map((product: Product) => (
						<div key={product.product_id} className='col-12 col-md-6 col-lg-4 mb-4'>
							<article
								className='card h-100'
								tabIndex={0}
								aria-labelledby={`producto-${product.product_id}-nombre`}
								aria-describedby={`producto-${product.product_id}-descripcion`}
							>
								<img
									src={product.url_img}
									alt={`Imagen de ${product.name}`}
									className='card-img-top'
									style={{ objectFit: 'cover', height: '200px' }}
								/>
								<div className='card-body'>
									<h2
										id={`producto-${product.product_id}-nombre`}
										className='card-title h5'
									>
										{product.name}
									</h2>
									<p
										id={`producto-${product.product_id}-descripcion`}
										className='card-text'
									>
										{product.description}
									</p>
									<p className='card-text fw-bold'>${product.price.toFixed(2)}</p>
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
