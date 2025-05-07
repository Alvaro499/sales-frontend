import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { validateRegisterPymeForm } from '../../utilities/pymeFormValidation';
import { Pyme } from '../../models/Pymes.models';

export const useRegisterForm = () => {
	const navigate = useNavigate();
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
		if (name === 'email' && error) {
			setError('');
		}
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
			const response = await pymeRegistrationService.register(formData);

			if ('errorCode' in response) {
				if (response.errorCode === 'EMAIL_ALREADY_EXISTS') {
					setError('El email ya está registrado. Por favor usa otro email.');
				} else {
					setError(response.message || 'Error al registrar');
				}
				return;
			}

			navigate(`/verificacion?email=${encodeURIComponent(formData.email)}`);
		} catch (err) {
			console.error('Error inesperado:', err);
			setError('Error inesperado al registrar. Por favor intenta nuevamente.');
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
