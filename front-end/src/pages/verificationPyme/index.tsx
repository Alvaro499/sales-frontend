import { VerificationForm } from '../../components/forms/VerificationForm';
import { useVerification } from './hooks';
import './styles/index.css';

// Página para mostrar el formulario de verificación de código
export const VerificationPage = () => {
  // Obtiene estado y funciones del hook personalizado
  const {
    code,
    error,
    isSubmitting,
    handleCodeChange,
    handleVerify,
    handleBack,
  } = useVerification();

  return (
    <div className='verification-page-container'>
      <div className='verification-wrapper'>
        {/* Renderiza formulario con props para control y acciones */}
        <VerificationForm
          code={code}
          error={error}
          isSubmitting={isSubmitting}
          onCodeChange={handleCodeChange}
          onSubmit={handleVerify}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default VerificationPage;
