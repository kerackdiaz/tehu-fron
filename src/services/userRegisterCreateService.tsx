import Swal from "sweetalert2";
import errorMessage  from  "../helpers/errorMessage";
interface FormValues {
  rolId: number;
  name: string;
  identificationNumber: string;
  identificationType: string;
  email: string;
  phone: string;
}



const userRegisterCreateService = async (userRegisterInfo: FormValues, token: string) => {
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/user/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token
      },
      body: JSON.stringify(userRegisterInfo)
    });
    
    if (response.ok) {
      const data = await response.json();
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'El usuario ha sido creado',
      }).then((result) => {
        if (result.isConfirmed) {
         window.location.reload()
        }
      });
      return data
    } else {
      const data = await response.json();      
      const msg =  errorMessage(data.msg['0'].message)
      Swal.fire({
        title: msg,
        icon: 'error',
        timer: 3000
      });
      return false
    }
  } catch (error) {
    console.error(error);
  }
}

export default userRegisterCreateService;
