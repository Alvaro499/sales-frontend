import { Pyme } from '../../models/Pymes.models';
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

export interface PasswordResetProps {
  onSubmit: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  isSubmitting: boolean;
  minLength?: number;
}