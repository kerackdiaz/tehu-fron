import { useState, useEffect } from 'react';
import DoughnutChart from '../DoughnutChart/DoughnutChart';


interface CompanyDetails {
  deviceCount: number;
}

const DashboardAlerts = () => {
  const [deviceCount, setDeviceCount] = useState<number>(5);

  useEffect(() => {
    const storedCompany = localStorage.getItem('companies');
    if (storedCompany) {
      const getInfoCompany: CompanyDetails = JSON.parse(storedCompany);
      //   console.log(getInfoCompany.deviceCount);
      setDeviceCount(getInfoCompany.deviceCount);
    }
  }, []);


  const data = {
    
    datasets: [
      {

        data: [75, 25],
        backgroundColor: [
          '#27D183',
          '#EF4444',

        ],
        cutout: '85%', // Ajusta el corte interno para hacer el ancho del anillo más fino
        circumference: 360, // Circunferencia completa del gráfico
        rotation: -90, // Comienza desde la parte superior
        hoverBorderWidth: 0,
        spacing: 3,
      },
    ],
  };




  return (
    <div className='flex gap-14 p-5 pr-2'>

      <div className='flex mt-4'>
        <div className='relative'>
          <DoughnutChart data={data} />
          <picture>
            <img src={"./icon-device.avif"} alt="Alertas" className='w-12 ml-5' />
          </picture>
        </div>

      </div>
      <div className='flex flex-col'>
        <span className='font-bold text-2xl'>{deviceCount}</span>
        <h3 className='font-semibold'>Notificaciones y alertas</h3>
        <hr className='border-1 border-gray-300 my-2' />
        <div className='flex items-center gap-1 text-xs'>
          <div className='size-3 rounded-full bg-green-500'></div>
          <p>Noticias positivas</p>
        </div>
        <div className='flex items-center gap-1 text-xs mt-1'>
          <div className='size-3 rounded-full bg-red-500'></div>
          <p>Noticias negativas</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardAlerts;
