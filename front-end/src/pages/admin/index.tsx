import React from 'react';
import { useAdminNavigation } from './hooks';

const AdminHome: React.FC = () => {
  const { goToProductPublishPanel, goToRegisterPyme } = useAdminNavigation();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: '100vh', gap: '1rem' }}
    >
      <button
        type="button"
        className="btn btn-primary"
        onClick={goToProductPublishPanel}
      >
        Product Publish Panel
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={goToRegisterPyme}
      >
        Register Pyme Page
      </button>
    </div>
  );
};

export default AdminHome;
