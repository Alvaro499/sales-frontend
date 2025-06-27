import { useState } from 'react';
import { AuthService } from '../../services/auth.service';
import { AuthCredentials } from '../../models/Auth.models';

// Hook que maneja el formulario de autenticación
export const useAuthForm = () => {
  // Estado para los datos del formulario
  const [formData, setFormData] = useState<AuthCredentials>({
    email: '',
    password: ''
  });
  // Estado para los errores de validación
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  // Estado para indicar si el formulario está en envío
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Estado para errores devueltos por la API
  const [apiError, setApiError] = useState<string | null>(null);

  // Función para validar los campos del formulario
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

  // Maneja el cambio en los inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error || undefined }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setApiError(null);

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

      if ('code' in response) {
        setApiError('Usuario o contraseña inválido');
        return false;
      }

      return response; 
    } catch (error) {
       setApiError('Ocurrió un error al intentar iniciar sesión. Intente nuevamente.');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Devuelve los estados y funciones para usar en el componente
  return {
    formData,
    errors,
    isSubmitting,
    apiError,
    handleChange,
    handleSubmit
  };
};
