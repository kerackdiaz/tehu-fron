import { useState, useEffect } from 'react';
import userGetDetails from '../../../services/userGetUserDetails';
import { Link } from 'react-router-dom';




const User = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userDetails = async () => {
      try {
        const dataUser = await userGetDetails();
        setUserName(dataUser.user.name || 'Usuario');
      } catch (error) {
        console.error('Error al obtener detalles del usuario', error);
      }
    }

    userDetails();
  }, []);
  return (
    <Link to='/perfil'>
      <div className='text-white font-light text-lg flex items-center justify-end gap-2 cursor-pointer'>
        <img className='w-8' src={"../iconUserWhite.avif"} loading="lazy" alt="Usuario Tehu" title="Usuario Tehu" />
        <span className='font-semibold'>{userName}</span>
      </div>
    </Link>
  )
}

export default User