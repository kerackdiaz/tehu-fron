import React from 'react';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';


type UserListKeys = 'all' | 'admin' | 'coordinator' | 'operator';

interface UsersNavigationProps {
  setTypeuser: React.Dispatch<React.SetStateAction<UserListKeys>>;
}

const UsersNavigation: React.FC<UsersNavigationProps> = ({ setTypeuser }) => {
  const filterUsers = (type: UserListKeys) => {
    setTypeuser(type);
  };

  return (
    <nav className="flex flex-wrap justify-center items-center gap-6">
      {/* <div className="flex justify-center items-center cursor-pointer bg-gray-300 size-10 rounded-full hover:text-whiteLight transition-all duration-300">
        <ArrowBackIcon sx={{ fontSize: 20 }} />
      </div> */}
      <span className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blueDark transition-all duration-300"
        onClick={() => filterUsers('all')}>Todos</span>
      
      <span className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blueDark transition-all duration-300"
        onClick={() => filterUsers('admin')}>Administrador</span>

      <span className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blueDark transition-all duration-300"
        onClick={() => filterUsers('coordinator')}>Coordinador</span>
      
      <span className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blueDark transition-all duration-300"
        onClick={() => filterUsers('operator')}>Operario</span>
    </nav>
  );
};

export default UsersNavigation;