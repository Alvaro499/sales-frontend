export interface VerificationHook {
	email: string;
	verificationCode: string;
	error: string;
	isSubmitting: boolean;
	handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleVerify: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	handleResendCode: () => Promise<void>;
	handleBack: () => void;
}
