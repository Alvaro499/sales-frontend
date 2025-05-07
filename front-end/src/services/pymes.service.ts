import { doPost } from './http.service';
import { Pyme } from '../models/Pymes.models';
import { RecoveryRequest, VerificationRequest } from '../models/Auth.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AxiosError } from 'axios';

const BASE_PATH = '/api';

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
			const axiosError = error as AxiosError<
				ErrorResponse | { message?: string; errorCode?: string }
			>;

			// Manejo específico de errores de red
			if (!axiosError.response) {
				return {
					message: 'Error de conexión. Verifica tu red e intenta nuevamente.',
					code: 503,
					errorCode: 'NETWORK_ERROR',
				};
			}

			const errorData = axiosError.response.data;

			return {
				message: (errorData as ErrorResponse)?.message || 'Error al registrar',
				code: axiosError.response.status || 500,
				errorCode: (errorData as { errorCode?: string })?.errorCode,
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
			const axiosError = error as AxiosError<ErrorResponse>;
			return {
				message:
					axiosError.response?.data?.message ||
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
			const axiosError = error as AxiosError<ErrorResponse>;
			return {
				message: axiosError.response?.data?.message || 'Código incorrecto',
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
			const axiosError = error as AxiosError<ErrorResponse>;
			return {
				message:
					axiosError.response?.data?.message ||
					'Error al reenviar el código de verificación',
				code: axiosError.response?.status || 500,
			};
		}
	},
};
