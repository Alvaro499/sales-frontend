// src/hooks/useRegisterPymeForm.ts
import { useState } from 'react';
import { RegisterPymeFormData } from '../models/PymeFormData.models';
import { useApiHandler } from './useApiHandler';
import { doPost } from '../services/http.service';
const useRegisterPymeForm = () => {
	const [formData, setFormData] = useState<RegisterPymeFormData>({
		companyName: '',
		email: '',
		password: '',
		phone: '',
		address: '',
	});

	const [error, setError] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false); // Estado para loading
	const { handleMutation } = useApiHandler();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
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
				setError(message);
			} else {
				resetForm();
				return true; // Indica que el registro fue exitoso
			}
		} catch (err) {
			setError('Ocurrió un error inesperado al registrar la pyme');
			console.error('Error al registrar pyme:', err);
		} finally {
			setIsSubmitting(false);
		}
		return false; // Indica que el registro falló
	};

	return {
		formData,
		error,
		isSubmitting,
		setError,
		handleChange,
		resetForm,
		registerPyme,
	};
};

export default useRegisterPymeForm;
