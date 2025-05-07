export interface Pyme {
	companyName: string;
	email: string;
	password: string;
	phone?: string;
	address: string;
}

export interface RecoveryRequest {
	email: string;
}

export interface VerificationRequest {
	email: string;
	verificationCode: string;
}

export interface RegistrationFormProps {
	formData: Pyme;
	error: string;
	isSubmitting: boolean;
	onRecoveryClick: () => void;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export interface VerificationFormProps {
	email: string;
	verificationCode: string;
	error: string | null;
	isSubmitting: boolean;
	onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
	onResendCode: () => void | Promise<void>;
	onBack: () => void;
}
