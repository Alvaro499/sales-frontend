// Interfaz que define el estado y las funciones para manejar el proceso de verificación de código de usuario.
export interface VerificationHook {
  userId: string;
  code: string;
  error: string;
  isSubmitting: boolean;
  handleCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleVerify: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleBack: () => void;
}
