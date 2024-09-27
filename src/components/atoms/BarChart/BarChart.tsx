import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js';
ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement);

interface BarChartProps {
    data: {
        labels: string[];
        datasets: {
            data: number[];
            backgroundColor: string | string[];
            borderColor?: string | string[];
            borderWidth?: number;
            cutout?: string | number;
            circumference?: number;
            rotation?: number;
            hoverBorderWidth?: number;
            spacing?: number;
        }[];
    };
};

const BarChart: React.FC<BarChartProps> = ({ data }) => {
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
        <div className='w-full'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;

