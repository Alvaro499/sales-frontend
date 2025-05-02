import { useState } from 'react';
import { RegisterPymeFormData } from '../models/RegisterPymeFormData';

const useRegisterPymeForm = () => {
	const [formData, setFormData] = useState<RegisterPymeFormData>({
		companyName: '',
		email: '',
		password: '',
		phone: '',
		address: '',
	});

	const [error, setError] = useState<string>(''); // Manejo de errores

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

	return {
		formData,
		error,
		setError,
		handleChange,
		resetForm,
	};
};

export default useRegisterPymeForm;
