import { Pyme } from "../../models/Pymes.models";
import { ValidationResult } from "./types";

export const validatePymeName = (name: string): ValidationResult => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'El nombre de la empresa es obligatorio' };
  }
  
  if (name.length > 100) {
    return { isValid: false, error: 'El nombre no puede exceder los 100 caracteres' };
  }
  
  if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-.,&()]+$/.test(name)) {
    return { isValid: false, error: 'El nombre contiene caracteres no permitidos' };
  }
  
  return { isValid: true };
};

export const validatePymeEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'El correo electrónico es obligatorio' };
  }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Ingrese un correo electrónico válido' };
  }
  
  if (email.length > 255) {
    return { isValid: false, error: 'El correo no puede exceder los 255 caracteres' };
  }
  
  return { isValid: true };
};

export const validatePymePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'La contraseña es obligatoria' };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: 'La contraseña debe tener al menos 8 caracteres' };
  }
  
  if (password.length > 64) {
    return { isValid: false, error: 'La contraseña no puede exceder los 64 caracteres' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos una mayúscula' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos una minúscula' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos un número' };
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return { isValid: false, error: 'La contraseña debe contener al menos un carácter especial' };
  }
  
  return { isValid: true };
};

export const validatePymeAddress = (address: string): ValidationResult => {
  if (!address || address.trim().length === 0) {
    return { isValid: false, error: 'La dirección es obligatoria' };
  }
  
  if (address.length > 255) {
    return { isValid: false, error: 'La dirección no puede exceder los 255 caracteres' };
  }
  
  return { isValid: true };
};

export const validatePymeDescription = (description: string): ValidationResult => {
  if (!description || description.trim().length === 0) {
    return { isValid: false, error: 'La descripción es obligatoria' };
  }
  
  if (description.length > 1000) {
    return { isValid: false, error: 'La descripción no puede exceder los 1000 caracteres' };
  }
  
  return { isValid: true };
};

export const validateRegisterPymeForm = (formData: Pyme): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  
  const nameValidation = validatePymeName(formData.pymeName);
  if (!nameValidation.isValid) errors.pymeName = nameValidation.error!;
  
  const emailValidation = validatePymeEmail(formData.email);
  if (!emailValidation.isValid) errors.email = emailValidation.error!;
  
  const passwordValidation = validatePymePassword(formData.password);
  if (!passwordValidation.isValid) errors.password = passwordValidation.error!;
  
  const addressValidation = validatePymeAddress(formData.address);
  if (!addressValidation.isValid) errors.address = addressValidation.error!;
  
  const descriptionValidation = validatePymeDescription(formData.description);
  if (!descriptionValidation.isValid) errors.description = descriptionValidation.error!;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};