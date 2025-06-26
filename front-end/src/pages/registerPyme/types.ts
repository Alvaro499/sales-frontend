import { Pyme } from '../../models/Pymes.models';

// incluye estado del formulario, errores, envío, y funciones para cambiar campos y enviar datos.
export interface RegisterPymeHook {
	formData: Pyme;
	error: string;
	isSubmitting: boolean;
	setError: (error: string) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	registerPyme: () => Promise<boolean>;
}
