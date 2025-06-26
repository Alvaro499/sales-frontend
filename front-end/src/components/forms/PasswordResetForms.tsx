import React, { useState } from 'react';

// Props esperadas por el componente: función de envío, estado de envío y longitud mínima
interface PasswordResetProps {
  onSubmit: (newPassword: string) => Promise<void>;
  isSubmitting: boolean;
  minLength?: number;
}

// Formulario para restablecer contraseña
export const PasswordResetForm: React.FC<PasswordResetProps> = ({ 
  onSubmit, 
  isSubmitting,
  minLength = 8 
}) => {
  // Estado local para las contraseñas y errores
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Valida que la contraseña cumpla con los requisitos
  const validate = (): boolean => {
    if (newPassword.length < minLength) {
      setError(`La contraseña debe tener al menos ${minLength} caracteres`);
      return false;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }
    
    setError('');
    return true;
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    await onSubmit(newPassword); // Ejecuta la función de envío
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Muestra un mensaje de error si existe */}
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
      
      {/* Campo de nueva contraseña */}
      <div className="mb-3">
        <label htmlFor="newPassword" className="form-label">
          Nueva Contraseña
        </label>
        <input
          id="newPassword"
          type="password"
          className="form-control form-control-lg"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          minLength={minLength}
          required
          disabled={isSubmitting}
          aria-describedby="passwordHelp"
        />
        <div id="passwordHelp" className="form-text">
          Mínimo {minLength} caracteres
        </div>
      </div>
      
      {/* Campo para confirmar la contraseña */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="form-label">
          Confirmar Contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="form-control form-control-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          minLength={minLength}
          required
          disabled={isSubmitting}
        />
      </div>
      
      {/* Botón de envío con indicador de carga */}
      <button 
        type="submit" 
        className="btn btn-primary btn-lg w-100"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
            Procesando...
          </>
        ) : 'Cambiar Contraseña'}
      </button>
    </form>
  );
};
