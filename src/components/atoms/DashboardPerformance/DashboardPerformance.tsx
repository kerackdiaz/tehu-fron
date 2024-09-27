
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const DashboardPerformance = () => {
  return (
    
      <div className='flex items-center gap-5 p-5 text-gray-100'>
        <CheckCircleOutlineRoundedIcon sx={{ fontSize: 60, color: 'white' }} />
        <div>
          <h3 className='text-2xl font-bold'>100%</h3>
          <p className='font-semibold'>Rendimiento óptimo de dispositivos activos</p>
        </div>
      </div>
    
  )
}

export default DashboardPerformance