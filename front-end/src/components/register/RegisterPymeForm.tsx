// src/components/register/RegisterPymeForm.tsx
import React from 'react';
import useRegisterPymeForm from '../../hooks/useRegisterPymeForm';
import { validateRegisterPymeForm } from '../../utilities/registerPymeValidation'; // Función de validación específica
import './StylesPymeForm.css';

const RegisterPymeForm = () => {
	const { formData, error, setError, handleChange, resetForm } =
		useRegisterPymeForm(); // Usamos el hook aquí

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Validar los datos del formulario
		const validationError = validateRegisterPymeForm(formData);
		if (validationError) {
			setError(validationError);
			return;
		}

		// Aquí iría la lógica para enviar los datos al backend
		console.log('Datos de la Pyme enviados', formData);
		resetForm();
	};

	return (
		<div className='register-pyme-form-container'>
			<h2>Formulario de Registro de la Pyme</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Nombre de la empresa:
					<input
						type='text'
						name='companyName'
						value={formData.companyName}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					Correo electrónico:
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					Contraseña:
					<input
						type='password'
						name='password'
						value={formData.password}
						onChange={handleChange}
						required
					/>
				</label>
				<label>
					Teléfono (opcional):
					<input
						type='text'
						name='phone'
						value={formData.phone || ''}
						onChange={handleChange}
					/>
				</label>
				<label>
					Dirección:
					<input
						type='text'
						name='address'
						value={formData.address}
						onChange={handleChange}
						required
					/>
				</label>
				{error && <p className='error-message'>{error}</p>}
				<button type='submit'>Registrar Pyme</button>
			</form>
		</div>
	);
};

export default RegisterPymeForm;
