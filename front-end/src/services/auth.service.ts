import { doPost } from './http.service';
import { AuthCredentials, PasswordResetRequest } from '../models/Auth.models';
import { OkResponse, ErrorResponse } from '../models/Api.models';
import { AxiosError } from 'axios';

export class AuthService {
  private static BASE_PATH = '/api/public/auth';

  public static async login(
    credentials: AuthCredentials
  ): Promise<OkResponse | ErrorResponse> {
    try {
      return await doPost<AuthCredentials, OkResponse>(
        credentials,
        `${this.BASE_PATH}/login`
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  public static async registerUser(
  credentials: AuthCredentials
): Promise<OkResponse | ErrorResponse> {
  try {
    const response = await doPost<AuthCredentials, OkResponse | string>(
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

  }

  public static async resetPassword(
    data: PasswordResetRequest
  ): Promise<OkResponse | ErrorResponse> {
    try {
      return await doPost<PasswordResetRequest, OkResponse>(
        data,
        `${this.BASE_PATH}/reset-password`
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  private static handleError(error: unknown): ErrorResponse {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (!axiosError.response) {
      return {
        message: 'Error de conexión',
        code: 503,
        errorCode: 'NETWORK_ERROR',
      };
    }

    return {
      message: axiosError.response?.data?.message || 'Error en la operación',
      code: axiosError.response?.status || 500,
      errorCode: axiosError.response?.data?.errorCode || 'UNKNOWN_ERROR',
    };
  }
}
