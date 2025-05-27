import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthValidations } from '../../utilities/validations/authFormValidation';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.models';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    const emailValidation = AuthValidations.validateEmail(formData.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error || 'Correo inválido');
      return;
    }

    const passwordValidation = AuthValidations.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.error || 'Contraseña inválida');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Llamada directa al servicio
      const response = await AuthService.registerUser(formData);

      // Manejo de respuesta
      if ('status' in response && response.status === 'OK') {
        navigate('/');
        return;
      }

      // Manejo de errores
      if ('errorCode' in response) {
        if (response.errorCode === 'EMAIL_EXISTS') {
          setError('El correo electrónico ya está registrado');
        } else {
          setError(response.message || 'Error al registrar. Por favor intenta nuevamente.');
        }
      } else {
        setError('Respuesta inesperada del servidor');
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Por favor intenta más tarde.');
      console.error('Registration error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    error,
    isSubmitting,
    handleChange,
    handleSubmit,
    setError,
  };
};