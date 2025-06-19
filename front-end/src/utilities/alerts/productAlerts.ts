import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const showProductSuccessAlert = async (productName: string) => {
  await MySwal.fire({
    customClass: {
      popup: 'alert-popup',
      confirmButton: 'alert-button-confirm',
      title: 'alert-title',
      htmlContainer: 'alert-text',
    },
    title: '¡Producto publicado!',
    html: `
      <div class="text-center">
        <i class="fas fa-check-circle success-icon"></i>
        <p>El producto <strong>${productName}</strong> se ha publicado exitosamente.</p>
      </div>
    `,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showProductErrorAlert = async (errorMessage: string) => {
  await MySwal.fire({
    customClass: {
      popup: 'alert-popup',
      confirmButton: 'alert-button-confirm',
      title: 'alert-title',
      htmlContainer: 'alert-text',
    },
    title: 'Error al publicar',
    html: `
      <div class="text-center">
        <i class="fas fa-exclamation-circle error-icon"></i>
        <p>${errorMessage}</p>
      </div>
    `,
    icon: 'error',
    confirmButtonText: 'Entendido'
  });
};