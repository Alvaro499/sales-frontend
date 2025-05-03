import { doPost } from './http.service';
import { Pyme } from '../models/Pymes.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';

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

			return response.status ? response : { ...response, status: 'success' };
		} catch (error: unknown) {
			const err = error as {
				response?: {
					data?: { message?: string };
					status?: number;
				};
			};

			return {
				message: err.response?.data?.message || 'Error al registrar la PYME',
				code: err.response?.status || 500,
			};
		}
	},
};
