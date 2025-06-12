// src/utilities/validations/pymeValidation.ts
import { Validator, ValidationResult } from './types';

export class PymeNameValidator implements Validator {
  validate(value: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Nombre obligatorio' };
    }
    if (value.length > 100) {
      return { isValid: false, error: 'Máximo 100 caracteres' };
    }
    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-.,&()]+$/.test(value)) {
      return { isValid: false, error: 'Caracteres no permitidos' };
    }
    return { isValid: true };
  }
}

export class PymeEmailValidator implements Validator {
  validate(value: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Correo electrónico obligatorio' };
    }
    
    // Validación básica de formato email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      return { isValid: false, error: 'Formato de correo electrónico inválido' };
    }
    
    // Validación de longitud máxima
    if (value.length > 255) {
      return { isValid: false, error: 'El correo no puede exceder los 255 caracteres' };
    }
    
    return { isValid: true };
  }
}

export class PymeAddressValidator implements Validator {
  validate(value: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Dirección obligatoria' };
    }
    
    if (value.length > 255) {
      return { isValid: false, error: 'La dirección no puede exceder los 255 caracteres' };
    }
    
    // Validación de caracteres permitidos
    if (!/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s\-#.,]+$/.test(value)) {
      return { isValid: false, error: 'La dirección contiene caracteres no permitidos' };
    }
    
    return { isValid: true };
  }
}

export class PymeDescriptionValidator implements Validator {
  validate(value: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Descripción obligatoria' };
    }
    
    if (value.length > 1000) {
      return { isValid: false, error: 'La descripción no puede exceder los 1000 caracteres' };
    }
    
    // Validación de caracteres permitidos (más flexible que otros campos)
    if (!/^[\s\S]{0,1000}$/.test(value)) {
      return { isValid: false, error: 'La descripción contiene caracteres no permitidos' };
    }
    
    return { isValid: true };
  }
}

export class PymePhoneValidator implements Validator {
  validate(value: string): ValidationResult {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: 'Teléfono obligatorio' };
    }
    
    // Validación de formato de teléfono (ajustar según requisitos)
    const phoneRegex = /^[0-9\s+\-()]{7,20}$/;
    if (!phoneRegex.test(value)) {
      return { isValid: false, error: 'Formato de teléfono inválido' };
    }
    
    // Validación de longitud
    const cleanPhone = value.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 7 || cleanPhone.length > 15) {
      return { isValid: false, error: 'El teléfono debe tener entre 7 y 15 dígitos' };
    }
    
    return { isValid: true };
  }
}