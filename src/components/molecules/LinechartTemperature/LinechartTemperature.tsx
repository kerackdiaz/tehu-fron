
import { useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { getDevideData } from '../../../services/getDevideData';



ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, annotationPlugin);

interface LinechartTemperatureProps {
  deviceName?: string;
}

interface Data {
  id: number;
  temp2: string;
  updatedAt: string;
}

const LinechartTemperature: React.FC<LinechartTemperatureProps> = ({ deviceName }) => {

  const [dataDevice, setDataDevice] = useState<Data[]>([]);

  useEffect(() => {
    const fetchDeviceName = async () => {
      try {
        if (deviceName) {
          const infoDevice = await getDevideData(deviceName);
          setDataDevice(infoDevice.deviceData)
        } else {
          console.error('Device name is undefined');
        }
      } catch (error) {
        console.error('Error getDevideData', error);
      }
    };

    fetchDeviceName();
  }, [deviceName]);

  const formatearHora = (fecha: string) => {
    const fechaObj = new Date(fecha);
    const horas = String(fechaObj.getHours()).padStart(2, '0');
    const minutos = String(fechaObj.getMinutes()).padStart(2, '0');
    return `${horas}:${minutos}`;
  };
  const labels = dataDevice.map(item => formatearHora(item.updatedAt)).slice(-40);
  const temps = dataDevice.map(item => parseInt(item.temp2, 10)).slice(-40);
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: temps,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
      },
    ],
  };

 /*  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperatura en las Últimas 24 Horas',
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: -20,
            yMax: -20,
            borderColor: 'rgba(255, 99, 132, 0.8)',
            borderWidth: 2,
            label: {
              content: '35°C',
              enabled: true,
              position: 'start',
            },
          },
          line2: {
            type: 'line',
            yMin: 20,
            yMax: 20,
            borderColor: 'rgba(153, 102, 255, 0.8)',
            borderWidth: 2,
            label: {
              content: '35°C',
              enabled: true,
              position: 'start',
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: -50,   // Valor mínimo del eje y
        max: 50,   // Valor máximo del eje y
        ticks: {
          stepSize: 10, // Tamaño del paso entre cada marca del eje y
        },
        grid: {
          color: (context: any) => {
            if (context.tick.value > 30) {
              return 'rgba(255, 99, 132, 0.2)'; // Color para valores superiores a 30
            } else if (context.tick.value > 20) {
              return 'rgba(255, 159, 64, 0.2)'; // Color para valores entre 20 y 30
            } else {
              return 'rgba(75, 192, 192, 0.2)'; // Color para valores menores a 20
            }
          },
        },
      },
    },
  }; */
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const, // Asegurándonos de que sea del tipo correcto
      },
      title: {
        display: true,
        text: 'Temperatura en las Últimas 24 Horas',
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: -5,
            yMax: -5,
            borderColor: 'rgba(0, 255, 0, 0.8)',
            borderWidth: 2,
            label: {
              content: '35°C',
              enabled: true,
              position: 'start',
            },
          },
          line2: {
            type: 'line',
            yMin: 18,
            yMax: 18,
            borderColor: 'rgba(255, 0, 0, 0.8)',
            borderWidth: 2,
            label: {
              content: '35°C',
              enabled: true,
              position: 'start',
            },
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: -50, // Valor mínimo del eje y
        max: 50,  // Valor máximo del eje y
        ticks: {
          stepSize: 10, // Tamaño del paso entre cada marca del eje y
        },
        grid: {
          color: (context: any) => {
            if (context.tick.value > 30) {
              return 'rgba(255, 99, 132, 0.2)'; // Color para valores superiores a 30
            } else if (context.tick.value > 20) {
              return 'rgba(255, 159, 64, 0.2)'; // Color para valores entre 20 y 30
            } else {
              return 'rgba(75, 192, 192, 0.2)'; // Color para valores menores a 20
            }
          },
        },
      },
    },
  };
  console.log(options);
  
  return <Line data={data} />;
};
  
export default LinechartTemperature;
