import React from 'react';
import { RegistrationFormProps } from '../../models/Pymes.models';
import './styles/index.css';

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
	formData,
	error,
	isSubmitting,
	onRecoveryClick,
	onChange,
	onSubmit,
}) => {
	return (
		<div className='form-container'>
			<h2 className='form-title'>Registro de Pyme</h2>
			<form onSubmit={onSubmit}>
				{/* Nombre de la empresa */}
				<div className='form-group'>
					<label htmlFor='companyName' className='form-label'>
						Nombre de la empresa
					</label>
					<input
						id='companyName'
						type='text'
						name='companyName'
						value={formData.companyName}
						onChange={onChange}
						required
						className='form-input'
						placeholder='Ej: Mi Empresa S.A.'
					/>
				</div>

				{/* Correo electrónico */}
				<div className='form-group'>
					<label htmlFor='email' className='form-label'>
						Correo electrónico
					</label>
					<input
						id='email'
						type='email'
						name='email'
						value={formData.email}
						onChange={onChange}
						required
						className='form-input'
						placeholder='Ej: contacto@empresa.com'
					/>
				</div>

				{/* Contraseña */}
				<div className='form-group'>
					<label htmlFor='password' className='form-label'>
						Contraseña
					</label>
					<input
						id='password'
						type='password'
						name='password'
						value={formData.password}
						onChange={onChange}
						required
						className='form-input'
						placeholder='Mínimo 8 caracteres'
					/>
				</div>

				{/* Teléfono (opcional) */}
				<div className='form-group'>
					<label htmlFor='phone' className='form-label'>
						Teléfono <span className='optional-text'>(opcional)</span>
					</label>
					<input
						id='phone'
						type='tel'
						name='phone'
						value={formData.phone || ''}
						onChange={onChange}
						className='form-input'
						placeholder='Ej: +56 9 8765 4321'
					/>
				</div>

				{/* Dirección */}
				<div className='form-group'>
					<label htmlFor='address' className='form-label'>
						Dirección
					</label>
					<input
						id='address'
						type='text'
						name='address'
						value={formData.address}
						onChange={onChange}
						required
						className='form-input'
						placeholder='Ej: Av. Principal 1234, Santiago'
					/>
				</div>

				{/* Mensaje de error */}
				{error && <div className='error-message'>{error}</div>}

				{/* Botón de registro */}
				<button type='submit' className='btn-primary' disabled={isSubmitting}>
					{isSubmitting ? (
						<>
							<span className='spinner'></span>
							Registrando...
						</>
					) : (
						'Registrar Pyme'
					)}
				</button>

				{/* Sección de recuperación */}
				<div className='recovery-section'>
					¿Ya tienes cuenta?{' '}
					<button type='button' onClick={onRecoveryClick}>
						Recuperar contraseña
					</button>
				</div>
			</form>
		</div>
	);
};
