import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Función para mostrar la notificación de éxito cuando se complete la compra
export const showPurchaseSuccessAlert = async () => {
  await MySwal.fire({
    customClass: {
      popup: 'alert-popup',
      confirmButton: 'alert-button-confirm',
      title: 'alert-title',
      htmlContainer: 'alert-text',
    },
    title: '¡Compra realizada con éxito!',
    html: `
      <div class="text-center">
        <i class="fas fa-check-circle success-icon"></i>
        <p>¡Gracias por tu compra! Tu pedido se ha procesado correctamente.</p>
      </div>
    `,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    timer: 3000, // Tiempo en milisegundos para que la alerta desaparezca automáticamente
    timerProgressBar: true,
  });
};
