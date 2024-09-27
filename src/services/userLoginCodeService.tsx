
import Swal from "sweetalert2";

const userLoginCodeService = async (code : object, token: string) => {
  
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/login/code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(code)
    });

    if (response.ok) {
      return true
    } else {
      const data = await response.json();
      Swal.fire({
        title: data.msg,
        text: 'Las credenciales ingresadas son incorrectas',
        icon: 'error',
      });
      return false
    }
  } catch (error) {
    console.error(error);
  }
}

export default userLoginCodeService;
