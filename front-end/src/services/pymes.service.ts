import { ventasApi } from './clients.service';
import { Pyme } from '../models/Pymes.models';
import { VerificationRequest } from '../models/AuthPyme.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AxiosError } from 'axios';

const BASE_PATH = 'api/pymes';

export const pymeRegistrationService = {
  register: async (registrationData: Pyme): Promise<OkResponse | ErrorResponse> => {
    try {
      return await ventasApi.doPost<Pyme, OkResponse>(
        registrationData,
        `${BASE_PATH}/register`
      );
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (!axiosError.response) {
        return {
          message: 'Connection error',
          code: 503,
          errorCode: 'NETWORK_ERROR',
        };
      }
      return {
        message: axiosError.response.data?.message || 'Error during registration',
        code: axiosError.response.status,
        errorCode: axiosError.response.data?.errorCode || 'API_ERROR',
      };
    }
  },

  verifyCode: async (
    verificationData: VerificationRequest
  ): Promise<OkResponse | ErrorResponse> => {
    try {
      return await ventasApi.doPost<VerificationRequest, OkResponse>(
        verificationData,
        BASE_PATH
      );
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (!axiosError.response) {
        return {
          message: 'Connection error',
          code: 503,
          errorCode: 'NETWORK_ERROR',
        };
      }
      return {
        message: axiosError.response?.data?.message || 'Error during verification',
        code: axiosError.response?.status || 500,
        errorCode: axiosError.response?.data?.errorCode || 'VERIFICATION_ERROR',
      };
    }
  },
};
