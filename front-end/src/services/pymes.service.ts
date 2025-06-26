import { ventasApi } from './clients.service';
import { Pyme } from '../models/Pymes.models';
import { VerificationRequest } from '../models/AuthPyme.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';

export const pymeRegistrationService = {
  BASE_PATH: 'api/pymes',

  // Envía el código de verificación para activar la cuenta de la Pyme
  verifyCode: async (verificationData: VerificationRequest): Promise<OkResponse | ErrorResponse> => {
    try {
      const response = await ventasApi.doPost<VerificationRequest, any>(
        verificationData,
        `${pymeRegistrationService.BASE_PATH}/activate`
      );

      // Si la respuesta contiene un error lógico del backend, lo retorna
      if (response && typeof response === 'object' && response.code) {
        return {
          message: response.message || 'Error en la verificación',
          code: response.code,
          params: response.params || 'VERIFICATION_ERROR'
        };
      }

      return { status: 'success' };
    } catch (error: any) {
      const status = error.response?.status;
      const data = error.response?.data;

      // Maneja errores específicos según el código HTTP y tipo de error
      if (status === 500) {
        return {
          message: data?.error || 'Error interno del servidor',
          code: 500,
          params: 'SERVER_ERROR'
        };
      }

      if (!error.response) {
        return {
          message: 'No se pudo conectar al servidor',
          code: 503,
          params: 'NETWORK_ERROR'
        };
      }

      return {
        message: data?.error || data?.message || `Error HTTP ${status}`,
        code: status,
        params: data?.params || 'HTTP_ERROR'
      };
    }
  },

  // Registra una nueva Pyme en el sistema
  register: async (registrationData: Pyme): Promise<OkResponse | ErrorResponse> => {
    try {
      const response = await ventasApi.doPost<Pyme, any>(
        registrationData,
        `${pymeRegistrationService.BASE_PATH}/register`
      );

      if (!response) {
        return {
          message: 'El servidor no respondió con datos',
          code: 500,
          params: 'EMPTY_RESPONSE'
        };
      }

      return { status: 'success' };

    } catch (error: any) {
      if (error.response?.status === 500) {
        return {
          message: 'Error interno del servidor durante el registro',
          code: 500,
          params: 'SERVER_ERROR'
        };
      }

      if (!error.response) {
        return {
          message: 'Error de conexión durante el registro',
          code: 503,
          params: 'NETWORK_ERROR'
        };
      }

      return {
        message: error.response.data?.message || 'Error en el registro',
        code: error.response.status,
        params: error.response.data?.params || 'REGISTRATION_ERROR'
      };
    }
  }
};
