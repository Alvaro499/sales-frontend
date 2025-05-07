import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { VerificationRequest } from '../../models/Pymes.models';

export const useVerification = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const email = new URLSearchParams(location.search).get('email') || '';

	const [verificationCode, setVerificationCode] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVerificationCode(e.target.value);
	};

	const handleVerify = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError('');

		try {
			const verificationData: VerificationRequest = {
				email,
				verificationCode,
			};

			const response =
				await pymeRegistrationService.verifyEmail(verificationData);

			if ('errorCode' in response) {
				setError(response.message || 'Código de verificación inválido');
				return;
			}

			navigate('/registro-exitoso');
		} catch (err) {
			console.error(err);
			setError('Error al verificar el código');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleResendCode = async () => {
		setIsSubmitting(true);
		setError('');

		try {
			await pymeRegistrationService.resendVerificationCode(email);
			alert('Código reenviado con éxito');
		} catch (err) {
			console.error(err);
			setError('Error al reenviar el código');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleBack = () => {
		navigate('/registro');
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
