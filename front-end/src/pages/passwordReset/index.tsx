import React from 'react';
import { useParams } from 'react-router-dom';
import { PasswordResetForm } from '../../components/forms/PasswordResetForms';
import { usePasswordReset } from './hooks';

// Definimos el componente como una función de React con TypeScript
const PasswordReset1: React.FC = () => {
  // Obtenemos el token de los parámetros de la URL
  const { token } = useParams<{ token: string }>();
  
  // Usamos nuestro hook personalizado para manejar el reseteo de contraseña
  const { resetPassword, message, isSubmitting } = usePasswordReset(token || '');

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-lg">
            <div className="card-body p-4 p-md-5">
              {/* Encabezado */}
              <div className="text-center mb-4">
                <h1 className="fw-bold mb-3">Restablecer Contraseña</h1>
                <p className="text-muted">Ingresa y confirma tu nueva contraseña</p>
              </div>
              
              {/* Mensajes de éxito/error */}
              {message && (
                <div className={`alert ${message.isError ? 'alert-danger' : 'alert-success'} d-flex align-items-center`}>
                  <span className="me-2">{message.isError ? '❌' : '✅'}</span>
                  <span>{message.text}</span>
                </div>
              )}
              
              {/* Formulario para resetear contraseña */}
              <PasswordResetForm 
                onSubmit={resetPassword}
                isSubmitting={isSubmitting}
                minLength={8}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportamos el componente
export default PasswordReset1;