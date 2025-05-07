import React from 'react';
import { VerificationFormProps } from '../../models/Pymes.models';
import './styles/index.css';

export const VerificationForm: React.FC<VerificationFormProps> = ({
	email,
	verificationCode,
	error,
	isSubmitting,
	onCodeChange,
	onSubmit,
	onResendCode,
}) => {
	return (
		<div className='form-container'>
			<h2 className='form-title'>Verificación de Email</h2>
			<form onSubmit={onSubmit}>
				{/* Encabezado con email */}
				<div className='form-group'>
					<p className='verification-email'>
						Ingresa el código enviado a: <strong>{email}</strong>
					</p>
				</div>

				{/* Campo de código */}
				<div className='form-group'>
					<label htmlFor='verificationCode' className='form-label'>
						Código de 4 dígitos:
					</label>
					<input
						id='verificationCode'
						type='text'
						inputMode='numeric'
						pattern='[0-9]*'
						maxLength={4}
						name='verificationCode'
						value={verificationCode}
						onChange={onCodeChange}
						required
						className='form-input verification-code'
						placeholder='0000'
					/>
					<small className='hint-text'>
						Revisa tu bandeja de entrada o spam
					</small>
				</div>

				{/* Mensaje de error */}
				{error && <div className='error-message'>{error}</div>}

				{/* Botones de acción */}
				<div className='form-actions'>
					<button
						type='submit'
						className='btn-primary'
						disabled={isSubmitting || verificationCode.length !== 4}
					>
						{isSubmitting ? (
							<>
								<span className='spinner'></span>
								Verificando...
							</>
						) : (
							'Confirmar Código'
						)}
					</button>
				</div>

				<div className='resend-section'>
					<p>¿No recibiste el código?</p>
					<button type='button' className='btn-text' onClick={onResendCode}>
						{' '}
						Reenviar código
					</button>
				</div>
			</form>
		</div>
	);
};
