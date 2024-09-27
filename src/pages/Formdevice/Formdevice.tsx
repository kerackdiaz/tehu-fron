import { useContext, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import DashboardRealTimeAlerts from '../../components/molecules/DashboardRealTimeAlerts/DashboardRealTimeAlerts';
import putDevice from '../../services/putDevice';
import Select from '../../components/atoms/Select/Select';
import getCompany from '../../services/getCompany';
import { userContext } from '../../main';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import LinechartTemperature from '../../components/molecules/LinechartTemperature/LinechartTemperature';
import ButtonCreateReport from '../../components/atoms/ButtonCreateReport/ButtonCreateReport';


interface SaveFormData {
  origin?: string;
  destination?: string;
}

const Formdevice = () => {
  const [saveFormData, setSaveFormData] = useState<SaveFormData>({});
  const [companies, setCompanies] = useState([]);
  const { userInfo } = useContext(userContext);
  const location = useLocation();
  const { device } = location.state || {};
  const [selectedValueType, setSelectedValueType] = useState('0');
  const [disabledInput, setDisabledInput] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const optionTypeDevice = [
    { id: '1', name: 'mobile' },
    { id: '2', name: 'fijo' }
  ];

  console.log("deviced#", device);


  const defaultData = device ? {
    id: device.id,
    name: device.name,
    nameour: device.nameour,
    origin: device.origin,
    destination: device.destination,
    online: device.online,
    status: device.state,
    type: device.type,
    company_id: device.company_id
  } : {};

  const [data, setData] = useState(defaultData);
  const [selectedValue, setSelectedValue] = useState(defaultData.company_id || '0');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenFromLocalStorage = localStorage.getItem('token');
        const token = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : userInfo.token;
        const companyData = await getCompany(token);
        setCompanies(companyData.companies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchData();
    console.log("....", data);
    setDisabledInput(true)

  }, [userInfo.token]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    let updatedValue: any = value;
    if (type === 'checkbox') {
      updatedValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'select-one' && name === 'online') {
      updatedValue = value === 'true';
    } else if (type === 'select-one' && name === 'type') {
      updatedValue = parseInt(value);
    }

    setData(prevData => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valueStatus;

    console.log(selectedValueType);


    if (selectedValueType === "1") {
      valueStatus = false
    } else {
      valueStatus = true
    }
    console.log("valueStatus", valueStatus);

    const formData = {
      ...data,
      origin: saveFormData.origin || data.origin,
      destination: saveFormData.destination || data.destination,
      company_id: selectedValue,
      status: valueStatus
    };

    try {
      const response = await putDevice(formData);
      if (response && response.status === 200) {
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "¡Has guardado los cambios con éxito!",
          icon: "success"
        });
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeSelectType = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValueType(event.target.value);
  };

  const handleCheckboxChange = () => {
    setDisabledInput(!disabledInput);
    setIsChecked(isChecked);
  };

  

  return (
    <div className="bg-white3 p-10 lg:p-24">
      <div className='flex'>
        <div className='flex-col w-full'>
          <h1 className="text-grayDark text-3xl leading-none">Device Parameterization</h1>
          <div className='flex flex-wrap justify-between w-full'>
            <h2 className="block text-blueLight font-medium text-2xl mt-2">TEHU SYSTEM</h2>

            <div className='flex flex-col gap-4'>
            <ButtonCreateReport />
            <button className="rounded-full bg-blueDark2 border border-blueDark font-semibold text-white h-10 px-4 cursor-pointer transition-all duration-300  hover:bg-whiteLight hover:text-blueDark"
              onClick={handleCheckboxChange}>Editar dispositivo</button>

            </div>

            
          </div>
        </div>

        
      </div>
      

      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex flex-wrap gap-8 my-12 pb-12 border-b border-grayLight w-full">
          <div className="w-full md:w-[30%]">
            <label className="block text-grayDark">Nombre maquina:</label>
            <span className="text-grayDark font-medium">{data.name}</span>
          </div>
          <div className="w-full md:w-[30%]">
            <label className="block text-grayDark">Código interno:</label>
            <span className="text-grayDark font-medium text-lg">{data.name}</span>
          </div>
          <div className="w-full md:w-[30%]">
            <label className="block text-grayDark pl-1">Nombre del dispositivo:</label>
            <input
              type="text"
              className={`rounded-md px-2 ${disabledInput ? 'bg-gray-200 cursor-not-allowed text-black' : 'border border-gray-300'}`}
              disabled={disabledInput}
              value={data.nameour || ''}
              name="nameour"
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-1 w-full md:w-[30%]">
            <label className="block text-grayDark pl-1">Estado:</label>
            <select
              name="type"
              value={data.type || ''}
              onChange={handleChange}
              className={`rounded-md h-10 px-2 ${disabledInput ? 'bg-gray-200 cursor-not-allowed text-black' : 'border border-gray-300'}`}
              disabled={disabledInput}
            >
              <option value="1">En viaje</option>
              <option value="2">Entregado</option>
              <option value="3">Preparando envío</option>
              <option value="4">Inactivo</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-full md:w-[30%]">
            <Select
              label={"Tipo de dispositivo"}
              options={optionTypeDevice}
              value={selectedValueType}
              onChange={handleChangeSelectType}
              disabled={disabledInput}
              
            />
          </div>
          <div className="flex flex-col gap-1 w-full md:w-[30%]">
            <Select
              label={"Elige una empresa"}
              options={companies}
              value={selectedValue}
              onChange={handleChangeSelect}
              disabled={disabledInput}
            />
          </div>
          <div className="flex flex-col gap-1 w-full md:w-[30%]">
            <label className="block text-grayDark pl-1">Encendido:</label>
            <select
              name="online"
              value={data.online ? "true" : "false"}
              onChange={handleChange}
              className={`rounded-md h-10 px-2 ${disabledInput ? 'bg-gray-200 cursor-not-allowed text-black' : 'border border-gray-300'}`}
              disabled={disabledInput}
            >
              <option value="true">Online</option>
              <option value="false">Offline</option>
            </select>
            <span className="block text-grayDark font-medium pl-3">{data.online ? "ON" : "OFF"}</span>
          </div>
        </div>

        <h1 className="text-grayDark text-3xl leading-none">Trazabilidad</h1>
        <h2 className="block text-blueLight font-semibold text-xl uppercase mt-2">Dispositivo</h2>
        <div>
          <DashboardRealTimeAlerts
            saveOriginDestination={setSaveFormData}
            origin={data.origin}
            destination={data.destination}
            deviceName={data.name}
          />
        </div>

        <div className='mt-4'>
          <LinechartTemperature deviceName={data.name} />
        </div>
        
        <div className="mt-8 w-full">
          <button
            type="submit"
            className={`rounded-full bg-blueDark2 border w-40 border-blueDark font-semibold text-white px-4 transition-all duration-300 mt-10  ${disabledInput ? 'opacity-40 cursor-not-allowed' : 'hover:bg-whiteLight hover:text-blueDark cursor-pointer'}`}
            disabled={disabledInput}
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Formdevice;
