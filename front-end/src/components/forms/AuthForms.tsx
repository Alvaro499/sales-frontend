import React from 'react';
import { useAuthForm } from '../../pages/auth/hooks';
import { AuthFormProps } from './types';

export const AuthForm: React.FC<AuthFormProps> = ({ 
  isLogin = true, 
  formTitle = 'Iniciar Sesión',
  onSuccess 
}) => {
  const {
    formData,
    errors,
    isSubmitting,
    apiError,
    handleChange,
    handleSubmit
  } = useAuthForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleSubmit();
    if (result && onSuccess) onSuccess(result);
  };

  return (
    <form onSubmit={onSubmit} className="auth-form">
      <h2 className="mb-4 text-center">{formTitle}</h2>
      
      {apiError && (
        <div className="alert alert-danger">
          {apiError}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={formData.email}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-4">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          value={formData.password}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>

      <button 
        type="submit" 
        className="btn btn-primary w-100"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Procesando...' : isLogin ? 'Ingresar' : 'Registrarse'}
      </button>
    </form>
  );
};