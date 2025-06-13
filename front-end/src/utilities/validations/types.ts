// src/utilities/validations/types.ts
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  
}

export interface Validator {
  validate(value: string): ValidationResult;
}