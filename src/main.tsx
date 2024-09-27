import React, { useState, useEffect, StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio.tsx';
import Login from './pages/Login/Login.tsx';
import Registro from './pages/Registro/Registro.tsx';
import RegistroSuccess from './pages/RegistroSuccess/RegistroSuccess.tsx';
import ChangePass from './pages/changePass/ChangePass.tsx';
import Dashboard from './pages/Dashboard/Dashboard.tsx';
import Devices from './pages/Devices/Devices.tsx';
import { Temperature } from './pages/Temperature/Temperature.tsx';
import Users from './pages/Users/Users.tsx';
import Parameterization from './pages/Parameterization/Parameterization.tsx';
import Help from './pages/Help/Help.tsx';
import { Reports } from './pages/Reports/Reports.tsx';
import Page404 from './pages/Page404/Page404.tsx';
import Profile from './pages/Profile/Profile.tsx';
import './tailwind.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Inicio />,
  },
  {
    path: '/registro',
    element: <Registro />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/registro-exitoso',
    element: <RegistroSuccess />,
  },
  {
    path: '/confirmar-contrasena',
    element: <ChangePass />,
  },
  {
    path: '/perfil',
    element: <Profile />,
  },
  {
    path: '/escritorio',
    element: <Dashboard />,
  },
  {
    path: '/dispositivos',
    element: <Devices />,
  },
  {
    path: '/temperaturas',
    element: <Temperature />,
  },
  {
    path: '/usuarios',
    element: <Users />,
  },
  {
    path: '/informes',
    element: <Reports />,
  },
  {
    path: '/parametrizacion/:id',
    element: <Parameterization />,
  },
  {
    path: '/ayuda',
    element: <Help />,
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

// Definir la interfaz del contexto
interface UserContextValue {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

interface UserInfo {
  token: string;
  rute: string;
  id: number;
}

// Crear el contexto con el tipo adecuado
export const userContext = React.createContext<UserContextValue>({ 
  userInfo: { token: '', rute: '', id: 0 }, 
  setUserInfo: () => {
    console.log('');
  } 
});

const App = () => {
  const storedUserInfo = localStorage.getItem('userInfo');
  const initialUserInfo: UserInfo = storedUserInfo
    ? JSON.parse(storedUserInfo)
    : { rute: '', token: '', id: 0 };

  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      <RouterProvider router={router} />
    </userContext.Provider>
  );
};

const rootElement = document.getElementById('root');

if (rootElement) {
  // Almacenar la raíz en una variable global para evitar múltiples creaciones
  let root = (rootElement as unknown as { _reactRootContainer?: ReactDOM.Root })._reactRootContainer;
  
  if (!root) {
    // Crear la raíz si no existe y almacenarla en el elemento
    root = ReactDOM.createRoot(rootElement);
    (rootElement as unknown as { _reactRootContainer: ReactDOM.Root })._reactRootContainer = root;
  }

  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('No se encontró el elemento con el id "root" en el documento.');
}