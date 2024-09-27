import DashboardAlerts from '../../components/atoms/DashboardAlerts/DashboardAlerts'
import DashboardEntity from '../../components/atoms/DashboardEntity/DashboardEntity'
import DashboardNews from '../../components/atoms/DashboardNews/DashboardNews'
import DashboardPerformance from '../../components/atoms/DashboardPerformance/DashboardPerformance'
import DashboardDevices from '../../components/molecules/DashboardDevices/DashboardDevices'
import DashboardDevicesGps from '../../components/molecules/DashboardDevicesGps/DashboardDevicesGps'
import DashboardTimeAlerts from '../../components/molecules/DashboardAlerts/DashboardTimeAlerts'


const DashboardContainer = () => {
  return (
    <main className='flex flex-col bg-gray-200 min-h-screen pt-6 lg:pt-24 px-4'>

      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <div className='bg-white rounded-xl shadow-md min-h-[200px]'>
            <DashboardEntity />
          </div>
        </div>


        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <div className='bg-white rounded-xl shadow-md min-h-[200px]'>
            <DashboardAlerts />
          </div>
        </div>


        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <div className='bg-white rounded-xl shadow-md min-h-[200px]'>
            <DashboardNews />
          </div>
        </div>


        <div className="col-span-12 md:col-span-6 xl:col-span-3">
          <div className='bg-gray-400 rounded-xl shadow-md min-h-[200px]'>
            <DashboardPerformance />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-6 w-full">
        <div>
          <div className='bg-white rounded-xl shadow-md p-6'>
            <DashboardDevices />
          </div>

          <div className='bg-white rounded-xl shadow-md p-6 mt-6'>
            <DashboardTimeAlerts />
          </div>
        </div>

        <div>
          <div className='bg-white rounded-xl shadow-md p-6'>
            <DashboardDevicesGps />
          </div>
        </div>

      </div>

    </main>
  )
}

export default DashboardContainer