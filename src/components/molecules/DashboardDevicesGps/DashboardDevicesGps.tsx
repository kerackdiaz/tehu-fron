import { Link } from 'react-router-dom';
// import DashboardDeviceTravel from "../DashboardDeviceTravel/DashboardDeviceTravel"
import BarChart from '../../atoms/BarChart/BarChart';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
        {
            data: [3, 2, 2, 1, 5, 4],
            backgroundColor: ["gray"],
            borderWidth: 0,
            hoverBorderWidth: 0,
        },
    ],
    
};



const DashboardDevicesGps = () => {
    return (
        <div>
            <div className='flex justify-between items-center gap-2 flex-wrap mb-2'>
                <h3 className='font-semibold'>Dispositivos en viaje</h3>
                <div className='flex items-center bg-gray-400 rounded-md h-6 text-sm text-gray-100 pr-8 pl-3'>
                    <p>Mayo 1 a 15/2023</p>
                </div>
            </div>

            <div className="min-w-full">
                <BarChart data={data} />
            </div>

            <div className='flex justify-center gap-2 text-xs my-6'>
                <div className='flex items-center gap-2'>
                    <div className='size-3 rounded-full bg-red-500'></div>
                    <p>Preparando envío</p>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='size-3 rounded-full bg-orange-500'></div>
                    <p>En transporte</p>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='size-3 rounded-full bg-green-500'></div>
                    <p>Entregado</p>
                </div>

            </div>
            

            
            {/* <div className="flex gap-2.5 mb-4">
                <DashboardDeviceTravel />
            </div> */}
            <div>
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254508.39472677957!2d-74.27261645515836!3d4.6486206272168635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f9bfd2da6cb29%3A0x239d635520a33914!2zQm9nb3TDoQ!5e0!3m2!1ses-419!2sco!4v1691965286996!5m2!1ses-419!2sco"
                        className="w-full h-96 rounded-lg"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            <div className='block'>
                <Link to="/dispositivos">
                    <button className="block mx-auto mt-4 mb-2 text-orange-500 font-semibold border border-orange-500 rounded-full px-4 hover:bg-orange-500 hover:text-white transition-all duration-300">
                        Ver más
                        <ArrowForwardIosIcon className='ml-2' sx={{ fontSize: 15 }} />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default DashboardDevicesGps