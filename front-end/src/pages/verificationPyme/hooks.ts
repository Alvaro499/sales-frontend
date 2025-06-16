import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { VerificationRequest } from '../../models/AuthPyme.models';
import { VerificationHook } from './types';

export const useVerification = (): VerificationHook => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = new URLSearchParams(location.search).get('userId') || '';

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.replace(/\D/g, '').slice(0, 4));
    if (error) setError('');
  };

  const handleVerify = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!userId) {
      setError('Usuario no identificado');
      return;
    }

    if (code.length !== 4) {
      setError('El código debe tener 4 dígitos');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const verificationData: VerificationRequest = { userId, code };
      const response = await pymeRegistrationService.verifyCode(verificationData);

      // Manejo mejorado de la respuesta
      if (response instanceof Object) {
        if ('status' in response && response.status === 'success') {
          navigate('/admin');
          return;
        }
        
        if ('message' in response && response.message.includes('verificado correctamente')) {
          navigate('/admin');
          return;
        }

        if ('message' in response) {
          setError(response.message);
          return;
        }
      }

      // Respuesta inesperada pero exitosa (código 200)
      navigate('/admin');
      
    } catch (err) {
      setError('Error de conexión. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/registro', { state: { userId } });
  };

  return {
    userId,
    code,
    error,
    isSubmitting,
    handleCodeChange,
    handleVerify,
    handleBack,
  };
};