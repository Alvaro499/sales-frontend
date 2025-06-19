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
        error
    } = useProductManagement();

    useEffect(() => {
        getProductsFromAPI();
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [isStockModalVisible, setIsStockModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [newStock, setNewStock] = useState<number>(0);
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

    return (
        <div className="container panel-container mt-4">
            <h2>Panel de Productos Publicados</h2>
            <p>Bienvenido Pyme X</p>
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
                        <div className="card h-100 product-card">
                          <img
									src={product.urlImg[0]}
									alt={`Imagen de ${product.name}`}
									className='card-img-top rounded-top'
									style={{ objectFit: 'cover', height: '200px' }}
							/>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Estado: {product.available ? 'Publicado' : 'Despublicado'}</p>
                                <p className="card-text">Precio: ${product.price}</p>
                                <p className="card-text">Stock: {product.stock}</p>
                                <div className="mt-auto">
                                    <button className="btn btn-link p-0 me-2" onClick={() => showViewModal(product)}>
                                        Ver
                                    </button>
                                    {product.available && (
                                        <button className="btn btn-link p-0 me-2">Promoción</button>
                                    )}
                                    {product.available && (
                                        <button className="btn btn-link p-0 me-2" onClick={() => showModal(product)}>
                                            Despublicar
                                        </button>
                                    )}
                                    {product.available && (
                                    <button className="btn btn-link p-0" onClick={() => showStockModal(product)}>
                                        Administrar producto
                                    </button>
                                    )}
                                </div>
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
                            <p>Estado: {selectedProduct?.available ? 'Publicado' : 'Despublicado'}</p>
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
                            <p>Estado actual: {selectedProduct?.available ? 'Publicado' : 'Despublicado'}</p>
                            {selectedProduct?.available ? (
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
        </div>
    );
};

export default ProductPublishPanel;