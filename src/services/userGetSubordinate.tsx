
import Swal from "sweetalert2";



const userGetSubordinate = async (id: number, token: string) => {
  
  try {
    const response = await fetch( `${import.meta.env.VITE_API_URL}/user/list/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.users
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

export default userGetSubordinate;
