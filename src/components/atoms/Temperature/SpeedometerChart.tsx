import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
// import HighchartsReact from 'highcharts-react-official';
import { useEffect, useState } from 'react';
import { getDevideData } from '../../../services/getDevideData';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


HighchartsMore(Highcharts);
interface Props {
  messageHistory: any;
  deviceName: any
}

const SpeedometerChart: React.ForwardRefRenderFunction<any, Props> = ({ messageHistory, deviceName }) => {
  const [lastDataTemp2, setLastDataTemp2] = useState('0');
  const [lastDataBat, setLastDataBat] = useState('0');
  const [lastDataDate, setLastDataDate] = useState('0');

  useEffect(() => {
    const fetchDeviceName = async () => {
      try {
        if (deviceName) {
          const infoDevice = await getDevideData(deviceName);
          setLastDataTemp2(infoDevice.deviceData[infoDevice.deviceData.length - 1].temp2)
          setLastDataBat(infoDevice.deviceData[infoDevice.deviceData.length - 1].bat)
          setLastDataDate(infoDevice.deviceData[infoDevice.deviceData.length - 1].updatedAt)
        } else {
          console.error('Device name is undefined');

        }
      } catch (error) {
        console.error('Error getDevideData', error);
      }
    };

    fetchDeviceName();
  }, [deviceName]);

  const temp = messageHistory?.temp2 ? messageHistory.temp2 : parseInt(lastDataTemp2)
  console.log();


  // const options = {
  //   chart: {
  //     type: 'gauge',
  //     alignTicks: false,
  //     plotBackgroundColor: null,
  //     plotBackgroundImage: null,
  //     plotBorderWidth: 0,
  //     plotShadow: false,
  //     backgroundColor: 'rgba(0,0,0,0)'
  //   },
  //   title: {
  //     text: ''
  //   },
  //   pane: {
  //     startAngle: -175,
  //     endAngle: 175
  //   },
  //   yAxis: [{
  //     min: -100,
  //     max: 100,
  //     tickPosition: 'outside',
  //     lineColor: '#99D5E8',
  //     lineWidth: 10,
  //     minorTickPosition: 'outside',
  //     tickColor: '#707070',
  //     minorTickColor: '#707070',
  //     tickLength: 14,
  //     minorTickLength: 10,
  //     backgroundColor: 'rgba(0,0,0,0)',
  //     labels: {
  //       distance: 20,
  //       rotation: 'auto',
  //       style: {
  //         fontSize: '12px'
  //       }
  //     },
  //     offset: -35,
  //     endOnTick: false
  //   }],
  //   series: [{
  //     name: 'Grados',
  //     data: [temp],
  //     dataLabels: {
  //       format: '<span style="color:#3683B5">{y} °C</span><br/>',
  //       style: {
  //         fontSize: '40px',
  //         strokeWidth: '0'
  //       },
  //     },
  //     tooltip: {
  //       valueSuffix: ' °C',
  //     }
  //   }]
  // };

  const formtDateCol = (fecha: string) => {
    const fechaObj = new Date(fecha);
    const dia = String(fechaObj.getDate()).padStart(2, '0');
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
    const anio = fechaObj.getFullYear();
    const horas = String(fechaObj.getHours()).padStart(2, '0');
    const minutos = String(fechaObj.getMinutes()).padStart(2, '0');
    const segundos = String(fechaObj.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${anio} ${horas}:${minutos}:${segundos}`;
  };


  return (
    <div>
      <div>
        <span className='font-semibold pr-2'>Batería:</span>
        <span>{messageHistory?.bat ? messageHistory?.bat : lastDataBat}</span>
      </div>
      <div>
        <span className='font-semibold pr-2'>Última Fecha:</span>
        <span>{messageHistory?.updatedAt ? messageHistory?.updatedAt : formtDateCol(lastDataDate)}</span>
      </div>


      <div className='flex justify-center items-center mt-20 relative h-[250px]'>
                    <div className='flex justify-center items-center rounded-full size-[120px]' style={{ boxShadow: '0 0 10px 2px rgba(153, 213, 232, 91)' }}>
                        <p className='text-3xl font-semibold text-blueDark'>{temp} °C</p>
                    </div>

                    <div className='flex justify-center items-center size-[190px] absolute'>
                        <CircularProgressbar value={temp} minValue={0} maxValue={40} strokeWidth={6}
                            styles={{
                                // Customize the root svg element
                                root: {},
                                // Customize the path, i.e. the "completed progress"
                                path: {
                                    // Path color
                                    stroke: `rgba(54, 131, 181, ${temp / 40})`,
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


        {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
      
    </div>
  )
};

export default SpeedometerChart;
