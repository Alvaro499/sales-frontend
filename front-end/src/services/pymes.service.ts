import { doPost } from './http.service';
import { Pyme } from '../models/Pymes.models';
import {  VerificationRequest } from '../models/AuthPyme.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AxiosError } from 'axios';

const BASE_PATH = 'api/pymes';

export const pymeRegistrationService = {
  register: async (registrationData: Pyme): Promise<OkResponse | ErrorResponse> => {
    try {
      const response = await doPost<Pyme, OkResponse>(
        registrationData, 
        `${BASE_PATH}/register` 
      );
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (!axiosError.response) {
        return {
          message: 'Error de conexión',
          code: 503,
          errorCode: 'NETWORK_ERROR',
        };
      }
      return {
        message: axiosError.response.data?.message || 'Error al registrar',
        code: axiosError.response.status,
        errorCode: axiosError.response.data?.errorCode || 'API_ERROR',
      };
    }
  },
  

  verifyCode: async (
    verificationData: VerificationRequest
  ): Promise<OkResponse | ErrorResponse> => {
    try {
      const response = await doPost<VerificationRequest, OkResponse>(
        verificationData,
        BASE_PATH
      );
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (!axiosError.response) {
        return {
          message: 'Error de conexión',
          code: 503,
          
          errorCode: 'NETWORK_ERROR',
        };
      }
      return {
        message: axiosError.response?.data?.message || 'Error al verificar',
        code: axiosError.response?.status || 500,
        errorCode: axiosError.response?.data?.errorCode || 'VERIFICATION_ERROR',
      };
    }
  },

};