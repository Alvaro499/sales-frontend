import { doPost } from './http.service';
import { AuthCredentials, PasswordResetRequest } from '../models/Auth.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AxiosError } from 'axios';

export class AuthService {
  private static BASE_PATH = '/login';

  public static async login(credentials: AuthCredentials) {
    try {
      const response = await doPost<AuthCredentials, any>(
        credentials,
        `${this.BASE_PATH}`
      );
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public static async register(credentials: AuthCredentials) {
    try {
      const response = await doPost<AuthCredentials, any>(
        credentials,
        `${this.BASE_PATH}/register`
      );
      return response;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public static async resetPassword(
    data: PasswordResetRequest
  ): Promise<OkResponse | ErrorResponse> {
    try {
      const response = await doPost<PasswordResetRequest, OkResponse>(
        data,
        `${this.BASE_PATH}/reset-password`
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
        message: axiosError.response?.data?.message || 'Error al cambiar contraseña',
        code: axiosError.response?.status || 500,
        errorCode: axiosError.response?.data?.errorCode || 'PASSWORD_RESET_ERROR',
      };
    }
  }

  private static handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      return new Error(error.response?.data?.message || 'Error de autenticación');
    }
    return new Error('Error desconocido');
  }
}