import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Muestra un cuadro de diálogo para confirmar el cierre de sesión y devuelve true si el usuario confirma
export const confirmLogout = async (): Promise<boolean> => {
  const result = await MySwal.fire({
    title: '¿Seguro que quieres cerrar sesión?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
    customClass: {
      popup: 'alert-popup',
      confirmButton: 'alert-button-confirm',
      cancelButton: 'alert-button-cancel',
      title: 'alert-title',
    },
  });

  return result.isConfirmed;
};
