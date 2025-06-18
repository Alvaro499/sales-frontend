import React from 'react';
import { VerificationFormProps } from './types';

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
				<h2 className='card-title text-center mb-3 mb-md-4'>Verificación de Email</h2>

				<form onSubmit={onSubmit}>
					{/* Encabezado con email */}
					<div className='mb-3 text-center'>
						<p className='text-muted mb-1'>Ingresa el código enviado:</p>
					</div>

					{/* Campo de código */}
					<div className='mb-3'>
						<label htmlFor='verificationCode' className='form-label'>
							Código de 4 dígitos
						</label>
						<input
							id='verificationCode'
							type='text'
							inputMode='numeric'
							pattern='[0-9]*'
							maxLength={4}
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

					{/* Mensaje de error */}
					{error && <div className='alert alert-danger'>{error}</div>}

					{/* Botones de acción */}
					<div className='d-grid gap-2 mb-3'>
						<button
							type='submit'
							className='btn btn-primary btn-lg'
							disabled={isSubmitting || code.length !== 4}
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
