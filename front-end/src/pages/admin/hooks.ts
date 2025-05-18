import { useNavigate } from 'react-router-dom';

export function useAdminNavigation() {
  const navigate = useNavigate();

  function goToProductPublishPanel() {
    navigate('/productPublishPanel');
  }

  function goToRegisterPyme() {
    navigate('/registro');
  }

  return { goToProductPublishPanel, goToRegisterPyme };
}
