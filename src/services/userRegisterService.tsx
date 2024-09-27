
import Swal from "sweetalert2";
import { Register } from "../interfaces/interfaces";
//import { log10 } from "chart.js/helpers";
import errorMessage  from  "../helpers/errorMessage"

const userRegisterService = async (userRegister: Register) => {
  console.log(userRegister);
  
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userRegister)
    }); 
    console.log(response);
       
    if (response.ok) {
      const data = await response.json();
      return data
    } else {
      const data = await response.json();
      const msg =  errorMessage(data.error['0'].message)
      Swal.fire({
        title: msg,
        icon: 'error',
      });
      return false
    }
  } catch (error) {
    console.error(error);
  }
}

export default userRegisterService;
