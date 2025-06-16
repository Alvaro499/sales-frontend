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

      // Manejo de respuestas de error
      if ('code' in response && response.code >= 400) {
        let errorMessage = 'Error en la verificación';
        
        // Caso 1: Código inválido (400)
        if (response.code === 400 && response.message === 'INVALID_CONFIRMATION_CODE') {
          errorMessage = response.params?.[0] || 'El código no coincide con el enviado';
        } 
        // Caso 2: Código ya verificado (409)
        else if (response.code === 409 && response.message === 'CONFIRMATION_CODE_ALREADY_USED') {
          errorMessage = response.params?.[0] || 'Este código ya fue utilizado anteriormente';
        }
        // Caso 3: Otros errores
        else {
          errorMessage = response.message || `Error en la verificación (${response.code})`;
        }

        setError(errorMessage);
        return;
      }

      // Si no es error, redirigir al admin
      navigate('/admin');
      
    } catch (err) {
      setError('Error de conexión. Por favor intenta nuevamente.');
      console.error('Error en verificación:', err);
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