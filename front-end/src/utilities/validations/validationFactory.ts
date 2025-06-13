import { Validator, ValidationResult } from './types';
import {
  EmailValidator,
  PasswordValidator,
} from './authValidation';
import {
  PymeNameValidator,
  PymeEmailValidator,
  PymeAddressValidator,
  PymeDescriptionValidator,
} from './pymeValidation';

type ValidationType =
  | 'auth.email'
  | 'auth.password'
  | 'pyme.name'
  | 'pyme.email'
  | 'pyme.address'
  | 'pyme.description';

export class ValidationFactory {
  static create(type: ValidationType): Validator {
    switch (type) {
      case 'auth.email':
        return new EmailValidator();
      case 'auth.password':
        return new PasswordValidator();
      case 'pyme.name':
        return new PymeNameValidator();
      case 'pyme.email':
        return new PymeEmailValidator();
      case 'pyme.address':
        return new PymeAddressValidator();
      case 'pyme.description':
        return new PymeDescriptionValidator();
      default:
        throw new Error(`Tipo de validación no soportado: ${type}`);
    }
  }

  static validate(type: ValidationType, value: string): ValidationResult {
    const validator = this.create(type);
    return validator.validate(value);
  }
}
