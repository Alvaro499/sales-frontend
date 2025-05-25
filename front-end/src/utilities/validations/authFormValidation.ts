export class AuthValidations {
  static validateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email) {
      return { isValid: false, error: 'El correo electrónico es requerido' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Ingrese un correo electrónico válido' };
    }

    return { isValid: true };
  }

  static validatePassword(password: string, minLength: number = 8): { isValid: boolean; error?: string } {
    if (!password) {
      return { isValid: false, error: 'La contraseña es requerida' };
    }

    if (password.length < minLength) {
      return { isValid: false, error: `La contraseña debe tener al menos ${minLength} caracteres` };
    }

    return { isValid: true };
  }
}