import Swal from "sweetalert2";

const userLoginSendCode = async (token: string) => {
  Swal.fire({
    title: 'Nuevo código',
    text: 'Estamos generando un nuevo Código',
    icon: 'info',
  });
  
    try {
        const response = await fetch( `${import.meta.env.VITE_API_URL}/login/send-code`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          return data
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

export default userLoginSendCode