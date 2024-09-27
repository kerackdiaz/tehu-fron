import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Swal from 'sweetalert2';

import Select from '../../atoms/Select/Select';
import getCompany from '../../../services/getCompany';
import CreateDevice from '../../../services/createDevice';

const FormCreateDevices: React.FC = () => {
  const [data, setData] = useState({
    nameour: '',
    name: '',
    online: false,
    type: 1,
    status: '',
    company_id: '',
  });
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedValue, setSelectedValue] = useState('0');
  const [selectedValueType, setSelectedValueType] = useState('0');

  const optionTypeDevice = [
    { id: '1', name: 'mobile' },
    { id: '2', name: 'fijo' }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenFromLocalStorage = localStorage.getItem('token');
        const token = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : '';
        const companyData = await getCompany(token);
        setCompanies(companyData.companies);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };
    fetchData();
  }, []);

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

  const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleChangeSelectType = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValueType(event.target.value);
  };

  /* const validateName = (name: string): boolean => {
    return name.startsWith("M0");
  }; */

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let valueStatus;

    /*  if (!validateName(data.name)) {
       Swal.fire({
         title: "Error",
         text: "El nombre del dispositivo debe comenzar con 'M0'!",
         icon: "error"
       });
       return;
     } */

    console.log(selectedValueType);


    if (selectedValueType === "1") {
      valueStatus = false
    } else if (selectedValueType === "2") {
      valueStatus = true
    }

    const formData = {
      ...data,
      name: `Tehu_${data.name.toUpperCase()}`,
      company_id: selectedValue,
      status: valueStatus
    };

    try {
      const response = await CreateDevice(formData);

      if (response && response.status === 200) {
        Swal.fire({
          title: "¡Buen trabajo!",
          text: "¡Has guardado los cambios con éxito!",
          icon: "success",
          willClose: () => {
            window.location.reload();
          }
        });
      }
      if (response && response.status === 201) {
        Swal.fire({
          title: "¡ERRROR!",
          text: "¡El dispositivo ya existe!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (

    <div className="flex flex-col items-center justify-center w-full mt-16 ">
      <div className="bg-white rounded-lg w-full">
        <div className="m-8">
          <h1 className="text-gray-800 text-3xl font-bold leading-tight">Asignar Dispositivos de trabajo</h1>
          <span className="block text-blueDark font-medium text-2xl">Administrador de Dispositivos</span>
        </div>

        <div className="m-8">
          <form onSubmit={handleSubmit} className="">
            <div className="md:flex md:flex-wrap md:justify-between">
              <div className="flex flex-col md:w-5/12">
                <label className="text-gray-700 font-medium pl-1">Topic:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 outline-none"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
                <small className="text-gray-500 mt-2 text-justify">
                  Recuerda que el nombre debe ser correcto con las iniciales, por ejemplo, M073. Si no es posible ubicarlo cuando se conecte.
                </small>
              </div>

              <div className="flex flex-col md:w-5/12">
                <label className="text-gray-700 font-medium pl-1">Nombre del dispositivo:</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-lg px-3 outline-none"
                  name="nameour"
                  value={data.nameour}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col md:w-5/12 mt-2">
                <label className="text-gray-700 font-medium pl-1">Estado:</label>
                <select
                  name="type"
                  value={data.type}
                  onChange={handleChange}
                  className="border h-10 border-gray-300 rounded-lg px-3 outline-none"
                >
                  <option value="1">En viaje</option>
                  <option value="2">Entregado</option>
                  <option value="3">Preparando envío</option>
                  <option value="4">Inactivo</option>
                </select>
              </div>

              <div className="flex flex-col md:w-5/12 mt-2">
                <Select label={"Tipo de dispositivo"} options={optionTypeDevice} value={selectedValueType} onChange={handleChangeSelectType} disabled={false} />
              </div>

              <div className="flex flex-col md:w-5/12 mt-2">
                <Select label={"Elige una empresa"} options={companies} value={selectedValue} onChange={handleChangeSelect} disabled={false} />
              </div>

              <div className="flex flex-col md:w-5/12 mt-2">
                <label className="text-gray-700 font-medium pl-1">Encendido:</label>
                <select
                  name="online"
                  value={data.online ? "true" : "false"}
                  onChange={handleChange}
                  className="border h-10 border-gray-300 rounded-lg px-3 focus:ring focus:ring-blue-300"
                >
                  <option value="true">Online</option>
                  <option value="false">Offline</option>
                </select>
                <span className="mt-2 pl-2 text-gray-700 font-medium">{data.online ? "ON" : "OFF"}</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="submit" className="bg-blueDark text-whiteLight w-48 rounded-full border border-blueDark hover:bg-whiteLight hover:text-blueDark transition-all duration-300 mt-4">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}

export default FormCreateDevices;
