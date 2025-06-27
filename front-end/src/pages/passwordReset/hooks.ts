import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/auth.service';
import { isErrorResponse, isOkResponse } from './types';

// Hook para manejar el reseteo de contraseña
export const usePasswordReset = (token?: string) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para enviar la nueva contraseña al backend
  const resetPassword = async (newPassword: string): Promise<void> => {
    if (!token) {
      setMessage({ text: 'Token inválido', isError: true });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await AuthService.resetPassword({ token, newPassword });

      if (isErrorResponse(response)) {
        setMessage({ text: response.message, isError: true });
      } else if (isOkResponse(response)) {
        setMessage({ text: 'Contraseña cambiada exitosamente.', isError: false });
        setTimeout(() => navigate('/login'), 2000); // Redirige tras éxito
      } else {
        setMessage({ text: 'Respuesta del servidor no reconocida', isError: true });
      }
    } catch {
      setMessage({ text: 'Error de conexión. Por favor intenta nuevamente.', isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { resetPassword, message, isSubmitting };
};
