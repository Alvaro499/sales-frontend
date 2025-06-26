import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { VerificationRequest } from '../../models/AuthPyme.models';
import { VerificationHook } from './types';

export const useVerification = (): VerificationHook => {
  // Obtiene userId desde query params
  const location = useLocation();
  const navigate = useNavigate();
  const userId = new URLSearchParams(location.search).get('userId') || '';

  // Estados para código, error y envío
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualiza código validando que sea solo números y máximo 4 dígitos
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value.replace(/\D/g, '').slice(0, 4));
    if (error) setError('');
  };

  // Valida y envía el código de verificación
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

      // Manejo de errores específicos según el código y mensaje
      if ('code' in response && response.code >= 400) {
        let errorMessage = 'Error en la verificación';

        if (response.code === 400 && response.message === 'INVALID_CONFIRMATION_CODE') {
          errorMessage = response.params?.[0] || 'El código no coincide con el enviado';
        } else if (response.code === 409 && response.message === 'CONFIRMATION_CODE_ALREADY_USED') {
          errorMessage = response.params?.[0] || 'Este código ya fue utilizado anteriormente';
        } else {
          errorMessage = response.message || `Error en la verificación (${response.code})`;
        }

        setError(errorMessage);
        return;
      }

      // Si es exitoso, redirige a panel de admin
      navigate('/admin');

    } catch (err) {
      setError('Error de conexión. Por favor intenta nuevamente.');
      console.error('Error en verificación:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navega de regreso a la página de registro, pasando userId
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
