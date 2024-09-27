import Swal from "sweetalert2";
import '../scss/components/_c-swal.css';



function hasEmptyString(obj: any): boolean {
  for (const [, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.trim() === '') {
      Swal.fire({
        title: 'Ups!',
        text: 'Todos los campos son obligatorios',
        icon: 'info',
      });
      return true;
    }
  }

  return false;
}

export default hasEmptyString;
