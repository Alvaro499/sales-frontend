export interface PasswordResetRequest {
  token: string;       // Token para verificar el cambio de contraseña
  newPassword: string; // Nueva contraseña del usuario
}

export interface AuthCredentials {
  email: string;    // Correo electrónico del usuario
  password: string; // Contraseña del usuario
}
