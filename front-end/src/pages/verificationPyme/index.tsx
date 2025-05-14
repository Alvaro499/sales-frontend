import { VerificationForm } from '../../components/forms/VerificationForm';
import { useVerification } from './hooks';
import './styles/index.css';

export const VerificationPage = () => {
  const {
    email,
    verificationCode,
    error,
    isSubmitting,
    handleCodeChange,
    handleVerify,
    handleResendCode,
    handleBack,
  } = useVerification();

  return (
    <div className="verification-page-container">
      <div className="verification-wrapper">
        <VerificationForm
          email={email}
          verificationCode={verificationCode}
          error={error}
          isSubmitting={isSubmitting}
          onCodeChange={handleCodeChange}
          onSubmit={handleVerify}
          onResendCode={handleResendCode}
          onBack={handleBack}
        />
      </div>
    </div>
  );
};

export default VerificationPage;