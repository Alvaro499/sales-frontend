import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { ValidationFactory } from '../../utilities/validations/validationFactory';
import { Pyme } from '../../models/Pymes.models';
import { useApiHandler } from '../../hooks/useApiHandler';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { handleMutation } = useApiHandler();

  const [formData, setFormData] = useState<Pyme>({
    pymeName: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Valida un campo individual usando ValidationFactory
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
      if (!validationResult.isValid) {
        return validationResult.error || 'Valor inválido';
      }
      return null;
    } catch (err) {
      return err instanceof Error ? err.message : 'Error en validación';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (error) setError(''); // Limpia error al cambiar cualquier campo
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar todos los campos (menos phone que no tiene validador)
    const errors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'phone') return;

      const fieldError = validateField(key as keyof Pyme, value);
      if (fieldError) errors[key] = fieldError;
    });

    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0] || 'Formulario inválido');
      return; // DETIENE envío si hay error
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await handleMutation(pymeRegistrationService.register, formData);

      if (
        response.isSuccess === true &&
        !response.errorCode &&
        !response.message?.includes('Error')
      ) {
        navigate(`/verification?email=${encodeURIComponent(formData.email)}`);
        return;
      }

      switch (response.message) {
        case 'EMAIL_ALREADY_EXISTS':
          setError('El correo electrónico de la empresa ya está registrado');
          break;
        case 'NAME_ALREADY_EXISTS':
          setError('El nombre de la empresa ya está registrado');
          break;
        case 'Connection error':
          setError('Existe un error de conexión, vuelve a intentarlo');
          break;
        default:
          setError(response.message || 'Error al registrar. Por favor intenta nuevamente.');
          break;
      }
    } catch (err) {
      setError('Ocurrió un error inesperado. Por favor intenta más tarde.');
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
