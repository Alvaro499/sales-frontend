
import { Validator, ValidationResult } from './types';

export class EmailValidator implements Validator {
  validate(value: string): ValidationResult {
    if (!value) return { isValid: false, error: 'El correo electrónico es requerido' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return { isValid: false, error: 'Correo inválido' };
    return { isValid: true };
  }
}

export class PasswordValidator implements Validator {
  constructor(private minLength: number = 8) {}

  validate(value: string): ValidationResult {
    if (!value) return { isValid: false, error: 'La contraseña es requerida' };
    if (value.length < this.minLength) {
      return { isValid: false, error: `Debe tener al menos ${this.minLength} caracteres` };
    }
    return { isValid: true };
  }
}
