import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthService } from '../../services/auth.service';
import { ErrorResponse } from '../../models/Api.models';
import './styles.css';

const MySwal = withReactContent(Swal);

// Muestra un cuadro para ingresar el correo y envía la solicitud de recuperación de contraseña,
// mostrando mensajes de éxito o error según la respuesta.
export const showRecoveryAlert = async () => {
  const { value: email } = await MySwal.fire({
    customClass: {
      popup: 'alert-popup',
      confirmButton: 'alert-button-confirm',
      cancelButton: 'alert-button-cancel',
      title: 'alert-title',
      htmlContainer: 'alert-text',
    },
    title: 'Recuperar contraseña',
    html: `
      <div class="text-left">
        <p>Por favor ingresa tu correo electrónico registrado</p>
        <input 
          id="swal-input1" 
          class="alert-input" 
          placeholder="correo@empresa.com"
          type="email"
        >
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Enviar solicitud',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    preConfirm: () => {
      const inputValue = (document.getElementById('swal-input1') as HTMLInputElement).value;
      if (!inputValue) {
        MySwal.showValidationMessage('Debes ingresar un correo válido');
      }
      return inputValue;
    },
  });

  if (!email) return;

  try {
    const response = await AuthService.recoveryRequest(email);

    if ('status' in response && response.status === "OK") {
      await MySwal.fire({
        title: 'Éxito',
        text: 'Correo de recuperación enviado correctamente',
        icon: 'success',
        customClass: {
          popup: 'alert-popup',
          confirmButton: 'alert-button-confirm',
        },
      });
      return;
    }

    const error = response as ErrorResponse;
    await MySwal.fire({
      title: 'Error',
      text: error.message || 'No se pudo enviar el correo de recuperación',
      icon: 'error',
      customClass: {
        popup: 'alert-popup',
        confirmButton: 'alert-button-confirm',
      },
    });

  } catch (err) {
    await MySwal.fire({
      title: 'Error',
      text: 'Ocurrió un error inesperado. Por favor intenta nuevamente.',
      icon: 'error',
      customClass: {
        popup: 'alert-popup',
        confirmButton: 'alert-button-confirm',
      },
    });
  }
};
