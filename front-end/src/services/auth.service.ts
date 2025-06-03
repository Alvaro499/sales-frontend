import { authApi } from './clients.service';
import { AuthCredentials, PasswordResetRequest } from '../models/Auth.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AuthStorage } from './storage.sevice';
import { AxiosError } from 'axios';

export class AuthService {
  private static BASE_PATH = '/api/public/auth';

  public static async login(
    credentials: AuthCredentials
  ): Promise<OkResponse | ErrorResponse> {
    try {
      const response = await authApi.doPost<AuthCredentials, OkResponse>(
        credentials,
        `${this.BASE_PATH}/login`
      );

      if ('token' in response && typeof response.token === 'string') {
        AuthStorage.setToken(response.token);
      }

      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

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

  public static async logout(): Promise<void> {
    AuthStorage.clearToken();
  }

  public static async recoveryRequest(
    email: string
  ): Promise<OkResponse | ErrorResponse> {
    try {
      const response = await authApi.doPost<{ email: string }, any>(
        { email },
        `${this.BASE_PATH}/recover-password`
      );

      if (typeof response === "string" && response.includes("enviado correctamente")) {
        return { status: "OK", message: response };
      }

      if (typeof response === "object" && response.status === "OK") {
        return response;
      }

      throw new Error("Formato de respuesta inesperado");
    } catch (error) {
      return this.handleError(error);
    }
  }

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

  private static handleError(error: unknown): ErrorResponse {
    if (error instanceof Error && !('response' in error)) {
      return {
        message: 'Error de conexión',
        code: 503,
        errorCode: 'NETWORK_ERROR',
      };
    }

    const axiosError = error as AxiosError<ErrorResponse>;

    if (!axiosError.response) {
      return {
        message: 'Error de conexión',
        code: 503,
        errorCode: 'NETWORK_ERROR',
      };
    }

    return {
      message: axiosError.response.data?.message || 'Error en la operación',
      code: axiosError.response.status || 500,
      errorCode: axiosError.response.data?.errorCode || 'UNKNOWN_ERROR',
    };
  }
}
