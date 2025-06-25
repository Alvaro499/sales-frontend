import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Función para mostrar la notificación de éxito
export const showAddToCartSuccessAlert = async (productName: string) => {
  await MySwal.fire({
    customClass: {
      popup: 'alert-popup',
      confirmButton: 'alert-button-confirm',
      title: 'alert-title',
      htmlContainer: 'alert-text',
    },
    title: '¡Producto añadido al carrito!',
    html: `
      <div class="text-center">
        <i class="fas fa-check-circle success-icon"></i>
        <p>El producto <strong>${productName}</strong> ha sido añadido a tu carrito.</p>
      </div>
    `,
    icon: 'success',
    confirmButtonText: 'Aceptar',
    timer: 2000, // Tiempo en milisegundos para que la alerta desaparezca automáticamente
    timerProgressBar: true,
  });
};