
import Swal from "sweetalert2";

const userGetDetails = async () => {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const token = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : false;
  
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/user/currency`, {
      method: 'GET',
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
        icon: 'error',
      });
      return false
    }
  } catch (error) {
    console.error(error);
  }
}

export default userGetDetails;
