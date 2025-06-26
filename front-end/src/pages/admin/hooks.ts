import { useNavigate } from 'react-router-dom';

// Hook personalizado para manejar la navegación en la sección de admin
export function useAdminNavigation() {
  const navigate = useNavigate();

  // Función para ir al panel de publicación de productos
  function goToProductPublishPanel() {
    navigate('/productPublishPanel');
  }

  // Función para ir al formulario de registro de Pyme
  function goToRegisterPyme() {
    navigate('/registerPyme');
  }

  return { goToProductPublishPanel, goToRegisterPyme };
}
