import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/Api.models';

interface ApiResponse<T> {
	result?: T;
	isSuccess: boolean;
	isError: boolean;
	message: string;
	errorCode?: string;
}

export const useApiHandler = () => {
	const handleMutation = async <TInput, TResult>(
		call: (input: TInput) => Promise<TResult>,
		input: TInput,
	): Promise<ApiResponse<TResult>> => {
		try {
			const result = await call(input);

			// Verificar si la respuesta es un error disfrazado de éxito
			if (
				typeof result === 'object' &&
				result !== null &&
				'errorCode' in result
			) {
				const errorResponse = result as unknown as ErrorResponse;
				return {
					result: undefined,
					isSuccess: false,
					isError: true,
					message: errorResponse.message,
					errorCode: errorResponse.errorCode,
				};
			}

			return {
				result,
				isSuccess: true,
				isError: false,
				message: 'Operación exitosa',
			};
		} catch (e) {
			// Manejo de errores de red
			if (e instanceof Error && e.message.includes('Network Error')) {
				return {
					result: undefined,
					isSuccess: false,
					isError: true,
					message: 'Error de conexión',
					errorCode: 'NETWORK_ERROR',
				};
			}

			// Manejo de errores de Axios
			if (e instanceof AxiosError) {
				const errorData = e.response?.data as ErrorResponse | undefined;
				return {
					result: undefined,
					isSuccess: false,
					isError: true,
					message: errorData?.message || 'Error en la solicitud',
					errorCode: errorData?.errorCode || 'API_ERROR',
				};
			}

			// Error genérico
			return {
				result: undefined,
				isSuccess: false,
				isError: true,
				message: 'Error inesperado',
				errorCode: 'UNKNOWN_ERROR',
			};
		}
	};

	// Para lecturas
	const handleQuery = async <TInput, TResult>(
		call: (input: TInput) => Promise<TResult>,
		input: TInput,
	) => {
		let isError = false;
		let message = 'Process executed successfully';
		let result;
		try {
			result = await call(input);
			return { result, isError, message };
		} catch (e) {
			if (e instanceof AxiosError) {
				const axiosError = e as AxiosError;
				result = axiosError.response;
				const error = result?.data as ErrorResponse;
				if (error) {
					message = error.message;
					isError = true;
					return { result, isError, message };
				}
			}
			throw e;
		}
	};

	return { handleMutation, handleQuery };
};
