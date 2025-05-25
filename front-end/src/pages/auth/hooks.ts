import { useState } from 'react';
import { AuthService } from '../../services/auth.service';
import { AuthCredentials } from '../../models/Auth.models';

export const useAuthForm = () => {
  const [formData, setFormData] = useState<AuthCredentials>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const validateField = (name: string, value: string) => {
    if (name === 'email') {
      if (!value) return 'El correo es requerido';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Correo inválido';
    }

    if (name === 'password') {
      if (!value) return 'La contraseña es requerida';
      if (value.length < 8) return 'Mínimo 8 caracteres';
    }

    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validación en tiempo real
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error || undefined }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setApiError(null);

    // Validación final
    const emailError = validateField('email', formData.email);
    const passwordError = validateField('password', formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined
      });
      setIsSubmitting(false);
      return false;
    }

    try {
      const response = await AuthService.login(formData);
      return response;
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Error desconocido');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    apiError,
    handleChange,
    handleSubmit
  };
};
