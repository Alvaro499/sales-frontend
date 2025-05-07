import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { VerificationRequest } from '../../models/Auth.models';
import { VerificationHook } from './types';

export const useVerification = (): VerificationHook => {
	const location = useLocation();
	const navigate = useNavigate();
	const email = new URLSearchParams(location.search).get('email') || '';

	const [verificationCode, setVerificationCode] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
	};
	const handleVerify = async (
		e: React.FormEvent<HTMLFormElement>,
	): Promise<void> => {
		e.preventDefault(); // Evitar que el formulario se envíe por defecto
		setIsSubmitting(true);
		setError('');

		try {
			const verificationData: VerificationRequest = {
				email,
				verificationCode,
			};

			const response =
				await pymeRegistrationService.verifyCode(verificationData);

			if ('errorCode' in response) {
				setError(response.message || 'Código de verificación inválido');
				return;
			}
			navigate('/registro-exitoso');
		} catch (err) {
			console.error('Error de verificación:', err);
			setError('Error al verificar el código');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResendCode = async (): Promise<void> => {
		setIsSubmitting(true);
		setError('');

		try {
			await pymeRegistrationService.resendVerificationCode(email);
			setVerificationCode('');
		} catch (err) {
			console.error('Error al reenviar código:', err);
			setError('Error al reenviar el código');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleBack = () => {
		navigate('/registro', { state: { email } });
	};

	return {
		email,
		verificationCode,
		error,
		isSubmitting,
		handleCodeChange,
		handleVerify,
		handleResendCode,
		handleBack,
	};
};
