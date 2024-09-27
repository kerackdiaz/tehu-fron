import { Link } from 'react-router-dom';
// import DashboardDeviceTravel from "../DashboardDeviceTravel/DashboardDeviceTravel"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LineChart from '../../atoms/LineChart/LineChart';
import { CircularProgressbar } from 'react-circular-progressbar';
// import { buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';



const data = {
    labels: ['06:30:00', '07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00'],
    datasets: [
        {
            data: [34, 27, 26, 24, 23, 17, 22, 28, 26],
            backgroundColor: ["orange"],
            borderColor: ["orange"],
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.1
        },
    ],

};




const temperature = 25;


const DashboardTimeAlerts = () => {
    return (
        <div>

            <div className='flex justify-between items-center gap-2 flex-wrap'>
                <h3 className='font-semibold text-lg'>Alertas en tiempo real</h3>
                <div className='flex gap-2 items-center'>
                    <p >Alarma</p>
                    <div className='size-5 rounded-full bg-green-500 shadow-md shadow-green'></div>
                </div>
            </div>

            <div className='bg-gray-100 pt-4 pb-10 rounded-2xl shadow-md mt-4 relative max-w-full'>
                <p className='md:absolute md:top-10 px-10'>Temperatura</p>
                <div className='flex justify-center items-center mt-6 relative h-[250px]'>
                    <div className='flex justify-center items-center rounded-full size-[120px]' style={{ boxShadow: '0 0 10px 2px rgba(153, 213, 232, 91)' }}>
                        <p className='text-3xl font-semibold text-blueDark'>{temperature} °C</p>
                    </div>

                    <div className='flex justify-center items-center size-[190px] absolute'>
                        <CircularProgressbar value={temperature} minValue={0} maxValue={40} strokeWidth={6}
                            styles={{
                                // Customize the root svg element
                                root: {},
                                // Customize the path, i.e. the "completed progress"
                                path: {
                                    // Path color
                                    stroke: `rgba(54, 131, 181, ${temperature / 40})`,
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'round',
                                    // Customize transition animation
                                    transition: 'stroke-dashoffset 0.5s ease 0s',
                                    // Rotate the path
                                    transform: 'rotate(0.50turn)',
                                    transformOrigin: 'center center',
                                },
                                // Customize the circle behind the path, i.e. the "total progress"
                                trail: {
                                    // Trail color
                                    stroke: 'transparent',
                                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                    strokeLinecap: 'round',
                                    // Rotate the trail
                                    transform: 'rotate(0.50turn)',
                                    transformOrigin: 'center center',
                                },
                                // Customize the text
                                text: {
                                    // Text color
                                    fill: '#f88',
                                    // Text size
                                    fontSize: '16px',
                                },
                                // Customize background - only used when the `background` prop is true
                                background: {
                                    fill: '#3e98c7',
                                },
                            }}

                        />
                    </div>

                    <div className='absolute flex justify-center items-center size-[180px] mr-[6px] mb-[6px]'>
                        <div className="relative w-full h-full">
                            {[...Array(40)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute left-1/2 top-1/2 transform origin-bottom"
                                    style={{ transform: `rotate(${i * 9}deg) translateX(-50%) translateY(-110px)` }}
                                >
                                    <div className="w-1 h-1 bg-blueDark rounded-full"></div>
                                </div>
                            ))}

                        </div>
                        <p className='absolute bottom-[-52px] text-[9px]'>0 °C</p>
                        <p className='absolute left-[-50px] text-[9px]'>10 °C</p>
                        <p className='absolute top-[-44px] text-[9px]'>20 °C</p>
                        <p className='absolute right-[-55px] text-[9px]'>30 °C</p>

                    </div>
                </div>

                <div className='flex flex-col md:flex-row md:justify-between px-10 w-full gap-2 md:gap-40 mt-10 md:absolute md:bottom-[40px]'>
                    <div className='flex gap-2 items-center text-xs'>
                        <div className='size-3 bg-blueDark rounded'></div>
                        <p>Temperatura Min 17 °C</p>
                    </div>

                    <div className='flex gap-2 items-center text-xs'>
                        <div className='size-3 bg-red-500 rounded'></div>
                        <p>Temperatura Max 28 °C</p>
                    </div>
                </div>

            </div>




            <div className="min-w-full mt-2">
                <LineChart data={data} />
            </div>

            <div className='block'>
                <Link to="/">
                    <button className="block mx-auto mt-4 mb-2 text-orange-500 font-semibold border border-orange-500 rounded-full px-4 hover:bg-orange-500 hover:text-white transition-all duration-300">
                        Ver más
                        <ArrowForwardIosIcon className='ml-2' sx={{ fontSize: 15 }} />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default DashboardTimeAlerts