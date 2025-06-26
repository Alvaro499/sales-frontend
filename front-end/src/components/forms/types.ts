import { Pyme } from '../../models/Pymes.models';
import { User } from '../../models/User.models';

// Props para el formulario de registro de Pyme
export interface RegistrationFormProps {
  formData: Pyme; // Datos de la Pyme
  error: string; // Mensaje de error a mostrar
  isSubmitting: boolean; // Indica si el formulario está en proceso de envío
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; // Manejador para inputs
  onSubmit: (formData: Pyme) => Promise<void> | void; // Función al enviar
}

// Props para el formulario de registro o edición de usuario
export interface UserFormProps {
  formData: User; // Datos del usuario
  error: string;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

// Props para el formulario de verificación de código (por ejemplo, email o SMS)
export interface VerificationFormProps {
  code: string; // Código ingresado
  error: string | null;
  isSubmitting: boolean;
  onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  onBack: () => void; // Acción para volver (ej. a login)
}

// Props para el formulario de restablecimiento de contraseña
export interface PasswordResetProps {
  onSubmit: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  isSubmitting: boolean;
  minLength?: number; // Longitud mínima opcional, por defecto normalmente 8
}

// Props para el formulario de login o registro (uso compartido)
export interface AuthFormProps {
  isLogin?: boolean; // Indica si es login (true) o registro
  formTitle?: string; // Título personalizado del formulario
  onSuccess?: (data: any) => void; // Callback al éxito del login/registro
}
