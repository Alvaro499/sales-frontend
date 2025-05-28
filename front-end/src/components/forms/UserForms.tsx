import React from 'react';
import { UserFormProps } from './types';

export const UserForm: React.FC<UserFormProps> = ({
  formData,
  error,
  isSubmitting,
  onChange,
  onSubmit,
}) => {
  return (
    <div className='card-body p-md-4'>
      <h2 className='card-title text-center mb-3 mb-md-4'>Registro de Usuario</h2>

      {error && <div className='alert alert-danger'>{error}</div>}

      <form onSubmit={onSubmit} className='needs-validation' noValidate>
        {/* Campos del formulario con clases responsivas */}
        <div className='mb-2 mb-md-3 form-group'>
          <label htmlFor='name' className='form-label'>
            Nombre
          </label>
          <input
            id='name'
            type='text'
            name='name'  // Cambiado de companyName a pymeName
            value={formData.name}
            onChange={onChange}
            required
            className='form-control'
            placeholder='Aarón Chacón '
          />
          <div className='invalid-feedback'>
            Por favor ingresa tu nombre
          </div>
        </div>

        <div className='mb-2 mb-md-3 form-group'>
          <label htmlFor='email' className='form-label'>
            Correo electrónico
          </label>
          <input
            id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={onChange}
            required
            className='form-control'
            placeholder='Ej: contacto@gmail.com'
          />
          <div className='invalid-feedback'>
            Por favor ingresa un correo electrónico válido
          </div>
        </div>

        <div className='mb-2 mb-md-3 form-group'>
          <label htmlFor='password' className='form-label'>
            Contraseña
          </label>
          <input
            id='password'
            type='password'
            name='password'
            value={formData.password}
            onChange={onChange}
            required
            minLength={8}
            className='form-control'
            placeholder='Mínimo 8 caracteres'
          />
          <div className='invalid-feedback'>
            La contraseña debe tener al menos 8 caracteres
          </div>
        </div>

        <div className='d-grid mb-3'>
          <button
            type='submit'
            className='btn btn-primary btn-submit py-2'
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className='spinner-border spinner-border-sm me-2'
                  role='status'
                  aria-hidden='true'
                ></span>
                Registrando...
              </>
            ) : (
              'Registrar Usuario'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};