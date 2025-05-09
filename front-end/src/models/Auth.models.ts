export interface RecoveryRequest {
	email: string;
}

export interface VerificationRequest {
	email: string;
	verificationCode: string;
}
