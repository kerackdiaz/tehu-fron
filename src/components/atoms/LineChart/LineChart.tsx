import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, PointElement, LineElement } from 'chart.js';
ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, LineElement, PointElement);




interface LineChartProps {
  data: {
      labels: string[];
      datasets: {
          data: number[];
          backgroundColor: string | string[];
          borderColor?: string | string[];
          borderWidth?: number;
          showLine?: boolean;
          pointRadius?: number;
          tension?: number;
      }[];
  };
};

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const options = {
      plugins: {
          title: {
              display: false, // Desactiva el título
          },
          legend: {
              display: false, // Desactiva la leyenda
          },
      },
      responsive: true,
      maintainAspectRatio: false,
      
  };

  return (
      <div className='w-full h-[270px]'>
          <Line data={data} options={options} />
      </div>
  );
};

export default LineChart;
