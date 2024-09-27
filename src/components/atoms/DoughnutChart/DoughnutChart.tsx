import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface DoughnutChartProps {
    data: {

        datasets: {
            data: number[];
            backgroundColor: string[];
            borderColor?: string[];
            borderWidth?: number;
            cutout?: string | number;
            circumference?: number;
            rotation?: number;
            hoverBorderWidth?: number;
            spacing?: number;
        }[];
    };
};


const DoughnutChart: React.FC<DoughnutChartProps> = ({ data }) => {
    return (
        <div className='absolute top-[-24px] left-[-16px]' style={{ width: '120px', height: '120px' }}>
            <Doughnut data={data} />
        </div>
    );
};

export default DoughnutChart;
