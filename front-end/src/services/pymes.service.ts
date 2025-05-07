import { doPost } from './http.service';
import {
	Pyme,
	RecoveryRequest,
	VerificationRequest,
} from '../models/Pymes.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';

const BASE_PATH = '/api';

interface AxiosError {
	response?: {
		data?: ErrorResponse | { message?: string; code?: string };
		status?: number;
	};
}

export const pymeRegistrationService = {
	register: async (
		registrationData: Pyme,
	): Promise<OkResponse | ErrorResponse> => {
		try {
			const response = await doPost<Pyme, OkResponse>(
				registrationData,
				`${BASE_PATH}/pymes/register`,
			);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError;
			const errorData = axiosError.response?.data;

			if (
				errorData &&
				'code' in errorData &&
				errorData.code === 'EMAIL_EXISTS'
			) {
				return {
					message: 'El correo electrónico ya está registrado',
					code: axiosError.response?.status || 409,
					errorCode: 'EMAIL_EXISTS',
				};
			}

			return {
				message:
					(errorData as ErrorResponse)?.message || 'Error al registrar la PYME',
				code: axiosError.response?.status || 500,
			};
		}
	},

	requestRecovery: async (
		email: string,
	): Promise<OkResponse | ErrorResponse> => {
		try {
			const recoveryRequest: RecoveryRequest = { email };
			const response = await doPost<RecoveryRequest, OkResponse>(
				recoveryRequest,
				`${BASE_PATH}/pymes/request-recovery`,
			);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError;
			return {
				message:
					(axiosError.response?.data as ErrorResponse)?.message ||
					'Error al solicitar recuperación',
				code: axiosError.response?.status || 500,
			};
		}
	},

	verifyCode: async (
		verificationData: VerificationRequest,
	): Promise<OkResponse | ErrorResponse> => {
		try {
			const response = await doPost<VerificationRequest, OkResponse>(
				verificationData,
				`${BASE_PATH}/pymes/verify-code`,
			);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError;
			return {
				message:
					(axiosError.response?.data as ErrorResponse)?.message ||
					'Código incorrecto',
				code: axiosError.response?.status || 400,
			};
		}
	},

	resendVerificationCode: async (
		email: string,
	): Promise<OkResponse | ErrorResponse> => {
		try {
			const response = await doPost<{ email: string }, OkResponse>(
				{ email },
				`${BASE_PATH}/pymes/resend-verification-code`,
			);
			return response;
		} catch (error) {
			const axiosError = error as AxiosError;
			return {
				message:
					(axiosError.response?.data as ErrorResponse)?.message ||
					'Error al reenviar el código de verificación',
				code: axiosError.response?.status || 500,
			};
		}
	},
};
