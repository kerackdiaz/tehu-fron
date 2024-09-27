import { useEffect, useState, useContext } from 'react';
import ItemListUser from "../../components/atoms/ItemListUser/ItemListUser"
import UsersNavigation from "../../components/atoms/UsersNavigation/UsersNavigation"
import { RegisterInfo } from '../../interfaces/interfaces'
import Modal from "../../components/molecules/Modal/Modal"
import AddUser from '../../components/organisms/AddUser/AddUser';
import userGetSubordinate from '../../services/userGetSubordinate';
import { userContext } from '../../main';

type UserListKeys = 'all' | 'admin' | 'coordinator' | 'operator';
interface User {
  company: string;
  id: number;
  name: string;
  email: string;
  phone: string;
  rol: string;
  identificationNumber: string;
}


const Users = () => {
  const { userInfo } = useContext(userContext)
  const [isOpen, setIsOpen] = useState(false);
  const [typeUser, setTypeuser] = useState<UserListKeys>('all');
  const [listUser, setListUser] = useState({
    all: [],
    admin: [],
    coordinator: [],
    operator: []
  });

  useEffect(() => {
    const getLisUsers = async () => {
      const idFromLocalStorage = localStorage.getItem('id');
      const tokenFromLocalStorage = localStorage.getItem('token');

      const id = idFromLocalStorage ? Number(idFromLocalStorage) : userInfo.id;
      const token = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : userInfo.token;

      const req = await userGetSubordinate(id, token);
      const admin = req.filter((user :User) => user.rol === 'administrador')
      const coordinator = req.filter((user :User) => user.rol === 'coordinador')
      const operator = req.filter((user :User) => user.rol === 'operador')
      setListUser({...listUser, all : req, admin , coordinator, operator})

    }
    getLisUsers()
  }, [])

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="users">
      <div className="users--right">
        <div className="users--right__top">
          <UsersNavigation setTypeuser={setTypeuser} />
          <button className="btn__trans" onClick={handleOpenModal}><span>+</span> Agregar usuario</button>
        </div>
        <div className="users--right__bottom">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" name="" id="" /></th>
                <th><span>Usuario</span></th>
                <th><span>Correo</span></th>
                <th><span>Documento</span></th>
                <th><span>Tipo de usuario</span></th>
                <th><span>No. Contacto</span></th>
                <th><span>No. ID</span></th>
                <th><span>Perfil</span></th>
              </tr>
            </thead>
            <tbody>
              {listUser && listUser[typeUser].map((user: RegisterInfo) =>
                <ItemListUser key={user.id} {...user} />
              )}
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

export default Users;
