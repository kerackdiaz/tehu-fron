import { useState, useEffect } from "react";
import userGetDetails from "../../../services/userGetUserDetails";
import getDeviceLastOther from "../../../services/getDeviceLastOther";


interface UserDetails {
    user: {
      companyId: number;
    };
  }
  
  interface Device {
    id: number;
    name: string;
    type: number
  }

const DashboardDevice = () => {

    const [userCompanyId, setUserCompanyId] = useState<number>(0);
    const [devices, setDevices] = useState<Device[]>([
        {
            id: 1,
            name: 'Laboratorio #1',
            type: 1
        },
        {
            id: 2,
            name: 'Laboratorio #2',
            type: 2
        },
        {
            id: 3,
            name: 'Laboratorio #3',
            type: 27 
        },
        {
            id: 4,
            name: 'Laboratorio #4',
            type: 18
        }
        
    ]);

    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const dataUser: UserDetails = await userGetDetails();
            setUserCompanyId(dataUser.user.companyId);
          } catch (error) {
            console.error('Error al obtener detalles del usuario', error);
          }
        };
    
        fetchUserDetails();
      }, []);
    
    useEffect(() => {
        const fetchGetDaviceLast = async () => {
        try {
        const getDataviceLast = await getDeviceLastOther(userCompanyId);
        console.log(getDataviceLast.devices);
        
        setDevices(getDataviceLast.devices)
        } catch (error) {
        console.error('Error al obtener detalles de la empresa', error);
        }
    };

    fetchGetDaviceLast();
    }, [userCompanyId]);

    
    

    return (
      <>
        {devices.map((device) => (
          <div key={device.id} className="flex flex-wrap gap-4 mt-4 border-r-[1px] border-blueLight md:last:border-r-0">
            <div className=" px-2 max-w-38">
              <div className="flex gap-2">
                <picture>
                  <img className="w-7" src={"./icon-device.avif"} alt={device.name} title={device.name} />
                </picture>
                <div className="flex flex-col font-bold text-gray-500">
                  <h2 className='text-xs'>{device.name}</h2>
                  <span className="text-2xl ">0</span>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
    )
}

export default DashboardDevice