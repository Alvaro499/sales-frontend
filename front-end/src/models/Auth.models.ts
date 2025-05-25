export interface RecoveryRequest {
	email: string;
}

export interface VerificationRequest {
	email: string;
	verificationCode: string;
}

export interface PasswordResetRequest {
  token: string;
  newPassword: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

