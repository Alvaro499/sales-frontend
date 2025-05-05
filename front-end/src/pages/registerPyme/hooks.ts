// src/pages/register/hooks.ts
import { useState } from 'react';
import { Pyme } from '../../models/Pymes.models';
import { useApiHandler } from '../../hooks/useApiHandler';
import { pymeRegistrationService } from '../../services/request.service';
import { ErrorResponse } from '../../models/Api.models';

export const useRegisterPymeForm = () => {
	const [formData, setFormData] = useState<Pyme>({
		companyName: '',
		email: '',
		password: '',
		phone: '',
		address: '',
	});

	const [error, setError] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [verificationRequired] = useState(false);
	const { handleMutation } = useApiHandler();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const resetForm = () => {
		setFormData({
			companyName: '',
			email: '',
			password: '',
			phone: '',
			address: '',
		});
		setError('');
	};

	const registerPyme = async () => {
		setIsSubmitting(true);
		setError('');

		try {
			const response = await handleMutation(
				pymeRegistrationService.register,
				formData,
			);

			if ('code' in response) {
				// Manejo de error
				setError(response.message || 'Error al registrar la pyme');
				return { success: false, requiresVerification: false };
			}

			// Éxito en registro
			resetForm();
			return { success: true, requiresVerification: true };
		} catch (err) {
			const error = err as ErrorResponse;
			setError(error.message || 'Error inesperado al registrar');
			console.error('Registration error:', err);
			return { success: false, requiresVerification: false };
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		formData,
		error,
		isSubmitting,
		verificationRequired,
		setError,
		handleChange,
		registerPyme,
		resetForm,
	};
};
