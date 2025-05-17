import React, { useState } from 'react';

interface PasswordResetProps {
  onSubmit: (newPassword: string) => Promise<void>;
  isSubmitting: boolean;
  minLength?: number;
}

export const PasswordResetForm: React.FC<PasswordResetProps> = ({ 
  onSubmit, 
  isSubmitting,
  minLength = 8 
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    await onSubmit(newPassword);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="alert alert-warning" role="alert">
          {error}
        </div>
      )}
      
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