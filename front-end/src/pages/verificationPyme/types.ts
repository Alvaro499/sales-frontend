export interface VerificationHook {
	email: string;
	verificationCode: string;
	error: string;
	isSubmitting: boolean;
	handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleVerify: (e: React.FormEvent) => Promise<boolean>;
	handleResendCode: () => Promise<void>;
	handleBack: () => void;
}

export interface VerificationPageProps {
	email: string;
	verificationCode: string;
	error: string;
	isSubmitting: boolean;
	onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
	onResendCode: () => void;
	onBack: () => void;
}
