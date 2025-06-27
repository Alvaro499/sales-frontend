import React from 'react';
import { VerificationFormProps } from './types';

// Componente para ingresar y validar el código de verificación enviado por correo
export const VerificationForm: React.FC<VerificationFormProps> = ({
	code,
	error,
	isSubmitting,
	onCodeChange,
	onSubmit,
	onBack,
}) => {
	return (
		<div className='card border-0 shadow-sm'>
			<div className='card-body p-3 p-md-4'>
				{/* Título del formulario */}
				<h2 className='card-title text-center mb-3 mb-md-4'>Verificación de Email</h2>

				<form onSubmit={onSubmit}>
					{/* Instrucciones para el usuario */}
					<div className='mb-3 text-center'>
						<p className='text-muted mb-1'>Ingresa el código enviado:</p>
					</div>

					{/* Campo para ingresar el código de verificación */}
					<div className='mb-3'>
						<label htmlFor='verificationCode' className='form-label'>
							Código de 4 dígitos
						</label>
						<input
							id='verificationCode'
							type='text'
							inputMode='numeric' // Mejora la experiencia en móviles
							pattern='[0-9]*' // Solo números
							maxLength={4} // Solo 4 dígitos
							name='verificationCode'
							value={code}
							onChange={onCodeChange}
							required
							className='form-control form-control-lg text-center'
							style={{ letterSpacing: '0.5rem', fontSize: '1.5rem' }}
							placeholder='0000'
						/>
						<small className='form-text text-muted'>
							Revisa tu bandeja de entrada o spam
						</small>
					</div>

					{/* Muestra mensaje de error si existe */}
					{error && <div className='alert alert-danger'>{error}</div>}

					{/* Botones para confirmar o volver */}
					<div className='d-grid gap-2 mb-3'>
						<button
							type='submit'
							className='btn btn-primary btn-lg'
							disabled={isSubmitting || code.length !== 4} // Deshabilita si no hay 4 dígitos
						>
							{isSubmitting ? (
								<>
									<span
										className='spinner-border spinner-border-sm me-2'
										role='status'
										aria-hidden='true'
									></span>
									Verificando...
								</>
							) : (
								'Confirmar Código'
							)}
						</button>

						{/* Botón para volver atrás si se proporciona onBack */}
						{onBack && (
							<button
								type='button'
								className='btn btn-outline-secondary'
								onClick={onBack}
							>
								Volver
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};
