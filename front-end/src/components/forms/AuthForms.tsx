import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthForm } from '../../pages/auth/hooks';
import { AuthFormProps } from './types';

// Componente de formulario de autenticación (login o registro)
export const AuthForm: React.FC<AuthFormProps> = ({ 
  isLogin = true, 
  formTitle = 'Iniciar Sesión',
  onSuccess 
}) => {
  const navigate = useNavigate();
  const {
    formData,
    errors,
    isSubmitting,
    apiError,
    handleChange,
    handleSubmit
  } = useAuthForm(); // Hook personalizado para manejar lógica del formulario

  // Maneja el envío del formulario
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleSubmit();
    if (result && onSuccess) onSuccess(result); // Ejecuta callback si existe
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-5">
        {/* Título y subtítulo del formulario */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-primary">{formTitle}</h2>
          <p className="text-muted">
            {isLogin ? 'Ingresa a tu cuenta' : 'Crea una nueva cuenta'}
          </p>
        </div>

        {/* Muestra error general si lo hay */}
        {apiError && (
          <div className="alert alert-danger alert-dismissible fade show">
            {apiError}
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          </div>
        )}

        <form onSubmit={onSubmit}>
          {/* Campo de correo */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="tu@email.com"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Campo de contraseña */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              disabled={isSubmitting}
              placeholder="••••••••"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Botón de enviar con spinner de carga */}
          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 mb-3 fw-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Procesando...
              </>
            ) : isLogin ? 'Ingresar' : 'Registrarse'}
          </button>

          {/* Alterna entre login y registro */}
          <div className="text-center mt-4">
            {isLogin ? (
              <>
                <p className="text-muted mb-2">¿No tienes cuenta?</p>
                <button 
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate('/registerUser')}
                >
                  Crear una cuenta
                </button>
              </>
            ) : (
              <>
                <p className="text-muted mb-2">¿Ya tienes cuenta?</p>
                <button 
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate('/login')}
                >
                  Iniciar sesión
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
