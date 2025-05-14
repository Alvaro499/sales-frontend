import { useRegisterForm } from './hooks';
import { RegistrationForm } from '../../components/forms/RegistrationForms';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

export const RegisterPymePage = () => {
  const { formData, error, isSubmitting, handleChange, handleSubmit } = useRegisterForm();

  const handleRecoveryClick = () => {
    // Lógica de recuperación aquí
    alert('Funcionalidad de recuperación');
  };

  return (
    <div className="register-page-container">
      <div className="registration-wrapper">
        <RegistrationForm
          formData={formData}
          error={error}
          isSubmitting={isSubmitting}
          onRecoveryClick={handleRecoveryClick}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RegisterPymePage;