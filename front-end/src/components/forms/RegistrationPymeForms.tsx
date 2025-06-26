import React from 'react';
import { RegistrationFormProps } from './types';

// Componente de formulario para registrar una Pyme
export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  formData,
  error,
  isSubmitting,
  onChange,
  onSubmit,
}) => {
  // Se obtiene el userId almacenado localmente (por ejemplo, al autenticar)
  const userId = localStorage.getItem('userId') || '';
  
  // Maneja el envío del formulario incluyendo el userId
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      userId: userId // Se agrega al payload
    });
  };

  return (
    <div className='card-body p-md-4'>
      <h2 className='card-title text-center mb-3 mb-md-4'>Registro de Pyme</h2>

      {/* Muestra error general si lo hay */}
      {error && <div className='alert alert-danger'>{error}</div>}

      <form onSubmit={handleSubmit} className='needs-validation' noValidate>
        {/* Campo: Nombre de la empresa */}
        <div className='mb-2 mb-md-3 form-group'>
          <label htmlFor='pymeName' className='form-label'>Nombre de la empresa</label>
          <input
            id='pymeName'
            type='text'
            name='pymeName'
            value={formData.pymeName}
            onChange={onChange}
            required
            className='form-control'
            placeholder='Ej: Mi Empresa S.A.'
          />
          <div className='invalid-feedback'>Por favor ingresa el nombre de tu empresa</div>
        </div>

        {/* Campo: Correo electrónico */}
        <div className='mb-2 mb-md-3 form-group'>
          <label htmlFor='email' className='form-label'>Correo electrónico</label>
          <input
            id='email'
            type='email'
            name='email'
            value={formData.email}
            onChange={onChange}
            required
            className='form-control'
            placeholder='Ej: contacto@empresa.com'
          />
          <div className='invalid-feedback'>Por favor ingresa un correo electrónico válido</div>
        </div>

        {/* Campo: Teléfono (opcional) */}
        <div className='mb-2 mb-md-3 form-group'>
          <label htmlFor='phone' className='form-label'>
            Teléfono <span className='text-muted'>(opcional)</span>
          </label>
          <input
            id='phone'
            type='tel'
            name='phone'
            value={formData.phone || ''}
            onChange={onChange}
            className='form-control'
            placeholder='Ej: +506 2552 4321'
          />
        </div>

        {/* Campo: Dirección */}
        <div className='mb-2 mb-md-3 form-group'>
          <label htmlFor='address' className='form-label'>Dirección</label>
          <input
            id='address'
            type='text'
            name='address'
            value={formData.address}
            onChange={onChange}
            required
            className='form-control'
            placeholder='Ej: Av. Principal 1234, Santiago'
          />
          <div className='invalid-feedback'>Por favor ingresa una dirección válida</div>
        </div>

        {/* Campo: Descripción de la Pyme */}
        <div className='mb-2 mb-md-3 form-group'>
          <label htmlFor='description' className='form-label'>Descripción de la Pyme</label>
          <textarea
            id='description'
            name='description'
            value={formData.description || ''}
            onChange={onChange}
            className='form-control'
            rows={3}
            placeholder='Describe los productos o servicios que ofrece tu empresa'
          />
        </div>

        {/* Botón para enviar el formulario */}
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
              'Registrar Pyme'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
