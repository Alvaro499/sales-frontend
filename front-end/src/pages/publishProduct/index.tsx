import React from 'react';
import usePublishProduct from './hooks';
import './style.css';

const ProductPublishForm = () => {
	const {
		product,
		categories,
		error,
		isLoading,
		handleInputChange,
		handleCategoryChange,
		handleImageUrlChange,
		handlePublish,
	} = usePublishProduct();

	return (
		<div className='container mt-4' style={{ maxWidth: 600 }}>
			<h2 className='mb-4'>Publicar Producto</h2>

			<form
				onSubmit={e => {
					e.preventDefault();
					handlePublish();
				}}
			>
				{/* Nombre */}
				<div className='mb-3'>
					<label htmlFor='name' className='form-label'>
						Nombre del Producto
					</label>
					<input
						type='text'
						className='form-control'
						id='name'
						name='name'
						value={product.name}
						onChange={handleInputChange}
						placeholder='Nombre del producto'
					/>
				</div>

				{/* Descripción */}
				<div className='mb-3'>
					<label htmlFor='description' className='form-label'>
						Descripción
					</label>
					<textarea
						className='form-control'
						id='description'
						name='description'
						value={product.description}
						onChange={handleInputChange}
						placeholder='Descripción del producto'
						rows={4}
					></textarea>
				</div>

				{/* Precio */}
				<div className='mb-3'>
					<label htmlFor='price' className='form-label'>
						Precio
					</label>
					<input
						type='number'
						className='form-control'
						id='price'
						name='price'
						value={product.price || ''}
						onChange={handleInputChange}
						placeholder='29.99'
						min='0'
						step='0.01'
					/>
				</div>

				{/* Categoría (Selección múltiple) */}
				<div className='mb-3'>
					<label htmlFor='category' className='form-label'>
						Categorías
					</label>
					<div>
						{categories.length === 0 ? (
							<p>No se encontraron categorías.</p> 
						) : (
							categories.map(cat => (
								<div key={cat.id} className='form-check'>
									<input
										type='checkbox'
										className='form-check-input'
										id={`category-${cat.id}`}
										value={String(cat.id)}
										checked={product.category.includes(String(cat.id))}
										onChange={handleCategoryChange}
									/>
									<label
										className='form-check-label'
										htmlFor={`category-${cat.id}`}
									>
										{cat.name}
									</label>
								</div>
							))
						)}
					</div>
				</div>

				{/* URLs imágenes */}
				<div className='mb-3'>
					<label htmlFor='images' className='form-label'>
						URLs de Imágenes
					</label>
					<input
						type='text'
						className='form-control'
						id='images'
						name='images'
						value={product.images.join(', ')}
						onChange={handleImageUrlChange}
						placeholder='https://example.com/image1.jpg, https://example.com/image2.jpg'
					/>
					<small className='form-text text-muted'>Separadas por coma.</small>
				</div>

				{/* Stock */}
				<div className='mb-3'>
					<label htmlFor='stock' className='form-label'>
						Stock
					</label>
					<input
						type='number'
						className='form-control'
						id='stock'
						name='stock'
						value={product.stock}
						onChange={handleInputChange}
						placeholder='100'
						min='0'
					/>
				</div>

				{/* Promoción */}
				<div className='mb-3'>
					<label htmlFor='promotion' className='form-label'>
						Promoción
					</label>
					<input
						type='text'
						className='form-control'
						id='promotion'
						name='promotion'
						value={product.promotion || ''}
						onChange={handleInputChange}
						placeholder='20% off'
					/>
				</div>

				{/* Pyme ID */}
				<div className='mb-3'>
					<label htmlFor='pymeId' className='form-label'>
						Pyme ID
					</label>
					<input
						type='text'
						className='form-control'
						id='pymeId'
						name='pyme_id'
						value={product.pyme_id}
						disabled
						onChange={handleInputChange}
						placeholder='uuid...'
					/>
				</div>

				{/* Disponible */}
				<div className='form-check mb-3'>
					<input
						className='form-check-input'
						type='checkbox'
						id='available'
						name='available'
						checked={product.available}
						onChange={e => handleInputChange(e)}
					/>
					<label className='form-check-label' htmlFor='available'>
						Disponible
					</label>
				</div>

				{/* Error */}
				{error && <p className='text-danger'>{error}</p>}

				{/* Botones */}
				<div className='d-flex justify-content-between'>
					<button
						type='button'
						className='btn btn-secondary'
						onClick={() => window.history.back()}
						disabled={isLoading}
					>
						Cancelar
					</button>
					<button type='submit' className='btn btn-primary' disabled={isLoading}>
						{isLoading ? (
							<span
								className='spinner-border spinner-border-sm'
								role='status'
								aria-hidden='true'
							></span>
						) : (
							'Publicar Producto'
						)}
					</button>
				</div>
			</form>
		</div>
	);
};

export default ProductPublishForm;
