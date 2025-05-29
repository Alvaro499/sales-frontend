import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { validateRegisterPymeForm } from '../../utilities/validations/pymeFormValidation';
import { Pyme } from '../../models/Pymes.models';
import { useApiHandler } from '../../hooks/useApiHandler';

export const useRegisterForm = () => {
  const navigate = useNavigate();
  const { handleMutation } = useApiHandler();

  const [formData, setFormData] = useState<Pyme>({
    pymeName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    description: '',
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = validateRegisterPymeForm(formData);
    if (!validationResult.isValid) {
      const firstError =
        Object.values(validationResult.errors)[0] || 'Formulario inválido';
      setError(firstError);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await handleMutation(
        pymeRegistrationService.register,
        formData
      );

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
        default:
          setError(
            response.message || 'Error al registrar. Por favor intenta nuevamente.'
          );
          break;
      }
    } catch (err) {
      if (err instanceof Error && err.message === 'NETWORK_ERROR') {
        setError('Error de conexión. Verifica tu red e intenta nuevamente.');
      } else {
        setError('Ocurrió un error inesperado. Por favor intenta más tarde.');
      }
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
