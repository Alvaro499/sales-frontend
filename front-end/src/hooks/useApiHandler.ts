// Este hook va a manejar el API, busca generalizar el manejo de errores y , centralizarlo en un único lugar.
import { AxiosError } from 'axios';
import { ErrorResponse } from '../models/Api.models';

export const useApiHandler = () => {
	// Para actualizaciones o escrituras
	const handleMutation = async <TInput, TResult>(
		call: (input: TInput) => Promise<TResult>,
		input: TInput,
	) => {
		let isError = false;
		let isSuccess = !isError;
		let message = 'Process executed successfully';
		let result;
		try {
			result = await call(input);
			return { result, isSuccess, isError, message };
		} catch (e) {
			if (e instanceof AxiosError) {
				const axiosError = e as AxiosError;
				result = axiosError.response;
				const error = result?.data as ErrorResponse;
				if (error !== null) {
					message = error.message;
					isError = true;
					isSuccess = !isError;
					return { error, isSuccess, isError, message };
				}
			}
			throw e;
		}
	};
	//Para lecturas
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
				if (error !== null) {
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
