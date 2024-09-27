import { useState, useEffect } from "react";
import userGetDetails from '../../../services/userGetUserDetails';
import getDeviceLastOnline from "../../../services/getDeviceLastOnline";
import { useNavigate } from 'react-router-dom';
import icondevice from '../../../assets/img/icon/icon-device.svg'



interface UserDetails {
  user: {
    companyId: number;
  };
}

interface Device {
  id: number;
  name: string;
  origin: string;
  destination: string;
}

const DashboardDeviceTravel = () => {

  const [userCompanyId, setUserCompanyId] = useState<number>(0);
  const [devices, setDevices] = useState<Device[]>([]);
  const navigate = useNavigate();

  const handleEdit = (device: any) => {
    navigate(`/parametrizacion/${device.id}`, { state: { device: device } });
  }

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const dataUser: UserDetails = await userGetDetails();
        setUserCompanyId(dataUser.user.companyId);
      } catch (error) {
        console.error('Error al obtener detalles del usuario', error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchGetDaviceLast = async () => {
      try {
        const getDataviceLast = await getDeviceLastOnline(userCompanyId);
        setDevices(getDataviceLast.devices)
      } catch (error) {
        console.error('Error al obtener detalles de la empresa', error);
      }
    };

    fetchGetDaviceLast();
  }, [userCompanyId]);

  return (
    <>
      {devices.map((device) => (
        <div
          key={device.id}
          className="w-full max-w-[12rem] rounded-lg p-4 shadow-md hover:bg-gray-100"
        >
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-blue-500 font-medium text-lg">Activo</span>
              <span className="block h-3 w-3 rounded-full bg-green-500 shadow-[0px_0px_7px_rgba(0,128,0,0.5)]"></span>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <picture>
                <img
                  className="h-12 w-12"
                  src={icondevice}
                  alt={device.name}
                  title={device.name}
                />
              </picture>
              <span className="text-gray-700 font-medium text-lg mb-1">Nombre:</span>
              <p className="text-gray-700 text-lg m-0 leading-none">
                {device.name !== '' ? device.name : '?'}
              </p>
              <span className="text-gray-700 font-medium text-lg mb-1">Origen:</span>
              <p className="text-gray-700 text-lg m-0 leading-none">
                {device.origin !== '' ? device.origin : '?'}
              </p>
              <span className="text-gray-700 font-medium text-lg mb-1">Destino:</span>
              <p className="text-gray-700 text-lg m-0 leading-none">
                {device.destination !== '' ? device.destination : '?'}
              </p>
            </div>
            <div>
              <button
                className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
                onClick={() => handleEdit(device)}
              >
                VER DETALLE
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default DashboardDeviceTravel;