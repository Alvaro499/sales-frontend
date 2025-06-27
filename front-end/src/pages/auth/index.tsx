import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/forms/AuthForms';
import { showRecoveryAlert } from '../../utilities/alerts/recoveryAlert';
import './styles.css'; 

// Componente de página de autenticación
const AuthPage = () => {
  const navigate = useNavigate(); // Hook para navegación

  // Función que se ejecuta tras login exitoso
  const handleSuccess = (data: any) => {
    navigate('/'); // Redirige a la página principal
  };

  return (
    <div className="containerLogin">
      <div className="formWrapperLogin">
        {/* Formulario de autenticación */}
        <AuthForm 
          isLogin={true}
          onSuccess={handleSuccess}
        />
        {/* Botón para recuperación de contraseña */}
        <button 
          onClick={showRecoveryAlert}
          className="btn btn-link d-block mx-auto mt-2"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
