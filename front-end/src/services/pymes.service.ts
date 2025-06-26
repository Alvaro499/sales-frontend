import { ventasApi } from './clients.service';
import { Pyme } from '../models/Pymes.models';
import { VerificationRequest } from '../models/AuthPyme.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AuthStorage } from '../hooks/useLocalStorage';

export const pymeRegistrationService = {
  BASE_PATH: 'api/pymes',

  // Verifica el código de activación enviado al correo
  verifyCode: async (verificationData: VerificationRequest): Promise<OkResponse | ErrorResponse> => {
    try {
      const response = await ventasApi.doPost<VerificationRequest, any>(
        verificationData,
        `${pymeRegistrationService.BASE_PATH}/activate`
      );

      // Si la respuesta es un error lógico del backend y no lanza excepción
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

      // Error interno del servidor (500)
      if (status === 500) {
        return {
          message: data?.error || 'Error interno del servidor',
          code: 500,
          params: 'SERVER_ERROR'
        };
      }

      // Error de red (sin respuesta)
      if (!error.response) {
        return {
          message: 'No se pudo conectar al servidor',
          code: 503,
          params: 'NETWORK_ERROR'
        };
      }

      // Otros errores conocidos del backend
      return {
        message: data?.error || data?.message || `Error HTTP ${status}`,
        code: status,
        params: data?.params || 'HTTP_ERROR'
      };
    }
  },

  // Registra una nueva pyme en el sistema
  register: async (registrationData: Pyme): Promise<OkResponse | ErrorResponse> => {
    try {
      const response = await ventasApi.doPost<Pyme, any>(
        registrationData,
        `${pymeRegistrationService.BASE_PATH}/register`
      );

      if ('id' in response && typeof response.id === 'string') {
        AuthStorage.setPymeId(response.id);
      } else {
        AuthStorage.setPymeId('');
      }

      if (!response) {
        return {
          message: 'El servidor no respondió con datos',
          code: 500,
          params: 'EMPTY_RESPONSE'
        };
      }

      return { status: 'success' };

    } catch (error: any) {
      // Manejo similar de errores para registro
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
