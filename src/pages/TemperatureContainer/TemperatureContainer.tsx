import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler, FieldErrors } from 'react-hook-form';
import { postTemperaturesCreate } from '../../services/postTemparaturesCreate';
import { getTemparatures } from '../../services/getTemperatures';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



interface FormValues {
  rows: Array<{
    id: string | null;
    min: number | null;
    max: number | null;
    name: string;
  }>;
}

interface CompanyDetails {
  companies: {
    id: number;
  }
}

const TemperatureContainer: React.FC = () => {
  const [userCompanyId, setUserCompanyId] = useState<number>(0);
  const { handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      rows: [
        { id: null, min: null, max: null, name: 'Refrigeración' },
        { id: null, min: null, max: null, name: 'Congelación' },
        { id: null, min: null, max: null, name: 'Ultra Congelación' }
      ]
    }
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formattedData = {
      range: [
        {
          company_id: userCompanyId.toString(),
          temperatures: data.rows.map((row) => ({
            id: row.id,
            name: row.name.toLowerCase(),
            min: row.min,
            max: row.max
          }))
        }
      ]
    };

    console.log(formattedData);

    try {
      const response = await postTemperaturesCreate(formattedData);
      console.log('Post Response:', response);
      // Aquí puedes manejar la respuesta como desees
    } catch (error) {
      console.error('Error posting temperatures:', error);
    }

  };

  const getError = (errors: FieldErrors<FormValues>, field: string) => {
    return errors[field as keyof FormValues];
  };

  const addRow = () => {
    setRows(prevRows => [...prevRows, { id: null, min: null, max: null, name: '' }]);
  };

  const removeRow = (index: number) => {
    setRows(prevRows => prevRows.filter((_, i) => i !== index));
  };

  const [rows, setRows] = useState([
    { id: null, min: null, max: null, name: 'Refrigeración' },
    { id: null, min: null, max: null, name: 'Congelación' },
    { id: null, min: null, max: null, name: 'Ultra Congelación' }
  ]);

  useEffect(() => {
    const fetchCompanyAndCreateTemperatures = async () => {
      const storedCompany = localStorage.getItem('companies');
      if (storedCompany) {
        const getInfoCompany: CompanyDetails = JSON.parse(storedCompany);
        if (getInfoCompany && getInfoCompany.companies) {
          setUserCompanyId(getInfoCompany.companies.id);
        }
      }
    };

    fetchCompanyAndCreateTemperatures();

    if (userCompanyId !== 0) {
      const getCompaniesDetails = async () => {
        try {
          const tokenFromLocalStorage = localStorage.getItem('token');
          const token = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : false;
          const getTemperature: CompanyDetails = await getTemparatures(token, userCompanyId);
          console.log(getTemperature);
        } catch (error) {
          console.error('Error al obtener detalles de la empresa', error);
        }
      };

      getCompaniesDetails();
    }

  }, [userCompanyId]);

  return (
    <div className='flex justify-center w-full bg-gray-100 min-h-screen'>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:mt-12 p-6 lg:py-12 w-full mx-4 md:mx-10 max-w-[700px] ">
      {rows.map((row, index) => (
        <div key={index} className="flex flex-col min-[600px]:flex-row flex-wrap max-w-[700px] items-center justify-between mb-2 relative">
          <div>
            {row.name ? (
              <label className="text-gray-700 text-lg pl-1">{row.name}</label>
            ) : (
              <Controller
                name={`rows.${index}.name`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Nombre"
                    value={field.value ?? ''}
                    className={`border rounded-lg p-2 w-[240px] max-md:mb-4 ${getError(errors, `rows.${index}.name`) ? 'border-red-500' : ''}`}
                  />
                )}
              />
            )}
          </div>

          <div className="flex-2 flex gap-4">
            <Controller
              name={`rows.${index}.min`}
              control={control}
              rules={{ required: true, pattern: /^[0-9]+$/ }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Min"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
                  className={`flex-1 border rounded-lg p-2 w-[112px] max-md:mb-4${getError(errors, `rows.${index}.min`) ? 'border-red-500' : ''}`}
                />
              )}
            />
            <Controller
              name={`rows.${index}.max`}
              control={control}
              rules={{ required: true, pattern: /^[0-9]+$/ }}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Max"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.value === '' ? null : Number(e.target.value))}
                  className={`flex-1 border rounded-lg p-2 w-[112px] ${getError(errors, `rows.${index}.max`) ? 'border-red-500' : ''}`}
                />
              )}
            />
            {index >= 3 && (
              <div
                
                onClick={() => removeRow(index)}
                className="absolute max-[450px]:right-[-10px] max-[550px]:right-[20px] max-[600px]:right-[65px] top-[20px] -translate-y-1/2 min-[601px]:right-[-32px] text-white bg-red-500 font-semibold size-7 rounded-full cursor-pointer hover:bg-red-700 hover:text-gray-200 transition-all duration-300 flex items-center justify-center"
                // 
              >
                
                <DeleteForeverIcon sx={{ fontSize: 20 }} />
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex flex-wrap max-[600px]:justify-center mt-12 gap-8">
        <button type="button" onClick={addRow} className="rounded-full w-40 bg-blueDark2 border border-blueDark font-semibold text-white px-4 cursor-pointer transition-all duration-300 hover:bg-whiteLight hover:text-blueDark">
          Adicionar
        </button>
        <button type="submit" className="rounded-full w-40 bg-blueDark2 border border-blueDark font-semibold text-white px-4 cursor-pointer transition-all duration-300 hover:bg-whiteLight hover:text-blueDark">
          Guardar
        </button>
      </div>
    </form>

    </div>
    

  );
};

export { TemperatureContainer };
