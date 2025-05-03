import { Pyme } from '../../models/Pymes.models';

export interface RegisterPymeHook {
	formData: Pyme;
	error: string;
	isSubmitting: boolean;
	setError: (error: string) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	registerPyme: () => Promise<boolean>;
}
