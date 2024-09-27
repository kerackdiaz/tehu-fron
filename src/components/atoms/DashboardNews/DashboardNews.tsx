import { useState, useEffect } from 'react';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { green, red } from '@mui/material/colors';




interface CompanyDetails {
    positive_alerts: string;
    negative_alerts: string;
}

const DashboardNews = () => {
    const [alertsPositive, setAlertsPositive] = useState<string>('0');
    const [alertsNegative, setAlertsNegative] = useState<string>('0');

    useEffect(() => {
        const storedCompany = localStorage.getItem('companies');
        if (storedCompany) {
            const getInfoCompany: CompanyDetails = JSON.parse(storedCompany);
            setAlertsPositive(getInfoCompany.positive_alerts);
            setAlertsNegative(getInfoCompany.negative_alerts);
        }
    }, []);

    return (
        <div className='flex flex-col gap-3 p-5'>
            <div className='flex items-center gap-5'>
                <CheckCircleOutlineRoundedIcon sx={{ fontSize: 30, color: green[400] }} />
                <div className=''>
                    <h2 className='text-2xl font-bold'>
                        {alertsPositive} <span className='font-semibold text-gray-400'>(0%)</span>
                    </h2>
                    <p className='font-semibold'>Alertas positivas</p>
                </div>
            </div>
            <div className='flex items-center gap-5'>
                <HighlightOffRoundedIcon sx={{ fontSize: 30, color: red[400] }} />
                <div className=''>
                    <h2 className='text-2xl font-bold'>
                        {alertsNegative} <span className='font-semibold text-gray-400'>(0%)</span>
                    </h2>
                    <p className='font-semibold'>Alertas negativas</p>
                </div>
            </div>
        </div>
    )
}

export default DashboardNews