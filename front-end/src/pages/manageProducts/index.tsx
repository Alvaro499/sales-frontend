import React, { useEffect, useState } from 'react';
import { Product } from '../../models/Products.models';
import useProductManagement from './hooks';
import './style.css';

const ProductPublishPanel = () => {
    const { products, getProductsFromAPI, error } = useProductManagement();

    useEffect(() => {
        getProductsFromAPI();
    }, []);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const showModal = (product: Product) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const showViewModal = (product: Product) => {
        setSelectedProduct(product);
        setIsViewModalVisible(true);
    };

    const handleConfirm = () => {
        console.log(`Producto ${selectedProduct?.name} despublicado`);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleViewModalClose = () => {
        setIsViewModalVisible(false);
    };

    return (
        <div className="container panel-container mt-4">
            <h2>Panel de Productos Publicados</h2>
            <p>Bienvenido Pyme X</p>
            <div className="row">
                {products.map((product) => (
                    <div key={product.product_id} className="col-12 col-sm-6 col-md-4 mb-4">
                        <div className="card h-100 product-card">
                            <img
                                src={product.url_img}
                                className="card-img-top"
                                alt={product.name}
                                style={{ height: '180px', objectFit: 'cover' }}
                            />
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">Estado: {product.is_active ? 'Publicado' : 'Despublicado'}</p>
                                <p className="card-text">Precio: ${product.price}</p>
                                <p className="card-text">Stock: {product.stock}</p>
                                <div className="mt-auto">
                                    <button className="btn btn-link p-0 me-2" onClick={() => showViewModal(product)}>
                                        Ver
                                    </button>
                                    {product.is_active && (
                                        <button className="btn btn-link p-0 me-2">Promoción</button>
                                    )}
                                    {product.is_active && (
                                        <button className="btn btn-link p-0" onClick={() => showModal(product)}>
                                            Despublicar
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
                            <p>Estado: {selectedProduct?.is_active ? 'Publicado' : 'Despublicado'}</p>
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
                            <p>Estado actual: {selectedProduct?.is_active ? 'Publicado' : 'Despublicado'}</p>
                            {selectedProduct?.is_active ? (
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
        </div>
    );
};

export default ProductPublishPanel;