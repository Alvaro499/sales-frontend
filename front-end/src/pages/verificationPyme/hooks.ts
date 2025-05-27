import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pymeRegistrationService } from '../../services/pymes.service';
import { VerificationRequest } from '../../models/AuthPyme.models';
import { VerificationHook } from './types';
import { useApiHandler } from '../../hooks/useApiHandler';

export const useVerification = (): VerificationHook => {
	const location = useLocation();
	const navigate = useNavigate();
	const { handleMutation } = useApiHandler();
	const email = new URLSearchParams(location.search).get('email') || '';

	const [verificationCode, setVerificationCode] = useState('');
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 4));
	};

	const handleVerify = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (verificationCode.length !== 4) {
			setError('El código debe tener 4 dígitos');
			return;
		}

		setIsSubmitting(true);
		setError('');

		const verificationData: VerificationRequest = { email, verificationCode };
		const response = await handleMutation(pymeRegistrationService.verifyCode, verificationData);

		console.log(response);

		if (response.isSuccess && !response.errorCode) {
			navigate('/registro-exitoso');
		} else {
			setError(response.message || 'Error al verificar el código');
		}

		setIsSubmitting(false);
	};

	const handleResendCode = async (): Promise<void> => {
		setIsSubmitting(true);
		setError('');

		const response = await handleMutation(
			pymeRegistrationService.requestRecovery,
			email
		);

		if (!response.isSuccess) {
			setError(response.message || 'Error al reenviar el código');
		}

		setIsSubmitting(false);
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
