// src/pages/register/types.ts
export interface RegisterPymeFormData {
	companyName: string;
	email: string;
	password: string;
	phone?: string;
	address: string;
}

export interface RegisterPymeHook {
	formData: RegisterPymeFormData;
	error: string;
	isSubmitting: boolean;
	setError: (error: string) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	registerPyme: () => Promise<boolean>;
}
