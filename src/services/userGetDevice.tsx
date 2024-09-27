
import Swal from "sweetalert2";

const userGetDevice = async () => {
  
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/device`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data
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

export default userGetDevice;
