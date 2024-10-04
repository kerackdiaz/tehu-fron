import { useState } from 'react';
import {RegisterInfo} from '../../../interfaces/interfaces'
import UserDetail from '../User/UserDetail'; // Ajusta la ruta según tu estructura de carpetas


const ItemListUser = ({ id, name, position, email, rol, phone, identificationNumber } : RegisterInfo) => {
  //const [isChecked, setIsChecked] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleVerUsuarioClick = () => {
    // Muestra o oculta los detalles del usuario
    setShowDetail(!showDetail);
  };

  return (
    <tr className='text-xs h-20 border-b '>
      <td className='min-w-[240px]'>
        <div className='flex gap-3 pl-4'>
          <div className='min-size-10'>
            <img src={"./image-user.avif"} alt="Imagen de usuario" />
          </div>
          <div className='flex flex-col font-semibold '>
            <span>{name}</span>
            <span className='text-blueLight'>{position}</span>
          </div>
        </div>
      </td>

      <td className='min-w-[240px] text-center'>{email}</td>
      <td className='min-w-[80px] text-center'>{identificationNumber}</td>
      <td className='min-w-[160px] text-center'>{rol === 'admin' ? 'Administrador' : rol === 'coordinator' ? 'Coordinador' : 'Operador' }</td>
      <td className='min-w-[160px] text-center'>{phone}</td>
      <td className='min-w-[160px] text-center text-blueLight font-bold'>No. {id}</td>
      <td className='min-w-[160px] text-center text-blueLight font-bold'>
        <button className='px-3 h-8 font-light rounded-full bg-blueDark text-whiteLight border border-blueDark hover:bg-whiteLight hover:text-blueDark transition-all duration-300' onClick={handleVerUsuarioClick}>
        Editar usuario
        </button>
        {showDetail && <UserDetail phone={phone} />}
      </td>
      
    </tr>
  );
};

export default ItemListUser;
