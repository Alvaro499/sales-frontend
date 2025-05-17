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
    handleCheckboxChange,
    handleCategoryChange,
    handlePublish,
  } = usePublishProduct();

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Publicar Producto</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePublish();
        }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre del Producto
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Nombre del producto"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            placeholder="Descripción del producto"
            rows={4}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            value={product.price || ''}
            onChange={handleInputChange}
            placeholder="29.99"
            min="0"
            step="0.01"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="url_img" className="form-label">
            Imágenes (URL)
          </label>
          <input
            type="text"
            className="form-control"
            id="url_img"
            name="url_img"
            value={product.url_img}
            onChange={handleInputChange}
            placeholder="https://example.com/images/product1.jpg"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={handleInputChange}
            placeholder="100"
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="promotion" className="form-label">
            Promoción
          </label>
          <input
            type="text"
            className="form-control"
            id="promotion"
            name="promotion"
            value={product.promotion || ''}
            onChange={handleInputChange}
            placeholder="20% off this product"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pyme_id" className="form-label">
            Pyme ID
          </label>
          <input
            type="text"
            className="form-control"
            id="pyme_id"
            name="pyme_id"
            value={product.pyme_id || ''}
            onChange={handleInputChange}
            placeholder="123e4567-e89b-12d3-a456-426614174000"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category_id" className="form-label">
            Categoría
          </label>
          <select
            id="category_id"
            name="category_id"
            className="form-select"
            value={product.category_id || ''}
            onChange={(e) => handleCategoryChange(Number(e.target.value))}
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categories.map((cat) => (
              <option key={cat.category_id} value={cat.category_id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="available"
            name="available"
            checked={product.available}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="available">
            Disponible
          </label>
        </div>

        {error && <p className="text-danger">{error}</p>}

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => window.history.back()}
            disabled={isLoading}
          >
            Cancelar
          </button>

          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
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