import { authApi } from './clients.service';
import { AuthCredentials, PasswordResetRequest } from '../models/Auth.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AuthStorage } from '../hooks/useLocalStorage';
import { AxiosError } from 'axios';

export class AuthService {
  // Ruta base común para las solicitudes de autenticación
  private static BASE_PATH = '/api/public/auth';

  /**
   * Realiza el inicio de sesión enviando las credenciales al backend.
   * En caso de éxito, almacena el token y otros datos en el almacenamiento local.
   * Devuelve la respuesta con el token o un error si falla.
   */
  public static async login(
    credentials: AuthCredentials
  ): Promise<OkResponse | ErrorResponse> {
    try {
      const response = await authApi.doPost<AuthCredentials, OkResponse>(
        credentials,
        `${this.BASE_PATH}/loginUser`
      );

      if ('token' in response && typeof response.token === 'string') {
        AuthStorage.setToken(response.token);
        AuthStorage.storeDecodedToken();
      }

      if ('pymeId' in response && typeof response.pymeId === 'string') {
        AuthStorage.setPymeId(response.pymeId);
      } else {
        AuthStorage.setPymeId('');
      }

      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Registra un nuevo usuario con las credenciales proporcionadas.
   * Maneja diferentes formatos de respuesta esperados del backend.
   * Retorna el resultado exitoso o un error en caso de fallo.
   */
  public static async registerUser(
    credentials: AuthCredentials
  ): Promise<OkResponse | ErrorResponse> {
    try {
      const response = await authApi.doPost<AuthCredentials, OkResponse | string>(
        credentials,
        `${this.BASE_PATH}/register`
      );

      if (typeof response === 'string' && response === 'OK') {
        return { status: 'OK' };
      }

      if (typeof response === 'object' && 'status' in response) {
        return response as OkResponse;
      }

      throw new Error('Respuesta inesperada del servidor');
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Solicita el envío de un correo para recuperación de contraseña.
   * Valida la respuesta del backend para asegurar que el correo fue enviado correctamente.
   */
  public static async recoveryRequest(
    email: string
  ): Promise<OkResponse | ErrorResponse> {
    try {
      const response = await authApi.doPost<{ email: string }, any>(
        { email },
        `${this.BASE_PATH}/recover-password`
      );

      if (typeof response === 'string' && response.includes('Email enviado correctamente.')) {
        return { status: 'OK', message: response };
      }

      if (typeof response === 'object' && response.status === 'OK') {
        return response;
      }

      throw new Error('Formato de respuesta inesperado');
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Realiza el cambio de contraseña enviando los datos necesarios.
   * Devuelve la respuesta del backend o el error correspondiente.
   */
  public static async resetPassword(
    data: PasswordResetRequest
  ): Promise<OkResponse | ErrorResponse> {
    try {
      return await authApi.doPost<PasswordResetRequest, OkResponse>(
        data,
        `${this.BASE_PATH}/reset-password`
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Método privado para manejar errores en las peticiones HTTP.
   * Extrae la información relevante del error de Axios para devolver una estructura consistente.
   */
  private static handleError(error: unknown): ErrorResponse {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (!axiosError.response) {
      return {
        message: 'UNKNOWN_ERROR',
        code: 503,
        params: 'Error desconocido',
      };
    }

    return {
      message: axiosError.response.data?.message || 'UNKNOWN_ERROR',
      code: axiosError.response.status || 500,
      params: axiosError.response.data?.params || 'Error desconocido',
    };
  }
}
