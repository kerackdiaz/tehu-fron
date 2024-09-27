import { useState, useEffect } from 'react';
import userGetDetails from '../../../services/userGetUserDetails';
import { getCompanies } from '../../../services/getCompanies';




interface UserDetails {
  user: {
    companyId: number;
  };
}

interface CompanyDetails {
  companies: {
    createdAt: string;
    updatedAt: string;
    name: string;
  };
}

const DashboardEntity = () => {
  const [userCompanyId, setUserCompanyId] = useState<number>(0);
  const [userCompanyName, setUserCompanyName] = useState<string>('Sanitas');
  const [userCompanyCreated, setUserCompanyCreated] = useState<string>('Laboratorios clínicos');
  const [userCompanyUpdated, setUserCompanyUpdated] = useState<string>('29/08/2024 09:59:32');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const dataUser: UserDetails = await userGetDetails();
        // console.log('D: ', dataUser);
        setUserCompanyId(dataUser.user.companyId);
      } catch (error) {
        console.error('Error al obtener detalles del usuario', error);
      }
    };

    fetchUserDetails();

    if (userCompanyId !== 0) {
      const getCompaniesDetails = async () => {
        try {
          const tokenFromLocalStorage = localStorage.getItem('token');
          const token = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : false;
          const getCompany: CompanyDetails = await getCompanies(token, userCompanyId);
          // console.log(getCompany);

          setUserCompanyName(getCompany.companies.name);
          setUserCompanyCreated(getCompany.companies.createdAt)
          setUserCompanyUpdated(getCompany.companies.updatedAt)
        } catch (error) {
          console.error('Error al obtener detalles de la empresa', error);
        }
      };

      getCompaniesDetails();
    }

  }, [userCompanyId]);

  return (
    <div className='flex items-end flex-wrap gap-4 p-6 text-gray-600'>
      <span className='text-gray-500 w-full'>Entidad / Laboratorio</span>
      <div className='flex items-center gap-3'>
        <picture>
          <img className='w-16' src={"./icon-entity.avif"} alt="icon entity" title="icon entity" />
        </picture>

        <div>
          {userCompanyName && <h3 className='font-semibold text-xl'>{userCompanyName}</h3>}
          {userCompanyCreated && <p className='text-xs'>
            Creación: <span className='text-blueLight font-semibold'>{userCompanyCreated}</span>
          </p>}
          {userCompanyUpdated && <p className='text-xs mt-1'>
            Última actualización: <span className='text-blueLight font-semibold'>{userCompanyUpdated}</span>
          </p>}
        </div>
      </div>


    </div>
  );
};

export default DashboardEntity;
