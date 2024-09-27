import React, { useState, MutableRefObject } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
  labels: string[];
  temperatures: number[];
}

interface TemperatureHistogramProps {
  data: {
    day: ChartData;
    week: ChartData;
    month: ChartData;
    year: ChartData;
  };
  chartRef: MutableRefObject<HTMLDivElement | null>;
}

const TemperatureHistogram: React.FC<TemperatureHistogramProps> = ({ data, chartRef }) => {
  const [period, setPeriod] = useState<'día' | 'semana' | 'mes' | 'año'>('día');



  const getChartData = (): ChartData => {
    switch (period) {
      case 'día':
        return data.day;
      case 'semana':
        return data.week;
      case 'mes':
        return data.month;
      case 'año':
        return data.year;
      default:
        return data.day;
    }
  };


  const chartData = {
    labels: getChartData().labels, 
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: getChartData().temperatures, 
        backgroundColor: 'rgba(75, 192, 192, 0.6)', 
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Histograma de Temperaturas - ${period.charAt(0).toUpperCase() + period.slice(1)}`,
      },
    },
  };

  return (
    <div className="w-full h-[350px]">
      <div className="mb-4 flex gap-4 justify-end">
        <button onClick={() => setPeriod('día')} className="h-8 w-12 bg-blueDark text-whiteLight rounded-md">Día</button>
        <button onClick={() => setPeriod('semana')} className="h-8 w-20 bg-blueDark text-whiteLight rounded-md">Semana</button>
        <button onClick={() => setPeriod('mes')} className="h-8 w-12 bg-blueDark text-whiteLight rounded-md">Mes</button>
        <button onClick={() => setPeriod('año')} className="h-8 w-12 bg-blueDark text-whiteLight rounded-md">Año</button>
      </div>

      <div className='w-full h-full' ref={chartRef}>
        <Bar data={chartData} options={options} />
      </div>

      

    </div>
  );
};

export default TemperatureHistogram;
