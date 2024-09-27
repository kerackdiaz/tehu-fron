import { useState, useEffect } from 'react';
import userGetDetails from '../../services/userGetUserDetails'




const ProfileContainer = () => {
  const [userName, setUserName] = useState('Diego Azaustre');
  const [userEmail, setUserEmail] = useState('rubenserna95@gmail.com');
  const [userPhone, setUserPhone] = useState('7898776789');
  const [position, setPosition] = useState('DeveloperTech');

  useEffect(() => {
    const userDetails = async () => {
      try {
        const dataUser = await userGetDetails();
        console.log(dataUser);

        setUserName(dataUser.user.name || 'Usuario');
        setUserEmail(dataUser.user.email || 'email@email.com');
        setUserPhone(dataUser.user.phone || '000 000 0000');
        setPosition(dataUser.user.position || 'Cargo')
      } catch (error) {
        console.error('Error al obtener detalles del usuario', error);
      }
    }

    userDetails();
  }, []);

  return (
    <div className="bg-gray-200 flex flex-col pt-20 lg:justify-center items-center min-h-screen w-full px-4" >
      <div className="flex flex-col items-center justify-center mb-4">
        <picture>
          <img src={"./iconUser.avif"} alt="Perfil" title="Perfil" />
        </picture>

        <div className="flex justify-center h-10 items-center bg-blueDark text-gray-100 rounded-full text-lg px-4 mt-6 font-medium">
          <p className="mr-1">Rol:</p> {position} 
        </div>
      </div>

      <div className="flex flex-col items-start justify-center bg-gray-100 border border-blueDark rounded-3xl shadow-md p-10 w-full sm:max-w-[500px] md:text-lg">
        <span className="mb-2">
          <span className="font-medium">Nombre:</span> {userName}
        </span>
        <span className="mb-2">
          <span className="font-medium">Email:</span> {userEmail}
        </span>
        <span className="mb-2">
          <span className="font-medium">Celular:</span> {userPhone}
        </span>
      </div>
    </div>
  )
}

export default ProfileContainer;
