import React from 'react';

interface UserDetailProps {
  phone: string; // O el tipo de dato apropiado para la identificación del usuario
}

const UserDetail: React.FC<UserDetailProps> = ({ phone }) => {
  // Aquí iría la lógica para cargar los detalles del usuario con la ID proporcionada
  // Puedes usar una solicitud a tu API, por ejemplo

  return (
    <div className='text-black font-normal text-xs'>
      {/* Muestra los detalles del usuario */}
      <h2>Detalles del Usuario</h2>
      <p>Núm. de celular: {phone}</p>

      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default UserDetail;
