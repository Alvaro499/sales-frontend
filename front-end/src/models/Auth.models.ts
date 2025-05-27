export interface PasswordResetRequest {
  token: string;
  newPassword: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

