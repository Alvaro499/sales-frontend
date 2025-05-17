import React from 'react';
import { useParams } from 'react-router-dom';
import { PasswordResetForm } from '../../components/forms/PasswordResetForms';
import { usePasswordReset } from './hooks';

export const PasswordResetPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const { resetPassword, message, isSubmitting } = usePasswordReset(token);

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-lg">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h1 className="fw-bold mb-3">Restablecer Contraseña</h1>
                <p className="text-muted">Ingresa y confirma tu nueva contraseña</p>
              </div>
              
              {message && (
                <div className={`alert ${message.isError ? 'alert-danger' : 'alert-success'} d-flex align-items-center`}>
                  <span className="me-2">{message.isError ? '❌' : '✅'}</span>
                  <span>{message.text}</span>
                </div>
              )}
              
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