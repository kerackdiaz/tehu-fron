import { useEffect, useState } from 'react';

import userGetDevice from '../../services/userGetDevice';
import StatusCardDevices from '../../components/atoms/StatusCardDevices/StatusCardDevices';

interface Device {
  id: number;
  name: string;
  status: string | null;
  type: string | null;
  online: boolean | null;
  createdAt: string;
  updatedAt: string;
  link: string;
}

const DevicesContainer = () => {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 1,
      name: 'Laboratorio #1',
      status: 'Activo',
      type: 'Sala de laboratorio',
      online: true,
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      link: '/devices/1'
    },
    {
      id: 2,
      name: 'Laboratorio #2',
      status: 'Inactivo',
      type: 'Sala de laboratorio',
      online: false,
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      link: '/devices/2'
    },
    {
      id: 3,
      name: 'Laboratorio #3',
      status: 'Preparando envío',
      type: 'Sala de laboratorio',
      online: true,
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      link: '/devices/3'
    }, 
    {
      id: 4,
      name: 'Laboratorio #4',
      status: 'Entregado',
      type: 'Sala de laboratorio',
      online: true,
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z',
      link: '/devices/4'
    }
  ]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const devicesData = await userGetDevice();
        if (devicesData && devicesData.devices) {
          setDevices(devicesData.devices);
        }
      } catch (error) {
        console.error('Error al obtener dispositivos', error);
      }
    };

    fetchDevices();
  }, []);
  

  return (
    <div>
      <div>
        <StatusCardDevices 
          devices={devices} 
        />
      </div>
    </div>
  );
};

export default DevicesContainer;
