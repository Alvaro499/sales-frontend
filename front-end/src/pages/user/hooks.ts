import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ValidationFactory } from '../../utilities/validations/validationFactory';
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
      const response = await AuthService.registerUser(formData);

      if ('status' in response && response.status === 'OK') {
        navigate('/login');
        return;
      }

      if ('message' in response) {
        if (response.message === 'EMAIL_ALREADY_EXISTS') {
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
