import { ventasApi } from './clients.service';
import { Pyme } from '../models/Pymes.models';
import { VerificationRequest } from '../models/AuthPyme.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AuthStorage } from '../hooks/useLocalStorage';

export const pymeRegistrationService = {
  // Ruta base para las peticiones relacionadas con pymes
  BASE_PATH: 'api/pymes',

  // Verifica el código enviado para activar la pyme
  verifyCode: async (verificationData: VerificationRequest): Promise<OkResponse | ErrorResponse> => {
    try {
      const response = await ventasApi.doPost<VerificationRequest, any>(
        verificationData,
        `${pymeRegistrationService.BASE_PATH}/activate`
      );

      // Maneja respuestas con código de error sin lanzar excepción
      if (response && typeof response === 'object' && response.code) {
        return {
          message: response.message || 'Error en la verificación',
          code: response.code,
          params: response.params || 'VERIFICATION_ERROR'
        };
      }

      return { status: 'success' };
    } catch (error: any) {
      // Manejo básico de errores comunes (500, conexión, otros)
      if (error.response?.status === 500) {
        return {
          message: error.response.data?.error || 'Error interno del servidor',
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
        message: error.response.data?.error || error.response.data?.message || `Error HTTP ${error.response.status}`,
        code: error.response.status,
        params: error.response.data?.params || 'HTTP_ERROR'
      };
    }
  },

  // Registra una nueva pyme y guarda el id recibido
  register: async (registrationData: Pyme): Promise<OkResponse | ErrorResponse> => {
    try {
      const response = await ventasApi.doPost<Pyme, any>(
        registrationData,
        `${pymeRegistrationService.BASE_PATH}/register`
      );

      // Guarda el id de la pyme si está presente en la respuesta
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
      // Manejo simplificado de errores comunes
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
