
import Swal from "sweetalert2";

const userEditService = async (password: object, token: string) => {
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(password)
    });
    
    if (response.ok) {    
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Contraseña Actualizada',
        showConfirmButton: false,
        timer: 1500
      })
      return true
    } else {
      const data = await response.json();
      Swal.fire({
        title: data.msg,
        icon: 'error',
      });
      return false
    }
  } catch (error) {
    console.error(error);
  }
}

export default userEditService;
