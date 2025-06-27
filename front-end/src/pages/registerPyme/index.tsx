import { useRegisterForm } from './hooks';
import { RegistrationForm } from '../../components/forms/RegistrationPymeForms';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const RegisterPymePage = () => {
  // Obtiene estado y funciones para manejar el formulario de registro de Pyme
  const { formData, error, isSubmitting, handleChange, handleSubmit } = useRegisterForm();

  return (
    <div className='register-page-container'>
      <div className='registration-wrapper'>
        {/* Renderiza el formulario de registro con sus datos, errores y eventos */}
        <RegistrationForm
          formData={formData}
          error={error}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default RegisterPymePage;
