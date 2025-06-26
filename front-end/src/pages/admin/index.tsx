import React from 'react';
import { useAdminNavigation } from './hooks';

// Componente principal del panel de administración
const AdminHome: React.FC = () => {
  // Obtener funciones de navegación del hook personalizado
  const { goToProductPublishPanel, goToRegisterPyme } = useAdminNavigation();

  return (
    // Contenedor principal centrado y con estilo básico
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <div className="text-center" style={{ maxWidth: '800px', width: '100%' }}>
        {/* Título de la página */}
        <h1 className="mb-4 text-primary" style={{ fontSize: '2.2rem', fontWeight: '600' }}>
          Panel de Administración
        </h1>

        {/* Sección con acciones rápidas disponibles */}
        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
          <h2 className="mb-4" style={{ fontSize: '1.8rem' }}>Acciones Rápidas</h2>

          {/* Botones para navegar a secciones importantes */}
          <div className="d-grid gap-3">
            <button
              onClick={goToProductPublishPanel}
              className="btn btn-primary py-3 rounded-3 d-flex flex-column align-items-center"
              style={{ fontSize: '1.2rem' }}
            >
              {/* Botón para panel de publicación */}
              <div className="d-flex align-items-center">
                <i className="bi bi-upload me-2"></i>
                Panel de Publicación
              </div>
              <div className="fs-6 mt-1 fw-light">Gestiona los productos del catálogo</div>
            </button>

            <button
              onClick={goToRegisterPyme}
              className="btn btn-secondary py-3 rounded-3 d-flex flex-column align-items-center"
              style={{ fontSize: '1.2rem' }}
            >
              {/* Botón para registrar Pymes */}
              <div className="d-flex align-items-center">
                <i className="bi bi-building me-2"></i>
                Registrar PYME
              </div>
              <div className="fs-6 mt-1 fw-light">Registra empresas en el sistema</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
