// src/pages/register/hooks.ts
import { useState } from 'react';
import { RegisterPymeFormData } from './types';
import { useApiHandler } from '../../hooks/useApiHandler';
import { doPost } from '../../services/http.service';

export const useRegisterPymeForm = () => {
	const [formData, setFormData] = useState<RegisterPymeFormData>({
		companyName: '',
		email: '',
		password: '',
		phone: '',
		address: '',
	});

	const [error, setError] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false);
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
		try {
			const { isError, message } = await handleMutation(
				data => doPost(data, '/pymes/register'),
				formData,
			);

			if (isError) {
				setError(message || 'Error al registrar la pyme');
				return false;
			}

			resetForm();
			return true;
		} catch (err) {
			setError('Error inesperado al registrar');
			console.error('Registration error:', err);
			return false;
		} finally {
			setIsSubmitting(false);
		}
	};

	return {
		formData,
		error,
		isSubmitting,
		setError,
		handleChange,
		registerPyme,
	};
};
