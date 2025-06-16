import { ventasApi } from './clients.service';
import { Pyme } from '../models/Pymes.models';
import { VerificationRequest } from '../models/AuthPyme.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AxiosError } from 'axios';

export const pymeRegistrationService = {
  BASE_PATH: 'api/pymes',

  // Registro de PYME
  register: async (registrationData: Pyme): Promise<OkResponse | ErrorResponse> => {
    try {
      const response = await ventasApi.doPost<Pyme, OkResponse>(
        registrationData,
        `${pymeRegistrationService.BASE_PATH}/register`
      );
      
      if (!response) {
        return {
          message: 'El servidor respondió sin datos',
          code: 500,
          params: 'EMPTY_RESPONSE'
        };
      }
      
      return response;
      
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      
      if (!axiosError.response) {
        return {
          message: 'No se pudo conectar al servidor',
          code: 503,
          params: 'NETWORK_ERROR',
        };
      }

      return {
        message: axiosError.response.data?.message || 'Error en el registro de PYME',
        code: axiosError.response.status,
        params: axiosError.response.data?.params || 'API_ERROR',
      };
    }
  },

  // Verificación de código
  verifyCode: async (verificationData: VerificationRequest): Promise<any> => {
    try {
      const response = await ventasApi.doPost<VerificationRequest, any>(
        verificationData,
        `${pymeRegistrationService.BASE_PATH}/activate`
      );

      // Manejo de respuesta exitosa con mensaje específico
      if (response && response.message && response.message.includes('verificado correctamente')) {
        return { 
          status: 'success',
          message: response.message,
          verified: true
        };
      }

      // Para otras respuestas exitosas sin el mensaje específico
      if (response && response.status === 200) {
        return {
          status: 'success',
          message: 'Verificación exitosa',
          verified: true
        };
      }

      return response;
      
    } catch (error) {
      const axiosError = error as AxiosError;
      
      if (!axiosError.response) {
        return {
          message: 'Error de conexión con el servidor',
          code: 503,
          params: 'NETWORK_ERROR'
        };
      }

      // Manejar respuesta de error del servidor
      return axiosError.response.data || {
        message: 'Error en la verificación',
        code: axiosError.response.status,
        params: 'VERIFICATION_ERROR'
      };
    }
  }
};