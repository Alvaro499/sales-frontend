import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { useApiHandler } from '../../hooks/useApiHandler';

export const usePasswordReset = (token?: string) => {
  const navigate = useNavigate();
  const { handleMutation } = useApiHandler();
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetPassword = async (newPassword: string): Promise<void> => {
    if (!token) {
      setMessage({ text: 'Token inválido', isError: true });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await handleMutation(
        AuthService.resetPassword,
        { token, newPassword }
      );

      if (response.isSuccess) {
        setMessage({
          text: 'Contraseña cambiada exitosamente. Redirigiendo...',
          isError: false
        });
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMessage({
          text: `${response.message || 'Error al cambiar la contraseña'}`,
          isError: true
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return { resetPassword, message, isSubmitting };
};