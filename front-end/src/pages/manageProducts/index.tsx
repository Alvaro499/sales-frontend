import React, { useEffect, useState } from 'react';
import { Product } from '../../models/Products.models';
import useProductManagement from './hooks';
import './style.css';
import { useNavigate } from 'react-router-dom';

const ProductPublishPanel = () => {
    const {
        products,
        getProductsFromAPI,
        updateProductFromAPI,
        unpublishProductFromAPI,
        error,
        applyPromotionFromAPI
    } = useProductManagement();

    useEffect(() => {
        getProductsFromAPI();
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isStockModalVisible, setIsStockModalVisible] = useState(false);
    const [isPromoModalVisible, setIsPromoModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [newStock, setNewStock] = useState<number>(0);
    const [promoForm, setPromoForm] = useState({
        title: '',
        description: '',
        productId: '',
        discountType: '',
        discountValue: '',
        startDate: '',
        endDate: ''
    });
    const navigate = useNavigate();

    const showModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const showViewModal = (product: Product) => {
        setSelectedProduct(product);
        setIsViewModalVisible(true);
    };

    const showStockModal = (product: Product) => {
        setSelectedProduct(product);
        setNewStock(product.stock);
        setIsStockModalVisible(true);
    };

    const handlePromoOpen = (product: Product) => {
        setSelectedProduct(product); // <-- Agrega esta línea
        setPromoForm({ ...promoForm, productId: product.id });
        setIsPromoModalVisible(true);
    };

    // Handler para despublicar producto
    const handleConfirm = async () => {
        setIsModalVisible(false);
        if (selectedProduct) {
            const updatedProduct = { ...selectedProduct, is_active: false };
            await unpublishProductFromAPI(selectedProduct.id, updatedProduct);
        }
        getProductsFromAPI();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleViewModalClose = () => {
        setIsViewModalVisible(false);
    };

    const handleStockModalClose = () => {
        setIsStockModalVisible(false);
    };

    const handlePromoClose = () => setIsPromoModalVisible(false);

    const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStock(Number(e.target.value));
    };

    // Handler para actualizar stock
    const handleStockConfirm = async () => {
        if (selectedProduct) {
            const updatedProduct = {
                ...selectedProduct,
                stock: newStock,
                available: newStock > 0
            };
            await updateProductFromAPI(selectedProduct.id, updatedProduct);
        }
        setIsStockModalVisible(false);
        getProductsFromAPI();
    };

    const handlePromoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setPromoForm({ ...promoForm, [e.target.name]: e.target.value });
    };

    const handlePromoSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedProduct && promoForm.discountValue !== '') {
        try {
          await applyPromotionFromAPI(selectedProduct.id, promoForm.discountValue);
          getProductsFromAPI();
        } finally {
          setIsPromoModalVisible(false);
        }
      }
    };

    return (
              <div className="container panel-container mt-4">
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
                    Home
                  </button>
                </div>
              </div>
            </nav>
            <div className="text-center">
              <h2>Panel de Productos Publicados</h2>
              <p className="fw-light small mb-2">Bienvenido Pyme X</p>
            </div>
            <button
                className='btn btn-primary'
                onClick={() => navigate('/newProduct')}
            >
                Agregar producto
            </button>
            <br />
            <br />
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-12 col-sm-6 col-md-4 mb-4">
                        <div className="card h-100 border-0 shadow-sm transition-all product-card">
                          <img
                                src={product.images && product.images.length > 0 ? product.images[0] : ''}
                                alt={product.name}
                                className="card-img-top"
                                style={{
                                  objectFit: 'cover',
                                  height: '180px',
                                  borderTopLeftRadius: '0.5rem',
                                  borderTopRightRadius: '0.5rem',
                                  background: '#f8f9fa',
                                }}
                            />
                            <div className="card-body d-flex flex-column">
                              <h3 className="card-title h5 mb-2">{product.name}</h3>
                              <p className="card-text text-muted small flex-grow-1">
                                {product.description && product.description.length > 100
                                  ? `${product.description.substring(0, 100)}...`
                                  : product.description}
                              </p>
                              <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                  <span className="fw-bold fs-5 text-primary">
                                    ₡{product.price?.toLocaleString('es-CR')}
                                  </span>
                                    {product.active && product?.promotion && Number(product.promotion) > 0 ? (
                                    <div className="mt-1">
                                      <span className="badge bg-success">
                                      Promoción actual: {product.promotion}%
                                      </span>
                                    </div>
                                    ) : null}
                                    {product.active && (
                                      product.available ? (
                                        <div className="mt-1">
                                          <span className="text-secondary small">Stock: {product.stock}</span>
                                        </div>
                                      ) : (
                                        <div className="mt-1">
                                          <span className="badge bg-danger">
                                            No disponible (Stock: {product.stock})
                                          </span>
                                        </div>
                                      )
                                    )}
                                </div>
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => showViewModal(product)}
                                >
                                  Ver más
                                </button>
                              </div>
                            </div>
                            <div className="d-flex gap-2 mt-2 px-3 pb-3">
                              {product.active && (
                                <button className="btn btn-sm btn-outline-success" onClick={() => handlePromoOpen(product)}>
                                  Promoción
                                </button>
                              )}
                              {product.active && (
                                <button className="btn btn-sm btn-outline-secondary" onClick={() => showStockModal(product)}>
                                  Administrar producto
                                </button>
                              )}
                              {product.active && (
                                <button className="btn btn-sm btn-outline-danger" onClick={() => showModal(product)}>
                                  Despublicar
                                </button>
                              )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal para despublicar */}
            <div className={`modal fade ${isModalVisible ? 'show d-block' : ''}`} tabIndex={-1} style={{ background: isModalVisible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Despublicar Producto</h5>
                            <button type="button" className="btn-close" onClick={handleCancel}></button>
                        </div>
                        <div className="modal-body">
                            <p>Producto: {selectedProduct?.name}</p>
                            <p>Estado: {selectedProduct?.active ? 'Publicado' : 'Despublicado'}</p>
                            <p>¿Confirmar despublicación?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleConfirm}>Confirmar</button>
                            <button className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para ver productos despublicados */}
            <div className={`modal fade ${isViewModalVisible ? 'show d-block' : ''}`} tabIndex={-1} style={{ background: isViewModalVisible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Información del producto</h5>
                            <button type="button" className="btn-close" onClick={handleViewModalClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Producto: {selectedProduct?.name}</p>
                            <p>Estado actual: {selectedProduct?.active ? 'Publicado' : 'Despublicado'}</p>
                            {selectedProduct?.active ? (
                                <p>¡Este producto está visible para los clientes!</p>
                            ) : (
                                <p>¡Este producto ya no está visible para los clientes!</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleViewModalClose}>Aceptar</button>
                            <button className="btn btn-secondary" onClick={handleViewModalClose}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para administrar producto (actualizar stock) */}
            <div className={`modal fade ${isStockModalVisible ? 'show d-block' : ''}`} tabIndex={-1} style={{ background: isStockModalVisible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Actualizar Stock</h5>
                            <button type="button" className="btn-close" onClick={handleStockModalClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-between mb-3">
                                <span>Producto: {selectedProduct?.name}</span>
                                <span>Stock actual: {selectedProduct?.stock}</span>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <div className="me-4">
                                    <label>Nuevo stock:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={newStock}
                                        onChange={handleStockChange}
                                        style={{ width: 80, display: 'inline-block', marginLeft: 8 }}
                                    />
                                </div>
                                {newStock === 0 && (
                                    <span className="text-warning ms-3">
                                        &#9888; El producto se marcará como 'No disponible' en el catálogo.
                                    </span>
                                )}
                                 {newStock < 0 && (
                                    <span className="text-warning ms-3">
                                        &#9888; El valor ingresado no es válido.
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" disabled={newStock < 0} onClick={handleStockConfirm}>Confirmar</button>
                            <button className="btn btn-secondary" onClick={handleStockModalClose}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para crear o editar promoción */}
            <div className={`modal fade ${isPromoModalVisible ? 'show d-block' : ''}`} tabIndex={-1} style={{ background: isPromoModalVisible ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <form onSubmit={handlePromoSubmit}>
                    <div className="modal-header">
                      <h5 className="modal-title">Aplicar Promoción</h5>
                      <button type="button" className="btn-close" onClick={handlePromoClose}></button>
                    </div>
                    <div className="modal-body">
                      <div className="row mb-3">
                        <div className="col-12 col-md-6 mb-2 mb-md-0">
                          <strong>Producto:</strong> {selectedProduct?.name}
                        </div>
                        <div className="col-12 col-md-6 text-md-end">
                          <strong>Precio actual:</strong> ₡{selectedProduct?.price?.toLocaleString('es-CR')}
                          {selectedProduct?.promotion && (
                            <div className="mt-1">
                              <span className="badge bg-success">
                                Promoción actual: {selectedProduct.promotion}%
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3 align-items-end">
                        <div className="col-12 col-md-9 mb-2 mb-md-0">
                          <label className="form-label">Valor:</label>
                          <input
                            className="form-control"
                            name="discountValue"
                            value={promoForm.discountValue}
                            onChange={handlePromoChange}
                            required
                            placeholder="_"
                            type="number"
                            min="0"
                            max="90"
                          />
                          {Number(promoForm.discountValue) < 0 && (
                            <span className="text-warning ms-2">
                              &#9888; El valor no puede ser negativo.
                            </span>
                          )}
                          {Number(promoForm.discountValue) > 90 && (
                            <span className="text-warning ms-2">
                              &#9888; El valor no puede ser mayor que 90.
                            </span>
                          )}
                        </div>
                        <div className="col-12 col-md-3">
                          <button
                            type="submit"
                            className="btn btn-primary w-100 mt-3 mt-md-0"
                            disabled={
                              promoForm.discountValue === '' ||
                              Number(promoForm.discountValue) < 0 ||
                              Number(promoForm.discountValue) > 90
                            }
                          >
                            Aplicar
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={handlePromoClose}>Cancelar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
        </div>
    );
};

export default ProductPublishPanel;