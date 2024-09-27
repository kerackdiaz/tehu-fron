import { Link } from 'react-router-dom';
import DashboardDevice from '../../atoms/DashboardDevice/DashboardDevice'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const DashboardDevices = () => {
    return (
        <div>
            <div className='flex justify-between items-center gap-2 flex-wrap mb-2'>
                <h3 className='font-semibold'>Dispositivos fijos instalados</h3>
                <div className='flex items-center bg-gray-400 rounded-md h-6 text-gray-100 pr-8 pl-3 text-sm'>
                    <p>Mayo 1 a 15/2023</p>
                </div>
            </div>

            <div className='flex flex-wrap gap-4 justify-between'>
                <DashboardDevice />
            </div>
            
            <div className='block'>
                <Link  to="/dispositivos">
                <button className="block mx-auto mt-4 mb-2 text-orange-500 font-semibold border border-orange-500 rounded-full px-4 hover:bg-orange-500 hover:text-white transition-all duration-300">
                    Ver más
                    <ArrowForwardIosIcon className='ml-2' sx={{ fontSize: 15 }} />
                    </button>
                    
                </Link>
            </div>
        </div>
    )
}

export default DashboardDevices