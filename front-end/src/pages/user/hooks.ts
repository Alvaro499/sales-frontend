import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationFactory } from '../../utilities/validations/validationFactory';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User.models';

// Hook para manejar el formulario de registro de usuario
export const useRegisterForm = () => {
  const navigate = useNavigate();

  // Estado para datos del formulario
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
  });

  // Estado para errores y envío
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Actualiza el estado al cambiar los campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // Valida y envía el formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas con ayuda de ValidationFactory
    if (!formData.name.trim()) {
      setError('El nombre es requerido');
      return;
    }
    const emailValidator = ValidationFactory.create('auth.email');
    const emailValidation = emailValidator.validate(formData.email);
    if (!emailValidation.isValid) {
      setError(emailValidation.error || 'Correo inválido');
      return;
    }
    const passwordValidator = ValidationFactory.create('auth.password');
    const passwordValidation = passwordValidator.validate(formData.password);
    if (!passwordValidation.isValid) {
      setError(passwordValidation.error || 'Contraseña inválida');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Llamada al servicio de registro
      const response = await AuthService.registerUser(formData);

      if ('status' in response && response.status === 'OK') {
        navigate('/login');
        return;
      }

      // Manejo de posibles errores en la respuesta
      if ('message' in response) {
        if (response.message === 'User already exists') {
          setError('El correo electrónico ya está registrado');
        } else {
          setError('Error al registrar. Por favor intenta nuevamente.');
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
