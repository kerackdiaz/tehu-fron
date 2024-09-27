
import Swal from "sweetalert2";
import { UserData } from "../interfaces/interfaces";

const userLoginService = async (userData: UserData) => {
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (response.ok) {
      const data = await response.json();      
      localStorage.setItem('token',JSON.stringify(data.token))
      localStorage.setItem('id',JSON.stringify(data.id))
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

export default userLoginService;
