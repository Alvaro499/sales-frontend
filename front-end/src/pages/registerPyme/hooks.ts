import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { ValidationFactory } from '../../utilities/validations/validationFactory';
import { useApiHandler } from '../../hooks/useApiHandler';
import { Pyme } from '../../models/Pymes.models';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { handleMutation } = useApiHandler();

  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    pymeName: '',
    email: '',
    phone: '',
    address: '',
    description: '',
    userId: ''
  });

  // Estado para errores generales y estado de envío
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Función para validar campos específicos usando un factory de validación
  const validateField = (fieldName: keyof Pyme, value: string): string | null => {
    try {
      let validatorType: string;

      switch (fieldName) {
        case 'pymeName':
          validatorType = 'pyme.name';
          break;
        case 'email':
          validatorType = 'pyme.email';
          break;
        case 'address':
          validatorType = 'pyme.address';
          break;
        case 'description':
          validatorType = 'pyme.description';
          break;
        default:
          return null;
      }

      const validationResult = ValidationFactory.validate(validatorType as any, value);
      return validationResult.isValid ? null : validationResult.error || 'Valor inválido';
    } catch (err) {
      return err instanceof Error ? err.message : 'Error en validación';
    }
  };

  // Manejador de cambios en los inputs, actualiza estado y limpia errores previos
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // Envío del formulario con validación, llamada a API y manejo de respuestas
  const handleSubmit = async (formDataWithoutUserId: Omit<Pyme, 'userId'>) => {
    // Validar todos los campos excepto phone
    const errors: Record<string, string> = {};
    Object.entries(formDataWithoutUserId).forEach(([key, value]) => {
      if (key === 'phone') return;
      const fieldError = validateField(key as keyof Pyme, value);
      if (fieldError) errors[key] = fieldError;
    });

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0] || 'Formulario inválido');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const userId = localStorage.getItem('userId') || '';
      if (!userId) throw new Error('Usuario no autenticado');

      const completeFormData: Pyme = {
        ...formDataWithoutUserId,
        userId
      };

      const response = await handleMutation(
        pymeRegistrationService.register,
        completeFormData
      );

      if (response.isSuccess && !response.isError) {
        navigate(`/verification?userId=${encodeURIComponent(completeFormData.userId)}`);
        return;
      }

      // Manejo de mensajes de error específicos de la API
      switch (response.message) {
        case 'EMAIL_ALREADY_EXISTS':
          setError('El correo electrónico ya está registrado');
          break;
        case 'NAME_ALREADY_EXISTS':
          setError('El nombre de la empresa ya está registrado');
          break;
        case 'Connection error':
          setError('Error de conexión. Intenta nuevamente');
          break;
        default:
          setError(response.message || 'Error al registrar. Intenta nuevamente.');
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado');
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
