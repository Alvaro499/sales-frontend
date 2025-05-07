import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { validateRegisterPymeForm } from '../../utilities/pymeFormValidation';
import { Pyme } from '../../models/Pymes.models';
import { useApiHandler } from '../../hooks/useApiHandler';

export const useRegisterForm = () => {
	const navigate = useNavigate();
	const { handleMutation } = useApiHandler();
	const [formData, setFormData] = useState<Pyme>({
		companyName: '',
		email: '',
		password: '',
		phone: '',
		address: '',
	});

	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
		if (error) setError('');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const validationError = validateRegisterPymeForm(formData);
		if (validationError) {
			setError(validationError);
			return;
		}

		setIsSubmitting(true);
		setError('');

		try {
			const response = await handleMutation(
				pymeRegistrationService.register,
				formData,
			);

			if (
				response.isSuccess === true &&
				!response.errorCode &&
				!response.message?.includes('Error')
			) {
				navigate(`/verificacion?email=${encodeURIComponent(formData.email)}`);
				return;
			}

			// Manejo de errores conocidos
			if (response.errorCode === 'EMAIL_EXISTS') {
				setError('El correo electrónico ya está registrado');
			} else {
				setError(
					response.message ||
						'Error al registrar. Por favor intenta nuevamente.',
				);
			}
		} catch (err) {
			// Errores no controlados (como NETWORK_ERROR)
			if (err instanceof Error && err.message === 'NETWORK_ERROR') {
				setError('Error de conexión. Verifica tu red e intenta nuevamente.');
			} else {
				console.error('Error inesperado:', err);
				setError('Ocurrió un error inesperado. Por favor intenta más tarde.');
			}
		} finally {
			setIsSubmitting(false);
		}

		// Si hay un error, evitar la navegación
		if (error) return; // Esta línea asegura que no se navegue si hay un error.
	};
	return {
		formData,
		error,
		isSubmitting,
		handleChange,
		handleSubmit,
		setError, // Opcional: si necesitas permitir que el componente modifique el error
	};
};
