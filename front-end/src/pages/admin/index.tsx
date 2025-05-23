import React from 'react';
import { useAdminNavigation } from './hooks';

const AdminHome: React.FC = () => {
  const { goToProductPublishPanel, goToRegisterPyme } = useAdminNavigation();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      {/* Contenedor principal centrado */}
      <div className="text-center" style={{ maxWidth: '800px', width: '100%' }}>
        {/* Título grande */}
        <h1 className="display-4 fw-bold mb-5 text-primary">Dashboard Admin</h1>
        
        {/* Sección de acciones */}
        <div className="bg-white rounded-4 shadow-sm p-5 mb-5">
          <h2 className="h1 mb-4">Acciones Rápidas</h2>
          
          {/* Botones gigantes */}
          <div className="d-grid gap-4">
            <button
              onClick={goToProductPublishPanel}
              className="btn btn-primary btn-lg py-4 fs-3 rounded-3"
            >
              <i className="bi bi-upload me-3"></i>
              Panel de Publicación
              <div className="fs-5 mt-2 fw-normal">Gestiona los productos del catálogo</div>
            </button>
            
            <button
              onClick={goToRegisterPyme}
              className="btn btn-secondary btn-lg py-4 fs-3 rounded-3"
            >
              <i className="bi bi-building me-3"></i>
              Registrar PYME
              <div className="fs-5 mt-2 fw-normal">Registra empresas registradas</div>
            </button>
          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <button className="btn btn-outline-danger btn-lg px-5 py-3 fs-4">
          <i className="bi bi-box-arrow-right me-2"></i>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default AdminHome;