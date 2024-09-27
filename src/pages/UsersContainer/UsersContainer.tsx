import { useEffect, useState, useContext } from 'react';
import ItemListUser from "../../components/atoms/ItemListUser/ItemListUser"
import UsersNavigation from "../../components/atoms/UsersNavigation/UsersNavigation"
import { RegisterInfo } from '../../interfaces/interfaces'
import Modal from "../../components/molecules/Modal/Modal"
import AddUser from '../../components/organisms/AddUser/AddUser';
import AddIcon from '@mui/icons-material/Add';

import userGetSubordinate from '../../services/userGetSubordinate';
import { userContext } from '../../main';

type UserListKeys = 'all' | 'admin' | 'coordinator' | 'operator';
interface User {
  company: string;
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  rol: string;
  identificationNumber: string;
}



const UsersContainer = () => {

  const { userInfo } = useContext(userContext)
  const [isOpen, setIsOpen] = useState(false);
  const [typeUser, setTypeuser] = useState<UserListKeys>('all');
  const [listUser, setListUser] = useState({
    all: [],
    admin: [],
    coordinator: [],
    operator: []
  });

  // useEffect(() => {
  //   const getLisUsers = async () => {
  //     const idFromLocalStorage = localStorage.getItem('id');
  //     const tokenFromLocalStorage = localStorage.getItem('token');

  //     const id = idFromLocalStorage ? Number(idFromLocalStorage) : userInfo.id;
  //     const token = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : userInfo.token;

  //     const req = await userGetSubordinate(id, token);
  //     const admin = req.filter((user: User) => user.rol === 'administrador')
  //     const coordinator = req.filter((user: User) => user.rol === 'coordinador')
  //     const operator = req.filter((user: User) => user.rol === 'operador')
  //     setListUser({ ...listUser, all: req, admin, coordinator, operator })

  //   }
  //   getLisUsers()
  // }, [])

  useEffect(() => {
    // Usuarios ficticios 
    const mockUsers: User[] = [
      { company: 'Company A', id: 621354, name: 'Juan Pérez', position: "Gerente General", email: 'juan.perez@example.com', phone: '123456789', rol: 'Administrador', identificationNumber: '12345678' },
      { company: 'Company B', id: 123456, name: 'María López', position: "Supervisor", email: 'maria.lopez@example.com', phone: '987654321', rol: 'Coordinador', identificationNumber: '87654321' },
      { company: 'Company C', id: 123456, name: 'Carlos García', position: "Operador Logístico", email: 'carlos.garcia@example.com', phone: '456789123', rol: 'Operador', identificationNumber: '45678912' },
      { company: 'Company D', id: 123456, name: 'Ana Gómez', position: "Enfermera", email: 'ana.gomez@example.com', phone: '789123456', rol: 'Administrador', identificationNumber: '78912345' },
      { company: 'Company E', id: 123456, name: 'Pedro Gómez', position: "Enfermero", email: 'pedro.gierre@example.com', phone: '789123456', rol: 'Coordinador', identificationNumber: '78912345' },
      { company: 'Company F', id: 123456, name: 'Luisa Gómez', position: "Enfermera", email: 'luisa.gierre@example.com', phone: '789123456', rol: 'Operador', identificationNumber: '78912345' },
      { company: 'Company G', id: 123456, name: 'Carlos Gómez', position: "Enfermero", email: 'carlos.gierre@example.com', phone: '789123456', rol: 'Operador', identificationNumber: '78912345' },
    ];

    // Filtro por rol para las categorías
    const admin = mockUsers.filter(user => user.rol === 'Administrador');
    const coordinator = mockUsers.filter(user => user.rol === 'Coordinador');
    const operator = mockUsers.filter(user => user.rol === 'Operador');

    // Actualización del estado con los usuarios 
    setListUser({
      all: mockUsers,
      admin,
      coordinator,
      operator
    });
  }, []); 

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };




  return (
    <div className="flex h-screen lg:mt-[64px]">
      <div className="w-full">
        <div className="flex flex-col items-center justify-between bg-gray-200 py-4 md:flex-row md:px-16">
          <UsersNavigation setTypeuser={setTypeuser} />

          <div className='flex flex-wrap justify-center items-center gap-4'>
            <button className='flex items-center border border-blueDark text-blueDark px-2 py-1 rounded-full font-semibold hover:bg-blueDark hover:text-white transition-all duration-300' onClick={handleOpenModal}>
              <AddIcon sx={{ fontSize: 30 }} />
              Agregar usuario</button>
          </div>
        </div>
        
        <div className="p-4 overflow-auto md:p-6">
          <table className="w-full text-left">
            <thead className='text-blueLight font-semibold bg-blueLight4 text-xs text-center h-10'>
              <tr>
                <th className='min-w-[240px] border-r border-whiteLight rounded-l-lg'><span className="px-4 py-2 ">Usuario</span></th>
                <th className='min-w-[240px] border-r border-whiteLight'><span className="px-4 py-2">Correo</span></th>
                <th className='min-w-[80px] border-r border-whiteLight'><span className="px-4 py-2">Documento</span></th>
                <th className='min-w-[160px] border-r border-whiteLight'><span className="px-4 py-2">Tipo de usuario</span></th>
                <th className='min-w-[160px] border-r border-whiteLight'><span className="px-4 py-2">No. Contacto</span></th>
                <th className='min-w-[160px] border-r border-whiteLight'><span className="px-4 py-2">No. ID</span></th>
                <th className='min-w-[160px] rounded-r-lg'><span className="px-4 py-2">Perfil</span></th>
              </tr>
            </thead>
            <tbody>
              {listUser && listUser[typeUser].map((user: RegisterInfo) => (
                <ItemListUser key={user.id} {...user} />
              ))}
              
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <AddUser />
      </Modal>
    </div>
  )
}

export default UsersContainer;



