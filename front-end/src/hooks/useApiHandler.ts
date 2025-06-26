import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/Api.models';

interface ApiResponse<T> {
	result?: T;
	isSuccess: boolean;
	isError: boolean;
	message: string;
}

// Hook para manejar llamadas a la API con manejo centralizado de errores
export const useApiHandler = () => {
	// Maneja mutaciones (POST, PUT, DELETE)
	const handleMutation = async <TInput, TResult>(
		call: (input: TInput) => Promise<TResult>,
		input: TInput
	): Promise<ApiResponse<TResult>> => {
		try {
			const result = await call(input);

			// Verifica si la respuesta contiene un error esperado del backend
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
			// Manejo seguro del tipo de error (tipo unknown)

			// Caso de error de red
			if (error instanceof Error) {
				if (error.message.includes('Network Error')) {
					return networkErrorResponse();
				}
			}

			// Caso de error controlado por Axios
			if (error instanceof AxiosError) {
				return axiosErrorResponse(error);
			}

			// Error genérico inesperado
			return {
				result: undefined,
				isSuccess: false,
				isError: true,
				message: 'Error inesperado',
			};
		}
	};

	// Helper para errores de red
	const networkErrorResponse = (): ApiResponse<never> => ({
		result: undefined,
		isSuccess: false,
		isError: true,
		message: 'Error de conexión',
	});

	// Helper para errores controlados por Axios
	const axiosErrorResponse = (error: AxiosError<ErrorResponse>): ApiResponse<never> => ({
		result: undefined,
		isSuccess: false,
		isError: true,
		message: error.response?.data?.message || 'Error en la solicitud',
	});

	// Type guard para detectar si la respuesta es un ErrorResponse
	const isErrorResponse = (response: unknown): response is ErrorResponse => {
		return (
			typeof response === 'object' &&
			response !== null &&
			'message' in response &&
			'code' in response
		);
	};

	// Maneja queries (GET)
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
			// Manejo de errores de Axios
			if (e instanceof AxiosError) {
				const axiosError = e as AxiosError<ErrorResponse>;
				return {
					result: undefined,
					isError: true,
					message: axiosError.response?.data?.message || 'Error en la consulta',
				};
			}
			// Error genérico
			return {
				result: undefined,
				isError: true,
				message: 'Error desconocido en la consulta',
			};
		}
	};

	// Se retornan los métodos públicos del hook
	return { handleMutation, handleQuery };
};
