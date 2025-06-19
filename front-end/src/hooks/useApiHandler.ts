import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/Api.models';

interface ApiResponse<T> {
	result?: T;
	isSuccess: boolean;
	isError: boolean;
	message: string;
}

export const useApiHandler = () => {
	const handleMutation = async <TInput, TResult>(
		call: (input: TInput) => Promise<TResult>,
		input: TInput
	): Promise<ApiResponse<TResult>> => {
		try {
			const result = await call(input);

			// Verificación mejorada con type guards
			if (isErrorResponse(result)) {
				return {
					result: undefined,
					isSuccess: false,
					isError: true,
					message: result.message,
				};
			}

			// Respuesta exitosa
			return {
				result,
				isSuccess: true,
				isError: false,
				message: 'Operación exitosa',
			};
		} catch (error: unknown) {
			// Explicitamente typed como unknown
			// Type-safe error handling
			if (error instanceof Error) {
				if (error.message.includes('Network Error')) {
					return networkErrorResponse();
				}
			}

			if (error instanceof AxiosError) {
				return axiosErrorResponse(error);
			}

			return {
				result: undefined,
				isSuccess: false,
				isError: true,
				message: 'Error inesperado',
			};
		}
	};

	// Helper functions para respuestas de error
	const networkErrorResponse = (): ApiResponse<never> => ({
		result: undefined,
		isSuccess: false,
		isError: true,
		message: 'Error de conexión',
	});

	const axiosErrorResponse = (error: AxiosError<ErrorResponse>): ApiResponse<never> => ({
		result: undefined,
		isSuccess: false,
		isError: true,
		message: error.response?.data?.message || 'Error en la solicitud',
	});

	// Type guard para ErrorResponse
	const isErrorResponse = (response: unknown): response is ErrorResponse => {
		return (
			typeof response === 'object' &&
			response !== null &&
			'message' in response &&
			'code' in response
		);
	};

	const handleQuery = async <TInput, TResult>(
		call: (input: TInput) => Promise<TResult>,
		input: TInput
	): Promise<{
		result?: TResult;
		isError: boolean;
		message: string;
	}> => {
		try {
			const result = await call(input);
			return {
				result,
				isError: false,
				message: 'Consulta exitosa',
			};
		} catch (e) {
			if (e instanceof AxiosError) {
				const axiosError = e as AxiosError<ErrorResponse>;
				return {
					result: undefined,
					isError: true,
					message: axiosError.response?.data?.message || 'Error en la consulta',
				};
			}
			return {
				result: undefined,
				isError: true,
				message: 'Error desconocido en la consulta',
			};
		}
	};

	return { handleMutation, handleQuery };
};
