import { RegisterPymeFormData } from '../models/RegisterPymeFormData.models';
export const validateRegisterPymeForm = (
	formData: RegisterPymeFormData,
): string | null => {
	if (!formData.companyName) {
		return 'El nombre de la empresa es obligatorio';
	}
	if (!formData.email) {
		return 'El correo electrónico es obligatorio';
	}
	if (!formData.password || formData.password.length < 8) {
		return 'La contraseña debe tener al menos 8 caracteres';
	}
	if (!formData.address) {
		return 'La dirección es obligatoria';
	}
	return null; // Si no hay errores
};
