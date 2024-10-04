import React, { useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useNavigate } from 'react-router-dom';
import Modal from '../../molecules/Modal/Modal';
import FormCreateDevices from '../../molecules/FormCreateDevices/FormCreateDevices';
interface Devices {
  id: number;
  name: string;
  status: string | null;
  type: string | null;
  online: boolean | null;
  createdAt: string;
  updatedAt: string;
  link: string;
}

interface StatusCardDevicesProps {
  devices: Devices[];
}

const StatusCardDevices: React.FC<StatusCardDevicesProps> = ({ devices }) => {
  const [filteredType, setFilteredType] = useState<any | null>(null);
  const [totalType1, setTotalType1] = useState<number>(0);
  const [totalType2, setTotalType2] = useState<number>(0);
  const [totalType3, setTotalType3] = useState<number>(0);
  const [totalType4, setTotalType4] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleFilterClick = (type: any | null) => {
    if (type === false || type === true) {
      setFilteredType(type);
    } else {
      setFilteredType(type);
    }
  };

  const handleEdit = (device: any) => {
    navigate(`/parametrizacion/${device.id}`, { state: { device: device } });
  }

  const handleModalCreate = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const filteredDevices = filteredType !== null
    ? filteredType === false
      ? devices.filter(device => device.online === false)
      : filteredType === true
        ? devices.filter(device => device.online === true)
        : devices.filter(device => device.type !== null && Number(device.type) === filteredType)
    : devices;

  useEffect(() => {
    const type1Total = devices.filter(device => device.status == 'Activo').length;
    const type2Total = devices.filter(device => device.status == 'Entregado').length;
    const type3Total = devices.filter(device => device.status == 'Preparando envío').length;
    const type4Total = devices.filter(device => device.status == 'Inactivo').length;

    setTotalType1(type1Total);
    setTotalType2(type2Total);
    setTotalType3(type3Total);
    setTotalType4(type4Total);
  }, [devices]);

  return (
    <div className='bg-gray-200 min-h-screen flex flex-col'>
      <div className='lg:mt-[64px]'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-x-12 gap-y-4 bg-gray-100 py-4 shadow-md px-6'>
          <nav className="flex flex-col min-[530px]:flex-row md:flex-wrap md:justify-center md:items-center gap-6">
            {/* <div className="flex justify-center items-center cursor-pointer bg-gray-300 size-10 rounded-full hover:text-gray-100 transition-all duration-300">
              <ArrowBackIcon sx={{ fontSize: 20 }} />
            </div> */}
            <span className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blueDark transition-all duration-300" onClick={() => handleFilterClick(null)}>
              Todos los Dispositivos
            </span>
            <span className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blueDark transition-all duration-300" onClick={() => handleFilterClick(false)}>
              Dispositivos Fijos
            </span>
            <span className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blueDark transition-all duration-300" onClick={() => handleFilterClick(true)}>
              Dispositivos Móviles
            </span>
          </nav>

          <div className='flex flex-wrap justify-center items-center gap-4'>
            <button className='flex items-center border border-blueDark text-blueDark px-3 py-1 rounded-full font-semibold hover:bg-blueDark hover:text-white transition-all duration-300' onClick={() => handleModalCreate()}>
              <AddIcon sx={{ fontSize: 30 }} />
              Agregar dispositivos</button>
            {/* <p>Desactivar todos los dispositivos</p>
            <label className="relative inline-block h-8 w-16 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-300">
              <input type="checkbox" id="AcceptConditions" className="peer sr-only" />
              <span className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-blueLight peer-checked:bg-blueDark transition-all peer-checked:start-8"></span>
            </label> */}
          </div>
        </div>
      </div>


      <div className='flex flex-col md:flex-row gap-4 text-xs items-center md:justify-end md:mr-12 mt-4'>
        <div className='bg-blueDark rounded-full px-4 h-8 flex gap-1 items-center text-gray-100'>
          <button className='' onClick={() => handleFilterClick(null)}>Dispositivos:  <span>{devices.length}</span></button>
        </div>


        <div className='flex flex-wrap justify-center items-center gap-4'>
          <div className='flex gap-1 items-center'>
            <div className='bg-green-500 size-3 rounded-full'></div>
            <p>Viaje activo:</p>
            <span onClick={() => handleFilterClick(1)}><span>{totalType1}</span></span>
          </div>

          <div className='flex gap-1 items-center'>
            <div className='bg-orange-500 size-3 rounded-full'></div>
            <p>Entregado:</p>
            <span onClick={() => handleFilterClick(2)}><span>{totalType2}</span></span>
          </div>

          <div className='flex gap-1 items-center'>
            <div className='bg-pink-600 size-3 rounded-full'></div>
            <p>Preparando envío:</p>
            <span onClick={() => handleFilterClick(3)}><span>{totalType3}</span></span>
          </div>

          <div className='flex gap-1 items-center'>
            <div className='bg-gray-400 size-3 rounded-full'></div>
            <p>Inactivos</p>
            <span onClick={() => handleFilterClick(1)}>Inactivos:  <span>{totalType4}</span></span>
          </div>

        </div>


      </div>

      <div className='flex flex-wrap justify-center items-center gap-8 mt-6 px-2'>
        {filteredDevices.slice().reverse().map((device, index) => (
          <div className="flex bg-gray-100 rounded-xl w-[350px] " key={index}>
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between p-4">
                <h4 className="text-xs font-semibold text-blueLight">{`Tipo de Activo: Dispositivo ${device.online !== null && device.online ? 'Móvil' : 'Fijo'}`}</h4>
                <div className={`size-4 rounded-full shadow-md ${device.status === "Activo" ? 'bg-green-500 shadow-[0px_0px_10px_3px_rgba(42,175,80,0.4)]' : device.status === "Entregado" ? 'bg-orange-500 shadow-[0px_0px_10px_3px_rgba(235,157,80,0.4)]' : device.status === "Preparando envío" ? 'bg-pink-600 shadow-[0px_0px_10px_3px_rgba(255,63,80,0.4)]' : 'bg-gray-400 shadow-[0px_0px_10px_3px_rgba(205,205,205,0.4)]' } `}></div>
                {/* <span className={`bg-red-500 size-3 rounded-full ${device.type !== null ? device.type : 'empty'}`}></span> */}
              </div>

              <div className="flex gap-4 items-center px-4">
                <figure>
                  <img className='w-14 mb-4' src={"./icon-device.avif"} alt="Device" />
                </figure>

                {/* <div className="flex flex-col text-xs text-gray-500">
                  <h2 className='text-xl'>Código unico/QR: TEHU1234</h2>
                  <h3>Nombre Dispositivo:<span> NA </span></h3>
                  <h3>Código interno:<span> NA </span></h3>
                  <h3>Ubicación:<span> Bogotá </span></h3>
                  <h3>Locación: <span>{`${device.name}`}</span></h3>
                  <h3>Modo: <span>Refrigerador</span></h3>
                </div> */}

                <div className="flex flex-col text-xs text-gray-700">
                  <h3 className='font-semibold'>Nombre:</h3>
                  <p> {device.name} </p>
                </div>

                {/* <picture>
                  <img className='w-28 cursor-pointer' src="./icon-scanner-devices.avif" alt="Icono scanear QR" />
                </picture> */}
              </div>


              {/* <div className='bg-yellow-300 p-2 text-xs mt-4'>
                <p className='text-center'>Dispositivo modificado por: <span>Nombre Admin/Coordinador/Operario</span></p>
              </div> */}

              <div className="bg-blueDark justify-center items-center flex p-4 gap-2 rounded-b-xl">
                <a href="#">{device.online}</a>
                {/* <button className="btn-edit" onClick={() => handleEdit(device)}>VER DETALLE</button> */}
                <button className="bg-gray-100 text-blueDark text-xs w-48 rounded-full p-1 font-semibold hover:bg-transparent hover:border hover:border-whiteLight hover:text-whiteLight transition-all duration-300" onClick={() => handleEdit(device)}>VER DETALLE</button>
                {/* <button className="flex items-center justify-center gap-1 border-gray-100 border text-whiteLight text-xs w-32 rounded-full p-1 font-semibold hover:bg-whiteLight hover:text-blueDark transition-all duration-300">
                  ASIGNAR VIAJE
                  <LocationOnIcon sx={{ fontSize: 15 }} />
                </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={handleModalCreate}>
        <FormCreateDevices />
      </Modal>
    </div>
  );
};

export default StatusCardDevices;
