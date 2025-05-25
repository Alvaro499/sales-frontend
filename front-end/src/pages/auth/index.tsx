import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/forms/AuthForms';
import { showRecoveryAlert } from '../../utilities/alerts/recoveryAlert';
import './styles.css'; 

const AuthPage = () => {
  const navigate = useNavigate();

  const handleSuccess = (data: any) => {
    navigate('/dashboard');
  };

  return (
    <div className="container">
      <div className="formWrapper">
        <AuthForm 
          isLogin={true}
          onSuccess={handleSuccess}
        />
        <button 
          onClick={showRecoveryAlert}
          className="btn btn-link"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>
    </div>
  );
};

export default AuthPage;