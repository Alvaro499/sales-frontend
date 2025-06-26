export interface VerificationHook {
	userId: string;
	code: string;
	error: string;
	isSubmitting: boolean;
	handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleVerify: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
	handleBack: () => void;
}
